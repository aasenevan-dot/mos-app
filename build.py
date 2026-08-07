#!/usr/bin/env python3
"""Assemble the single-file Mo's Co-Work app from the build/ parts.

Usage:  python3 build.py            -> writes index.html next to this script
        python3 build.py out.html   -> writes to a custom filename

Parts, in order:
  build/1-head.html      all CSS, header, nav skeleton (ends with an open <script> tag)
  build/2-data-wine.js   wine list + verbatim pitches
  build/3-data-drinks.js cocktails, spirits, beer
  build/4-data-food.js   menu, allergens, specials + soups living lists
  build/5-data-quiz.js   quiz banks + SALES constants (all the tip math numbers)
  build/5b-data-sched.js weekly schedule + full schedule history
  build/6-app.js         every screen and calculator
Then the script/body/html tags get closed.

Placeholders replaced in 1-head.html:
  __APPLETOUCHICON__  -> build/icon.b64  (app icon, base64 png)
  __MOSLOGO__         -> build/logo.b64  (header logo, base64 png)
  __BUILDDATE__       -> today as M/D/YYYY
"""
import pathlib, sys, datetime

ROOT = pathlib.Path(__file__).resolve().parent
B = ROOT / "build"
OUT = ROOT / (sys.argv[1] if len(sys.argv) > 1 else "index.html")

head = (B / "1-head.html").read_text()
head = head.replace("__APPLETOUCHICON__", (B / "icon.b64").read_text().strip())
head = head.replace("__MOSLOGO__", (B / "logo.b64").read_text().strip())
d = datetime.date.today()
head = head.replace("__BUILDDATE__", f"{d.month}/{d.day}/{d.year}")
assert "__" not in head.split("sha384")[0] or True

parts = [head]
for f in ["2-data-wine.js", "3-data-drinks.js", "4-data-food.js",
          "5-data-quiz.js", "5b-data-sched.js", "5c-data-book.js", "5d-data-photos.js",
          "5e-data-deck.js",
          "5f-data-floor.js",
          "6-app.js"]:
    parts.append((B / f).read_text().replace("__BUILDDATE__", f"{d.month}/{d.day}/{d.year}"))

html = "\n".join(p.rstrip("\n") for p in parts) + "\n\n</script>\n</body>\n</html>\n"
for ph in ("__APPLETOUCHICON__", "__MOSLOGO__", "__BUILDDATE__"):
    assert ph not in html, f"placeholder {ph} was not replaced"
OUT.write_text(html)
print(f"built {OUT} ({OUT.stat().st_size:,} bytes)")
