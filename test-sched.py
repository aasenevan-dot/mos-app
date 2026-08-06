import asyncio, sys
from playwright.async_api import async_playwright

MOCK = """
(() => {
  const O = Date;
  window.__now = %d;
  Date = class extends O {
    constructor(...a){ a.length===0 ? super(window.__now) : super(...a); }
    static now(){ return window.__now; }
  };
})();
"""

async def main():
    url="file:///home/user/moes/index.html"; bad=[]
    async with async_playwright() as pw:
        b=await pw.chromium.launch()
        # ---- load 1: Friday 8/7/2026, 3pm ----
        import datetime
        t1=int(datetime.datetime(2026,8,7,15,0).timestamp()*1000)
        ctx=await b.new_context(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
        pg=await ctx.new_page(); errs=[]
        pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.add_init_script(MOCK % t1)
        await pg.goto(url); await pg.wait_for_timeout(900)
        html=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        roster=html.split("exactly as posted")[0]
        grid=html.split("exactly as posted")[1].split("Schedule history")[0]
        if errs: bad.append("JS errors: "+str(errs))
        if "Today — Friday 8/7" not in roster: bad.append("roster header wrong: "+roster[:120])
        for name,tm in [("Evan","3:30"),("Krista","5:00"),("Jennea","3:00"),("Mackenzie","4 Busser"),("Rodrigo","5:30"),("Alexis","3 MGR"),("CJ","1:00")]:
            if name not in roster: bad.append(f"roster missing {name}")
        for absent in ["Eleisia","Lucas","Audrina","Carter","Morgan B","Abby","(numbers row"]:
            if absent in roster: bad.append(f"roster wrongly lists {absent}")
        if "Evan <i>3:30</i>" not in roster: bad.append("Evan time not formatted 3:30")
        # master grid exactness
        for cell in ['<span class="dw">We</span>8/5','class="off"','class="ro"','Barbie','2pm Carmel','Back Train','>15<','colspan="8">Managers','covrow','Covers \u00b7 Sun 8/2']:
            if cell not in grid: bad.append(f"grid missing {cell}")
        for gone in ["Jeremiah","Gavin","Lupe","Eleisia","AUDRINA","LUCAS"]:
            if f'"nm">{gone}<' in grid: bad.append(f"{gone} still has a row on current grid")
        if "Not on this week:" not in html: bad.append("gone-note missing")
        # ---- merged night forecast: one machine ----
        ops=await pg.evaluate("document.querySelector('#p-ops').innerHTML")
        if "Forecasting lab" in ops: bad.append("Forecasting lab still in Money tab")
        for gone in ["Multiplier","exNet","exHrs","/hr","hourly"]:
            if gone in ops: bad.append(f"merged tool still shows {gone}")
        if "Tip %" not in ops: bad.append("Tip % input missing")
        if ops.count('class="out"')<3: pass
        vals=await pg.evaluate("({d:document.querySelector('#ipDay').value,b:document.querySelector('#ipBooks').value,t:document.querySelector('#ipTeams').value,c:document.querySelector('#ipCk').value,bu:document.querySelector('#ipBus').value,ex:document.querySelector('#ipExpo').value,br:document.querySelector('#ipBar').value,g:document.querySelector('#bqGrat').value})")
        if vals!={"d":"2","b":"39","t":"7","c":"2","bu":"2","ex":"2","br":"3","g":"23"}: bad.append(f"prefills wrong: {vals}")
        ipout=await pg.evaluate("document.querySelector('#ipOut').innerHTML")
        for cell in ["CUT TERRITORY","Night net","39 covers x $115","Bussers","Expo / food run","Bar","Staffing this night","room to cut","bar-top tips"]:
            if cell not in ipout: bad.append(f"default forecast missing {cell}")
        # real-net override: the verified 8000-net numbers must appear exactly
        await pg.evaluate("document.querySelector('#ipNet').value='8000';calcIP()")
        ipout=await pg.evaluate("document.querySelector('#ipOut').innerHTML")
        for cell in ['typed in — the real number','>$952<','>$164<','Front $82','Back $82','>$63<','pool ÷ 2 on (1.5%)','>$22<','pool ÷ 2 on (0.5%)','>$28<','pool ÷ 3 on (1%)']:
            if cell not in ipout: bad.append(f"8000-net forecast missing {cell}")
        ok=await pg.evaluate("(function(){const s=8000/8.4;const r=pipeMath(s,s*.208,SALES.guestTipRate,false,0,0);return document.querySelector('#ipOut').innerHTML.includes('$'+Math.round(r.earned).toLocaleString());})()")
        if not ok: bad.append("merged forecast disagrees with pipeMath on 8000 net")
        await pg.evaluate("document.querySelector('#ipNet').value='';calcIP()")
        alg=await pg.evaluate("document.querySelector('#p-allergens').innerHTML")
        if "Wagyu Porterhouse" in alg: bad.append("allergen row still says Wagyu Porterhouse")
        if "USDA Choice Porterhouse" not in alg: bad.append("allergen row missing USDA Choice")
        spx=await pg.evaluate("document.querySelector('#p-specials').innerHTML")
        if "Australian Wagyu Porterhouse (old name)" not in spx: bad.append("porterhouse archive entry missing")
        # ---- wine type filter ----
        if not await pg.evaluate("WINES.every(w=>w.v&&WINE_TYPES.some(t=>t[0]===w.v))"): bad.append("wine missing type mapping")
        nb=await pg.evaluate("[document.querySelectorAll('#wineType button').length,document.querySelectorAll('#wineServe button').length,document.querySelectorAll('#wineCats').length]")
        if nb!=[12,3,0]: bad.append(f"wine chip rows wrong: {nb}")
        wg=await pg.evaluate("wineFilter.v='chard';renderWines();document.querySelector('#wineGrid').innerHTML")
        if "Chablis" not in wg or "Mer Soleil" not in wg: bad.append("chardonnay filter misses bottle+glass")
        if "Caymus" in wg: bad.append("chardonnay filter leaking reds")
        wg=await pg.evaluate("wineFilter.v='cab';wineFilter.serve='glass';renderWines();document.querySelector('#wineGrid').innerHTML")
        if "Ghost Pines" not in wg or "Silver Oak" in wg: bad.append("glass+cab combo wrong")
        await pg.evaluate("wineFilter.v='all';wineFilter.serve='all';renderWines()")
        # ---- home before-you-walk-up grid ----
        home=await pg.evaluate("document.querySelector('#p-shift').innerHTML")
        if "Starters" not in home or "5–12 min" not in home: bad.append("Starters tile missing")
        if "Manager alert" in home: bad.append("Manager alert tile still on home")
        if "$250+ bottles get the big Bordeaux glasses" not in home: bad.append("Bordeaux fact lost")
        if home.find("Starters")>home.find("Soups"): bad.append("Starters not first in grid")
        # ---- dark mode, text size, exact night ----
        if "Mined from the real Greenwood" in await pg.evaluate("document.querySelector('#p-house').innerHTML"):
            bad.append("mined-note still present")
        bg0=await pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()")
        await pg.evaluate("document.querySelector('#darkT').click()")
        bg1=await pg.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()")
        lbl=await pg.evaluate("document.querySelector('#darkT').textContent")
        if bg0==bg1 or lbl!="Light": bad.append(f"dark mode not flipping: {bg0}->{bg1} lbl={lbl}")
        await pg.evaluate("document.querySelector('#darkT').click()")
        await pg.evaluate("document.querySelector('#szUp').click()")
        z=await pg.evaluate("document.body.style.zoom")
        if str(z)!="1.075": bad.append(f"szUp zoom wrong: {z}")
        await pg.evaluate("document.querySelector('#szDn').click();document.querySelector('#szDn').click()")
        z=await pg.evaluate("document.body.style.zoom")
        if str(z)!="0.925": bad.append(f"szDn zoom wrong: {z}")
        await pg.evaluate("document.querySelector('#szUp').click()")
        # ---- handbook + vocabulary ----
        house=await pg.evaluate("document.querySelector('#p-house').innerHTML")
        for cell in ["Employee Handbook","Lillian Speedy","Gum chewing","120 day","BEHIND YOU"]:
            if cell not in house: bad.append(f"handbook missing {cell}")
        voc=await pg.evaluate("document.querySelector('#p-vocab').innerHTML")
        for cell in ["Mise en place","Corkage fee","Pivot point","Two-bite"]:
            if cell not in voc: bad.append(f"vocab missing {cell}")
        s1=await pg.evaluate("search('mise en place').map(h=>h.w+':'+h.t).join('|')")
        if "Vocabulary" not in s1: bad.append(f"search miss mise: {s1[:80]}")
        s2=await pg.evaluate("search('can i chew gum').map(h=>h.w).join('|')")
        if "Handbook" not in s2: bad.append(f"search miss gum: {s2[:80]}")
        s3=await pg.evaluate("search('jury duty').map(h=>h.w).join('|')")
        if "Handbook" not in s3: bad.append(f"search miss jury: {s3[:80]}")
        # ---- schedule history browser ----
        nopts=await pg.evaluate("document.querySelectorAll('#schedWeek option').length")
        if nopts!=37: bad.append(f"history week count {nopts} != 37")
        target=await pg.evaluate("[...document.querySelectorAll('#schedWeek option')].findIndex(o=>o.textContent.includes('2/25'))")
        if target<0: bad.append("2/25 week missing from picker")
        else:
            await pg.evaluate(f"SCHED_SEL={target};renderSchedHist();")
            hh=await pg.evaluate("document.querySelector('#schedHist').innerHTML")
            for cell in ["Chantz","Spencer","1230/mng 3","texted screenshot","Eleisia","Covers \u00b7 Sun 2/22"]:
                if cell not in hh: bad.append(f"history 2/25 grid missing {cell}")
            await pg.evaluate("renderSchedHist(3)")  # Sa 2/28
            hh=await pg.evaluate("document.querySelector('#schedHist').innerHTML")
            ros=hh.split("schedwrap")[0]
            for who in ["Kate","Spencer","330 lucas"]:
                if who not in ros: bad.append(f"2/28 roster missing {who}")
            if "Krista <i>" in ros: bad.append("2/28 roster wrongly lists Krista (RO)")
        oldest=await pg.evaluate("SCHEDULE_HISTORY[SCHEDULE_HISTORY.length-1].week")
        if "11/19" not in oldest: bad.append(f"oldest week wrong: {oldest}")
        # current week reconciled: Hunter 8/10+8/11 now OFF
        hun=await pg.evaluate("SCHEDULE.sections.find(s=>s[0]==='Fronts')[1].find(r=>r[0]==='Hunter').slice(6)")
        if hun!=["OFF","OFF"]: bad.append(f"Hunter Mo/Tu not reconciled to OFF: {hun}")
        # home button + nav
        if not await pg.evaluate("!!document.querySelector('button[data-qa=\\'sched|\\']')"): bad.append("home Schedule button missing")
        # ---- midnight flip: advance mocked clock to Sat 8/8, wait out the 60s watcher ----
        t2=int(datetime.datetime(2026,8,8,0,0,30).timestamp()*1000)
        await pg.evaluate(f"window.__now={t2}")
        await pg.wait_for_timeout(62000)
        h2=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        if "Today — Saturday 8/8" not in h2: bad.append("midnight flip did NOT re-render roster")
        if "Chad" not in h2.split("exactly as posted")[0] or "2pm Carmel" not in h2.split("exactly as posted")[0]:
            bad.append("Saturday roster missing Chad 2pm Carmel")
        await ctx.close()
        # ---- load 2: 8/12/2026 — off the posted week ----
        t3=int(datetime.datetime(2026,8,12,15,0).timestamp()*1000)
        ctx=await b.new_context(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
        pg=await ctx.new_page()
        await pg.add_init_script(MOCK % t3)
        await pg.goto(url); await pg.wait_for_timeout(900)
        h3=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        if "isn't on the posted week" not in h3: bad.append("off-week message missing")
        if "Barbie" not in h3: bad.append("off-week still shows master grid? missing")
        await b.close()
    if bad:
        print("SCHED TEST FAILED:"); [print("  -",x) for x in bad]; sys.exit(1)
    print("SCHED TEST ALL GOOD — Friday roster right, midnight flip re-rendered to Saturday, off-week message shows.")

asyncio.run(main())
