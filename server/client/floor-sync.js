/* ============================================================================
   floor-sync.js — the drop-in client. NOT wired into the app yet.

   Plain browser script, no build step, no dependency. It defines one global,
   FloorSync, and nothing else.

   The contract with the app is deliberately tiny, because the app already works
   without it and must keep working if this never connects:

     FloorSync.start({url, room, key, onState, onStatus})
     FloorSync.push({parties, merges, who, day})     // only what changed
     FloorSync.stop()
     FloorSync.status()                              // "off" | "connecting" | "live" | "polling" | "error"

   onState(view) hands back the whole board, already in the app's own shape:
     {parties:{key:{n,t,name}}, merges:["23+32"], who:{"9":"Evan + Alexis"}, day:2}

   Design notes worth keeping:
   - The client never merges. It sends what changed and adopts what comes back.
     One implementation of the rules, on the server, is the whole point.
   - WebSocket first, HTTP polling as a fallback. Restaurant wifi drops; a board
     that stops updating silently is worse than one that visibly falls back.
   - If url or key is missing, start() returns false and does nothing at all. The
     app then behaves exactly as it does today, on local storage only.
   ============================================================================ */
(function (root) {
  "use strict";

  var cfg = null, ws = null, poll = null, retry = 0, stopped = true, st = "off";

  function setStatus(s) {
    if (st === s) return;
    st = s;
    if (cfg && cfg.onStatus) { try { cfg.onStatus(s); } catch (e) {} }
  }

  function emit(view) {
    if (cfg && cfg.onState && view) { try { cfg.onState(view); } catch (e) {} }
  }

  function httpBase() {
    return cfg.url.replace(/\/+$/, "") + "/r/" + encodeURIComponent(cfg.room);
  }
  function wsUrl() {
    return httpBase().replace(/^http/, "ws") + "/ws?k=" + encodeURIComponent(cfg.key);
  }

  function openSocket() {
    if (stopped) return;
    var sock;
    try { sock = new WebSocket(wsUrl()); } catch (e) { return startPolling(); }
    ws = sock;
    setStatus("connecting");

    sock.onopen = function () {
      retry = 0;
      setStatus("live");
      stopPolling();
      // a shared board on hotel-grade wifi needs a heartbeat or the socket dies quietly
      sock._hb = setInterval(function () {
        try { sock.send(JSON.stringify({ type: "ping" })); } catch (e) {}
      }, 25000);
    };
    sock.onmessage = function (ev) {
      var m;
      try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (m && m.type === "state") emit(m.state);
    };
    sock.onclose = function () {
      clearInterval(sock._hb);
      if (ws === sock) ws = null;
      if (stopped) return;
      setStatus("error");
      startPolling();                 // keep working while we wait
      retry = Math.min(retry + 1, 6);
      setTimeout(openSocket, 1000 * Math.pow(2, retry));   // 2s, 4s ... capped at ~64s
    };
    sock.onerror = function () { try { sock.close(); } catch (e) {} };
  }

  function request(ops) {
    return fetch(httpBase() + "/sync", {
      method: "POST",
      headers: { "content-type": "application/json", "x-mos-key": cfg.key },
      body: JSON.stringify({ ops: ops || {} }),
    }).then(function (r) {
      if (!r.ok) throw new Error("sync " + r.status);
      return r.json();
    });
  }

  function startPolling() {
    if (poll || stopped) return;
    setStatus("polling");
    var tick = function () {
      request({}).then(function (r) { emit(r.state); }).catch(function () { setStatus("error"); });
    };
    tick();
    poll = setInterval(tick, 8000);
  }
  function stopPolling() { if (poll) { clearInterval(poll); poll = null; } }

  root.FloorSync = {
    start: function (o) {
      if (!o || !o.url || !o.key || !o.room) return false;
      cfg = o; stopped = false; retry = 0;
      if (typeof WebSocket === "function") openSocket(); else startPolling();
      return true;
    },
    push: function (ops) {
      if (!cfg || stopped) return false;
      if (ws && ws.readyState === 1) {
        try { ws.send(JSON.stringify({ type: "ops", ops: ops })); return true; } catch (e) {}
      }
      request(ops).then(function (r) { emit(r.state); }).catch(function () { setStatus("error"); });
      return true;
    },
    stop: function () {
      stopped = true; stopPolling();
      if (ws) { try { clearInterval(ws._hb); ws.close(); } catch (e) {} ws = null; }
      setStatus("off");
    },
    status: function () { return st; },
  };
})(typeof window !== "undefined" ? window : globalThis);
