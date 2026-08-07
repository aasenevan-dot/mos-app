/* ============================================================
   The Mo's Training Regiment — slideshow generator
   Follows the ORIGINAL Mo's Training Itinerary, day by day.
   Placeholder slides are real slides on purpose: they are the
   shot list we fill in as the material comes in.
   Run: node mkdeck.js
   ============================================================ */
const pptxgen = require("pptxgenjs");
const fs = require("fs");

const WINE   = "59201C";   // deep burgundy — the dominant color
const WINE2  = "7C2A24";
const CREAM  = "F7EFE4";
const PAPER  = "FFFFFF";
const INK    = "2B2118";
const DIM    = "6B5B4B";
const GOLD   = "B0812F";
const SAND   = "F2E9D8";
const GREEN  = "1E6B3A";

const HEAD = "Cambria";
const BODY = "Calibri";

const W = 13.333, H = 7.5;
const M = 0.62;                       // page margin
const CW = W - M * 2;                 // content width

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Mo's A Place For Steaks";
pres.company = "Mo's A Place For Steaks · Greenwood, Indiana";
pres.title = "The Mo's Training Regiment";

let PLACEHOLDERS = [];

/* ---------- recorder ----------
   Every slide is captured as structured content so the SAME deck can render
   inside the app, one slide at a time on a phone. One source of truth. */
let SLIDES = [], CUR = null;
function newRec(kind, title, sub, day) { CUR = { k: kind, t: title, s: sub || "", d: day || "", b: [] }; SLIDES.push(CUR); return CUR; }
function blk(type, data) { if (CUR) CUR.b.push({ t: type, d: data }); }

/* ---------- shared pieces ---------- */

// the motif: a burgundy disc with a short label in it, repeated everywhere
function disc(slide, x, y, txt, opts) {
  const o = opts || {};
  slide.addShape(pres.ShapeType.ellipse, {
    x, y, w: o.d || 0.42, h: o.d || 0.42,
    fill: { color: o.fill || WINE }, line: { color: o.fill || WINE, width: 0 }
  });
  slide.addText(String(txt), {
    x, y, w: o.d || 0.42, h: o.d || 0.42,
    align: "center", valign: "middle", margin: 0,
    fontFace: HEAD, fontSize: o.fs || 13, bold: true, color: o.color || CREAM
  });
}

function pageTitle(slide, title, kicker) {
  slide.addText(title, {
    x: M, y: 0.42, w: CW, h: 0.62, margin: 0,
    fontFace: HEAD, fontSize: 34, bold: true, color: WINE
  });
  if (kicker) {
    slide.addText(kicker, {
      x: M, y: 1.04, w: CW, h: 0.34, margin: 0,
      fontFace: BODY, fontSize: 13.5, italic: true, color: DIM
    });
  }
}

function footer(slide, dayLabel) {
  slide.addText(dayLabel || "Mo's A Place For Steaks", {
    x: M, y: H - 0.5, w: CW * 0.6, h: 0.28, margin: 0,
    fontFace: BODY, fontSize: 9.5, color: DIM
  });
}

/* light content slide */
function page(title, kicker, dayLabel) {
  newRec("page", title, kicker, dayLabel);
  const s = pres.addSlide();
  s.background = { color: PAPER };
  pageTitle(s, title, kicker);
  footer(s, dayLabel);
  return s;
}

/* ---------- layout: rows of disc + bold head + body ---------- */
function rows(slide, items, opts) {
  blk("rows", items.map(i => [i[1], i[2] || ""]));
  const o = opts || {};
  const top = o.top != null ? o.top : 1.62;
  const x = o.x != null ? o.x : M;
  const w = o.w != null ? o.w : CW;
  const gap = o.gap != null ? o.gap : 0.06;
  const bottom = o.bottom != null ? o.bottom : H - 0.75;
  const rowH = o.rowH != null ? o.rowH : (bottom - top) / items.length - gap;
  const fs = o.fs || 12.5;
  items.forEach((it, i) => {
    const y = top + i * (rowH + gap);
    disc(slide, x, y + 0.03, it[0], { d: 0.4, fs: o.discFs || 12.5, fill: o.discFill });
    slide.addText(
      [
        { text: it[1], options: { bold: true, color: WINE, fontSize: fs + 0.5, breakLine: !!it[2] } },
        ...(it[2] ? [{ text: it[2], options: { color: INK, fontSize: fs } }] : [])
      ],
      {
        x: x + 0.55, y, w: w - 0.55, h: rowH, margin: 0, valign: "top",
        fontFace: BODY, lineSpacing: fs * 1.28
      }
    );
  });
}

/* ---------- layout: cards in a grid ---------- */
function cards(slide, items, opts) {
  blk("cards", items.map(i => [i[0], i[1] || "", i[2] || ""]));
  const o = opts || {};
  const cols = o.cols || 3;
  const top = o.top != null ? o.top : 1.66;
  const gap = o.gap != null ? o.gap : 0.22;
  const w = (CW - gap * (cols - 1)) / cols;
  const rowsN = Math.ceil(items.length / cols);
  const h = o.h != null ? o.h : (H - 0.8 - top - gap * (rowsN - 1)) / rowsN;
  items.forEach((it, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = M + c * (w + gap), y = top + r * (h + gap);
    slide.addShape(pres.ShapeType.roundRect, {
      x, y, w, h, rectRadius: 0.06,
      fill: { color: o.fill || SAND }, line: { color: o.line || "E4D8C0", width: 1 }
    });
    const head = it[0], sub = it[1], body = it[2];
    slide.addText(head, {
      x: x + 0.2, y: y + 0.16, w: w - 0.4, h: 0.34, margin: 0,
      fontFace: HEAD, fontSize: o.headFs || 14.5, bold: true, color: WINE
    });
    if (sub) {
      slide.addText(sub, {
        x: x + 0.2, y: y + 0.5, w: w - 0.4, h: 0.26, margin: 0,
        fontFace: BODY, fontSize: 11, bold: true, color: GOLD
      });
    }
    if (body) {
      slide.addText(body, {
        x: x + 0.2, y: y + (sub ? 0.78 : 0.54), w: w - 0.4, h: h - (sub ? 0.94 : 0.7), margin: 0,
        fontFace: BODY, fontSize: o.bodyFs || 11, color: INK, valign: "top", lineSpacing: 14
      });
    }
  });
}

/* ---------- layout: two columns of bulleted text ---------- */
function twoCol(slide, left, right, opts) {
  blk("cols", [left, right]);
  const o = opts || {};
  const top = o.top != null ? o.top : 1.66;
  const gap = 0.5;
  const w = (CW - gap) / 2;
  const h = H - 0.8 - top;
  [[left, M], [right, M + w + gap]].forEach(([col, x]) => {
    let y = top;
    if (col.head) {
      slide.addText(col.head, {
        x, y, w, h: 0.32, margin: 0,
        fontFace: HEAD, fontSize: 15, bold: true, color: WINE
      });
      y += 0.42;
    }
    slide.addText(
      col.items.map((t, i) => ({
        text: t, options: { bullet: { indent: 14 }, breakLine: i < col.items.length - 1 }
      })),
      {
        x, y, w, h: h - (y - top), margin: 0, valign: "top",
        fontFace: BODY, fontSize: o.fs || 12.5, color: INK,
        lineSpacing: (o.fs || 12.5) * 1.3, paraSpaceAfter: 6
      }
    );
  });
}

/* ---------- layout: a big pull-quote / rule ---------- */
function pullNote(slide, label, text, y, hh) {
  blk("note", [label, text]);
  const h = hh || 0.82;
  slide.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CW, h, rectRadius: 0.06,
    fill: { color: "F3E7E4" }, line: { color: "E2CCC7", width: 1 }
  });
  slide.addText(
    [
      { text: label + "  ", options: { bold: true, color: WINE } },
      { text: text, options: { color: INK } }
    ],
    {
      x: M + 0.22, y: y + 0.08, w: CW - 0.44, h: h - 0.16, margin: 0, valign: "middle",
      fontFace: BODY, fontSize: 12.5, lineSpacing: 16
    }
  );
}

/* ---------- dark slides ---------- */
function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: WINE };
  return s;
}

function divider(dayNo, title, plan) {
  newRec("day", title, plan, "Day " + dayNo).n = dayNo;
  const s = darkSlide();
  disc(s, M, 1.9, dayNo, { d: 1.15, fs: 40, fill: CREAM, color: WINE });
  s.addText(title, {
    x: M + 1.5, y: 1.86, w: CW - 1.5, h: 0.86, margin: 0,
    fontFace: HEAD, fontSize: 40, bold: true, color: CREAM
  });
  s.addText(plan, {
    x: M + 1.5, y: 2.78, w: CW - 1.5, h: 1.5, margin: 0,
    fontFace: BODY, fontSize: 14, italic: true, color: "E8D6C8", lineSpacing: 21
  });
  s.addText("From the original Mo's Training Itinerary", {
    x: M, y: H - 0.72, w: CW, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 10.5, color: "C9A99A"
  });
  return s;
}

/* ---------- the placeholder slide ---------- */
function placeholder(dayLabel, what, note, kind) {
  PLACEHOLDERS.push([dayLabel, what, kind || "Photo"]);
  newRec("shot", what, note, dayLabel);
  const s = pres.addSlide();
  s.background = { color: PAPER };
  pageTitle(s, "Place " + (kind === "Document" ? "the document" : "a picture") + " here", dayLabel);
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.62, w: CW, h: 3.62, rectRadius: 0.08,
    fill: { color: "FBF3E2" }, line: { color: GOLD, width: 2.25, dashType: "dash" }
  });
  s.addText("PLACE PICTURE OF", {
    x: M, y: 2.02, w: CW, h: 0.36, margin: 0, align: "center",
    fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3
  });
  s.addText(what.toUpperCase(), {
    x: M + 0.7, y: 2.42, w: CW - 1.4, h: 1.5, margin: 0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 31, bold: true, color: WINE, lineSpacing: 38
  });
  s.addText("HERE", {
    x: M, y: 4.0, w: CW, h: 0.36, margin: 0, align: "center",
    fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3
  });
  s.addText(note, {
    x: M + 1.0, y: 4.42, w: CW - 2.0, h: 0.62, margin: 0, align: "center", valign: "top",
    fontFace: BODY, fontSize: 12, italic: true, color: DIM, lineSpacing: 16
  });
  footer(s, dayLabel);
  return s;
}

/* ============================================================
   1 — TITLE
   ============================================================ */
{
  const s = darkSlide();
  newRec("cover", "The Mo's Training Regiment", "Ten days, in the order we teach them.", "Mo's A Place For Steaks · Greenwood, Indiana · Est. 1999");
  s.addText("The Mo's", {
    x: M, y: 1.72, w: CW, h: 0.9, margin: 0,
    fontFace: HEAD, fontSize: 46, color: "E8D6C8"
  });
  s.addText("Training Regiment", {
    x: M, y: 2.5, w: CW, h: 1.1, margin: 0,
    fontFace: HEAD, fontSize: 62, bold: true, color: CREAM
  });
  s.addText("Ten days, in the order we teach them.", {
    x: M, y: 3.66, w: CW, h: 0.42, margin: 0,
    fontFace: BODY, fontSize: 18, color: "E8D6C8"
  });
  s.addShape(pres.ShapeType.rect, {
    x: M, y: 4.32, w: 2.1, h: 0.035, fill: { color: GOLD }, line: { width: 0 }
  });
  s.addText("Mo's A Place For Steaks  ·  Greenwood, Indiana  ·  Est. 1999", {
    x: M, y: 4.62, w: CW, h: 0.34, margin: 0,
    fontFace: BODY, fontSize: 12.5, color: "C9A99A"
  });
  s.addNotes("Day-one deck. Runs alongside The Mo's Book in the app. Placeholder slides are the shot list — we fill them as the material comes in.");
}

/* ============================================================
   2 — HOW TO USE IT
   ============================================================ */
{
  const s = page("How to use this", "Read it in order. The order is the lesson.");
  cards(s, [
    ["Ten days", "the original plan",
      "This follows the Mo's Training Itinerary that opened the restaurant — same days, same order, because that order was right. About eighteen hours of material when it ran live."],
    ["The book is the long version", "the app is the live one",
      "Every day here has a full chapter in The Mo's Book. Prices, specials and schedules move — the app keeps up. The deck teaches you how to think."],
    ["Blank slides are the plan", "not a gap",
      "Where a photo or a handout is missing you will find a slide asking for it by name. Those get filled in. Nothing here pretends to be finished when it is not."]
  ], { cols: 3, top: 1.72, h: 2.5 });
  pullNote(s, "One idea runs the building:",
    "leave people better than you found them. Every rule in this deck is that idea wearing work clothes.", 4.52);
}

/* ============================================================
   3 — CONTENTS
   ============================================================ */
{
  const s = page("Contents", "The original itinerary, front to back");
  blk("toc", null);
  const L = {
    items: [
      "Day 1 — Orientation",
      "Day 2 — Appetizers, Salads and Soups",
      "Day 3 — Surf and Turf and the Prime Cuts",
      "Day 4 — Alternatives, Accessories and Desserts",
      "Day 5 — The Menu Test and the Points of Passion Test"
    ]
  };
  const R = {
    items: [
      "Day 6 — Steps of Service",
      "Day 7 — Opening, Closing, and Toast",
      "Day 8 — Mock Serves",
      "Day 9 — Wine and Spirits",
      "Day 10 — Friends and Family Night"
    ]
  };
  const top = 1.78, gap = 0.5, w = (CW - gap) / 2;
  [[L, M, 1], [R, M + w + gap, 6]].forEach(([col, x, start]) => {
    col.items.forEach((t, i) => {
      const y = top + i * 0.62;
      disc(s, x, y, start + i, { d: 0.44, fs: 14 });
      s.addText(t, {
        x: x + 0.6, y, w: w - 0.6, h: 0.44, margin: 0, valign: "middle",
        fontFace: BODY, fontSize: 14, color: INK
      });
    });
  });
  pullNote(s, "Before Day 1:",
    "how we speak. The words are the uniform of the sentence — learn them before you learn a single dish.", 5.05);
}

/* ============================================================
   4 — HOW WE SPEAK
   ============================================================ */
{
  const s = page("How we speak", "The verbiage that makes it fine dining. Never lie — reframe.");
  const items = [
    ["Never say", "“tough”", "Say", "“less tender” — a firmer bite, more chew, more flavor"],
    ["Never say", "“fatty”", "Say", "“richly marbled,” “buttery,” “decadent” — fat is treasure here"],
    ["Never say", "“cheap” or “expensive”", "Say", "“approachable,” “a great value” / “premium,” “our top shelf”"],
    ["Never say", "“I don't know”", "Say", "“Great question — let me find out for you,” then actually find out"],
    ["Never say", "“no problem”", "Say", "“my pleasure” or “absolutely”"],
    ["Never say", "“sold out”", "Say", "“we've sold through it tonight” — 86'd stays inside"],
    ["Never say", "“just checking in”", "Say", "“How is everything tasting for us?”"],
    ["Never say", "the guest is wrong", "Say", "“Let me get that closer to perfect for you”"]
  ];
  blk("swap", items.map(it => [it[1], it[3]]));
  const top = 1.66, rowH = 0.48, gap = 0.06;
  items.forEach((it, i) => {
    const y = top + i * (rowH + gap);
    s.addText(it[1], {
      x: M, y, w: 3.9, h: rowH, margin: 0, valign: "middle",
      fontFace: BODY, fontSize: 12.5, color: DIM, strike: true
    });
    s.addText("→", {
      x: M + 3.95, y, w: 0.35, h: rowH, margin: 0, valign: "middle", align: "center",
      fontFace: BODY, fontSize: 13, bold: true, color: GOLD
    });
    s.addText(it[3], {
      x: M + 4.35, y, w: CW - 4.35, h: rowH, margin: 0, valign: "middle",
      fontFace: BODY, fontSize: 12.5, bold: true, color: WINE
    });
  });
  pullNote(s, "And always:",
    "they are guests, never customers. We prepare food, we do not make it. A dish is plated. Describe texture and feeling — “it melts,” “it crackles,” “the sauce clings.”", 5.98);
}

/* ============================================================
   DAY 1
   ============================================================ */
const D1 = "Day 1 — Orientation";
divider(1, "Orientation", "Introductions, the Points of Passion, why we do things our specific way, onboarding paperwork, and the vocabulary. About three hours.");

{
  const s = page("Welcome to Mo's", "The house philosophy, straight from the handbook", D1);
  blk("quote", ["Service and products above and beyond the guest's expectations — every employee, chef to coat check, taking pride in every action, so each guest leaves with a positive memory of the Mo's Experience.", "Restaurants that project the million-dollar image make better profits and stand up to the finest competition. We are that restaurant on the south side."]);
  s.addText(
    "Service and products above and beyond the guest's expectations — every employee, chef to coat check, taking pride in every action, so each guest leaves with a positive memory of the Mo's Experience.",
    { x: M, y: 1.62, w: CW, h: 0.86, margin: 0, fontFace: HEAD, fontSize: 17, italic: true, color: WINE, lineSpacing: 25 }
  );
  s.addText(
    "Restaurants that project the million-dollar image make better profits and stand up to the finest competition. We are that restaurant on the south side.",
    { x: M, y: 2.5, w: CW, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, color: DIM, lineSpacing: 17 }
  );
  cards(s, [
    ["Chef Miguel Garatachea", "Executive Chef", "Leads the kitchen. Use his name when you pitch the food — it adds weight."],
    ["Mike Pavey", "General Manager", "Shift switches go through the GM only."],
    ["Craig DeVaney", "Assistant GM", "Second in the building."],
    ["Lillian Speedy", "Director of HR", "Books every banquet in the building."]
  ], { cols: 4, top: 3.18, h: 1.55, bodyFs: 10.5 });
  pullNote(s, "Lineup is 4:15 every day.",
    "Manager on duty covers teams, floor plan, need-to-knows, soup of the day, specials, and recent reviews. Be there, in uniform, ready.", 4.95);
}

{
  const s = page("The Points of Passion", "The culture, one through eight. Learn them as ideas, not flash cards.", D1);
  rows(s, [
    ["1", "1% Less Is The New Standard. ", "Settle for 1% less each week for a year and you run a restaurant at 48% of expectations."],
    ["2", "Applied Knowledge Is Power. ", "Not how smart you are — how you use it. Preparation creates confidence, and confidence is power."],
    ["3", "Every Table, Every Time. ", "Skipping even one step robs that guest of a true Mo's experience."],
    ["4", "Protect Your Environment. ", "This is your house. Your job is only as good as you make it."],
    ["5", "Proactive vs Reactive. ", "See what could happen and stay ahead of it. Reactive people are looking for a paycheck."],
    ["6", "Customized Service. ", "“Happy 23rd Anniversary” beats “Happy Anniversary.” No matter how big we grow."],
    ["7", "Pennies, Nickels & Dimes. ", "Act like the owner. Pull the ramekin out of the trash. Sell the desserts. It all adds up."],
    ["8", "Accountability. ", "Own your actions and your lack of action. Fear of conflict has no place here."]
  ], { top: 1.62 });
}

{
  const s = page("The Points of Passion", "Nine through sixteen", D1);
  rows(s, [
    ["9", "Building Relationships. ", "Guest, then Regular, then VIP, then Friend. Level four is a guest for life."],
    ["10", "Follow The Recipe. ", "Not your way, not another place's way — the Mo's A Place For Steaks way."],
    ["11", "Integrity. ", "What you do when nobody is watching."],
    ["12", "Twice As Long To Do It Wrong. ", "Do it right the first time. Laziness only leads to doing it again."],
    ["13", "Locked On. ", "The restaurant is a living machine we can only drive when locked on to every part of it."],
    ["14", "Good vs Great. ", "Good gets no complaints and no compliments. Great gets remembered and returned to."],
    ["15", "Be Hard On The Standard, Not The Person. ", "Protect the standard. Never take it personally. No excuses."],
    ["16", "“They Weren't Ready For Us.” ", "With preparation and pride we should be able to say this after EVERY shift."]
  ], { top: 1.62 });
}

{
  const s = page("Why we do things our specific way", "Follow The Recipe is the point that explains all the others", D1);
  twoCol(s,
    {
      head: "Everything here was tested on real guests",
      items: [
        "The greet script, the bread rule, the two-bite checkback, the way a tower gets stacked — none of it is arbitrary. It worked, repeatedly, before it became the standard.",
        "When you improvise past the recipe, you are gambling the guest's night on a hunch."
      ]
    },
    {
      head: "And when the recipe is genuinely wrong",
      items: [
        "It goes up to a manager.",
        "The recipe changes for everyone.",
        "The new way becomes the standard.",
        "That is how a restaurant gets better without falling apart."
      ]
    },
    { top: 1.72, fs: 13 });
  pullNote(s, "The short version:",
    "improvising alone is a gamble. Improving the recipe for everybody is the job.", 5.4);
}

{
  const s = page("Onboarding paperwork", "Handled with a manager on your first day — but know what is coming", D1);
  cards(s, [
    ["Form I-9", "within 3 business days", "Federal. Bring documents proving identity and work eligibility."],
    ["New-hire reporting", "state requirement", "Name, address, Social Security number. It is the law, not a preference."],
    ["Form W-4", "withholding", "Sets what comes out of every check."],
    ["120 days", "probationary", "Everyone's first 120 days. After that, discipline runs verbal, written, termination — serious offenses skip steps."],
    ["Every other Wednesday", "payday", "The pay period runs Wednesday through Tuesday."],
    ["The full handbook", "required reading", "Harassment policy, leave, safety, dress code, house rules. It lives in the app under How We Work."]
  ], { cols: 3, top: 1.72, h: 1.75 });
}

placeholder(D1, "the printed onboarding packet",
  "Every page a new hire signs, in order — so this chapter can name them instead of describing them.", "Document");

{
  const s = page("Vocabulary — service and etiquette", "The words the original sheet called vernacular", D1);
  twoCol(s,
    {
      items: [
        "Mise en place (meez-on-PLAHSS) — everything in its place. Preparing and organizing before service.",
        "Course — one part of a multi-dish meal: appetizer, main, dessert.",
        "Crumber / crumbing down — removing crumbs between courses. Your crumber is part of the uniform.",
        "Marking the table — setting the flatware and glassware the next course needs.",
        "Clearing — removing dishes in a specific order, from the guest's right side."
      ]
    },
    {
      items: [
        "Pivot point system — seat numbering that tracks every order to the right guest without asking.",
        "Silent service — non-intrusive serving: discretion and minimal noise.",
        "Coursing — timing dishes so guests receive each course in sync.",
        "Refire — re-cooking or remaking a dish that was incorrect or returned.",
        "Fine dining cadence — the rhythm and pacing of the meal. You control the tempo."
      ]
    },
    { top: 1.72, fs: 12.5 });
}

{
  const s = page("Vocabulary — beverage service", "", D1);
  twoCol(s,
    {
      items: [
        "Sommelier (suh-mel-YAY) — wine steward; expert in pairing and service.",
        "Decanting — pouring wine into a decanter to aerate it and separate sediment.",
        "Varietal — the grape a wine is made from: Merlot, Chardonnay.",
        "Vintage — the year the grapes were harvested.",
        "Body — the weight or fullness of a wine: light, medium, full."
      ]
    },
    {
      items: [
        "Finish — the taste that lingers after the swallow.",
        "Aperitif — a drink before the meal, to open the appetite. Digestif — after, to settle it.",
        "Neat / up / on the rocks — no ice; chilled and strained; over ice.",
        "Flight — a set of wines or spirits served together for tasting.",
        "Corkage fee — the fee for opening a bottle the guest brought in."
      ]
    },
    { top: 1.6, fs: 12.5 });
}

{
  const s = page("Vocabulary — kitchen and culinary", "", D1);
  twoCol(s,
    {
      items: [
        "Sous chef / chef de partie / garde manger — second in command, station chef, cold-station chef.",
        "À la carte — ordering individual dishes. Prix fixe (pree-FEEKS) — a fixed-price set menu.",
        "Degustation / tasting menu — a multi-course showcase of the chef's specialties.",
        "Reduction — simmering a liquid down to concentrate its flavor.",
        "Emulsion — two unblendable liquids made one: vinaigrette, hollandaise."
      ]
    },
    {
      items: [
        "Sous vide (soo-VEED) — cooking vacuum-sealed food at precise low temperature. Our Caesar egg gets an hour of it.",
        "Blanch / sear / poach / braise — the everyday fine-dining methods.",
        "Roux (ROO) — butter and flour, the classic thickener. It is why “cream soup” so often means gluten.",
        "Umami — the fifth taste: savory, rich depth. Dry-aged beef, bonito, mushrooms.",
        "Mirepoix (meer-PWAH) — onion, carrot, celery. The start of most stocks and soups."
      ]
    },
    { top: 1.6, fs: 12.5 });
}

{
  const s = page("Vocabulary — the floor and the house", "", D1);
  twoCol(s,
    {
      head: "Hospitality",
      items: [
        "Guest recovery — correcting a mistake so gracefully it becomes a good memory.",
        "Anticipatory service — seeing the need before the guest asks.",
        "Upselling — guiding the guest to what genuinely improves their night, never pushing.",
        "Table maintenance — the quiet resetting that keeps a table beautiful mid-meal.",
        "Body language awareness — reading and mirroring the guest's cues."
      ]
    },
    {
      head: "Common terms",
      items: [
        "Brigade — the structured hierarchy of kitchen and service staff.",
        "FOH / BOH — front of house and back of house.",
        "86'd — out of stock or unavailable. Inside word only.",
        "Fire / pick up / hands — start a dish, it is ready, someone run it.",
        "Expo — the expediter coordinating between kitchen and servers.",
        "Checkback / two-bite rule — return within two bites to make sure the course is right."
      ]
    },
    { top: 1.6, fs: 12 });
}

/* ============================================================
   DAY 2
   ============================================================ */
const D2 = "Day 2 — Appetizers, Salads and Soups";
divider(2, "Appetizers, Salads and Soups", "Dish descriptions, allergens to be aware of, presentation examples, common alterations, and serving utensils.");

{
  const s = page("How to learn any dish", "The itinerary asks five questions of every dish. They are the right five.", D2);
  cards(s, [
    ["What is it", "", "Ingredients and preparation, in words that sell."],
    ["What are the allergens", "", "The flags that keep a guest safe."],
    ["How is it presented", "", "Plate, setup, and any show that comes with it."],
    ["What can change", "", "The alterations the kitchen will actually do."],
    ["What does it need", "", "The serving utensil that goes down with it."]
  ], { cols: 5, top: 1.72, h: 1.85, headFs: 13, bodyFs: 11 });
  pullNote(s, "Two rules sit above every allergen answer:",
    "the fryer is shared — one fryer, avocado oil, everything fried touches it. And the protocol is never optional: ask what kind of allergy, ring it in Toast, tell your back server, expo, the chef and a manager. The chart guides; the chef confirms.", 4.0);
  blk("shout", "Never guarantee anything from a study sheet.");
  s.addText("Never guarantee anything from a study sheet.", {
    x: M, y: 5.05, w: CW, h: 0.4, margin: 0, align: "center",
    fontFace: HEAD, fontSize: 17, bold: true, italic: true, color: WINE
  });
}

{
  const s = page("Starters", "What it is, and the flag that matters most", D2);
  rows(s, [
    ["•", "Crispy Ahi Tuna Bites  $18  ", "Sushi rice, avocado, ponzu, cilantro, jalapeno. Metal chopsticks. The ponzu is built on regular soy — NOT gluten-free no matter how light it reads."],
    ["•", "Seasonal Oysters  $25  ", "Half shell, dry-ice smoke pouring out of the middle. Oyster fork, Tabasco, Zesta crackers, cocktail forks preset — no tongs. Crackers ride the setup: pull them for gluten."],
    ["•", "Calamari  $17  ", "Never frozen, so it never turns chewy. Kung pao is a nut sauce — treat it as BOTH peanut and tree nut. Any nut allergy is a full stop."],
    ["•", "Shrimp Cocktail  $26  ", "U-6 tiger shrimp — under six to a pound. Peeled by hand. Worcestershire in the sauce carries anchovy: a fish allergy needs to hear about it."],
    ["•", "Goat Cheese Spread  $17  ", "Goat, cream and ricotta whipped with basil and rosemary, pistachios, honey drizzled at the table. Dairy, gluten, tree nuts. Spreading knife."],
    ["•", "Crab Cake  $18  ", "Maryland style, 95% crab — the selling point writes itself. Egg, Dijon and mayo binder, panko, plated over the remoulade. Spatula."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("Starters", "The rest of the list", D2);
  rows(s, [
    ["•", "Creamy Spicy Crab Dip  $22  ", "Jumbo lump and colossal crab in cream cheese and ricotta, baked bubbly. Menu marks GF — but the chips come out of the shared fryer."],
    ["•", "Prime Meatballs  $16  ", "We grind filet, ribeye and strip trim in house every day. Hot ceramic dish, house marinara, melted provolone."],
    ["•", "Wagyu Tacos  $25  ", "A5 sliced thin and flash-seared in a crispy wonton shell, chimichurri, balsamic pearls that pop like caviar. Balsamic glaze is the sauce. Tongs."],
    ["•", "A5 Nigiri  $35  ", "Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks. Metal chopsticks. Trace alcohol in the reduction."],
    ["•", "King Crab Legs  market price  ", "Melted butter and cocktail sauce. Cocktail forks, tongs, butter warmer with clarified butter. ALWAYS quote Toast, never memory."]
  ], { top: 1.62, fs: 12.5, bottom: 5.3 });
  pullNote(s, "The lounge menu:",
    "Filet Sliders $18 · Carne Asada Nachos $25 · Prime Beef Burger $23 · French Dip Egg Rolls $15 · Chicken Parm Sandwich $24 · Tuna Poke $29 — and that poke hides shellfish, the calamari salad is in it.", 5.35);
}

placeholder(D2, "every starter, plated",
  "One straight-down shot per dish with its real setup beside it. These are the shots that make the deck teach on its own.");

{
  const s = page("The Towers", "The two biggest tables you will ever run", D2);
  const top = 1.7;
  [["Iced Seafood Tower", "Semi-Pro $98  ·  Baller $190",
    ["Semi-Pro: 6 oysters, 3 shrimp, about a half pound of king crab legs, plus the blackened ahi tuna salad and the lobster salad on brioche.",
      "Baller: everything doubled — 12 oysters, 6 shrimp, about a pound of crab. The two salads come with both and stay the same size.",
      "Service: cocktail forks preset, butter warmer with a tealight, clear the top tier once it finishes to open up the table.",
      "The crackers, brioche and wontons all ride separate — hold those three and the tower itself goes gluten-free. That fact wins tables."]],
  ["Roasted Seafood Tower", "Semi-Pro $98  ·  Baller $190",
    ["King crab legs, scallops, lobster meat, shrimp and mussels tossed in diavolo.",
      "The seafood-butter sauce pooling at the bottom is the good stuff: garlic butter, lobster stock, parsley, a touch of house marinara.",
      "Stacking rack in the base, stacked at the table over a black linen, cocktail forks preset, butter warmer with a tealight.",
      "HALFWAY through: clear shells and stir the pasta setup into that remaining sauce. The house calls it capavetti pasta. Do not skip it — it is why the tower feels like $190."]]
  ].forEach(([name, price, lines], i) => {
    blk("cards", [[name, price, lines.join(" ")]]);
    const w = (CW - 0.5) / 2, x = M + i * (w + 0.5);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: top, w, h: 4.28, rectRadius: 0.08,
      fill: { color: SAND }, line: { color: "E4D8C0", width: 1 }
    });
    s.addText(name, {
      x: x + 0.24, y: top + 0.18, w: w - 0.48, h: 0.36, margin: 0,
      fontFace: HEAD, fontSize: 17, bold: true, color: WINE
    });
    s.addText(price, {
      x: x + 0.24, y: top + 0.56, w: w - 0.48, h: 0.28, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: GOLD
    });
    s.addText(lines.map((t, j) => ({
      text: t, options: { bullet: { indent: 13 }, breakLine: j < lines.length - 1 }
    })), {
      x: x + 0.24, y: top + 0.94, w: w - 0.48, h: 3.2, margin: 0, valign: "top",
      fontFace: BODY, fontSize: 11.5, color: INK, lineSpacing: 15, paraSpaceAfter: 7
    });
  });
  blk("shout", "The roasted tower belongs to the back server, start to finish.");
  s.addText("The roasted tower belongs to the back server, start to finish.", {
    x: M, y: 6.12, w: CW, h: 0.36, margin: 0, align: "center",
    fontFace: HEAD, fontSize: 15, bold: true, italic: true, color: WINE
  });
}

placeholder(D2, "both towers, stacked at a table",
  "Iced and roasted, shot from guest height — plus the capavetti pasta moment mid-service.");

{
  const s = page("Soups", "One soup of the day per shift, complimentary with entrees", D2);
  rows(s, [
    ["•", "The system.  ", "One soup a day, comp with entrees — or the guest upcharges $4 to lobster bisque or baked French onion. Bisque is on every day."],
    ["•", "Lobster Bisque  $11.  ", "Lobster stock built into a roux with tomato, white wine and sherry vinegar. Shellfish, gluten, dairy, alcohol, nightshade."],
    ["•", "Baked French Onion  $13.  ", "Vidalia caramelized in butter, deglazed with red wine, beef bone stock built over 48 to 72 hours. Brown crock, herb crouton, provolone broiled brown and bubbly."],
    ["•", "Prime Beef Chili  off right now.  ", "House chili paste of guajillo, ancho and chipotle. The beer deglaze means gluten — the alcohol cooks off, the gluten stays. Probably back for winter."],
    ["•", "Bread rides with every soup and salad.  ", "French bread with garlic-salt butter plus smooth whipped butter, and cracked pepper offered EVERY time after the drop."],
    ["•", "Timing.  ", "Pour soups only after all the salads are trayed — soup skins over while salad waits."]
  ], { top: 1.62, fs: 12, bottom: 5.92 });
  pullNote(s, "Verify the exact soup before answering any allergen question.",
    "It changes every shift. Never answer from memory.", 6.0);
}

{
  const s = page("Salads and dressings", "", D2);
  rows(s, [
    ["•", "House Salad  $7.  ", "Romaine mix, carrots, cucumbers, cherry tomatoes, red cabbage, croutons. The red cabbage is in the mix and cannot be removed — say so first. House ranch runs mayo and buttermilk: egg and dairy, plus a touch of MSG."],
    ["•", "Gem Caesar  $15.  ", "The dressing is the story: an egg cooked sous vide a full hour, blended in with the yolk still runny, so it comes out extra creamy. Bonito is in the dressing — the fin fish flag stays even with no anchovies. White anchovies are a free optional side."],
    ["•", "Roasted Pear Salad  $16.  ", "Arugula, roasted pear, Gorgonzola, candied walnuts, dried cherries, maple balsamic. Dairy and tree nuts."],
    ["•", "Chopped Wedge  $15.  ", "Blue cheese, bacon, marinated tomatoes. Blue cheese dressing is usually mayo-based — that is egg; confirm when it matters."]
  ], { top: 1.62, fs: 12, bottom: 5.58 });
  pullNote(s, "The dressing list:",
    "House Vinaigrette (whole-grain mustard) · Orange · Balsamic · Maple Balsamic · Italian · French · Blue Cheese · Oil & Vinegar · Thousand Island · Caesar · Peppercorn Ranch.", 5.65);
}

{
  const s = page("Serving utensils", "The quick table. Get this wrong and the whole setup reads amateur.", D2);
  cards(s, [
    ["Cocktail fork", "goes down BEFORE the food", "Shrimp cocktail, king crab legs, oysters, both towers, the lobster tail add-on, the twin tails entree."],
    ["Tongs", "", "Calamari, tacos, tuna bites, asparagus, fries."],
    ["Spatula", "", "Scallops, crab cake."],
    ["Serving spoon", "", "Meatballs, crab dip, both mashes, risotto, corn, mac, au gratin, brussels, mushrooms. On the sprouts it rides in the bowl."],
    ["Spreading knife", "", "Goat cheese."],
    ["The full oyster setup", "no tongs, ever", "Oyster fork, Tabasco, Zesta crackers, cocktail forks, hot water."]
  ], { cols: 3, top: 1.72, h: 1.8, bodyFs: 11 });
}

/* ============================================================
   DAY 3
   ============================================================ */
const D3 = "Day 3 — Surf and Turf and the Prime Cuts";
divider(3, "Surf and Turf and the Prime Cuts", "Steak and seafood descriptions, allergens, presentation, alterations, serving utensils, tableside service and wagyu, off-menu items, and how to talk about specials.");

{
  const s = page("Temperatures", "The language of doneness", D3);
  const temps = [
    ["Blue rare", "cold red center"],
    ["Rare", "cool red"],
    ["Medium rare", "warm red — the house sweet spot"],
    ["Medium", "warm pink"],
    ["Medium well", "slight, hot pink"],
    ["Well done", "little to no pink"]
  ];
  blk("cards", temps.map(t => [t[0], "", t[1]]));
  const w = (CW - 0.18 * 5) / 6;
  temps.forEach((t, i) => {
    const x = M + i * (w + 0.18);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 1.72, w, h: 1.5, rectRadius: 0.06,
      fill: { color: i === 2 ? "F3E7E4" : SAND },
      line: { color: i === 2 ? WINE : "E4D8C0", width: i === 2 ? 2 : 1 }
    });
    s.addText(t[0], {
      x: x + 0.12, y: 1.9, w: w - 0.24, h: 0.6, margin: 0, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 14, bold: true, color: WINE
    });
    s.addText(t[1], {
      x: x + 0.12, y: 2.46, w: w - 0.24, h: 0.62, margin: 0, align: "center", valign: "top",
      fontFace: BODY, fontSize: 10.5, color: INK, lineSpacing: 13
    });
  });
  rows(s, [
    ["•", "Well-done filets get butterflied. ", "Offer it every time — it cooks faster and comes out juicier, and the guest hears you protecting their dinner instead of judging their order."],
    ["•", "Butter by default. ", "The kitchen can cook any steak completely butter-free for a dairy allergy. The guest just has to ask."],
    ["•", "Flashlight first. ", "Our dim dining room creates illusions of undercooked steak. Look before you carry it back."]
  ], { top: 3.5, rowH: 0.7, fs: 12.5 });
}

placeholder(D3, "each temperature, cut open",
  "Six cross-sections side by side, same cut, same lighting. Nothing teaches temps like a photo lineup.");

{
  const s = page("The Prime Cuts", "Filet through tomahawk", D3);
  rows(s, [
    ["•", "Filet Mignon  6 oz $54 / 10 oz $79.  ", "Center cut, almost no marbling — you order it for pure tenderness. At medium rare it practically cuts with a fork. Rosemary Maldon salt to finish."],
    ["•", "Farbuckle Filet  6 oz $63 / 10 oz $87.  ", "The show filet, seared and finished at the table. Any cut can be Farbuckled for roughly a $9 upcharge."],
    ["•", "The PD  15 oz hand-cut filet, $115.  ", "On the printed menu; the house calls it the PD."],
    ["•", "Filet Duo  $47.  ", "Two 3 oz end-cut medallions — a touch more fat, and really ordered for the toppings: Crab Oscar on one, horseradish bleu cheese crust on the other."],
    ["•", "Dry Aged New York Strip  14 oz $58.  ", "The middle ground between ribeye and filet, with a fat cap that bastes as it renders. Dry aging concentrates a rich, nutty, beefy umami — tell the guest, it is the whole point of the steak."],
    ["•", "Delmonico Ribeye  16 oz $80.  ", "Named for the old New York steakhouse that made the style famous. Our most marbled prime cut. If they want an old-school steakhouse ribeye, this is it."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("The Prime Cuts", "The big ones", D3);
  rows(s, [
    ["•", "K.D.'s Tomahawk  32 oz $160.  ", "A ribeye that keeps the whole rib bone — K.D. is Kevin Dickey, a former owner. The bone lets marrow render into the meat, a butteriness you can only get this way."],
    ["•", "Australian Wagyu Filet  6 oz $95 / 10 oz $135.  ", "Australian cattle crossbred with Japanese wagyu — even one generation lifts the marbling. Wagyu fat melts lower, so it runs juicy at rare. The easy level-up for a filet person."],
    ["•", "Japanese A5 Wagyu  $25 an ounce.  ", "Kagoshima Prefecture. Learn it as a story, not a spec sheet — see the next slide."],
    ["•", "48 oz USDA Choice Porterhouse  $150.  ", "Not wagyu, and honest about it. About 26 oz of strip, 12 oz of filet, roughly a 10 oz bone. Two people split it for a manager-cut experience at a great value."],
    ["•", "Spinalis / Ribeye Cap  $14 an ounce, 6 oz minimum.  ", "The cap of the ribeye — rivals filet tenderness while keeping ribeye richness. Spinalis Sunday runs it at $10 an ounce."],
    ["•", "45-Day 22 oz Dry-Aged Bone-In Ribeye.  ", "Forty-five days of cold moving air pulls moisture out and concentrates the beef while enzymes soften the connective tissue. Deep, nutty, brown-butter richness."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("The A5 story", "This one you tell, you do not describe", D3);
  twoCol(s,
    {
      head: "What makes it A5",
      items: [
        "Japanese farmers can spend a lifetime chasing A5 grade. Generations of breeding go into cattle this rich.",
        "The stories are real selling points — cows kept calm and unstressed, classical music, no roaming so no fat burns off.",
        "But the diet is the real secret: grain only in the final months, rich in oleic acid."
      ]
    },
    {
      head: "What it is like to eat",
      items: [
        "The fat is so ready to melt that a fingertip drawn across the steak leaves a shine on your skin from body heat alone. That is why it is served rare to medium rare.",
        "Closer to bone marrow or butter than to steak — extremely soft, juices with every bite, a beefy richness unmatched by any cut in the city.",
        "A manager slices it tableside on a butcher's block with a Japanese knife, torch-finishes it with rosemary salt, and tells that story. Your job: a flawless setup and the Hanzo knives preset."
      ]
    },
    { top: 1.7, fs: 12.5 });
}

{
  const s = page("Surf and Turf", "", D3);
  cards(s, [
    ["Steak 47", "$58", "A 4 oz filet base topped with a scallop and a shrimp, chopped asparagus and lobster meat around the plate, hollandaise drizzled by expo. Upgrade math: any filet goes 47 style for its price plus the $25 topping — 6 oz is $79, 10 oz is $104."],
    ["Filet & Lobster", "$105", "A 6 oz filet off the charbroiler, upgradeable to 10 oz, with a 5 oz South African lobster tail steamed gently so it never turns chewy. Menu marks GF."],
    ["Filet & Scallops", "$82", "A 6 oz filet with two U-10 prosciutto-wrapped scallops, flash-seared hot and fast so they stay tender. The prosciutto means pork rides this plate."]
  ], { cols: 3, top: 1.72, h: 2.4, bodyFs: 11.5 });
  pullNote(s, "Every steak order is an enhancement conversation:",
    "Oscar it, 47 it, tail it, butter it, mushroom it. Asked warmly, it reads as generosity, not sales.", 4.42);
}

{
  const s = page("Enhancements", "The check builders", D3);
  const items = [
    ["Crab Oscar", "$14", "Snow crab, asparagus, hollandaise. GF-marked."],
    ["Steak 47 topping", "$25", "The answer to “what does the topping cost” is always $25."],
    ["Horseradish-bleu crust", "$4", "Melted bleu cheese crumbles, horseradish, herbs."],
    ["Bearnaise", "$2", "Egg and butter with a tarragon-shallot reduction. Herbier than hollandaise — and yes, really two dollars."],
    ["5 oz Lobster Tail", "$50", "Add to anything."],
    ["Two Scallops", "$14", "Added to any entree."],
    ["Brandy Peppercorn", "$6", "Demi-glace and brandy peppercorns."],
    ["Black Truffle Butter", "$6", "Steak finish."],
    ["Roasted Mushrooms", "$8", "Arrive in a small bowl with a big spoon — confirm with the guest, then scoop them over the steak."]
  ];
  cards(s, items, { cols: 3, top: 1.72, h: 1.62, headFs: 13.5, bodyFs: 10.5 });
}

{
  const s = page("Tableside service", "The shows", D3);
  cards(s, [
    ["The Farbuckle", "front and back run it together",
      "Ring the steak at the guest's temperature. Bring the sizzling skillet, tongs, gloves, tray, rosemary salt, beef tallow, warm butter. At the table: steaks into the skillet, let them work while you talk, butter them, tallow before pulling, finish with rosemary salt, serve."],
    ["A5 and Porterhouse", "the manager slices",
      "Butcher block, Japanese knife, honing iron, gloves, rosemary salt. The manager slices and tells the story. Your job is a flawless setup and the Hanzo knives preset. The porterhouse, the spinalis, the tomahawk and the A5 are all manager-cut tableside."],
    ["The smoke show", "+$3, huge reaction",
      "The Smoked Draft Old Fashioned and the Pittsburghed Peach can be smoked. The bartender builds it, you smoke it under the lid on your tray, and you lift the lid at the table. Cheap theater, big payoff."]
  ], { cols: 3, top: 1.72, h: 2.7, bodyFs: 11 });
  pullNote(s, "Mise en place is the whole job here.",
    "All the items a guest needs and none they don't. Presetting the next course sets the stage.", 4.72);
}

placeholder(D3, "every tableside setup, tray by tray",
  "Farbuckle tray, A5 board, smoke lid — shot before it goes to the table, so a new hire can copy it exactly.");

{
  const s = page("Off-menu and specials", "The cut board is not on the printed menu — that is why it works", D3);
  twoCol(s,
    {
      head: "The four that typically always run",
      items: [
        "48 oz USDA Choice Porterhouse — $150.",
        "Spinalis / Ribeye Cap — $14 an ounce, $10 on Spinalis Sunday.",
        "Australian Wagyu Tomahawk — 32 oz, $180.",
        "45-Day Dry-Aged Bone-In Ribeye — 22 oz.",
        "They live on the cut board, not the printed menu — mentioning them makes a guest feel like an insider."
      ]
    },
    {
      head: "How to talk about specials",
      items: [
        "Features go over BEFORE the full order is taken. Every table, every time.",
        "Lead with the story. Land the price with confidence. Never apologize for a number — describe until the number makes sense.",
        "Know the soup, the oysters, the 86'd items, the cut specials and the big features before you walk up. That is lineup material.",
        "Sold through? “We've sold through it tonight — here is what I'd go to instead.” Always arrive with the substitute already chosen."
      ]
    },
    { top: 1.7, fs: 12.5 });
}

placeholder(D3, "tonight's cut board",
  "The board as the guest would see it, plus each cut raw on the tray — the shot we re-take whenever the board changes.");

/* ============================================================
   DAY 4
   ============================================================ */
const D4 = "Day 4 — Alternatives, Accessories and Desserts";
divider(4, "Alternatives, Accessories and Desserts", "Dish descriptions, allergens, presentation, common alterations, serving utensils, and the dessert promos.");

{
  const s = page("Alternatives", "For the guest not having steak", D4);
  rows(s, [
    ["•", "Chicken Parmesan  $39.  ", "Hand-breaded fried breast, linguine, tomato diavolo, melted provolone, garlic bread. Newer, and built to be a crowd-pleaser."],
    ["•", "Primavera Pasta  $40.  ", "Linguine, wild mushrooms, spinach, peeled tomatoes, pesto cream. Our main vegetarian-style entree — point here instead of assembling side dishes. Pesto usually means nuts; treat a nut allergy accordingly until the chef clears it."],
    ["•", "Miso Seabass  $46.  ", "Patagonian toothfish sealed with white miso, mirin and sake for 48 to 72 hours, pan seared and broiler-finished. Coconut risotto, crispy sprouts. Sweet coconut against tangy miso is the whole pitch."],
    ["•", "Chilean Sea Bass  $46.  ", "The same noble fish, classic form: pan seared, lemon-caper white wine butter, asparagus, spinach, cherry tomato. The citrus cuts the richness — that is the idea. Menu marks GF."],
    ["•", "Blackened Creole Salmon  $42.  ", "Faroe Island salmon, raised in cold open water with no antibiotics — richer and firmer. Sweet potato puree, Holy Trinity relish, remoulade. Can be broiled or pan seared plain for a milder guest."],
    ["•", "Twin South African Lobster Tails  $100.  ", "Two 5 oz cold-water tails — colder water means fewer molts, so the meat stays more tender and sweeter. Butter warmer lit with clarified garlic butter, cocktail fork to the right of the silverware."]
  ], { top: 1.62, fs: 11.5 });
}

{
  const s = page("Accessories", "Every side is built to share — three to four sides for a table of six", D4);
  const sides = [
    ["Grilled Asparagus", "$15", "Garlic herb butter marinade, light char, hollandaise in a ramekin."],
    ["Creamed Corn", "$12", "Cream, dijon, horseradish, dill."],
    ["Creamed Spinach", "$16", "With roasted butternut squash. Marked with a small g — it does contain gluten."],
    ["Creamy Risotto", "$15", "Chicken stock, cream, Parmesan, crispy prosciutto, sundried tomatoes."],
    ["Baked Potato", "$11", "Salt-crusted russet. Cut it open and press it apart at the plate to show the steam; little knife left in. Loaded adds about $3 — and bacon makes it pork."],
    ["White Cheddar Mash", "$12", "Nearly equal parts butter — that is the secret. Truffle or wasabi for $3."],
    ["Truffle Cauliflower", "$14", "Pan-seared with shallots, folded with Alfredo and truffle oil."],
    ["Lobster Mac N' Cheese", "$26", "A roux built on lobster stock, white cheddar and Parmesan, broiled with panko. The biggest side upsell in the building."],
    ["Jalapeno Au Gratin", "$15", "Seedless jalapenos, russets, bacon, white cheddar. The bacon is mixed in each morning and cannot be removed."],
    ["Brussels Sprouts", "$15", "Roasted then flash-fried crispy, balsamic glaze. Serving spoon rides in the bowl."],
    ["Truffle Fries", "$11", "Tossed immediately with flaky salt, Parmesan, parsley, white truffle oil. A guest can get them plain — just ask."],
    ["Our house ranch", "the move", "Almost necessary on the fries, and maybe the best combination in the restaurant. Offer it."]
  ];
  cards(s, sides, { cols: 4, top: 1.66, h: 1.42, headFs: 12.5, bodyFs: 10 });
}

{
  const s = page("Desserts", "Walk up with a dessert menu in your hand — it doubles the yes", D4);
  rows(s, [
    ["•", "Mo's Cookie  $10.  ", "Cookie dough pressed into its own bowl, baked to order, pulled half-baked so the center stays gooey. Vanilla ice cream, Hershey's syrup over everything."],
    ["•", "Celebration Cake  $14.  ", "Five layers of technicolor vanilla with white chocolate mousse, strawberry drizzle, gummi bears — gelatin, worth a word with vegetarians."],
    ["•", "The Mo's Sundae  $15.  ", "Five to six scoops, cookie dough, Hershey's, Meyer's dark rum caramel, strawberry, fresh whipped cream. Rum caramel is the alcohol flag. It was the Kristen Sundae, then the Celebration Sundae, now the Mo's Sundae."],
    ["•", "NY Style Cheesecake  $10.  ", "Dense and rich on graham crust — the density is what makes it New York style."],
    ["•", "Bailey's Creme Brulee  $10.  ", "Custard spiked with Bailey's, raw demerara torched into a glassy shell you crack with the spoon."],
    ["•", "Colossal Carrot Cake  $14.  ", "Cream cheese icing, moist through from pineapple in the batter — that is where the pineapple flag comes from."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("Desserts", "The ones with a show", D4);
  cards(s, [
    ["Molten Lava Cake", "$13", "A chocolate dome over chocolate cake, strawberries, ice cream. Light the orange liqueur and chocolate sauce and pour it flaming over the dome — it melts away to reveal what is underneath. Menu marks it GF and flourless, but it still carries egg, dairy, soy and that liqueur."],
    ["Brown Butter Cake", "$14", "Browned butter and brown sugar are the whole flavor story. Warm, with vanilla ice cream, caramel and Granny Smith apple slices to cut the richness — and it rolls out with the dry-ice cloud, hot water poured over dry ice right in the bowl."],
    ["Cotton Candy", "$12", "Spun to order on a light-up stick, set in a black wooden block. Every color of the rainbow, all taste like sugar — tell the table “pick your color.” Pairs with Ruffino Moscato."],
    ["Bananas Foster", "$12 per person, minimum two", "The back server's show start to finish. Per person: one scoop of brown butter and half a banana, plus half an orange per two bananas. Melt the butter, coat the bananas, add the orange so nothing burns, pour the 99 Oranges over and light it, then sprinkle cinnamon into the fire and watch it spark."]
  ], { cols: 2, top: 1.72, h: 2.05, bodyFs: 11 });
  pullNote(s, "Also in the building:",
    "raspberry and lemon sorbet, dairy-free and off the menu, and pistachio gelato — dairy and tree nuts. Relay the flavors when a guest asks for something light.", 6.16);
}

{
  const s = page("The celebration machine", "Every celebrating table gets a free treat — their pick", D4);
  cards(s, [
    ["Celebration Sundae", "comp", "Ice cream in a large soup bowl with chocolate, caramel, and a sprinkle or two."],
    ["Comp Mo's Cookie", "comp", "The chocolate gets poured by the server, at the table."],
    ["We do NOT sing", "we light a sparkler", "Pull the spent sparkler with a black linen, and hold the ice cream down with the serving spoon so it does not come along for the ride."]
  ], { cols: 3, top: 1.72, h: 2.0 });
  pullNote(s, "The dessert course is also the after-dinner drink course.",
    "Port, espresso martinis, the Esso Affo, the Coco Caramel Carajillo. Day 9 covers them — sell them together.", 4.05);
  blk("shout", "Every celebration gets a sparkler. Sing only if you want to.");
  s.addText("Every celebration gets a sparkler. Sing only if you want to.", {
    x: M, y: 5.12, w: CW, h: 0.4, margin: 0, align: "center",
    fontFace: HEAD, fontSize: 17, bold: true, italic: true, color: WINE
  });
}

placeholder(D4, "every dessert and every show",
  "The lava cake mid-pour, the dry-ice cloud, the sparkler, Bananas Foster on fire. These sell dessert before you open your mouth.");

/* ============================================================
   DAY 5
   ============================================================ */
const D5 = "Day 5 — The Tests";
divider(5, "The Menu Test and the Points of Passion Test", "Menu review and questions, then testing over the menu and the Points of Passion.");

{
  const s = page("Testing is real here", "The house graded menu tests at opening and still expects the knowledge", D5);
  twoCol(s,
    {
      head: "What the test reaches for",
      items: [
        "Dish builds and prices. Allergen flags.",
        "The sixteen Points of Passion — by idea, not by number.",
        "Steak temps and cuts. The comp soup system.",
        "Timing standards: soups, salads and desserts in five to seven minutes with ten the max; entrees in twenty-two to twenty-seven.",
        "The tip-out math, the rooms, the wine list, the cocktail builds."
      ]
    },
    {
      head: "How to actually pass it",
      items: [
        "The real 30-question menu test lives in the app with corrected answers.",
        "The Study tab is the practice room: a 150-question bank, a fresh Today's Ten every day, timed price drills, garnish matching, wine identification, step-order games.",
        "The habit that works: Today's Ten every day before shift, plus one topic lane you feel weak in.",
        "Ten minutes a day and the test takes care of itself."
      ]
    },
    { top: 1.72, fs: 12.5 });
  pullNote(s, "On the Points of Passion:",
    "if you can explain 1% Less, Customized Service, and They Weren't Ready For Us in your own words, you are ready.", 5.4);
}

/* ============================================================
   DAY 6
   ============================================================ */
const D6 = "Day 6 — Steps of Service";
divider(6, "Steps of Service", "Isaac's non-negotiables, the steps of service handouts, and walking the steps.");

{
  const s = page("Isaac's Non-Negotiables", "The sheet is famous in this building. Learn every line.", D6);
  rows(s, [
    ["1", "Good enough is not good enough. ", "The difference between A decision and THE RIGHT decision is 1% effort and 99% dedication to the standard — and they are never the same decision."],
    ["2", "Respect the guest's personal space. ", "No elbows in the face, no bumping the chair. When in doubt: “pardon my reach.” No clanking silverware behind their ear, no stacking plates tableside."],
    ["3", "Guest right of way. ", "Their time is more valuable than ours. If a guest moves out of YOUR way, you failed."],
    ["4", "Every guest is everybody's guest. ", "Hospitality is a lifestyle you do not turn off. When one of OUR guests needs something, that beats sections and roles."],
    ["5", "Water and wine — pouring their own is not fine. ", "They can do that at home for free. This is not even hospitality, it is a step of service."],
    ["6", "Your uniform is a step of service. ", "Uniformity is king. Preparation is a step of service. Hygiene is a step of service."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("Isaac's Non-Negotiables", "Seven through eleven", D6);
  rows(s, [
    ["7", "Sales is the art of guiding the guest ", "to the decision that best enhances THEIR experience. Value is perception — sales is the trust that the idea is worth what they spend."],
    ["8", "Mise en place. ", "Everything in its place. ALL the items a guest needs and NONE they don't. Presetting the next course sets the stage. Presentation is half of what we taste."],
    ["9", "You never get a second chance at a first impression. ", "A few early misses and the guest starts looking for flaws — give them a reason to look for excellence instead."],
    ["10", "Information is a step of service. ", "Features, 86s, the host's tip that it is their anniversary, the deathly allergy. Arm yourself and your guest with what perfection requires."],
    ["11", "Smile. ", "You are always on stage. It is the easiest, fastest way to put a guest at ease — and it is free."]
  ], { top: 1.62, fs: 12.5, bottom: 5.5 });
  pullNote(s, "How a table starts:",
    "busser drops the waters → front server greets, drinks and apps → the BACK server drops the soup or salad and introduces themselves right there → entrees land coursed, never stacked → checkback two to five minutes after entrees.", 5.62);
}

{
  const s = page("The steps — front server", "Before you walk up, and the first three moves", D6);
  rows(s, [
    ["•", "Before you walk up. ", "Lineup at 4:15 covered teams, floor plan, soup, specials, reviews. Know the soup, the oysters, the 86'd items, the cut specials, the features, and two easy cocktail recommendations. Know the allergy protocol cold. Know the timing."],
    ["•", "The greet. ", "Your name and your back server's name. First time in? Celebrating anything? Allergies? Would you like the wine list? Point to cocktails, beer, wine, whiskey. Warm and short."],
    ["•", "Drinks first. ", "Get them started quickly. Unsure guests get two confident choices. Wine bottles: you set the glasses, and a MANAGER opens and pours at the table, every time. Over $250 also gets the big Bordeaux glasses."],
    ["•", "Appetizers. ", "Recommend two or three with confidence: shrimp cocktail, calamari, crispy ahi tuna bites, oysters, or a tower. Send them fast and tell your back server. Apps buy you time — but course the rest."],
    ["•", "Soup, salad and bread. ", "Bread always rides with soups and salads. Cracked pepper offered every single time. The course order never changes: apps, then soups and salads, then entrees."]
  ], { top: 1.62, fs: 12 });
}

{
  const s = page("The steps — front server", "The order through the close", D6);
  rows(s, [
    ["•", "The order. ", "Hit the key items, not a speech. Steak temps, butterfly the well-done filet, sides and enhancements. Take the full order and course it out. Features before the full order. Every special request gets confirmed with the chef — every single one."],
    ["•", "Checkbacks. ", "Every course. Entree checkback at two to five minutes: “Is everything tasting perfect for us?” A halfhearted answer means something is wrong — pry gently and fix it now. Problems caught at checkback are comps that never happen."],
    ["•", "Work with your back server. ", "You are the table lead; the back keeps it moving. Write the dinner ticket neatly and hand off the white copy. Help on big tables, Farbuckles, A5s, towers. Salad clear is the moment to ask about a second bottle."],
    ["•", "Dessert and close. ", "Menu in hand. After-dinner drinks in the same breath. Busy nights the check rides with dessert. Gift cards live at the BAR TOP, not the host stand. If anything went sideways tonight, fix it before the check. Thank them by name."]
  ], { top: 1.62, fs: 12, rowH: 1.05 });
}

{
  const s = page("The back server's night", "Organization equals speed", D6);
  twoCol(s,
    {
      head: "The rhythm",
      items: [
        "Drop B&B plates after the greet.",
        "Run and clear apps — always carry a tray, there is always something to grab.",
        "Crumb the table, tell your front when apps are clear.",
        "Pour soups only when the salads are trayed. Salads down means pepper mill up.",
        "Clear and mark in one trip.",
        "Talk timing with expo — a slow table needs entrees held, so say so."
      ]
    },
    {
      head: "The details that separate you",
      items: [
        "Entrees down, tell the front so the two-bite checkback lands on time.",
        "Box away from the guest: everything boxed, bagged, bag on your arm, tray to dish — set the bag down while you dump so you never forget it.",
        "Drop dessert menus and give the dessert talk yourself when the front is buried.",
        "Desserts ordered: mark with B&Bs and dessert spoons. Bananas Foster means warning your front you are about to be tied up.",
        "Start every shift talking with your front: who handles what, and get on the same page about seat numbers."
      ]
    },
    { top: 1.7, fs: 12 });
}

{
  const s = page("Bar-top standards", "The same religion, faster", D6);
  const clocks = [
    ["60 seconds", "greet"],
    ["2 minutes", "water and menus"],
    ["5 minutes", "first drink"],
    ["12 minutes", "apps, or you flag it"]
  ];
  blk("cards", clocks.map(c => [c[0], "", c[1]]));
  const w = (CW - 0.3 * 3) / 4;
  clocks.forEach((c, i) => {
    const x = M + i * (w + 0.3);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 1.72, w, h: 1.28, rectRadius: 0.06,
      fill: { color: WINE }, line: { width: 0 }
    });
    s.addText(c[0], {
      x: x + 0.1, y: 1.86, w: w - 0.2, h: 0.56, margin: 0, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 24, bold: true, color: CREAM
    });
    s.addText(c[1], {
      x: x + 0.1, y: 2.42, w: w - 0.2, h: 0.42, margin: 0, align: "center", valign: "top",
      fontFace: BODY, fontSize: 11.5, color: "E8D6C8"
    });
  });
  rows(s, [
    ["•", "Talk to the guest about a delay. ", "Never hope they missed it."],
    ["•", "Serving order, always: ", "hot lady, hot man, cold lady, cold man. Announce every plate with its full specification and pull the temp picks."],
    ["•", "Clear within two minutes of a finished course, ", "never rushing, asking before blending courses."],
    ["•", "Ring soups-and-salads and entrees together — ", "a time gap is how coursing gets confused."],
    ["•", "Check stands tall in front of the guest, ", "run the card the second it hits the holster, names on the goodbye. Energy is everything behind a bar."]
  ], { top: 3.28, fs: 12, rowH: 0.58 });
}

placeholder(D6, "the original steps-of-service handout",
  "Front and back, word for word, so this chapter can quote the sheet instead of reconstructing it.", "Document");

/* ============================================================
   DAY 7
   ============================================================ */
const D7 = "Day 7 — Opening, Closing, and Toast";
divider(7, "Opening, Closing, and Toast", "Opening and closing task handouts, prep and table setup, polishing, ringing items, modifications, cashing out, gift cards, promo tabs, comps and voids, banquet ringing and count sheets, and seat numbers for everything.");

{
  const s = page("Opening the building", "The expo open is the model of what a real opening list looks like", D7);
  twoCol(s,
    {
      items: [
        "Check the book for covers.",
        "Bake bread for the day — three to five trays minimum, ready by 4:30.",
        "Polish the metal ramekins and expo silver.",
        "Chop parsley.",
        "Stock and label the to-go butters and sour creams."
      ]
    },
    {
      items: [
        "Stock every entree garnish.",
        "Check boxes and deli containers.",
        "Melt the drawn butter.",
        "Stock takeout under the cold line.",
        "Get the night's team list from the MOD."
      ]
    },
    { top: 1.72, fs: 13 });
  pullNote(s, "That is one position's open.",
    "Every position has one this specific. The server and busser handouts are the next thing we go get.", 4.6);
}

placeholder(D7, "the server and busser opening handouts",
  "Verbatim, so every position's open lives here the way expo's already does.", "Document");

{
  const s = page("Closing the building", "Nobody clocks out until side work is approved", D7);
  cards(s, [
    ["The back closer", "the sequence", "Bread oven and warmers off, pans and boards through dish, counters sanitized. Ramekin butters wrapped. Tea and coffee broken down. Soups to the window, lobster meat saved, cooler ice dumped and dried. Chocolate, ketchup, caramel, clarified butter and honey into dated deli containers."],
    ["The front team", "resets the section", "Sets and glassware. Five to ten wine glasses polished on a slow night, fifteen when busy. Twenty-five to forty napkin folds. Oyster napkins daily. Salt and pepper. Final reset for tomorrow."],
    ["The back team", "divides stations evenly", "Bread, soup, soda machine, tea, to-go, trays. Silverware racked, polished, stored — one full rack slow, two busy. The back closer takes trash, sweep, mop, dessert station, the chocolate, and the final walkthrough."]
  ], { cols: 3, top: 1.72, h: 3.0, bodyFs: 11 });
  pullNote(s, "House rule:",
    "side work divides equally, the team helps each other so everyone finishes together, and a manager approves before checkout.", 5.02);
}

{
  const s = page("Toast — ringing the night", "", D7);
  rows(s, [
    ["•", "Ring soups-and-salads and entrees together. ", "No time gap. That is how coursing gets confused."],
    ["•", "Every allergy gets ringed in. ", "Every modification gets attached to the right seat."],
    ["•", "Every special request is confirmed by a chef ", "before you promise it. Every single time."],
    ["•", "Gift cards sell at the bar top, ", "not the host stand. Walk the buyer over."]
  ], { top: 1.62, fs: 12.5, bottom: 3.92 });
  const money = [
    ["Toast withholds 2%", "of credit tips"],
    ["Tip-outs come off TEAM NET SALES", "bar 1% · busser 1.5% · expo 0.5% — each rounded UP to the next dollar. No expo scheduled means no expo line."],
    ["Comps come off team net before tip-outs", "promos do not · gift cards count in net sales"],
    ["Parties of six or more", "can take the auto-gratuity — you must tell the guest, always"],
    ["Banquets booked through Lillian", "run 23% auto-grat: twenty points plus her three as banquet coordinator. A big walk-in party on the regular menu is NOT a banquet."],
    ["Pool minus tip-outs is the team's", "split 50/50, back server takes the odd dollar. Polisher, when one exists, is a flat $10 per team, $5 solo."]
  ];
  s.addText("The money rules, locked", {
    x: M, y: 4.04, w: CW, h: 0.32, margin: 0,
    fontFace: HEAD, fontSize: 16, bold: true, color: WINE
  });
  cards(s, money, { cols: 3, top: 4.46, h: 1.28, headFs: 11.5, bodyFs: 9.5 });
}

placeholder(D7, "the gift card, promo tab and banquet sheets",
  "Card types and how each one rings, the promo tab procedure step by step, and the banquet count sheets. Ask the next time a banquet runs.", "Document");

{
  const s = page("Seat numbers for everything", "The original sheet says it in capitals, and so will we", D7);
  blk("shout", "SEAT NUMBERS FOR EVERYTHING");
  s.addText("SEAT NUMBERS FOR EVERYTHING", {
    x: M, y: 1.78, w: CW, h: 0.86, margin: 0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 40, bold: true, color: WINE, charSpacing: 2
  });
  twoCol(s,
    {
      head: "What the pivot point system does",
      items: [
        "A table of eight gets eight right plates without a single “who had the salmon?”",
        "Every position at the table has a number.",
        "Every item rings to its seat.",
        "Anyone can run any tray — that is the whole point."
      ]
    },
    {
      head: "What it takes from you",
      items: [
        "Agree on the pivot with your front server before the table sits, every shift.",
        "Ring modifications to the seat, not to the ticket.",
        "Write the ticket so someone who has never met the table can run it.",
        "On big tables this is the difference between a clean drop and an apology."
      ]
    },
    { top: 2.86, fs: 12.5 });
}

placeholder(D7, "the floor plan with table and seat numbers",
  "The pivot point for every table shape in the building. This is the biggest one on the list — when it lands, this chapter becomes a map instead of a promise.", "Document");

/* ============================================================
   DAY 8
   ============================================================ */
const D8 = "Day 8 — Mock Serves";
divider(8, "Mock Serves", "Front and back get paired for semi-full service with correct glasses and plates, full ticket ringing, and sticky notes on plates and glasses.");

{
  const s = page("Mock serves", "Dress rehearsal — the food is sticky notes and the standard is real", D8);
  twoCol(s,
    {
      head: "How it runs",
      items: [
        "A front and a back get paired and run real tables.",
        "Every step of Day 6 runs at full speed — greet, drinks in the correct glassware, apps on the correct plates, coursing, marking, clearing from the right, two-bite checkbacks.",
        "The ticket gets rung in Toast for real, seat numbers and all, so the kitchen screen looks exactly like a live Friday."
      ]
    },
    {
      head: "What good looks like",
      items: [
        "The pair moves like one person. The back knows the front's ticket without asking.",
        "Nobody reaches across a guest. Nobody's hands are empty leaving the room.",
        "The pepper gets offered after every drop.",
        "The sticky note that says “medium rare filet, seat 3” lands in front of seat 3 every time."
      ]
    },
    { top: 1.72, fs: 12.5 });
  pullNote(s, "Treat the mock table like a table that tips.",
    "The habits you build empty-handed are the ones that show up when it is full.", 5.4);
}

placeholder(D8, "the official mock-serve checklist",
  "If a printed one existed, so scoring matches the original standard instead of a manager's memory.", "Document");

/* ============================================================
   DAY 9
   ============================================================ */
const D9 = "Day 9 — Wine and Spirits";
divider(9, "Wine and Spirits", "Origins of spirits, specialty and seasonal cocktails, wine overview, the whiskey list, origins of wine — tannin, body, aging — new world versus old world, red versus white versus rosé, wine by the glass tasting, and the bartenders' recipe list.");

{
  const s = page("Origins of spirits", "Every spirit is the same trick: ferment something, then distill it", D9);
  const spirits = [
    ["Bourbon", "", "American whiskey, at least 51% corn, aged in new charred oak. Sweet, vanilla, caramel."],
    ["Rye", "", "Swaps corn dominance for rye grain. Spicier, drier."],
    ["Tennessee", "", "Bourbon's cousin, filtered through charcoal."],
    ["Scotch", "", "Malted barley in Scotland. Highland malts run honeyed, Islay malts run smoky and peaty."],
    ["Irish", "", "Usually triple-distilled. Lighter, smoother."],
    ["Cognac", "", "Distilled wine from one region of France, aged in oak. VS, VSOP, XO mark rising age."],
    ["Tequila", "", "Distilled blue agave. Blanco unaged and bright, reposado rests in oak, añejo goes deeper."],
    ["Rum", "", "Sugarcane."],
    ["Vodka", "", "The neutral spirit — distilled clean on purpose."],
    ["Gin", "", "Vodka's cousin sent through botanicals, juniper leading."],
    ["Port", "", "Wine fortified with spirit — which is why it drinks like dessert."],
    ["What you ferment", "", "and what you age it in makes the family. That is the whole map."]
  ];
  cards(s, spirits, { cols: 4, top: 1.72, h: 1.32, headFs: 13, bodyFs: 10 });
}

{
  const s = page("The whiskey shelf", "How to walk it", D9);
  rows(s, [
    ["•", "The everyday wall runs $11 to $25. ", "Buffalo Trace is the classic house pour."],
    ["•", "The built-in upsell line: ", "“Woodford on the rocks is great — have you tried the Double Oaked?”"],
    ["•", "The Bardstown shelf is story bottles. ", "The West Virginia Great Barrel collab in cherry-oak barrels, the Goose Island stout-barrel finish, and the Prime 47 Blend — a single barrel OUR people tasted in Bardstown, Kentucky and bought exclusively for our restaurants. You are pouring from a barrel our own team chose. There is no better whiskey story in the building."],
    ["•", "The unicorn shelf is priced per ounce. ", "Pappy Van Winkle 10 through 15, Macallan 25, and Louis XIII cognac at $250 an ounce — the most expensive pour in the building."],
    ["•", "Scotch runs friendly blends to peat monsters ", "— Lagavulin and Laphroaig. Ports are the dessert-course secret weapon."]
  ], { top: 1.62, fs: 12 });
}

placeholder(D9, "the straight tequila page from Toast",
  "Never captured. El Charro and LALO are what we pour into cocktails — the straight shelf is a blank we quote from Toast until this lands.", "Document");

{
  const s = page("The cocktails", "The active summer specialty list", D9);
  const list = [
    ["Lemon Bay", "$15", "Lemon vodka, herbal liqueur, coupe, basil oil drip. Light, tart, herbal."],
    ["Cactus Flower Mule", "$13", "Prickly pear vodka, lime, prickly pear puree, ginger beer, copper mug. Prickly pear can read watermelon, kiwi, strawberry, even bubble gum."],
    ["Ruby & Jade", "$15", "Strawberry-kiwi infused LALO Blanco. Candy vibe, bright fruit."],
    ["Chilean Sea Breeze", "$15", "El Charro Reposado, Ancho Reyes chile liqueur, pineapple, sweet and sour. The one for someone who wants to taste the alcohol."],
    ["Pittsburghed Peach", "$17", "High West Campfire, peach, lemon, orange bitters. Lightly smoky — smokeable for +$3."],
    ["Street Treat Spritz", "$18", "Watermelon vodka, limoncello, Prosecco, Tajin dust. Bubbly and fresh."],
    ["Golden Hour", "$15", "Bacardi Limon, passionfruit, mango, lemon. Tropical and balanced."],
    ["Sweet & Salty", "$13", "The Tito's grapefruit draft-style cocktail with the half-salt rim."],
    ["Lychee Icee", "$15", "Bombay Sapphire, St-Germain, tonic over a frozen lychee-juice rock. The drier, floral one."]
  ];
  cards(s, list, { cols: 3, top: 1.72, h: 1.62, headFs: 13, bodyFs: 10 });
}

{
  const s = page("The cocktails", "Mo's signatures, dessert cocktails, and the lanes you memorize", D9);
  twoCol(s,
    {
      head: "Signatures and dessert",
      items: [
        "Mo's Signature Old Fashioned $16 — Knob Creek, muddled cherry and orange.",
        "Smoked Draft Old Fashioned $17 — Buffalo Trace, vanilla, bitters, smoked water on draft. Our one tap line, and the +$3 smoke show.",
        "Mo's Manifest Manhattan $21 — Angel's Envy Rye, Luxardo cherries.",
        "HMFIC $40 — Basil Hayden Rye, Peychaud's, absinthe rinse. A smoked tableside Sazerac and the most expensive cocktail on the list.",
        "Coco Caramel Carajillo $20 · Esso Affo $18 — poured tableside by the FRONT server · Espresso Martini $17."
      ]
    },
    {
      head: "The recommendation lanes",
      items: [
        "Light and refreshing — Cactus Flower Mule, Lychee Icee, Lemon Bay.",
        "Sweet and fruity — Ruby & Jade, Golden Hour, Street Treat.",
        "Spicy tequila — Chilean Sea Breeze.",
        "Whiskey but approachable — Pittsburghed Peach. Drier — Lychee Icee.",
        "Classic steakhouse — the Old Fashioneds and the Manhattan.",
        "Dessert — Carajillo or Esso Affo. No alcohol — Make-A-Mocktail or Bud Zero."
      ]
    },
    { top: 1.72, fs: 11.5 });
  pullNote(s, "Bartenders get the recipe list.",
    "It lives in the app's Drinks tab, builds and garnishes included, exactly as the itinerary wanted. Retired drinks are never promised without asking the bar first.", 5.62);
}

{
  const s = page("Origins of wine", "Four ideas, and everything else follows", D9);
  cards(s, [
    ["Tannin", "structure", "The dry, grippy feeling on your gums from grape skins and oak. It is why a big Cabernet loves a marbled ribeye — the tannin scrubs the fat and resets your mouth."],
    ["Body", "weight", "Weight on the tongue: skim milk to whole milk to cream. Light, medium, full."],
    ["Acid", "brightness", "What makes your mouth water and keeps food alive. High-acid wines are the food wines."],
    ["Aging", "direction, not score", "In oak, wine picks up vanilla, spice and polish and its tannin softens. In the bottle, fruit gives way to earth, leather and tobacco."]
  ], { cols: 4, top: 1.72, h: 2.4, bodyFs: 11 });
  pullNote(s, "New world versus old world:",
    "new world — California, Oregon, Australia, New Zealand, South America — is named by grape, grown warmer, and drinks fruit-forward and bolder. Old world — France, Italy, Spain — is named by place, grown cooler, and drinks drier and earthier. Same grape, two accents. A guest who says “less fruity, more dry” is asking for old world without knowing the phrase.", 4.4);
  blk("shout", "Red ferments with the skins — that is color and tannin. White ferments without them. Rosé kisses the skins briefly. Sparkling gets bubbles from a second fermentation.");
  s.addText("Red ferments with the skins — that is color and tannin. White ferments without them. Rosé kisses the skins briefly. Sparkling gets bubbles from a second fermentation.", {
    x: M, y: 5.42, w: CW, h: 0.5, margin: 0, align: "center",
    fontFace: BODY, fontSize: 12, italic: true, color: DIM, lineSpacing: 16
  });
}

{
  const s = page("The regions", "One breath each", D9);
  const regions = [
    ["Napa Valley", "", "big steak red"],
    ["Mountain Napa", "", "Howell, Spring, Veeder — darker and firmer. Ribeye and tomahawk."],
    ["Russian River", "", "silky, fog-cooled Pinot. Fish or filet."],
    ["Willamette", "", "elegant, not heavy."],
    ["Burgundy & Chablis", "", "refined and food-driven — earth, mineral, acid."],
    ["Bordeaux & Pomerol", "", "classic steakhouse restraint. Pomerol is the softer Merlot side."],
    ["The Rhône", "", "pepper and savory warmth. Bold without being Cabernet."],
    ["Rioja & Ribera", "", "vanilla and tobacco Tempranillo. The food-friendly savory steak red."],
    ["Tuscany", "", "and the Super Tuscans — powerful but built for the table."],
    ["Champagne", "", "acid and bubbles that cut richness. Oysters, seafood, wagyu, even truffle fries."],
    ["Marlborough", "", "the crisp seafood white."],
    ["The instinct", "", "filet loves Pinot. Ribeye loves Cabernet. “Cabernet is too dry” means pour them Merlot."]
  ];
  cards(s, regions, { cols: 4, top: 1.72, h: 1.32, headFs: 12.5, bodyFs: 10 });
}

{
  const s = page("Selling the list", "The wine move, every time", D9);
  twoCol(s,
    {
      head: "What actually sells",
      items: [
        "Caymus Cabernet is the volume king.",
        "Advice From John moves easily in the good tier. Kim Crawford leads the whites.",
        "The whole reason the wine tab exists is to get comfortable selling the Silver Oak tier and up.",
        "Cristal and the trophy bottles are really in the building — we have sold Cristal here."
      ]
    },
    {
      head: "The move",
      items: [
        "Ask whether they are leaning lighter and smoother or bigger and richer, then give two confident choices.",
        "Four people ordering glasses? A bottle is usually the better value — move them up the ladder.",
        "The front server sets the glasses. A MANAGER opens and pours every bottle at the table. Over $250 gets the big Bordeaux glasses.",
        "Champagne and sweet Moscato live cold. Trophy reds get presented, not rushed."
      ]
    },
    { top: 1.72, fs: 12.5 });
  pullNote(s, "The math that should motivate you:",
    "one $90 bottle a night at 20% is $18. Ten tables a night, five nights a week, and bottle sales are a five-figure raise.", 5.4);
}

{
  const s = page("Beer, zero proof, coffee", "", D9);
  cards(s, [
    ["Draft", "two facts", "The Smoked Draft Old Fashioned is our one confirmed tap line. Sweet & Salty is confirmed NOT on tap."],
    ["Bottles", "the range", "Bud Light through Stella, local Metazoa and Centerpoint IPAs, NUTRL seltzers, Austin Eastciders dry cider — gluten-free style."],
    ["Elysian Space Dust", "8.2%", "The strongest beer on the list. Know it — it gets asked."],
    ["Zero proof", "", "Bud Zero and the Make-A-Mocktail. Ask which lane: citrus, berry, tropical, herbal."],
    ["Coffee", "Hubbard & Cravens", "A local Indianapolis roaster. Bring the cream and sugar caddy. Straight espresso is poured — no cappuccino."],
    ["Tea and water", "", "Iced tea is unsweet by default, sweet on request. Filtered water is the default at every table; bottled still and sparkling available."]
  ], { cols: 3, top: 1.72, h: 1.85, bodyFs: 11 });
}

/* ============================================================
   DAY 10
   ============================================================ */
const D10 = "Day 10 — Friends and Family Night";
divider(10, "Friends and Family Night", "Friends and family come in, four to nine, on an abbreviated menu.");

{
  const s = page("Friends and Family Night", "Why the night existed, and what to keep from it", D10);
  blk("quote", ["Before the doors ever opened to the public, the building filled with friends and family and the team ran real service on an abbreviated menu from four to nine. That night exists so that opening night is nobody's first night.", ""]);
  s.addText(
    "Before the doors ever opened to the public, the building filled with friends and family and the team ran real service on an abbreviated menu from four to nine. That night exists so that opening night is nobody's first night.",
    { x: M, y: 1.7, w: CW, h: 0.86, margin: 0, fontFace: HEAD, fontSize: 17, italic: true, color: WINE, lineSpacing: 25 }
  );
  cards(s, [
    ["Every practice rep", "full-dress seriousness", "Run it like it counts, because the habits are what carry over."],
    ["Every real night", "practice-night forgiveness", "Inside the team: catch each other, cover each other, debrief without blame."],
    ["Hold the standard", "not a grudge", "Be hard on the standard, not the person. That point does the most work on the hardest nights."]
  ], { cols: 3, top: 2.76, h: 2.0 });
  blk("shout", "Walk out of every shift able to say the sixteenth point out loud: \u201CThey weren't ready for us.\u201D");
  s.addText("Walk out of every shift able to say the sixteenth point out loud:", {
    x: M, y: 5.0, w: CW, h: 0.34, margin: 0, align: "center",
    fontFace: BODY, fontSize: 13, color: DIM
  });
  s.addText("“They weren't ready for us.”", {
    x: M, y: 5.36, w: CW, h: 0.62, margin: 0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 32, bold: true, color: WINE
  });
}

/* ============================================================
   THE GET LIST  (built from the placeholders actually created)
   ============================================================ */
{
  const s = page("The Get List", "Every blank slide in this deck, in one place");
  const items = PLACEHOLDERS.map(p => [p[1], p[0].replace(/ —.*$/, ""), ""]);
  cards(s, items, { cols: 5, top: 1.66, h: 1.16, headFs: 11.5, bodyFs: 9.5 });
  pullNote(s, "When any of these lands — a photo is enough —",
    "it goes into the deck, the book and the app the same day. That is the whole system.", 5.92, 0.72);
}

/* ============================================================
   CLOSING
   ============================================================ */
{
  const s = darkSlide();
  newRec("cover", "Leave people better than you found them.", "", "Mo's A Place For Steaks · Greenwood, Indiana");
  s.addText("Leave people better", {
    x: M, y: 2.32, w: CW, h: 0.9, margin: 0, align: "center",
    fontFace: HEAD, fontSize: 50, color: "E8D6C8"
  });
  s.addText("than you found them.", {
    x: M, y: 3.14, w: CW, h: 0.9, margin: 0, align: "center",
    fontFace: HEAD, fontSize: 50, bold: true, color: CREAM
  });
  s.addText("Mo's A Place For Steaks  ·  Greenwood, Indiana", {
    x: M, y: 4.5, w: CW, h: 0.34, margin: 0, align: "center",
    fontFace: BODY, fontSize: 12.5, color: "C9A99A"
  });
}

const OUT = process.argv[2] || "2026-08-07-mos-training-regiment.pptx";
pres.writeFile({ fileName: OUT }).then(() => {
  console.log("wrote " + OUT);
  console.log("placeholders: " + PLACEHOLDERS.length);
  fs.writeFileSync("deck-placeholders.json", JSON.stringify(PLACEHOLDERS, null, 1));
  fs.writeFileSync("deck-content.json", JSON.stringify(SLIDES));
  console.log("slides recorded: " + SLIDES.length);
});
