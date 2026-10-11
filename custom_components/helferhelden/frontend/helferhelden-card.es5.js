/* Helferhelden card, build for the legacy Home Assistant frontend.
   GENERATED from helferhelden-card.js by scripts/build-card-es5.sh -- do not edit.
   Change the source and rebuild; `--check` rebuilds and compares byte for byte. */
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const HH_VERSION = "0.1.1";
  const DEFAULT_FONT_BASE = "/helferhelden/fonts/";
  function ensureFonts(base) {
    if (document.getElementById("hh-fonts")) return;
    const st = document.createElement("style");
    st.id = "hh-fonts";
    st.textContent = '\n@font-face { font-family: "Baloo 2"; font-weight: 400 800; font-display: swap; src: url("'.concat(base, 'baloo2.woff2") format("woff2"); }\n@font-face { font-family: "Nunito"; font-weight: 200 1000; font-display: swap; src: url("').concat(base, 'nunito.woff2") format("woff2"); }');
    document.head.appendChild(st);
  }
  const PETS = {
    dragon: ["\u{1F432}", "Drache"],
    cat: ["\u{1F431}", "Katze"],
    dog: ["\u{1F436}", "Hund"],
    unicorn: ["\u{1F984}", "Einhorn"],
    dino: ["\u{1F996}", "Dino"],
    fox: ["\u{1F98A}", "Fuchs"],
    octopus: ["\u{1F419}", "Krake"],
    bunny: ["\u{1F430}", "Hase"],
    robot: ["\u{1F916}", "Roboter"],
    owl: ["\u{1F989}", "Eule"]
  };
  const EN = {
    // pets
    "Drache": "Dragon",
    "Katze": "Cat",
    "Hund": "Dog",
    "Einhorn": "Unicorn",
    "Dino": "Dino",
    "Fuchs": "Fox",
    "Krake": "Octopus",
    "Hase": "Bunny",
    "Roboter": "Robot",
    "Eule": "Owl",
    // fragments
    "Sammelsterne": "badges",
    "jeden Tag": "every day",
    "niemand": "nobody",
    "von": "of",
    "Mama": "Mum",
    " (so nennen die Kinder dich)": " (what the children call you)",
    "{n} bearbeiten": "Edit {n}",
    "Ein gemeinsames Ziel f\xFCr alle Kinder: Jeder verdiente Stern bringt die ganze Familie einen Schritt weiter. Die Sterne der Kinder bleiben dabei erhalten.": "A shared goal for all the children: every star earned moves the whole family one step closer. The children keep their own stars.",
    // worlds, pets, time of day, weekdays
    "Weltraum": "Space",
    "Dschungel": "Jungle",
    "Ozean": "Ocean",
    "Dinos": "Dinos",
    "Feenwald": "Fairy forest",
    "Morgens": "Morning",
    "Tags\xFCber": "Daytime",
    "Abends": "Evening",
    "Mo": "Mon",
    "Di": "Tue",
    "Mi": "Wed",
    "Do": "Thu",
    "Fr": "Fri",
    "Sa": "Sat",
    "So": "Sun",
    // spoken phrases
    "Hallo {n}!": "Hello {n}!",
    "Sch\xF6n, dass du da bist, {n}!": "Good to see you, {n}!",
    "Hallo {n}! Los geht's!": "Hello {n}! Let's go!",
    "Sch\xF6n, dass du mithilfst, {n}!": "Good of you to help out, {n}!",
    "Schau mal, was {n} heute macht!": "Look what {n} is up to today!",
    "Super gemacht, {n}!": "Well done, {n}!",
    "Toll, {n}!": "Great, {n}!",
    "Klasse! Ein Stern f\xFCr dich!": "Brilliant! A star for you!",
    "Juhu! Das hast du prima gemacht!": "Yay! You did that really well!",
    "Wow, {n}! Weiter so!": "Wow, {n}! Keep it up!",
    "Danke, {n}! Super gemacht!": "Thank you, {n}! Well done!",
    "Toll, {n}! Das hilft der ganzen Familie!": "Great, {n}! That helps the whole family!",
    "Du hast alles geschafft, {n}! Ich bin so stolz auf dich!": "You finished everything, {n}! I am so proud of you!",
    "Alles erledigt! Du bist ein echter Helferheld, {n}!": "All done! You are a real helper hero, {n}!",
    "Ein neuer Stern f\xFCr deine Sammlung!": "A new badge for your collection!",
    "Hurra! Level {l}!": "Hurray! Level {l}!",
    "Die ganze Familie hat alles geschafft! Ihr seid ein tolles Team!": "The whole family finished everything! You are a great team!",
    "Abenteuer geschafft! {r}": "Quest complete! {r}",
    "Viel Spa\xDF mit {t}!": "Enjoy {t}!",
    // child view
    "L\xE4dt \u2026": "Loading \u2026",
    "Heute geschafft": "Done today",
    "Heute geschafft: hier erscheint jede erledigte Aufgabe der Familie.": "Done today: every chore the family completed shows up here.",
    "Noch keine Kinder angelegt. Im Elternbereich legst du Kinder, Aufgaben und Belohnungen an.": "No children yet. Add children, chores and rewards in the parents' area.",
    "Elternbereich \xF6ffnen": "Open the parents' area",
    "Elternbereich (gedr\xFCckt halten)": "Parents' area (hold)",
    "Elternbereich: gedr\xFCckt halten": "Parents' area: hold",
    "Zur\xFCck": "Back",
    "Heute frei!": "A day off!",
    "Alles erledigt f\xFCr heute": "Everything done for today",
    "Level": "Level",
    "Sternen-Sammlung": "Badge collection",
    "Deine Sternen-Sammlung": "Your badge collection",
    "Fertig (gedr\xFCckt halten)": "Done (hold)",
    "Fertig": "Done",
    "R\xFCckg\xE4ngig": "Undo",
    "Kaufen": "Buy",
    "Belohnungen": "Rewards",
    "Familien-Abenteuer": "Family quest",
    "Gerade kein Abenteuer. Eltern k\xF6nnen eins im Elternbereich starten.": "No quest right now. Parents can start one in the parents' area.",
    "Neuer Stern!": "New badge!",
    "Abenteuer geschafft!": "Quest complete!",
    "{p} ist gewachsen": "{p} has grown",
    "{s} Tage am St\xFCck": "{s} days in a row",
    // parents' area
    "Elternbereich": "Parents' area",
    "PIN eingeben": "Enter the PIN",
    "Abbrechen": "Cancel",
    "Speichern": "Save",
    "L\xF6schen": "Delete",
    "Bearbeiten": "Edit",
    "Zur\xFCck zu den Kindern": "Back to the children",
    "Heute": "Today",
    "Ablehnen": "Reject",
    "Best\xE4tigen": "Approve",
    "Eingel\xF6st": "Redeemed",
    "mit Best\xE4tigung": "needs approval",
    "Einen Stern abziehen": "Take away one star",
    "Einen Stern geben": "Give one star",
    "Aufgaben, die du best\xE4tigen musst, und gekaufte Belohnungen, die noch eingel\xF6st werden wollen.": "Chores waiting for your approval, and bought rewards still waiting to be redeemed.",
    "Zu best\xE4tigen": "Waiting for approval",
    "Nichts offen.": "Nothing open.",
    "Belohnungen einl\xF6sen": "Redeem rewards",
    "Keine offenen Belohnungen.": "No open rewards.",
    "Sterne von Hand anpassen": "Adjust stars by hand",
    "Lege zuerst ein Kind an.": "Add a child first.",
    // family
    "Familie": "Family",
    "Jedes Familienmitglied hat ein Haustier und eine Welt. Das Haustier w\xE4chst mit den Leveln.": "Every family member has a pet and a world. The pet grows with the levels.",
    "Kinder": "Children",
    "Noch keine Kinder.": "No children yet.",
    "Kind hinzuf\xFCgen": "Add a child",
    "Eltern spielen mit": "Parents play along",
    "Eltern": "Parents",
    "Noch keine Eltern angelegt.": "No parents yet.",
    "Elternteil hinzuf\xFCgen": "Add a parent",
    "Rolle": "Role",
    "\u{1F9D2} Kind": "\u{1F9D2} Child",
    "\u{1F9D1} Elternteil": "\u{1F9D1} Parent",
    "Haustier": "Pet",
    "Name des Haustiers": "Pet's name",
    "Wird vorgelesen, wenn das Kind aufs Haustier tippt.": "Read out loud when the child taps the pet.",
    "Welt": "World",
    "Name": "Name",
    "Name (so nennen die Kinder dich)": "Name (what the children call you)",
    // chores
    "Aufgaben": "Chores",
    "Kinder sehen nur das Bild, der Titel wird vorgelesen. W\xE4hle deshalb ein eindeutiges Bild und einen kurzen Titel.": "Children only see the picture; the title is read out loud. So pick an unmistakable picture and a short title.",
    "Noch keine Aufgaben.": "No chores yet.",
    "Aufgabe hinzuf\xFCgen": "Add a chore",
    "Aufgabe bearbeiten": "Edit chore",
    "Titel (wird vorgelesen)": "Title (read out loud)",
    "Z\xE4hne putzen": "Brush teeth",
    "Bild": "Picture",
    "Sterne": "Stars",
    "Tageszeit": "Time of day",
    "Tage": "Days",
    "Kein Tag gew\xE4hlt bedeutet: jeden Tag.": "No day selected means: every day.",
    "F\xFCr wen": "Who for",
    "Eltern m\xFCssen best\xE4tigen, bevor es Sterne gibt": "Parents must approve before stars are given",
    "Aktiv": "Active",
    "Aufgabe \u201E{t}\u201C l\xF6schen?": "Delete the chore \u201C{t}\u201D?",
    // rewards
    "Noch keine Belohnungen.": "No rewards yet.",
    "Belohnung hinzuf\xFCgen": "Add a reward",
    "Belohnung bearbeiten": "Edit reward",
    "Kein Skript": "No script",
    "Ein Eis": "An ice cream",
    "Preis in Sternen": "Price in stars",
    "Skript beim Kauf": "Script on purchase",
    "Im Laden sichtbar": "Visible in the shop",
    "startet ein Skript": "starts a script",
    "Belohnung \u201E{t}\u201C l\xF6schen?": "Delete the reward \u201C{t}\u201D?",
    "und": "and",
    // quest
    "Gerade l\xE4uft kein Abenteuer.": "No quest is running right now.",
    "Abenteuer starten": "Start a quest",
    "Neues Abenteuer starten": "Start a new quest",
    "Ausflug in den Zoo": "A trip to the zoo",
    "Ziel in Sternen": "Goal in stars",
    "Faustregel: zwei Kinder sammeln zusammen etwa 10\u201315 Sterne pro Tag.": "Rule of thumb: two children collect roughly 10\u201315 stars a day between them.",
    "Belohnung": "Reward",
    "Wir gehen in den Zoo": "We are going to the zoo",
    "Das laufende Abenteuer wird dabei beendet.": "This ends the quest currently running.",
    "Geschafft! Zeit f\xFCr die Belohnung.": "Done! Time for the reward.",
    // settings
    "Einstellungen": "Settings",
    "Stimme": "Voice",
    "Aktuell:": "Currently:",
    "Stimme ausw\xE4hlen": "Choose a voice",
    "Stimme des Tablets": "The tablet's voice",
    "Stimme gespeichert": "Voice saved",
    "PIN f\xFCr den Elternbereich": "PIN for the parents' area",
    "Eine PIN ist gesetzt.": "A PIN is set.",
    "Noch keine PIN. Ohne PIN reicht langes Dr\xFCcken auf das Schloss.": "No PIN yet. Without one, holding the padlock is enough.",
    "PIN \xE4ndern": "Change the PIN",
    "PIN festlegen": "Set a PIN",
    "PIN entfernen": "Remove the PIN",
    "Neue PIN (4\u20138 Ziffern)": "New PIN (4\u20138 digits)",
    "Sprachausgabe": "Text-to-speech",
    "\u25B6 Probeh\xF6ren": "\u25B6 Preview",
    "Probeh\xF6ren": "Preview",
    "Eine Sprachausgabe aus Home Assistant klingt meist viel nat\xFCrlicher als die Tablet-Stimme.": "A text-to-speech engine from Home Assistant usually sounds far more natural than the tablet's voice.",
    "Keine Sprachausgabe in Home Assistant gefunden. Richte zum Beispiel Piper oder Home Assistant Cloud ein, dann erscheint sie hier.": "No text-to-speech engine found in Home Assistant. Set up Piper or Home Assistant Cloud, for example, and it will appear here.",
    "Automatisch die beste w\xE4hlen": "Pick the best one automatically",
    "Standardstimme": "Default voice",
    "Gilt nur f\xFCr dieses Ger\xE4t.": "Applies to this device only.",
    "Auf diesem Ger\xE4t ist keine deutsche Stimme installiert.": "This device has no voice installed for your language.",
    "L\xE4dt Stimmen \u2026": "Loading voices \u2026",
    "Stimmen konnten nicht geladen werden. Die Standardstimme wird verwendet.": "Voices could not be loaded. The default voice will be used.",
    "Hallo! Ich bin deine Helferhelden-Stimme. Super gemacht, ein Stern f\xFCr dich!": "Hello! I am your Helferhelden voice. Well done, a star for you!",
    "Diese Stimme hat nicht geklappt. W\xE4hle eine andere oder pr\xFCfe die Sprachausgabe in Home Assistant.": "That voice did not work. Pick another one or check the text-to-speech setup in Home Assistant.",
    // automations help
    "Automationen": "Automations",
    "Pro Kind gibt es einen Sensor mit Sternen, Level, Serie und offenen Aufgaben, dazu": "There is one sensor per child with stars, level, streak and open chores, plus",
    "lassen sich Aufgaben auch per NFC-Tag oder Taster abhaken.": "chores can also be ticked off with an NFC tag or a button.",
    // messages the backend sends; German is the key, as everywhere else
    "Helferhelden ist nicht eingerichtet": "Helferhelden is not set up",
    "Falsche PIN": "Wrong PIN",
    "Zu viele Versuche, bitte kurz warten": "Too many attempts, please wait a moment",
    "Ohne Eltern-PIN d\xFCrfen das nur Administratoren. Bitte zuerst eine PIN festlegen.": "Administrators only while no parents' PIN is set. Please set one first.",
    "Kind nicht gefunden": "Child not found",
    "Aufgabe nicht gefunden": "Chore not found",
    "Eintrag nicht gefunden": "Entry not found",
    "Kauf nicht gefunden": "Purchase not found",
    "Belohnung nicht verf\xFCgbar": "Reward not available",
    "Diese Aufgabe ist heute nicht dran": "That chore is not due today",
    "Schon erledigt": "Already done",
    "Bereits best\xE4tigt": "Already approved",
    "Nichts zum R\xFCckg\xE4ngigmachen": "Nothing to undo",
    "Die Sterne sind schon ausgegeben": "Those stars have already been spent",
    "Noch nicht genug Sterne": "Not enough stars yet",
    "Nur offene Eintr\xE4ge k\xF6nnen abgelehnt werden": "Only open entries can be rejected",
    "Name fehlt": "Name is missing",
    "Titel fehlt": "Title is missing",
    "Ung\xFCltige Eingabe": "Invalid input",
    "Ung\xFCltige Sprachausgabe": "Invalid text-to-speech engine",
    "Ung\xFCltiges Ziel": "Invalid goal",
    "PIN muss 4\u20138 Ziffern haben": "The PIN must be 4 to 8 digits",
    // errors and toasts
    "Helferhelden ist nicht erreichbar. Ist die Integration eingerichtet?": "Helferhelden cannot be reached. Is the integration set up?",
    "Das hat nicht geklappt": "That did not work",
    "Aufgaben-Spiel f\xFCr Kinder mit Haustier, Sternen, Sammelsternen und Belohnungen": "A chore game for kids with a pet, stars, badges and rewards"
  };
  let LANG = "de";
  const setLang = (code) => {
    LANG = String(code || "de").toLowerCase().startsWith("de") ? "de" : "en";
  };
  const tr = (s) => {
    var _a;
    return LANG === "de" ? s : (_a = EN[s]) != null ? _a : s;
  };
  const trf = (s, vars = {}) => tr(s).replace(/\{(\w+)\}/g, (_, k) => {
    var _a;
    return (_a = vars[k]) != null ? _a : "";
  });
  const THEMES = {
    space: {
      label: "Weltraum",
      sky: ["#221f66", "#5d43ad"],
      ground: "#3b2f80",
      hill: "#4a3c99",
      decor: [["\u2B50", 8, 10, 34], ["\u{1FA90}", 14, 70, 64], ["\u2728", 34, 22, 30], ["\u{1F319}", 6, 44, 46], ["\u2B50", 40, 84, 26], ["\u2604\uFE0F", 26, 52, 40]]
    },
    jungle: {
      label: "Dschungel",
      sky: ["#c8f08a", "#6cc46f"],
      ground: "#2f8a4e",
      hill: "#3fa05c",
      decor: [["\u{1F334}", 30, 4, 90], ["\u{1F343}", 8, 30, 34], ["\u{1F99C}", 12, 74, 48], ["\u{1F33A}", 44, 86, 40], ["\u{1F34C}", 6, 58, 32], ["\u{1F33F}", 46, 18, 44]]
    },
    ocean: {
      label: "Ozean",
      sky: ["#8fe2f5", "#2479bf"],
      ground: "#e9c98b",
      hill: "#f3d9a4",
      decor: [["\u{1FAE7}", 10, 14, 36], ["\u{1F420}", 22, 72, 48], ["\u{1FAE7}", 30, 30, 22], ["\u{1F41A}", 64, 82, 36], ["\u{1F41F}", 8, 50, 34], ["\u{1FAB8}", 58, 6, 56]]
    },
    dino: {
      label: "Dinos",
      sky: ["#ffe2ad", "#f0955a"],
      ground: "#9a5a33",
      hill: "#b56b3c",
      decor: [["\u{1F30B}", 22, 70, 86], ["\u2601\uFE0F", 6, 14, 52], ["\u{1F33F}", 52, 6, 52], ["\u{1F9B4}", 66, 82, 34], ["\u{1F95A}", 60, 30, 30], ["\u2601\uFE0F", 4, 56, 40]]
    },
    fairy: {
      label: "Feenwald",
      sky: ["#ffd9f1", "#b48cf0"],
      ground: "#7e5bc9",
      hill: "#9a75dd",
      decor: [["\u{1F338}", 10, 12, 42], ["\u2728", 6, 52, 30], ["\u{1F344}", 56, 84, 50], ["\u{1F98B}", 24, 74, 42], ["\u{1F308}", 4, 76, 60], ["\u{1F337}", 58, 8, 40]]
    }
  };
  const SLOTS = {
    morning: ["\u{1F305}", "Morgens"],
    day: ["\u2600\uFE0F", "Tags\xFCber"],
    evening: ["\u{1F319}", "Abends"]
  };
  const MOOD_ICON = { party: "\u{1F389}", happy: "\u{1F60A}", ok: "\u{1F4AA}", sleepy: "\u{1F4A4}" };
  const PHRASES = {
    hello: ["Hallo {n}!", "Sch\xF6n, dass du da bist, {n}!", "Hallo {n}! Los geht's!"],
    helloParent: ["Hallo {n}!", "Sch\xF6n, dass du mithilfst, {n}!"],
    visitParent: ["Schau mal, was {n} heute macht!"],
    done: ["Super gemacht, {n}!", "Toll, {n}!", "Klasse! Ein Stern f\xFCr dich!", "Juhu! Das hast du prima gemacht!", "Wow, {n}! Weiter so!"],
    doneParent: ["Danke, {n}! Super gemacht!", "Toll, {n}! Das hilft der ganzen Familie!"],
    alldone: ["Du hast alles geschafft, {n}! Ich bin so stolz auf dich!", "Alles erledigt! Du bist ein echter Helferheld, {n}!"],
    badge: ["Ein neuer Stern f\xFCr deine Sammlung!"],
    level: ["Hurra! Level {l}!"],
    family: ["Die ganze Familie hat alles geschafft! Ihr seid ein tolles Team!"],
    quest: ["Abenteuer geschafft! {r}"],
    buy: ["Viel Spa\xDF mit {t}!"]
  };
  const say = (key, vars = {}) => {
    const list = PHRASES[key] || [key];
    return tr(list[Math.floor(Math.random() * list.length)]).replace(/\{(\w)\}/g, (_, k) => {
      var _a;
      return (_a = vars[k]) != null ? _a : "";
    });
  };
  const allPhrases = (key, vars = {}) => (PHRASES[key] || []).map((p) => tr(p).replace(/\{(\w)\}/g, (_, k) => {
    var _a;
    return (_a = vars[k]) != null ? _a : "";
  }));
  const CHORE_ICONS = [
    "\u{1FAA5}",
    "\u{1F455}",
    "\u{1F9E6}",
    "\u{1F45F}",
    "\u{1F6CF}\uFE0F",
    "\u{1F9F8}",
    "\u{1F4DA}",
    "\u{1F37D}\uFE0F",
    "\u{1F944}",
    "\u{1F9F9}",
    "\u{1F5D1}\uFE0F",
    "\u{1F331}",
    "\u{1F41F}",
    "\u{1F415}",
    "\u{1F6C1}",
    "\u{1F6BD}",
    "\u{1F9FC}",
    "\u{1F4A7}",
    "\u{1F955}",
    "\u{1F34E}",
    "\u{1F392}",
    "\u{1F9FA}",
    "\u{1FAB4}",
    "\u{1F6B2}",
    "\u{1F3A8}",
    "\u{1F3B9}",
    "\u{1FAE7}",
    "\u{1F9E4}",
    "\u{1F634}",
    "\u{1F91D}",
    "\u{1F9E5}",
    "\u{1F9B7}",
    "\u{1F373}",
    "\u{1F6D2}",
    "\u{1F9FD}",
    "\u{1F697}",
    "\u{1F4BB}",
    "\u{1F527}",
    "\u{1F4EC}",
    "\u{1F957}",
    "\u{1FA9F}",
    "\u{1F3C3}"
  ];
  const REWARD_ICONS = [
    "\u{1F366}",
    "\u{1F3A7}",
    "\u{1F4FA}",
    "\u{1F3AE}",
    "\u{1F6DD}",
    "\u{1F355}",
    "\u{1F37F}",
    "\u{1F388}",
    "\u{1F4D6}",
    "\u{1F9C1}",
    "\u{1F697}",
    "\u{1F3CA}",
    "\u{1F3A0}",
    "\u{1F981}",
    "\u{1F381}",
    "\u{1F31F}",
    "\u{1F36B}",
    "\u{1F3D5}\uFE0F",
    "\u{1F3AC}",
    "\u{1F9E9}"
  ];
  const QUEST_ICONS = ["\u{1F680}", "\u{1F981}", "\u{1F3D6}\uFE0F", "\u{1F3A2}", "\u{1F355}", "\u{1F3AC}", "\u{1F3D5}\uFE0F", "\u{1F3AA}", "\u{1F42C}", "\u{1F3F0}", "\u{1F3A1}", "\u{1F366}"];
  const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const reducedMotion = () => {
    var _a;
    return (_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches;
  };
  class Sfx {
    constructor() {
      this.ctx = null;
    }
    _ctx() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
      }
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    }
    _note(freq, start, dur, type = "triangle", gain = 0.18) {
      const ctx = this._ctx();
      if (!ctx) return;
      const t = ctx.currentTime + start;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(1e-4, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
      g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
    tap() {
      this._note(660, 0, 0.12, "sine", 0.12);
    }
    chime() {
      [523, 659, 784, 1047].forEach((f, i) => this._note(f, i * 0.09, 0.35));
    }
    fanfare() {
      [[523, 0], [659, 0.12], [784, 0.24], [1047, 0.38], [784, 0.52], [1047, 0.64]].forEach(([f, t]) => this._note(f, t, 0.4, "square", 0.08));
      [262, 330, 392].forEach((f) => this._note(f, 0.64, 0.9, "triangle", 0.1));
    }
    sparkle() {
      [1319, 1568, 2093, 2637].forEach((f, i) => this._note(f, i * 0.06, 0.25, "sine", 0.08));
    }
    nope() {
      this._note(220, 0, 0.18, "sine", 0.12);
      this._note(196, 0.12, 0.22, "sine", 0.12);
    }
  }
  class Voice {
    constructor(card) {
      this.card = card;
      this.cache = /* @__PURE__ */ new Map();
      this.current = null;
      this.failUntil = 0;
    }
    settings() {
      var _a;
      return ((_a = this.card._state) == null ? void 0 : _a.voice) || {};
    }
    _canEngine(v) {
      var _a;
      return !!((v == null ? void 0 : v.engine) && ((_a = this.card._hass) == null ? void 0 : _a.callApi));
    }
    load(text, v = this.settings()) {
      const key = "".concat(v.engine, "|").concat(v.voice, "|").concat(text);
      if (this.cache.has(key)) return this.cache.get(key);
      const body = { engine_id: v.engine, message: text, cache: true };
      if (v.language) body.language = v.language;
      if (v.voice) body.options = { voice: v.voice };
      const p = this.card._hass.callApi("POST", "tts_get_url", body).then((res) => {
        const a = new Audio(res.path || res.url);
        a.preload = "auto";
        a.load();
        return a;
      });
      p.catch(() => this.cache.delete(key));
      this.cache.set(key, p);
      if (this.cache.size > 250) this.cache.delete(this.cache.keys().next().value);
      return p;
    }
    prefetch(texts) {
      const v = this.settings();
      if (!this._canEngine(v) || Date.now() < this.failUntil) return;
      texts.filter(Boolean).forEach((t) => this.load(t, v).catch(() => {
      }));
    }
    stop() {
      var _a, _b;
      try {
        (_a = this.current) == null ? void 0 : _a.pause();
      } catch (_) {
      }
      try {
        (_b = window.speechSynthesis) == null ? void 0 : _b.cancel();
      } catch (_) {
      }
    }
    /** override: unsaved settings for tr("Probehören"); errors are thrown so the UI can report them. */
    async speak(text, override) {
      if (!text) return;
      this.stop();
      const v = override || this.settings();
      if (this._canEngine(v) && (override || Date.now() >= this.failUntil)) {
        try {
          const a = await this.load(text, v);
          this.current = a;
          a.currentTime = 0;
          await a.play();
          return;
        } catch (err) {
          if (override) throw err;
          this.failUntil = Date.now() + 6e4;
        }
      }
      this.browser(text, override ? override.browserVoice : void 0);
    }
    browserVoices() {
      try {
        return window.speechSynthesis.getVoices().filter((x) => {
          var _a;
          return (_a = x.lang) == null ? void 0 : _a.toLowerCase().startsWith("de");
        });
      } catch (_) {
        return [];
      }
    }
    bestBrowserVoice(name) {
      const vs = this.browserVoices();
      if (name) {
        const m = vs.find((x) => x.name === name);
        if (m) return m;
      }
      const score = (x) => (/natural|neural|online|premium|enhanced|wavenet/i.test(x.name) ? 4 : 0) + (/google/i.test(x.name) ? 2 : 0) + (x.localService ? 0 : 1);
      return vs.sort((a, b) => score(b) - score(a))[0];
    }
    localVoice() {
      try {
        return localStorage.getItem("hh-browser-voice") || "";
      } catch (_) {
        return "";
      }
    }
    browser(text, name) {
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(text);
      const v = this.bestBrowserVoice(name != null ? name : this.localVoice());
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      } else u.lang = "de-DE";
      u.rate = 0.95;
      u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    }
  }
  const NARROW_AT = 900;
  const STYLES = '\n:host {\n  --ink: #2e2a5c;\n  --sun: #ffc93c;\n  --grass: #3fb87f;\n  --berry: #ff5d8f;\n  --paper: #ffffff;\n  --mist: #efeaf8;\n  --kid-font: "Baloo 2", "Nunito", ui-rounded, system-ui, sans-serif;\n  --ui-font: "Nunito", ui-rounded, system-ui, sans-serif;\n  display: block;\n}\n* { box-sizing: border-box; }\nbutton { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n/* Chrome below 86 drops both :focus-visible rules -- an unknown pseudo-class\n   invalidates the whole selector -- and keeps the plain :focus ring. Newer browsers\n   apply all three and so show the ring for keyboard focus only. */\nbutton:focus, input:focus, select:focus { outline: 4px solid var(--sun); outline-offset: 3px; }\nbutton:focus:not(:focus-visible), input:focus:not(:focus-visible), select:focus:not(:focus-visible) { outline: none; }\nbutton:focus-visible, input:focus-visible, select:focus-visible { outline: 4px solid var(--sun); outline-offset: 3px; }\n\n.root {\n  position: relative; overflow: hidden; border-radius: var(--ha-card-border-radius, 16px);\n  height: var(--hh-height); min-height: 560px; font-family: var(--kid-font); color: var(--ink);\n  user-select: none; -webkit-user-select: none; touch-action: manipulation; background: #2b2560;\n  /* Makes .root the containing block for the position:fixed parent button in the\n     stacked layout. container-type implied this, but only from Chrome 105 on; plain\n     layout containment does the same from Chrome 52 and needs no container query. */\n  contain: layout;\n}\n.layer { position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; z-index: 20; }\n.layer > * { pointer-events: auto; }\n\n/* chunky toy button */\n.chunk {\n  background: var(--paper); border: 4px solid var(--ink); border-radius: 22px;\n  box-shadow: 0 6px 0 var(--ink); transition: transform .08s, box-shadow .08s;\n}\n.chunk:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--ink); }\n\n/* themed world */\n.world { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: linear-gradient(180deg, var(--sky1), var(--sky2)); }\n.world .hill { position: absolute; left: -10%; width: 120%; bottom: 0; height: 30%; }\n.decor { position: absolute; line-height: 1; filter: drop-shadow(0 3px 0 rgba(46,42,92,.25)); }\n@media (prefers-reduced-motion: no-preference) {\n  .decor:nth-child(odd) { animation: drift 7s ease-in-out infinite; }\n  .decor:nth-child(even) { animation: drift 9s ease-in-out infinite reverse; }\n}\n@keyframes drift { 50% { transform: translateY(-10px) rotate(4deg); } }\n\n/* ------------------------------------------------ picker */\n.picker { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; background: #2b2560; }\n.picker-top { display: flex; justify-content: center; padding: 22px 24px 0; min-height: 30px; }\n.kids { flex: 1; display: flex; gap: 22px; padding: 22px 28px 34px; align-items: stretch; justify-content: center; }\n.kid-door {\n  position: relative; isolation: isolate; flex: 1 1 0; max-width: 520px; min-width: 220px; overflow: hidden; padding: 0;\n  border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink);\n  display: flex; flex-direction: column; align-items: center; justify-content: flex-end;\n  transition: transform .1s, box-shadow .1s;\n}\n.kid-door:active { transform: translateY(8px); box-shadow: 0 2px 0 var(--ink); }\n.kid-door .pet-big { position: relative; z-index: 1; font-size: 140px; font-size: clamp(110px, 14vw, 190px); line-height: 1; margin-bottom: 6px; }\n.kid-door .door-name {\n  position: relative; z-index: 1; margin: 0 0 18px; padding: 4px 26px 0; background: var(--paper);\n  border: 4px solid var(--ink); border-radius: 999px; font-size: 34px; font-size: clamp(28px, 3vw, 44px); font-weight: 800; line-height: 1.2;\n}\n.dots { position: relative; z-index: 1; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 18px; max-width: 80%; }\n.dot { width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--ink); background: var(--paper); }\n.dot.on { background: var(--grass); }\n.dot.wait { background: var(--sun); }\n.door-crown { position: absolute; top: 18px; right: 22px; z-index: 1; font-size: 46px; }\n\n.parent-btn {\n  position: absolute; right: 18px; bottom: 16px; z-index: 5; width: 58px; height: 58px; border-radius: 50%;\n  font-size: 26px; display: grid; place-items: center; opacity: .85;\n}\n.parent-btn .ring { position: absolute; top: -6px; right: -6px; bottom: -6px; left: -6px; border-radius: 50%; border: 5px solid var(--sun); clip-path: inset(0 100% 0 0); }\n.parent-btn.holding .ring, .parent-inline.holding .ring { animation: wipe 1s linear forwards; }\n.parent-inline .ring { position: absolute; top: -6px; right: -6px; bottom: -6px; left: -6px; border: 5px solid var(--sun); clip-path: inset(0 100% 0 0); }\n@keyframes wipe { to { clip-path: inset(0 0 0 0); } }\n\n.empty { margin: auto; text-align: center; color: #fff; font-family: var(--ui-font); max-width: 34ch; }\n.empty .big { font-size: 96px; }\n.empty p { font-size: 20px; line-height: 1.5; }\n.empty button { padding: 14px 26px; font-size: 20px; font-weight: 800; color: var(--ink); }\n\n/* quest path */\n.quest-path {\n  display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: rgba(255,255,255,.95);\n  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 30px;\n}\n.quest-path .stones { display: flex; gap: 6px; }\n.stone { width: 22px; height: 22px; border-radius: 50% 45% 55% 48%; border: 3px solid var(--ink); background: var(--mist); }\n.stone.on { background: var(--sun); }\n.quest-path .goal { font-size: 40px; line-height: 1; }\n.quest-path.done { background: var(--sun); }\n\n/* ------------------------------------------------ kid screen */\n.kid { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: grid; grid-template-columns: minmax(300px, 40%) 1fr; grid-template-rows: auto 1fr auto; grid-template-areas: "top top" "scene board" "dock board"; }\n.kid .topbar { grid-area: top; } .kid .scene { grid-area: scene; } .kid .board { grid-area: board; } .kid .dock { grid-area: dock; }\n.topbar { grid-column: 1 / -1; display: flex; align-items: center; gap: 14px; padding: 16px 20px 0; position: relative; z-index: 2; }\n.icon-btn { width: 74px; height: 74px; font-size: 38px; display: grid; place-items: center; border-radius: 24px; }\n.counter {\n  display: flex; align-items: center; gap: 8px; padding: 4px 22px 0 14px; height: 74px; background: var(--paper);\n  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 46px; font-weight: 800;\n}\n.counter .ico { font-size: 44px; margin-top: -6px; }\n.spacer { flex: 1; }\n.streak.off { filter: grayscale(1); opacity: .6; }\n\n.scene { position: relative; display: flex; align-items: center; justify-content: center; z-index: 1; }\n/* The square used to come from aspect-ratio (Chrome 88). The width is known here,\n   so repeating it as the height is exact rather than a fallback. */\n.nest { position: relative; width: 34vw; width: min(34vw, 380px); height: 34vw; height: min(34vw, 380px); display: grid; place-items: center; }\n.nest svg.ring { position: absolute; top: 0; right: 0; bottom: 0; left: 0; transform: rotate(-90deg); }\n.nest .pet { font-size: calc(var(--pet-scale) * 18vw); font-size: calc(var(--pet-scale) * min(18vw, 200px)); line-height: 1; position: relative; }\n@media (prefers-reduced-motion: no-preference) {\n  .nest .pet { animation: bob 3s ease-in-out infinite; }\n  .nest .pet.jump { animation: jump .7s cubic-bezier(.3,1.6,.5,1); }\n  .nest .pet.dance { animation: dance 1s ease-in-out infinite; }\n  .nest .pet.sleepy { animation: breathe 4s ease-in-out infinite; }\n  .sparkle-orbit { animation: spin 9s linear infinite; }\n}\n@keyframes bob { 50% { transform: translateY(-12px); } }\n@keyframes jump { 30% { transform: translateY(-70px) scale(1.1, .92); } 60% { transform: translateY(0) scale(.92, 1.08); } }\n@keyframes dance { 25% { transform: rotate(-10deg) translateY(-14px); } 75% { transform: rotate(10deg) translateY(-14px); } }\n@keyframes breathe { 50% { transform: scale(1.04, .97); } }\n@keyframes spin { to { transform: rotate(360deg); } }\n.crown { position: absolute; top: 4%; font-size: calc(18vw * .34); font-size: calc(min(18vw, 200px) * .34); z-index: 2; }\n.sparkle-orbit { position: absolute; top: 6%; right: 6%; bottom: 6%; left: 6%; }\n.sparkle-orbit span { position: absolute; font-size: 34px; }\n.lvl {\n  position: absolute; bottom: 2%; left: 50%; transform: translateX(-50%); min-width: 64px; height: 64px; padding: 6px 12px 0;\n  background: var(--sun); border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 5px 0 var(--ink);\n  font-size: 36px; font-weight: 800; text-align: center; line-height: 1.3;\n}\n.bubble {\n  position: absolute; top: 6%; right: -2%; min-width: 92px; height: 92px; display: grid; place-items: center; padding: 0 12px;\n  background: var(--paper); border: 4px solid var(--ink); border-radius: 46px; font-size: 52px; z-index: 3;\n}\n.bubble::after {\n  content: ""; position: absolute; left: 10px; bottom: -14px; width: 26px; height: 26px; background: var(--paper);\n  border-left: 4px solid var(--ink); border-bottom: 4px solid var(--ink); transform: rotate(-35deg) skewX(15deg);\n}\n.pet-name { position: absolute; bottom: -54px; left: 50%; transform: translateX(-50%); font-size: 30px; font-weight: 800; color: #fff; text-shadow: 0 3px 0 var(--ink); white-space: nowrap; }\n\n.board { position: relative; z-index: 1; overflow-y: auto; padding: 18px 28px 40px 6px; display: flex; flex-direction: column; gap: 18px; scrollbar-width: none; }\n.board::-webkit-scrollbar { display: none; }\n.slot-row { display: flex; align-items: flex-start; gap: 16px; }\n.slot-ico {\n  flex: 0 0 auto; width: 70px; height: 70px; margin-top: 30px; display: grid; place-items: center; font-size: 42px;\n  background: rgba(255,255,255,.85); border: 4px solid var(--ink); border-radius: 50%;\n}\n.slot-row.now .slot-ico { background: var(--sun); }\n.stickers { display: flex; flex-wrap: wrap; gap: 22px 20px; padding-top: 8px; }\n\n.sticker {\n  position: relative; width: 148px; height: 156px; padding: 10px 6px 0; display: flex; flex-direction: column; align-items: center;\n  background: var(--paper); border: 5px solid var(--ink); border-radius: 38px 34px 40px 36px; box-shadow: 0 8px 0 var(--ink);\n  transition: transform .15s, box-shadow .15s;\n}\n.sticker:nth-child(3n+1) { transform: rotate(-2deg); }\n.sticker:nth-child(3n+2) { transform: rotate(1.5deg); }\n.sticker .emo { font-size: 76px; line-height: 1.15; }\n.sticker .pips { display: flex; gap: 2px; font-size: 22px; line-height: 1; margin-top: 2px; }\n.sticker.sel { transform: translateY(-10px) scale(1.06) rotate(0); box-shadow: 0 16px 0 var(--ink); z-index: 2; }\n.sticker.done { background: #e4f7ec; }\n.sticker.done .emo { opacity: .55; }\n.sticker.pending { background: #fff4d1; border-style: dashed; }\n.stamp {\n  position: absolute; top: -16px; right: -16px; width: 62px; height: 62px; display: grid; place-items: center;\n  border: 4px solid var(--ink); border-radius: 50%; font-size: 34px; color: #fff; font-weight: 800;\n}\n.done .stamp { background: var(--grass); }\n.pending .stamp { background: var(--sun); }\n.go {\n  position: absolute; left: 50%; bottom: -36px; transform: translateX(-50%); width: 120px; height: 72px; z-index: 3;\n  display: grid; place-items: center; background: var(--grass); color: #fff; font-size: 46px; font-weight: 800;\n  border: 5px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink);\n}\n@media (prefers-reduced-motion: no-preference) { .go { animation: pulse 1.1s ease-in-out infinite; } }\n@keyframes pulse { 50% { transform: translateX(-50%) scale(1.08); } }\n.go.undo { background: var(--berry); }\n.go.hold { overflow: hidden; animation: none; }\n.go.hold .ring { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(255,255,255,.45); transform-origin: left; transform: scaleX(0); }\n.go.hold.holding .ring { transition: transform 1s linear; transform: scaleX(1); }\n\n/* family strip on the picker: what everyone did today, as pictures (no scores) */\n.kid-door.grown { flex: .7 1 0; min-width: 180px; }\n.kid-door.grown .pet-big { font-size: 110px; font-size: clamp(80px, 10vw, 140px); }\n.kid-door.grown .door-name { font-size: 26px; font-size: clamp(22px, 2.4vw, 34px); }\n.family-chip {\n  display: flex; align-items: center; gap: 10px; padding: 6px 18px 2px; margin-left: 14px; background: rgba(255,255,255,.95);\n  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 28px; font-weight: 800; white-space: nowrap;\n}\n.feed { display: flex; align-items: center; gap: 12px; margin: -14px 96px 22px 28px; min-width: 0; padding: 8px 12px; min-height: 64px;\n  background: rgba(255,255,255,.12); border-radius: 999px; }\n.feed .lead-ico { font-size: 34px; padding-left: 6px; }\n.feed-chips { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 4px 2px; }\n.feed-chips::-webkit-scrollbar { display: none; }\n.fchip { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; padding: 4px 12px 2px; background: var(--paper);\n  border: 3px solid var(--ink); border-radius: 999px; font-size: 30px; line-height: 1.2; }\n.fchip.pending { background: #fff4d1; }\n.fchip .who { font-size: 24px; }\n.feed .empty-feed { color: rgba(255,255,255,.75); font-family: var(--ui-font); font-weight: 700; font-size: 17px; }\n.go:active { box-shadow: 0 1px 0 var(--ink); }\n\n.alldone {\n  align-self: center; margin: auto 0; padding: 26px 36px 18px; text-align: center; background: var(--paper);\n  border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink); font-size: 74px; line-height: 1.1;\n}\n.alldone small { display: block; font-size: 22px; font-family: var(--ui-font); font-weight: 700; margin-top: 8px; }\n.notasks { color: #fff; font-size: 30px; text-shadow: 0 3px 0 var(--ink); margin: auto; text-align: center; }\n.notasks div { font-size: 110px; }\n\n.dock { display: flex; justify-content: center; gap: 22px; padding: 0 20px 20px; position: relative; z-index: 2; }\n.dock button { width: 108px; height: 92px; font-size: 52px; display: grid; place-items: center; border-radius: 30px; position: relative; }\n.dock .badge-n {\n  position: absolute; top: -12px; right: -12px; min-width: 40px; height: 40px; padding: 2px 8px 0; border-radius: 999px;\n  background: var(--berry); color: #fff; border: 3px solid var(--ink); font-size: 22px; font-weight: 800; line-height: 1.4;\n}\n\n/* ------------------------------------------------ sub screens (shop, stickers, quest) */\n.sub { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; }\n.sub .topbar { padding-bottom: 6px; }\n.panel {\n  position: relative; z-index: 1; flex: 1; margin: 12px 24px 24px; padding: 24px; overflow-y: auto;\n  background: rgba(255,255,255,.93); border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink);\n}\n.shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(176px, 1fr)); gap: 26px 22px; }\n.book { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 26px 26px; }\n.reward { position: relative; width: auto; height: 214px; }\n.reward .emo { font-size: 90px; }\n.reward .rname { font-family: var(--ui-font); font-size: 15px; font-weight: 700; opacity: .75; line-height: 1.2; text-align: center; }\n.reward .cost { display: flex; align-items: center; gap: 4px; font-size: 28px; font-weight: 800; margin-top: 4px; }\n.reward.poor { background: #f1eef7; }\n.reward.poor .emo { filter: grayscale(.8); opacity: .6; }\n.fill { width: 80%; height: 16px; margin-top: 6px; border: 3px solid var(--ink); border-radius: 999px; background: var(--paper); overflow: hidden; }\n.fill i { display: block; height: 100%; background: var(--sun); }\n.reward.rich { box-shadow: 0 8px 0 var(--ink), 0 0 0 8px rgba(255,201,60,.55); }\n\n.slot-badge { aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; font-size: 62px; border: 5px solid var(--ink); background: var(--paper); box-shadow: 0 7px 0 var(--ink); position: relative; }\n/* Below Chrome 88 the badge is not a square by itself. The grid track it sits in is\n   at least 132px wide, so that height keeps it close to round. */\n@supports not (aspect-ratio: 1 / 1) { .slot-badge { height: 132px; } }\n.slot-badge.locked { background: var(--mist); border-style: dashed; box-shadow: none; }\n.slot-badge.locked .sil { filter: brightness(0); opacity: .14; }\n.slot-badge .blabel { position: absolute; bottom: -42px; left: -10px; right: -10px; text-align: center; font-family: var(--ui-font); font-size: 14px; font-weight: 700; opacity: .7; line-height: 1.15; }\n.book { row-gap: 62px; padding-bottom: 30px; }\n\n.quest-big { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; min-height: 100%; }\n.quest-big .goal { font-size: 140px; line-height: 1; }\n.quest-big .trail { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; max-width: 980px; }\n.quest-big .trail .walkers { display: flex; font-size: 58px; line-height: 1; margin: 0 4px; filter: drop-shadow(0 4px 0 rgba(46,42,92,.3)); }\n.quest-big .trail .goal { font-size: 96px; margin-left: 8px; }\n.quest-big .stone { width: 62px; height: 62px; border-width: 4px; }\n.quest-big .reward-txt { font-family: var(--ui-font); font-size: 22px; font-weight: 700; text-align: center; }\n\n/* ------------------------------------------------ overlays */\n.celebrate {\n  position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;\n  background: rgba(46,42,92,.72); color: #fff; text-align: center;\n}\n.celebrate .hero { font-size: 200px; line-height: 1; filter: drop-shadow(0 8px 0 var(--ink)); }\n.celebrate .title { font-size: 64px; font-weight: 800; text-shadow: 0 5px 0 var(--ink); line-height: 1; }\n.celebrate .sub2 { font-family: var(--ui-font); font-size: 22px; font-weight: 700; opacity: .9; }\n@media (prefers-reduced-motion: no-preference) { .celebrate .hero { animation: pop .7s cubic-bezier(.3,1.7,.5,1); } }\n@keyframes pop { from { transform: scale(.2) rotate(-30deg); } }\n.flyer { position: absolute; font-size: 54px; z-index: 30; pointer-events: none; }\n.confetti { position: absolute; top: -20px; width: 14px; height: 22px; border-radius: 4px; border: 2px solid var(--ink); pointer-events: none; }\n.toast {\n  position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); padding: 12px 24px; z-index: 40;\n  background: var(--ink); color: #fff; border-radius: 999px; font-family: var(--ui-font); font-weight: 700; font-size: 18px;\n}\n\n/* ------------------------------------------------ PIN pad */\n.pinpad { position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 10; display: grid; place-items: center; background: rgba(46,42,92,.86); font-family: var(--ui-font); }\n.pinbox { background: var(--paper); border: 5px solid var(--ink); border-radius: 32px; padding: 26px; box-shadow: 0 10px 0 var(--ink); text-align: center; }\n.pinbox h2 { margin: 0 0 6px; font-family: var(--kid-font); font-size: 30px; }\n.pindots { display: flex; justify-content: center; gap: 12px; margin: 12px 0 18px; height: 22px; }\n.pindots i { width: 20px; height: 20px; border-radius: 50%; border: 3px solid var(--ink); }\n.pindots i.on { background: var(--ink); }\n.keys { display: grid; grid-template-columns: repeat(3, 84px); gap: 12px; }\n.keys button { height: 74px; font-size: 32px; font-weight: 800; border-radius: 20px; }\n.pinbox .cancel { margin-top: 16px; background: none; border: 0; font-weight: 700; font-size: 17px; text-decoration: underline; }\n.shake { animation: shake .35s; }\n@keyframes shake { 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }\n\n/* ------------------------------------------------ parents area */\n.admin { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: grid; grid-template-columns: 230px 1fr; background: #f6f3fb; font-family: var(--ui-font); user-select: text; -webkit-user-select: text; }\n.admin nav { background: var(--ink); color: #fff; padding: 20px 14px; display: flex; flex-direction: column; gap: 6px; }\n.admin nav h1 { font-family: var(--kid-font); font-size: 26px; margin: 0 8px 14px; line-height: 1.1; }\n.admin nav button { text-align: left; background: none; border: 0; border-radius: 14px; padding: 11px 14px; font-size: 17px; font-weight: 700; color: #fff; display: flex; gap: 10px; align-items: center; }\n.admin nav button.on { background: rgba(255,255,255,.16); }\n.admin nav button .n { margin-left: auto; background: var(--berry); border-radius: 999px; padding: 0 9px; font-size: 14px; }\n.admin nav .exit { margin-top: auto; background: var(--sun); color: var(--ink); justify-content: center; }\n.admin main { overflow-y: auto; padding: 28px 34px 60px; }\n.admin h2 { font-family: var(--kid-font); font-size: 30px; margin: 0 0 4px; }\n.admin h3 { font-size: 18px; margin: 28px 0 10px; }\n.admin .lead { margin: 0 0 18px; color: #5e5884; font-size: 16px; max-width: 70ch; line-height: 1.5; }\n.rows { display: flex; flex-direction: column; gap: 10px; }\n.row { display: flex; align-items: center; gap: 14px; background: #fff; border: 2px solid #ddd6ee; border-radius: 18px; padding: 12px 16px; }\n.row .ri { font-size: 34px; width: 46px; text-align: center; }\n.row .rt { flex: 1; min-width: 0; }\n.row .rt b { display: block; font-size: 17px; }\n.row .rt span { color: #6a648f; font-size: 14px; }\n.row.off { opacity: .55; }\n.btn { border: 2px solid var(--ink); background: #fff; border-radius: 12px; padding: 8px 14px; font-weight: 800; font-size: 15px; }\n.btn.primary { background: var(--ink); color: #fff; }\n.btn.ok { background: var(--grass); color: #fff; border-color: #2b8a5c; }\n.btn.danger { color: #c3245a; border-color: #c3245a; }\n.btn.big { padding: 12px 20px; font-size: 16px; }\n.muted { color: #6a648f; }\n.empty-note { padding: 18px; border: 2px dashed #ccc3e3; border-radius: 18px; color: #6a648f; }\n.stars-ctl { display: flex; align-items: center; gap: 8px; }\n.stars-ctl b { min-width: 52px; text-align: center; font-size: 18px; }\n\n.modal-bg { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(46,42,92,.6); display: grid; place-items: center; padding: 20px; font-family: var(--ui-font); user-select: text; -webkit-user-select: text; }\n.modal { width: 100%; max-width: 640px; max-height: 100%; overflow-y: auto; background: #fff; border-radius: 26px; padding: 24px 26px; border: 4px solid var(--ink); }\n.modal h2 { font-family: var(--kid-font); margin: 0 0 14px; font-size: 28px; }\n.field { margin-bottom: 16px; }\n.field > label, .field > .lab { display: block; font-weight: 800; margin-bottom: 6px; font-size: 15px; }\n.field input[type=text], .field input[type=number], .field select { width: 100%; padding: 11px 13px; font: inherit; font-size: 17px; border: 2px solid #cfc6e6; border-radius: 12px; }\n.hint { font-size: 13px; color: #6a648f; margin-top: 4px; }\n.picks { display: flex; flex-wrap: wrap; gap: 8px; }\n.picks label { position: relative; }\n.picks input { position: absolute; opacity: 0; top: 0; right: 0; bottom: 0; left: 0; }\n.picks span { display: grid; place-items: center; min-width: 50px; height: 50px; padding: 0 10px; font-size: 28px; border: 2px solid #ddd6ee; border-radius: 14px; background: #fff; }\n.picks.text span { font-size: 15px; font-weight: 800; }\n.picks input:checked + span { border-color: var(--ink); background: #fff3c9; box-shadow: 0 3px 0 var(--ink); }\n.picks input:focus + span { outline: 3px solid var(--sun); }\n.picks input:focus:not(:focus-visible) + span { outline: none; }\n.picks input:focus-visible + span { outline: 3px solid var(--sun); }\n.theme-sw { width: 90px; height: 54px; border-radius: 12px; border: 2px solid #ddd6ee; display: flex; align-items: flex-end; justify-content: center; font-size: 13px !important; font-weight: 800; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.4); padding-bottom: 4px !important; }\n.toggle { display: flex; align-items: center; gap: 10px; font-weight: 700; }\n.toggle input { width: 22px; height: 22px; }\n.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }\n.actions .left { margin-right: auto; }\n.code { font-family: ui-monospace, monospace; background: #f1edf9; padding: 2px 6px; border-radius: 6px; font-size: 14px; }\n.progress { height: 18px; border-radius: 999px; background: #ebe5f6; overflow: hidden; margin: 10px 0; }\n.progress i { display: block; height: 100%; background: var(--sun); }\n\n/* ------------------------------------------------ responsive\n   Driven by _watchWidth(), not by an @container query: the query needs Chrome 105,\n   and below that the whole block was skipped -- a tablet in portrait then got the\n   wide two-column layout. The class is set from the card\'s own width, which is\n   what the query measured too. Breakpoint: NARROW_AT. */\n.root.narrow .kid { grid-template-columns: 1fr; grid-template-rows: auto auto 1fr auto; grid-template-areas: "top" "scene" "board" "dock"; }\n.root.narrow .nest { width: 58vw; width: min(58vw, 260px); height: 58vw; height: min(58vw, 260px); }\n.root.narrow .nest .pet { font-size: calc(var(--pet-scale) * 34vw); }\n.root.narrow .crown { font-size: 12vw; }\n.root.narrow .scene { padding: 6px 0 44px; }\n.root.narrow .board { padding: 10px 16px 24px; overflow: visible; }\n.root.narrow .topbar { padding: 12px 12px 0; gap: 8px; }\n.root.narrow .icon-btn { width: 56px; height: 56px; font-size: 28px; border-radius: 18px; }\n.root.narrow .counter { height: 56px; font-size: 30px; padding: 4px 14px 0 10px; }\n.root.narrow .counter .ico { font-size: 28px; margin-top: -4px; }\n.root.narrow .sticker { width: 118px; height: 128px; }\n.root.narrow .sticker .emo { font-size: 58px; }\n.root.narrow .slot-ico { width: 52px; height: 52px; font-size: 30px; margin-top: 24px; }\n.root.narrow .bubble { min-width: 70px; height: 70px; font-size: 38px; }\n.root.narrow .lvl { min-width: 50px; height: 50px; font-size: 28px; }\n.root.narrow .dock { position: sticky; bottom: 0; padding: 12px; }\n.root.narrow .dock button { width: 84px; height: 72px; font-size: 40px; }\n.root.narrow .kid { position: absolute; overflow-y: auto; grid-template-rows: auto auto auto auto; }\n.root.narrow .kids { flex-direction: column; overflow-y: auto; }\n.root.narrow .kid-door.grown { min-height: 220px; }\n.root.narrow .picker { overflow-y: auto; }\n.root.narrow .kids { overflow: visible; flex: 0 0 auto; }\n.root.narrow .feed { margin: 0 84px 18px 14px; }\n.root.narrow .quest-path { max-width: 100%; gap: 6px; padding: 8px 12px; font-size: 24px; }\n.root.narrow .quest-path .stone { width: 14px; height: 14px; border-width: 2px; }\n.root.narrow .quest-path .goal { font-size: 30px; }\n.root.narrow .parent-btn { position: fixed; }\n.root.narrow .family-chip { font-size: 22px; padding: 4px 12px 0; }\n.root.narrow .picker-top { flex-wrap: wrap; gap: 10px; }\n.root.narrow .kid-door { min-height: 300px; max-width: none; }\n.root.narrow .admin { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }\n.root.narrow .admin nav { flex-direction: row; overflow-x: auto; padding: 10px; }\n.root.narrow .admin nav h1 { display: none; }\n.root.narrow .admin nav .exit { margin-top: 0; margin-left: auto; }\n.root.narrow .admin main { padding: 20px 16px 60px; }\n';
  class HelferheldenCard extends HTMLElement {
    static getStubConfig() {
      return {};
    }
    setConfig(config) {
      this._config = __spreadValues({ idle: 90, sound: true, speech: true, height: "calc(100vh - 64px)" }, config);
      ensureFonts(this._config.font_base || DEFAULT_FONT_BASE);
      if (this._root) this._root.style.setProperty("--hh-height", this._config.height);
    }
    getCardSize() {
      return 12;
    }
    getGridOptions() {
      return { columns: "full", rows: 12, min_rows: 8 };
    }
    set hass(hass) {
      this._hass = hass;
      const before = LANG;
      setLang(hass == null ? void 0 : hass.language);
      if (LANG !== before && this._state) this._render();
      if (!this._subscribed && this.isConnected) this._subscribe();
    }
    connectedCallback() {
      if (this._config) ensureFonts(this._config.font_base || DEFAULT_FONT_BASE);
      if (!this.shadowRoot) this._build();
      this._watchWidth();
      if (this._hass && !this._subscribed) this._subscribe();
      this._armIdle();
    }
    disconnectedCallback() {
      if (this._unsub) Promise.resolve(this._unsub).then((u) => typeof u === "function" && u()).catch(() => {
      });
      this._unsub = null;
      this._subscribed = false;
      clearTimeout(this._idleT);
      clearTimeout(this._retryT);
      if (this._widthOff) {
        this._widthOff();
        this._widthOff = null;
      }
    }
    /** Keep `.narrow` on .root in step with the card's own width.
     *
     * This replaces the `@container` query the stacked layout used to live in. A
     * ResizeObserver measures the same box the query did -- the card, not the viewport --
     * and works from Chrome 64 instead of 105. Idempotent, so reconnecting re-arms it.
     */
    _watchWidth() {
      if (this._widthOff) return;
      const apply = () => {
        const w = this._root.clientWidth;
        if (w) this._root.classList.toggle("narrow", w <= NARROW_AT);
      };
      apply();
      if (typeof ResizeObserver === "function") {
        const ro = new ResizeObserver(apply);
        ro.observe(this._root);
        this._widthOff = () => ro.disconnect();
        return;
      }
      const t = setTimeout(apply, 0);
      window.addEventListener("resize", apply);
      this._widthOff = () => {
        clearTimeout(t);
        window.removeEventListener("resize", apply);
      };
    }
    _build() {
      var _a, _b;
      this._sfx = new Sfx();
      this._voice = new Voice(this);
      this._ui = { screen: ((_a = this._config) == null ? void 0 : _a.child) ? "kid" : "picker", childId: null, sel: null, tab: "today" };
      this._pin = null;
      this._queue = [];
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = "<style>".concat(STYLES, '</style><div class="root"><div class="view"></div><div class="layer"></div></div>');
      this._root = shadow.querySelector(".root");
      this._root.style.setProperty("--hh-height", ((_b = this._config) == null ? void 0 : _b.height) || "calc(100vh - 64px)");
      this._viewEl = shadow.querySelector(".view");
      this._layer = shadow.querySelector(".layer");
      this._root.addEventListener("click", (e) => this._onClick(e));
      this._root.addEventListener("pointerdown", (e) => this._onDown(e));
      ["pointerup", "pointercancel", "pointerleave"].forEach((t) => this._root.addEventListener(t, () => this._onUp()));
      this._root.addEventListener("pointerdown", () => this._armIdle(), true);
      this._render();
    }
    async _subscribe() {
      this._subscribed = true;
      const pending = this._hass.connection.subscribeMessage((s) => this._onState(s), { type: "helferhelden/subscribe" });
      this._unsub = pending;
      try {
        await pending;
        this._error = null;
        this._retryDelay = 0;
      } catch (err) {
        this._unsub = null;
        this._error = tr(err == null ? void 0 : err.message) || tr("Helferhelden ist nicht erreichbar. Ist die Integration eingerichtet?");
        this._render();
        this._retryDelay = Math.min(6e4, (this._retryDelay || 2500) * 2);
        clearTimeout(this._retryT);
        this._retryT = setTimeout(() => {
          if (this.isConnected) this._subscribe();
        }, this._retryDelay);
      }
    }
    /* -------------------------------------------------------------- data */
    _onState(state) {
      const prev = this._state;
      this._state = state;
      if (this._config.child && !this._ui.childId) {
        const c = state.children.find((k) => k.name.toLowerCase() === String(this._config.child).toLowerCase() || k.id === this._config.child);
        if (c) this._ui.childId = c.id;
      }
      if (prev) this._detect(prev, state);
      if (this._ui.screen === "pin") return;
      this._render();
    }
    _child(id = this._ui.childId) {
      var _a;
      return (_a = this._state) == null ? void 0 : _a.children.find((c) => c.id === id);
    }
    _detect(prev, next) {
      var _a, _b, _c, _d;
      if (((_a = next.family) == null ? void 0 : _a.done_today) && !((_b = prev.family) == null ? void 0 : _b.done_today) && !["admin", "pin"].includes(this._ui.screen)) {
        this._enqueue({
          kind: "family",
          hero: "\u{1F3E1}",
          title: "Familien-Tag geschafft!",
          say: say("family"),
          sub: next.family.streak > 1 ? "\u{1F525} ".concat(next.family.streak, " Tage als Team") : ""
        });
      }
      const id = this._ui.childId;
      if (!id || !["kid", "shop"].includes(this._ui.screen)) return;
      const a = prev.children.find((c) => c.id === id);
      const b = next.children.find((c) => c.id === id);
      if (!a || !b) return;
      if (b.total > 0 && a.done < a.total && b.done === b.total) {
        this._enqueue({ kind: "alldone", hero: ((_c = PETS[b.pet]) == null ? void 0 : _c[0]) || "\u{1F389}", title: "Alles geschafft!", say: say("alldone", { n: b.name }), sub: b.streak > 1 ? "\u{1F525} ".concat(b.streak, " Tage am St\xFCck") : "" });
      }
      if (b.level > a.level) {
        this._enqueue({ kind: "level", hero: "\u{1F199}", title: "Level ".concat(b.level, "!"), say: say("level", { l: b.level }), sub: b.stage > a.stage ? "".concat(b.pet_name || ((_d = PETS[b.pet]) == null ? void 0 : _d[1]), " ist gewachsen") : "" });
      }
      Object.keys(b.badges).filter((k) => !(k in a.badges)).forEach((k) => {
        const meta = next.badges[k];
        this._enqueue({ kind: "badge", hero: meta.icon, title: tr("Neuer Stern!"), say: say("badge"), sub: meta.label });
      });
      if (next.quest.completed_at && !prev.quest.completed_at) {
        this._enqueue({ kind: "quest", hero: next.quest.icon, title: tr("Abenteuer geschafft!"), say: say("quest", { r: next.quest.reward || "" }), sub: next.quest.reward });
      }
    }
    async _call(action, data, admin = false) {
      const msg = { type: "helferhelden/action", action, data };
      if (admin) msg.pin = this._pin;
      try {
        const res = await this._hass.callWS(msg);
        return res == null ? void 0 : res.result;
      } catch (err) {
        if ((err == null ? void 0 : err.code) === "bad_pin" || (err == null ? void 0 : err.code) === "pin_locked") {
          this._pin = null;
          this._go("pin");
        }
        this._toast(tr(err == null ? void 0 : err.message) || tr("Das hat nicht geklappt"));
        throw err;
      }
    }
    /* -------------------------------------------------------------- feedback */
    _speak(text) {
      if (!this._config.speech || !text) return;
      this._voice.speak(text).catch(() => {
      });
    }
    _prefetchFor(c) {
      if (!c || !this._config.speech) return;
      const vars = { n: c.name };
      const parent = c.role === "parent";
      this._voice.prefetch([
        ...allPhrases(parent ? "helloParent" : "hello", vars),
        ...allPhrases(parent ? "doneParent" : "done", vars),
        ...allPhrases("alldone", vars),
        ...allPhrases("badge"),
        ...c.tasks.map((t) => t.title)
      ]);
    }
    _sound(name) {
      if (this._config.sound) try {
        this._sfx[name]();
      } catch (_) {
      }
    }
    _toast(text) {
      const t = document.createElement("div");
      t.className = "toast";
      t.textContent = text;
      this._layer.appendChild(t);
      setTimeout(() => t.remove(), 2600);
    }
    _enqueue(item) {
      this._queue.push(item);
      if (!this._showing) {
        this._showing = true;
        setTimeout(() => this._next(), 650);
      }
    }
    _next() {
      if (["admin", "pin"].includes(this._ui.screen)) {
        this._showing = false;
        return;
      }
      const item = this._queue.shift();
      if (!item) {
        this._showing = false;
        return;
      }
      this._showing = true;
      const el = document.createElement("div");
      el.className = "celebrate";
      el.innerHTML = '<div class="hero">'.concat(esc(item.hero), '</div><div class="title">').concat(esc(item.title), "</div>").concat(item.sub ? '<div class="sub2">'.concat(esc(item.sub), "</div>") : "");
      this._layer.appendChild(el);
      this._sound(item.kind === "badge" ? "sparkle" : "fanfare");
      this._speak(item.say || item.title);
      this._confetti(item.kind === "badge" ? 30 : 70);
      const pet = this.shadowRoot.querySelector(".nest .pet");
      if (pet && item.kind === "alldone") pet.classList.add("dance");
      const close = () => {
        el.remove();
        clearTimeout(tm);
        setTimeout(() => this._next(), 200);
      };
      const tm = setTimeout(close, 3600);
      el.addEventListener("click", close);
    }
    _confetti(n) {
      if (reducedMotion()) return;
      const colors = ["#ffc93c", "#3fb87f", "#ff5d8f", "#6fc3ff", "#b48cf0", "#ffffff"];
      const w = this._root.clientWidth, h = this._root.clientHeight;
      for (let i = 0; i < n; i++) {
        const c = document.createElement("i");
        c.className = "confetti";
        c.style.left = "".concat(Math.random() * w, "px");
        c.style.background = colors[i % colors.length];
        this._layer.appendChild(c);
        const drift = (Math.random() - 0.5) * 240;
        c.animate(
          [{ transform: "translate(0,0) rotate(0)" }, { transform: "translate(".concat(drift, "px, ").concat(h + 60, "px) rotate(").concat(720 * Math.random(), "deg)") }],
          { duration: 1800 + Math.random() * 1400, delay: Math.random() * 400, easing: "cubic-bezier(.25,.6,.4,1)" }
        ).onfinish = () => c.remove();
      }
    }
    _flyStars(fromEl, count) {
      const target = this.shadowRoot.querySelector(".counter.stars");
      if (!fromEl || !target || reducedMotion()) return;
      const box = this._root.getBoundingClientRect();
      const a = fromEl.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      for (let i = 0; i < Math.min(count, 5); i++) {
        const s = document.createElement("div");
        s.className = "flyer";
        s.textContent = "\u2B50";
        s.style.left = "".concat(a.left - box.left + a.width / 2 - 27, "px");
        s.style.top = "".concat(a.top - box.top + a.height / 3, "px");
        this._layer.appendChild(s);
        const dx = b.left - a.left - a.width / 2 + 40, dy = b.top - a.top - a.height / 3;
        s.animate(
          [{ transform: "translate(0,0) scale(1)" }, { transform: "translate(".concat(dx / 2 + (i - 2) * 30, "px, ").concat(dy / 2 - 120, "px) scale(1.5)"), offset: 0.45 }, { transform: "translate(".concat(dx, "px, ").concat(dy, "px) scale(.6)") }],
          { duration: 900, delay: i * 110, easing: "ease-in-out", fill: "forwards" }
        ).onfinish = () => s.remove();
      }
    }
    _jumpPet() {
      const pet = this.shadowRoot.querySelector(".nest .pet");
      this._jumpAt = Date.now();
      if (!pet) return;
      pet.classList.remove("jump");
      void pet.offsetWidth;
      pet.classList.add("jump");
    }
    /* -------------------------------------------------------------- navigation */
    _go(screen, extra = {}) {
      this._ui = __spreadValues(__spreadProps(__spreadValues({}, this._ui), { screen, sel: null }), extra);
      if (["admin", "pin"].includes(screen)) {
        this._layer.querySelectorAll(".celebrate").forEach((el) => el.click());
        this._layer.querySelectorAll(".confetti").forEach((el) => el.remove());
      }
      this._render();
      if (!["admin", "pin"].includes(screen) && this._queue.length && !this._showing) {
        this._showing = true;
        setTimeout(() => this._next(), 400);
      }
    }
    _armIdle() {
      var _a;
      clearTimeout(this._idleT);
      if (!((_a = this._config) == null ? void 0 : _a.idle)) return;
      this._idleT = setTimeout(() => {
        this._pin = null;
        this._layer.querySelectorAll(".modal-bg").forEach((m) => m.remove());
        if (this._config.child) this._go("kid");
        else if (this._ui.screen !== "picker") this._go("picker", { childId: null });
      }, this._config.idle * 1e3);
    }
    /* -------------------------------------------------------------- input */
    _onDown(e) {
      this._holdFired = false;
      const el = e.target.closest("[data-hold]");
      if (!el) return;
      el.classList.add("holding");
      this._holdEl = el;
      this._holdT = setTimeout(() => {
        el.classList.remove("holding");
        this._holdFired = this._hold(el.dataset.hold, el.dataset.id);
      }, el.dataset.hold === "parent" || el.dataset.hold === "done" ? 1e3 : 650);
    }
    _onUp() {
      var _a;
      clearTimeout(this._holdT);
      (_a = this._holdEl) == null ? void 0 : _a.classList.remove("holding");
      this._holdEl = null;
    }
    _hold(kind, id) {
      var _a, _b;
      if (kind === "parent") {
        this._sound("tap");
        if (((_a = this._state) == null ? void 0 : _a.pin_set) && !this._pin) this._go("pin");
        else this._go("admin");
        return true;
      }
      if (kind === "done") {
        this._a_done(id);
        return true;
      }
      if (kind === "task") {
        const t = (_b = this._child()) == null ? void 0 : _b.tasks.find((x) => x.id === id);
        if (t && t.status !== "open") {
          this._ui.sel = { type: "undo", id };
          this._render();
          return true;
        }
      }
      return false;
    }
    _onClick(e) {
      if (this._holdFired) {
        this._holdFired = false;
        e.preventDefault();
        return;
      }
      if (e.target.closest(".go.hold")) return;
      const el = e.target.closest("[data-a]");
      if (!el) {
        if (this._ui.sel && !e.target.closest(".sticker")) {
          this._ui.sel = null;
          this._render();
        }
        return;
      }
      const { a, id } = el.dataset;
      const fn = this["_a_".concat(a)];
      if (fn) fn.call(this, id, el, e);
    }
    _a_pick(id) {
      const c = this._child(id);
      this._sound("tap");
      this._prefetchFor(c);
      if (c) this._speak(say(c.role === "parent" ? "helloParent" : "hello", { n: c.name }));
      this._go("kid", { childId: id });
    }
    _a_home() {
      this._pinEntry = "";
      this._sound("tap");
      this._config.child ? this._go("kid") : this._go("picker", { childId: null });
    }
    _a_kid() {
      this._sound("tap");
      this._go("kid");
    }
    _a_shop() {
      this._sound("tap");
      this._speak(tr("Belohnungen"));
      this._go("shop");
    }
    _a_book() {
      this._sound("tap");
      this._speak(tr("Deine Sternen-Sammlung"));
      this._go("book");
    }
    _a_quest() {
      this._sound("tap");
      const q = this._state.quest;
      this._speak(q.title || tr("Familien-Abenteuer"));
      this._go("quest");
    }
    _a_pet() {
      var _a;
      const c = this._child();
      if (!c) return;
      this._jumpPet();
      this._sound("tap");
      const open = c.tasks.find((t) => t.status === "open");
      const name = c.pet_name || ((_a = PETS[c.pet]) == null ? void 0 : _a[1]);
      if (c.mood === "party") this._speak("".concat(name, " freut sich riesig"));
      else if (open) this._speak("".concat(name, " sagt: ").concat(open.title));
      else this._speak("".concat(name, " hat dich lieb"));
    }
    _a_task(id) {
      var _a;
      const c = this._child();
      const t = c == null ? void 0 : c.tasks.find((x) => x.id === id);
      if (!t) return;
      this._sound("tap");
      this._speak(t.title);
      if (t.status === "open") {
        this._ui.sel = ((_a = this._ui.sel) == null ? void 0 : _a.id) === id ? null : { type: "task", id };
        this._render();
      }
    }
    /** Run one kid action at a time; hides the ✓ button immediately so double taps can't repeat it. */
    async _once(fn) {
      if (this._busy) return;
      this._busy = true;
      this._ui.sel = null;
      try {
        await fn();
      } catch (_) {
      } finally {
        this._busy = false;
        this._render();
      }
    }
    _a_done(id) {
      var _a;
      const c = this._child();
      const t = c == null ? void 0 : c.tasks.find((x) => x.id === id);
      if (!t || t.status !== "open" || this._busy) return;
      const sticker = this.shadowRoot.querySelector('.sticker[data-id="'.concat(id, '"]'));
      this._sound("chime");
      this._flyStars(sticker, t.stars);
      this._jumpPet();
      this._speak(say(c.role === "parent" ? "doneParent" : "done", { n: c.name }));
      (_a = sticker == null ? void 0 : sticker.querySelector(".go")) == null ? void 0 : _a.remove();
      return this._once(() => this._call("complete", { chore_id: id, child_id: c.id }));
    }
    _a_undo(id) {
      var _a;
      const c = this._child();
      if (this._busy) return;
      (_a = this.shadowRoot.querySelector('.sticker[data-id="'.concat(id, '"] .go'))) == null ? void 0 : _a.remove();
      this._sound("nope");
      return this._once(() => this._call("undo", { chore_id: id, child_id: c.id }));
    }
    _a_reward(id) {
      var _a;
      const c = this._child();
      const r = this._state.rewards.find((x) => x.id === id);
      if (!r || !c) return;
      this._sound("tap");
      if (c.stars >= r.cost) {
        this._speak("".concat(r.title, ". Das kostet ").concat(r.cost, " Sterne"));
        this._ui.sel = ((_a = this._ui.sel) == null ? void 0 : _a.id) === id ? null : { type: "reward", id };
      } else {
        this._speak("".concat(r.title, ". Noch ").concat(r.cost - c.stars, " Sterne sammeln"));
        this._ui.sel = null;
      }
      this._render();
    }
    _a_buy(id) {
      var _a;
      const c = this._child();
      const r = this._state.rewards.find((x) => x.id === id);
      if (!r || this._busy) return;
      (_a = this.shadowRoot.querySelector('.reward[data-id="'.concat(id, '"] .go'))) == null ? void 0 : _a.remove();
      return this._once(async () => {
        await this._call("buy", { reward_id: id, child_id: c.id });
        this._enqueue({ kind: "buy", hero: r.icon, title: "Gekauft!", say: say("buy", { t: r.title }), sub: "".concat(c.name, ": ").concat(r.title) });
      });
    }
    /* -------------------------------------------------------------- render */
    _render() {
      var _a;
      if (!this._viewEl) return;
      const s = this._state;
      if (this._error) {
        this._viewEl.innerHTML = '<div class="picker"><div class="empty"><div class="big">\u{1F50C}</div><p>'.concat(esc(this._error), "</p></div></div>");
        return;
      }
      if (!s) {
        this._viewEl.innerHTML = '<div class="picker"><div class="empty"><div class="big">\u{1F95A}</div><p>'.concat(tr("L\xE4dt \u2026"), "</p></div></div>");
        return;
      }
      const scr = this._ui.screen;
      let html;
      if (scr === "pin") html = this._picker() + this._pinpad();
      else if (scr === "admin") html = this._admin();
      else if (!this._child() && scr !== "picker" && scr !== "quest") {
        this._ui.screen = "picker";
        html = this._picker();
      } else if (scr === "kid") html = this._kid();
      else if (scr === "shop") html = this._shop();
      else if (scr === "book") html = this._book();
      else if (scr === "quest") html = this._questScreen();
      else html = this._picker();
      const SCROLLERS = [".kid", ".board", ".panel", ".admin main", ".kids", ".picker", ".feed-chips"];
      const saved = SCROLLERS.map((sel) => {
        const el = this._viewEl.querySelector(sel);
        return el ? [el.scrollTop, el.scrollLeft] : [0, 0];
      });
      const key = "".concat(scr, "|").concat(this._ui.tab || "", "|").concat(this._ui.childId || "");
      const sameScreen = this._lastScr === key;
      this._viewEl.innerHTML = html;
      this._lastScr = key;
      if (sameScreen) {
        SCROLLERS.forEach((sel, i) => {
          const [top, left] = saved[i];
          if (!top && !left) return;
          const el = this._viewEl.querySelector(sel);
          if (el) {
            el.scrollTop = top;
            el.scrollLeft = left;
          }
        });
      }
      if (scr === "pin") this._bindPin();
      if (Date.now() - (this._jumpAt || 0) < 600) (_a = this.shadowRoot.querySelector(".nest .pet")) == null ? void 0 : _a.classList.add("jump");
    }
    _themeVars(theme) {
      const t = THEMES[theme] || THEMES.space;
      return "--sky1:".concat(t.sky[0], ";--sky2:").concat(t.sky[1], ";");
    }
    _world(theme, decor = true) {
      const t = THEMES[theme] || THEMES.space;
      const d = decor ? t.decor.map(([e, top, left, size]) => '<span class="decor" style="top:'.concat(top, "%;left:").concat(left, "%;font-size:").concat(size, 'px">').concat(e, "</span>")).join("") : "";
      return '<div class="world" style="'.concat(this._themeVars(theme), '">').concat(d, '\n      <svg class="hill" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">\n        <path d="M0 120 C 200 40, 380 160, 600 100 S 1000 30, 1200 110 V300 H0Z" fill="').concat(t.hill, '"/>\n        <path d="M0 190 C 260 130, 460 230, 700 180 S 1050 140, 1200 190 V300 H0Z" fill="').concat(t.ground, '"/>\n      </svg></div>');
    }
    _petEmoji(c) {
      var _a;
      return ((_a = PETS[c.pet]) == null ? void 0 : _a[0]) || "\u{1F432}";
    }
    _questPath(q, compact) {
      if (!q.goal) return "";
      const n = Math.min(compact ? 12 : 30, q.goal);
      const on = Math.floor(q.progress / q.goal * n);
      const stones = Array.from({ length: n }, (_, i) => '<span class="stone '.concat(i < on ? "on" : "", '"></span>')).join("");
      return { stones, done: !!q.completed_at };
    }
    _picker() {
      const s = this._state;
      const q = s.quest;
      let top = "";
      if (q.goal) {
        const p = this._questPath(q, true);
        top = '<button class="quest-path '.concat(p.done ? "done" : "", '" data-a="questFromPicker" aria-label="Familien-Abenteuer: ').concat(esc(q.title), '">\n        <span>\u{1F468}\u200D\u{1F469}\u200D\u{1F467}</span><span class="stones">').concat(p.stones, '</span><span class="goal">').concat(esc(q.icon), "</span></button>");
      }
      const fam = s.family || {};
      if (fam.tasks_today || fam.streak) {
        top += '<div class="family-chip" aria-label="Heute zusammen '.concat(fam.stars_today, ' Sterne">\u{1F91D} \u2B50 ').concat(fam.stars_today || 0).concat(fam.streak ? " <span>\u{1F525} ".concat(fam.streak, "</span>") : "", "</div>");
      }
      const kids = s.children.map((c) => {
        const dots = c.tasks.map((t) => '<span class="dot '.concat(t.status === "done" ? "on" : t.status === "pending" ? "wait" : "", '"></span>')).join("");
        return '<button class="kid-door '.concat(c.role === "parent" ? "grown" : "", '" data-a="pick" data-id="').concat(c.id, '" aria-label="').concat(esc(c.name), '">\n        ').concat(this._world(c.theme), "\n        ").concat(c.total && c.done === c.total ? '<span class="door-crown">\u{1F3C6}</span>' : "", '\n        <span class="pet-big">').concat(this._petEmoji(c), '</span>\n        <span class="dots">').concat(dots, '</span>\n        <span class="door-name">').concat(esc(c.name), "</span>\n      </button>");
      }).join("");
      const byId = s.children.reduce((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {});
      const chips = (fam.feed || []).map((f) => byId[f.child_id] ? '<span class="fchip '.concat(f.status === "pending" ? "pending" : "", '" title="').concat(esc(byId[f.child_id].name), ": ").concat(esc(f.title), '"><span class="who">').concat(this._petEmoji(byId[f.child_id]), "</span>").concat(esc(f.icon), "</span>") : "").join("");
      const feed = s.children.length > 1 ? '<div class="feed" aria-label="'.concat(tr("Heute geschafft"), '"><span class="lead-ico">\u{1F64C}</span>').concat(chips ? '<div class="feed-chips">'.concat(chips, "</div>") : '<span class="empty-feed">'.concat(tr("Heute geschafft: hier erscheint jede erledigte Aufgabe der Familie."), "</span>"), "</div>") : "";
      const body = s.children.length ? '<div class="kids">'.concat(kids, "</div>").concat(feed) : '<div class="empty"><div class="big">\u{1F423}</div><p>'.concat(tr("Noch keine Kinder angelegt. Im Elternbereich legst du Kinder, Aufgaben und Belohnungen an."), '</p>\n         <button class="chunk" data-a="openParents">').concat(tr("Elternbereich \xF6ffnen"), "</button></div>");
      return '<div class="picker"><div class="picker-top">'.concat(top, "</div>").concat(body, '\n      <button class="parent-btn chunk" data-hold="parent" aria-label="').concat(tr("Elternbereich (gedr\xFCckt halten)"), '" title="').concat(tr("Elternbereich: gedr\xFCckt halten"), '"><span class="ring"></span>\u{1F512}</button></div>');
    }
    _a_openParents() {
      var _a;
      ((_a = this._state) == null ? void 0 : _a.pin_set) && !this._pin ? this._go("pin") : this._go("admin");
    }
    _a_questFromPicker() {
      this._sound("tap");
      this._speak(this._state.quest.title);
      this._go("quest");
    }
    _topbar(c, back = "home") {
      const streak = c.streak;
      return '<div class="topbar">\n      <button class="icon-btn chunk" data-a="'.concat(back, '" aria-label="').concat(tr("Zur\xFCck"), '">').concat(back === "home" ? this._config.child ? "\u2B50" : "\u{1F3E0}" : "\u2B05\uFE0F", "</button>\n      ").concat(this._config.child && back === "home" ? '<button class="icon-btn chunk parent-inline" data-hold="parent" aria-label="'.concat(tr("Elternbereich (gedr\xFCckt halten)"), '" style="font-size:26px;position:relative"><span class="ring" style="border-radius:24px"></span>\u{1F512}</button>') : "", '\n      <div class="spacer"></div>\n      <div class="counter streak ').concat(streak ? "" : "off", '" aria-label="').concat(streak, ' Tage am St\xFCck"><span class="ico">\u{1F525}</span>').concat(streak, '</div>\n      <div class="counter stars" aria-label="').concat(c.stars, ' Sterne"><span class="ico">\u2B50</span>').concat(c.stars, "</div>\n    </div>");
    }
    _kid() {
      var _a;
      const c = this._child();
      const s = this._state;
      const stage = c.stage;
      const scale = [0.72, 0.86, 0.96, 1][stage];
      const circ = 2 * Math.PI * 46;
      const open = c.tasks.find((t) => t.status === "open");
      const bubble = c.mood === "hungry" || c.mood === "ok" ? open ? esc(open.icon) : MOOD_ICON.ok : MOOD_ICON[c.mood] || "\u{1F60A}";
      const petCls = c.mood === "party" ? "dance" : c.mood === "sleepy" ? "sleepy" : "";
      const orbit = stage >= 2 ? '<div class="sparkle-orbit"><span style="top:0;left:46%">\u2728</span><span style="bottom:8%;left:2%">\u2728</span><span style="bottom:8%;right:2%">\u2728</span></div>' : "";
      const hour = (/* @__PURE__ */ new Date()).getHours();
      const nowSlot = hour < 11 ? "morning" : hour < 17 ? "day" : "evening";
      let board;
      if (!c.tasks.length) {
        board = '<div class="notasks"><div>\u{1F3D6}\uFE0F</div>'.concat(tr("Heute frei!"), "</div>");
      } else {
        const rows = Object.keys(SLOTS).map((slot) => {
          const tasks = c.tasks.filter((t) => t.slot === slot);
          if (!tasks.length) return "";
          return '<div class="slot-row '.concat(slot === nowSlot ? "now" : "", '"><div class="slot-ico" title="').concat(tr(SLOTS[slot][1]), '">').concat(SLOTS[slot][0], '</div>\n          <div class="stickers">').concat(tasks.map((t) => this._sticker(t)).join(""), "</div></div>");
        }).join("");
        const all = c.done === c.total ? '<div class="alldone">\u{1F389}'.concat(this._petEmoji(c), "\u{1F389}<small>").concat(tr("Alles erledigt f\xFCr heute"), "</small></div>") : "";
        board = all + rows;
      }
      const pending = s.quest.goal && !s.quest.completed_at;
      return '<div class="kid" style="'.concat(this._themeVars(c.theme), '">\n      ').concat(this._world(c.theme), "\n      ").concat(this._topbar(c), '\n      <div class="scene">\n        <div class="nest" style="--pet-scale:').concat(scale, '">\n          <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">\n            <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.28)" stroke="rgba(46,42,92,.35)" stroke-width="5"/>\n            <circle cx="50" cy="50" r="46" fill="none" stroke="#ffc93c" stroke-width="5" stroke-linecap="round"\n              stroke-dasharray="').concat((c.level_progress * circ).toFixed(1), " ").concat(circ.toFixed(1), '"/>\n          </svg>\n          ').concat(orbit, "\n          ").concat(stage >= 3 ? '<span class="crown">\u{1F451}</span>' : "", '\n          <button class="pet ').concat(petCls, '" data-a="pet" style="background:none;border:0;padding:0" aria-label="').concat(esc(c.pet_name || tr((_a = PETS[c.pet]) == null ? void 0 : _a[1])), '">').concat(this._petEmoji(c), '</button>\n          <div class="bubble" aria-hidden="true">').concat(bubble, '</div>\n          <div class="lvl" title="').concat(tr("Level"), '">').concat(c.level, "</div>\n          ").concat(c.pet_name ? '<div class="pet-name">'.concat(esc(c.pet_name), "</div>") : "", '\n        </div>\n      </div>\n      <div class="board">').concat(board, '</div>\n      <div class="dock">\n        ').concat(c.role === "parent" ? "" : '<button class="chunk" data-a="shop" aria-label="'.concat(tr("Belohnungen"), '">\u{1F381}</button>'), '\n        <button class="chunk" data-a="book" aria-label="').concat(tr("Sternen-Sammlung"), '">\u{1F3C5}<span class="badge-n">').concat(Object.keys(c.badges).length, "</span></button>\n        ").concat(s.quest.goal ? '<button class="chunk" data-a="quest" aria-label="'.concat(tr("Familien-Abenteuer"), '">').concat(esc(s.quest.icon)).concat(pending ? "" : "\u2705", "</button>") : "", "\n      </div>\n    </div>");
    }
    _sticker(t) {
      var _a;
      const sel = this._ui.sel;
      const pips = "\u2B50".repeat(Math.min(t.stars, 5));
      let extra = "";
      if (t.status === "done") extra = '<span class="stamp">\u2713</span>';
      if (t.status === "pending") extra = '<span class="stamp">\u23F3</span>';
      if ((sel == null ? void 0 : sel.id) === t.id && sel.type === "task") {
        extra += ((_a = this._child()) == null ? void 0 : _a.role) === "parent" ? '<button class="go hold" data-hold="done" data-id="'.concat(t.id, '" aria-label="').concat(tr("Fertig (gedr\xFCckt halten)"), '">\u2713<span class="ring"></span></button>') : '<button class="go" data-a="done" data-id="'.concat(t.id, '" aria-label="').concat(tr("Fertig"), '">\u2713</button>');
      }
      if ((sel == null ? void 0 : sel.id) === t.id && sel.type === "undo") extra += '<button class="go undo" data-a="undo" data-id="'.concat(t.id, '" aria-label="').concat(tr("R\xFCckg\xE4ngig"), '">\u21A9\uFE0F</button>');
      return '<div class="sticker '.concat(t.status, " ").concat((sel == null ? void 0 : sel.id) === t.id ? "sel" : "", '" role="button" tabindex="0" data-a="task" data-hold="task" data-id="').concat(t.id, '" aria-label="').concat(esc(t.title), '">\n      <span class="emo">').concat(esc(t.icon), '</span><span class="pips">').concat(pips, "</span>").concat(extra, "</div>");
    }
    _shop() {
      const c = this._child();
      const rewards = this._state.rewards.filter((r) => r.active).sort((a, b) => a.cost - b.cost);
      const items = rewards.map((r) => {
        var _a;
        const rich = c.stars >= r.cost;
        const sel = ((_a = this._ui.sel) == null ? void 0 : _a.type) === "reward" && this._ui.sel.id === r.id;
        const pct = Math.min(100, Math.round(c.stars / r.cost * 100));
        return '<div class="sticker reward '.concat(rich ? "rich" : "poor", " ").concat(sel ? "sel" : "", '" role="button" tabindex="0" data-a="reward" data-id="').concat(r.id, '" aria-label="').concat(esc(r.title), '">\n        <span class="emo">').concat(esc(r.icon), '</span>\n        <span class="rname">').concat(esc(r.title), '</span>\n        <span class="cost">\u2B50 ').concat(r.cost, "</span>\n        ").concat(rich ? "" : '<span class="fill"><i style="width:'.concat(pct, '%"></i></span>'), "\n        ").concat(sel ? '<button class="go" data-a="buy" data-id="'.concat(r.id, '" aria-label="').concat(tr("Kaufen"), '">\u2713</button>') : "", "\n      </div>");
      }).join("");
      return '<div class="sub" style="'.concat(this._themeVars(c.theme), '">').concat(this._world(c.theme, false), "\n      ").concat(this._topbar(c, "kid"), '\n      <div class="panel">').concat(items ? '<div class="shop-grid">'.concat(items, "</div>") : '<div class="notasks" style="color:var(--ink);text-shadow:none"><div>\u{1F381}</div></div>', "</div></div>");
    }
    _book() {
      const c = this._child();
      const all = this._state.badges;
      const slots = Object.entries(all).map(([k, b]) => k in c.badges ? '<div class="slot-badge" title="'.concat(esc(b.label), '">').concat(esc(b.icon), '<span class="blabel">').concat(esc(b.label), "</span></div>") : '<div class="slot-badge locked" title="'.concat(esc(b.label), '"><span class="sil">').concat(esc(b.icon), '</span><span class="blabel">').concat(esc(b.label), "</span></div>")).join("");
      return '<div class="sub" style="'.concat(this._themeVars(c.theme), '">').concat(this._world(c.theme, false), "\n      ").concat(this._topbar(c, "kid"), '<div class="panel"><div class="book">').concat(slots, "</div></div></div>");
    }
    _questScreen() {
      const s = this._state;
      const q = s.quest;
      const c = this._child();
      const theme = (c == null ? void 0 : c.theme) || "space";
      const back = c ? "kid" : "home";
      let body;
      if (!q.goal) {
        body = '<div class="quest-big"><div class="goal">\u{1F5FA}\uFE0F</div><div class="reward-txt">'.concat(tr("Gerade kein Abenteuer. Eltern k\xF6nnen eins im Elternbereich starten."), "</div></div>");
      } else {
        const n = Math.min(24, q.goal);
        const on = Math.floor(q.progress / q.goal * n);
        const walkers = '<span class="walkers">'.concat(s.children.map((k) => '<span title="'.concat(esc(k.name), '">').concat(this._petEmoji(k), "</span>")).join(""), "</span>");
        const stones = Array.from({ length: n }, (_, i) => '<span class="stone '.concat(i < on ? "on" : "", '"></span>'));
        stones.splice(on, 0, walkers);
        body = '<div class="quest-big">\n        <div class="trail">'.concat(stones.join(""), '<span class="goal">').concat(esc(q.icon)).concat(q.completed_at ? "\u2705" : "", '</span></div>\n        <div class="reward-txt">').concat(esc(q.title)).concat(q.reward ? " \xB7 Belohnung: ".concat(esc(q.reward)) : "", '<br><span class="muted">\u2B50 ').concat(q.progress, " von ").concat(q.goal, "</span></div>\n      </div>");
      }
      const bar = c ? this._topbar(c, back) : '<div class="topbar"><button class="icon-btn chunk" data-a="home" aria-label="'.concat(tr("Zur\xFCck"), '">\u2B05\uFE0F</button></div>');
      return '<div class="sub" style="'.concat(this._themeVars(theme), '">').concat(this._world(theme, false)).concat(bar, '<div class="panel">').concat(body, "</div></div>");
    }
    /* -------------------------------------------------------------- PIN */
    _pinpad() {
      const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "\u232B", 0, "\u2713"];
      return '<div class="pinpad"><div class="pinbox">\n      <h2>'.concat(tr("Elternbereich"), '</h2><div class="muted">').concat(tr("PIN eingeben"), '</div>\n      <div class="pindots"></div>\n      <div class="keys">').concat(keys.map((k) => '<button class="chunk" data-key="'.concat(k, '">').concat(k, "</button>")).join(""), '</div>\n      <button class="cancel" data-a="home">').concat(tr("Abbrechen"), "</button></div></div>");
    }
    _bindPin() {
      let entry = this._pinEntry || "";
      const dots = this.shadowRoot.querySelector(".pindots");
      const box = this.shadowRoot.querySelector(".pinbox");
      const draw = () => {
        this._pinEntry = entry;
        dots.innerHTML = Array.from({ length: Math.max(4, entry.length) }, (_, i) => '<i class="'.concat(i < entry.length ? "on" : "", '"></i>')).join("");
      };
      draw();
      const submit = async () => {
        try {
          await this._hass.callWS({ type: "helferhelden/action", action: "check_pin", data: {}, pin: entry });
          this._pin = entry;
          this._pinEntry = "";
          this._go("admin", { tab: "today" });
        } catch (err) {
          if ((err == null ? void 0 : err.code) === "pin_locked") this._toast(tr(err.message));
          entry = "";
          draw();
          box.classList.remove("shake");
          void box.offsetWidth;
          box.classList.add("shake");
          this._sound("nope");
        }
      };
      this.shadowRoot.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => {
        const k = b.dataset.key;
        if (k === "\u232B") entry = entry.slice(0, -1);
        else if (k === "\u2713") return submit();
        else if (entry.length < 8) entry += k;
        draw();
      }));
    }
    /* -------------------------------------------------------------- parents area */
    _admin() {
      var _a;
      const s = this._state;
      const tabs = [
        ["today", "\u{1F4CB}", tr("Heute"), s.pending.length + s.purchases.length],
        ["children", "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", tr("Familie")],
        ["chores", "\u2705", tr("Aufgaben")],
        ["rewards", "\u{1F381}", tr("Belohnungen")],
        ["quest", "\u{1F680}", "Abenteuer"],
        ["settings", "\u2699\uFE0F", tr("Einstellungen")]
      ];
      const nav = tabs.map(([k, i, l, n]) => '<button class="'.concat(this._ui.tab === k ? "on" : "", '" data-a="tab" data-id="').concat(k, '">').concat(i, " ").concat(l).concat(n ? '<span class="n">'.concat(n, "</span>") : "", "</button>")).join("");
      const main = ((_a = this["_tab_".concat(this._ui.tab)]) == null ? void 0 : _a.call(this)) || "";
      return '<div class="admin"><nav><h1>Helferhelden</h1>'.concat(nav, '<button class="exit" data-a="exitAdmin">').concat(tr("Zur\xFCck zu den Kindern"), "</button></nav><main>").concat(main, "</main></div>");
    }
    _a_tab(id) {
      this._ui.tab = id;
      this._render();
    }
    _a_exitAdmin() {
      this._pin = null;
      this._config.child ? this._go("kid") : this._go("picker", { childId: null });
    }
    _childName(id) {
      var _a;
      return ((_a = this._state.children.find((c) => c.id === id)) == null ? void 0 : _a.name) || "?";
    }
    _tab_today() {
      const s = this._state;
      const pend = s.pending.map((p) => '<div class="row"><span class="ri">'.concat(esc(p.icon), '</span>\n      <div class="rt"><b>').concat(esc(p.child), ": ").concat(esc(p.chore), "</b><span>").concat(p.day === s.today ? "heute" : esc(p.day), " \xB7 ").concat(p.stars, ' \u2B50</span></div>\n      <button class="btn danger" data-a="reject" data-id="').concat(p.id, '">').concat(tr("Ablehnen"), '</button>\n      <button class="btn ok" data-a="approve" data-id="').concat(p.id, '">').concat(tr("Best\xE4tigen"), "</button></div>")).join("");
      const buys = s.purchases.map((p) => '<div class="row"><span class="ri">'.concat(esc(p.icon), '</span>\n      <div class="rt"><b>').concat(esc(this._childName(p.child_id)), ": ").concat(esc(p.title), "</b><span>").concat(new Date(p.at).toLocaleString("de-DE", { weekday: "short", hour: "2-digit", minute: "2-digit" }), " \xB7 ").concat(p.cost, ' \u2B50</span></div>\n      <button class="btn ok" data-a="redeem" data-id="').concat(p.id, '">').concat(tr("Eingel\xF6st"), "</button></div>")).join("");
      const kids = s.children.map((c) => '<div class="row"><span class="ri">'.concat(this._petEmoji(c), '</span>\n      <div class="rt"><b>').concat(esc(c.name), "</b><span>Heute ").concat(c.done, " von ").concat(c.total, " \xB7 Level ").concat(c.level, " \xB7 \u{1F525} ").concat(c.streak, '</span></div>\n      <div class="stars-ctl"><button class="btn" data-a="stars" data-id="').concat(c.id, '|-1" aria-label="').concat(tr("Einen Stern abziehen"), '">\u2212</button><b>\u2B50 ').concat(c.stars, '</b>\n      <button class="btn" data-a="stars" data-id="').concat(c.id, '|1" aria-label="').concat(tr("Einen Stern geben"), '">+</button></div></div>')).join("");
      return "<h2>".concat(tr("Heute"), '</h2><p class="lead">').concat(tr("Aufgaben, die du best\xE4tigen musst, und gekaufte Belohnungen, die noch eingel\xF6st werden wollen."), "</p>\n      <h3>").concat(tr("Zu best\xE4tigen"), '</h3><div class="rows">').concat(pend || '<div class="empty-note">'.concat(tr("Nichts offen."), "</div>"), "</div>\n      <h3>").concat(tr("Belohnungen einl\xF6sen"), '</h3><div class="rows">').concat(buys || '<div class="empty-note">'.concat(tr("Keine offenen Belohnungen."), "</div>"), "</div>\n      <h3>").concat(tr("Sterne von Hand anpassen"), '</h3><div class="rows">').concat(kids || '<div class="empty-note">'.concat(tr("Lege zuerst ein Kind an."), "</div>"), "</div>");
    }
    async _a_approve(id) {
      this._sound("chime");
      await this._call("approve", { entry_id: id }, true);
    }
    async _a_reject(id) {
      await this._call("reject", { entry_id: id }, true);
    }
    async _a_redeem(id) {
      await this._call("redeem", { purchase_id: id }, true);
    }
    async _a_stars(id) {
      const [cid, n] = id.split("|");
      await this._call("adjust_stars", { child_id: cid, amount: Number(n), reason: tr("Eltern") }, true);
    }
    _tab_children() {
      const row = (c) => {
        var _a, _b;
        return '<div class="row"><span class="ri">'.concat(this._petEmoji(c), '</span>\n      <div class="rt"><b>').concat(esc(c.name), "</b><span>").concat(esc(c.pet_name || tr((_a = PETS[c.pet]) == null ? void 0 : _a[1])), " \xB7 ").concat(tr((_b = THEMES[c.theme]) == null ? void 0 : _b.label), " \xB7 ").concat(tr("Level"), " ").concat(c.level, " \xB7 ").concat(Object.keys(c.badges).length, " ").concat(tr("Sammelsterne"), '</span></div>\n      <button class="btn" data-a="editChild" data-id="').concat(c.id, '">').concat(tr("Bearbeiten"), "</button></div>");
      };
      const kids = this._state.children.filter((c) => c.role !== "parent").map(row).join("");
      const parents = this._state.children.filter((c) => c.role === "parent").map(row).join("");
      return "<h2>".concat(tr("Familie"), '</h2><p class="lead">').concat(tr("Jedes Familienmitglied hat ein Haustier und eine Welt. Das Haustier w\xE4chst mit den Leveln."), "</p>\n      <h3>").concat(tr("Kinder"), '</h3><div class="rows">').concat(kids || '<div class="empty-note">'.concat(tr("Noch keine Kinder."), "</div>"), '</div>\n      <p><button class="btn primary big" data-a="editChild">').concat(tr("Kind hinzuf\xFCgen"), "</button></p>\n      <h3>").concat(tr("Eltern spielen mit"), '</h3>\n      <p class="lead">Eltern bekommen eigene Aufgaben. Ihre Sterne z\xE4hlen f\xFCrs Familien-Abenteuer, und die Kinder sehen auf dem Startbildschirm, was alle heute geschafft haben. Es gibt keine Rangliste. Wenn alle ihre Aufgaben erledigt haben, feiert die ganze Familie. Eltern haken ihre Aufgaben ab, indem sie den Haken gedr\xFCckt halten.</p>\n      <div class="rows">').concat(parents || '<div class="empty-note">'.concat(tr("Noch keine Eltern angelegt."), "</div>"), '</div>\n      <p><button class="btn primary big" data-a="addParent">').concat(tr("Elternteil hinzuf\xFCgen"), "</button></p>");
    }
    _a_addParent() {
      this._a_editChild(void 0, "parent");
    }
    _a_editChild(id, role = "child") {
      const c = this._state.children.find((x) => x.id === id) || { name: "", pet: role === "parent" ? "owl" : "dragon", theme: "space", pet_name: "", role };
      const pets = Object.entries(PETS).map(([k, [e, l]]) => '<label title="'.concat(l, '"><input type="radio" name="pet" value="').concat(k, '" ').concat(c.pet === k ? "checked" : "", "><span>").concat(e, "</span></label>")).join("");
      const themes = Object.entries(THEMES).map(([k, t]) => '<label><input type="radio" name="theme" value="'.concat(k, '" ').concat(c.theme === k ? "checked" : "", '>\n      <span class="theme-sw" style="background:linear-gradient(180deg,').concat(t.sky[0], ",").concat(t.sky[1], ')">').concat(t.label, "</span></label>")).join("");
      const isParent = c.role === "parent";
      this._modal(
        "<h2>".concat(id ? trf("{n} bearbeiten", { n: esc(c.name) }) : isParent ? tr("Elternteil hinzuf\xFCgen") : tr("Kind hinzuf\xFCgen"), '</h2>\n      <div class="field"><label for="f-name">').concat(tr("Name")).concat(isParent ? tr(" (so nennen die Kinder dich)") : "", '</label><input id="f-name" type="text" name="name" value="').concat(esc(c.name), '" required maxlength="24" placeholder="').concat(isParent ? tr("Mama") : "", '"></div>\n      <div class="field"><span class="lab">').concat(tr("Rolle"), '</span><div class="picks text">\n        <label><input type="radio" name="role" value="child" ').concat(!isParent ? "checked" : "", "><span>").concat(tr("\u{1F9D2} Kind"), '</span></label>\n        <label><input type="radio" name="role" value="parent" ').concat(isParent ? "checked" : "", "><span>").concat(tr("\u{1F9D1} Elternteil"), '</span></label></div></div>\n      <div class="field"><span class="lab">').concat(tr("Haustier"), '</span><div class="picks">').concat(pets, '</div></div>\n      <div class="field"><label for="f-pn">').concat(tr("Name des Haustiers"), '</label><input id="f-pn" type="text" name="pet_name" value="').concat(esc(c.pet_name), '" maxlength="20"><div class="hint">').concat(tr("Wird vorgelesen, wenn das Kind aufs Haustier tippt."), '</div></div>\n      <div class="field"><span class="lab">').concat(tr("Welt"), '</span><div class="picks">').concat(themes, "</div></div>"),
        async (f) => {
          await this._call("save_child", { id, name: f.get("name"), role: f.get("role"), pet: f.get("pet"), theme: f.get("theme"), pet_name: f.get("pet_name") }, true);
        },
        id ? async () => {
          if (await this._confirm("".concat(c.name, " wirklich entfernen? Sterne, Level und Sammelsterne gehen verloren."), "Entfernen")) {
            await this._call("delete_child", { id }, true);
            return true;
          }
          return false;
        } : null
      );
    }
    _tab_chores() {
      const ch = this._state.chores;
      const groups = Object.entries(SLOTS).map(([slot, [i, l]]) => {
        const list = ch.filter((c) => c.slot === slot).sort((a, b) => a.title.localeCompare(b.title));
        if (!list.length) return "";
        return "<h3>".concat(i, " ").concat(l, '</h3><div class="rows">').concat(list.map((c) => '<div class="row '.concat(c.active ? "" : "off", '"><span class="ri">').concat(esc(c.icon), '</span>\n        <div class="rt"><b>').concat(esc(c.title), "</b><span>").concat("\u2B50".repeat(c.stars), " \xB7 ").concat(c.days.length ? c.days.map((d) => tr(DAYS[d])).join(", ") : tr("jeden Tag"), " \xB7 ").concat(c.children.map((k) => esc(this._childName(k))).join(", ") || tr("niemand")).concat(c.needs_approval ? " \xB7 ".concat(tr("mit Best\xE4tigung")) : "", '</span></div>\n        <button class="btn" data-a="editChore" data-id="').concat(c.id, '">').concat(tr("Bearbeiten"), "</button></div>")).join(""), "</div>");
      }).join("");
      return "<h2>".concat(tr("Aufgaben"), '</h2><p class="lead">').concat(tr("Kinder sehen nur das Bild, der Titel wird vorgelesen. W\xE4hle deshalb ein eindeutiges Bild und einen kurzen Titel."), "</p>\n      ").concat(groups || '<div class="empty-note">'.concat(tr("Noch keine Aufgaben."), "</div>"), '\n      <p><button class="btn primary big" data-a="editChore">').concat(tr("Aufgabe hinzuf\xFCgen"), "</button></p>");
    }
    _a_editChore(id) {
      const kids = this._state.children;
      const c = this._state.chores.find((x) => x.id === id) || { title: "", icon: "\u{1FAA5}", stars: 1, days: [], slot: "morning", children: kids.map((k) => k.id), needs_approval: false, active: true };
      const icons = [.../* @__PURE__ */ new Set([c.icon, ...CHORE_ICONS])].map((e) => '<label><input type="radio" name="icon" value="'.concat(esc(e), '" ').concat(c.icon === e ? "checked" : "", "><span>").concat(esc(e), "</span></label>")).join("");
      const stars = [1, 2, 3, 4, 5].map((n) => '<label><input type="radio" name="stars" value="'.concat(n, '" ').concat(c.stars === n ? "checked" : "", "><span>").concat("\u2B50".repeat(n), "</span></label>")).join("");
      const slots = Object.entries(SLOTS).map(([k, [i, l]]) => '<label><input type="radio" name="slot" value="'.concat(k, '" ').concat(c.slot === k ? "checked" : "", "><span>").concat(i, " ").concat(tr(l), "</span></label>")).join("");
      const days = DAYS.map((d, i) => '<label><input type="checkbox" name="days" value="'.concat(i, '" ').concat(c.days.includes(i) ? "checked" : "", "><span>").concat(tr(d), "</span></label>")).join("");
      const who = kids.map((k) => '<label><input type="checkbox" name="children" value="'.concat(k.id, '" ').concat(c.children.includes(k.id) ? "checked" : "", "><span>").concat(this._petEmoji(k), " ").concat(esc(k.name), "</span></label>")).join("");
      this._modal(
        "<h2>".concat(id ? tr("Aufgabe bearbeiten") : tr("Aufgabe hinzuf\xFCgen"), '</h2>\n      <div class="field"><label for="f-t">').concat(tr("Titel (wird vorgelesen)"), '</label><input id="f-t" type="text" name="title" value="').concat(esc(c.title), '" required maxlength="40" placeholder="').concat(tr("Z\xE4hne putzen"), '"></div>\n      <div class="field"><span class="lab">').concat(tr("Bild"), '</span><div class="picks">').concat(icons, '</div></div>\n      <div class="field"><span class="lab">').concat(tr("Sterne"), '</span><div class="picks text">').concat(stars, '</div></div>\n      <div class="field"><span class="lab">').concat(tr("Tageszeit"), '</span><div class="picks text">').concat(slots, '</div></div>\n      <div class="field"><span class="lab">').concat(tr("Tage"), '</span><div class="picks text">').concat(days, '</div><div class="hint">').concat(tr("Kein Tag gew\xE4hlt bedeutet: jeden Tag."), '</div></div>\n      <div class="field"><span class="lab">').concat(tr("F\xFCr wen"), '</span><div class="picks text">').concat(who || '<span class="muted">'.concat(tr("Lege zuerst ein Kind an."), "</span>"), '</div></div>\n      <div class="field"><label class="toggle"><input type="checkbox" name="needs_approval" ').concat(c.needs_approval ? "checked" : "", "> ").concat(tr("Eltern m\xFCssen best\xE4tigen, bevor es Sterne gibt"), '</label></div>\n      <div class="field"><label class="toggle"><input type="checkbox" name="active" ').concat(c.active ? "checked" : "", "> ").concat(tr("Aktiv"), "</label></div>"),
        async (f) => {
          await this._call("save_chore", {
            id,
            title: f.get("title"),
            icon: f.get("icon"),
            stars: Number(f.get("stars")),
            slot: f.get("slot"),
            days: f.getAll("days").map(Number),
            children: f.getAll("children"),
            needs_approval: f.get("needs_approval") === "on",
            active: f.get("active") === "on"
          }, true);
        },
        id ? async () => {
          if (await this._confirm("Aufgabe \u201E".concat(c.title, "\u201C l\xF6schen?"), tr("L\xF6schen"))) {
            await this._call("delete_chore", { id }, true);
            return true;
          }
          return false;
        } : null
      );
    }
    _tab_rewards() {
      const rows = this._state.rewards.slice().sort((a, b) => a.cost - b.cost).map((r) => '<div class="row '.concat(r.active ? "" : "off", '"><span class="ri">').concat(esc(r.icon), '</span>\n      <div class="rt"><b>').concat(esc(r.title), "</b><span>").concat(r.cost, " \u2B50").concat(r.has_script ? " \xB7 ".concat(tr("startet ein Skript")) : "", '</span></div>\n      <button class="btn" data-a="editReward" data-id="').concat(r.id, '">').concat(tr("Bearbeiten"), "</button></div>")).join("");
      return "<h2>".concat(tr("Belohnungen"), '</h2><p class="lead">Kinder kaufen Belohnungen mit ihren Sternen. Optional startet ein Kauf ein Home-Assistant-Skript, zum Beispiel \u201EFernseher 30 Minuten an\u201C. Das Skript bekommt die Variablen <span class="code">child</span> ').concat(tr("und"), ' <span class="code">reward</span>.</p>\n      <div class="rows">').concat(rows || '<div class="empty-note">'.concat(tr("Noch keine Belohnungen."), "</div>"), '</div>\n      <p><button class="btn primary big" data-a="editReward">').concat(tr("Belohnung hinzuf\xFCgen"), "</button></p>");
    }
    async _a_editReward(id) {
      var _a;
      const r = this._state.rewards.find((x) => x.id === id) || { title: "", icon: "\u{1F366}", cost: 5, script: "", active: true };
      let cur = "";
      if (id && r.has_script) {
        try {
          cur = await this._call("reward_script", { id }, true) || "";
        } catch (_) {
          return;
        }
      }
      const icons = [.../* @__PURE__ */ new Set([r.icon, ...REWARD_ICONS])].map((e) => '<label><input type="radio" name="icon" value="'.concat(esc(e), '" ').concat(r.icon === e ? "checked" : "", "><span>").concat(esc(e), "</span></label>")).join("");
      const scripts = Object.keys(((_a = this._hass) == null ? void 0 : _a.states) || {}).filter((e) => e.startsWith("script.")).sort();
      const opts = ['<option value="">'.concat(tr("Kein Skript"), "</option>"), ...scripts.map((e) => '<option value="'.concat(esc(e), '" ').concat(cur === e ? "selected" : "", ">").concat(esc(this._hass.states[e].attributes.friendly_name || e), "</option>"))].join("");
      this._modal(
        "<h2>".concat(id ? "Belohnung bearbeiten" : tr("Belohnung hinzuf\xFCgen"), '</h2>\n      <div class="field"><label for="f-t">').concat(tr("Titel (wird vorgelesen)"), '</label><input id="f-t" type="text" name="title" value="').concat(esc(r.title), '" required maxlength="40" placeholder="').concat(tr("Ein Eis"), '"></div>\n      <div class="field"><span class="lab">').concat(tr("Bild"), '</span><div class="picks">').concat(icons, '</div></div>\n      <div class="field"><label for="f-c">').concat(tr("Preis in Sternen"), '</label><input id="f-c" type="number" name="cost" min="1" max="999" value="').concat(r.cost, '"></div>\n      <div class="field"><label for="f-s">').concat(tr("Skript beim Kauf"), '</label><select id="f-s" name="script">').concat(opts, '</select></div>\n      <div class="field"><label class="toggle"><input type="checkbox" name="active" ').concat(r.active ? "checked" : "", "> ").concat(tr("Im Laden sichtbar"), "</label></div>"),
        async (f) => {
          await this._call("save_reward", { id, title: f.get("title"), icon: f.get("icon"), cost: Number(f.get("cost")), script: f.get("script") || null, active: f.get("active") === "on" }, true);
        },
        id ? async () => {
          if (await this._confirm("Belohnung \u201E".concat(r.title, "\u201C l\xF6schen?"), tr("L\xF6schen"))) {
            await this._call("delete_reward", { id }, true);
            return true;
          }
          return false;
        } : null
      );
    }
    _tab_quest() {
      const q = this._state.quest;
      const pct = q.goal ? Math.round(q.progress / q.goal * 100) : 0;
      const status = q.goal ? '<div class="row"><span class="ri">'.concat(esc(q.icon), '</span><div class="rt"><b>').concat(esc(q.title), "</b>\n         <span>").concat(q.completed_at ? tr("Geschafft! Zeit f\xFCr die Belohnung.") : "\u2B50 ".concat(q.progress, " ").concat(tr("von"), " ").concat(q.goal)).concat(q.reward ? " \xB7 ".concat(esc(q.reward)) : "", '</span>\n         <div class="progress"><i style="width:').concat(pct, '%"></i></div></div></div>') : '<div class="empty-note">'.concat(tr("Gerade l\xE4uft kein Abenteuer."), "</div>");
      return "<h2>".concat(tr("Familien-Abenteuer"), '</h2><p class="lead">').concat(tr("Ein gemeinsames Ziel f\xFCr alle Kinder: Jeder verdiente Stern bringt die ganze Familie einen Schritt weiter. Die Sterne der Kinder bleiben dabei erhalten."), "</p>\n      ").concat(status, '<p><button class="btn primary big" data-a="editQuest">').concat(q.goal ? "Neues Abenteuer starten" : tr("Abenteuer starten"), "</button></p>");
    }
    _a_editQuest() {
      const q = this._state.quest;
      const icons = QUEST_ICONS.map((e) => '<label><input type="radio" name="icon" value="'.concat(e, '" ').concat((q.icon || "\u{1F680}") === e ? "checked" : "", "><span>").concat(e, "</span></label>")).join("");
      this._modal(
        "<h2>".concat(tr("Abenteuer starten"), '</h2>\n      <div class="field"><label for="f-t">').concat(tr("Name"), '</label><input id="f-t" type="text" name="title" required maxlength="40" placeholder="').concat(tr("Ausflug in den Zoo"), '"></div>\n      <div class="field"><span class="lab">').concat(tr("Bild"), '</span><div class="picks">').concat(icons, '</div></div>\n      <div class="field"><label for="f-g">').concat(tr("Ziel in Sternen"), '</label><input id="f-g" type="number" name="goal" min="5" max="2000" value="60"><div class="hint">').concat(tr("Faustregel: zwei Kinder sammeln zusammen etwa 10\u201315 Sterne pro Tag."), '</div></div>\n      <div class="field"><label for="f-r">').concat(tr("Belohnung"), '</label><input id="f-r" type="text" name="reward" maxlength="60" placeholder="').concat(tr("Wir gehen in den Zoo"), '"></div>\n      ').concat(q.goal && !q.completed_at ? '<p class="hint">'.concat(tr("Das laufende Abenteuer wird dabei beendet."), "</p>") : ""),
        async (f) => {
          await this._call("set_quest", { title: f.get("title"), icon: f.get("icon"), goal: Number(f.get("goal")), reward: f.get("reward") }, true);
        }
      );
    }
    _tab_settings() {
      var _a, _b, _c, _d;
      const s = this._state;
      const v = s.voice || {};
      const engineName = v.engine ? ((_d = (_c = (_b = (_a = this._hass) == null ? void 0 : _a.states) == null ? void 0 : _b[v.engine]) == null ? void 0 : _c.attributes) == null ? void 0 : _d.friendly_name) || v.engine : tr("Stimme des Tablets");
      return "<h2>".concat(tr("Einstellungen"), "</h2>\n      <h3>").concat(tr("Stimme"), '</h3>\n      <p class="lead">').concat(tr("Aktuell:"), " <b>").concat(esc(engineName), "</b>").concat(v.voice ? " \xB7 ".concat(esc(v.voice)) : "", '. Am nat\xFCrlichsten klingen die Stimmen von Home Assistant Cloud (zum Beispiel Katja, Amala oder die Kinderstimme Gisela) oder lokal mit Piper (zum Beispiel kerstin oder thorsten). Home Assistant speichert jeden Satz nach dem ersten Mal, danach kommt er sofort.</p>\n      <p><button class="btn primary" data-a="editVoice">').concat(tr("Stimme ausw\xE4hlen"), "</button></p>\n      <h3>").concat(tr("PIN f\xFCr den Elternbereich"), '</h3>\n      <p class="lead">').concat(s.pin_set ? tr("Eine PIN ist gesetzt.") : tr("Noch keine PIN. Ohne PIN reicht langes Dr\xFCcken auf das Schloss."), '</p>\n      <p><button class="btn primary" data-a="editPin">').concat(s.pin_set ? tr("PIN \xE4ndern") : tr("PIN festlegen"), "</button>\n      ").concat(s.pin_set ? '<button class="btn danger" data-a="clearPin">'.concat(tr("PIN entfernen"), "</button>") : "", "</p>\n      <h3>").concat(tr("Automationen"), '</h3>\n      <p class="lead">').concat(tr("Pro Kind gibt es einen Sensor mit Sternen, Level, Serie und offenen Aufgaben, dazu"), ' <span class="code">sensor.helferhelden_offene_bestatigungen</span>.\n      F\xFCr Automationen feuert die Integration diese Events: <span class="code">helferhelden_chore_done</span>, <span class="code">helferhelden_all_done</span>,\n      <span class="code">helferhelden_level_up</span>, <span class="code">helferhelden_badge</span>, <span class="code">helferhelden_reward_bought</span>, <span class="code">helferhelden_quest_complete</span>, <span class="code">helferhelden_family_all_done</span>.\n      Mit dem Dienst <span class="code">helferhelden.complete_chore</span> ').concat(tr("lassen sich Aufgaben auch per NFC-Tag oder Taster abhaken."), '</p>\n      <p class="muted">Version ').concat(HH_VERSION, "</p>");
    }
    _a_editVoice() {
      var _a;
      const v = this._state.voice || {};
      const engines = Object.keys(((_a = this._hass) == null ? void 0 : _a.states) || {}).filter((e) => e.startsWith("tts.")).sort();
      const opts = ['<option value="">'.concat(tr("Stimme des Tablets"), "</option>"), ...engines.map((e) => '<option value="'.concat(esc(e), '" ').concat(v.engine === e ? "selected" : "", ">").concat(esc(this._hass.states[e].attributes.friendly_name || e), "</option>"))].join("");
      const form = this._modal(
        "<h2>".concat(tr("Stimme ausw\xE4hlen"), '</h2>\n      <div class="field"><label for="f-eng">').concat(tr("Sprachausgabe"), '</label><select id="f-eng" name="engine">').concat(opts, '</select>\n        <div class="hint">').concat(engines.length ? tr("Eine Sprachausgabe aus Home Assistant klingt meist viel nat\xFCrlicher als die Tablet-Stimme.") : tr("Keine Sprachausgabe in Home Assistant gefunden. Richte zum Beispiel Piper oder Home Assistant Cloud ein, dann erscheint sie hier."), '</div></div>\n      <div class="field"><label for="f-voice">').concat(tr("Stimme"), '</label><select id="f-voice" name="voice"></select><div class="hint" id="f-vhint"></div></div>\n      <div class="field"><button type="button" class="btn big" id="f-test">').concat(tr("\u25B6 Probeh\xF6ren"), '</button> <span class="hint" id="f-tmsg"></span></div>'),
        async (f) => {
          const engine = f.get("engine") || "";
          if (engine) {
            await this._call("set_voice", { engine, voice: f.get("voice") || "", language: form.dataset.lang || "" }, true);
          } else {
            try {
              localStorage.setItem("hh-browser-voice", f.get("voice") || "");
            } catch (_) {
            }
            await this._call("set_voice", { engine: "", voice: "", language: "" }, true);
          }
          this._voice.cache.clear();
          this._toast(tr("Stimme gespeichert"));
        }
      );
      const engSel = form.querySelector("#f-eng"), voiceSel = form.querySelector("#f-voice");
      const hint = form.querySelector("#f-vhint"), msg = form.querySelector("#f-tmsg");
      const fill = async () => {
        var _a2, _b;
        const engine = engSel.value;
        voiceSel.innerHTML = "";
        hint.textContent = "";
        if (!engine) {
          const local = this._voice.localVoice();
          const vs = this._voice.browserVoices();
          voiceSel.innerHTML = '<option value="">'.concat(tr("Automatisch die beste w\xE4hlen"), "</option>") + vs.map((x) => '<option value="'.concat(esc(x.name), '" ').concat(x.name === local ? "selected" : "", ">").concat(esc(x.name), "</option>")).join("");
          hint.textContent = vs.length ? tr("Gilt nur f\xFCr dieses Ger\xE4t.") : tr("Auf diesem Ger\xE4t ist keine deutsche Stimme installiert.");
          form.dataset.lang = "";
          return;
        }
        hint.textContent = tr("L\xE4dt Stimmen \u2026");
        try {
          const lang0 = this._hass.language || "de";
          const list = await this._hass.callWS({ type: "tts/engine/list", language: lang0 });
          const prov = (list.providers || []).find((x) => x.engine_id === engine);
          const lang = ((_a2 = prov == null ? void 0 : prov.supported_languages) == null ? void 0 : _a2.find((l) => /^de/i.test(l))) || ((_b = prov == null ? void 0 : prov.supported_languages) == null ? void 0 : _b[0]) || lang0;
          form.dataset.lang = lang;
          const res = await this._hass.callWS({ type: "tts/engine/voices", engine_id: engine, language: lang });
          const voices = (res == null ? void 0 : res.voices) || [];
          voiceSel.innerHTML = (voices.length ? "" : '<option value="">'.concat(tr("Standardstimme"), "</option>")) + voices.map((x) => '<option value="'.concat(esc(x.voice_id), '" ').concat(x.voice_id === v.voice ? "selected" : "", ">").concat(esc(x.name), "</option>")).join("");
          hint.textContent = "Sprache: ".concat(lang);
        } catch (err) {
          hint.textContent = tr("Stimmen konnten nicht geladen werden. Die Standardstimme wird verwendet.");
          voiceSel.innerHTML = '<option value="">'.concat(tr("Standardstimme"), "</option>");
        }
      };
      engSel.addEventListener("change", fill);
      form.querySelector("#f-test").addEventListener("click", async () => {
        msg.textContent = "";
        const engine = engSel.value;
        const override = engine ? { engine, voice: voiceSel.value, language: form.dataset.lang || "" } : { engine: "", browserVoice: voiceSel.value };
        try {
          await this._voice.speak(tr("Hallo! Ich bin deine Helferhelden-Stimme. Super gemacht, ein Stern f\xFCr dich!"), override);
        } catch (err) {
          msg.textContent = tr("Diese Stimme hat nicht geklappt. W\xE4hle eine andere oder pr\xFCfe die Sprachausgabe in Home Assistant.");
        }
      });
      if (window.speechSynthesis && !this._voice.browserVoices().length) window.speechSynthesis.onvoiceschanged = () => {
        if (!engSel.value) fill();
      };
      fill();
    }
    _a_editPin() {
      this._modal(
        "<h2>".concat(tr("PIN festlegen"), '</h2>\n      <div class="field"><label for="f-p">').concat(tr("Neue PIN (4\u20138 Ziffern)"), '</label><input id="f-p" type="text" name="pin" inputmode="numeric" pattern="[0-9]{4,8}" required autocomplete="off"></div>'),
        async (f) => {
          const pin = f.get("pin");
          await this._call("set_pin", { new_pin: pin }, true);
          this._pin = pin;
          this._toast("PIN gespeichert");
        }
      );
    }
    async _a_clearPin() {
      if (await this._confirm("PIN wirklich entfernen?", "Entfernen")) {
        await this._call("set_pin", { new_pin: "" }, true);
        this._pin = null;
      }
    }
    /* -------------------------------------------------------------- modal helpers */
    _modal(inner, onSave, onDelete) {
      var _a;
      const bg = document.createElement("div");
      bg.className = "modal-bg";
      bg.innerHTML = '<form class="modal">'.concat(inner, '<div class="actions">\n      ').concat(onDelete ? '<button type="button" class="btn danger left" data-m="del">'.concat(tr("L\xF6schen"), "</button>") : "", '\n      <button type="button" class="btn" data-m="cancel">').concat(tr("Abbrechen"), '</button>\n      <button type="submit" class="btn primary">').concat(tr("Speichern"), "</button></div></form>");
      this._layer.appendChild(bg);
      const form = bg.querySelector("form");
      const close = () => bg.remove();
      bg.querySelector("[data-m=cancel]").addEventListener("click", close);
      (_a = bg.querySelector("[data-m=del]")) == null ? void 0 : _a.addEventListener("click", async () => {
        try {
          if (await onDelete()) close();
        } catch (_) {
        }
      });
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          await onSave(new FormData(form));
          close();
        } catch (_) {
        }
      });
      setTimeout(() => {
        var _a2;
        return (_a2 = form.querySelector("input[type=text]")) == null ? void 0 : _a2.focus();
      }, 30);
      return form;
    }
    _confirm(text, label) {
      return new Promise((resolve) => {
        const bg = document.createElement("div");
        bg.className = "modal-bg";
        bg.innerHTML = '<div class="modal" role="alertdialog"><p style="font-size:18px;font-weight:700">'.concat(esc(text), '</p>\n        <div class="actions"><button class="btn" data-m="no">').concat(tr("Abbrechen"), '</button><button class="btn danger" data-m="yes">').concat(esc(label), "</button></div></div>");
        this._layer.appendChild(bg);
        bg.querySelector("[data-m=no]").addEventListener("click", () => {
          bg.remove();
          resolve(false);
        });
        bg.querySelector("[data-m=yes]").addEventListener("click", () => {
          bg.remove();
          resolve(true);
        });
      });
    }
  }
  if (!customElements.get("helferhelden-card")) {
    customElements.define("helferhelden-card", HelferheldenCard);
    window.customCards = window.customCards || [];
    window.customCards.push({
      type: "helferhelden-card",
      name: "Helferhelden",
      description: tr("Aufgaben-Spiel f\xFCr Kinder mit Haustier, Sternen, Sammelsternen und Belohnungen"),
      preview: false
    });
    console.info("%c HELFERHELDEN %c ".concat(HH_VERSION, " "), "background:#2e2a5c;color:#ffc93c;font-weight:700", "background:#ffc93c;color:#2e2a5c");
  }
})();
