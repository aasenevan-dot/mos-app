/* ============================================================
   MO'S CO-WORK — DATA
   Sources: MoS-Training-Transfer-2026-08-02 vault.
   Newest file wins on conflicts (noted inline where they exist).
   ============================================================ */

/* WINE — [name, cat, tier, price, region/story, flavors, tannin, acid, body, finish, pairing, pitch]
   cat: cab | merlot | pinot | old | champ | gred | gwhite      tier: Good | Better | Best     */
const W = (n,c,t,p,r,f,T,A,B,fin,pair,pitch)=>({n,c,t,p,r,f,T,A,B,fin,pair,pitch});

const WINES = [
/* ---- CABERNET & RED BLENDS (bottles) ---- */
W("Buehler Estate Cabernet 2021","cab","Good","$105","Napa Valley","Blackberry, cassis, dark cherry, light oak spice","Med-High","Med","Full","Classic Napa finish, firm but not trophy-heavy","Dry Aged NY Strip, Filet Mignon, Steak 47","Strong Napa Cabernet value. Classic structure without trophy pricing."),
W("Cade Estate Howell Mountain 2022","cab","Better","$180","Howell Mountain, Napa — mountain fruit, graphite, firmer tannin","Blackberry, cassis, black plum, dark chocolate, espresso, graphite","High","Med-High","Full","Long, mountain-structured, graphite and cocoa","Delmonico Ribeye, Tomahawk, Porterhouse, Farbuckle","Howell Mountain gives it elevation, darker fruit, and serious tannin for marbled steak."),
W("Cain 5 \"Spring Mountain\" 2012","cab","Best","$300","Spring Mountain, Napa — aged Bordeaux-style","Dried cherry, cedar, tobacco, dried herbs, earth","Med","Med-High","Med-Full","Aged, savory, earthy, harmonious","Filet, Dry Aged NY Strip, A5 Wagyu if guest likes mature wine","This is bottle-age and harmony, not just raw Napa power."),
W("Cain 5 \"Spring Mountain\" 2013","cab","Best","$300","Spring Mountain, Napa","Black cherry, cedar, tobacco, cocoa, forest floor","Med-High","Med-High","Med-Full","Savory, layered, evolved","Dry Aged NY Strip, Delmonico, Short Rib Pasta","Bordeaux-style Napa blend with age, more nuanced than a plush Cabernet."),
W("Cain 5 \"Spring Mountain\" 2014","cab","Best","$325","Spring Mountain, Napa","Black cherry, graphite, cedar, dried herbs, tobacco, cocoa","Med-High","Med-High","Med-Full","Long, earthy, savory spice","Tomahawk, NY Strip, Filet for serious wine guests","Aged Spring Mountain blend; great for guests who like tobacco, cedar, and earth."),
W("Cakebread Cellars 2021","cab","Better","$180","Napa — recognizable Napa family name","Blackberry, currant, plum, vanilla, baking spice","Med-High","Med","Full","Polished Napa finish, smooth oak","Filet Mignon, NY Strip, business dinner steak table","A familiar premium Napa name; easy confident steak recommendation."),
W("Caymus \"California\" 2022","cab","Good","$100","Wagner family; plush Caymus style","Ripe blackberry, dark cherry, cocoa, vanilla","Med","Low-Med","Full","Plush, smooth, fruit-forward","Ribeye, Filet, guest who asks for Caymus style","Caymus richness at a friendlier bottle price."),
W("Caymus Napa Valley 2023","cab","Better","$160","Napa — Wagner family","Dark cherry, cassis, blackberry jam, chocolate, vanilla","Med","Low-Med","Full","Plush, rich, recognizable","Delmonico Ribeye, NY Strip, Tomahawk","The name a lot of Cabernet drinkers recognize; plush and easy with steak."),
W("Caymus Special Select 2019","cab","Best","$525","Napa — Wagner flagship. Only wine ever named Wine Spectator Wine of the Year twice","Black fruit, cassis, mocha, sweet oak, dark chocolate","Med-High","Med","Full","Long, lush, special-occasion Caymus","Tomahawk, Porterhouse, Wagyu, high-check celebration","If they already like Caymus, this is the special-occasion jump."),
W("Caymus \"Suisun Grand Durif\" 2021","cab","Good","$65","Suisun Valley — Petite Sirah/Durif","Blackberry, blueberry, black pepper, cocoa","High","Med","Full","Dark, grippy, bold","Prime Meatballs, Short Rib Pasta, Delmonico","Petite Sirah/Durif style: dark color, dark fruit, more grip, friendly price."),
W("Far Niente \"Bella Union\" 2021/2023","cab","Good","$105","Rutherford-style, by Far Niente","Black cherry, cassis, cedar, plum, dark chocolate, vanilla","Med","Med","Full","Polished, integrated, smooth","Filet, NY Strip, Steak 47","By Far Niente, polished Rutherford-style Cabernet blend without Far Niente pricing."),
W("Far Niente Napa Valley 2022","cab","Better","$225","Napa — luxury house polish","Cassis, blackberry, plum, cedar, cocoa, polished oak","Med-High","Med","Full","Elegant, long, luxury Napa","Filet, NY Strip, business dinner, anniversary","Classic Napa luxury house; premium and polished without going to Opus-level pricing."),
W("Faust Napa Valley 2022","cab","Good","$100","Napa","Blackberry, dark cherry, cassis, cocoa, spice","Med-High","Med","Full","Structured but approachable","Ribeye, NY Strip, table moving from glasses to bottle","Strong $100 Napa lane; clear step up from glass Cabernet."),
W("Groth Oakville Estate 2022","cab","Better","$150","Oakville, Napa — classic cab power","Blackberry, cassis, dark plum, cocoa, cedar, baking spice","High","Med","Full","Structured, classic Oakville steak finish","Ribeye, Tomahawk, Dry Aged NY Strip","Classic Oakville Cabernet: dark fruit, cocoa, cedar, and tannin for marbling."),
W("\"Halo\" Trefethen 2015","cab","Best","$550","Napa — Trefethen flagship","Cassis, blackberry, dried plum, cedar, leather, cocoa","High","Med","Full","Long, rare, serious, age-polished","Tomahawk, Porterhouse, Wagyu, collector table","Trophy-level Napa Cabernet for a table that wants rare and serious."),
W("\"Halo\" Trefethen 2017","cab","Best","$550","Napa — Trefethen flagship","Black currant, dark cherry, graphite, oak spice, cocoa","High","Med","Full","Long, powerful, polished","Delmonico, Tomahawk, high-end celebration","Not just a familiar label; this is the serious Trefethen flagship."),
W("Justin \"Isosceles\" 2021","cab","Better","$180","Paso Robles — warm, bold, ripe","Black cherry, cassis, plum, dried herbs, vanilla spice","Med-High","Med","Full","Structured, Bordeaux-style, dark fruit","NY Strip, Short Rib Pasta, Delmonico","Bordeaux-style California blend, structured and dark without being standard Napa."),
W("Mt. Veeder Napa Valley 2022","cab","Better","$150","Mt. Veeder, Napa — dark mountain cab","Black currant, blackberry, mountain herbs, cocoa, graphite","High","Med-High","Full","Dark, firm, mountain-style","Ribeye, Tomahawk, Porterhouse","Mountain Cabernet: darker, more structured, more serious."),
W("Opus \"Overture\" NV/2021","cab","Best","$300","Napa — Mondavi & Rothschild prestige","Blackberry, cassis, dark cherry, cedar, cocoa, espresso","Med-High","Med","Full","Fine tannins, layered, polished","Filet, NY Strip, anniversary/business dinner","From Opus One; prestige and polish without full Opus pricing."),
W("Opus One Napa Valley 2021","cab","Best","$900","Napa — the trophy name","Cassis, blackberry, plum, violet, cedar, baking spice","High","Med-High","Full","Extremely long, refined, trophy Napa","Tomahawk, A5 Wagyu, milestone anniversary","The Napa trophy name: story, recognition, polish, special occasion."),
W("Orin Swift \"8 Years in the Desert\" 2023","cab","Good","$85","Orin Swift / Dave Phinney bold label","Blackberry jam, raspberry, cherry, vanilla, spice","Med","Med","Full","Big, ripe, crowd-pleasing","Prime Meatballs, Short Rib Pasta, ribeye table sharing a bottle","Bold Orin Swift red blend; great for guests who like Prisoner-style wines."),
W("Orin Swift \"Palermo\" 2022","cab","Better","$120 / $350","Orin Swift Cabernet lane","Blackberry, currant, dark plum, chocolate, oak spice","Med-High","Med","Full","Dramatic, rich, fruit-forward Cabernet finish","Delmonico, NY Strip, Tomahawk","Orin Swift's Cabernet lane: bold packaging, big fruit, steakhouse style."),
W("Patrimony by Daou","cab","Best","$550","Paso Robles — Daou family power","Black cherry, cassis, blackberry, cocoa, graphite, sweet spice","High","Med","Full","Powerful, plush, luxury Paso","Tomahawk, Porterhouse, high-check Cabernet guest","The high-end Daou bottle: powerful luxury Cabernet experience."),
W("PlumpJack Oakville Estate 2019","cab","Best","$350","Oakville, Napa","Blackberry, cassis, plum, cocoa, vanilla, cedar","High","Med","Full","Deep, polished Oakville finish","Ribeye, NY Strip, special occasion steak table","Premium Oakville Cabernet with a strong reputation and real depth."),
W("Quintessa Napa Valley 2022","cab","Best","$550","Rutherford, Napa — single biodynamic estate","Black cherry, cassis, plum, cocoa, graphite, subtle spice","Med-High","Med-High","Full","Refined, layered, polished tannins","Wagyu, Tomahawk, anniversary table","Single biodynamic Rutherford estate; powerful but elegant."),
W("Robert Craig \"Affinity\" 2021","cab","Better","$125","Napa blend","Black cherry, currant, plum, cedar, dried herbs","Med-High","Med","Full","Structured, approachable Napa blend","NY Strip, Filet, Steak 47","Great bridge between value Napa and serious Napa."),
W("Shafer \"Relentless\"","cab","Better","$250","Napa — Syrah/Petite Sirah, NOT Cabernet","Black plum, blackberry, dark chocolate, white pepper, savory meat","Med-High","Med","Full","Plush, peppery, meaty, bold","Delmonico, Short Rib Pasta, Prime Meatballs","Syrah/Petite Sirah, not Cabernet; darker, meatier, peppery curveball."),
W("Silver Oak \"Timeless\" 2021","cab","Best","$350","Napa","Cassis, blackberry, vanilla, cedar, clove, cocoa","Med-High","Med","Full","Long, polished, elevated Silver Oak","Tomahawk, NY Strip, celebration steak table","For the guest who respects Silver Oak and wants the more special expression."),
W("Silver Oak Napa Valley 2019","cab","Better","$285","Napa","Blackberry, black cherry, cedar, vanilla, baking spice","Med-High","Med","Full","Classic, polished, recognizable","Ribeye, NY Strip, business dinner","Classic luxury steakhouse Cabernet; very safe premium name."),
W("Silver Oak Alexander Valley 2020","cab","Better","$186","Alexander Valley — American oak","Blackberry, black cherry, raspberry, cedar, vanilla, clove","Med","Med","Full","Silky, polished, American oak","Filet, NY Strip, guests who want Silver Oak under Napa price","Approachable Silver Oak with cedar and vanilla from American oak."),
W("The Prisoner California 2023","cab","Good","$75","California red blend","Blackberry, raspberry, cherry, cocoa, vanilla spice","Med","Med","Full","Smooth, ripe, crowd-pleasing","Prime Meatballs, Short Rib Pasta, mixed steak table","Familiar, rich red blend; safe bottle when the whole table wants red."),

/* ---- MERLOT ---- */
W("Advice From John, Orin Swift","merlot","Good","$60","California — Orin Swift (Dave Phinney). Conflict RESOLVED 8/4: the old 'Buehler' listing was a mix-up with the separate Buehler Chardonnay","Blackberry pie, black plum, sage, espresso finish","Low-Med","Med","Med-Full","Plush, soft, aromatic modern-California red (77% Merlot with Petite Sirah, Syrah, Grenache)","Filet, Steak 47, guest who finds Cab too dry","Fun story: the label is a real photo of bathroom-stall graffiti — the 'advice' comes from THE john. Phinney's project to make Merlot cool again."),
W("Duckhorn Merlot 2022","merlot","Good","$65","Napa — Duckhorn family","Dark red berries, black cherry, plum, floral notes","Med","Med","Med-Full","Polished, supple, balanced","Filet, Dry Aged NY Strip, smooth-red guest","Classic Napa Merlot name; soft but structured enough for steak."),
W("Duckhorn Paraduxx 2021","merlot","Good","$85","Napa red blend","Black cherry, plum, blackberry, cocoa, sweet spice","Med","Med","Full","Richer, rounder, red-blend finish","Filet, ribeye, Short Rib Pasta","Duckhorn-family richness if they like Merlot softness but want more body."),
W("Emmolo Napa Valley Merlot 2022","merlot","Good","$60","Napa","Plum, black cherry, mocha, soft herbs","Low-Med","Med","Med-Full","Smooth, plush, friendly","Filet, Steak 47, Prime Meatballs","Smooth Napa Merlot at a friendly bottle price."),

/* ---- PINOT NOIR ---- */
W("Belle Glos \"Dairyman\" 2023","pinot","Good","$65","California — richer style","Black currant, cherry pie, plum, cedar, milk chocolate","Low-Med","Med","Med-Full","Smooth, richer California Pinot","Filet, salmon, stuffed chicken, soft-red guests","Pinot Noir, but fuller and richer than Oregon; dark fruit and smoothness."),
W("Domaine Drouhin \"Dundee Hills\" 2023","pinot","Better","$105","Willamette Valley, OR — Burgundy family in Oregon","Rhubarb, sour cherry, dried violets, black tea, white pepper","Low-Med","Med-High","Med","Elegant, earthy, Burgundy-rooted","Filet, Miso Sea Bass, Chilean Sea Bass, A5 if they want elegance","Oregon Pinot with Burgundy roots; elegant, earthy, high-scoring."),
W("Gary Farrell Russian River Valley 2022","pinot","Better","$120","Russian River, CA — Pacific fog slows ripening, keeps acidity","Luxardo cherry, rose petal, fennel, wild raspberry, blood orange","Low-Med","Med-High","Med","Tangy, savory, serious Pinot","Filet, stuffed chicken, salmon/sea bass, meatballs, mushrooms","Russian River Pinot with more depth, savory cherry, and rose."),
W("Landmark \"Overlook\" Pinot Noir 2021","pinot","Good","$55","California","Cherry, raspberry, strawberry, light spice","Low","Med","Med","Clean, soft, easy Pinot finish","Filet, chicken, guest avoiding heavy red","Good value Pinot bottle when they want lighter red."),
W("Roco \"Gravel Road\" 2022","pinot","Good","$75","Oregon","Red cherry, cranberry, raspberry, earth, spice","Low-Med","Med-High","Med","Fresh, earthy Oregon-style finish","Filet, seafood if red is requested, roasted mushrooms","Cooler-climate Pinot feel: fresh, lighter, earthy."),
W("Sea Smoke Estate \"TEN\" 2023","pinot","Best","$250","Sta. Rita Hills, Santa Barbara — coastal power","Dark cherry, blackberry, cola, spice, baking chocolate","Med","Med","Full for Pinot","Long, plush, high-end California Pinot","Filet, Wagyu, special Pinot drinker","Special Pinot bottle; richer, more powerful Santa Rita Hills style."),

/* ---- OLD WORLD ---- */
W("Bodegas Muga Reserva Rioja","old","Good","$84","Rioja, Spain — Tempranillo","Red cherry, plum, vanilla, tobacco, leather","Med","Med-High","Med-Full","Savory, spicy, food-friendly","Dry Aged NY Strip, Prime Meatballs, Short Rib Pasta","Classic Rioja: less jammy than Napa, more savory and food-driven."),
W("Bodegas Penafiel Ribera del Duero Crianza","old","Good","$75","Ribera del Duero, Spain","Blackberry, plum, dark cherry, cocoa, spice","Med-High","Med","Full","Firm, dry, steak-friendly","Ribeye, NY Strip, Delmonico","Spanish Tempranillo with more structure; good if they want steak red without Napa fruit."),
W("Borsao Garnacha","old","Good","$27","Spain — best budget red","Raspberry, strawberry, cherry, pepper","Low-Med","Med","Med","Juicy, simple, easy","Apps, Prime Meatballs, casual red bottle","Best budget red: fruit-forward, easy, not too dry."),
W("Ca'marcanda Tuscany 2023","old","Better","$125","Bolgheri, Tuscany","Black cherry, plum, cassis, Mediterranean herbs, spice","Med-High","Med-High","Full","Polished, Italian, savory","NY Strip, Short Rib Pasta, Delmonico","Tuscan/Bolgheri-style polish with more acidity and food balance than Napa."),
W("Chateau Laffitte-Laujac Medoc","old","Good","$66","Medoc, Bordeaux, France","Black currant, plum, cedar, earth, dried herbs","Med-High","Med-High","Med-Full","Dry, earthy, classic Bordeaux","Filet, Dry Aged NY Strip, roasted mushrooms","Classic Bordeaux feel: drier, earthier, more restrained."),
W("Chateau Larose-Trintaudon Haut-Medoc","old","Good","$75","Haut-Medoc, Bordeaux, France","Cassis, dark cherry, tobacco, cedar, graphite","Med-High","Med-High","Med-Full","Structured, dry, food-driven","NY Strip, Filet, Steak 47","Haut-Medoc Bordeaux, good for guests who do not want big Napa fruit."),
W("Chateau L'eyzer Pomerol 2022","old","Better","$105 / $225","Pomerol, Bordeaux — Merlot-led","Black currant, plum, mint, earth, dark cherry","Med","Med","Med-Full","Richer Merlot-driven Bordeaux","Filet, Steak 47, guest wanting softness","Pomerol is Merlot-led Bordeaux: softer, rounder, still classic."),
W("Chateau Plince Pomerol","old","Better","$90 / $105","Pomerol, Bordeaux","Plum, black cherry, cocoa, cedar, earth","Med","Med","Med-Full","Velvety, earthy, elegant","Filet, Dry Aged NY Strip, special Merlot guest","A softer Bordeaux move for a guest who likes Merlot but wants Old World."),
W("Crocus L'Atier Malbec de Cahors","old","Good","$75","Cahors, France — French Malbec","Black plum, blackberry, violet, cocoa, pepper","High","Med","Full","Dark, rustic, grippy","Delmonico, Short Rib Pasta, Prime Meatballs","French Malbec: darker and more structured than easy Argentine Malbec."),
W("Domaine Michel Magnien Bourgogne Rouge","old","Better","$90","Burgundy, France — true Burgundy Pinot","Red cherry, cranberry, earth, tea, mushroom","Low-Med","High","Light-Med","Elegant, earthy, bright","Filet, sea bass if guest wants red, mushrooms","True Burgundy Pinot: lighter, earthier, more refined."),
W("Domaine du Pegau Chateauneuf-du-Pape","old","Better","$171","Southern Rhone, France","Black cherry, kirsch, raspberry, herbs, pepper, leather","Med","Med","Full","Warm, spicy, savory","Delmonico, Short Rib Pasta, Prime Meatballs","Southern Rhone power; great if they want bold but not Cabernet."),
W("Domaine de la Solitude Cotes du Rhone","old","Good","$36","Rhone, France","Red cherry, raspberry, herbs, pepper","Low-Med","Med","Med","Easy, savory, food-friendly","Apps, Prime Meatballs, chicken, casual bottle","Easy French red: lighter, savory, great value."),
W("Drouhin-Vaudon Chablis","old","Good","$60","Chablis, Burgundy — UNOAKED Chardonnay","Lemon, green apple, pear, chalk, mineral","None","High","Light-Med","Crisp, mineral, clean","Seafood Tower, oysters, Chilean Sea Bass, scallops","Unoaked Chardonnay from Chablis: bright and mineral, not buttery."),
W("El Coto Rioja Crianza","old","Good","$36","Rioja, Spain","Cherry, strawberry, vanilla, light spice","Med","Med","Med","Smooth, lightly savory","Prime Meatballs, apps, casual steak bottle","Easy Rioja value; more food-friendly than big California red."),
W("Guigal Gigondas","old","Good","$75","Rhone, France","Blackberry, black cherry, pepper, garrigue herbs","Med-High","Med","Full","Spicy, savory, dry","Ribeye, Short Rib Pasta, Prime Meatballs","Rhone red with pepper and herbs; great for richer, savory dishes."),
W("Joseph Drouhin Gevry-Chambertin","old","Best","$231","Burgundy, France","Red cherry, black cherry, earth, spice, forest floor","Med","High","Med","Long, elegant, serious Burgundy","Filet, A5 Wagyu, special Pinot guest","Serious Burgundy; elegant, earthy, and built for a wine person."),
W("Joseph Drouhin Macon-Villages","old","Good","$44","Burgundy, France — UNOAKED Chardonnay","Green apple, lemon zest, white peach, flowers","None","High","Light-Med","Crisp, bright, unoaked","Miso Sea Bass, Chilean Sea Bass, scallops, Seafood Tower","Unoaked Burgundy Chardonnay; clean and bright with seafood."),
W("L'Ecole \"Apogee\" 2020","old","Better","$120","Washington State — Bordeaux-style blend","Black cherry, cassis, plum, cedar, tobacco, spice","Med-High","Med","Full","Structured Washington blend","NY Strip, ribeye, Short Rib Pasta","Washington Bordeaux-style blend; structured and dark without Napa sweetness."),
W("Le Serre Nuove \"Ornellaia\" 3L 2022","old","Best","$400","Bolgheri, Italy — large format","Black cherry, cassis, plum, herbs, graphite","Med-High","Med-High","Full","Polished, large-format, celebratory","Large steak table, Tomahawk, Porterhouse","Large-format Ornellaia-family Super Tuscan; built for a group celebration."),
W("Marquis de Riscal Reserva Rioja","old","Good","$57 / $70","Rioja, Spain","Cherry, plum, vanilla, cedar, tobacco","Med","Med-High","Med-Full","Classic Rioja spice and oak","NY Strip, Prime Meatballs, Short Rib Pasta","Recognizable Rioja; savory, classic, easy with steak and pasta."),
W("Ornellaia Super Tuscan 2022","old","Best","$600","Bolgheri, Italy — elite Super Tuscan","Black cherry, brambleberry, eucalyptus, milk chocolate, clove, graphite","High","Med-High","Full","Long, elite, Mediterranean luxury","Wagyu, Tomahawk, high-end Italian wine guest","One of the great Super Tuscans: Bordeaux grapes with Italian character."),
W("Possessioni \"Sergio Alighieri\" 2018","old","Good","$60 / $220","Italy","Cherry, plum, dried herbs, spice, earth","Med","Med-High","Med","Dry, savory, Italian","Prime Meatballs, Short Rib Pasta, NY Strip","Italian red with acidity and savory character; great with tomato/cream pasta."),
W("Tenute \"Lucente\" Tuscany 2022/2023","old","Good","$80","Tuscany — second wine of Luce","Rich cherry, cassis, fresh olive, dark spice","Med","Med-High","Med-Full","Fine tannins, smooth Super Tuscan style","Filet, Short Rib Pasta, Prime Meatballs","Second wine of Luce; Super Tuscan style without luxury pricing."),

/* ---- CHAMPAGNE ---- */
W("Louis Roederer Cristal","champ","Best","$1000","Champagne, France — trophy bottle","Citrus blossom, white peach, lemon curd, almond, brioche, chalk","None","High","Med","Ultra-fine bubbles, long, precise, luxurious","Seafood Tower, oysters, scallops, Wagyu, truffle fries","Statement bottle. Harmony, precision, and a true celebration pairing."),
W("Moet Imperial Brut","champ","Good","$135","Champagne, France","Green apple, pear, citrus, toast","None","High","Light-Med","Crisp, familiar, celebratory","Oysters, Seafood Tower, scallops, celebration toast","Recognizable Champagne name, easy celebration bottle."),
W("Taittinger Brut","champ","Better","$155","Champagne, France — higher Chardonnay","Peach, white flowers, vanilla pod, brioche, honey","None","High","Med","Fine bubbles, elegant, refined","Oysters, Seafood Tower, scallops, rich starters","True Champagne with higher Chardonnay, so it feels elegant and refined."),
W("Beau Joie","champ","Good","$135","Champagne, France","Apple, citrus, pear, toast, light cream","None","High","Med","Clean, celebratory, stylish bottle","Celebration toast, oysters, seafood apps","Great celebration look on the table; crisp enough for seafood."),
W("Veuve Clicquot","champ","Better","$180","Champagne, France","Yellow apple, pear, citrus, biscuit, toasted bread","None","High","Med","Richer Brut finish, recognizable prestige","Seafood Tower, oysters, scallops, truffle fries","Highly recognizable prestige Champagne; easy upgrade from Moet/Beau Joie."),

/* ---- BY THE GLASS: RED ---- */
W("Cloudline Pinot Noir","gred","Good","$16 / $60","Willamette Valley, OR","Raspberry, cherry, strawberry, light earth","Low-Med","Med-High","Med","Fresh, smooth, cooler-climate Pinot","Filet, salmon, stuffed chicken","Lighter Oregon Pinot; great with filet if they do not want a heavy red."),
W("Belle Glos \"Las Alturas\" Pinot Noir","gred","Better","$18 / $62","Central Coast, CA — price updated 7/3","Dark cherry, plum, berry compote, baking spice","Low-Med","Med","Med-Full","Plush, smooth, richer Pinot","Filet, ribeye guest wanting softer red","Pinot Noir, but richer and fuller than Oregon Pinot."),
W("Hilt Estate Pinot Noir","gred","Best","$25 / $95","Sta. Rita Hills, CA — Andy Erickson (Screaming Eagle / Leviathan)","Red cherry, raspberry, cranberry, spice, subtle earth","Low-Med","Med-High","Med","Elegant, premium Pinot finish","Filet, A5 Wagyu, special Pinot guest","Premium Pinot with serious pedigree; Andy Erickson is tied to Screaming Eagle and Leviathan."),
W("Conundrum Red Blend","gred","Good","$16 / $50","California — bottle price updated 7/3","Blackberry, cherry, vanilla, sweet spice","Med","Med","Med-Full","Smooth, fruit-forward, easy","Prime Meatballs, Short Rib Pasta, mixed steak table","Safe, smooth red blend for someone who wants easy red without full Cabernet."),
W("Turning Point Red Blend","gred","Good","$14 / $53","Sonoma, CA — by Goldschmidt Vineyards","Black cherry, plum, cocoa, soft spice","Med","Med","Med-Full","Smooth Sonoma value","Apps, filet, steak table on value","Good-value red blend: easy with steak or appetizers."),
W("The Critic Cabernet Sauvignon","gred","Good","$17 / $62","Napa","Bing cherry, currant, caramel, spice","Med-High","Med","Full","Approachable Napa Cabernet","Ribeye, NY Strip, Steak 47","Approachable Napa Cabernet by the glass; dark fruit and spice without being too aggressive."),
W("Caymus Cabernet Sauvignon","gred","Better","$32 / $155","Napa — price updated 7/3 (was 25/95)","Dark cherry, blackberry, cassis, cocoa, vanilla","Med","Low-Med","Full","Plush, rich, recognizable","Ribeye, NY Strip, Tomahawk","Recognizable premium Cabernet; rich, plush, and easy with steak."),
W("Advice From John Merlot","gred","Good","$16 / $60","California — by Orin Swift (confirmed 8/4)","Plum, black cherry, mocha, soft spice","Low-Med","Med","Med-Full","Soft, smooth, lower-grip red","Filet, Steak 47, guest who says Cab is too dry","Softer than Cabernet, still red-wine enough for steak. Table story: the label is real bathroom-wall graffiti — advice from THE john."),
W("Ghost Pines Cabernet Sauvignon","gred","Good","$14 / $53","Napa / Sonoma, CA","Blackberry, dark cherry, vanilla, oak spice","Med-High","Med","Full","Value Cabernet finish","Ribeye, NY Strip, Cab value guest","Steak-friendly dark fruit without jumping into the higher-priced Napa bottles."),
W("Pessimist Red Blend","gred","Good","$15 / $58","Paso Robles, CA — by Daou","Blackberry, blueberry, plum, cocoa, spice","Med","Med","Full","Bold, plush, fruit-forward","Ribeye, Short Rib Pasta, Prime Meatballs","Bolder Paso red blend; richer than Pinot, softer than serious Cab."),
W("Dona Paula Malbec","gred","Good","$14 / $52","Mendoza, Argentina — added on the 7/3 sheet","Black plum, blueberry, violet, cocoa","Med","Med","Med-Full","Smooth, fruit-forward Malbec finish","Filet, NY Strip, Prime Meatballs","Easy red for guests who want smooth fruit without Cabernet grip."),

/* ---- BY THE GLASS: WHITE ---- */
W("Ruffino Moscato d'Asti","gwhite","Good","$13 / $48","Piedmont, Italy — sweetest white","Peach, orange blossom, citrus, floral sweetness","None","Med","Light","Sweet, lightly bubbly, soft","Dessert, cotton candy, guest who dislikes dry wine","Sweetest, softest white on the list; floral and lightly bubbly."),
W("Dr. L Riesling","gwhite","Good","$12 / $45","Germany — Dr. Loosen","Green apple, peach, citrus, honeysuckle","None","High","Light-Med","Bright, fruit-driven, touch sweet","Seafood, spicy/creamy dishes, lighter starters","Fresh and fruit-forward with great acidity and a touch of sweetness."),
W("Chateau de Campuget Rose","gwhite","Good","$12 / $45","Rhone, France — dry rose","Strawberry, watermelon, citrus peel, peach, mineral","Low","Med-High","Light-Med","Dry, crisp, refreshing","Seafood Tower, scallops, salmon, sea bass","Clean, dry French rose; light but still flavorful."),
W("Beviamo Pinot Grigio","gwhite","Good","$13 / $49","Venezia, Italy","Lemon, pear, green apple, light floral","None","Med-High","Light","Crisp, clean, simple","Salads, oysters, lighter starters","Lightest, cleanest dry white; safest crisp choice before dinner."),
W("Kim Crawford Sauvignon Blanc","gwhite","Good","$13 / $49","Marlborough, NZ","Grapefruit, lime, green melon, passion fruit, grass","None","High","Light-Med","Zesty, citrusy, refreshing","Oysters, Seafood Tower, Caesar, shellfish","Bright New Zealand Sauvignon Blanc: citrusy, crisp, refreshing."),
W("Auntsfield Single Vineyard Sauvignon Blanc","gwhite","Better","$14 / $53","Marlborough, NZ — single-vineyard step up","Grapefruit, lime, tropical fruit, herbs, minerality","None","High","Light-Med","More refined Sauvignon Blanc finish","Seafood Tower, oysters, scallops, sea bass","The elevated single-vineyard Sauvignon Blanc if they like Kim Crawford but want the nicer version."),
W("Mer Soleil Chardonnay","gwhite","Good","$15 / $57","Santa Barbara, CA — MISSING from the 7/3 sheet, verify it is still poured","Apple, pear, tropical fruit, vanilla, toast","None","Med","Med-Full","Round, richer California Chardonnay","Lobster tail, scallops, stuffed chicken, creamy dishes","Fuller California Chardonnay; rounder and richer than Sauvignon Blanc."),
W("Buehler Chardonnay","gwhite","Good","$13 / $50","Russian River Valley, CA","Ripe apple, pear, citrus, light vanilla, toasted oak","None","Med","Med","Smooth, balanced, lightly oaked","Sea bass, scallops, stuffed chicken","Middle-ground Chardonnay: ripe fruit, light vanilla, smooth but balanced."),
W("Post & Beam Chardonnay","gwhite","Better","$20 / $78","Napa, CA — by Far Niente","Golden apple, pear, lemon curd, vanilla, polished oak","None","Med","Med-Full","Polished premium Napa Chardonnay","Lobster, scallops, sea bass, chicken","By Far Niente; the premium polished Chardonnay by the glass.")
];

const WINE_CATS = [
  ["all","Everything"],["cab","Cabernet & Red Blends"],["merlot","Merlot"],["pinot","Pinot Noir"],
  ["old","Old World"],["champ","Champagne"],["gred","By the Glass — Red"],["gwhite","By the Glass — White"]
];

/* PAIRING FINDER — dish -> {line, picks:[Good, Better, Best]} */
const PAIRINGS = [
 {d:"Filet Mignon / Farbuckle Filet", line:"Pinot Noir is lighter than Cabernet and complements the tenderness.",
  good:["Landmark \"Overlook\" Pinot Noir","Belle Glos \"Dairyman\"","Duckhorn Merlot","Emmolo Napa Valley Merlot"],
  better:["Domaine Drouhin \"Dundee Hills\"","Gary Farrell Russian River Valley","Chateau L'eyzer Pomerol"],
  best:["Sea Smoke Estate \"TEN\"","Joseph Drouhin Gevry-Chambertin","Cain 5 \"Spring Mountain\""]},
 {d:"Delmonico Ribeye / K.D.'s Tomahawk", line:"Cabernet cuts through the marbling and fat.",
  good:["Buehler Estate Cabernet","Faust Napa Valley","Caymus \"California\""],
  better:["Cade Estate Howell Mountain","Groth Oakville Estate","Mt. Veeder Napa Valley"],
  best:["Opus One","\"Halo\" Trefethen","Patrimony by Daou","Caymus Special Select"]},
 {d:"Dry Aged NY Strip", line:"Dry age is savory and nutty — savory Old World reds and structured Napa both work.",
  good:["Buehler Estate Cabernet","Bodegas Muga Reserva Rioja","Chateau Laffitte-Laujac Medoc"],
  better:["Cakebread Cellars","Silver Oak Napa Valley","Ca'marcanda Tuscany"],
  best:["Cain 5 \"Spring Mountain\"","Silver Oak \"Timeless\"","Quintessa Napa Valley"]},
 {d:"48 oz Porterhouse (board service)", line:"Big shared cut wants a big shared bottle — go structured or large format.",
  good:["Bodegas Penafiel Ribera del Duero"],
  better:["Mt. Veeder Napa Valley","Cade Estate Howell Mountain","Orin Swift \"Palermo\""],
  best:["Le Serre Nuove \"Ornellaia\" 3L","\"Halo\" Trefethen","PlumpJack Oakville Estate"]},
 {d:"Japanese A5 Wagyu / A5 Nigiri", line:"Champagne for celebration, or polished power. The fat is the whole story — acid or polish both work.",
  good:["Moet Imperial Brut"],
  better:["Taittinger Brut","Veuve Clicquot","Domaine Drouhin \"Dundee Hills\""],
  best:["Louis Roederer Cristal","Opus One","Quintessa Napa Valley","Ornellaia Super Tuscan"]},
 {d:"Seafood Tower / Oysters", line:"Champagne works beautifully here — the acidity and bubbles keep everything fresh.",
  good:["Joseph Drouhin Macon-Villages","Drouhin-Vaudon Chablis","Kim Crawford Sauvignon Blanc","Moet Imperial Brut"],
  better:["Auntsfield Single Vineyard Sauvignon Blanc","Taittinger Brut","Veuve Clicquot"],
  best:["Louis Roederer Cristal"]},
 {d:"Miso Seabass / Chilean Sea Bass / Scallops", line:"Stay crisp unless they want a richer Chardonnay.",
  good:["Drouhin-Vaudon Chablis","Buehler Chardonnay","Chateau de Campuget Rose"],
  better:["Post & Beam Chardonnay","Auntsfield Sauvignon Blanc","Domaine Drouhin \"Dundee Hills\""],
  best:["Joseph Drouhin Gevry-Chambertin","Louis Roederer Cristal"]},
 {d:"Blackened Creole Salmon", line:"Blackened spice likes bright acid or a lighter red.",
  good:["Dr. L Riesling","Cloudline Pinot Noir","Chateau de Campuget Rose"],
  better:["Gary Farrell Russian River Valley","Belle Glos \"Las Alturas\""],
  best:["Sea Smoke Estate \"TEN\""]},
 {d:"Short Rib Pasta / Prime Meatballs / Chicken Parm", line:"Savory tomato and cream sauces want acid and spice, not jam.",
  good:["Borsao Garnacha","El Coto Rioja Crianza","The Prisoner","Domaine de la Solitude Cotes du Rhone"],
  better:["Ca'marcanda Tuscany","Marquis de Riscal Reserva","Domaine du Pegau Chateauneuf-du-Pape","Shafer \"Relentless\""],
  best:["Ornellaia Super Tuscan","Le Serre Nuove \"Ornellaia\" 3L"]},
 {d:"Stuffed Chicken / Primavera Pasta", line:"Lighter red or a rounder white — nothing that flattens the dish.",
  good:["Landmark \"Overlook\" Pinot Noir","Buehler Chardonnay","Beviamo Pinot Grigio"],
  better:["Gary Farrell Russian River Valley","Post & Beam Chardonnay"],
  best:["Joseph Drouhin Gevry-Chambertin"]},
 {d:"Guest says Cabernet is too dry", line:"Merlot gives you the red-wine feel with a softer finish.",
  good:["Advice From John Merlot","Emmolo Napa Valley Merlot","Duckhorn Merlot","Conundrum Red Blend"],
  better:["Duckhorn Paraduxx","Chateau Plince Pomerol","Caymus Napa Valley"],
  best:["Caymus Special Select"]},
 {d:"Old World guest — less fruity", line:"Drier, earthier, more restrained than Napa.",
  good:["Bodegas Muga Reserva Rioja","Domaine de la Solitude Cotes du Rhone","Chateau Laffitte-Laujac Medoc"],
  better:["Chateau L'eyzer Pomerol","Domaine du Pegau Chateauneuf-du-Pape","L'Ecole \"Apogee\""],
  best:["Ornellaia Super Tuscan","Joseph Drouhin Gevry-Chambertin","Le Serre Nuove \"Ornellaia\" 3L"]},
 {d:"Celebration / anniversary", line:"Bubbles first, then the trophy bottle.",
  good:["Moet Imperial Brut","Beau Joie"],
  better:["Taittinger Brut","Veuve Clicquot","Far Niente Napa Valley"],
  best:["Louis Roederer Cristal","Opus One","Caymus Special Select","Quintessa Napa Valley"]},
 {d:"Four people ordering glasses", line:"For four glasses, a bottle is usually the better value. Move them up the ladder.",
  good:["The Prisoner","Faust Napa Valley","Caymus \"California\"","Far Niente \"Bella Union\""],
  better:["Groth Oakville Estate","Cakebread Cellars","Silver Oak Alexander Valley"],
  best:["Opus \"Overture\"","PlumpJack Oakville Estate","Quintessa Napa Valley"]}
];

const WOTW = {
  title:"Wine of the Week (paused — not running right now) — Power vs Precision",
  a:{n:"Caymus Special Selection Cabernet 2019",p:"$525",tag:"POWER",
     what:"Napa Valley Cabernet. The flagship from Caymus and the top expression of the Wagner family style. Only made when vineyard lots meet the winery's highest standards.",
     flavor:"Blackberry, cassis, dark cherry, cocoa, rich Napa fruit. With age it picks up cedar, tobacco, graphite, and baking spice.",
     structure:"Full-bodied, rich, plush texture, polished tannins, long finish. Power without harshness.",
     why:"Flagship status, limited production, vineyard and barrel selection, aging potential, brand prestige. It is the only wine ever named Wine Spectator's Wine of the Year twice.",
     pair:"Filet, ribeye, Miso Seabass, mushroom dishes, steak enhancements.",
     pitch:"If you want the bigger, richer side of the feature, Caymus Special Selection is the power bottle. It is plush, concentrated, and polished, with dark fruit, cocoa, soft tannin, and a long finish."},
  b:{n:"Gary Farrell Russian River Valley Pinot Noir 2022",p:"$120",tag:"PRECISION",
     what:"Russian River Valley Pinot Noir. A benchmark name for cool-climate Russian River Pinot. The sell is balance, elegance, and vineyard expression, not size.",
     flavor:"Layered red fruit, bright aromatics, freshness, subtle earthy detail.",
     structure:"Medium-bodied, silky, vibrant acidity, elegant structure, long finish. Refined and detailed instead of heavy.",
     why:"Russian River terroir, cool-climate farming, craftsmanship, balance. Morning fog from the Pacific slows ripening and extends the growing season, so the fruit keeps acidity while building flavor.",
     pair:"Seabass, salmon, meatballs, mushroom dishes, filet mignon.",
     pitch:"If you want the more elegant side of the feature, Gary Farrell is the precision bottle. It is silky, bright, aromatic, and food friendly, with more finesse than weight."},
  contrast:[
    ["Big, rich, luxury red","Caymus Special Selection","Full body, plush fruit, polished tannin, prestige."],
    ["Steakhouse statement bottle","Caymus Special Selection","Flagship Napa Cab with ageability and collectability."],
    ["Elegant red that will not overpower food","Gary Farrell","Silky, bright, balanced, versatile."],
    ["Red wine with seafood or lighter entrees","Gary Farrell","Higher acidity and lighter body work with fish, salmon, mushrooms."],
    ["Power","Caymus Special Selection","Concentration, richness, long finish."],
    ["Precision","Gary Farrell","Balance, aromatics, texture, vineyard expression."]
  ]
};

const REGIONS = [
 ["Napa Valley","Warm and dry, Cabernet country","Dark fruit, cocoa, oak, full body, tannin. Say: big steak red."],
 ["Mountain Napa","Howell Mtn / Spring Mtn / Mt. Veeder","Darker, firmer, graphite, more tannic. Say: best for ribeye or tomahawk."],
 ["Russian River","Fog-cooled Sonoma","Cherry and apple, silky texture, acidity. Say: red that works with fish or filet."],
 ["Willamette","Cool Oregon Pinot","Lighter, earthier, fresher, more acidic. Say: elegant, not heavy."],
 ["Burgundy / Chablis","Old World Pinot and Chardonnay","Earth, mineral, acid; less fruit and oak. Say: refined and food-driven."],
 ["Bordeaux / Pomerol","Cab and Merlot blends","Drier, cedar, tobacco, earth. Pomerol is softer Merlot. Say: classic steakhouse restraint."],
 ["Rhone","Grenache and Syrah blends","Pepper, herbs, savory warmth. Say: bold but not Cabernet."],
 ["Rioja / Ribera","Spanish Tempranillo","Vanilla, tobacco, red and dark fruit. Say: food-friendly savory steak red."],
 ["Tuscany / Super Tuscan","Italian acidity plus Bordeaux grapes","Cherry, herbs, graphite, freshness. Say: powerful but better with food."],
 ["Champagne","High-acid bubbles","Refreshes the palate and cuts richness. Oysters, seafood, wagyu, truffle fries."],
 ["Marlborough","NZ Sauvignon Blanc","Citrus, grass, tropical, very bright. Say: crisp seafood white."]
];

const FASTANSWERS = [
 ["Driest / firmest Cabernet bottle","Cade Howell Mountain, then Mt. Veeder","Mountain structure, darker fruit, graphite, high tannin. Use with ribeye or tomahawk."],
 ["Most plush Cabernet bottle","Caymus Napa / Caymus California","Lower acid, softer tannin, rich sweet dark fruit. Easy for guests who dislike dry reds."],
 ["Most trophy Cabernet","Opus One, Caymus Special Select, Halo, Patrimony","Celebration, recognition, prestige, high-check table."],
 ["Driest Cab by the glass","The Critic or Ghost Pines","More Cabernet grip than Caymus by the glass."],
 ["Lightest Pinot by the glass","Cloudline Willamette","Fresh, smooth, cooler climate. Good with filet or salmon."],
 ["Lightest Pinot bottle","Landmark Overlook or Domaine Michel Magnien","Soft and light, or high-acid earthy Burgundy."],
 ["Biggest Pinot","Sea Smoke TEN; Belle Glos by the glass","Fuller, richer, darker-fruited Pinot."],
 ["Sweetest white","Ruffino Moscato d'Asti","Lightly bubbly, peach and floral, dessert-friendly."],
 ["Crispest dry whites","Kim Crawford, Auntsfield, Chablis, Macon-Villages","High acid, seafood and oyster friendly."]
];
