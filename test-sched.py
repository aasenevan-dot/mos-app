import asyncio, pathlib, sys
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
    # resolve index.html next to this script, so the suite runs on any machine
    # (it was pinned to the Cowork container path and could only ever run there)
    url=(pathlib.Path(__file__).parent/"index.html").resolve().as_uri(); bad=[]
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
        for cell in ['<span class="dw">We</span>8/12','class="off"','class="ro"','Barbie','3 MGR','5 Busser','>15<','colspan="8">Managers','covrow','Covers \u00b7 Sun 8/9']:
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
        # The day selector defaults to TODAY when today falls inside the posted week, and to
        # day 0 when it doesn't (e.g. next week's sheet goes up before the week starts). So
        # drive it to the Friday explicitly rather than asserting whatever today happens to
        # produce -- otherwise this test silently depends on the calendar.
        await pg.evaluate("document.querySelector('#ipDay').value='2';ipPrefill();calcIP()")
        # Staffing prefills come off whichever week is posted, so assert them against the
        # roster in SCHEDULE rather than pinning last week's numbers. This still catches a
        # broken prefill; it just doesn't break every time a new sheet goes up.
        want=await pg.evaluate("""(function(){
          const cnt=n=>{const s=SCHEDULE.sections.find(x=>x[0]===n); if(!s)return 0;
            return s[1].filter(r=>{const c=String(r[3]||'').trim();
              return c && c!=='?' && !/^off\\??$/i.test(c) && !/^ro\\??$/i.test(c);}).length;};
          return {b:SCHEDULE.sections.find(x=>x[0]==='Fronts')[2][2],
                  t:Math.min(cnt('Fronts'),cnt('Backs')), c:Math.min(3,cnt('Cktail')),
                  bu:cnt('Busser'), ex:cnt('Expo'), br:cnt('Bar')};})()""")
        vals=await pg.evaluate("({d:document.querySelector('#ipDay').value,b:document.querySelector('#ipBooks').value,t:document.querySelector('#ipTeams').value,c:document.querySelector('#ipCk').value,bu:document.querySelector('#ipBus').value,ex:document.querySelector('#ipExpo').value,br:document.querySelector('#ipBar').value,g:document.querySelector('#bqcGratPct').value})")
        exp={"d":"2","b":str(want["b"]),"t":str(want["t"]),"c":str(want["c"]),"bu":str(want["bu"]),"ex":str(want["ex"]),"br":str(want["br"]),"g":"23"}
        if vals!=exp: bad.append(f"prefills wrong: {vals} != roster-derived {exp}")
        ipout=await pg.evaluate("document.querySelector('#ipOut').innerHTML")
        # "Staffing this night" was a sub-heading inside this output; it was removed 8/7
        # as redundant (this whole panel IS the night forecast). Rows below still assert.
        for cell in ["CUT TERRITORY","$175","Night net",f"{want['b']} covers x $115","Bussers","Expo / food run","Bar","room to cut","bar-top tips"]:
            if cell not in ipout: bad.append(f"default forecast missing {cell}")
        # Real-net override. The golden dollar figures below were computed for a specific
        # staffing shape, so pin the staffing inputs explicitly — this is a check on the
        # checkout MATH, and it must not move when a new week is posted.
        await pg.evaluate("""(function(){const set=(id,v)=>{document.querySelector(id).value=v;};
          set('#ipBooks','39');set('#ipTeams','7');set('#ipCk','2');set('#ipBus','2');
          set('#ipExpo','2');set('#ipBar','3');set('#ipNet','8000');calcIP();})()""")
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
        # 13 type chips since Port joined the list (8/7)
        if nb!=[13,3,0]: bad.append(f"wine chip rows wrong: {nb}")
        wg=await pg.evaluate("wineFilter.v='chard';renderWines();document.querySelector('#wineGrid').innerHTML")
        # Mer Soleil was pulled 8/7 — the app said "do NOT pitch it" while it sat live
        if "Chablis" not in wg or "Beam Chardonnay" not in wg:
            bad.append("chardonnay filter misses bottle+glass")
        if "Mer Soleil" in await pg.evaluate("JSON.stringify(WINES)"):
            bad.append("Mer Soleil is back on the live wine list")
        if "Caymus" in wg: bad.append("chardonnay filter leaking reds")
        wg=await pg.evaluate("wineFilter.v='cab';wineFilter.serve='glass';renderWines();document.querySelector('#wineGrid').innerHTML")
        if "Ghost Pines" not in wg or "Silver Oak" in wg: bad.append("glass+cab combo wrong")
        await pg.evaluate("wineFilter.v='all';wineFilter.serve='all';renderWines()")
        # ---- home before-you-walk-up grid ----
        home=await pg.evaluate("document.querySelector('#p-shift').innerHTML")
        if "Starters" not in home or "5–12 min" not in home: bad.append("Starters tile missing")
        if "Manager alert" in home: bad.append("Manager alert tile still on home")
        if "Bordeaux" not in home or "250" not in home: bad.append("Bordeaux fact lost")
        if "Post &amp; Beam" not in home: bad.append("wine move by-the-glass picks missing")
        if "answers people miss" in home: bad.append("missed-answers tile still on home")
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
        # ---- the handbook curtain (8/10) ----
        await pg.evaluate("go('house')"); await pg.wait_for_timeout(300)
        locked=await pg.evaluate("document.querySelector('#p-house').innerText")
        if "Gum chewing" in locked: bad.append("handbook body is readable while locked")
        if "staff only" not in locked.lower(): bad.append("handbook does not show as staff only")
        if await pg.evaluate("""(()=>{const h=search('dress code').find(x=>/Handbook/i.test(x.w));
            return h? /Act professionally/.test(h.d) : false;})()"""):
            bad.append("search leaks the handbook body while it is locked")
        await pg.evaluate("document.querySelector('#hbPw').value='nope'; hbTry();")
        await pg.wait_for_timeout(150)
        if await pg.evaluate("HBOPEN===true"): bad.append("the wrong password opened the handbook")
        await pg.evaluate("document.querySelector('#hbPw').value='GreatSteaks'; hbTry();")
        await pg.wait_for_timeout(350)
        if not await pg.evaluate("HBOPEN===true"): bad.append("the right password did not open the handbook")
        if await pg.evaluate("document.querySelectorAll('#hbGate details').length")<10:
            bad.append("handbook sections did not render after unlocking")

        # ---- distribution round: about + events + lillian email ----
        h2v=await pg.evaluate("document.querySelector('#p-house').innerHTML")
        if "About this app" not in h2v: bad.append("About section missing")
        if "Lillian@mosgreenwood.com" not in h2v: bad.append("Lillian email missing from handbook")
        spv=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        for cell in ["Sundresses &amp; Sangria","Surf &amp; Turf Cup","Prisoner Wine Dinner","Lillian@mosgreenwood.com"]:
            if cell not in spv: bad.append(f"events missing from the schedule tab: {cell}")
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
        nprot=await pg.evaluate("PROTOCOL.length")
        for key,n in [("greet",5),("allergy",nprot)]:
            js="(function(){orderGame('"+key+"');const b=[...document.querySelectorAll('#quizBox .opt')];if(b.length!=="+str(n)+")return false;for(let x=0;x<"+str(n)+";x++){const t=[...document.querySelectorAll('#quizBox .opt')].find(e=>+e.dataset.i===x);t.click();}return document.querySelector('#ogFb').innerHTML.includes('0 wrong taps');})()"
            ok=await pg.evaluate(js)
            if not ok: bad.append(f"order game {key} broken")
        prog=await pg.evaluate("(function(){startQuiz();return document.querySelector('#quizBox .qprog')!==null;})()")
        if not prog: bad.append("progress bar missing")
        await pg.evaluate("startQuiz()")
        # ---- food menu rebuild + 8/7 corrections ----
        await pg.evaluate("go('menu')")
        await pg.wait_for_timeout(350)
        mn=await pg.evaluate("document.querySelector('#p-menu').innerHTML")
        if "Specials" not in mn: bad.append("specials heading missing")
        if "&#9733;" not in mn and "\u2605" not in mn: bad.append("star missing from specials heading")
        if "Not Running Tonight" not in mn: bad.append("rotating-specials heading missing")
        if "Sundresses" in mn: bad.append("dated events still on the food menu")
        if "Archives" not in mn: bad.append("archives section missing")
        # archives + steak temps + A5 must be COLLAPSED accordions, not always-open blocks
        closed=await pg.evaluate("""(function(){
          const d=[...document.querySelectorAll('#p-menu details.acc')];
          return {n:d.length, open:d.filter(x=>x.open).length};})()""")
        if closed["n"]<4: bad.append(f"expected 4+ menu accordions, found {closed['n']}")
        if closed["open"]: bad.append(f"{closed['open']} menu accordions start open")
        order=await pg.evaluate("""(function(){
          const h=[...document.querySelectorAll('#p-menu .sechead h2')].map(x=>x.textContent);
          const at=t=>h.findIndex(x=>x.includes(t));
          return {specials:at('Specials'),starters:at('Starters'),
                  kids:at('Kids Menu'),notnow:at('Not Running Tonight'),
                  arch:at('Archives')};})()""")
        o=order
        if -1 in o.values(): bad.append(f"a food menu section is missing: {o}")
        elif not (0==o["specials"]<o["starters"]<o["kids"]<o["notnow"]<o["arch"]):
            bad.append(f"food menu section order wrong: {o}")
        elif o["notnow"]-o["kids"]!=1:
            bad.append(f"'Not running' sits {o['notnow']-o['kids']} sections after Kids Menu, expected 1")
        if "Steak temperatures" not in mn: bad.append("steak temps missing")
        # cuts, surf & turf and exclusives merged into one "Entrees" section (8/7),
        # and the enhancements table now opens above the steaks
        if mn.index("Entrees")>mn.index("Steak temperatures"):
            bad.append("steak temps are not inside the entrees section")
        if mn.index("Enhancements")>mn.index("Steak temperatures"):
            bad.append("enhancements table should sit above the steak temps")
        if "The A5 pitch" not in mn: bad.append("A5 pitch missing from the A5 dish")
        # data corrections
        # towers merged into Starters (8/7); cuts/surf&turf/exclusives merged into Entrees
        tow=await pg.evaluate("JSON.stringify(MENU['Starters'])")
        for cell in ["Semi-Pro $98 / Baller $190","6 oysters","3 shrimp","half the seafood"]:
            if cell not in tow: bad.append(f"tower detail missing: {cell}")
        # porterhouse corrected to 22/12/10 and moved to the specials board (8/7)
        ph=await pg.evaluate("JSON.stringify(SPECIALS_ON)")
        if "22 oz NY strip" not in ph or "12 oz filet" not in ph or "10 oz bone" not in ph:
            bad.append("porterhouse ounces not updated")
        qz=await pg.evaluate("JSON.stringify(MC.find(q=>/48 oz Porterhouse break down/.test(q.q)))")
        if "22 oz NY strip" not in qz: bad.append("porterhouse quiz answer still on the old ounces")
        if "15 oz NY strip" in qz or "25 oz bone" in qz: bad.append("outdated porterhouse ounces still a quiz option")
        if await pg.evaluate("SPECIALS_ROTATION.length")!=2:
            bad.append("rotating specials should be the two salmon only")
        if await pg.evaluate("SPECIALS_ROTATION.some(s=>/Marsala/.test(s[0]))"):
            bad.append("Chicken Marsala still in the rotation")
        if not await pg.evaluate("SPECIALS_PAST.some(s=>/Marsala/.test(s[0]))"):
            bad.append("Chicken Marsala not archived")
        ns=await pg.evaluate("SOTD.length")
        if ns<18: bad.append(f"soup archive has {ns}, expected 18+")
        for soup in ["Cheddar Broccoli","Corn Chowder","Roasted Poblano","Jalape\u00f1o Beer Cheese"]:
            if not await pg.evaluate(f"SOTD.some(s=>s[0]==={soup!r})"):
                bad.append(f"soup archive missing {soup}")
        if await pg.evaluate("SOTD.some(s=>s[0]==='Poblano')"): bad.append("plain Poblano not renamed")
        if not await pg.evaluate("RECIPES[0].tip&&/fries/i.test(RECIPES[0].tip)"):
            bad.append("ranch fries tip missing")
        tf=await pg.evaluate("JSON.stringify(MENU['Accessories'].find(x=>x[0]==='Truffle Fries'))")
        if "ranch" not in tf.lower(): bad.append("truffle fries ranch note missing")
        if "ketchup" not in tf.lower(): bad.append("truffle fries ketchup missing")
        # 8/7: flags have to earn their place — these were noise and are gone
        noise=await pg.evaluate("""(function(){
          const dead=["Know the U-6","95% crab","Trim + breadcrumbs","Dry aged","Biggest side upsell",
            "Celebration play","New on the menu","Cold water — know why","GF (base)",
            "Pairs with Ruffino Moscato","suggest ranch"];
          const hit=[];
          Object.values(MENU).forEach(a=>a.forEach(i=>{if(dead.includes(i[3]))hit.push(i[0]+": "+i[3]);}));
          return hit;})()""")
        if noise: bad.append(f"retired flags came back: {noise}")
        # utensils belong in the description where a server actually reads them
        for dish,word in [("Lobster Mac N' Cheese","big spoon"),("Baked Potato","bread knife"),
                          ("White Cheddar Mashed Potatoes","serving spoon"),("Grilled Asparagus","tongs"),
                          ("NY Style Cheesecake","spatula"),("Molten Lava Cake","big spoon"),
                          ("A5 Nigiri","per person")]:
            row=await pg.evaluate("(function(){let r=null;Object.values(MENU).forEach(a=>a.forEach(i=>{if(i[0]===%r)r=i;}));return r?r[2]:'';})()" % dish)
            if word not in row.lower(): bad.append(f"{dish} description missing '{word}'")
        bg=await pg.evaluate("JSON.stringify(MENU['Lounge'].find(x=>x[0]==='Prime Beef Burger'))")
        if "ranch" not in bg.lower(): bad.append("burger ranch suggestion missing")
        if "ketchup" not in bg.lower(): bad.append("burger ketchup missing")
        # 8/7: the training slideshow lives under the book in How We Work
        await pg.evaluate("go('house')")
        await pg.wait_for_timeout(300)
        cards=await pg.evaluate("[...document.querySelectorAll('#p-house .bkcard h3')].map(x=>x.textContent)")
        if len(cards)<2 or "Slideshow" not in cards[1]:
            bad.append(f"slideshow card is not under the book: {cards}")
        if "Built on the original" in await pg.evaluate("document.body.innerHTML"):
            bad.append("the old book blurb is back")
        broke=await pg.evaluate("""(function(){
          const out=[];
          for(let i=0;i<DECK.length;i++){
            openDeck(i);
            const st=document.querySelector('#bkWrap .dkstage');
            if(!st){out.push(i+':no stage');continue;}
            if(st.innerText.trim().length<25) out.push(i+':empty');
            if(/__TOC__|undefined|\\[object/.test(st.innerHTML)) out.push(i+':marker');
          }
          closeDeck(); return out;})()""")
        if broke: bad.append(f"slideshow slides broken: {broke[:6]}")
        n=await pg.evaluate("DECK.length")
        if n < 70: bad.append(f"deck only has {n} slides")
        shots=await pg.evaluate("DECK.filter(d=>d.k==='shot').length")
        if not shots: bad.append("deck has no placeholder slides")

        # events moved to the schedule tab
        await pg.evaluate("go('sched')")
        await pg.wait_for_timeout(250)
        sc=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        for cell in ["Events coming up","Sundresses","Prisoner Wine Dinner"]:
            if cell not in sc: bad.append(f"schedule events missing {cell}")

        # ---- search coverage ----
        for q,expect in [("tip out percentages","Money tool"),("how much do i make on 4000","Money tool"),
                         ("who works friday","Schedule"),("what is in our ranch","House recipe"),
                         ("cheddar broccoli","Soup of the day"),("baller","Starters")]:
            hits=await pg.evaluate(f"search({q!r}).map(h=>h.w).join('|')")
            if expect not in hits: bad.append(f"search '{q}' missing {expect}: {hits[:70]}")
        if await pg.evaluate("search('asdfghjkl').length"): bad.append("gibberish search returned hits")
        await pg.evaluate("go('menu')")
        await pg.wait_for_timeout(200)

        # ---- interactive floor plan ----
        await pg.evaluate("go('house')"); await pg.wait_for_timeout(400)
        fp=await pg.evaluate("""(()=>({
          rooms:document.querySelectorAll('#fpRooms button').length,
          drawn:document.querySelectorAll('#fpStage .fptable').length,
          total:FLOORMAP.reduce((n,r)=>n+r.tables.length,0),
          dupes:(()=>{const s=new Set(),d=[];FLOORMAP.forEach(r=>r.tables.forEach(t=>{
            if(s.has(t.t))d.push(t.t); s.add(t.t);}));return d;})(),
          offGrid:FLOORMAP.flatMap(r=>r.tables.filter(t=>t.x<3||t.x>97||t.y<3||t.y>97).map(t=>t.t))
        }))()""")
        # 4 since the Vault stopped being a room of its own and moved onto the Main plan
        if fp["rooms"]!=4: bad.append(f"floor plan shows {fp['rooms']} rooms, expected 4")
        if fp["dupes"]: bad.append(f"a table number appears twice on the plan: {fp['dupes']}")
        if fp["offGrid"]: bad.append(f"tables plotted off the stage: {fp['offGrid']}")
        if fp["total"]<64: bad.append(f"floor plan only has {fp['total']} tables")
        await pg.evaluate("fpPick('74')"); await pg.wait_for_timeout(250)
        det=await pg.evaluate("document.querySelector('#fpDetail').innerText")
        if "Table 74" not in det: bad.append("tapping table 74 did not open its detail")
        if "Curry" not in det: bad.append("table 74 detail does not name the Curry")
        await pg.evaluate("fpToggleSections()"); await pg.wait_for_timeout(250)
        if not await pg.evaluate("[...document.querySelectorAll('#fpStage .fptable')].some(e=>e.style.background)"):
            bad.append("sections toggle did not colour the tables")

        # ---- Spanish mode: it must not damage anything ----
        await pg.evaluate("setLang('es')"); await pg.wait_for_timeout(600)
        es=await pg.evaluate("document.querySelector('#p-menu').innerText")
        for cell in ["Filet Mignon","Bananas Foster","$115"]:
            if cell not in es: bad.append(f"Spanish mode changed something it must not: {cell}")
        if "Especiales" not in es: bad.append("Spanish mode did not translate the menu headings")
        leftover=await pg.evaluate("""(()=>{const p=document.querySelector('#p-menu');
          const w=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);let n,c=0;
          while(n=w.nextNode()){const s=n.textContent.trim(); if(s.length>2&&(s in ES))c++;}
          return c;})()""")
        if leftover: bad.append(f"{leftover} menu strings have a translation but still render English")
        await pg.evaluate("setLang('en')"); await pg.wait_for_timeout(600)
        if "Especiales" in await pg.evaluate("document.querySelector('#p-menu').innerText"):
            bad.append("toggling back to English left Spanish on screen")

        # ---- 8/7 QC round: leads, GF legend, protocol order ----
        await pg.evaluate("go('menu')")
        await pg.wait_for_timeout(300)
        lead=await pg.evaluate("""(function(){
          const c=[...document.querySelectorAll('#p-menu .mitem')];
          const leads=c.map(x=>x.querySelector('.mlead')).filter(Boolean);
          const longest=Math.max(...leads.map(l=>l.textContent.trim().length));
          const chopped=leads.filter(l=>/\\w\u2026$/.test(l.textContent.trim())).length;
          return {cards:c.length, leads:leads.length, longest:longest, chopped:chopped};})()""")
        if lead["leads"]!=lead["cards"]: bad.append(f"{lead['cards']-lead['leads']} menu rows have no preview line")
        if lead["longest"]>115: bad.append(f"a collapsed preview runs {lead['longest']} chars")
        if lead["chopped"]: bad.append(f"{lead['chopped']} previews cut off mid-word")
        mtxt=await pg.evaluate("document.querySelector('#p-menu').innerText")
        if "Menu marks GF" in mtxt: bad.append("'Menu marks GF' phrasing still in the menu")
        if "GF" not in mtxt or "gluten-free" not in mtxt: bad.append("GF legend missing")
        if "NOT vegetarian" in mtxt: bad.append("redundant risotto vegetarian line still there")
        # allergy protocol order, and the study-sheet line is gone
        pr=await pg.evaluate("PROTOCOL")
        if len(pr)!=3: bad.append(f"protocol has {len(pr)} steps, expected 3")
        want=["back server","expo","chef","manager"]
        # steps 3-6 were merged into one line, so position-in-list no longer separates
        # them - check the four read in order across the joined text instead.
        flat=" | ".join(pr).lower()
        idx=[flat.find(w) for w in want]
        if -1 in idx or idx!=sorted(idx): bad.append(f"protocol order wrong: {pr}")
        if any("guarantee" in x.lower() for x in pr): bad.append("study-sheet step not deleted")
        # the wine move card
        hm=await pg.evaluate("document.querySelector('#p-shift').innerText")
        for cell in ["Post & Beam","Belle Glos","Caymus","lighter and smoother","bigger and richer",
                     "corked","manager opens and pours"]:
            if cell.lower() not in hm.lower(): bad.append(f"wine move missing: {cell}")
        if await pg.evaluate("WINE_MOVE.glass.length")!=3: bad.append("wine move should show 3 by-the-glass")
        if await pg.evaluate("WINE_MOVE.bottle.length")!=3: bad.append("wine move should show 3 bottles")

        # ---- 8/7 round: logo home, drinks archive, reference tab, spinalis ----
        await pg.evaluate("go('wine')")
        await pg.wait_for_timeout(150)
        await pg.evaluate("document.querySelector('#brandHome').click()")
        await pg.wait_for_timeout(200)
        if await pg.evaluate("TAB")!="shift": bad.append("logo does not go home")
        # archived cocktails must not appear under All drinks
        await pg.evaluate("go('cocktails')")
        await pg.wait_for_timeout(250)
        shown=await pg.evaluate("document.querySelectorAll('#drinkGrid .card').length")
        active=await pg.evaluate("DRINKS_ALL.filter(d=>d.cat!=='verify').length")
        if shown!=active: bad.append(f"All drinks shows {shown}, expected {active} (archive leaking)")
        # 8/7: the drink tab is ONE organizer now — no per-spirit section headings
        dsecs=await pg.evaluate("[...document.querySelectorAll('#p-cocktails .sechead h2')].map(h=>h.textContent)")
        if dsecs!=["Garnishes","Flavors","Drink Menu"]:
            bad.append(f"drink tab sections drifted: {dsecs}")
        # every spirit and beer must be reachable as a card, not just as a table row
        miss=await pg.evaluate("""(function(){
          const names=new Set(DRINKS_ALL.map(d=>d.n)); const gone=[];
          Object.values(SPIRITS).forEach(rows=>rows.forEach(r=>{
            if(!names.has(r[0])&&!DRINK_NOTES.some(n=>n[0]===r[0])) gone.push(r[0]);}));
          BEER.forEach(b=>{if(!names.has(b[0])) gone.push(b[0]);});
          return gone;})()""")
        if miss: bad.append(f"drinks missing from the one list: {miss[:6]}")
        # archive chip reveals them
        await pg.evaluate("document.querySelector('#drinkGrps button[data-g=\"verify\"]').click()")
        await pg.wait_for_timeout(200)
        arch=await pg.evaluate("document.querySelectorAll('#drinkGrid .card').length")
        if arch!=await pg.evaluate("DRINKS_ALL.filter(d=>d.cat==='verify').length"):
            bad.append("archive chip does not show exactly the archived drinks")
        await pg.evaluate("document.querySelector('#drinkGrps button[data-g=\"all\"]').click()")
        # no duplicate drink names in the merged list
        dup=await pg.evaluate("(function(){const s={};DRINKS_ALL.forEach(d=>s[d.n]=(s[d.n]||0)+1);return Object.keys(s).filter(k=>s[k]>1);})()")
        if dup: bad.append(f"duplicate drinks in the one list: {dup}")
        if await pg.evaluate("document.querySelector('#drinkGrid').innerHTML.includes('Sunny Day')"):
            bad.append("archived cocktail visible under All drinks")
        arch=await pg.evaluate("""(function(){
          [...document.querySelectorAll('#drinkGrps button')].find(b=>b.dataset.g==='verify').click();
          return document.querySelector('#drinkGrid').innerHTML.includes('Sunny Day');})()""")
        if not arch: bad.append("archive chip does not show archived drinks")
        # the reference tab
        await pg.evaluate("go('extra')")
        await pg.wait_for_timeout(250)
        ex=await pg.evaluate("""(function(){const p=document.querySelector('#p-extra');
          const d=[...p.querySelectorAll('details.acc')];
          return {n:d.length, open:d.filter(x=>x.open).length, html:p.innerHTML};})()""")
        # regions moved to the Wine tab and Conflicts was deleted (8/7), so 3 remain
        if ex["n"]<3: bad.append(f"reference tab has {ex['n']} sections, expected 3")
        if ex["open"]: bad.append("reference tab sections start open")
        for cell in ["Caymus Special","Sunny Day","Smockton"]:
            if cell not in ex["html"]: bad.append(f"reference tab missing {cell}")
        if await pg.evaluate("document.querySelector('#p-wine').innerHTML.includes('Power vs Precision')"):
            bad.append("wine of the week still on the wine tab")
        # regions carry a short why-it-matters
        rg=await pg.evaluate("REGIONS")
        if len(rg)<12: bad.append(f"REGIONS has {len(rg)}, expected 12")
        if any(len(r[1])>46 for r in rg): bad.append("a region's why-it-matters is too long to sit beside a wine")
        if not any("fog-cooled" in r[1] for r in rg): bad.append("Russian River fog note missing")
        # regions now render as cards on the Wine tab, not as a table in Reference
        await pg.evaluate("go('wine')"); await pg.wait_for_timeout(250)
        wt=await pg.evaluate("document.querySelector('#p-wine').innerText")
        if "fog-cooled" not in wt: bad.append("wine tab missing the region cards")
        if await pg.evaluate("WINES.some(w=>/7\\/3 sheet/.test(w.r))"): bad.append("a wine still cites the 7/3 sheet")
        # spinalis split + manager cuts + salmon verify
        if not await pg.evaluate("SPECIALS_ON.some(s=>s[0]==='Spinalis Sunday'&&s[3]==='weekly feature')"):
            bad.append("Spinalis Sunday is not a weekly feature")
        # 8/7: the cut specials read "Manager cut" — except the 45-day, which a
        # manager does NOT cut tableside, so it keeps the plain "cut special" tag
        if not await pg.evaluate("SPECIALS_ON.some(s=>s[0]==='Spinalis / Ribeye Cap'&&s[3]==='Manager cut')"):
            bad.append("Spinalis should be flagged Manager cut")
        if not await pg.evaluate("SPECIALS_ON.some(s=>/45-Day/.test(s[0])&&!s[3])"):
            bad.append("the 45-day should carry NO flag at all")
        if not await pg.evaluate("SPECIALS_ON.filter(s=>s[3]==='Manager cut').length===3"):
            bad.append("expected exactly 3 Manager cut specials")
        for cut in ["48 oz USDA Choice Porterhouse","Australian Wagyu Tomahawk","Spinalis / Ribeye Cap"]:
            if not await pg.evaluate(f"SPECIALS_ON.some(s=>s[0]==={cut!r}&&/manager/i.test(s[2]))"):
                bad.append(f"{cut} does not say a manager cuts it")
        # 8/10: both salmons confirmed at $45 off the pre-shift note, so the VERIFY is gone
        if not await pg.evaluate("SPECIALS_ROTATION.every(s=>s[1]==='$45')"):
            bad.append("both salmon specials should be $45")
        if await pg.evaluate("/VERIFY/i.test(JSON.stringify(SPECIALS_ROTATION))"):
            bad.append("a salmon special still carries a VERIFY flag")
        # the three prices the 8/10 note corrected — pinned so a sync cannot walk them back
        for cut, price in [("48 oz USDA Choice Porterhouse","$170"),
                           ("Australian Wagyu Tomahawk","$140"),
                           ("45-Day 22 oz Dry-Aged Bone-In Ribeye","$110")]:
            if not await pg.evaluate(f"SPECIALS_ON.some(s=>s[0]==={cut!r}&&s[1].indexOf({price!r})===0)"):
                bad.append(f"{cut} is not {price} (8/10 note)")

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
          [SPECIALS_ON,SPECIALS_ROTATION,SPECIALS_PAST].forEach(a=>a.forEach(i=>names.add(i[0])));
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
        # the cut specials left Entrees on 8/7 — they only live on the specials board now
        rib=await pg.evaluate("JSON.stringify(SPECIALS_ON.find(x=>/45-Day/.test(x[0])))")
        if "45-Day 22 oz Dry-Aged Bone-In Ribeye" not in rib: bad.append("45-day ribeye not renamed")
        for cell in ["amino acids","nutty","enzymes"]:
            if cell not in rib: bad.append(f"dry-age story missing {cell}")
        oy=await pg.evaluate("JSON.stringify(MENU['Starters'].find(x=>x[0]==='Seasonal Oysters'))")
        for cell in ["bed of ice","dry-ice smoke","Zesta","cocktail forks are already on the table"]:
            if cell not in oy: bad.append(f"oyster presentation missing {cell}")
        wt=await pg.evaluate("JSON.stringify(MENU['Starters'].find(x=>x[0]==='Wagyu Tacos'))")
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
        hlen=await pg.evaluate("SCHEDULE_HISTORY.length")
        # grows by one every time a week is posted, so assert the picker matches the data and
        # never shrinks below what we already have, rather than pinning an exact number
        if nopts!=hlen: bad.append(f"picker shows {nopts} weeks but history has {hlen}")
        if nopts<38: bad.append(f"history week count {nopts} < 38 — a week was lost")
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
        # ---- floor plan: lives on Money now, merges, plotting, section names ----
        if await pg.evaluate("!!document.querySelector('#p-house #sec-floor')"):
            bad.append("floor plan still on the How We Work tab")
        if not await pg.evaluate("!!document.querySelector('#p-ops #sec-floor')"):
            bad.append("floor plan missing from the Money tab")
        # it has to sit AFTER the night forecast, which is the whole point of moving it
        order=await pg.evaluate("""(()=>{const h=document.querySelector('#p-ops').innerHTML;
          return [h.indexOf('id="sec-income"'),h.indexOf('id="sec-floor"')];})()""")
        if not (0<=order[0]<order[1]): bad.append(f"floor plan is not after the forecast: {order}")
        # the seat-1 corrections Evan called out 8/11
        seats=await pg.evaluate("""(()=>{const a={};FLOORMAP.forEach(r=>r.tables.forEach(t=>a[t.t]=t));
          return {b43:a['43'].seat1,b42:a['42'].seat1,b41:a['41'].seat1,
                  s11:a['11'].shape,d11:a['11'].seat1,s14:a['14'].shape,d14:a['14'].seat1,
                  c65:a['65'].seat1,c84:a['84'].seat1,b91:a['91'].seat1};})()""")
        want={"b43":"W","b42":"W","b41":"W","s11":"bv","d11":"NE","s14":"bv","d14":"NE",
              "c65":"W","c84":"NW","b91":"N"}
        if seats!=want: bad.append(f"seat-1 / shapes wrong: {seats} != {want}")
        # an earlier block picked table 74, which leaves the plan on The Curry -- pin the
        # room rather than inheriting whatever the last assertion happened to leave selected
        await pg.evaluate("go('ops');fpRoom(0)"); await pg.wait_for_timeout(400)
        dots=await pg.evaluate("document.querySelectorAll('#fpStage .fpseat1').length")
        if dots!=14: bad.append(f"Main should draw 14 seat-1 dots (13 tables + the Vault), drew {dots}")
        # the marker is a numeral, not a bare dot -- a dot says a chair is there, a "1" says
        # which chair, and that is the only thing anybody is looking at it for
        if not await pg.evaluate("[...document.querySelectorAll('#fpStage .fpseat1')].every(e=>e.textContent==='1')"):
            bad.append("seat-1 markers are not labelled 1")
        cur=await pg.evaluate("""(()=>{const a={};FLOORMAP.forEach(r=>r.tables.forEach(t=>a[t.t]=t));
          return ['61','71','81'].map(t=>a[t].seat1).join(',');})()""")
        if cur!="NE,NE,NE": bad.append(f"Curry 61/71/81 seat 1 should be NE, got {cur}")
        # lounge booths + Curry wall booths seat 1 on the left; the lounge rounds top-right
        rest=await pg.evaluate("""(()=>{const a={};FLOORMAP.forEach(r=>r.tables.forEach(t=>a[t.t]=t));
          return ['103','102','101','203','202','201','53','52','51'].map(t=>t+':'+a[t].seat1).join(' ');})()""")
        want="103:W 102:W 101:W 203:NE 202:NE 201:NE 53:W 52:W 51:W"
        if rest!=want: bad.append(f"lounge/Curry seat 1 wrong:\n      {rest}\n      {want}")
        if not await pg.evaluate("MERGEABLE.some(m=>m.id==='65+84')"): bad.append("65+84 not pushable")
        if not await pg.evaluate("MERGEABLE.some(m=>m.id==='51+52')"): bad.append("51+52 not pushable")
        # the Vault moved onto the Main plan, left of 24, seat 1 bottom-right
        v=await pg.evaluate("""(()=>{const m=FLOORMAP.find(r=>r.room==='Main');
          const t=m&&m.tables.find(x=>x.t==='100'); const t24=m&&m.tables.find(x=>x.t==='24');
          return t?{lbl:t.lbl,seat1:t.seat1,seats:t.seats,leftOf24:t.x<t24.x}:null;})()""")
        if v!={"lbl":"Vault","seat1":"SE","seats":15,"leftOf24":True}:
            bad.append(f"Vault not placed on Main correctly: {v}")
        # the plan should sit evenly in its box -- the Vault once pushed it hard left
        mg=await pg.evaluate("""(()=>{const st=document.querySelector('#fpStage').getBoundingClientRect();
          let L=1e9,R=-1e9;[...document.querySelectorAll('#fpStage .fptable,#fpStage .fpseat1')]
            .forEach(e=>{const b=e.getBoundingClientRect();L=Math.min(L,b.left);R=Math.max(R,b.right);});
          return {l:(L-st.left)/st.width*100, r:(st.right-R)/st.width*100};})()""")
        if mg["l"]<4 or mg["r"]<4: bad.append(f"plan crowds the stage edge: {mg}")
        if abs(mg["l"]-mg["r"])>5: bad.append(f"plan sits off-centre: left {mg['l']:.1f}%% right {mg['r']:.1f}%%")
        if await pg.evaluate("FLOORMAP.some(r=>r.room==='The Vault')"): bad.append("The Vault is still a separate room")
        if not await pg.evaluate("FLOORMAP.some(r=>r.tables.some(t=>t.t==='91B'))"): bad.append("Smockton 91B missing")
        # every table belongs to exactly one section
        secs=await pg.evaluate("""(()=>{const all={};FLOORMAP.forEach(r=>r.tables.forEach(t=>all[t.t]=1));
          const seen={};SECTIONS.forEach(s=>s.tables.forEach(t=>seen[t]=(seen[t]||0)+1));
          return {dupes:Object.keys(seen).filter(t=>seen[t]>1),
                  orphans:Object.keys(all).filter(t=>!seen[t]),
                  ghosts:Object.keys(seen).filter(t=>!all[t]),
                  named:SECTIONS.every(s=>!!s.name)};})()""")
        if secs["dupes"]: bad.append(f"tables in two sections: {secs['dupes']}")
        if secs["orphans"]: bad.append(f"tables with no section: {secs['orphans']}")
        if secs["ghosts"]: bad.append(f"sections name a table that does not exist: {secs['ghosts']}")
        if not secs["named"]: bad.append("a section has no name")
        if await pg.evaluate("SECTIONS.find(s=>s.name==='Back of Main').tables.indexOf('100')<0"):
            bad.append("the Vault is not in Back of Main")
        # merge -> one element replaces two, party rides across, split puts it back
        await pg.evaluate("FPMERGED=[];FPPARTY={};fpPick('23');fpMerge('23+32')")
        await pg.wait_for_timeout(300)
        if await pg.evaluate("document.querySelectorAll('#fpStage .fptable.merged').length")!=1:
            bad.append("merged table did not render as one element")
        if await pg.evaluate("[...document.querySelectorAll('#fpStage .fptable:not(.merged) span')].some(s=>['23','32'].includes(s.textContent))"):
            bad.append("merged halves still drawn separately")
        await pg.evaluate("""(()=>{document.querySelector('#fpN').value='8';
          document.querySelector('#fpT').value='6:30';fpSeat();})()""")
        await pg.wait_for_timeout(250)
        if "6:30" not in (await pg.evaluate("(document.querySelector('#fpStage .fppty')||{}).textContent||''")):
            bad.append("party badge missing from the plan")
        if "8 covers" not in (await pg.evaluate("document.querySelector('#fpBook').innerText")):
            bad.append("book did not total the covers")
        await pg.evaluate("fpUnmerge('23+32')"); await pg.wait_for_timeout(250)
        if await pg.evaluate("!FPPARTY['23']"): bad.append("splitting the pair dropped the party")
        # section rename flows to the legend and the detail panel
        await pg.evaluate("fpSetWho(9,'ZZTest'); FPSHOWSEC=true; renderFloor(); fpPick('23')")
        await pg.wait_for_timeout(300)
        if "ZZTest" not in (await pg.evaluate("document.querySelector('#fpLegend').innerText")):
            bad.append("renamed section missing from the legend")
        await pg.evaluate("fpResetWho();FPMERGED=[];FPPARTY={};fpSave();renderFloor()")
        if await pg.evaluate("Object.keys(FPWHO).length"): bad.append("reset did not clear the section overrides")

        # ---- Spanish must SURVIVE a repaint ----
        # applyLang ran once inside build(); every panel that repainted on interaction
        # (a filter, the quiz, the plotter, the checkout) came back English -- ~400 nodes
        # on the cocktails list alone. A MutationObserver now re-translates repainted
        # subtrees. Repaint several panels in ES and assert nothing reverts.
        await pg.evaluate("setLang('es')"); await pg.wait_for_timeout(700)
        revert={}
        for call,sel in [("wineFilter.v='chard';renderWines()","#wineGrid"),
                         ("renderDrinks()","#drinkGrid"),
                         ("allergySel.add('gluten');renderAllergens()","#p-allergens"),
                         ("go('ops');calcSC()","#scOut"),
                         ("fpPick('23')","#fpDetail")]:
            await pg.evaluate(call); await pg.wait_for_timeout(120)
            n=await pg.evaluate("""sel=>{const el=document.querySelector(sel);if(!el)return -1;
              let eng=0;const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let x;
              while(x=w.nextNode()){const k=x.textContent.trim();if(ES[k]&&ES[k]!==k&&!x.textContent.includes(ES[k]))eng++;}
              return eng;}""", sel)
            if n>0: revert[sel]=n
        if revert: bad.append(f"Spanish reverted to English after repaint: {revert}")
        # and switching back leaves nothing in Spanish
        await pg.evaluate("setLang('en')"); await pg.wait_for_timeout(600)
        spleft=await pg.evaluate("""(()=>{let sp=0;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
          while(n=w.nextNode()){const t=n.textContent.trim();if(t.length<3)continue;for(const k in ES){if(ES[k]===t&&k!==t){sp++;break;}}if(sp>3)break;}return sp;})()""")
        if spleft: bad.append(f"Spanish text left over after switching back to English: {spleft}")

        # ---- guest wifi: in How We Work, and findable however anybody types it ----
        if "GreatSteaks" not in await pg.evaluate("document.querySelector('#p-house').innerText"):
            bad.append("wifi password missing from How We Work")
        WIFI=["wifi","wi-fi","wi fi","WIFI","wifi password","password","internet","network",
              "wireless","guest wifi","wifi code","wifi pw","free wifi","wifi info","network name",
              "passcode","hotspot","greatsteaks","wifi?","what is the wifi password",
              "netowrk","wifi passwrod","is there guest wifi","do you guys have wifi",
              "how do i connect to the internet here","does the restaurant have free wifi for customers"]
        wmiss=[]; wnot1=[]
        for q in WIFI:
            r=await pg.evaluate("q=>search(q).map(h=>h.w+'|'+h.t)", q)
            idx=next((i for i,x in enumerate(r) if "At the table" in x), None)
            if idx is None: wmiss.append(q)
            elif idx!=0: wnot1.append(q)
        if wmiss: bad.append(f"wifi unfindable for: {wmiss}")
        if len(wnot1)>2: bad.append(f"wifi not the top hit for: {wnot1}")
        # the search changes that made that work must not have moved anything else
        for q,expect in [("mise en place","Vocabulary"),("old fashioned","Cocktail"),
                         ("carajillo","Cocktail"),("jury duty","Handbook"),("caymus","Wine"),
                         ("tomahawk","Allergens"),("table 23","Floor plan")]:
            r=await pg.evaluate("q=>search(q).map(h=>h.w+' | '+h.t).slice(0,1)", q)
            if not r or not r[0].startswith(expect):
                bad.append(f"search moved: {q!r} -> {r[0] if r else '(none)'}, wanted {expect}")
        # word-boundary ranking: a partial-substring must not beat the real word match
        for q,want in [("86","Vocabulary"),("evan","Front POS"),("tomahwak","Allergens"),
                       ("wine of the week","Wine of the Week"),("evan schedule","Schedule")]:
            r=await pg.evaluate("q=>search(q).map(h=>h.w).slice(0,1)", q)
            if not r or not r[0].startswith(want):
                bad.append(f"word-boundary rank: {q!r} top {r[0] if r else '(none)'}, wanted {want}")
        # a table appears once, not twice (FLOORMAP + the old photo list both indexed it)
        n=await pg.evaluate("search('table 23').filter(h=>/Table 23$/.test(h.t)).length")
        if n!=1: bad.append(f"table 23 listed {n} times, expected 1")

        # ---- sharing the board ----
        # off by default: no service configured means no network, and the app is as it was
        if not await pg.evaluate("typeof FloorSync!=='undefined'"): bad.append("FloorSync client not built in")
        if await pg.evaluate("FLOOR_SYNC.url||FLOOR_SYNC.key"): bad.append("FLOOR_SYNC shipped with a live endpoint")
        if await pg.evaluate("FloorSync.status()!=='off'"): bad.append("sync started without being configured")
        # a board round-trips through a link
        await pg.evaluate("""(()=>{FPMERGED=[];FPPARTY={};FPWHO={};fpMerge('23+32');
          FPPARTY={'23+32':{n:8,t:'6:30',name:'Smith'},'41':{n:2,t:'5:45',name:''}};
          fpSetWho(9,'ZZShare');fpSave();renderFloor();})()""")
        code=await pg.evaluate("fpBoardCode()")
        await pg.evaluate("""(()=>{FPMERGED=[];FPPARTY={};FPWHO={};fpSave();renderFloor();})()""")
        await pg.evaluate(f"fpApplyBoard({code!r})")
        rt=await pg.evaluate("JSON.stringify({p:Object.keys(FPPARTY).sort(),m:FPMERGED,w:FPWHO['9'],n:FPPARTY['23+32'].n})")
        if rt!='{"p":["23+32","41"],"m":["23+32"],"w":"ZZShare","n":8}':
            bad.append(f"board did not survive the link round trip: {rt}")
        if len(await pg.evaluate("fpBoardLink()"))>1200: bad.append("share link too long to text")
        # junk must not throw
        for junk in ["", "notbase64!!", "eyJ2Ijo5OTl9"]:
            try:
                await pg.evaluate(f"(()=>{{try{{fpApplyBoard({junk!r})}}catch(e){{}}}})()")
            except Exception as ex:
                bad.append(f"junk board code {junk!r} escaped: {ex}")
        if await pg.evaluate("!FPPARTY['23+32']"): bad.append("junk board code wiped a good board")
        # an already-open app must react to a pasted link (hashchange, not a reload)
        if not await pg.evaluate("""(()=>{const s=Object.getOwnPropertyNames(window);return typeof fpBoardFromLink==='function';})()"""):
            bad.append("fpBoardFromLink missing")
        await pg.evaluate("""(()=>{FPPARTY={'21':{n:4,t:'7:00',name:''}};FPMERGED=[];FPWHO={};fpSave();
          FPINCOMING=null;location.hash='#board='+%s;})()""" % repr(code).replace("'", '"'))
        await pg.wait_for_timeout(250)
        if not await pg.evaluate("!!FPINCOMING"): bad.append("hashchange did not pick up a shared board")
        if await pg.evaluate("!FPPARTY['21']"): bad.append("a shared link silently clobbered the local plot")
        await pg.evaluate("fpTakeIncoming()")
        if await pg.evaluate("!FPPARTY['23+32']"): bad.append("'Load theirs' did not apply the board")
        await pg.evaluate("""(()=>{FPMERGED=[];FPPARTY={};FPWHO={};FPINCOMING=null;fpSave();
          history.replaceState(null,'',location.pathname);renderFloor();})()""")

        # ---- midnight flip: advance mocked clock to Sat 8/8, wait out the 60s watcher ----
        t2=int(datetime.datetime(2026,8,8,0,0,30).timestamp()*1000)
        await pg.evaluate(f"window.__now={t2}")
        await pg.wait_for_timeout(62000)
        h2=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        if "Today — Saturday 8/8" not in h2: bad.append("midnight flip did NOT re-render roster")
        if "Chad" not in h2.split("exactly as posted")[0] or "2pm Carmel" not in h2.split("exactly as posted")[0]:
            bad.append("Saturday roster missing Chad 2pm Carmel")
        await ctx.close()
        # ---- load 2: 8/26/2026 — past the posted week, and no history week covers it ----
        t3=int(datetime.datetime(2026,8,26,15,0).timestamp()*1000)
        ctx=await b.new_context(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
        pg=await ctx.new_page()
        await pg.add_init_script(MOCK % t3)
        await pg.goto(url); await pg.wait_for_timeout(900)
        h3=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        if "isn't on the posted week" not in h3: bad.append("off-week message missing")
        if "Barbie" not in h3: bad.append("off-week still shows master grid? missing")
        await ctx.close()
        # ---- load 3: 8/11/2026 — the sheet for NEXT week is up, but somebody works tonight.
        # The roster must still come from the history week that actually covers today, and
        # the note must say the posted week hasn't started rather than "isn't on the week". --
        t4=int(datetime.datetime(2026,8,11,15,0).timestamp()*1000)
        ctx=await b.new_context(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
        pg=await ctx.new_page()
        await pg.add_init_script(MOCK % t4)
        await pg.goto(url); await pg.wait_for_timeout(900)
        h4=await pg.evaluate("document.querySelector('#p-sched').innerHTML")
        head=h4.split("exactly as posted")[0]
        if "Today — Tuesday 8/11" not in head: bad.append("8/11 roster not pulled from the history week")
        if "is already posted below" not in head: bad.append("ahead-of-the-week note missing")
        if "isn't on the posted week" in head: bad.append("still says today isn't on the posted week")
        if "Alexis" not in head: bad.append("8/11 roster empty — nobody listed for tonight")
        await b.close()
    if bad:
        print("SCHED TEST FAILED:"); [print("  -",x) for x in bad]; sys.exit(1)
    print("SCHED TEST ALL GOOD — Friday roster right, midnight flip re-rendered to Saturday, off-week message shows.")

asyncio.run(main())
