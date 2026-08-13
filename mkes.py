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
    # --- Devour menu (Aug 24 – Sep 6): UI + pitch. Dish names stay as printed. ---
    "How to pitch it — maximize the check": "Cómo venderlo — maximiza la cuenta",
    "Dessert note": "Nota del postre",
    "GF & vegan sorbet available on request.": "Sorbete sin gluten y vegano disponible a pedido.",
    "Soup or Salad — choose one": "Sopa o ensalada — elige una",
    "Entrée — choose one (this sets the per-person price)": "Plato fuerte — elige uno (esto fija el precio por persona)",
    "Accessory — choose one · ALL GF": "Guarnición — elige una · TODAS sin gluten",
    "Dessert — choose one": "Postre — elige uno",
    "A three-course prix-fixe with Prime 47 Carmel, part of DEVOUR Indy Summerfest. Starts at $45 per person — tax and gratuity NOT included. Per-person price is the entrée.":
        "Un menú de tres tiempos a precio fijo con Prime 47 Carmel, parte de DEVOUR Indy Summerfest. Desde $45 por persona — impuestos y propina NO incluidos. El precio por persona es el plato fuerte.",
    "Lead with the VALUE, then trade up. It is four courses — soup or salad, entrée, an accessory, and dessert — starting at $45.":
        "Empieza por el VALOR, luego sube la venta. Son cuatro tiempos — sopa o ensalada, plato fuerte, una guarnición y postre — desde $45.",
    "The per-person price IS the entrée. Steer to the Spinalis ($65) and Filet ($55): same menu, bigger check, better experience.":
        "El precio por persona ES el plato fuerte. Dirígelos al Spinalis ($65) y al Filet ($55): mismo menú, cuenta más grande, mejor experiencia.",
    "ALWAYS offer an enhancement — this is where the check grows. Lobster Tail ($50) is the big one; then Scallops ($24), the 10 oz filet upgrade ($22), Crab Oscar ($14), Lobster Mac ($10).":
        "SIEMPRE ofrece un adicional — aquí crece la cuenta. La cola de langosta ($50) es la grande; luego vieiras ($24), subir el filet a 10 oz ($22), Crab Oscar ($14), Lobster Mac ($10).",
    "Say up front that tax and gratuity are NOT in the per-person price, so the check reads right.":
        "Aclara desde el inicio que impuestos y propina NO están en el precio por persona, para que la cuenta cuadre.",
    "Almost everything is gluten-free, and the Vegan Stuffed Tomatoes plus the sorbet cover vegan — a great fit for a table with dietary needs.":
        "Casi todo es sin gluten, y los Tomates Rellenos Veganos más el sorbete cubren lo vegano — ideal para una mesa con necesidades alimentarias.",
    "Study the Devour menu": "Estudia el menú Devour",
    "Take me to it": "Llévame ahí",
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
_DEAD = ("medium warm pink", "medium well slight pink", "medium rare warm red")
pairs = {k: v for k, v in pairs.items() if not any(d in k.lower() for d in _DEAD)}

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
