#!/usr/bin/env python3
"""Builds the open-questions PDF, with the pictures-needed list appended from live app data.
Run after any menu or photo change:  python3 mkquestions.py
"""
import json, subprocess, tempfile, pathlib, datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle

ROOT = pathlib.Path(__file__).parent
CREAM=HexColor("#F7EFE4"); INK=HexColor("#292525"); OX=HexColor("#59201C")
GRN=HexColor("#003622"); SOFT=HexColor("#6b5a52")
W,H = letter

# ---- pull the live data so the picture list can never drift ----
photos = json.loads((ROOT/"build/5d-data-photos.js").read_text(encoding="utf-8")
                    .split("const PHOTOS=",1)[1].rstrip().rstrip(";"))
HAVE = set(photos)
food = (ROOT/"build/4-data-food.js").read_text(encoding="utf-8")
src = food[food.index("const MENU = {"):]
src = src[:src.index("\n};")+3]
with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
    f.write(src+"\nconsole.log(JSON.stringify(MENU));"); tmp=f.name
MENU = json.loads(subprocess.check_output(["node", tmp], text=True))

RESHOOT = {
 "Cotton Candy":"out of focus",
 "Roasted Seafood Tower":"soft, lower tier unreadable",
 "Wagyu Tacos":"shadows crushed",
 "Iced Seafood Tower":"frame could not be cropped clean",
 "Sea Scallops":"old photo was the wrong dish",
}
SKIP = {"Every side shares","Celebration drop (free)","Soup of the Day","Sorbets (not really sold)",
        "Forest Mushrooms","Short Rib Pasta","Stuffed Chicken Breast"}

need, reshoot = [], []
for sec, items in MENU.items():
    for name, price, *_ in items:
        if name in SKIP or name in HAVE: continue
        (reshoot if name in RESHOOT else need).append((sec, name, price))

def page(canv, doc):
    canv.saveState()
    canv.setFillColor(CREAM); canv.rect(0,0,W,H,fill=1,stroke=0)
    if doc.page>1:
        canv.setFillColor(OX); canv.rect(0.9*inch,H-0.62*inch,W-1.8*inch,1.4,fill=1,stroke=0)
        canv.setFont("Helvetica",8); canv.setFillColor(SOFT)
        canv.drawString(0.9*inch,H-0.55*inch,"MO'S — OPEN QUESTIONS")
        canv.drawCentredString(W/2,0.5*inch,str(doc.page))
    canv.restoreState()

doc=BaseDocTemplate(str(ROOT/f"{datetime.date.today()}-mos-app-open-questions.pdf"),pagesize=letter)
doc.addPageTemplates([PageTemplate(id="p",
    frames=[Frame(0.9*inch,0.75*inch,W-1.8*inch,H-1.6*inch,id="f")],onPage=page)])

H1=ParagraphStyle("h1",fontName="Helvetica-Bold",fontSize=20,leading=25,textColor=OX,spaceAfter=8)
SUB=ParagraphStyle("sub",fontName="Helvetica",fontSize=10.3,leading=14,textColor=INK,spaceAfter=13)
H2=ParagraphStyle("h2",fontName="Helvetica-Bold",fontSize=13,leading=17,textColor=GRN,spaceBefore=15,spaceAfter=5)
H3=ParagraphStyle("h3",fontName="Helvetica-Bold",fontSize=10.5,textColor=OX,spaceBefore=9,spaceAfter=3)
Q=ParagraphStyle("q",fontName="Helvetica",fontSize=10.3,textColor=INK,leading=14.5,
                 leftIndent=15,firstLineIndent=-15,spaceAfter=3)
def q(t): return Paragraph('<font color="#59201C">&#9633;</font>  '+t, Q)

today = datetime.date.today().strftime("%-m/%-d/%Y")
S=[Paragraph("Mo's app — the open questions", H1),
   Paragraph(f"Everything still unanswered, in one place, plus every dish that still needs a "
             f"photo. Answer any line to Claude and the app updates the same day. Updated {today}.", SUB),

 Paragraph("For Chef Miguel — kitchen facts (allergy answers depend on these)", H2),
 q("1. Kung pao sauce — peanuts, tree nuts, or both? We treat it as BOTH until you tell us."),
 q("2. Calamari breading — any egg in it?"),
 q("3. Caesar dressing — bonito flakes in there, right?"),
 q("4. Blue cheese dressing — mayo base? That would mean egg."),
 q("5. Bearnaise — what is the vinegar and wine base?"),
 q("6. Brandy peppercorn demi — does it start with a flour roux?"),
 q("7. Primavera pesto — pine nuts or other nuts?"),
 q("8. Jalapeno au gratin cheese sauce — flour in it, or straight cream and cheese?"),
 q("9. Wagyu taco balsamic glaze — any soy?"),
 q("10. Miso sea bass marinade — any wheat or barley in the miso?"),
 q("11. Kids noodles — egg pasta? Kids tender breading — egg?"),
 q("12. Risotto — finished with white wine?"),
 q("13. Shrimp cocktail sauce — Worcestershire (anchovy) and English mustard, right? Matters for fish and mustard allergies."),
 q("14. Steak 47 — what size are the shrimp and the scallop on top?"),
 q("15. Roasted pear salad — anything with gluten in it? An old sheet flagged it and nothing in the build explains it."),
 q("16. Oysters Rockefeller — is there liqueur in the green puree? Changes the alcohol answer."),
 q("17. Seafood towers — is the Baller exactly double the Semi-Pro on oysters, shrimp and crab, or does it vary?"),
 q("18. Soup builds, one per shift as each runs. Still needed: Pot Pie, Chicken Noodle, Clam Chowder, "
   "Fagioli, Italian Wedding, Chicken Gnocchi, Roasted Poblano, Tortilla, Jalapeño Beer Cheese, "
   "Tomato Basil Bisque, Buffalo Chicken, Loaded Baked Potato, Cream of Mushroom, Cream of Broccoli, "
   "Cheddar Broccoli, Potato Leek, Corn Chowder."),

 Paragraph("Two minutes at a Toast screen", H2),
 q("45-Day 22 oz Dry-Aged Bone-In Ribeye — is $120 right?"),
 q("Oysters Rockefeller — is $45 right?"),
 q("Straight espresso — $8 is the working guess."),
 q("Loaded baked potato upcharge — +$3 is the working guess."),
 q("Primavera protein add-on prices: chicken, salmon, steak, shrimp."),
 q("La Marca Prosecco and Mionetto Rose — bottle prices (glass prices are already in)."),
 q("One photo of the straight tequila page — never captured."),

 Paragraph("Ask a manager", H2),
 q("Voids — do they come off team net sales before tip-outs? Comps yes and promos no are locked."),
 q("The second draft line — what is it? Confirmed NOT Sweet and Salty."),
 q("FLOOR PLAN — a copy with table numbers and seat numbers. The app is waiting on this one."),
 q("The dinner you wanted listed beside the Buffalo Trace dinner — what is it called exactly? "
   "It sounded like “keelah” and I did not want to guess a name into the app."),
 q("Manager blessing before the team link and QR go out to everybody."),

 Paragraph("Evan owes the app", H2),
 q("Staffing bands — slow Wednesday, normal night, packed Saturday. Tunes the Night Forecast."),
 q("Back-server side work list, dictated."),
 q("A photo of the cut specials board next time it changes."),
 q("Audrina is hidden from the schedule by the all-OFF rule — is that right?"),
]

S += [Paragraph("Pictures still needed", H2),
      Paragraph(f"{len(HAVE)} dishes have a photo in the app. {len(reshoot)} were shot and rejected, "
                f"{len(need)} have never been shot. Square, straight down on the plate.", SUB)]
if reshoot:
    S.append(Paragraph("Reshoots — these were attempted and did not come out", H3))
    for sec,name,price in reshoot:
        S.append(q(f"{name} — {price} · <i>{RESHOOT[name]}</i>"))
cur=None
S.append(Paragraph("Never shot", H3))
for sec,name,price in need:
    if sec!=cur:
        cur=sec; S.append(Paragraph(sec, H3))
    S.append(q(f"{name} — {price}"))

doc.build(S)
print(f"{datetime.date.today()}-mos-app-open-questions.pdf")
print(f"  photos: have {len(HAVE)} · reshoot {len(reshoot)} · never shot {len(need)}")
