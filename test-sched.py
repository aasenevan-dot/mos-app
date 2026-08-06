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
        # ---- night forecast pulls from the schedule ----
        ops=await pg.evaluate("document.querySelector('#p-ops').innerHTML")
        if "Forecasting lab" in ops: bad.append("Forecasting lab still in Money tab")
        if "Night forecast — books" in ops: bad.append("old fc accordion still present")
        if "Night Forecast" not in ops: bad.append("Night Forecast section missing")
        vals=await pg.evaluate("({d:document.querySelector('#ipDay').value,b:document.querySelector('#ipBooks').value,t:document.querySelector('#ipTeams').value,c:document.querySelector('#ipCk').value,g:document.querySelector('#bqGrat').value})")
        if vals["d"]!="2": bad.append(f"ipDay not defaulted to Friday idx2: {vals}")
        if vals["b"]!="39": bad.append(f"ipBooks not prefilled 39 from covers row: {vals}")
        if vals["t"]!="7": bad.append(f"ipTeams not 7 from schedule: {vals}")
        if vals["c"]!="2": bad.append(f"ipCk not 2 from schedule: {vals}")
        if vals["g"]!="23": bad.append(f"bqGrat default not 23: {vals}")
        ipout=await pg.evaluate("document.querySelector('#ipOut').innerHTML")
        for cell in ["Staffing this night","room to cut","Scheduled Fr 8/7","Restaurant net"]:
            if cell not in ipout: bad.append(f"forecast output missing {cell}")
        who=await pg.evaluate("document.querySelector('#ipWho').innerHTML")
        if "Who's on Friday 8/7" not in who: bad.append("who's-on roster missing")
        if "Barbie" not in who: bad.append("roster names missing in forecast")
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
        await pg.evaluate("document.querySelector('#exNet').value='8000';document.querySelector('#exPct').value='20.8';calcEX()")
        exo=await pg.evaluate("document.querySelector('#exOut').innerHTML")
        for cell in ["8.4 slices","Front $82","Back $82","Cocktailers","$82","Bussers","$5/hr","Expo / food run","$10/hr","$2.13","bar-top tips","Polisher"]:
            if cell not in exo: bad.append(f"everybody-night missing {cell}")
        exv=await pg.evaluate("({b:document.querySelector('#exBus').value,e:document.querySelector('#exExpo').value,r:document.querySelector('#exBar').value})")
        if exv!={"b":"2","e":"2","r":"3"}: bad.append(f"exact counts not from schedule: {exv}")
        ok=await pg.evaluate("(function(){const s=8000/8.4;const r=pipeMath(s,s*.208,SALES.guestTipRate,false,0,0);return document.querySelector('#exOut').innerHTML.includes('team earns $'+Math.round(r.earned).toLocaleString());})()")
        if not ok: bad.append("everybody-night team earned disagrees with pipeMath")
        alg=await pg.evaluate("document.querySelector('#p-allergens').innerHTML")
        if "Wagyu Porterhouse" in alg: bad.append("allergen row still says Wagyu Porterhouse")
        if "USDA Choice Porterhouse" not in alg: bad.append("allergen row missing USDA Choice")
        spx=await pg.evaluate("document.querySelector('#p-specials').innerHTML")
        if "Australian Wagyu Porterhouse (old name)" not in spx: bad.append("porterhouse archive entry missing")
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
