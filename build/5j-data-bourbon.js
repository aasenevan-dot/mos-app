/* ============ FRANCISCAN HEALTH BOURBON DINNER — one night, Thu 11/19/2026 ============
   Five courses, five pours. Shows as the FIRST thing on the home tab on the event date only
   (Indianapolis time), then drops off by itself at midnight and lives on in Reference &
   Archive. Nothing to switch off by hand. Photos are in BOURBON_IMG (mkbourbon.py). */
const BOURBON_DINNER = {
  date: "2026-11-19",              // the one night it runs, YYYY-MM-DD, Indianapolis time
  title: "Franciscan Health Bourbon Dinner",
  when: "Tonight only",
  blurb: "Five courses, each one paired with its own pour. Every bourbon on the list comes out of the Buffalo Trace Distillery in Frankfort, Kentucky, so it reads like a tour of one house from easy to bold.",
  allergy: "This is a one-night menu and it is not in the allergen chart. Run every allergy through the chef. Easy calls to start with: the salmon is fish with soy and sesame in the ponzu, the mac is dairy and gluten, and the crepes are dairy, egg and gluten.",
  courses: [
    { n: 1, img: "soup",
      pour: "Buffalo Trace Old Fashioned",
      pourNote: "Buffalo Trace bourbon stirred with sugar and bitters. Smooth, vanilla and caramel. The easy opener.",
      dish: "Kentucky Bourbon Soup",
      menu: "Butternut squash soup garnished with roasted pumpkin seeds",
      desc: "A smooth, slightly sweet butternut squash soup, finished with roasted pumpkin seeds and an edible flower on top." },
    { n: 2, img: "mac",
      pour: "Weller Single Barrel",
      pourNote: "A wheated bourbon, so wheat in place of rye. Soft, sweet and round. Every bottle comes from one barrel.",
      dish: "Pork Belly Mac N Cheese",
      menu: "Smoked pork belly, apple cider BBQ glaze",
      desc: "Corkscrew pasta in a creamy cheese sauce, topped with smoked pork belly in an apple cider BBQ glaze, with shaved cheese and fresh herbs." },
    { n: 3, img: "salmon",
      pour: "Blanton's",
      pourNote: "The original single barrel bourbon, the one with the horse and jockey on the cork. Honey, citrus and a little spice.",
      dish: "Miso Glazed Salmon",
      menu: "Cilantro rice, broccolini and sesame ponzu sauce",
      desc: "Salmon glazed with sweet, savory miso, set over cilantro rice with broccolini and a sesame ponzu sauce, finished with an orchid." },
    { n: 4, img: "filet",
      pour: "Eagle Rare",
      pourNote: "Aged 10 years. Deep oak, toffee and dark fruit. The biggest pour of the night, built to stand up to the steak.",
      dish: "Australian Filet Mignon",
      menu: "Marinated with coffee grains. Purple sweet potatoes, sauteed green beans, red peppers and pearl onions",
      desc: "Filet marinated with coffee grains for a dark, rich crust. Served with purple sweet potatoes and sauteed green beans with red peppers and pearl onions." },
    { n: 5, img: "crepes",
      pour: "E.H. Taylor",
      pourNote: "Colonel E.H. Taylor Small Batch, bottled in bond at 100 proof. Butterscotch, caramel and a touch of pepper.",
      dish: "Cheesecake Crepes",
      menu: "Triple berry compote",
      desc: "Soft crepes filled with cheesecake and topped with a triple berry compote, fresh berries and powdered sugar." }
  ]
};
