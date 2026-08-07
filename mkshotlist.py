#!/usr/bin/env python3
"""Regenerates the picture-project shot list from the live app data.
Run after any menu change or new photo:  python3 mkshotlist.py
"""
import json, re, pathlib, datetime

ROOT = pathlib.Path(__file__).parent

def js_obj(path, varname):
    s = (ROOT / path).read_text(encoding="utf-8")
    i = s.index("const " + varname + "=")
    body = s[i + len("const " + varname + "="):]
    return body

photos = json.loads(js_obj("build/5d-data-photos.js", "PHOTOS").rstrip().rstrip(";"))
HAVE = set(photos.keys())

food = (ROOT / "build/4-data-food.js").read_text(encoding="utf-8")
menu_src = food[food.index("const MENU = {"):]
menu_src = menu_src[:menu_src.index("\n};") + 3]

import subprocess, tempfile
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
    f.write(menu_src + "\nconsole.log(JSON.stringify(MENU));")
    tmp = f.name
MENU = json.loads(subprocess.check_output(["node", tmp], text=True))

drinks = (ROOT / "build/3-data-drinks.js").read_text(encoding="utf-8")
cocktails = re.findall(r'\{n:"([^"]+)",p:"([^"]+)",grp:"([^"]+)"', drinks)

# shot but rejected on quality — worth reshooting before anything never-shot
RESHOOT = {
 "Cotton Candy":"out of focus",
 "Roasted Seafood Tower":"soft, lower tier unreadable",
 "Stuffed Chicken Breast":"blown out",
 "Wagyu Tacos":"shadows crushed",
 "Iced Seafood Tower":"frame could not be cropped clean",
}
# not a plate of food, or off the menu — nothing to shoot
SKIP = {"Every side shares":"not a dish",
        "Celebration drop (free)":"comp, varies",
        "Soup of the Day":"changes daily",
        "Sorbets (not really sold)":"off menu",
        "Forest Mushrooms":"off menu"}

have_rows, need_rows, reshoot_rows, skipped = [], [], [], []
for sec, items in MENU.items():
    for name, price, *_ in items:
        if name in SKIP:
            skipped.append((name, SKIP[name])); continue
        if name in HAVE: have_rows.append((sec, name, price))
        elif name in RESHOOT: reshoot_rows.append((sec, name, price, RESHOOT[name]))
        else: need_rows.append((sec, name, price))

def group(rows):
    out = {}
    for r in rows: out.setdefault(r[0], []).append(r)
    return out

today = datetime.date.today().strftime("%-m/%-d/%Y")
L = []
w = L.append
w("# Mo's picture project — the shot list")
w("")
w(f"Updated {today}. Cross a line off as it gets shot.")
w("")
total = len(have_rows) + len(need_rows) + len(reshoot_rows)
w(f"**{len(have_rows)} of {total} menu items have a photo in the app.** "
  f"{len(reshoot_rows)} were shot and rejected, {len(need_rows)} have never been shot.")
w("")
w("Shoot square, straight down on the plate, in the dining room light if you can. "
  "A dish that changes plate or garnish needs a new photo.")
w("")

w("## Still to shoot")
w("")
w("Reshoots first — these were attempted and did not come out.")
w("")
for sec, name, price, why in reshoot_rows:
    w(f"- [ ] **{name}** — {price} · {sec} · *{why}*")
w("")
w("Never shot.")
w("")
for sec, rows in group(need_rows).items():
    w(f"**{sec}**")
    w("")
    for _, name, price in rows:
        w(f"- [ ] {name} — {price}")
    w("")

w("## Already in the app")
w("")
for sec, rows in group(have_rows).items():
    w(f"**{sec}**")
    w("")
    for _, name, price in rows:
        w(f"- [x] {name} — {price}")
    w("")

w("## Not a plate — no photo needed")
w("")
w(", ".join(f"{n} ({why})" for n, why in skipped) + ".")
w("")

w("## Drinks — the next wave")
w("")
w(f"No cocktail photos yet. All {len(cocktails)} builds, active list first — "
  "the garnish is the part worth photographing.")
w("")
order = {"specialty":0, "signature":1, "dessert":2, "verify":3}
label = {"specialty":"Summer specialty","signature":"Mo's signatures",
         "dessert":"Dessert cocktails","verify":"Archived — skip unless it returns"}
cur = None
for n, p, g in sorted(cocktails, key=lambda c: (order.get(c[2], 9), c[0])):
    if g != cur:
        cur = g; w(""); w(f"**{label.get(g,g)}**"); w("")
    w(f"- [ ] {n} — {p}")
w("")

out = ROOT / f"{datetime.date.today()}-mos-picture-shot-list.md"
out.write_text("\n".join(L), encoding="utf-8")
print(f"{out.name}")
print(f"  have {len(have_rows)} · reshoot {len(reshoot_rows)} · never shot {len(need_rows)} · skipped {len(skipped)}")
print(f"  cocktails listed {len(cocktails)}")
