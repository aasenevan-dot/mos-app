
/* ============ FOOD MENU ============ */
/* [name, price, description, tag] */
const MENU = {
 "Starters & Lounge":[
  ["Crispy Ahi Tuna Bites","$18","Crispy sushi rice, avocado, ponzu sauce, cilantro, jalapeno. Remoulade or spicy citrus on the side if expected.","Test Q2 — this replaced the old seared blackened ahi appetizer"],
  ["Seasonal Oysters","$25","On the half shell. Cocktail sauce, mignonette, Tabasco/hot sauce, raw horseradish. Setup: oyster fork with Tabasco and Zesta crackers, cocktail forks, and hot water for the dry ice presentation — no tongs.","Menu marks GF"],
  ["Calamari","$17","Lightly breaded and flash-fried. Spicy citrus and kung pao sauces. Serve with tongs.",""],
  ["Shrimp Cocktail","$26","U-6 Vietnamese tiger shrimp with fiery cocktail sauce.","Know the U-6"],
  ["Goat Cheese Spread","$17","Apples, toasted points, pistachios, local honey.","Gluten + tree nuts"],
  ["Crab Cake","$18","Maryland style, light filler, served with remoulade.",""],
  ["Creamy Spicy Crab Dip","$22","House-made tortilla chips.","Menu marks GF"],
  ["Prime Meatballs","$16","House marinara and three-cheese blend, made with prime trim.",""],
  ["Wagyu Tacos","$25","Chimichurri and wonton shell, caramelized onions, balsamic pearls.",""],
  ["A5 Nigiri","$35","Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks.",""],
  ["Filet Sliders (2)","$18","Provolone, smoked garlic aioli, crispy onion strings, pretzel bun, house-made chips.","Lounge"],
  ["Carne Asada Nachos","$25","Marinated steak, cheese, pico de gallo, avocado, cilantro sour cream.","Lounge"],
  ["Prime Beef Burger","$23","Bacon, cheddar, lettuce, tomato, onions, aioli, French fries.","Lounge"],
  ["French Dip Egg Rolls","$15","Au jus marinated shaved steak, three-cheese blend, caramelized onions, creamy horseradish.","Lounge"],
  ["Chicken Parm Sandwich","$24","Fried chicken breast, provolone, tomato diavolo sauce, garlic toasted bun.","Lounge"],
  ["Tuna Poke","$29","Sushi rice, avocado, mango, seaweed, calamari salad, spicy citrus sauce, wontons.","Lounge"],
  ["King Crab Legs","MP","Served with melted butter and cocktail sauce. Recently around $125 a pound — squarely in the current market band (roughly $85–165 retail) — but ALWAYS quote Toast, never memory.",""]],

 "Seafood Towers":[
  ["Iced Seafood Tower","$98","King crab legs, shrimp cocktail, lobster salad, oysters, blackened ahi tuna salad, wonton chips and brioche bread.","6 items — memorize"],
  ["Roasted Seafood Tower","$190","King crab legs, scallops, lobster meat, shrimp, mussels, tossed in diavolo sauce. Pasta cooked tableside.","Sauce: bechamel is the French white mother sauce; Mornay-style if cheese is added. Pasta: local docs say cappellini — use the current house term, never \"capaveti\""]],

 "Soup & Salad":[
  ["Soup of the Day","$7","Changes daily. Verify the exact soup before answering any allergen question.",""],
  ["Prime Beef Chili","$11","Chili paste, tomato paste, onions and garlic, beer deglaze, veal stock.",""],
  ["Lobster Bisque","$13","Lobster stock, roux, white wine, sherry vinegar.",""],
  ["Baked French Onion","$13","Vidalia onions caramelized with butter, deglazed with red wine, in beef bone stock with mirepoix and herbs 48–72 hours. Brown ceramic crock, herb crouton, provolone melted in the broiler, parsley.","Mirepoix = meer-PWAH = onion, carrot, celery"],
  ["House Salad","$7","Croutons and tomatoes. Allergens change with the dressing.",""],
  ["Roasted Pear Salad","$16","Arugula base, roasted pear, Gorgonzola, candied walnuts, dried cherries, maple balsamic.","Dairy + tree nuts"],
  ["Caesar / Gem Caesar","$15","Parmesan, croutons, sous-vide egg dressing, white anchovies and bonito.",""],
  ["Chopped Wedge Salad","$15","Blue cheese, bacon, marinated tomatoes.",""]],

 "Prime 47 Cuts & Wagyu":[
  ["Farbuckle Filet","6 oz $63 / 10 oz $87","Chef's sizzling butter served in a tableside skillet, beef tallow, rosemary salt. You can Farbuckle ANY cut for roughly a $9 upcharge — the difference between the 6 oz filet ($54) and the 6 oz Farbuckle ($63).","Help run this one"],
  ["Filet Mignon","6 oz $54 / 10 oz $79","Classic center-cut tender filet.","Price updated 7/3"],
  ["The PD — 15 oz Hand-Cut Filet","$115","On the printed menu — house calls it the PD. Confirmed on the published menu 8/4.",""],
  ["Filet Duo","$47","Two 3 oz end-cut medallions. Crab Oscar and horseradish bleu cheese crust.",""],
  ["Dry Aged New York Strip","14 oz $58","Dry-aged flavor. The meat hangs in a controlled room; moisture evaporates and enzymes tenderize, concentrating rich, nutty, beefy umami.","Dry aged"],
  ["Delmonico Ribeye","16 oz $80","Rich, marbled ribeye.",""],
  ["K.D.'s Tomahawk","32 oz $160","A ribeye that keeps the whole rib bone. Even more heavily marbled than the Delmonico. The bone lets marrow render during cooking, adding a butteriness you can only get by keeping the rib bone. The juiciest, most flavorful cut we offer besides the Japanese A5.","Largest oval plate"],
  ["Australian Wagyu Filet","6 oz $95 / 10 oz $135","More marbling and lower-rendering wagyu fat. Serve rare to med-rare — nudge, don't argue.","Price updated 7/3"],
  ["Japanese A5 Wagyu","$25/oz","From Kagoshima Prefecture. The show: a manager cut, sliced with a Hanzo steel knife on a butcher's block, torch-finished with rosemary salt at the table. Preset the guests with the special Kobe Hanzo steak knives. House serves wagyu RARE to MED-RARE — nudge gently, never argue.","Confirmed $25/oz 8/4 — matches the published menu (6 oz $150)"],
  ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: about 15 oz NY strip + 8 oz filet + a 25 oz bone. Board service, manager slices tableside. The move: two people split it for a high-class manager-cut experience at a great value.","Off-menu special"],
  ["Spinalis / Ribeye Cap","$14/oz, min 6 oz","Rivals filet tenderness while keeping ribeye richness.","Off-menu — $10/oz on Spinalis Sunday"],
  ["45-Day Dry-Aged Bone-In Ribeye","VERIFY price + oz","Dry-aged, bone-in flavor concentration. Not on the public site — check the kitchen or @mosaplaceforsteaks_ on Instagram.","Off-menu, dry aged"]],

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
  ["Roasted Mushrooms","$8","With compound butter.",""]],

 "Exclusives":[
  ["Chicken Parmesan","$39","Hand-breaded fried chicken breast, linguine, tomato diavolo sauce, melted provolone, garlic bread.","New on the menu"],
  ["Primavera Pasta","$40","Linguine, wild mushrooms, spinach, peeled tomatoes, pesto cream sauce. Protein add-on prices verify in Toast.","Main vegetarian-style entree"],
  ["Miso Seabass","$46","Patagonian toothfish marinated in white miso, mirin, and sake for 24–72 hours, pan seared and finished in the broiler. Coconut risotto and Brussels sprouts.",""],
  ["Sea Scallops","$48","U-10 scallops pan seared for a golden crust. Butternut squash puree, prosciutto, wild mushrooms.","Menu marks GF"],
  ["Chilean Sea Bass","$46","Asparagus, spinach, tomato, creamy lemon-caper sauce.","Menu marks GF"],
  ["Blackened Creole Salmon","$42","Faroe Island salmon, blackened. Sweet potato puree, Holy Trinity relish, remoulade.","Holy Trinity = bell pepper, onion, celery"],
  ["Short Rib Pasta","$52","Orecchiette, vermouth cream sauce, braised short rib.",""],
  ["Stuffed Chicken Breast","$38","Cream cheese, goat, parmesan, white cheddar; beurre blanc-style sauce.","Halal option noted"],
  ["Twin South African Lobster Tails","$100","Two 5 oz tails, 10 oz total. Cold-water tails, which are sweeter and more tender.","Cold water — know why"]],

 "Accessories / Sides":[
  ["Every side shares","feeds 2-3","Every single side is built to share — comfortably feeds 2 to 3 people. Say it proudly when tables ask.","Confirmed 8/4"],
  ["Grilled Asparagus","$15","With hollandaise.","Menu marks GF"],
  ["Creamed Corn","$12","Cream, dijon, horseradish, dill.","Menu marks GF"],
  ["Creamed Spinach with Roasted Butternut Squash","$16","Check the gluten symbol and current thickener.",""],
  ["Creamy Risotto","$15","Crispy prosciutto and sundried tomatoes. Cooked in chicken stock.","NOT vegetarian — chicken stock + prosciutto"],
  ["Baked Potato","$11","Classic steakhouse potato, butter and sour cream.","Menu marks GF"],
  ["White Cheddar Mashed Potatoes","$12","Butter, cream, white cheddar. Add truffle $3 or wasabi $3.","Menu marks GF · upsell the $3 add"],
  ["Truffle Cauliflower","$14","Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley.",""],
  ["Lobster Mac N' Cheese","$26","Lobster stock, roux, pasta, cheese, panko. Premium share side.","Biggest side upsell"],
  ["Jalapeno Potatoes Au Gratin","$15","Jalapeno, bacon, green onion, cheese, garlic.","Bacon is mixed in each morning — cannot be removed"],
  ["Brussels Sprouts","$15","Deep fried, sriracha hot honey toss. Verify the current sauce for allergies.",""],
  ["Truffle Fries","$11","Lightly breaded, shaved parmesan. Gluten and fryer check.",""],
  ["Forest Mushrooms","$14","Garlic compound butter.",""]],

 "Desserts":[
  ["Mo's Cookie / Prime Cookie","$10","Half-baked chocolate chip cookie served with vanilla ice cream and Hershey's syrup.","Dairy, egg, gluten"],
  ["Celebration Cake","$14","Five layers of technicolor vanilla cake layered with white chocolate mousse, served with a strawberry drizzle and gummi bears.","Celebration play — menu photo 8/4"],
  ["The Mo's Sundae","$15","Chocolate chip cookie dough, ice cream, Hershey's syrup, Meyer's dark rum caramel, strawberry sauce, fresh whipped cream.","Old sheets called it the Kristen Sundae"],
  ["Celebration Sundae","comp — VERIFY","Not the cake and not the Mo's Sundae — this is the little sundae we drop on celebrating tables. VERIFY the exact build and the comp rules.","The celebration drop"],
  ["NY Style Cheesecake","$10","Served with fresh whipped cream and strawberry sauce.","Dairy, egg, gluten"],
  ["Bailey's Creme Brulee","$10","Topped with fresh whipped cream and berries.","Alcohol, egg, dairy"],
  ["Colossal Carrot Cake","$14","Layered high with moist carrot cake and cream cheese icing.","Eggs, milk, soy, tree nuts, gluten, pineapple"],
  ["Molten Lava Cake","$13","Chocolate dome filled with chocolate cake, strawberries, and ice cream, topped with Hershey's chocolate syrup. Menu marks GF / flourless — but it still has eggs, dairy, and soy.","GF-marked, NOT allergen-free"],
  ["Brown Butter Cake","$14","Vanilla ice cream, caramel sauce, and Granny Smith apples.","Eggs, milk, soy, gluten"],
  ["Cotton Candy","$12","Menu marks GF. Every color of the rainbow, all taste like sugar — tell the table 'pick your color.'","Pairs with Ruffino Moscato"],
  ["Bananas Foster","$12/person — minimum 2 people","THE BACK SERVER RUNS THIS SHOW. Per person: 1 scoop brown butter + half a banana, and half an orange per two bananas (going over is fine). Bring: cinnamon, 99 Oranges liqueur, Nilla wafers, caramel, burner, pan. The show: melt the brown butter, breaking it up with the spatula. Coat the bananas evenly in it. Add the orange citrus so nothing burns. Pour 99 Oranges over the top and light it — big flame. Sprinkle cinnamon into the fire and it sparks up (cinnamon is made of wood, so it burns) — a fantastic show. Pour it all over bowls of ice cream with the caramel and Nilla wafers, serve with spoons. Great upsell: get the whole table in on it.","Back server's show"],
  ["Raspberry / Lemon Sorbet","varies","No dairy expected; verify current ingredients.",""],
  ["Pistachio Gelato","varies","Dairy and tree nuts.",""]],

 "Kids Menu":[
  ["4 oz Filet Mignon","$30","Verify cooking butter for a strict dairy allergy.","Whole kids menu photo-confirmed 8/4 — all 6 items, all prices"],
  ["Chicken Tenders with Fries","$10","Breaded and fried. Verify breading and fryer.",""],
  ["Buttered Noodles","$10","Pasta plus butter.",""],
  ["Mac N Cheese","$10","Pasta and cheese sauce.",""],
  ["Prime Beef Burger","$23","Bun and condiments drive most allergens.",""],
  ["Chicken Teriyaki","$15","Teriyaki commonly contains soy and wheat. Verify the sauce.",""]]
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
 ["Prime Meatballs","$16",["beef","dairy","gluten","egg","allium","nightshade"],"Binder not fully specified — verify egg and gluten."],
 ["Crab Cake","$18",["crab","shellfish","egg","gluten","capsaicin","allium"],"Light mayo/mustard and remoulade. Verify gluten."],
 ["Wagyu Tacos","$25",["beef","gluten","soy","allium","egg"],"Wonton shell — egg confirmed 8/4. Verify sauce and soy content."],
 ["Calamari","$17",["shellfish","gluten","soy","sesame","capsaicin","cross-contact","legumes"],"Fried in the SHARED fryer — cross-contact confirmed 8/4. House rule on the kung pao: treat it like standard kung pao, which means peanuts — flag every peanut allergy. Ask about egg in the breading."],
 ["Shrimp Cocktail","$26",["shellfish","capsaicin","nightshade","allium"],"Fiery cocktail sauce."],
 ["Seasonal Oysters","$25",["shellfish","allium","nightshade","capsaicin"],"Menu marks GF. Cocktail sauce and mignonette add tomato, pepper, shallot. Zesta crackers ride on the setup — that is gluten next to the plate, pull them for a gluten allergy."],
 ["Crispy Ahi Tuna Bites","$18",["fin fish","sesame","soy","egg","capsaicin","gluten"],"Formerly listed as Seared Blackened Tuna. Ponzu is soy-sauce based and soy sauce usually has wheat — do not promise GF without the chef."],
 ["King Crab Legs","MP",["crab","shellfish","dairy","nightshade","capsaicin"],"Melted butter and cocktail sauce."],
 ["Roasted Seafood Tower","$190",["crab","shellfish","dairy","egg","gluten","allium","nightshade","capsaicin"],"Pasta cooked tableside."],
 ["Iced Seafood Tower","$98",["crab","shellfish","fin fish","egg","dairy","allium","nightshade","capsaicin"],"Menu marks GF but verify crackers and sauces for gluten."],
 ["Soup of the Day","$7",["dairy","gluten","allium"],"Changes daily — verify the exact soup before answering."],
 ["Prime Beef Chili","$11",["beef","allium","capsaicin","nightshade","legumes","alcohol","gluten"],"Beer deglaze, veal stock. Beer means gluten — the alcohol cooks off but the gluten stays."],
 ["Lobster Bisque","$13",["shellfish","gluten","alcohol","dairy"],"Roux, white wine, sherry vinegar."],
 ["Baked French Onion","$13",["dairy","allium","MSG","gluten","alcohol","beef"],"Beef stock, crouton, provolone."],
 ["House Salad","$7",["gluten","nightshade"],"Croutons and tomatoes. Dressing changes the allergens."],
 ["Roasted Pear Salad","$16",["dairy","tree nuts"],"Gorgonzola and walnuts, maple balsamic."],
 ["Caesar / Gem Caesar","$15",["dairy","egg","gluten","fin fish"],"Sous-vide egg dressing, anchovies, bonito."],
 ["Chopped Wedge Salad","$15",["dairy","pork","nightshade"],"Blue cheese, bacon, marinated tomatoes. Blue cheese dressing is usually mayo-based — that is egg, ask the chef."],
 ["Filet & Lobster","$105",["beef","shellfish","dairy"],"Menu marks GF. Butter service likely."],
 ["Ahi Tuna & Wagyu Beef","$68",["fin fish","beef","sesame","soy","dairy","allium","gluten"],"Hoisin, wasabi mashed, beurre blanc."],
 ["Steak 47","$58",["beef","shellfish","allium","dairy","egg"],"Filet, shrimp, scallop, lobster, hollandaise. Topping +$25."],
 ["Filet & Scallops","$82",["beef","shellfish","pork","dairy"],"Prosciutto-wrapped scallops."],
 ["Filet Duo","$47",["beef","crab","shellfish","dairy","egg","allium"],"Crab Oscar and horseradish bleu cheese crust."],
 ["Farbuckle Filet","6/10 oz",["beef","dairy"],"Chef sizzling butter, beef tallow, rosemary salt."],
 ["Filet Mignon","6 oz $54 / 10 oz $79",["beef","dairy"],"Plain steak allergen is beef. Butter is used in cooking — verify for a strict dairy allergy."],
 ["K.D.'s Tomahawk","$160",["beef","dairy"],"Verify cooking butter for a strict dairy allergy."],
 ["Dry Aged NY Strip","$58",["beef","dairy"],"Verify cooking butter for a strict dairy allergy."],
 ["Delmonico Ribeye","$80",["beef","dairy"],"Verify cooking butter for a strict dairy allergy."],
 ["Australian Wagyu Filet","6 oz $95 / 10 oz $135",["beef","dairy"],"Verify cooking butter for a strict dairy allergy."],
 ["Japanese A5 Wagyu","$25/oz",["beef","dairy"],"Manager slices tableside. Verify cooking method and butter."],
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
 ["Chicken Parmesan (entree)","$39",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"The 7/3 menu sheet lists it as new: hand-breaded fried chicken, linguine, diavolo, provolone, garlic bread. Evan didn't recognize it when asked 8/4 — confirm it's live in Toast before pitching."],
 ["Chicken Parm Sandwich (lounge)","$24",["gluten","dairy","chicken","nightshade","egg","cross-contact"],"Fried breaded chicken out of the shared fryer, provolone, tomato diavolo, garlic toasted bun."],
 ["Grilled Asparagus","$15",["egg","dairy"],"Hollandaise. Menu marks GF."],
 ["Truffle Mashed / Cheddar Mashed","$12–15",["dairy"],"Butter, cream, white cheddar, truffle oil. Menu marks GF."],
 ["Roasted Green Beans","$14",["sesame","allium","nightshade"],"Sesame oil, red bell pepper, white onion. Menu marks GF."],
 ["Lobster Mac N' Cheese","$26",["shellfish","gluten","dairy","allium"],"Lobster stock, roux, pasta, cheese, panko."],
 ["Forest Mushrooms","$14",["dairy","allium"],"Garlic compound butter."],
 ["Jalapeno Potatoes Au Gratin","$15",["dairy","pork","allium","capsaicin","nightshade"],"Bacon is mixed in — it cannot be removed. Ask if the cheese sauce starts with flour."],
 ["Creamed Corn","$12",["dairy","allium"],"Cream, dijon, horseradish, dill. Menu marks GF."],
 ["Brussels Sprouts","$15",["capsaicin","soy","cross-contact"],"Deep fried in the SHARED fryer — cross-contact confirmed 8/4. Sriracha hot honey; verify the sauce for soy."],
 ["Creamy Risotto","$15",["dairy","pork","chicken","allium"],"Chicken stock and crispy prosciutto — not vegetarian. Risotto is usually finished with wine — ask if alcohol matters to the guest."],
 ["Truffle Fries","$11",["gluten","dairy","cross-contact"],"Lightly breaded, fried in the SHARED fryer — cross-contact confirmed 8/4."],
 ["Baked Potato","$11",["dairy"],"Butter and sour cream. Menu marks GF."],
 ["Bananas Foster","$12/person",["dairy","alcohol","cinnamon"],"Tableside, minimum 2 people. The back server runs the show."],
 ["Mo's Cookie","$10",["dairy","egg","gluten"],""],
 ["Celebration Cake","$14",["egg","dairy","gluten"],"Vanilla cake, white chocolate mousse, strawberry drizzle, gummi bears — gelatin, worth flagging for vegetarians."],
 ["The Mo's Sundae","$15",["dairy","egg","gluten","alcohol"],"Cookie dough, ice cream, Hershey's syrup, Meyer's DARK RUM caramel (that's the alcohol), strawberry sauce, whipped cream."],
 ["Celebration Sundae (comp drop)","house",["dairy"],"The treat dropped on celebrating tables. Dairy for sure — VERIFY the full build before answering an allergy."],
 ["NY Style Cheesecake","$10",["dairy","egg","gluten"],""],
 ["Bailey's Creme Brulee","$10",["alcohol","egg","dairy"],""],
 ["Colossal Carrot Cake","$14",["egg","dairy","soy","tree nuts","gluten","pineapple"],""],
 ["Molten Lava Cake","$13",["egg","dairy","soy"],"Menu marks GF / flourless — still has egg, dairy, soy."],
 ["Brown Butter Cake","$14",["egg","dairy","soy","gluten"],""],
 ["Cotton Candy","$12",[],"Menu marks GF. Flavors run every color of the rainbow and they all taste like sugar — just say 'pick your color.'"],
 ["Pistachio Gelato","varies",["dairy","tree nuts"],""],
 ["Raspberry / Lemon Sorbet","varies",[],"No dairy expected — still verify the batch."],
 ["Kids 4 oz Filet","$30",["beef","dairy"],"Verify cooking butter, same as the big steaks."],
 ["Kids Chicken Tenders","$10",["gluten","egg","dairy","cross-contact"],"Breaded and fried in the SHARED fryer — cross-contact confirmed 8/4. Verify breading for egg."],
 ["Kids Buttered Noodles","$10",["gluten","dairy","egg"],"Verify pasta ingredients."],
 ["Kids Mac N Cheese","$10",["gluten","dairy"],""],
 ["Prime Beef Burger","$23",["beef","gluten","dairy","egg","soy","allium","nightshade"],"Bun and condiments drive most allergens."],
 ["Chicken Teriyaki","$15",["soy","gluten","sesame","allium"],"Teriyaki commonly has soy and wheat. Verify the sauce."]
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
 ["Gluten — high risk","Goat cheese spread, crab cake, calamari, prime meatballs, wagyu tacos, roasted tower pasta, iced tower wonton and brioche, lobster bisque, French onion crouton, house and Caesar croutons, chicken parmesan, primavera, short rib pasta, lobster mac, truffle fries, kids pasta/tenders/burger, lounge sliders/egg rolls/chicken parm/tuna poke wontons, most cakes, cookies, and cheesecake. Shared fryer confirmed. NO gluten-free bread or crackers in house as of 8/4."],
 ["Halal","Filet-family cuts and chicken are halal: filet mignon, filet duo/end cuts, Farbuckle filet, Australian Wagyu filet, Japanese A5. Do not promise non-filet steaks as halal without manager confirmation. Watch bacon and prosciutto sides."],
 ["Vegetarian","Primavera Pasta is the main vegetarian-style entree. Risotto is NOT vegetarian — chicken stock and crispy prosciutto. Baked potato, cheddar mashed, asparagus, cauliflower, creamed corn and spinach can often be adjusted, but verify butter, stock, and bacon."],
 ["Vegan","Very limited. A custom salad or vegetable with oil and vinegar only, after chef confirmation. Butter, cheese, honey, stock, and fryer contact are everywhere."],
 ["Seed-oil-free","Steaks and chicken are seed-oil-free. Mo's cooks with beef tallow, olive oil, avocado oil, and butter. Still verify fryer and sauce items."]
];

/* ============ SPECIALS, SOUP OF THE DAY, OFF-MENU — living lists. Updates come through Claude. ============ */
/* Current per Evan 8/4/26: only these four cut specials are running. */
const SPECIALS_ON=[
 ["48 oz USDA Choice Porterhouse","$150 when it runs","NOT wagyu — USDA Choice. 48 oz total: about 15 oz NY strip + 8 oz filet + a 25 oz bone. A manager slices it tableside off the board. The pitch: two people split it for a high-class manager-cut steak experience at a serious value — and there's no split-plate charge.","cut special"],
 ["Spinalis / Ribeye Cap","$14/oz — $10/oz on SUNDAYS","Minimum 6 oz. Rivals filet tenderness while keeping ribeye richness. Spinalis Sunday is on the restaurant's own weekly-features page — the easy upsell.","cut special"],
 ["Australian Wagyu Tomahawk","$180","32 oz. Confirmed 8/4. Wagyu rule: serve rare to med-rare — nudge, don't argue.","cut special"],
 ["45-Day Dry-Aged Bone-In Ribeye","VERIFY price + oz","Dry-aged, bone-in flavor concentration. Not on the public site — check the kitchen or @mosaplaceforsteaks_ on Instagram.","cut special"],
 ["Ladies Night — every Thursday","$10 martinis + \u00bd-off apps","Ladies get $10 martinis and half-price appetizers in the lounge, every Thursday night.","weekly feature"],
 ["House events coming up","dates TBD","Sundresses & Sangria, the Surf & Turf Cup (golf outing), and a Prisoner Wine Dinner are on the books — the site doesn't publish dates, so ask a manager. Wine dinners mean banquet money.","events"]
];
/* Rotating entree specials seen before — ask a manager if one is running tonight. */
const SPECIALS_ROTATION=[
 ["Chicken Marsala","VERIFY price","White cheddar mash and asparagus with an au jus gravy over the top of all of it. Build confirmed 8/4 — still needs a price."],
 ["Bourbon-Glazed Salmon","VERIFY price","Same bourbon glaze as the ribeye skewers, served with vegetables. Needs the full build."],
 ["Cajun Butter Salmon","VERIFY price","Cajun butter, served with vegetables. Needs the full build."]
];
const SPECIALS_PAST=[
 ["Tomahawk Tuesday","$180 package","The 32 oz Australian Wagyu Tomahawk plus two glasses of wine, two soups or salads, and a signature Brown Butter Cake to finish — a full night out for $180. Not running anymore, but worth knowing we did it.","not running"],
 ["Heart of Ribeye Skewers","$45","Bourbon glaze mixed with onions and peppers. One of the most underrated things we ever ran.","not running"],
 ["Flank Steak with Chimichurri","was ~$35","Ran earlier this summer. Not on the current list.","not running"],
 ["14 oz Bone-In Filet","past special","Bone marrow add-on was +$25; sometimes came with roasted red potatoes.","not running"],
 ["Retired printed cocktails","see Drinks tab","Sunny Day, Tito's & Cran X Ten Again, Mo's Paper Plane, Hugo Empress, Cherry Blossom, Christian's Cucumber Kick — all archived in the Drinks tab under Archive.","archive"],
 ["Seared Blackened Ahi Tuna (appetizer)","$26","Replaced by Crispy Ahi Tuna Bites on the current menu — menu test Q2 changed with it.","ended 7/3/26"],
 ["Lisa's Delight","dessert cocktail","Removed from the dessert cocktail list in the July 11 update.","ended 7/11/26"],
 ["The Nutty Martinez","dessert cocktail","Removed from the dessert cocktail list in the July 11 update.","ended 7/11/26"]
];
const SOUPS_STANDING=[
 ["How soups run","one per day","Only one soup of the day at a time, and it trades out daily. Lobster bisque is on every single day regardless. Most soups get a parsley garnish for a little extra color and flavor. Certain soups tend to land on certain days — logging which as we learn them."],
 ["Baked French Onion","$13","Vidalia onions caramelized with butter, red wine deglaze, beef bone stock with mirepoix 48-72 hours. Brown crock, herb crouton, provolone, broiled."],
 ["Lobster Bisque","$13","Lobster stock, roux, white wine, sherry vinegar. Runs every day."],
 ["Prime Beef Chili","$11","Chili paste, tomato paste, onions and garlic, beer deglaze, veal stock. Sometimes also runs as the soup of the day."]
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
