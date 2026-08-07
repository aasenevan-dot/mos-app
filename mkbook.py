#!/usr/bin/env python3
"""Converts book.md (the Mo's Book master) into build/5c-data-book.js.
Run after any edit to book.md, then python3 build.py.
Chapters split on lines starting '# '. The front-matter chapter becomes 'Start Here'."""
import re, json, html, pathlib

ROOT = pathlib.Path(__file__).parent
src = (ROOT/"book.md").read_text(encoding="utf-8")

def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    return s

chapters = []
cur = None
ul = False

def close_ul():
    global ul
    if ul:
        cur["h"].append("</ul>")
        ul = False

for raw in src.split("\n"):
    ln = raw.rstrip()
    if ln.startswith("# "):
        if cur: close_ul(); chapters.append(cur)
        t = ln[2:].strip()
        if t == "The Mo's Book":
            t = "Start Here — read this first"
        cur = {"t": t, "plan": "", "h": []}
        continue
    if cur is None:
        continue
    if ln.strip() == "---" or ln.strip() == "":
        close_ul(); continue
    if ln.startswith("### "):
        close_ul(); cur["h"].append(f'<h5 class="bkh2">{inline(ln[4:])}</h5>'); continue
    if ln.startswith("## "):
        close_ul(); cur["h"].append(f'<h4 class="bkh">{inline(ln[3:])}</h4>'); continue
    if ln.startswith("- "):
        if not ul: cur["h"].append('<ul class="steps">'); ul = True
        cur["h"].append(f"<li>{inline(ln[2:])}</li>"); continue
    close_ul()
    if ln.startswith("**STILL TO GET"):
        cur["h"].append(f'<div class="getline">&#9658; {inline(ln)}</div>'); continue
    if ln.startswith("*") and ln.endswith("*") and not ln.startswith("**"):
        body = ln.strip("*").strip()
        if body.startswith("Original plan:") and not cur["plan"]:
            cur["plan"] = body
        else:
            cur["h"].append(f'<p class="bkplan">{inline(body)}</p>')
        continue
    if ln.startswith("**Everything we teach"):
        continue  # cover subtitle, skip in-app
    cur["h"].append(f"<p>{inline(ln)}</p>")

if cur: close_ul(); chapters.append(cur)

out = [{"t": c["t"], "plan": c["plan"], "h": "".join(c["h"])} for c in chapters]
js = "\n/* ============ THE MO'S BOOK — generated from book.md by mkbook.py. Edit book.md, not this file. ============ */\nconst BOOK=" + json.dumps(out, ensure_ascii=False) + ";\n"
(ROOT/"build"/"5c-data-book.js").write_text(js, encoding="utf-8")
print(f"BOOK: {len(out)} chapters -> build/5c-data-book.js ({len(js):,} bytes)")
for c in out: print(" ·", c["t"])
