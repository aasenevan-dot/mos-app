# Mo's Co-Work — project memory

Single-file training and money app for the team at Mo's A Place for Steaks (Greenwood, Indiana).
Built with Evan (back server there) in a Claude Cowork session, Aug 2–4 2026. This file is the
handoff so any Claude session can pick up where that one left off.

The one golden rule: **the newest thing Evan tells you always wins** over anything in the data
files, this doc, or the original training vault. He updates the app by talking. You edit the
data files, rebuild, retest, and hand the file back.

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
| build/4-data-food.js | menu, allergens (75 dishes), specials + soups living lists |
| build/5-data-quiz.js | quiz banks, SALES constants (every tip-math number) |
| build/6-app.js | every screen: tabs, search, quiz, all calculators |

## The money math (proven to the dollar against real graded checkouts)

All constants live in `SALES` in 5-data-quiz.js. The pipeline (`pipeMath` in 6-app.js):

- Credit tips = real Toast tips if entered, else 20.8% of team net sales. Banquets run a
  23% auto-grat (guests can add more on top) — confirmed 8/4.
- Toast withholds 2% of credit tips.
- Tip-outs are percentages of TEAM NET SALES, each line rounded UP to a whole dollar:
  bar 1%, busser 1.5%, expo 0.5%. Banquets add 3% — that 3% is Lillian's cut as banquet
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
- Evan's cut line is fixed at $200/person: under it, taking the cut is fine; over it, work.
- Greenwood tax 8.96% ≈ 9% (7% Indiana + 1% Johnson County + 1% Greenwood food & beverage).
- Banquet reference block: $3,366 sales derived from a real $774.18 auto-grat ÷ 23%.

`test.py` carries two golden checkouts asserting this math. If Evan changes a rule on purpose,
recompute the goldens by hand before touching them.

## Standing rules from Evan (do not re-ask, do not undo)

- Weeks start WEDNESDAY. Any day-of-week list runs Wed → Tue.
- Normal fonts only. No cursive, ever. Brand: maroon #59201C, cream #F7EFE4, squared corners.
- Ticket times: entrées 22–27 min. Soups, salads, desserts 5–7 min, 10 max.
- Spelling: "Pittsburghed" (with the h). Books come from SevenRooms, not OpenTable.
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

## Delivery ritual after any change

Build, run test.py, then give Evan the fresh `index.html` (it also replaces
`Restaurant/index.html` and the dated html in the parent folder, and the "mos-cowork"
desktop artifact when working through Cowork). If the GitHub Pages repo exists, commit
and push so the live link updates too.
