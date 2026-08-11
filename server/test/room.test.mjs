/* ============================================================================
   Drives the REAL FloorRoom Durable Object from worker.js, with the small
   Cloudflare surface it touches stubbed out. Worth doing this rather than
   re-implementing the room in the test: a test that only exercises a copy of the
   logic proves nothing about the thing that actually ships.

   Run: node test/room.test.mjs
   ============================================================================ */

/* ---- the Cloudflare bits FloorRoom uses, and nothing more ---- */
class FakeSocket {
  constructor(name) { this.name = name; this.sent = []; this.listeners = {}; this.readyState = 1; this.peer = null; }
  accept() {}
  send(s) { this.sent.push(s); if (this.peer) this.peer._deliver(s); }
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
  _deliver(data) { (this.listeners.message || []).forEach((fn) => fn({ data })); }
  _fire(t) { (this.listeners[t] || []).forEach((fn) => fn({})); }
  last() { return this.sent.length ? JSON.parse(this.sent[this.sent.length - 1]) : null; }
  states() { return this.sent.map((s) => JSON.parse(s)).filter((m) => m.type === "state"); }
}
globalThis.WebSocketPair = function () {
  const a = new FakeSocket("client"), b = new FakeSocket("server");
  return { 0: a, 1: b };
};

/* Workers allow `new Response(null, {status:101, webSocket})` for the upgrade; the
   stock Node Response refuses any status below 200. Shim just that one case. */
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

class FakeStorage {
  constructor() { this.map = new Map(); this.alarm = null; }
  async get(k) { return this.map.get(k); }
  async put(k, v) { this.map.set(k, JSON.parse(JSON.stringify(v))); }
  async setAlarm(t) { this.alarm = t; }
  async deleteAll() { this.map.clear(); }
}

const { FloorRoom } = await import("../src/worker.js");

let pass = 0; const fail = [];
const eq = (a, b, m) => {
  const A = JSON.stringify(a), B = JSON.stringify(b);
  if (A === B) pass++; else fail.push(`${m}\n      got ${A}\n      want ${B}`);
};
const ok = (c, m) => { if (c) pass++; else fail.push(m); };

const mkRoom = (env = {}) => {
  const storage = new FakeStorage();
  return { room: new FloorRoom({ storage }, env), storage };
};
const post = (room, ops) =>
  room.fetch(new Request("https://do/sync", { method: "POST", body: JSON.stringify({ ops }) }));
const readState = async (r) => (await r.json()).state;

/* ---- HTTP path: two phones, different tables, both land ---- */
{
  const { room, storage } = mkRoom();
  await post(room, { parties: { "23": { n: 4, t: "6:30" } } });
  const s = await readState(await post(room, { parties: { "41": { n: 2, t: "7:00" } } }));
  eq(Object.keys(s.parties).sort(), ["23", "41"], "two phones, two tables, both on the board");
  ok(storage.map.has("state"), "state is persisted, not just held in memory");
  ok(storage.alarm > Date.now(), "an expiry alarm is armed so the room clears itself");
}

/* ---- a new phone joining mid-shift gets the whole board ---- */
{
  const { room } = mkRoom();
  await post(room, { parties: { "23": { n: 4, t: "6:30" } }, merges: { "23+32": { on: true } } });
  const res = await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  eq(res.status, 101, "websocket upgrades");
  const server = [...room.sockets][0];
  const first = server.last();
  eq(first.type, "state", "the board is pushed the moment a phone connects");
  eq(first.state.parties["23"].n, 4, "a phone joining mid-shift sees what is already plotted");
  eq(first.state.merges, ["23+32"], "and sees which tables are pushed together");
}

/* ---- one phone plots, every other phone is told ---- */
{
  const { room } = mkRoom();
  const socks = [];
  for (let i = 0; i < 3; i++) {
    await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  }
  [...room.sockets].forEach((s) => socks.push(s));
  eq(socks.length, 3, "three phones connected");
  const before = socks.map((s) => s.sent.length);
  socks[0]._deliver(JSON.stringify({ type: "ops", ops: { parties: { "12": { n: 6, t: "8:00" } } } }));
  await new Promise((r) => setTimeout(r, 10));
  socks.forEach((s, i) => {
    ok(s.sent.length > before[i], `phone ${i} was pushed the change`);
    eq(s.last().state.parties["12"], { n: 6, t: "8:00", name: "" }, `phone ${i} sees the new party`);
  });
}

/* ---- an HTTP write still reaches the websocket phones ---- */
{
  const { room } = mkRoom();
  await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  const sock = [...room.sockets][0];
  const before = sock.sent.length;
  await post(room, { parties: { "21": { n: 3, t: "5:30" } } });
  ok(sock.sent.length > before, "a phone on the HTTP fallback does not go unseen by the others");
  eq(sock.last().state.parties["21"].n, 3, "the socket phone got the fallback phone's party");
}

/* ---- guest names: off by default, and it is a real drop, not a hide ---- */
{
  const { room, storage } = mkRoom();                       // STORE_GUEST_NAMES unset
  const s = await readState(await post(room, { parties: { "23": { n: 4, t: "6:30", name: "Bhatt" } } }));
  eq(s.parties["23"].name, "", "the name never comes back");
  ok(!JSON.stringify([...storage.map.values()]).includes("Bhatt"), "and was never written to storage");

  const on = mkRoom({ STORE_GUEST_NAMES: "on" });
  const s2 = await readState(await post(on.room, { parties: { "23": { name: "Bhatt", n: 4 } } }));
  eq(s2.parties["23"].name, "Bhatt", "turning it on deliberately keeps the name");
}

/* ---- garbage in ---- */
{
  const { room } = mkRoom();
  const bad = await room.fetch(new Request("https://do/sync", { method: "POST", body: "{not json" }));
  eq(bad.status, 400, "malformed json is rejected");
  const big = await room.fetch(new Request("https://do/sync", { method: "POST", body: "x".repeat(40000) }));
  eq(big.status, 413, "an oversized body is refused before parsing");
  const s = await readState(await post(room, { parties: { "'; DROP TABLE": { n: 1 } } }));
  eq(Object.keys(s.parties), [], "a nonsense table id is dropped");
  const nf = await room.fetch(new Request("https://do/nope"));
  eq(nf.status, 404, "unknown paths 404");
}

/* ---- a socket sending junk must not take the room down ---- */
{
  const { room } = mkRoom();
  await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  const sock = [...room.sockets][0];
  sock._deliver("{ not json at all");
  await new Promise((r) => setTimeout(r, 10));
  eq(sock.last().type, "error", "the phone is told its message was bad");
  sock._deliver(JSON.stringify({ type: "ping" }));
  await new Promise((r) => setTimeout(r, 10));
  eq(sock.last().type, "pong", "and the room is still answering afterwards");
  sock._deliver(JSON.stringify({ type: "ops", ops: { parties: { "24": { n: 2 } } } }));
  await new Promise((r) => setTimeout(r, 10));
  eq(sock.last().state.parties["24"].n, 2, "and still accepts real work");
}

/* ---- a phone that drops off stops being broadcast to ---- */
{
  const { room } = mkRoom();
  await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  await room.fetch(new Request("https://do/ws", { headers: { Upgrade: "websocket" } }));
  eq(room.sockets.size, 2, "two phones on");
  const [a] = [...room.sockets];
  a._fire("close");
  eq(room.sockets.size, 1, "a phone that walks out of range is dropped from the broadcast list");
}

/* ---- the nightly reset ---- */
{
  const { room, storage } = mkRoom();
  await post(room, { parties: { "23": { n: 4 } } });
  await room.alarm();
  eq(storage.map.size, 0, "the alarm wipes the room");
  const s = await readState(await post(room, {}));
  eq(s.parties, {}, "and the next service starts on a clean board");
}

console.log(`  ${pass} passed, ${fail.length} failed`);
if (fail.length) { fail.forEach((f) => console.log("  FAIL " + f)); process.exit(1); }
console.log("  DURABLE OBJECT OK");
