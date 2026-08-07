#!/usr/bin/env python3
"""Data integrity sweep. Catches the class of mistake a blanket find-and-replace makes:
emptied fields, orphaned keys, duplicate rows, tags that leaked provenance back in.
Run any time the data files are edited:  python3 qc.py
"""
import json, re, subprocess, tempfile, pathlib, sys

ROOT = pathlib.Path(__file__).parent
problems, notes = [], []

def js(part, names):
    src = (ROOT/"build"/part).read_text(encoding="utf-8")
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(src + "\nconsole.log(JSON.stringify({" + ",".join(names) + "}));")
        tmp = f.name
    return json.loads(subprocess.check_output(["node", tmp], text=True))

food = js("4-data-food.js", ["MENU","ALLERGENS","LEADS","RECIPES","SPECIALS_ON",
                             "SPECIALS_ROTATION","SPECIALS_PAST","SOTD","SOUPS_STANDING",
                             "OFFMENU","PROTOCOL","DRESSINGS","TEMPS","ALLERGEN_LIST"])
wine = js("2-data-wine.js", ["WINES","WINE_MOVE","PAIRINGS","WINE_TYPES"])
drink = js("3-data-drinks.js", ["COCKTAILS","BEER"])
photos = json.loads((ROOT/"build/5d-data-photos.js").read_text(encoding="utf-8")
                    .split("const PHOTOS=",1)[1].rstrip().rstrip(";"))

MENU = food["MENU"]
names = [i[0] for items in MENU.values() for i in items]

# 1. no empty required fields
for sec, items in MENU.items():
    for i in items:
        if not i[0]: problems.append(f"menu item with no name in {sec}")
        if not i[1]: problems.append(f"{i[0]}: price is empty")
        if not i[2]: problems.append(f"{i[0]}: description is empty")

# 2. duplicate dish names inside a section
for sec, items in MENU.items():
    seen = {}
    for i in items:
        seen[i[0]] = seen.get(i[0], 0) + 1
    for n, c in seen.items():
        if c > 1: problems.append(f"{sec}: '{n}' listed {c} times")

# 3. every photo and lead must point at a real dish
special_names = {s[0] for s in food["SPECIALS_ON"]} | {s[0] for s in food["SPECIALS_ROTATION"]} \
                | {s[0] for s in food["SPECIALS_PAST"]}
for k in photos:
    if k not in names and k not in special_names:
        problems.append(f"PHOTOS key '{k}' matches no menu item or special")
for k in food["LEADS"]:
    if k not in names and k not in special_names:
        problems.append(f"LEADS key '{k}' matches no menu item or special")

# 4. allergen flags must all be in the legend
legend = set(food["ALLERGEN_LIST"])
for r in food["ALLERGENS"]:
    if not r[1]: problems.append(f"allergen row '{r[0]}' has no price")
    for f in r[2]:
        if f not in legend: problems.append(f"'{r[0]}' uses undeclared allergen '{f}'")

# 5. no provenance stamps in anything that renders
stamp = re.compile(r"(confirmed \d|per Evan|Evan \d|photo[- ]confirmed|added \d/\d|"
                   r"updated \d/\d|as of \d/\d|Menu marks)", re.I)
def scan(label, blob):
    for m in set(stamp.findall(json.dumps(blob, ensure_ascii=False))):
        problems.append(f"{label} still contains a provenance stamp: '{m}'")
scan("MENU", MENU); scan("ALLERGENS", food["ALLERGENS"])
scan("SPECIALS_ON", food["SPECIALS_ON"]); scan("LEADS", food["LEADS"])
scan("WINES", wine["WINES"]); scan("COCKTAILS", drink["COCKTAILS"])

# 6. the wine move must point at wines that exist
wnames = [w["n"] for w in wine["WINES"]]
def near(t):
    t = re.sub(r"[^a-z0-9]", "", t.lower())
    return any(t[:18] in re.sub(r"[^a-z0-9]", "", n.lower()) for n in wnames)
for row in wine["WINE_MOVE"]["glass"] + wine["WINE_MOVE"]["bottle"]:
    if not near(row[0]): problems.append(f"WINE_MOVE names a wine not on the list: {row[0]}")

# 7. specials should not repeat between running and past
on = {s[0] for s in food["SPECIALS_ON"]} | {s[0] for s in food["SPECIALS_ROTATION"]}
for s in food["SPECIALS_PAST"]:
    if s[0] in on: problems.append(f"'{s[0]}' is both running and archived")

# 8. soup archive: no duplicates
sn = [s[0] for s in food["SOTD"]]
for n in set(sn):
    if sn.count(n) > 1: problems.append(f"soup '{n}' logged {sn.count(n)} times")

# 9. sanity counts worth eyeballing
notes.append(f"menu items {len(names)} · allergen rows {len(food['ALLERGENS'])} · photos {len(photos)}")
notes.append(f"leads {len(food['LEADS'])} · soups logged {len(food['SOTD'])} · protocol steps {len(food['PROTOCOL'])}")
notes.append(f"wines {len(wnames)} · cocktails {len(drink['COCKTAILS'])} · beers {len(drink['BEER'])}")
missing = [n for n in names if n not in photos]
notes.append(f"dishes without a photo: {len(missing)}")

for n in notes: print("   " + n)
if problems:
    print(f"\nQC FAILED — {len(problems)} problem(s):")
    for p in problems: print("  - " + p)
    sys.exit(1)
print("\nQC CLEAN — no empty fields, no orphans, no duplicates, no stamps.")
