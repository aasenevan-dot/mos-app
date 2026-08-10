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
Perfection round same day: length chips (10/25/whole bank, QLEN),
TODAY'S 10 (date-seeded via mulberry32 — the same ten for the whole team all day, order
still shuffled per person), a progress bar (.qprog), grade lines on the results screen,
a real 60-second countdown on Price Blitz (QTIME, cleared by startQuiz/finish), two more
auto-games (garnishMatch from live garnishes, nameBottle from live wine pitches with
same-varietal distractors), and orderGame is generic (ORDER_SEQS: greet 5 steps,
allergy protocol 6 steps). Games are .qa cards under their own Games header. One dupe
removed (6+ grat — the original keeps it, now with the must-tell-the-guest clause).
test-sched.py validates bank shape, lane purity + lengths, daily determinism, every
generator, the armed blitz timer, both order games run perfect, and the progress bar.
Home tile says "Quiz & games."

## Oysters (Evan, 8/6) + what still needs asking

Menu answer is **Blue Point** — the classic East Coast oyster, historically from Blue
Point on Long Island, now used broadly across Long Island Sound / Connecticut. Mild,
balanced, clean salt, sweet finish, crisp. What actually shows up most nights is bigger
**New Jersey** stock out of **Cape May** — thicker, meatier, brinier. Evan also names
"Violet Skies" for the big Jersey ones; that is a purveyor/varietal brand and the exact
spelling has NOT been confirmed off a box or invoice — do not print it in the app until
it is. Current app text says Blue Point as the menu answer, Cape May New Jersey as the
reality, and tells the server to say what is actually in the box tonight.

**Oysters Rockefeller** added to Starters and the allergen matrix. Baked/broiled on the
half shell: butter, breadcrumbs, spinach-and-herb green puree (parsley, tarragon),
Parmesan, dash of hot sauce, on a pan over a bed of salt with lemon, oyster forks.
Allergens differ from the raw oysters — dairy, gluten, allium, capsaicin, plus alcohol.

ASK NEXT SHIFT (Evan's list):
1. **Rockefeller price** — app carries $45 as a placeholder, flagged VERIFY. Evan guessed
   $35 then $45; get the real number off Toast. Do NOT quiz this price until confirmed.
2. **Does our Rockefeller puree actually contain a liqueur?** The classic recipe does;
   ours is unconfirmed. This is an alcohol-allergy answer, so it matters.
3. **Exact oyster varietal names off the box** — confirm "Violet Skies" and Cape May, and
   whether the Blue Points really are Blue Points or just called that on the menu.

## Bottom-bar Food Menu icon — do not revert (Evan, 8/6 and again 8/7)

`BOTTOM`'s Food Menu slot uses `ICONS.menu` — the SAME fork-and-spoon SVG as
`QAICONS["menu|"]` on the Home tile. It must NOT be the star. Evan asked for this twice;
a Cowork round put the star back in between, which is how it got asked for twice. The
star stays defined in ICONS, unused, for a specials section inside the food menu later.
If you are syncing and see `["menu","Food Menu","star"]`, that is the regression.

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

## Menu-bible enrichment round (8/6)

Evan supplied a 61-page transcription of the old training "menu bible" (Prime 47-era —
same company, merged; leave the old branding in the past). We mined it for prep detail,
ingredient builds, pitch logic, and service cues and rewrote most food descriptions with
it. RULES USED, keep following them: chat-locked facts ALWAYS beat the manual (brussels =
balsamic, ponzu not GF, kung pao HAS peanuts, porterhouse = USDA Choice $150, miso cure
48-72h, A5 $25/oz, bisque $11, current prices beat manual prices everywhere); manual
allergens are UNRELIABLE (it missed egg on crab cake, fin fish on salmon, gluten on
primavera linguini) so allergen changes were ADD-ONLY (added: egg on crab dip + au gratin,
fin fish on shrimp-cocktail Worcestershire, nightshade on bisque tomato, capsaicin on goat
cheese cayenne, tree-nut caution on kung pao); never cite the manual in app text.
Evan verified the open items same day: kung pao = treat as BOTH peanut and tree nut
(which one exactly is a chef question); crab dip = corn tortilla chips with cajun dusting;
miso seabass keeps brussels + coconut risotto; Caesar anchovies are an OPTIONAL
no-upcharge side and bonito flakes are in the dressing (bonito = confirm with chef);
lava-cake tableside flambe is REAL (alcohol flag added); brown-butter dry-ice show is
REAL (hot water over dry ice in the bowl); goat-cheese tableside honey REAL;
Filet & Lobster $105 / Twin Tails $100 CORRECT as-is; green beans + seared blackened
scallops ARCHIVED (allergen rows marked, past-specials entries added); Steak 47 = 4 oz
filet base, upgrades price as filet price + the $25 topping (6 oz $79, 10 oz $104) —
the shrimp/scallop U-sizes are unconfirmed (old sheet U-10/U-12, Evan remembers U-5).
Still out from the bible on purpose: blackened-tuna starter, bone-in center-cut ribeye,
truffle mash as its own side — old dishes, not current.

## The Mo's Book — now IN the app (8/6 late)

Evan's ORIGINAL 3-page Mo's Training Itinerary (the opening-team plan, ~18 hrs) became
"The Mo's Book": a 12-chapter training book whose table of contents IS that itinerary
(Start Here, Day 1 Orientation → Day 10 Friends & Family, The Get List). It reads INSIDE
the app now — How We Work → the book card → contents → tap a chapter → Prev/Next.

**Editing workflow — book.md is the master, never edit 5c-data-book.js:**
`book.md` (repo root) → `python3 mkbook.py` → writes `build/5c-data-book.js` (`const BOOK`,
[{t,plan,h}]) → `python3 build.py`. mkbook.py splits chapters on `# `, converts `##`/`###`
to .bkh/.bkh2, `- ` to .steps lists, `**bold**` to <b>, and "STILL TO GET" lines to
.getline callouts. Chapter HTML is pre-escaped and injected RAW in 6-app.js — never esc() it.

Reader code lives at TOP LEVEL in 6-app.js (between build() and BOOT), not inside build(),
because the contents rows and nav buttons use inline onclick and need real globals:
`openBook(i)` (no arg = contents), `closeBook()`, `bkShort()`, `var BOOKCH` (no initializer).
The house tab wraps its old content in `#houseMain` and the reader renders into `#bkWrap`.
Book chapters are searchable (they route to the house tab).

**The book is DOWNSTREAM of app facts.** App data updates first; book text only on request.
Fine-dining verbiage layer is deliberate ("less tender," never "tough"; "my pleasure," never
"no problem"). Gaps are marked STILL TO GET in-text and collected in the Get List chapter —
floor plan with table+seat numbers, opening handouts, gift-card how-to, banquet count sheets,
tequila page, original handouts and tests, mock-serve checklist. PDF/markdown copies also
live on Evan's Mac (Restaurant/2026-08-06-mos-book.pdf and .md).

## Meals & Moments (8/6) — off-site community meals

`OFFSITE` + `OFFSITE_NOTE` in 5b-data-sched.js, rendered by `offsiteBlock()` in the Schedule
tab right under live music. Same pattern as LIVE_MUSIC: dates stored "M/D", year comes from
SCHEDULE.year, anything already past drops off by itself. It is a LIST not a map because two
events share 8/9. Current: 8/9 Heart & Soul Church (Fishers) 12–2, 8/9 Real Life Church
(Greenfield) 7–9, 8/23 Life Church (Fishers) 11:30–1. Volunteer contact is Yaris,
admin@prime47carmel.com / 317.703.4284. Searchable under "Meals & Moments".

## 8/7 round — menu corrections, mise en place, desktop header

- **45-Day ribeye renamed** to "45-Day 22 oz Dry-Aged Bone-In Ribeye" (ounces in the NAME,
  so the price column is just the price). Description now tells the dry-age story: moving
  air pulls moisture and concentrates the beef, enzymes break proteins into amino acids and
  soften connective tissue → deep nutty brown-butter richness. Price still VERIFY.
- **Seasonal oysters presentation:** bed of ice, dry-ice smoke out of the middle (hot water
  sets it off), Tabasco + Zesta crackers, cocktail forks already on the table before it lands.
- **Wagyu tacos:** light balsamic vinegar glaze over the top — that glaze IS the sauce.
- **NEW `HOUSE.mise`** (5-data-quiz.js) → "Mise en place — what goes down with what"
  accordion in How We Work, above the tableside list. 7 groups: preset-before-the-food,
  starters, soup/salad/bread, steaks and entrees, sides, desserts, tableside shows. Shape is
  [title, subtitle, [lines]] and lines carry HTML. Searchable under "Mise en place".
  Evan's locked rule: the COCKTAIL FORK is preset BEFORE the plate for shrimp cocktail, king
  crab legs, oysters, both towers, the 5 oz lobster tail add-on, and the twin tails entree.
  CSS gotcha: `.steps li b` is display:block by design (label-led lists) — for mid-sentence
  emphasis use `<b class="inl">`, which the new `.steps li b.inl` rule keeps inline.
- **Desktop header cleaned:** A−/A+/Dark are OUT of the tab row (they crowded it and the row
  scrolled). The buttons still exist inside `<div id="hdrCtl" hidden>` because the More sheet
  clicks #szDn/#szUp/#darkT by id — do NOT delete them. Desktop tab row now wraps+centers
  with 11.5px/8px sizing, mask fade off, hwrap max-width 1280: all 12 tabs visible on one row
  at ≥1280, a balanced two rows at 1024, never a sideways scroll.
  TWO CSS TRAPS hit here: (1) the `@media(min-width:769px)` block lost its closing brace and
  silently swallowed the dark-mode rules — always re-check brace balance after editing head
  CSS; (2) `@media(pointer:coarse)` sets big nav buttons and comes later in the sheet, so a
  touchscreen laptop/iPad-landscape wrapped the row — there is now a min-width:769px override
  placed AFTER the coarse block to win it back. Keep that ordering.

## The picture project (8/7) — dish photos in the app

Evan started a standing project: every new item gets a photo, and we keep a running
have/don't-have list. **Two hard rules from him: (1) NO photos in the Study & Quiz tab —
ever; test-sched.py guards this across all eight quiz/game modes. (2) Never write filler in
the app about missing photos ("more coming soon") — a missing photo just renders no image
slot, silently. Also do not put photo-project meta (sourcing, counts, the shot list) in the
app at all.**

Source folder is Evan's Mac: `Desktop/Mos-Dish-Photos` — "By dish name/" (37 originals),
"Web ready/" (slug names + 260px square thumbs), photo-index.csv, README.txt. They were
photographed out of the printed menu binder for the guest app, so they carry paper grain;
real plate photography is the eventual upgrade.

**Pipeline:** stage the square thumbs → `python3 mkphotos.py` → writes
`build/5d-data-photos.js` (`const PHOTOS`, keyed by the EXACT menu item name → 200px q70
jpeg data URI) → `python3 build.py`. Photos are embedded, not linked, because the app is one
self-contained file — that costs ~450KB and puts index.html a touch under 1MB. If it ever
needs to shrink, drop PX/Q in mkphotos.py; 180px q70 saves ~80KB. `ALSO` in that script lets
one photo serve a second item (Filet Mignon covers the kids 4 oz).

**UI:** 62px square thumb in the left of each Food Menu card (`.crow.hasimg` + `.dishimg`),
tap opens a lightbox (`#lb`/`#lbin`, `openPic(name)`/`closePic()`, top-level functions
because the thumbs use inline onclick; backdrop click and Escape both close). A dish with no
photo renders the plain header row — no placeholder, no note.

**The shot list:** `python3 mkshotlist.py` regenerates
`<date>-mos-picture-shot-list.md` from live app data — have / reshoot / never-shot /
not-a-plate, plus the cocktail list as the next wave. RESHOOT and SKIP are hand-maintained
dicts at the top of that script. Regenerate it whenever the menu or the photo set changes.
Status at creation: 38 of 91 menu items covered, 5 need reshoots, 47 never shot.

## 8/7 later — Food Menu absorbs Specials, compact rows, ranch recipe

- **The Specials tab is GONE.** All of it merged into the Food Menu tab, which now sits in
  the Specials slot on the bottom bar (`["menu","Food Menu","star"]`) and is titled
  "Food Menu & Specials" in the top nav. `#p-specials` no longer exists — every specials
  search hit routes to `"menu"`, and "specials" came out of the addJumps list.
  Order in the tab: Running right now (SPECIALS_ON minus events) → Coming up (the dated
  events) → rotating entree specials → steak temps → A5 pitch (now a collapsed accordion,
  it used to eat half the screen) → the menu sections → standing soups → SOTD archive →
  dressings → RECIPES → off-menu cuts → past specials → the living-list note.
- **Compact rows, borrowed from the guest app** (Evan likes that pattern). `mCard()` builds
  every food/special card: thumb + name + price always visible, description clamped to two
  lines with a chevron, `mToggle()` opens the full text and the tag. Only rows whose
  description runs past 105 characters get `.canopen` — short ones just read straight
  through with no chevron. Tapping the THUMB still opens the lightbox (stopPropagation on
  the image so it does not also toggle the row).
- **Sea Scallops photo REMOVED** — it was a different dish (corn, not butternut puree).
  Dropped from mkphotos.py DISHES; logged in mkshotlist.py RESHOOT so it stays on the list.
- **Short Rib Pasta and Stuffed Chicken Breast are ARCHIVED** — off the menu. Same treatment
  as Forest Mushrooms: entry stays with "ARCHIVED — off the menu" leading the description and
  an "Archived" tag, allergen row noted, and both added to mkshotlist.py SKIP.
- **NEW `RECIPES`** in 4-data-food.js — house spec cards, rendered as accordions near the
  dressings. First one is the fresh ranch. Card allergen lines are NOT gospel: the ranch card
  says dairy only, but it is built on mayo, so egg is flagged too and the note says why.
  Adding another card = one more object in RECIPES.
- Test note: the desktop tab-count check now reads `TABS` off the page instead of hardcoding
  12, so removing or adding a tab does not fail it.

## 8/7 round 2 — Food Menu redesigned guest-app style

**Layout, top to bottom:** "★ Specials running right now" → "Not running right now" (the two
rotating salmon, each tagged so nobody pitches one that is off) → the menu sections, each with
its own jump chip → Soups → Dressings → RECIPES → **Archives** (a set of CLOSED accordions:
the full SOTD archive, off-menu cuts, past specials) → the living-list note. Reference material
now lives where it belongs instead of at the top: steak temps are a closed accordion INSIDE
"Prime 47 Cuts & Wagyu" (via `SEC_EXTRA`), and the A5 pitch opens from the Japanese A5 dish
itself (via `DISH_EXTRA`). Do not put either back at the top of the tab.
The jump-bar chips come from `addJumps("menu")` — do NOT add a second chip row, that was tried
and duplicated. Note for tests: chip labels repeat the section names, so section ORDER must be
measured from `.sechead h2` elements, never from innerHTML indexOf.

**Dated events moved OUT of the food menu.** New `EVENTS` in 5b-data-sched.js + `eventsBlock()`
renders them on the Schedule tab above live music, same M/D + drop-off-when-past pattern.

**Data:** towers are now "Semi-Pro $98 / Baller $190" — Semi-Pro is 6 oysters, 3 shrimp, ~½ lb
crab plus the tuna salad and lobster salad (those two come with both sizes and are NOT portioned
in the copy); Baller doubles the counted items; the roasted tower's Semi-Pro is half the seafood.
Porterhouse (both the USDA Choice and the old Australian Wagyu archive entry) = roughly a 26 oz
strip, 12 oz filet, 10 oz bone, varies with the cut. Chili line leads with the $4 soup-course
upcharge. 10 soups added to SOTD (18 total) and Poblano → Roasted Poblano. Chicken Marsala moved
from rotation to SPECIALS_PAST. Ranch got `tip` (fries pairing), truffle fries and the Prime Beef
Burger both carry a ranch suggestion.

**Search audit (8/7)** — real gaps found and fixed, keep these: `RECIPES` is searched now;
three synthetic "Money tool" entries route plain-language money questions to the calculator;
day-of-week roster search answers "who works friday" (the sheet abbreviates to TWO letters —
"Fr" — so match on `slice(0,2)`, a three-letter compare silently matched nothing); `matchesNum()`
is a second matcher that IGNORES bare numbers, because "how much do i make on 4000" was being
killed by the 4000. Synonym map grew (percentages→percent, ounces→oz, works→schedule, etc).
Audit script pattern: run ~45 real server phrasings and assert none return zero.

**`mkquestions.py`** now generates the open-questions PDF AND appends the pictures-needed list,
both pulled from live app data so they cannot drift. RESHOOT/SKIP dicts are hand-maintained in
both mkquestions.py and mkshotlist.py — keep them in step.

**Open naming question:** Evan asked for a dinner listed beside the Buffalo Trace dinner that
sounded like "keelah". Not guessable — it is on the questions PDF for him to confirm, and
nothing was written into the app.

## 8/7 QC round — cleanup, previews, wine move, protocol

- **`qc.py` is NEW and should be run after any data edit** (`python3 qc.py`, before the test
  suites). It catches what a blanket find-and-replace breaks: empty prices/descriptions,
  duplicate dishes, PHOTOS/LEADS keys pointing at nothing, allergen flags outside
  ALLERGEN_LIST, provenance stamps leaking back into rendered data, WINE_MOVE naming a wine
  that is not on the list, an item both running and archived, duplicate soups. It earned its
  keep immediately — a blanket `"$35"` → `""` replace silently wiped the A5 Nigiri PRICE
  while cleaning a tag. Never blanket-replace a bare price/tag string again.
- **Tags cleaned.** "Menu marks GF" is gone everywhere — the tag is just **GF**, and a legend
  at the foot of the food menu explains it is the printed menu's mark, not a GF kitchen.
  Tags that merely repeated the allergen row (e.g. "Dairy, egg, gluten") were removed, and
  the risotto no longer says "NOT vegetarian" because the description already says chicken stock.
- **`LEADS`** (4-data-food.js) — the one line a collapsed menu row shows. Keyed by dish or
  special name; anything without an entry falls back to `firstLine()`, the item's own first
  sentence. Rule enforced by test: no preview over ~115 chars and none cut off mid-word.
  If a description gets longer, give the item a LEAD rather than letting it truncate.
- **Homepage:** the "Three answers people miss" tile is REMOVED. The wine move is now a real
  pre-table card built on `WINE_MOVE` in 2-data-wine.js — three by-the-glass pours (Post &
  Beam Chardonnay, Belle Glos Pinot, Caymus Cab) framed lighter-and-smoother vs
  bigger-and-richer, the bottle logic in Evan's words (two glasses with a refill coming = a
  bottle; three glasses = a bottle every time, and the rest gets corked to take home), three
  step-up bottles, and the rule that a MANAGER opens and pours every bottle with $250+ getting
  Bordeaux glasses. Training anchors stay at the bottom — Evan likes them there.
- **Allergy protocol reordered and shortened to 6:** ask → ring it in Toast → back server →
  expo → chef → manager. The old "never guarantee anything from a study sheet" step is
  DELETED (that caution still lives on the allergen tab's warning note). The allergy
  order-game recap was updated to match; it reads PROTOCOL directly so it stays in step.

## 8/7 round 3 — regions, Reference tab, drinks archive, Spinalis

- **`REGIONS` rewritten** (2-data-wine.js) — now [region, short why-it-matters, the longer
  explanation]. Column 2 is capped at ~46 chars ON PURPOSE so it can sit beside a wine name
  ("warm and dry", "fog-cooled", "thin soil, high up", "cool, volcanic soil"). A test enforces
  that length. Column 3 explains the CAUSE, not just the taste — that was Evan's ask: what the
  place actually does to the grape. Individual wine `r` fields carry the same idea in
  parentheses where useful. Removed the last "added on the 7/3 sheet" stamp (Dona Paula Malbec).
- **NEW tab: "Reference & Archive"** (`extra`, last in TABS, reached through More). Holds Wine
  of the Week (MOVED off the wine tab), the region cards, archived cocktails, the resolved
  conflicts table, and the private rooms. Everything is a CLOSED accordion — same feel as the
  food menu. This is where good-but-not-shift-critical material goes from now on; do not delete
  content to declutter a tab, move it here.
- **Archived cocktails no longer appear under "All drinks"** — `drinkFilter.grp==="all"` now
  excludes `grp==="verify"`, so they only show when the Archive chip is tapped. People were
  reading them as orderable.
- **The header logo is a home button** (`#brandHome` → `go("shift")`). It is a real `<button>`
  now, styled flat; keep it that way for keyboard and screen-reader users.
- **Spinalis is TWO entries:** "Spinalis / Ribeye Cap" at $14/oz as a cut special (runs six
  days) and "Spinalis Sunday" at $10/oz as a weekly feature, sitting next to Ladies Night.
  The porterhouse, the tomahawk, the spinalis and the A5 all say a MANAGER cuts them tableside.
- Both rotating salmon specials now carry "? VERIFY price".

## 8/7 round 4 — Claude Code merge, plus one archive cleanup

Evan did a round in Claude Code on his Mac and pushed it. Cowork cloned HEAD (`d7eb221`),
diffed 13 files, confirmed every marker from the previous Cowork round was already in the repo
(`brandHome`, `p-extra`, `WINE_MOVE`, `grp!=="verify"`, `LEADS`, `mlead`, `fog-cooled`,
`Spinalis Sunday`), and adopted Claude Code's five differing files wholesale. Nothing from
either side was lost.

**What came from Claude Code — do not revert any of this:**
- Caymus Napa Valley repriced $160 → $155 in both `WINES` and `WINE_MOVE`.
- "Ahi Tuna & Wagyu Beef" moved out of Surf & Turf into `SPECIALS_PAST`, tagged
  "off the current menu".
- `PROTOCOL` condensed from 6 steps to 3: ask what kind of allergy → ring it in Toast →
  tell your back server, expo, the chef and a manager.
- New `SPECIAL_DAYS` map + `SPX` render logic: specials are gated by weekday, and anything
  not running today drops below the Kids Menu under "Not running right now".
- **The Food Menu tab icon is a fork and spoon, NOT a star.** A previous Cowork round
  reverted this once already. Leave it alone.
- The "Chef Miguel Garatachea's kitchen" bullet was dropped from FLOW.
- `test-sched.py` made machine-portable with `pathlib` — no more hardcoded paths.

**What Cowork added this round — one consistency pass, nothing else:**
- Archived dishes no longer sit inside the live menu shouting "ARCHIVED". Short Rib Pasta,
  Stuffed Chicken Breast and Forest Mushrooms moved out of their menu sections into
  `SPECIALS_PAST` with the tag "off the current menu" — the same pattern Claude Code used for
  Ahi Tuna. They now live under the Archives dropdown at the bottom of the Food Menu.
  Menu items 94 → 91.
- Their allergen rows STAY (a server still has to answer for a dish someone remembers). The
  note now opens with a plain "Off the menu." instead of "ARCHIVED — off the menu."
  Ahi Tuna, Seared Blackened Scallops and Roasted Green Beans were normalized to match.
  The word ARCHIVED no longer appears anywhere in the food data.
- `LEADS` entries added for the three moved dishes so their collapsed previews stay under the
  115-char rule the test enforces.
- **Two tests were too strict and are now correct:** the PHOTOS-orphan check in both `qc.py`
  and `test-sched.py` only looked at `MENU`, so a photo of an archived dish read as an orphan.
  Both now accept `SPECIALS_ON` / `SPECIALS_ROTATION` / `SPECIALS_PAST` too, because
  `mCard()` renders those cards with `dishPic()` exactly like menu rows.

Green after the merge: qc.py CLEAN (91 menu items, 88 allergen rows, 37 photos, 44 leads,
18 soups, 3 protocol steps, 55 dishes still without a photo), build 1,036,813 bytes,
test.py ALL GOOD, test-sched.py ALL GOOD.

## 8/7 round 5 — Claude Code merge #2, the one drink list, flags, and the slideshow

Second Claude Code round adopted from repo HEAD `71f5fe6` ("Shorter section names, menu
restructure, flags out of the dropdowns"). The repo already had every Cowork round-4 marker,
so all four differing files were adopted wholesale.

**From Claude Code — do not revert:**
- **MENU restructured 10 sections → 7:** Starters (Seafood Towers folded in), Soup & Salad,
  Entrees (Prime Cuts + Surf & Turf + Exclusives merged), Accessories, Desserts, Lounge,
  Kids Menu. Section names are SHORT on purpose.
- **`ENHANCE` left MENU** and is now one table opened from the top of Entrees, the way the
  steak-temperature table rides with the cuts. Ten rows.
- **Flags ride beside the dish name** (`.mflag` chip) instead of hiding in the dropdown.
- The Spirits & Beer tab was removed; its content moved onto the Drinks tab.
- Section headings renamed: Every Bottle, Pairing Finder, Go-To Pitches, Regions, Garnishes,
  Flavors, Drink Menu, Checkout, Splits, Specials, Old Specials.
- The three standing soups lost their section heading and are a one-line footnote now.

**Cowork fixed a real CSS bug in the adopted head.** The flag comment was written INSIDE the
selector — `.mitem /* ... */\n.mflag{...}` — which CSS parses as the descendant selector
`.mitem .mflag`. Result: flag chips inside the Enhancements table got no chip styling at all
(transparent, no border, 13.2px instead of 10.5px), and `.mchev` lost its `.mitem` scope.
Comment moved above the rule. **Rule: never put a comment between a selector and its brace.**
The chip length cap is now the named constant `FLAGMAX` (33) in 6-app.js — one place, used by
both `mCard()` and the Enhancements table.

**The Drinks tab is ONE organizer now (Evan 8/7).** It was a cocktail grid followed by eleven
separate bottle tables — bourbon, Bardstown, high-end whiskey, Tennessee, scotch, cognac,
tequila, draft, cordials, coffee, beer. Evan: *"how do we have the wine organizer with every
bottle? We need every drink here... It needs to pretty much copy the layout of it."*
- `buildDrinkIndex()` flattens COCKTAILS + SPIRITS + BEER into one `DRINKS_ALL` array of
  uniform cards. 136 drinks.
- Filter chips (`DRINK_CATS`) plus a price row (`DRINK_BUDGETS`), mirroring the wine tab.
- `drinkCard()` takes the uniform shape and drops empty rows, so a bottle with only a
  descriptor and a cocktail with a full build render as the same object.
- `DRINK_NOTES` holds the four rows that POINT somewhere instead of naming something pourable
  (the draft Old Fashioned duplicate, "anything else on tap?", the missing tequila page, the
  coffee-cocktail cross-reference). They render as notes under the grid, not as cards.
- Only three headings left on the tab: Garnishes, Flavors, Drink Menu. A test enforces that.

**Flags earn their place (Evan 8/7).** *"Flags need to be important."* GF stays. Removed:
U-6, 95% crab, trim + breadcrumbs, dry aged (the name says it), biggest side upsell,
celebration play, new on the menu, cold water, GF (base), the Moscato pairing, and the chili's
second "off menu". Rewritten: the 45-day ribeye says **Manager cuts tableside**; the white
cheddar mash says **GF · upsell truffle or wasabi $3**; the lava cake is plain **GF**.
Long sales notes moved into descriptions where they belong.

**Utensils live in the description now, not a dropdown.** Big spoon on the au gratin, lobster
mac, truffle cauliflower, risotto, creamed corn, creamed spinach, Mo's cookie, Mo's sundae,
creme brulee and the lava cake. Spatula on the celebration cake, cheesecake and carrot cake.
Big SERVING spoon on the white cheddar mash. The baked potato gets a **bread knife** and is
cut down the middle. Asparagus leads with hollandaise in a ramekin and comes with tongs.
Truffle fries and the burger come with **ketchup** (so does anything with fries). The ahi
bites and the A5 nigiri get two metal Japanese chopsticks **PER PERSON**.

Other menu changes: the lava cake has NO ice cream. "Celebration drop (free)" became its own
dessert, **Celebration Sundae** — caramel, dark rum caramel, hot milk chocolate, and it is NOT
the Mo's Sundae. Sorbets and pistachio gelato moved to the archive. The "Every side shares"
row is gone. "Accessories / Sides" is just **Accessories**.

**NEW: the training slideshow, and it shares ONE source with the PowerPoint.**
- `mkdeck.js` builds `2026-08-07-mos-training-regiment.pptx` — 79 slides following the original
  itinerary, with 13 PLACEHOLDER slides that say "PLACE PICTURE OF ___ HERE" and name the shot.
  Those are the shot list, not filler; Evan fills them as the material comes in.
- While it builds, it RECORDS every slide as structured content to `deck-content.json`.
- `mkslides.py` turns that into `build/5e-data-deck.js` (`const DECK`). **Never hand-edit it.**
  To change the slideshow, edit `mkdeck.js` → `node mkdeck.js` → `python3 mkslides.py` →
  `python3 build.py`.
- `openDeck(i)` / `closeDeck()` render it in How We Work, one slide at a time, with a contents
  list, a progress bar and prev/next. Same top-level-declaration rule as the book: inline
  onclick needs globals, and `var DECKI` has NO initializer.
- The entry card sits directly under The Mo's Book card, which is where Evan asked for it.
- The book's "Built on the original Mo's Training Itinerary…" blurb is DELETED. Do not add it back.

Green: qc.py CLEAN (78 menu items, 88 allergen rows, 37 photos, 44 leads, 3 protocol steps),
build 1,122,345 bytes, test.py ALL GOOD, test-sched.py ALL GOOD (now also covers the one drink
list, retired flags, utensil text and all 79 slides).

## Prices: the 8/10 pre-shift note supersedes the 8/4 round

Evan photographed the pre-shift note (IMG_5983) and confirmed every line of it. Three
prices on it CONTRADICT the 8/4 verification round, and the note wins — his newest word
beats any document:

| Item | 8/4 said | 8/10 note, confirmed |
|---|---|---|
| 48 oz USDA Choice Porterhouse | $150 | **$170** |
| 32 oz Australian Wagyu Tomahawk | $180 | **$140** |
| 45-Day 22 oz Dry-Aged Bone-In Ribeye | $120 (VERIFY) | **$110** |

Also closed off that note: both rotating salmons are **$45** (the Cajun one had been
carrying "$35? VERIFY"). Bourbon salmon is Buffalo Trace glaze with "gb" and truffle
cauliflower; Cajun is squash, zucchini, shallots, cajun butter. The "gb" abbreviation is
NOT expanded anywhere — do not guess it.

STILL OPEN from that note: a **Denver cut** is listed as "same price" — same as WHAT is
not stated, so it is deliberately not in the app yet. Chuck prime, fattier, heartier
belly, less marbling, served r/mr/m with "t = gamey".

The archived Tomahawk Tuesday package stays at $180 — that was the package price when it
ran, and it is history, not a live price.

## Spanish mode — content changes need a dictionary update

`build/5g-data-es.js` maps English -> Spanish for every visible string. It is generated by
`mkes.py` but is hand-maintainable. **When you change an English string, update its ES
entry**, or that string silently reverts to English for Spanish users. A missing entry
never breaks anything, it just shows English — which is safe, but it is also invisible,
so nobody notices the drift.
