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
        # "Staffing this night" was a sub-heading inside this output; it was removed 8/7
        # as redundant (this whole panel IS the night forecast). Rows below still assert.
        for cell in ["CUT TERRITORY","$175","Night net","39 covers x $115","Bussers","Expo / food run","Bar","room to cut","bar-top tips"]:
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
        if "Old Specials" not in mn: bad.append("rotating-specials heading missing")
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
                  kids:at('Kids Menu'),notnow:at('Old Specials'),
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
        ph=await pg.evaluate("JSON.stringify(MENU['Entrees'])")
        if "26 oz NY strip" not in ph or "12 oz filet" not in ph or "10 oz bone" not in ph:
            bad.append("porterhouse ounces not updated")
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
        if ex["n"]<5: bad.append(f"reference tab has {ex['n']} sections, expected 5")
        if ex["open"]: bad.append("reference tab sections start open")
        for cell in ["Caymus Special","fog-cooled","Sunny Day","Smockton"]:
            if cell not in ex["html"]: bad.append(f"reference tab missing {cell}")
        if await pg.evaluate("document.querySelector('#p-wine').innerHTML.includes('Power vs Precision')"):
            bad.append("wine of the week still on the wine tab")
        # regions carry a short why-it-matters
        rg=await pg.evaluate("REGIONS")
        if len(rg)<12: bad.append(f"REGIONS has {len(rg)}, expected 12")
        if any(len(r[1])>46 for r in rg): bad.append("a region's why-it-matters is too long to sit beside a wine")
        if not any("fog-cooled" in r[1] for r in rg): bad.append("Russian River fog note missing")
        if await pg.evaluate("WINES.some(w=>/7\\/3 sheet/.test(w.r))"): bad.append("a wine still cites the 7/3 sheet")
        # spinalis split + manager cuts + salmon verify
        if not await pg.evaluate("SPECIALS_ON.some(s=>s[0]==='Spinalis Sunday'&&s[3]==='weekly feature')"):
            bad.append("Spinalis Sunday is not a weekly feature")
        if not await pg.evaluate("SPECIALS_ON.some(s=>s[0]==='Spinalis / Ribeye Cap'&&s[3]==='cut special')"):
            bad.append("Spinalis is not listed as its own cut special")
        for cut in ["48 oz USDA Choice Porterhouse","Australian Wagyu Tomahawk","Spinalis / Ribeye Cap"]:
            if not await pg.evaluate(f"SPECIALS_ON.some(s=>s[0]==={cut!r}&&/manager/i.test(s[2]))"):
                bad.append(f"{cut} does not say a manager cuts it")
        if not await pg.evaluate("SPECIALS_ROTATION.every(s=>/VERIFY/i.test(s[1]))"):
            bad.append("both salmon specials should flag the price")

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
        rib=await pg.evaluate("JSON.stringify(MENU['Entrees'].find(x=>/45-Day/.test(x[0])))")
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
