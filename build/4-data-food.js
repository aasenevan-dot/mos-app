
/* ============ FOOD MENU ============ */
/* [name, price, description, tag] */
const MENU = {
 "Starters & Lounge":[
 ["Crispy Ahi Tuna Bites","$18","Crispy sushi rice, avocado, ponzu sauce, cilantro, jalapeno. Remoulade or spicy citrus on the side if expected. Served with metal Japanese chopsticks.","Replaced the old blackened ahi appetizer"],
 ["Seasonal Oysters","$25","On the half shell. Cocktail sauce, mignonette, Tabasco/hot sauce, raw horseradish. PRESENTATION: they come out on a bed of ice with a dry-ice smoke pouring out of the middle — hot water is what sets the smoke off. Tabasco and Zesta crackers go down with them, and the cocktail forks are already on the table before the plate ever lands. No tongs. WHERE THEY'RE FROM: the menu answer is Blue Point, the classic East Coast oyster — historically out of Blue Point on Long Island, now used across Long Island Sound and Connecticut. Mild and balanced, clean salt with a sweet finish and a crisp bite. What we actually pour most nights is bigger New Jersey stock out of Cape May — thicker, meatier, brinier. Say seasonal, then say what is actually in the box tonight. Know it: warm-water oysters run larger, sweeter, more tender; cold-water run smaller, brinier, firmer.","GF"],
 ["Oysters Rockefeller","$45 — VERIFY price","The cooked oyster. Same half shell, baked or broiled with butter, breadcrumbs, and a green puree — spinach with soft herbs like parsley and tarragon — finished with Parmesan and a dash of hot sauce. Traditionally a splash of liqueur goes in the puree; confirm with the kitchen before answering an alcohol question. Comes out on a little pan over a bed of salt with fresh lemon, and it gets oyster forks like the raw ones.","Price needs verified in Toast"],
 ["Calamari","$17","Sliced thin, lightly floured, and flash-fried with red bell and banana pepper rings — never frozen, so it never turns chewy. Two sauces: spicy citrus aioli (creamy heat) and kung pao (sweet and savory — treat it as BOTH a peanut and a tree nut risk). Serve with tongs.","Pairs: Sancerre or Sauvignon Blanc — the acid cuts the spice"],
 ["Shrimp Cocktail","$26","U-6 tiger shrimp — under six to a pound, that is how big they run — boiled IN the shell in a house boil of mirepoix, garlic, lemon, dill, pickling spice, and Old Bay, then chilled and peeled by hand. The fiery cocktail sauce is fresh-grated horseradish, English mustard, sriracha, and Worcestershire. The shrimp is the star, not the sauce.","Know the U-6"],
 ["Goat Cheese Spread","$17","Goat, cream, and ricotta cheeses whipped with basil, rosemary, and a pinch of cayenne. Topped with pistachios and a honey drizzle finished at the table, with flash-baked crostini and Granny Smith apple wedges. Built to share.",""],
 ["Crab Cake","$18","Maryland style, 95% crab — jumbo lump and special crab held together with a light egg, Dijon, and mayo binder, finished in panko and plated OVER the remoulade. Great selling point: it is almost all crab.","95% crab"],
 ["Creamy Spicy Crab Dip","$22","Jumbo lump and colossal crab folded into cream cheese and ricotta with an egg yolk, baked until bubbly. House-made corn tortilla chips with a cajun dusting for scooping.","GF"],
 ["Prime Meatballs","$16","We grind filet, ribeye, and NY strip trim in house every day, then mix it with mozzarella, Parmesan, breadcrumbs, basil, and oregano. Baked, rested, and finished in a hot ceramic dish with house marinara and melted provolone.","Trim + breadcrumbs"],
 ["Wagyu Tacos","$25","A5 wagyu filet sliced thin and flash-seared, set in a crispy wonton shell over caramelized onions with chimichurri, microgreens, and balsamic pearls — little pearls that pop like caviar. A light balsamic vinegar glaze goes over the top; that glaze is the sauce.",""],
 ["A5 Nigiri","$35","Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks. Served with two metal Japanese chopsticks.",""],
 ["Filet Sliders (2)","$18","Provolone, smoked garlic aioli, crispy onion strings, pretzel bun, house-made chips.","Lounge"],
 ["Carne Asada Nachos","$25","Marinated steak, cheese, pico de gallo, avocado, cilantro sour cream.","Lounge"],
 ["Prime Beef Burger","$23","Bacon, cheddar, lettuce, tomato, onions, aioli, French fries. Offer house ranch for the fries — it is the move.","Lounge · suggest ranch"],
 ["French Dip Egg Rolls","$15","Au jus marinated shaved steak, three-cheese blend, caramelized onions, creamy horseradish.","Lounge"],
 ["Chicken Parm Sandwich","$24","Fried chicken breast, provolone, tomato diavolo sauce, garlic toasted bun.","Lounge"],
 ["Tuna Poke","$29","Sushi rice, avocado, mango, seaweed, calamari salad, spicy citrus sauce, wontons.","Lounge"],
 ["King Crab Legs","MP","Served with melted butter and cocktail sauce. Setup: cocktail forks, tongs, butter warmer with clarified butter. Recently around $125 a pound — but ALWAYS quote Toast, never memory.",""]],

 "Seafood Towers":[
 ["Iced Seafood Tower","Semi-Pro $98 / Baller $190","SEMI-PRO: 6 oysters, 3 shrimp, about a half pound of king crab legs, plus the blackened ahi tuna salad and the lobster salad on brioche. BALLER: everything doubled — 12 oysters, 6 shrimp, about a pound of crab. The tuna salad and lobster salad come with both and stay the same size. SERVICE: cocktail forks preset, butter warmer with a tealight, and clear the top tier away once it is finished to open up the table.","Two sizes — know the counts"],
 ["Roasted Seafood Tower","Semi-Pro $98 / Baller $190","King crab legs, scallops, lobster meat, shrimp, and mussels tossed in diavolo. Same two sizes: the Semi-Pro has half the seafood the Baller does. The seafood-butter sauce pooling at the bottom — garlic butter, lobster stock, parsley, a touch of house marinara — is the good stuff. SERVICE: stacking rack in the base, stack at the table over a black linen, cocktail forks preset, butter warmer with a tealight. HALFWAY through, clear shells and stir the pasta setup into that remaining sauce — the tableside pasta is the value moment, do NOT skip it.","Bechamel is the base sauce (Mornay-style once cheese is in). We stir our bechamel cheese-sauce pasta into the tower sauce and the house calls the result CAPAVETTI PASTA — that is exactly how we say it."]],

 "Soup & Salad":[
 ["Soup of the Day","$7 printed / comp with entrees","One soup of the day per shift. It comes COMPLIMENTARY with entrees — or the guest can upcharge $4 to lobster bisque or baked French onion. Verify the exact soup before answering any allergen question.",""],
 ["Prime Beef Chili","OFF the menu right now","When it runs it is a $4 soup-course upcharge from the comp soup of the day. Prime trim ground in house, browned with onion and garlic, deglazed with beer. The house chili paste is guajillo, ancho, and chipotle peppers, built up with veal stock and tomato until rich and thick. Currently pulled — comes back sometimes as the soup of the day or a bonus $4 soup; probably returns for winter.","Off menu"],
 ["Lobster Bisque","$11","Lobster stock built into a roux with tomato, white wine, and sherry vinegar. Also the $4 soup-course upcharge from the comp soup of the day.",""],
 ["Baked French Onion","$13","Vidalia onions caramelized with butter, deglazed with red wine, in beef bone stock with mirepoix and herbs 48–72 hours. Brown ceramic crock, herb crouton, provolone melted in the broiler, parsley.","Mirepoix = meer-PWAH = onion, carrot, celery"],
 ["House Salad","$7","Romaine mix with carrots, cucumbers, cherry tomatoes, red cabbage (in the mix — cannot be removed), and croutons. House ranch and house dressing are made IN-HOUSE (the ranch runs mayo + buttermilk — that is egg and dairy — plus a touch of MSG). Other dressings: check before promising labels.",""],
 ["Roasted Pear Salad","$16","Arugula base, roasted pear, Gorgonzola, candied walnuts, dried cherries, maple balsamic.",""],
 ["Caesar / Gem Caesar","$15","Parmesan, croutons, and bonito flakes worked into the dressing. White anchovies are an OPTIONAL side — no upcharge, the guest just asks. The dressing is the story: an egg cooked sous vide for a full hour gets blended in with the yolk still runny, so it comes out extra creamy and rich.",""],
 ["Chopped Wedge Salad","$15","Blue cheese, bacon, marinated tomatoes.",""]],

 "Prime 47 Cuts & Wagyu":[
 ["Farbuckle Filet","6 oz $63 / 10 oz $87","THE SHOW: ring at the guest's temp, bring a sizzling skillet + tongs + gloves + tray + rosemary salt + beef tallow + warm butter. Steaks in, butter while they cook, beef tallow before pulling, finish with rosemary salt, serve. You can Farbuckle ANY cut for roughly a $9 upcharge (the $63 minus $54 difference).","Help run this one"],
 ["Filet Mignon","6 oz $54 / 10 oz $79","Center cut with almost no marbling — you order it for pure tenderness. At medium rare it practically cuts with a fork. Finished with rosemary Maldon salt. Guest wants it well done? Offer to butterfly it — cooks faster, stays juicier. Butter by default; the kitchen CAN cook any steak butter-free for a dairy allergy.",""],
 ["The PD — 15 oz Hand-Cut Filet","$115","On the printed menu — house calls it the PD.",""],
 ["Filet Duo","$47","Two 3 oz end-cut medallions — a touch more fat than the center cut, and really ordered for the toppings: Crab Oscar on one, horseradish bleu cheese crust on the other.",""],
 ["Dry Aged New York Strip","14 oz $58","The middle ground between ribeye and filet — marbling and tenderness land right between the two, with a big fat cap down one side that bastes the steak as it renders. Dry aging: the meat hangs in a controlled room while moisture evaporates and enzymes tenderize, concentrating rich, nutty, beefy umami. Tell the guest that story — it is the whole point of the steak.","Dry aged"],
 ["Delmonico Ribeye","16 oz $80","Named for Delmonico's, the old New York steakhouse that made this style famous. Our most marbled prime cut — rich, buttery, beefy fat renders between the cap and the eye with every bite. If a guest wants an old-school steakhouse ribeye, this is it.",""],
 ["K.D.'s Tomahawk","32 oz $160","A ribeye that keeps the whole rib bone. Even more heavily marbled than the Delmonico. The bone lets marrow render during cooking, adding a butteriness you can only get by keeping the rib bone. The juiciest, most flavorful cut we offer besides the Japanese A5.","K.D. = Kevin Dickey, former owner · largest oval plate"],
 ["Australian Wagyu Filet","6 oz $95 / 10 oz $135","Australian cattle crossbred with Japanese wagyu — even one generation of crossbreeding lifts the marbling way up. Wagyu fat melts at a lower temperature, so it runs juicy even at rare. Just as tender as the prime filet with more richness — the easy level-up for a filet person. Serve rare to med-rare — nudge, don't argue.",""],
 ["Japanese A5 Wagyu","$25/oz","From Kagoshima Prefecture. The show: a manager cut, sliced with a Hanzo steel knife on a butcher's block, torch-finished with rosemary salt at the table. Preset the guests with the special Kobe Hanzo steak knives. House serves wagyu RARE to MED-RARE — nudge gently, never argue.","6 oz is $150"],
 ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: roughly a 26 oz NY strip, a 12 oz filet, and about a 10 oz bone — it varies a little with the cut. Board service, a MANAGER cuts it tableside. The move: two people split it for a high-class manager-cut experience at a great value. Know the cut: a porterhouse is a T-bone where the filet side has to be nearly as big as the strip side — that is rare, and it is why good porterhouses are hard to find.","Off-menu special"],
 ["Spinalis / Ribeye Cap","$14/oz, min 6 oz","The cap of the ribeye — rivals filet tenderness while keeping ribeye richness. A manager cuts it tableside. $10/oz all day on Spinalis Sunday.","Off-menu · manager cut"],
 ["45-Day 22 oz Dry-Aged Bone-In Ribeye","$120? VERIFY price","Forty-five days in the dry-aging room, and every one of them is doing something. Cold, moving air draws the moisture out, so what is left behind is pure concentrated beef — the flavor gets deeper because there is simply less water diluting it. At the same time the meat's own enzymes go quietly to work, breaking down proteins into amino acids and unwinding the connective tissue, which is what makes an aged steak taste savory and profound instead of just beefy. That is where the signature comes from: a deep, nutty, almost brown-butter richness with a whisper of blue cheese and toasted hazelnut, wrapped around a bone that gives it even more depth. Rich, robust, and unmistakably aged — the steak for the guest who wants the most flavor a piece of beef can carry. Price still needs verified.","Off-menu, dry aged"]],

 "Surf & Turf":[
 ["Steak 47","$58","A 4 oz filet base topped with a scallop and a shrimp, chopped asparagus and lobster meat around the plate, hollandaise drizzled on by expo. Upgrade math is easy — any filet goes 47 style for its price plus the $25 topping: 6 oz is $54 + $25 = $79, 10 oz is $79 + $25 = $104.","The Steak 47 topping upcharge is $25"],
 ["Filet & Lobster","$105","A 6 oz filet off the charbroiler (upgrade to 10 oz) with a 5 oz South African lobster tail, steamed gently so it never turns chewy.","GF"],
 ["Filet & Scallops","$82","A 6 oz filet with two U-10 prosciutto-wrapped scallops, flash-seared hot and fast — about two minutes — so they stay tender.",""]],

 "Enhancements":[
 ["Crab Oscar","$14","Snow crab, asparagus, hollandaise.","GF"],
 ["Steak 47 topping","$25","Shrimp, scallop, lobster meat, asparagus, hollandaise.","The $25 answer"],
 ["Horseradish-Bleu Cheese Crust","$4","Melted bleu cheese crumbles, horseradish, herbs.",""],
 ["Bearnaise Sauce","$2","Egg and butter sauce with a tarragon and shallot reduction. Herbier than hollandaise. Yes — really $2.","Bearnaise has tarragon + shallot; hollandaise does not"],
 ["Add 5 oz Lobster Tail","$50","Add to any entree.","GF"],
 ["Add 2 Scallops","$14","Two scallops added to any entree.",""],
 ["Brandy Peppercorn Sauce","$6","Demi-glace and brandy peppercorns.","GF"],
 ["Black Truffle Butter","$6","Truffle butter steak finish.","GF"],
 ["Garlic Butter","$6","Steak enhancement — active in Toast.",""],
 ["Roasted Mushrooms","$8","Comes in a small soup bowl with a big spoon — confirm with the guest, then scoop it over their steak.",""]],

 "Exclusives":[
 ["Chicken Parmesan","$39","Hand-breaded fried chicken breast, linguine, tomato diavolo sauce, melted provolone, garlic bread.","New on the menu"],
 ["Primavera Pasta","$40","Linguine, wild mushrooms, spinach, peeled tomatoes, pesto cream sauce. Add-ons available: chicken, salmon, steak, shrimp (2 scallops are $14 per the enhancements). Add-on PRICES still need a Toast check — do not quote from memory.","Main vegetarian-style entree"],
 ["Miso Seabass","$46","Patagonian toothfish vacuum-sealed with white miso paste, mirin, and sake for 48–72 hours, pan seared and finished in the broiler. Coconut risotto with Brussels sprouts sprinkled over the top — the sweet coconut against the tangy miso is the whole pitch.","48–72 hour cure"],
 ["Sea Scallops","$48","U-10 scallops seared in a nearly smoking pan for a deep golden crust. The butternut puree leans into the scallop's natural sweetness, crispy prosciutto salts it and cuts through, and the mushrooms ground the whole plate.","GF"],
 ["Chilean Sea Bass","$46","Patagonian toothfish — a rich, buttery white fish — pan seared and set in a lemon-caper white wine butter sauce with asparagus, spinach, and cherry tomato for brightness. The citrus cutting the richness is the whole idea.","GF"],
 ["Blackened Creole Salmon","$42","Faroe Island salmon — raised in cold open water with no antibiotics, richer and firmer than standard salmon. Blackened by default over sweet potato puree with Holy Trinity relish and remoulade. The kitchen can also broil it or pan sear it plain if a guest wants it mild.","Holy Trinity = bell pepper, onion, celery"],
 ["Short Rib Pasta","$52","ARCHIVED — off the menu. Prime short rib braised 12 hours in veal demi-glace, pressed clean, and laid over orecchiette in a light vermouth cream — shallot, fennel, garlic, thyme.","Archived"],
 ["Stuffed Chicken Breast","$38","ARCHIVED — off the menu. Stuffed with cream cheese, goat cheese, Parmesan, and white cheddar under a creamy thyme-rosemary herb sauce.","Archived"],
 ["Twin South African Lobster Tails","$100","Two 5 oz cold-water tails, 10 oz total. The why: colder South African water means lobsters shed their shells less often, so the meat stays more tender and sweeter. Old Bay and lemon, steamed, served with a charred lemon. SERVICE: light the butter warmer with the clarified garlic butter and set a cocktail fork to the right of the silverware.","Cold water — know why"]],

 "Accessories / Sides":[
 ["Every side shares","feeds 2-3","Every single side is built to share — comfortably feeds 2 to 3 people. Rule of thumb from the tests: suggest 3-4 sides for a table of six.",""],
 ["Grilled Asparagus","$15","Marinated in garlic herb butter, grilled to a light char. Hollandaise in a ramekin on the side.","GF"],
 ["Creamed Corn","$12","Cream, dijon, horseradish, dill.","GF"],
 ["Creamed Spinach with Roasted Butternut Squash","$16","Sauteed spinach in a cream sauce over roasted butternut squash. Marked g on the current menu — it CONTAINS gluten.",""],
 ["Creamy Risotto","$15","Crispy prosciutto and sundried tomatoes. Cooked in chicken stock.",""],
 ["Baked Potato","$11","Salt-crusted russet, par-baked and finished to order so it comes out light and fluffy. Cut it open and press it apart at the plate to show off the steam, and leave the little knife in the potato. Base: butter and sour cream. LOADED upgrade — chives, bacon, cheese — about +$3 (best guess, verify). Loaded adds pork.","GF (base)"],
 ["White Cheddar Mashed Potatoes","$12","Mashed with nearly equal parts butter — that is the secret — plus cream and white cheddar. Add truffle $3 or wasabi $3.","GF · upsell the $3 add"],
 ["Truffle Cauliflower","$14","Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley.",""],
 ["Lobster Mac N' Cheese","$26","A roux built on lobster stock with onion and garlic, white cheddar and Parmesan, broiled with panko and more cheese on top. Premium share side.","Biggest side upsell"],
 ["Jalapeno Potatoes Au Gratin","$15","Seedless jalapenos — flavor without much burn — with diced russets, bacon, white cheddar, garlic, and green onion, baked in its own ceramic boat.","Bacon is mixed in each morning — cannot be removed"],
 ["Brussels Sprouts","$15","Trimmed, halved, oven roasted, then flash-fried so the outside goes crispy. Balsamic glaze over the top (an older sheet said sriracha hot honey — if both float around, ask which is on tonight). Serving spoon rides in the bowl.",""],
 ["Truffle Fries","$11","Lightly breaded, fried crisp, then tossed right away with flaky salt, shaved Parmesan, parsley, and white truffle oil. A guest can get them PLAIN — no Parm, no truffle — just ask. Gluten and fryer check.","Send house ranch with them — best pairing in the building"],
 ["Forest Mushrooms","$14","Cremini, portobello, shiitake, and button in garlic herb butter. ARCHIVED — off the menu. The $8 Roasted Mushrooms enhancement is the current mushroom play.","Archived side"]],

 "Desserts":[
 ["Mo's Cookie / Prime Cookie","$10","Cookie dough pressed into its own bowl and baked to order — pulled when it is still half-baked so the center stays gooey. Vanilla ice cream on top, Hershey's syrup over everything.",""],
 ["Celebration Cake","$14","Five layers of technicolor vanilla cake layered with white chocolate mousse, served with a strawberry drizzle and gummi bears.","Celebration play"],
 ["The Mo's Sundae","$15","Five to six scoops of ice cream in a chilled bowl with chocolate chip cookie dough, Hershey's syrup, Meyer's dark rum caramel, strawberry sauce, fresh whipped cream.","Name history: Kristen Sundae, then printed as the Celebration Sundae, now the Mo's Sundae — Kristen was a former owner's wife"],
 ["Celebration drop (free)","comp with any celebration","Every celebrating table gets a free treat — their pick: the CELEBRATION SUNDAE (bowl of ice cream in a large soup bowl with chocolate and caramel, a sprinkle or two for fun) or a COMP MO'S COOKIE (half-baked cookie dough, scoop of vanilla bean ice cream, chocolate drizzle poured on BY THE SERVER at the table). We do NOT sing — we light a SPARKLER with it and make the table feel special. Pull the spent sparkler out with a black linen and hold the ice cream down with the serving spoon so it does not come along for the ride. Sing only if you want to.",""],
 ["NY Style Cheesecake","$10","Dense and rich on a graham cracker crust — that density is what makes it New York style. Fresh whipped cream and strawberry sauce to cut through.",""],
 ["Bailey's Creme Brulee","$10","Classic custard spiked with Bailey's Irish Cream, topped with raw demerara sugar torched into a glassy shell you crack with the spoon. Whipped cream and fresh berries.",""],
 ["Colossal Carrot Cake","$14","Layered high with cream cheese icing, moist all the way through from pineapple in the batter — that is where the pineapple flag comes from. Powdered sugar and whipped cream.",""],
 ["Molten Lava Cake","$13","Chocolate dome filled with chocolate cake, strawberries, and ice cream. THE SHOW: light the orange liqueur and chocolate sauce, then pour it flaming over the dome — it melts away to reveal the cake and ice cream underneath. GF-marked / flourless — but it still has eggs, dairy, soy, and that liqueur.","GF-marked, NOT allergen-free"],
 ["Brown Butter Cake","$14","Browned butter and brown sugar are the whole flavor story. Served warm with vanilla ice cream, caramel, and Granny Smith apple slices to cut the richness — and it rolls out with the dry-ice cloud show, hot water poured over dry ice right in the bowl.",""],
 ["Cotton Candy","$12","GF. Spun to order on a light-up stick and set in a black wooden block. Every color of the rainbow, all taste like sugar — tell the table 'pick your color.'","Pairs with Ruffino Moscato"],
 ["Bananas Foster","$12/person — minimum 2 people","THE BACK SERVER RUNS THIS SHOW. Per person: 1 scoop brown butter + half a banana, and half an orange per two bananas (going over is fine). Bring: cinnamon, 99 Oranges liqueur, Nilla wafers, caramel, burner, pan. The show: melt the brown butter, breaking it up with the spatula. Coat the bananas evenly in it. Add the orange citrus so nothing burns. Pour 99 Oranges over the top and light it — big flame. Sprinkle cinnamon into the fire and it sparks up (cinnamon is made of wood, so it burns) — a fantastic show. Pour it all over bowls of ice cream with the caramel and Nilla wafers, serve with spoons. Great upsell: get the whole table in on it.","Back server's show"],
 ["Sorbets (not really sold)","in the freezer","Lemon and raspberry sorbet have both lived in the freezer, dairy-free — but they are off the menu and we do not really sell them. Archive item.","Not sold"],
 ["Pistachio Gelato","varies","Dairy and tree nuts.",""]],

 "Kids Menu":[
 ["4 oz Filet Mignon","$30","Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask.",""],
 ["Chicken Tenders with Fries","$10","Breaded and fried in the shared fryer. Standard breading assumed — flags stay until the kitchen says otherwise.",""],
 ["Buttered Noodles","$10","Pasta plus butter.",""],
 ["Mac N Cheese","$10","Pasta and cheese sauce.",""],
 ["Prime Beef Burger","$23","Bun and condiments drive most allergens.",""],
 ["Chicken Teriyaki","$15","The sauce has soy and wheat.",""]]
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

/* ============ HOUSE RECIPES — straight off the kitchen spec cards ============ */
/* Card allergen lines are not gospel: the ranch card says dairy only, but it is built on
   mayo, so egg belongs there too. Flag what the ingredients actually say. */
const RECIPES = [
 {n:"Ranch Dressing", sub:"made fresh in house", batch:"big-batch card — about two gallons",
  flags:["dairy","egg","allium","MSG","capsaicin"],
  ing:[["Mayo","1 gallon"],["Buttermilk","1 gallon"],["Green onion, minced","1/2 cup"],
       ["Dill, finely minced","1/2 cup"],["Parsley, finely minced","1/2 cup"],
       ["Onion powder","1 Tbsp"],["Garlic powder","1 Tbsp"],["Chipotle powder","1 tsp"],
       ["Mustard powder","1 tsp"],["MSG","1 tsp"],["Rice vinegar","1/4 cup"]],
  steps:["Dice the herbs.","Add everything to the bowl and whisk until it is completely smooth."],
  note:"The card lists dairy as the only allergen — but mayo means EGG, so egg gets flagged too. Chipotle powder is the faint warmth in it, and yes, there is MSG.",
  tip:"Our ranch is almost necessary on our fries — it may be the best combination in the restaurant."}
];

const DRESSINGS = ["House Vinaigrette (whole-grain mustard — the house dressing)","Orange Vinaigrette","Balsamic Vinaigrette","Maple Balsamic","Italian","French","Blue Cheese","Oil & Vinegar","Thousand Island","Caesar","Peppercorn Ranch"];


/* SHORT LEADS — the one line a menu row shows before you open it. Only dishes whose real
   first sentence runs long need one; everything else uses its own opening sentence. */
const LEADS = {
 "Calamari":"Never frozen, flash-fried with peppers. Spicy citrus and kung pao sauces.",
 "Shrimp Cocktail":"U-6 tiger shrimp, boiled in the shell and peeled by hand. Fiery cocktail sauce.",
 "Crab Cake":"Maryland style, 95% crab, over spicy remoulade.",
 "Prime Meatballs":"Ground in house from steak trim, baked with marinara and provolone.",
 "Wagyu Tacos":"A5 wagyu in a crispy wonton shell with caramelized onion and balsamic pearls.",
 "Iced Seafood Tower":"Two sizes. Oysters, shrimp, king crab, tuna salad, and lobster salad on brioche.",
 "Roasted Seafood Tower":"Two sizes. Crab, scallops, lobster, shrimp and mussels in diavolo — pasta finished tableside.",
 "Baked French Onion":"Caramelized Vidalias in a long-cooked beef stock, crouton and provolone broiled on top.",
 "House Salad":"Romaine mix, carrots, cucumber, cherry tomato, red cabbage, croutons.",
 "Farbuckle Filet":"The tableside show — finished in a sizzling skillet with butter, tallow and rosemary salt.",
 "Filet Duo":"Two 3 oz medallions, one Crab Oscar and one horseradish bleu cheese crust.",
 "Dry Aged New York Strip":"The middle ground between ribeye and filet, with a fat cap that bastes it.",
 "Australian Wagyu Filet":"Wagyu crossbred marbling — juicy even at rare. The easy level-up from a filet.",
 "Steak 47":"A 4 oz filet topped with scallop, shrimp, lobster, asparagus and hollandaise.",
 "Filet & Lobster":"A 6 oz filet with a 5 oz South African lobster tail.",
 "Filet & Scallops":"A 6 oz filet with two prosciutto-wrapped scallops.",
 "Miso Seabass":"Toothfish cured in white miso, mirin and sake, over coconut risotto.",
 "Chilean Sea Bass":"Rich, buttery toothfish in a lemon-caper white wine butter sauce.",
 "Lobster Mac N' Cheese":"Lobster-stock cheese sauce, broiled with panko. The biggest side upsell.",
 "Jalapeno Potatoes Au Gratin":"Seedless jalapenos, russets, bacon and white cheddar, baked in its own boat.",
 "Truffle Fries":"Lightly breaded and tossed with Parmesan, parsley and white truffle oil.",
 "Mo's Cookie / Prime Cookie":"Baked to order and pulled half-baked, with vanilla ice cream.",
 "Celebration Cake":"Five technicolor layers with white chocolate mousse and gummi bears.",
 "The Mo's Sundae":"Five or six scoops with cookie dough, dark rum caramel and whipped cream.",
 "Celebration drop (free)":"Every celebrating table picks a free treat — and gets a sparkler.",
 "Bailey's Creme Brulee":"Bailey's custard under a torched sugar shell you crack with the spoon.",
 "Colossal Carrot Cake":"Layered high with cream cheese icing, kept moist by pineapple in the batter.",
 "Sorbets (not really sold)":"Dairy-free, in the freezer, off the menu.",
 "4 oz Filet Mignon":"The kids filet. Butter by default, and it can be cooked butter-free.",
 "Seasonal Oysters":"On the half shell, on ice with dry-ice smoke. Cocktail sauce, mignonette, horseradish.",
 "Oysters Rockefeller":"The cooked oyster — baked with butter, breadcrumbs and a green herb puree.",
 "Crispy Ahi Tuna Bites":"Crispy sushi rice, avocado, ponzu, cilantro and jalapeno.",
 "45-Day 22 oz Dry-Aged Bone-In Ribeye":"Forty-five days of aging — deep, nutty, brown-butter richness on the bone.",
 "Tomahawk Tuesday":"The 32 oz wagyu tomahawk with wine, soup or salad, and dessert for $180.",
 "Buffalo Trace Dinner":"A five-course bourbon dinner — proof we run them.",
 "Retired printed cocktails":"Six specialty cocktails that came off the printed list.",
 "Spinalis Sunday":"The ribeye cap at $10/oz, one day a week.",
 "Spinalis / Ribeye Cap":"The cap of the ribeye — filet tenderness with ribeye richness. Manager cut.",
 "48 oz USDA Choice Porterhouse":"48 oz for two, cut tableside by a manager.",
 "Australian Wagyu Tomahawk":"32 oz of wagyu, cut tableside by a manager.",
 "Japanese A5 Wagyu":"From Kagoshima. A manager slices it tableside — the best cut in the city."
};

/* ============ ALLERGENS ============ */
/* [dish, price, flags[], note] */
const ALLERGENS = [
 ["Goat Cheese Spread","$17",["dairy","gluten","tree nuts","capsaicin"],"Goat, cream, and ricotta cheeses with a pinch of cayenne — that is the capsaicin. Crostini (gluten), pistachios (tree nuts)."],
 ["Creamy Spicy Crab Dip","$22",["crab","shellfish","dairy","egg","capsaicin","allium","cross-contact"],"GF, but the corn tortilla chips take a cajun dusting and come out of the SHARED fryer. An egg yolk is baked into the cheese base — that is the egg flag."],
 ["Seared Blackened Scallops","$26",["shellfish","dairy","capsaicin","nightshade"],"ARCHIVED — off the menu. Truffle creamed corn carried dairy; blackening spice is paprika/cayenne — nightshade."],
 ["Prime Meatballs","$16",["beef","dairy","gluten","egg","allium","nightshade"],"Breadcrumb binder — gluten. Made from steak trim with egg in the mix."],
 ["Crab Cake","$18",["crab","shellfish","egg","gluten","capsaicin","allium"],"95% crab, 5% filler — breadcrumbs (gluten), mayo typical (egg). Remoulade on the side."],
 ["Wagyu Tacos","$25",["beef","gluten","soy","allium","egg"],"Wonton shell has egg. Sauce is a balsamic glaze; soy still unconfirmed, keep the flag."],
 /* "peanuts" as its own tag on purpose. Peanuts ARE legumes, so botanically the legume
    tag covers it — but a guest says "peanut allergy", not "legume allergy", and there was
    no peanuts chip to tap. The dish already reads as a peanut risk in the note; this makes
    it FILTERABLE too. Chili keeps plain legumes — those are beans. */
 ["Calamari","$17",["shellfish","gluten","soy","sesame","capsaicin","cross-contact","legumes","peanuts","tree nuts"],"Fried in the SHARED fryer. Kung pao is a nut sauce — we treat it as BOTH peanut and tree nut until the chef pins down which one it really is. ANY nut allergy is a full stop. Egg in the breading still unconfirmed."],
 ["Shrimp Cocktail","$26",["shellfish","capsaicin","nightshade","allium","fin fish"],"The fiery cocktail sauce carries Worcestershire — that means anchovy, and that is the fin fish flag. Plus English mustard and fresh horseradish."],
 ["Seasonal Oysters","$25",["shellfish","allium","nightshade","capsaicin"],"GF. Cocktail sauce and mignonette add tomato, pepper, shallot. Zesta crackers ride on the setup — that is gluten next to the plate, pull them for a gluten allergy."],
 ["Oysters Rockefeller","$45",["shellfish","dairy","gluten","allium","capsaicin","alcohol"],"NOT the same allergen answer as the raw oysters. Butter and Parmesan are dairy, the breadcrumb topping is gluten, the green puree carries allium, and the hot sauce is the capsaicin. Alcohol is flagged because the classic recipe finishes the puree with a liqueur — VERIFY with the kitchen whether ours does before you promise either way."],
 ["Crispy Ahi Tuna Bites","$18",["fin fish","sesame","soy","egg","capsaicin","gluten"],"Formerly listed as Seared Blackened Tuna. Ponzu is made with REGULAR soy sauce — NOT gluten-free."],
 ["King Crab Legs","MP",["crab","shellfish","dairy","nightshade","capsaicin"],"Melted butter and cocktail sauce."],
 ["Roasted Seafood Tower","$190",["crab","shellfish","dairy","egg","gluten","allium","nightshade","capsaicin"],"Pasta cooked tableside."],
 ["Iced Seafood Tower","$98",["crab","shellfish","fin fish","egg","dairy","allium","nightshade","capsaicin"],"CAN go gluten-free: the Zesta crackers, brioche, and wonton chips all ride on the side — hold those three and the tower itself is GF."],
 ["Soup of the Day","$7",["dairy","gluten","allium"],"Changes daily — verify the exact soup before answering."],
 ["Prime Beef Chili","off menu",["beef","allium","capsaicin","nightshade","legumes","alcohol","gluten"],"Currently OFF the menu — reappears as a SOTD or bonus $4 soup. Beer deglaze means gluten — alcohol cooks off, gluten stays."],
 ["Lobster Bisque","$11",["shellfish","gluten","alcohol","dairy","nightshade"],"Roux, tomato, white wine, sherry vinegar."],
 ["Baked French Onion","$13",["dairy","allium","MSG","gluten","alcohol","beef"],"Beef stock, crouton, provolone."],
 ["House Salad","$7",["gluten","nightshade"],"Croutons and tomatoes. Dressing changes the allergens."],
 ["Roasted Pear Salad","$16",["dairy","tree nuts"],"Gorgonzola and walnuts, maple balsamic."],
 ["Caesar / Gem Caesar","$15",["dairy","egg","gluten","fin fish"],"Sous-vide egg dressing with bonito flakes — the fin fish flag stays even if the guest skips the optional anchovies."],
 ["Chopped Wedge Salad","$15",["dairy","pork","nightshade"],"Blue cheese, bacon, marinated tomatoes. Blue cheese dressing is usually mayo-based — that is egg, ask the chef."],
 ["Filet & Lobster","$105",["beef","shellfish","dairy"],"GF. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Ahi Tuna & Wagyu Beef","$68",["fin fish","beef","sesame","soy","dairy","allium","gluten"],"Hoisin, wasabi mashed, beurre blanc."],
 ["Steak 47","$58",["beef","shellfish","allium","dairy","egg"],"Filet, shrimp, scallop, lobster, hollandaise. Topping +$25."],
 ["Filet & Scallops","$82",["beef","shellfish","pork","dairy"],"Prosciutto-wrapped scallops."],
 ["Filet Duo","$47",["beef","crab","shellfish","dairy","egg","allium"],"Crab Oscar and horseradish bleu cheese crust."],
 ["Farbuckle Filet","6/10 oz",["beef","dairy"],"Chef sizzling butter, beef tallow, rosemary salt."],
 ["Filet Mignon","6 oz $54 / 10 oz $79",["beef","dairy"],"Plain steak allergen is beef. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["K.D.'s Tomahawk","$160",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Dry Aged NY Strip","$58",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Delmonico Ribeye","$80",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Australian Wagyu Filet","6 oz $95 / 10 oz $135",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Japanese A5 Wagyu","$25/oz",["beef","dairy"],"Manager slices tableside. Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["48 oz USDA Choice Porterhouse","$150",["beef","dairy"],"NOT wagyu. Board service, manager slices."],
 ["Crab Oscar","$14",["crab","shellfish","dairy","egg","allium"],"GF."],
 ["Horseradish-Bleu Cheese Crust","$4",["dairy","allium"],""],
 ["Add 5 oz Lobster Tail","$50",["shellfish","dairy"],"GF. Dairy if served with butter."],
 ["Brandy Peppercorn Sauce","$6",["alcohol","beef","allium","dairy"],"GF. Verify dairy, and ask if the demi starts with a flour roux before promising GF."],
 ["Black Truffle Butter","$6",["dairy"],"GF."],
 ["Bearnaise Sauce","$2",["egg","dairy","allium","alcohol"],"GF. Verify the vinegar/wine/shallot base."],
 ["Stuffed Chicken Breast","$38",["dairy","chicken","allium","alcohol"],"ARCHIVED — off the menu. Halal option was noted when it ran."],
 ["Primavera Pasta","$40",["gluten","dairy","allium","nightshade","tree nuts"],"Verify pesto nut content."],
 ["Miso Sea Bass","$46",["white fish","fin fish","soy","alcohol","gluten"],"Miso, mirin, sake, coconut risotto. Miso and soy elements often carry wheat or barley — confirm before promising GF."],
 ["Short Rib Pasta","$52",["beef","gluten","dairy","alcohol","allium"],"ARCHIVED — off the menu. Orecchiette, vermouth cream sauce."],
 ["Sea Scallops","$48",["shellfish","pork","dairy","allium"],"GF. Prosciutto, mushrooms, squash puree."],
 ["Chilean Sea Bass","$46",["white fish","fin fish","dairy","alcohol","allium","nightshade"],"GF. Lemon-caper white wine butter sauce."],
 ["Blackened Creole Salmon","$42",["fin fish","egg","capsaicin","nightshade","allium","dairy"],"Blackened spice, Holy Trinity relish, remoulade."],
 ["Twin South African Lobster Tails","$100",["shellfish","dairy","allium"],"Steamed with clarified garlic butter."],
 ["Chicken Parmesan (entree)","$39",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"REAL — newly added on the updated menu, Hand-breaded fried chicken, linguine, diavolo, provolone, garlic bread."],
 ["Chicken Parm Sandwich (lounge)","$24",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"Fried breaded chicken out of the shared fryer, provolone, tomato diavolo, garlic toasted bun."],
 ["Filet Sliders (lounge)","$18",["beef","gluten","dairy","egg","allium","cross-contact"],"Pretzel bun and crispy onion strings (gluten), provolone, smoked garlic aioli (egg), house chips from the shared fryer. Standard assumed."],
 ["Carne Asada Nachos (lounge)","$25",["beef","dairy","nightshade","allium","capsaicin","cross-contact"],"Fried chips (shared fryer), cheese, pico de gallo, cilantro sour cream. Standard assumed."],
 ["French Dip Egg Rolls (lounge)","$15",["beef","gluten","egg","dairy","allium","cross-contact"],"Egg roll wrappers carry gluten AND egg, three-cheese blend, creamy horseradish, fried. Standard assumed."],
 ["Tuna Poke (lounge)","$29",["fin fish","shellfish","soy","sesame","gluten","egg","cross-contact"],"Ahi plus CALAMARI SALAD — that is shellfish. Sushi rice, seaweed, spicy citrus sauce (mayo-style, egg), wontons (gluten). Standard assumed."],
 ["A5 Nigiri","$35",["beef","alcohol","cross-contact"],"Torched rice, balsamic pearls, Asian pear WINE reduction (trace alcohol), crispy leeks likely from the shared fryer. Standard assumed."],
 ["Grilled Asparagus","$15",["egg","dairy"],"Hollandaise. GF."],
 ["Truffle Mashed / Cheddar Mashed","$12 + $3 add",["dairy"],"Butter, cream, white cheddar. $12 base, +$3 truffle or wasabi. GF."],
 ["Truffle Cauliflower","$14",["dairy","allium"],"Alfredo, truffle oil, Parmesan, shallots."],
 ["Creamed Spinach w/ Butternut Squash","$16",["dairy","gluten"],"Cream sauce over roasted butternut squash. Marked g on the current menu — contains gluten."],
 ["Roasted Green Beans","$14",["sesame","allium","nightshade"],"ARCHIVED — off the menu. Sesame oil, red bell pepper, white onion."],
 ["Lobster Mac N' Cheese","$26",["shellfish","gluten","dairy","allium"],"Lobster stock, roux, pasta, cheese, panko."],
 ["Forest Mushrooms","$14",["dairy","allium"],"ARCHIVED — off the menu. The $8 Roasted Mushrooms enhancement replaced it in spirit."],
 ["Jalapeno Potatoes Au Gratin","$15",["dairy","pork","allium","capsaicin","nightshade","egg"],"Bacon is mixed in — it cannot be removed. Mayo in the build is the egg flag. Ask if the cheese sauce starts with flour."],
 ["Creamed Corn","$12",["dairy","allium"],"Cream, dijon, horseradish, dill. GF."],
 ["Brussels Sprouts","$15",["capsaicin","soy","cross-contact"],"Deep fried in the SHARED fryer — cross-contact. Balsamic glaze is the standard finish; if the sriracha hot honey version shows up, that is the capsaicin and soy — ask which is on tonight."],
 ["Creamy Risotto","$15",["dairy","pork","chicken","allium"],"Chicken stock and crispy prosciutto — not vegetarian. Risotto is usually finished with wine — ask if alcohol matters to the guest."],
 ["Truffle Fries","$11",["gluten","dairy","cross-contact"],"Lightly breaded, fried in the SHARED fryer — cross-contact."],
 ["Baked Potato","$11",["dairy"],"Base is butter + sour cream (GF-marked). The LOADED upgrade adds chives, bacon, cheese — that adds PORK. About +$3 (best guess, verify)."],
 ["Bananas Foster","$12/person",["dairy","alcohol","cinnamon"],"Tableside, minimum 2 people. The back server runs the show."],
 ["Mo's Cookie","$10",["dairy","egg","gluten"],""],
 ["Celebration Cake","$14",["egg","dairy","gluten"],"Vanilla cake, white chocolate mousse, strawberry drizzle, gummi bears — gelatin, worth flagging for vegetarians."],
 ["The Mo's Sundae","$15",["dairy","egg","gluten","alcohol"],"Cookie dough, ice cream, Hershey's syrup, Meyer's DARK RUM caramel (that's the alcohol), strawberry sauce, whipped cream."],
 ["Celebration drop","comp",["dairy","gluten","egg"],"Free with any celebration — their pick: Celebration Sundae (ice cream, chocolate, caramel, sprinkles — dairy) or comp Mo's Cookie (cookie dough + ice cream + drizzle — dairy, egg, gluten). Flags cover both options."],
 ["NY Style Cheesecake","$10",["dairy","egg","gluten"],""],
 ["Bailey's Creme Brulee","$10",["alcohol","egg","dairy"],""],
 ["Colossal Carrot Cake","$14",["egg","dairy","soy","tree nuts","gluten","pineapple"],""],
 ["Molten Lava Cake","$13",["egg","dairy","soy","alcohol"],"GF-marked / flourless — still has egg, dairy, soy, and the flaming orange liqueur poured over the dome tableside is the alcohol."],
 ["Brown Butter Cake","$14",["egg","dairy","soy","gluten"],""],
 ["Cotton Candy","$12",[],"GF. Flavors run every color of the rainbow and they all taste like sugar — just say 'pick your color.'"],
 ["Pistachio Gelato","varies",["dairy","tree nuts"],""],
 ["Sorbets (off menu)","freezer",[],"Dairy-free — lemon (and maybe pistachio) in the freezer, but off the menu and not really sold."],
 ["Kids 4 oz Filet","$30",["beef","dairy"],"Cooked with butter by default — but the kitchen CAN cook any steak fully butter-free for a dairy allergy, the guest just has to ask."],
 ["Kids Chicken Tenders","$10",["gluten","egg","dairy","cross-contact"],"Breaded and fried in the SHARED fryer. Standard breading assumed — egg flag stays."],
 ["Kids Buttered Noodles","$10",["gluten","dairy","egg"],"Standard pasta assumed — egg flag stays until the kitchen says otherwise."],
 ["Kids Mac N Cheese","$10",["gluten","dairy"],""],
 ["Prime Beef Burger","$23",["beef","gluten","dairy","egg","soy","allium","nightshade"],"Bun and condiments drive most allergens."],
 ["Chicken Teriyaki","$15",["soy","gluten","sesame","allium"],"Soy and wheat."]
];

/* "peanuts" sits next to "tree nuts" because that is how a guest says it. Peanuts are
   legumes, so the legume tag is botanically right, but nobody announces a legume allergy
   — and with no peanuts chip to tap, the most common severe allergy on the floor came
   back empty. */
const ALLERGEN_LIST = ["allium","gluten","dairy","egg","soy","sesame","peanuts","tree nuts","nightshade","crab","shellfish","fin fish","white fish","legumes","capsaicin","pineapple","alcohol","pork","beef","chicken","MSG","cross-contact","cinnamon"];

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
 "Tell your back server.",
 "Tell expo.",
 "Tell the chef.",
 "Tell a manager."
];

const DIET = [
 ["Gluten — high risk","Goat cheese spread, crab cake, calamari, prime meatballs, wagyu tacos, roasted tower pasta, iced tower wonton and brioche, lobster bisque, French onion crouton, house and Caesar croutons, chicken parmesan, primavera, short rib pasta, lobster mac, truffle fries, kids pasta/tenders/burger, lounge sliders/egg rolls/chicken parm/tuna poke wontons, most cakes, cookies, and cheesecake. Shared fryer. NO gluten-free bread or crackers in house. LEGEND CHANGE: the current printed menu marks gluten-CONTAINING items with a small g — older menus marked GF instead, so never mix the two up."],
 ["Halal","Filet-family cuts and chicken are halal: filet mignon, filet duo/end cuts, Farbuckle filet, Australian Wagyu filet, Japanese A5. Do not promise non-filet steaks as halal without manager confirmation. Watch bacon and prosciutto sides."],
 ["Vegetarian","Primavera Pasta is the main vegetarian-style entree. Risotto is NOT vegetarian — chicken stock and crispy prosciutto. Baked potato, cheddar mashed, asparagus, cauliflower, creamed corn and spinach can often be adjusted, but verify butter, stock, and bacon."],
 ["Vegan","Very limited. A custom salad or vegetable with oil and vinegar only, after chef confirmation. Butter, cheese, honey, stock, and fryer contact are everywhere."],
 ["Seed-oil-free","Steaks and chicken are seed-oil-free. Mo's cooks with beef tallow, olive oil, avocado oil, and butter. The shared FRYER runs avocado oil — not tallow — so fried items stay vegetarian on the oil itself. Cross-contact flags still apply."]
];

/* ============ SPECIALS, SOUP OF THE DAY, OFF-MENU — living lists. Updates come through Claude. ============ */
/* Current 8/4/26: only these four cut specials are running. */
/* Specials that only run on ONE day. 0=Sun … 6=Sat. Anything listed here shows under
   "running right now" only on its day and drops to "not running right now" the rest of
   the week, so nobody pitches a Sunday cut on a Thursday. Spinalis is Sunday-only and
   Ladies Night is Thursday-only. */
const SPECIAL_DAYS={
 "Spinalis / Ribeye Cap":0,
 "Spinalis Sunday":0,
 "Ladies Night — every Thursday":4
};
const SPECIALS_ON=[
 ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: roughly a 26 oz NY strip, a 12 oz filet, and about a 10 oz bone — it varies a little with the cut. A manager slices it tableside off the board. The pitch: two people split it for a high-class manager-cut steak experience at a serious value — and there's no split-plate charge.","cut special"],
 ["Spinalis / Ribeye Cap","$14/oz","Minimum 6 oz. The cap of the ribeye — it rivals filet tenderness while keeping ribeye richness. A manager cuts it tableside.","cut special"],
 ["Spinalis Sunday","$10/oz every Sunday","The same ribeye cap, four dollars an ounce cheaper, one day a week. Minimum 6 oz. It is on the restaurant's own weekly-features page — the easiest upsell we have on a Sunday.","weekly feature"],
 ["Australian Wagyu Tomahawk","$180","32 oz, cut tableside by a manager. Wagyu rule: serve rare to med-rare — nudge, don't argue.","cut special"],
 ["45-Day 22 oz Dry-Aged Bone-In Ribeye","$120? VERIFY price","Forty-five days of cold, moving air pulls the moisture out and concentrates the beef, while the meat's own enzymes break proteins down into amino acids and soften the connective tissue. That is where the deep, nutty, brown-butter richness comes from — savory and profound rather than just beefy, with the bone adding even more depth. Price still needs verified. All four cut specials (porterhouse, spinalis, tomahawk, 45-day) typically ALWAYS run.","cut special"],
 ["Ladies Night — every Thursday","$10 martinis + \u00bd-off apps","Ladies get $10 martinis and half-price appetizers in the lounge, every Thursday night.","weekly feature"]
];
/* Rotating entree specials seen before — ask a manager if one is running tonight. */
const SPECIALS_ROTATION=[
 ["Bourbon-Glazed Salmon","$45? VERIFY price","Same bourbon glaze as the ribeye skewers, served with vegetables. Price still needs verified in Toast."],
 ["Cajun Butter Salmon","$35? VERIFY price","Cajun butter, served with vegetables. Price still needs verified in Toast."]
];
const SPECIALS_PAST=[
 ["Ahi Tuna & Wagyu Beef","$68","4 oz Hawaiian ahi crusted in black and white sesame with a hoisin glaze, plus a 4 oz Australian wagyu filet, sliced. Eight ounces of surf and turf on one plate.","off the current menu"],
 ["Australian Wagyu Porterhouse (old name)","now the USDA Choice Porterhouse","For a while the 48 oz porterhouse was called an Australian Wagyu Porterhouse at $180. Same cut, right name and price now: USDA CHOICE, $150 — roughly a 26 oz NY strip, a 12 oz filet, and about a 10 oz bone, built for two to split.","renamed"],
 ["Tomahawk Tuesday","$180 package","The 32 oz Australian Wagyu Tomahawk plus two glasses of wine, two soups or salads, and a signature Brown Butter Cake to finish — a full night out for $180. Not running anymore, but worth knowing we did it.","not running"],
 ["Heart of Ribeye Skewers","$45","Bourbon glaze mixed with onions and peppers. One of the most underrated things we ever ran.","not running"],
 ["Flank Steak with Chimichurri","was ~$35","Ran earlier this summer. Not on the current list.","not running"],
 ["14 oz Bone-In Filet","past special","Bone marrow add-on was +$25; sometimes came with roasted red potatoes.","not running"],
 ["Devour Menu","started at $45/person","Devour restaurant-week prix fixe (menu photo dated 12/31/25). Soup or salad to start, entree sets the per-person price: Filet Mignon with Bordelaise $54, Eye of Ribeye with Bordelaise $54, Faroe Salmon with remoulade and trinity slaw $47, Chicken Truffled Alfredo $47, Chicken Parmesan $47, Vegan Stuffed Tomatoes $45. One accessory: cheddar mash, brussels, creamed corn, or green beans. Dessert: chocolate brownie with ice cream, strawberry shortcake, or a gluten-free vegan sorbet. Enhancements: Crab Oscar $14, Brandy Peppercorn $6, Lobster Tail $50, 2 Scallops $24, filet upgrade to 10 oz $22.","archive"],
 ["Chicken Marsala","$35 when it ran","White cheddar mash and asparagus with an au jus gravy over the top of all of it. Off the rotation for now — it may well come back.","archive"],
 ["Buffalo Trace Dinner","past event","Five-course bourbon dinner with Buffalo Trace: salmon cucumber canape, strawberry salad, BT-glazed chicken with truffled cauliflower, eye of ribeye with marsala mash, berry verrine — with tastings of Weller Special Reserve, Eagle Rare 10, EH Taylor Small Batch, and Blanton's. Proof we run bourbon dinners.","archive"],
 ["Retired printed cocktails","see Drinks tab","Sunny Day, Tito's & Cran X Ten Again, Mo's Paper Plane, Hugo Empress, Cherry Blossom, Christian's Cucumber Kick — all archived in the Drinks tab under Archive.","archive"],
 ["Seared Blackened Ahi Tuna (appetizer)","$26","Replaced by Crispy Ahi Tuna Bites on the current menu — menu test Q2 changed with it.","ended 7/3/26"],
 ["Seared Blackened Scallops (starter)","$26","Two cajun-seared U10 scallops over creamed corn with white truffle oil. Gone from the current menu.","archive"],
 ["Roasted Green Beans (side)","$14","Green beans with red bell pepper and onion in sesame oil, oven roasted. Gone from the current menu.","archive"],
 ["Lisa's Delight","dessert cocktail","Removed from the dessert cocktail list.","ended 7/11/26"],
 ["The Nutty Martinez","dessert cocktail","Removed from the printed list — but the bar may still make it if a guest asks. The old build: butter-washed Elijah Craig Toasted, Frangelico, Disaronno, black walnut bitters, brown sugar syrup.","archived, maybe orderable"]
];
const SOUPS_STANDING=[
 ["How soups run","one per day","One soup of the day per shift, trading daily — and it comes COMPLIMENTARY with entrees. Guests can upcharge $4 to lobster bisque or baked French onion. Bisque is on every day. Most soups get a parsley garnish. Chili is off the menu right now and floats back in as a SOTD or bonus soup."],
 ["Soups seen in the rotation","varies","Jalapeño beer cheese, tomato basil bisque, buffalo chicken, loaded baked potato, cream of mushroom, cream of broccoli, potato leek, roasted poblano, corn chowder — all of these have run as the soup of the day before."],
 ["Baked French Onion","$13","Vidalia onions caramelized with butter, red wine deglaze, beef bone stock with mirepoix 48-72 hours. Brown crock, herb crouton, provolone, broiled."],
 ["Lobster Bisque","$11","Lobster stock, roux, white wine, sherry vinegar. Runs every day."],
 ["Prime Beef Chili","OFF the menu","Pulled from the printed menu for now. Comes back sometimes as the soup of the day or a bonus $4 soup — probably returns for winter."]
];
/* soup-of-the-day archive: [logged, name, what is in it, notes] — every soup stays here forever */
const SOTD=[
 ["Chicken Tortilla","Chicken tortilla soup with crispy tortilla strips dropped in right before it goes out.","nightshade + capsaicin + gluten (strips) — VERIFY rest"],
 ["Chicken Pot Pie Soup","Creamy chicken pot pie in soup form. VERIFY full build with the kitchen.","VERIFY allergens"],
 ["Chicken Noodle","Classic chicken noodle. VERIFY build.","gluten (noodles) — VERIFY rest"],
 ["Clam Chowder","Clam chowder. VERIFY build.","shellfish + dairy — VERIFY rest"],
 ["Pasta e Fagioli","Beef, noodles, celery, carrot — Italian bean-and-pasta soup. House just calls it 'fagioli.'","gluten + beef — VERIFY rest"],
 ["Italian Wedding","Cream, sausage, and noodles. Very good — an easy sell.","gluten + dairy + pork — VERIFY rest"],
 ["Chicken Gnocchi","Creamy chicken with gnocchi — dumpling-style potato pasta.","gluten + dairy — VERIFY rest"],
 ["Roasted Poblano","Roasted poblano pepper soup, served with croutons.","nightshade + gluten (croutons) — VERIFY rest"],
 ["Prime Beef Chili (as SOTD)","The standing chili sometimes runs as the soup of the day.","beef + nightshade + alcohol (beer deglaze)"],
 ["Jalapeño Beer Cheese","Beer cheese soup with jalapeño.","dairy + alcohol + gluten (beer) + nightshade — VERIFY rest"],
 ["Tomato Basil Bisque","Creamy tomato bisque finished with basil.","dairy + nightshade — VERIFY rest"],
 ["Buffalo Chicken","Creamy buffalo chicken.","dairy + chicken + capsaicin — VERIFY rest"],
 ["Loaded Baked Potato","Potato soup loaded the way the potato is — cheese, bacon, chives.","dairy + pork — VERIFY rest"],
 ["Cream of Mushroom","Creamy mushroom soup.","dairy — VERIFY rest"],
 ["Cream of Broccoli","Creamy broccoli soup.","dairy — VERIFY rest"],
 ["Cheddar Broccoli","Broccoli and cheddar.","dairy — VERIFY rest"],
 ["Potato Leek","Potato and leek, creamy.","dairy + allium — VERIFY rest"],
 ["Corn Chowder","Sweet corn chowder.","dairy — VERIFY rest"]
];
const OFFMENU=[
 ["Nothing hidden right now","—","The PD (15 oz hand-cut filet, $115) moved onto the printed menu, and the 14 oz bone-in filet is retired to the past-specials archive. The cut specials above are today's off-menu steaks."]
];
