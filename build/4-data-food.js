
/* ============ FOOD MENU ============ */
/* [name, price, description, tag] */
const MENU = {
 "Starters & Lounge":[
  ["Crispy Ahi Tuna Bites","$18","Crispy sushi rice, avocado, ponzu sauce, cilantro, jalapeno. Remoulade or spicy citrus on the side if expected. Served with metal Japanese chopsticks (added 8/4).","Test Q2 — this replaced the old seared blackened ahi appetizer"],
  ["Seasonal Oysters","$25","On the half shell. Cocktail sauce, mignonette, Tabasco/hot sauce, raw horseradish. Setup: oyster fork with Tabasco and Zesta crackers, cocktail forks, and hot water for the dry ice presentation — no tongs. Know it: warm-water oysters run larger, sweeter, more tender; cold-water run smaller, brinier, firmer.","Menu marks GF"],
  ["Calamari","$17","Lightly breaded and flash-fried. Spicy citrus and kung pao sauces. Serve with tongs.",""],
  ["Shrimp Cocktail","$26","U-6 Vietnamese tiger shrimp with fiery cocktail sauce.","Know the U-6"],
  ["Goat Cheese Spread","$17","Apples, toasted points, pistachios, local honey.","Gluten + tree nuts"],
  ["Crab Cake","$18","95% crab, 5% filler — breadcrumbs and (typically) mayo. Maryland style, served with remoulade. Great selling point: it is almost all crab.","95% crab — confirmed 8/4"],
  ["Creamy Spicy Crab Dip","$22","House-made tortilla chips.","Menu marks GF"],
  ["Prime Meatballs","$16","Made from our filet, ribeye, and NY strip trim with a breadcrumb binder. House marinara and three-cheese blend.","Trim + breadcrumbs — confirmed 8/4"],
  ["Wagyu Tacos","$25","Chimichurri and wonton shell, caramelized onions, balsamic pearls. The sauce is a balsamic glaze.",""],
  ["A5 Nigiri","$35","Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks. Served with two metal Japanese chopsticks.","$35 confirmed 8/4"],
  ["Filet Sliders (2)","$18","Provolone, smoked garlic aioli, crispy onion strings, pretzel bun, house-made chips.","Lounge"],
  ["Carne Asada Nachos","$25","Marinated steak, cheese, pico de gallo, avocado, cilantro sour cream.","Lounge"],
  ["Prime Beef Burger","$23","Bacon, cheddar, lettuce, tomato, onions, aioli, French fries.","Lounge"],
  ["French Dip Egg Rolls","$15","Au jus marinated shaved steak, three-cheese blend, caramelized onions, creamy horseradish.","Lounge"],
  ["Chicken Parm Sandwich","$24","Fried chicken breast, provolone, tomato diavolo sauce, garlic toasted bun.","Lounge"],
  ["Tuna Poke","$29","Sushi rice, avocado, mango, seaweed, calamari salad, spicy citrus sauce, wontons.","Lounge"],
  ["King Crab Legs","MP","Served with melted butter and cocktail sauce. Setup: cocktail forks, tongs, butter warmer with clarified butter. Recently around $125 a pound — but ALWAYS quote Toast, never memory.",""]],

 "Seafood Towers":[
  ["Iced Seafood Tower","$98","King crab legs, shrimp cocktail, lobster salad, oysters, blackened ahi tuna salad, wonton chips and brioche bread.","6 items — memorize"],
  ["Roasted Seafood Tower","$190","King crab legs, scallops, lobster meat, shrimp, mussels, tossed in diavolo sauce. SERVICE: stacking rack in the base, stack at the table over a black linen, cocktail forks preset, butter warmer with a tealight. HALFWAY through, clear shells and stir the pasta setup into the remaining seafood-butter sauce — the tableside pasta is the value moment, do NOT skip it.","Bechamel is the base sauce (Mornay-style once cheese is in). We stir our bechamel cheese-sauce pasta into the tower sauce and the house calls the result CAPAVETTI PASTA — per Evan, that is exactly how we say it."]],

 "Soup & Salad":[
  ["Soup of the Day","$7 printed / comp with entrees","One soup of the day per shift. It comes COMPLIMENTARY with entrees — or the guest can upcharge $4 to lobster bisque or baked French onion. Verify the exact soup before answering any allergen question.","New comp system — Evan 8/4"],
  ["Prime Beef Chili","OFF the menu right now","Chili paste, tomato paste, onions and garlic, beer deglaze, veal stock. Currently pulled — comes back sometimes as the soup of the day or a bonus $4 soup; probably returns for winter.","Off menu 8/4"],
  ["Lobster Bisque","$11","Lobster stock, roux, white wine, sherry vinegar. Also the $4 soup-course upcharge from the comp soup of the day. ($11 on the current print — the old sheet said $13.)",""],
  ["Baked French Onion","$13","Vidalia onions caramelized with butter, deglazed with red wine, in beef bone stock with mirepoix and herbs 48–72 hours. Brown ceramic crock, herb crouton, provolone melted in the broiler, parsley.","Mirepoix = meer-PWAH = onion, carrot, celery"],
  ["House Salad","$7","Romaine mix with carrots, cucumbers, cherry tomatoes, red cabbage (in the mix — cannot be removed), and croutons. House ranch and house dressing are made IN-HOUSE (the ranch runs mayo + buttermilk — that is egg and dairy — plus a touch of MSG). Other dressings: check before promising labels.",""],
  ["Roasted Pear Salad","$16","Arugula base, roasted pear, Gorgonzola, candied walnuts, dried cherries, maple balsamic.","Dairy + tree nuts"],
  ["Caesar / Gem Caesar","$15","Parmesan, croutons, sous-vide egg dressing, white anchovies and bonito.",""],
  ["Chopped Wedge Salad","$15","Blue cheese, bacon, marinated tomatoes.",""]],

 "Prime 47 Cuts & Wagyu":[
  ["Farbuckle Filet","6 oz $63 / 10 oz $87","THE SHOW (from the graded tests): ring at the guest's temp, bring a sizzling skillet + tongs + gloves + tray + rosemary salt + beef tallow + warm butter. Steaks in, butter while they cook, beef tallow before pulling, finish with rosemary salt, serve. You can Farbuckle ANY cut for roughly a $9 upcharge (the $63 minus $54 difference).","Help run this one"],
  ["Filet Mignon","6 oz $54 / 10 oz $79","Classic center-cut tender filet. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4.","Price updated 7/3"],
  ["The PD — 15 oz Hand-Cut Filet","$115","On the printed menu — house calls it the PD. Confirmed on the published menu 8/4.",""],
  ["Filet Duo","$47","Two 3 oz end-cut medallions. Crab Oscar and horseradish bleu cheese crust.",""],
  ["Dry Aged New York Strip","14 oz $58","Dry-aged flavor. The meat hangs in a controlled room; moisture evaporates and enzymes tenderize, concentrating rich, nutty, beefy umami.","Dry aged"],
  ["Delmonico Ribeye","16 oz $80","Rich, marbled ribeye.",""],
  ["K.D.'s Tomahawk","32 oz $160","A ribeye that keeps the whole rib bone. Even more heavily marbled than the Delmonico. The bone lets marrow render during cooking, adding a butteriness you can only get by keeping the rib bone. The juiciest, most flavorful cut we offer besides the Japanese A5.","K.D. = Kevin Dickey, former owner · largest oval plate"],
  ["Australian Wagyu Filet","6 oz $95 / 10 oz $135","More marbling and lower-rendering wagyu fat. Serve rare to med-rare — nudge, don't argue.","Price updated 7/3"],
  ["Japanese A5 Wagyu","$25/oz","From Kagoshima Prefecture. The show: a manager cut, sliced with a Hanzo steel knife on a butcher's block, torch-finished with rosemary salt at the table. Preset the guests with the special Kobe Hanzo steak knives. House serves wagyu RARE to MED-RARE — nudge gently, never argue.","Confirmed $25/oz 8/4 — matches the published menu (6 oz $150)"],
  ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: about 15 oz NY strip + 8 oz filet + a 25 oz bone. Board service, manager slices tableside. The move: two people split it for a high-class manager-cut experience at a great value.","Off-menu special"],
  ["Spinalis / Ribeye Cap","$14/oz, min 6 oz","Rivals filet tenderness while keeping ribeye richness.","Off-menu — $10/oz on Spinalis Sunday"],
  ["45-Day Dry-Aged Bone-In Ribeye","22 oz — $120? VERIFY price","22 oz per the graded test answer key; aged a full 45 days. Evan thinks $120 — price still needs verified.","Off-menu, dry aged"]],

 "Surf & Turf":[
  ["Steak 47","$58","Filet topped with shrimp, scallop, lobster meat, asparagus, and hollandaise.","The Steak 47 topping upcharge is $25"],
  ["Filet & Lobster","$105","Filet plus lobster tail.","Menu marks GF"],
  ["Filet & Scallops","$82","Prosciutto-wrapped scallops.",""],
  ["Ahi Tuna & Wagyu Beef","$68","Ahi with sesame, hoisin, wasabi mashed potatoes, beurre blanc.",""]],

 "Enhancements":[
  ["Crab Oscar","$14","Snow crab, asparagus, hollandaise.","Menu marks GF"],
  ["Steak 47 topping","$25","Shrimp, scallop, lobster meat, asparagus, hollandaise.","The $25 answer"],
  ["Horseradish-Bleu Cheese Crust","$4","Melted bleu cheese crumbles, horseradish, herbs.",""],
  ["Bearnaise Sauce","$2","Egg and butter sauce with a tarragon and shallot reduction. Herbier than hollandaise. Yes — really $2, confirmed.","Bearnaise has tarragon + shallot; hollandaise does not"],
  ["Add 5 oz Lobster Tail","$50","Add to any entree.","Menu marks GF"],
  ["Add 2 Scallops","$14","Two scallops added to any entree.",""],
  ["Brandy Peppercorn Sauce","$6","Demi-glace and brandy peppercorns.","Menu marks GF"],
  ["Black Truffle Butter","$6","Truffle butter steak finish.","Menu marks GF"],
  ["Garlic Butter","$6","Steak enhancement — active in Toast, confirmed 8/4.",""],
  ["Roasted Mushrooms","$8","Comes in a small soup bowl with a big spoon — confirm with the guest, then scoop it over their steak. Confirmed current 8/4.",""]],

 "Exclusives":[
  ["Chicken Parmesan","$39","Hand-breaded fried chicken breast, linguine, tomato diavolo sauce, melted provolone, garlic bread.","New on the menu"],
  ["Primavera Pasta","$40","Linguine, wild mushrooms, spinach, peeled tomatoes, pesto cream sauce. Add-ons available: chicken, salmon, steak, shrimp (2 scallops are $14 per the enhancements). Add-on PRICES still need a Toast check — do not quote from memory.","Main vegetarian-style entree"],
  ["Miso Seabass","$46","Patagonian toothfish vacuum-sealed with white miso paste, mirin, and sake for 48–72 hours, pan seared and finished in the broiler. Coconut risotto with Brussels sprouts sprinkled over the top.","Evan says 48–72 hrs; the old test key said 24–72 — go with the kitchen"],
  ["Sea Scallops","$48","U-10 scallops pan seared for a golden crust. Butternut squash puree, prosciutto, wild mushrooms.","Menu marks GF"],
  ["Chilean Sea Bass","$46","Asparagus, spinach, tomato, creamy lemon-caper sauce.","Menu marks GF"],
  ["Blackened Creole Salmon","$42","Faroe Island salmon, blackened. Sweet potato puree, Holy Trinity relish, remoulade.","Holy Trinity = bell pepper, onion, celery"],
  ["Short Rib Pasta","$52","Orecchiette, vermouth cream sauce, braised short rib.",""],
  ["Stuffed Chicken Breast","$38","Cream cheese, goat, parmesan, white cheddar; beurre blanc-style sauce.","Halal option noted"],
  ["Twin South African Lobster Tails","$100","Two 5 oz tails, 10 oz total. Cold-water tails, which are sweeter and more tender.","Cold water — know why"]],

 "Accessories / Sides":[
  ["Every side shares","feeds 2-3","Every single side is built to share — comfortably feeds 2 to 3 people. Rule of thumb from the tests: suggest 3-4 sides for a table of six.","Confirmed 8/4"],
  ["Grilled Asparagus","$15","With hollandaise.","Menu marks GF"],
  ["Creamed Corn","$12","Cream, dijon, horseradish, dill.","Menu marks GF"],
  ["Creamed Spinach with Roasted Butternut Squash","$16","Sauteed spinach in a cream sauce over roasted butternut squash. Marked g on the current menu — it CONTAINS gluten.",""],
  ["Creamy Risotto","$15","Crispy prosciutto and sundried tomatoes. Cooked in chicken stock.","NOT vegetarian — chicken stock + prosciutto"],
  ["Baked Potato","$11","Base: butter and sour cream, served with a bread knife. LOADED upgrade — chives, bacon, cheese — for an upcharge (price VERIFY). Loaded adds pork.","Menu marks GF (base)"],
  ["White Cheddar Mashed Potatoes","$12","Butter, cream, white cheddar. Add truffle $3 or wasabi $3 — confirmed 8/4.","Menu marks GF · upsell the $3 add"],
  ["Truffle Cauliflower","$14","Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley.","Newer side — confirmed current 8/4"],
  ["Lobster Mac N' Cheese","$26","Lobster stock, roux, pasta, cheese, panko. Premium share side.","Biggest side upsell"],
  ["Jalapeno Potatoes Au Gratin","$15","Jalapeno, bacon, green onion, cheese, garlic.","Bacon is mixed in each morning — cannot be removed"],
  ["Brussels Sprouts","$15","Deep fried with a balsamic glaze over the top (the old sheet said sriracha hot honey — Evan corrected 8/4). If both sauces float around, ask which is on tonight.",""],
  ["Truffle Fries","$11","Lightly breaded, shaved parmesan. Gluten and fryer check.",""],
  ["Forest Mushrooms","$14","Garlic compound butter. ARCHIVED — off the menu as of 8/4. The $8 Roasted Mushrooms enhancement is the current mushroom play.","Archived side"]],

 "Desserts":[
  ["Mo's Cookie / Prime Cookie","$10","Half-baked chocolate chip cookie served with vanilla ice cream and Hershey's syrup.","Dairy, egg, gluten"],
  ["Celebration Cake","$14","Five layers of technicolor vanilla cake layered with white chocolate mousse, served with a strawberry drizzle and gummi bears.","Celebration play — menu photo 8/4"],
  ["The Mo's Sundae","$15","Chocolate chip cookie dough, ice cream, Hershey's syrup, Meyer's dark rum caramel, strawberry sauce, fresh whipped cream.","Name history: Kristen Sundae, then printed as the Celebration Sundae, now the Mo's Sundae — Kristen was a former owner's wife"],
  ["Celebration drop (free)","comp with any celebration","Every celebrating table gets a free treat — their pick: the CELEBRATION SUNDAE (bowl of ice cream in a large soup bowl with chocolate and caramel, a sprinkle or two for fun) or a COMP MO'S COOKIE (half-baked cookie dough, scoop of vanilla bean ice cream, chocolate drizzle poured on BY THE SERVER at the table). We do NOT sing — we light a SPARKLER with it and make the table feel special. Sing only if you want to.","Confirmed 8/4"],
  ["NY Style Cheesecake","$10","Served with fresh whipped cream and strawberry sauce.","Dairy, egg, gluten"],
  ["Bailey's Creme Brulee","$10","Topped with fresh whipped cream and berries.","Alcohol, egg, dairy"],
  ["Colossal Carrot Cake","$14","Layered high with moist carrot cake and cream cheese icing.","Eggs, milk, soy, tree nuts, gluten, pineapple"],
  ["Molten Lava Cake","$13","Chocolate dome filled with chocolate cake, strawberries, and ice cream, topped with Hershey's chocolate syrup. Menu marks GF / flourless — but it still has eggs, dairy, and soy.","GF-marked, NOT allergen-free"],
  ["Brown Butter Cake","$14","Vanilla ice cream, caramel sauce, and Granny Smith apples.","Eggs, milk, soy, gluten"],
  ["Cotton Candy","$12","Menu marks GF. Every color of the rainbow, all taste like sugar — tell the table 'pick your color.'","Pairs with Ruffino Moscato"],
  ["Bananas Foster","$12/person — minimum 2 people","THE BACK SERVER RUNS THIS SHOW. Per person: 1 scoop brown butter + half a banana, and half an orange per two bananas (going over is fine). Bring: cinnamon, 99 Oranges liqueur, Nilla wafers, caramel, burner, pan. The show: melt the brown butter, breaking it up with the spatula. Coat the bananas evenly in it. Add the orange citrus so nothing burns. Pour 99 Oranges over the top and light it — big flame. Sprinkle cinnamon into the fire and it sparks up (cinnamon is made of wood, so it burns) — a fantastic show. Pour it all over bowls of ice cream with the caramel and Nilla wafers, serve with spoons. Great upsell: get the whole table in on it.","Back server's show"],
  ["Sorbets (not really sold)","in the freezer","Lemon (and maybe pistachio) sorbet live in the freezer, dairy-free — but they are off the menu and we do not really sell them. Archive item.","Not sold — 8/4"],
  ["Pistachio Gelato","varies","Dairy and tree nuts.",""]],

 "Kids Menu":[
  ["4 oz Filet Mignon","$30","Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4.","Whole kids menu photo-confirmed 8/4 — all 6 items, all prices"],
  ["Chicken Tenders with Fries","$10","Breaded and fried in the shared fryer. Standard breading assumed — flags stay until the kitchen says otherwise.",""],
  ["Buttered Noodles","$10","Pasta plus butter.",""],
  ["Mac N Cheese","$10","Pasta and cheese sauce.",""],
  ["Prime Beef Burger","$23","Bun and condiments drive most allergens.",""],
  ["Chicken Teriyaki","$15","The sauce has soy and wheat — confirmed 8/4.",""]]
};

const TEMPS = [
 ["Blue rare","Cold red center"],
 ["Rare","Cool red"],
 ["Medium rare","Warm red"],
 ["Medium","Warm pink"],
 ["Medium well","Slight / hot pink"],
 ["Well done","Little to no pink — butterfly well-done filets"]
];

const A5PITCH = [
 "Our A5 Wagyu comes from the Kagoshima prefecture. Japanese farmers can spend their whole life trying to get a steak to A5 grade.",
 "It can take multiple generations of cattle breeding to finally get the variables all correct in order to get cattle that are so high in fat content.",
 "Stories of farmers suspending cows off the ground, farmhands being unable to shout around them for fear of creating stress, playing classical music, and the fact that they are not allowed to roam and graze for fear of fat burning are huge selling points.",
 "But more than that is the diet. Farmers maximize the marbling score by feeding the cattle grain ONLY during the last few months of life, and a diet rich in healthy fats like oleic acid.",
 "The fat is so renderable that even just a swipe of your finger across the steak will render out a puddle of fat on your finger from your body heat. That is why it is best rare to medium rare.",
 "It is more akin to eating bone marrow or butter than actual steak. Expect an extremely soft texture, juices exploding out with every bite, and a beefy richness unmatched by any cut in the city.",
 "A manager always slices it tableside on a wooden board with a Japanese knife and gloves. They talk about the steak and add value to the moment."
];

const DRESSINGS = ["House Vinaigrette (the house dressing)","Orange Vinaigrette","Balsamic Vinaigrette","Maple Balsamic","Italian","French","Blue Cheese","Oil & Vinegar","Thousand Island","Caesar","Peppercorn Ranch"];

/* ============ ALLERGENS ============ */
/* [dish, price, flags[], note] */
const ALLERGENS = [
 ["Goat Cheese Spread","$17",["dairy","gluten","tree nuts"],"Goat cheese, toasted points, pistachios."],
 ["Creamy Spicy Crab Dip","$22",["crab","shellfish","dairy","capsaicin","allium","cross-contact"],"Menu marks GF, but the house chips come out of the SHARED fryer — cross-contact confirmed. If the creamy base uses mayo that adds egg — ask the chef."],
 ["Seared Blackened Scallops","$26",["shellfish","dairy","capsaicin","nightshade"],"Menu marks GF. Truffle creamed corn carries dairy. Blackening spice is paprika/cayenne — that is nightshade too."],
 ["Prime Meatballs","$16",["beef","dairy","gluten","egg","allium","nightshade"],"Breadcrumb binder — gluten CONFIRMED 8/4. Made from steak trim. Egg still unconfirmed."],
 ["Crab Cake","$18",["crab","shellfish","egg","gluten","capsaicin","allium"],"95% crab, 5% filler — breadcrumbs CONFIRMED (gluten), mayo typical (egg). Remoulade on the side."],
 ["Wagyu Tacos","$25",["beef","gluten","soy","allium","egg"],"Wonton shell — egg confirmed. Sauce is a balsamic glaze; soy still unconfirmed, keep the flag."],
 ["Calamari","$17",["shellfish","gluten","soy","sesame","capsaicin","cross-contact","legumes"],"Fried in the SHARED fryer — cross-contact confirmed. Kung pao HAS peanuts (Evan, 8/4) — flag every peanut allergy. Egg in the breading still unconfirmed."],
 ["Shrimp Cocktail","$26",["shellfish","capsaicin","nightshade","allium"],"Fiery cocktail sauce."],
 ["Seasonal Oysters","$25",["shellfish","allium","nightshade","capsaicin"],"Menu marks GF. Cocktail sauce and mignonette add tomato, pepper, shallot. Zesta crackers ride on the setup — that is gluten next to the plate, pull them for a gluten allergy."],
 ["Crispy Ahi Tuna Bites","$18",["fin fish","sesame","soy","egg","capsaicin","gluten"],"Formerly listed as Seared Blackened Tuna. Ponzu is made with REGULAR soy sauce — NOT gluten-free, confirmed 8/4."],
 ["King Crab Legs","MP",["crab","shellfish","dairy","nightshade","capsaicin"],"Melted butter and cocktail sauce."],
 ["Roasted Seafood Tower","$190",["crab","shellfish","dairy","egg","gluten","allium","nightshade","capsaicin"],"Pasta cooked tableside."],
 ["Iced Seafood Tower","$98",["crab","shellfish","fin fish","egg","dairy","allium","nightshade","capsaicin"],"CAN go gluten-free, confirmed 8/4: the Zesta crackers, brioche, and wonton chips all ride on the side — hold those three and the tower itself is GF."],
 ["Soup of the Day","$7",["dairy","gluten","allium"],"Changes daily — verify the exact soup before answering."],
 ["Prime Beef Chili","off menu",["beef","allium","capsaicin","nightshade","legumes","alcohol","gluten"],"Currently OFF the menu (8/4) — reappears as a SOTD or bonus $4 soup. Beer deglaze means gluten — alcohol cooks off, gluten stays."],
 ["Lobster Bisque","$11",["shellfish","gluten","alcohol","dairy"],"Roux, white wine, sherry vinegar."],
 ["Baked French Onion","$13",["dairy","allium","MSG","gluten","alcohol","beef"],"Beef stock, crouton, provolone."],
 ["House Salad","$7",["gluten","nightshade"],"Croutons and tomatoes. Dressing changes the allergens."],
 ["Roasted Pear Salad","$16",["dairy","tree nuts"],"Gorgonzola and walnuts, maple balsamic."],
 ["Caesar / Gem Caesar","$15",["dairy","egg","gluten","fin fish"],"Sous-vide egg dressing, anchovies, bonito."],
 ["Chopped Wedge Salad","$15",["dairy","pork","nightshade"],"Blue cheese, bacon, marinated tomatoes. Blue cheese dressing is usually mayo-based — that is egg, ask the chef."],
 ["Filet & Lobster","$105",["beef","shellfish","dairy"],"Menu marks GF. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Ahi Tuna & Wagyu Beef","$68",["fin fish","beef","sesame","soy","dairy","allium","gluten"],"Hoisin, wasabi mashed, beurre blanc."],
 ["Steak 47","$58",["beef","shellfish","allium","dairy","egg"],"Filet, shrimp, scallop, lobster, hollandaise. Topping +$25."],
 ["Filet & Scallops","$82",["beef","shellfish","pork","dairy"],"Prosciutto-wrapped scallops."],
 ["Filet Duo","$47",["beef","crab","shellfish","dairy","egg","allium"],"Crab Oscar and horseradish bleu cheese crust."],
 ["Farbuckle Filet","6/10 oz",["beef","dairy"],"Chef sizzling butter, beef tallow, rosemary salt."],
 ["Filet Mignon","6 oz $54 / 10 oz $79",["beef","dairy"],"Plain steak allergen is beef. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["K.D.'s Tomahawk","$160",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Dry Aged NY Strip","$58",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Delmonico Ribeye","$80",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Australian Wagyu Filet","6 oz $95 / 10 oz $135",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Japanese A5 Wagyu","$25/oz",["beef","dairy"],"Manager slices tableside. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["48 oz Wagyu Porterhouse","$180",["beef","dairy"],"Board service, manager slices."],
 ["Crab Oscar","$14",["crab","shellfish","dairy","egg","allium"],"Menu marks GF."],
 ["Horseradish-Bleu Cheese Crust","$4",["dairy","allium"],""],
 ["Add 5 oz Lobster Tail","$50",["shellfish","dairy"],"Menu marks GF. Dairy if served with butter."],
 ["Brandy Peppercorn Sauce","$6",["alcohol","beef","allium","dairy"],"Menu marks GF. Verify dairy, and ask if the demi starts with a flour roux before promising GF."],
 ["Black Truffle Butter","$6",["dairy"],"Menu marks GF."],
 ["Bearnaise Sauce","$2",["egg","dairy","allium","alcohol"],"Menu marks GF. Verify the vinegar/wine/shallot base."],
 ["Stuffed Chicken Breast","$38",["dairy","chicken","allium","alcohol"],"Halal option noted."],
 ["Primavera Pasta","$40",["gluten","dairy","allium","nightshade","tree nuts"],"Verify pesto nut content."],
 ["Miso Sea Bass","$46",["white fish","fin fish","soy","alcohol","gluten"],"Miso, mirin, sake, coconut risotto. Miso and soy elements often carry wheat or barley — confirm before promising GF."],
 ["Short Rib Pasta","$52",["beef","gluten","dairy","alcohol","allium"],"Orecchiette, vermouth cream sauce."],
 ["Sea Scallops","$48",["shellfish","pork","dairy","allium"],"Menu marks GF. Prosciutto, mushrooms, squash puree."],
 ["Chilean Sea Bass","$46",["white fish","fin fish","dairy","alcohol","allium","nightshade"],"Menu marks GF. Lemon-caper white wine butter sauce."],
 ["Blackened Creole Salmon","$42",["fin fish","egg","capsaicin","nightshade","allium","dairy"],"Blackened spice, Holy Trinity relish, remoulade."],
 ["Twin South African Lobster Tails","$100",["shellfish","dairy","allium"],"Steamed with clarified garlic butter."],
 ["Chicken Parmesan (entree)","$39",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"REAL — newly added on the updated menu, confirmed by Evan 8/4. Hand-breaded fried chicken, linguine, diavolo, provolone, garlic bread."],
 ["Chicken Parm Sandwich (lounge)","$24",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"Fried breaded chicken out of the shared fryer, provolone, tomato diavolo, garlic toasted bun."],
 ["Filet Sliders (lounge)","$18",["beef","gluten","dairy","egg","allium","cross-contact"],"Pretzel bun and crispy onion strings (gluten), provolone, smoked garlic aioli (egg), house chips from the shared fryer. Standard assumed — Evan OK'd 8/4."],
 ["Carne Asada Nachos (lounge)","$25",["beef","dairy","nightshade","allium","capsaicin","cross-contact"],"Fried chips (shared fryer), cheese, pico de gallo, cilantro sour cream. Standard assumed."],
 ["French Dip Egg Rolls (lounge)","$15",["beef","gluten","egg","dairy","allium","cross-contact"],"Egg roll wrappers carry gluten AND egg, three-cheese blend, creamy horseradish, fried. Standard assumed."],
 ["Tuna Poke (lounge)","$29",["fin fish","shellfish","soy","sesame","gluten","egg","cross-contact"],"Ahi plus CALAMARI SALAD — that is shellfish. Sushi rice, seaweed, spicy citrus sauce (mayo-style, egg), wontons (gluten). Standard assumed."],
 ["A5 Nigiri","$35",["beef","alcohol","cross-contact"],"Torched rice, balsamic pearls, Asian pear WINE reduction (trace alcohol), crispy leeks likely from the shared fryer. Standard assumed."],
 ["Grilled Asparagus","$15",["egg","dairy"],"Hollandaise. Menu marks GF."],
 ["Truffle Mashed / Cheddar Mashed","$12 + $3 add",["dairy"],"Butter, cream, white cheddar. $12 base, +$3 truffle or wasabi — confirmed 8/4. Menu marks GF."],
 ["Truffle Cauliflower","$14",["dairy","allium"],"Alfredo, truffle oil, Parmesan, shallots. Newer side — confirmed current 8/4."],
 ["Creamed Spinach w/ Butternut Squash","$16",["dairy","gluten"],"Cream sauce over roasted butternut squash. Marked g on the current menu — contains gluten."],
 ["Roasted Green Beans","$14",["sesame","allium","nightshade"],"Sesame oil, red bell pepper, white onion. Menu marks GF."],
 ["Lobster Mac N' Cheese","$26",["shellfish","gluten","dairy","allium"],"Lobster stock, roux, pasta, cheese, panko."],
 ["Forest Mushrooms","$14",["dairy","allium"],"ARCHIVED — off the menu 8/4. The $8 Roasted Mushrooms enhancement replaced it in spirit."],
 ["Jalapeno Potatoes Au Gratin","$15",["dairy","pork","allium","capsaicin","nightshade"],"Bacon is mixed in — it cannot be removed. Ask if the cheese sauce starts with flour."],
 ["Creamed Corn","$12",["dairy","allium"],"Cream, dijon, horseradish, dill. Menu marks GF."],
 ["Brussels Sprouts","$15",["capsaicin","soy","cross-contact"],"Deep fried in the SHARED fryer — cross-contact confirmed 8/4. Sriracha hot honey; verify the sauce for soy."],
 ["Creamy Risotto","$15",["dairy","pork","chicken","allium"],"Chicken stock and crispy prosciutto — not vegetarian. Risotto is usually finished with wine — ask if alcohol matters to the guest."],
 ["Truffle Fries","$11",["gluten","dairy","cross-contact"],"Lightly breaded, fried in the SHARED fryer — cross-contact confirmed 8/4."],
 ["Baked Potato","$11",["dairy"],"Base is butter + sour cream (GF-marked). The LOADED upgrade adds chives, bacon, cheese — that adds PORK. Upcharge price VERIFY."],
 ["Bananas Foster","$12/person",["dairy","alcohol","cinnamon"],"Tableside, minimum 2 people. The back server runs the show."],
 ["Mo's Cookie","$10",["dairy","egg","gluten"],""],
 ["Celebration Cake","$14",["egg","dairy","gluten"],"Vanilla cake, white chocolate mousse, strawberry drizzle, gummi bears — gelatin, worth flagging for vegetarians."],
 ["The Mo's Sundae","$15",["dairy","egg","gluten","alcohol"],"Cookie dough, ice cream, Hershey's syrup, Meyer's DARK RUM caramel (that's the alcohol), strawberry sauce, whipped cream."],
 ["Celebration drop","comp",["dairy","gluten","egg"],"Free with any celebration — their pick: Celebration Sundae (ice cream, chocolate, caramel, sprinkles — dairy) or comp Mo's Cookie (cookie dough + ice cream + drizzle — dairy, egg, gluten). Flags cover both options."],
 ["NY Style Cheesecake","$10",["dairy","egg","gluten"],""],
 ["Bailey's Creme Brulee","$10",["alcohol","egg","dairy"],""],
 ["Colossal Carrot Cake","$14",["egg","dairy","soy","tree nuts","gluten","pineapple"],""],
 ["Molten Lava Cake","$13",["egg","dairy","soy"],"Menu marks GF / flourless — still has egg, dairy, soy."],
 ["Brown Butter Cake","$14",["egg","dairy","soy","gluten"],""],
 ["Cotton Candy","$12",[],"Menu marks GF. Flavors run every color of the rainbow and they all taste like sugar — just say 'pick your color.'"],
 ["Pistachio Gelato","varies",["dairy","tree nuts"],""],
 ["Sorbets (off menu)","freezer",[],"Dairy-free, confirmed 8/4 — lemon (and maybe pistachio) in the freezer, but off the menu and not really sold."],
 ["Kids 4 oz Filet","$30",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask. Confirmed 8/4."],
 ["Kids Chicken Tenders","$10",["gluten","egg","dairy","cross-contact"],"Breaded and fried in the SHARED fryer. Standard breading assumed — egg flag stays."],
 ["Kids Buttered Noodles","$10",["gluten","dairy","egg"],"Standard pasta assumed — egg flag stays until the kitchen says otherwise."],
 ["Kids Mac N Cheese","$10",["gluten","dairy"],""],
 ["Prime Beef Burger","$23",["beef","gluten","dairy","egg","soy","allium","nightshade"],"Bun and condiments drive most allergens."],
 ["Chicken Teriyaki","$15",["soy","gluten","sesame","allium"],"Soy and wheat confirmed 8/4."]
];

const ALLERGEN_LIST = ["allium","gluten","dairy","egg","soy","sesame","tree nuts","nightshade","crab","shellfish","fin fish","white fish","legumes","capsaicin","pineapple","alcohol","pork","beef","chicken","MSG","cross-contact","cinnamon"];

const ALLERGEN_MEANING = [
 ["Allium","Onion, garlic, shallot, chive, leek"],
 ["Gluten","Wheat and flour, breading, pasta, croutons, buns, wontons"],
 ["Dairy","Milk, cream, butter, cheese"],
 ["Egg","Mayo, Caesar, hollandaise, bearnaise, breading"],
 ["Tree nuts","Walnuts, pistachios, pesto risks"],
 ["Nightshade","Tomato, peppers, potatoes, paprika and chile"],
 ["Shellfish","Shrimp, scallops, lobster, oysters, mussels, crab"],
 ["Legumes","Beans, peas, peanuts"],
 ["Soy","Soy sauce, ponzu, related sauces"],
 ["Sesame","Sesame seeds and oil"],
 ["Fin fish / white fish","Salmon, tuna, seabass / toothfish"],
 ["Alcohol","Wine, brandy, sherry, beer, liquor reductions"],
 ["Other test terms","Crab, pineapple, capsaicin, MSG, pork, beef"]
];

const PROTOCOL = [
 "Ask what kind of allergy it is.",
 "Ring the allergy in Toast.",
 "Tell your teammate and back server.",
 "Tell expo and the chef.",
 "Tell a manager.",
 "Never guarantee anything from a study sheet."
];

const DIET = [
 ["Gluten — high risk","Goat cheese spread, crab cake, calamari, prime meatballs, wagyu tacos, roasted tower pasta, iced tower wonton and brioche, lobster bisque, French onion crouton, house and Caesar croutons, chicken parmesan, primavera, short rib pasta, lobster mac, truffle fries, kids pasta/tenders/burger, lounge sliders/egg rolls/chicken parm/tuna poke wontons, most cakes, cookies, and cheesecake. Shared fryer confirmed. NO gluten-free bread or crackers in house as of 8/4. LEGEND CHANGE: the current printed menu marks gluten-CONTAINING items with a small g — older menus marked GF instead, so never mix the two up."],
 ["Halal","Filet-family cuts and chicken are halal: filet mignon, filet duo/end cuts, Farbuckle filet, Australian Wagyu filet, Japanese A5. Do not promise non-filet steaks as halal without manager confirmation. Watch bacon and prosciutto sides."],
 ["Vegetarian","Primavera Pasta is the main vegetarian-style entree. Risotto is NOT vegetarian — chicken stock and crispy prosciutto. Baked potato, cheddar mashed, asparagus, cauliflower, creamed corn and spinach can often be adjusted, but verify butter, stock, and bacon."],
 ["Vegan","Very limited. A custom salad or vegetable with oil and vinegar only, after chef confirmation. Butter, cheese, honey, stock, and fryer contact are everywhere."],
 ["Seed-oil-free","Steaks and chicken are seed-oil-free. Mo's cooks with beef tallow, olive oil, avocado oil, and butter. The shared FRYER runs avocado oil (per Evan 8/4) — not tallow — so fried items stay vegetarian on the oil itself. Cross-contact flags still apply."]
];

/* ============ SPECIALS, SOUP OF THE DAY, OFF-MENU — living lists. Updates come through Claude. ============ */
/* Current per Evan 8/4/26: only these four cut specials are running. */
const SPECIALS_ON=[
 ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: about 15 oz NY strip + 8 oz filet + a 25 oz bone. A manager slices it tableside off the board. The pitch: two people split it for a high-class manager-cut steak experience at a serious value — and there's no split-plate charge.","cut special"],
 ["Spinalis / Ribeye Cap","$14/oz — $10/oz on SUNDAYS","Minimum 6 oz. Rivals filet tenderness while keeping ribeye richness. Spinalis Sunday is on the restaurant's own weekly-features page — the easy upsell.","cut special"],
 ["Australian Wagyu Tomahawk","$180","32 oz. Confirmed 8/4. Wagyu rule: serve rare to med-rare — nudge, don't argue.","cut special"],
 ["45-Day Dry-Aged Bone-In Ribeye","22 oz — $120? VERIFY price","22 oz, confirmed by the graded test answer key. Evan thinks $120 — price still needs verified. All four cut specials (porterhouse, spinalis, tomahawk, 45-day) typically ALWAYS run.","cut special"],
 ["Ladies Night — every Thursday","$10 martinis + \u00bd-off apps","Ladies get $10 martinis and half-price appetizers in the lounge, every Thursday night.","weekly feature"],
 ["House events coming up","dates TBD","Sundresses & Sangria, the Surf & Turf Cup (golf outing), and a Prisoner Wine Dinner are on the books — the site doesn't publish dates, so ask a manager. Wine dinners mean banquet money.","events"]
];
/* Rotating entree specials seen before — ask a manager if one is running tonight. */
const SPECIALS_ROTATION=[
 ["Chicken Marsala","$35 when it runs","White cheddar mash and asparagus with an au jus gravy over the top of all of it. Confirmed 8/4."],
 ["Bourbon-Glazed Salmon","$45 when it runs","Same bourbon glaze as the ribeye skewers, served with vegetables. Price confirmed 8/4."],
 ["Cajun Butter Salmon","$35 when it runs","Cajun butter, served with vegetables. Price confirmed 8/4."]
];
const SPECIALS_PAST=[
 ["Tomahawk Tuesday","$180 package","The 32 oz Australian Wagyu Tomahawk plus two glasses of wine, two soups or salads, and a signature Brown Butter Cake to finish — a full night out for $180. Not running anymore, but worth knowing we did it.","not running"],
 ["Heart of Ribeye Skewers","$45","Bourbon glaze mixed with onions and peppers. One of the most underrated things we ever ran.","not running"],
 ["Flank Steak with Chimichurri","was ~$35","Ran earlier this summer. Not on the current list.","not running"],
 ["14 oz Bone-In Filet","past special","Bone marrow add-on was +$25; sometimes came with roasted red potatoes.","not running"],
 ["Devour Menu","started at $45/person","Devour restaurant-week prix fixe (menu photo dated 12/31/25). Soup or salad to start, entree sets the per-person price: Filet Mignon with Bordelaise $54, Eye of Ribeye with Bordelaise $54, Faroe Salmon with remoulade and trinity slaw $47, Chicken Truffled Alfredo $47, Chicken Parmesan $47, Vegan Stuffed Tomatoes $45. One accessory: cheddar mash, brussels, creamed corn, or green beans. Dessert: chocolate brownie with ice cream, strawberry shortcake, or a gluten-free vegan sorbet. Enhancements: Crab Oscar $14, Brandy Peppercorn $6, Lobster Tail $50, 2 Scallops $24, filet upgrade to 10 oz $22.","archive"],
 ["Buffalo Trace Dinner","past event","Five-course bourbon dinner with Buffalo Trace: salmon cucumber canape, strawberry salad, BT-glazed chicken with truffled cauliflower, eye of ribeye with marsala mash, berry verrine — with tastings of Weller Special Reserve, Eagle Rare 10, EH Taylor Small Batch, and Blanton's. Proof we run bourbon dinners.","archive"],
 ["Retired printed cocktails","see Drinks tab","Sunny Day, Tito's & Cran X Ten Again, Mo's Paper Plane, Hugo Empress, Cherry Blossom, Christian's Cucumber Kick — all archived in the Drinks tab under Archive.","archive"],
 ["Seared Blackened Ahi Tuna (appetizer)","$26","Replaced by Crispy Ahi Tuna Bites on the current menu — menu test Q2 changed with it.","ended 7/3/26"],
 ["Lisa's Delight","dessert cocktail","Removed from the dessert cocktail list in the July 11 update.","ended 7/11/26"],
 ["The Nutty Martinez","dessert cocktail","Removed from the printed list in the July 11 update — but the bar may still make it if a guest asks. The old build: butter-washed Elijah Craig Toasted, Frangelico, Disaronno, black walnut bitters, brown sugar syrup.","archived, maybe orderable"]
];
const SOUPS_STANDING=[
 ["How soups run","one per day","One soup of the day per shift, trading daily — and it comes COMPLIMENTARY with entrees. Guests can upcharge $4 to lobster bisque or baked French onion. Bisque is on every day. Most soups get a parsley garnish. Chili is off the menu right now and floats back in as a SOTD or bonus soup."],
 ["Baked French Onion","$13","Vidalia onions caramelized with butter, red wine deglaze, beef bone stock with mirepoix 48-72 hours. Brown crock, herb crouton, provolone, broiled."],
 ["Lobster Bisque","$11","Lobster stock, roux, white wine, sherry vinegar. Runs every day. ($11 on the current print.)"],
 ["Prime Beef Chili","OFF the menu","Pulled from the printed menu for now. Comes back sometimes as the soup of the day or a bonus $4 soup — probably returns for winter."]
];
/* soup-of-the-day archive: [logged, name, what is in it, notes] — every soup stays here forever */
const SOTD=[
 ["8/4/26","Chicken Tortilla","Chicken tortilla soup with crispy tortilla strips dropped in right before it goes out.","nightshade + capsaicin + gluten (strips) — VERIFY rest"],
 ["8/4/26","Chicken Pot Pie Soup","Creamy chicken pot pie in soup form. VERIFY full build with the kitchen.","VERIFY allergens"],
 ["8/4/26","Chicken Noodle","Classic chicken noodle. VERIFY build.","gluten (noodles) — VERIFY rest"],
 ["8/4/26","Clam Chowder","Clam chowder. VERIFY build.","shellfish + dairy — VERIFY rest"],
 ["8/4/26","Pasta e Fagioli","Beef, noodles, celery, carrot — Italian bean-and-pasta soup. House just calls it 'fagioli.'","gluten + beef — VERIFY rest"],
 ["8/4/26","Italian Wedding","Cream, sausage, and noodles. Very good — an easy sell.","gluten + dairy + pork — VERIFY rest"],
 ["8/4/26","Chicken Gnocchi","Creamy chicken with gnocchi — dumpling-style potato pasta.","gluten + dairy — VERIFY rest"],
 ["8/4/26","Poblano","Poblano pepper soup, served with croutons.","nightshade + gluten (croutons) — VERIFY rest"],
 ["8/4/26","Prime Beef Chili (as SOTD)","The standing chili sometimes runs as the soup of the day.","beef + nightshade + alcohol (beer deglaze)"]
];
const OFFMENU=[
 ["Nothing hidden right now","—","The PD (15 oz hand-cut filet, $115) moved onto the printed menu, and the 14 oz bone-in filet is retired to the past-specials archive. The cut specials above are today's off-menu steaks."]
];
