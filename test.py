#!/usr/bin/env python3
"""Smoke + math regression test for the Mo's Co-Work app.

Usage:  python3 build.py && python3 test.py            (tests index.html)
        python3 test.py some-other-file.html

Needs: pip install playwright  (Chromium must be installed for playwright).
Checks, on an iPhone-sized viewport:
  1. Page loads with zero JS errors and the bootMsg banner removes itself.
  2. No leftover __PLACEHOLDER__ text anywhere.
  3. Every bottom-bar tab taps open and renders content.
  4. Layout never overflows sideways (no stretched viewport on phones).
  5. Golden checkout math — pipeMath() must keep matching numbers that were
     verified to the dollar against real graded house checkouts. If you change
     the tip rules on purpose, recompute these goldens by hand first.
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

target = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "index.html").resolve()
assert target.exists(), f"{target} not found — run build.py first"
html = target.read_text()
for ph in ("__APPLETOUCHICON__", "__MOSLOGO__", "__BUILDDATE__"):
    assert ph not in html, f"FAIL: unreplaced placeholder {ph}"

fails = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 393, "height": 852},
                    is_mobile=True, has_touch=True,
                    device_scale_factor=3)
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(target.as_uri())
    pg.wait_for_timeout(900)
    # The Devour study popup shows on load during the event window (Aug 17 – Sep 6) and, being a
    # full-screen modal, would intercept taps on the nav bar — dismiss it first, like a guest would.
    pg.evaluate("var x=document.querySelector('.dvwrap .dvx'); if(x)x.click();")
    pg.wait_for_timeout(120)

    if errs:
        fails.append(f"JS errors on load: {errs}")
    if pg.locator("#bootMsg").count() != 0:
        fails.append("bootMsg banner never removed — app did not boot")

    # every bottom tab opens
    n = pg.locator("#bbar button").count()
    if n < 5:
        fails.append(f"bottom bar has only {n} buttons")
    for i in range(n):
        pg.locator("#bbar button").nth(i).tap()
        pg.wait_for_timeout(250)
        if len(pg.locator("#main").inner_text().strip()) < 20 and \
           pg.locator(".sheet.on").count() == 0:
            fails.append(f"tab #{i} rendered almost nothing")
    if errs:
        fails.append(f"JS errors while tapping tabs: {errs}")

    # no sideways overflow (this is what breaks fixed bars on iPhone)
    w = pg.evaluate("document.documentElement.scrollWidth")
    if w > 400:
        fails.append(f"layout overflows sideways: scrollWidth {w}px on a 393px phone")

    # golden math — verified against real graded checkouts, whole-dollar rules
    g1 = pg.evaluate("pipeMath(2000, 0, SALES.guestTipRate, false, 10, 0)")
    want1 = {"earned": 337, "back": 169, "front": 168, "tipOut": 70}
    for k, v in want1.items():
        if g1.get(k) != v:
            fails.append(f"golden1 {k}: got {g1.get(k)}, want {v}")

    g2 = pg.evaluate("pipeMath(3871, 774.18, .20, true, 0, 0)")
    want2 = {"earned": 523, "back": 262, "front": 261, "tipOut": 235}
    for k, v in want2.items():
        if g2.get(k) != v:
            fails.append(f"golden2 {k}: got {g2.get(k)}, want {v}")

    # The golden checks above call pipeMath() directly, which passes even when the
    # UI that renders it is broken — a `r is not defined` in calcSC() shipped once
    # exactly that way. So drive the actual calculators through the DOM too.
    for tab, setup, box, want in [
        ("ops", {"scSales": 2000, "scTips": 500}, "#scOut", ["TEAM CHECKOUT", "EARNED", "FRONT", "BACK"]),
        ("ops", {"bqcSales": 4000, "bqcHeads": 40}, "#bqcOut", ["BILLED NET", "GRATUITY"]),
    ]:
        pg.evaluate(f"go('{tab}')")
        pg.wait_for_timeout(250)
        for k, v in setup.items():
            pg.evaluate(
                "([i,v])=>{const n=document.querySelector('#'+i);n.value=v;"
                "n.dispatchEvent(new Event('input',{bubbles:true}));}", [k, v])
        txt = pg.evaluate(f"document.querySelector('{box}')?.innerText||''")
        for cell in want:
            if cell not in txt:
                fails.append(f"{box} never rendered {cell!r} — the calculator is broken in the UI")

    if errs:
        fails.append(f"uncaught JS while driving the calculators: {errs[:2]}")

    # Small Android phones (11/3): main has overflow-x:clip, so a card that grew wider than
    # the screen never showed up as sideways scroll — its right edge was just cut off.
    # A nowrap price or a long flag chip inside a 1fr grid did exactly that on 360px phones.
    # Walk every tab with every accordion open and fail on any text box poking past the
    # screen, unless it sits inside a deliberate sideways scroller (wide tables in .tw).
    clipped_js = """() => {
      const vw = document.documentElement.clientWidth, bad = [];
      const inScroller = el => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX; if ((o === 'auto' || o === 'scroll') && p.scrollWidth > p.clientWidth + 1) return true; }
        return false; };
      for (const el of document.querySelectorAll('#main *')) {
        const r = el.getBoundingClientRect(); if (!r.width || !r.height || r.right <= vw + 1) continue;
        if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
        if (getComputedStyle(el).position === 'fixed' || inScroller(el)) continue;
        bad.push(el.className + ': ' + el.textContent.trim().slice(0, 40));
      }
      return bad;
    }"""
    for w, h in [(320, 568), (360, 640)]:
        ap = b.new_page(viewport={"width": w, "height": h}, is_mobile=True, has_touch=True,
                        device_scale_factor=2.75,
                        user_agent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 "
                                   "(KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36")
        ap.goto(target.as_uri())
        ap.wait_for_timeout(700)
        ap.evaluate("var x=document.querySelector('.dvwrap .dvx'); if(x)x.click();")
        for t in ap.evaluate("TABS.map(t=>t[0])"):
            ap.evaluate(f"go('{t}')")
            ap.wait_for_timeout(120)
            ap.evaluate("document.querySelectorAll('#main details').forEach(d=>d.open=true)")
            bad = ap.evaluate(clipped_js)
            if bad:
                fails.append(f"{w}px Android: {len(bad)} text boxes cut off on '{t}', e.g. {bad[:2]}")
        ap.close()

    b.close()

if fails:
    print("FAILED:")
    for f in fails:
        print("  -", f)
    sys.exit(1)
print(f"ALL GOOD — {target.name} boots clean, tabs work, checkout math matches the graded checkouts.")
