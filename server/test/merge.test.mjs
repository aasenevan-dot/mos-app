/* Tests for the merge core. Plain node, no framework:  node test/merge.test.mjs  */
import {
  emptyState, mergeState, sanitizeOps, stripNames, pruneState, publicView, LIMITS,
} from "../src/merge.mjs";

let pass = 0, fail = [];
const eq = (a, b, msg) => {
  const A = JSON.stringify(a), B = JSON.stringify(b);
  if (A === B) pass++; else fail.push(`${msg}\n      got ${A}\n      want ${B}`);
};
const ok = (c, msg) => { if (c) pass++; else fail.push(msg); };

/* ---- the whole point: two people plotting different tables both survive ---- */
{
  let s = emptyState();
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 4, t: "6:30" } } }), 1000);
  s = mergeState(s, sanitizeOps({ parties: { "41": { n: 2, t: "7:00" } } }), 1001);
  const v = publicView(s);
  eq(Object.keys(v.parties).sort(), ["23", "41"], "concurrent edits to different tables must both survive");
  eq(v.parties["23"].n, 4, "first writer's table kept");
  eq(v.parties["41"].t, "7:00", "second writer's table kept");
}

/* ---- same table twice: the later arrival wins, and only that key changes ---- */
{
  let s = emptyState();
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 4, t: "6:30" }, "41": { n: 2, t: "7:00" } } }), 1000);
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 6, t: "6:45" } } }), 2000);
  const v = publicView(s);
  eq(v.parties["23"], { n: 6, t: "6:45", name: "" }, "later write wins on the contested table");
  eq(v.parties["41"], { n: 2, t: "7:00", name: "" }, "the uncontested table is untouched");
}

/* ---- a fast phone clock must not win every conflict for the rest of the night ---- */
{
  let s = emptyState();
  // client claims it wrote in the year 2099
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 9, t: "9:99", _u: 4102444800000 } } }), 1000);
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 2, t: "6:00" } } }), 1001);
  eq(publicView(s).parties["23"].n, 2, "server clock decides — a skewed client cannot pin a table");
  ok(!("_u" in publicView(s).parties["23"]), "internal stamps never reach the client");
}

/* ---- deletes have to be tombstones or an older copy resurrects them ---- */
{
  let s = emptyState();
  s = mergeState(s, sanitizeOps({ parties: { "23": { n: 4, t: "6:30" } } }), 1000);
  s = mergeState(s, sanitizeOps({ parties: { "23": { del: true } } }), 2000);
  eq(publicView(s).parties["23"], undefined, "a cleared table disappears from the board");
  ok(s.parties["23"] && s.parties["23"].del, "but a tombstone is kept internally");
  // a phone that still had the old value syncs late; the delete must hold
  s = mergeState(s, sanitizeOps({ parties: { "41": { n: 2 } } }), 2500);
  eq(publicView(s).parties["23"], undefined, "a late sync of unrelated keys does not resurrect it");
}

/* ---- tombstones do not live forever ---- */
{
  let s = emptyState();
  s = mergeState(s, sanitizeOps({ parties: { "23": { del: true } } }), 1000);
  const kept = pruneState(s, 1000 + LIMITS.tombstoneMs - 1);
  ok(kept.parties["23"], "tombstone survives inside the window");
  const gone = pruneState(s, 1000 + LIMITS.tombstoneMs + 1);
  ok(!gone.parties["23"], "tombstone is swept once it is older than the window");
}

/* ---- merges and section names ride the same rules ---- */
{
  let s = emptyState();
  s = mergeState(s, sanitizeOps({ merges: { "23+32": { on: true } }, who: { "9": { v: "Evan + Alexis" } } }), 1000);
  let v = publicView(s);
  eq(v.merges, ["23+32"], "an active merge is listed");
  eq(v.who["9"], "Evan + Alexis", "a section rename syncs");
  s = mergeState(s, sanitizeOps({ merges: { "23+32": { on: false } } }), 2000);
  eq(publicView(s).merges, [], "splitting the pair removes it from the list");
}

/* ---- day pointer ---- */
{
  let s = emptyState();
  eq(publicView(s).day, null, "no day set to begin with");
  s = mergeState(s, sanitizeOps({ day: { v: 2 } }), 1000);
  eq(publicView(s).day, 2, "day syncs");
  s = mergeState(s, sanitizeOps({ day: { v: 99 } }), 2000);
  eq(publicView(s).day, 2, "an out-of-range day is rejected, leaving the old one");
}

/* ---- the endpoint is public, so junk has to bounce ---- */
{
  const o = sanitizeOps({
    parties: {
      "23": { n: 4, t: "6:30", name: "Smith" },
      "../etc/passwd": { n: 1 },
      "<script>": { n: 1 },
      "ok_id-9": { n: 999, t: "x".repeat(99), name: "y".repeat(200) },
    },
    who: { "9": { v: "z".repeat(500) }, "99": { v: "out of range" }, notanumber: { v: "no" } },
    merges: { "23+32": { on: "yes" } },
    junk: { drop: "me" },
  });
  eq(Object.keys(o.parties).sort(), ["23", "ok_id-9"], "only sane table ids are accepted");
  eq(o.parties["ok_id-9"].n, LIMITS.partyMax, "party size is capped");
  eq(o.parties["ok_id-9"].t.length, LIMITS.timeText, "time text is capped");
  eq(o.parties["ok_id-9"].name.length, LIMITS.nameText, "name text is capped");
  eq(Object.keys(o.who), ["9"], "section index must be in range");
  eq(o.who["9"].v.length, LIMITS.whoText, "section name is capped");
  eq(o.merges["23+32"], { on: true }, "merge flag is coerced to a real boolean");
  ok(!("junk" in o), "unknown top-level fields are dropped");
  eq(sanitizeOps(null), { parties: {}, merges: {}, who: {}, day: undefined }, "null body is harmless");
  eq(sanitizeOps("nope").parties, {}, "a string body is harmless");
}

/* ---- names off by default: they must never be written down ---- */
{
  const o = stripNames(sanitizeOps({ parties: { "23": { n: 4, t: "6:30", name: "Bhatt" } } }));
  eq(o.parties["23"].name, "", "guest name is dropped on arrival, not hidden at render");
  const s = mergeState(emptyState(), o, 1000);
  ok(!JSON.stringify(s).includes("Bhatt"), "the stored state contains no trace of the name");
  // and with storing enabled it survives
  const kept = sanitizeOps({ parties: { "23": { name: "Bhatt", n: 4 } } });
  eq(kept.parties["23"].name, "Bhatt", "when storing is enabled the name is kept");
}

/* ---- a full night, replayed out of order, converges ---- */
{
  const ops = [
    { parties: { "23": { n: 4, t: "6:00" } } },
    { merges: { "23+32": { on: true } } },
    { parties: { "23": { del: true }, "23+32": { n: 8, t: "6:30" } } },
    { who: { "0": { v: "Nate + Dee" } } },
    { parties: { "41": { n: 2, t: "5:45" } } },
  ];
  let a = emptyState(), t = 1000;
  ops.forEach((o) => { a = mergeState(a, sanitizeOps(o), t += 10); });
  const A = publicView(a);
  eq(Object.keys(A.parties).sort(), ["23+32", "41"], "the night ends with the right tables on the board");
  eq(A.merges, ["23+32"], "the pair is still pushed together");
  eq(A.who["0"], "Nate + Dee", "the section name stuck");
  eq(A.parties["23+32"].n, 8, "the merged table carries the party");
}

console.log(`  ${pass} passed, ${fail.length} failed`);
if (fail.length) { fail.forEach((f) => console.log("  FAIL " + f)); process.exit(1); }
console.log("  MERGE CORE OK");
