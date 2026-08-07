
/* ============================================================
   SCHEDULES — the posted week + every week since we opened.
   Transcribed straight off the posted sheets (44 photos read).
   Cells are verbatim: blank = not scheduled, OFF = blacked-out
   box, RO/ro = requested off, numbers = start times as written
   (345 = 3:45). A trailing ? means the photo was hard to read.
   These are the sheets AS POSTED — trades, call-offs, cuts and
   sick days happened after, so history shows the plan, not
   always who actually worked.
   When a new week gets posted: build a new SCHEDULE object and
   push the old one onto the FRONT of SCHEDULE_HISTORY.
   ============================================================ */
/* ============================================================
   LIVE MUSIC — off the house poster. Every Friday & Saturday.
   Keyed "M/D" so schedGrid drops the act onto the right column
   automatically as the posted week rolls over.
   NOTE: the poster is headed "AUGUST 2027", but Saturday 8/1 only
   lands in 2026 (8/1/2027 is a Sunday) — treating it as 2026.
   Only the dates legible on the photo are here; 8/22 onward were
   cut off, so they are deliberately absent rather than guessed.
   ============================================================ */
const LIVE_MUSIC={
 "8/1":"Austin Johnson",
 "8/7":"Nick Lemmonti", /* poster bills it as "The Nick Lemmonti Show" — shortened to fit the column */
 "8/8":"Austin Johnson",
 "8/14":"Christina & Frank",
 "8/15":"Christina & Frank",
 "8/21":"Tim & Cat"
};

/* MEALS & MOMENTS — the off-site meals we serve for church families and the community,
   after their service. Stored "M/D" like the music poster; the year comes from the posted
   schedule and anything already served drops off the list on its own. Two entries can
   share a date, so this is a list, not a map. */
const OFFSITE=[
 {d:"8/9", t:"12:00 – 2:00 pm", where:"Heart & Soul Church", addr:"11616 E 126th Street, Fishers"},
 {d:"8/9", t:"7:00 – 9:00 pm", where:"Real Life Church", addr:"5151 West US Highway 40, Greenfield"},
 {d:"8/23", t:"11:30 am – 1:00 pm", where:"Life Church", addr:"9820 E 141st St, Fishers"}
];
/* Dated house events. Same "M/D" storage and same drop-off-when-past behavior as the rest
   of this file — they live here, not on the food menu. */
const EVENTS=[
 {d:"8/13", when:"Thu · 5–10 pm · the Lounge", n:"Sundresses & Sangria",
  w:"One more summer girls' night out — slip into your favorite sundress and join us in the lounge. Sangria flowing 5 to 10."},
 {d:"9/8", when:"Tue · Sagamore Golf Club", n:"Surf & Turf Cup — Golf Outing Scramble",
  w:"$3,000 per foursome. Breakfast, 18 holes, lunch and drinks, contests and prizes, and a surf & turf dinner by Prime 47. Registration 9:00 am."},
 {d:"9/7", when:"Mon · 12–4 pm · 4812 N 300 E, Greenfield IN 46140", n:"Mo's Staff Labor Day Party",
  w:"Staff party with Prime 47 — kickball, beach volleyball and swimming, with the TKC food truck from 1 to 3. Family and a +1 welcome. RSVP admin@prime47carmel.com; the sign-up sheet is on the wall and confirmations are due by August 20th. Drink responsibly."},
 {d:"9/17", when:"Thu · 6:30 pm · $150 per person", n:"The Prisoner Wine Dinner",
  w:"Five-course wine dinner presented by The Prisoner Wine Company. RSVP Lillian@mosgreenwood.com. Wine dinners mean banquet money."}
];
const OFFSITE_NOTE="Fellowship, food, and fun — bringing a church family and the community together over a shared meal. Want to serve one? Email or text Yaris at admin@prime47carmel.com or 317.703.4284.";

const SCHEDULE={
 week:"Week of 8/5 – 8/11, 2026", year:2026, start:"2026-08-05",
 days:[["8/5","We"],["8/6","Th"],["8/7","Fr"],["8/8","Sa"],["8/9","Su"],["8/10","Mo"],["8/11","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","2","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","230","","","345"],
   ["Chad","","330","330","2pm Carmel","3","345",""],
   ["Hunter","","OFF","330","3","OFF","OFF","OFF"],
   ["Diana","345","","330","3","3","",""],
   ["MorganB","","RO","RO","RO","","345",""],
   ["Calista","345","330","330","3","","OFF","OFF"],
   ["Nathan","OFF","OFF","330","3","OFF","345","345"],
   ["Fabian","","330","330","3","","345",""],
   ["Alex","","","330","3","3","OFF","345"]
  ],["15","41","39","31","2","2","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","","330","330","230","","345","OFF"],
   ["Evan","OFF","OFF","330","3","3","345","OFF"],
   ["Erin","345","330","330","RO","OFF","RO","OFF"],
   ["J Fox","345","","330","3","","345","345"],
   ["D","OFF","OFF","330","3","3","OFF","OFF"],
   ["Meagan","OFF","","330","3","3","345","345"],
   ["Abby","OFF","330","","3","OFF","OFF","345"],
   ["Barbie","345","330","330","3","","OFF","OFF"]
  ]],
  ["Bar",[
   ["Krista","","3","5","3","2","",""],
   ["Christian","3","4","430","5","","3",""],
   ["Jennea","RO","OFF","3","RO","RO","OFF","3"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","330","4",""],
   ["Taylor","OFF","330","330","RO","","","345"]
  ]],
  ["Host",[
   ["Kalie","","4","5","OFF","5","4","OFF"],
   ["Mackenzie","4","4 Busser","4 Busser","Noon","","","4"],
   ["AUDRINA","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Leila","5","5","4","5","4","",""]
  ]],
  ["Expo",[
   ["CARTER","4","5","OFF","5 Busser","OFF","4",""],
   ["Jackson","Back Train","4 Back Train","4","4","4","",""],
   ["Rodrigo","","","530","530","530","","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","4","5","4","4","OFF"],
   ["Conner","5","","5","4","4","","5"],
   ["LUCAS","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5790 + IMG_5791"
};
const SCHEDULE_HISTORY=[
{
 week:"Week of 7/29 – 8/4, 2026", year:2026, start:"2026-07-29",
 days:[["7/29","We"],["7/30","Th"],["7/31","Fr"],["8/1","Sa"],["8/2","Su"],["8/3","Mo"],["8/4","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","2","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","330","","","345"],
   ["Chad","","330","330","3 MGR","3","345",""],
   ["Hunter","","OFF","330","330","OFF","OFF","OFF"],
   ["Diana","345","330","330","RO","3","",""],
   ["MorganB","","RO","RO","330","","345",""],
   ["Calista","345","","330","330","","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","","330","","330","3","345",""],
   ["Alex","","","330","330","3","OFF","345"]
  ],["12","54","30","19","16","4","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","345","330","330","RO","","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","345","OFF"],
   ["Erin","","330","330","330","OFF","345","OFF"],
   ["J Fox","345","","","330","3","345","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","OFF","","330","330","3","","345"],
   ["Abby","OFF","330","","330","OFF","OFF","345"],
   ["Barbie","330","330","330","330","","OFF",""]
  ]],
  ["Bar",[
   ["Krista","","3","5","3","2","",""],
   ["Christian","3","4","430","430","","3",""],
   ["Jennea","5","OFF","3","5","","OFF","3"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","330","4",""],
   ["Taylor","OFF","330","330","RO","","","345"]
  ]],
  ["Host",[
   ["Kalie","","4","5","OFF","5","4","OFF"],
   ["Mackenzie","4","4 Busser","4 Busser","Noon","","OFF","4"],
   ["AUDRINA","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Leila","5","5","4","5","4","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","4","5","5","5 Busser","OFF","OFF",""],
   ["Jackson","Back Train","4 Back Train","RO","4","4","5",""],
   ["Caidyn","","5","5","5","","","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","RO","RO","4","4","4","OFF"],
   ["Conner","5","","5","","4","5","5"],
   ["LUCAS","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5792.PNG"
},
{
 week:"Week of 7/22 – 7/28, 2026", year:2026, start:"2026-07-22",
 days:[["7/22","We"],["7/23","Th"],["7/24","Fr"],["7/25","Sa"],["7/26","Su"],["7/27","Mo"],["7/28","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","1","3","1","","1","1"],
   ["CJ","1","","1","3","1","3",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","330","","","345"],
   ["Chad","","330","330","3 MGR","3","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF","OFF"],
   ["Diana","345","330","RO","RO","RO","",""],
   ["MorganB","","","330","330","3","345",""],
   ["Calista","","","RO","RO","RO","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","","330","330","330","","","345"],
   ["Alex","","","330","330","3","345",""]
  ],["24","63","32","44","4","36","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","345","330","RO","RO","RO","345","OFF"],
   ["Evan","OFF","OFF","330","RO","","345","OFF"],
   ["Erin","","330","330","330","OFF","345","OFF"],
   ["J Fox","345","","330","330","","345","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","345","","RO","330","3","","345"],
   ["Chantz","","","OFF","OFF","OFF","OFF",""],
   ["Abby","OFF","330","330","RO","OFF","OFF","345"],
   ["Barbie","","330","330","330","3","OFF",""]
  ]],
  ["Bar",[
   ["Krista","","3","5","3","2","",""],
   ["Christian","3","4","RO","RO","RO","3",""],
   ["Jennea","5","OFF","3","5","RO","OFF","3"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","345","","330","330","330","345",""],
   ["Taylor","OFF","330","330","RO","","","345"]
  ]],
  ["Host",[
   ["Kalie","4 Busser","4","RO","OFF","5","4","OFF"],
   ["Mackenzie","4","4 Busser","4 Busser","4 Busser","","","4"],
   ["AUDRINA","","OFF","","","","","OFF"],
   ["Leila","5","5","4","5","4","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","4","4","","5 Busserr","OFF","OFF",""],
   ["Jackson","RO","RO","4","4","4","5",""],
   ["Tristin","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Caidyn","","","5","5","","4","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","","RO","RO","RO","OFF"],
   ["Conner","5","","5","","4","5","5"],
   ["LUCAS","","","5","5","","",""],
   ["Blaze","","OFF","OFF","OFF","OFF","",""]
  ]]
 ],
 note:"", src:"IMG_5793.PNG"
},
{
 week:"Week of 7/15 – 7/21, 2026", year:2026, start:"2026-07-15",
 days:[["7/15","We"],["7/16","Th"],["7/17","Fr"],["7/18","Sa"],["7/19","Su"],["7/20","Mo"],["7/21","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","","","","","1","1"],
   ["CJ","","1","1","1","1","","3"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","1 MGR","330 TD","3 MGR","330","","","345"],
   ["Chad","","330 MGR","330","3 MGR","3","345",""],
   ["Hunter","345","330 TD","330","330","OFF","OFF","OFF"],
   ["Diana","345","330","330","330","3","",""],
   ["MorganB","RO","RO","RO","330","","345",""],
   ["Calista","","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","345","330","330","330","","","345"],
   ["Alex","345","330","330","","","345",""]
  ],["77","40","89","39","12","60","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","345","330TD","330","RO","","345","OFF"],
   ["Evan","OFF","330 TD","330","330","","345","OFF"],
   ["Erin","345","330","330","330","OFF","345","OFF"],
   ["J Fox","345","","","330","","345","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","330","330","3","","345"],
   ["Chantz","","","","330","3","",""],
   ["Abby","OFF","","330","330","OFF","OFF","345"]
  ]],
  ["Bar",[
   ["Krista","3","3","5","","","","3"],
   ["Christian","","4","3","5","","3",""],
   ["Jennea","5","OFF","","3","3","OFF",""],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","345","","330","330","330","345",""],
   ["Taylor","OFF","330","330","330","","","345"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","","OFF","","OFF"],
   ["Kalie","4","4","5","OFF","5","4","OFF"],
   ["Mackenzie","4 Busser","4 Busser","4 Busser","4","","","4"],
   ["AUDRINA","","OFF","","","","","OFF"],
   ["Leila","5","5","4","5","4","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","RO","RO","RO","OFF","OFF",""],
   ["Jackson","5","4","4","4","RO","RO","RO"],
   ["Tristin","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Caidyn","","5","5","5","","4","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","4","","","430","OFF"],
   ["Barbie","345 Back","330 Back","330 Back","4","4","","OFF"],
   ["Conner","5","5","5 Polish","5","","5","5"],
   ["LUCAS","","","","5","","",""],
   ["Blaze","","OFF","OFF","OFF","OFF","",""]
  ]]
 ],
 note:"", src:"IMG_5794.PNG"
},
{
 week:"Week of 7/8 – 7/14, 2026", year:2026, start:"2026-07-08",
 days:[["7/8","We"],["7/9","Th"],["7/10","Fr"],["7/11","Sa"],["7/12","Su"],["7/13","Mo"],["7/14","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","1","1","1","3","","",""],
   ["CJ","","","3","1","1","1","1"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","330","","","3 MGR"],
   ["Chad","","330","330","3 MGR","3","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF","345"],
   ["Diana","","330 Cocktail","330","330 Cocktail","3","",""],
   ["MorganB","RO","","","330","","345","345"],
   ["Calista","","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345",""],
   ["Fabian","RO","RO","RO","RO","RO","","345"],
   ["Alex","345","","330","330","3","",""]
  ],["15","68","10","99","87","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","345","330","330","330","","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","345","OFF"],
   ["Erin","345","330","","330","OFF","345","OFF"],
   ["J Fox","345","","330","330","","","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","330","","3","","345"],
   ["Chantz","","330","330","330","3","OFF",""],
   ["Abby","OFF","","330","330","OFF","OFF","345"]
  ]],
  ["Bar",[
   ["Krista","3","3","5","","","","3"],
   ["Christian","","","3","5","3","3",""],
   ["Jennea","5","OFF","","3","5","OFF",""],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","345","RO","RO","RO","RO","4",""],
   ["Stormie","","OFF","330","OFF","OFF","","OFF"],
   ["Taylor","OFF","RO","RO","RO","RO","RO","RO"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","","OFF","","OFF"],
   ["Kalie","4","5","5","OFF","4","5","OFF"],
   ["Violette","5 Busser","4","5 Busser","5","","","4"],
   ["Mackenzie","","5 Busser","4","4","5","4",""],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","5","5","OFF","OFF",""],
   ["Jackson","5","","4","4","4","","5"],
   ["Tristin","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Caidyn","","4","5","5","","4","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","4","","5","430","OFF"],
   ["Barbie","345 Back","330 Back","330 Back","4","4","","OFF"],
   ["Conner","","","5 Polish","5","","","5"],
   ["LUCAS","","","","5","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""]
  ]]
 ],
 note:"", src:"IMG_5795.PNG"
},
{
 week:"Week of 7/1 – 7/7, 2026", year:2026, start:"2026-07-01",
 days:[["7/1","We"],["7/2","Th"],["7/3","Fr"],["7/4","Sa"],["7/5","Su"],["7/6","Mo"],["7/7","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","3","1","1","","","1",""],
   ["CJ","1","3","3","","","","1"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","","","345",""],
   ["Chad","345","330","330","","","345",""],
   ["Hunter","345","OFF","330","","OFF","OFF","345"],
   ["Diana","345 Cocktail","330 Cocktail","330","","","","RO"],
   ["MorganB","","","330","","","","345"],
   ["Calista","345","","330","","","OFF","OFF"],
   ["Nathan","OFF","OFF","330","","OFF","345","345"],
   ["Fabian","","330","330","","","345",""],
   ["Alex","345 Back","","330","","","","345 Back"]
  ],["38","4","16","","","2","11"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Morgan W","","330","330","","","345","OFF"],
   ["Evan","OFF","OFF","330","","","345","OFF"],
   ["Erin","345","330","330","","OFF","345","OFF"],
   ["J Fox","345","","330","","","","345"],
   ["D","OFF","OFF","330","","","OFF",""],
   ["Meagan","","330","330","","","345","345"],
   ["Chantz","","330","330","","","","345"],
   ["Abby","OFF","","330","","OFF","OFF",""]
  ]],
  ["Bar",[
   ["Krista","3","3","5","","","","3"],
   ["Christian","","5","3","","","5",""],
   ["Jennea","5","OFF","","","","3","OFF"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","4","4","","","4",""],
   ["Stormie","RO","OFF","RO","OFF","OFF","","OFF"],
   ["Taylor","OFF","4","RO","","","","4"]
  ]],
  ["Host",[
   ["Lilian","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Kalie","5","430","5","OFF","","5","OFF"],
   ["Violette","430 Busser","4","430","","","","4"],
   ["Mackenzie","4","OFF","4","","","4","OFF"],
   ["Leila","430","5","430","","","",""],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","RO","RO","","OFF","","5"],
   ["Jackson","5","4","4","","","5",""],
   ["Caidyn","","4","5","","","4","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","RO","RO","","","RO","OFF"],
   ["Barbie","345 Follow","330 Follow","4","","","4","OFF"],
   ["Conner","","5","5 Polish","","","","5"],
   ["LUCAS","","","5","","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""]
  ]]
 ],
 note:"", src:"IMG_5796.PNG"
},
{
 week:"Week of 6/24 – 6/30, 2026", year:2026, start:"2026-06-24",
 days:[["6/24","We"],["6/25","Th"],["6/26","Fr"],["6/27","Sa"],["6/28","Su"],["6/29","Mo"],["6/30","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","","3","1","1","1","1"],
   ["CJ","1","3","1","3","3","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","330","","","3MGR"],
   ["Chad","","330","330","3 MGR","3","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF",""],
   ["Diana","345 Cocktail","330 Cocktail","330","330","3","","345"],
   ["MorganB","RO","","330","330","3","345","345"],
   ["Calista","345","","RO","RO","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345",""],
   ["Fabian","","330","330","330","","","345"]
  ],["15","68","10","99","87","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330 Front","","","345"],
   ["Morgan W","","330","330","330","","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","345","OFF"],
   ["Erin","345","330","","330","OFF","345","OFF"],
   ["J Fox","345","","330","330","","","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","330","330","3","","345"],
   ["Chantz","","330","330","330","3","",""],
   ["Abby","OFF","","RO","330","OFF","OFF",""]
  ]],
  ["Bar",[
   ["Krista","3","3","5","RO","","","3"],
   ["Christian","","","3","5","3","3",""],
   ["Jennea","5","OFF","","3","5","","OFF"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","RO","RO","4","4","3","4",""],
   ["Stormie","RO","OFF","","OFF","OFF","","OFF"],
   ["Taylor","OFF","RO","330","4","","","4"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","","OFF","","OFF"],
   ["Kalie","","5","5","OFF","4","5","OFF"],
   ["Violette","","","5","4","","","4"],
   ["Ari","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Mackenzie","4","OFF","","430","5","4","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","","430 Busser","OFF","OFF","5"],
   ["Jackson","5","","4","4","4","",""],
   ["Tristin","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Caidyn","","4","5","5","","4","4"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","","5","430","OFF"],
   ["Barbie","4","4","4","4","","","OFF"],
   ["Conner","","","5 Polish","5","","","5"],
   ["LUCAS","","","5","5","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""]
  ]]
 ],
 note:"", src:"IMG_5797.PNG"
},
{
 week:"Week of 6/17 – 6/23, 2026", year:2026, start:"2026-06-17",
 days:[["6/17","We"],["6/18","Th"],["6/19","Fr"],["6/20","Sa"],["6/21","Su"],["6/22","Mo"],["6/23","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","","3","1","1","1","1"],
   ["CJ","","","","","","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","OC","OC","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","1 MGR","3 MGR","330","3","","345"],
   ["Chad","1MGR","330","RO","3 MGR","3","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF",""],
   ["Diana","","330","330","330","3","","345"],
   ["MorganB","","330","330","330","","RO","RO"],
   ["Calista","345","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345",""],
   ["Fabian","","330","330","330","","345","345"]
  ],["21","76","16","44","74","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330","","","345"],
   ["Morgan W","RO","330","330","330","3","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","RO","OFF"],
   ["Erin","345","330","330","330","OFF","","OFF"],
   ["J Fox","345","","330","330","3","","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","330","330","","345","345"],
   ["Chantz","","330","330","330","","345",""],
   ["Abby","OFF","","","330","OFF","OFF","345"]
  ]],
  ["Bar",[
   ["Krista","RO","3","3","3","","","3"],
   ["Christian","","5","5","5","430","3","OFF"],
   ["Jennea","3","OFF","4","4","3","","OFF"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","","4","3","4","RO"],
   ["Stormie","4","OFF","4","OFF","OFF","","OFF"],
   ["Taylor","OFF","4","330","4","OFF","OFF","4"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","RO","OFF","","OFF"],
   ["Kalie","","5","5","OFF","4","5","OFF"],
   ["Violette","","430","430","4","","","4"],
   ["Ari","","RO","","","","RO","RO"],
   ["Mackenzie","4","OFF","4","430","5","4","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","","430","OFF","OFF","5"],
   ["Jackson","5","","RO","RO","RO","RO",""],
   ["Tristin","RO","","430","430","430","",""],
   ["","OFF","OFF","OFF","OFF","OFF","",""],
   ["Caidyn","","4","5","5","","4","430 Busser"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","5","430","","OFF"],
   ["Barbie","4","4","4","4","5","","OFF"],
   ["LUCAS","","","4","4pm","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5798.PNG"
},
{
 week:"Week of 6/10 – 6/16, 2026", year:2026, start:"2026-06-10",
 days:[["6/10","We"],["6/11","Th"],["6/12","Fr"],["6/13","Sa"],["6/14","Su"],["6/15","Mo"],["6/16","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","1","3","1","1","1",""],
   ["CJ","1","1","1","","","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","3 MGR","330","","","1 MGR"],
   ["Chad","","330","330","3 MGR","3","345",""],
   ["Hunter","RO","OFF","RO","RO","OFF","OFF","RO"],
   ["Diana","345","330","330","330","","","345"],
   ["MorganB","","","330","330","3","345","345"],
   ["Calista","345","","330","330","RO","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345",""],
   ["Fabian","","330","330","330","3","","345"]
  ],["15","68","10","99","87","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330","","","345"],
   ["Morgan W","RO","330","330","330","","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","345","OFF"],
   ["Erin","345","330","330","330","OFF","","OFF"],
   ["J Fox","345","","330","330","3","","OFF"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","RO","330","","345","345"],
   ["Chantz","","330","330","RO","RO","",""],
   ["Abby","OFF","","330","330","OFF","OFF","345"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","",""],
   ["Christian","","5","5","5","430","3","3"],
   ["Jennea","","OFF","4","4","3","","OFF"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","3","4",""],
   ["Stormie","4","OFF","4","OFF","OFF","","OFF"],
   ["Taylor","OFF","4","330","4","","","4"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","","OFF","","OFF"],
   ["Kalie","","5","5","OFF","4","5","OFF"],
   ["Violette","","430","430 Busser","4","","","4"],
   ["Ari","RO","RO","RO","RO","RO","RO","RO"],
   ["Mackenzie","4","OFF","4","430","5","4","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","","430 Busser","OFF","OFF","5"],
   ["Jackson","5","","RO","RO","RO","RO",""],
   ["Tristin","RO","","430 Busser","430","","OFF",""],
   ["Jon","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Caidyn","","4","5","5","","4","430 Busser"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","5","","430","OFF"],
   ["Barbie","4","4","4","4","RO","","OFF"],
   ["LUCAS","","","","","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5799.PNG"
},
{
 week:"Week of 6/3 – 6/9, 2026", year:2026, start:"2026-06-03",
 days:[["6/3","We"],["6/4","Th"],["6/5","Fr"],["6/6","Sa"],["6/7","Su"],["6/8","Mo"],["6/9","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","ON","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","3","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","330","3 Event","","","3MGR"],
   ["Chad","","330","330","330","3","345",""],
   ["Hunter","RO","OFF","RO","RO","OFF","OFF","RO"],
   ["Diana","","330","330","330","3","","345"],
   ["MorganB","","","330","330","3","345","345"],
   ["Calista","345","","330","330","","OFF","OFF"],
   ["Nathan","OFF","OFF","RO","RO","OFF","345","RO"],
   ["Fabian","345","330","330","330","","","345"]
  ],["15","68","10","99","87","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330","","","345"],
   ["Morgan W","","330","330","330","","345","OFF"],
   ["Evan","OFF","OFF","330","3 Event","3","345","OFF"],
   ["Erin","345","330","330","330","OFF","345","OFF"],
   ["J Fox","345","","330","3 Banquet","3","","345"],
   ["D","OFF","OFF","330","330","3","OFF","OFF"],
   ["Meagan","","330","330","330","","","345"],
   ["Chantz","","330","330","330","3","",""]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","","3"],
   ["Christian","","5","5","5","3","3",""],
   ["Jennea","","OFF","4","4","3","","OFF"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","3","4",""],
   ["Stormie","4","OFF","4","OFF","OFF","","OFF"],
   ["Taylor","OFF","4","330","4","","","4"]
  ]],
  ["Host",[
   ["Lilian","","OFF","","RO","OFF","","OFF"],
   ["Kalie","","5","5","OFF","4","5","OFF"],
   ["Violette","","430","5","4","","","4"],
   ["Ari","RO","RO","4","5","","RO","RO"],
   ["Mackenzie","4","OFF","RO","430","5","4","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","","430 Busser","OFF","OFF","5"],
   ["Jackson","5","","4","4","4","",""],
   ["Tristin","RO","","430 Busser","430","","OFF",""],
   ["Jon","5","OFF","5","5","5","","OFF"],
   ["Caidyn","","4","5","","","4","430 Busser"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","5","","430","OFF"],
   ["Barbie","4","4","4","4","4","","OFF"],
   ["LUCAS","","","","","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5800.PNG"
},
{
 week:"Week of 5/27 – 6/2, 2026", year:2026, start:"2026-05-27",
 days:[["5/27","We"],["5/28","Th"],["5/29","Fr"],["5/30","Sa"],["5/31","Su"],["6/1","Mo"],["6/2","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","ON","","OFF"],
   ["Mike","1","1","3","1","1","",""],
   ["CJ","","3","1","3","RO","1","1"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","330","330","","","3MGR"],
   ["Chad","345","330","330","RO","RO","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF","345"],
   ["Diana","","330","330","330","3","",""],
   ["MorganB","","","330","330","3","345","345"],
   ["Calista","RO","","RO","RO","RO","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","345","330","330","330","3","",""]
  ],["15","68","10","99","87","8","2"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330 Front","3 Front","","345"],
   ["Morgan W","345","330","330","330","3","345","OFF"],
   ["Evan","OFF","OFF","330","330","3","345","OFF"],
   ["Erin","345","330","330","330","OFF","345","OFF"],
   ["J Fox","345","","330","330","3","","345"],
   ["D","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Meagan","","330","330","330","3","","345"],
   ["Chantz","","330","330","330","3","",""]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","","3"],
   ["Christian","","5","5","5","3","3",""],
   ["Jennea","","230 Training","","230 Training","","","230 Training"],
   ["Eleisia","OFF","OFF","OFF","OFF","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","RO","3","4",""],
   ["Stormie","4","OFF","4","OFF","OFF","","OFF"],
   ["Taylor","OFF","4","330","4","","","4"]
  ]],
  ["Host",[
   ["Lilian","5","OFF","5","","OFF","","OFF"],
   ["Kalie","","5","","OFF","4","5","OFF"],
   ["Violette","","430","430 Busser","4","","","4"],
   ["Ari","","4","RO","RO","RO","RO","RO"],
   ["Mackenzie","4","OFF","4","430","5","4","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","","430","OFF","OFF","5"],
   ["Jackson","5","RO","4","4","4","",""],
   ["Tristin","RO","RO","RO","RO","RO","OFF","RO"],
   ["Jon","5","OFF","5","5","5","","OFF"],
   ["Caidyn","","4","5","5 Busser","","4","430 Busser"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","5","","430","OFF"],
   ["Barbie","4","4","4","4","4","","OFF"],
   ["LUCAS","","","","","","",""],
   ["Blaze","4","OFF","OFF","OFF","OFF","4",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5801.PNG"
},
{
 week:"Week of 5/20 – 5/26, 2026", year:2026, start:"2026-05-20",
 days:[["5/20","We"],["5/21","Th"],["5/22","Fr"],["5/23","Sa"],["5/24","Su"],["5/25","Mo"],["5/26","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","ON","","OFF"],
   ["Mike","1","","3","1","","","1"],
   ["CJ","","1","1","3","1","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","330","330","330","","","3MGR"],
   ["Chad","345","330","330","3MGR","RO","",""],
   ["Hunter","345","OFF","330","330","OFF","OFF","345"],
   ["Diana","RO","330","330","RO","RO","","RO"],
   ["MorganB","345","","330","330","3","","345"],
   ["Calista","3 BAR","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","","345"],
   ["Fabian","","330","330","330","3","",""]
  ],["53","22","53","117","16","17","12"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","RO","330","330","3","","345"],
   ["Morgan W","345","330","RO","330","RO","","OFF"],
   ["Evan","OFF","OFF","RO","RO","RO","","OFF"],
   ["Erin","345","330","330","330","OFF","","OFF"],
   ["J Fox","345","","330","330","3","","345"],
   ["D","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Meagan","","330","330","330","RO","","345"],
   ["Chantz","","330","330","330","3","","RO"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","4","","","3"],
   ["Christian","","4","5","430","3","",""],
   ["Jennea","","230 Training","230 Training","230 Training","","","230 Training"],
   ["Eleisia","OFF","RO","OFF","5","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","RO","4","5","3","",""],
   ["Stormie","4","","4","4","","",""],
   ["Taylor","OFF","4","RO","RO","RO","","4"]
  ]],
  ["Host",[
   ["Lilian","5","OFF","5","11","OFF","","OFF"],
   ["Kalie","RO","5","RO","OFF","4","","OFF"],
   ["Violette","","430","430 Busser","430","","",""],
   ["Ari","","4","5","RO","RO","","5"],
   ["Mackenzie","4","OFF","4","430","5","","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","4","RO","RO","OFF","OFF","5"],
   ["Jackson","5","","4","4","4","",""],
   ["Tristin","","5","RO","530 BarBack","RO","OFF","RO"],
   ["Jon","5","OFF","5","5","5","","OFF"],
   ["Caidyn","","4","5","5","","","430 Busser"]
  ]],
  ["Busser",[
   ["Dalton","OFF","","5","5","","","OFF"],
   ["Barbie","4","4","4","4","4","","OFF"],
   ["LUCAS","","","","","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"Two printings of this week exist; this is the fuller one.", src:"IMG_5802.PNG"
},
{
 week:"Week of 5/13 – 5/19, 2026", year:2026, start:"2026-05-13",
 days:[["5/13","We"],["5/14","Th"],["5/15","Fr"],["5/16","Sa"],["5/17","Su"],["5/18","Mo"],["5/19","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","ON","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","1","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","3","330","330","","","3MGR"],
   ["Chad","","3 BD","330","3MGR","3","345",""],
   ["Hunter","345","3 BD","330","330","OFF","OFF","345"],
   ["Diana","","3","330","330","RO","","345"],
   ["MorganB","345","3 BD","RO","RO","3","",""],
   ["Calista","3 BAR","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","","3 BD","330","330","3","345",""]
  ],["82","43","60","117","16","17","12"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","330","RO","330","3","","345"],
   ["Morgan W","","330 BD","330","RO","3","345","OFF"],
   ["Evan","OFF","330 BD","330","330","RO","345","OFF"],
   ["Erin","345","RO","330","330","OFF","","OFF"],
   ["J Fox","345","330","330","330","3","",""],
   ["D","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Meagan","","330 BD","330","RO","RO","345","345"],
   ["Chantz","","330 BD","330","330","3","","345"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","4","","","3"],
   ["Christian","","4","5","430","3","3",""],
   ["Eleisia","OFF","RO","OFF","5","OFF","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","4","4","5","RO","",""],
   ["Stormie","4","","4","","","4",""],
   ["Taylor","OFF","4","","4","4","","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Kalie","RO","5","RO","OFF","4","RO","OFF"],
   ["Violette","","430","430","430","","",""],
   ["Ari","","4","RO","RO","RO","","5"],
   ["Mackenzie","5","OFF","5","430","","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","5 Busser","","5 Busser","OFF","OFF","5 Busser"],
   ["Jackson","5","4","5","430","4","",""],
   ["Tristin","","5","430","530 BarBack","RO","OFF","5"],
   ["Jon","5","OFF","OFF","5","","","OFF"],
   ["Caidyn","","4","5","5","","5",""]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","5","RO","","4","OFF"],
   ["Barbie","4","OFF","4","4","4","4 Back","OFF"],
   ["LUCAS","","","","","","",""],
   ["Drew","","","RO","RO","RO","RO",""]
  ]]
 ],
 note:"", src:"IMG_5804.PNG"
},
{
 week:"Week of 5/6 – 5/12, 2026", year:2026, start:"2026-05-06",
 days:[["5/6","We"],["5/7","Th"],["5/8","Fr"],["5/9","Sa"],["5/10","Su"],["5/11","Mo"],["5/12","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","ON","","OFF"],
   ["Mike","","1","3","3","1","1",""],
   ["CJ","1","","1","1","11","","1"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","345","330","330","9..3","","3MGR"],
   ["Chad","","345","330","3MGR","9..3","345",""],
   ["Hunter","345","OFF","330","330","OFF","OFF","345"],
   ["Diana","345","345","330","330","9..3","","345"],
   ["MorganB","RO","RO","330","330","9..3","",""],
   ["Calista","345","3 Bar","330","330","2","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","","345","330","330","9..3","345",""]
  ],["82","43","60","117","16","17","12"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330","9..3","","345"],
   ["Morgan W","345","345","RO","330","9..3","345","OFF"],
   ["Evan","OFF","OFF","330","330","9..3","345","OFF"],
   ["Erin","345","345","330","330","OFF","","OFF"],
   ["J Fox","","345","330","330","2","",""],
   ["D","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Meagan","","345","330","330","2","345","345"],
   ["Chantz","","","330","330","9 OC / 3","","345"]
  ]],
  ["Bar",[
   ["Krista","","3","3","5","830","","3"],
   ["Christian","3","","5","3","11","3","5"],
   ["Brittany","","","","","","",""],
   ["Eleisia","OFF","5","OFF","RO","","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","4","",""],
   ["Stormie","4","","4","","OC","",""],
   ["Taylor","OFF","4","RO","RO","","4","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","9","4","OFF"],
   ["Kalie","RO","RO","RO","OFF","RO","RO","OFF"],
   ["Koryn","","RO","","5","11","","OFF"],
   ["Ari","","5","5","5","5","","RO"],
   ["Mackenzie","5","OFF","5","430 Busser","4","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","5 Busser","","5 Busser","OFF","OFF",""],
   ["Jackson","5","","5","430","11","5",""],
   ["Tristin","4 Buss","5","530 Barback","RO","4","OFF","5"],
   ["Jon","5","OFF","430","5","12 FR / 530 Buss","","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Dalton","OFF","4","5","RO","5","4","OFF"],
   ["Barbie","","OFF","4","4","9","4 Back","4"],
   ["LUCAS","","","","","","",""],
   ["Drew","RO","","","RO","4","",""]
  ]]
 ],
 note:"This is the revised printing; the first copy had different Sunday values.", src:"IMG_5806.PNG"
},
{
 week:"Week of 4/29 – 5/5, 2026", year:2026, start:"2026-04-29",
 days:[["4/29","We"],["4/30","Th"],["5/1","Fr"],["5/2","Sa"],["5/3","Su"],["5/4","Mo"],["5/5","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","1","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","345","330","330","","","3MGR"],
   ["Chad","","345","330","3 MGR","3","345",""],
   ["Hunter","345","OFF","RO","330","OFF","OFF","345"],
   ["Diana","345","","330","330","","","345"],
   ["MorganB","345","345","330","330","RO","RO","RO"],
   ["Calista","","345","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","345","345"],
   ["Fabian","345","","330","3 Joes","3","345",""]
  ],["82","43","60","117","16","17","12"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","RO","RO","3","","345"],
   ["Morgan W","345","345","330","330","","345","OFF"],
   ["Evan","OFF","OFF","330","330 Prime","","345","OFF"],
   ["Erin","345","345","330","330","OFF","",""],
   ["Katie","","","330","330","","",""],
   ["J Fox","","345","330","3 Lucas","3","",""],
   ["D","OFF","RO","330","330","3","4 expo","OFF"],
   ["Meagan","","345","RO","3 Joes","","345","345"],
   ["Chantz","RO","RO","RO","RO","RO","","345"]
  ]],
  ["Bar",[
   ["Krista","","3","3","5","3","","3"],
   ["Christian","3","","5","","","3","5"],
   ["Brittany","5","","4","3","5","",""],
   ["Eleisia","OFF","5","OFF","4","","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","4","",""],
   ["Stormie","4","","4","","","",""],
   ["Taylor","OFF","4","","4","","4","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","","","","","","",""],
   ["Kalie","","5","RO","OFF","RO","RO","OFF"],
   ["Ari","","5","RO","RO","RO","","5"],
   ["Mackenzie","5","OFF","RO","4","4","5","OFF"],
   ["AUDRINA","","OFF","","RO","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","5 Busser","RO","RO","OFF","OFF",""],
   ["Jackson","5","","5","430","","",""],
   ["Tristin","","5","","5 Busser","5","OFF","5"],
   ["Jon","5","OFF","430","5","","5","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","","","","","",""],
   ["Dalton","OFF","4","4","4","","4","OFF"],
   ["Steven","","","","","","",""],
   ["Barbie","4","OFF","4","5","4","4 FR Train","OFF"],
   ["LUCAS","","","","","","",""],
   ["Drew","RO","","","RO","","RO","5"]
  ]]
 ],
 note:"This is the revised printing; an earlier copy had small differences (Hunter RO, D 4 expo, Barbie 4 FR Train).", src:"IMG_5808.PNG"
},
{
 week:"Week of 4/22 – 4/28, 2026", year:2026, start:"2026-04-22",
 days:[["4/22","We"],["4/23","Th"],["4/24","Fr"],["4/25","Sa"],["4/26","Su"],["4/27","Mo"],["4/28","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","1","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","","345","3 MGR","330","","345","345"],
   ["Chad","345","345","330","3 MGR","3","",""],
   ["Hunter","345","OFF","RO","330","OFF","OFF","345"],
   ["Diana","345","","330","330","","","345"],
   ["MorganB","","345","330","330","","345",""],
   ["Calista","","345","RO","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","","345","345"],
   ["Fabian","345","","330","330","3","",""]
  ],["62","43","39","70","28","2","46"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330 Front","330","3","","345"],
   ["Morgan W","345","345","330","330","","345",""],
   ["Evan","OFF","OFF","330","330","","345","OFF"],
   ["Erin","345","","330","330 EXPO","OFF","","345"],
   ["Katie","","","330","330","","345","345"],
   ["J Fox","","345","330","","3","","4 expo"],
   ["D","OFF","345","","330","3","4 expo","OFF"],
   ["Meagan","","345","330","330","","","345"],
   ["Chantz","345","","4 expo","330","","","345"]
  ]],
  ["Bar",[
   ["Krista","","3","3","5","3","","3"],
   ["Christian","3","","4","","","3","5"],
   ["Brittany","5","","3","3","5","",""],
   ["Eleisia","OFF","5","OFF","4","","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","RO","4","4","RO","",""],
   ["Stormie","4","","","","4","",""],
   ["Taylor","OFF","4","","","","4","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","","","5","4 bus","","","4"],
   ["Kalie","","5","RO","OFF","3","","OFF"],
   ["Ari","","5","","RO","","","5"],
   ["Mackenzie","5","OFF","5","4","RO","5","OFF"],
   ["AUDRINA","","","","RO","","",""]
  ]],
  ["Expo",[
   ["CARTER","","","5","5","OFF","OFF",""],
   ["Jackson","4","","5","5","","",""],
   ["Tristin","","5","","","4 expo","OFF","4"],
   ["Jon","4","OFF","","","","4",""],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","5","4","","","4"],
   ["Dalton","OFF","4","4","","","4","OFF"],
   ["Steven","","","","","","",""],
   ["Barbie","4","OFF","4","5","4","4 FR Train","OFF"],
   ["LUCAS","","","","","","",""],
   ["Drew","RO","5","RO","","","","5"]
  ]]
 ],
 note:"", src:"IMG_5809.PNG"
},
{
 week:"Week of 4/15 – 4/21, 2026", year:2026, start:"2026-04-15",
 days:[["4/15","We"],["4/16","Th"],["4/17","Fr"],["4/18","Sa"],["4/19","Su"],["4/20","Mo"],["4/21","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","ON","","","OFF"],
   ["Mike","1","1","3","3","","1",""],
   ["CJ","","1","1","1","1","","1"]
  ]],
  ["BQTs",[
   ["Gavin","","330 BQT","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","","430 CURRY","3 MGR","330","","345","345"],
   ["Chad","4","330 SMOCK","330","330","3","",""],
   ["Hunter","4","OFF","330","330","OFF","OFF","345"],
   ["Diana","4","345","330","330","","",""],
   ["MorganB","","345","330","330","RO","345",""],
   ["Calista","","345","330","","3","OFF","OFF"],
   ["Nathan","OFF","OFF","","330","OFF","345","345"],
   ["Fabian","","430 CURRY","330","330","3","",""]
  ],["","50..70..12","","","","",""]],
  ["Backs",[
   ["Lupe","","330 SMOCK","","","","",""],
   ["Alex","","430 CURRY","","330","3","","345"],
   ["Morgan W","","345","330","","","345","OFF"],
   ["Evan","OFF","OFF","330","330","","345","OFF"],
   ["Erin","4","4 fr","330","330","OFF","",""],
   ["Katie","","345 CK","330","","","345",""],
   ["J Fox","","345","330","","3","","4 expo"],
   ["D","OFF","345","","330","3","4 expo","OFF"],
   ["Meagan","","330 SMOCK","4 fr","330","","","345"],
   ["Chantz","4","4 expo","4 expo","330","","","345"]
  ]],
  ["Bar",[
   ["Krista","RO","RO","RO","RO","RO","3","3"],
   ["Christian","3","3","4","3","","","5"],
   ["Brittany","5","","3","4","","5",""],
   ["Eleisia","OFF","5","OFF","5","3","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","RO","4","","330","",""],
   ["Stormie","4","","","","4","",""],
   ["Taylor","OFF","RO","4","4","RO","4","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","","4 Buss","5","4 bus","3","","4"],
   ["Kalie","","5","","OFF","","RO","OFF"],
   ["Ari","","5","","5","","","5"],
   ["Mackenzie","5","OFF","5","4","","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","","5","5","OFF","OFF",""],
   ["Jackson","4","","5","5","","",""],
   ["Tristin","","5","","","4 expo","OFF","4"],
   ["Jon","4","OFF","","","","4","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","5","4","","","4"],
   ["Dalton","OFF","4","4","","3","4","OFF"],
   ["Steven","5","","","","","",""],
   ["Barbie","4","OFF","4","5","","4 FR Train","OFF"],
   ["LUCAS","","","","","","",""],
   ["Drew","RO","5","","","","","5"]
  ]]
 ],
 note:"Sheet was taped and warped — read best-effort.", src:"IMG_5810.PNG"
},
{
 week:"Week of 4/8 – 4/14, 2026", year:2026, start:"2026-04-08",
 days:[["4/8","We"],["4/9","Th"],["4/10","Fr"],["4/11","Sa"],["4/12","Su"],["4/13","Mo"],["4/14","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","on","","","OFF"],
   ["Mike","1","1","3","3","","","1"],
   ["CJ","","3","1","1","1","1",""]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ],["40@6","50@4","21@6","50@4","","",""]],
  ["Fronts",[
   ["Alexis","manage 3","330","330","330","","330",""],
   ["Chad","330","330","ro","330","3","","330"],
   ["Hunter","330","OFF","330","330","OFF","OFF","330"],
   ["Diana","330","330","330","ro","ro","","ro"],
   ["MorganB","","330","330","330","3","",""],
   ["Calista","330","","330","330","ro","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["Fabian","330","330","330","ro","3","330",""]
  ]],
  ["Backs",[
   ["Lupe","","","","330 front","","",""],
   ["Alex","330","330","330","330","","",""],
   ["Morgan W","","330","330","330","","330","OFF"],
   ["Evan","OFF","OFF","330","330","3","330","OFF"],
   ["Erin","330","330","330","330","OFF","",""],
   ["Katie","","","330","330","","330",""],
   ["J Fox","330","4 expo","330","4 expo","","","330"],
   ["D","OFF","330","330","330","3","","OFF"],
   ["Meagan","330","","4 food run","330","3","","330"],
   ["Chantz","4 expo","","330","330","","","330"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","ro","","","3"],
   ["Christian","5","","5","3","","5",""],
   ["Brittany","","","4","4","","3","5"],
   ["Eleisia","OFF","5","ro","5","3","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","330","","330","330","330","",""],
   ["Stormie","3:30 Train","","3:30","","3","",""],
   ["Taylor","OFF","330","330","ro","ro","330","330"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","","4","4 bus","330","","","4"],
   ["Kalie","","5","5","OFF","","","OFF"],
   ["Ari","5","ro","5","ro","ro","",""],
   ["Mackenzie","","OFF","","5","3","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","5","5","5","5","OFF","OFF",""],
   ["Jackson","","","5","5","3","4",""],
   ["Tristin","","","ro","","","5","4"],
   ["Jon","","OFF","5","5","4","","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","4","330","","","4"],
   ["Dalton","OFF","5","5","5","","","OFF"],
   ["Steven","","","","","","",""],
   ["Barbie","4","OFF","4","4","3","4","OFF"],
   ["Paul","5","","","5","","","5"],
   ["LUCAS","","","","","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5811.PNG"
},
{
 week:"Week of 4/1 – 4/7, 2026", year:2026, start:"2026-04-01",
 days:[["4/1","We"],["4/2","Th"],["4/3","Fr"],["4/4","Sa"],["4/5","Su"],["4/6","Mo"],["4/7","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","ON","ON","","","OFF"],
   ["Mike","1","1","3","1","1","",""],
   ["CJ","","3","1","3","","1","1"]
  ]],
  ["BQTs",[
   ["Gavin","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","MANAGE 3","330","330","330","9..3","","330"],
   ["Chad","330","","330","330","9","330",""],
   ["Hunter","330","OFF","330","330","OFF","OFF","330"],
   ["Diana","","","330","330","2","330",""],
   ["MorganB","","330","RO","330","2","",""],
   ["Callista","","","330","330","9","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["DW","330","330","OFF","OFF","OFF","OFF","OFF"],
   ["Fabian","330","330","330","330","9","",""]
  ],["20","14","45","27","72/19","38","13"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","330","","330","330","9","","330"],
   ["Morgan W","330","","330","330","9","","OFF"],
   ["Evan","OFF","OFF","330","330","2","330","OFF"],
   ["Erin","","330","330","330","OFF","330","OFF"],
   ["Kate","330 CK","","330","330","9","",""],
   ["J Fox","","330","330","330","9","",""],
   ["D","OFF","RO","RO","RO","2","330","OFF"],
   ["Meagan","","4 EXPO","330","330","2","","330"],
   ["Chantz","4 EXPO","","330","330","9 EXPO","","330"]
  ]],
  ["Bar",[
   ["Krista","","3","3","3","830","","ON CALL"],
   ["Christian","3","3","5","","11","3",""],
   ["Brittany","5","330 CK","4","5","","","3"],
   ["Eleisia","OFF","5","","4","2","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","","","330","330","3","330",""],
   ["Taylor","OFF","RO","RO","RO","RO","RO","330"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Violette","","4","4 BUS","445","9","","4"],
   ["Kalie","","5","5","OFF","","","OFF"],
   ["Ari","5","","","5","330","RO","5"],
   ["Mckenzie","","OFF","5","RO","11","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","","5","5","5","OFF","OFF",""],
   ["Jackson","RO","RO","RO","4","11","4","4"],
   ["Tristin","5","","4","","4","","5"],
   ["John","","OFF","","5","12","5","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","4","445","9","","4"],
   ["Dalton","OFF","5","","5","2","5","OFF"],
   ["Steven","","","","","","",""],
   ["Barbie","4","OFF","4","4","9","4","OFF"],
   ["Paul","5","","","","11","","5"],
   ["LUCAS","","","","","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"Two photos of this week exist — identical, so one copy kept.", src:"IMG_5812.PNG"
},
{
 week:"Week of 3/25 – 3/31, 2026", year:2026, start:"2026-03-25",
 days:[["3/25","We"],["3/26","Th"],["3/27","Fr"],["3/28","Sa"],["3/29","Su"],["3/30","Mo"],["3/31","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","on","","","OFF"],
   ["Mike","RO","RO","RO","RO","RO","RO","RO"],
   ["CJ","1","1","1","1","1","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","manage","manage","","",""]
  ],["75","20","61","74","20","4","6"]],
  ["Fronts",[
   ["Alexis","330","Manage 3","330","330","","Manage 1",""],
   ["Chad","","330","330","330","3","","Manage 1"],
   ["Hunter","330","OFF","330","330","OFF","OFF","330"],
   ["Diana","","330","330","330","3","330","330"],
   ["MorganB","330","RO","RO","RO","RO","RO","RO"],
   ["Callista","330","RO","RO","RO","RO","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","RO"],
   ["DW","330","330","OFF","OFF","OFF","OFF","OFF"],
   ["Fabian","","330","330","330","3","330","330"]
  ]],
  ["Backs",[
   ["Lupe","","","4 Front","430 Front","","",""],
   ["Alex","330","330","330","330 Solo","","330","RO"],
   ["Morgan W","330","","RO","330","3","330","OFF"],
   ["Evan","OFF","OFF","330","330","3","ro","OFF"],
   ["Erin","330","330","330","330","OFF","",""],
   ["Kate","","330FR","330 Solo","330","","330","330"],
   ["J Fox","","","330","4 Expo","3","3 expo","330"],
   ["D","OFF","330","330","330","3 FR","","OFF"],
   ["Meagan","330","","330","330 FR","","","330"],
   ["Chantz","330","330","330 EXPO","330","3 Expo","330",""]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","","5"],
   ["Christian","on call serve","","","5","3","3","3"],
   ["Brittany","5","","4","4","","5",""],
   ["Eleisia","OFF","5","5","RO","","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","RO","RO","4","4","4","4"],
   ["Taylor","OFF","4","4","RO","RO","RO","RO"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","RO","RO","RO","RO","RO","RO","RO"],
   ["Kalie","RO","RO","RO","OFF","5","5","OFF"],
   ["Ari","5","4","5","5","RO","RO","5"],
   ["Mckenzie","","OFF","430","430","4","","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","RO","RO","RO","RO","OFF","OFF","4"],
   ["Jackson","RO","RO","RO","RO","ro","ro",""],
   ["Tristin","4","","4","4","","","OFF"],
   ["John","","OFF","4","","4","4","OFF"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","4 Bar Back","4","","","4"],
   ["Dalton","OFF","5","4","4 Bar Back","","5","OFF"],
   ["Steven","","","","5","","","5"],
   ["Barbie","4","OFF","4","4","3","4","OFF"],
   ["Paul","5","","5 polish","5 polish","oc","",""],
   ["LUCAS","","","","","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"Two printings of this week exist; this is the fuller one.", src:"IMG_5815.PNG"
},
{
 week:"Week of 3/18 – 3/24, 2026", year:2026, start:"2026-03-18",
 days:[["3/18","We"],["3/19","Th"],["3/20","Fr"],["3/21","Sa"],["3/22","Su"],["3/23","Mo"],["3/24","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","3","","1","3","","1","1"],
   ["CJ","1","1","3","1","1","",""]
  ]],
  ["BQTs",[
   ["Gavin","","","manage","manage","","",""]
  ],["60","15","","","","",""]],
  ["Fronts",[
   ["Alexis","330","manage 3","330","330","","330",""],
   ["Chad","5 bqt","330","330","330","","","manage 3"],
   ["Hunter","ro","OFF","330","330","OFF","OFF","330"],
   ["Dianna","330","","330","330","3","330",""],
   ["MorganB","","330","330","330","","","330"],
   ["Callista","","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["DW","330","330","OFF","OFF","OFF","OFF","OFF"],
   ["Fabian","5 bqt","","330","330","3","","330 back"]
  ]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","","","330","330","3","330",""],
   ["Morgan W","5 bqt","","330","330","","330","OFF"],
   ["Evan","OFF","OFF","ro","ro","ro","ro","OFF"],
   ["Erin","330","330","330","330","OFF","",""],
   ["Kate","","","330","330","3","4 cktail","330"],
   ["J Fox","","","330","4 fr","3","3 expo","330"],
   ["D","OFF","330","330","330","","","OFF"],
   ["Megan","330","","330","330","3 fr","","330"],
   ["Chantz","330","330","4 fr","330","","330",""]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","",""],
   ["Christian","on call serve","","5","4","","3","3"],
   ["Brittany","5","","4","","","5","5"],
   ["Eleisia","OFF","5","OFF","5","3","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","4","",""],
   ["Taylor","OFF","4","4","4","","","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4",""],
   ["Violette","","4","4 bus","4","3","","4"],
   ["Kalie","","5","430","OFF","ro","ro","OFF"],
   ["Ari","5","","5","5","","","5"],
   ["Mckenzie","ro","OFF","ro","ro","","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","4","4","ro","ro","OFF","OFF","4"],
   ["Jackson","5","5","4","4","ro","ro",""],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","","4","4 bar back","4","","","4"],
   ["Dalton","OFF","5","4","ro","","5","OFF"],
   ["Steven","","","","5","","","5"],
   ["Barbie","4","OFF","4","4","3","4","OFF"],
   ["Paul","5","","5 polish","5 polish","oc","",""],
   ["LUCAS","","","","","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5816.PNG"
},
{
 week:"Week of 3/11 – 3/17, 2026", year:2026, start:"2026-03-11",
 days:[["3/11","We"],["3/12","Th"],["3/13","Fr"],["3/14","Sa"],["3/15","Su"],["3/16","Mo"],["3/17","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","","3","1","1","1","","1"],
   ["CJ","1","1","RO","RO","RO","1","3"]
  ]],
  ["BQTs",[

  ],["56","76","49","70","25","18","21"]],
  ["Fronts",[
   ["Alexis","330","330","330","3 Manage","","","330"],
   ["Chad","","330","3 manage","330","RO","330","330"],
   ["Hunter","RO","OFF","RO","RO","OFF","OFF","RO"],
   ["Dianna","330","","330","330","3","330",""],
   ["MorganB","330","330","330","330","","",""],
   ["Callista","330","","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["DW","","330","","","3","",""],
   ["Fabian","RO","RO","RO","RO","RO","330","330"]
  ]],
  ["Backs",[
   ["Lupe","","","4 Front","","","",""],
   ["Alex","330","","330","330","3","330",""],
   ["Morgan W","330","330","RO","RO","3","","OFF"],
   ["Evan","OFF","OFF","330","330","3","330","OFF"],
   ["Erin","","330","330","330","OFF","330","OFF"],
   ["Kate","","330","330","330 Front","3 FR","","330"],
   ["J Fox","330","","330","330 FR","","","330"],
   ["D","OFF","330 FR","330","330","","330","OFF"],
   ["Megan","330","330","330 FR","330","","","330"],
   ["Chantz","330 FR","","330","330","","","330"]
  ]],
  ["Bar",[
   ["Krista","RO","3","3","3","3","3",""],
   ["Christian","3","","4","5","5","5","3"],
   ["Brittany","5","","5","","","",""],
   ["Eleisia","OFF","5","OFF","4","RO","OFF","OFF"]
  ]],
  ["Cktail",[
   ["Jenny","330","","","330","RO","3","330"],
   ["Taylor","OFF","330","330","330","","","OFF"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","","4","4 BUS","4","","4","4"],
   ["Kalie","5","RO","","OFF","","3","OFF"],
   ["Ari","","5","5","5","5","RO",""],
   ["Mckenzie","","OFF","445","RO","RO","OFF","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","4","4","4","4","OFF","OFF",""],
   ["Jackson","","","5","5","3","4","4"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","4","4","4","5 Barback","","",""],
   ["Dalton","OFF","5","5 Barback","1","","4","OFF"],
   ["Steven","5","","4","5","","",""],
   ["Barbie","OFF","OFF","5 POLISH","4","4","4","4"],
   ["Paul","","","","5 POLISH","","","5"],
   ["LUCAS","","","5","RO","","",""],
   ["Drew","","","","","","",""]
  ]]
 ],
 note:"", src:"IMG_5817.PNG"
},
{
 week:"Week of 3/4 – 3/10, 2026", year:2026, start:"2026-03-04",
 days:[["3/4","We"],["3/5","Th"],["3/6","Fr"],["3/7","Sa"],["3/8","Su"],["3/9","Mo"],["3/10","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","","","","","OFF"],
   ["Mike","1","","3","1","","1","1"],
   ["CJ","3","1","1","3","1","",""]
  ]],
  ["BQTs",[

  ],["40","56","","1 PM 50","","30","30"]],
  ["Fronts",[
   ["Alexis","RO","RO","330","12-3?","","330","Manage"],
   ["Chad","RO","330","330","12-3?","3","3 MANAGE","330"],
   ["Hunter","330","OFF","330","RO","OFF","OFF","RO"],
   ["Dianna","330","","RO","RO","RO","330","RO"],
   ["MorganB","","","330","330","3","","330"],
   ["Callista","","330","330","330","3","OFF","OFF"],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["DW","","","","","","",""],
   ["Fabian","330","330","330","330","RO","RO","RO"]
  ]],
  ["Backs",[
   ["Lupe","","","","330","","","330 FRONT"],
   ["Alex","330","","330","330","3","330",""],
   ["Morgan W","330","330","330","330","3","","OFF"],
   ["Evan","OFF","OFF","330","330","","330","OFF"],
   ["Erin","","330","330","330","OFF","330","OFF"],
   ["Kate","","330","330","330","","","330"],
   ["J Fox","330","","3 LUCAS","330","","","330"],
   ["D","OFF","330 FR","330","330","3","330","OFF"],
   ["Megan","","330","3 LUCAS","330","","330 FR.","330"],
   ["Chantz","330 FR","","330","330","","","330 FR"]
  ]],
  ["Bar",[
   ["Krista","RO","3","3","3","","3",""],
   ["Christian","3","","3 LUCAS","5","3","","3"],
   ["Brittany","5","","4","","OFF","5",""],
   ["Eleisia","RO","5","OFF","4","","","5"]
  ]],
  ["Cktail",[
   ["Jenny","330","","RO","330","3","3",""],
   ["Taylor","OFF","330","330","330","","","330"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","","4","OFF"],
   ["Violette","","4","4 BUS","4","","","4"],
   ["Kalie","5","RO","","OFF","4","","OFF"],
   ["Ari","","5","5","","3","",""],
   ["Mckenzie","","OFF","445","5","","5","OFF"],
   ["AUDRINA","","OFF","","","","","OFF"]
  ]],
  ["Expo",[
   ["CARTER","4","4","4","4","OFF","OFF","OFF"],
   ["Jackson","","","5","5","3","4","4"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","4","4","4","4","","",""],
   ["Dalton","OFF","5","5 Barback","1","","4","OFF"],
   ["Steven","5","","","","","",""],
   ["Barbie","OFF","OFF","4","4","4","4","4"],
   ["Paul","","","5 POLISH","5 POLISH","","","5"],
   ["LUCAS","","","","","","",""],
   ["Drew","RO","","5","RO","","",""]
  ]]
 ],
 note:"", src:"IMG_5818.PNG"
},
{
 week:"Week of 2/25 – 3/3, 2026", year:2026, start:"2026-02-25",
 days:[["2/25","We"],["2/26","Th"],["2/27","Fr"],["2/28","Sa"],["3/1","Su"],["3/2","Mo"],["3/3","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","","","","OFF"],
   ["Mike","1","1","1","3","","","1"],
   ["CJ","3","","3","1","1","1",""]
  ]],
  ["BQTs",[

  ],["","","","gavin 3","","",""]],
  ["Fronts",[
   ["Alexis","330","330","RO","330","","330","1230/mng 3"],
   ["Chad","330","330","330","330","3","","OFF"],
   ["Hunter","330","OFF","330","330","OFF","","330"],
   ["Dianna","1030","","330","330","","","330"],
   ["MorganB","","RO","330","330","3","",""],
   ["Callista","","","330","330","","OFF","OFF"],
   ["Nathan","OFF","OFF","RO","RO","OFF","",""],
   ["DW","","330","330","330","3","330",""],
   ["Jen E","330","","3:30","330","","","330"],
   ["Fabian","","","","330","","330","330"]
  ],["45/45","2","44","118","11","34","86"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","RO","330","330","330","","","1230"],
   ["Brent","","","","330","","",""],
   ["Morgan W","330","330","330","330","","330","OFF"],
   ["Evan","OFF","OFF","330","330","3","","OFF"],
   ["Erin","330","330","330","330 lucas","OFF","RO",""],
   ["Kate","1030","","330","330","4 ck","","330"],
   ["J Fox","330","","330 expo","330","","","330"],
   ["D","OFF","OFF","330","330","3","330","OFF"],
   ["Megan","330","","330","330 lucas","3","","330"],
   ["Chantz","330 expo","expo","330","330 expo","","330",""]
  ]],
  ["Bar",[
   ["Krista","RO","RO","RO","RO","RO","RO",""],
   ["Spencer","3","","4","5","","5","5"],
   ["Christian","5","","3","RO","3","3",""],
   ["Brittany","","3","5","3","OFF","","3"],
   ["Eleisia","","5","","4","","",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","RO","4",""],
   ["Taylor","OFF","4","4","RO","RO","on call","4"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","4","OFF"],
   ["Violette","4 bus","4","","4 bus","OFF","","4"],
   ["Kalie","","5","5","OFF","","5",""],
   ["Ari","5","","RO","4","","",""],
   ["Mckenzie","","OFF","5","5","330","","OFF"],
   ["AUDRINA","","OFF?","OFF?","","","",""]
  ]],
  ["Expo",[
   ["CARTER","","","430","430","OFF","OFF",""],
   ["Jackson","","","RO","RO","","",""],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","4","4","RO","5","","4",""],
   ["Dalton","OFF","5","5","","","",""],
   ["Steven","","OFF","4","4","3","5","4"],
   ["Barbie","OFF","","5","5polish","","",""],
   ["Paul","","","","3","","",""],
   ["LUCAS","","","RO","RO","","",""],
   ["Drew","RO","","","","","",""]
  ],["","","","4","","4 expo",""]]
 ],
 note:"From a texted screenshot — a few rows near the bottom read best-effort.", src:"IMG_5819.PNG"
},
{
 week:"Week of 2/18 – 2/24, 2026", year:2026, start:"2026-02-18",
 days:[["2/18","We"],["2/19","Th"],["2/20","Fr"],["2/21","Sa"],["2/22","Su"],["2/23","Mo"],["2/24","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","on","","","OFF"],
   ["Mike","1","1","3","1","","","1"],
   ["CJ","","","1","3","1","1","3"]
  ]],
  ["BQTs",[

  ]],
  ["Fronts",[
   ["Alexis","","manage","330","330","","330","330"],
   ["Chad","330","330","330","330","3","Manage","OFF"],
   ["Hunter","330","OFF","330","330","OFF","","330"],
   ["Dianna","ro","ro","ro","330","","ro","ro"],
   ["MorganB","","","330","330","","330",""],
   ["Callista","330","330","ro","ro","ro","OFF",""],
   ["Jen E","","330","330","330","3","","ro"],
   ["Nathan","OFF","OFF","330","330","OFF","330",""],
   ["DW","","330","330","330","3","","330"]
  ],["22","24","43","166","11","25","34"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","330","","330","330","","330","ro"],
   ["Fabian","","330","330 front","ro","","","330 front"],
   ["Brent","","","","330","","","4 Expo"],
   ["Morgan W","330","","330","330","3","","OFF"],
   ["Evan","OFF","OFF","330","330","3","","OFF"],
   ["Erin","","330","330","330","OFF","","330"],
   ["Kate","","","330","330","3","",""],
   ["J Fox","330","4 expo","330","330","","",""],
   ["D","OFF","OFF","330","ro","330","","330"],
   ["Megan","","330","330","lucas 3","","","330"],
   ["Chantz","","","4 expo","lucas 3","","",""]
  ]],
  ["Bar",[
   ["Krista","","3","3","3","","",""],
   ["Spencer","","","","330","","","5"],
   ["Christian","3","","4","ro","","3","3"],
   ["Brittany","5","","5","lucas 3","OFF","","4 cktail"],
   ["Eleisia","","5","","5","","",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","4","","","4"],
   ["Taylor","OFF","4","4","4","3","","on call"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","11","OFF","","OFF"],
   ["Violette","4 bus","4","","4","","","4"],
   ["Kalie","5","5","","OFF","OFF","","4"],
   ["Ari","ro","ro","430","","","",""],
   ["Mckenzie","","OFF","5","","","4","5"],
   ["AUDRINA","","","","5","","",""]
  ]],
  ["Expo",[
   ["CARTER","4 Train","4 Train","5","5","OFF","",""],
   ["Jackson","4","4","4","4","3","OFF","4"],
   ["Caidyn","","","","","","",""]
  ]],
  ["Busser",[
   ["Caleb","4","","","4","","",""],
   ["Dalton","OFF","4","5","5","","","4"],
   ["Steven","","","","","","OFF",""],
   ["Barbie","OFF","","4","4","3","4","5"],
   ["Paul","","4","4","5","","",""],
   ["LUCAS","","","","","","",""],
   ["Drew","ro","","","ro","","ro",""]
  ]]
 ],
 note:"From a texted screenshot — a few rows near the bottom read best-effort.", src:"IMG_5820.PNG"
},
{
 week:"Week of 2/11 – 2/17, 2026", year:2026, start:"2026-02-11",
 days:[["2/11","We"],["2/12","Th"],["2/13","Fr"],["2/14","Sa"],["2/15","Su"],["2/16","Mo"],["2/17","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","on","ON","","OFF"],
   ["Mike","3","1","1","3","","","1"],
   ["CJ","1","OC","3","11","1","1",""]
  ]],
  ["BQTs",[
   ["","34","81","324","557/94","121","8","18"]
  ],["","","GAVIN","GAVIN","GAVIN","",""]],
  ["Fronts",[
   ["Alexis","","MANAGE","230","10 DBL","230","330","330"],
   ["Chad","330","330","230","130","230","330","OFF"],
   ["Hunter","330","OFF","230","10 DBL","OFF","OFF",""],
   ["Dianna","","330","230","10 DBL","230","330","RO"],
   ["MorganB","","330","230","130","230","",""],
   ["Callista","330","330","230","130","230","OFF","OFF"],
   ["Jen E","","ON CALL","230","10:00 AM","230","OFF",""],
   ["Nathan","OFF","OFF","230","130","OFF","330","330"],
   ["DW","","330","230","130","230","","330"]
  ]],
  ["Backs",[
   ["Lupe","","","230","130","","",""],
   ["Alex","","330","230","130","230","","330"],
   ["Fabian","","330 FRONT","230","130","230","","330"],
   ["Brent","","","230","10:00 AM","230","",""],
   ["Morgan W","330","330","230","130","RO","330","OFF"],
   ["Evan","OFF","OFF","230","130","230","330","OFF"],
   ["Erin","330","330","230","10 DBL","OFF","330","OFF"],
   ["Kate","330","","230","130","230","330 CK",""],
   ["J Fox","","330","230","10 SERVE 3 FR","230","3 EXPO",""],
   ["D","OFF","330","230","10 SERVE/3FR","230","",""],
   ["Megan","","FOOD RUN 4","230","130 AUX","230","","330"]
  ]],
  ["Bar",[
   ["Krista","","3","12","10","4 TO 8","",""],
   ["Spencer","5","","4","2","5","","3"],
   ["Christian","","5","2","4","2","3",""],
   ["Brittany","3","","3 FOOD RUN","12","OFF","5",""],
   ["Eleisia","","","4","4","","","5"]
  ]],
  ["Cktail",[
   ["Jenny","4","4","4","3","230","",""],
   ["Taylor","OFF","330","4","3","230","","330"],
   ["Jess","","","","OFF","","",""]
  ]],
  ["Host",[
   ["Lilian","5","OFF","4","11","OFF","4","OFF"],
   ["Violette","4","4 BUS","4 BUS","2 BUS","3","",""],
   ["Kalie","","4","","OFF","4","","OFF"],
   ["Ari","RO","4","","230","RO","RO","4"],
   ["Mckenzie","","OFF","5","3","4","","OFF"],
   ["AUDRINA","","OFF","","3","","","OFF"]
  ]],
  ["Expo",[
   ["Miguel H","","","ON","ON","","",""],
   ["Guy","","3","3","12","2","","3"],
   ["Jackson","4","4","4","3","3","",""],
   ["Caidyn","","4","3","3","3","","5"]
  ]],
  ["Busser",[
   ["Caleb","4","4","4","2","3","",""],
   ["Dalton","OFF","4","4","11","4","","OFF"],
   ["Steven","","","4","3","","",""],
   ["Barbie","OFF","OFF","3","3","4","4","4"],
   ["Paul","","5","4","3","","","5"],
   ["LUCAS","","","","3","ON","",""],
   ["Drew","","","RO","RO","RO","",""]
  ]]
 ],
 note:"", src:"IMG_5821.PNG"
},
{
 week:"Week of 2/4 – 2/10, 2026", year:2026, start:"2026-02-04",
 days:[["2/4","We"],["2/5","Th"],["2/6","Fr"],["2/7","Sa"],["2/8","Su"],["2/9","Mo"],["2/10","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","","on","on","","","OFF"],
   ["Mike","3","1","3","1","","","1"],
   ["CJ","1","","1","3","1","1",""]
  ]],
  ["BQTs",[
   ["","28","60","35","67","25","","14"]
  ]],
  ["Fronts",[
   ["Alexis","330","MANAGE","330","330","","",""],
   ["Chad","","330","330","330","3","330","OFF"],
   ["Hunter","330","OFF","RO","RO","OFF","OFF","330"],
   ["Dianna","","330","330","330","3","330",""],
   ["MorganB","330","330","330","330","RO","RO","RO"],
   ["Callista","","330","330","330","3","OFF","OFF"],
   ["Jen E","","330","330","330","","OFF","330"],
   ["Nathan","OFF","OFF","330","330","OFF","330",""],
   ["DW","330","","330","330","3","","330"]
  ]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","","330","330","330","3","","330"],
   ["Fabian","330","330","330","330","OFF","330",""],
   ["Brent","","","","330","","","330"],
   ["Morgan W","330","","RO","330","3","","OFF"],
   ["Evan","OFF","OFF","330","330","RO","","OFF"],
   ["Erin","330","330","330","","OFF","330","OFF"],
   ["Kate","","330","330","330","OFF","","330"],
   ["J Fox","330","","330","EXPO","3","",""],
   ["D","OFF","","330","330","3","","OFF"],
   ["Megan","","330","FOOD RUN","330","","330",""]
  ]],
  ["Bar",[
   ["Krista","","3","3","3","","","3"],
   ["Spencer","5","","4","","","","5"],
   ["Christian","3","5","","","3","3",""],
   ["Brittany","","","5","4","OFF","5",""],
   ["Eleisia","","","","5","","",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","","4","","","4"],
   ["Taylor","OFF","4","330","RO","","4","330"],
   ["Jess","","","","OFF","3","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","12","OFF","4","OFF"],
   ["Violette","","4","4 bus","4","","","4"],
   ["Kalie","","5","","OFF","3","","OFF"],
   ["Ari","","ro","5","","ro","",""],
   ["Mckenzie","","OFF","445","5","4","","OFF"]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","4","","4","4","","",""],
   ["Jackson","","5","5","5","330","330",""],
   ["Caidyn","5","","5","5","","","4"]
  ]],
  ["Busser",[
   ["Caleb","","4","4","4","","","5"],
   ["Dalton","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Steven","5","5","","","","",""],
   ["Barbie","OFF","OFF","5","4","4","4","4"],
   ["Paul","4","","polish","5","","",""],
   ["Drew","","","","RO","3","",""]
  ]]
 ],
 note:"", src:"IMG_5822.PNG"
},
{
 week:"Week of 1/28 – 2/3, 2026", year:2026, start:"2026-01-28",
 days:[["1/28","We"],["1/29","Th"],["1/30","Fr"],["1/31","Sa"],["2/1","Su"],["2/2","Mo"],["2/3","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","on","on","on","","","OFF"],
   ["Mike","3","","3","1","","1","1"],
   ["CJ","1","1","1","3","1","",""]
  ]],
  ["BQTs",[
   ["","28","33","108","169","51","8",""]
  ]],
  ["Fronts",[
   ["Alexis","330","330","330","330","","","manage 3"],
   ["Chad","","manage 3","330","330","3","330","OFF"],
   ["Hunter","330","OFF","330","330","OFF","OFF","330"],
   ["Dianna","330","","330","330","3","330",""],
   ["MorganB","330","330","330","330","","oc",""],
   ["Callista","","330","330","oc","3","OFF","OFF"],
   ["Jen E","","","","","","OFF",""],
   ["Nathan","OFF","OFF","330","330","OFF","330","330"],
   ["DW","","330","330","330","3","","330"]
  ]],
  ["Backs",[
   ["Lupe","","","","330","","",""],
   ["Alex","330","","330","330","ro","oc","330"],
   ["Fabian","","330","330","330","OFF","330","330"],
   ["Brent","330","","","","","",""],
   ["Morgan W","330","330","330","330","3","","OFF"],
   ["Evan","OFF","OFF","330","330","3","330","OFF"],
   ["Erin","","","330","330","OFF","",""],
   ["Kate","","330","330","330","OFF","330","330"],
   ["J Fox","330","","expo","330","3","",""],
   ["D","OFF","330","330","ro","3","","OFF"],
   ["Megan","","","330","","","",""]
  ]],
  ["Bar",[
   ["Krista","330","","330","330","","","330"],
   ["Spencer","","330","","430","","330","5"],
   ["Christian","RO","","430","330 back","3","5",""],
   ["Brittany","","5","5","","OFF","",""],
   ["Eleisia","","","","5","","",""]
  ]],
  ["Cktail",[
   ["Jenny","","4","","330","","4","4"],
   ["Taylor","4","330 serve","330","330","","","330 serve"],
   ["Jess","","","330","OFF","3","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","12","OFF","4","OFF"],
   ["Violette","","4","4 bus","4","","","4"],
   ["Kalie","","5","","OFF","3","","OFF"],
   ["Ari","","ro","5","","ro","",""],
   ["Mckenzie","","OFF","445","5","4","","OFF"]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","","","","","","",""],
   ["Jackson","","5","5","5","330","330",""],
   ["Caidyn","4","","5","5","","","4"]
  ]],
  ["Busser",[
   ["Caleb","","4","4","4","","","5"],
   ["Dalton","OFF","OFF","OFF","OFF","OFF","OFF","OFF"],
   ["Steven","5","5","","","","",""],
   ["Barbie","OFF","OFF","5","4","4","4","4"],
   ["Paul","4","","polish","5","","",""],
   ["Drew","","","","polish","3","",""]
  ]]
 ],
 note:"", src:"IMG_5823.PNG"
},
{
 week:"Week of 1/21 – 1/27, 2026", year:2026, start:"2026-01-21",
 days:[["1/21","We"],["1/22","Th"],["1/23","Fr"],["1/24","Sa"],["1/25","Su"],["1/26","Mo"],["1/27","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","on","on","on","","","OFF"],
   ["Mike","1","3","1","3","","1",""],
   ["CJ","3","","3","1","1","","1"]
  ]],
  ["BQTs",[
   ["","50","51","112","160","30","15","24"]
  ]],
  ["Fronts",[
   ["Alexis","345","345","345","345","","","manage 3"],
   ["Chad","","345","345","345","3","345","OFF"],
   ["Hunter","345","OFF","345","345","OFF","OFF","345"],
   ["Dianna","345","","345","345","3","",""],
   ["MorganB","345","","345","345","","",""],
   ["Callista","","345","ro","","ro","OFF","OFF"],
   ["Jen E","","345","345 back","345","oc","OFF","345"],
   ["Nathan","OFF","OFF","345","345","OFF","345","345"],
   ["DW","","","345","345","3","345","345"]
  ]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","345","345","345","3","",""],
   ["Fabian","","345","345","345","OFF","","345"],
   ["Brent","345","","345","345","","","345"],
   ["Morgan W","","345","345","345","3","","OFF"],
   ["Evan","OFF","OFF","345","345","","345","OFF"],
   ["Erin","345","","345","345","OFF","oc","OFF"],
   ["Kate","","","345 expo","345","OFF","345","345"],
   ["J Fox","345","345 expo","","345 expo","","","345"],
   ["D","OFF","345","","","3","345","OFF"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","","","","3"],
   ["Spencer","","5","4","5","","3","5"],
   ["Christian","5","","5","3","3","","RO"],
   ["Brittany","","5","","","3","",""],
   ["Eleisia","","","","4","","",""]
  ]],
  ["Cktail",[
   ["Jenny","","4","","345","","3","4"],
   ["Taylor","345","345","4","ro","","","345"],
   ["Jess","","","345","4","3","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","445","OFF","","OFF"],
   ["Violette","","4","","4","","4","4"],
   ["Ari","5","445","5","","","OFF","OFF"],
   ["Kalie","","5","","5","330","",""],
   ["Audrina","","","","","","",""],
   ["Mckenzie","","OFF","445","","4","","OFF"]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","","","","","","",""],
   ["Jackson","","5","5","5","330","330",""],
   ["Caidyn","","","5","5","","","5"]
  ]],
  ["Busser",[
   ["Dalton","4","","5","5","","",""],
   ["Caleb","","4","5","5(runner)","","",""],
   ["Steven","5","","","","","",""],
   ["Lucas","","","","","","",""],
   ["Barbie","","","4","4","4","4","4"],
   ["Drew","","5","","","","",""],
   ["miguel","","OFF","","5","","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5824.PNG"
},
{
 week:"Week of 1/14 – 1/20, 2026", year:2026, start:"2026-01-14",
 days:[["1/14","We"],["1/15","Th"],["1/16","Fr"],["1/17","Sa"],["1/18","Su"],["1/19","Mo"],["1/20","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","carmel","on","OFF","on","","","OFF"],
   ["Mike","","3","1","3","","1","1"],
   ["CJ","1","1","3","1","1","",""]
  ]],
  ["BQTs",[
   ["","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","345","3","3 manage","3","","","345"],
   ["Chad","","3","330","330","","3","OFF"],
   ["Hunter","345","345","330","330","3","","OFF"],
   ["Dianna","345","345","330","330","","","345"],
   ["MorganB","","","330","3","3","3",""],
   ["Callista","","","330","330","3","OFF","OFF"],
   ["Jen E","345","","330","330","","OFF","345"],
   ["Nathan","","3","330","3","OFF","3",""],
   ["DW","","345","330","330","3","",""]
  ],["15","rahal/22","48","144","22","8","39"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","","345","330","330","3","","345"],
   ["Fabian","345","3","330","3","OFF","3",""],
   ["Brent","345","","","3","","",""],
   ["Morgan W","345","345","330","330","3","","OFF"],
   ["Evan","","345","330","330","ro","OFF","345"],
   ["Erin","ro","ro","ro","ro","OFF","ro","OFF"],
   ["Kate","","","330","330","OFF","3","345"],
   ["J Fox","","345","330","3","3","",""],
   ["D","OFF","","330","330","3","3","OFF"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","","3"],
   ["Spencer","","5","4","5","","3",""],
   ["Christian","5","","5","4","3","","5"],
   ["","","","","","","",""]
  ]],
  ["Cktail",[
   ["Jenny","","4","","4","","3",""],
   ["Lindsay","","","","","","",""],
   ["Taylor","345","345","4","345","","","345"],
   ["Jess","","","345","","3","","4"]
  ]],
  ["Host",[
   ["Lilian","","OFF","4","12","OFF","","OFF"],
   ["Violette","","4","","4","","4","4"],
   ["Ari","4","445","ro","ro","ro","OFF","OFF"],
   ["Vivian","","","","","","OFF","OFF"],
   ["Kalie","","","5","5","330","",""],
   ["Audrina","","","","","","",""],
   ["Mckenzie","5","OFF","445","","","","OFF"]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","4","4","330","330","","","330"],
   ["Jackson","","5","5","5","330","330",""],
   ["Caidyn","","5","5","5","","","5"]
  ]],
  ["Busser",[
   ["Dalton","","","5","5","330","",""],
   ["Caleb","","4","","4","","4",""],
   ["Steven","","","4","","","","5"],
   ["Lucas","","","","","","",""],
   ["Barbie","4","4","4","4","","","4"],
   ["Drew","ro","5","","ro","","5",""],
   ["miguel","","OFF","","","","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5825.PNG"
},
{
 week:"Week of 1/7 – 1/13, 2026", year:2026, start:"2026-01-07",
 days:[["1/7","We"],["1/8","Th"],["1/9","Fr"],["1/10","Sa"],["1/11","Su"],["1/12","Mo"],["1/13","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","","?","OFF","on","party","","OFF"],
   ["Mike","5 to 8","","1","1","","1","1"],
   ["CJ","1","1","3","3","","5 to 8",""]
  ],["","","","","staff","",""]],
  ["BQTs",[
   ["","","","","","","",""]
  ]],
  ["Fronts",[
   ["Alexis","4","3 manage","330","330","","","3 manage"],
   ["Chad","4","4","3 manage","10:30/330","","4","OFF"],
   ["Hunter","","4","330","10:30/330","","ro","OFF"],
   ["Dianna","","4","330","330","","ro","4"],
   ["MorganB","","","330","330","","4","4"],
   ["Callista","4","","330","ro","","OFF","OFF"],
   ["Jen E","4","4","330","330","","OFF",""],
   ["Nathan","","4 back","330","330","OFF","","4"],
   ["DW","","","330","330","","4","4"]
  ]],
  ["Backs",[
   ["Lupe","","","ro","330","","",""],
   ["Alex","","4","330","10:30/330","","","4"],
   ["Fabian","4","","330","330","OFF","4",""],
   ["Brent","","","330","","","","4"],
   ["Morgan W","4","","330","330","","4","OFF"],
   ["Evan","","ro","ro","ro","","OFF","ro"],
   ["Erin","","4","330","330","OFF","4","OFF"],
   ["Kate","4","","330","330","OFF","4",""],
   ["J Fox","","4","330","330","","","4"],
   ["D","4","","","330","","",""]
  ]],
  ["Bar",[
   ["Krista","","ro","ro","ro","","ro","3"],
   ["Spencer","3","3","4","3","","",""],
   ["Christian","","4","3","4","","3",""],
   ["","","","","","","",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","","","","330"],
   ["Lindsay","","?","","4","","","4"],
   ["Taylor","","","330","4","","4 serve","4 serve"],
   ["Jess","","4?","","","","4",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Violette","","4","4","5","","","4"],
   ["Ari","5","5","5","ro","","OFF","OFF"],
   ["Vivian","","","","","","",""],
   ["Audrina","","","","","","",""]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","","3","3","3","","3","3"],
   ["Jackson","3","","5","5","","5","5"],
   ["Caidyn","5","5","5","5","","",""]
  ]],
  ["Busser",[
   ["Dalton","5","4","","5","","",""],
   ["Caleb","","5","5","","","",""],
   ["Steven","","","","4","","",""],
   ["Lucas","","","","","","4","4"],
   ["Barbie","4","","4","4","","",""],
   ["Drew","","","","","","OFF","OFF"],
   ["miguel","","OFF","4","","","",""]
  ]]
 ],
 note:"Sheet printed the wrong year (2025) — it is really the week of 1/7/2026.", src:"IMG_5826.PNG"
},
{
 week:"Week of 12/31/25 – 1/6/26", year:2025, start:"2025-12-31",
 days:[["12/31","We"],["1/1","Th"],["1/2","Fr"],["1/3","Sa"],["1/4","Su"],["1/5","Mo"],["1/6","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","on","","","on","","",""],
   ["Mike","1","","2","2","1","","3"],
   ["CJ","1","","2","3","","1","1"]
  ]],
  ["BQTs",[

  ]],
  ["Fronts",[
   ["Alexis","2","","3 MANAGE","3","","3 MANAGE","3"],
   ["Chad","RO","","3","3","3","3","OFF"],
   ["Hunter","2","","3","3","3","","OFF"],
   ["Dianna","2","","3","RO","RO","3","3"],
   ["MorganB","2","","3","3","","","3"],
   ["DW","2","","","3","","","3"],
   ["Callista","2","","3","3","","OFF","OFF"],
   ["Jen E","2","","3","3","3","OFF",""],
   ["Nathan","2","","3","","OFF","3","RO"]
  ],["331","","","","","",""]],
  ["Backs",[
   ["Lupe","2","","","3","","",""],
   ["Alex","2","","3","3","3","3","RO"],
   ["Fabian","2","","3","3","OFF","3","3"],
   ["Kate","2","","3","3","OFF","","3"],
   ["Morgan W","2","","3","3","","","OFF"],
   ["Evan","2","","3","","3","OFF","3"],
   ["Erin","2","","3","3","OFF","3","OFF"],
   ["Brent","2","","","3","","",""],
   ["J Fox","2","","3","","3","","3"],
   ["D","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","2","","3","3","","","3"],
   ["Spencer","2","","4","445","3","4",""],
   ["Christian","4","","445","4","","3","4"]
  ]],
  ["Cktail",[
   ["Jenny","RO","","330","OC","","345 floor solo",""],
   ["Lindsay","2","","OC","330","","345",""],
   ["Taylor","2","","330","4","3 solo","","4"],
   ["Jess","2","","","","4 lounge","",""]
  ]],
  ["Host",[
   ["Lilian","2","OFF","RO","RO","OFF","RO","OFF"],
   ["Violette","","","4","4","","4","4"],
   ["Ari","4","","430","330","330","OFF","OFF"],
   ["Vivian","","","5","5","","OFF","OFF"],
   ["Audrina","","","","","","",""]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","2","","3","3","3","3","3"],
   ["Jackson","4","","5","5","RO","","RO"],
   ["Caidyn","3","","","5","5","",""]
  ]],
  ["Busser",[
   ["Dalton","2","","4","5","4","",""],
   ["Caleb","2","","5 food run","4","","",""],
   ["Steven","","","","","","",""],
   ["Lucas","RO","RO","RO","RO","RO","RO","RO"],
   ["Barbie","4","","4","4","","4","4"],
   ["Drew","","","","","","",""],
   ["miguel","4","OFF","5","","","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5828.PNG"
},
{
 week:"Week of 12/24 – 12/30, 2025", year:2025, start:"2025-12-24",
 days:[["12/24","We"],["12/25","Th"],["12/26","Fr"],["12/27","Sa"],["12/28","Su"],["12/29","Mo"],["12/30","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","on","RO","RO","RO","RO","RO","RO"],
   ["Mike","1","","2","2","1","","3"],
   ["CJ","1","","2","3","","1","1"]
  ]],
  ["BQTs",[

  ]],
  ["Fronts",[
   ["Alexis","2","","3 MANAGE","3","","3 MANAGE","3"],
   ["Chad","2","","3","3","3 solo","3","OFF"],
   ["Hunter","2","","3","3","3","3","OFF"],
   ["Dianna","2","","3","3","","3","3"],
   ["MorganB","2","","3","3","RO","RO","3"],
   ["DW","2","","","3","","3","OFF"],
   ["Callista","2/RO","","3","RO","3","OFF","OFF"],
   ["Jen E","2","","3","3","3","OFF",""],
   ["Nathan","2","","3","RO","OFF","RO","3"]
  ],["353","0","63","79","21","41","22"]],
  ["Backs",[
   ["Lupe","2","","","3","","",""],
   ["Alex","2","","3","3","3","3",""],
   ["Fabian","2","","3","3","OFF","3","3"],
   ["Kate","2","","3","3","OFF","3","3"],
   ["Morgan W","2","","3","3","RO","","OFF"],
   ["Evan","2","","3","","3","OFF","3"],
   ["Erin","2","","3","3","OFF","3","OFF"],
   ["carmel back","","","","","","OFF","OFF"],
   ["Brent","2","","","3","","",""],
   ["J Fox","","","3","","3","","3"],
   ["D","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","2","","3","3","","","3"],
   ["Spencer","2","","4","445","3","4",""],
   ["Christian","4","","445","4","","3","4"]
  ]],
  ["Cktail",[
   ["Jenny","RO","","330","330","","345 floor solo","4"],
   ["Lindsay","2","","330","330","","345",""],
   ["Taylor","2","","330","4","4","",""]
  ]],
  ["Host",[
   ["Lilian","2","OFF","RO","RO","OFF","RO","OFF"],
   ["Violette","","","","","","",""],
   ["Ari","4","","430","330","330","OFF","OFF"],
   ["Vivian","","","5","5","","OFF","OFF"],
   ["Audrina","","","","","","",""]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","2","","3","3","3","3","3"],
   ["Jackson","4","","5","5","RO","","5"],
   ["Caidyn","3","","","5","5","",""]
  ]],
  ["Busser",[
   ["Dalton","2","","4","5","4","",""],
   ["Caleb","2","","5 food run","4","","",""],
   ["Steven","","","4","4","","",""],
   ["Lucas","RO","RO","RO","RO","RO","RO","RO"],
   ["Barbie","4","","OFF","OFF","OFF","4","4"],
   ["Drew","","","5","5","","",""],
   ["miguel","4","OFF","5","","","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5829.PNG"
},
{
 week:"Week of 12/17 – 12/23, 2025", year:2025, start:"2025-12-17",
 days:[["12/17","We"],["12/18","Th"],["12/19","Fr"],["12/20","Sa"],["12/21","Su"],["12/22","Mo"],["12/23","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","on","","on","on","","on",""],
   ["Mike","","1","3","2","1","","1"],
   ["CJ","3","3","2","3","","","3"]
  ]],
  ["BQTs",[

  ]],
  ["Fronts",[
   ["Alexis","345","345","330","330","","3 manage","345"],
   ["Chad","345","345","330","330","3","345","OFF"],
   ["Dianna","345","345","330","330","","345",""],
   ["DW","","345","330","330","","345","345"],
   ["Hunter","","","330","330","3","345","345"],
   ["Callista","","345","330","330","3","OFF","OFF"],
   ["Jen E","345","","330","330","3","OFF","345"],
   ["MorganB","345","","330","330","","","345"]
  ],["101","87","203","194","36","48","94"]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","345","330","330","RO","","345"],
   ["Nathan","OFF","345","330","330","OFF","","345"],
   ["Morgan W","345","","330","RO","3","345","OFF"],
   ["Evan","OFF","345","330","330","3","OFF","345"],
   ["Fabian","OFF","345","330","330","OFF","345",""],
   ["Erin","345","","330","330","OFF","345",""],
   ["Kate","345","","330","330","","345","345"],
   ["Bailey","345","OFF","","","3","OFF","OFF"],
   ["Taylor","OFF","345","330","330","3","OFF","OFF"],
   ["Vannah","","","","OFF","","",""],
   ["Brent","","","330","330","","","345"],
   ["D","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","","3","3","3","","3",""],
   ["Spencer","3","","4","4","","430","430"],
   ["Christian","430","430","430","RO","3","","3"]
  ]],
  ["Cktail",[
   ["Jenny","345","","345","","3","RO","345"],
   ["Lindsay","OFF","345","","345","","345",""],
   ["Jessica","","","","","","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Violette","","4","430","430","","","4"],
   ["Anaihah","5","5","","5","330","OFF","OFF"],
   ["Audrina","","","5","","","",""]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","4","4","4","4","","4","4"],
   ["Jackson","5","","5","5","330","","5"],
   ["Caidyn","","5","5","5","","5",""]
  ]],
  ["Busser",[
   ["Dalton","","4","4","4","","5",""],
   ["Caleb","4","","4","4","","","4"],
   ["Steven","","4","5","5","4","",""],
   ["Lucas","","","5","","","",""],
   ["Barbie","5","5","OFF","OFF","OFF","4","5"],
   ["Drew","","","","","","",""],
   ["miguel","4","OFF","","5","5","OFF","OFF"]
  ]]
 ],
 note:"Stitched from a torn sheet that was taped back together — Expo + Busser came from the second page.", src:"IMG_5830.PNG"
},
{
 week:"Week of 12/10 – 12/16, 2025", year:2025, start:"2025-12-10",
 days:[["12/10","We"],["12/11","Th"],["12/12","Fr"],["12/13","Sa"],["12/14","Su"],["12/15","Mo"],["12/16","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","on","meet 2","on","on","","on",""],
   ["Mike","3","meet 2","2","3","1","",""],
   ["CJ","","meet 2","3","2","3","","1"]
  ]],
  ["BQTs",[

  ],["45@12..38","70","116","117","35","32","62"]],
  ["Fronts",[
   ["Alexis","1045..345","2 meet..345","330","330","","345","3 manage"],
   ["Chad","oc","345","330","330","3","3 manage","OFF"],
   ["Dianna","345 ck","345","330","330","","345","345"],
   ["DW","345","345","330","330","","345",""],
   ["Hunter","OFF","OFF","330","330","3","OFF","345"],
   ["Callista","345","OFF","","330","3","OFF","OFF"],
   ["Jen E","345","","330","330","3","OFF","345"],
   ["MorganB","345","oc","330","","","345","345"]
  ]],
  ["Backs",[
   ["Lupe","","","","","","",""],
   ["Alex","345","","330","330","3","","345"],
   ["Nathan","OFF","345","330","330","OFF","345","345"],
   ["Morgan W","345","oc","330","330","3","","OFF"],
   ["Evan","OFF","345","330","330","3","OFF","345"],
   ["Fabian","OFF","345","330","330","OFF","345",""],
   ["Erin","","345","330","330","OFF","345","OFF"],
   ["Kate","345 tr","","330","oc","","","345"],
   ["Bailey","","OFF","","","","","OFF"],
   ["Taylor","OFF","4 ck","330 ck","330","330 ck","OFF","OFF"],
   ["Vannah","","","345 follow","OFF","","345",""],
   ["Brent","","","","","","",""],
   ["D","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","11..3","3","RO","RO","RO","3","3"],
   ["Spencer","4","","3","4","3","","430"],
   ["Christian","1045 lunch","430","430","3","4","",""]
  ]],
  ["Cktail",[
   ["Jenny","RO","4","","4","","4","4"],
   ["Lindsay","OFF","","4","","4","oc","4"],
   ["Jessica","can","pick up","don't","know","avail","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","5","OFF","4","OFF"],
   ["Violette","","4","5","445","","","4"],
   ["Anaihah","","445","445","","4","OFF","OFF"],
   ["Ava","445","","","","445","445","445"],
   ["Audrina","","","","4","","",""]
  ]],
  ["Expo",[
   ["Miguel H","","","","","","",""],
   ["Guy","4","4","3","RO","RO","4","4"],
   ["Jackson","","","5","3","3","5",""],
   ["Caidyn","","5","4","4","4","","5"]
  ]],
  ["Busser",[
   ["Dalton","","","4","4","4","445",""],
   ["Caleb","","4","445","","4 food run","","4"],
   ["Steven","445","","4","445","","",""],
   ["Lucas","","","","4","","",""],
   ["Barbie","4","445","OFF","OFF","OFF","4","445"],
   ["Drew","","","445","445","","4",""],
   ["miguel","","OFF","5","5","445","OFF","OFF"]
  ]]
 ],
 note:"", src:"IMG_5832.PNG"
},
{
 week:"Week of 12/3 – 12/9, 2025", year:2025, start:"2025-12-03",
 days:[["12/3","We"],["12/4","Th"],["12/5","Fr"],["12/6","Sa"],["12/7","Su"],["12/8","Mo"],["12/9","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","open","","open","open","","in","open"],
   ["Mike","2","1 meet","2","230","","2",""],
   ["CJ","","1 meet","330","3","130","330",""]
  ]],
  ["BQTs",[

  ],["","20/10","","30@5","","25 semi 36 ST","20 semi"]],
  ["Fronts",[
   ["Alexis","345","1 meet/345","330","330","","345","230 manage"],
   ["Chad","","345","330","330","3","345","OFF"],
   ["Dianna","","345","330","330/RO","RO","345","345"],
   ["DW","345","","330","330","","345","345"],
   ["Callista","345","OFF","330","330","3","OFF","OFF"],
   ["MorganB","","345","330","330","","345","345"],
   ["Hunter","OFF","OFF","330","330","3","OFF","345"],
   ["Jen E","","345","330","330","3","OFF",""]
  ],["","2","2","3","1 fr","1 back",""]],
  ["Backs",[
   ["Lupe","","","","330","","","345"],
   ["Alex","345","","330","330","3","345",""],
   ["Nathan","OFF","345","330","330","OFF","345","345"],
   ["Morgan W","345","345","330","RO","3","345","OFF"],
   ["Evan","OFF","345","330","330","3","OFF","345"],
   ["Bailey","345","OFF","330","330","","345","OFF"],
   ["Taylor","","","","","","",""],
   ["Kate","","","","","","",""],
   ["Ginnie","","","","","","",""],
   ["Erin","","","","","","",""],
   ["Brandy","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","330","330","3","3","","","330"],
   ["Spencer","","","330","430","4","330","430"],
   ["Christian","","430","430","330","3","430",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","4","345","345","4","RO"],
   ["Lindsay","OFF","4","","4","345","","4"],
   ["Jessica","OFF","","330","OFF","OFF","","330 back"]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Violette","","4","4 bus","4 bus","","430",""],
   ["Vivian","","5","5","430","3","OFF","OFF"],
   ["Audrina","","","4","","","","4"]
  ]],
  ["Expo",[
   ["Miguel H","4","","4","4","","4",""],
   ["Guy","","330","3","3","3","330","330"],
   ["Jackson","4","","4","4","","4",""],
   ["Caidyn","","4","4","4","","","4"]
  ]],
  ["Busser",[
   ["Dalton","4","445","4","4","","",""],
   ["Caleb","","4","4","4","","4",""],
   ["Jayden","","","4 valet","4 valet","4","445",""],
   ["Andrea","OFF","4","4","4","OFF","OFF","OFF"],
   ["Lucas","","","4","","","","4"]
  ]]
 ],
 note:"", src:"IMG_5833.PNG"
},
{
 week:"Week of 11/26 – 12/2, 2025", year:2025, start:"2025-11-26",
 days:[["11/26","We"],["11/27","Th"],["11/28","Fr"],["11/29","Sa"],["11/30","Su"],["12/1","Mo"],["12/2","Tu"]],
 sections:[
  ["Managers",[
   ["Jeremiah","OPEN","open","OPEN","OPEN","","","OPEN"],
   ["Mike","","2","230","230","130","130",""],
   ["CJ","Gavin 3","2","330","330","3","Alec 3","3"]
  ]],
  ["Fronts",[
   ["Alexis","4","245","330","330","","4","4"],
   ["Chad","","245","330","330","","4","4"],
   ["MorganB","4","245","330","RO","3","","4"],
   ["Callista","4","OFF","RO","RO","RO","OFF","OFF"],
   ["Sam","4","245","330","330","3","4","OFF"],
   ["Dianna","","245","330","330","3","RO","4"],
   ["DW","","245","330","330","3","4",""]
  ],["","carmel","carmel","carmel 3","","alec",""]],
  ["Backs",[
   ["Lupe","","245 front","330 front","330 front","","4 back",""],
   ["Alex","4","245","330","330","","4",""],
   ["Nathan","OFF","245","330","330","OFF","4","4"],
   ["Morgan W","4","245","330","RO","3","RO","OFF"],
   ["Hunter","OFF","245","330","330","3","OFF","4"],
   ["Jen E","4","245","330","330","3","OFF","4"],
   ["Evan","OFF","245","330","330","3","OFF","4"],
   ["Bailey","4","OFF","330","330","","4","OFF"],
   ["Taylor","","","","","","train 1-330","train 1-330"],
   ["Kate","","","","","","train 1-330","train 1-330"],
   ["Ginnie","","","","","","train 1-330","train 1-330"],
   ["Erin","","","","","","train 1-330","train 1-330"],
   ["Brandy","","","","","","train 1-330","train 1-330"]
  ]],
  ["Bar",[
   ["Krista","3","3","3","3","","","3"],
   ["Spencer","","430","4","4","430 bar","3 solo",""],
   ["Christian","5","3","330 serve","330 serve","3 bar","","5"]
  ]],
  ["Cktail",[
   ["Jenny","345","345","345","345","","","345"],
   ["Lindsay","OFF","345","","345","","3",""],
   ["Jessica","OFF","245 back","330 back","330 back","OFF","",""]
  ]],
  ["Host",[
   ["Lilian","4","OFF","4","4","OFF","4","OFF"],
   ["Violette","","3","445","445","4","","4"],
   ["Vivian","5","4","5","","","OFF","OFF"],
   ["Audrina","","","","5","","","4"]
  ]],
  ["Expo",[
   ["Miguel H","","3","3","3","","",""],
   ["-home by 1","4","3","3","3","3","4",""],
   ["Jackson","RO","RO","RO","RO","RO","RO","4 expo"],
   ["Caidyn","4","4","4","4","","","5 fr"]
  ]],
  ["Busser",[
   ["Dalton","4","","5","445","330","",""],
   ["Caleb","","3","445","445","","4",""],
   ["Jayden","","330 valet","4 valet","4 valet","","",""],
   ["Andrea","5","3","4","4","","","4"],
   ["Lucas","","","","4","","","4"]
  ]]
 ],
 note:"", src:"IMG_5834.PNG"
},
{
 week:"Week of 11/19 – 11/25, 2025", year:2025, start:"2025-11-19",
 days:[["11/19","We"],["11/20","Th"],["11/21","Fr"],["11/22","Sa"],["11/23","Su"],["11/24","Mo"],["11/25","Tu"]],
 sections:[
  ["?",[
   ["b p?","","330","330","330","3","130",""]
  ],["","CARMEL TEAM","CARMEL TEAM","CARMEL TEAM","","","G MANAGE 4"]],
  ["Fronts",[
   ["Alexis","3 MANAGE","345","330","330","","345","345"],
   ["Chad","345","345","330","330","","345","OFF"],
   ["MorganB","","345","330","330","","","345"],
   ["Callista","345","345","330","330","3","OFF","OFF"],
   ["Sam","RO","OFF","330","330","3","345","OFF"],
   ["Dianna","345","345","330","OC","3","","345"],
   ["DW","345","","330","330","3","345",""],
   ["Aubrey","OFF","OFF","330","330","","","345"]
  ]],
  ["Backs",[
   ["Lupe","","","330","330","","345","345"],
   ["Alex","345","345","330","330","","345",""],
   ["Nathan","OFF","345","330","330","OFF","345","345"],
   ["Morgan W","345","","330","330","3","345","OFF"],
   ["Hunter","OFF","OFF","330","330","3","OFF","345"],
   ["Jen E","345","","","330","","OFF","345"],
   ["Evan","OFF","345","330","330","3","OFF",""],
   ["Bailey","345","OFF","330","","3","","OFF"],
   ["Sophia(needs trained)","","","","","","",""]
  ]],
  ["Bar",[
   ["Krista","330","330","330","330","","RO","330"],
   ["Spencer","","5","5","4","3","5",""],
   ["Christian","5","","4","5","","3","5"],
   ["Mallory(needs trained)","","TR","TR","TR","TR","",""]
  ]],
  ["Cktail",[
   ["Jenny","4","","","4","4","",""],
   ["Lindsay","OFF","4","4","","","4","4"],
   ["Jessica","345 BACK","","330 BACK","330 BACK","OFF","OFF","OFF"]
  ]],
  ["Host",[
   ["Lilian","415","OFF","5","415","","",""],
   ["Violette","","5","415","5","OFF","330","OFF"]
  ]]
 ],
 note:"Photo was cut off — some sections and names are missing on the sheet edge.", src:"IMG_5835.PNG"
}
];
