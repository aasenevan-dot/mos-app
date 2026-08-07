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
        if "Not on this week:" in html: bad.append("gone-note is back (Evan removed it 8/6)")
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
        for cell in ["CUT TERRITORY","$175","Night net","39 covers x $115","Bussers","Expo / food run","Bar","Staffing this night","room to cut","bar-top tips"]:
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
        spx=await pg.evaluate("document.querySelector('#p-menu').innerHTML")
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
        # ---- distribution round: about + events + lillian email ----
        h2v=await pg.evaluate("document.querySelector('#p-house').innerHTML")
        if "About this app" not in h2v: bad.append("About section missing")
        if "Lillian@mosgreenwood.com" not in h2v: bad.append("Lillian email missing from handbook")
        spv=await pg.evaluate("document.querySelector('#p-menu').innerHTML")
        for cell in ["Sundresses &amp; Sangria","Surf &amp; Turf Cup","Prisoner Wine Dinner","Lillian@mosgreenwood.com"]:
            if cell not in spv: bad.append(f"events missing {cell}")
        opsv=await pg.evaluate("document.querySelector('#p-ops').innerHTML")
        if "COMPS come OFF" not in opsv: bad.append("comps rule missing from split rules")
        if "Booked through Lillian?" not in opsv: bad.append("banquet toggle not relabeled")
        # ---- quiz build-out ----
        nq=await pg.evaluate("MC.length")
        if nq<145: bad.append(f"MC bank too small: {nq}")
        badq=await pg.evaluate("MC.filter(m=>!(m.q&&m.o&&m.o.length===4&&new Set(m.o).size===4&&m.t)).length")
        if badq: bad.append(f"{badq} malformed quiz questions")
        if await pg.evaluate("HOUSE.points.length")!=16: bad.append("Points count changed - quiz Q wrong")
        if await pg.evaluate("HOUSE.isaacs.length")!=11: bad.append("Isaac count changed - quiz Q wrong")
        nch=await pg.evaluate("[document.querySelectorAll('#quizTopics button').length,document.querySelectorAll('#quizLens button').length]")
        if nch!=[10,3]: bad.append(f"chip rows wrong: {nch}")
        ok=await pg.evaluate("(function(){QTOPIC='money';document.querySelector('#quizStart').click();return quiz.order.every(i=>QBANK[i].t==='money')&&quiz.order.length===10;})()")
        if not ok: bad.append("money-lane quiz wrong (leak or length)")
        ok=await pg.evaluate("(function(){QTOPIC='all';QLEN=0;document.querySelector('#quizStart').click();const n=quiz.order.length;QLEN=10;return n===QBANK.length&&n>=145;})()")
        if not ok: bad.append("whole-bank length option broken")
        same=await pg.evaluate("(function(){todaysTen();const a=[...quiz.order].sort((x,y)=>x-y).join();todaysTen();const b=[...quiz.order].sort((x,y)=>x-y).join();return a===b&&quiz.order.length===10&&QMODE==='daily';})()")
        if not same: bad.append("Todays 10 not deterministic")
        ok=await pg.evaluate("(function(){vocabQuiz();return quiz.order.length===10&&quiz.order.every(i=>QBANK[i].o.length===4&&QBANK[i].t==='vocab');})()")
        if not ok: bad.append("vocab quiz malformed")
        ok=await pg.evaluate("(function(){garnishMatch();return quiz.order.length===10&&quiz.order.every(i=>{const q=QBANK[i];return q.o.length===4&&new Set(q.o).size===4;});})()")
        if not ok: bad.append("garnish match malformed")
        ok=await pg.evaluate("(function(){nameBottle();return quiz.order.length===10&&quiz.order.every(i=>{const q=QBANK[i];return q.o.length===4&&new Set(q.o).size===4&&q.q.includes('pitch');});})()")
        if not ok: bad.append("name-that-bottle malformed")
        ok=await pg.evaluate("(function(){priceBlitz();const armed=QTIME!==null&&QTIME.left===60&&QMODE==='blitz';const shape=quiz.order.length===10&&quiz.order.every(i=>{const q=QBANK[i];return q.o.length===4&&new Set(q.o).size===4&&q.o[0].startsWith('$');});clearQTimer();return armed&&shape;})()")
        if not ok: bad.append("price blitz or its timer malformed")
        for key,n in [("greet",5),("allergy",6)]:
            js="(function(){orderGame('"+key+"');const b=[...document.querySelectorAll('#quizBox .opt')];if(b.length!=="+str(n)+")return false;for(let x=0;x<"+str(n)+";x++){const t=[...document.querySelectorAll('#quizBox .opt')].find(e=>+e.dataset.i===x);t.click();}return document.querySelector('#ogFb').innerHTML.includes('0 wrong taps');})()"
            ok=await pg.evaluate(js)
            if not ok: bad.append(f"order game {key} broken")
        prog=await pg.evaluate("(function(){startQuiz();return document.querySelector('#quizBox .qprog')!==null;})()")
        if not prog: bad.append("progress bar missing")
        await pg.evaluate("startQuiz()")
        # ---- dish photos ----
        await pg.evaluate("go('menu')")
        await pg.wait_for_timeout(400)
        np=await pg.evaluate("Object.keys(PHOTOS).length")
        if np<37: bad.append(f"PHOTOS has {np} keys, expected 37+")
        alluri=await pg.evaluate("Object.values(PHOTOS).every(v=>v.startsWith('data:image/jpeg;base64,'))")
        if not alluri: bad.append("a PHOTOS value is not a jpeg data URI")
        # every photo key must match a real menu item, or it will never render
        orphan=await pg.evaluate("""(function(){
          const names=new Set(); Object.values(MENU).forEach(a=>a.forEach(i=>names.add(i[0])));
          return Object.keys(PHOTOS).filter(k=>!names.has(k));})()""")
        if orphan: bad.append(f"PHOTOS keys with no menu item: {orphan}")
        shown=await pg.evaluate("document.querySelectorAll('#p-menu .dishimg').length")
        if shown!=np: bad.append(f"{shown} thumbs rendered but {np} photos exist")
        broke=await pg.evaluate("""(function(){
          const im=document.querySelector('#p-menu .dishimg[alt="Calamari"]');
          im.loading='eager'; return im.alt;})()""")
        await pg.wait_for_timeout(300)
        good=await pg.evaluate("""(function(){const im=document.querySelector('#p-menu .dishimg[alt="Calamari"]');
          return im.complete && im.naturalWidth>0;})()""")
        if not good: bad.append("calamari thumbnail did not decode")
        lb=await pg.evaluate("""(function(){openPic('Calamari');
          const o=document.querySelector('#lb').classList.contains('open');
          const html=document.querySelector('#lbin').innerHTML;
          closePic();
          return [o,html.includes('Calamari'),html.includes('$17'),
                  document.querySelector('#lb').classList.contains('open')];})()""")
        if not lb[0] or not lb[1] or not lb[2] or lb[3]:
            bad.append(f"photo lightbox broken: {lb}")
        noimg=await pg.evaluate("""(function(){
          const c=[...document.querySelectorAll('#p-menu .card')]
            .find(x=>x.textContent.includes('Oysters Rockefeller'));
          return c ? c.querySelector('.dishimg')===null : false;})()""")
        if not noimg: bad.append("a dish with no photo is showing an image slot")

        # ---- photos stay OUT of Study & Quiz (Evan's rule) ----
        await pg.evaluate("go('study')")
        await pg.wait_for_timeout(300)
        for fn in ["startQuiz()","todaysTen()","vocabQuiz()","priceBlitz()","garnishMatch()",
                   "nameBottle()","orderGame('greet')","orderGame('allergy')"]:
            await pg.evaluate(fn)
            await pg.wait_for_timeout(60)
            leak=await pg.evaluate("""(function(){const s=document.querySelector('#p-study');
              return [s.querySelectorAll('img').length, s.innerHTML.includes('data:image')];})()""")
            if leak[0] or leak[1]: bad.append(f"photo leaked into Study & Quiz after {fn}: {leak}")
        await pg.evaluate("typeof clearQTimer==='function'&&clearQTimer()")
        await pg.evaluate("go('menu')")
        await pg.wait_for_timeout(200)

        # ---- mise en place + the 8/7 menu corrections ----
        house=await pg.evaluate("document.querySelector('#p-house').innerHTML")
        if "Mise en place" not in house: bad.append("mise en place section missing from How We Work")
        for cell in ["cocktail fork","king crab legs","Spreading knife","Teaspoon on the right"]:
            if cell.lower() not in house.lower(): bad.append(f"mise en place missing {cell}")
        ng=await pg.evaluate("HOUSE.mise.length")
        if ng!=7: bad.append(f"mise en place has {ng} groups, expected 7")
        shape=await pg.evaluate("HOUSE.mise.every(g=>g.length===3&&Array.isArray(g[2])&&g[2].length)")
        if not shape: bad.append("a mise en place group is malformed")
        sm=await pg.evaluate("search('what silverware goes with the lobster tail').map(h=>h.w).join('|')")
        if "Mise en place" not in sm: bad.append(f"search miss mise: {sm[:90]}")
        rib=await pg.evaluate("JSON.stringify(MENU['Prime 47 Cuts & Wagyu'].find(x=>/45-Day/.test(x[0])))")
        if "45-Day 22 oz Dry-Aged Bone-In Ribeye" not in rib: bad.append("45-day ribeye not renamed")
        for cell in ["amino acids","nutty","enzymes"]:
            if cell not in rib: bad.append(f"dry-age story missing {cell}")
        oy=await pg.evaluate("JSON.stringify(MENU['Starters & Lounge'].find(x=>x[0]==='Seasonal Oysters'))")
        for cell in ["bed of ice","dry-ice smoke","Zesta","cocktail forks are already on the table"]:
            if cell not in oy: bad.append(f"oyster presentation missing {cell}")
        wt=await pg.evaluate("JSON.stringify(MENU['Starters & Lounge'].find(x=>x[0]==='Wagyu Tacos'))")
        if "balsamic vinegar glaze" not in wt: bad.append("wagyu taco balsamic glaze not stated")

        # ---- desktop header cleanup ----
        await pg.set_viewport_size({"width":1280,"height":800})
        await pg.wait_for_timeout(300)
        TABS_N=await pg.evaluate("TABS.map(t=>t[0])")
        hdr=await pg.evaluate("""(function(){
          const nav=document.querySelector('#nav'), btns=[...nav.querySelectorAll('button')];
          const rows=new Set(btns.map(b=>Math.round(b.getBoundingClientRect().top)));
          return {n:btns.length, rows:rows.size,
                  scrolls:nav.scrollWidth>nav.clientWidth+1,
                  ctl:!!document.querySelector('#hdrCtl:not([hidden])'),
                  wide:document.documentElement.scrollWidth>window.innerWidth+1};})()""")
        if hdr["n"]!=len(TABS_N): bad.append(f"desktop nav shows {hdr['n']} tabs, expected {len(TABS_N)}")
        if hdr["rows"]!=1: bad.append(f"desktop tabs wrapped onto {hdr['rows']} rows at 1280")
        if hdr["scrolls"]: bad.append("desktop tab row still scrolls sideways")
        if hdr["ctl"]: bad.append("A-/A+/Dark still visible in the header")
        if hdr["wide"]: bad.append("desktop page overflows sideways")
        zoom=await pg.evaluate("""(function(){
          openSheet();
          const base=document.body.style.zoom||'1';
          document.querySelector('#shSzUp').click();
          const up=document.body.style.zoom||'1';
          document.querySelector('#shSzDn').click();
          const out=[base,up,document.body.style.zoom||'1'];
          closeSheet();return out;})()""")
        if zoom[0]==zoom[1] or zoom[0]!=zoom[2]:
            bad.append(f"More-sheet text size broken after header change: {zoom}")
        dk=await pg.evaluate("""(function(){
          openSheet(); document.querySelector('#shDark').click();
          const on=document.documentElement.classList.contains('dark');
          openSheet(); document.querySelector('#shDark').click();
          const out=[on,document.documentElement.classList.contains('dark')];
          closeSheet();return out;})()""")
        if not dk[0] or dk[1]: bad.append(f"More-sheet dark toggle broken: {dk}")
        await pg.set_viewport_size({"width":393,"height":852})
        await pg.wait_for_timeout(300)

        # ---- Meals & Moments (off-site service) ----
        await pg.evaluate("go('sched')")
        await pg.wait_for_timeout(200)
        sch=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        for cell in ["Meals &amp; Moments","Heart &amp; Soul Church","Real Life Church","Life Church","Yaris"]:
            if cell not in sch: bad.append(f"Meals & Moments missing {cell}")
        if "Sunday 8/9" not in sch: bad.append("Meals & Moments 8/9 did not resolve to Sunday")
        past=await pg.evaluate("""(function(){
          const keep=OFFSITE.slice();
          OFFSITE.length=0; OFFSITE.push({d:'1/2',t:'noon',where:'Old One',addr:'x'});
          const out=offsiteBlock();
          OFFSITE.length=0; keep.forEach(k=>OFFSITE.push(k));
          return out;})()""")
        if past.strip(): bad.append("a past Meals & Moments date still rendered")
        so=await pg.evaluate("search('meals and moments').map(h=>h.w).join('|')")
        if "Meals & Moments" not in so: bad.append(f"search miss meals: {so[:90]}")
        await pg.evaluate("go('house')")
        await pg.wait_for_timeout(200)

        # ---- the Mo's Book reader ----
        nb=await pg.evaluate("BOOK.length")
        if nb!=12: bad.append(f"BOOK chapter count {nb}, expected 12")
        shape=await pg.evaluate("BOOK.every(c=>c.t&&c.h&&c.h.length>200)")
        if not shape: bad.append("a BOOK chapter is missing its title or body")
        titles=await pg.evaluate("BOOK.map(c=>c.t).join('|')")
        for t in ["Start Here","Day 1","Day 10","The Get List"]:
            if t not in titles: bad.append(f"BOOK missing chapter {t}")
        if not await pg.evaluate("document.querySelector('#p-house .bkcard')!==null"):
            bad.append("book launcher card missing from How We Work")
        rows=await pg.evaluate("(function(){openBook();return document.querySelectorAll('#bkWrap .bkrow').length;})()")
        if rows!=12: bad.append(f"contents shows {rows} rows, expected 12")
        hid=await pg.evaluate("document.querySelector('#houseMain').style.display==='none'")
        if not hid: bad.append("houseMain still visible while book is open")
        ch3=await pg.evaluate("(function(){openBook(3);return document.querySelector('#bkWrap').innerHTML;})()")
        for cell in ["Delmonico","Farbuckle","chapter 4 of 12"]:
            if cell not in ch3: bad.append(f"chapter 3 missing {cell}")
        nxt=await pg.evaluate("""(function(){
          const b=[...document.querySelectorAll('#bkWrap .bknav button')].find(x=>x.textContent.includes('Day 4'));
          if(!b)return 'NO-NEXT-BUTTON'; b.click();
          return document.querySelector('#bkWrap').innerHTML;})()""")
        if "Bananas Foster" not in nxt: bad.append("next-chapter nav did not reach Day 4 content")
        if "chapter 5 of 12" not in nxt: bad.append("next-chapter nav landed on the wrong chapter")
        back=await pg.evaluate("(function(){closeBook();return [document.querySelector('#houseMain').style.display,document.querySelector('#bkWrap').style.display,document.querySelector('#p-house').innerHTML.includes('Points of Passion')];})()")
        if back[0]=="none" or back[1]!="none" or not back[2]:
            bad.append(f"closeBook did not restore How We Work: {back}")
        sb=await pg.evaluate("search('points of passion').map(h=>h.w).join('|')")
        if "Mo's Book" not in sb: bad.append(f"search miss book: {sb[:90]}")
        await pg.evaluate("openBook(6)")
        ow=await pg.evaluate("(function(){const d=document.documentElement;return [d.scrollWidth,window.innerWidth];})()")
        if ow[0]>ow[1]+2: bad.append(f"book chapter overflows sideways: {ow}")
        await pg.evaluate("closeBook()")

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
