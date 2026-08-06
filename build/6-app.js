
/* ============================================================
   APP — team edition
   ============================================================ */
const $ = s=>document.querySelector(s);
const esc = s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $d=n=>"$"+Math.round(n).toLocaleString();

const TABS = [
  ["shift","Home"],["sched","Schedule"],["wine","Wine"],["cocktails","Drinks & Garnish"],["menu","Food Menu"],
  ["specials","Specials & Soups"],
  ["allergens","Allergens"],["bar","Spirits & Beer"],["study","Study & Quiz"],["ops","Money"],
  ["house","How We Work"],["vocab","Vocabulary"]
];
const ICONS={
 home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
 wine:'<svg viewBox="0 0 24 24"><path d="M8 3h8l-.8 6.5a3.5 3.5 0 01-6.4 0z"/><path d="M12 13v7M8 21h8"/></svg>',
 drinks:'<svg viewBox="0 0 24 24"><path d="M4 4h16l-8 9z"/><path d="M12 13v7M8 21h8"/></svg>',
 money:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.2c0 3 6 1.6 6 4.6 0 1.2-1.3 2.2-3 2.2s-3-1.1-3-2.5"/></svg>',
 more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 5.9L12 16.4 6.7 19.3l1.2-5.9L3.4 9.3l6-.7z"/></svg>'
};
const BOTTOM=[["shift","Home","home"],["wine","Wine","wine"],["cocktails","Drinks","drinks"],["specials","Specials","star"],["ops","Money","money"],["__more","More","more"]];

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
      <button class="item" id="shPrint">Print this tab</button>
    </div>`;
  $("#sheet").classList.add("open");
  $("#sheetin").querySelectorAll("button.item[data-t]").forEach(b=>b.onclick=()=>go(b.dataset.t));
  $("#shSzDn").onclick=()=>$("#szDn").click();
  $("#shSzUp").onclick=()=>$("#szUp").click();
  $("#shDark").onclick=()=>{$("#darkT").click();closeSheet();};
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
    <div class="tags"><span class="tag ${w.t.toLowerCase()}">${w.t}</span><span class="tag">${(WINE_CATS.find(c=>c[0]===w.c)||[,w.c])[1]}</span></div>
  </div>`;
}
let wineFilter={cat:"all",tier:"all",q:"",price:"all",color:"all"};
function renderWines(){
  const q=wineFilter.q.toLowerCase();
  let [lo,hi]=[0,1e9];
  if(wineFilter.price!=="all"){const p=wineFilter.price.split("-");lo=+p[0];hi=+p[1];}
  const list=WINES.filter(w=>
    (wineFilter.cat==="all"||w.c===wineFilter.cat)&&
    (wineFilter.tier==="all"||w.t===wineFilter.tier)&&
    (wineFilter.color==="all"||wineColor(w)===wineFilter.color)&&
    (wineFilter.price==="all"||(winePrice(w)>=lo&&winePrice(w)<=hi))&&
    (!q||(w.n+w.r+w.f+w.pair+w.pitch).toLowerCase().includes(q)));
  $("#wineCount").textContent = list.length+" match"+(list.length===1?"":"es");
  $("#wineGrid").innerHTML = list.length?list.map(wineCard).join(""):'<div class="empty">Nothing in that lane. Widen the price or color.</div>';
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
  return `<div class="card">
    <div class="crow"><div><div class="cname">${esc(c.n)}</div><div class="csub">${esc(c.base)}${c.glass&&c.glass!=="—"?" &middot; "+esc(c.glass):""}</div></div><div class="cprice">${esc(c.p)}</div></div>
    <div class="cbody"><b>Build:</b> ${esc(c.build)}<br><b>Tastes like:</b> ${esc(c.desc)}</div>
    ${c.garnish&&c.garnish!=="—"?`<div class="garnish"><b>Garnish:</b> ${esc(c.garnish)}</div>`:""}
    ${c.note?`<div class="tags"><span class="tag ${c.grp==="verify"?"warn":""}">${esc(c.note)}</span></div>`:""}
  </div>`;
}
let drinkFilter={grp:"all",q:""};
function renderDrinks(){
  const q=drinkFilter.q.toLowerCase();
  const list=COCKTAILS.filter(c=>(drinkFilter.grp==="all"||c.grp===drinkFilter.grp)&&(!q||(c.n+c.build+c.garnish+c.desc+c.base).toLowerCase().includes(q)));
  $("#drinkGrid").innerHTML=list.length?list.map(drinkCard).join(""):'<div class="empty">No drinks match.</div>';
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
function startQuiz(subset){
  const src = subset && subset.length ? subset : MC.map((_,i)=>i);
  quiz.order=[...src].sort(()=>Math.random()-.5);
  quiz.opts=quiz.order.map(i=>MC[i].o.map((txt,k)=>({txt,ok:k===0})).sort(()=>Math.random()-.5));
  quiz.i=0;quiz.score=0;quiz.answered=0;quiz.missed=[];quiz.topics={};
  renderQuiz();
}
function renderQuiz(){
  const box=$("#quizBox");
  if(quiz.i>=quiz.order.length){
    const pct=quiz.order.length?Math.round(quiz.score/quiz.order.length*100):0;
    const topics=Object.entries(quiz.topics).map(([t,v])=>`<span class="tag${v.ok===v.n?" good":v.ok/v.n<.7?" warn":""}" style="font-size:12px;padding:4px 9px">${t}: ${v.ok}/${v.n}</span>`).join(" ");
    box.innerHTML=`<div class="q" style="text-align:center;padding:28px">
      <div style="font-size:40px;font-weight:800;color:${pct>=90?"#1E6B3A":pct>=70?"var(--gold2)":"#A33C35"}">${pct}%</div>
      <div style="margin:6px 0 12px;color:var(--dim)">${quiz.score} of ${quiz.order.length} correct</div>
      <div class="tags" style="justify-content:center;margin-bottom:16px">${topics}</div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="btn" onclick="startQuiz()">New quiz</button>
        ${quiz.missed.length?`<button class="btn sec" onclick="startQuiz(quiz.missed.slice())">Review the ${quiz.missed.length} missed</button>`:""}
      </div></div>`;
    $("#quizScore").innerHTML=`<b>${pct}%</b> final`;
    return;
  }
  const qi=quiz.order[quiz.i], m=MC[qi], opts=quiz.opts[quiz.i];
  $("#quizScore").innerHTML=`<b>${quiz.score}</b> / ${quiz.answered} &nbsp;·&nbsp; question ${quiz.i+1} of ${quiz.order.length}`;
  box.innerHTML=`<div class="q">
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
      <span style="color:${ok?'#1E6B3A':'#A33C35'};font-weight:650;font-size:13.5px">${ok?'Correct':'Not quite'}</span>
      <button class="btn sec" id="qnext">${quiz.i+1>=quiz.order.length?"Finish":"Next question"}</button></div>`;
    $("#qnext").onclick=()=>{quiz.i++;renderQuiz();};
    $("#quizScore").innerHTML=`<b>${quiz.score}</b> / ${quiz.answered} &nbsp;·&nbsp; question ${quiz.i+1} of ${quiz.order.length}`;
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
  const sales=+$("#scSales").value||0;
  const realTips=+$("#scTips").value||0;
  const bqOn=$("#scBq").value==="yes";
  const polisher=+$("#scPolisher").value||0;
  const cash=+$("#scCash").value||0;

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
  <div class="note" style="max-width:440px"><b>Rule of thumb:</b> a team keeps about 18.3% of its net sales — roughly $${Math.round(sales*.1828).toLocaleString()} on this night, call it 9 cents per sales dollar for each of you. Sell the bottle.</div>`;
}

/* ---------- INCOME PREDICTOR — should I take the cut? ---------- */
function ipTake(covers,chk,teams,nCk,pol){
  const slices = teams + CKTAIL_WEIGHT*nCk;          // each cocktailer takes ~0.7 of a team's slice
  const teamSales = covers*chk/slices;
  const pool = teamSales*SALES.guestTipRate*(1-SALES.withheldRate);
  const tipout = SALES.tipouts.reduce((a,t)=>a+Math.ceil(t[1]*teamSales),0)+pol;
  const earned = Math.max(0,Math.floor(pool-tipout));
  return {take:Math.ceil(earned/2),earned,teamSales:Math.round(teamSales),tipout,share:Math.round(100/slices)};
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
/* staffing bands v1 — anchored to real nights (3 teams ~ $4.1k, 4 teams + banquet ~ $8.9k).
   Evan tunes these as he tells us what's acceptable on each kind of night. */
function staffLadder(net){
  return {
    teams: Math.min(7,Math.max(2,Math.ceil(net/SALES.teamBase))),
    cktail: net<6000?1:net<12000?2:3,
    busser: net<3000?1:net<8000?2:3,
    expo: net<4000?0:net<8000?1:2,
    polisher: net>=8000?1:0
  };
}
function ipPrefill(){
  const di=+$("#ipDay").value||0;
  const inf=schedDayInfo(di);
  if(inf.covers!=null)$("#ipBooks").value=inf.covers;
  const t=Math.min(inf.cnt.fronts,inf.cnt.backs);
  if(t>0)$("#ipTeams").value=t;
  $("#ipCk").value=String(Math.min(3,inf.cnt.cktail));
  if($("#exBus"))$("#exBus").value=inf.cnt.busser;
  if($("#exExpo"))$("#exExpo").value=inf.cnt.expo;
  if($("#exBar"))$("#exBar").value=inf.cnt.bar!=null?inf.cnt.bar:2;
  window.__ipSugg="";
}
function calcIP(){
  const IP_WD={We:"wed",Th:"thu",Fr:"fri",Sa:"sat",Su:"sun",Mo:"mon",Tu:"tue"};
  const di=+$("#ipDay").value||0;
  const d=SCHEDULE.days[di]||SCHEDULE.days[0];
  const dp=DAYPRE[IP_WD[d[1]]]||DAYPRE.sun;
  const teams=Math.max(1,Math.round(+$("#ipTeams").value||dp.teams));
  const nCk=Math.max(0,+$("#ipCk").value||0);
  const books=+$("#ipBooks").value||0;
  const walk=+$("#ipWalk").value||0;
  const chk=+$("#ipCheck").value||CHECK_CAL;
  const pol=+$("#ipPol").value||0;
  const mult=+$("#ipOcc").value||1;
  const covers=books+walk;
  const inf=schedDayInfo(di);

  // walk-in suggestion rules, by day
  const sugg = dp.wkRule==="half" ? (books>0?Math.round(books*.55):30) : dp.wkRule;
  const suggHTML = walk===0
    ? `Walk-in rule for ${dp.label}${dp.wkRule==="half"?" (60 books &rarr; 30–35 walk-ins)":""}: <b>~${sugg} walk-ins</b> <button class="textbtn" id="ipUse" data-s="${sugg}" style="margin-left:6px">use it</button>`
    : `Walk-in guess in. It is a gut number — nudge it for weather, events, or the time of year.`;
  if(window.__ipSugg!==suggHTML){window.__ipSugg=suggHTML;$("#ipSugg").innerHTML=suggHTML;}

  /* who's on that day — pick your night knowing who you'd work with */
  $("#ipWho").innerHTML=`
    <div class="sechead"><h2>Who's on ${dp.label} ${d[0]}</h2><span>from the posted schedule</span></div>
    ${rosterFor(SCHEDULE,di,true)||'<div class="note">Nobody on the sheet for that day.</div>'}`;

  if(!covers){$("#ipOut").innerHTML=`<div class="empty" style="padding:14px">Type what's on the books and this calls the whole night — your pocket, the restaurant, and the staffing.</div>`;return;}

  const mid=ipTake(covers,chk,teams,nCk,pol);
  const loR=ipTake(Math.round(covers*.85),chk,teams,nCk,pol);
  const hiR=ipTake(Math.round(covers*1.15),chk,teams,nCk,pol);
  const each=Math.round(mid.earned/2), loE=Math.round(loR.earned/2), hiE=Math.round(hiR.earned/2);
  const verdict = loE>=200
    ? {cls:"gold",head:"WORK IT",body:`Even the slow end clears $200 each.`}
    : hiE<200
    ? {cls:"warn",head:"CUT TERRITORY",body:`Even a hot night stays under $200 each. If the cut is offered, the math says take it.`}
    : {cls:"",head:"COIN FLIP",body:`Straddles the $200 line — walk-ins decide this one. Watch the book by late afternoon.`};

  const net=Math.round(covers*chk*mult);
  const tax=Math.round(net*SALES.taxRate);
  const lad=staffLadder(net);
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
    <div class="kpi"><div class="k">People coming in</div><div class="v">${covers}</div><div class="s">${books} books + ${walk||0} walk-ins</div></div>
    <div class="kpi"><div class="k">Restaurant net (est.)</div><div class="v">${$d(net)}</div><div class="s">${covers} covers x $${chk}${mult!==1?" x "+mult.toFixed(2):""} · tax ~${$d(tax)}</div></div>
    <div class="kpi"><div class="k">Your team's sales</div><div class="v">${$d(mid.teamSales)}</div><div class="s">~${mid.share}% of the floor · ${teams} teams${nCk?" + "+nCk+" cocktailer"+(nCk>1?"s":""):""}</div></div>
    <div class="kpi"><div class="k">Team earned</div><div class="v">${$d(mid.earned)}</div><div class="s">after 2% withheld + $${mid.tipout} tip-out</div></div>
    <div class="kpi" style="border-color:var(--gold)"><div class="k">The two of you</div><div class="v" style="font-size:16.5px;line-height:1.5">Front ${$d(mid.earned-mid.take)}<br>Back ${$d(mid.take)}</div><div class="s">two-man team — back takes the greater dollar</div></div>
  </div>
  <div class="sechead" style="margin-top:16px"><h2>Staffing this night</h2><span>model vs the posted schedule — for the manager's cut calls</span></div>
  ${tbl(["Position","Model says",`Scheduled ${d[1]} ${d[0]}`,"Call"],[
    ["<b>Teams (front + back)</b>",String(lad.teams),String(schedTeams||0),callFor(lad.teams,schedTeams||0)],
    ["<b>Cocktailers</b>",String(lad.cktail),String(inf.cnt.cktail),callFor(lad.cktail,inf.cnt.cktail)],
    ["<b>Bussers</b>",String(lad.busser),String(inf.cnt.busser),callFor(lad.busser,inf.cnt.busser)],
    ["<b>Expo / food run</b>",String(lad.expo),String(inf.cnt.expo),callFor(lad.expo,inf.cnt.expo)],
    ["<b>Polisher</b>",String(lad.polisher),"—",callFor(lad.polisher,null)]])}
  <p class="sub" style="margin:8px 0 0;color:var(--dim2);font-size:12px">Skip big banquets in this net — a banquet brings its own staffing. First pass at the bands, anchored to real nights (3 teams &asymp; $4.1k, 4 teams + a banquet &asymp; $8.9k, over $10k is all hands). Say what's acceptable on each kind of night and these bands get tuned.</p>
  <p class="sub" style="margin:8px 0 0;color:var(--dim2);font-size:12px">Cut math is calibrated against real Toast checkouts — lands within a few dollars of actual nights. A model, not a promise.</p>`;
}

/* ---------- BANQUET CHECKOUT — the second envelope, same math ---------- */
function calcBQC(){
  const sales=+$("#bqcSales").value||0;
  const tips=+$("#bqcTips").value||0;
  const bq3=$("#bqcThree").value==="yes";
  const r=pipeMath(sales,tips,SALES.banquetGratRate,bq3,0,0);
  if(!r){$("#bqcOut").innerHTML='<div class="empty" style="padding:14px">Type the banquet sheet\u2019s net sales and this prints the second envelope.</div>';return;}
  const rs=+$("#scSales").value||0, rt=+$("#scTips").value||0;
  const reg=pipeMath(rs,rt,SALES.guestTipRate,$("#scBq").value==="yes",+$("#scPolisher").value||0,+$("#scCash").value||0);
  $("#bqcOut").innerHTML=`<div class="receipt">
    <div class="rhead">MO'S — BANQUET CHECKOUT</div>
    <div class="rsub">${tips>0?"real gratuity from the banquet sheet":"gratuity estimated at the house 23% until you type it"}</div>
    <div class="rrow"><span>Banquet net sales</span><b>${$d(sales)}</b></div>
    <div class="rrow"><span>Gratuity${tips>0?"":" (est.)"}</span><b>${$d(r.credTips)}</b></div>
    <div class="rrow neg"><span>Tips withheld (2%)</span><span>&minus;${$d(r.withheld)}</span></div>
    <div class="rrow sum"><span>Envelope pool</span><b>${$d(r.pool)}</b></div>
    ${r.lines.map(l=>`<div class="rrow neg"><span>Tip out — ${esc(l[0])}</span><span>&minus;$${l[1].toLocaleString()}</span></div>`).join("")}
    <div class="rrow neg sum"><span>Total tip out</span><span>&minus;$${r.tipOut.toLocaleString()}</span></div>
    <div class="rrow sum big"><span>EARNED (banquet envelope)</span><span>${$d(r.earned)}</span></div>
    <div class="rrow big"><span>FRONT</span><span>${$d(r.front)}</span></div>
    <div class="rrow big"><span>BACK</span><span>${$d(r.back)}</span></div>
    <div class="rfoot">same rules as the regular envelope &middot; split per envelope, back takes the greater dollar</div>
  </div>
  ${reg?`<div class="note gold" style="max-width:440px"><b>Both envelopes tonight:</b> regular ${$d(reg.earned)} + banquet ${$d(r.earned)} = <b>${$d(reg.earned+r.earned)}</b> team total. Your pockets: front ${$d(reg.front+r.front)}, back ${$d(reg.back+r.back)}.</div>`
       :`<div class="note" style="max-width:440px">Fill the regular Sales Calculator above too and this shows the full two-envelope night total.</div>`}`;
}

/* ---------- BANQUET MINI-TOOL ---------- */
function calcBq(){
  const heads=+$("#bqHeads").value||0;
  const perHead=+$("#bqPerHead").value||0;
  const min=+$("#bqMin").value||0;
  const gratPct=(+$("#bqGrat").value||0)/100;
  const byHeads=heads*perHead;
  const net=Math.round(Math.max(byHeads,min));
  const grat=Math.round(net*gratPct);
  const minWins=min>0&&min>byHeads;
  $("#bqOut").innerHTML=`<div class="kpis">
    <div class="kpi"><div class="k">Event net</div><div class="v">${$d(net)}</div><div class="s">${minWins?"the minimum wins over "+$d(byHeads)+" by heads":heads+" heads x $"+perHead+(min>0?" (beats the "+$d(min)+" minimum)":"")}</div></div>
    <div class="kpi"><div class="k">Auto-grat</div><div class="v">${$d(grat)}</div><div class="s">${(gratPct*100).toFixed(0)}% — VERIFY with Lillian</div></div>
    <div class="kpi"><div class="k">Grat split if one team runs it</div><div class="v">Front ${$d(Math.floor(grat/2))} · Back ${$d(Math.ceil(grat/2))}</div><div class="s">before tip-out, back takes the greater dollar</div></div>
  </div>`;
}

/* ---------- GLOBAL SEARCH ---------- */
/* Ask it questions: words match in any order, filler words are ignored,
   common floor terms map to menu vocabulary, and small typos still hit. */
const SEARCH_STOP=new Set("what whats is in the a an on of for to do does did we have has had any with and or are it its how much many me my show tell about can could i you your price prices cost costs".split(" "));
const SEARCH_SYN={mocktail:"non-alcoholic",virgin:"non-alcoholic",children:"kids",child:"kids",app:"starters",apps:"starters",appetizer:"starters",appetizers:"starters",sparkling:"champagne",bubbly:"champagne",bubbles:"champagne",veggie:"vegetable",veggies:"vegetable",glutenfree:"gf",sweets:"desserts",bday:"celebration",birthday:"celebration",anniversary:"celebration"};
function nearWord(a,b){
  if(a===b)return true;
  const la=a.length,lb=b.length;
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
  const matches=fields=>{
    const hay=fields.filter(Boolean).join(" ").toLowerCase().replace(/[’']/g,"");
    let words=null;
    const getWords=()=>words||(words=hay.split(/[^a-z0-9$&%]+/).filter(Boolean));
    return toks.every(t=>tokenIn(hay,getWords,t));
  };
  const hits=[];
  const add=(w,t,d,tab)=>{
    const name=(w+" "+t).toLowerCase();
    hits.push({w,t,d,tab,score:toks.filter(x=>name.includes(x)).length});
  };
  WINES.forEach(x=>{if(matches([x.n,x.r,x.f,x.pair,x.pitch,x.p]))add("Wine",x.n+" — "+x.p,x.pitch,"wine");});
  COCKTAILS.forEach(x=>{if(matches([x.n,x.build,x.garnish,x.desc,x.p,x.grp]))add("Cocktail",x.n+" — "+x.p,"Garnish: "+x.garnish+" · "+x.build,"cocktails");});
  Object.entries(MENU).forEach(([sec,items])=>items.forEach(i=>{if(matches([sec,i[0],i[1],i[2],i[3]]))add(sec,i[0]+" — "+i[1],i[2],"menu");}));
  ALLERGENS.forEach(r=>{if(matches([r[0],r[2].join(" "),r[3]]))add("Allergens",r[0],"Contains: "+(r[2].join(", ")||"none listed")+". "+r[3],"allergens");});
  Object.entries(SPIRITS).forEach(([sec,rows])=>rows.forEach(r=>{if(matches([sec,r[0],r[2]]))add(sec,r[0]+" — "+r[1],r[2],"bar");}));
  BEER.forEach(b=>{if(matches([b[0],b[2],b[3]]))add("Beer",b[0]+" — "+b[1],b[2]+". "+b[3],"bar");});
  OPEN.forEach(o=>{if(matches([o[0],o[1]]))add("Test answer",o[0],o[1],"study");});
  SPECIALS_ON.forEach(s=>{if(matches([s[0],s[2]]))add("Ongoing special",s[0]+" — "+s[1],s[2],"specials");});
  SPECIALS_ROTATION.forEach(s=>{if(matches([s[0],s[2]]))add("Rotating special",s[0],s[2],"specials");});
  SPECIALS_PAST.forEach(s=>{if(matches([s[0],s[2]]))add("Past special",s[0]+" ("+s[3]+")",s[2],"specials");});
  SOTD.forEach(s=>{if(matches([s[1],s[2]]))add("Soup of the day",s[1]+" — first seen "+s[0],s[2],"specials");});
  SOUPS_STANDING.forEach(s=>{if(matches([s[0],s[2]]))add("Standing soup",s[0]+" — "+s[1],s[2],"specials");});
  OFFMENU.forEach(s=>{if(matches([s[0],s[2]]))add("Off-menu",s[0]+" — "+s[1],s[2],"specials");});
  VOCAB.forEach(g=>g[1].forEach(r=>{if(matches([g[0],r[0],r[1]]))add("Vocabulary",r[0],r[1],"vocab");}));
  HANDBOOK.forEach(h=>{const txt=h[2].replace(/<[^>]+>/g," ");
    if(matches([h[0],h[1],txt]))add("Handbook",h[0],txt.trim().slice(0,140)+"…","house");});
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
      <button data-qa="sched|"><div class="t">Schedule</div><div class="s">Who works today + the whole posted week</div></button>
      <button data-qa="cocktails|#sec-garnish"><div class="t">Garnish check</div><div class="s">Every drink's garnish and glass, one table</div></button>
      <button data-qa="allergens|#sec-allergy"><div class="t">Allergy check</div><div class="s">Tap an allergen — see only what has it</div></button>
      <button data-qa="wine|#sec-bottles"><div class="t">Wine by budget</div><div class="s">Bottles at their price, pitch included</div></button>
      <button data-qa="wine|#sec-pair"><div class="t">Pair their order</div><div class="s">They ordered X — here's what you say</div></button>
      <button data-qa="ops|#sec-checkout"><div class="t">Sales Calculator</div><div class="s">Sales in — your front/back split out</div></button>
      <button data-qa="ops|#sec-income"><div class="t">Night Forecast</div><div class="s">Who's on, the covers, and the cut — called early</div></button>
      <button data-qa="study|#sec-quiz"><div class="t">Take a quiz</div><div class="s">Fresh shuffle every time + the real 30</div></button>
      <button data-qa="menu|"><div class="t">Food menu</div><div class="s">Prices, builds, temps, the A5 pitch</div></button>
      <button data-qa="__search|"><div class="t">Search everything</div><div class="s">Wine, garnish, allergen, price</div></button>
    </div>

    <div class="sechead"><h2>Before you walk up</h2><span>the 60-second version</span></div>
    <div class="kpis" style="margin-bottom:16px">
      <div class="kpi"><div class="k">Soups · salads · desserts</div><div class="v">5–7 min</div><div class="s">10 minutes max</div></div>
      <div class="kpi"><div class="k">Entrees</div><div class="v">22–27 min</div><div class="s">course it, do not stack it</div></div>
      <div class="kpi"><div class="k">Entree checkback</div><div class="v">2–5 min</div><div class="s">after entrees hit the table</div></div>
      <div class="kpi"><div class="k">Manager alert</div><div class="v">$250+</div><div class="s">wine bottle · big Bordeaux glasses</div></div>
    </div>
    <div class="note gold"><b>Always hit:</b> first time, celebration, wine list, allergies, features, soup, oysters, cut specials, 86'd items, and a wine or app suggestion.</div>
    <div class="grid wide" style="margin-top:14px">
      <div class="card"><div class="cname">Two drink calls that always work</div>
        <div class="cbody">${DRINK_PITCH.slice(0,4).map(p=>`<div style="padding:4px 0"><b>${esc(p[0])}:</b> ${esc(p[1])}</div>`).join("")}</div></div>
      <div class="card"><div class="cname">The wine move</div>
        <div class="cbody">Ask whether they are leaning <b>lighter and smoother</b> or <b>bigger and richer</b>, then give two confident choices. Never open the list and go quiet.</div>
        <div class="pitch">&ldquo;For four glasses, a bottle is usually the better value.&rdquo;</div></div>
      <div class="card"><div class="cname">Allergy protocol, in order</div>
        <div class="cbody">${PROTOCOL.map((p,i)=>`<div style="padding:3px 0"><b>${i+1}.</b> ${esc(p)}</div>`).join("")}</div></div>
      <div class="card"><div class="cname">Three answers people miss</div>
        <div class="cbody"><b>Risotto is not vegetarian</b> — chicken stock and prosciutto.<br><b>Au gratin bacon cannot come out</b> — mixed in every morning.<br><b>Well-done filets get butterflied.</b></div></div>
    </div>

    <div class="sechead"><h2>Steps of service</h2><span>front server flow, top to bottom</span></div>
    <ol class="steps">${FLOW.map(([t,items])=>`<li><b>${esc(t)}</b><ul>${items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></li>`).join("")}</ol>

    <div class="sechead"><h2>Training anchors</h2></div>
    ${tbl(["","Anchor"],ANCHORS.map(a=>[`<b>${esc(a[0])}</b>`,esc(a[1])]))}`;

  /* ---------- WINE ---------- */
  $("#p-wine").innerHTML=`
    <div class="sechead" id="sec-bottles"><h2>Every bottle and pour</h2><span id="wineCount"></span></div>
    <p class="lede">Filter by price and color when a guest gives you a budget. Good / Better / Best is a selling lane, not a judgment of quality.</p>
    <input class="fsearch" id="wineQ" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Search wine, region, flavor, or dish...">
    <div class="filters" id="wineBudget">${BUDGETS.map(b=>`<button data-p="${b[0]}"${b[0]==="all"?' class="on"':''}>${b[1]}</button>`).join("")}</div>
    <div class="filters" id="wineColor">${[["all","Red + White"],["red","Red"],["white","White / Rose"],["bubbles","Bubbles"]].map(c=>`<button data-c="${c[0]}"${c[0]==="all"?' class="on"':''}>${c[1]}</button>`).join("")}</div>
    <div class="filters" id="wineCats">${WINE_CATS.map(c=>`<button data-c="${c[0]}"${c[0]==="all"?' class="on"':''}>${c[1]}</button>`).join("")}</div>
    <div class="filters" id="wineTiers">${["all","Good","Better","Best"].map(t=>`<button data-t="${t}"${t==="all"?' class="on"':''}>${t==="all"?"All tiers":t}</button>`).join("")}</div>
    <div class="grid wide" id="wineGrid"></div>

    <div class="sechead" id="sec-pair"><h2>Pairing finder</h2><span>pick what they ordered</span></div>
    <div class="tool">
      <div class="frow"><div class="f" style="flex:1 1 320px"><label>They ordered</label>
        <select id="pairSel" style="width:100%">${PAIRINGS.map((p,i)=>`<option value="${i}">${esc(p.d)}</option>`).join("")}</select></div></div>
      <div class="out" id="pairOut"></div>
    </div>

    <div class="sechead"><h2>${WOTW.title}</h2><span>the current feature</span></div>
    <div class="grid wide">${[WOTW.a,WOTW.b].map(w=>`<div class="card hl">
      <div class="crow"><div><div class="cname">${esc(w.n)}</div><div class="csub">${w.tag}</div></div><div class="cprice">${w.p}</div></div>
      <div class="cbody"><b>What it is:</b> ${esc(w.what)}<br><b>Flavor:</b> ${esc(w.flavor)}<br><b>Structure:</b> ${esc(w.structure)}<br><b>Why the price:</b> ${esc(w.why)}<br><b>Pair with:</b> ${esc(w.pair)}</div>
      <div class="pitch">&ldquo;${esc(w.pitch)}&rdquo;</div></div>`).join("")}</div>
    <div style="margin-top:12px">${tbl(["Guest wants","Recommend","Why"],WOTW.contrast.map(c=>[esc(c[0]),`<b>${esc(c[1])}</b>`,`<span style="color:var(--dim)">${esc(c[2])}</span>`]))}</div>

    <div class="sechead"><h2>Fast guest answers</h2><span>when they ask you to pick</span></div>
    ${tbl(["Question","Answer","Why"],FASTANSWERS.map(f=>[esc(f[0]),`<b>${esc(f[1])}</b>`,`<span style="color:var(--dim)">${esc(f[2])}</span>`]))}

    <div class="sechead"><h2>Region footnotes for the table</h2></div>
    ${tbl(["Region","Why it matters","Say this"],REGIONS.map(r=>[`<b>${esc(r[0])}</b>`,esc(r[1]),`<span style="color:var(--dim)">${esc(r[2])}</span>`]))}`;

  /* ---------- COCKTAILS ---------- */
  $("#p-cocktails").innerHTML=`
    <div class="sechead" id="sec-garnish"><h2>Garnish cheat sheet</h2><span>the fastest thing to get wrong</span></div>
    ${tbl(["Drink","Garnish","Glass"],COCKTAILS.filter(c=>c.garnish&&c.garnish!=="—").map(c=>[`<b>${esc(c.n)}</b>`,`<span style="color:#1E6B3A">${esc(c.garnish)}</span>`,esc(c.glass)]))}

    <div class="sechead"><h2>Guest says / you say</h2></div>
    ${tbl(["Guest asks for","Send them to"],DRINK_PITCH.map(p=>[esc(p[0]),`<b>${esc(p[1])}</b>`]))}

    <div class="sechead"><h2>Every drink</h2><span>build, glass, garnish, descriptor</span></div>
    <input class="fsearch" id="drinkQ" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Search drink, spirit, or garnish...">
    <div class="filters" id="drinkGrps">${COCKTAIL_GRPS.map(g=>`<button data-g="${g[0]}"${g[0]==="all"?' class="on"':''}>${g[1]}</button>`).join("")}</div>
    <div class="grid wide" id="drinkGrid"></div>`;

  /* ---------- MENU ---------- */
  $("#p-menu").innerHTML=`
    <div class="sechead"><h2>Steak temperatures</h2></div>
    ${tbl(["Temp","Center"],TEMPS.map(t=>[`<b>${esc(t[0])}</b>`,esc(t[1])]))}
    <div class="note warn" style="margin-top:10px"><b>Well done:</b> butterfly well-done filets so they cook evenly.</div>

    <div class="sechead"><h2>The A5 pitch</h2><span>say it in your own words, hit these beats</span></div>
    <div class="card"><div class="crow"><div class="cname">Japanese A5 Wagyu &mdash; Kagoshima Prefecture</div><div class="cprice">$25/oz</div></div>
      <div class="cbody">${A5PITCH.map(p=>`<div style="padding:5px 0;border-top:1px solid var(--line)">${esc(p)}</div>`).join("")}</div></div>

    ${Object.entries(MENU).map(([sec,items])=>`
      <div class="sechead"><h2>${esc(sec)}</h2><span>${items.length} items</span></div>
      <div class="grid wide">${items.map(i=>`<div class="card">
        <div class="crow"><div class="cname">${esc(i[0])}</div><div class="cprice">${esc(i[1])}</div></div>
        <div class="cbody">${esc(i[2])}</div>
        ${i[3]?`<div class="tags"><span class="tag${/verify|cannot|NOT|updated/i.test(i[3])?" warn":""}">${esc(i[3])}</span></div>`:""}
      </div>`).join("")}</div>`).join("")}

    <div class="sechead"><h2>Salad dressings</h2><span>11 total, only one ranch</span></div>
    <div class="card"><div class="cbody">${DRESSINGS.map(d=>`<div style="padding:3px 0">${/house dressing/i.test(d)?`<b style="color:var(--gold2)">${esc(d)}</b>`:esc(d)}</div>`).join("")}</div></div>`;

  /* ---------- SPECIALS & SOUPS ---------- */
  $("#p-specials").innerHTML=`
    <div class="note gold"><b>This is a living list.</b> Specials and soups rotate constantly — tell your Claude things like "new special: swordfish, $52, mango salsa" or "the skewers are done" or "tonight's soup is chicken tortilla with..." and this page updates: ongoing flips to past, soups get archived forever.</div>

    <div class="sechead" id="sec-specials"><h2>Ongoing specials</h2><span>running right now</span></div>
    <div class="grid wide">${SPECIALS_ON.length?SPECIALS_ON.map(s=>`<div class="card hl">
      <div class="crow"><div class="cname">${esc(s[0])}</div><div class="cprice">${esc(s[1])}</div></div>
      <div class="cbody">${esc(s[2])}</div>
      ${s[3]?`<div class="tags"><span class="tag">${esc(s[3])}</span></div>`:""}
    </div>`).join(""):'<div class="empty">Nothing running — tell your Claude the new special.</div>'}</div>

    <div class="sechead"><h2>Rotating entree specials</h2><span>seen before — ask a manager if one is running tonight</span></div>
    <div class="grid wide">${SPECIALS_ROTATION.map(s=>`<div class="card">
      <div class="crow"><div class="cname">${esc(s[0])}</div><div class="cprice">${esc(s[1])}</div></div>
      <div class="cbody">${esc(s[2])}</div>
    </div>`).join("")}</div>

    <div class="sechead"><h2>Soup of the day — archive</h2><span>$7 · changes daily · every one we log lives here</span></div>
    ${SOTD.length
      ? tbl(["First seen","Soup","What's in it","Allergen notes"],SOTD.map(s=>[`<b>${esc(s[0])}</b>`,`<b>${esc(s[1])}</b>`,esc(s[2]),`<span style="color:var(--dim)">${esc(s[3])}</span>`]))
      : `<div class="empty">No soups logged yet. Tell your Claude tonight's soup and what's in it — the archive starts there, and every soup stays searchable forever.</div>`}
    <div class="note warn" style="margin-top:10px"><b>Allergen rule:</b> soup of the day allergens change with the soup. Never answer from memory — check this archive, then verify with the kitchen.</div>

    <div class="sechead"><h2>Soups always on the menu</h2><span>not rotating — the standing three</span></div>
    ${tbl(["Soup","Price","Build"],SOUPS_STANDING.map(s=>[`<b>${esc(s[0])}</b>`,s[1],esc(s[2])]))}

    <div class="sechead"><h2>Off-menu cuts</h2><span>ask a manager before promising any of these</span></div>
    ${tbl(["Cut","Price","The pitch"],OFFMENU.map(s=>[`<b>${esc(s[0])}</b>`,esc(s[1]),`<span style="color:var(--dim)">${esc(s[2])}</span>`]))}

    <div class="sechead"><h2>Past specials</h2><span>not running anymore — do not pitch</span></div>
    <div class="grid wide">${SPECIALS_PAST.map(s=>`<div class="card">
      <div class="crow"><div class="cname">${esc(s[0])}</div><div class="cprice">${esc(s[1])}</div></div>
      <div class="cbody">${esc(s[2])}</div>
      <div class="tags"><span class="tag warn">${esc(s[3])}</span></div>
    </div>`).join("")}</div>`;

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

  /* ---------- BAR ---------- */
  $("#p-bar").innerHTML=`
    ${Object.entries(SPIRITS).map(([sec,rows])=>`
      <div class="sechead"><h2>${esc(sec)}</h2><span>${rows.length} bottles</span></div>
      ${tbl(["Bottle","Price","Say this"],rows.map(r=>[`<b>${esc(r[0])}</b>`,esc(r[1]),`<span style="color:var(--dim)">${esc(r[2])}</span>`]),[,"n",])}`).join("")}
    <div class="sechead"><h2>Beer &amp; seltzer</h2><span>ranked by ABV — prices verify in Toast</span></div>
    ${tbl(["Beer","ABV","Type","Say this"],BEER.map(b=>[`<b>${esc(b[0])}</b>`,`<span class="mono">${esc(b[1])}</span>`,esc(b[2]),`<span style="color:var(--dim)">${esc(b[3])}</span>`]))}
    <div class="note"><b>Two easy calls:</b> the strongest beer is Elysian Space Dust at 8.2%. The only zero-proof beer is Bud Zero. Austin Eastciders Original Dry is the gluten-free-style option.</div>`;

  /* ---------- STUDY ---------- */
  $("#p-study").innerHTML=`
    <div class="sechead" id="sec-quiz"><h2>Generate a quiz</h2><span>${MC.length} questions in the bank — fresh shuffle every run</span></div>
    <p class="lede">Question order and answer order shuffle every time, so nobody can memorize positions. Miss questions and you get a review round of just those.</p>
    <div class="qbar"><button class="btn" id="quizStart">Generate quiz</button><div class="score" id="quizScore">ready when you are</div></div>
    <div id="quizBox"><div class="empty">Hit generate. Food, steak, wine, cocktail, allergen, and ops questions, all mixed.</div></div>

    <div class="sechead"><h2>The real menu test</h2><span>all 30 questions with the graded, corrected answers</span></div>
    <div class="qbar"><button class="btn sec" id="ansToggle">Show all answers</button><div class="score">say each answer out loud before revealing</div></div>
    <div class="anslist" id="ansList">${OPEN.map((o,i)=>`<div class="q"><div class="qq"><span>${i+1}.</span>${esc(o[0])}</div><div class="ans">${esc(o[1])}</div></div>`).join("")}</div>`;

  /* ---------- SALES CALCULATOR ---------- */
  $("#p-house").innerHTML=`
    <div class="sechead"><h2>How we work</h2><span>Points of Passion, steps of service, and the house playbook — from the real training handouts</span></div>
    <div class="note gold"><b>Mission:</b> ${esc(HOUSE.mission)}</div>
    ${acc("Points of Passion — the 16","the Mo's service philosophy, word for word where it counts",`<ol class="steps">${HOUSE.points.map(([t,d])=>`<li><b>${esc(t)}.</b> ${esc(d)}</li>`).join("")}</ol>`)}
    ${acc("Isaac's Non-Negotiables — the 11","the standards that never bend",`<ol class="steps">${HOUSE.isaacs.map(d=>`<li>${esc(d)}</li>`).join("")}</ol>`)}
    ${acc("Back server steps of service","your role, from the official handout",`<ul class="steps">${HOUSE.back.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Front server steps of service","what your front is juggling — know their job too",`<ul class="steps">${HOUSE.front.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Expo / runner side work","opening, mid-shift, closing",`
      <p class="sub" style="margin:4px 0"><b>Opening</b></p><ul class="steps">${HOUSE.expo.open.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>
      <p class="sub" style="margin:10px 0 4px"><b>Mid-shift</b></p><ul class="steps">${HOUSE.expo.mid.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>
      <p class="sub" style="margin:10px 0 4px"><b>Closing</b></p><ul class="steps">${HOUSE.expo.close.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Tableside shows + mise en place","every setup, every show, one list",`<ul class="steps">${HOUSE.tableside.map(([t,d])=>`<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Back server closing tasks","the full close-down, from the official checklist",`<ul class="steps">${HOUSE.backclose.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Closing side work — front, back, closer","the posted sheet with slow-night and busy-night quantities",`<ul class="steps">${HOUSE.closesheet.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("Bar steps + timing standards","the 20-step bar bible — the timing rules apply everywhere",`<ul class="steps">${HOUSE.barsteps.map(d=>`<li>${esc(d)}</li>`).join("")}</ul>`)}
    ${acc("House facts","uniform, trivia, and the little rules",`<ul class="steps">${HOUSE.facts.map(([t,d])=>`<li><b>${esc(t)}:</b> ${esc(d)}</li>`).join("")}</ul>`)}
    <div class="sechead"><h2>Employee Handbook</h2><span>the official policies, every section</span></div>
    <p class="lede">The house handbook, section by section. General guidelines — not a contract. Questions go to Management.</p>
    ${HANDBOOK.map(h=>acc(h[0],h[1],h[2])).join("")}`;

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
    <div class="sechead" id="sec-checkout"><h2>Sales Calculator</h2><span>sales in — your money out</span></div>
    <div class="tool">
      <h3>Type your team's net sales. That's it.</h3>
      <p class="sub">Tips estimate at 20.8% of sales (the observed house rate) until you type the actual tips from Toast. The math below is the exact house checkout — proven to the dollar against a real graded sheet.</p>
      <div class="filters" id="scPresets">${[800,1200,1600,2000,2500].map(v=>`<button data-v="${v}">$${v.toLocaleString()}</button>`).join("")}</div>
      <div class="frow">
        <div class="f"><label>Team net sales $</label><input type="number" inputmode="decimal" id="scSales" placeholder="from Toast" min="0"></div>
        <div class="f"><label>Credit tips $ (optional)</label><input type="number" inputmode="decimal" id="scTips" placeholder="blank = 20.8% est." min="0"></div>
        <div class="f"><label>Ran a banquet?</label><select id="scBq"><option value="no">No</option><option value="yes">Yes (+3% tip-out)</option></select></div>
        <div class="f"><label>Polisher scheduled?</label><select id="scPolisher"><option value="0">No — the usual</option><option value="10">Yes — team ($10, busiest nights)</option><option value="5">Yes — I'm solo ($5)</option></select></div><div class="f"><label>Expo working?</label><select id="scExpo"><option value="yes">Yes</option><option value="no">No — skip expo line</option></select></div>
        <div class="f"><label>Cash tips $</label><input type="number" inputmode="decimal" id="scCash" placeholder="—" min="0"></div>
      </div>
      <div class="out" id="scOut"></div>
    </div>

    <div class="sechead" id="sec-income"><h2>Night Forecast</h2><span>who's on + the covers + should I take the cut</span></div>
    <div class="tool">
      <h3>The night, called before it happens</h3>
      <p class="sub">Pick the day. Books start at the covers number straight off the posted schedule — that's the Sunday-night count, and it climbs all day, so update it from SevenRooms when you check. Teams and cocktailers start at what the schedule actually has on. Then it calls the $200 line: under is cut territory, over is work it.</p>
      <div class="frow">
        <div class="f"><label>Day</label><select id="ipDay">${SCHEDULE.days.map((d,i)=>`<option value="${i}"${i===IPD0?" selected":""}>${d[1]} ${d[0]}</option>`).join("")}</select></div>
        <div class="f"><label>On the books</label><input type="number" inputmode="decimal" id="ipBooks" placeholder="from SevenRooms" min="0"></div>
        <div class="f"><label>Walk-ins guess</label><input type="number" inputmode="decimal" id="ipWalk" placeholder="—" min="0"></div>
      </div>
      <p class="sub" id="ipSugg" style="margin:0 0 12px"></p>
      <div class="frow">
        <div class="f"><label>Teams</label><input type="number" inputmode="decimal" id="ipTeams" value="3" min="1" max="12"></div>
        <div class="f"><label>Cocktailers on</label><select id="ipCk"><option value="0">None</option><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option></select></div>
        <div class="f"><label>Avg $ per person</label><input type="number" inputmode="decimal" id="ipCheck" value="115" min="0"></div>
        <div class="f"><label>Polisher?</label><select id="ipPol"><option value="0">No</option><option value="10">Yes ($10)</option></select></div>
        <div class="f"><label>Multiplier</label><select id="ipOcc">${[0.80,0.85,0.90,0.95,1.00,1.10,1.20,1.30,1.40,1.50,1.75].map(m=>`<option value="${m}"${m===1?" selected":""}>x${m.toFixed(2)}</option>`).join("")}</select></div>
      </div>
      <p class="sub" style="margin:0 0 10px"><b>Avg $ per person</b> means what ONE guest spends on food and drinks — not the table's whole check. A check usually covers 2, 8, even 15 people; this number is per person. Toast calls it "average spend per guest." $115 is the preset for a typical steak-dinner night. The multiplier scales the whole-night projection for a big occasion — numbers only, your call.</p>
      <div class="out" id="ipOut"></div>
      ${acc("Everybody's night — net sales + tip % in, every position out","what everybody makes, top to bottom",`
      <p class="sub" style="color:var(--dim2);font-size:12.5px;margin:4px 0 12px">Type the floor's combined net sales — teams and cocktailers together, skip big banquets — and the night's tip percentage. Teams and cocktailers come from the controls above; the counts below start at the posted schedule for the day you picked. The floor splits into slices (a cocktailer's section rides as 0.7 of a team), and each tip-out pool splits evenly across however many are on that role — fewer bussers on a busy night means each one takes home more.</p>
      <div class="frow">
        <div class="f"><label>Floor net sales $</label><input type="number" inputmode="decimal" id="exNet" placeholder="teams + cocktailers" min="0"></div>
        <div class="f"><label>Tip %</label><input type="number" inputmode="decimal" id="exPct" value="20.8" min="0" max="35" step="0.1"></div>
      </div>
      <div class="frow">
        <div class="f"><label>Bussers on</label><input type="number" inputmode="decimal" id="exBus" value="2" min="0" max="6"></div>
        <div class="f"><label>Expo / food run on</label><input type="number" inputmode="decimal" id="exExpo" value="1" min="0" max="4"></div>
        <div class="f"><label>Bartenders on</label><input type="number" inputmode="decimal" id="exBar" value="2" min="0" max="5"></div>
      </div>
      <div class="out" id="exOut"></div>`)}
      <div id="ipWho"></div>
    </div>

    ${acc("Banquet checkout — the second envelope","banquet nights run two checkouts; same math, separate sheet",`
      <p class="sub" style="color:var(--dim2);font-size:12.5px;margin:4px 0 12px">A banquet gets its own checkout sheet and its own envelope, on top of the regular one. Same pipeline. Guests pay a 23% auto-grat (they can add more on top) — type the real number off the banquet sheet when you have it. The 3% line below is Lillian’s cut as banquet coordinator, so the team keeps about 20 points before normal tip-outs.</p>
      <div class="frow">
        <div class="f"><label>Banquet net sales $</label><input type="number" inputmode="decimal" id="bqcSales" placeholder="from the banquet sheet" min="0"></div>
        <div class="f"><label>Gratuity $ (optional)</label><input type="number" inputmode="decimal" id="bqcTips" placeholder="blank = 23% est." min="0"></div>
        <div class="f"><label>Banquet tip-out (3%)?</label><select id="bqcThree"><option value="yes" selected>Yes — VERIFY</option><option value="no">No</option></select></div>
      </div>
      <div class="out" id="bqcOut"></div>`)}

    <div class="sechead"><h2>How the split works</h2><span>the house rules</span></div>
    <ol class="steps">${SPLIT_RULES.map(r=>`<li><b>${esc(r.split(".")[0])}.</b>${esc(r.split(".").slice(1).join(".").trim())}</li>`).join("")}</ol>

    ${acc("Banquet quick math","parked on purpose — dollars are placeholders",`
      <div class="frow" style="margin-top:8px">
        <div class="f"><label>Party size</label><input type="number" inputmode="decimal" id="bqHeads" value="20" min="0"></div>
        <div class="f"><label>Est. $ / head</label><input type="number" inputmode="decimal" id="bqPerHead" value="105" min="0"></div>
        <div class="f"><label>F&amp;B minimum $</label><input type="number" inputmode="decimal" id="bqMin" value="3000" min="0"></div>
        <div class="f"><label>Auto-grat %</label><input type="number" inputmode="decimal" id="bqGrat" value="23" min="0" max="30"></div>
      </div>
      <div class="out" id="bqOut"></div>
      <p class="sub" style="color:var(--dim2);font-size:12px;margin:10px 0 0">Rooms: ${ROOMS.map(r=>`<b>${esc(r[0])}</b> — ${esc(r[1])}`).join(" · ")}. Booking through Lillian Speedy, Director of Sales.</p>`)}

    

    `;

  /* ---------- WIRE UP ---------- */
  renderWines(); renderDrinks(); renderAllergens(); pairingOut(0); calcSC(); calcBQC(); ipPrefill(); calcIP(); calcEX(); calcBq(); fillSched();

  $("#p-shift").querySelector(".qa").onclick=e=>{
    const b=e.target.closest("button[data-qa]"); if(!b)return;
    const [tab,sel]=b.dataset.qa.split("|");
    if(tab==="__search"){window.scrollTo({top:0,behavior:"smooth"});setTimeout(()=>$("#gsearch").focus(),250);return;}
    go(tab,sel||null);
  };

  $("#wineQ").oninput=e=>{wineFilter.q=e.target.value;renderWines();};
  const chip=(id,key,attr)=>{$(id).onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $(id).querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));wineFilter[key]=b.dataset[attr];renderWines();};};
  chip("#wineBudget","price","p"); chip("#wineColor","color","c"); chip("#wineCats","cat","c"); chip("#wineTiers","tier","t");
  $("#pairSel").onchange=e=>pairingOut(+e.target.value);

  $("#drinkQ").oninput=e=>{drinkFilter.q=e.target.value;renderDrinks();};
  $("#drinkGrps").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#drinkGrps").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));drinkFilter.grp=b.dataset.g;renderDrinks();};

  $("#allergyChips").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    const a=b.dataset.a;
    if(a==="__clear"){allergySel.clear();$("#allergyChips").querySelectorAll("button").forEach(x=>x.classList.remove("on"));}
    else{allergySel.has(a)?allergySel.delete(a):allergySel.add(a);b.classList.toggle("on");}
    renderAllergens();};
  $("#allergyQ").oninput=renderAllergens;

  $("#quizStart").onclick=()=>startQuiz();
  $("#ansToggle").onclick=()=>{
    const on=$("#ansList").classList.toggle("show");
    $("#ansToggle").textContent=on?"Hide all answers":"Show all answers";
  };

  $("#scPresets").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    $("#scSales").value=b.dataset.v; $("#scTips").value=""; calcSC(); calcBQC();};
  ["scSales","scTips","scBq","scPolisher","scExpo","scCash"].forEach(id=>{
    const n=$("#"+id); n.oninput=()=>{calcSC();calcBQC();}; n.onchange=()=>{calcSC();calcBQC();}; n.onkeyup=()=>{calcSC();calcBQC();};});
  ["bqcSales","bqcTips","bqcThree"].forEach(id=>{
    const n=$("#"+id); n.oninput=calcBQC; n.onchange=calcBQC; n.onkeyup=calcBQC;});
  ["ipBooks","ipWalk","ipTeams","ipCk","ipCheck","ipPol","ipOcc"].forEach(id=>{
    const n=$("#"+id); const f=()=>{calcIP();calcEX();}; n.oninput=f; n.onchange=f; n.onkeyup=f;});
  ["exNet","exPct","exBus","exExpo","exBar"].forEach(id=>{
    const n=$("#"+id); n.oninput=calcEX; n.onchange=calcEX; n.onkeyup=calcEX;});
  $("#ipDay").onchange=()=>{ipPrefill();calcIP();calcEX();};
  $("#ipSugg").onclick=e=>{const b=e.target.closest("#ipUse");if(!b)return;
    $("#ipWalk").value=+b.dataset.s||0; calcIP();};

  ["bqHeads","bqPerHead","bqMin","bqGrat"].forEach(id=>{
    const n=$("#"+id); n.oninput=calcBq; n.onchange=calcBq; n.onkeyup=calcBq;});

  ["wine","menu","bar","ops","allergens","specials"].forEach(addJumps);
}

/* ---------- BOOT ---------- */
buildNav(); build();
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
$("#totop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
addEventListener("scroll",()=>{$("#totop").classList.toggle("show",scrollY>700);},{passive:true});

/* ---------- EVERYBODY'S NIGHT — real net + tip %, team + tip-outs ----------
   Per Evan 8/5: no polisher (too rare to model — ignore that labor entirely)
   and no hourly wages/hours (doesn't matter for this view). Just team sales,
   what the front and back earn, and the three real tip-out lines — bar 0.1%,
   busser 1.5%, expo 0.5% — split across whoever's on that role tonight. */
function calcEX(){
  const el=$("#exOut"); if(!el)return;
  const net=+$("#exNet").value||0;
  const pct=(+$("#exPct").value||0)/100;
  const teams=Math.max(1,Math.round(+$("#ipTeams").value||3));
  const nCk=Math.max(0,+$("#ipCk").value||0);
  const nBus=Math.max(0,Math.round(+$("#exBus").value||0));
  const nExpo=Math.max(0,Math.round(+$("#exExpo").value||0));
  const nBar=Math.max(0,Math.round(+$("#exBar").value||0));
  if(!net){el.innerHTML='<div class="empty" style="padding:14px">Type the floor net and the tip % \u2014 this prints team sales, front/back, and the busser/expo/bar tip-outs.</div>';return;}
  const slices=teams+CKTAIL_WEIGHT*nCk;
  const teamSales=net/slices, ckSales=teamSales*CKTAIL_WEIGHT;
  const expoOn=nExpo>0;
  const cut=sales=>{
    const bar=Math.ceil(.001*sales), bus=Math.ceil(.015*sales), ex=expoOn?Math.ceil(.005*sales):0;
    const tips=sales*pct, pool=tips*(1-SALES.withheldRate);
    return {bar,bus,ex,earned:Math.max(0,Math.floor(pool-bar-bus-ex))};
  };
  const T=cut(teamSales);
  const C=nCk?cut(ckSales):{bar:0,bus:0,ex:0,earned:0};
  const back=Math.ceil(T.earned/2), front=T.earned-back;
  const barPool=teams*T.bar+nCk*C.bar;
  const busPool=teams*T.bus+nCk*C.bus;
  const expoPool=expoOn?teams*T.ex+nCk*C.ex:0;
  const share=(pool,n)=>n>0?Math.round(pool/n):0;
  const money=v=>"$"+Math.round(v).toLocaleString();
  const tile=(k,v,s,hl)=>`<div class="kpi"${hl?' style="border-color:var(--gold)"':''}><div class="k">${k}</div><div class="v">${v}</div><div class="s">${s}</div></div>`;
  el.innerHTML=`
  <div class="kpis" style="margin-bottom:10px">
    ${tile("Team sales",money(teamSales),`${slices.toFixed(1)} slices off ${money(net)} at ${(pct*100).toFixed(1)}% tips`)}
    ${tile("Team earned",money(T.earned),"after bar/busser/expo tip-outs")}
    ${tile("Front",money(front),"the smaller half",true)}
    ${tile("Back",money(back),"takes the greater dollar",true)}
  </div>
  <div class="kpis">
    ${tile("Bussers",nBus?money(share(busPool,nBus)):"\u2014",nBus?`each, from a ${money(busPool)} pool \u00f7 ${nBus} on (1.5%)`:"none on tonight")}
    ${tile("Expo / food run",expoOn?money(share(expoPool,nExpo)):"\u2014",expoOn?`each, from a ${money(expoPool)} pool \u00f7 ${nExpo} on (0.5%)`:"none on \u2014 teams keep the line")}
    ${tile("Bar",nBar?money(share(barPool,nBar)):"\u2014",nBar?`each, from a ${money(barPool)} pool \u00f7 ${nBar} on (0.1%) \u2014 plus their own bar-top tips`:"none on tonight")}
  </div>
  <p class="sub" style="margin:8px 0 0;color:var(--dim2);font-size:12px">Team and cocktailer math is the exact house pipeline (2% withheld, tip-outs rounded up per checkout). Each tip-out pool splits evenly across whoever's on that role \u2014 fewer people on it, more each one takes.</p>`;
}

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
    const rows=cur?sec[1].filter(r=>!schedGone(r)):sec[1];
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
function rosterFor(S,idx,cur){
  return S.sections.map(sec=>{
    const on=(cur?sec[1].filter(r=>!schedGone(r)):sec[1]).map(r=>({n:r[0],c:r[idx+1]}))
      .filter(x=>x.c && x.c!=="?" && !/^off\??$/i.test(x.c) && !/^ro\??$/i.test(x.c));
    if(!on.length)return "";
    return `<div class="rosec"><b>${esc(sec[0])}</b><div class="who">${on.map(x=>`${esc(x.n)} <i>${esc(schedTime(x.c))}</i>`).join(" &nbsp;\u00b7&nbsp; ")}</div></div>`;
  }).join("");
}
function fillSched(){
  const p=$("#p-sched"); if(!p)return;
  SCHED_DAY=schedToday();
  if(SCHED_SEL==null||!SCHEDULE_HISTORY[SCHED_SEL])SCHED_SEL=0;
  const t=new Date(), todayStr=(t.getMonth()+1)+"/"+t.getDate();
  const idx=(t.getFullYear()===SCHEDULE.year)?SCHEDULE.days.findIndex(d=>d[0]===todayStr):-1;
  const DAYFULL={We:"Wednesday",Th:"Thursday",Fr:"Friday",Sa:"Saturday",Su:"Sunday",Mo:"Monday",Tu:"Tuesday"};
  let roster;
  if(idx>=0){
    const d=SCHEDULE.days[idx];
    const blocks=rosterFor(SCHEDULE,idx,true);
    roster=`<div class="sechead"><h2>Today \u2014 ${DAYFULL[d[1]]} ${d[0]}</h2><span>flips itself at midnight</span></div>
      ${blocks||'<div class="note">Nobody on the sheet for today.</div>'}`;
  }else{
    roster=`<div class="sechead"><h2>Today</h2><span>daily roster</span></div>
      <div class="note"><b>Today (${todayStr}) isn't on the posted week.</b> This grid covers the ${esc(SCHEDULE.week)}. When the new sheet goes up, send a photo \u2014 it slides in here and this one drops into History below.</div>`;
  }
  p.innerHTML=`${roster}
    <div class="sechead"><h2>${esc(SCHEDULE.week)}</h2><span>exactly as posted</span></div>
    ${schedGrid(SCHEDULE,idx,true)}
    ${(()=>{const gone=[];SCHEDULE.sections.forEach(sec=>sec[1].forEach(r=>{if(schedGone(r))gone.push(r[0]);}));
      return gone.length?`<div class="note" style="margin-top:8px"><b>Not on this week:</b> ${gone.map(esc).join(", ")} \u2014 off or not scheduled all seven days, so they're off the grid. They come back the week they're back.</div>`:"";})()}
    <div class="note" style="margin-top:10px"><b>Reading it:</b> numbers are start times exactly as written \u2014 345 means 3:45. A dark box is OFF. <b>RO</b> is a requested day off. Blank means not scheduled that day. <b>Covers row:</b> dinners already on the books for each day when this schedule printed \u2014 the Sunday-night count from ${schedSunday(SCHEDULE)}. Numbers on the yellow <b>BQTs</b> bar are the banquet headcount for that day. A trailing ? means the photo was hard to read.</div>
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
    ${day!=null?(rosterFor(w,day)||'<div class="note">Nobody readable on the sheet that day.</div>'):'<div class="note" style="margin:6px 0 10px">Tap a day to see who was on \u2014 tap again to close it.</div>'}
    ${schedGrid(w,day!=null?day:-1)}
    ${w.note?`<div class="note" style="margin-top:8px">${esc(w.note)}</div>`:""}`;
  el.querySelector(".filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    const d2=+b.dataset.d; renderSchedHist(d2===day?null:d2);};
}
setInterval(()=>{ if(SCHED_DAY && schedToday()!==SCHED_DAY) fillSched(); },60000);
