/* ============ FLOOR MAP — hand-plotted from the printed plans ============
   Positions are percentages on a 100x100 grid per room, read off the photographed
   plans (Main, Curry, Smockton, Bar) and cross-checked against the marked-up
   whole-restaurant sheet. They are a faithful arrangement, not a survey — the
   relative layout is right, the inches are not.

   shape: "d" diamond (four-top, rotated square) · "b" booth (wide rectangle)
          "bv" booth stood vertically (tall rectangle)
          "r" round · "bar" bar stool · "banq" banquette
   seats: how many it sits. seat1: where seat 1 sits, as a compass point.
          Seat 1 usually faces the front door; number clockwise from there.
   ============ */
const FLOORMAP = [
 {room:"Main", sub:"the room you are in most nights", tables:[
   {t:"43", x:33, y:13, shape:"b", seats:4, seat1:"W"},
   {t:"42", x:55, y:13, shape:"b", seats:4, seat1:"W"},
   {t:"41", x:77, y:13, shape:"b", seats:4, seat1:"W"},
   {t:"32", x:47, y:37, shape:"d", seats:4, seat1:"NE"},
   {t:"31", x:66, y:37, shape:"d", seats:4, seat1:"NE"},
   {t:"100", lbl:"Vault", x:13.5, y:57, shape:"vault", seats:15, seat1:"SE",
    note:"The private room. Seats horseshoe clockwise from seat 1 at the bottom right — the entrance side is a door, so nobody sits there."},
   {t:"24", x:28, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"23", x:47, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"22", x:66, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"21", x:85, y:57, shape:"d", seats:4, seat1:"NE"},
   {t:"14", x:28, y:82, shape:"bv", seats:4, seat1:"NE"},
   {t:"13", x:47, y:82, shape:"bv", seats:4, seat1:"NE"},
   {t:"12", x:66, y:82, shape:"bv", seats:4, seat1:"NE"},
   {t:"11", x:85, y:82, shape:"bv", seats:4, seat1:"NE"}
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
   {t:"203", x:26, y:63, shape:"r", seats:2, seat1:"NE"},
   {t:"202", x:44, y:63, shape:"r", seats:2, seat1:"NE"},
   {t:"201", x:62, y:63, shape:"r", seats:2, seat1:"NE"},
   {t:"103", x:28, y:84, shape:"b", seats:4, seat1:"W"},
   {t:"102", x:48, y:84, shape:"b", seats:4, seat1:"W"},
   {t:"101", x:68, y:84, shape:"b", seats:4, seat1:"W"}
 ]},
 {room:"The Curry", sub:"semi-private — 72 seated, 125 cocktail", tables:[
   {t:"65", x:44, y:10, shape:"b", seats:4, seat1:"W"},
   {t:"84", x:62, y:10, shape:"b", seats:4, seat1:"NW"},
   {t:"53", x:14, y:34, shape:"b", seats:4, seat1:"W"},
   {t:"52", x:14, y:52, shape:"b", seats:4, seat1:"W"},
   {t:"51", x:14, y:70, shape:"b", seats:4, seat1:"W"},
   {t:"64", x:40, y:34, shape:"d", seats:4, seat1:"NE"},
   {t:"63", x:40, y:52, shape:"d", seats:4, seat1:"NE"},
   {t:"62", x:40, y:70, shape:"d", seats:4, seat1:"NE"},
   {t:"74", x:63, y:31, shape:"d", seats:4, seat1:"NE"},
   {t:"73", x:63, y:50, shape:"d", seats:4, seat1:"NE"},
   {t:"72", x:63, y:69, shape:"d", seats:4, seat1:"NE"},
   {t:"83", x:84, y:32, shape:"b", seats:2, seat1:"N"},
   {t:"82", x:84, y:68, shape:"b", seats:2, seat1:"N"},
   {t:"61", x:34, y:88, shape:"b", seats:4, seat1:"NE"},
   {t:"71", x:53, y:88, shape:"b", seats:4, seat1:"NE"},
   {t:"81", x:72, y:88, shape:"b", seats:4, seat1:"NE"}
 ]},
 {room:"Smockton", sub:"the big private room — 70 seated, 125 cocktail", tables:[
   {t:"91", x:84, y:46, shape:"banq", seats:6, seat1:"N"},
   {t:"96", x:18, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"97", x:35, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"98", x:52, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"99", x:69, y:33, shape:"d", seats:4, seat1:"NE"},
   {t:"95", x:18, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"94", x:35, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"93", x:52, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"92", x:69, y:60, shape:"d", seats:4, seat1:"NE"},
   {t:"91B", x:18, y:85, shape:"d", seats:4, seat1:"NE"}
 ]},
];

/* THE SECTIONS, as the floor actually splits. `name` is the section itself and does not
   change; `who` is whoever has it tonight and is what the Money tab lets you retype.
   Main always runs as two teams. The Vault belongs to the back. */
const SECTIONS = [
 {name:"Back of Main",  who:"", tables:["100","43","32","24","23","14","13"]},
 {name:"Front of Main", who:"", tables:["42","41","31","22","21","12","11"]},
 {name:"Smockton",      who:"", tables:["91","99","98","97","96","95"]},
 {name:"Smockton cocktail", who:"", tables:["94","93","92","91B"]},
 {name:"Curry — 65/84", who:"", tables:["65","84","53","64","74","83"]},
 {name:"Curry — 51/52", who:"", tables:["51","52","61","62","63"]},
 {name:"Curry — 71/81", who:"", tables:["81","71","72","73","82"]},
 {name:"New Lounge",    who:"", tables:["203","202","201","103","102","101"]},
 {name:"Lounge",        who:"", tables:["404","403","402","401","302","301"]},
 {name:"Bar",           who:"", tables:["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14"]}
];

/* Who else is on, off the same sheet. */
const FLOOR_CREW = [
 ["Host","Mackenzie, Leila"],
 ["Busser","Carter, Dalton, Conner"],
 ["Expo","Jackson, Rodrigo"]
];

/* Pairs the floor actually pushes together for a big party. Only these combinations —
   they are the ones that physically line up — and each is a straight neighbour of the
   other, so the merged table is drawn as one shape spanning both positions. */
const MERGEABLE = [
 {id:"23+32", a:"23", b:"32"},
 {id:"31+22", a:"31", b:"22"},
 {id:"65+84", a:"65", b:"84"},
 {id:"51+52", a:"51", b:"52"}
];

/* Live sync with the rest of the floor. BLANK ON PURPOSE — with url or key empty the
   client never starts, never touches the network, and the app behaves exactly as it did
   before any of this existed. Fill both in after deploying server/ to turn it on. */
const FLOOR_SYNC = { url: "", key: "" };
