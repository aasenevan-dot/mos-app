
/* ============================================================
   THE TRAINER PROGRAM — Mo's Trainer Manual & New Server
   Training Program, transcribed from the printed trainer copy
   (15 pages, "Mo's Training Program · Trainer Copy").

   This is the OFFICIAL document. Where it disagreed with the
   app, the manual won (Evan's call 9/7) — timing standards,
   the baked potato knife, Forest Mushrooms, Chicken Parmesan
   tableside, the lava cake build, and the FarBuckle spelling
   were all changed to match this.

   Structure: TRAINER.parts[] renders in order. Each part is
   {k, t, ...} where k is the block kind:
     head   a section heading with an optional lede
     rows   plain reference lines [label, standard]
     check  tappable checklist items (id-stamped, saved locally)
     sign   a trainer-initials + date line
     note   a callout
     rate   the 1-5 rating grid
     decide the final decision radio
   Checklist state lives in localStorage per trainee name so a
   trainer can run two people at once without collisions.
   ============================================================ */
const TRAINER = {
  title: "Trainer Manual & New Server Training Program",
  sub: "Trainer Standards · Service Expectations · Menu Standards · Certification",
  loop: ["EXPLAIN", "DEMONSTRATE", "OBSERVE", "CORRECT", "REPEAT", "VERIFY"],
  creed: "DO NOT SIGN OFF BECAUSE THEY SAW IT. SIGN OFF BECAUSE THEY DEMONSTRATED IT.",
  parts: [

  {k:"head", t:"1. Purpose of the Trainer Program",
   d:"Being selected as a trainer means being trusted to teach new team members the Mo's standard of service. Training is not simply allowing a trainee to follow an experienced server. Trainers are expected to teach, demonstrate, explain, observe, correct, and verify."},
  {k:"check", id:"purpose", items:[
    "Arrive prepared to train.",
    "Model the same standards being taught.",
    "Explain why procedures are performed a certain way.",
    "Ask questions instead of simply giving answers.",
    "Allow the trainee to perform tasks themselves.",
    "Correct mistakes immediately and professionally.",
    "Communicate progress and concerns to management and the next trainer.",
    "Never sign off on a skill that has not been personally demonstrated."]},

  {k:"head", t:"2. Four-Course Service & Timing",
   d:"Servers are responsible for controlling the pace of the meal, monitoring ticket times, firing courses appropriately, preparing the table before each course, and communicating delays before the guest has to ask."},
  {k:"rows", items:[
    ["Appetizers","7 – 12 minutes. Seafood towers are the exception."],
    ["Soup / Salad","2 – 5 minutes."],
    ["Entrées","Approximately 22 minutes; maximum goal 25 minutes."],
    ["Desserts","Within 7 minutes."]]},

  {k:"head", t:"3. Core Dining-Room Service Standards"},
  {k:"check", id:"core", items:[
    "Know all table numbers, seat numbers, and pivot points.",
    "Use the Captain's Pad correctly; ladies are always circled.",
    "Ladies are served first under normal service.",
    "Serve from the left and clear from the right.",
    "Soup and hot beverages are served from the right.",
    "Hot soups are served first regardless of gender.",
    "Correct utensils and specialty pieces must be placed before food arrives.",
    "Think one course ahead: clear, reset, maintain beverages, verify seat positions, and anticipate the next course."]},

  {k:"head", t:"4. Soup, Salad & Bread Service"},
  {k:"check", id:"soupsalad", items:[
    "Bread service occurs with the soup or salad course.",
    "Soups are served from the right and cleared from the right.",
    "Salads are served from the left.",
    "Freshly cracked pepper is offered with the soup/salad course.",
    "Hot soups take priority and are served first regardless of gender."]},
  {k:"sign", id:"s-soupsalad"},

  {k:"head", t:"5. Seafood Towers"},
  {k:"rows", sub:"Iced Seafood Tower", items:[
    ["Pre-set","Oyster fold, Saltine crackers, Tabasco, cocktail forks."],
    ["Shell bowl","Pre-set before arrival."],
    ["Butter towers","One per person."],
    ["Lobster salad","Brioche bread."],
    ["Ahi tuna salad","Tortilla chips."],
    ["With tower","Tongs & hot water kettle."]]},
  {k:"note", t:"Roasted Seafood Tower",
   d:"Same general preparation standard as the iced tower, but do NOT set an oyster fold. The trainee must also anticipate the pasta that is mixed into the Diavolo sauce mid-course and prepare the table accordingly."},
  {k:"check", id:"towers", items:[
    "Butter towers = one per person.",
    "Table maintained and adequate space prepared.",
    "Pasta service anticipated and table set before the mid-course presentation."]},
  {k:"note", t:"Handwritten note on the source sheet", d:"“cut off is 6–7 top”"},
  {k:"sign", id:"s-towers"},

  {k:"head", t:"6. Appetizer Service Standards"},
  {k:"rows", items:[
    ["Crab Cake","Spatula"],
    ["Calamari","Tongs"],
    ["Goat Cheese Spread","Spreading knife + boat of honey; honey drizzled tableside"],
    ["Creamy Spicy Crab Dip","Serving spoon"],
    ["Prime Meatballs","Serving spoon"],
    ["Oysters","Oyster fold: saltines, Tabasco, cocktail forks; hot water kettle"],
    ["Ahi Tuna Bites","Chopsticks pre-set; tongs with dish"],
    ["Wagyu Tacos","No additional specialty utensil"],
    ["Shrimp Cocktail","Cocktail forks pre-set; hot water kettle"]]},
  {k:"sign", id:"s-apps"},

  {k:"head", t:"7. Dinner & Steak Service",
   d:"All required knives and entrée utensils must be pre-set before dinner arrives."},
  {k:"rows", items:[
    ["Standard steaks","Traditional steak knife"],
    ["Japanese A-5 Wagyu","Specialized knife"],
    ["Spinalis","Traditional steak knife; off-menu cut"],
    ["Tomahawk","Traditional steak knife; off-menu cut"],
    ["Porterhouse","Traditional steak knife; off-menu cut"],
    ["D & M Style A-5","Specialized knife; prepared by manager"]]},
  {k:"note", t:"Off-menu cuts",
   d:"Designated off-menu cuts are cut tableside by the manager on duty. The trainee must prepare adequate table space and understand the preparation and distribution of the FarBuckle."},
  {k:"rows", sub:"Steak Temperature Knowledge", items:[
    ["Blue","Very red, very cold center"],
    ["Rare","Cold red center"],
    ["Medium Rare","Cool red center"],
    ["Medium","Warm to hot red center"],
    ["Medium Well","Hot pink center"],
    ["Well Done","Hot center, little to no pink"]]},
  {k:"note", t:"Well done",
   d:"Trainees must understand Mo's well-done communication standard. If a guest requests no pink, offer to butterfly the steak. Management should review the approved wording used to communicate expectations for well-done steaks."},
  {k:"sign", id:"s-steak"},

  {k:"head", t:"8. Steak Enhancements & Add-Ons"},
  {k:"rows", items:[
    ["Black Truffle Butter","Torch available to melt butter on steak"],
    ["Garlic Butter","Torch available to melt butter on steak"],
    ["Additional Lobster Tail","Butter tower pre-set before entrée"],
    ["Forest Mushrooms","Serving spoon; mushrooms distributed tableside onto steak"]]},
  {k:"sign", id:"s-enh"},

  {k:"head", t:"9. Exclusive Entrées & Tableside Presentations"},
  {k:"check", id:"chickparm", sub:"Chicken Parmesan", items:[
    "Tableside presentation.",
    "Trainee must learn proper distribution of Provolone cheese & Tomato Diavolo sauce.",
    "Cheese and sauce are distributed tableside over the chicken breast and pasta.",
    "Table must have adequate space and be fully prepared before arrival."]},
  {k:"check", id:"twintails", sub:"Twin South African Lobster Tails", items:[
    "Butter tower must be pre-set before the entrée arrives."]},
  {k:"sign", id:"s-exclusive"},

  {k:"head", t:"10. Accessories (Family-Style Sides)",
   d:"All accessories are family-style sides. Correct serving utensils must accompany the side so guests do not need to use personal utensils for distribution."},
  {k:"rows", items:[
    ["Grilled Asparagus","Tongs"],
    ["Creamed Corn","Large serving spoon"],
    ["Creamed Spinach","Large serving spoon"],
    ["Creamy Risotto","Large serving spoon"],
    ["Baked Potato","Butter + sour cream; offer loaded option; butcher knife to cut center"],
    ["White Cheddar Mashed Potatoes","Large serving spoon"],
    ["Truffle Cauliflower","Large serving spoon"],
    ["Lobster Mac & Cheese","Large serving spoon"],
    ["Jalapeño Au Gratin Potatoes","Large serving spoon"],
    ["Brussels Sprouts","Large serving spoon"],
    ["Truffle Fries","Tongs"]]},
  {k:"sign", id:"s-sides"},

  {k:"head", t:"11. Dessert Service"},
  {k:"rows", items:[
    ["Mo's Cookie","Large serving spoon + boat of hot chocolate"],
    ["Brown Butter Cake","Large serving spoon + hot-water kettle for dry-ice presentation"],
    ["New York-Style Cheesecake","Spatula"],
    ["Celebration Cake","Spatula"],
    ["Lava Cake","Large serving spoon + boat of hot chocolate topped with 99 Oranges; tableside flambé"],
    ["Sundae","Large serving spoon"],
    ["Crème Brûlée","Large serving spoon"],
    ["Carrot Cake","Spatula"],
    ["Bananas Foster","See specialty tableside set up"]]},
  {k:"note", t:"Practical demonstration required",
   d:"Brown Butter Cake, Molten Lava Cake, Cotton Candy, and Bananas Foster require practical demonstration before trainer sign-off."},
  {k:"sign", id:"s-dessert"},

  {k:"head", t:"12. Specialty Practical Skills"},
  {k:"check", id:"bananas", sub:"Bananas Foster", items:[
    "Know all ingredients and equipment.",
    "Know supply locations.",
    "Assemble complete setup.",
    "Transport safely.",
    "Execute proper tableside positioning and presentation.",
    "Clean, return, and restock equipment."]},
  {k:"check", id:"cotton", sub:"Cotton Candy", items:[
    "Prepare machine.",
    "Operate machine properly.",
    "Produce and present cotton candy.",
    "Shut down safely.",
    "Clean and restock station."]},
  {k:"check", id:"farbuckle", sub:"The FarBuckle", items:[
    "Know complete setup.",
    "Prepare table.",
    "Understand preparation and distribution.",
    "Handle equipment safely.",
    "Present, clear, and return equipment properly."]},
  {k:"sign", id:"s-specialty"},

  {k:"head", t:"13. Opening, Side Work, Cleaning & Closing"},
  {k:"check", id:"fohopen", sub:"Front-of-House Opening", items:[
    "Dining room setup","Plate settings","Chair/table alignment","Service stations",
    "Glassware and utensils","Napkins/linens","Menus","Restocking",
    "Cleanliness inspection","Guest-ready walkthrough"]},
  {k:"check", id:"bohopen", sub:"Back-of-House / Service-Area Opening", items:[
    "Service stations (salad/soup, bread station, coffee station, expo)",
    "Plates/serviceware","Utensils","Specialty equipment","Bananas Foster supplies",
    "Cotton candy supplies","Seafood tower equipment","FarBuckle equipment",
    "Cleaning supplies","Check pars and communicate shortages"]},
  {k:"check", id:"sidework", sub:"Running Side Work", items:[
    "Maintain stations","Restock before running out","Keep shared areas clean and organized",
    "Communicate low-stock items","Leave stations prepared for the next person"]},
  {k:"check", id:"cleaning", sub:"Daily & Weekly Cleaning", items:[
    "Show location of daily cleaning list","Explain assignment and verification process",
    "Introduce weekly cleaning list","Explain weekly task expectations and documentation"]},
  {k:"check", id:"endnight", sub:"End of Night", items:[
    "Complete guest responsibilities","Complete running and closing side work",
    "Complete cleaning assignment","Restock","Complete checkout",
    "Receive approval before leaving"]},

  {k:"head", t:"14. Day by Day Training Packet"},
  {k:"check", id:"day1", sub:"DAY 1 — Foundation & Restaurant Knowledge",
   d:"Trainer leads; trainee observes, assists, and begins demonstrating foundational knowledge.", items:[
    "Restaurant tour: FOH, BOH, service stations, dish area, supply and specialty equipment locations",
    "Table numbers, seat numbers, and pivot points",
    "Captain's Pad and ladies circled",
    "Serve-left / clear-right standards and exceptions",
    "FOH opening","BOH opening","Daily cleaning list","Weekly cleaning list",
    "Running side work and release procedure"]},
  {k:"sign", id:"s-day1", notes:"Trainer Notes / Day 2 Priorities"},
  {k:"check", id:"day2", sub:"DAY 2 — Steps of Service & Four-Course Execution", items:[
    "Review table/seat/pivot knowledge","Captain's Pad execution",
    "Appetizer timing: 7 – 12 minutes","Soup/salad timing: 2 – 5 minutes",
    "Bread service and freshly cracked pepper",
    "Entrée timing: 22-minute target / 25-minute maximum goal",
    "Dessert timing: within 7 minutes","Utensil and knife knowledge",
    "Table and beverage maintenance","Recognizing and communicating delays"]},
  {k:"sign", id:"s-day2", notes:"Trainer Notes / Day 3 Priorities"},
  {k:"check", id:"day3", sub:"DAY 3 — Specialty Service & Active Execution", items:[
    "Iced seafood tower","Roasted seafood tower and mid-course pasta anticipation",
    "Bananas Foster","Cotton candy","FarBuckle","Steak knife and enhancement setup",
    "Chicken Parmesan tableside presentation","Brown Butter Cake dry-ice presentation",
    "Lava Cake tableside flambé",
    "Anticipatory service: trainee begins thinking ahead without prompting"]},
  {k:"sign", id:"s-day3", notes:"Trainer Notes / Day 4 Priorities"},
  {k:"check", id:"day4", sub:"DAY 4 — Run the Section",
   d:"Responsibility shifts to the trainee. The trainer observes and intervenes only when necessary to protect the guest experience.", items:[
    "Open assigned areas and prepare station","Greet and manage tables",
    "Use Captain's Pad and accurate seat numbers","Control all four courses and timing",
    "Pre-set utensils, knives, enhancements, and accessories",
    "Execute service direction and ladies-first standards",
    "Maintain beverages and table cleanliness",
    "Communicate with kitchen, support staff, guests, and management",
    "Execute specialty/table-side presentations",
    "Complete running side work, cleaning, restocking, checkout, and release procedure"]},
  {k:"ready", id:"s-day4"},

  {k:"head", t:"15. Final Certification — READY TO SERVE?",
   d:"The trainee runs the section. The certifying trainer/manager observes."},
  {k:"cert", id:"cert", items:[
    "Table numbers / seat numbers / pivot points",
    "Captain's Pad / ladies circled",
    "Ladies-first service",
    "Serve left / clear right / exceptions",
    "Hot soup priority",
    "Four-course execution and timing",
    "Utensils and pre-sets",
    "Traditional vs. specialized steak knives",
    "Steak temperature knowledge",
    "Enhancements and add-ons",
    "Seafood tower setups",
    "Chicken Parmesan presentation",
    "Accessories / family-style serving utensils",
    "Dessert setups and presentations",
    "Bananas Foster",
    "Cotton candy",
    "FarBuckle",
    "Table and beverage maintenance",
    "Guest/kitchen/management communication",
    "FOH and BOH opening",
    "Running side work",
    "Daily/weekly cleaning knowledge",
    "Closing, restocking, checkout and release"]},
  {k:"rate", id:"rate", items:[
    "Floor knowledge","Captain's Pad","Menu / utensil knowledge","Four-course execution",
    "Timing & pacing","Table maintenance","Anticipatory service","Guest communication",
    "Specialty service","Organization","Side work / cleaning","Teamwork",
    "Overall service presence"]},
  {k:"decide", id:"decision", items:[
    "CERTIFIED: READY TO SERVE INDEPENDENTLY",
    "CONDITIONAL: ADDITIONAL TRAINING SHIFT REQUIRED",
    "NOT YET READY: ADDITIONAL DEVELOPMENT REQUIRED"]},

  {k:"head", t:"16. Trainer Closing Standard"},
  {k:"note", t:"WE ARE NOT TRAINING SOMEONE TO COMPLETE FOUR SHIFTS.",
   d:"WE ARE TRAINING SOMEONE TO EXECUTE THE MO'S EXPERIENCE. Teach them. Let them try. Correct them. Make them do it again. Ask questions. Make them think ahead. Hold them accountable."},
  {k:"note", t:"Thank you to our trainers",
   d:"To everyone who has been chosen to be a trainer, thank you for taking on this important responsibility. Your time, patience, effort, and due diligence play a huge role in the success of our new team members. The standards you teach and the example you set will help shape the type of server each trainee becomes. Being selected as a trainer means that we trust your knowledge, leadership, and ability to represent the standards we expect at Mo's. WE APPRECIATE YOUR COMMITMENT TO OUR TEAM AND TO THE MO'S STANDARD."}
  ]
};
