# Mo's Co-Work — project memory

Single-file training and money app for the team at Mo's A Place for Steaks (Greenwood, Indiana).
Built with Evan (back server there) in a Claude Cowork session, Aug 2–4 2026. This file is the
handoff so any Claude session can pick up where that one left off.

The one golden rule: **the newest thing Evan tells you always wins** over anything in the data
files, this doc, the original training vault, his old photos, or the restaurant's website.
Evan is the PRIMARY source — he works there and knows more than any document. The photo
archive ("Mo's Picture total from phone", 187 files) is MOSTLY OUTDATED — mine it for
things he has not spoken about (Points of Passion, side work posts, spec sheets), but
anything conflicting with what he said in chat LOSES to the chat. When unsure if a photo
is old, ask him. Only use the web when he asks. He updates the app by talking. You edit the
data files, rebuild, retest, and hand the file back.

## Two-way sync — whoever edits second pulls first

This app now has TWO editors: this Claude Code session (Evan's Mac) and Evan's Cowork
session (cloud container). Each has silently clobbered the other's work before. The loop
that stops it:

- **Claude Code: run `git pull` at the START of every session**, before any edit.
- **Cowork: before any edit round, fetch current repo HEAD** from
  https://github.com/aasenevan-dot/mos-app (public — read-only clone needs no
  credentials) and adopt any files that differ; the Mac side ships its own features
  (fuzzy search, jump bar, drink fixes). Never blind-extract a sync zip over mos-app/.
- **Before extracting any Cowork sync zip into mos-app/**, snapshot first:
  `git add -A && git commit -m "pre-Cowork-sync snapshot"` — then nothing is ever
  silently lost, only diffed.
- After merging a Cowork sync, re-run `python3 build.py && python3 test.py && python3
  test-sched.py` before pushing.

## Build and test

```
python3 build.py     # assembles index.html from the build/ parts (byte-stable)
python3 test.py      # Playwright smoke + golden math test (must pass before delivering)
```

`build.py` concatenates `build/1-head.html` + the five js parts, injects the logo/icon base64
and today's date, and closes the tags. `test.py` needs `pip install playwright` plus Chromium.
Never edit `index.html` directly — it is generated. Edit the parts:

| file | what lives there |
|---|---|
| build/1-head.html | all CSS, header, noscript + bootMsg fallbacks, nav skeleton |
| build/2-data-wine.js | wine list with Evan's verbatim table pitches |
| build/3-data-drinks.js | cocktails (verified against spec sheets), spirits, beer |
| build/4-data-food.js | menu, allergens (87 rows), specials + soups living lists |
| build/5-data-quiz.js | quiz banks, SALES constants (every tip-math number) |
| build/5b-data-sched.js | posted weekly SCHEDULE + 37-week SCHEDULE_HISTORY |
| build/6-app.js | every screen: tabs, search, quiz, all calculators |

## The money math (proven to the dollar against real graded checkouts)

All constants live in `SALES` in 5-data-quiz.js. The pipeline (`pipeMath` in 6-app.js):

- Credit tips = real Toast tips if entered, else 20.8% of team net sales. Banquets run a
  23% auto-grat (guests can add more on top) — confirmed 8/4.
- Toast withholds 2% of credit tips.
- Tip-outs are percentages of TEAM NET SALES, each line rounded UP to a whole dollar:
  bar 1% (briefly flipped to 0.1% on 8/5, then Evan corrected it back — it IS 1%, matching the graded sheet), busser 1.5%, expo 0.5%. Banquets add 3% — that 3% is Lillian's cut as banquet
  coordinator, so the team effectively keeps 20 points of the 23% before normal tip-outs.
- Polisher is flat: $10 for a front/back team, $5 for a solo (solo = cocktailer job).
  Most nights there is NO polisher — busiest nights only, usually just one (confirmed 8/4).
- No expo scheduled = no expo tip-out line that night (confirmed 8/4; the Sales Calculator
  has an Expo working? toggle). Bussers are essentially always on. Banquet sales tip out
  bar/busser/expo like all other sales, plus Lillian's 3%.
- Earned = pool minus tip-outs, cents dropped (floor).
- Split 50/50 front/back, whole dollars, the BACK takes the greater dollar when odd.
- A banquet is its own checkout sheet and envelope, same math, then the night combines.
- Reverse formula: team net sales ≈ (2 × one person's take) / 0.17384.
- Floor model: slices = teams + 0.7 per cocktailer. Avg $115 per person (Greenwood).
- Evan's cut line is $175/person (was $200; he moved it 8/6 — "more generous"): under it, taking the cut is fine; over it, work.
- Greenwood tax 8.96% ≈ 9% (7% Indiana + 1% Johnson County + 1% Greenwood food & beverage).
- Banquet reference block: $3,366 sales derived from a real $774.18 auto-grat ÷ 23%.

`test.py` carries two golden checkouts asserting this math. If Evan changes a rule on purpose,
recompute the goldens by hand before touching them.

## Standing rules from Evan (do not re-ask, do not undo)

- Weeks start WEDNESDAY. Any day-of-week list runs Wed → Tue.
- Normal fonts only. No cursive, ever. Brand: maroon #59201C, cream #F7EFE4. ROUNDED corners as of 8/6 (Evan: "Apple aesthetics") — cards/tools 16px, kpis/notes 14, chips stay pills; the old squared-corners flattener in 1-head.html is deliberately gone. Round it, don't restyle it.
- Ticket times: starters 5–12 min (15 max). Entrées 22–27 min. Soups, salads, desserts 5–7 min, 10 max. Home grid order: Starters first (Evan, 8/5). The old Manager-alert tile is gone — the $250+/Bordeaux fact lives in the wine-move card.
- Spelling: "Pittsburghed" (with the h). Books come from SevenRooms, not OpenTable.
- Leadership, off the restaurant's public team page (8/6): Head Chef **Miguel Garatachea**
  (was written as "Chef Miguel G"), GM **Mike Pavey**, AGM **Craig DeVaney**, plus Lillian
  Speedy on HR/banquets. They live in HOUSE.facts "Who runs the building" and are searchable.
- Cocktailer control is a plain dropdown None/1/2/3 — no employee names on it.
- Say "Avg $ per person" (with its plain definition), never "average check".
- Tip multiplier is numeric only — no occasion names attached.
- One self-contained HTML file. Everything inline. No localStorage (the Claude artifact
  viewer blocks it, and the file gets opened there).
- Test mobile first: 393×852, watch for sideways overflow (wrap wide tables in `.tw`),
  fixed bottom bar breaks if any element stretches the layout viewport.
- Evan dictates by voice. Decode phonetically before taking anything literally —
  real examples: "Robot Scooters" was Heart of Ribeye Skewers, "Jimmy Chury" was
  Chimichurri, "fagi-ano" was Pasta e Fagioli. When unsure, ask.

## Style rule (8/5): no provenance stamps in app text

Evan does not want "confirmed 8/4", "photo-confirmed", "per Evan", "confirmed by Evan",
or dated update banners ("July 11 update") anywhere in the app's visible text. Keep the
FACT, drop the stamp. Open questions may keep a plain VERIFY flag. Provenance lives in
this file and the chat, not in the app. Archive entries (Specials past) may keep their
dates — those are event history, which he okayed.

Current-week schedule display rules (8/5): Jeremiah and Gavin never show on the grid;
anyone whose whole week is blank/OFF is hidden too (the note that listed them was removed
8/6 on Evan's ask — they're just silently off the grid); an all-RO week
still shows. Applies ONLY to the current week — history renders exactly as posted. The
Fronts numbers render as their own "Covers · Sun M/D" row (the Sunday-night booked-covers
count from three days before the week starts, when the sheet prints); BQTs bar numbers
are banquet headcounts.

## Money tab (rebuilt 8/5 on Evan's ask)

The Forecasting Lab UI is REMOVED from the app — Evan doesn't want people seeing it. All
its knowledge stays in 5-data-quiz.js (SALES.read/rows/occasions/impliedChecks/log,
CONFLICTS, WALKINS) as back-knowledge for us. Do not delete it and do not resurface it
in the UI unless he asks. The old fc* forecast accordion merged into one NIGHT FORECAST
section (id sec-income): day picker over the posted week, books prefill from the
schedule's covers row, teams = min(fronts, backs) scheduled that day, cocktailers from
the schedule, who's-on roster names, and a staffLadder() staffing table (model vs
scheduled, "room to cut N"). ipTake() cut math is UNCHANGED — do not touch it without
recomputing goldens. staffLadder bands are v1 guesses anchored to real nights (3 teams
~$4.1k, 4+banquet ~$8.9k) — Evan will dictate acceptable staffing per night type; tune
the bands from his words, not from theory. Banquet quick math auto-grat defaults 23.

**Night Forecast MERGED (8/6, Evan's direct ask in Cowork — supersedes the 8/5
"simplified accordion" note, this is NOT a clobber):** Evan asked to combine the
forecast and the Everybody's Night accordion into ONE tool — "one big grid view",
tip % instead of the multiplier (multiplier deleted, he never used it), and the
busser/expo/bar money visible right off the take-the-cut decision. So: calcEX() and
the accordion are GONE ON PURPOSE, replaced by a single calcIP() + nightFor() engine
in 6-app.js. One input chain: day (prefills covers/teams/cktail/bussers/expo/bar from
the schedule) → books + walk-ins → avg $pp → Tip % (default 20.8) → optional REAL NET
override (ipNet — when typed it beats covers × spend) → counts. One output: verdict
banner, then People/Net/Team sales/Team earned/Front/Back/Bussers/Expo/Bar as one kpi
grid, then the staffing-model table. The 8/5 simplification survives inside it: no
hours, no wages, no polisher payout row (WAGES stays parked in 5-data-quiz.js), pools
split evenly per role, expo 0 = no expo line. The verified numbers still hold: net
8000 / 20.8% / 7 teams + 2 cktail / 2-2-3 counts → team 952, earned 164, 82/82,
busser 63, expo 22, bar 28 — test-sched.py asserts every one. Tripwire: if ipNet or
the merged grid vanish, THAT is the clobber — check calcIP()/nightFor(). The mobile
More-sheet control proxies (#shSzDn/#shSzUp/#shDark → header buttons) are untouched
and still the law.

## Handbook + Vocabulary (added 8/5)

Evan transcribed the official Employee Handbook; it lives as `HANDBOOK` (14 accordion
sections, faithful but readable) at the end of the How We Work tab, and the vocabulary
sheets as `VOCAB` in their own More tab (key: vocab). Both are in 5-data-quiz.js and in
global search. Known conflict handled in-text: handbook says 18% big-party grat, floor
runs 20% today — newest word wins, the handbook section says so. HR update 8/5: Darla McKnight is gone —
Lillian Speedy took HR (she's also Director of Sales/banquets). Say "Lillian" casually
in app text. The old HR phone/email (817-889-1155 / darlarmc@yahoo.com) STAYS in the
grievance section on Evan's call — both forward to Lillian. The handbook calls itself confidential
— the repo is public; Evan decides whether it pushes.

## Display + exact-night (added 8/5 evening)

Header controls: A− / A+ step body zoom through [0.85, 0.925, 1, 1.075, 1.15]; the Dark
button toggles `html.dark`, which remaps the CSS vars to a dark warm palette on the same
brand hues (oxblood/cream/gold — do NOT introduce new hues). No storage APIs allowed, so
both reset on each open — that's by design, don't "fix" it with localStorage. The
"Mined from the real Greenwood training handouts" note is deliberately removed — don't
reintroduce provenance notes. Night Forecast gained an "Exact night" accordion: floor
net (teams + cocktailers combined) + tip % → slices (cocktailer = 0.7) → pipeMath per
slice with real tips. Evan loves the private-room capacities line in Banquet quick math
(Smockton 70/125, Curry 72/125, Lounge 25, Vault 15, book through Lillian) — keep it.

## Everybody's-night rules (Evan, 8/5 late)

Wages: busser $5/hr, expo $10/hr, food runner $10/hr (WAGES const). Bar = tipped-minimum
wage ($2.13 placeholder — VERIFY real rate) + the 1% tip-out pool + their own bar-top
tips (not modeled — bar shown as a floor). COCKTAILER PAY = 50% of one team = same as
one server (T.earned/2). CKTAIL_WEIGHT .7 is ONLY how floor sales slice up — don't mix
the two. Polisher income = $10/team + $5/cocktailer when scheduled. Expo count 0 = no
expo pool, teams keep the line. The Everybody's Night accordion in Night Forecast takes
floor net + tip % + hours and prints every position; busser/expo/bar counts prefill from
the posted schedule day. Also 8/5: the porterhouse was NEVER wagyu — "Australian Wagyu
Porterhouse" renamed USDA Choice Porterhouse everywhere, old name archived in Specials
past ($150, not $180).

## Home grid + wine types (Evan, 8/5 late)

Before-you-walk-up grid: STARTERS FIRST (5-12 min, 15 max), then soups/salads/desserts,
entrees, checkback. The Manager-alert tile is gone — he hated the square; the $250+/
Bordeaux-glasses fact lives in "The wine move" card. Wine tab: every wine carries `v`
(varietal, WINE_V map in 2-data-wine.js) and `btg`. The category chip row is replaced by
a Serve row (all/glass/bottle) + a Type row (Cabernet, Red Blends, Pinot Noir, Merlot,
Other Reds, Chardonnay, Sauv Blanc, Pinot Grigio, Riesling & Moscato, Rosé, Bubbles) —
type filters cross bottles AND by-the-glass, which was the whole point. Pomerols count
as Merlot, white Burgundy as Chardonnay. New wines added later MUST get a WINE_V entry
(they'll fail the test if the type is missing).

## Locked 8/6 + distribution state

Comps come OFF team net before tip-outs; promos do NOT; gift cards DO hit net sales;
voids still open. Banquet 3% is ONLY for banquets booked through Lillian (23 = 20 + her
3) — walk-in big parties are NOT banquets. Esso Affo: FRONT server pours tableside.
Bartender wage $2.13 confirmed. Sweet & Salty confirmed NOT on tap; second line still a
mystery. Espresso $8 and loaded-potato +$3 are BEST GUESSES — keep the verify tags until
Toast confirms. Events are dated in Specials (8/13 Sangria, 9/8 golf, 9/17 Prisoner
dinner, RSVP Lillian@mosgreenwood.com — her real email, used app-wide now). "About this
app" note lives at the end of How We Work. STILL OPEN for distribution: voids, 45-day
$120?, espresso/potato confirms, primavera add-on prices, La Marca/Mionetto bottles,
tequila-page photo, the 13 chef questions (printable PDF made for Chef Miguel), staffing
bands (Evan owes numbers), hosting decision (repo is public — Evan choosing between
keeping it, private+file-sharing, or private+Cloudflare Pages).

## Study tab build-out (8/6, for distribution)

MC bank is now 151 questions (was 65) across topics: steak, food, wine, cocktail,
allergen, service, money, house, ops. HARD RULE for new questions: locked facts only —
never quiz an unverified price (no 45-day $120, no espresso $8 guess). o[0] is always
the correct answer; engine shuffles. Topic chips filter the bank (QTOPIC); the engine
runs on a swappable QBANK so games feed it generated questions: vocabQuiz() (10 from
VOCAB, wrong answers are other real definitions) and priceBlitz() (10 from live
MENU/COCKTAILS/BTG prices — distractors are neighboring real prices, so the game stays
current automatically). orderGame() is a tap-in-order greet-flow game (GREET_STEPS).
test-sched.py validates bank size/shape, lane purity, both generators, and a perfect
order-game run. Home tile says "Quiz & games."

## Privacy — this folder gets shared

The app is shared with coworkers and may sit in a PUBLIC repo. So:

- Evan's personal earnings, schedules, per-night history, and manager notes stay OUT of the
  app and out of this folder. That data lives in `../2026-08-04-mos-backtrace-worksheet.xlsx`
  (parent folder, gitignored pattern) — never copy it in here, never commit any xlsx.
- Everything about the Tequila Dinner was deliberately deleted. Do not reintroduce it.
- No dated "proof" references and no lounge-average claims — both were removed on request.

## Open items (Evan is chasing these at work)

- Big 8/4 verification round CLOSED: porterhouse ($150 USDA Choice, 15 oz strip + 8 oz
  filet + 25 oz bone), tomahawk (32 oz $180), A5 $25/oz, PD on menu, Marsala build,
  banquet 23%/Lillian 3%, shared fryer, wonton egg, kung pao = treat as peanuts,
  Advice From John = Orin Swift (not Buehler). Tomahawk Tuesday + 14 oz bone-in filet +
  six printed cocktails retired to archives.
- STILL OPEN (see 2026-08-04-allergen-chef-check.md in the parent folder): ponzu and miso
  soy-sauce wheat, blue cheese/crab dip mayo, demi and au gratin flour, calamari breading
  egg, Chicken Parmesan $39 entree real or not, Marsala/salmon prices, 45-day dry-aged
  price + oz, banquet minimums (ask Lillian). Newer opens: do comps/voids come off team
  net sales before tip-outs (Evan wants this chased); identity of the SECOND draft line
  (was a Transfusion, maybe cucumber vodka now — and is Sweet & Salty on draft or not);
  wine decanting threshold ($250+ = Bordeaux glasses is known, decant rule is not);
  photos owed: wine BTG, dessert menu, straight tequila, cut specials board.
- Facts locked 8/4 round 4: every steak is buttered by default but CAN be made fully
  butter-free on request; soup of the day is COMP with entrees ($4 upcharge to bisque or
  French onion); chili is off the menu for now; kung pao has peanuts; ponzu = regular soy
  sauce (not GF); iced tower CAN go GF (crackers/brioche/wontons ride separate); crab cake
  95% crab with breadcrumbs; meatballs = steak trim + breadcrumbs; brussels = balsamic
  glaze now; Marsala $35 / Bourbon Salmon $45 / Cajun Salmon $35; Chicken Parm $39 entree
  is real; celebration drop = free Sundae or comp cookie; sorbets off-menu; banquet
  minimums negotiated per event by Lillian; only one tap line (Smoked Draft OF).
- PHOTO ARCHIVE MINED 8/4 (all 187 read; catalog at ../archive/photo-catalog.md). New
  "How We Work" tab (key: house) under More holds: mission, 16 Points of Passion,
  Isaac's 11 Non-Negotiables, back + front server steps of service, expo side work,
  tableside mise en place master list, uniform + house facts. Enrichments: Farbuckle
  full show, tower pasta procedure, king crab setup, house salad build, ranch recipe
  flags, oyster warm/cold, K.D. + Kristen trivia, Nutty Martinez build, Buffalo Trace
  Dinner archived, premium-wine selling lines, +8 quiz questions (65 MC total).
- Evan will dictate his back-server SIDE WORK list and the manager CLOSING TASKS —
  side work goes under the More group, not a main tab (his call, 8/4).
- Service facts locked 8/4: pre-shift 4:15 daily (MOD runs it); busser waters, front
  greets/drinks/apps, BACK drops soup-salad and introduces themselves; bread ALWAYS with
  soups and salads; offer cracked pepper every soup/salad drop; course order apps →
  soup/salad → entree; MANAGERS open and pour all wine bottles; only TWO draft lines;
  checkout is hand math (Toast only totals non-cash); Chef Miguel G runs the kitchen;
  A5 show = manager cut, Hanzo knife, butcher's block, torch + rosemary salt, Kobe Hanzo
  steak knife presets; staffing floats 2-7 teams by covers, most days 3-4.
- Calibration: he'll bring Toast screens with guest counts and teams-per-night.
- DONE 8/4/2026 — published from Claude Code. Public repo: https://github.com/aasenevan-dot/mos-app
  Live app: https://aasenevan-dot.github.io/mos-app/ (his GitHub account is **aasenevan-dot**).
  After any change: `python3 build.py && python3 test.py`, then
  `git add -A && git commit -m "update" && git push` — the live link refreshes itself.

## Schedule tab (added 8/5, history added same day)

All schedule data lives in build/5b-data-sched.js: `SCHEDULE` (current posted week) and
`SCHEDULE_HISTORY` (37 weeks, 11/19/2025 - 7/29/2026, no gaps — every sheet since opening,
transcribed from 44 photos in Evan's "Schedules 11:25-7:26" folder by an agent team).
Cells are verbatim: blank = not scheduled, OFF = blacked-out box, RO/ro = requested off,
numbers = start times as written (345 = 3:45), trailing ? = hard-to-read photo. History is
AS POSTED — trades/call-offs/cuts happened after, and the tab says so. Weeks that existed
as two photos (5/20, 5/6, 4/29, 4/1, 3/25) kept the revised/fuller printing, noted in the
entry. 12/17 was stitched from a torn two-page sheet.

The tab renders: today's roster (re-checks the clock every minute, flips at midnight),
the current grid, then a history week picker with tap-a-day rosters. When Evan sends a
new week's photo: transcribe into a new SCHEDULE object, push the old one onto the FRONT
of SCHEDULE_HISTORY, rebuild. `test-sched.py` covers the roster, the midnight flip (real
62s wait), the off-week message, and the history browser — run it after any schedule change.

The master Excel (../2026-08-05-mos-schedule-history.xlsx — parent folder, NEVER in this
repo) mirrors the same data: stacked grids, a filterable every-shift sheet, and a week
index. NOTE: real first names + shifts are in the app file and this repo is public —
Evan decides what gets pushed.

## Delivery ritual after any change

Build, run test.py, then give Evan the fresh `index.html` (it also replaces
`Restaurant/index.html` and the dated html in the parent folder, and the "mos-cowork"
desktop artifact when working through Cowork). If the GitHub Pages repo exists, commit
and push so the live link updates too.
