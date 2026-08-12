
/* ============================================================
   APP — team edition
   ============================================================ */
const $ = s=>document.querySelector(s);
const esc = s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $d=n=>"$"+Math.round(n).toLocaleString();
/* money and headcount fields can never be negative. The inputs carry min="0", but that
   only stops the spinner arrows — a typed or pasted "-" still got through and printed
   nonsense like "−$-21" on the checkout. Read every one of them through this. */
const $n=s=>Math.max(0,+$(s).value||0);

const TABS = [
  ["shift","Home"],["sched","Schedule"],["wine","Wine"],["cocktails","Drinks & Garnish"],["menu","Food Menu & Specials"],
  ["allergens","Allergens"],["study","Study & Quiz"],["ops","Money"],["pos","Front POS"],
  ["house","How We Work"],["vocab","Vocabulary"],["extra","Reference & Archive"]
];
const ICONS={
 home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
 wine:'<svg viewBox="0 0 24 24"><path d="M8 3h8l-.8 6.5a3.5 3.5 0 01-6.4 0z"/><path d="M12 13v7M8 21h8"/></svg>',
 drinks:'<svg viewBox="0 0 24 24"><path d="M4 4h16l-8 9z"/><path d="M12 13v7M8 21h8"/></svg>',
 money:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.2c0 3 6 1.6 6 4.6 0 1.2-1.3 2.2-3 2.2s-3-1.1-3-2.5"/></svg>',
 more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 5.9L12 16.4 6.7 19.3l1.2-5.9L3.4 9.3l6-.7z"/></svg>',
 /* Food Menu mark — the SAME fork and spoon as the Food menu tile on Home. Evan asked
    for this twice; a Cowork round reverted it to the star in between. The tab and the
    tile have to read as one thing. Star stays defined for a specials section. */
 menu:'<svg viewBox="0 0 24 24"><path d="M2.6 2.2v5.6c0 1.9 1.5 3.2 3.4 3.4M9.4 2.2v5.6c0 1.9-1.5 3.2-3.4 3.4"/><path d="M4.9 2.2v5.9M7.1 2.2v5.9"/><path d="M6 11.2v10.4"/><ellipse cx="18.2" cy="6.6" rx="2.9" ry="4"/><path d="M18.2 10.6v11"/></svg>'
};
const BOTTOM=[["shift","Home","home"],["wine","Wine","wine"],["cocktails","Drinks","drinks"],["menu","Food Menu","menu"],["ops","Money","money"],["__more","More","more"]];

/* One symbol per quick-action tile, keyed by the tile's data-qa. Same 24x24 stroke style
   as the bottom bar so the app still looks like one thing. Sits in the top-right corner
   rather than beside the title: these tiles get down to ~160px on a phone and an inline
   icon would squeeze the text into more lines. */
const QAICONS={
  "ops|#sec-floor":'<svg viewBox="0 0 24 24"><rect x="7.6" y="8.6" width="8.8" height="6.8" rx="1.4"/><circle cx="12" cy="4.6" r="1.7"/><circle cx="12" cy="19.4" r="1.7"/><circle cx="4.6" cy="12" r="1.7"/><circle cx="19.4" cy="12" r="1.7"/></svg>',
 /* calendar */
 "sched|":'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 2.8v4M16 2.8v4"/></svg>',
 /* martini with an olive on a pick — the garnish IS the point */
 "cocktails|#sec-garnish":'<svg viewBox="0 0 24 24"><path d="M4 5.5h16l-8 8z"/><path d="M12 13.5v6M8.5 19.5h7"/><path d="M14.6 4.1l-2.4 2.4"/><circle cx="15.6" cy="3.1" r="1.5"/></svg>',
 /* a shelled peanut — the universal allergen symbol */
 "allergens|#sec-allergy":'<svg viewBox="0 0 24 24"><path d="M9.4 3.2C6.1 3.2 3.4 5.7 3.4 8.8c0 2.2 1.3 4.1 3.1 5 .8.4 1.2 1 1.4 1.9.5 2.3 2.6 4.1 5.1 4.1 3.3 0 6-2.5 6-5.6 0-2.2-1.3-4.1-3.1-5-.8-.4-1.2-1-1.4-1.9-.5-2.3-2.6-4.1-5.1-4.1z"/></svg>',
 /* the wine glass proper — this is the tab servers reach for, so it reads as wine first */
 "wine|#sec-bottles":'<svg viewBox="0 0 24 24"><path d="M6.6 2.6h10.8l-1.1 7.6a4.4 4.4 0 01-8.6 0z"/><path d="M12 14.6v5.8M8 20.6h8"/></svg>',
 /* a glass AND a four-prong fork — the pairing is wine plus the food */
 "wine|#sec-pair":'<svg viewBox="0 0 24 24"><path d="M2 3h5.8l-.6 4.4a2.3 2.3 0 01-4.6 0z"/><path d="M4.9 9.7v8.9M3.1 18.6h3.6"/><path d="M13.6 2.2v5.6c0 1.9 1.5 3.2 3.4 3.4M20.4 2.2v5.6c0 1.9-1.5 3.2-3.4 3.4"/><path d="M15.9 2.2v5.9M18.1 2.2v5.9"/><path d="M17 11.2v10.4"/></svg>',
 /* calculator */
 "ops|#sec-checkout":'<svg viewBox="0 0 24 24"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><path d="M7.8 6.6h8.4"/><path d="M8.2 11.2h.01M12 11.2h.01M15.8 11.2h.01M8.2 14.6h.01M12 14.6h.01M15.8 14.6h.01M8.2 18h.01M12 18h.01M15.8 18h.01"/></svg>',
 /* crescent moon — calling the night before it happens */
 "ops|#sec-income":'<svg viewBox="0 0 24 24"><path d="M20.5 14.6A8.6 8.6 0 019.4 3.5a8.6 8.6 0 1011.1 11.1z"/></svg>',
 /* question mark */
 "study|#sec-quiz":'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2"/><path d="M9.3 9.3a2.8 2.8 0 015.4.8c0 1.9-2.7 2.4-2.7 4"/><path d="M12 17.7h.01"/></svg>',
 /* fork and spoon — four prongs converging to a point, like a real dinner fork */
 "menu|":'<svg viewBox="0 0 24 24"><path d="M2.6 2.2v5.6c0 1.9 1.5 3.2 3.4 3.4M9.4 2.2v5.6c0 1.9-1.5 3.2-3.4 3.4"/><path d="M4.9 2.2v5.9M7.1 2.2v5.9"/><path d="M6 11.2v10.4"/><ellipse cx="18.2" cy="6.6" rx="2.9" ry="4"/><path d="M18.2 10.6v11"/></svg>',
 /* magnifier */
 "__search|":'<svg viewBox="0 0 24 24"><circle cx="10.6" cy="10.6" r="6.6"/><path d="M20 20l-4.7-4.7"/></svg>'
};

const FLAGMAX=33; /* longest flag that still rides inline beside a dish name */

let TAB = "shift";

function buildNav(){
  $("#nav").innerHTML = TABS.map(([k,l])=>`<button data-t="${k}"${k===TAB?' class="on"':''}>${l}</button>`).join("");
  $("#nav").onclick = e=>{const b=e.target.closest("button"); if(b) go(b.dataset.t);};
  $("#bbar").innerHTML = BOTTOM.map(([k,l,i])=>`<button data-t="${k}">${ICONS[i]}<span>${l}</span></button>`).join("");
  $("#bbar").onclick = e=>{const b=e.target.closest("button"); if(!b)return;
    if(b.dataset.t==="__more"){openSheet();return;} go(b.dataset.t);};
  syncBars();
}
function syncBars(){
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===TAB));
  const inBar=BOTTOM.some(x=>x[0]===TAB);
  document.querySelectorAll("#bbar button").forEach(b=>
    b.classList.toggle("on", b.dataset.t===TAB || (b.dataset.t==="__more" && !inBar)));
  /* the top row is a slider — keep the active tab centered in view as it changes.
     rAF so this measures/scrolls after the panel-switch reflow above has settled. */
  requestAnimationFrame(()=>{
    const onBtn=$("#nav button.on");
    if(onBtn)onBtn.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"});
  });
}
function go(t,sel){
  TAB=t; closeSheet();
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("on",p.id==="p-"+t));
  syncBars();
  if(sel){setTimeout(()=>{const el=document.querySelector(sel); if(el)el.scrollIntoView({behavior:"smooth"});},80);}
  else window.scrollTo({top:0,behavior:"instant"});
}
function openSheet(){
  $("#sheetin").innerHTML=`
    <h3>All sections</h3>
    <div class="row">${TABS.map(([k,l])=>`<button class="item${k===TAB?" on":""}" data-t="${k}">${l}</button>`).join("")}</div>
    <h3>Tools</h3>
    <div class="row">
      <button class="item" id="shSzDn">A− Smaller text</button>
      <button class="item" id="shSzUp">A+ Bigger text</button>
      <button class="item" id="shDark">${document.documentElement.classList.contains("dark")?"Light mode":"Dark mode"}</button>
      <button class="item" id="shLang">${LANG==="es"?"English":"Espa\u00f1ol"}</button>
      <button class="item" id="shPrint">Print this tab</button>
    </div>`;
  $("#sheet").classList.add("open");
  $("#sheetin").querySelectorAll("button.item[data-t]").forEach(b=>b.onclick=()=>go(b.dataset.t));
  $("#shSzDn").onclick=()=>$("#szDn").click();
  $("#shSzUp").onclick=()=>$("#szUp").click();
  $("#shDark").onclick=()=>{$("#darkT").click();closeSheet();};
  $("#shLang").onclick=()=>{closeSheet();setLang(LANG==="es"?"en":"es");};
  $("#shPrint").onclick=()=>{closeSheet();setTimeout(()=>window.print(),150);};
}
function closeSheet(){$("#sheet").classList.remove("open");}

/* ---------- WINE ---------- */
function winePrice(w){const n=(w.p.match(/\d+/g)||[]).map(Number);return n[n.length-1]||0;}
function wineColor(w){
  if(w.c==="champ")return "bubbles";
  if(w.c==="gwhite")return "white";
  return /Chablis|Macon|Chardonnay|Rose\b|Riesling|Grigio|Moscato|Sauvignon/i.test(w.n)?"white":"red";
}
const BUDGETS=[["all","Any price"],["0-75","Under $75"],["75-125","$75–125"],["125-200","$125–200"],["200-350","$200–350"],["350-9999","$350+"]];
function wineCard(w){
  return `<div class="card">
    <div class="crow"><div><div class="cname">${esc(w.n)}</div><div class="csub">${esc(w.r)}</div></div><div class="cprice">${esc(w.p)}</div></div>
    <div class="cbody"><b>Tastes like:</b> ${esc(w.f)}<br><b>Structure:</b> tannin ${esc(w.T)} &middot; acid ${esc(w.A)} &middot; body ${esc(w.B)}<br><b>Finish:</b> ${esc(w.fin)}<br><b>Pair with:</b> ${esc(w.pair)}</div>
    <div class="pitch">&ldquo;${esc(w.pitch)}&rdquo;</div>
    <div class="tags"><span class="tag ${w.t.toLowerCase()}">${w.t}</span><span class="tag">${(WINE_TYPES.find(c=>c[0]===w.v)||[,w.v])[1]}</span>${w.btg?`<span class="tag good">BY THE GLASS</span>`:""}${w.c==="old"?`<span class="tag">Old World</span>`:""}</div>
  </div>`;
}
let wineFilter={v:"all",serve:"all",tier:"all",q:"",price:"all",color:"all"};
function renderWines(){
  const q=wineFilter.q.toLowerCase();
  let [lo,hi]=[0,1e9];
  if(wineFilter.price!=="all"){const p=wineFilter.price.split("-");lo=+p[0];hi=+p[1];}
  const list=WINES.filter(w=>
    (wineFilter.v==="all"||w.v===wineFilter.v)&&
    (wineFilter.serve==="all"||(wineFilter.serve==="glass"?w.btg:!w.btg))&&
    (wineFilter.tier==="all"||w.t===wineFilter.tier)&&
    (wineFilter.color==="all"||wineColor(w)===wineFilter.color)&&
    (wineFilter.price==="all"||(winePrice(w)>=lo&&winePrice(w)<=hi))&&
    (!q||(w.n+w.r+w.f+w.pair+w.pitch).toLowerCase().includes(q)));
  $("#wineCount").textContent = list.length+" match"+(list.length===1?"":"es");
  $("#wineGrid").innerHTML = list.length?list.map(wineCard).join(""):'<div class="empty">Nothing in that lane. Widen the price, the type, or the glass filter.</div>';
}
function pairingOut(i){
  const p=PAIRINGS[i];
  const lane=(label,arr,cls)=>`<div style="margin-bottom:10px"><span class="tag ${cls}">${label}</span><div style="margin-top:5px;font-size:13.5px">${arr.map(n=>{
    const w=WINES.find(x=>x.n.indexOf(n)===0||x.n===n);
    return `<div style="padding:3px 0"><b>${esc(n)}</b>${w?` <span style="color:var(--gold2)">${esc(w.p)}</span>`:""}</div>`;}).join("")}</div></div>`;
  $("#pairOut").innerHTML = `<div class="note gold" style="margin-top:0"><b>Say this:</b> &ldquo;${esc(p.line)}&rdquo;</div>
    ${lane("GOOD",p.good,"good")}${lane("BETTER",p.better,"better")}${lane("BEST",p.best,"best")}`;
}

/* ---------- COCKTAILS ---------- */
function drinkCard(c){
  /* one card shape for everything in the drink list — a cocktail fills in build and
     garnish, a bottle only has a descriptor, and the card just drops the empty rows */
  return `<div class="card">
    <div class="crow"><div><div class="cname">${esc(c.n)}</div><div class="csub">${esc(c.sub||"")}</div></div><div class="cprice">${esc(c.p)}</div></div>
    <div class="cbody">${c.build?`<b>Build:</b> ${esc(c.build)}<br>`:""}${c.desc?`<b>${c.build?"Tastes like":"Say this"}:</b> ${esc(c.desc)}`:""}</div>
    ${c.garnish&&c.garnish!=="—"?`<div class="garnish"><b>Garnish:</b> ${esc(c.garnish)}</div>`:""}
    ${c.note?`<div class="tags"><span class="tag ${c.cat==="verify"?"warn":""}">${esc(c.note)}</span></div>`:""}
  </div>`;
}
/* ---------- ONE DRINK LIST ----------
   Evan 8/7: the drink tab was a cocktail grid followed by eleven separate bottle
   tables. It is now built like the wine organizer — every non-wine drink in one
   filterable grid. SPIRITS rows and BEER rows get normalized into the same card
   shape the cocktails already use, so nothing on screen looks like a second system. */
const DRINK_CATS=[["all","All drinks"],["cocktail","Cocktails"],["bourbon","Bourbon"],
  ["whiskey","Whiskey"],["scotch","Scotch"],["tequila","Tequila"],["cognac","Cognac"],
  ["beer","Beer & seltzer"],["cordial","Cordials"],["nonalc","Coffee, Tea & Water"],
  ["verify","Archive — off the menu"]];
const DRINK_BUDGETS=[["all","Any price"],["0-17","Under $18"],["18-35","$18–35"],
  ["36-9999","$35+"]];
/* which filter chip each SPIRITS heading belongs under */
const SPIRIT_CAT={"Bourbon":"bourbon","Bardstown":"bourbon","High-End Whiskey":"whiskey",
  "Tennessee":"whiskey","Scotch":"scotch","Tequila":"tequila","Cognac":"cognac",
  "On Draft":"cocktail","Cordials":"cordial","Coffee":"nonalc"};
/* rows that point somewhere else rather than name something pourable */
const DRINK_NOTES=[
  ["Smoked Draft Old Fashioned","One of the two draft lines. It is in the list as a cocktail — the full build is on its card."],
  ["Tito's and Cranberry","The other draft line. It pours ready off the tap."],
  ["Straight tequila list","The straight tequila shelf was never captured. Pull the current list from Toast before you quote one. El Charro and LALO are the two we pour into cocktails."]
];
var DRINKS_ALL=[];
function buildDrinkIndex(){
  const out=[];
  COCKTAILS.forEach(c=>out.push({n:c.n,p:c.p,cat:c.grp==="verify"?"verify":"cocktail",
    sub:c.base+(c.glass&&c.glass!=="—"?" · "+c.glass:""),build:c.build,desc:c.desc,
    garnish:c.garnish,note:c.note,grp:c.grp,from:COCKTAIL_GRPS.reduce((a,g)=>g[0]===c.grp?g[1]:a,"Cocktail")}));
  /* Pointer rows, not drinks: they made sense as the last line of their own table,
     but in one merged list they read as something a guest could order. They render
     as notes under the grid instead — nothing is lost, it is just not a card. */
  Object.entries(SPIRITS).forEach(([sec,rows])=>{
    const key=Object.keys(SPIRIT_CAT).find(k=>sec.indexOf(k)===0)||"";
    const cat=SPIRIT_CAT[key]||"bourbon";
    rows.forEach(r=>{
      if(DRINK_NOTES.some(n=>n[0]===r[0]))return;
      out.push({n:r[0],p:r[1],cat:cat,sub:sec.replace(/ —.*$/,"").replace(/ \(.*\)$/,""),
        build:"",desc:r[2],garnish:"",note:"",from:sec});
    });
  });
  BEER.forEach(b=>out.push({n:b[0],p:b[1],cat:"beer",sub:b[2],build:"",desc:b[3],
    garnish:"",note:"",from:"Beer & seltzer"}));
  DRINKS_ALL=out;
}
function drinkPrice(d){const m=String(d.p).match(/\$(\d+)/);return m?+m[1]:-1;}
let drinkFilter={grp:"all",q:"",price:"all"};
function renderDrinks(){
  if(!DRINKS_ALL.length)buildDrinkIndex();
  const q=drinkFilter.q.toLowerCase();
  let lo=0,hi=1e9;
  if(drinkFilter.price!=="all"){const b=drinkFilter.price.split("-");lo=+b[0];hi=+b[1];}
  /* Archived drinks stay OUT of "All drinks" — they are off the menu and people were
     reading them as orderable. They only appear when the Archive chip is picked. */
  const list=DRINKS_ALL.filter(d=>{
    const inGrp = drinkFilter.grp==="all" ? d.cat!=="verify" : d.cat===drinkFilter.grp;
    if(!inGrp) return false;
    if(drinkFilter.price!=="all"){const v=drinkPrice(d); if(v<lo||v>hi) return false;}
    return !q||(d.n+d.build+d.garnish+d.desc+d.sub+d.from).toLowerCase().includes(q);
  });
  const c=$("#drinkCount"); if(c) c.textContent=list.length+" match"+(list.length===1?"":"es");
  $("#drinkGrid").innerHTML=list.length?list.map(drinkCard).join("")
    :'<div class="empty">Nothing in that lane. Widen the price or pick another chip.</div>';
}

/* ---------- ALLERGENS ---------- */
let allergySel=new Set();
function renderAllergens(){
  const q=($("#allergyQ")?.value||"").toLowerCase();
  const rows=ALLERGENS.filter(r=>!q||r[0].toLowerCase().includes(q)||r[2].join(" ").includes(q));
  const flagged=r=>[...allergySel].some(a=>r[2].includes(a));
  /* chips FILTER now (Evan 8/5): tap an allergy and only the dishes that HAVE it stay on screen */
  const shown = allergySel.size ? rows.filter(flagged).map(r=>[r,true]) : rows.map(r=>[r,false]);
  $("#allergyTable").innerHTML=`<table><thead><tr><th>Dish</th><th>Price</th><th>Contains</th><th>Note</th></tr></thead><tbody>${
    shown.map(([r,hit])=>`<tr${hit?' style="background:rgba(163,60,53,.09)"':''}>
      <td><b>${esc(r[0])}</b>${hit?' <span class="tag warn">FLAGGED</span>':''}</td>
      <td class="n">${esc(r[1])}</td>
      <td>${r[2].length?r[2].map(a=>`<span class="tag${allergySel.has(a)?" warn":""}">${esc(a)}</span>`).join(" "):'<span style="color:var(--dim2)">none listed</span>'}</td>
      <td style="color:var(--dim);font-size:12.6px">${esc(r[3])}</td></tr>`).join("")}</tbody></table>`;
  const n=shown.length;
  $("#allergySummary").innerHTML = allergySel.size
    ? `<div class="note warn"><b>${n} dish${n===1?"":"es"} contain${n===1?"s":""} ${[...allergySel].map(esc).join(" or ")}</b> — everything clean is hidden. Tap the chip again to see the whole matrix. A dish NOT on this list still needs a kitchen check — never guarantee from this sheet.</div>`
    : `<div class="note">Tap an allergen below and the list cuts to only the dishes that HAVE it. ${ALLERGENS.length} dishes in the matrix.</div>`;
}

/* ---------- QUIZ ---------- */
let quiz={i:0,score:0,answered:0,order:[],opts:[],missed:[],topics:{}};
var QBANK=null, QTOPIC="all", QLEN=10, QMODE="";
var QTIME=null;
function clearQTimer(){if(QTIME){clearInterval(QTIME.iv);QTIME=null;}}
/* seeded shuffle so "Today's 10" is the SAME ten for the whole team all day */
function mulberry(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function seededPick(n,count,seed){const r=mulberry(seed),a=[...Array(n).keys()];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a.slice(0,count);}
/* Fisher-Yates. sort(()=>Math.random()-.5) looks like a shuffle but is badly biased —
   it left the correct answer in slot 1 about 36% of the time instead of 25%, so always
   guessing "A" beat guessing at random. The whole point of shuffling is that nobody can
   memorize positions, so it has to be even. */
function shuffled(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function startQuiz(subset,bank){
  clearQTimer(); QMODE=bank?QMODE:"";
  QBANK=bank||MC;
  let src = subset && subset.length ? subset : QBANK.map((_,i)=>i);
  src=shuffled(src);
  if(!bank&&QLEN>0&&src.length>QLEN)src=src.slice(0,QLEN);
  quiz.order=src;
  quiz.opts=quiz.order.map(i=>shuffled(QBANK[i].o.map((txt,k)=>({txt,ok:k===0}))));
  quiz.i=0;quiz.score=0;quiz.answered=0;quiz.missed=[];quiz.topics={};
  renderQuiz();
}
function renderQuiz(){
  const box=$("#quizBox");
  if(quiz.i>=quiz.order.length){
    clearQTimer();
    const denom=QMODE==="blitz"?Math.max(quiz.answered,1):quiz.order.length;
    const pct=denom?Math.round(quiz.score/denom*100):0;
    const grade=pct===100?"Perfect run — floor royalty":pct>=90?"Floor ready":pct>=75?"Close — run the review round":pct>=50?"Getting there":"Rookie numbers — run it again";
    const topics=Object.entries(quiz.topics).map(([t,v])=>`<span class="tag${v.ok===v.n?" good":v.ok/v.n<.7?" warn":""}" style="font-size:12px;padding:4px 9px">${t}: ${v.ok}/${v.n}</span>`).join(" ");
    box.innerHTML=`<div class="q" style="text-align:center;padding:28px">
      <div style="font-size:40px;font-weight:800;color:${pct>=90?"var(--green2)":pct>=70?"var(--gold2)":"#A33C35"}">${pct}%</div>
      <div style="margin:2px 0 4px;font-weight:700;color:var(--gold)">${grade}</div>
      <div style="margin:0 0 12px;color:var(--dim)">${quiz.score} of ${QMODE==="blitz"?quiz.answered+" answered in the minute":quiz.order.length+" correct"}${QMODE==="daily"?" · Today's 10 — same ten for everyone, compare at pre-shift":""}</div>
      <div class="tags" style="justify-content:center;margin-bottom:16px">${topics}</div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="btn" onclick="startQuiz()">New quiz</button>
        ${quiz.missed.length?`<button class="btn sec" onclick="startQuiz(quiz.missed.slice(),QBANK===MC?null:QBANK)">Review the ${quiz.missed.length} missed</button>`:""}
      </div></div>`;
    $("#quizScore").innerHTML=`<b>${pct}%</b> final`;
    return;
  }
  const qi=quiz.order[quiz.i], m=QBANK[qi], opts=quiz.opts[quiz.i];
  $("#quizScore").innerHTML=`<b>${quiz.score}</b> / ${quiz.answered} &nbsp;·&nbsp; question ${quiz.i+1} of ${quiz.order.length}`;
  box.innerHTML=`<div class="q">
    <div class="qprog"><i style="width:${Math.round(quiz.i/quiz.order.length*100)}%"></i></div>
    <div class="qq"><span>${quiz.i+1}.</span>${esc(m.q)} <span class="tag" style="margin-left:6px">${m.t}</span></div>
    ${opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.txt)}</button>`).join("")}
    <div id="qfb"></div></div>`;
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const k=+b.dataset.k, ok=opts[k].ok;
    quiz.answered++; if(ok)quiz.score++; else quiz.missed.push(qi);
    (quiz.topics[m.t]=quiz.topics[m.t]||{ok:0,n:0}).n++; if(ok)quiz.topics[m.t].ok++;
    box.querySelectorAll(".opt").forEach((x,j)=>{x.disabled=true;if(opts[j].ok)x.classList.add("right");});
    if(!ok)b.classList.add("wrong");
    $("#qfb").innerHTML=`<div style="margin-top:11px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <span style="color:${ok?'var(--green2)':'var(--red)'};font-weight:650;font-size:13.5px">${ok?'Correct':'Not quite'}</span>
      <button class="btn sec" id="qnext">${quiz.i+1>=quiz.order.length?"Finish":"Next question"}</button></div>`;
    $("#qnext").onclick=()=>{quiz.i++;renderQuiz();};
    $("#quizScore").innerHTML=`<b>${quiz.score}</b> / ${quiz.answered} &nbsp;·&nbsp; question ${quiz.i+1} of ${quiz.order.length}`;
  });
}

/* ---------- QUIZ GAMES — generated fresh from live app data every run ---------- */
function vocabQuiz(){
  const all=VOCAB.flatMap(g=>g[1]);
  const qs=shuffled(all).slice(0,10).map(t=>{
    const wrong=shuffled(all.filter(x=>x[0]!==t[0])).slice(0,3).map(x=>x[1]);
    return {q:`\u201c${t[0]}\u201d means\u2026`,o:[t[1],...wrong],t:"vocab"};
  });
  QMODE="game"; startQuiz(qs.map((_,i)=>i),qs);
}
function todaysTen(){
  const t=new Date(), seed=t.getFullYear()*10000+(t.getMonth()+1)*100+t.getDate();
  QMODE="daily";
  startQuiz(seededPick(MC.length,10,seed),MC);
  QMODE="daily";
}
function garnishMatch(){
  const pool=COCKTAILS.filter(c=>c.grp!=="verify"&&c.garnish&&c.garnish!=="\u2014"&&c.garnish!=="-");
  const gs=[...new Set(pool.map(c=>c.garnish))];
  const qs=shuffled(pool).slice(0,10).map(c=>{
    const wrong=shuffled(gs.filter(g=>g!==c.garnish)).slice(0,3);
    return {q:`The garnish on the ${c.n} is\u2026`,o:[c.garnish,...wrong],t:"garnish"};
  });
  QMODE="game"; startQuiz(qs.map((_,i)=>i),qs);
}
function nameBottle(){
  const pool=WINES.filter(w=>w.pitch&&w.pitch.length>30);
  const qs=shuffled(pool).slice(0,10).map(w=>{
    let peers=pool.filter(x=>x.n!==w.n&&x.v===w.v);
    if(peers.length<3)peers=pool.filter(x=>x.n!==w.n);
    const wrong=shuffled(peers).slice(0,3).map(x=>x.n);
    return {q:`Which bottle is this pitch selling? \u201c${w.pitch}\u201d`,o:[w.n,...wrong],t:"wine"};
  });
  QMODE="game"; startQuiz(qs.map((_,i)=>i),qs);
}
function priceBlitz(){
  const pool=[];
  Object.entries(MENU).forEach(([sec,items])=>items.forEach(i=>{
    const raw=String(i[1]); const m=raw.match(/^\$(\d+)/);
    if(m&&!raw.includes("/")&&+m[1]>=5)pool.push({n:i[0],p:+m[1]});}));
  COCKTAILS.filter(c=>c.grp!=="verify").forEach(c=>{const m=String(c.p).match(/^\$(\d+)$/);if(m)pool.push({n:c.n,p:+m[1]});});
  WINES.filter(w=>w.btg).forEach(w=>{const m=String(w.p).match(/^\$(\d+)/);if(m)pool.push({n:w.n+" (glass)",p:+m[1]});});
  const prices=[...new Set(pool.map(x=>x.p))].sort((a,b)=>a-b);
  const qs=shuffled(pool).slice(0,10).map(it=>{
    const i=prices.indexOf(it.p);
    let near=[prices[i-1],prices[i+1],prices[i-2],prices[i+2],prices[i+3],prices[i-3]]
      .filter(v=>v!=null&&v!==it.p);
    near=[...new Set(near)].slice(0,3);
    let bump=3; while(near.length<3){const v=it.p+bump; if(v!==it.p&&!near.includes(v))near.push(v); bump+=4;}
    return {q:`What does ${it.n} run?`,o:["$"+it.p,...near.map(v=>"$"+v)],t:"price"};
  });
  QMODE="blitz";
  startQuiz(qs.map((_,i)=>i),qs);
  QTIME={left:60,iv:setInterval(()=>{
    if(!QTIME)return; QTIME.left--;
    if(QTIME.left<=0){clearQTimer();quiz.i=quiz.order.length;renderQuiz();return;}
    const sc=$("#quizScore"); if(sc&&quiz.i<quiz.order.length)sc.innerHTML=`<b>${quiz.score}</b> / ${quiz.answered} \u00b7 0:${String(QTIME.left).padStart(2,"0")} left`;
  },1000)};
}
const GREET_STEPS=["Busser drops the waters","Front greets \u2014 drinks and apps","BACK drops soup-salad and introduces themselves","Entr\u00e9es land \u2014 coursed, never stacked","Checkback, 2\u20135 minutes after entr\u00e9es"];
const ORDER_SEQS={
  greet:{title:"Tap the greet flow in the right order",steps:GREET_STEPS,recap:"Waters \u2192 greet \u2192 soup-salad \u2192 entr\u00e9es \u2192 checkback. That rhythm is the job."},
  allergy:{title:"Tap the allergy protocol in the right order",steps:PROTOCOL,recap:"Ask \u2192 ring it in \u2192 then tell back server, expo, chef, manager. Every time."}
};
function orderGame(key){
  key=ORDER_SEQS[key]?key:"greet";
  const SEQ=ORDER_SEQS[key];
  const box=$("#quizBox"); let next=0, miss=0;
  clearQTimer(); QMODE="order";
  const order=shuffled(SEQ.steps.map((st,i)=>({st,i})));
  box.innerHTML=`<div class="q"><div class="qq"><span>1\u2192${SEQ.steps.length}</span>${SEQ.title}</div>
    <div id="ogDone" style="margin:6px 0"></div>
    ${order.map(o=>`<button class="opt" data-i="${o.i}">${esc(o.st)}</button>`).join("")}
    <div id="ogFb" style="margin-top:8px"></div></div>`;
  $("#quizScore").innerHTML="tap them in order";
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i;
    if(i===next){b.classList.add("right");b.disabled=true;next++;
      $("#ogDone").innerHTML=SEQ.steps.slice(0,next).map((st,k)=>`<div style="font-size:12.5px;color:var(--green);font-weight:600">${k+1}. ${esc(st)}</div>`).join("");
      if(next>=SEQ.steps.length)$("#ogFb").innerHTML=`<div class="note ${miss?"":"gold"}"><b>${miss===0?"Perfect run \u2014 ":"Done \u2014 "}${miss} wrong tap${miss===1?"":"s"}.</b> ${SEQ.recap}</div><button class="btn sec" onclick="orderGame('${key}')">Run it again</button>`;
    }else{miss++;b.classList.add("wrong");setTimeout(()=>b.classList.remove("wrong"),450);}
  });
}

/* shared checkout pipeline — one envelope */
function pipeMath(sales, realTips, estRate, bqOn, polisher, cash){
  if(!sales) return null;
  const credTips = realTips>0 ? realTips : sales*estRate;
  const withheld = credTips*SALES.withheldRate;
  const pool = credTips - withheld + (cash||0);
  const lines = SALES.tipouts.map(t=>[t[0]+" ("+(t[1]*100)+"% of sales)",Math.ceil(t[1]*sales)]);
  if(bqOn) lines.push(["Banquet (3% of sales)",Math.ceil(SALES.banquetTipout*sales)]);
  if(polisher>0) lines.push(["Polisher (flat $"+polisher+")",Math.round(polisher)]);
  const tipOut=lines.reduce((a,l)=>a+l[1],0);
  const earned=Math.max(0,Math.floor(pool-tipOut));
  const back=Math.ceil(earned/2);
  return {credTips,withheld,pool,lines,tipOut,earned,back,front:earned-back};
}

/* ---------- SALES CALCULATOR (the real checkout pipeline) ---------- */
function calcSC(){
  const sales=$n("#scSales");
  const realTips=$n("#scTips");
  const bqOn=$("#scBq").value==="yes";
  const polisher=+$("#scPolisher").value||0;
  const cash=$n("#scCash");

  if(!sales){$("#scOut").innerHTML=`<div class="empty" style="padding:14px">Type your team's net sales (or tap a preset) and the whole checkout prints itself.</div>`;return;}

  const credTips = realTips>0 ? realTips : sales*SALES.guestTipRate;
  const withheld = credTips*SALES.withheldRate;
  const pool = credTips - withheld + cash;
  const expoOn=($("#scExpo")&&$("#scExpo").value)!=="no";
  const lines = SALES.tipouts.filter(t=>expoOn||t[0]!=="Expo").map(t=>[t[0]+" ("+(t[1]*100)+"% of sales)",Math.ceil(t[1]*sales)]);
  if(!expoOn) lines.push(["Expo (none scheduled)",0]);
  if(bqOn) lines.push(["Banquet (3% of sales)",Math.ceil(SALES.banquetTipout*sales)]);
  if(polisher>0) lines.push([`Polisher (flat $${polisher})`,Math.round(polisher)]);
  const tipOut=lines.reduce((a,l)=>a+l[1],0);
  const earned=Math.max(0,Math.floor(pool-tipOut));
  const back=Math.ceil(earned/2), front=earned-back;

  $("#scOut").innerHTML=`<div class="receipt">
    <div class="rhead">MO'S — TEAM CHECKOUT</div>
    <div class="rsub">${realTips>0?"real tips from Toast":"tips estimated at 20.8% of sales"}${bqOn?" · banquet night":""}</div>
    <div class="rrow"><span>Team net sales</span><b>${$d(sales)}</b></div>
    <div class="rrow"><span>Credit tips${realTips>0?"":" (est.)"}</span><b>${$d(credTips)}</b></div>
    <div class="rrow neg"><span>Tips withheld (2%)</span><span>&minus;${$d(withheld)}</span></div>
    ${cash>0?`<div class="rrow"><span>Cash tips</span><b>+${$d(cash)}</b></div>`:""}
    <div class="rrow sum"><span>Team pool</span><b>${$d(pool)}</b></div>
    ${lines.map(l=>`<div class="rrow neg"><span>Tip out — ${esc(l[0])}</span><span>&minus;$${l[1].toLocaleString()}</span></div>`).join("")}
    <div class="rrow neg sum"><span>Total tip out</span><span>&minus;$${tipOut.toLocaleString()}</span></div>
    <div class="rrow sum big"><span>EARNED (after tip out)</span><span>${$d(earned)}</span></div>
    <div class="rrow big"><span>FRONT</span><span>${$d(front)}</span></div>
    <div class="rrow big"><span>BACK</span><span>${$d(back)}</span></div>
    <div class="rfoot">50/50 split &middot; back takes the greater dollar &middot; whole dollars only<br>every tip-out line rounds UP &middot; earned drops the cents</div>
  </div>
  <div class="note" style="max-width:440px"><b>Rule of thumb:</b> a team keeps about ${sales?((earned/sales)*100).toFixed(1):"17"}% of its net sales — ${$d(earned)} on this night, call it 8–9 cents per sales dollar for each of you. Sell the bottle.</div>`;
}

/* ---------- INCOME PREDICTOR — should I take the cut? ---------- */
/* the one engine: net + tip% + who's on -> every number of the night.
   Same pipeline as the graded checkouts: 2% withheld, tip-outs ceil'd per slice,
   expo count 0 = no expo line (teams keep it), pools split evenly per role. */
function nightFor(net,pct,teams,nCk,pol,nBus,nExpo,nBar){
  const slices=teams+CKTAIL_WEIGHT*nCk;
  const teamSales=net/slices, ckSales=teamSales*CKTAIL_WEIGHT;
  const expoOn=nExpo>0;
  const cut=sales=>{
    const lines=SALES.tipouts.filter(t=>expoOn||t[0]!=="Expo").map(t=>Math.ceil(t[1]*sales));
    const pool=sales*pct*(1-SALES.withheldRate);
    return {lines,sum:lines.reduce((a,b)=>a+b,0),earned:Math.max(0,Math.floor(pool-lines.reduce((a,b)=>a+b,0)-pol))};
  };
  const T=cut(teamSales), C=nCk?{...cut(ckSales)}:null;
  const back=Math.ceil(T.earned/2), front=T.earned-back;
  const pool=(rate)=>teams*Math.ceil(rate*teamSales)+(nCk?nCk*Math.ceil(rate*ckSales):0);
  const rates=Object.fromEntries(SALES.tipouts.map(t=>[t[0],t[1]]));
  const busPool=pool(rates.Busser), barPool=pool(rates.Bar), expoPool=expoOn?pool(rates.Expo):0;
  const share=(p,n)=>n>0?Math.round(p/n):0;
  return {slices,teamSales,earned:T.earned,tipout:T.sum+pol,front,back,
    busPool,expoPool,barPool,
    busEach:share(busPool,nBus),expoEach:share(expoPool,nExpo),barEach:share(barPool,nBar),
    share:Math.round(100/slices)};
}
function schedDayInfo(i){
  const map={fronts:"fronts",backs:"backs",cktail:"cktail",expo:"expo",busser:"busser",bar:"bar"};
  const cnt={fronts:0,backs:0,cktail:0,expo:0,busser:0,bar:0};
  let covers=null;
  SCHEDULE.sections.forEach(sec=>{
    const key=String(sec[0]).trim().toLowerCase();
    if(key==="fronts"&&sec[2]){const n=parseInt(sec[2][i],10); if(!isNaN(n))covers=n;}
    if(!(key in map))return;
    cnt[map[key]]=sec[1].filter(r=>!schedGone(r)).filter(r=>{const c=String(r[i+1]||"").trim();
      return c&&c!=="?"&&!/^off\??$/i.test(c)&&!/^ro\??$/i.test(c);}).length;
  });
  return {covers,cnt};
}
/* Staffing bands v2 — anchored to real nights (3 teams ~ $4.1k, 4 teams + banquet ~ $8.9k).
   Cocktailers and the polisher are driven by Evan's floor rules, not by dollars:
   two cocktailers is the ceiling (a third is overkill — add a team instead), and a
   polisher is never MODELLED under 175 covers, though 125+ is a manager's call.
   Food runners are the opposite: one every night minimum, more as covers climb. */
function staffLadder(net,covers){
  const cov=+covers||0;
  return {
    teams: Math.min(7,Math.max(2,Math.ceil(net/SALES.teamBase))),
    cktail: net<6000?1:2,
    busser: net<3000?1:net<8000?2:3,
    /* An expo runs damn near every night, so that is the floor. Food runners are
       additive on top: the first one at 75 covers, another every 40 after that. */
    expo: 1+(cov>75?1+Math.floor((cov-75)/40):0),
    runners: cov>75?1+Math.floor((cov-75)/40):0,
    polisher: cov>175?1:0,
    polisherNote: cov>175?"over 175 covers — staff one"
      :cov>125?"125&ndash;175 covers — manager's call"
      :"under 125 covers — none"
  };
}
function ipPrefill(){
  const di=+$("#ipDay").value||0;
  const inf=schedDayInfo(di);
  if(inf.covers!=null)$("#ipBooks").value=inf.covers;
  const t=Math.min(inf.cnt.fronts,inf.cnt.backs);
  if(t>0)$("#ipTeams").value=t;
  $("#ipCk").value=String(Math.min(3,inf.cnt.cktail));
  if($("#ipBus"))$("#ipBus").value=inf.cnt.busser;
  if($("#ipExpo"))$("#ipExpo").value=inf.cnt.expo;
  if($("#ipBar"))$("#ipBar").value=inf.cnt.bar!=null?inf.cnt.bar:2;
  window.__ipSugg="";
}
function calcIP(){
  const IP_WD={We:"wed",Th:"thu",Fr:"fri",Sa:"sat",Su:"sun",Mo:"mon",Tu:"tue"};
  const di=+$("#ipDay").value||0;
  const d=SCHEDULE.days[di]||SCHEDULE.days[0];
  const dp=DAYPRE[IP_WD[d[1]]]||DAYPRE.sun;
  const teams=Math.max(1,Math.round(+$("#ipTeams").value||dp.teams));
  const nCk=Math.max(0,+$("#ipCk").value||0);
  const books=$n("#ipBooks");
  const walk=$n("#ipWalk");
  const chk=+$("#ipCheck").value||CHECK_CAL;
  const pct=((+$("#ipPct").value||20.8))/100;
  const pol=+$("#ipPol").value||0;
  const manual=$n("#ipNet");
  const nBus=Math.max(0,Math.round(+$("#ipBus").value||0));
  const nExpo=Math.max(0,Math.round(+$("#ipExpo").value||0));
  const nBar=Math.max(0,Math.round(+$("#ipBar").value||0));
  const covers=books+walk;
  const inf=schedDayInfo(di);

  const sugg = dp.wkRule==="half" ? (books>0?Math.round(books*.55):30) : dp.wkRule;
  const suggHTML = walk===0
    ? `Walk-in rule for ${dp.label}${dp.wkRule==="half"?" (60 books &rarr; 30–35 walk-ins)":""}: <b>~${sugg} walk-ins</b> <button class="textbtn" id="ipUse" data-s="${sugg}" style="margin-left:6px">use it</button>`
    : `Walk-in guess in. It is a gut number — nudge it for weather, events, or the time of year.`;
  if(window.__ipSugg!==suggHTML){window.__ipSugg=suggHTML;$("#ipSugg").innerHTML=suggHTML;}

  $("#ipWho").innerHTML=`
    <div class="sechead"><h2>Schedule</h2><span>${dp.label} ${d[0]} — from the posted schedule</span></div>
    ${rosterFor(SCHEDULE,di,true)||'<div class="note">Nobody on the sheet for that day.</div>'}`;

  const net=manual>0?Math.round(manual):Math.round(covers*chk);
  if(!net){$("#ipOut").innerHTML=`<div class="empty" style="padding:14px">Type what's on the books — or the real net if you know it — and this calls the whole night: your pocket, every tip-out position, and the staffing.</div>`;return;}

  const N=(x)=>nightFor(x,pct,teams,nCk,pol,nBus,nExpo,nBar);
  const mid=N(net), loR=N(net*.85), hiR=N(net*1.15);
  const each=Math.round(mid.earned/2), loE=Math.round(loR.earned/2), hiE=Math.round(hiR.earned/2);
  /* the cut line — $175, Evan's call 8/6 ("more generous" than the old $200) */
  const verdict = loE>=175
    ? {cls:"gold",head:"WORK IT",body:`Even the slow end clears $175 each.`}
    : hiE<175
    ? {cls:"warn",head:"CUT TERRITORY",body:`Even a hot night stays under $175 each. If the cut is offered, the math says take it.`}
    : {cls:"",head:"COIN FLIP",body:`Straddles the $175 line — walk-ins decide this one. Watch the book by late afternoon.`};

  const tax=Math.round(net*SALES.taxRate);
  const lad=staffLadder(net,inf.covers);
  const schedTeams=Math.min(inf.cnt.fronts,inf.cnt.backs);
  const callFor=(model,sched)=>sched==null?`<span style="color:var(--dim2)">manager's call</span>`
    :sched>model?`<span style="color:var(--gold2)">room to cut ${sched-model}</span>`
    :sched<model?`<span style="color:var(--red)">short ${model-sched}</span>`
    :`<span style="color:var(--green)">matches</span>`;

  $("#ipOut").innerHTML=`
  <div class="note ${verdict.cls}" style="margin:0 0 12px">
    <div style="font-size:19px;font-weight:800;letter-spacing:.02em">${verdict.head} — about ${$d(each)} each <span style="font-weight:600;font-size:13px;color:var(--dim)">(${$d(loE)}–${$d(hiE)})</span></div>
    <div style="margin-top:4px">${verdict.body}</div>
  </div>
  <div class="kpis">
    <div class="kpi"><div class="k">People coming in</div><div class="v">${covers||"—"}</div><div class="s">${covers?`${books} books + ${walk||0} walk-ins`:"running off the typed net"}</div></div>
    <div class="kpi"><div class="k">Night net${manual>0?"":" (est.)"}</div><div class="v">${$d(net)}</div><div class="s">${manual>0?"typed in — the real number":`${covers} covers x $${chk}`} · tax ~${$d(tax)}</div></div>
    <div class="kpi"><div class="k">Team sales</div><div class="v">${$d(mid.teamSales)}</div><div class="s">~${mid.share}% of the floor · ${teams} teams${nCk?" + "+nCk+" cocktailer"+(nCk>1?"s":""):""} · tips at ${(pct*100).toFixed(1)}%</div></div>
    <div class="kpi"><div class="k">Team earned</div><div class="v">${$d(mid.earned)}</div><div class="s">after 2% withheld + $${mid.tipout} tip-out</div></div>
    <div class="kpi" style="border-color:var(--gold)"><div class="k">The two of you</div><div class="v" style="font-size:16.5px;line-height:1.5">Front ${$d(mid.front)}<br>Back ${$d(mid.back)}</div><div class="s">two-man team — back takes the greater dollar</div></div>
    <div class="kpi"><div class="k">Bussers</div><div class="v">${nBus?$d(mid.busEach):"—"}</div><div class="s">${nBus?`each · $${mid.busPool.toLocaleString()} pool ÷ ${nBus} on (1.5%)`:"none on the schedule"}</div></div>
    <div class="kpi"><div class="k">Expo / food run</div><div class="v">${nExpo?$d(mid.expoEach):"—"}</div><div class="s">${nExpo?`each · $${mid.expoPool.toLocaleString()} pool ÷ ${nExpo} on (0.5%)`:"none on — teams keep the expo line"}</div></div>
    <div class="kpi"><div class="k">Bar</div><div class="v">${nBar?$d(mid.barEach):"—"}</div><div class="s">${nBar?`each · $${mid.barPool.toLocaleString()} pool ÷ ${nBar} on (1%) — plus their own bar-top tips`:"nobody behind the bar?"}</div></div>
  </div>

  ${tbl(["Position","Model says",`Scheduled ${d[1]} ${d[0]}`,"Call"],[
    ["<b>Teams (front + back)</b>",String(lad.teams),String(schedTeams||0),callFor(lad.teams,schedTeams||0)],
    ["<b>Cocktailers</b>",String(lad.cktail),String(inf.cnt.cktail),callFor(lad.cktail,inf.cnt.cktail)],
    ["<b>Bussers</b>",String(lad.busser),String(inf.cnt.busser),callFor(lad.busser,inf.cnt.busser)],
    ["<b>Food runners / expo</b>",`${lad.expo}<div class="sub" style="font-size:11px;color:var(--dim2);margin-top:2px">1 expo${lad.runners?` + ${lad.runners} runner${lad.runners>1?"s":""}`:""}</div>`,String(inf.cnt.expo),callFor(lad.expo,inf.cnt.expo)],
    ["<b>Polisher</b>",String(lad.polisher),"—",`<span style="color:var(--dim2)">${lad.polisherNote}</span>`]])}
  <p class="sub" style="margin:8px 0 0;color:var(--dim2);font-size:12px">Skip big banquets in this net — a banquet brings its own staffing. Pools split evenly across whoever's on the role — fewer on, more each. Bands anchored to real nights (3 teams &asymp; $4.1k, 4 teams + a banquet &asymp; $8.9k, over $10k is all hands).</p>
  <p class="sub" style="margin:8px 0 0;color:var(--dim2);font-size:12px">Cut math is calibrated against real Toast checkouts — lands within a few dollars of actual nights. A model, not a promise.</p>`;
}

/* ---------- BANQUET — one tool, the whole event ----------
   Gratuity can be typed as a percent OR as real dollars off the sheet; whichever
   you give, the other is shown next to it so the two never disagree. */
function calcBQC(){
  const heads=$n("#bqcHeads");
  const sales=$n("#bqcSales");
  const min  =$n("#bqcMin");
  const pct  =(+$("#bqcGratPct").value||0)/100;
  const typed=$n("#bqcTips");
  const bq3  =$("#bqcThree").value==="yes";
  const box=$("#bqcOut");
  if(!sales&&!min&&!heads){
    box.innerHTML='<div class="empty" style="padding:14px">Party size, net sales, and the minimum if the contract had one. Gratuity defaults to 23% until you type the real number.</div>';
    return;
  }
  /* the minimum is a floor, not a target — the event bills the greater of the two */
  const billed=Math.max(sales,min);
  const grat  =typed>0?typed:Math.round(billed*pct);
  const effPct=billed>0?(grat/billed*100):0;
  const r=pipeMath(billed,grat,pct,bq3,0,0);
  const perHead=heads>0?billed/heads:0;
  const minWins=min>0&&min>sales;

  const rs=$n("#scSales"), rt=$n("#scTips");
  const reg=pipeMath(rs,rt,SALES.guestTipRate,$("#scBq").value==="yes",+$("#scPolisher").value||0,$n("#scCash"));

  box.innerHTML=`<div class="kpis">
    ${heads?`<div class="kpi"><div class="k">Party size</div><div class="v">${heads}</div><div class="s">${perHead?$d(perHead)+" a head at this total":"&nbsp;"}</div></div>`:""}
    <div class="kpi"><div class="k">Billed net</div><div class="v">${$d(billed)}</div>
      <div class="s">${minWins?"the "+$d(min)+" minimum wins over "+$d(sales)+" in sales":(min?"cleared the "+$d(min)+" minimum":"no minimum on this one")}</div></div>
    <div class="kpi"><div class="k">Gratuity</div><div class="v">${$d(grat)}</div>
      <div class="s">${typed>0?"typed off the sheet &middot; that is "+effPct.toFixed(1)+"%":effPct.toFixed(0)+"% of billed net &middot; type the real number to override"}</div></div>
  </div>
  ${r?`<div class="receipt">
    <div class="rhead">MO'S — BANQUET CHECKOUT</div>
    <div class="rsub">${typed>0?"real gratuity from the banquet sheet":"gratuity estimated at "+(pct*100).toFixed(0)+"% until you type it"}</div>
    <div class="rrow"><span>Billed net sales</span><b>${$d(billed)}</b></div>
    <div class="rrow"><span>Gratuity${typed>0?"":" (est.)"}</span><b>${$d(r.credTips)}</b></div>
    <div class="rrow neg"><span>Tips withheld (2%)</span><span>&minus;${$d(r.withheld)}</span></div>
    <div class="rrow sum"><span>Envelope pool</span><b>${$d(r.pool)}</b></div>
    ${r.lines.map(l=>`<div class="rrow neg"><span>Tip out — ${esc(l[0])}</span><span>&minus;$${l[1].toLocaleString()}</span></div>`).join("")}
    <div class="rrow neg sum"><span>Total tip out</span><span>&minus;$${r.tipOut.toLocaleString()}</span></div>
    <div class="rrow sum big"><span>EARNED (banquet envelope)</span><span>${$d(r.earned)}</span></div>
    <div class="rrow big"><span>FRONT</span><span>${$d(r.front)}</span></div>
    <div class="rrow big"><span>BACK</span><span>${$d(r.back)}</span></div>
    <div class="rfoot">same rules as the regular envelope &middot; split per envelope, back takes the greater dollar</div>
  </div>`:""}
  ${reg&&r?`<div class="note gold" style="max-width:440px"><b>Both envelopes tonight:</b> regular ${$d(reg.earned)} + banquet ${$d(r.earned)} = <b>${$d(reg.earned+r.earned)}</b></div>`
    :`<div class="note" style="max-width:440px">Fill the Checkout above too and this shows the full two-envelope night total.</div>`}`;
}
function calcBq(){}   /* the mini-tool folded into calcBQC above */

/* ---------- GLOBAL SEARCH ---------- */
/* Ask it questions: words match in any order, filler words are ignored,
   common floor terms map to menu vocabulary, and small typos still hit. */
const SEARCH_STOP=new Set(("what whats is in the a an on of for to do does did we have has had any with and or are it its "+
  "how much many me my show tell about can could i you your price prices cost costs "+
  /* every word below cost a real query in testing: "is there guest wifi", "do you guys have wifi",
     "how do i connect to the internet here" all returned nothing because of one filler word */
  "there here guys get got need needs want wants ask asks asked say says said give gives know "+
  "please thanks at from this that they them their our us be was were will would should "+
  "when where who whos wheres hows whats theres why if but so just like into over under again even only also").split(" "));
const SEARCH_SYN={internet:"wifi",wireless:"wifi",network:"wifi",hotspot:"wifi",ssid:"wifi",pw:"password",tonight:"today",passcode:"password",connexion:"connection",works:"schedule",working:"schedule",shift:"schedule",mocktail:"non-alcoholic",virgin:"non-alcoholic",children:"kids",child:"kids",app:"starters",apps:"starters",appetizer:"starters",appetizers:"starters",sparkling:"champagne",bubbly:"champagne",bubbles:"champagne",veggie:"vegetable",veggies:"vegetable",glutenfree:"gf",sweets:"desserts",bday:"celebration",birthday:"celebration",anniversary:"celebration",percentages:"percent",percentage:"percent",tipout:"tip",tipouts:"tip",ounces:"oz",ounce:"oz",cheapest:"price",cheap:"price",priciest:"price",recipe:"ingredients",dressing:"dressings",earn:"earned",earnings:"earned",paycheck:"earned",payout:"earned",roster:"schedule",working:"schedule",works:"schedule",temp:"temperature",temps:"temperature",nuts:"nut",peanuts:"peanut",gf:"gluten"};
function nearWord(a,b){
  if(a===b)return true;
  const la=a.length,lb=b.length;
  if(la===lb){
    const d=[];
    for(let k=0;k<la&&d.length<3;k++) if(a[k]!==b[k]) d.push(k);
    if(d.length===2&&d[1]===d[0]+1&&a[d[0]]===b[d[1]]&&a[d[1]]===b[d[0]])return true;
  }
  if(Math.abs(la-lb)>1)return false;
  let i=0,j=0,edits=0;
  while(i<la&&j<lb){
    if(a[i]===b[j]){i++;j++;continue;}
    if(++edits>1)return false;
    if(la===lb){i++;j++;}else if(la>lb)i++;else j++;
  }
  return edits+(la-i)+(lb-j)<=1;
}
function search(q){
  q=q.trim().toLowerCase().replace(/[’']/g,"");
  if(q.length<2)return [];
  let toks=q.split(/[^a-z0-9$&%]+/).filter(Boolean);
  const kept=toks.filter(t=>!SEARCH_STOP.has(t));
  if(kept.length)toks=kept;
  if(!toks.length)return [];
  const tokenIn=(hay,words,t)=>{
    if(hay.includes(t))return true;
    const syn=SEARCH_SYN[t];
    if(syn&&hay.includes(syn))return true;
    if(t.length>=4&&t.endsWith("s")&&hay.includes(t.slice(0,-1)))return true;
    if(t.length>=5)return words().some(w=>w[0]===t[0]&&nearWord(w,t));
    return false;
  };
  /* Same matcher, but bare numbers are ignored. "how much do i make on 4000" is a money
     question with an input in it — the 4000 should not filter the results away. */
  const matchesNum=fields=>{
    const hay=fields.filter(Boolean).join(" ").toLowerCase().replace(/[\u2019']/g,"");
    let words=null;
    const getWords=()=>words||(words=hay.split(/[^a-z0-9$&%]+/).filter(Boolean));
    const real=toks.filter(t=>!/^\$?[\d,.]+$/.test(t));
    return real.length>0 && real.every(t=>tokenIn(hay,getWords,t));
  };
  const matches=fields=>{
    const hay=fields.filter(Boolean).join(" ").toLowerCase().replace(/[’']/g,"");
    let words=null;
    const getWords=()=>words||(words=hay.split(/[^a-z0-9$&%]+/).filter(Boolean));
    return toks.every(t=>tokenIn(hay,getWords,t));
  };
  const hits=[];
  /* A query that reads as ONE word to a person should beat a result that merely happens to
     contain its pieces. "wi-fi" is one word at the table but two tokens to the tokeniser,
     and it turns out "wine" contains a "wi" and "Ruffino" contains an "fi" — which put a
     Ribera del Duero above the wifi password. Collapsing the query and the title to bare
     letters and looking for the whole phrase fixes that, and helps anywhere else a name
     gets split: "old fashioned", "new york", "creme brulee". */
  const qflat=q.replace(/[^a-z0-9]/g,"");
  const add=(w,t,d,tab)=>{
    const name=(w+" "+t).toLowerCase();
    /* Synonyms already decide WHETHER something matches, so they should decide ranking too.
       Without this "who works today" scored the Schedule row at zero -- works maps to
       schedule, and the row is literally called Schedule -- so ties fell to insertion order
       and the Handbook came out on top. */
    let score=toks.filter(x=>name.includes(x)||(SEARCH_SYN[x]&&name.includes(SEARCH_SYN[x]))).length;
    /* Only when a SYNONYM lands on the category: "whos working" should reach the rows whose
       category is literally Schedule rather than a handbook chapter that uses the word.
       Restricted to synonyms on purpose — rewarding literal category hits made "mise en
       place" return a dish's mise instead of the definition of the term. */
    const cat=w.toLowerCase();
    if(toks.some(x=>SEARCH_SYN[x]&&cat.includes(SEARCH_SYN[x])))score+=1;
    if(qflat.length>=4&&name.replace(/[^a-z0-9]/g,"").includes(qflat))score+=3;
    /* Additive, on purpose. The base score above counts bare substrings, which rewards
       "tea" for chaTEAu, "86" for $1TEA6, "evan" for griEVANces. Rather than tear that out
       (and re-tune every ranking that leans on it), LIFT genuine word matches above the
       incidental ones. A whole-word or word-start hit is worth more; a fuzzy word hit
       (so a typo's real target — "tomahwak" -> "tomahawk" — climbs over fuzzy bycatch)
       is worth a little. Purely additive, so equal-scoring ties keep their order. */
    const nameWords=name.split(/[^a-z0-9$&%]+/).filter(Boolean);
    const wordHit=x=>{const syn=SEARCH_SYN[x];
      return nameWords.some(wd=>wd===x||(x.length>=2&&wd.startsWith(x))||(syn&&(wd===syn||wd.startsWith(syn))));};
    score += toks.filter(wordHit).length*2;
    score += toks.filter(x=>!wordHit(x)&&x.length>=4&&nameWords.some(wd=>nearWord(wd,x))).length;
    hits.push({w,t,d,tab,score});
  };
  WINES.forEach(x=>{if(matches([x.n,x.r,x.f,x.pair,x.pitch,x.p]))add("Wine",x.n+" — "+x.p,x.pitch,"wine");});
  COCKTAILS.forEach(x=>{if(matches([x.n,x.build,x.garnish,x.desc,x.p,x.grp,"garnish"]))add("Cocktail",x.n+" — "+x.p,"Garnish: "+x.garnish+" · "+x.build,"cocktails");});
  Object.entries(MENU).forEach(([sec,items])=>items.forEach(i=>{if(matches([sec,i[0],i[1],i[2],i[3]]))add(sec,i[0]+" — "+i[1],i[2],"menu");}));
  ENHANCE.forEach(e=>{if(matches([e[0],e[1],e[2],e[3]]))add("Enhancement",e[0]+" — "+e[1],e[2],"menu");});
  ALLERGENS.forEach(r=>{if(matches([r[0],r[2].join(" "),r[3]]))add("Allergens",r[0],"Contains: "+(r[2].join(", ")||"none listed")+". "+r[3],"allergens");});
  Object.entries(SPIRITS).forEach(([sec,rows])=>rows.forEach(r=>{if(matches([sec,r[0],r[1],r[2]]))add(sec,r[0]+" — "+r[1],r[2],"cocktails");}));
  BEER.forEach(b=>{if(matches([b[0],b[2],b[3]]))add("Beer",b[0]+" — "+b[1],b[2]+". "+b[3],"cocktails");});
  OPEN.forEach(o=>{if(matches([o[0],o[1]]))add("Test answer",o[0],o[1],"study");});
  SPECIALS_ON.forEach(s=>{if(matches([s[0],s[2]]))add("Ongoing special",s[0]+" — "+s[1],s[2],"menu");});
  SPECIALS_ROTATION.forEach(s=>{if(matches([s[0],s[2]]))add("Rotating special",s[0],s[2],"menu");});
  SPECIALS_PAST.forEach(s=>{if(matches([s[0],s[2]]))add("Past special",s[0]+" ("+s[3]+")",s[2],"menu");});
  SOTD.forEach(s=>{if(matches([s[0],s[1]]))add("Soup of the day",s[0],s[1],"menu");});
  SOUPS_STANDING.forEach(s=>{if(matches([s[0],s[2]]))add("Standing soup",s[0]+" — "+s[1],s[2],"menu");});
  OFFMENU.forEach(s=>{if(matches([s[0],s[2]]))add("Off-menu",s[0]+" — "+s[1],s[2],"menu");});
  VOCAB.forEach(g=>g[1].forEach(r=>{if(matches([g[0],r[0],r[1]]))add("Vocabulary",r[0],r[1],"vocab");}));
  if(typeof HOUSE_INFO!=="undefined")HOUSE_INFO.forEach(h=>{
    if(matches([h[0],h[1],h[2],h[3]]))add("At the table",h[0],h[1]+" \u2014 "+h[2],"house");});
  /* The handbook sits behind the curtain, so search must not walk around it — while
     it is locked a hit shows only the section TITLE and says where to unlock it. */
  HANDBOOK.forEach(h=>{const txt=h[2].replace(/<[^>]+>/g," ");
    if(matches([h[0],h[1],txt]))
      add("Handbook",h[0], (typeof HBOPEN!=="undefined"&&HBOPEN)
        ? txt.trim().slice(0,140)+"…"
        : "Staff only — open the Employee Handbook in How We Work to read it.","house");});
  /* the book is searchable too — a hit sends you to How We Work, where the book card lives */
  BOOK.forEach(c=>{const txt=c.h.replace(/<[^>]+>/g," ").replace(/\s+/g," ");
    if(matches([c.t,"mo's book",txt]))add("Mo's Book",c.t,txt.trim().slice(0,140)+"…","house");});
  /* The 79-slide training slideshow shipped indexed-nowhere, so nothing in it was
     findable from the search bar the way the book already was. */
  /* dated house events — the Labor Day party, wine dinners, the golf outing —
     were in the schedule but indexed nowhere, so search could not find them */
  if(typeof FRONT_POS!=="undefined") FRONT_POS.forEach(r=>{
    if(matches([r[0],r[1],"pos number","front pos","server number"]))
      add("Front POS",r[0].replace(/\s*\*$/,""),"POS #"+r[1],"house");});
  if(typeof FLOORMAP!=="undefined") FLOORMAP.forEach(r=>r.tables.forEach(tb=>{
    const sec=(typeof SECTIONS!=="undefined"?(SECTIONS.find(x=>x.tables.indexOf(tb.t)>=0)||{}).who:"")||"";
    if(matches(["table "+tb.t,tb.t,r.room,sec,"floor plan","seat"]))
      add("Floor plan · "+r.room,"Table "+tb.t,
          "Sits "+tb.seats+(sec?" · "+sec:"")+" · tap it on the plan","house");}));
  if(typeof FLOOR!=="undefined") FLOOR.forEach(r=>{
    /* FLOORMAP already indexes every table above; the old photo list would double each
       one. Only fall back to it when the live map is absent. */
    if(typeof FLOORMAP==="undefined") r.groups.forEach(g=>g[1].forEach(t=>{
      if(matches(["table "+t,t,r.n,g[0],"floor plan","seat"]))
        add("Floor plan · "+r.n,"Table "+t,g[0]+" in the "+r.n,"house");}));
    if(matches([r.n,"floor plan","tables","seat 1"]))
      add("Floor plan",r.n,r.sub+" — "+r.tables.length+" tables","house");});
  if(typeof EVENTS!=="undefined") EVENTS.forEach(e=>{
    if(matches([e.n,e.when,e.w,e.d,"event","party"]))
      add("Event · "+e.d,e.n,e.when+" — "+e.w,"sched");});
  if(typeof MISE!=="undefined") MISE.forEach(m=>{
    const tools=m[1].join(", ");
    if(matches([m[0],tools,m[2],"mise en place","silverware","set with"]))
      add("Mise en Place",m[0],tools+(m[2]?" — "+m[2]:""),"house");});
  if(typeof DECK!=="undefined") DECK.forEach((c,j)=>{
    const txt=String(c.h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
    if(matches([c.t,c.s,c.d,"training slideshow","slideshow",txt]))
      add("Slideshow"+(c.d?" · "+c.d:""),c.t,(c.s?c.s+" — ":"")+txt.slice(0,120)+(txt.length>120?"…":""),"house");});
  /* How We Work was never indexed — the mission, the Points of Passion, the
     non-negotiables, every steps-of-service list, the side work and the house facts
     were all invisible to search. "uniform", "boxing station", the chef's name: nothing. */
  if(matches(["Mission",HOUSE.mission]))add("How we work","Mission",HOUSE.mission,"house");
  Object.entries({points:"Points of Passion",facts:"House facts",tableside:"Tableside show"})
    .forEach(([k,label])=>(HOUSE[k]||[]).forEach(r=>{
      if(matches([label,r[0],r[1]]))add(label,r[0],r[1],"house");}));
  Object.entries({isaacs:"Non-negotiables",back:"Back server steps",front:"Front server steps",
                  expo:"Expo side work",backclose:"Back-of-house close",closesheet:"Close sheet",
                  barsteps:"Bar steps"})
    .forEach(([k,label])=>{
      const v=HOUSE[k]; if(!v)return;
      const flat=(Array.isArray(v)?v:Object.values(v)).flat(Infinity);
      flat.forEach(t=>{if(typeof t==="string"&&matches([label,t]))add(label,label,t,"house");});
    });
  /* mise en place is [title, subtitle, [lines]] — search the lines, show the group */
  (HOUSE.mise||[]).forEach(([t,s,rows])=>rows.forEach(d=>{
    const plain=String(d).replace(/<[^>]+>/g,"");
    if(matches(["mise en place","silverware","utensil",t,plain]))
      add("Mise en place",t,plain.slice(0,140)+(plain.length>140?"…":""),"house");}));
  /* everything else the app knows. Before this, searching a pairing, a steak temp, a
     dressing, a private-room capacity, a quiz answer or a coworker's shift came back
     empty even though the app had it on a tab somewhere. */
  PAIRINGS.forEach(p=>{const w=[].concat(p.good||[],p.better||[],p.best||[]);
    if(matches([p.d,p.line,w.join(" ")]))add("Pairing",p.d,p.line+" — "+w.join(", "),"wine");});
  DRINK_PITCH.forEach(r=>{if(matches([r[0],r[1]]))add("Guest says / you say",r[0],r[1],"cocktails");});
  FASTANSWERS.forEach(r=>{if(matches([r[0],r[1],r[2]]))add("Fast guest answer",r[0],r[1]+" — "+r[2],"wine");});
  REGIONS.forEach(r=>{if(matches([r[0],r[1],r[2]]))add("Wine region",r[0],r[1]+" — "+r[2],"wine");});
  TEMPS.forEach(r=>{if(matches(["steak temperature doneness ribeye filet strip tomahawk porterhouse cut",r[0],r[1]]))add("Steak temp",r[0],r[1],"menu");});
  A5PITCH.forEach(t=>{if(matches(["A5 wagyu pitch",t]))add("A5 pitch","The A5 pitch",t,"menu");});
  DRESSINGS.forEach(t=>{if(matches(["salad dressing",t]))add("Dressing",t,"One of the 11 dressings — the house dressing is the vinaigrette.","menu");});
  PROTOCOL.forEach((t,i)=>{if(matches(["allergy protocol",t]))add("Allergy protocol","Step "+(i+1),t,"allergens");});
  FLOW.forEach(([t,items])=>items.forEach(s=>{if(matches([t,s]))add("Steps of service",t,s,"shift");}));
  ANCHORS.forEach(r=>{if(matches([r[0],r[1]]))add("Training anchor",r[0],r[1],"shift");});
  SPLIT_RULES.forEach(t=>{if(matches(["how the split works checkout",t]))add("How the split works","Checkout rule",t,"ops");});
  ROOMS.forEach(r=>{if(matches(["private room banquet",r[0],r[1]]))add("Private room",r[0],r[1],"ops");});
  /* house recipes — "what is in our ranch" has to land on the card, not the book */
  (typeof RECIPES!=="undefined"?RECIPES:[]).forEach(r=>{
    const ing=r.ing.map(x=>x[0]).join(", ");
    if(matches([r.n,"recipe","ingredients",r.sub,ing,r.note||"",r.tip||""]))
      add("House recipe",r.n,ing,"menu");});
  /* the money tools: a plain-language money question should land on the calculator */
  [["Sales Calculator","type your team net sales and it does the whole checkout — tips, tip-outs, your split",
    "how much do i make earned take home checkout net sales calculator money paycheck"],
   ["Tip-out rates","bar 1%, busser 1.5%, expo 0.5% of team net sales, each rounded up to the next dollar",
    "tip out tipout percent rates bar busser expo how much comes out"],
   ["Night Forecast","covers and staffing for tonight, and what everybody on the floor makes",
    "forecast tonight covers staffing everybody night projection"]
  ].forEach(([t,d,keys])=>{if(matchesNum([t,d,keys]))add("Money tool",t,d,"ops");});
  /* who is on which day — "who works friday" should answer from the posted week */
  (function(){
    const DOWN=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    (SCHEDULE.days||[]).forEach((d,i)=>{
      const ab=String(d[1]||"").toLowerCase().slice(0,2);
      const full=DOWN.find(n=>n.slice(0,2)===ab)||"";
      /* "who works today" and "whos on tonight" are among the commonest things anybody
         types, and they used to return nothing at all: the day rows are titled "Wednesday
         8/12", so the words today and tonight matched no field. Tag the day that IS today. */
      const nowd=new Date(), isToday=schedIsDay(SCHEDULE,d[0],nowd);
      if(!matches(["who works schedule roster on floor",full,d[0],isToday?"today tonight now":""]))return;
      const on=rosterFor(SCHEDULE,i,true).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
      /* saying "today" in the title is both clearer to read and what makes it outrank the
         handful of other rows that merely mention tonight */
      if(on)add("Schedule",(full?full[0].toUpperCase()+full.slice(1):"")+" "+d[0]+(isToday?" \u2014 today":""),on.slice(0,150),"sched");
    });
  })();
  [WOTW.a,WOTW.b].forEach(w=>{if(w&&matches(["wine of the week",w.n,w.tag,w.what,w.flavor,w.why,w.pair,w.pitch,w.p]))
    add("Wine of the Week",w.n+" — "+w.p,w.what,"wine");});
  MC.forEach(m=>{if(matches([m.q,m.o[0],m.t]))add("Quiz",m.q,"Answer: "+m.o[0],"study");});
  if(typeof LIVE_MUSIC!=="undefined")Object.entries(LIVE_MUSIC).forEach(([d,act])=>{
    if(matches(["live music",d,act]))add("Live music",act,d+" — live in the lounge","sched");});
  if(typeof OFFSITE!=="undefined")OFFSITE.forEach(o=>{
    if(matches(["meals and moments","meals & moments","church","volunteer",o.where,o.addr,o.d]))
      add("Meals & Moments",o.where,o.d+" · "+o.t+" · "+o.addr,"sched");});
  /* the posted week, by person — searching a name shows you their shifts */
  (SCHEDULE.sections||[]).forEach(([sec,rows])=>rows.forEach(r=>{
    /* "evan schedule" / "when does lupe work" -- give each person row the intent words */
    if(String(r[0]).startsWith("("))return;
    if(!matches([r[0],sec,"schedule shifts works hours on the floor"]))return;
    const on=SCHEDULE.days.map((d,i)=>{const c=String(r[i+1]||"").trim();
      return c?`${d[1]} ${/^(off|ro)\??$/i.test(c)?c.toUpperCase():schedTime(c)}`:null;}).filter(Boolean);
    add("Schedule · "+sec,r[0],on.length?on.join(" · "):"not on the posted week","sched");}));
  return hits.sort((a,b)=>b.score-a.score).slice(0,40);
}
function renderSearch(q){
  const box=$("#searchPanel"), hits=search(q);
  if(q.trim().length<2){box.style.display="none";document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("on",p.id==="p-"+TAB));return;}
  document.querySelectorAll(".panel").forEach(p=>p.classList.remove("on"));
  box.style.display="block";
  box.innerHTML=`<div class="sechead"><h2>${hits.length} result${hits.length===1?"":"s"} for &ldquo;${esc(q)}&rdquo;</h2><span>clear the box to go back</span></div>
  <div class="hits">${hits.length?hits.map(h=>`<div class="hit" onclick="$('#gsearch').value='';renderSearch('');go('${h.tab}')" style="cursor:pointer">
    <div class="w">${esc(h.w)}</div><div class="t">${esc(h.t)}</div><div class="d">${esc(h.d)}</div></div>`).join(""):'<div class="empty">Nothing found. Try fewer or different words.</div>'}</div>`;
}

/* ============================================================
   BUILD PANELS
   ============================================================ */
function tbl(head,rows,cls){
  return `<div class="tw"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${cls&&cls[i]?' class="'+cls[i]+'"':''}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
const acc=(title,hint,body,open)=>`<details class="acc"${open?" open":""}><summary>${title}<span class="hint">${hint}</span></summary><div class="accbody">${body}</div></details>`;

function addJumps(key){
  const p=$("#p-"+key);
  const heads=[...p.querySelectorAll(".sechead h2")].filter(h=>!h.closest("details"));
  if(heads.length<3)return;
  const bar=document.createElement("div"); bar.className="jumper";
  heads.forEach(h=>{
    const b=document.createElement("button");
    b.textContent=h.textContent.split("—")[0].trim().slice(0,26);
    b.onclick=()=>h.closest(".sechead").scrollIntoView({behavior:"smooth"});
    bar.appendChild(b);
  });
  p.prepend(bar);
}

function build(){
  const M=$("#main");
  M.innerHTML = `<div id="searchPanel" style="display:none"></div>` + TABS.map(([k])=>`<section class="panel${k===TAB?" on":""}" id="p-${k}"></section>`).join("");

  /* ---------- HOME ---------- */
  $("#p-shift").innerHTML=`
    <div class="sechead"><h2>What do you need?</h2><span>one tap</span></div>
    <div class="qa">
      <button data-qa="sched|">${QAICONS["sched|"]||""}<div class="t">Schedule</div><div class="s">Who works today + the whole posted week</div></button>
      <button data-qa="cocktails|#sec-garnish">${QAICONS["cocktails|#sec-garnish"]||""}<div class="t">Garnish check</div><div class="s">Every drink's garnish and glass, one table</div></button>
      <button data-qa="allergens|#sec-allergy">${QAICONS["allergens|#sec-allergy"]||""}<div class="t">Allergy check</div><div class="s">Tap an allergen — see only what has it</div></button>
      <button data-qa="wine|#sec-bottles">${QAICONS["wine|#sec-bottles"]||""}<div class="t">Wine by budget</div><div class="s">Bottles at their price, pitch included</div></button>
      <button data-qa="wine|#sec-pair">${QAICONS["wine|#sec-pair"]||""}<div class="t">Pair their order</div><div class="s">They ordered X — here's what you say</div></button>
      <button data-qa="ops|#sec-checkout">${QAICONS["ops|#sec-checkout"]||""}<div class="t">Sales Calculator</div><div class="s">Sales in — your front/back split out</div></button>
      <button data-qa="ops|#sec-income">${QAICONS["ops|#sec-income"]||""}<div class="t">Night Forecast</div><div class="s">Who's on, the covers, and the cut — called early</div></button>
      <button data-qa="study|#sec-quiz">${QAICONS["study|#sec-quiz"]||""}<div class="t">Quiz &amp; games</div><div class="s">${MC.length} questions by topic + the real 30</div></button>
      <button data-qa="menu|">${QAICONS["menu|"]||""}<div class="t">Food menu</div><div class="s">Prices, builds, temps, the A5 pitch</div></button>
      <button data-qa="ops|#sec-floor">${QAICONS["ops|#sec-floor"]||""}<div class="t">Floor plan</div><div class="s">Tap a table — seats, section, where seat 1 is</div></button>
    </div>

    <div class="sechead"><h2>Before you walk up</h2><span>the 60-second version</span></div>
    <div class="kpis" style="margin-bottom:16px">
      <div class="kpi"><div class="k">Starters</div><div class="v">5–12 min</div><div class="s">15 minutes max</div></div>
      <div class="kpi"><div class="k">Soups · salads · desserts</div><div class="v">5–7 min</div><div class="s">10 minutes max</div></div>
      <div class="kpi"><div class="k">Entrees</div><div class="v">22–27 min</div><div class="s">course it, do not stack it</div></div>
      <div class="kpi"><div class="k">Entree checkback</div><div class="v">2–5 min</div><div class="s">after entrees hit the table</div></div>
    </div>
    <div class="note gold"><b>Always hit:</b> first time, celebration, wine list, allergies, features, soup, oysters, cut specials, 86'd items, and a wine or app suggestion.</div>
    <div class="grid wide" style="margin-top:14px">
      <div class="card"><div class="cname">Two drink calls that always work</div>
        <div class="cbody">${DRINK_PITCH.slice(0,4).map(p=>`<div style="padding:4px 0"><b>${esc(p[0])}:</b> ${esc(p[1])}</div>`).join("")}</div></div>
      <div class="card"><div class="cname">The wine move</div>
        <div class="cbody">Ask one question: <b>lighter and smoother</b>, or <b>bigger and richer</b>? Then name a wine. If they say white, start there — and if they tell you what they want, listen.</div>
        ${tbl(["By the glass","Pitch it as"],WINE_MOVE.glass.map(w=>[`<b>${esc(w[0])}</b><br><span style="color:var(--dim2);font-size:11.5px">${esc(w[1])}</span>`,esc(w[2])]))}
        <div class="cbody" style="margin-top:10px"><b>Move them to a bottle:</b> two glasses and one of them will want a refill — that is a bottle. Three glasses is a bottle every time, and whatever is left gets corked so they can take it home.</div>
        ${tbl(["Step up to a bottle","Price"],WINE_MOVE.bottle.map(w=>[`<b>${esc(w[0])}</b><br><span style="color:var(--dim2);font-size:11.5px">${esc(w[1])}</span>`,esc(w[2])]))}
        <div class="note gold" style="margin-top:10px"><b>Every bottle:</b> tell a manager and set the wine glasses down — a manager opens and pours it at the table, every time. <b>$250 and up</b> also gets the big Bordeaux glasses.</div></div>
      <div class="card"><div class="cname">Allergy protocol, in order</div>
        <div class="cbody">${PROTOCOL.map((p,i)=>`<div style="padding:3px 0"><b>${i+1}.</b> ${esc(p)}</div>`).join("")}</div></div>
    </div>

    <div class="sechead"><h2>Steps of service</h2><span>front server flow, top to bottom</span></div>
    <ol class="steps">${FLOW.map(([t,items])=>`<li><b>${esc(t)}</b><ul>${items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></li>`).join("")}</ol>

    <div class="sechead"><h2>Training anchors</h2></div>
    ${tbl(["","Anchor"],ANCHORS.map(a=>[`<b>${esc(a[0])}</b>`,esc(a[1])]))}`;

  /* ---------- WINE ---------- */
  $("#p-wine").innerHTML=`
    <div class="sechead" id="sec-bottles"><h2>Every Bottle</h2><span id="wineCount"></span></div>
    <p class="lede">Filter by price and color when a guest gives you a budget. Good / Better / Best is a selling lane, not a judgment of quality.</p>
    <input class="fsearch" id="wineQ" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Search wine, region, flavor, or dish...">
    <div class="filters" id="wineBudget">${BUDGETS.map(b=>`<button data-p="${b[0]}"${b[0]==="all"?' class="on"':''}>${b[1]}</button>`).join("")}</div>
    <div class="filters" id="wineColor">${[["all","Red + White"],["red","Red"],["white","White / Rose"],["bubbles","Bubbles"]].map(c=>`<button data-c="${c[0]}"${c[0]==="all"?' class="on"':''}>${c[1]}</button>`).join("")}</div>
    <div class="filters" id="wineServe"><button data-s="all" class="on">Bottles &amp; glasses</button><button data-s="glass">By the glass</button><button data-s="bottle">Bottle only</button></div>
    <div class="filters" id="wineType">${WINE_TYPES.map(c=>`<button data-v="${c[0]}"${c[0]==="all"?' class="on"':''}>${c[1]}</button>`).join("")}</div>
    <div class="filters" id="wineTiers">${["all","Good","Better","Best"].map(t=>`<button data-t="${t}"${t==="all"?' class="on"':''}>${t==="all"?"All tiers":t}</button>`).join("")}</div>
    <div class="grid wide" id="wineGrid"></div>

    <div class="sechead" id="sec-pair"><h2>Pairing Finder</h2><span>pick what they ordered</span></div>
    <div class="tool">
      <div class="frow"><div class="f" style="flex:1 1 320px"><label>They ordered</label>
        <select id="pairSel" style="width:100%">${PAIRINGS.map((p,i)=>`<option value="${i}">${esc(p.d)}</option>`).join("")}</select></div></div>
      <div class="out" id="pairOut"></div>
    </div>

    <div class="sechead"><h2>Go-To Pitches</h2><span>when they ask you to pick</span></div>
    ${tbl(["Question","Answer","Why"],FASTANSWERS.map(f=>[esc(f[0]),`<b>${esc(f[1])}</b>`,`<span style="color:var(--dim)">${esc(f[2])}</span>`]))}

    <div class="sechead"><h2>Regions</h2><span>why the place changes the taste</span></div>
    <div class="grid wide">${REGIONS.map(r=>`<div class="card">
      <div class="crow"><div class="cname">${esc(r[0])}</div><div class="cprice" style="font-size:12px">${esc(r[1])}</div></div>
      <div class="cbody">${esc(r[2])}</div></div>`).join("")}</div>`;

  /* ---------- COCKTAILS ---------- */
  $("#p-cocktails").innerHTML=`
    <div class="sechead" id="sec-garnish"><h2>Garnishes</h2><span>the fastest thing to get wrong</span></div>
    ${tbl(["Drink","Garnish","Glass"],COCKTAILS.filter(c=>c.garnish&&c.garnish!=="—").map(c=>[`<b>${esc(c.n)}</b>`,`<span style="color:var(--green2)">${esc(c.garnish)}</span>`,esc(c.glass)]))}

    <div class="sechead"><h2>Flavors</h2></div>
    ${tbl(["Guest asks for","Send them to"],DRINK_PITCH.map(p=>[esc(p[0]),`<b>${esc(p[1])}</b>`]))}

    <div class="sechead" id="sec-drinkmenu"><h2>Drink Menu</h2><span id="drinkCount"></span></div>
    <p class="lede">Everything that is not wine, in one list — cocktails, bourbon, whiskey, scotch, tequila, cognac, port, beer, draft, cordials, coffee and tea. Filter the same way you filter the wine list.</p>
    <input class="fsearch" id="drinkQ" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Search drink, bottle, spirit, or garnish...">
    <div class="filters" id="drinkGrps">${DRINK_CATS.map(g=>`<button data-g="${g[0]}"${g[0]==="all"?' class="on"':''}>${g[1]}</button>`).join("")}</div>
    <div class="filters" id="drinkPrice">${DRINK_BUDGETS.map(b=>`<button data-p="${b[0]}"${b[0]==="all"?' class="on"':''}>${b[1]}</button>`).join("")}</div>
    <div class="grid wide" id="drinkGrid"></div>
    ${DRINK_NOTES.map(n=>`<div class="note" style="margin-top:8px"><b>${esc(n[0])}${/[?.!]$/.test(n[0])?"":":"}</b> ${n[1]}</div>`).join("")}`;

  /* ---------- FOOD MENU — the whole food world in one tab ----------
     Modeled on the guest app: section chips across the top, then compact rows that
     open on tap. Reference material (steak temps, the A5 story) sits INSIDE the
     section it belongs to instead of taking the top of the screen. */
  const MSECS=Object.keys(MENU);
  const secId=n=>"ms-"+n.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  /* extra reference that belongs to one dish, opened from the dish itself */
  const DISH_EXTRA={
    "Japanese A5 Wagyu":`<p class="sub" style="margin:10px 0 4px"><b>The A5 pitch — hit these beats</b></p>
      <ol class="steps">${A5PITCH.map(p=>`<li>${esc(p)}</li>`).join("")}</ol>`
  };
  /* Collapsed rows show the FIRST SENTENCE, so the line always makes sense at a glance
     instead of getting chopped mid-word. Everything else waits behind the chevron. */
  const firstLine=t=>{
    const d=String(t||"").trim(); if(!d)return "";
    const m=d.match(/^[\s\S]*?[.!?](?=\s|$)/);
    let one=(m?m[0]:d).trim();
    if(one.length>150) one=one.slice(0,147).replace(/\s+\S*$/,"")+"…";
    return one;
  };
  const mCard=(name,price,desc,tag,cls)=>{
    const pic=dishPic(name), extra=DISH_EXTRA[name]||"";
    const full=String(desc||"");
    const lead=(typeof LEADS!=="undefined"&&LEADS[name])||firstLine(full);
    const more=full.trim()!==lead.trim(), long=more||!!extra||!!(tag&&tag.length>FLAGMAX);
    /* A flag a guest could ask about — GF, "New on the menu" — has to be readable
       WITHOUT opening the card. Short flags ride up beside the name; longer notes
       stay in the body so the heading never turns into a paragraph. */
    const isFlag=tag&&tag.length<=FLAGMAX;
    const warnT=/verify|cannot|archiv/i.test(tag||"");
    const chip=isFlag?`<span class="mflag${warnT?" warn":""}">${esc(tag)}</span>`:"";
    const body=`${more?`<div class="mdesc">${esc(full)}</div>`:""}
      ${tag&&!isFlag?`<div class="tags"><span class="tag${warnT?" warn":""}">${esc(tag)}</span></div>`:""}
      ${extra}`;
    return `<div class="card mitem${long?" canopen":""}${cls?" "+cls:""}">
      <div class="mhead"${long?' onclick="mToggle(this)"':""}>
        ${pic?`<img class="dishimg" src="${pic}" alt="${esc(name)}" loading="lazy" onclick="event.stopPropagation();openPic(this.alt)">`:""}
        <div class="mtext"><div class="cname">${esc(name)}${chip}</div><div class="cprice">${esc(price)}</div></div>
        ${long?'<span class="mchev" aria-hidden="true">&#8964;</span>':""}
      </div>
      ${lead?`<div class="mlead">${esc(lead)}</div>`:""}
      <div class="mbody">${body}</div>
    </div>`;
  };
  /* steak temps ride along with the cuts, not at the top of the tab */
  /* Enhancements are a price list, not ten cards. One table, opened from Entrees,
     sitting above the steaks the way the temperature table rides with the cuts. */
  const ENH_TBL=acc("Enhancements","what you can add to any steak",
    tbl(["Add","Price","What it is"],ENHANCE.map(e=>[
      `<b>${esc(e[0])}</b>${e[3]&&e[3].length<=FLAGMAX?`<span class="mflag">${esc(e[3])}</span>`:""}`,
      `<span class="mono">${esc(e[1])}</span>`,
      `<span style="color:var(--dim)">${esc(e[2])}${e[3]&&e[3].length>FLAGMAX?" "+esc(e[3]):""}</span>`])));
  const SEC_EXTRA={
    "Entrees":ENH_TBL+acc("Steak temperatures","what each one looks like inside",
      `${tbl(["Temp","Center"],TEMPS.map(t=>[`<b>${esc(t[0])}</b>`,esc(t[1])]))}
       <div class="note warn" style="margin-top:10px"><b>Well done:</b> offer to butterfly a well-done filet — it cooks faster and comes out juicier.</div>`)
  };

  /* Split the specials by day BEFORE rendering: a day-gated special counts as running
     only on its day, otherwise it falls to the not-running list with the day named, so
     nobody pitches Sunday spinalis on a Thursday. Recomputed every render.
     Evan's placement: running stays at the top, NOT running sits after the Kids Menu. */
  const SPX=(()=>{
    const today=new Date().getDay();
    const DAYNM=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const gate=s=>typeof SPECIAL_DAYS!=="undefined"?SPECIAL_DAYS[s[0]]:undefined;
    return {
      onNow:SPECIALS_ON.filter(s=>{const d=gate(s);
        if(d===undefined)return true;
        if(typeof d==="string"&&d[0]==="!")return today!==+d.slice(1);
        return d===today;}),
      notNow:SPECIALS_ON.filter(s=>{const d=gate(s);
        if(d===undefined)return false;
        if(typeof d==="string"&&d[0]==="!")return today===+d.slice(1);
        return d!==today;})
        .map(s=>{const d=gate(s);
          return [s[0],s[1],s[2],typeof d==="string"&&d[0]==="!"
            ? "every day except "+DAYNM[+d.slice(1)]+"s"
            : "only on "+DAYNM[d]+"s"];})
        .concat(SPECIALS_ROTATION.map(s=>[s[0],s[1],s[2],"not on tonight unless a manager says so"]))
    };
  })();
  $("#p-menu").innerHTML=`
    ${SPX.onNow.length?`<div class="sechead" id="sec-specials"><h2>&#9733; Specials</h2><span>${SPX.onNow.length} on the board</span></div>
    <div class="grid wide">${SPX.onNow.map(s=>mCard(s[0],s[1],s[2],s[3],"hl")).join("")}</div>`
    :`<div class="sechead" id="sec-specials"><h2>&#9733; Specials</h2><span>nothing on the board</span></div>
    <div class="grid wide"><div class="empty">Nothing running — tell your Claude the new special.</div></div>`}

    ${MSECS.map(sec=>`
      <div class="sechead" id="${secId(sec)}"><h2>${esc(sec)}</h2><span>${MENU[sec].length} items</span></div>
      ${SEC_EXTRA[sec]||""}
      <div class="grid wide">${MENU[sec].map(i=>mCard(i[0],i[1],i[2],i[3],"")).join("")}</div>`).join("")}

    ${SPX.notNow.length?`<div class="sechead" id="ms-notnow"><h2>Not Running Tonight</h2><span>still current — just not on today. Check with a manager before you pitch one.</span></div>
    <div class="grid wide">${SPX.notNow.map(s=>mCard(s[0],s[1],s[2],s[3],"")).join("")}</div>`:""}

    <div class="sechead" id="ms-dressings"><h2>Salad dressings</h2><span>11 total, only one ranch</span></div>
    <div class="card"><div class="cbody">${DRESSINGS.map(d=>`<div style="padding:3px 0">${/house dressing/i.test(d)?`<b style="color:var(--gold2)">${esc(d)}</b>`:esc(d)}</div>`).join("")}</div></div>
    ${""/* the three standing soups used to own a whole section heading; they are a
          footnote's worth of facts, so they sit here now. */}
    <p class="sub" style="margin:10px 2px 0">Standing soups: ${SOUPS_STANDING.map(x=>esc(x[0])+" "+esc(x[1])).join(" · ")}. Soup of the day is $7 printed and comps with entrees.</p>
<div class="note warn" style="margin-top:10px"><b>Allergen rule:</b> soup of the day allergens change with the soup. Never answer from memory — check the archive below, then verify with the kitchen.</div>


    ${(typeof RECIPES!=="undefined"?RECIPES:[]).map(r=>acc(r.n,r.sub,`
      <p class="sub" style="margin:2px 0 8px">${esc(r.batch)}</p>
      ${tbl(["Ingredient","Amount"],r.ing.map(x=>[`<b>${esc(x[0])}</b>`,esc(x[1])]))}
      <p class="sub" style="margin:12px 0 4px"><b>How it is made</b></p>
      <ol class="steps">${r.steps.map(t=>`<li>${esc(t)}</li>`).join("")}</ol>
      <div class="tags" style="margin-top:10px">${r.flags.map(f=>`<span class="tag">${esc(f)}</span>`).join("")}</div>
      ${r.note?`<div class="note" style="margin-top:10px">${esc(r.note)}</div>`:""}
      ${r.tip?`<div class="note gold" style="margin-top:8px"><b>${esc(r.tip)}</b></div>`:""}`)).join("")}

    <div class="sechead" id="ms-archive"><h2>Archives</h2><span>everything that is not on the menu tonight</span></div>
    ${acc("Soup of the day — the full archive",`${SOTD.length} logged`,
      tbl(["Soup","What's in it","Allergen notes"],SOTD.map(s=>[`<b>${esc(s[0])}</b>`,esc(s[1]),`<span style="color:var(--dim)">${esc(s[2])}</span>`])))}
    ${acc("Past specials, dinners and retired items",`${SPECIALS_PAST.length} entries — do not pitch these`,
      `<div class="grid wide">${SPECIALS_PAST.map(s=>mCard(s[0],s[1],s[2],s[3],"")).join("")}</div>`)}

    <div class="note" style="margin-top:14px"><b>GF</b> = we have confirmed this dish runs gluten-free. Watch the printed menu: it does <b>not</b> mark GF any more — it marks gluten-<b>CONTAINING</b> items with a small <b>g</b>. Never read a letter on the menu as "safe". It is not a promise of a gluten-free kitchen either — the fryer is shared and crackers, bread and croutons ride on plenty of setups. Any real allergy still runs the protocol.</div>
    `;

  /* ---------- ALLERGENS ---------- */
  $("#p-allergens").innerHTML=`
    <div class="note warn"><b>This is a study tool, not a guarantee.</b> Several flags in the source are inferred from ingredients. For any real allergy: ask what kind, ring it in Toast, tell your back server, tell expo and the chef, and tell a manager.</div>

    <div class="sechead" id="sec-allergy"><h2>Allergen finder</h2><span>tap allergens to flag every dish that has them</span></div>
    <div class="filters" id="allergyChips">${ALLERGEN_LIST.map(a=>`<button data-a="${a}">${a}</button>`).join("")}
      <button data-a="__clear" style="border-color:var(--line)">clear all</button></div>
    <input class="fsearch" id="allergyQ" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Search a dish...">
    <div id="allergySummary"></div>
    <div id="allergyTable" class="tw"></div>

    <div class="sechead"><h2>Diet questions</h2></div>
    <div class="grid wide">${DIET.map(d=>`<div class="card"><div class="cname">${esc(d[0])}</div><div class="cbody">${esc(d[1])}</div></div>`).join("")}</div>

    <div class="sechead"><h2>What the terms mean</h2><span>test question 20</span></div>
    ${tbl(["Term","What it includes"],ALLERGEN_MEANING.map(a=>[`<b>${esc(a[0])}</b>`,esc(a[1])]))}`;

  /* ---------- FRONT POS ---------- */
  $("#p-pos").innerHTML = (typeof FRONT_POS==="undefined") ? "" : `
    <div class="sechead" id="sec-pos"><h2>Front POS numbers</h2><span>${FRONT_POS.length} on the sheet up front</span></div>
    <p class="sub" style="margin:0 0 10px">Straight off the sheet taped up front. Two crossed-out rows are not here, and the asterisk is printed on the original — nobody has told us what it marks.</p>
    ${tbl(["Front","POS #"],FRONT_POS.map(r=>[`<b>${esc(r[0])}</b>`,`<span class="mono">${esc(r[1])}</span>`]))}`;

  /* ---------- STUDY ---------- */
  const QT=[["all","Everything"],["steak","Steaks"],["food","Food"],["wine","Wine"],["cocktail","Cocktails"],["allergen","Allergens"],["service","Service"],["money","Money"],["house","The House"],["ops","Ops"]];
  const qtCount=t=>t==="all"?MC.length:MC.filter(m=>m.t===t).length;
  $("#p-study").innerHTML=`
    <div class="sechead" id="sec-quiz"><h2>Generate a quiz</h2><span>${MC.length} questions in the bank — fresh shuffle every run</span></div>
    <p class="lede">Pick a lane or take everything. Question and answer order shuffle every time, so nobody can memorize positions — and missed questions come back as a review round.</p>
    <div class="filters" id="quizTopics">${QT.map(([k,l])=>`<button data-t="${k}"${k==="all"?' class="on"':''}>${l} (${qtCount(k)})</button>`).join("")}</div>
    <div class="filters" id="quizLens"><button data-n="10" class="on">10 questions</button><button data-n="25">25</button><button data-n="0">The whole bank</button></div>
    <div class="qbar"><button class="btn" id="quizStart">Generate quiz</button><button class="btn sec" id="quizDaily">Today's 10</button><div class="score" id="quizScore">ready when you are</div></div>
    <p class="sub" style="margin:2px 0 12px;color:var(--dim2);font-size:12px">Today's 10 is the SAME ten questions for everyone all day — compare scores at pre-shift.</p>
    <div id="quizBox"><div class="empty">Hit generate, take Today's 10, or grab a game below.</div></div>

    <div class="sechead"><h2>Games</h2><span>they build themselves from the live data — always current</span></div>
    <div class="qa">
      <button id="gVocab"><div class="t">Vocab quiz</div><div class="s">10 terms — the wrong answers are other real definitions</div></button>
      <button id="gPrice"><div class="t">Price blitz</div><div class="s">10 prices, 60 seconds on the clock</div></button>
      <button id="gGarnish"><div class="t">Garnish match</div><div class="s">10 drinks — pick the right garnish</div></button>
      <button id="gBottle"><div class="t">Name that bottle</div><div class="s">Hear the pitch, name the wine</div></button>
      <button id="gOrder"><div class="t">Order the greet</div><div class="s">Tap the 5 service steps in sequence</div></button>
      <button id="gAllergy"><div class="t">Order the allergy protocol</div><div class="s">The ${PROTOCOL.length} steps, in the only acceptable order</div></button>
    </div>

    <div class="sechead"><h2>The real menu test</h2><span>all 30 questions with the corrected answers</span></div>
    <div class="qbar"><button class="btn sec" id="ansToggle">Show all answers</button><div class="score">say each answer out loud before revealing</div></div>
    <div class="anslist" id="ansList">${OPEN.map((o,i)=>`<div class="q"><div class="qq"><span>${i+1}.</span>${esc(o[0])}</div><div class="ans">${esc(o[1])}</div></div>`).join("")}</div>`;

  /* ---------- SALES CALCULATOR ---------- */
  $("#p-house").innerHTML=`
    <div id="bkWrap" style="display:none"></div>
    <div id="houseMain">
    <div class="sechead"><h2>How we work</h2><span>Points of Passion, steps of service, and the house playbook</span></div>
    <div class="note gold"><b>Mission:</b> ${esc(HOUSE.mission)}</div>
    ${(typeof HOUSE_INFO==="undefined")?"":`
      <div class="sechead" id="sec-wifi"><h2>At the table</h2><span>what guests ask for that is on no menu</span></div>
      ${tbl(["What","It is"],HOUSE_INFO.map(h=>[`<b>${esc(h[0])}</b><br><span style="color:var(--dim);font-size:12.5px">${esc(h[2])}</span>`,
        `<span class="mono" style="font-size:15px;font-weight:800">${esc(h[1])}</span>`]))}`}
    <div class="bkcard" onclick="openBook()"><h3>&#128214; The Mo's Book</h3><p>The whole training course, in the order we teach it — every day of the original itinerary, front to back. Tap to read it chapter by chapter.</p></div>
    <div class="bkcard" onclick="openDeck()"><h3>&#128444;&#65039; The Training Slideshow</h3><p>The same ten days as a deck you swipe through one slide at a time. Tap to start, or jump to a day.</p></div>
    ${""/* Mise en Place: what has to ride out WITH the plate. Two views on purpose —
          the grab list is how an expo builds a tray, the table is how you look one dish up. */}
    <div class="sechead" id="sec-mise"><h2>Mise en Place</h2><span>${MISE.length} items that need something set with them</span></div>
    <p class="sub" style="margin:0 0 10px">Everything below needs service ware carried out with it. If a dish is not on this list, it goes out with what is already on the table.</p>
    ${(()=>{const by={};
      MISE.forEach(m=>m[1].forEach(tool=>{(by[tool]=by[tool]||[]).push(m[0]);}));
      return `<div class="card"><div class="cbody">
        <p class="sub" style="margin:0 0 8px"><b>Building the tray</b> — group by what you grab</p>
        ${Object.entries(by).sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0])).map(([tool,items])=>
          `<div style="padding:5px 0;border-top:1px solid var(--line)">
             <b>${esc(tool)}</b> <span style="color:var(--dim)">&times;${items.length}</span>
             <div style="color:var(--dim);font-size:12.5px;margin-top:2px">${items.map(esc).join(" · ")}</div>
           </div>`).join("")}</div></div>`;})()}
    ${acc("Every item, one at a time","look a single dish up",
      tbl(["Dish","Set with it","Note"],MISE.map(m=>[`<b>${esc(m[0])}</b>`,esc(m[1].join(" + ")),
        `<span style="color:var(--dim)">${esc(m[2]||"")}</span>`])))}

    ${acc("The printed floor plans","photographed off the wall — the live, tappable plan lives on the Money tab",
      FLOOR.map(r=>`<p class="sub" style="margin:10px 0 4px"><b>${esc(r.n)}</b> — ${esc(r.sub)}</p>
        <img class="floorimg" src="${r.img}" alt="${esc(r.n)} floor plan" loading="lazy" onclick="openFloor('${esc(r.n)}')">`).join(""))}

    ${acc("Points of Passion — the 16","the Mo's service philosophy, word for word where it counts",`<ol class="steps">${HOUSE.points.map(([t,d])=>`<li><b>${esc(t)}.</b> ${esc(d)}</li>`).join("")}</ol>`)}
    ${acc("Isaac's Non-Negotiables — the 11","the standards that never bend",`<ol class="steps">${HOUSE.isaacs.map(d=>`<li>${esc(d)}</li>`).join("")}</ol>`)}
    ${acc("Back server steps of service","your role, from the official handout",`<ul class="steps">${HOUSE.back.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Front server steps of service","what your front is juggling — know their job too",`<ul class="steps">${HOUSE.front.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Expo / runner side work","opening, mid-shift, closing",`
      <p class="sub" style="margin:4px 0"><b>Opening</b></p><ul class="steps">${HOUSE.expo.open.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>
      <p class="sub" style="margin:10px 0 4px"><b>Mid-shift</b></p><ul class="steps">${HOUSE.expo.mid.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>
      <p class="sub" style="margin:10px 0 4px"><b>Closing</b></p><ul class="steps">${HOUSE.expo.close.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Mise en place — what goes down with what","every utensil, course by course",`
      <p class="sub" style="margin:2px 0 10px">Everything in its place: all the items the guest needs and none they do not. The cocktail fork is the one that gets forgotten — it goes down <b>before</b> the food, never after.</p>
      ${HOUSE.mise.map(([t,s,rows])=>`<p class="sub" style="margin:12px 0 4px"><b>${esc(t)}</b> — ${esc(s)}</p><ul class="steps">${rows.map(d=>`<li>${d}</li>`).join("")}</ul>`).join("")}`)}
    ${acc("Tableside shows + setups","every setup, every show, one list",`<ul class="steps">${HOUSE.tableside.map(([t,d])=>`<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Back server closing tasks","the full close-down, from the official checklist",`<ul class="steps">${HOUSE.backclose.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Closing side work — front, back, closer","the posted sheet with slow-night and busy-night quantities",`<ul class="steps">${HOUSE.closesheet.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Bar steps + timing standards","the 20-step bar bible — the timing rules apply everywhere",`<ul class="steps">${HOUSE.barsteps.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("House facts","uniform, trivia, and the little rules",`<ul class="steps">${HOUSE.facts.map(([t,d])=>`<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join("")}</ul>`)}
    <div class="sechead"><h2>Employee Handbook</h2><span>staff only</span></div>
    <div id="hbGate"></div>

    <div class="sechead"><h2>About this app</h2><span>read once</span></div>
    <div class="note">Mo's Server Command Center — built by Evan (back server) as a training and money tool for the team. It is a STUDY COPY, not official house policy: menus, prices, and rules change, so when a dollar matters, verify in Toast or with a manager. The checkout math is proven against real graded checkouts. Spot something wrong or outdated? Tell Evan — corrections go in same-day. Updated <b>__BUILDDATE__</b>.</div>
    </div>`;

  /* ---------- REFERENCE & ARCHIVE ----------
     Good material that does not belong in a working tab. Same collapsed-row feel as the
     food menu: everything is shut until you tap it. */
  $("#p-extra").innerHTML=`
    <div class="sechead"><h2>Reference &amp; Archive</h2><span>worth keeping, out of the way</span></div>
    <p class="lede">Nothing here changes shift to shift. Open what you want.</p>

    ${acc(WOTW.title,"the feature, both bottles",`
      <div class="grid wide">${[WOTW.a,WOTW.b].map(w=>`<div class="card hl">
        <div class="crow"><div><div class="cname">${esc(w.n)}</div><div class="csub">${esc(w.tag)}</div></div><div class="cprice">${esc(w.p)}</div></div>
        <div class="cbody"><b>What it is:</b> ${esc(w.what)}<br><b>Flavor:</b> ${esc(w.flavor)}<br><b>Structure:</b> ${esc(w.structure)}<br><b>Why the price:</b> ${esc(w.why)}<br><b>Pair with:</b> ${esc(w.pair)}</div>
        <div class="pitch">&ldquo;${esc(w.pitch)}&rdquo;</div></div>`).join("")}</div>
      <div style="margin-top:12px">${tbl(["Guest wants","Recommend","Why"],WOTW.contrast.map(c=>[esc(c[0]),`<b>${esc(c[1])}</b>`,`<span style="color:var(--dim)">${esc(c[2])}</span>`]))}</div>`)}

    ${acc("Archived cocktails","off the printed list — ask the bar before promising one",
      `<div class="grid wide">${COCKTAILS.filter(c=>c.grp==="verify").map(c=>`<div class="card">
        <div class="crow"><div class="cname">${esc(c.n)}</div><div class="cprice">${esc(c.p)}</div></div>
        <div class="cbody"><b>Was:</b> ${esc(c.build)}</div></div>`).join("")}</div>`)}

    ${acc("Private dining rooms","headcounts — Lillian books them",
      tbl(["Room","Capacity"],ROOMS.map(r=>[`<b>${esc(r[0])}</b>`,esc(r[1])])))}`;

  /* ---------- VOCABULARY ---------- */
  $("#p-vocab").innerHTML=`
    <div class="sechead"><h2>Mo's Vocabulary</h2><span>talk like you've been here for years</span></div>
    <p class="lede">Straight off the house vocabulary sheets. The search up top knows every term.</p>
    ${VOCAB.map(v=>`
    <div class="sechead"><h2>${esc(v[0])}</h2><span>${v[1].length} terms</span></div>
    ${tbl(["Term","What it means"],v[1].map(r=>[`<b>${esc(r[0])}</b>`,esc(r[1])]))}`).join("")}`;

  const IPD0=(function(){const t=new Date();if(t.getFullYear()!==SCHEDULE.year)return 0;
    const i=SCHEDULE.days.findIndex(x=>x[0]===((t.getMonth()+1)+"/"+t.getDate()));return i<0?0:i;})();
  $("#p-ops").innerHTML=`
    <div class="sechead" id="sec-checkout"><h2>Checkout</h2><span>sales in — your money out</span></div>
    <div class="tool">
      <h3>Type your team's net sales. That's it.</h3>
      <p class="sub">Tips estimate at 20.8% of sales (the observed house rate) until you type the actual tips from Toast. The math below is the exact house checkout — proven to the dollar against a real graded sheet.</p>
      <div class="filters" id="scPresets">${[800,1200,1600,2000,2500].map(v=>`<button data-v="${v}">$${v.toLocaleString()}</button>`).join("")}</div>
      <div class="frow">
        <div class="f"><label>Team net sales $</label><input type="number" inputmode="decimal" id="scSales" placeholder="from Toast" min="0"></div>
        <div class="f"><label>Credit tips $ (optional)</label><input type="number" inputmode="decimal" id="scTips" placeholder="blank = 20.8% est." min="0"></div>
        <div class="f"><label>Lillian banquet tonight?</label><select id="scBq"><option value="no">No</option><option value="yes">Yes (+3% to Lillian)</option></select></div>
        <div class="f"><label>Polisher scheduled?</label><select id="scPolisher"><option value="0">No — the usual</option><option value="10">Yes — team ($10, busiest nights)</option><option value="5">Yes — I'm solo ($5)</option></select></div><div class="f"><label>Expo working?</label><select id="scExpo"><option value="yes">Yes</option><option value="no">No — skip expo line</option></select></div>
        <div class="f"><label>Cash tips $</label><input type="number" inputmode="decimal" id="scCash" placeholder="—" min="0"></div>
      </div>
      <div class="out" id="scOut"></div>
    </div>

    <div class="sechead" id="sec-income"><h2>Night Forecast</h2><span>one machine — the cut, the money, the staffing</span></div>
    <div class="tool">
      <h3>The whole night, one set of numbers</h3>
      <p class="sub">Pick the day and the posted schedule loads itself: covers on the books, teams, cocktailers, bussers, expo, bar. Guess the walk-ins. If you already KNOW the night's net sales, type it in the Real net box and it takes over — otherwise the night builds from covers times spend. One tip percent drives everything below: the $175 cut call, your pocket, and what every tip-out position walks with.</p>
      <div class="frow">
        <div class="f"><label>Day</label><select id="ipDay">${SCHEDULE.days.map((d,i)=>`<option value="${i}"${i===IPD0?" selected":""}>${d[1]} ${d[0]}</option>`).join("")}</select></div>
        <div class="f"><label>On the books</label><input type="number" inputmode="decimal" id="ipBooks" placeholder="from SevenRooms" min="0"></div>
        <div class="f"><label>Walk-ins guess</label><input type="number" inputmode="decimal" id="ipWalk" placeholder="—" min="0"></div>
      </div>
      <p class="sub" id="ipSugg" style="margin:0 0 12px"></p>
      <div class="frow">
        <div class="f"><label>Avg $ per person</label><input type="number" inputmode="decimal" id="ipCheck" value="115" min="0"></div>
        <div class="f"><label>Tip %</label><input type="number" inputmode="decimal" id="ipPct" value="20.8" min="0" max="35" step="0.1"></div>
        <div class="f"><label>Real net $ — if you know it</label><input type="number" inputmode="decimal" id="ipNet" placeholder="overrides covers" min="0"></div>
      </div>
      <div class="frow">
        <div class="f"><label>Teams</label><input type="number" inputmode="decimal" id="ipTeams" value="3" min="1" max="12"></div>
        <div class="f"><label>Cocktailers on</label><select id="ipCk"><option value="0">None</option><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option></select></div>
        <div class="f"><label>Polisher?</label><select id="ipPol"><option value="0">No</option><option value="10">Yes ($10)</option></select></div>
        <div class="f"><label>Bussers on</label><input type="number" inputmode="decimal" id="ipBus" value="2" min="0" max="6"></div>
        <div class="f"><label>Expo / food run on</label><input type="number" inputmode="decimal" id="ipExpo" value="1" min="0" max="4"></div>
        <div class="f"><label>Bartenders on</label><input type="number" inputmode="decimal" id="ipBar" value="2" min="0" max="5"></div>
      </div>
      <p class="sub" style="margin:0 0 10px"><b>Avg $ per person</b> means what ONE guest spends on food and drinks — not the table's whole check. Toast calls it "average spend per guest"; $115 is a typical steak-dinner night. <b>Tip %</b> is the house's usual 20.8 — nudge it if the floor is tipping different tonight.</p>
      <div class="out" id="ipOut"></div>
      <div id="ipWho"></div>
    </div>

    ${""/* The plan sits with the forecast on purpose: covers, staffing and the cut are
          the same conversation as who has which section and where the parties land. */}
    <div class="sechead" id="sec-floor"><h2>Floor plan</h2><span>${FLOORMAP.reduce((n,r)=>n+r.tables.length,0)} tables across ${FLOORMAP.length} rooms</span></div>
    <p class="sub" style="margin:0 0 8px">Seat 1 usually faces the front door. Number clockwise from there unless it is a booth. Tap a table to plot a party on it.</p>
    <div class="fproom" id="fpRooms"></div>
    <div class="fpstage" id="fpStage"></div>
    <div class="fplegend" id="fpLegend"></div>
    <div class="fpdetail" id="fpDetail"></div>
    <div class="sechead"><h2>Tonight's book</h2><span>what you have plotted</span></div>
    <div id="fpBook"></div>
    <div class="sechead"><h2>Share this board</h2><span>one link, the whole floor</span></div>
    <div id="fpShareBox"></div>
    ${acc("Who has which section","retype tonight's names — the plan recolours to match",
      `<div id="fpWhoBox"></div>`)}
    ${typeof FLOOR_CREW!=="undefined"?`<p class="sub" style="margin:10px 2px 0">${FLOOR_CREW.map(c=>`<b>${esc(c[0])}:</b> ${esc(c[1])}`).join(" &middot; ")}</p>`:""}
    <div class="sechead"><h2>Banquet</h2><span>only when Lillian books it</span></div>
    <p class="sub" style="margin:0 0 10px">A <b>banquet checkout</b> only happens when Lillian books the party — that is the one carrying her 3% and the 23% auto-grat, and it usually runs a limited menu with a spend minimum. A group of 8&ndash;10 that walks in and eats off the normal menu is <b>not</b> a banquet: it is a regular table you may or may not auto-grat, with no second envelope.</p>
    <div class="frow">
      <div class="f"><label>Party size</label><input type="number" inputmode="decimal" id="bqcHeads" placeholder="how many guests" min="0"></div>
      <div class="f"><label>Banquet net sales $</label><input type="number" inputmode="decimal" id="bqcSales" placeholder="from the banquet sheet" min="0"></div>
      <div class="f"><label>F&amp;B minimum $</label><input type="number" inputmode="decimal" id="bqcMin" placeholder="blank = no minimum" min="0"></div>
    </div>
    <div class="frow">
      <div class="f"><label>Auto-grat %</label><input type="number" inputmode="decimal" id="bqcGratPct" value="23" min="0" max="30"></div>
      <div class="f"><label>or gratuity $</label><input type="number" inputmode="decimal" id="bqcTips" placeholder="real number wins" min="0"></div>
      <div class="f"><label>Booked through Lillian?</label><select id="bqcThree"><option value="yes" selected>Yes — her 3% comes out</option><option value="no">No — no 3%</option></select></div>
    </div>
    <div class="out" id="bqcOut"></div>

    <div class="sechead"><h2>Splits</h2><span>the house rules</span></div>
    <ol class="steps">${SPLIT_RULES.map(r=>{/* split on a SENTENCE end, not any period — "busser gets 1.5%" was being cut in half at the decimal */const m=r.match(/^([\s\S]*?[.!?])(\s[\s\S]*)$/);return `<li><b>${esc(m?m[1]:r)}</b>${m?" "+esc(m[2].trim()):""}</li>`;}).join("")}</ol>

    

    `;

  /* ---------- WIRE UP ---------- */
  renderWines(); renderDrinks(); renderAllergens(); renderFloor(); hbRender(); fpBoardFromLink(); fpSyncStart(); pairingOut(0); calcSC(); calcBQC(); ipPrefill(); calcIP(); calcBq(); fillSched();
  applyLang();
  startLangObserver();

  $("#p-shift").querySelector(".qa").onclick=e=>{
    const b=e.target.closest("button[data-qa]"); if(!b)return;
    const [tab,sel]=b.dataset.qa.split("|");
    if(tab==="__search"){window.scrollTo({top:0,behavior:"smooth"});setTimeout(()=>$("#gsearch").focus(),250);return;}
    go(tab,sel||null);
  };

  $("#wineQ").oninput=e=>{wineFilter.q=e.target.value;renderWines();};
  const chip=(id,key,attr)=>{$(id).onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $(id).querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));wineFilter[key]=b.dataset[attr];renderWines();};};
  chip("#wineBudget","price","p"); chip("#wineColor","color","c"); chip("#wineServe","serve","s"); chip("#wineType","v","v"); chip("#wineTiers","tier","t");
  $("#pairSel").onchange=e=>pairingOut(+e.target.value);

  $("#drinkQ").oninput=e=>{drinkFilter.q=e.target.value;renderDrinks();};
  $("#drinkGrps").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#drinkGrps").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));drinkFilter.grp=b.dataset.g;renderDrinks();};
  $("#drinkPrice").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#drinkPrice").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));drinkFilter.price=b.dataset.p;renderDrinks();};

  $("#allergyChips").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    const a=b.dataset.a;
    if(a==="__clear"){allergySel.clear();$("#allergyChips").querySelectorAll("button").forEach(x=>x.classList.remove("on"));}
    else{allergySel.has(a)?allergySel.delete(a):allergySel.add(a);b.classList.toggle("on");}
    renderAllergens();};
  $("#allergyQ").oninput=renderAllergens;

  $("#quizStart").onclick=()=>{
    const sub=QTOPIC==="all"?null:MC.map((m,i)=>m.t===QTOPIC?i:-1).filter(i=>i>=0);
    startQuiz(sub&&sub.length?sub:null);
  };
  $("#quizTopics").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#quizTopics").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
    QTOPIC=b.dataset.t;};
  $("#quizLens").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#quizLens").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
    QLEN=+b.dataset.n;};
  $("#quizDaily").onclick=todaysTen;
  const toArena=f=>()=>{f();document.querySelector("#quizBox").scrollIntoView({behavior:"smooth",block:"start"});};
  $("#gVocab").onclick=toArena(vocabQuiz); $("#gPrice").onclick=toArena(priceBlitz);
  $("#gGarnish").onclick=toArena(garnishMatch); $("#gBottle").onclick=toArena(nameBottle);
  $("#gOrder").onclick=toArena(()=>orderGame("greet")); $("#gAllergy").onclick=toArena(()=>orderGame("allergy"));
  $("#ansToggle").onclick=()=>{
    const on=$("#ansList").classList.toggle("show");
    $("#ansToggle").textContent=on?"Hide all answers":"Show all answers";
  };

  $("#scPresets").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#scSales").value=b.dataset.v; $("#scTips").value=""; calcSC(); calcBQC();};
  ["scSales","scTips","scBq","scPolisher","scExpo","scCash"].forEach(id=>{
    const n=$("#"+id); n.oninput=()=>{calcSC();calcBQC();}; n.onchange=()=>{calcSC();calcBQC();}; n.onkeyup=()=>{calcSC();calcBQC();};});
  ["bqcHeads","bqcSales","bqcMin","bqcGratPct","bqcTips","bqcThree"].forEach(id=>{
    const n=$("#"+id); n.oninput=calcBQC; n.onchange=calcBQC; n.onkeyup=calcBQC;});
  ["ipBooks","ipWalk","ipTeams","ipCk","ipCheck","ipPol","ipPct","ipNet","ipBus","ipExpo","ipBar"].forEach(id=>{
    const n=$("#"+id); n.oninput=calcIP; n.onchange=calcIP; n.onkeyup=calcIP;});
  $("#ipDay").onchange=()=>{ipPrefill();calcIP();};
  $("#ipSugg").onclick=e=>{const b=e.target.closest("#ipUse");if(!b)return;
    $("#ipWalk").value=+b.dataset.s||0; calcIP();};


  ["wine","menu","cocktails","ops","allergens"].forEach(addJumps);
}

/* ---------- DISH PHOTOS ----------
   PHOTOS is keyed by the exact menu-item name. Top level with the book reader
   because the thumbnails call openPic() through inline onclick. */
function dishPic(name){
  return (typeof PHOTOS!=="undefined" && PHOTOS[name]) || "";
}
/* ---------- INTERACTIVE FLOOR PLAN ----------
   Rendered from FLOORMAP (positions) + SECTIONS (who has what tonight). Edit
   SECTIONS and the plan recolours — that is the daily update, no code change. */
var FPROOM, FPSEL, FPSHOWSEC, FPMERGED, FPPARTY, FPWHO, FPDAY;
var FPSENT, FPJOINED, FPINCOMING, FPSHAREMSG;
var FPCOLORS=["#7A2E26","#1F6B4F","#2F5D8A","#8A5A12","#6B3E7A","#0F6E70","#9B4A2F","#4A6B1F","#7A2050","#3D5A80"];
/* What the floor typed in tonight — merges, parties, who has which section. Kept in
   localStorage so a refresh mid-shift doesn't wipe the plot. Everything is wrapped:
   private-mode Safari throws on setItem, and losing the plot beats crashing the app. */
function fpSave(){
  try{ localStorage.setItem("mos-floor-v1", JSON.stringify(
    {m:FPMERGED||[], p:FPPARTY||{}, w:FPWHO||{}, d:FPDAY==null?null:FPDAY})); }catch(e){}
  fpSyncPush();
}
function fpLoad(){
  FPMERGED=[]; FPPARTY={}; FPWHO={};
  try{
    const r=JSON.parse(localStorage.getItem("mos-floor-v1")||"{}");
    if(Array.isArray(r.m))FPMERGED=r.m;
    if(r.p&&typeof r.p==="object")FPPARTY=r.p;
    if(r.w&&typeof r.w==="object")FPWHO=r.w;
    if(r.d!=null)FPDAY=+r.d;
  }catch(e){}
}
function fpMergeList(){ return (typeof MERGEABLE==="undefined")?[]:MERGEABLE; }
function fpActiveMerges(){ return fpMergeList().filter(m=>(FPMERGED||[]).indexOf(m.id)>=0); }
/* A merged pair books as ONE table, so parties key off the merge id when it is on. */
function fpKey(t){
  const m=fpActiveMerges().find(x=>x.a===t||x.b===t);
  return m?m.id:t;
}
function fpPartnerOf(t){
  const m=fpMergeList().find(x=>x.a===t||x.b===t);
  if(!m)return null;
  return {m:m, other:(m.a===t?m.b:m.a), on:(FPMERGED||[]).indexOf(m.id)>=0};
}
function fpSectionOf(t){
  if(typeof SECTIONS==="undefined")return null;
  for(let i=0;i<SECTIONS.length;i++) if(SECTIONS[i].tables.indexOf(t)>=0)
    return {i:i, who:fpWhoOf(i), name:SECTIONS[i].name||SECTIONS[i].who||("Section "+(i+1))};
  return null;
}
function fpSeatRing(tb){
  /* Seat 1 sits where the plan marks it and you number clockwise from there. */
  if(!tb.seat1||tb.seats<2) return "";
  const dirs=["N","NE","E","SE","S","SW","W","NW"];
  const NAME={N:"toward the front door side",NE:"the near-right corner",E:"the right side",
    SE:"the far-right corner",S:"the far side",SW:"the far-left corner",W:"the left side",
    NW:"the near-left corner"};
  return NAME[tb.seat1]||tb.seat1;
}
/* ---------- HANDBOOK CURTAIN ----------
   A curtain, not a lock, and it is worth being honest about which: this app is one
   public file, so anyone who opens the page source can read the handbook whether or
   not they type the word. What this DOES do is stop a guest who picks up a server's
   phone and taps around. Real protection would mean not shipping the handbook in a
   public file at all.
   The word is compared as a small hash rather than sitting in plain sight, so a
   casual view-source and Ctrl-F "password" does not just hand it over. */
var HBOPEN;
function hbHash(str){
  let h=5381;
  for(let i=0;i<str.length;i++) h=((h*33)^str.charCodeAt(i))>>>0;
  return h;
}
function hbRender(){
  const box=$("#hbGate"); if(!box)return;
  if(HBOPEN){
    box.innerHTML=`<p class="lede">The house handbook, section by section. General guidelines — not a contract. Questions go to Management.</p>
      ${HANDBOOK.map(h=>acc(h[0],h[1],h[2])).join("")}
      <p class="sub" style="margin:10px 2px 0"><button class="btn sec" onclick="hbLock()">Lock it again</button></p>`;
    return;
  }
  box.innerHTML=`<div class="card"><div class="cbody">
    <p class="sub" style="margin:0 0 10px">The handbook is staff only. Ask a manager for the word if you do not have it.</p>
    <div class="frow"><div class="f" style="max-width:260px">
      <label for="hbPw">Password</label>
      <input type="password" id="hbPw" autocomplete="off" autocapitalize="off" autocorrect="off"
             spellcheck="false" enterkeyhint="go" placeholder="staff password">
    </div></div>
    <p style="margin:8px 0 0"><button class="btn" onclick="hbTry()">Open the handbook</button></p>
    <p class="sub" id="hbMsg" style="margin:8px 0 0;color:var(--red);display:none">That is not it. Try again.</p>
  </div></div>`;
  const inp=$("#hbPw");
  if(inp) inp.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); hbTry(); } };
}
function hbTry(){
  const v=($("#hbPw")||{}).value||"";
  if(hbHash(v.trim())===3652400411){ HBOPEN=true; hbRender(); window.scrollTo({top:$("#hbGate").offsetTop-70,behavior:"smooth"}); }
  else { const m=$("#hbMsg"); if(m)m.style.display="block"; }
}
function hbLock(){ HBOPEN=false; hbRender(); }

/* ---------- geometry shared by the plan and the seat-1 markers ----------
   SZ is each shape's footprint as a % of the stage. A diamond is a square rotated 45deg,
   so its BOUNDING box is the diagonal, not the side — using the side would draw a merged
   pair narrower than the tables it replaces. */
var FPSZ={d:[13.4,13.4],b:[13,8],bv:[8,13],r:[9,9],bar:[5.4,5.4],banq:[8,22],vault:[12,17]};
var FPDIRV={N:[0,-1],NE:[.72,-.72],E:[1,0],SE:[.72,.72],S:[0,1],SW:[-.72,.72],W:[-1,0],NW:[-.72,-.72]};
var FPRAD={d:[6.4,6.9],b:[8,5.6],bv:[6,9],r:[5.6,6.1],banq:[5,13],bar:[0,0],vault:[7.2,10.2]};

function fpMergedBoxes(room){
  return fpActiveMerges().map(m=>{
    const A=room.tables.find(x=>x.t===m.a), B=room.tables.find(x=>x.t===m.b);
    if(!A||!B)return null;
    const sa=FPSZ[A.shape]||[9,9], sb=FPSZ[B.shape]||[9,9];
    return {id:m.id, a:A, b:B, x:(A.x+B.x)/2, y:(A.y+B.y)/2,
      w:Math.abs(A.x-B.x)+Math.max(sa[0],sb[0]),
      h:Math.abs(A.y-B.y)+Math.max(sa[1],sb[1]),
      seats:A.seats+B.seats, seat1:A.seat1, room:room};
  }).filter(Boolean);
}
function fpSeatDot(key,cx,cy,rx,ry,dir){
  const v=FPDIRV[dir]; if(!v)return "";
  return `<i class="fpseat1${FPSEL===key?" sel":""}" style="left:${(cx+v[0]*rx).toFixed(2)}%;top:${(cy+v[1]*ry).toFixed(2)}%" title="Seat 1" aria-label="Seat 1">1</i>`;
}
function fpBadge(key,cx,cy,h){
  const pt=(FPPARTY||{})[key]; if(!pt)return "";
  const label=[pt.t||"",pt.n?pt.n+" top":""].filter(Boolean).join(" · ");
  if(!label)return "";
  return `<b class="fppty" style="left:${cx}%;top:${(cy+h/2+0.6).toFixed(2)}%">${esc(label)}</b>`;
}
function renderFloor(){
  const wrap=$("#fpStage"); if(!wrap||typeof FLOORMAP==="undefined")return;
  if(FPROOM==null)FPROOM=0;
  if(!FPMERGED)fpLoad();
  const room=FLOORMAP[FPROOM];
  const boxes=fpMergedBoxes(room);
  const hidden={}; boxes.forEach(g=>{hidden[g.a.t]=1;hidden[g.b.t]=1;});

  const singles=room.tables.filter(tb=>!hidden[tb.t]).map(tb=>{
    const sec=FPSHOWSEC?fpSectionOf(tb.t):null;
    const bg=sec?`background:${FPCOLORS[sec.i%FPCOLORS.length]}`:"";
    const seated=(FPPARTY||{})[tb.t]?" seated":"";
    const r=FPRAD[tb.shape];
    const dot=(r&&tb.seats>1&&tb.shape!=="bar")?fpSeatDot(tb.t,tb.x,tb.y,r[0],r[1],tb.seat1):"";
    const sz=FPSZ[tb.shape]||[9,9];
    return `<div class="fptable ${tb.shape}${FPSEL===tb.t?" sel":""}${seated}" style="left:${tb.x}%;top:${tb.y}%;${bg}"
      onclick="fpPick('${tb.t}')" role="button" aria-label="Table ${esc(tb.lbl||tb.t)}"><span>${esc(tb.lbl||tb.t)}</span></div>${dot}${fpBadge(tb.t,tb.x,tb.y,sz[1])}`;
  }).join("");

  const groups=boxes.map(g=>{
    const sec=FPSHOWSEC?fpSectionOf(g.a.t):null;
    const bg=sec?`background:${FPCOLORS[sec.i%FPCOLORS.length]}`:"";
    const seated=(FPPARTY||{})[g.id]?" seated":"";
    const dot=fpSeatDot(g.id,g.x,g.y,g.w/2+1.5,g.h/2+1.5,g.seat1);
    return `<div class="fptable merged${FPSEL===g.id?" sel":""}${seated}"
      style="left:${g.x}%;top:${g.y}%;width:${g.w.toFixed(2)}%;height:${g.h.toFixed(2)}%;${bg}"
      onclick="fpPick('${g.id}')" role="button" aria-label="Tables ${esc(g.id)} pushed together"><span>${esc(g.id)}</span></div>${dot}${fpBadge(g.id,g.x,g.y,g.h)}`;
  }).join("");

  wrap.innerHTML=singles+groups;
  $("#fpRooms").innerHTML=FLOORMAP.map((r,i)=>
    `<button class="${i===FPROOM?"on":""}" onclick="fpRoom(${i})">${esc(r.room)}</button>`).join("");
  $("#fpLegend").innerHTML=(typeof SECTIONS==="undefined")?"":
    `<button class="${FPSHOWSEC?"on":""}" onclick="fpToggleSections()">${FPSHOWSEC?"Hide sections":"Show tonight's sections"}</button>`+
    (FPSHOWSEC?SECTIONS.map((s,i)=>{const w=fpWhoOf(i);
      return `<button onclick="fpPick('${fpKey(s.tables[0])}')"><span class="sw" style="background:${FPCOLORS[i%FPCOLORS.length]}"></span>${esc(s.name||"")}${w?' <i style="font-style:normal;color:var(--dim)">'+esc(w)+'</i>':""}</button>`;}).join(""):"");
  fpDetail(); fpBook(); fpWhoBox(); fpShareBox();
}
function fpFind(key){
  const room=FLOORMAP[FPROOM];
  const g=fpMergedBoxes(room).find(x=>x.id===key);
  if(g)return {merged:true,g:g,seats:g.seats,seat1:g.seat1,label:"Tables "+g.id,room:room};
  const tb=room.tables.find(x=>x.t===key);
  if(!tb)return null;
  return {merged:false,tb:tb,seats:tb.seats,seat1:tb.seat1,label:"Table "+tb.t,room:room};
}
function fpDetail(){
  const box=$("#fpDetail"); if(!box)return;
  const room=FLOORMAP[FPROOM];
  const f=FPSEL?fpFind(FPSEL):null;
  if(!f){
    box.innerHTML=`<div class="meta">${esc(room.sub)} &middot; ${room.tables.length} tables. Tap any table to seat it, see who has it, and find seat 1.</div>`;
    return;
  }
  const SHAPE={d:"Four-top",b:"Booth",bv:"Booth",r:"Round",bar:"Bar seat",banq:"Banquette",vault:"Private room"};
  const kind=f.merged?"Pushed together":(SHAPE[f.tb.shape]||f.tb.shape);
  if(!f.merged&&f.tb.lbl)f.label=f.tb.lbl;
  const sec=fpSectionOf(f.merged?f.g.a.t:f.tb.t);
  const ring=fpSeatRing({seat1:f.seat1,seats:f.seats});
  const pt=(FPPARTY||{})[FPSEL]||{};
  const pair=f.merged?null:fpPartnerOf(f.tb.t);
  const mergeBtn=f.merged
    ? `<button class="btn sec" onclick="fpUnmerge('${f.g.id}')">Split ${esc(f.g.a.t)} and ${esc(f.g.b.t)} back apart</button>`
    : (pair?`<button class="btn sec" onclick="fpMerge('${pair.m.id}')">Push together with ${esc(pair.other)}</button>`:"");
  const note=(!f.merged&&f.tb.note)?f.tb.note:"";
  box.innerHTML=`<div class="n">${esc(f.label)}</div>
    <div class="meta">${esc(kind)} &middot; sits ${f.seats} &middot; ${esc(room.room)}${sec?" &middot; "+esc(sec.name)+(sec.who?" ("+esc(sec.who)+")":""):""}</div>
    ${note?`<div class="meta" style="margin-top:6px">${esc(note)}</div>`:""}
    ${f.seats>1&&ring?`<div class="meta" style="margin-top:6px"><b>Seat 1</b> is ${esc(ring)} — number clockwise from there.</div>
    <div class="fpseats">${Array.from({length:Math.min(f.seats,16)},(_,i)=>`<i>Seat ${i+1}</i>`).join("")}</div>`:""}
    <div class="frow" style="margin-top:12px">
      <div class="f"><label for="fpN">Party of</label><input type="number" inputmode="numeric" id="fpN" min="1" max="40" value="${pt.n||""}" placeholder="how many"></div>
      <div class="f"><label for="fpT">Time</label><input type="text" id="fpT" value="${esc(pt.t||"")}" placeholder="6:30" autocapitalize="off"></div>
      <div class="f"><label for="fpNm">Name <span style="color:var(--dim)">optional</span></label><input type="text" id="fpNm" value="${esc(pt.name||"")}" placeholder="Smith"></div>
    </div>
    <p style="margin:8px 0 0">
      <button class="btn" onclick="fpSeat()">${pt.n?"Update this table":"Seat this table"}</button>
      ${pt.n?`<button class="btn sec" onclick="fpClearSel()">Clear it</button>`:""}
      ${mergeBtn}
    </p>`;
  const go=e=>{ if(e.key==="Enter"){ e.preventDefault(); fpSeat(); } };
  ["#fpN","#fpT","#fpNm"].forEach(id=>{ const el=$(id); if(el)el.onkeydown=go; });
}
function fpSeat(){
  if(!FPSEL)return;
  const n=+(($("#fpN")||{}).value||0);
  const t=String((($("#fpT")||{}).value||"")).trim();
  const nm=String((($("#fpNm")||{}).value||"")).trim();
  if(!n&&!t&&!nm){ fpClear(FPSEL); return; }
  FPPARTY=FPPARTY||{};
  FPPARTY[FPSEL]={n:n||null,t:t,name:nm};
  fpSave(); renderFloor();
}
function fpClear(key){ if(FPPARTY)delete FPPARTY[key]; fpSave(); renderFloor(); }
function fpClearSel(){ if(FPSEL)fpClear(FPSEL); }
function fpMerge(id){
  FPMERGED=FPMERGED||[];
  if(FPMERGED.indexOf(id)<0)FPMERGED.push(id);
  const m=fpMergeList().find(x=>x.id===id);
  /* a party already sitting on either half follows the pair onto the merged table; if
     BOTH halves are seated, combine them onto the pair rather than silently dropping one
     -- the covers total in the book has to stay honest. */
  if(m&&FPPARTY){
    const A=FPPARTY[m.a], B=FPPARTY[m.b];
    delete FPPARTY[m.a]; delete FPPARTY[m.b];
    if(A&&B)FPPARTY[id]={n:((+A.n||0)+(+B.n||0))||null,
      t:(fpTimeVal(A.t)<=fpTimeVal(B.t)?A.t:B.t),
      name:[A.name,B.name].filter(Boolean).join(" + ")};
    else if(A||B)FPPARTY[id]=A||B;
  }
  FPSEL=id; fpSave(); renderFloor();
}
function fpUnmerge(id){
  FPMERGED=(FPMERGED||[]).filter(x=>x!==id);
  const m=fpMergeList().find(x=>x.id===id);
  if(m&&FPPARTY&&FPPARTY[id]){ FPPARTY[m.a]=FPPARTY[id]; delete FPPARTY[id]; }
  FPSEL=m?m.a:null; fpSave(); renderFloor();
}
/* Tonight's book — every party plotted, in time order, across all rooms. */
function fpTimeVal(t){
  const m=String(t||"").match(/^(\d{1,2})[:.]?(\d{2})?/);
  if(!m)return 9999;
  let h=+m[1]; const mi=+(m[2]||0);
  if(h<11)h+=12;                      /* a floor that opens at 4 never means 5am */
  return h*60+mi;
}
function fpBook(){
  const box=$("#fpBook"); if(!box)return;
  const rows=Object.keys(FPPARTY||{}).map(k=>{
    let room="";
    FLOORMAP.forEach(r=>{
      if(r.tables.some(x=>x.t===k))room=r.room;
      const m=fpMergeList().find(x=>x.id===k);
      if(m&&r.tables.some(x=>x.t===m.a))room=r.room;
    });
    return Object.assign({key:k,room:room},FPPARTY[k]);
  }).sort((a,b)=>fpTimeVal(a.t)-fpTimeVal(b.t)||String(a.key).localeCompare(b.key));
  if(!rows.length){
    box.innerHTML=`<div class="meta">Nothing plotted yet. Tap a table above, put in the party and the time, and it lands here.</div>`;
    return;
  }
  const covers=rows.reduce((n,r)=>n+(+r.n||0),0);
  box.innerHTML=`<div class="meta"><b>${rows.length}</b> ${rows.length===1?"table":"tables"} plotted &middot; <b>${covers}</b> covers</div>
    <div class="fpbook">${rows.map(r=>`<div class="r">
      <span class="tm">${esc(r.t||"—")}</span>
      <span class="tb">${esc(r.key)}</span>
      <span class="sz">${r.n?esc(r.n)+" top":""}${r.name?" &middot; "+esc(r.name):""}${r.room?" &middot; "+esc(r.room):""}</span>
      <span class="x"><button class="btn sec" data-k="${esc(r.key)}">Show</button></span>
    </div>`).join("")}</div>
    <p style="margin:10px 0 0"><button class="btn sec" onclick="fpClearAll()">Clear the whole book</button></p>`;
  /* delegated, so a table id never has to survive a trip through a JS string literal */
  box.onclick=e=>{ const b=e.target.closest("button[data-k]"); if(b)fpPick(b.dataset.k); };
}
function fpClearAll(){ FPPARTY={}; fpSave(); renderFloor(); }
/* ---------- who has which section ----------
   SECTIONS ships with the names off the marked-up sheet. This lets the floor retype them
   for tonight, with the people actually scheduled that day offered as suggestions. */
function fpWhoOf(i){
  const o=(FPWHO||{})[String(i)];
  if(o!=null&&String(o).trim()!=="")return String(o);
  return SECTIONS[i]?SECTIONS[i].who:"";
}
function fpDayNames(di){
  if(typeof SCHEDULE==="undefined")return [];
  const out=[];
  SCHEDULE.sections.forEach(sec=>{
    if(["Fronts","Backs","Bar","Cktail"].indexOf(sec[0])<0)return;
    sec[1].forEach(r=>{
      const c=String(r[di+1]||"").trim();
      if(c&&c!=="?"&&!/^off\??$/i.test(c)&&!/^ro\??$/i.test(c))out.push(r[0]);
    });
  });
  return out;
}
function fpWhoBox(){
  const box=$("#fpWhoBox"); if(!box||typeof SECTIONS==="undefined")return;
  if(FPDAY==null)FPDAY=(typeof IPD0!=="undefined")?IPD0:0;
  const names=fpDayNames(FPDAY);
  box.innerHTML=`
    <div class="frow"><div class="f"><label for="fpDay">Suggest names from</label>
      <select id="fpDay" onchange="fpSetDay(this.value)">${SCHEDULE.days.map((d,i)=>
        `<option value="${i}"${i===FPDAY?" selected":""}>${d[1]} ${d[0]}</option>`).join("")}</select></div></div>
    <datalist id="fpNames">${names.map(n=>`<option value="${esc(n)}"></option>`).join("")}</datalist>
    <p class="sub" style="margin:0 0 8px">${names.length?`${names.length} on that day — start typing and they autocomplete.`:"Nobody scheduled that day."}</p>
    ${SECTIONS.map((s,i)=>`<div class="frow" style="margin-bottom:6px"><div class="f">
      <label for="fpw${i}"><span class="sw" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${FPCOLORS[i%FPCOLORS.length]};margin-right:6px"></span>${esc(s.name||"")}
        <span style="color:var(--dim);font-weight:400"> &middot; ${esc(s.tables.map(t=>t==="100"?"Vault":t).join(", "))}</span></label>
      <input type="text" id="fpw${i}" list="fpNames" value="${esc(fpWhoOf(i))}" placeholder="nobody yet" onchange="fpSetWho(${i},this.value)">
    </div></div>`).join("")}
    <p style="margin:8px 0 0"><button class="btn sec" onclick="fpResetWho()">Put the posted names back</button></p>`;
}
function fpSetDay(v){ FPDAY=+v; fpSave(); fpWhoBox(); }
function fpSetWho(i,v){
  FPWHO=FPWHO||{};
  if(String(v).trim()==="")delete FPWHO[String(i)]; else FPWHO[String(i)]=String(v).trim();
  fpSave();
  if(FPSHOWSEC)renderFloor(); else { fpDetail(); }
}
function fpResetWho(){ FPWHO={}; fpSave(); renderFloor(); }
/* ================= SHARING THE BOARD =================
   Two ways in, because they answer different questions.

   A SHARE CODE is the entire board squeezed into a link. No server, no account, no key,
   nothing to deploy — it works right now. Set the night, send the link, everyone taps it.
   That is the right shape for a board that gets set once a day.

   LIVE SYNC is the same board on a service that pushes every change as it happens. It
   stays completely dormant until FLOOR_SYNC has a url and a key, so with those blank the
   app does not open a socket, does not touch the network, and behaves exactly as it did
   before any of this existed.
   ==================================================== */
function fpB64e(str){
  const b=new TextEncoder().encode(str); let out="";
  for(let i=0;i<b.length;i++) out+=String.fromCharCode(b[i]);
  return btoa(out).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function fpB64d(code){
  const t=String(code).replace(/-/g,"+").replace(/_/g,"/");
  const bin=atob(t + (t.length%4 ? "=".repeat(4-(t.length%4)) : ""));
  const b=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) b[i]=bin.charCodeAt(i);
  return new TextDecoder().decode(b);
}
/* Rows rather than objects: a full Friday fits in a link you can text. */
function fpBoardCode(){
  const p=Object.keys(FPPARTY||{}).map(k=>{
    const v=FPPARTY[k]||{}; return [k, v.n||0, v.t||"", v.name||""];
  });
  return fpB64e(JSON.stringify({v:1, m:FPMERGED||[], p:p, w:FPWHO||{}, d:(FPDAY==null?-1:FPDAY)}));
}
function fpBoardLink(){
  return location.origin+location.pathname+"#board="+fpBoardCode();
}
/* A board arrives from a link somebody was sent, so it is untrusted input. Keys are held
   to the same shape the server enforces, and checked against tables that actually exist.
   This is the fix that matters: a key like  x');alert(1)//  reached an onclick attribute
   and ran when a server tapped Show in the book. Escaping the render site alone would
   have patched one symptom and left the next interpolation to find. */
function fpKnownKey(k){
  if(!/^[A-Za-z0-9+_-]{1,16}$/.test(k))return false;
  if(typeof MERGEABLE!=="undefined"&&MERGEABLE.some(m=>m.id===k))return true;
  return typeof FLOORMAP!=="undefined"&&FLOORMAP.some(r=>r.tables.some(t=>t.t===k));
}
function fpApplyBoard(code){
  const o=JSON.parse(fpB64d(code));
  if(!o||o.v!==1) throw new Error("not a board");
  FPMERGED=Array.isArray(o.m)?o.m.filter(x=>typeof x==="string"&&
    (typeof MERGEABLE==="undefined"||MERGEABLE.some(m=>m.id===x))):[];
  FPPARTY={};
  (Array.isArray(o.p)?o.p:[]).forEach(r=>{
    if(!Array.isArray(r)||!r[0])return;
    const k=String(r[0]);
    if(!fpKnownKey(k))return;
    FPPARTY[k]={n:(+r[1])||null, t:String(r[2]||"").slice(0,10), name:String(r[3]||"").slice(0,40)};
  });
  FPWHO={};
  if(o.w&&typeof o.w==="object"&&!Array.isArray(o.w))
    Object.keys(o.w).forEach(k=>{ if(/^\d{1,2}$/.test(k)&&+k<40)FPWHO[k]=String(o.w[k]).slice(0,60); });
  if(typeof o.d==="number"&&o.d>=0&&o.d<7)FPDAY=o.d;
  FPINCOMING=null;
  fpSave(); renderFloor();
}
/* A link opened from the group chat. Loading it silently would wipe a plot somebody just
   spent ten minutes on, so it only auto-applies to an empty board and otherwise asks. */
function fpBoardFromLink(){
  let m=null;
  try{ m=/[#&]board=([A-Za-z0-9_-]+)/.exec(location.hash||""); }catch(e){ return; }
  if(!m)return;
  try{ history.replaceState(null,"",location.pathname+location.search); }catch(e){}
  const local=Object.keys(FPPARTY||{}).length+(FPMERGED||[]).length+Object.keys(FPWHO||{}).length;
  if(!local){ try{ fpApplyBoard(m[1]); }catch(e){ FPSHAREMSG="That link was not a board."; } return; }
  FPINCOMING=m[1];
  fpShareBox();
}
/* Tapping a shared link while the app is ALREADY open is a same-document hash change:
   the page does not reload, so boot never runs again. Without this the link would look
   like it did nothing, which is the normal case on a phone that already has Mo's open. */
if(typeof window!=="undefined") window.addEventListener("hashchange", function(){ fpBoardFromLink(); });
function fpTakeIncoming(){
  try{ fpApplyBoard(FPINCOMING); FPSHAREMSG="Loaded the shared board."; }
  catch(e){ FPSHAREMSG="That link was not a board."; FPINCOMING=null; }
  fpShareBox();
}
function fpKeepMine(){ FPINCOMING=null; FPSHAREMSG=""; fpShareBox(); }
function fpCopyBoard(){
  const link=fpBoardLink();
  const done=()=>{ FPSHAREMSG="Link copied — paste it to the floor."; fpShareBox(); };
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(link).then(done,()=>{FPSHAREMSG="";fpShareBox();});
      return;
    }
  }catch(e){}
  FPSHAREMSG=""; fpShareBox();            /* no clipboard: the box shows the link to copy by hand */
}
function fpPasteBoard(){
  const el=$("#fpPaste"); if(!el)return;
  const v=String(el.value||"").trim();
  const m=/[#&]board=([A-Za-z0-9_-]+)/.exec(v)||/^([A-Za-z0-9_-]{8,})$/.exec(v);
  if(!m){ FPSHAREMSG="That does not look like a board link."; fpShareBox(); return; }
  try{ fpApplyBoard(m[1]); FPSHAREMSG="Loaded the shared board."; }
  catch(e){ FPSHAREMSG="That link was not a board."; }
  fpShareBox();
}
function fpSyncStatus(){
  return (typeof FloorSync!=="undefined"&&FloorSync.status)?FloorSync.status():"off";
}
function fpShareBox(){
  const box=$("#fpShareBox"); if(!box)return;
  const LIVE={connecting:"Connecting to the floor…", live:"Live with the floor — changes show up on every phone.",
    polling:"Live with the floor, on a slow connection.", error:"Lost the floor — still trying. Your board is safe on this phone."};
  const st=fpSyncStatus();
  box.innerHTML=`
    ${FPINCOMING?`<div class="note"><b>Somebody shared a board with you.</b> You already have tables plotted on this phone.
      <p style="margin:8px 0 0"><button class="btn" onclick="fpTakeIncoming()">Load theirs</button>
      <button class="btn sec" onclick="fpKeepMine()">Keep mine</button></p></div>`:""}
    <div class="meta">${st==="off"
      ? "This board lives on this phone. Share it and everyone gets the same one."
      : esc(LIVE[st]||"")}</div>
    <p style="margin:10px 0 0">
      <button class="btn" onclick="fpCopyBoard()">Copy tonight's board</button>
    </p>
    <div class="frow" style="margin-top:10px">
      <div class="f"><label for="fpPaste">Or paste a board somebody sent you</label>
      <input type="text" id="fpPaste" placeholder="paste the link here" autocapitalize="off" autocorrect="off" spellcheck="false"></div>
    </div>
    <p style="margin:6px 0 0"><button class="btn sec" onclick="fpPasteBoard()">Load that board</button></p>
    ${FPSHAREMSG?`<p class="sub" style="margin:8px 0 0"><b>${esc(FPSHAREMSG)}</b></p>`:""}
    <details style="margin-top:10px"><summary class="sub">The link itself</summary>
      <input class="fsearch" readonly onclick="this.select()" value="${esc(fpBoardLink())}" style="margin-top:6px"></details>`;
  const el=$("#fpPaste");
  if(el) el.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); fpPasteBoard(); } };
}
/* Publishing to the live service. Sends the whole board every time — the server merges per
   key, so this converges without the app having to track a changelog. Anything that WAS on
   the board and no longer is has to go up as an explicit delete, or the server would keep
   it forever on the strength of an older write. */
function fpSyncPush(){
  if(fpSyncStatus()==="off")return;
  const parties={};
  Object.keys(FPPARTY||{}).forEach(k=>{
    const v=FPPARTY[k]||{}; parties[k]={n:v.n,t:v.t,name:v.name};
  });
  (FPSENT||[]).forEach(k=>{ if(!(k in parties)) parties[k]={del:true}; });
  FPSENT=Object.keys(parties).filter(k=>!parties[k].del);
  const merges={};
  ((typeof MERGEABLE!=="undefined")?MERGEABLE:[]).forEach(m=>{
    merges[m.id]={on:(FPMERGED||[]).indexOf(m.id)>=0};
  });
  const who={};
  Object.keys(FPWHO||{}).forEach(k=>{ who[k]={v:FPWHO[k]}; });
  FloorSync.push({parties:parties, merges:merges, who:who, day:{v:FPDAY||0}});
}
function fpSyncStart(){
  if(typeof FloorSync==="undefined")return;
  if(typeof FLOOR_SYNC==="undefined"||!FLOOR_SYNC.url||!FLOOR_SYNC.key)return;
  const d=new Date(), pad=n=>String(n).padStart(2,"0");
  FloorSync.start({
    url:FLOOR_SYNC.url, key:FLOOR_SYNC.key,
    room:"mos-"+d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()),
    onStatus:function(){ fpShareBox(); },
    onState:function(v){
      /* The first board back after connecting. If the floor has nothing yet and this phone
         does, publish instead of adopting — otherwise joining would wipe a plot somebody
         just put in. After that, the floor is the truth. */
      const remoteEmpty=!v||(!Object.keys(v.parties||{}).length&&!(v.merges||[]).length&&!Object.keys(v.who||{}).length);
      const localHas=Object.keys(FPPARTY||{}).length+(FPMERGED||[]).length+Object.keys(FPWHO||{}).length;
      if(!FPJOINED&&remoteEmpty&&localHas){ FPJOINED=true; fpSyncPush(); return; }
      FPJOINED=true;
      FPPARTY=v.parties||{}; FPMERGED=v.merges||[]; FPWHO=v.who||{};
      if(v.day!=null)FPDAY=v.day;
      /* written straight through, NOT via fpSave() — that would push it back and loop */
      try{ localStorage.setItem("mos-floor-v1", JSON.stringify(
        {m:FPMERGED,p:FPPARTY,w:FPWHO,d:FPDAY==null?null:FPDAY})); }catch(e){}
      renderFloor();
    }
  });
}
function fpPick(t){
  if(!FLOORMAP[FPROOM]||!fpFind(t)){
    const ri=FLOORMAP.findIndex(r=>r.tables.some(x=>x.t===t)||fpMergedBoxes(r).some(g=>g.id===t));
    if(ri>=0)FPROOM=ri;
  }
  FPSEL=(FPSEL===t)?null:t;
  renderFloor();
}
function fpRoom(i){ FPROOM=i; FPSEL=null; renderFloor(); }
function fpToggleSections(){ FPSHOWSEC=!FPSHOWSEC; renderFloor(); }

function openFloor(name){
  const r=(typeof FLOOR!=="undefined"?FLOOR:[]).find(x=>x.n===name); if(!r)return;
  const w=document.createElement("div"); w.className="picwrap"; w.onclick=()=>w.remove();
  w.innerHTML=`<img src="${r.img}" alt="${esc(r.n)} floor plan"><div class="piccap">${esc(r.n)} — tap anywhere to close</div>`;
  document.body.appendChild(w);
}
function openPic(name){
  const src=dishPic(name); if(!src)return;
  let price="";
  for(const items of Object.values(MENU)){
    const hit=items.find(x=>x[0]===name);
    if(hit){price=hit[1];break;}
  }
  $("#lbin").innerHTML=`<img src="${src}" alt="${esc(name)}">
    <div class="lbname">${esc(name)}</div>
    ${price?`<div class="lbprice">${esc(price)}</div>`:""}
    <button onclick="closePic()">Close</button>`;
  $("#lb").classList.add("open");
}
function closePic(){ $("#lb").classList.remove("open"); $("#lbin").innerHTML=""; }
/* menu rows: tap the header to open the description. Only rows long enough to be
   worth hiding get the chevron — short ones just read straight through. */
function mToggle(head){ head.parentElement.classList.toggle("open"); }

/* ---------- THE MO'S BOOK — reader inside How We Work ----------
   Function declarations at TOP LEVEL on purpose: the contents rows and the
   prev/next buttons use inline onclick, so these have to be global. BOOKCH is
   declared with no initializer (an initializer here re-runs after boot and
   wipes the chapter you are on). Chapter HTML comes from mkbook.py — it is
   already escaped and trusted, so it is injected raw, never through esc(). */
var BOOKCH;
function bkShort(t){const m=String(t).match(/^(Day \d+|Start Here|The Get List)/);return m?m[1]:String(t).slice(0,14);}
function openBook(i){
  const w=$("#bkWrap"), m=$("#houseMain");
  if(!w||!m)return;
  m.style.display="none"; w.style.display="block";
  if(i==null){
    BOOKCH=null;
    w.innerHTML=`<div class="sechead"><h2>The Mo's Book</h2><span>everything we teach, in the order we teach it</span></div>
    <div class="card"><div class="cbody">${BOOK.map((c,j)=>`<div class="bkrow" onclick="openBook(${j})"><div class="n">${j===0?"&#9733;":(j===BOOK.length-1?"&#9873;":j)}</div><div class="t">${esc(c.t)}</div></div>`).join("")}</div></div>
    <div class="bknav"><button onclick="closeBook()">&#8592; Back to How We Work</button></div>`;
  } else {
    BOOKCH=i;
    const c=BOOK[i];
    w.innerHTML=`<div class="bknav"><button class="bkc" onclick="openBook()">&#9776; Contents</button><button onclick="closeBook()">Exit the book</button></div>
    <div class="sechead"><h2>${esc(c.t)}</h2><span>chapter ${i+1} of ${BOOK.length}</span></div>
    ${c.plan?`<p class="bkplan">${esc(c.plan)}</p>`:""}
    <div class="bkbody">${c.h}</div>
    <div class="bknav">${i>0?`<button onclick="openBook(${i-1})">&#8592; ${esc(bkShort(BOOK[i-1].t))}</button>`:""}<button class="bkc" onclick="openBook()">&#9776;</button>${i<BOOK.length-1?`<button onclick="openBook(${i+1})">${esc(bkShort(BOOK[i+1].t))} &#8594;</button>`:""}</div>`;
  }
  window.scrollTo(0,0);
}
function closeBook(){
  const w=$("#bkWrap"), m=$("#houseMain");
  if(!w||!m)return;
  BOOKCH=null; w.style.display="none"; w.innerHTML=""; m.style.display="block";
  window.scrollTo(0,0);
}

/* ---------- THE TRAINING SLIDESHOW — reader inside How We Work ----------
   Same rules as the book: TOP-LEVEL declarations because the contents rows and
   the prev/next buttons use inline onclick. DECKI has no initializer so a
   re-run of build() never throws you out of the slide you are on. Slide HTML
   comes from mkslides.py — already escaped, injected raw. */
var DECKI;
function dkDay(i){ /* which day divider owns this slide */
  let d=null; for(let j=0;j<=i;j++) if(DECK[j].k==="day") d=DECK[j];
  return d;
}
function dkTOC(){
  return `<div class="card"><div class="cbody">${DECK.map((c,j)=>c.k==="day"||c.k==="cover"
    ?`<div class="bkrow" onclick="openDeck(${j})"><div class="n">${c.k==="day"?c.n:"&#9733;"}</div><div class="t">${esc(c.t)}</div></div>`
    :"").join("")}</div></div>`;
}
function openDeck(i){
  const w=$("#bkWrap"), m=$("#houseMain");
  if(!w||!m)return;
  m.style.display="none"; w.style.display="block";
  if(i==null){
    DECKI=null;
    w.innerHTML=`<div class="sechead"><h2>The Training Slideshow</h2><span>${DECK.length} slides, one at a time</span></div>
      ${dkTOC()}
      <div class="bknav"><button onclick="closeDeck()">&#8592; Back to How We Work</button>
      <button class="bkc" onclick="openDeck(0)">Start &#8594;</button></div>`;
    window.scrollTo(0,0); return;
  }
  i=Math.max(0,Math.min(DECK.length-1,i));
  DECKI=i;
  const c=DECK[i], day=dkDay(i);
  let inner="";
  if(c.k==="shot"){
    inner=`<div class="dkshot"><div class="lbl">PLACE PICTURE OF</div>
      <div class="big">${esc(c.t)}</div><div class="lbl">HERE</div>
      <p class="why">${esc(c.s)}</p></div>`;
  } else if(c.k==="day"){
    inner=`<div class="dkdisc">${c.n}</div><h2>${esc(c.t)}</h2><p class="dkkick">${esc(c.s)}</p>`;
  } else if(c.k==="cover"){
    inner=`<h2>${esc(c.t)}</h2><p class="dkkick">${esc(c.s)}</p><p class="dkkick">${esc(c.d)}</p>`;
  } else {
    inner=`<h2>${esc(c.t)}</h2>${c.s?`<p class="dkkick">${esc(c.s)}</p>`:""}${c.h.replace("__TOC__",dkTOC())}`;
  }
  const badge = c.k==="day"||c.k==="cover" ? "" :
    (day?`<div class="dkbadge">${esc(day.d)} &middot; ${esc(day.t)}</div>`:"");
  w.innerHTML=`<div class="bknav"><button class="bkc" onclick="openDeck()">&#9776; Contents</button>
      <button onclick="closeDeck()">Exit the slideshow</button></div>
    <div class="dkstage ${c.k}">${badge}${inner}</div>
    <div class="dktrack"><i style="width:${Math.round((i+1)/DECK.length*100)}%"></i></div>
    <div class="dkbar">
      <button onclick="openDeck(${i-1})"${i===0?" disabled":""}>&#8592; Back</button>
      <button class="wide" onclick="openDeck()">&#9776;</button>
      <button onclick="openDeck(${i+1})"${i===DECK.length-1?" disabled":""}>Next &#8594;</button></div>
    <p class="dkcount">Slide ${i+1} of ${DECK.length}</p>`;
  window.scrollTo(0,0);
}
function closeDeck(){
  const w=$("#bkWrap"), m=$("#houseMain");
  if(!w||!m)return;
  DECKI=null; w.style.display="none"; w.innerHTML=""; m.style.display="block";
  window.scrollTo(0,0);
}

/* ---------- BOOT ---------- */
buildNav(); build();
/* Every calculator field is markup like <div class="f"><label>Teams</label><input id=...>.
   The label was never tied to its input, so a screen reader read the boxes as unlabeled
   — you'd hear "edit text, blank" instead of "Teams". Wire them up once at boot rather
   than hand-editing thirty-odd fields; anything added later gets picked up for free.
   Search boxes carry their own aria-label since their placeholder is the only cue. */
(function labelUp(){
  document.querySelectorAll(".f").forEach(f=>{
    const lab=f.querySelector("label"), field=f.querySelector("input,select,textarea");
    if(!lab||!field||lab.getAttribute("for"))return;
    if(!field.id)field.id="f_"+Math.random().toString(36).slice(2,9);
    lab.setAttribute("for",field.id);
  });
  [["#gsearch","Search the whole app"],["#wineQ","Search wine"],["#drinkQ","Search drinks"],
   ["#allergyQ","Search dishes by name"]].forEach(([sel,name])=>{
    const el=$(sel); if(el&&!el.getAttribute("aria-label"))el.setAttribute("aria-label",name);
  });
})();
(function(){var d=document.getElementById("bootMsg"); if(d) d.remove();})();
$("#gsearch").addEventListener("input",e=>renderSearch(e.target.value));
$("#gsearch").addEventListener("keydown",e=>{if(e.key==="Escape"){e.target.value="";renderSearch("");}});
$("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet")closeSheet();});
/* text size — five steps, whole app scales */
let SZI=2; const SZSTEPS=[0.85,0.925,1,1.075,1.15];
const szApply=()=>{document.body.style.zoom=SZSTEPS[SZI];};
$("#szUp").onclick=()=>{SZI=Math.min(SZSTEPS.length-1,SZI+1);szApply();};
$("#szDn").onclick=()=>{SZI=Math.max(0,SZI-1);szApply();};
/* light / dark — same colors, lights off. Resets each open (no storage allowed here). */
$("#darkT").onclick=()=>{
  const on=document.documentElement.classList.toggle("dark");
  $("#darkT").textContent=on?"Light":"Dark";
};
/* ---------- SPANISH MODE ----------
   A post-render pass over text nodes, not a rewrite of every template: the app keeps
   rendering in English exactly as it always has and the words get swapped afterwards.
   Anything missing from ES simply stays English, so a gap can never mangle a price,
   a dish name or a calculation.

   The swap remembers the original on each node it touches (ORIG), because build()
   only repaints the panels — the nav, header and footer are not rebuilt, so without
   this, switching back to English left "Inicio" on the tab bar forever.            */
var LANG;
var ORIG = new WeakMap();

function langWalk(fn,root){
  const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT,{
    acceptNode(n){
      const p=n.parentElement;
      if(!p||/SCRIPT|STYLE|TEXTAREA/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
      return n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
  const hits=[]; let n;
  while(n=w.nextNode()) hits.push(n);
  hits.forEach(fn);
}
function applyLang(root){
  if(LANG!=="es"||typeof ES==="undefined") return;
  langWalk(n=>{
    const raw=n.textContent, k=raw.trim();
    const hit=ES[k];
    if(!hit) return;
    if(!ORIG.has(n)) ORIG.set(n,raw);
    n.textContent=raw.replace(k,hit);
  },root);
  const inputs=(root instanceof Element)
    ? [...(root.tagName==="INPUT"?[root]:[]), ...root.querySelectorAll("input[placeholder]")]
    : [...document.querySelectorAll("input[placeholder]")];
  inputs.forEach(i=>{
    const v=ES[i.placeholder];
    if(v){ if(!i.dataset.enPh) i.dataset.enPh=i.placeholder; i.placeholder=v; }
  });
}
/* THE PROBLEM: applyLang() ran once at the end of build(), but the app repaints small
   regions constantly — a wine filter, the quiz, the floor-plan plotter, the checkout —
   by writing fresh innerHTML that build() never sees. Every one of those came back in
   English mid-shift, which for the cocktails list meant ~400 nodes silently reverting.
   Rather than thread an applyLang() call through 60-odd render sites (and miss the 61st),
   watch the DOM: whenever something new is painted while Spanish is on, translate just
   that subtree. Safe from looping because applyLang only edits text-node data and input
   placeholders — neither is a childList change, so it cannot retrigger this observer. */
var LANGOBS;
function startLangObserver(){
  if(LANGOBS||typeof MutationObserver==="undefined") return;
  let pending=new Set(), queued=false;
  const flush=()=>{ queued=false; const nodes=[...pending]; pending.clear();
    nodes.forEach(n=>{ if(n.isConnected) applyLang(n); }); };
  LANGOBS=new MutationObserver(muts=>{
    if(LANG!=="es") return;
    for(const m of muts) for(const nd of m.addedNodes) if(nd.nodeType===1) pending.add(nd);
    if(pending.size && !queued){ queued=true; Promise.resolve().then(flush); }
  });
  LANGOBS.observe(document.body,{childList:true,subtree:true});
}
function restoreLang(){
  langWalk(n=>{ if(ORIG.has(n)) n.textContent=ORIG.get(n); });
  document.querySelectorAll("input[data-en-ph]").forEach(i=>{ i.placeholder=i.dataset.enPh; });
}
function renderAll(){ build(); }
function setLang(l){
  LANG=l;
  document.documentElement.lang = l==="es" ? "es" : "en";
  const b=$("#langT"); if(b) b.textContent = l==="es" ? "English" : "Espa\u00f1ol";
  if(l==="es"){ renderAll(); }          /* build() repaints panels, then applyLang runs */
  else { restoreLang(); renderAll(); }  /* put the chrome back, then repaint in English */
}
$("#langT").onclick=()=>setLang(LANG==="es"?"en":"es");
$("#totop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
/* the logo is the way home from anywhere */
$("#brandHome").onclick=()=>go("shift");
/* tap the dimmed backdrop or hit Escape to close a photo */
$("#lb").addEventListener("click",e=>{if(e.target.id==="lb")closePic();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePic();});
addEventListener("scroll",()=>{$("#totop").classList.toggle("show",scrollY>700);},{passive:true});

/* ============================================================
   SCHEDULE — the posted week, a roster that flips itself at
   midnight, and every past week since we opened
   ============================================================ */
var SCHED_DAY, SCHED_SEL;
function schedToday(){const t=new Date();return (t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear();}
function schedTime(c){
  c=String(c).trim();
  const m=c.match(/^(\d{1,2})(\d{2})$/);
  if(m)return m[1]+":"+m[2];
  if(/^\d{1,2}$/.test(c))return c+":00";
  return c;
}
function schedCls(c){c=String(c).trim();if(/^off\??$/i.test(c))return "off";if(/^ro\??$/i.test(c))return "ro";return "";}
/* Evan's rules for the CURRENT week (history stays exactly as posted):
   - Jeremiah and Gavin never show on the grid.
   - Anyone whose whole week is blank/OFF availability is off the grid too.
   - A week of RO days still shows — that person asked off, they're still here. */
function schedGone(r){
  if(["jeremiah","gavin"].includes(String(r[0]).trim().toLowerCase()))return true;
  return r.slice(1).every(c=>!String(c).trim()||/^off\??$/i.test(c));
}
function schedSunday(S){const mp=S.days[0][0].split("/");const dt=new Date(S.year,+mp[0]-1,+mp[1]);dt.setDate(dt.getDate()-3);return (dt.getMonth()+1)+"/"+dt.getDate();}
function schedGrid(S,ti,cur){
  const head=`<tr><th class="nm">Name</th>${S.days.map((d,i)=>`<th${i===ti?' class="tdy"':''}><span class="dw">${d[1]}</span>${d[0]}</th>`).join("")}</tr>`;
  const body=S.sections.map(sec=>{
    const name=sec[0],nums=sec[2];
    let rows=cur?sec[1].filter(r=>!schedGone(r)):sec[1];
    /* live music rides with the banquet block — same idea, an event on the floor that
       night. Pulled by date so the right act lands on the right column every week. */
    if(/^bqts?$/i.test(name)&&typeof LIVE_MUSIC!=="undefined"){
      const lm=S.days.map(d=>LIVE_MUSIC[d[0]]||"");
      if(lm.some(Boolean))rows=rows.concat([["Live music",...lm]]);
    }
    /* Fronts numbers = covers already booked when the sheet printed — give them their own labeled row */
    let lab;
    if(nums&&/^fronts$/i.test(name)){
      lab=`<tr class="covrow"><td class="nm">Covers \u00b7 Sun ${schedSunday(S)}</td>${nums.map(n=>`<td>${esc(n)}</td>`).join("")}</tr><tr class="secrow"><td colspan="8">${esc(name)}</td></tr>`;
    }else if(nums){
      lab=`<tr class="secrow"><td class="nm">${esc(name)}</td>${nums.map(n=>`<td>${esc(n)}</td>`).join("")}</tr>`;
    }else{
      lab=`<tr class="secrow"><td colspan="8">${esc(name)}</td></tr>`;
    }
    return lab+rows.map(r=>`<tr><td class="nm">${esc(r[0])}</td>${r.slice(1).map((c,i)=>{
      const cls=[schedCls(c),i===ti?"tdy":""].filter(Boolean).join(" ");
      return `<td${cls?` class="${cls}"`:""}>${esc(c)}</td>`;}).join("")}</tr>`).join("");
  }).join("");
  return `<div class="tw schedwrap"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}
/* the posted sheet abbreviates to fit its columns; the roster has room, so spell it out.
   The GRID still prints whatever the sheet says \u2014 that one stays exact. */
/* what's still to come on the live-music poster. Dates are stored "M/D"; the year comes
   from the posted schedule. Anything already played drops off on its own. */
function liveMusicBlock(){
  if(typeof LIVE_MUSIC==="undefined")return "";
  const DOW=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const yr=SCHEDULE.year||now.getFullYear();
  const rows=Object.entries(LIVE_MUSIC).map(([d,act])=>{
    const [m,dd]=d.split("/").map(Number);
    return {d,act,when:new Date(yr,m-1,dd)};
  }).filter(x=>!isNaN(x.when)&&x.when>=today).sort((a,b)=>a.when-b.when);
  if(!rows.length)return `<div class="sechead"><h2>Live music</h2><span>every Friday &amp; Saturday</span></div>
    <div class="note">Nothing left on the current poster. When the next month goes up, send a photo and it lands here.</div>`;
  return `<div class="sechead"><h2>Live music coming up</h2><span>every Friday &amp; Saturday, in the lounge</span></div>
    ${tbl(["When","Who"],rows.map(r=>[`<b>${DOW[r.when.getDay()]} ${esc(r.d)}</b>`,esc(r.act)]))}`;
}
/* House events — dated, drop off once they pass. */
function eventsBlock(){
  if(typeof EVENTS==="undefined")return "";
  const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const yr=SCHEDULE.year||now.getFullYear();
  const rows=EVENTS.map(e=>{
    const [m,d]=e.d.split("/").map(Number);
    return Object.assign({},e,{at:new Date(yr,m-1,d)});
  }).filter(x=>!isNaN(x.at)&&x.at>=today).sort((a,b)=>a.at-b.at);
  if(!rows.length)return "";
  return `<div class="sechead"><h2>Events coming up</h2><span>${rows.length} on the books</span></div>
    <div class="grid wide">${rows.map(e=>`<div class="card hl">
      <div class="crow"><div class="cname">${esc(e.n)}</div><div class="cprice">${esc(e.d)}</div></div>
      <div class="cbody"><b>${esc(e.when)}</b><br>${esc(e.w)}</div></div>`).join("")}</div>`;
}
/* Meals & Moments — same idea as the music block: only what is still ahead of us. */
function offsiteBlock(){
  if(typeof OFFSITE==="undefined")return "";
  const DOW=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const yr=SCHEDULE.year||now.getFullYear();
  const rows=OFFSITE.map(o=>{
    const [m,dd]=o.d.split("/").map(Number);
    return Object.assign({},o,{when:new Date(yr,m-1,dd)});
  }).filter(x=>!isNaN(x.when)&&x.when>=today).sort((a,b)=>a.when-b.when||a.t.localeCompare(b.t));
  if(!rows.length)return "";
  return `<div class="sechead"><h2>Meals &amp; Moments</h2><span>serving off-site, after their service</span></div>
    ${tbl(["When","Where"],rows.map(r=>[
      `<b>${DOW[r.when.getDay()]} ${esc(r.d)}</b><br><span style="color:var(--dim)">${esc(r.t)}</span>`,
      `<b>${esc(r.where)}</b><br><span style="color:var(--dim)">${esc(r.addr)}</span>`]))}
    <div class="note">${esc(typeof OFFSITE_NOTE!=="undefined"?OFFSITE_NOTE:"")}</div>`;
}
function rosterFor(S,idx,cur){
  /* the posted sheet abbreviates to fit its columns; the roster has room, so spell it
     out. The GRID still prints whatever the sheet says. Declared in here on purpose —
     fillSched() runs at boot, before a top-level const this far down would exist. */
  const ROSTER_LABEL={cktail:"Cocktail",bqts:"Banquets",bqt:"Banquets"};
  return S.sections.map(sec=>{
    const on=(cur?sec[1].filter(r=>!schedGone(r)):sec[1]).map(r=>({n:r[0],c:r[idx+1]}))
      .filter(x=>x.c && x.c!=="?" && !/^off\??$/i.test(x.c) && !/^ro\??$/i.test(x.c));
    if(!on.length)return "";
    const label=ROSTER_LABEL[String(sec[0]).trim().toLowerCase()]||sec[0];
    return `<div class="rosec"><b>${esc(label)}</b><div class="who">${on.map(x=>`${esc(x.n)} <i>${esc(schedTime(x.c))}</i>`).join(" &nbsp;\u00b7&nbsp; ")}</div></div>`;
  }).join("");
}
/* A posted week can straddle New Year -- the Jan days belong to year+1, not SCHEDULE.year.
   Comparing on the bare year sent "today" off the week for the whole first week of January.
   For any same-year week this returns exactly what the old check did. */
function schedIsDay(w,dayStr,now){
  const parts=String(dayStr).split("/").map(Number), m=parts[0], dd=parts[1];
  const sm=Number(String(w.days[0][0]).split("/")[0]);
  const yr=(w.year||now.getFullYear())+(m<sm?1:0);
  return now.getFullYear()===yr && (now.getMonth()+1)===m && now.getDate()===dd;
}
function fillSched(){
  const p=$("#p-sched"); if(!p)return;
  SCHED_DAY=schedToday();
  if(SCHED_SEL==null||!SCHEDULE_HISTORY[SCHED_SEL])SCHED_SEL=0;
  const t=new Date(), todayStr=(t.getMonth()+1)+"/"+t.getDate();
  const idx=SCHEDULE.days.findIndex(d=>schedIsDay(SCHEDULE,d[0],t));
  const DAYFULL={We:"Wednesday",Th:"Thursday",Fr:"Friday",Sa:"Saturday",Su:"Sunday",Mo:"Monday",Tu:"Tuesday"};
  let roster;
  if(idx>=0){
    const d=SCHEDULE.days[idx];
    const blocks=rosterFor(SCHEDULE,idx,true);
    roster=`<div class="sechead"><h2>Today \u2014 ${DAYFULL[d[1]]} ${d[0]}</h2><span>flips itself at midnight</span></div>
      ${blocks||'<div class="note">Nobody on the sheet for today.</div>'}`;
  }else{
    /* Today falls outside the posted week, and that happens in BOTH directions: a new sheet
       goes up before its week starts, and an old one stays up after its week ends. Somebody
       is working tonight either way, so find whichever week actually covers today and show
       that roster instead of nothing. */
    let src=null, si=-1;
    for(let i=0;i<SCHEDULE_HISTORY.length;i++){
      const w=SCHEDULE_HISTORY[i];
      const j=w.days.findIndex(d=>schedIsDay(w,d[0],t));
      if(j>=0){src=w;si=j;break;}
    }
    const sp=String(SCHEDULE.start||"").split("-").map(Number);
    const ahead=sp.length===3 && new Date(sp[0],sp[1]-1,sp[2]) > new Date(t.getFullYear(),t.getMonth(),t.getDate());
    const why=ahead
      ? `<b>${esc(SCHEDULE.week)} is already posted below \u2014 it starts ${esc(SCHEDULE.days[0][0])}.</b>`
      : `<b>Today (${todayStr}) isn't on the posted week.</b> This grid covers the ${esc(SCHEDULE.week)}. When the new sheet goes up, send a photo \u2014 it slides in here and this one drops into History below.`;
    if(src){
      const d=src.days[si], blocks=rosterFor(src,si,true);
      roster=`<div class="sechead"><h2>Today \u2014 ${DAYFULL[d[1]]} ${d[0]}</h2><span>from the ${esc(src.week)} sheet</span></div>
        ${blocks||'<div class="note">Nobody on the sheet for today.</div>'}
        <div class="note">${why}</div>`;
    }else{
      roster=`<div class="sechead"><h2>Today</h2><span>daily roster</span></div>
        <div class="note">${why}</div>`;
    }
  }
  p.innerHTML=`${roster}
    <div class="sechead"><h2>${esc(SCHEDULE.week)}</h2><span>exactly as posted</span></div>
    ${schedGrid(SCHEDULE,idx,true)}
    ${eventsBlock()}
    ${liveMusicBlock()}
    ${offsiteBlock()}
    <div class="sechead"><h2>Schedule history</h2><span>${SCHEDULE_HISTORY.length} weeks \u2014 every sheet since we opened</span></div>
    <div class="note">These are the sheets <b>as posted</b>. Trades, call-offs, cuts and sick days happened after \u2014 so a history week shows the plan, not always who actually worked.</div>
    <div class="frow" style="margin-top:8px"><div class="f"><label>Pick a week</label><select id="schedWeek">${SCHEDULE_HISTORY.map((w,i)=>`<option value="${i}"${i===SCHED_SEL?" selected":""}>${esc(w.week)}</option>`).join("")}</select></div></div>
    <div id="schedHist"></div>`;
  renderSchedHist();
  $("#schedWeek").onchange=e=>{SCHED_SEL=+e.target.value;renderSchedHist();};
}
function renderSchedHist(day){
  const w=SCHEDULE_HISTORY[SCHED_SEL], el=$("#schedHist"); if(!w||!el)return;
  const chips=`<div class="filters" style="margin:8px 0 10px">${w.days.map((d,i)=>`<button data-d="${i}"${day===i?' class="on"':''}>${d[1]} ${d[0]}</button>`).join("")}</div>`;
  el.innerHTML=`${chips}
    ${day!=null?(rosterFor(w,day)||'<div class="note">Nobody readable on the sheet that day.</div>'):''}
    ${schedGrid(w,day!=null?day:-1)}
    ${w.note?`<div class="note" style="margin-top:8px">${esc(w.note)}</div>`:""}`;
  el.querySelector(".filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    const d2=+b.dataset.d; renderSchedHist(d2===day?null:d2);};
}
setInterval(()=>{ if(SCHED_DAY && schedToday()!==SCHED_DAY) fillSched(); },60000);
