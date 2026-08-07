
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
 {q:"How does the 48 oz Porterhouse break down?",o:["USDA Choice: about a 22 oz NY strip + a 12 oz filet + a 10 oz bone, $150 — built for two to split","A 26 oz NY strip + a 14 oz filet + a 12 oz bone","An 18 oz NY strip + a 10 oz filet + a 14 oz bone","A 24 oz NY strip + an 8 oz filet + a 14 oz bone"],t:"steak"},
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
 {q:"Auto-gratuity in regular dining:",o:["20% is available on parties of 6 or more, at the server's discretion — and you MUST tell the guest","18% is mandatory on parties of 4+","25% automatic on 8+ no matter what","There is no auto-grat outside banquets"],t:"money"},
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
,
/* ===== distribution build-out, 8/6 — every answer from LOCKED facts only ===== */
 {"q": "A comp and a promo hit your checkout how?", "o": ["Comps come OFF team net sales before tip-outs; promos do NOT", "Both come off net before tip-outs", "Neither touches net sales", "Promos come off, comps stay on"], "t": "money"},
 {"q": "A guest pays their whole check with a gift card. Your net sales…", "o": ["Count it like any payment — gift cards hit net sales", "Drop by that amount", "Count half of it", "Count it only if the card was bought tonight"], "t": "money"},
 {"q": "Toast withholds how much of your credit tips?", "o": ["2%", "3%", "1%", "Nothing"], "t": "money"},
 {"q": "The three nightly tip-out lines are…", "o": ["Bar 1%, busser 1.5%, expo 0.5% of team net sales — each rounds UP", "Bar 2%, busser 1%, expo 1%", "Bar 1.5%, busser 1.5%, expo 1%", "A flat $20 split three ways"], "t": "money"},
 {"q": "No expo is scheduled tonight. The expo tip-out…", "o": ["Doesn't come out — the team keeps that line", "Goes to the bussers instead", "Goes to the bar", "Comes out anyway and the house holds it"], "t": "money"},
 {"q": "The polisher tip-out is…", "o": ["Flat — $10 from a team, $5 from a solo, and most nights there's no polisher at all", "1% of team sales", "$20 every night from every team", "Saturdays only, $15"], "t": "money"},
 {"q": "Team earned $455. The split is…", "o": ["Back $228, front $227 — back takes the greater dollar", "Front $228, back $227", "$227.50 each, exact", "Whoever sold more takes more"], "t": "money"},
 {"q": "A banquet booked through Lillian runs what auto-grat?", "o": ["23% — that's the normal 20 plus Lillian's 3", "20%, same as a big party", "18%, like the old handbook says", "25% flat"], "t": "money"},
 {"q": "An 8-top walks in and orders off the regular menu. Banquet rules?", "o": ["No — that's not a banquet. Normal checkout, optional 20% big-party grat, no 3%", "Yes — 23% auto-grat applies", "Only the 3% applies", "Only if they spend $1,000"], "t": "money"},
 {"q": "The app calls the cut line at…", "o": ["$175 each — under it is cut territory, over it is work it", "$200 each", "$150 each", "$250 each"], "t": "money"},
 {"q": "The checkout sheet is…", "o": ["Hand math — Toast only totals the non-cash side", "Fully automatic in Toast", "The manager's job, not yours", "Optional on slow nights"], "t": "money"},
 {"q": "A cocktailer's pay for the night is…", "o": ["About 50% of one team — the same as one server", "A full team's earned", "Whatever the bar decides to share", "Hourly wage only"], "t": "money"},
 {"q": "Bartenders get paid…", "o": ["$2.13/hr tipped wage + the 1% tip-out pool + their own bar-top tips", "A straight $15 an hour", "Bar-top tips only", "2% of all restaurant sales"], "t": "money"},
 {"q": "Cash tips on your checkout…", "o": ["Go into the pool whole — the 2% withhold only hits credit tips", "Also lose 2%", "Stay out of the pool entirely", "Get split with the kitchen"], "t": "money"},
 {"q": "Who drops the soup-salad course and introduces themselves at that drop?", "o": ["The BACK server", "The front server", "The busser", "The expo"], "t": "service"},
 {"q": "Who gets waters on the table first?", "o": ["The busser", "The front server", "The back server", "The host"], "t": "service"},
 {"q": "Bread service lands…", "o": ["With entrées — and ALWAYS with soups and salads", "Only at the greet", "Only if the guest asks", "After appetizers only"], "t": "service"},
 {"q": "Cracked pepper gets offered…", "o": ["At every single soup and salad drop", "Only on Caesars", "Only when the guest asks", "Never — everything's pre-seasoned"], "t": "service"},
 {"q": "The course order is…", "o": ["Apps → soup/salad → entrées", "Soup → apps → entrées", "Everything together, family style", "Entrées first when it's busy"], "t": "service"},
 {"q": "Who opens and pours wine bottles?", "o": ["A MANAGER — every bottle, every time", "The server who sold it", "The bartender", "Whoever is closest"], "t": "service"},
 {"q": "A $250+ bottle gets…", "o": ["The big Bordeaux glasses", "An automatic decant", "Chilled ten minutes first", "Standard glasses unless they ask"], "t": "service"},
 {"q": "Entrée ticket time runs…", "o": ["22–27 minutes — course it, don't stack it", "10–15 minutes", "30–40 minutes", "45 minutes plus"], "t": "service"},
 {"q": "Starters run…", "o": ["5–12 minutes, 15 max", "22–27 minutes", "2–3 minutes", "A flat 20"], "t": "service"},
 {"q": "The entrée checkback happens…", "o": ["2–5 minutes after entrées hit the table", "10 minutes after", "Before the entrées land", "Only if they flag you"], "t": "service"},
 {"q": "Pre-shift is…", "o": ["4:15 every day, run by the MOD", "5:00 on weekends only", "3:30 Fridays", "We don't run pre-shift"], "t": "service"},
 {"q": "Walking behind someone with a full tray, you say…", "o": ["“Behind you” — every single time", "Nothing, just move fast", "“Excuse me” only in the kitchen", "“Hot” even when it's not"], "t": "service"},
 {"q": "End of the night, heading to your car…", "o": ["Never walk alone — tell a manager and take the escort", "It's fine after the lot clears", "Only closers get walked out", "Escorts are just for cash carriers"], "t": "service"},
 {"q": "The boxing station is…", "o": ["Kitchen back-left — never box at the table", "At the table, in front of the guest", "Behind the host stand", "At the bar"], "t": "service"},
 {"q": "Bananas Foster runs…", "o": ["$12 a person, minimum 2 — and the BACK server performs it", "$12 flat for the table", "Front server's show", "It's plated in the kitchen"], "t": "service"},
 {"q": "A birthday hits your table. You…", "o": ["Bring the free Sundae or comp Mo's Cookie with a SPARKLER — no singing", "Gather the crew and sing", "Charge $5 for the dessert", "Just say happy birthday"], "t": "service"},
 {"q": "The Esso Affo is…", "o": ["Shaken by the bartender, poured tableside by the FRONT server", "Poured by the bartender at the table", "Fully built at the bar", "Poured by the back server"], "t": "service"},
 {"q": "The smoked cocktail presentation works how?", "o": ["Bar builds it, the server smokes it on the tray and lifts the lid at the table", "The bartender carries it out", "It arrives pre-smoked, lid off", "The guest lights it"], "t": "service"},
 {"q": "Gift cards are sold…", "o": ["At the BAR TOP — not the host stand", "At the host stand", "From the manager's office", "Online only"], "t": "service"},
 {"q": "Every side dish feeds…", "o": ["2 to 3 people — suggest 3–4 sides for a six-top", "One person each", "4 to 5 people", "Only the mash is shareable"], "t": "food"},
 {"q": "Soup of the day costs a guest with an entrée…", "o": ["Nothing — it's COMP with entrées, or $4 to upgrade to bisque or French onion", "$7 always", "$4 always", "Free only at lunch"], "t": "food"},
 {"q": "Lobster bisque runs…", "o": ["Every single day — $11 on the print", "Weekends only", "It rotates with the SOTD", "Only in winter"], "t": "food"},
 {"q": "The crab cake is…", "o": ["95% crab, 5% filler with breadcrumbs — served with remoulade", "Half crab, half breading", "All crab, zero filler", "Mostly panko"], "t": "food"},
 {"q": "Prime meatballs are made from…", "o": ["Filet, ribeye, and NY strip trim with a breadcrumb binder", "Ground chuck", "A pork and beef blend", "Plant-based blend"], "t": "food"},
 {"q": "The A5 Nigiri is…", "o": ["$35 — torched rice, balsamic pearls, pear reduction, crispy leeks, metal chopsticks", "$25 with soy on the side", "$45 for six pieces", "Served with cocktail forks"], "t": "food"},
 {"q": "The Crispy Ahi Tuna Bites come with…", "o": ["The same metal Japanese chopsticks as the nigiri", "Regular forks", "Disposable wood chopsticks", "No utensils — finger food"], "t": "food"},
 {"q": "Kung pao sauce on the calamari — allergy-wise you treat it as…", "o": ["PEANUTS — flag every peanut allergy", "Nut-free", "Cashews only", "Just soy"], "t": "food"},
 {"q": "Halfway through the Roasted Seafood Tower you…", "o": ["Stir the cheese-sauce pasta into the tower sauce — that's the Capavetti Pasta", "Clear it and drop the check", "Refill the shells", "Let the guest mix it"], "t": "food"},
 {"q": "The loaded baked potato upgrade adds…", "o": ["Chives, bacon, cheese — and that bacon means PORK for allergies", "Just extra butter", "Shrimp and scallions", "Nothing — it's a size upgrade"], "t": "food"},
 {"q": "White cheddar mash runs…", "o": ["$12 — add truffle or wasabi for $3", "$15 with add-ons included", "$8 flat", "$12 with free truffle"], "t": "food"},
 {"q": "Roasted Mushrooms arrive…", "o": ["$8, in a small soup bowl with a big spoon — confirm, then scoop over their steak", "Pre-plated on the steak", "As a $14 side plate", "Raw, as garnish"], "t": "food"},
 {"q": "Bread service is…", "o": ["French bread with garlic-salt butter AND whipped butter", "Sourdough with olive oil", "Dinner rolls with honey butter", "No bread unless asked"], "t": "food"},
 {"q": "The Mo's Cookie is finished…", "o": ["By the SERVER pouring the chocolate drizzle at the table", "In the kitchen, fully sauced", "By the guest", "By the expo"], "t": "food"},
 {"q": "The PD is…", "o": ["A 15 oz hand-cut filet, $115, right on the printed menu", "An off-menu secret cut", "A 12 oz strip at $95", "The porterhouse's nickname"], "t": "steak"},
 {"q": "Steaks and butter — the rule is…", "o": ["Every steak is buttered by default, and the kitchen CAN go fully butter-free if the guest asks", "Butter-free by default", "Butter can never come off", "Only filets get butter"], "t": "steak"},
 {"q": "Serving temperature for A5 wagyu…", "o": ["Rare to med-rare — nudge gently, never argue", "Well-done brings the fat out", "Always exactly medium", "The kitchen decides"], "t": "steak"},
 {"q": "The A5 tableside show is…", "o": ["A manager cut with the Hanzo knife on a butcher's block, torch + rosemary salt, Kobe Hanzo knives preset", "The server slices at the table", "Kitchen-sliced, no show", "Just a fancy plate"], "t": "steak"},
 {"q": "The Tomahawk is…", "o": ["32 oz Australian Wagyu at $180", "24 oz USDA Choice at $120", "A 40 oz share cut at $220", "Another name for the porterhouse"], "t": "steak"},
 {"q": "The 45-day is…", "o": ["A 22 oz bone-in ribeye, dry-aged a full 45 days", "A 16 oz strip", "A boneless ribeye", "Aged 30 days"], "t": "steak"},
 {"q": "Advice From John is…", "o": ["Orin Swift Merlot — the label is real bathroom-graffiti advice", "A Buehler Cabernet", "A house blend nobody makes", "An Oregon Pinot"], "t": "wine"},
 {"q": "The volume sellers on the wine list are…", "o": ["Caymus, Advice From John, and Kim Crawford — with the goal of stepping guests toward Silver Oak tier", "Cristal and Opus One", "Only by-the-glass pours", "The house red"], "t": "wine"},
 {"q": "Why bottle sales matter to YOU…", "o": ["One $90 bottle at 20% is $18 — a few a week is a five-figure raise over a year", "They don't — cocktails tip better", "Bottles are the house's money", "Only the sommelier benefits"], "t": "wine"},
 {"q": "Chablis is…", "o": ["Chardonnay — white Burgundy", "Sauvignon Blanc", "A sweet German white", "A Champagne region"], "t": "wine"},
 {"q": "Pomerol is…", "o": ["Merlot country — Bordeaux's right bank", "Cabernet country", "A white Burgundy", "An Italian region"], "t": "wine"},
 {"q": "Cristal…", "o": ["Is in the building — Louis Roederer, for the big moment", "Isn't carried here", "Pours by the glass", "Was discontinued"], "t": "wine"},
 {"q": "The Smoked Draft Old Fashioned is…", "o": ["Vanilla extract, bitters, smoked water, Buffalo Trace — our one confirmed tap line", "A gin drink", "Served flaming", "One of six draft lines"], "t": "cocktail"},
 {"q": "Our draft cocktail situation is…", "o": ["Two lines total — Smoked OF confirmed, and the second is a mystery that is NOT Sweet & Salty", "Six rotating lines", "No taps at all", "Both lines are Old Fashioneds"], "t": "cocktail"},
 {"q": "A guest wants a mocktail. You…", "o": ["Sell it at $12 and ask their lane — citrus, berry, tropical, or herbal", "Say we don't make them", "Offer only Shirley Temples", "Charge $6"], "t": "cocktail"},
 {"q": "The Coco Caramel Carajillo build is…", "o": ["Werther's caramel-infused Hard Truth toasted coconut rum, Licor 43 Vanilla, espresso", "Kahlua, cream, vodka", "Rum and cold brew only", "Baileys with a caramel rim"], "t": "cocktail"},
 {"q": "The Esso Affo build is…", "o": ["Espresso-martini style with NO simple syrup, plus a scoop of vanilla ice cream", "A standard espresso martini with whip", "An affogato — no alcohol", "Cold brew and Baileys"], "t": "cocktail"},
 {"q": "Ladies Night is…", "o": ["Thursdays in the lounge — $10 martinis and half-off apps", "Friday, bar-wide", "The first Monday monthly", "We don't run one"], "t": "cocktail"},
 {"q": "A guest asks for the Nutty Martinez. You…", "o": ["Ask the bar — it's off the printed list, but they may still build it: butter-washed Elijah Craig Toasted, Frangelico, Disaronno, black walnut bitters, brown sugar syrup", "Say it never existed", "Point to it on the menu", "Offer an espresso martini instead"], "t": "cocktail"},
 {"q": "The shared fryer runs…", "o": ["AVOCADO oil — but shared-fryer cross-contact flags still apply", "Beef tallow", "Peanut oil", "Canola blend"], "t": "allergen"},
 {"q": "The little g on the current printed menu means…", "o": ["CONTAINS gluten — older menus marked GF instead, never mix them up", "Gluten-free", "Garlic", "Grass-fed"], "t": "allergen"},
 {"q": "The ponzu is…", "o": ["Made with regular soy sauce — NOT gluten-free", "Tamari-based and GF", "Coconut aminos", "Certified gluten-free"], "t": "allergen"},
 {"q": "Can the Iced Seafood Tower go gluten-free?", "o": ["Yes — crackers, brioche, and wontons ride separate; hold all three and the tower is GF", "Never", "Only the crab is safe", "It's GF by default"], "t": "allergen"},
 {"q": "Gluten-free bread for the bread service…", "o": ["Doesn't exist in house — no GF bread or crackers", "Lives in the freezer", "Available on request", "Comes from the bakery next door"], "t": "allergen"},
 {"q": "The kids teriyaki sauce has…", "o": ["Soy AND wheat", "Just soy", "Neither — it's house-made GF", "Only sesame"], "t": "allergen"},
 {"q": "How many Points of Passion are there?", "o": ["16", "10", "12", "20"], "t": "house"},
 {"q": "Isaac's Non-Negotiables — how many?", "o": ["11", "7", "13", "15"], "t": "house"},
 {"q": "The private rooms hold…", "o": ["Smockton 70 seated/125 cocktail · Curry 72/125 · Lounge 25 · Vault 15", "About 100 each", "Vault seats 50", "There's one private room"], "t": "house"},
 {"q": "Private dining books through…", "o": ["Lillian Speedy, Director of Sales — Lillian@mosgreenwood.com", "The host stand", "OpenTable", "Chef Miguel"], "t": "house"},
 {"q": "The next three events are…", "o": ["Sundresses & Sangria 8/13, the Surf & Turf Cup golf outing 9/8, the Prisoner Wine Dinner 9/17", "All in October", "A weekly wine dinner", "Nothing's booked"], "t": "house"},
 {"q": "The Prisoner Wine Dinner is…", "o": ["Five courses, 6:30 pm, $150 a person — RSVP Lillian@mosgreenwood.com", "A free tasting", "$50 with two courses", "Walk-in only"], "t": "house"},
 {"q": "The schedule posts…", "o": ["By Wednesday for the following week — and shift switches are approved by the GM ONLY", "Friday nights", "A month ahead", "Whenever it's ready"], "t": "house"},
 {"q": "Server uniform (men) is…", "o": ["Black vest, black tie, long white shirt, black pants, black shoes", "All-black tee and jeans", "Black apron over anything", "Blue oxford and khakis"], "t": "house"},
 {"q": "Employee meals are…", "o": ["A limited menu at 50% off after your shift — plus 25% off food for you + up to 4 guests, Monday–Thursday", "Free after every shift", "Full menu at 25% anytime", "Staff never discount"], "t": "house"},
 {"q": "The discipline ladder is…", "o": ["Verbal warning → written warning → termination, with violations on record six months", "Three strikes in a year", "One warning then done", "Fines first"], "t": "house"},
 {"q": "Probation for new hires runs…", "o": ["120 days", "30 days", "60 days", "A full year"], "t": "house"},
 {"q": "Paychecks come…", "o": ["Every other Wednesday — the pay period runs Wednesday through Tuesday", "Every Friday", "Twice a month on the 1st and 15th", "Monthly"], "t": "house"},
 {"q": "K.D.'s Tomahawk is named for…", "o": ["Kevin Dickey, a former owner", "the Kitchen Director", "a butcher in Kansas", "the knife brand"], "t": "house"}
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
 ["Before you walk up",["Pre-shift lineup runs about 4:15 every day — the MOD covers teams, floor plan, need-to-knows, soup, today's specials, and recent reviews.","Know soup of the day, oysters, 86'd items, cut specials, and big features.","Know the cocktail menu well enough to give 2 easy recommendations.","Know allergy protocol: ask the allergy, ring it in, tell back server, expo and chef, and a manager.","Know timing: soups, salads, and desserts 5-7 minutes (10 max); entrees 22-27 minutes."]],
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
 banquetGratRate:.23, // Lillian-booked banquets: 23% auto-grat (20 + her 3). Walk-in big parties are NOT banquets — no 3%.
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
 tipouts:[["Bar",.01],["Busser",.015],["Expo",.005]], // % of TEAM NET SALES, each rounded UP to next dollar. Bar is 1% — double-checked 8/5.
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
 "Banquets BOOKED THROUGH LILLIAN: guests pay a 23% auto-grat instead of 20 — the extra 3 points ARE Lillian's cut as banquet coordinator. A big party that just walks in on the regular menu is NOT a banquet: no 3%, normal rules. Banquet sales still tip out bar, busser, and expo like all other sales.",
 "The polisher is a flat tip-out, not a percent: $10 for a team, $5 solo. But most nights there is NO polisher at all — they only show up on the busiest nights, and then usually just one.",
 "Pool minus tip-outs is what the team earned. Drop the cents.",
 "COMPS come OFF team net sales before tip-outs. PROMOS do NOT come off. Gift cards DO count in net sales. (Voids — still chasing the answer.)",
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
/* hourly wages, per Evan 8/5: busser $5, expo $10, food runner $10.
   Bar wage $2.13/hr CONFIRMED + the 1% tip-out pool + their own bar-top tips.
   Cocktailer PAY = 50% of one team = same as one server (the 0.7 below is only how the FLOOR SALES slice up). */
const WAGES={busser:5, expo:10, foodrun:10, barTipped:2.13};
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
/* MISE EN PLACE — everything in its place. What goes down BEFORE the food, and what
   utensil rides out WITH each dish. Grouped the way a shift actually runs. */
mise:[
["Preset before the food ever lands","cocktail fork on the table first",[
 "The COCKTAIL FORK goes down before the plate arrives — never after, never with. Anything a guest picks meat out of a shell with earns one: <b class=\"inl\">shrimp cocktail</b>, <b class=\"inl\">king crab legs</b>, <b class=\"inl\">seasonal oysters</b>, the <b class=\"inl\">iced seafood tower</b>, the <b class=\"inl\">roasted seafood tower</b>, the <b class=\"inl\">5 oz lobster tail add-on</b>, and the <b class=\"inl\">twin South African lobster tails</b> entree.",
 "On the lobster tails it sits on the rightmost side of the guest's silverware, so it is the first thing their hand finds.",
 "Butter warmer with a tealight goes out with king crab, both towers, and every lobster tail.",
 "Steak knives get preset for steaks. The A5 and the porterhouse get the special Kobe Hanzo knives.",
 "B&B plates go down after the front greets — the back server's first touch on the table.",
 "Presetting the next course is the whole game. All the items the guest needs, none they do not."]],
["Starters","what rides out with each one",[
 "<b>Tongs:</b> calamari, wagyu tacos, crispy ahi tuna bites.",
 "<b>Spatula:</b> crab cake, seared scallops.",
 "<b>Serving spoon:</b> prime meatballs, creamy spicy crab dip.",
 "<b>Spreading knife:</b> goat cheese spread — it is going onto crostini with the honey.",
 "<b>Cocktail fork + hot water kettle:</b> shrimp cocktail.",
 "<b>Oysters:</b> oyster fork, Tabasco, Zesta crackers, cocktail forks, and hot water for the dry-ice smoke. NO tongs.",
 "<b>Oysters Rockefeller:</b> oyster forks, same as the raw ones — they arrive on a pan over a bed of salt with fresh lemon."]],
["Soup, salad and bread","the course everybody rushes and shouldn't",[
 "Bread ALWAYS comes with soups and salads — French bread with garlic-salt butter plus the whipped butter.",
 "Soup spoon sets on the side of the plate, not in the bowl.",
 "Offer freshly cracked pepper EVERY time after you drop a soup or a salad. Bring the mill; do not wait to be asked.",
 "Pour soups only once all the salads are trayed — soup skins over while salad waits.",
 "Clearing salads: everything onto the tray, knives and the correct silverware down, crumb the table — one trip."]],
["Steaks and entrees","knives, sauces, and the sides that ride along",[
 "Steak knife preset. Well-done filets get butterflied — offer it every time.",
 "Roasted mushrooms come in a small soup bowl with a big spoon — confirm with the guest, then scoop them over the steak.",
 "Sauces and enhancements land in ramekins on the side unless the kitchen plates them: bearnaise, brandy peppercorn, hollandaise.",
 "Twin lobster tails: cocktail fork rightmost, butter warmer lit with clarified garlic butter, charred lemon on the plate.",
 "Bread knife goes into the baked potato after you cut it open and press it apart."]],
["Sides","every side is built to share, so every side gets a serving piece",[
 "<b>Serving spoon:</b> both mashed potatoes, risotto, creamed corn, creamed spinach, lobster mac, jalapeno au gratin, Brussels sprouts, truffle cauliflower. On the sprouts the spoon rides inside the bowl.",
 "<b>Tongs:</b> grilled asparagus (hollandaise on the side), truffle fries (ketchup on the side).",
 "<b>Baked potato:</b> small knife in the potato, butter and sour cream alongside.",
 "Suggest 3-4 shared sides for a table of six — each one feeds two to three."]],
["Desserts and after-dinner","the last impression",[
 "Teaspoon on the right. B&B plates if the table is sharing.",
 "Walk up WITH a dessert menu in your hand — it doubles the yes.",
 "Mark the table with B&Bs and dessert spoons the moment desserts are ordered.",
 "Every celebration gets a sparkler. Pull the spent sparkler with a black linen and hold the ice cream down with the serving spoon.",
 "Bananas Foster: spoons for everyone, and warn your front you are about to be tied up.",
 "Coffee goes out with a cream and sugar caddy, every time."]],
["Tableside shows","the setups that make the night",[
 "<b>Farbuckle:</b> sizzling skillet, tongs, gloves, tray, rosemary salt, beef tallow, warm butter.",
 "<b>A5 / porterhouse:</b> butcher block, Japanese knife, honing iron, gloves, rosemary salt — a manager slices, you build the setup.",
 "<b>Roasted tower:</b> stacking rack in the base, black linen underneath so nothing slides, cocktail forks preset, butter warmer with a tealight. Halfway through, the pasta goes into the remaining sauce.",
 "<b>Iced tower:</b> same rack, linen, cocktail forks, butter warmer — clear the top bowl once it is finished to free up the table.",
 "<b>Smoked cocktails (+$3):</b> the bartender builds it, you smoke it under the lid on your tray and lift the lid at the table.",
 "<b>Bananas Foster:</b> cinnamon, 99 Oranges, Nilla wafers, caramel, burner, pan — the back server's show."]]],
facts:[
["Uniform","Men: black vest, black tie, long white shirt, black pants, black shoes. Women: black shirt, black pants, black shoes."],
["Suggest sides","3-4 shared sides for a table of six. Every side feeds 2-3."],
["Wine math","One $90 bottle a night at 20% grat is $18. Ten tables a night, five nights a week — bottle sales are a five-figure raise. That is why the wine tab exists."],
["House trivia","K.D.'s Tomahawk = Kevin Dickey, former owner. The old Kristen Sundae = named for a former owner's wife. Chef Miguel Garatachea runs this kitchen."],
["The rooms","Boxing station: kitchen back-left, cleaned nightly, stocked mornings. Gift cards: at the BAR TOP, not the host stand. Pre-shift: 4:15 daily with the MOD."],
 ["Who runs the building","Head Chef Miguel Garatachea. General Manager Mike Pavey — shift switches are approved by the GM only. Assistant General Manager Craig DeVaney. Lillian Speedy handles HR and books the banquets."]]
};

/* ============ EMPLOYEE HANDBOOK (transcribed by Evan 8/5) + VOCABULARY SHEETS ============ */
const HANDBOOK=[
[
"What this handbook is + at-will employment",
"read this first",
"<p>The handbook is general information and guidelines — not a complete manual, not a contract, and not a guarantee of employment. Policies and benefits can change at any time, and you'll be told when they do. The material is confidential — treat it that way. If you don't understand something, ask Management.</p><p><b>The philosophy:</b> everything we do affects how a guest sees us. One simple concept — service and products <b>above and beyond the guest's expectations</b>. Every employee, chef to coat check, takes pride in every action so each guest leaves with a positive memory of the Mo's Experience. Restaurants that project the million-dollar image make better profits and stand up to the finest competition.</p><p><b>At-will employment:</b> you're free to quit at any time for any reason, and the Company is free to end employment at any time, with or without cause or notice. Only the Owner can change that, and only in a written contract signed by both the Owner and the employee.</p>"
],
[
"Getting hired — I-9 + new-hire reporting",
"the paperwork",
"<p>Within three business days of your first day you must complete Federal Form I-9 and show documents proving identity and eligibility to work in the U.S. — federal law. Rehires only redo it if it's been more than three years or the old form is no longer valid. If you didn't get a blank I-9 at orientation, tell your Manager immediately.</p><p>Federal and state law also require reporting basic new-hire info (name, address, Social Security number) to the State Directory of New Hires, used to enforce child support orders. If the state says you owe support, the Company must withhold it from your check.</p>"
],
[
"Equal opportunity + harassment — zero tolerance",
"everyone works free of it",
"<p>Employment at Mo's is based on capability and qualifications — no discrimination on race, color, religion, sex, sexual orientation or identity, age, national origin, disability, or any other protected characteristic. Applies to hiring, pay, benefits, termination, everything. Willful violations bring discipline up to termination.</p><p><b>Sexual harassment</b> is illegal and comes in two legal forms: <b>quid pro quo</b> (submitting to unwelcome sexual conduct is made a condition of your job or of job decisions) and <b>hostile environment</b> (unwelcome sexual conduct that unreasonably interferes with work or creates an intimidating, hostile, or offensive workplace). It includes requests for favors, innuendo and suggestive jokes, propositions or threats, suggestive objects or pictures, leering, whistling, obscene gestures, physical aggression or intimidation, and unequal treatment based on sex. Harassment over ANY protected characteristic — yours or your friends' and relatives' — is just as prohibited. This covers work hours, work events on or off premises, and business travel.</p><p><b>If it happens to you:</b></p><ul><li>Make your disapproval directly and immediately known to the harasser.</li><li>Write down the date, time, nature of the incident, and any witnesses.</li><li>Report it to your Manager — every incident, no matter how serious it seems.</li></ul><p>Employees can raise immigration-law questions or complaints without fear of reprisal.</p>"
],
[
"Complaints, open door + grievances",
"we can't fix what we don't know",
"<p>Anyone who witnesses or is subject to inappropriate conduct can complain to ANY member of management — and a Manager who hears of it must notify Human Resources immediately. Serious complaints get a complete, impartial investigation, handled as confidentially as possible, with corrective action if appropriate. <b>No retaliation</b> against anyone who complains in good faith or helps an investigation — if you feel punished for speaking up, report that immediately too.</p><p><b>Open door:</b> if something about your job is bothering you — question, concern, idea, problem — bring it to Management as soon as possible, or straight to HR if that feels more comfortable.</p><p><b>Grievances:</b> anything peer-to-peer talk can't resolve goes to Lillian Speedy, our Director of Human Resources — Lillian@mosgreenwood.com, or 817-889-1155 (the old HR line; it still forwards to her). Oral or written, your choice; writing is encouraged because it focuses your thoughts. HR responds within seven days.</p>"
],
[
"Probation + discipline",
"the 120 days and the three steps",
"<p>Everyone's first <b>120 days</b> are probationary — either side can end the relationship for any reason during that window, and a probationary employee can be let go for a single rule violation.</p><p>After that, most problems run the progressive schedule: <b>first violation</b> — verbal (or written) warning · <b>second</b> — written warning · <b>third</b> — termination. Serious offenses can skip steps; sometimes a step gets repeated. Violations stay on your record for six months.</p><p><b>Immediate termination, no notice:</b></p><ul><li>Theft, or attempting to remove company, employee, or guest property</li><li>Striking or fighting another person</li><li>Being under the influence of alcohol or drugs on company time or premises</li><li>Committing an illegal or criminal act</li><li>Possession of marijuana or any other illegal drugs</li></ul>"
],
[
"Hours, the schedule + the clock",
"be on the floor at your in-time",
"<p>Your scheduled time is the time you're <b>on the floor, in uniform, ready to work</b> — arrive early enough to change, and plan for traffic. Tardiness is not tolerated.</p><p>You own every shift you're scheduled for. Requests off go in as far ahead as possible. The schedule posts by Wednesday for the following week. <b>Shift switches are approved by the General Manager ONLY.</b></p><p>Clock in and out every shift, and check with Management before clocking out so your work gets checked. Accurate clocking is how you get paid correctly — chasing missing punches costs the company real administrative time.</p>"
],
[
"Getting paid",
"every other Wednesday",
"<p>Paychecks come every other week; the pay period runs Wednesday through Tuesday, and checks are ready for pickup on Wednesday. A discrepancy? Tell Management immediately so the next check fixes it. Someone else can pick up your check only with a signed note from you and their ID.</p><p><b>Deductions:</b> mandatory ones are the law — federal income tax, Social Security (FICA), state taxes. Voluntary ones are what you authorized — insurance, savings, 401k. To change your W-4, see your Manager.</p><p><b>Garnishments:</b> if a court or agency orders wages withheld (child support, taxes, student loans, judgments), the Company must comply and will notify you at once. Disputes go to the court or agency that issued the order, not to the restaurant.</p>"
],
[
"Benefits + leave",
"disability, workers' comp, FMLA, jury duty",
"<p><b>We're hospitality — we work holidays.</b> The restaurant closes for certain ones, always subject to change.</p><p><b>State disability insurance</b> can pay part of your wages when a NON-work illness or injury keeps you out; all employees are covered through paycheck deductions. <b>Workers' compensation</b> covers WORK-related illness or injury — medical care and lost wages. Report any work injury to your Manager immediately, no matter how minor: an Accident Investigation Report must be completed and the state reporting clock is seven days.</p><p><b>Family and Medical Leave (FMLA):</b> after 12 months and 1,250 hours worked you can take unpaid leave for your own serious health condition, to care for a spouse, child, or parent with one, or for a new baby, adoption, or foster placement. Give 30 days' notice when the need is foreseeable — otherwise as much as you can. You return to your job or an equivalent one, with two exceptions: a position eliminated for unrelated reasons, and the key-employee rule (top-paid 10%, where holding the job would cause substantial harm — you'd be told when you request leave). Not coming back at the end without an extension counts as quitting. Expect to provide a doctor's certification, possibly re-certifications, and a fitness-for-duty note before returning. Intermittent leave (a day or two at a time) is allowed for health conditions — the Company may temporarily move you to an equivalent-pay position that fits the schedule.</p><p><b>Personal leave</b> (after probation): written request to the Owner, as much notice as possible — granted or denied based on the reason, business needs, and your record. Keep insurance by paying the weekly premium. Not returning on time without approval = voluntary termination.</p><p><b>Military leave</b> follows state and federal law including the Indiana Military Family Leave Act — written notice with active-duty papers when available, benefits continue at your own expense, and you generally return to the same or an equivalent position.</p><p><b>Jury duty:</b> you're entitled to the time. Tell your Manager the moment the summons arrives, say how long the trial should last if you're seated, and check in during service so we know when to expect you back.</p>"
],
[
"House rules",
"meals, the bar, gratuity, gum",
"<p><b>Company property:</b> treat it with care, use it as intended, and report anything broken or unsafe immediately. When employment ends, everything comes back clean and in good repair — handbook, manuals, keys, equipment, all of it.</p><p><b>Phones:</b> house phones are business-only; personal calls need a Manager's permission. Incoming calls only for emergencies, routed through Management.</p><p><b>Employee meals:</b> a limited menu at 50% off after your shift, soda and coffee available. Off duty, you and up to four guests get 25% off the food portion, Monday through Thursday. Enjoy your own restaurant.</p><p><b>Gum chewing: NOT ALLOWED, PERIOD.</b></p><p><b>The bar:</b> no alcohol while working, and no sitting at the bar on the day of your shift. On your night off, drink responsibly — it's still your place of employment, and the house can refuse service to anyone visibly intoxicated.</p><p><b>Gratuity on big parties:</b> the printed handbook gives the option of adding 18% on parties of 6+, at your discretion — you MUST tell the guest and use the gratuity-included stamp. Double-tipping without the guest's knowledge is never allowed, and the privilege disappears if it's used dishonestly. <i>Today's floor practice runs this at 20% — newest word wins; same rules about telling the guest.</i></p><p><b>Guest problems:</b> if a guest might be unhappy with anything, you are EMPOWERED to see they leave happy — bring it to the Manager on duty immediately and fix it under their direction.</p><p><b>Meetings</b> are held as needed and are mandatory. <b>Smoking and vaping are prohibited</b> on company property — there are no smoke breaks.</p>"
],
[
"Look the part — conduct + dress code",
"the image is the experience",
"<p>Act professionally anywhere you're on company property, on company business, or representing Mo's: follow the rules, no rude or outrageous behavior, no ridicule or hostile jokes, treat coworkers, guests, and vendors with patience and respect, be courteous and helpful.</p><p><b>Kitchen:</b> provided hat and t-shirt, slip-resistant shoes, kitchen pants or jeans, hat or hair net with shoulder-length hair pulled back. <b>Wait staff:</b> provided white oxford, black vest, black tie; you buy black pants, socks, black non-slip shoes (no tennis shoes); checked before every shift with your crumber — no exceptions. <b>Host:</b> full uniform, polished and professional — no midriff or super-low tops, no jeans or denim anything, no khakis or cargos, no t-shirts, tennis shoes, flip flops, or open toes. <b>Bar and cocktail:</b> provided black oxford, bistro apron, two crumbers, two black pens; you bring black pants, belt, socks, shoes (no gym shoes or heels); hair pulled back while carrying trays; men may wear a white, black, or red undershirt. <b>Bussers and expo:</b> provided long black bistro apron and black neck tie, worn properly; you bring black pants, belt, shoes, socks; no open tops or rolled sleeves.</p><p><b>Grooming:</b> neat and clean, always — body, teeth, hair, nails. Never fix hair in front of guests; use the restroom, brush your shoulders, wash your hands. Hair off the shoulders, never falling forward over food, styles and colors subject to management approval. Beards and mustaches trimmed and neat — otherwise clean-shaven daily, and health code caps beards at one inch.</p><p><b>Jewelry:</b> basic, not extravagant — one ring per hand, up to three bracelets, earrings in ears only, no other visible piercings, no pins on vests, necklaces inside the shirt. <b>Nails:</b> clean, kept, under an inch — no chips, no trendy or bright polish; natural colors and French manicures only. <b>Makeup</b> reads business. <b>Hygiene:</b> stay ahead of perspiration and breath; light, refreshing fragrance only.</p>"
],
[
"Safety — the nine rules",
"protect yourself, your crew, your guests",
"<ul><li>Never operate equipment you haven't been trained on. Under 18 may not run the slicer, mixer, grinder, or chopper, drive a company vehicle, or work scaffolding and high ladders — federal law.</li><li>Report EVERY accident or injury immediately, guest or employee, no matter how small.</li><li>Clean up spills and dropped food the moment you see them.</li><li>No horseplay, ever. Accidents are caused, not random.</li><li>Slip-resistant closed-toe shoes only. Never run in the dining room or kitchen.</li><li>Hot pad for anything hot. Carry food the way you were trained. Never pour hot drinks over the table — pour tableside, out of the guests' reach. Guests talk with their hands.</li><li>Say “BEHIND YOU.” Every time. Communicate when you're moving with full trays or glassware.</li><li>Watch what goes on the floor. Lift with your legs, not your back.</li><li>NEVER walk to your car alone. Tell Management you're leaving and take the escort.</li></ul><p><b>In an emergency</b> — fire, tornado, serious accident — your own safety comes first. For serious injury, dial 9-1-1 immediately.</p>"
],
[
"Privacy, tech + your records",
"what's private and what isn't",
"<p><b>Workspaces aren't private.</b> The Company can search its own property at any time — lockers, desks, storage, workspaces — to enforce safety, harassment, theft, and drug policies. If you put a lock on company property, Management gets a copy of the key or combination.</p><p><b>Devices:</b> personal phones and devices stay away during working hours except infrequent, necessary use that interferes with nothing. Anything the Company provides — phone, laptop, internet — is company property, can be monitored without notice, and carries no expectation of privacy, passwords or not. Sexually explicit or otherwise objectionable material is never to be accessed, stored, or sent on anything of the company's, and nothing company-owned gets used for anything illegal. No downloads or new software without the President's written approval — that's how viruses arrive.</p><p><b>Your records:</b> the personnel file exists to serve you — emergency contacts, tax withholding, insurance. It's kept as confidential as possible; reference checks get only your name, dates, and employment status unless you sign a release. Medical records and work-eligibility forms live separately, locked. Tell your Manager whenever your name, address, phone, dependents, withholding, marital status, emergency contact, or license restrictions change.</p>"
],
[
"Drugs + alcohol",
"clean at work, no exceptions",
"<p>Mo's is committed to a safe, comfortable, productive workplace. Employees will not be involved in the unlawful use, possession, sale, or transfer of drugs in any manner — and that includes misusing legal prescription and over-the-counter medication, not just street drugs. Showing up under the influence harms you and everyone around you.</p><p>The Company reserves the right to inspect employees, their possessions, and their workspaces to enforce this policy.</p>"
],
[
"Trade secrets + conflicts of interest",
"what you learn here stays here",
"<p>Working here you'll learn sensitive things — recipes, numbers, plans, procedures, manuals. All of it is Confidential Information, it stays confidential during your employment and AFTER you leave, and disclosing it brings discipline up to termination while you're here and legal action after. When employment ends, every copy comes back — nothing gets taken, deleted, destroyed, or disparaged.</p><p><b>Conflicts of interest:</b> your energy and loyalty belong to this company. Not allowed: working for a competitor, customer, or vendor in any capacity; owning an interest in one; using company resources for personal gain; using your position for personal gain. Not sure whether something crosses the line? Ask the Owner first.</p>"
]
];
const VOCAB=[
[
"Service & Etiquette",
[
[
"Mise en place",
"“Everything in its place” — preparing and organizing before service."
],
[
"Course",
"One part of a multi-dish meal — appetizer, main, dessert."
],
[
"Crumber / Crumbing down",
"Removing crumbs from the table between courses."
],
[
"Marking the table",
"Setting the flatware and glassware the next course needs."
],
[
"Clearing",
"Removing dishes in a specific order — from the right side."
],
[
"Pivot point system",
"Seat numbering system to track guest orders accurately."
],
[
"Silent service",
"Non-intrusive serving style — discretion and minimal noise."
],
[
"Coursing",
"Timing dishes so guests receive each course in sync."
],
[
"Refire",
"Re-cooking or remaking a dish that was incorrect or returned."
]
]
],
[
"Beverage Service",
[
[
"Sommelier",
"Wine steward — expert in wine pairing and service."
],
[
"Decanting",
"Pouring wine into a decanter to aerate it and separate sediment."
],
[
"Varietal",
"The type of grape used in a wine — Merlot, Chardonnay."
],
[
"Vintage",
"The year the grapes were harvested."
],
[
"Body",
"The weight or fullness of a wine — light, medium, full."
],
[
"Finish",
"The lingering taste after swallowing."
],
[
"Aperitif",
"Drink served before a meal to stimulate appetite."
],
[
"Digestif",
"Drink served after a meal to aid digestion."
],
[
"Neat / Up / On the rocks",
"How spirits are served — no ice, chilled and strained, over ice."
],
[
"Flight",
"A selection of wines or spirits served together for tasting."
],
[
"Corkage fee",
"Fee for opening a bottle a guest brought in."
]
]
],
[
"Kitchen & Culinary",
[
[
"Sous chef / Chef de partie / Garde manger",
"Key kitchen roles — second in command, station chef, cold-station chef."
],
[
"À la carte",
"Ordering individual dishes from the menu."
],
[
"Prix fixe",
"Fixed-price menu with set courses."
],
[
"Degustation / Tasting menu",
"Multi-course meal showcasing the chef's specialties."
],
[
"Reduction",
"Concentrating a liquid by simmering to intensify flavor."
],
[
"Emulsion",
"A mix of two unblendable liquids — vinaigrette, hollandaise."
],
[
"Sous vide",
"Cooking food in vacuum-sealed bags at precise low temperatures."
],
[
"Blanch / Sear / Poach / Braise",
"Common fine-dining cooking methods."
],
[
"Roux",
"Butter and flour mixture used as a thickener."
],
[
"Umami",
"The “fifth taste” — savory, rich flavor."
]
]
],
[
"Hospitality & Guest Experience",
[
[
"Guest recovery",
"Handling and correcting service mistakes gracefully."
],
[
"Anticipatory service",
"Seeing what the guest needs before they ask."
],
[
"Upselling",
"Suggesting higher-end or complementary items without being pushy."
],
[
"Table maintenance",
"Keeping the table neat and resetting quietly between courses."
],
[
"Body language awareness",
"Reading and mirroring guest cues."
],
[
"Fine dining cadence",
"The rhythm and pacing of meal service."
],
[
"VIP / Regular guest handling",
"Special procedures for repeat or high-value guests."
]
]
],
[
"Common Restaurant Terms",
[
[
"Brigade",
"The structured hierarchy of kitchen and service staff."
],
[
"Front of house (FOH)",
"Front servers, back servers, hosts, bartenders, bussers — guest-facing staff."
],
[
"Back of house (BOH)",
"Kitchen and support staff."
],
[
"86'd",
"Out of stock or unavailable."
],
[
"Fire / Pick up / Hands",
"Kitchen calls — start a dish, it's ready, someone run it."
],
[
"Expo (Expediter)",
"The person coordinating orders between kitchen and servers."
],
[
"Check back / Two-bite rule",
"Return within two bites to check the guest is happy."
]
]
]
];
