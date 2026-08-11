# Shared floor plot — the backend

**Status: built and tested, wired into nothing.** The app is untouched. `index.html` does
not reference a single file in this folder, and `build.py` does not read it. Deleting this
whole directory would change the app not at all.

## What it is for

Right now the floor plot lives in each phone's `localStorage`. Two servers plotting the
same night see two different boards. This makes one board that every phone shares, live.

## How it works

One Cloudflare Worker, one Durable Object per **room**, and a room is one service day —
`mos-2026-08-12`. That gives the board a clean reset every night with nothing to remember
to clear, and old data expires on its own (a 36-hour alarm wipes the room).

Phones connect by WebSocket and get pushed the whole board whenever anything changes.
There is an HTTP fallback that polls every 8 seconds, because restaurant wifi drops and a
board that quietly stops updating is worse than one that visibly falls back.

Two rules do all the real work, and both are in `src/merge.mjs`:

1. **Last write wins, per key — not per document.** Two servers plotting different tables
   at the same moment must both survive. Whole-document last-write-wins would throw one of
   them away, which is exactly the bug that makes a shared board useless.
2. **The server stamps the clock.** A timestamp sent by a phone is ignored. One phone with
   a clock ten minutes fast would otherwise win every conflict for the rest of the shift
   and nobody would ever work out why. Server arrival order *is* the ordering.

Deletes are tombstones, because an absent key means "I have no opinion", not "remove it" —
without them, a cleared table would come back the moment a phone synced an older copy.

The client never merges. It sends what changed and adopts whatever comes back. One
implementation of the rules, on the server, is the whole point.

## Try it without deploying anything

```bash
node server/demo/build-demo.mjs && open server/demo/demo.html
```

Two phones side by side, sharing an in-page copy of the real merge code. Plot a table on
one and watch the other. There are buttons for the two cases that matter: both phones
editing the same table at once, and a phone going offline and catching up.

## Tests

```bash
cd server && node test/merge.test.mjs && node test/room.test.mjs && node test/client.test.mjs
```

84 assertions, no framework, no install. Worth knowing what each layer actually covers:

| File | What it drives | Count |
|---|---|---|
| `test/merge.test.mjs` | the merge rules directly — concurrency, clock skew, tombstones, junk input | 35 |
| `test/room.test.mjs` | the **real** `FloorRoom` Durable Object, with the Cloudflare surface stubbed | 30 |
| `test/client.test.mjs` | the **real** `floor-sync.js` talking to the **real** `FloorRoom` | 19 |

The room and client tests load the shipping files rather than a copy — a test that
exercises a re-implementation proves nothing about the thing that actually runs.

## Deploying it (needs your Cloudflare account)

```bash
cd server
npx wrangler login
npx wrangler secret put MOS_KEY      # invent a long random string; paste it when asked
npx wrangler deploy
```

Then set `ALLOW_ORIGIN` in `wrangler.toml` to the app's origin if it ever moves off
`https://aasenevan-dot.github.io`.

**With no `MOS_KEY` set, the service refuses every request.** Closed is the safe default —
an unconfigured endpoint should not be an open one.

**Cost:** this is sized to be free — roughly 30 phones, a few hundred writes a night. It
uses SQLite-backed Durable Objects (that is what `new_sqlite_classes` in `wrangler.toml`
means), which is the tier that has been free-plan eligible. Cloudflare changes pricing;
check the current Workers and Durable Objects pricing page before you rely on that, rather
than taking this file's word for it.

## Two things to be honest about before this goes live

**The key is a curtain, not a lock.** It has to travel inside the app, and the app is one
public HTML file. Anyone who opens the page source can read the key and write to the
board. What the key *does* buy: the endpoint is not open to a drive-by crawler, and
rotating it (`wrangler secret put MOS_KEY` again) instantly cuts off anyone who copied it.
What it does not buy is protection from a determined person who has the URL. Same shape as
the handbook password — worth naming rather than discovering later.

**Guest names.** The plotter has a name field, and a guest's name on a shared endpoint is
a real step up from a note on one phone. So `STORE_GUEST_NAMES` defaults to `off`, and off
means the server **drops the name on arrival** — it is never written down, not merely
hidden at render time. `test/room.test.mjs` asserts the stored state contains no trace of
it. Turn it on only deliberately, and consider initials instead.

## What this does not do

- No accounts, no per-person permissions. Everyone with the app can edit the board.
- No history or audit. It is a whiteboard, not a log.
- No offline queue in the client. `floor-sync.js` keeps `localStorage` working as the
  local copy; if a phone is offline its edits are local until it reconnects and pushes.
  The demo simulates a queue to show the shape; the shipping client does not have one yet.
- Nothing is encrypted beyond TLS in transit.

## Wiring it in, when you want it

Nothing below is done yet — this is the recipe.

1. Add `server/client/floor-sync.js` to the build as `build/7-floor-sync.js`, and add that
   filename to the explicit list in `build.py` (it names its parts, it does not glob).
2. Put the endpoint and key somewhere in the data files:
   ```js
   const SYNC = { url:"https://mos-floor-sync.<you>.workers.dev", key:"<the MOS_KEY>" };
   ```
3. Start it once at boot, after `renderFloor()`:
   ```js
   const svc = new Date();
   FloorSync.start({
     url: SYNC.url, key: SYNC.key,
     room: "mos-" + svc.getFullYear() + "-" +
           String(svc.getMonth()+1).padStart(2,"0") + "-" + String(svc.getDate()).padStart(2,"0"),
     onState(v){
       FPMERGED = v.merges; FPPARTY = v.parties; FPWHO = v.who;
       if (v.day != null) FPDAY = v.day;
       renderFloor();
     }
   });
   ```
4. In `fpSave()`, also push what changed. **Push the whole change as one op** — this is the
   detail that will bite otherwise: `fpMerge()` moves a party off the half onto the merged
   id, so it must send the delete *and* the new key *and* the merge flag together:
   ```js
   FloorSync.push({ parties:{ "23":{del:true}, "23+32":{n:8,t:"6:30"} },
                    merges:{ "23+32":{on:true} } });
   ```
   Splitting that across two pushes leaves a window where the board has the party on
   neither table.
5. Keep `localStorage` exactly as it is. It becomes the offline copy, and it is what makes
   the app keep working unchanged when the service is unreachable or not configured —
   `FloorSync.start()` returns `false` and does nothing if `url` or `key` is missing.

`FloorSync.status()` returns `off` / `connecting` / `live` / `polling` / `error`, so the
floor plan can show a small dot telling the floor whether they are on the shared board or
just their own phone. Worth doing: a shared board that has silently stopped sharing is the
one failure mode that would actually cost a table.
