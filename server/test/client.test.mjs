/* ============================================================================
   The whole loop: the real floor-sync.js client, talking to the real FloorRoom.

   Only the transport is faked. The client file is loaded and run as-is — no copy,
   no re-implementation — so what passes here is what ships to a phone.

   Run: node test/client.test.mjs
   ============================================================================ */
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);

/* ---- Cloudflare surface (same shims as room.test.mjs) ---- */
const NativeResponse = globalThis.Response;
globalThis.Response = class extends NativeResponse {
  constructor(body, init) {
    if (init && init.status === 101) {
      super(null, { ...init, status: 200 });
      Object.defineProperty(this, "status", { value: 101, configurable: true });
      this.webSocket = init.webSocket;
      return;
    }
    super(body, init);
    if (init && init.webSocket) this.webSocket = init.webSocket;
  }
};
class DOSocket {
  constructor() { this.listeners = {}; this.out = null; this.readyState = 1; }
  accept() {}
  send(s) { if (this.out) this.out(s); }
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
  fire(t, ev) { (this.listeners[t] || []).forEach((fn) => fn(ev || {})); }
}
/* A real WebSocketPair is two linked halves. Link them here too, and hand the client
   half back through the 101 response the way Workers does — indexing room.sockets to
   find "my" socket is wrong the moment two phones connect before either resolves. */
globalThis.WebSocketPair = function () {
  const client = new DOSocket(), server = new DOSocket();
  client._peer = server; server._peer = client;
  server._queued = [];
  server.send = (m) => { if (client._live) client.fire("message", { data: m }); else server._queued.push(m); };
  return { 0: client, 1: server };
};

class FakeStorage {
  constructor() { this.map = new Map(); }
  async get(k) { return this.map.get(k); }
  async put(k, v) { this.map.set(k, JSON.parse(JSON.stringify(v))); }
  async setAlarm() {}
  async deleteAll() { this.map.clear(); }
}

const { FloorRoom } = await import("../src/worker.js");
const room = new FloorRoom({ storage: new FakeStorage() }, {});

let wsOpened = 0, wsFailNext = false;
class FakeWebSocket {
  constructor(url) {
    this.url = url; this.readyState = 0;
    if (wsFailNext) {
      wsFailNext = false;
      setTimeout(() => { this.readyState = 3; this.onclose && this.onclose({}); }, 0);
      return;
    }
    wsOpened++;
    room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } })).then((res) => {
      const client = res.webSocket;
      this.client = client;
      this.server = client._peer;
      client.addEventListener("message", (ev) => this.onmessage && this.onmessage(ev));
      client._live = true;
      this.readyState = 1;
      this.onopen && this.onopen({});
      // the room sent the opening board before we could attach — replay it
      (this.server._queued || []).forEach((m) => client.fire("message", { data: m }));
      this.server._queued = [];
    });
  }
  send(s) { if (this.server) this.server.fire("message", { data: s }); }
  close() {
    this.readyState = 3;
    if (this.client) this.client._live = false;
    if (this.server) this.server.fire("close");
    this.onclose && this.onclose({});
  }
}

let httpCalls = 0;
const fakeFetch = async (url, opts) => {
  httpCalls++;
  const u = new URL(url);
  if (!/\/sync$/.test(u.pathname)) return new NativeResponse("{}", { status: 404 });
  const r = await room.fetch(new Request("https://do/sync", { method: "POST", body: opts.body }));
  return new NativeResponse(await r.text(), { status: r.status });
};

/* ---- load the real client, once per simulated phone ---- */
const SRC = fs.readFileSync(path.join(HERE, "..", "client", "floor-sync.js"), "utf8");
function newPhone(opts) {
  const win = {};
  new Function("window", "WebSocket", "fetch", "setInterval", "clearInterval", "setTimeout", SRC)(
    win, FakeWebSocket, fakeFetch, setInterval, clearInterval, setTimeout
  );
  const seen = [];
  const statuses = [];
  const started = win.FloorSync.start(Object.assign({
    url: "https://sync.example.com", room: "mos-2026-08-12", key: "secret",
    onState: (s) => seen.push(s),
    onStatus: (s) => statuses.push(s),
  }, opts || {}));
  return { api: win.FloorSync, seen, statuses, started, last: () => seen[seen.length - 1] };
}
const settle = (ms = 40) => new Promise((r) => setTimeout(r, ms));

let pass = 0; const fail = [];
const eq = (a, b, m) => {
  const A = JSON.stringify(a), B = JSON.stringify(b);
  if (A === B) pass++; else fail.push(`${m}\n      got ${A}\n      want ${B}`);
};
const ok = (c, m) => { if (c) pass++; else fail.push(m); };

/* ---- no config = the app is untouched ---- */
{
  const win = {};
  new Function("window", "WebSocket", "fetch", "setInterval", "clearInterval", "setTimeout", SRC)(
    win, FakeWebSocket, fakeFetch, setInterval, clearInterval, setTimeout
  );
  eq(win.FloorSync.start({}), false, "start() refuses with no url/key/room");
  eq(win.FloorSync.status(), "off", "and stays off, so the app runs exactly as it does today");
  eq(win.FloorSync.push({ parties: { "23": { n: 4 } } }), false, "push() is a no-op when it never started");
}

/* ---- one phone plots, a second phone is told without asking ---- */
{
  const a = newPhone(); const b = newPhone();
  ok(a.started && b.started, "both phones started");
  await settle();
  eq(a.api.status(), "live", "phone A is on the websocket");
  ok(a.last() && a.last().parties, "phone A got an opening board");

  a.api.push({ parties: { "23": { n: 4, t: "6:30" } } });
  await settle();
  eq(b.last().parties["23"], { n: 4, t: "6:30", name: "" }, "phone B saw A's party with no action of its own");

  b.api.push({ parties: { "41": { n: 2, t: "7:00" } } });
  await settle();
  eq(Object.keys(a.last().parties).sort(), ["23", "41"], "and A now sees both tables");
  a.api.stop(); b.api.stop();
}

/* ---- merges and section names travel too ---- */
{
  const a = newPhone(); const b = newPhone();
  await settle();
  a.api.push({ merges: { "23+32": { on: true } }, who: { "9": { v: "Evan + Alexis" } } });
  await settle();
  eq(b.last().merges, ["23+32"], "phone B sees the tables pushed together");
  eq(b.last().who["9"], "Evan + Alexis", "phone B sees the section rename");
  a.api.push({ merges: { "23+32": { on: false } } });
  await settle();
  eq(b.last().merges, [], "and sees them split apart again");
  a.api.stop(); b.api.stop();
}

/* ---- clearing a table clears it everywhere ---- */
{
  const a = newPhone(); const b = newPhone();
  await settle();
  a.api.push({ parties: { "12": { n: 6, t: "8:00" } } });
  await settle();
  ok(b.last().parties["12"], "table is on B's board");
  a.api.push({ parties: { "12": { del: true } } });
  await settle();
  eq(b.last().parties["12"], undefined, "and clearing it on A removes it from B");
  a.api.stop(); b.api.stop();
}

/* ---- the wifi drops: it must fall back visibly, not go quiet ---- */
{
  wsFailNext = true;
  const c = newPhone();
  await settle(80);
  eq(c.api.status(), "polling", "with no websocket it falls back to polling rather than dying");
  const before = httpCalls;
  c.api.push({ parties: { "21": { n: 3, t: "5:15" } } });
  await settle();
  ok(httpCalls > before, "and pushes over HTTP instead");
  const d = newPhone();
  await settle();
  eq(d.last().parties["21"], { n: 3, t: "5:15", name: "" }, "a phone on the fallback is still seen by the others");
  ok(c.statuses.includes("polling"), "the status change is reported so the UI can say so");
  c.api.stop(); d.api.stop();
  eq(c.api.status(), "off", "stop() reports off");
}

/* ---- guest names never leave the building by default ---- */
{
  const a = newPhone(); const b = newPhone();
  await settle();
  a.api.push({ parties: { "24": { n: 2, t: "6:00", name: "Bhatt" } } });
  await settle();
  eq(b.last().parties["24"].name, "", "the guest name is not shared — the server dropped it");
  a.api.stop(); b.api.stop();
}

console.log(`  ${pass} passed, ${fail.length} failed   (websockets opened: ${wsOpened}, http calls: ${httpCalls})`);
if (fail.length) { fail.forEach((f) => console.log("  FAIL " + f)); process.exit(1); }
console.log("  CLIENT <-> ROOM OK");
process.exit(0);
