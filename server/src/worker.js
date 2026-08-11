/* ============================================================================
   Mo's floor-plot sync — Cloudflare Worker + Durable Object.

   One Durable Object per room, and a room is one service day: "mos-2026-08-12".
   That gives the board a natural reset every night with nothing to remember to
   clear, and it makes old data expire on its own.

   Endpoints (all under /r/:room):
     GET  /r/:room/ws     WebSocket. Sends state on connect, pushes it on change.
     POST /r/:room/sync   HTTP fallback. Send ops, get the merged state back.
     GET  /r/:room/state  Read-only.

   The client is deliberately dumb: it sends what changed and replaces its local
   copy with whatever comes back. The server is the only thing that merges, so
   there is exactly one implementation of the rules to get right.
   ============================================================================ */

import { mergeState, sanitizeOps, stripNames, pruneState, publicView, emptyState, LIMITS } from "./merge.mjs";

const ROOM_RE = /^[a-z0-9][a-z0-9-]{2,39}$/;

function cors(env, req) {
  const allow = (env.ALLOW_ORIGIN || "*").split(",").map((s) => s.trim());
  const origin = req.headers.get("Origin") || "";
  const ok = allow.includes("*") ? "*" : (allow.includes(origin) ? origin : allow[0] || "");
  return {
    "Access-Control-Allow-Origin": ok,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type,x-mos-key",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}
const json = (body, env, req, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...cors(env, req) },
  });

/* The key travels inside a public HTML file, so this is a curtain, not a lock —
   see README. What it does buy: the endpoint is not open to a drive-by crawler,
   and rotating it cuts off anyone who copied it. */
function keyOk(req, env, url) {
  if (!env.MOS_KEY) return false;                       // unset = closed, not open
  const given = req.headers.get("x-mos-key") || url.searchParams.get("k") || "";
  if (given.length !== env.MOS_KEY.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ env.MOS_KEY.charCodeAt(i);
  return diff === 0;                                     // constant-time-ish compare
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(env, req) });

    const m = url.pathname.match(/^\/r\/([^/]+)\/(ws|sync|state)$/);
    if (!m) return json({ error: "not found" }, env, req, 404);

    const [, room, action] = m;
    if (!ROOM_RE.test(room)) return json({ error: "bad room" }, env, req, 400);
    if (!keyOk(req, env, url)) return json({ error: "unauthorized" }, env, req, 401);

    const id = env.FLOOR_ROOM.idFromName(room);
    return env.FLOOR_ROOM.get(id).fetch(
      new Request(`https://do/${action}`, {
        method: req.method,
        headers: req.headers,
        body: req.method === "POST" ? req.body : undefined,
      })
    ).then(async (r) => {
      // the DO speaks plain JSON; CORS is added once, here
      if (r.status === 101) return r;                    // websocket upgrade passes through
      const body = await r.text();
      return new Response(body, {
        status: r.status,
        headers: { "content-type": "application/json; charset=utf-8", ...cors(env, req) },
      });
    });
  },
};

export class FloorRoom {
  constructor(state, env) {
    this.ctx = state;
    this.env = env;
    this.sockets = new Set();
    this.state = null;
  }

  async load() {
    if (this.state) return this.state;
    this.state = (await this.ctx.storage.get("state")) || emptyState();
    return this.state;
  }

  async save(next) {
    this.state = next;
    await this.ctx.storage.put("state", next);
    // a room is one service day; clear it out a day and a half later
    const at = Date.now() + 36 * 60 * 60 * 1000;
    await this.ctx.storage.setAlarm(at);
  }

  async alarm() {
    await this.ctx.storage.deleteAll();
    this.state = null;
  }

  broadcast(payload) {
    const msg = JSON.stringify(payload);
    for (const ws of [...this.sockets]) {
      try { ws.send(msg); } catch (e) { this.sockets.delete(ws); }
    }
  }

  async apply(rawOps) {
    const now = Date.now();
    let ops = sanitizeOps(rawOps);
    if (String(this.env.STORE_GUEST_NAMES || "off").toLowerCase() !== "on") ops = stripNames(ops);
    const merged = pruneState(mergeState(await this.load(), ops, now), now);
    await this.save(merged);
    return publicView(merged);
  }

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/ws") {
      if (req.headers.get("Upgrade") !== "websocket") return new Response("expected websocket", { status: 426 });
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      server.accept();
      this.sockets.add(server);
      server.send(JSON.stringify({ type: "state", state: publicView(await this.load()) }));

      server.addEventListener("message", async (ev) => {
        let msg;
        try {
          if (typeof ev.data !== "string" || ev.data.length > LIMITS.bodyBytes) throw new Error("too big");
          msg = JSON.parse(ev.data);
        } catch (e) {
          server.send(JSON.stringify({ type: "error", error: "bad message" }));
          return;
        }
        if (msg && msg.type === "ping") { server.send(JSON.stringify({ type: "pong" })); return; }
        if (!msg || msg.type !== "ops") return;
        const view = await this.apply(msg.ops);
        this.broadcast({ type: "state", state: view });
      });

      const drop = () => this.sockets.delete(server);
      server.addEventListener("close", drop);
      server.addEventListener("error", drop);
      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname === "/state") {
      return new Response(JSON.stringify({ state: publicView(await this.load()) }), { status: 200 });
    }

    if (url.pathname === "/sync" && req.method === "POST") {
      const text = await req.text();
      if (text.length > LIMITS.bodyBytes) return new Response(JSON.stringify({ error: "too large" }), { status: 413 });
      let body;
      try { body = JSON.parse(text || "{}"); } catch (e) {
        return new Response(JSON.stringify({ error: "bad json" }), { status: 400 });
      }
      const view = await this.apply(body.ops || {});
      this.broadcast({ type: "state", state: view });      // websocket clients see HTTP writes too
      return new Response(JSON.stringify({ state: view }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  }
}
