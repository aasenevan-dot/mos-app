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

- Credit tips = real Toast tips if entered, else 20.8% of team net sales (banquets run 20%).
- Toast withholds 2% of credit tips.
- Tip-outs are percentages of TEAM NET SALES, each line rounded UP to a whole dollar:
  bar 1%, busser 1.5%, expo 0.5%. Banquet nights add 3% (exact placement still VERIFY).
- Polisher is flat: $10 for a front/back team, $5 for a solo (solo = cocktailer job).
- Earned = pool minus tip-outs, cents dropped (floor).
- Split 50/50 front/back, whole dollars, the BACK takes the greater dollar when odd.
- A banquet is its own checkout sheet and envelope, same math, then the night combines.
- Reverse formula: team net sales ≈ (2 × one person's take) / 0.17384.
- Floor model: slices = teams + 0.7 per cocktailer. Avg $115 per person (Greenwood).
- Evan's cut line is fixed at $200/person: under it, taking the cut is fine; over it, work.
- Greenwood tax 8.96% ≈ 9% (7% Indiana + 1% Johnson County + 1% Greenwood food & beverage).
- Banquet reference block: $3,871 sales derived from a real $774.18 auto-grat ÷ 20%.

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

- VERIFY tags in 4-data-food.js: tomahawk oz, 45-day dry-aged price/oz, porterhouse price,
  Chicken Marsala / salmon builds, banquet 3% placement, Pasta e Fagioli spelling,
  banquet minimums (ask Lillian). Clear tags as he confirms.
- Calibration: he'll bring Toast screens with guest counts and teams-per-night.
- Publish to GitHub Pages on his account **aasenevan-dpt** (repo suggestion: `mos`):
  `gh auth login`, then from this folder
  `git init && git add . && git commit -m "Mo's Co-Work"`,
  `gh repo create aasenevan-dpt/mos --public --source=. --push`,
  enable Pages on main / root, confirm https://aasenevan-dpt.github.io/mos/ loads on his phone.

## Delivery ritual after any change

Build, run test.py, then give Evan the fresh `index.html` (it also replaces
`Restaurant/index.html` and the dated html in the parent folder, and the "mos-cowork"
desktop artifact when working through Cowork). If the GitHub Pages repo exists, commit
and push so the live link updates too.
