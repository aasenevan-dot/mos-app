#!/usr/bin/env python3
"""8/7 flag-and-utensil round.
Evan's rule: a flag has to be important. GF stays. Sales notes, trivia, and
anything the description already says does not. Utensils belong in the
description, not in a dropdown nobody opens."""
import pathlib, sys

p = pathlib.Path("build/4-data-food.js")
s = p.read_text(encoding="utf-8")
log = []


def sub(old, new, why, count=1):
    global s
    n = s.count(old)
    if n != count:
        sys.exit("FAILED (%d matches, wanted %d): %s\n  ...%s..." % (n, count, why, old[:130]))
    s = s.replace(old, new, count)
    log.append(why)


# ============================================================
# FLAGS OFF — not important enough to be a flag
# ============================================================
for old_tag, why in [
    ('"Know the U-6"',             "shrimp cocktail"),
    ('"95% crab"',                 "crab cake"),
    ('"Trim + breadcrumbs"',       "prime meatballs"),
    ('"Dry aged"',                 "dry aged NY strip (the name already says it)"),
    ('"Biggest side upsell"',      "lobster mac"),
    ('"Celebration play"',         "celebration cake"),
    ('"New on the menu"',          "chicken parmesan"),
    ('"Cold water — know why"',    "twin lobster tails"),
    ('"GF (base)"',                "baked potato"),
    ('"Pairs with Ruffino Moscato"', "cotton candy — no wine talk here"),
    ('"Off menu"',                 "prime beef chili (said twice already)"),
]:
    sub("," + old_tag + "]", ',""]', "flag off: " + why)

# ============================================================
# FLAGS REWRITTEN — say something worth reading
# ============================================================
sub('"Off-menu, dry aged"', '"Manager cuts it tableside"',
    "45-day ribeye flag: manager cuts it tableside")
sub('"GF · upsell the $3 add"', '"GF · upsell truffle or wasabi for $3"',
    "white cheddar mash flag: the upsell, spelled out")
sub('"GF-marked, NOT allergen-free"', '"GF"',
    "molten lava cake: plain GF so it reads without opening the card")

# ============================================================
# NOTES THAT MOVE OUT OF THE FLAG AND INTO THE DESCRIPTION
# ============================================================
sub('"Seedless jalapenos — flavor without much burn — with diced russets, bacon, white cheddar, garlic, and green onion, baked in its own ceramic boat.","Bacon is mixed in each morning — cannot be removed"',
    '"Seedless jalapenos — flavor without much burn — with diced russets, bacon, white cheddar, garlic, and green onion, baked in its own ceramic boat. The bacon is mixed in each morning and cannot be removed. Big spoon."',
    "au gratin: bacon note into the description, big spoon added")

sub('"Lightly breaded, fried crisp, then tossed right away with flaky salt, shaved Parmesan, parsley, and white truffle oil. A guest can get them PLAIN — no Parm, no truffle — just ask. Gluten and fryer check.","Send house ranch with them — best pairing in the building"',
    '"Lightly breaded, fried crisp, then tossed right away with flaky salt, shaved Parmesan, parsley, and white truffle oil. A guest can get them PLAIN — no Parm, no truffle — just ask. Comes with ketchup and tongs. Our ranch on these may be the best combination in the restaurant — send it. Gluten and fryer check.","Send the ranch"',
    "truffle fries: ketchup and tongs, ranch into the description")

sub('"Bacon, cheddar, lettuce, tomato, onions, aioli, French fries. Offer house ranch for the fries — it is the move.","suggest ranch"',
    '"Bacon, cheddar, lettuce, tomato, onions, aioli, French fries. Comes with ketchup — so does anything that comes with fries, chicken tenders included. Offer house ranch for the fries too; it is the move.",""',
    "burger: ketchup in, ranch out of the flag")

# ============================================================
# UTENSILS INTO THE DESCRIPTION
# ============================================================
UTENSIL = [
    ('"Cream, dijon, horseradish, dill."',
     '"Cream, dijon, horseradish, dill. Big spoon."', "creamed corn"),
    ('"Sauteed spinach in a cream sauce over roasted butternut squash. Marked g on the current menu — it CONTAINS gluten."',
     '"Sauteed spinach in a cream sauce over roasted butternut squash. Big spoon. Marked g on the current menu — it CONTAINS gluten."', "creamed spinach"),
    ('"Crispy prosciutto and sundried tomatoes. Cooked in chicken stock."',
     '"Crispy prosciutto and sundried tomatoes. Cooked in chicken stock. Big spoon."', "creamy risotto"),
    ('"Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley."',
     '"Pan-seared with shallots, mixed with Alfredo and truffle oil, topped with Parmesan and parsley. Big spoon."', "truffle cauliflower"),
    ('"A roux built on lobster stock with onion and garlic, white cheddar and Parmesan, broiled with panko and more cheese on top. Premium share side."',
     '"A roux built on lobster stock with onion and garlic, white cheddar and Parmesan, broiled with panko and more cheese on top. Big spoon."', "lobster mac"),
    ('"Cookie dough pressed into its own bowl and baked to order — pulled when it is still half-baked so the center stays gooey. Vanilla ice cream on top, Hershey\'s syrup over everything."',
     '"Cookie dough pressed into its own bowl and baked to order — pulled when it is still half-baked so the center stays gooey. Vanilla ice cream on top, Hershey\'s syrup over everything. Big spoon."', "mo's cookie"),
    ('"Five layers of technicolor vanilla cake layered with white chocolate mousse, served with a strawberry drizzle and gummi bears."',
     '"Five layers of technicolor vanilla cake layered with white chocolate mousse, served with a strawberry drizzle and gummi bears. Spatula."', "celebration cake"),
    ('"Five to six scoops of ice cream in a chilled bowl with chocolate chip cookie dough, Hershey\'s syrup, Meyer\'s dark rum caramel, strawberry sauce, fresh whipped cream."',
     '"Five to six scoops of ice cream in a chilled bowl with chocolate chip cookie dough, Hershey\'s syrup, Meyer\'s dark rum caramel, strawberry sauce, fresh whipped cream. Big spoon."', "mo's sundae"),
    ('"Dense and rich on a graham cracker crust — that density is what makes it New York style. Fresh whipped cream and strawberry sauce to cut through."',
     '"Dense and rich on a graham cracker crust — that density is what makes it New York style. Fresh whipped cream and strawberry sauce to cut through. Spatula."', "cheesecake"),
    ('"Classic custard spiked with Bailey\'s Irish Cream, topped with raw demerara sugar torched into a glassy shell you crack with the spoon. Whipped cream and fresh berries."',
     '"Classic custard spiked with Bailey\'s Irish Cream, topped with raw demerara sugar torched into a glassy shell you crack with the spoon. Whipped cream and fresh berries. Big spoon."', "creme brulee"),
    ('"Layered high with cream cheese icing, moist all the way through from pineapple in the batter — that is where the pineapple flag comes from. Powdered sugar and whipped cream."',
     '"Layered high with cream cheese icing, moist all the way through from pineapple in the batter — that is where the pineapple flag comes from. Powdered sugar and whipped cream. Spatula."', "carrot cake"),
]
for old, new, why in UTENSIL:
    sub(old, new, "utensil: " + why)

# per-person chopsticks
sub('"Crispy sushi rice, avocado, ponzu sauce, cilantro, jalapeno. Remoulade or spicy citrus on the side if expected. Served with metal Japanese chopsticks."',
    '"Crispy sushi rice, avocado, ponzu sauce, cilantro, jalapeno. Remoulade or spicy citrus on the side if expected. Two metal Japanese chopsticks PER PERSON."',
    "ahi bites: chopsticks are per person")
sub('"Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks. Served with two metal Japanese chopsticks."',
    '"Torched sushi rice, balsamic pearls, Asian pear wine reduction, crispy leeks. Two metal Japanese chopsticks PER PERSON."',
    "A5 nigiri: chopsticks are per person")

# baked potato — the GF question answered in words, plus the knife
sub('"Salt-crusted russet, par-baked and finished to order so it comes out light and fluffy. Cut it open and press it apart at the plate to show off the steam, and leave the little knife in the potato. Base: butter and sour cream. LOADED upgrade — chives, bacon, cheese — about +$3 (best guess, verify). Loaded adds pork."',
    '"Salt-crusted russet, par-baked and finished to order so it comes out light and fluffy. Cut it down the middle at the plate and press it apart to show off the steam — it goes out with a bread knife. Butter and sour cream on it as it comes, and nothing in that has gluten. LOADED upgrade — chives, bacon, cheese — about +$3 (best guess, verify). Loaded adds pork."',
    "baked potato: bread knife, cut down the middle, GF explained in words")

# white cheddar mash — flag carries the upsell, so the body just needs the build + spoon
sub('"Mashed with nearly equal parts butter — that is the secret — plus cream and white cheddar. Add truffle $3 or wasabi $3."',
    '"Mashed with nearly equal parts butter — that is the secret — plus cream and white cheddar. Big serving spoon."',
    "white cheddar mash: build plus spoon, upsell lives on the flag")

# asparagus — hollandaise on the side is the headline, the char is the detail
sub('"Marinated in garlic herb butter, grilled to a light char. Hollandaise in a ramekin on the side.","GF"',
    '"Marinated with garlic herb butter, grilled, with hollandaise in a ramekin on the side. Grilled to a light char. Comes with tongs.","GF"',
    "asparagus: hollandaise on the side leads, char is the detail")

# ============================================================
# DESSERT CHANGES
# ============================================================
# no ice cream on the lava cake
sub('"Chocolate dome filled with chocolate cake, strawberries, and ice cream. THE SHOW: light the orange liqueur and chocolate sauce, then pour it flaming over the dome — it melts away to reveal the cake and ice cream underneath. GF-marked / flourless — but it still has eggs, dairy, soy, and that liqueur."',
    '"Chocolate dome filled with chocolate cake and strawberries — no ice cream on this one. THE SHOW: light the orange liqueur and chocolate sauce, then pour it flaming over the dome — it melts away to reveal what is underneath. Big spoon. GF-marked and flourless, but it still has eggs, dairy, soy, and that liqueur."',
    "lava cake: ice cream out, big spoon in")

# the celebration drop becomes the Celebration Sundae itself
sub('["Celebration drop (free)","comp with any celebration","Every celebrating table gets a free treat — their pick: the CELEBRATION SUNDAE (bowl of ice cream in a large soup bowl with chocolate and caramel, a sprinkle or two for fun) or a COMP MO\'S COOKIE (half-baked cookie dough, scoop of vanilla bean ice cream, chocolate drizzle poured on BY THE SERVER at the table). We do NOT sing — we light a SPARKLER with it and make the table feel special. Pull the spent sparkler out with a black linen and hold the ice cream down with the serving spoon so it does not come along for the ride. Sing only if you want to.",""]',
    '["Celebration Sundae","comp with any celebration","The free one, and it is NOT the Mo\'s Sundae — this is ice cream in a large soup bowl with caramel, dark rum caramel, and hot milk chocolate. The other option is a comp Mo\'s Cookie with the chocolate poured on BY THE SERVER at the table. We do NOT sing — we light a SPARKLER and make the table feel special. Pull the spent sparkler with a black linen and hold the ice cream down with the serving spoon so it does not come along for the ride. Big spoon. Sing only if you want to.",""]',
    "celebration drop becomes the Celebration Sundae, its own dessert")

# sorbets + gelato go to the archive
sub('  ["Sorbets (not really sold)","in the freezer","Lemon and raspberry sorbet have both lived in the freezer, dairy-free — but they are off the menu and we do not really sell them. Archive item.","Not sold"],\n'
    '  ["Pistachio Gelato","varies","Dairy and tree nuts.",""]\n',
    '', "sorbets and gelato pulled from the dessert list")
# the item above them is now last in the section, so it loses its trailing comma
sub('Great upsell: get the whole table in on it.",""],\n ],\n "Lounge":[',
    'Great upsell: get the whole table in on it.",""]\n ],\n "Lounge":[',
    "bananas foster closes the dessert section")
sub('const SPECIALS_PAST=[\n',
    'const SPECIALS_PAST=[\n'
    ' ["Sorbets — lemon and raspberry","in the freezer","Dairy-free, and they have lived in the freezer for a long time. Archived — ask before promising one.","off the current menu"],\n'
    ' ["Pistachio Gelato","in the freezer","Dairy and tree nuts. Archived — ask before promising one.","off the current menu"],\n',
    "sorbets and gelato archived")

# ============================================================
# HOUSEKEEPING
# ============================================================
sub('["Every side shares","feeds 2-3","Every single side is built to share — comfortably feeds 2 to 3 people. Rule of thumb from the tests: suggest 3-4 sides for a table of six.",""],\n',
    '', "the 'every side shares' row removed")
sub('"Accessories / Sides"', '"Accessories"', "section renamed to Accessories")

p.write_text(s, encoding="utf-8")
print("\n".join(" · " + x for x in log))
print("\n%d edits applied" % len(log))
