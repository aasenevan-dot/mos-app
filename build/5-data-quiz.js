
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
 {q:"A guest has a dairy allergy and wants a filet. What is true?",o:["Steaks are buttered by default, but the kitchen can cook any steak completely butter-free — the guest just asks","Steaks can never be made dairy-free","Only the A5 can go butter-free","Butter only touches steaks at the table, so nothing changes"],t:"allergen"},
 {q:"How does the 48 oz Porterhouse break down?",o:["USDA Choice: about 15 oz NY strip + 8 oz filet + a 25 oz bone, $150 — built for two to split","32 oz of wagyu plus a 16 oz bone for $180","24 oz strip and 24 oz filet for $200","It is a dry-aged tomahawk for $160"],t:"steak"},
 {q:"Banquet gratuity works how?",o:["23% auto-grat; 3% of banquet sales is Lillian's cut; banquet sales still tip bar, busser, and expo","20% flat and no tip-outs come from it","18% and the team keeps every point","25% and it skips the pool entirely"],t:"money"},
 {q:"How does the soup course work right now?",o:["One soup of the day comes comp with entrees; $4 upcharge to bisque or French onion; chili is off the menu","Every soup is a flat $7","Bisque is the comp soup and SOTD is the upcharge","Soup only comes with seafood towers"],t:"food"},
 {q:"A gluten-free guest wants the Iced Tower:",o:["Doable — hold the Zesta crackers, brioche, and wonton chips; the tower itself is GF","Impossible, the seafood is breaded","Only if they skip the oysters","Only the Roasted Tower can go GF"],t:"allergen"},
 {q:"A peanut allergy orders calamari:",o:["Flag it — the kung pao sauce has peanuts, and the fryer is shared","No risk — calamari has no peanut exposure","Only the spicy citrus sauce has peanuts","Peanuts only show up on the kids menu"],t:"allergen"},
 {q:"Is the Crispy Ahi gluten-free?",o:["No — the ponzu is made with regular soy sauce, which carries wheat","Yes, the menu marks it GF","Yes, if you hold the jalapeno","Only if served without rice"],t:"allergen"},
 {q:"Bananas Foster rules:",o:["$12 per person, minimum 2 people, and the BACK server runs the show","A solo dessert run by the bartender","Front server only, $15 flat","The kitchen plates it — no tableside show"],t:"food"},
 {q:"What makes the sparks in the Bananas Foster show?",o:["Cinnamon sprinkled into the flame — cinnamon is made of wood, so it burns","Sugar tossed across the pan","99 Oranges poured after the fire dies","A torch held over the bananas"],t:"food"},
 {q:"The A5 presentation is:",o:["A manager cut sliced with a Hanzo steel knife on a butcher's block, torch-finished with rosemary salt — guests preset with Kobe Hanzo steak knives","Ground tableside into wagyu tacos","Pre-sliced in the kitchen with no show","Flambeed tableside with 99 Oranges"],t:"steak"},
 {q:"Bread service at Mo's:",o:["French bread with garlic-salt butter plus smooth whipped butter — always with soups and salads","Sourdough with olive oil, entrees only","Brioche with honey butter, on request only","There is no bread service"],t:"ops"},
 {q:"A table is celebrating a birthday. What do they get?",o:["A lit sparkler with a free treat — Celebration Sundae or a comp Mo's Cookie; no singing required","The staff sings and that is all","A free bottle of Moscato","Nothing unless they order dessert"],t:"ops"},
 {q:"Auto-gratuity in regular dining:",o:["20% is available on parties of 6 or more, at the server's discretion","18% is mandatory on parties of 4+","25% automatic on 8+ no matter what","There is no auto-grat outside banquets"],t:"money"},
 {q:"The +$3 smoke on an old fashioned works how?",o:["The bartender builds it and hands everything off — you smoke it under the lid on your tray and lift the lid at the table","The kitchen smokes it in the broiler","The guest smokes it themselves at the table","The bar torches the glass at the rail"],t:"cocktail"},
 {q:"Roasted Mushrooms enhancement service:",o:["$8 — arrives in a small soup bowl with a big spoon; confirm with the guest, then scoop over their steak","$14 side dish served on its own plate","Poured over every steak automatically","Only available on the filet family"],t:"food"},
 {q:"Advice From John facts:",o:["Orin Swift Merlot, $16 glass / $60 bottle — the label is a real photo of bathroom-stall graffiti","A Buehler Estate Cabernet for $105","A Daou red blend from Paso Robles","Retired — no longer poured"],t:"wine"},
 {q:"The Prime 47 Blend story:",o:["A Bardstown single barrel — our Prime 47 Carmel bar manager tasted at the distillery and bought one exclusive barrel for our restaurants","A house infusion built at the bar","A Buffalo Trace private label","A blend of leftover pours"],t:"cocktail"},
 {q:"Who runs the Farbuckle show and what goes on the tray?",o:["You (the back) help run it: sizzling skillet, tongs, gloves, tray, rosemary salt, beef tallow, warm butter — butter while cooking, tallow before pulling, rosemary salt to finish","The bartender: shaker, smoke box, torch","The manager: butcher block and Hanzo knife only","Expo runs it from the window with no tray"],t:"ops"},
 {q:"A5 or Porterhouse tableside — the mise en place is:",o:["Butcher block, Japanese Kobe knife, honing iron, gloves, rosemary salt","Sizzling skillet and beef tallow","Stacking rack and black linen","Cocktail forks and a butter warmer"],t:"steak"},
 {q:"Halfway through the Roasted Tower you should:",o:["Clear the shells, then stir the pasta setup into the remaining seafood-butter sauce and serve it — never skip it","Clear the whole tower and bring the check","Add more ice to the base","Swap in a fresh diavolo sauce from the kitchen"],t:"ops"},
 {q:"Warm-water vs cold-water oysters:",o:["Warm: larger, sweeter, more tender. Cold: smaller, brinier, firmer","Warm: smaller and brinier. Cold: larger and sweeter","They taste identical — only the shells differ","Cold-water oysters cannot be served raw"],t:"food"},
 {q:"How many sides for a table of six?",o:["Suggest 3-4 — every side comfortably feeds 2-3 people","One per guest, always six","Two max so plates stay clear","Sides are not suggested at Mo's"],t:"ops"},
 {q:"The five things to hit in your menu spiel:",o:["Names (yours + your teammate's), first time or returning, allergies, specials and features, wine/app suggestions — and always ask about celebrations","Just the specials and the soup","Prices of the three cheapest entrees","The dessert list first"],t:"ops"},
 {q:"K.D.'s Tomahawk — who is K.D.?",o:["Kevin Dickey, a former owner","The head butcher","A Kagoshima cattle rancher","The Carmel bar manager"],t:"steak"},
 {q:"What makes the house Caesar dressing unusual?",o:["An hour-long sous-vide egg blended in for creaminess, and bonito for depth alongside the anchovy profile","It is bottled and imported from Italy","It has no egg at all","Blue cheese is the secret base"],t:"food"},
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
 ["Before you walk up",["Pre-shift lineup runs about 4:15 every day — the MOD covers teams, floor plan, need-to-knows, soup, today's specials, and recent reviews.","Know soup of the day, oysters, 86'd items, cut specials, and big features.","Know the cocktail menu well enough to give 2 easy recommendations.","Know allergy protocol: ask the allergy, ring it in, tell back server, expo and chef, and a manager.","Know timing: soups, salads, and desserts 5-7 minutes (10 max); entrees 22-27 minutes.","The kitchen is Chef Miguel G's — use the name when you pitch."]],
 ["Greet",["Introduce yourself and your back server.","Ask first time, celebration, allergies, and whether they want the wine list.","Point them to cocktails, beer, wine, and whiskey.","Keep it warm and short."]],
 ["Drinks first",["Get drinks started quickly.","If they are unsure, give two simple choices — light and refreshing: Cactus Flower Mule or Lychee Icee. Sweet and fruity: Ruby & Jade or Golden Hour. Whiskey: Pittsburghed Peach Old Fashioned.","Wine bottles: the front server sets the glasses, and a MANAGER opens and pours the bottle at the table — every time.","If they order a wine bottle over $250, let a manager know and use big Bordeaux glasses."]],
 ["Appetizers",["After drinks, ask about apps.","Recommend 2-3 confidently: shrimp cocktail, calamari, crispy ahi tuna bites, oysters, or a seafood tower.","Send apps quickly and tell the back server.","Apps buy you time, but do not forget to course the rest."]],
 ["Soup, salad & bread",["How a table starts: busser greets with water, front server greets and gets drinks plus apps and soup/salad, then the BACK server drops the soup or salad and introduces themselves right there.","Bread ALWAYS comes with soups and salads — French bread with garlic-salt butter, plus smooth whipped butter.","Offer freshly cracked pepper EVERY time after dropping a soup or salad.","Course order never changes: appetizers (skippable), then soups/salads, then entrees."]],
 ["Menu wrap / order",["Hit the key items, not a speech.","Mention soup and salad protocol if needed.","Mention steak temps and that well-done filets should be butterflied.","Ask sides and enhancements: Oscar, Steak 47, lobster tail, scallops, truffle butter, mushrooms.","Any special request must be confirmed with the chef."]],
 ["Course checkbacks",["Check apps and salads after they land.","After salad or soup clears, ask about another round or a second bottle.","Entree checkback is 2-5 minutes after entrees hit: \"Is everything tasting perfect for us?\"","If the answer sounds weak, fix it immediately."]],
 ["Work with your back server",["You are the table lead; the back server keeps the table moving.","Write the dinner ticket neatly.","Let the back server reset, but help if they are buried.","For large tables, Farbuckle, A5, towers, or tableside items, help run and drop food.","Tableside owners: Bananas Foster AND the tower pasta are the BACK server's shows. The +$3 smoke: bartender builds it, YOU smoke it under the lid on your tray and lift the lid at the table."]],
 ["Dessert and close",["Ask about dessert, after-dinner drinks, port, espresso martini style drinks, or cocktails.","On busy nights have the check ready with dessert.","To-go boxing station is back-left in the kitchen — cleaned and swept every night, restocked every morning.","If something went wrong, fix it before dessert and the check.","Gift cards live at the BAR TOP, not the host stand — send buyers to the bar.","Last impression matters — thank them by name when you can."]]
];

const ANCHORS = [
 ["Mission","Leave people better than you found them."],
 ["Front server role","Table leader, relationship builder, order and ring authority, pacing owner, beverage and menu seller, check-average driver."],
 ["Always hit","First time, celebration, wine list, allergies, features, soup, oysters, cut specials, 86'd items, and wine/app suggestions."],
 ["The wine move","Ask whether they are leaning lighter and smoother or bigger and richer, then give two confident choices."],
 ["What actually sells","Caymus Cab is the volume king. Easy good-tier bottles like Advice From John move well, and Kim Crawford leads the whites. The whole reason this tab exists: get comfortable selling the Silver Oak tier and up. And yes — Cristal and the trophy bottles are really in the building; we have sold Cristal here."],
 ["One-liner","Lead the table, sell confidently, keep pacing clean, communicate with your back server, and fix problems before the guest has to ask twice."]
];

const SALES = {
 rows:[
 {d:"2026-07-13",teams:3,bq:"No / normal Sunday-style Monday",net:4144.51,grat:54.50,tips:1236.60,tt:1291.10,tax:373.11,gc:0,total:5808.72}, /* re-verified digit by digit from the Toast screen photo 8/4 */
 {d:"2026-07-20",teams:4,bq:"Yes / banquet-heavy",net:9129.50,grat:774.18,tips:1424.75,tt:2198.93,tax:821.69,gc:550,total:12700.12} /* tax + deferred re-verified from the Toast screen photo 8/4: $200 gift cards + $350 other */
 ],
 /* calibrated to the two logged Sundays */
 teamBase:1381.50, // net per team on the 7/13 calibration night — re-verified from the Toast screen photo 8/4 (was 1388.17 off a misread)
 banquetBlock:3366, // 7/20 banquet net, derived: $774.18 auto-grat / 23% house banquet grat (confirmed 8/4; was 3871 under the old 20% assumption)
 banquetGratRate:.23, // house banquet auto-grat: guests pay 23%, and 3% of banquet sales goes to Lillian
 tipNormal:.3115, // dining tips+grat as % of net on 7/13 (1291.10 / 4144.51), re-verified 8/4
 tipBanquetDay:.247, // dining-portion tip rate observed on the banquet Sunday (7/20), recomputed with the 23% banquet block
 taxRate:.09, // EXACTLY 9.0% on both verified Toast screens. Greenwood = 7% IN + 1% Johnson Co F&B + 1% Greenwood city F&B
 checkHints:[["Lighter",95,"entree + shared side + one drink"],["Typical",115,"split app, entree, side split, 1-2 drinks"],["Wine table",140,"adds bottle share and dessert"]],
 bqHeadDefault:105, // editable placeholder for banquet per-head until a real contract number is logged
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
 guestTipRate:.208, // credit tips ran 20.8% of team net sales on 5/23
 withheldRate:.02, // Toast withholds 2% of credit tips before payout
 tipouts:[["Bar",.01],["Busser",.015],["Expo",.005]], // % of TEAM NET SALES, each rounded UP to next dollar
 banquetTipout:.03, // extra 3% of sales when your team runs a banquet
 checkout523:{sales:1176,tips:244.10,withheld:4.88,pool:239.22,tipout:36,earned:203,guests:14,perGuest:84},
 log:["Date and day of week","Number of teams","Team #","Cocktailer on the schedule?","Dining cover count","Net sales","Gratuity","Toast tips","Tax","Deferred gift cards / other","Toast total","Occasion (holiday, graduation, event)","Weather","Colts / big TV game that day","Notes: big reservations, call-offs, patio"],
 read:"The July 20 jump was the banquet, not the fourth team. Strip out the banquet (about $3,366 of net, sized from its $774 auto-grat at the house 23%) and the dining room did roughly $1,441 per team — close to a normal calibration night's $1,381.50. Banquets are now parked in their own tool below and kept out of the Sunday forecast completely. Covers x average check overrides everything once real cover counts get logged."
};

/* front/back split rules — CONFIRMED by the 5/23/26 checkout sheet */
const SPLIT_RULES=[
 "Each team is a front server and a back server.",
 "Toast takes 2% of your credit tips off the top (tips withheld). What's left, plus any cash tips and gratuity, is your team pool.",
 "Tip out from TEAM NET SALES: bar gets 1%, busser gets 1.5%, expo gets 0.5% — each line rounds UP to the next whole dollar. If no expo is scheduled that night, the expo line does not come out of you.",
 "Banquets: guests pay a 23% auto-grat (they can tip more on top). The 3% banquet tip-out line is Lillian's cut as banquet coordinator. Banquet sales ALSO tip out bar, busser, and expo like all other sales.",
 "The polisher is a flat tip-out, not a percent: $10 for a team, $5 solo. But most nights there is NO polisher at all — they only show up on the busiest nights, and then usually just one.",
 "Pool minus tip-outs is what the team earned. Drop the cents.",
 "The checkout sheet is HAND math — Toast only totals the non-cash side. That is exactly why this calculator exists.",
 "Parties of 6 or more can take a 20% auto-gratuity — the server decides whether to add it. When you do, it lands as real tips on your checkout.",
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
 sun:{label:"Sunday",teams:3,wkRule:"half"}, // "60 books -> I'd guess 30 walk-ins"
 mon:{label:"Monday",teams:3,wkRule:15},
 tue:{label:"Tuesday",teams:4,wkRule:15}
};
const CHECK_CAL=115; // menu-math check,'s preset
const CKTAIL_WEIGHT=.7; // the cocktailer takes ~0.7 of a team's slice — with 3 teams + cktail each team gets ~27%, matching Evan's stated 23–30%

/* private dining minimums are NEGOTIATED PER EVENT by Lillian — headcount and minimum set in each contract. */
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
 ["Mer Soleil Chardonnay","On the 6/20 list","NOT on the printed menu","RESOLVED: off the list, do not pitch"],
 ["Dona Paula Malbec","Not on 6/20","$14 / $52 on 7/3","New by-the-glass add"],
 ["Advice From John producer","Buehler Estate on the bottle list","\"By Orin Swift\" by the glass","Verify with a manager"]
];

/* ============ HOW WE WORK — mined from Evan's photo archive 8/4/26 (Points of Passion, handouts, side work). Chat corrections always outrank these docs. ============ */
const HOUSE={
mission:"Leave people better than you found them.",
points:[
["1% Less Is The New Standard","Every time you settle for less than 100%, you operate at a lesser percent. Give only 1% less each week for a year and you are running a restaurant at 48% of expectations."],
["Applied Knowledge Is Power","It is not how smart you are — it is how you use it. Being prepared and understanding every aspect of your job creates confidence and power."],
["Every Table, Every Time","It is the little things. Attention to detail and demand for perfection is what sets us apart. Skipping even one step at a table robs the guest of a true Mo's experience."],
["Protect Your Environment","This is your house. Create a work environment you are proud of and make sure your teammates do the same. Your job is only as good as you make it."],
["Proactive vs Reactive","See what could happen and stay ahead of it, especially with guests' needs. Reactive people do not make good service industry employees — they are only looking for a paycheck."],
["Customized Service","'Happy 23rd Anniversary' beats 'Happy Anniversary.' 'Good luck in Iowa, Jim' beats 'Good luck.' The Mo's way, not corporate and cold — no matter how big we grow."],
["Pennies, Nickels & Dimes","Act like the owner. Pick up the pennies people leave sitting around and turn them into twenty dollar bills. Pull the ramekin out of the trash. Sell the desserts and coffees. It all adds up."],
["Accountability","Be accountable for your actions and your lack of action, and hold others accountable too. Fear of conflict has no place here."],
["Building Relationships","Guest, then Regular, then VIP, then Friend. Reach level four through customized service and real effort and you have created a loyal guest for life."],
["Follow The Recipe","Not your way, not another place's way — the Mo's A Place For Steaks way. Do not deter from what works, from recipe books to your job description."],
["Integrity","It is what you do when nobody is watching. People of high integrity make great teammates."],
["Twice As Long To Do It Wrong","Do it right the first time. Laziness only leads to doing it again."],
["Locked On","Stay engaged with the guest, the product, and the operation. The restaurant is a living machine we can only drive when locked on to every part of it."],
["Good vs Great","The biggest obstacle to becoming great is settling for good. Good gets no complaints and no compliments. Great gets remembered, talked about, and returned to."],
["Be Hard On The Standard, Not The Person","Get comfortable with conflict — the standard is what we protect. Do not confuse conflict with confrontation, and never take it personally. No excuses."],
["“They Weren't Ready For Us”","With preparation and pride we should say this after EVERY shift. It is the shift where a table thanks a manager for the performance. Apply all the points and we wow the guest every time."]],
isaacs:[
"Good enough is not good enough. The difference between A decision and THE RIGHT decision is 1% effort and 99% dedication to the standard — and they are never the same decision.",
"Respect the guest's personal space. No elbows in the face, move with care, don't bump the chair. When in doubt: 'pardon my reach.' No clanking silverware behind their ear, no stacking plates tableside.",
"Guest right of way. Their time is more valuable than ours. If a guest moves out of YOUR way, you failed.",
"Every guest is everybody's guest. Hospitality is a lifestyle you do not turn off. When one of OUR guests needs something, that beats sections and roles — empty plates, missing silverware, running food, escorting to the restroom.",
"Water and wine — pouring their own is not fine. They can do that at home for free. This is not even hospitality, it is a step of service.",
"Your uniform is a step of service. Uniformity is king. Preparation is a step of service. Hygiene is a step of service. Look great, smell great, feel great, execute flawlessly.",
"Sales is the art of guiding the guest to the decision that best enhances THEIR experience. Value is perception — sales is the trust that the idea is worth what they spend.",
"Mise en place — everything in its place. ALL the items a guest needs and NONE they don't. Presetting the next course sets the stage. Presentation is half of what we taste.",
"You never get a second chance at a first impression. A few early misses and the guest starts looking for flaws — give them a reason to look for excellence instead.",
"Information is a step of service. Features, 86s, the host's tip that it is their anniversary, the deathly allergy. Arm yourself and your guest with what perfection requires.",
"Smile. You are always on stage. It is the easiest, fastest way to put a guest at ease — and it is free."],
back:[
"Your job: help the front facilitate service. Minimize kitchen time — check ticket times, check orders against the front's ticket, grab your food.",
"Cover what the front cannot reach in time: refills, dropping checks, dessert spiels, consolidating tables. You are the workhorse — organization equals speed.",
"Greet only when you have a reason to be there. Drop B&B plates after the front greets. Replace silverware all night.",
"Run and clear apps. ALWAYS carry a tray out — there is almost always something extra to grab. Crumb the table. Tell the front apps are cleared so they can send the full order.",
"Pour soups only when the salads are all trayed — soup skins over if it sits.",
"Prime time? Do not stand at the salad line waiting. Use the ticket lead time.",
"Salads down → bring the pepper mill, offer cracked pepper. Clear salads and mark the table in one trip: everything onto the tray, then knives and correct silverware down, crumb again.",
"Talk timing with expo. A slow two-top of 96-year-olds needs their entrees held a little longer — say so.",
"Entrees down → tell the front so they can do the two-bite checkback. Guests eat 20-30 minutes, then clear and box.",
"Boxing: box it all, bag it, bag on your arm, tray to dish — set the bag down while you dump dishes so you don't forget it.",
"Front busy? Drop dessert menus and talk desserts, ports, after-dinner cocktails yourself. No dessert = present the check.",
"Desserts ordered → mark with B&Bs and dessert spoons. Bananas Foster = warn your front you will be tied up.",
"Have the check ready to drop WITH desserts on busy nights — it buys you serious time.",
"Talk with your front at the start of every shift: who handles what, and get on the same page about seat numbers. You keep everyone moving so the front can drive check averages — that is how everyone makes more."],
front:[
"You are the team leader. The back, kitchen, and bar rely on you to not make mistakes, not overwhelm them, and deliver a superior experience.",
"Greet: your name + your back's name. First time? Celebrating? Wine list? Point out cocktails, beer, wine, whiskey. Then cater the experience.",
"Bottle ordered → tell a manager, set glasses. $250+ gets the big Bordeaux glasses.",
"Upsell on drinks: 'Woodford on the rocks is great — have you tried the Double Oaked?'",
"Apps buy you time and lower your mental load. Recommend 2-3 confidently.",
"Offer to take the full order and course it out — guests may assume everything comes at once. Features go over before the full order.",
"Checkback every course. Problems caught at checkback mean fewer comps and happier exits.",
"Write the dinner ticket NEATLY and hand the white copy to your back.",
"Salad course cleared = the moment to ask about a bottle or another round.",
"Tables of 6+, Farbuckles, A5: help your back run and drop — there are extra trays on tableside items.",
"Entree checkback at 2-5 minutes: 'Is everything tasting perfect for us?' A halfhearted answer means something is wrong — pry gently and fix it.",
"Back gets the dessert order if possible; otherwise you do. Ask about after-dinner drinks.",
"Busy nights: check printed and in the presenter, dropped with desserts — 'This is going down here for your convenience; anything else at all, we will update it.'",
"Desserts are the last impression. If the night went sideways anywhere, fix it BEFORE the check.",
"Build relationships: names, upcoming events, a business card when warranted. Regulars are the business."],
expo:{
open:["Check the book for covers","Make bread for the day (3-5 trays minimum, baking so it is ready by 4:30)","Polish metal ramekins and expo silver from last night","Chop parsley if needed","Stock + label to-go butter and sour cream in the expo fridge","Stock all entree garnishes","Check to-go boxes and deli containers","Melt drawn butter into containers","Stock take-out boxes under the cold line","Get the night's team list from the MOD"],
mid:["Keep the expo line clear of trash, old food, dirty silverware","Clear trash, loose tickets, and debris off the floor","Keep clean expo silverware stocked and organized","Collect extra legs and trays from the cocktail area"],
close:["Clean and wipe the expo line","Clean server trays with SaniQuat water","Wipe the expo fridge inside and out","Date, label, wrap, and organize everything in the fridge","Sort expo silverware into racks for wash","Polish all expo silverware with hot water and clean linen","Check out with the closing back, then shake out with the closing manager"]},
tableside:[
["Farbuckle — full show","Ring the steak at the guest's temp. Bring: sizzling skillet, tongs, gloves, tray, rosemary salt, beef tallow, warm butter. At the table: steaks into the skillet, let them cook while you talk, butter them, apply beef tallow before pulling, finish with rosemary salt, serve."],
["A5 / Porterhouse mise en place","Butcher block, Japanese (Kobe) knife, honing iron, gloves, rosemary salt. A manager slices and tells the story — your job is the setup."],
["Roasted Tower service","Black stacking rack goes in the base when it hits the window — stack at the table over a black linen so nothing slides. Cocktail forks preset. Butter warmer with a tealight. HALFWAY through: clear shells, move the rest down, add the pasta setup to the remaining seafood-butter sauce, stir it together, and serve everyone the pasta. It creates a TON of value — do NOT skip it."],
["Iced Tower service","Same rack + linen + cocktail forks + butter warmer. Top bowl cleared away when finished to free space. Crackers, brioche, and wontons ride separate — that is why it can go GF."],
["King Crab setup","Cocktail forks, tongs, butter warmer with clarified butter."],
["Appetizer utensils","Calamari + tacos + tuna: tongs. Scallops + crab cake: spatula. Meatballs + crab dip: serving spoon. Goat cheese: spreading knife (bread + honey). Shrimp cocktail: cocktail fork + hot water kettle. Oysters: oyster fork, Tabasco, Zesta crackers, cocktail forks, hot water, NO tongs."],
["Side utensils","Serving spoon: both mashes, risotto, corn, mac, au gratin, brussels, mushrooms. Tongs: asparagus (with hollandaise), green beans, fries (with ketchup). Baked potato: knife + butter + sour cream."],
["Oyster knowledge","Warm water: larger, sweeter, more tender. Cold water: smaller, brinier, firmer."]],
backclose:[
"Once no remaining table needs anything from the back of house, start closing down.",
"Bread oven + warmers OFF. Empty bread pans to dish. Bread cutting board to dish; wipe the counter and bread knives with sanitizer + hot water.",
"Wrap remaining ramekin butters in saran.",
"Tea/coffee: pull the filter, dump grounds, rinse hot, wipe the machine and area. Dump remaining tea + coffee, urns through dish.",
"Soups: if the kitchen hasn't pulled them, move to the window, warmer OFF, wipe the warmer on all sides. Save remaining lobster meat, pan through dish, dump the cooler ice and dry it.",
"Wipe the soup countertop, organize soup bowls. Rinse ice cream scoops and thermos lids, dry with a rag.",
"Chocolate, ketchup, caramel, clarified butter, honey → deli containers, DATED, into the fridge. Used containers through dish.",
"Wipe all remaining countertops and under silverware bins. Wipe the window edges on the service side.",
"All silverware polished and sorted, wipe the station, clear debris. Then the manager walkthrough — nobody clocks out until side work is approved."],
closesheet:[
"FRONT (slow night / busy night): reset your section — sets + glassware. Polish 5-10 / 15 wine glasses. 25 / 40 napkin folds. Oyster napkins daily. Salt + pepper your section. Final table reset for tomorrow. Weekly side work every shift. Manager walkthrough required.",
"BACK team stations, divided evenly: bread station, soup station, soda machine breakdown, tea station, to-go station, expo/service trays wiped.",
"Silverware: rack, polish, store — 1 full rack slow / 2 busy.",
"BACK CLOSER: all trash out, sweep, mop, clean + stock the dessert station, clean the chocolate, final closing walkthrough.",
"House rules: side work divides equally, the team helps each other so everyone finishes together, and managers give final approval before checkout."],
barsteps:[
"Greet within 60 SECONDS of a guest sitting at the bar top. Water + menus inside 2 minutes ('still, sparkling, or regular ice water?'). First drink inside 5 minutes.",
"Menu wrap must-mentions: soup of the day + the comp/$4 protocol, oysters, cut specials, daily features, 86'd items. Must-knows: the porterhouse, the A5, the daily sorbet, the Farbuckle.",
"Apps down in under 12 minutes — past that, flag a runner, then busser, then server, then manager. And TALK to the guest about the delay; never hope they didn't notice.",
"Checkback 2-4 minutes into every course. Sell the extras: Oscar on the filet, bump a rare ribeye to med-rare so the fat melts, 1-2 family-style sides.",
"Serving order, always: Hot Lady → Hot Man → Cold Lady → Cold Man. Announce every plate with its full specification, pull the temp picks.",
"Clears within 2 minutes of a finished course — but NEVER rush; ask before blending courses. Everything unused comes off the top: menus, empty glasses, dead butter.",
"S&S in under 10 (5-7 ideal; French onion is the exception). Entrees 22-27. Desserts 5-7. Offer pepper EVERY time.",
"Steak looks wrong? Flashlight first — the dim lighting creates illusions of undercooked steaks.",
"Ring S&S and entrees together — no time gap, that is how coursing gets confused. EVERY special request gets confirmed by a chef, every single time.",
"Boxing: away from the guest, clear everything first, cold with cold, hot with hot, different sides in different boxes.",
"Desserts: approach WITH a menu in hand — it doubles the yes. Wrap the staples (cookie, brown butter cake, cotton candy), relay sorbet + gelato flavors, Bananas Foster when it applies. Teaspoon on the right, B&Bs if sharing. Every celebration gets a sparkler.",
"Check stands tall in front of the guest, run it the second the card is in the holster, use names on the goodbye. Energy is everything behind a bar — smile."],
facts:[
["Uniform","Men: black vest, black tie, long white shirt, black pants, black shoes. Women: black shirt, black pants, black shoes."],
["Suggest sides","3-4 shared sides for a table of six. Every side feeds 2-3."],
["Wine math","One $90 bottle a night at 20% grat is $18. Ten tables a night, five nights a week — bottle sales are a five-figure raise. That is why the wine tab exists."],
["House trivia","K.D.'s Tomahawk = Kevin Dickey, former owner. The old Kristen Sundae = named for a former owner's wife. Chef Miguel G runs this kitchen."],
["The rooms","Boxing station: kitchen back-left, cleaned nightly, stocked mornings. Gift cards: at the BAR TOP, not the host stand. Pre-shift: 4:15 daily with the MOD."]]
};
