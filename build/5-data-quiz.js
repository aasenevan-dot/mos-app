
/* ============ QUIZ — multiple choice. o[0] is always the correct option; shuffled at render. ============ */
const MC = [
 {q:"Which set completes the Iced Seafood Tower list?",o:["King crab, shrimp cocktail, lobster salad, oysters, blackened ahi tuna salad, wonton chips/brioche","King crab, mussels, lobster meat, scallops, shrimp, diavolo","Shrimp, scallops, crab cake, lobster mac, oysters, toast points","King crab, ahi poke, sea bass, oysters, brioche, pesto cream"],t:"food"},
 {q:"What are the five core components of Crispy Ahi Tuna Bites?",o:["Crispy sushi rice, avocado, ponzu, cilantro, jalapeno","Cucumber, sesame tuna, ponzu, spicy mayo, wontons","Ahi, mango, seaweed, calamari salad, wontons","Sushi rice, balsamic pearls, pear wine reduction, crispy leeks, A5"],t:"food"},
 {q:"Which oyster answer is most complete?",o:["Cocktail, mignonette, Tabasco/hot sauce, raw horseradish","Cocktail and tartar only","Remoulade and kung pao","Hollandaise and Bearnaise"],t:"food"},
 {q:"Calamari is prepared and served how?",o:["Lightly breaded/fried with spicy citrus and kung pao","Grilled with hollandaise and lemon","Blackened with remoulade only","Raw with mignonette"],t:"food"},
 {q:"Which dressing list is correct?",o:["House, Orange, Balsamic, Maple Balsamic, Italian, French, Blue Cheese, Oil & Vinegar, Thousand Island, Caesar, Peppercorn Ranch","House, Ranch, Peppercorn Ranch, Caesar only","French, Italian, Honey Mustard, Ranch, Caesar","Maple, Citrus, Thousand Island, Green Goddess"],t:"food"},
 {q:"Correct ticket timing?",o:["Soups, salads, and desserts 5-7 min (10 max); entrees 22-27 min","Soups/salads 15; entrees 45","Soups/salads 2; entrees 12","Soups/salads 10-15; entrees 30-40"],t:"ops"},
 {q:"Roasted Pear Salad includes:",o:["Arugula, Gorgonzola, candied walnuts, dried cherries, maple balsamic","Bibb, Asian pear, cranberries, Dijon, blue cheese","Romaine, croutons, parmesan, Caesar","Iceberg, bacon, blue cheese, tomatoes"],t:"food"},
 {q:"Mirepoix is pronounced and means:",o:["meer-PWAH: onion, carrot, celery","myer-pox: garlic, tomato, pepper","meer-pwah: cream, butter, flour","mire-pwa: parsley, thyme, bay"],t:"food"},
 {q:"Which filet pricing set is current?",o:["Filet 6 oz $54 / 10 oz $79; Wagyu Filet 6 oz $95 / 10 oz $135; A5 $25/oz","Filet 6 oz $40 / 10 oz $60; A5 $32/oz","All filets are only 8 oz","Farbuckle is only a 15 oz cut"],t:"steak"},
 {q:"Well-done filet note:",o:["Offer or expect to butterfly it so it cooks evenly","Never butterfly any filet","Serve blue rare by default","Only cook in the oven, no sear"],t:"steak"},
 {q:"Which is a strong off-menu / special cut answer?",o:["48 oz Porterhouse, 15 oz Hand-Cut/TMP, 45-day dry-aged bone-in ribeye, spinalis, K.D.'s Tomahawk","Only Delmonico and salmon","Only crab Oscar and lobster tail","Only chicken parmesan and primavera"],t:"steak"},
 {q:"Best Japanese A5 sell point:",o:["Kagoshima, $25/oz, extreme marbling, low-stress care, manager slices tableside","Leanest steak with no fat","Best well done with ketchup","Always served ground in tacos"],t:"steak"},
 {q:"Which enhancement is $25?",o:["Steak 47 topping","Bearnaise","Horseradish-Bleu Cheese Crust","Roasted Mushrooms"],t:"steak"},
 {q:"Sea Scallops entree includes:",o:["U-10 scallops, butternut squash puree, prosciutto, wild mushrooms","Scallops, pasta, diavolo, brioche","Scallops, arugula, Gorgonzola, walnuts","Scallops only, no sides"],t:"food"},
 {q:"Twin South African Lobster Tails:",o:["10 oz total and cold-water","5 oz total and warm-water","20 oz total and freshwater","8 oz total and farm-raised"],t:"food"},
 {q:"Miso Seabass prep:",o:["Miso/mirin/sake 24-72 hours, pan seared, broiled","Battered and fried with kung pao","Raw with mignonette","Grilled with peppercorn sauce only"],t:"food"},
 {q:"Primavera Pasta components:",o:["Wild mushrooms, spinach, peeled tomatoes, pesto cream sauce","Diavolo, chicken, garlic bread","Sweet potato puree, Holy Trinity","Coconut risotto and Brussels sprouts"],t:"food"},
 {q:"Chicken Parmesan build:",o:["Fried chicken breast, linguine, tomato diavolo, melted provolone, garlic bread","Stuffed chicken, beurre blanc, asparagus","Chicken tenders and fries","Chicken with pesto cream and mushrooms"],t:"food"},
 {q:"Holy Trinity is:",o:["Bell pepper, onion, celery","Carrot, celery, onion","Garlic, butter, cream","Tomato, pepper, potato"],t:"food"},
 {q:"Which allergen definition is accurate?",o:["Allium means onion, garlic, shallot, chives, leeks","Capsaicin means dairy","Nightshade means shellfish","Legumes means pork"],t:"allergen"},
 {q:"Which item is definitely a gluten risk?",o:["Chicken Parmesan","Plain filet mignon","Twin lobster tails without bread","Plain baked potato without toppings"],t:"allergen"},
 {q:"Steak 47 topping includes:",o:["Shrimp, scallop, lobster meat, asparagus, hollandaise","Crab, blue cheese, bacon, walnuts","Mushrooms, truffle fries, Caesar","Only garlic butter"],t:"steak"},
 {q:"White Cheddar Mashed Potatoes price and add-ons:",o:["$12, add truffle or wasabi for $3","$26, add lobster for $50","$15, no add-ons","$11, served with brioche"],t:"food"},
 {q:"How is Truffle Cauliflower prepared?",o:["Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley","Raw with mignonette","Boiled plain with no seasoning","Always served over linguine"],t:"food"},
 {q:"Guest asks for bacon in the au gratin potatoes:",o:["They already contain bacon mixed in each morning; it cannot be removed. Offer another side or extra bacon on the side","Say bacon is impossible","Say they are vegan","Promise removal for a pork allergy"],t:"allergen"},
 {q:"Shrimp cocktail shrimp:",o:["U-6 Vietnamese tiger shrimp","U-12 Steak 47 shrimp","Bay shrimp","Langoustine"],t:"food"},
 {q:"Bearnaise vs Hollandaise:",o:["Both are egg and butter; Bearnaise adds a tarragon and shallot reduction","They are identical names for cocktail sauce","Hollandaise has no egg or butter","Bearnaise is a tomato sauce"],t:"food"},
 {q:"Dry-aged cuts and process:",o:["Dry Aged NY Strip and 45-day dry-aged bone-in ribeye; moisture evaporates and enzymes tenderize, concentrating flavor","Only filet duo; freezing creates flavor","Only lobster tails; cold water ages them","Only Chicken Parm; breading dries it"],t:"steak"},
 {q:"Can the risotto be made vegetarian?",o:["No — chicken stock is cooked into the base and prosciutto is on top","Yes, rice is always vegetarian no matter the stock","Yes, because it has fish stock","Only if you add bacon"],t:"allergen"},
 {q:"Halal and seed-oil-free note:",o:["Filet-family cuts and chicken are halal; menu is seed-oil-free using beef tallow, olive oil, avocado oil, butter","All fish are halal and all steaks use canola oil","Only pork is halal","No chicken is halal"],t:"allergen"},
 /* extra questions built from the wine + cocktail material */
 {q:"A guest wants a red that will not overpower the Chilean Sea Bass. Best call?",o:["Gary Farrell Russian River Pinot Noir — silky, bright, food friendly","Caymus Special Selection — plush and concentrated","Cade Howell Mountain — mountain tannin","Patrimony by Daou — luxury Paso power"],t:"wine"},
 {q:"Which garnish belongs on the Street Treat Spritz?",o:["Tajin dusting and lemon wheel","Candied kiwi","Dried pineapple","Basil oil drip"],t:"cocktail"},
 {q:"Which drink gets a basil oil drip in a coupe glass?",o:["Lemon Bay","Golden Hour","Lychee Icee","Mo's Cosmo"],t:"cocktail"},
 {q:"Guest wants spicy tequila. Send them to:",o:["Chilean Sea Breeze","Cactus Flower Mule","Lychee Icee","Sweet & Salty"],t:"cocktail"},
 {q:"Which cocktails can be smoked tableside for +$3?",o:["Pittsburghed Peach OF and the Smoked Draft Old Fashioned","Ruby & Jade and Golden Hour","Lemon Bay and Lychee Icee","Mo's Cosmo and Mo Berry"],t:"cocktail"},
 {q:"A table orders a $300 bottle. What do you do?",o:["Let a manager know and use big Bordeaux glasses","Open it at the bar and pour it yourself","Nothing different from a $60 bottle","Decant it without asking"],t:"wine"},
 {q:"Four guests are each ordering wine by the glass. Best move?",o:["Suggest a bottle — for four glasses a bottle is usually the better value","Let them order glasses and say nothing","Suggest the most expensive bottle on the list","Suggest they split one glass"],t:"wine"},
 {q:"Which is the trophy Champagne on the list?",o:["Louis Roederer Cristal — $1000","Moet Imperial Brut — $135","Beau Joie — $135","Taittinger Brut — $155"],t:"wine"},
 {q:"Guest says Cabernet is too dry. What lane?",o:["Merlot or a smooth red blend — the red-wine feel with a softer finish","A mountain Napa Cabernet","An unoaked Chablis","A high-acid Burgundy"],t:"wine"},
 {q:"Esso Affo service note:",o:["Shaken by the bartender but poured tableside","Poured entirely at the bar","Built in the glass at the table by the server","Served hot in a mug"],t:"cocktail"}
];

/* THE REAL 30-QUESTION TEST (graded 7/10, corrected answers) */
const OPEN = [
 ["List the ingredients in the Iced Seafood Tower and the Roasted Seafood Tower.","Iced: king crab legs, shrimp cocktail, lobster salad, oysters, blackened ahi tuna, wonton chips, toasted brioche. Roasted: king crab legs, scallops, lobster, shrimp, mussels, diavolo sauce."],
 ["What comes with the Crispy Ahi Tuna Bites?","Crispy sushi rice, avocado, ponzu sauce, jalapeno, cilantro/microgreens."],
 ["What sauces are served with the oysters on the half shell?","Cocktail sauce, mignonette, Tabasco/hot sauce, raw horseradish."],
 ["What is the preparation of the calamari and what sauces come with it?","Lightly breaded and flash-fried; kung pao sauce and spicy citrus sauce."],
 ["Name all dressings. Which is the house dressing?","House vinaigrette, orange vinaigrette, balsamic vinaigrette, maple balsamic, Italian, French, blue cheese, oil and vinegar, Thousand Island, Caesar, peppercorn ranch. House dressing: house vinaigrette. Only one ranch."],
 ["What is the time frame for salads and soups? For entrees?","Soups, salads, and desserts 5-7 minutes, 10 minutes max. Entrees 22-27 minutes."],
 ["What does the Roasted Pear Salad consist of?","Arugula, roasted pear, Gorgonzola, candied walnuts, dried cherries, maple balsamic."],
 ["How is the Baked French Onion prepared?","Vidalia onions caramelized in veal/beef broth for 48-72 hours, served in a brown crock with an herb crouton, provolone, and parsley, then broiled. Mirepoix is onion, carrot, celery."],
 ["Name all filet cuts and oz, including Australian and Japanese.","Filet mignon 6, 8, 10, 15 oz. Australian Wagyu filet 6 and 10 oz. Japanese A5 by the ounce. Filet Duo: two 3 oz end-cut medallions."],
 ["Describe our steak temperatures.","Blue rare cold red center; rare cool red; medium rare warm red; medium warm pink; medium well slight pink; well done little to no pink. Butterfly well-done filets."],
 ["What are our off-menu steak cuts?","48 oz porterhouse (NY strip and filet in one cut), 45-day dry-aged bone-in ribeye, spinalis/ribeye cap, K.D.'s Tomahawk, 15 oz hand-cut/TMP filet, 14 oz bone-in filet."],
 ["Sell the Japanese A5.","Kagoshima, sold by the ounce. Highest grade of Wagyu, extreme marbling from generations of breeding, low-stress handling, and a specific grain finishing diet. The fat renders like butter — best rare to medium rare. A manager slices it tableside."],
 ["List and describe all enhancements.","Crab Oscar $14, horseradish-bleu cheese crust $4, bearnaise $2, 5 oz lobster tail $50, two scallops $14, brandy peppercorn $6, black truffle butter $6, garlic butter $6, roasted mushrooms $8, Steak 47 $25."],
 ["Describe the Sea Scallops entree.","U-10 scallops pan-seared for a golden crust, with butternut squash puree, prosciutto, and wild mushrooms."],
 ["How many oz are the Twin South African Lobster Tails? Cold or warm water?","Two 5 oz tails, 10 oz total. Cold-water tails, which are sweeter and more tender."],
 ["Describe the Miso Seabass and the miso prep.","Patagonian toothfish marinated in white miso, mirin, and sake for 24-72 hours, pan-seared and finished in the broiler. Coconut risotto and Brussels sprouts."],
 ["What does the Primavera Pasta consist of?","Linguine with wild mushrooms, spinach, peeled tomatoes, and pesto cream sauce."],
 ["What does the Chicken Parmesan consist of?","Hand-breaded fried chicken breast, linguine, tomato diavolo sauce, melted provolone, garlic bread."],
 ["What does the Blackened Creole Salmon consist of?","Faroe Island salmon, blackened, with sweet potato puree, Holy Trinity relish, and remoulade. Holy Trinity is bell pepper, onion, celery."],
 ["List all allergies and what they consist of.","Allium, gluten, dairy, egg, tree nuts, nightshade, shellfish, legumes, soy, sesame, fin fish/white fish, alcohol, crab, pineapple, capsaicin, MSG, pork, beef."],
 ["Which items contain gluten?","Goat cheese spread, crab cake, calamari, prime meatballs, wagyu tacos, crispy ahi/tuna poke with wontons, roasted tower pasta, iced tower wonton and brioche, lobster bisque, French onion crouton, house and Caesar croutons, chicken parmesan, primavera, lobster mac, truffle fries, sliders, burger buns, egg rolls, chicken parm sandwich, most cakes and cookies."],
 ["What is the upcharge for Steak 47 style?","$25 — shrimp, scallop, lobster meat, asparagus, hollandaise."],
 ["List all sides with prices.","Grilled asparagus $15, creamed corn $12, creamed spinach with butternut squash $16, creamy risotto $15, baked potato $11, white cheddar mashed $12 (add truffle or wasabi $3), truffle cauliflower $14, lobster mac $26, jalapeno au gratin $15, Brussels sprouts $15, truffle fries $11."],
 ["How is the Truffle Cauliflower prepared?","Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley."],
 ["If a guest requests bacon in the au gratin potatoes, how do you respond?","Politely explain the au gratin potatoes are made fresh each morning with bacon already mixed in, so it cannot be removed. Offer another side, or extra bacon on the side."],
 ["What shrimp do we use for the shrimp cocktail?","U-6 Vietnamese tiger shrimp."],
 ["What is the difference between Bearnaise and Hollandaise?","Both are egg and butter sauces. Bearnaise has a tarragon and shallot reduction; hollandaise does not."],
 ["Which cuts are dry aged and what does dry aging do?","Dry-aged New York strip and the 45-day dry-aged bone-in ribeye. The meat hangs in a controlled room so moisture evaporates and enzymes tenderize it, concentrating rich, nutty, beefy umami."],
 ["Can the risotto be made vegetarian?","No. It is cooked with chicken stock and topped with crispy prosciutto. Removing the prosciutto does not make it vegetarian."],
 ["Which steaks are halal? Add the seed-oil note.","Filet-family cuts and chicken: filet mignon, filet duo/end cuts, Farbuckle filet, Australian Wagyu filet, Japanese A5. Confirm non-filet cuts with a manager. Mo's is seed-oil-free and cooks with beef tallow, olive oil, avocado oil, and butter."]
];

/* ============ OPS ============ */
const FLOW = [
 ["Before you walk up",["Know soup of the day, oysters, 86'd items, Chef's Corner, specials, and big features.","Know the cocktail menu well enough to give 2 easy recommendations.","Know allergy protocol: ask the allergy, ring it in, tell back server, expo and chef, and a manager.","Know timing: soups, salads, and desserts 5-7 minutes (10 max); entrees 22-27 minutes."]],
 ["Greet",["Introduce yourself and your back server.","Ask first time, celebration, allergies, and whether they want the wine list.","Point them to cocktails, beer, wine, and whiskey.","Keep it warm and short."]],
 ["Drinks first",["Get drinks started quickly.","If they are unsure, give two simple choices — light and refreshing: Cactus Flower Mule or Lychee Icee. Sweet and fruity: Ruby & Jade or Golden Hour. Whiskey: Pittsburghed Peach Old Fashioned.","If they order a wine bottle over $250, let a manager know and use big Bordeaux glasses."]],
 ["Appetizers",["After drinks, ask about apps.","Recommend 2-3 confidently: shrimp cocktail, calamari, crispy ahi tuna bites, oysters, or a seafood tower.","Send apps quickly and tell the back server.","Apps buy you time, but do not forget to course the rest."]],
 ["Menu wrap / order",["Hit the key items, not a speech.","Mention soup and salad protocol if needed.","Mention steak temps and that well-done filets should be butterflied.","Ask sides and enhancements: Oscar, Steak 47, lobster tail, scallops, truffle butter, mushrooms.","Any special request must be confirmed with the chef."]],
 ["Course checkbacks",["Check apps and salads after they land.","After salad or soup clears, ask about another round or a second bottle.","Entree checkback is 2-5 minutes after entrees hit: \"Is everything tasting perfect for us?\"","If the answer sounds weak, fix it immediately."]],
 ["Work with your back server",["You are the table lead; the back server keeps the table moving.","Write the dinner ticket neatly.","Let the back server reset, but help if they are buried.","For large tables, Farbuckle, A5, towers, or tableside items, help run and drop food."]],
 ["Dessert and close",["Ask about dessert, after-dinner drinks, port, espresso martini style drinks, or cocktails.","On busy nights have the check ready with dessert.","If something went wrong, fix it before dessert and the check.","Last impression matters — thank them by name when you can."]]
];

const ANCHORS = [
 ["Mission","Leave people better than you found them."],
 ["Front server role","Table leader, relationship builder, order and ring authority, pacing owner, beverage and menu seller, check-average driver."],
 ["Always hit","First time, celebration, wine list, allergies, features, soup, oysters, Chef's Corner, 86'd items, and wine/app suggestions."],
 ["The wine move","Ask whether they are leaning lighter and smoother or bigger and richer, then give two confident choices."],
 ["One-liner","Lead the table, sell confidently, keep pacing clean, communicate with your back server, and fix problems before the guest has to ask twice."]
];

const SALES = {
 rows:[
  {d:"2026-07-13",teams:3,bq:"No / normal Sunday",net:4164.51,grat:34.50,tips:1236.60,tt:1271.10,tax:373.11,gc:0,total:5808.72},
  {d:"2026-07-20",teams:4,bq:"Yes / banquet-heavy",net:9129.50,grat:774.18,tips:1424.75,tt:2198.93,tax:621.69,gc:750,total:12700.12}
 ],
 /* calibrated to the two logged Sundays */
 teamBase:1388.17,        // net per team on a normal Sunday (7/13 actual)
 banquetBlock:3871,       // 7/20 banquet net, derived: $774.18 auto-grat / 20% assumed banquet grat
 banquetGratRate:.20,     // assumption used to size the banquet block
 tipNormal:.305,          // dining tips+grat as % of net, normal Sunday (7/13 actual)
 tipBanquetDay:.271,      // dining-portion tip rate observed on the banquet Sunday (7/20)
 taxRate:.0896,           // 7/13 actual. Greenwood = 7% IN sales + 1% Johnson Co F&B + 1% Greenwood city F&B ≈ 9%
 checkHints:[["Lighter",95,"entree + shared side + one drink"],["Typical",115,"split app, entree, side split, 1-2 drinks"],["Wine table",140,"adds bottle share and dessert"]],
 bqHeadDefault:105,       // editable placeholder for banquet per-head until a real contract number is logged
 occasions:[
  ["Regular Sunday",1.00,"baseline"],
  ["Mother's Day",1.75,"busiest restaurant day of the year — treat as a sellout test"],
  ["Valentine's weekend",1.50,"second-busiest day nationally"],
  ["Father's Day",1.50,"steakhouse holiday"],
  ["Easter",1.35,"brunch-to-dinner holiday"],
  ["Graduation weekend (May)",1.30,"Center Grove / Greenwood / Whiteland parties"],
  ["December party season",1.25,"holiday dinners and gift cards"],
  ["Local event spillover",1.10,"Freedom Festival (late June), WAMMfest (mid-Aug), mall events"],
  ["Holiday travel weekend",0.85,"July 4th week, Labor Day — regulars out of town"],
  ["Colts 1pm home game",1.00,"direction unknown for the south side — log it and find out"]
 ],
 weather:[["Clear",1.00],["Rain",0.95],["Storm / snow",0.80]],
 impliedChecks:[95,115,140],
 /* REAL tip rules — decoded from Evan's 5/23/26 solo checkout (Server Checkout Summary + Toast Shift Review) */
 guestTipRate:.208,       // credit tips ran 20.8% of team net sales on 5/23
 withheldRate:.02,        // Toast withholds 2% of credit tips before payout
 tipouts:[["Bar",.01],["Busser",.015],["Expo",.005]],   // % of TEAM NET SALES, each rounded UP to next dollar
 banquetTipout:.03,       // extra 3% of sales when your team runs a banquet
 checkout523:{sales:1176,tips:244.10,withheld:4.88,pool:239.22,tipout:36,earned:203,guests:14,perGuest:84},
 log:["Date and day of week","Number of teams","Team #","Cocktailer on the schedule?","Dining cover count","Net sales","Gratuity","Toast tips","Tax","Deferred gift cards / other","Toast total","Occasion (holiday, graduation, event)","Weather","Colts / big TV game that day","Notes: big reservations, call-offs, patio"],
 read:"The July 20 jump was the banquet, not the fourth team. Strip out the banquet (about $3,871 of net, sized from its $774 auto-grat at 20%) and the dining room did roughly $1,315 per team — almost identical to a normal Sunday's $1,388. Banquets are now parked in their own tool below and kept out of the Sunday forecast completely. Covers x average check overrides everything once real cover counts get logged."
};

/* front/back split rules — CONFIRMED by the 5/23/26 checkout sheet */
const SPLIT_RULES=[
 "Each team is a front server and a back server.",
 "Toast takes 2% of your credit tips off the top (tips withheld). What's left, plus any cash tips and gratuity, is your team pool.",
 "Tip out from TEAM NET SALES: bar gets 1%, busser gets 1.5%, expo gets 0.5% — each line rounds UP to the next whole dollar. Running a banquet adds 3%.",
 "The polisher is a flat tip-out, not a percent: $10 when your team is a front and a back, $5 when you solo. Almost always $10, because solo is really the cocktailer's world — Jenny or Taylor, primarily.",
 "Pool minus tip-outs is what the team earned. Drop the cents.",
 "Split earned 50/50 between front and back. When it lands odd, the back server takes the greater dollar.",
 "Every rule here was proven to the dollar against real graded house checkouts."
];



/* walk-in planning numbers, as Evan stated 8/4 */
const WALKINS={weekend:[30,70,50], weekday:[15,30,22], booksShare:.65};

/* income predictor day presets — restaurant week runs WEDNESDAY through TUESDAY, like the schedules.
   teams from the schedule patterns, walk-ins from Evan's gut rules. All editable. */
const DAYPRE={
 wed:{label:"Wednesday",teams:4,wkRule:22},
 thu:{label:"Thursday",teams:5,wkRule:22},
 fri:{label:"Friday",teams:8,wkRule:50},
 sat:{label:"Saturday",teams:7,wkRule:50},
 sun:{label:"Sunday",teams:3,wkRule:"half"},   // "60 books -> I'd guess 30 walk-ins"
 mon:{label:"Monday",teams:3,wkRule:15},
 tue:{label:"Tuesday",teams:4,wkRule:15}
};
const CHECK_CAL=115;   // menu-math check, per Evan's preset
const CKTAIL_WEIGHT=.7; // the cocktailer takes ~0.7 of a team's slice — with 3 teams + cktail each team gets ~27%, matching Evan's stated 23–30%

/* private dining rooms from mosgreenwood.com — minimums NOT published, verify with Lillian */
const ROOMS=[
 ["The Smockton","70 seated / 125 cocktail-style"],
 ["The Curry (semi-private)","72 seated / 125 cocktail-style"],
 ["The Lounge (semi-private)","25 seated"],
 ["The Vault","15 seated"]
];


const CONFLICTS = [
 ["Caymus Cab by the glass","$25 / $95 (6/20)","$32 / $155 (7/3)","Use $32 / $155"],
 ["Belle Glos Las Alturas glass","$17 (6/20)","$18 (7/3)","Use $18 / $62"],
 ["Conundrum bottle","$60 (6/20)","$50 (7/3)","Use $16 / $50"],
 ["Filet Mignon","6 oz $50 / 10 oz $75 (6/20)","6 oz $54 / 10 oz $79 (7/3)","Use $54 / $79"],
 ["Australian Wagyu Filet","10 oz $125 (6/20)","10 oz $135 (7/3)","Use $95 / $135"],
 ["Japanese A5","$32/oz (6/20)","$25/oz (7/3)","Use $25/oz"],
 ["Calamari","$14 (6/20)","$17 (7/3)","Use $17"],
 ["Seasonal Oysters","$26 (6/20)","$25 (7/3)","Use $25"],
 ["Seared Blackened Tuna","$26 app (6/20)","Now Crispy Ahi Bites $18 (7/3)","Item changed — Q2 on the test"],
 ["Mer Soleil Chardonnay","On the 6/20 list","Missing from the 7/3 sheet","Verify it is still poured"],
 ["Dona Paula Malbec","Not on 6/20","$14 / $52 on 7/3","New by-the-glass add"],
 ["Advice From John producer","Buehler Estate on the bottle list","\"By Orin Swift\" by the glass","Verify with a manager"]
];
