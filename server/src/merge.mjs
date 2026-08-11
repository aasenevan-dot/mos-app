/* ============================================================================
   The merge core. This is the ONLY place the rules live — the Worker imports it,
   the tests import it, and the demo inlines a copy generated from this file.

   The shape mirrors what the app already keeps per phone:
     parties  { "<tableOrMergeId>": {n, t, name} }
     merges   { "<mergeId>": {on} }
     who      { "<sectionIndex>": {v} }
     day      { v }

   Two rules do all the work:

   1. LAST WRITE WINS, PER KEY. Not per document. Two servers plotting different
      tables at the same moment must both survive; whole-document LWW would throw
      one of them away, which is exactly the bug that makes a shared board useless.

   2. THE SERVER STAMPS THE CLOCK. A client-supplied timestamp is ignored on the
      way in. One phone with a clock ten minutes fast would otherwise win every
      conflict for the rest of the shift, and nobody would ever work out why.
      Server-arrival order IS the ordering.

   Deletes are tombstones ({del:true}), because an absent key means "I have no
   opinion", not "remove it" — without tombstones a delete would be undone by the
   next client that syncs an older copy.
   ============================================================================ */

export const LIMITS = {
  bodyBytes: 32 * 1024,
  keysPerMap: 300,
  tableId: 16,          // "23", "23+32", "B14"
  timeText: 8,          // "6:30", "11:15"
  nameText: 40,
  whoText: 60,
  partyMax: 40,
  sections: 40,
  days: 7,
  tombstoneMs: 12 * 60 * 60 * 1000,
};

export function emptyState() {
  return { parties: {}, merges: {}, who: {}, day: null, v: 0 };
}

const isObj = (x) => x !== null && typeof x === "object" && !Array.isArray(x);
const clampStr = (x, n) => String(x == null ? "" : x).slice(0, n);
const idOk = (k) => /^[A-Za-z0-9+_-]{1,16}$/.test(k);

/* Everything that arrives from a phone goes through here first. The app is a public
   file, so the endpoint has to assume the caller is not the app. */
export function sanitizeOps(raw) {
  const out = { parties: {}, merges: {}, who: {}, day: undefined };
  if (!isObj(raw)) return out;

  if (isObj(raw.parties)) {
    for (const [k, v] of Object.entries(raw.parties).slice(0, LIMITS.keysPerMap)) {
      if (!idOk(k) || !isObj(v)) continue;
      if (v.del) { out.parties[k] = { del: true }; continue; }
      const n = Math.floor(Number(v.n));
      out.parties[k] = {
        n: Number.isFinite(n) && n > 0 ? Math.min(n, LIMITS.partyMax) : null,
        t: clampStr(v.t, LIMITS.timeText),
        name: clampStr(v.name, LIMITS.nameText),
      };
    }
  }
  if (isObj(raw.merges)) {
    for (const [k, v] of Object.entries(raw.merges).slice(0, LIMITS.keysPerMap)) {
      if (!idOk(k) || !isObj(v)) continue;
      out.merges[k] = v.del ? { del: true } : { on: !!v.on };
    }
  }
  if (isObj(raw.who)) {
    for (const [k, v] of Object.entries(raw.who).slice(0, LIMITS.sections)) {
      if (!/^\d{1,2}$/.test(k) || Number(k) >= LIMITS.sections || !isObj(v)) continue;
      out.who[k] = v.del ? { del: true } : { v: clampStr(v.v, LIMITS.whoText) };
    }
  }
  if (isObj(raw.day)) {
    const d = Math.floor(Number(raw.day.v));
    if (Number.isFinite(d) && d >= 0 && d < LIMITS.days) out.day = { v: d };
  }
  return out;
}

/* Guest names are the one genuinely sensitive field on this board. When the service
   is configured not to store them, they are dropped HERE — on the way in, before
   anything is persisted — rather than hidden at render time. */
export function stripNames(ops) {
  for (const p of Object.values(ops.parties || {})) if (p && !p.del) p.name = "";
  return ops;
}

function mergeMap(base, incoming, now) {
  const out = { ...(base || {}) };
  for (const [k, v] of Object.entries(incoming || {})) {
    out[k] = { ...v, _u: now };            // server clock, always
  }
  return out;
}

export function mergeState(state, ops, now) {
  const s = isObj(state) ? state : emptyState();
  const next = {
    parties: mergeMap(s.parties, ops.parties, now),
    merges: mergeMap(s.merges, ops.merges, now),
    who: mergeMap(s.who, ops.who, now),
    day: ops.day ? { ...ops.day, _u: now } : s.day || null,
    v: (s.v || 0) + 1,
  };
  return next;
}

/* Tombstones are not kept forever — a table cleared at the start of service should
   not still be carrying a marker at close. */
export function pruneState(state, now) {
  const s = isObj(state) ? state : emptyState();
  const keep = (m) => {
    const out = {};
    for (const [k, v] of Object.entries(m || {})) {
      if (v && v.del && now - (v._u || 0) > LIMITS.tombstoneMs) continue;
      out[k] = v;
    }
    return out;
  };
  return { parties: keep(s.parties), merges: keep(s.merges), who: keep(s.who), day: s.day || null, v: s.v || 0 };
}

/* What a phone actually renders: tombstones and merges that are off simply are not
   there, so the client never has to know tombstones exist. */
export function publicView(state) {
  const s = isObj(state) ? state : emptyState();
  const live = (m, f) => {
    const out = {};
    for (const [k, v] of Object.entries(m || {})) {
      if (!v || v.del) continue;
      const val = f(v);
      if (val !== undefined) out[k] = val;
    }
    return out;
  };
  return {
    v: s.v || 0,
    parties: live(s.parties, (v) => ({ n: v.n ?? null, t: v.t || "", name: v.name || "" })),
    merges: Object.keys(live(s.merges, (v) => (v.on ? true : undefined))),
    who: live(s.who, (v) => v.v || ""),
    day: s.day && !s.day.del ? s.day.v : null,
  };
}
