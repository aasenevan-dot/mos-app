/* ============ FLOOR MAP — hand-plotted from the printed plans ============
   Positions are percentages on a 100x100 grid per room, read off the photographed
   plans (Main, Curry, Smockton, Bar) and cross-checked against the marked-up
   whole-restaurant sheet. They are a faithful arrangement, not a survey — the
   relative layout is right, the inches are not.

   shape: "d" diamond (four-top, rotated square) · "b" booth (rectangle)
          "r" round · "bar" bar stool · "banq" banquette
   seats: how many it sits. seat1: where seat 1 sits, as a compass point.
          Seat 1 usually faces the front door; number clockwise from there.
   ============ */
const FLOORMAP = [
 {room:"Main", sub:"the room you are in most nights", tables:[
   {t:"43", x:26, y:12, shape:"b", seats:4, seat1:"S"},
   {t:"42", x:50, y:12, shape:"b", seats:4, seat1:"S"},
   {t:"41", x:74, y:12, shape:"b", seats:4, seat1:"S"},
   {t:"32", x:42, y:36, shape:"d", seats:4, seat1:"NE"},
   {t:"31", x:60, y:36, shape:"d", seats:4, seat1:"NE"},
   {t:"24", x:20, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"23", x:40, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"22", x:60, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"21", x:80, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"14", x:20, y:82, shape:"b", seats:4, seat1:"N"},
   {t:"13", x:40, y:82, shape:"b", seats:4, seat1:"N"},
   {t:"12", x:60, y:82, shape:"b", seats:4, seat1:"N"},
   {t:"11", x:80, y:82, shape:"b", seats:4, seat1:"N"}
 ]},
 {room:"Bar / Lounge", sub:"25 seated, plus the bar top", tables:[
   {t:"404", x:24, y:11, shape:"d", seats:4, seat1:"NE"},
   {t:"403", x:42, y:11, shape:"d", seats:4, seat1:"NE"},
   {t:"402", x:60, y:11, shape:"d", seats:4, seat1:"NE"},
   {t:"401", x:78, y:11, shape:"d", seats:4, seat1:"NE"},
   {t:"302", x:38, y:27, shape:"d", seats:4, seat1:"NE"},
   {t:"301", x:56, y:27, shape:"d", seats:4, seat1:"NE"},
   {t:"B1", x:14, y:44, shape:"bar", seats:1},{t:"B2", x:20, y:44, shape:"bar", seats:1},
   {t:"B3", x:26, y:44, shape:"bar", seats:1},{t:"B4", x:32, y:44, shape:"bar", seats:1},
   {t:"B5", x:38, y:44, shape:"bar", seats:1},{t:"B6", x:44, y:44, shape:"bar", seats:1},
   {t:"B7", x:50, y:44, shape:"bar", seats:1},{t:"B8", x:56, y:44, shape:"bar", seats:1},
   {t:"B9", x:62, y:44, shape:"bar", seats:1},{t:"B10", x:68, y:44, shape:"bar", seats:1},
   {t:"B11", x:74, y:44, shape:"bar", seats:1},
   {t:"B12", x:81, y:50, shape:"bar", seats:1},{t:"B13", x:81, y:56, shape:"bar", seats:1},
   {t:"B14", x:81, y:62, shape:"bar", seats:1},
   {t:"203", x:26, y:63, shape:"r", seats:2, seat1:"N"},
   {t:"202", x:44, y:63, shape:"r", seats:2, seat1:"N"},
   {t:"201", x:62, y:63, shape:"r", seats:2, seat1:"N"},
   {t:"103", x:28, y:84, shape:"b", seats:4, seat1:"N"},
   {t:"102", x:48, y:84, shape:"b", seats:4, seat1:"N"},
   {t:"101", x:68, y:84, shape:"b", seats:4, seat1:"N"}
 ]},
 {room:"The Curry", sub:"semi-private — 72 seated, 125 cocktail", tables:[
   {t:"65", x:44, y:10, shape:"b", seats:4, seat1:"S"},
   {t:"84", x:62, y:10, shape:"b", seats:4, seat1:"S"},
   {t:"53", x:14, y:34, shape:"b", seats:4, seat1:"E"},
   {t:"52", x:14, y:52, shape:"b", seats:4, seat1:"E"},
   {t:"51", x:14, y:70, shape:"b", seats:4, seat1:"E"},
   {t:"64", x:40, y:34, shape:"d", seats:4, seat1:"NE"},
   {t:"63", x:40, y:52, shape:"d", seats:4, seat1:"NE"},
   {t:"62", x:40, y:70, shape:"d", seats:4, seat1:"NE"},
   {t:"74", x:63, y:31, shape:"d", seats:4, seat1:"NE"},
   {t:"73", x:63, y:50, shape:"d", seats:4, seat1:"NE"},
   {t:"72", x:63, y:69, shape:"d", seats:4, seat1:"NE"},
   {t:"83", x:84, y:32, shape:"b", seats:2, seat1:"N"},
   {t:"82", x:84, y:68, shape:"b", seats:2, seat1:"N"},
   {t:"61", x:34, y:88, shape:"b", seats:4, seat1:"N"},
   {t:"71", x:53, y:88, shape:"b", seats:4, seat1:"N"},
   {t:"81", x:72, y:88, shape:"b", seats:4, seat1:"N"}
 ]},
 {room:"Smockton", sub:"the big private room — 70 seated, 125 cocktail", tables:[
   {t:"91", x:84, y:46, shape:"banq", seats:6, seat1:"W"},
   {t:"96", x:18, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"97", x:35, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"98", x:52, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"99", x:69, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"95", x:18, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"94", x:35, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"93", x:52, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"92", x:69, y:60, shape:"d", seats:4, seat1:"NE"}
 ]},
 {room:"The Vault", sub:"15 seated", tables:[
   {t:"100", x:50, y:50, shape:"r", seats:15, seat1:"N"}
 ]}
];

/* Tonight's sections. Edit this list and the plan recolours — that is the whole
   point of it. Taken from the marked-up sheet as a worked example. */
const SECTIONS = [
 {who:"Alexis + Morgan", tables:["96","97","98","99","92","93","94","95","91"]},
 {who:"Fabian + Barbie", tables:["203","202","201","103","102","101"]},
 {who:"Kristen + Christian", tables:["404","403","402","401","302","301"]},
 {who:"Jenny", tables:["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14"]},
 {who:"Hunter + Abby", tables:["43","42","41","14","13"]},
 {who:"Diana + JJ", tables:["32","31","12","11"]},
 {who:"Nate + Dee", tables:["65","84","53","52","51"]},
 {who:"Taylor + Meagan", tables:["74","73","72","83","82"]},
 {who:"Alex + Evan", tables:["64","63","62","61","71","81"]},
 {who:"Unassigned", tables:["24","23","22","21","100"]}
];

/* Who else is on, off the same sheet. */
const FLOOR_CREW = [
 ["Host","Mackenzie, Leila"],
 ["Busser","Carter, Dalton, Conner"],
 ["Expo","Jackson, Rodrigo"]
];
