#!/usr/bin/env python3
"""Spanish dictionary -> build/5g-data-es.js

Reads the translation workflow's journal, applies the verifier's safety corrections
over the first pass, and writes a plain English->Spanish map. Anything absent from
the map simply renders in English, so a gap is never a breakage.
"""
import json, pathlib, re, sys, unicodedata

JOURNAL = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(
    "/Users/evanaasen/.claude/projects/-Users-evanaasen-Desktop-Claude-Cowork/"
    "9793b677-1c60-48b5-ab52-a376d8af98f7/subagents/workflows/wf_ed51bc54-2cf/journal.jsonl")
OUT = pathlib.Path("build/5g-data-es.js")

pairs, fixes = {}, {}
for line in JOURNAL.read_text().splitlines():
    try:
        e = json.loads(line)
    except Exception:
        continue
    v = e.get("result")
    if not isinstance(v, dict):
        continue
    for p in v.get("pairs", []):
        en, es = p.get("en"), p.get("es")
        if en and es:
            pairs[en] = es
    for p in v.get("problems", []):
        if p.get("en") and p.get("fixed_es"):
            fixes[p["en"]] = p["fixed_es"]

pairs.update(fixes)

# Strings added to the app after the translation run. The journal cannot know about
# these, so they live here and are applied last — that keeps 5g-data-es.js genuinely
# generated instead of something you have to remember not to overwrite.
LATER = {
    "Floor plan": "Plano del piso",
    "Tap a table — seats, section, where seat 1 is":
        "Toca una mesa — asientos, sección y dónde va el asiento 1",
    "Ask anything — try 'whats in the carajillo' or 'gf desserts'":
        "Pregunta lo que sea — prueba 'qué lleva el carajillo' o 'postres sin gluten'",
    "Employee Handbook": "Manual del empleado",
    "staff only": "solo personal",
    "Lock it again": "Bloquear de nuevo",
    "Floor plan": "Plano del piso",
    "Tonight's book": "La reserva de esta noche",
    "what you have plotted": "lo que has marcado",
    "Who has which section": "Quién tiene cada sección",
    "retype tonight's names — the plan recolours to match":
        "reescribe los nombres de esta noche — el plano se recolorea solo",
    "Party of": "Grupo de", "Time": "Hora", "Name": "Nombre", "optional": "opcional",
    "Seat this table": "Sentar esta mesa", "Update this table": "Actualizar esta mesa",
    "Clear it": "Borrarla", "Clear the whole book": "Borrar toda la reserva",
    "Show": "Ver", "Suggest names from": "Sugerir nombres de",
    "Put the posted names back": "Restaurar los nombres publicados",
    "Pushed together": "Mesas unidas",
    "Nothing plotted yet. Tap a table above, put in the party and the time, and it lands here.":
        "Nada marcado todavía. Toca una mesa arriba, pon el grupo y la hora, y aparece aquí.",
    "Tap any table to seat it, see who has it, and find seat 1.":
        "Toca cualquier mesa para sentarla, ver quién la tiene y encontrar el asiento 1.",
    "The printed floor plans": "Los planos impresos",
    "photographed off the wall — the live, tappable plan lives on the Money tab":
        "fotografiados de la pared — el plano interactivo está en la pestaña Dinero",
    "Seat 1 usually faces the front door. Number clockwise from there unless it is a booth. Tap a table to plot a party on it.":
        "El asiento 1 suele dar a la puerta principal. Numera en sentido horario desde ahí, salvo en los booths. Toca una mesa para marcar un grupo.",
    "Hide sections": "Ocultar secciones",
    "Show tonight's sections": "Ver las secciones de esta noche",
    "Share this board": "Compartir este plano",
    "one link, the whole floor": "un enlace, todo el salón",
    "Copy tonight's board": "Copiar el plano de esta noche",
    "Or paste a board somebody sent you": "O pega un plano que te hayan enviado",
    "Load that board": "Cargar ese plano",
    "The link itself": "El enlace",
    "This board lives on this phone. Share it and everyone gets the same one.":
        "Este plano vive en este teléfono. Compártelo y todos tendrán el mismo.",
    "Somebody shared a board with you.": "Alguien te compartió un plano.",
    "You already have tables plotted on this phone.":
        "Ya tienes mesas marcadas en este teléfono.",
    "Load theirs": "Cargar el suyo", "Keep mine": "Quedarme con el mío",
    "Link copied — paste it to the floor.": "Enlace copiado — pégalo al equipo.",
    "Loaded the shared board.": "Plano compartido cargado.",
    "That link was not a board.": "Ese enlace no era un plano.",
    "That does not look like a board link.": "Eso no parece un enlace de plano.",
    "Connecting to the floor…": "Conectando con el salón…",
    "Live with the floor — changes show up on every phone.":
        "En vivo con el salón — los cambios aparecen en todos los teléfonos.",
    "Live with the floor, on a slow connection.":
        "En vivo con el salón, con conexión lenta.",
    "Lost the floor — still trying. Your board is safe on this phone.":
        "Se perdió la conexión — seguimos intentando. Tu plano está a salvo en este teléfono.",
    "paste the link here": "pega el enlace aquí",
    "At the table": "En la mesa",
    "what guests ask for that is on no menu": "lo que piden los invitados y no está en ningún menú",
    "Guest Wi-Fi": "Wi-Fi para invitados",
    "The network guests join. One word for everybody — you can hand it out at the table.":
        "La red a la que se conectan los invitados. Una sola palabra para todos — puedes darla en la mesa.",
    "What": "Qué", "It is": "Es",
    "Garnish": "Guarnición", "Garnishes": "Guarniciones",
    "the easiest to get wrong": "lo más fácil de equivocarse",
    "every drink's garnish and glass": "la guarnición y la copa de cada bebida",
    "Build": "Preparación", "Pour": "Servir", "Bottle": "Botella",
    "Pairing": "Maridaje", "Structure": "Estructura",
    "Wine menu": "Menú de vinos",
    "Correct": "Correcto", "Not quite": "Casi", "Try again": "Inténtalo de nuevo",
    "Next question": "Siguiente pregunta", "New quiz": "Nuevo examen",
    "Play again": "Jugar de nuevo", "Score": "Puntuación",
    "Getting there": "Vas mejorando", "Floor ready": "Listo para el salón",
    # the machine turned the Wednesday abbreviation "We" into the pronoun "Nosotros";
    # the schedule header wants the day, matching the two-letter set Lu/Ma/Mi/Ju/Vi/Sá/Do
    "We": "Mi",
    # --- checkout output labels (only render after you type sales, so the journal missed them) ---
    "MO'S — TEAM CHECKOUT": "MO'S — CHECKOUT DEL EQUIPO",
    "tips estimated at 20.8% of sales": "propinas estimadas al 20.8% de las ventas",
    "Team net sales": "Ventas netas del equipo",
    "Credit tips (est.)": "Propinas de tarjeta (est.)",
    "Tips withheld (2%)": "Propinas retenidas (2%)",
    "Team pool": "Fondo del equipo",
    "Tip out — Bar (1% of sales)": "Tip out — Bar (1% de las ventas)",
    "Tip out — Busser (1.5% of sales)": "Tip out — Busser (1.5% de las ventas)",
    "Tip out — Expo (0.5% of sales)": "Tip out — Expo (0.5% de las ventas)",
    "Total tip out": "Tip out total",
    "EARNED (after tip out)": "GANADO (después del tip out)",
    "FRONT": "FRONT", "BACK": "BACK",
    "50/50 split · back takes the greater dollar · whole dollars only":
        "División 50/50 · el back se lleva el dólar de más · solo dólares enteros",
    "every tip-out line rounds UP · earned drops the cents":
        "cada línea de tip out redondea hacia ARRIBA · lo ganado quita los centavos",
    "Rule of thumb:": "Regla general:",
    # --- handbook gate ---
    "The handbook is staff only. Ask a manager for the word if you do not have it.":
        "El manual es solo para el personal. Pídele la palabra a un gerente si no la tienes.",
    "Password": "Contraseña", "Open the handbook": "Abrir el manual",
    "That is not it. Try again.": "Esa no es. Inténtalo de nuevo.",
    "staff password": "contraseña del personal",
    # --- empty states + placeholders ---
    "Nothing in that lane. Widen the price or pick another chip.":
        "Nada en esa categoría. Amplía el precio o elige otra opción.",
    "Nothing in that lane. Widen the price, the type, or the glass filter.":
        "Nada en esa categoría. Amplía el precio, el tipo o el filtro de copa.",
    "Search a dish...": "Busca un platillo...",
    "Search drink, bottle, spirit, or garnish...": "Busca bebida, botella, licor o guarnición...",
    "Search wine, region, flavor, or dish...": "Busca vino, región, sabor o platillo...",
    "blank = 20.8% est.": "vacío = 20.8% est.",
    "blank = no minimum": "vacío = sin mínimo",
    "from SevenRooms": "de SevenRooms", "from Toast": "de Toast",
    "from the banquet sheet": "de la hoja del banquete",
    "how many guests": "cuántos invitados",
    "nobody yet": "nadie aún",
    "overrides covers": "reemplaza los covers",
    "real number wins": "gana el número real",
    # --- Devour menu (Aug 24 – Sep 6): the rendered section, the events button, the picture
    #     lightbox, and the open-app popup. Dish names and "DEVOUR Indy" stay as printed.
    #     Keys must match the rendered TEXT NODES exactly (build/4-data-food.js DEVOUR +
    #     devourBlock/devourPopup/openDevour in 6-app.js) — a Spanish-mode server reads this
    #     whole section during the event, so it is translated top to bottom. ---
    "August 24 – September 6 — the menu, the deal, the blueprint":
        "24 de agosto – 6 de septiembre — el menú, la oferta y el plan de venta",
    "August 24 – September 6.": "24 de agosto – 6 de septiembre.",
    "Our three-course prix-fixe with Prime 47 Carmel, part of DEVOUR Indy Summerfest. Starts at $45 per person — tax and gratuity NOT included. The entree they pick sets the per-person price.":
        "Nuestro menú de tres tiempos a precio fijo con Prime 47 Carmel, parte de DEVOUR Indy Summerfest. Desde $45 por persona — impuestos y propina NO incluidos. El plato fuerte que elijan fija el precio por persona.",
    # The deal, in plain terms (the first dropdown)
    "The deal, in plain terms": "La oferta, en palabras sencillas",
    "what to actually say to a guest": "qué decirle de verdad a un cliente",
    "DEVOUR Indy is a citywide restaurant-week deal. Ours runs Aug 24 – Sep 6 with Prime 47 Carmel.":
        "DEVOUR Indy es una oferta de semana gastronómica en toda la ciudad. La nuestra va del 24 de agosto al 6 de septiembre con Prime 47 Carmel.",
    "It is a SET three-course menu: they choose a soup or salad, an entree, one accessory (side), and a dessert.":
        "Es un menú FIJO de tres tiempos: eligen una sopa o ensalada, un plato fuerte, una guarnición (accesorio) y un postre.",
    "The price per person is whatever ENTREE they pick — from $45 (Vegan Stuffed Tomatoes) up to $65 (6 oz Spinalis). Tax and gratuity are on top.":
        "El precio por persona es el PLATO FUERTE que elijan — desde $45 (Vegan Stuffed Tomatoes) hasta $65 (Spinalis de 6 oz). Impuestos y propina van aparte.",
    "Enhancements (lobster tail, scallops, filet upgrade, etc.) are add-ons ON TOP of the per-person price.":
        "Los adicionales (cola de langosta, vieiras, subir el filet, etc.) van POR ENCIMA del precio por persona.",
    "Nearly everything is gluten-free; there is a vegan entree and a GF/vegan sorbet, so a mixed-needs table is easy. The Devour build drops the two gluten sources the a-la-carte plates have — the house salad comes without croutons, and the seabass without the fried Brussels sprouts. For a true celiac, still confirm the seabass, since the miso can carry wheat.":
        "Casi todo es sin gluten; hay un plato fuerte vegano y un sorbete sin gluten/vegano, así que una mesa con necesidades mixtas es fácil. La preparación Devour quita las dos fuentes de gluten que tienen los platos a la carta — la house salad va sin croutons, y el seabass sin los Brussels sprouts fritos. Para un celíaco de verdad, confirma el seabass, ya que el miso puede llevar trigo.",
    # The upsell blueprint (the second dropdown — each step is <b>Title.</b> then the text)
    "The upsell blueprint": "El plan para subir la venta",
    "how we maximize the check": "cómo maximizamos la cuenta",
    "Frame the value first.": "Empieza por el valor.",
    "Lead with what they GET: \"It is a full three-course experience — soup or salad, your entree, a side, and dessert — starting at $45.\" Let them feel the deal before you trade them up.":
        "Empieza por lo que RECIBEN: \"Es una experiencia completa de tres tiempos — sopa o ensalada, tu plato fuerte, una guarnición y postre — desde $45.\" Deja que sientan la oferta antes de subirles la venta.",
    "Steer the entree up — it IS the check.": "Sube el plato fuerte — ESE es el total.",
    "The per-person price is the entree. Guide to the 6 oz Spinalis ($65) and the Filet ($55): \"If you are doing Devour, the Spinalis is the one people come back for.\" Same menu, $20 more a head.":
        "El precio por persona es el plato fuerte. Guíalos al Spinalis de 6 oz ($65) y al Filet ($55): \"Si van a hacer Devour, el Spinalis es por el que la gente regresa.\" Mismo menú, $20 más por persona.",
    "Always plant an enhancement — this is the money.": "Siempre siembra un adicional — aquí está el dinero.",
    "Right after they pick the entree: \"Want to make it an occasion — add a lobster tail or a couple of scallops?\" Lead with the Lobster Tail ($50), then Scallops ($24), the 10 oz filet upgrade ($22), Crab Oscar ($14), Lobster Mac ($10). One add-on a head can beat the base price.":
        "Justo después de que eligen el plato fuerte: \"¿Quieren hacerlo una ocasión especial — agregar una cola de langosta o un par de vieiras?\" Empieza con la Lobster Tail ($50), luego Scallops ($24), subir el filet a 10 oz ($22), Crab Oscar ($14), Lobster Mac ($10). Un solo adicional por persona puede superar el precio base.",
    "Sell the wine — Devour tables are celebrating.": "Vende el vino — las mesas de Devour están celebrando.",
    "A prix-fixe crowd came out to spend. Pair a bottle to the table’s entrees; it is the fastest lift to the check and your tip.":
        "Una mesa de precio fijo salió a gastar. Marida una botella con los platos fuertes de la mesa; es la forma más rápida de subir la cuenta y tu propina.",
    "Set the number up front.": "Aclara el número desde el inicio.",
    "Say tax and gratuity are not in the per-person price, so the check lands clean and there is no friction at the end.":
        "Aclara que impuestos y propina no están en el precio por persona, para que la cuenta llegue limpia y no haya fricción al final.",
    "Own the dietary table.": "Domina la mesa con dietas especiales.",
    "Nearly everything is GF, and the Vegan Stuffed Tomatoes plus the sorbet cover vegan — so a mixed-needs group books without hesitation. For a true celiac, confirm the specific dish's Devour build with the kitchen before promising GF.":
        "Casi todo es sin gluten, y los Vegan Stuffed Tomatoes más el sorbete cubren lo vegano — así un grupo con necesidades mixtas reserva sin dudar. Para un celíaco de verdad, confirma con la cocina la preparación Devour del plato antes de prometer sin gluten.",
    "Create urgency.": "Crea urgencia.",
    "\"We are only doing Devour through September 6.\" A limited window is a reason to come THIS week and to bring people.":
        "\"Solo hacemos Devour hasta el 6 de septiembre.\" Una ventana limitada es una razón para venir ESTA semana y traer gente.",
    "Base Devour is $45. A Spinalis Devour with a lobster tail is $65 + $50 = $115 a head before wine — steering up plus one enhancement more than doubles the per-person check.":
        "El Devour base es $45. Un Devour de Spinalis con una cola de langosta son $65 + $50 = $115 por persona antes del vino — subir la venta más un adicional más que duplica la cuenta por persona.",
    # events button + picture lightbox caption + the open-app popup
    "See the Devour menu": "Ver el menú Devour",
    # Devour TEXT-menu modal (openDevourMenu): title, intro, course headers, item notes, labels.
    # Dish NAMES stay English as printed; the frame and descriptors translate.
    "See the menu as text": "Ver el menú en texto",
    "Devour Menu": "Menú Devour",
    "August 24 – September 6": "24 de agosto – 6 de septiembre",
    "Three courses, from $45 per person. The entree they pick sets the per-person price; tax and gratuity are on top.":
        "Tres tiempos, desde $45 por persona. El plato fuerte que elijan fija el precio por persona; impuestos y propina van aparte.",
    "Soup or Salad — choose one": "Sopa o ensalada — elige una",
    "Entree — choose one (sets the per-person price)": "Plato fuerte — elige uno (fija el precio por persona)",
    "Accessory — choose one · ALL GF": "Guarnición — elige una · TODAS sin gluten",
    "Dessert — choose one": "Postre — elige uno",
    "Enhancements — add-ons, on top of the per-person price": "Adicionales — extras, por encima del precio por persona",
    "GF & vegan sorbet available on request.": "Sorbete sin gluten y vegano disponible a pedido.",
    "Close": "Cerrar",
    "Ranch or House Italian": "Ranch o italiana de la casa",
    "Feta, cucumbers, mint": "Feta, pepino, menta",
    "The top check — steer here.": "La cuenta más alta — dirígete aquí.",
    "The classic upsell from the $45 floor.": "El clásico paso arriba desde el piso de $45.",
    "Grilled chicken, creamy Alfredo.": "Pollo a la parrilla, Alfredo cremoso.",
    "Fried chicken breast, linguine, tomato diavolo, melted cheese pour-over.":
        "Pechuga de pollo frita, linguine, tomato diavolo, queso derretido por encima.",
    "The vegan option and the $45 floor.": "La opción vegana y el piso de $45.",
    "Whipped cream.": "Crema batida.",
    "Caramel sauce & whipped cream.": "Salsa de caramelo y crema batida.",
    "Upgrade filet to 10 oz": "Subir el filet a 10 oz",
    "Devour menu — tap anywhere to close": "Menú Devour — toca en cualquier lugar para cerrar",
    "August 24 – September 6. Our three-course prix-fixe with Prime 47 Carmel — learn the menu and how to pitch it. Steer to the Spinalis and Filet, and always offer an enhancement.":
        "24 de agosto – 6 de septiembre. Nuestro menú de tres tiempos a precio fijo con Prime 47 Carmel — aprende el menú y cómo venderlo. Dirígete al Spinalis y al Filet, y siempre ofrece un adicional.",
    "Study the Devour menu": "Estudia el menú Devour",
    "Take me to it": "Llévame ahí",
    # Search-hit variants: the section renders each blueprint title WITH a trailing period
    # (<b>Title.</b>) but the search panel emits the bare title, so it needs its own period-less
    # key; likewise the search-only labels/descriptions the section never shows.
    "Frame the value first": "Empieza por el valor",
    "Steer the entree up — it IS the check": "Sube el plato fuerte — ESE es el total",
    "Always plant an enhancement — this is the money": "Siempre siembra un adicional — aquí está el dinero",
    "Sell the wine — Devour tables are celebrating": "Vende el vino — las mesas de Devour están celebrando",
    "Set the number up front": "Aclara el número desde el inicio",
    "Own the dietary table": "Domina la mesa con dietas especiales",
    "Create urgency": "Crea urgencia",
    "The Devour deal": "La oferta Devour",
    "Devour event price": "Precio del evento Devour",
    "Devour · Soup or Salad": "Devour · Sopa o ensalada",
    "Devour · Entree": "Devour · Plato fuerte",
    "Devour · Accessory": "Devour · Guarnición",
    "Devour · Dessert": "Devour · Postre",
    # Allergen-guide notes rewritten for the Devour GF reconciliation. The celiac caveat is the
    # whole point of the change, so it must read in Spanish too (rewriting the English orphaned
    # the old journal translations). These render on the Allergens tab and the Devour search row;
    # keys must match build/4-data-food.js lines 304, 339 and 476 exactly.
    "Croutons are the only gluten — hold the croutons and it is gluten-free (that is how the Devour house salad comes). Tomatoes are the nightshade; dressing changes the allergens.":
        "Los croutons son el único gluten — pídela sin croutons y queda sin gluten (así viene la house salad de Devour). Los tomates son la solanácea; el aderezo cambia los alérgenos.",
    "Miso, mirin, sake, coconut risotto, with fried Brussels sprouts on top — those come out of the SHARED fryer, so they are the main gluten (cross-contact). The Devour build drops the Brussels sprouts (coconut risotto only). Miso can still carry wheat/barley, so for a celiac confirm the fish with the kitchen before promising GF.":
        "Miso, mirin, sake, risotto de coco, con Brussels sprouts fritos encima — esos salen de la freidora COMPARTIDA, así que son el gluten principal (contacto cruzado). La preparación Devour quita los Brussels sprouts (solo risotto de coco). El miso todavía puede llevar trigo/cebada, así que para un celíaco confirma el pescado con la cocina antes de prometer sin gluten.",
    "Coconut risotto — the Devour build has no fried Brussels sprouts. Miso can still carry wheat, so confirm for a celiac.":
        "Risotto de coco — la preparación Devour no lleva Brussels sprouts fritos. El miso todavía puede llevar trigo, así que confirma para un celíaco.",
    # Reference & Archive — the house-history note (moved/added when How We Work was slimmed down)
    "House history & names": "Historia y nombres de la casa",
    "where a couple of our names came from": "de dónde vienen un par de nuestros nombres",
    "The old Kristen Sundae was named for a former owner's wife.":
        "El antiguo Kristen Sundae se llamó así por la esposa de un exdueño.",
    "Show all answers": "Ver todas las respuestas",
    "Hide all answers": "Ocultar todas las respuestas",
    "Dark": "Oscuro", "Light": "Claro",
    # the old one-step-shifted steak ladder was corrected in the data but a stale translation
    # of the old summary lingered in the journal; override it to the corrected wording so a
    # Spanish reader never sees the wrong ladder either
    "Blue very red and very cold; center rare cold red center; medium rare cool red center; medium warm to hot red center; medium well hot pink center; well hot center with little to no pink. Butterfly well-done filets.":
        "Blue muy rojo y muy frío; center rare centro rojo frío; medium rare centro rojo fresco; medium centro rojo tibio a caliente; medium well centro rosa caliente; well centro caliente con poco o nada de rosa. Mariposear los filetes bien cocidos.",
}
pairs.update(LATER)

# Prune dead keys: the journal captured translations of the OLD one-step steak ladder,
# whose English no longer appears anywhere in the app, so these keys never match and never
# render -- but they leave the wrong wording sitting in the file (and trip the qc guard).
_DEAD = (
    "medium warm pink",
    "medium well slight pink",
    "medium rare warm red",
    "k.d.",
    "australian wagyu tomahawk",
    "tomahawk",
)
pairs = {k: v for k, v in pairs.items() if not any(d in k.lower() for d in _DEAD)}

# The Reference & Archive house-history note intentionally NAMES the retired "K.D.'s Tomahawk"
# (history the user asked to keep), so its translation must survive the _DEAD purge above, which
# strips leftover old-name journal translations by substring ("k.d.", "tomahawk") and would
# otherwise take this live, rendered note with it.
pairs["The Australian Wagyu (32 oz, manager-cut) used to be called K.D.'s Tomahawk, after Kevin Dickey, a former owner. Same cut — we just use the current name now."] = \
    "El Australian Wagyu (32 oz, cortado por un gerente) antes se llamaba K.D.'s Tomahawk, por Kevin Dickey, un exdueño. Mismo corte — solo usamos el nombre actual ahora."

# The quiz bank is large enough (150 questions, 800+ strings) that it lives in its own
# translated file rather than inline here. Generated by the translate-quiz workflow and
# checked in as quiz-es.json so this stays reproducible. Absent -> the quiz simply renders
# in English, same as any other gap.
_quiz = pathlib.Path(__file__).parent / "quiz-es.json"
if _quiz.exists():
    _q = json.loads(_quiz.read_text())
    pairs.update({k: v for k, v in _q.items() if k and v and k.strip() != v.strip()})
    print(f"  merged {len(_q):,} quiz translations from quiz-es.json")

# Composite frames: the same phrase with each number replaced by ◊, so a string carrying a
# live count ("94 matches") can be matched by template. applyLang substitutes the numbers
# back. Same idea as quiz-es.json, its own file so it stays reproducible and correctable.
_comp = pathlib.Path(__file__).parent / "composite-es.json"
if _comp.exists():
    _c = json.loads(_comp.read_text())
    pairs.update({k: v for k, v in _c.items()
                  if k and v and k.strip() != v.strip() and k.count("◊") == v.count("◊")})
    print(f"  merged {len(_c):,} composite templates from composite-es.json")

# Cocktail names are proper nouns: a server calls the drink to the bar under the exact name
# Toast prints. The translation pass rendered "Sweet & Salty" as "Dulce & Salado" (it is the
# only cocktail name that picked up a translation), which put the same drink under two names on
# one tab. Drop it so the printed name stays English everywhere, matching every other cocktail.
for _pn in ("Sweet & Salty",):
    if pairs.pop(_pn, None) is not None:
        print(f"  dropped cocktail-name translation (stays English): {_pn!r}")

def strip_ident(s: str) -> str:
    """'gluten (gluten)' -> 'gluten'. The English gloss earns its place only when the
       two words actually differ; otherwise it is noise in a narrow phone cell."""
    def same(a, b):
        n = lambda x: "".join(c for c in unicodedata.normalize("NFD", x.lower())
                              if unicodedata.category(c) != "Mn")
        return n(a) == n(b)
    return re.sub(r'\b(\w[\w\s]*?)\s*\((\w[\w\s]*?)\)',
                  lambda m: m.group(1) if same(m.group(1), m.group(2)) else m.group(0), s)

cleaned, dropped, glossed = {}, 0, 0
for en, es in pairs.items():
    es2 = strip_ident(es)
    if es2 != es:
        glossed += 1
    if es2.strip() == en.strip():      # translator left it as-is (a proper noun)
        dropped += 1
        continue
    cleaned[en] = es2

OUT.write_text("/* ============ SPANISH — generated by mkes.py. Do not hand-edit. ============\n"
               "   English -> Spanish for every visible string. A string missing from this map\n"
               "   simply renders in English, so a gap can never break a screen. ============ */\n"
               "const ES=" + json.dumps(cleaned, ensure_ascii=False, sort_keys=True) + ";\n")

print(f"  {len(pairs):,} translated  ·  {dropped:,} left as-is (proper nouns, not stored)")
print(f"  {glossed:,} redundant '(x)' glosses stripped")
print(f"  -> {OUT}  ({OUT.stat().st_size // 1024} KB, {len(cleaned):,} entries)")
