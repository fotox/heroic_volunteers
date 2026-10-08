/*
 * Helferhelden card – gamified chores for small kids.
 * Vanilla web component, no build step. Talks to the helferhelden integration
 * via the HA websocket (helferhelden/subscribe + helferhelden/action).
 */
const HH_VERSION = "1.3.0";

// Fonts ship with the integration (no Google Fonts request from the kids' tablet).
const DEFAULT_FONT_BASE = "/helferhelden/fonts/";
function ensureFonts(base) {
  if (document.getElementById("hh-fonts")) return;
  const st = document.createElement("style");
  st.id = "hh-fonts";
  st.textContent = `
@font-face { font-family: "Baloo 2"; font-weight: 400 800; font-display: swap; src: url("${base}baloo2.woff2") format("woff2"); }
@font-face { font-family: "Nunito"; font-weight: 200 1000; font-display: swap; src: url("${base}nunito.woff2") format("woff2"); }`;
  document.head.appendChild(st);
}

const PETS = {
  dragon: ["🐲", "Drache"], cat: ["🐱", "Katze"], dog: ["🐶", "Hund"],
  unicorn: ["🦄", "Einhorn"], dino: ["🦖", "Dino"], fox: ["🦊", "Fuchs"],
  octopus: ["🐙", "Krake"], bunny: ["🐰", "Hase"], robot: ["🤖", "Roboter"], owl: ["🦉", "Eule"],
};

/* ------------------------------------------------------------------- i18n */
// German is the source language and doubles as the lookup key, so tr() returns
// its argument unchanged for German and the German wording cannot regress.
// A string missing from EN falls back to German rather than rendering empty.
const EN = {
  // pets
  "Drache": "Dragon", "Katze": "Cat", "Hund": "Dog", "Einhorn": "Unicorn",
  "Dino": "Dino", "Fuchs": "Fox", "Krake": "Octopus", "Hase": "Bunny",
  "Roboter": "Robot", "Eule": "Owl",
  // fragments
  "Sammelsterne": "badges",
  "jeden Tag": "every day",
  "niemand": "nobody",
  "von": "of",
  "Mama": "Mum",
  " (so nennen die Kinder dich)": " (what the children call you)",
  "{n} bearbeiten": "Edit {n}",
  "Ein gemeinsames Ziel für alle Kinder: Jeder verdiente Stern bringt die ganze Familie einen Schritt weiter. Die Sterne der Kinder bleiben dabei erhalten.":
    "A shared goal for all the children: every star earned moves the whole family one step closer. The children keep their own stars.",
  // worlds, pets, time of day, weekdays
  "Weltraum": "Space", "Dschungel": "Jungle", "Ozean": "Ocean", "Dinos": "Dinos",
  "Feenwald": "Fairy forest",
  "Morgens": "Morning", "Tagsüber": "Daytime", "Abends": "Evening",
  "Mo": "Mon", "Di": "Tue", "Mi": "Wed", "Do": "Thu", "Fr": "Fri", "Sa": "Sat", "So": "Sun",
  // spoken phrases
  "Hallo {n}!": "Hello {n}!",
  "Schön, dass du da bist, {n}!": "Good to see you, {n}!",
  "Hallo {n}! Los geht's!": "Hello {n}! Let's go!",
  "Schön, dass du mithilfst, {n}!": "Good of you to help out, {n}!",
  "Schau mal, was {n} heute macht!": "Look what {n} is up to today!",
  "Super gemacht, {n}!": "Well done, {n}!",
  "Toll, {n}!": "Great, {n}!",
  "Klasse! Ein Stern für dich!": "Brilliant! A star for you!",
  "Juhu! Das hast du prima gemacht!": "Yay! You did that really well!",
  "Wow, {n}! Weiter so!": "Wow, {n}! Keep it up!",
  "Danke, {n}! Super gemacht!": "Thank you, {n}! Well done!",
  "Toll, {n}! Das hilft der ganzen Familie!": "Great, {n}! That helps the whole family!",
  "Du hast alles geschafft, {n}! Ich bin so stolz auf dich!":
    "You finished everything, {n}! I am so proud of you!",
  "Alles erledigt! Du bist ein echter Helferheld, {n}!":
    "All done! You are a real helper hero, {n}!",
  "Ein neuer Stern für deine Sammlung!": "A new badge for your collection!",
  "Hurra! Level {l}!": "Hurray! Level {l}!",
  "Die ganze Familie hat alles geschafft! Ihr seid ein tolles Team!":
    "The whole family finished everything! You are a great team!",
  "Abenteuer geschafft! {r}": "Quest complete! {r}",
  "Viel Spaß mit {t}!": "Enjoy {t}!",
  // child view
  "Lädt …": "Loading …",
  "Heute geschafft": "Done today",
  "Heute geschafft: hier erscheint jede erledigte Aufgabe der Familie.":
    "Done today: every chore the family completed shows up here.",
  "Noch keine Kinder angelegt. Im Elternbereich legst du Kinder, Aufgaben und Belohnungen an.":
    "No children yet. Add children, chores and rewards in the parents' area.",
  "Elternbereich öffnen": "Open the parents' area",
  "Elternbereich (gedrückt halten)": "Parents' area (hold)",
  "Elternbereich: gedrückt halten": "Parents' area: hold",
  "Zurück": "Back",
  "Heute frei!": "A day off!",
  "Alles erledigt für heute": "Everything done for today",
  "Level": "Level",
  "Sternen-Sammlung": "Badge collection",
  "Deine Sternen-Sammlung": "Your badge collection",
  "Fertig (gedrückt halten)": "Done (hold)",
  "Fertig": "Done",
  "Rückgängig": "Undo",
  "Kaufen": "Buy",
  "Belohnungen": "Rewards",
  "Familien-Abenteuer": "Family quest",
  "Gerade kein Abenteuer. Eltern können eins im Elternbereich starten.":
    "No quest right now. Parents can start one in the parents' area.",
  "Neuer Stern!": "New badge!",
  "Abenteuer geschafft!": "Quest complete!",
  "{p} ist gewachsen": "{p} has grown",
  "{s} Tage am Stück": "{s} days in a row",
  // parents' area
  "Elternbereich": "Parents' area",
  "PIN eingeben": "Enter the PIN",
  "Abbrechen": "Cancel",
  "Speichern": "Save",
  "Löschen": "Delete",
  "Bearbeiten": "Edit",
  "Zurück zu den Kindern": "Back to the children",
  "Heute": "Today",
  "Ablehnen": "Reject",
  "Bestätigen": "Approve",
  "Eingelöst": "Redeemed",
  "mit Bestätigung": "needs approval",
  "Einen Stern abziehen": "Take away one star",
  "Einen Stern geben": "Give one star",
  "Aufgaben, die du bestätigen musst, und gekaufte Belohnungen, die noch eingelöst werden wollen.":
    "Chores waiting for your approval, and bought rewards still waiting to be redeemed.",
  "Zu bestätigen": "Waiting for approval",
  "Nichts offen.": "Nothing open.",
  "Belohnungen einlösen": "Redeem rewards",
  "Keine offenen Belohnungen.": "No open rewards.",
  "Sterne von Hand anpassen": "Adjust stars by hand",
  "Lege zuerst ein Kind an.": "Add a child first.",
  // family
  "Familie": "Family",
  "Jedes Familienmitglied hat ein Haustier und eine Welt. Das Haustier wächst mit den Leveln.":
    "Every family member has a pet and a world. The pet grows with the levels.",
  "Kinder": "Children",
  "Noch keine Kinder.": "No children yet.",
  "Kind hinzufügen": "Add a child",
  "Eltern spielen mit": "Parents play along",
  "Eltern": "Parents",
  "Noch keine Eltern angelegt.": "No parents yet.",
  "Elternteil hinzufügen": "Add a parent",
  "Rolle": "Role",
  "🧒 Kind": "🧒 Child",
  "🧑 Elternteil": "🧑 Parent",
  "Haustier": "Pet",
  "Name des Haustiers": "Pet's name",
  "Wird vorgelesen, wenn das Kind aufs Haustier tippt.":
    "Read out loud when the child taps the pet.",
  "Welt": "World",
  "Name": "Name",
  "Name (so nennen die Kinder dich)": "Name (what the children call you)",
  // chores
  "Aufgaben": "Chores",
  "Kinder sehen nur das Bild, der Titel wird vorgelesen. Wähle deshalb ein eindeutiges Bild und einen kurzen Titel.":
    "Children only see the picture; the title is read out loud. So pick an unmistakable picture and a short title.",
  "Noch keine Aufgaben.": "No chores yet.",
  "Aufgabe hinzufügen": "Add a chore",
  "Aufgabe bearbeiten": "Edit chore",
  "Titel (wird vorgelesen)": "Title (read out loud)",
  "Zähne putzen": "Brush teeth",
  "Bild": "Picture",
  "Sterne": "Stars",
  "Tageszeit": "Time of day",
  "Tage": "Days",
  "Kein Tag gewählt bedeutet: jeden Tag.": "No day selected means: every day.",
  "Für wen": "Who for",
  "Eltern müssen bestätigen, bevor es Sterne gibt":
    "Parents must approve before stars are given",
  "Aktiv": "Active",
  "Aufgabe „{t}“ löschen?": "Delete the chore “{t}”?",
  // rewards
  "Noch keine Belohnungen.": "No rewards yet.",
  "Belohnung hinzufügen": "Add a reward",
  "Belohnung bearbeiten": "Edit reward",
  "Kein Skript": "No script",
  "Ein Eis": "An ice cream",
  "Preis in Sternen": "Price in stars",
  "Skript beim Kauf": "Script on purchase",
  "Im Laden sichtbar": "Visible in the shop",
  "startet ein Skript": "starts a script",
  "Belohnung „{t}“ löschen?": "Delete the reward “{t}”?",
  "und": "and",
  // quest
  "Gerade läuft kein Abenteuer.": "No quest is running right now.",
  "Abenteuer starten": "Start a quest",
  "Neues Abenteuer starten": "Start a new quest",
  "Ausflug in den Zoo": "A trip to the zoo",
  "Ziel in Sternen": "Goal in stars",
  "Faustregel: zwei Kinder sammeln zusammen etwa 10–15 Sterne pro Tag.":
    "Rule of thumb: two children collect roughly 10–15 stars a day between them.",
  "Belohnung": "Reward",
  "Wir gehen in den Zoo": "We are going to the zoo",
  "Das laufende Abenteuer wird dabei beendet.": "This ends the quest currently running.",
  "Geschafft! Zeit für die Belohnung.": "Done! Time for the reward.",
  // settings
  "Einstellungen": "Settings",
  "Stimme": "Voice",
  "Aktuell:": "Currently:",
  "Stimme auswählen": "Choose a voice",
  "Stimme des Tablets": "The tablet's voice",
  "Stimme gespeichert": "Voice saved",
  "PIN für den Elternbereich": "PIN for the parents' area",
  "Eine PIN ist gesetzt.": "A PIN is set.",
  "Noch keine PIN. Ohne PIN reicht langes Drücken auf das Schloss.":
    "No PIN yet. Without one, holding the padlock is enough.",
  "PIN ändern": "Change the PIN",
  "PIN festlegen": "Set a PIN",
  "PIN entfernen": "Remove the PIN",
  "Neue PIN (4–8 Ziffern)": "New PIN (4–8 digits)",
  "Sprachausgabe": "Text-to-speech",
  "▶ Probehören": "▶ Preview",
  "Probehören": "Preview",
  "Eine Sprachausgabe aus Home Assistant klingt meist viel natürlicher als die Tablet-Stimme.":
    "A text-to-speech engine from Home Assistant usually sounds far more natural than the tablet's voice.",
  "Keine Sprachausgabe in Home Assistant gefunden. Richte zum Beispiel Piper oder Home Assistant Cloud ein, dann erscheint sie hier.":
    "No text-to-speech engine found in Home Assistant. Set up Piper or Home Assistant Cloud, for example, and it will appear here.",
  "Automatisch die beste wählen": "Pick the best one automatically",
  "Standardstimme": "Default voice",
  "Gilt nur für dieses Gerät.": "Applies to this device only.",
  "Auf diesem Gerät ist keine deutsche Stimme installiert.":
    "This device has no voice installed for your language.",
  "Lädt Stimmen …": "Loading voices …",
  "Stimmen konnten nicht geladen werden. Die Standardstimme wird verwendet.":
    "Voices could not be loaded. The default voice will be used.",
  "Hallo! Ich bin deine Helferhelden-Stimme. Super gemacht, ein Stern für dich!":
    "Hello! I am your Helferhelden voice. Well done, a star for you!",
  "Diese Stimme hat nicht geklappt. Wähle eine andere oder prüfe die Sprachausgabe in Home Assistant.":
    "That voice did not work. Pick another one or check the text-to-speech setup in Home Assistant.",
  // automations help
  "Automationen": "Automations",
  "Pro Kind gibt es einen Sensor mit Sternen, Level, Serie und offenen Aufgaben, dazu":
    "There is one sensor per child with stars, level, streak and open chores, plus",
  "lassen sich Aufgaben auch per NFC-Tag oder Taster abhaken.":
    "chores can also be ticked off with an NFC tag or a button.",
  // messages the backend sends; German is the key, as everywhere else
  "Helferhelden ist nicht eingerichtet": "Helferhelden is not set up",
  "Falsche PIN": "Wrong PIN",
  "Zu viele Versuche, bitte kurz warten": "Too many attempts, please wait a moment",
  "Ohne Eltern-PIN dürfen das nur Administratoren. Bitte zuerst eine PIN festlegen.":
    "Administrators only while no parents' PIN is set. Please set one first.",
  "Kind nicht gefunden": "Child not found",
  "Aufgabe nicht gefunden": "Chore not found",
  "Eintrag nicht gefunden": "Entry not found",
  "Kauf nicht gefunden": "Purchase not found",
  "Belohnung nicht verfügbar": "Reward not available",
  "Diese Aufgabe ist heute nicht dran": "That chore is not due today",
  "Schon erledigt": "Already done",
  "Bereits bestätigt": "Already approved",
  "Nichts zum Rückgängigmachen": "Nothing to undo",
  "Die Sterne sind schon ausgegeben": "Those stars have already been spent",
  "Noch nicht genug Sterne": "Not enough stars yet",
  "Nur offene Einträge können abgelehnt werden": "Only open entries can be rejected",
  "Name fehlt": "Name is missing",
  "Titel fehlt": "Title is missing",
  "Ungültige Eingabe": "Invalid input",
  "Ungültige Sprachausgabe": "Invalid text-to-speech engine",
  "Ungültiges Ziel": "Invalid goal",
  "PIN muss 4–8 Ziffern haben": "The PIN must be 4 to 8 digits",
  // errors and toasts
  "Helferhelden ist nicht erreichbar. Ist die Integration eingerichtet?":
    "Helferhelden cannot be reached. Is the integration set up?",
  "Das hat nicht geklappt": "That did not work",
  "Aufgaben-Spiel für Kinder mit Haustier, Sternen, Sammelsternen und Belohnungen":
    "A chore game for kids with a pet, stars, badges and rewards",
};

let LANG = "de";
const setLang = (code) => {
  LANG = String(code || "de").toLowerCase().startsWith("de") ? "de" : "en";
};
/** Translate a German source string; unknown strings fall back to German. */
const tr = (s) => (LANG === "de" ? s : EN[s] ?? s);
/** Translate, then substitute {x} placeholders. */
const trf = (s, vars = {}) => tr(s).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const THEMES = {
  space: {
    label: "Weltraum", sky: ["#221f66", "#5d43ad"], ground: "#3b2f80", hill: "#4a3c99",
    decor: [["⭐", 8, 10, 34], ["🪐", 14, 70, 64], ["✨", 34, 22, 30], ["🌙", 6, 44, 46], ["⭐", 40, 84, 26], ["☄️", 26, 52, 40]],
  },
  jungle: {
    label: "Dschungel", sky: ["#c8f08a", "#6cc46f"], ground: "#2f8a4e", hill: "#3fa05c",
    decor: [["🌴", 30, 4, 90], ["🍃", 8, 30, 34], ["🦜", 12, 74, 48], ["🌺", 44, 86, 40], ["🍌", 6, 58, 32], ["🌿", 46, 18, 44]],
  },
  ocean: {
    label: "Ozean", sky: ["#8fe2f5", "#2479bf"], ground: "#e9c98b", hill: "#f3d9a4",
    decor: [["🫧", 10, 14, 36], ["🐠", 22, 72, 48], ["🫧", 30, 30, 22], ["🐚", 64, 82, 36], ["🐟", 8, 50, 34], ["🪸", 58, 6, 56]],
  },
  dino: {
    label: "Dinos", sky: ["#ffe2ad", "#f0955a"], ground: "#9a5a33", hill: "#b56b3c",
    decor: [["🌋", 22, 70, 86], ["☁️", 6, 14, 52], ["🌿", 52, 6, 52], ["🦴", 66, 82, 34], ["🥚", 60, 30, 30], ["☁️", 4, 56, 40]],
  },
  fairy: {
    label: "Feenwald", sky: ["#ffd9f1", "#b48cf0"], ground: "#7e5bc9", hill: "#9a75dd",
    decor: [["🌸", 10, 12, 42], ["✨", 6, 52, 30], ["🍄", 56, 84, 50], ["🦋", 24, 74, 42], ["🌈", 4, 76, 60], ["🌷", 58, 8, 40]],
  },
};

const SLOTS = {
  morning: ["🌅", "Morgens"],
  day: ["☀️", "Tagsüber"],
  evening: ["🌙", "Abends"],
};

const MOOD_ICON = { party: "🎉", happy: "😊", ok: "💪", sleepy: "💤" };

// Warm, varied phrases; {n} = name, {l} = level, {t} = title, {r} = reward.
const PHRASES = {
  hello: ["Hallo {n}!", "Schön, dass du da bist, {n}!", "Hallo {n}! Los geht's!"],
  helloParent: ["Hallo {n}!", "Schön, dass du mithilfst, {n}!"],
  visitParent: ["Schau mal, was {n} heute macht!"],
  done: ["Super gemacht, {n}!", "Toll, {n}!", "Klasse! Ein Stern für dich!", "Juhu! Das hast du prima gemacht!", "Wow, {n}! Weiter so!"],
  doneParent: ["Danke, {n}! Super gemacht!", "Toll, {n}! Das hilft der ganzen Familie!"],
  alldone: ["Du hast alles geschafft, {n}! Ich bin so stolz auf dich!", "Alles erledigt! Du bist ein echter Helferheld, {n}!"],
  badge: ["Ein neuer Stern für deine Sammlung!"],
  level: ["Hurra! Level {l}!"],
  family: ["Die ganze Familie hat alles geschafft! Ihr seid ein tolles Team!"],
  quest: ["Abenteuer geschafft! {r}"],
  buy: ["Viel Spaß mit {t}!"],
};
const say = (key, vars = {}) => {
  const list = PHRASES[key] || [key];
  return tr(list[Math.floor(Math.random() * list.length)]).replace(/\{(\w)\}/g, (_, k) => vars[k] ?? "");
};
const allPhrases = (key, vars = {}) =>
  (PHRASES[key] || []).map((p) => tr(p).replace(/\{(\w)\}/g, (_, k) => vars[k] ?? ""));

const CHORE_ICONS = ["🪥", "👕", "🧦", "👟", "🛏️", "🧸", "📚", "🍽️", "🥄", "🧹", "🗑️", "🌱", "🐟", "🐕",
  "🛁", "🚽", "🧼", "💧", "🥕", "🍎", "🎒", "🧺", "🪴", "🚲", "🎨", "🎹", "🫧", "🧤", "😴", "🤝", "🧥", "🦷",
  "🍳", "🛒", "🧽", "🚗", "💻", "🔧", "📬", "🥗", "🪟", "🏃"];
const REWARD_ICONS = ["🍦", "🎧", "📺", "🎮", "🛝", "🍕", "🍿", "🎈", "📖", "🧁", "🚗", "🏊", "🎠", "🦁",
  "🎁", "🌟", "🍫", "🏕️", "🎬", "🧩"];
const QUEST_ICONS = ["🚀", "🦁", "🏖️", "🎢", "🍕", "🎬", "🏕️", "🎪", "🐬", "🏰", "🎡", "🍦"];
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ sound */
class Sfx {
  constructor() { this.ctx = null; }
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
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  tap() { this._note(660, 0, 0.12, "sine", 0.12); }
  chime() { [523, 659, 784, 1047].forEach((f, i) => this._note(f, i * 0.09, 0.35)); }
  fanfare() {
    [[523, 0], [659, 0.12], [784, 0.24], [1047, 0.38], [784, 0.52], [1047, 0.64]].forEach(([f, t]) =>
      this._note(f, t, 0.4, "square", 0.08));
    [262, 330, 392].forEach((f) => this._note(f, 0.64, 0.9, "triangle", 0.1));
  }
  sparkle() { [1319, 1568, 2093, 2637].forEach((f, i) => this._note(f, i * 0.06, 0.25, "sine", 0.08)); }
  nope() { this._note(220, 0, 0.18, "sine", 0.12); this._note(196, 0.12, 0.22, "sine", 0.12); }
}

/* ------------------------------------------------------------------ voice */
// Prefers a Home Assistant TTS engine (natural voices, cached by HA), falls back to the tablet's best voice.
class Voice {
  constructor(card) { this.card = card; this.cache = new Map(); this.current = null; this.failUntil = 0; }
  settings() { return this.card._state?.voice || {}; }
  _canEngine(v) { return !!(v?.engine && this.card._hass?.callApi); }
  load(text, v = this.settings()) {
    const key = `${v.engine}|${v.voice}|${text}`;
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
    texts.filter(Boolean).forEach((t) => this.load(t, v).catch(() => {}));
  }
  stop() {
    try { this.current?.pause(); } catch (_) { /* ignore */ }
    try { window.speechSynthesis?.cancel(); } catch (_) { /* ignore */ }
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
        this.failUntil = Date.now() + 60000; // engine down: use the tablet voice for a minute
      }
    }
    this.browser(text, override ? override.browserVoice : undefined);
  }
  browserVoices() {
    try { return window.speechSynthesis.getVoices().filter((x) => x.lang?.toLowerCase().startsWith("de")); } catch (_) { return []; }
  }
  bestBrowserVoice(name) {
    const vs = this.browserVoices();
    if (name) { const m = vs.find((x) => x.name === name); if (m) return m; }
    const score = (x) => (/natural|neural|online|premium|enhanced|wavenet/i.test(x.name) ? 4 : 0) + (/google/i.test(x.name) ? 2 : 0) + (x.localService ? 0 : 1);
    return vs.sort((a, b) => score(b) - score(a))[0];
  }
  localVoice() { try { return localStorage.getItem("hh-browser-voice") || ""; } catch (_) { return ""; } }
  browser(text, name) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = this.bestBrowserVoice(name ?? this.localVoice());
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "de-DE";
    u.rate = 0.95; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  }
}

/* ------------------------------------------------------------------ styles */
const STYLES = `
:host {
  --ink: #2e2a5c;
  --sun: #ffc93c;
  --grass: #3fb87f;
  --berry: #ff5d8f;
  --paper: #ffffff;
  --mist: #efeaf8;
  --kid-font: "Baloo 2", "Nunito", ui-rounded, system-ui, sans-serif;
  --ui-font: "Nunito", ui-rounded, system-ui, sans-serif;
  display: block;
}
* { box-sizing: border-box; }
button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 4px solid var(--sun); outline-offset: 3px; }

.root {
  position: relative; overflow: hidden; border-radius: var(--ha-card-border-radius, 16px);
  height: var(--hh-height); min-height: 560px; font-family: var(--kid-font); color: var(--ink);
  user-select: none; -webkit-user-select: none; touch-action: manipulation; background: #2b2560;
  container-type: inline-size;
}
.layer { position: absolute; inset: 0; pointer-events: none; z-index: 20; }
.layer > * { pointer-events: auto; }

/* chunky toy button */
.chunk {
  background: var(--paper); border: 4px solid var(--ink); border-radius: 22px;
  box-shadow: 0 6px 0 var(--ink); transition: transform .08s, box-shadow .08s;
}
.chunk:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--ink); }

/* themed world */
.world { position: absolute; inset: 0; background: linear-gradient(180deg, var(--sky1), var(--sky2)); }
.world .hill { position: absolute; left: -10%; width: 120%; bottom: 0; height: 30%; }
.decor { position: absolute; line-height: 1; filter: drop-shadow(0 3px 0 rgba(46,42,92,.25)); }
@media (prefers-reduced-motion: no-preference) {
  .decor:nth-child(odd) { animation: drift 7s ease-in-out infinite; }
  .decor:nth-child(even) { animation: drift 9s ease-in-out infinite reverse; }
}
@keyframes drift { 50% { transform: translateY(-10px) rotate(4deg); } }

/* ------------------------------------------------ picker */
.picker { position: absolute; inset: 0; display: flex; flex-direction: column; background: #2b2560; }
.picker-top { display: flex; justify-content: center; padding: 22px 24px 0; min-height: 30px; }
.kids { flex: 1; display: flex; gap: 22px; padding: 22px 28px 34px; align-items: stretch; justify-content: center; }
.kid-door {
  position: relative; isolation: isolate; flex: 1 1 0; max-width: 520px; min-width: 220px; overflow: hidden; padding: 0;
  border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink);
  display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
  transition: transform .1s, box-shadow .1s;
}
.kid-door:active { transform: translateY(8px); box-shadow: 0 2px 0 var(--ink); }
.kid-door .pet-big { position: relative; z-index: 1; font-size: clamp(110px, 14vw, 190px); line-height: 1; margin-bottom: 6px; }
.kid-door .door-name {
  position: relative; z-index: 1; margin: 0 0 18px; padding: 4px 26px 0; background: var(--paper);
  border: 4px solid var(--ink); border-radius: 999px; font-size: clamp(28px, 3vw, 44px); font-weight: 800; line-height: 1.2;
}
.dots { position: relative; z-index: 1; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 18px; max-width: 80%; }
.dot { width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--ink); background: var(--paper); }
.dot.on { background: var(--grass); }
.dot.wait { background: var(--sun); }
.door-crown { position: absolute; top: 18px; right: 22px; z-index: 1; font-size: 46px; }

.parent-btn {
  position: absolute; right: 18px; bottom: 16px; z-index: 5; width: 58px; height: 58px; border-radius: 50%;
  font-size: 26px; display: grid; place-items: center; opacity: .85;
}
.parent-btn .ring { position: absolute; inset: -6px; border-radius: 50%; border: 5px solid var(--sun); clip-path: inset(0 100% 0 0); }
.parent-btn.holding .ring, .parent-inline.holding .ring { animation: wipe 1s linear forwards; }
.parent-inline .ring { position: absolute; inset: -6px; border: 5px solid var(--sun); clip-path: inset(0 100% 0 0); }
@keyframes wipe { to { clip-path: inset(0 0 0 0); } }

.empty { margin: auto; text-align: center; color: #fff; font-family: var(--ui-font); max-width: 34ch; }
.empty .big { font-size: 96px; }
.empty p { font-size: 20px; line-height: 1.5; }
.empty button { padding: 14px 26px; font-size: 20px; font-weight: 800; color: var(--ink); }

/* quest path */
.quest-path {
  display: flex; align-items: center; gap: 10px; padding: 10px 18px; background: rgba(255,255,255,.95);
  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 30px;
}
.quest-path .stones { display: flex; gap: 6px; }
.stone { width: 22px; height: 22px; border-radius: 50% 45% 55% 48%; border: 3px solid var(--ink); background: var(--mist); }
.stone.on { background: var(--sun); }
.quest-path .goal { font-size: 40px; line-height: 1; }
.quest-path.done { background: var(--sun); }

/* ------------------------------------------------ kid screen */
.kid { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(300px, 40%) 1fr; grid-template-rows: auto 1fr auto; grid-template-areas: "top top" "scene board" "dock board"; }
.kid .topbar { grid-area: top; } .kid .scene { grid-area: scene; } .kid .board { grid-area: board; } .kid .dock { grid-area: dock; }
.topbar { grid-column: 1 / -1; display: flex; align-items: center; gap: 14px; padding: 16px 20px 0; position: relative; z-index: 2; }
.icon-btn { width: 74px; height: 74px; font-size: 38px; display: grid; place-items: center; border-radius: 24px; }
.counter {
  display: flex; align-items: center; gap: 8px; padding: 4px 22px 0 14px; height: 74px; background: var(--paper);
  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 46px; font-weight: 800;
}
.counter .ico { font-size: 44px; margin-top: -6px; }
.spacer { flex: 1; }
.streak.off { filter: grayscale(1); opacity: .6; }

.scene { position: relative; display: flex; align-items: center; justify-content: center; z-index: 1; }
.nest { position: relative; width: min(34vw, 380px); aspect-ratio: 1; display: grid; place-items: center; }
.nest svg.ring { position: absolute; inset: 0; transform: rotate(-90deg); }
.nest .pet { font-size: calc(var(--pet-scale) * min(18vw, 200px)); line-height: 1; position: relative; }
@media (prefers-reduced-motion: no-preference) {
  .nest .pet { animation: bob 3s ease-in-out infinite; }
  .nest .pet.jump { animation: jump .7s cubic-bezier(.3,1.6,.5,1); }
  .nest .pet.dance { animation: dance 1s ease-in-out infinite; }
  .nest .pet.sleepy { animation: breathe 4s ease-in-out infinite; }
  .sparkle-orbit { animation: spin 9s linear infinite; }
}
@keyframes bob { 50% { transform: translateY(-12px); } }
@keyframes jump { 30% { transform: translateY(-70px) scale(1.1, .92); } 60% { transform: translateY(0) scale(.92, 1.08); } }
@keyframes dance { 25% { transform: rotate(-10deg) translateY(-14px); } 75% { transform: rotate(10deg) translateY(-14px); } }
@keyframes breathe { 50% { transform: scale(1.04, .97); } }
@keyframes spin { to { transform: rotate(360deg); } }
.crown { position: absolute; top: 4%; font-size: calc(min(18vw, 200px) * .34); z-index: 2; }
.sparkle-orbit { position: absolute; inset: 6%; }
.sparkle-orbit span { position: absolute; font-size: 34px; }
.lvl {
  position: absolute; bottom: 2%; left: 50%; transform: translateX(-50%); min-width: 64px; height: 64px; padding: 6px 12px 0;
  background: var(--sun); border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 5px 0 var(--ink);
  font-size: 36px; font-weight: 800; text-align: center; line-height: 1.3;
}
.bubble {
  position: absolute; top: 6%; right: -2%; min-width: 92px; height: 92px; display: grid; place-items: center; padding: 0 12px;
  background: var(--paper); border: 4px solid var(--ink); border-radius: 46px; font-size: 52px; z-index: 3;
}
.bubble::after {
  content: ""; position: absolute; left: 10px; bottom: -14px; width: 26px; height: 26px; background: var(--paper);
  border-left: 4px solid var(--ink); border-bottom: 4px solid var(--ink); transform: rotate(-35deg) skewX(15deg);
}
.pet-name { position: absolute; bottom: -54px; left: 50%; transform: translateX(-50%); font-size: 30px; font-weight: 800; color: #fff; text-shadow: 0 3px 0 var(--ink); white-space: nowrap; }

.board { position: relative; z-index: 1; overflow-y: auto; padding: 18px 28px 40px 6px; display: flex; flex-direction: column; gap: 18px; scrollbar-width: none; }
.board::-webkit-scrollbar { display: none; }
.slot-row { display: flex; align-items: flex-start; gap: 16px; }
.slot-ico {
  flex: 0 0 auto; width: 70px; height: 70px; margin-top: 30px; display: grid; place-items: center; font-size: 42px;
  background: rgba(255,255,255,.85); border: 4px solid var(--ink); border-radius: 50%;
}
.slot-row.now .slot-ico { background: var(--sun); }
.stickers { display: flex; flex-wrap: wrap; gap: 22px 20px; padding-top: 8px; }

.sticker {
  position: relative; width: 148px; height: 156px; padding: 10px 6px 0; display: flex; flex-direction: column; align-items: center;
  background: var(--paper); border: 5px solid var(--ink); border-radius: 38px 34px 40px 36px; box-shadow: 0 8px 0 var(--ink);
  transition: transform .15s, box-shadow .15s;
}
.sticker:nth-child(3n+1) { transform: rotate(-2deg); }
.sticker:nth-child(3n+2) { transform: rotate(1.5deg); }
.sticker .emo { font-size: 76px; line-height: 1.15; }
.sticker .pips { display: flex; gap: 2px; font-size: 22px; line-height: 1; margin-top: 2px; }
.sticker.sel { transform: translateY(-10px) scale(1.06) rotate(0); box-shadow: 0 16px 0 var(--ink); z-index: 2; }
.sticker.done { background: #e4f7ec; }
.sticker.done .emo { opacity: .55; }
.sticker.pending { background: #fff4d1; border-style: dashed; }
.stamp {
  position: absolute; top: -16px; right: -16px; width: 62px; height: 62px; display: grid; place-items: center;
  border: 4px solid var(--ink); border-radius: 50%; font-size: 34px; color: #fff; font-weight: 800;
}
.done .stamp { background: var(--grass); }
.pending .stamp { background: var(--sun); }
.go {
  position: absolute; left: 50%; bottom: -36px; transform: translateX(-50%); width: 120px; height: 72px; z-index: 3;
  display: grid; place-items: center; background: var(--grass); color: #fff; font-size: 46px; font-weight: 800;
  border: 5px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink);
}
@media (prefers-reduced-motion: no-preference) { .go { animation: pulse 1.1s ease-in-out infinite; } }
@keyframes pulse { 50% { transform: translateX(-50%) scale(1.08); } }
.go.undo { background: var(--berry); }
.go.hold { overflow: hidden; animation: none; }
.go.hold .ring { position: absolute; inset: 0; background: rgba(255,255,255,.45); transform-origin: left; transform: scaleX(0); }
.go.hold.holding .ring { transition: transform 1s linear; transform: scaleX(1); }

/* family strip on the picker: what everyone did today, as pictures (no scores) */
.kid-door.grown { flex: .7 1 0; min-width: 180px; }
.kid-door.grown .pet-big { font-size: clamp(80px, 10vw, 140px); }
.kid-door.grown .door-name { font-size: clamp(22px, 2.4vw, 34px); }
.family-chip {
  display: flex; align-items: center; gap: 10px; padding: 6px 18px 2px; margin-left: 14px; background: rgba(255,255,255,.95);
  border: 4px solid var(--ink); border-radius: 999px; box-shadow: 0 6px 0 var(--ink); font-size: 28px; font-weight: 800; white-space: nowrap;
}
.feed { display: flex; align-items: center; gap: 12px; margin: -14px 96px 22px 28px; min-width: 0; padding: 8px 12px; min-height: 64px;
  background: rgba(255,255,255,.12); border-radius: 999px; }
.feed .lead-ico { font-size: 34px; padding-left: 6px; }
.feed-chips { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 4px 2px; }
.feed-chips::-webkit-scrollbar { display: none; }
.fchip { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; padding: 4px 12px 2px; background: var(--paper);
  border: 3px solid var(--ink); border-radius: 999px; font-size: 30px; line-height: 1.2; }
.fchip.pending { background: #fff4d1; }
.fchip .who { font-size: 24px; }
.feed .empty-feed { color: rgba(255,255,255,.75); font-family: var(--ui-font); font-weight: 700; font-size: 17px; }
.go:active { box-shadow: 0 1px 0 var(--ink); }

.alldone {
  align-self: center; margin: auto 0; padding: 26px 36px 18px; text-align: center; background: var(--paper);
  border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink); font-size: 74px; line-height: 1.1;
}
.alldone small { display: block; font-size: 22px; font-family: var(--ui-font); font-weight: 700; margin-top: 8px; }
.notasks { color: #fff; font-size: 30px; text-shadow: 0 3px 0 var(--ink); margin: auto; text-align: center; }
.notasks div { font-size: 110px; }

.dock { display: flex; justify-content: center; gap: 22px; padding: 0 20px 20px; position: relative; z-index: 2; }
.dock button { width: 108px; height: 92px; font-size: 52px; display: grid; place-items: center; border-radius: 30px; position: relative; }
.dock .badge-n {
  position: absolute; top: -12px; right: -12px; min-width: 40px; height: 40px; padding: 2px 8px 0; border-radius: 999px;
  background: var(--berry); color: #fff; border: 3px solid var(--ink); font-size: 22px; font-weight: 800; line-height: 1.4;
}

/* ------------------------------------------------ sub screens (shop, stickers, quest) */
.sub { position: absolute; inset: 0; display: flex; flex-direction: column; }
.sub .topbar { padding-bottom: 6px; }
.panel {
  position: relative; z-index: 1; flex: 1; margin: 12px 24px 24px; padding: 24px; overflow-y: auto;
  background: rgba(255,255,255,.93); border: 5px solid var(--ink); border-radius: 40px; box-shadow: 0 10px 0 var(--ink);
}
.shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(176px, 1fr)); gap: 26px 22px; }
.book { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 26px 26px; }
.reward { position: relative; width: auto; height: 214px; }
.reward .emo { font-size: 90px; }
.reward .rname { font-family: var(--ui-font); font-size: 15px; font-weight: 700; opacity: .75; line-height: 1.2; text-align: center; }
.reward .cost { display: flex; align-items: center; gap: 4px; font-size: 28px; font-weight: 800; margin-top: 4px; }
.reward.poor { background: #f1eef7; }
.reward.poor .emo { filter: grayscale(.8); opacity: .6; }
.fill { width: 80%; height: 16px; margin-top: 6px; border: 3px solid var(--ink); border-radius: 999px; background: var(--paper); overflow: hidden; }
.fill i { display: block; height: 100%; background: var(--sun); }
.reward.rich { box-shadow: 0 8px 0 var(--ink), 0 0 0 8px rgba(255,201,60,.55); }

.slot-badge { aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; font-size: 62px; border: 5px solid var(--ink); background: var(--paper); box-shadow: 0 7px 0 var(--ink); position: relative; }
.slot-badge.locked { background: var(--mist); border-style: dashed; box-shadow: none; }
.slot-badge.locked .sil { filter: brightness(0); opacity: .14; }
.slot-badge .blabel { position: absolute; bottom: -42px; left: -10px; right: -10px; text-align: center; font-family: var(--ui-font); font-size: 14px; font-weight: 700; opacity: .7; line-height: 1.15; }
.book { row-gap: 62px; padding-bottom: 30px; }

.quest-big { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; min-height: 100%; }
.quest-big .goal { font-size: 140px; line-height: 1; }
.quest-big .trail { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; max-width: 980px; }
.quest-big .trail .walkers { display: flex; font-size: 58px; line-height: 1; margin: 0 4px; filter: drop-shadow(0 4px 0 rgba(46,42,92,.3)); }
.quest-big .trail .goal { font-size: 96px; margin-left: 8px; }
.quest-big .stone { width: 62px; height: 62px; border-width: 4px; }
.quest-big .reward-txt { font-family: var(--ui-font); font-size: 22px; font-weight: 700; text-align: center; }

/* ------------------------------------------------ overlays */
.celebrate {
  position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  background: rgba(46,42,92,.72); color: #fff; text-align: center;
}
.celebrate .hero { font-size: 200px; line-height: 1; filter: drop-shadow(0 8px 0 var(--ink)); }
.celebrate .title { font-size: 64px; font-weight: 800; text-shadow: 0 5px 0 var(--ink); line-height: 1; }
.celebrate .sub2 { font-family: var(--ui-font); font-size: 22px; font-weight: 700; opacity: .9; }
@media (prefers-reduced-motion: no-preference) { .celebrate .hero { animation: pop .7s cubic-bezier(.3,1.7,.5,1); } }
@keyframes pop { from { transform: scale(.2) rotate(-30deg); } }
.flyer { position: absolute; font-size: 54px; z-index: 30; pointer-events: none; }
.confetti { position: absolute; top: -20px; width: 14px; height: 22px; border-radius: 4px; border: 2px solid var(--ink); pointer-events: none; }
.toast {
  position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); padding: 12px 24px; z-index: 40;
  background: var(--ink); color: #fff; border-radius: 999px; font-family: var(--ui-font); font-weight: 700; font-size: 18px;
}

/* ------------------------------------------------ PIN pad */
.pinpad { position: absolute; inset: 0; z-index: 10; display: grid; place-items: center; background: rgba(46,42,92,.86); font-family: var(--ui-font); }
.pinbox { background: var(--paper); border: 5px solid var(--ink); border-radius: 32px; padding: 26px; box-shadow: 0 10px 0 var(--ink); text-align: center; }
.pinbox h2 { margin: 0 0 6px; font-family: var(--kid-font); font-size: 30px; }
.pindots { display: flex; justify-content: center; gap: 12px; margin: 12px 0 18px; height: 22px; }
.pindots i { width: 20px; height: 20px; border-radius: 50%; border: 3px solid var(--ink); }
.pindots i.on { background: var(--ink); }
.keys { display: grid; grid-template-columns: repeat(3, 84px); gap: 12px; }
.keys button { height: 74px; font-size: 32px; font-weight: 800; border-radius: 20px; }
.pinbox .cancel { margin-top: 16px; background: none; border: 0; font-weight: 700; font-size: 17px; text-decoration: underline; }
.shake { animation: shake .35s; }
@keyframes shake { 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }

/* ------------------------------------------------ parents area */
.admin { position: absolute; inset: 0; display: grid; grid-template-columns: 230px 1fr; background: #f6f3fb; font-family: var(--ui-font); user-select: text; -webkit-user-select: text; }
.admin nav { background: var(--ink); color: #fff; padding: 20px 14px; display: flex; flex-direction: column; gap: 6px; }
.admin nav h1 { font-family: var(--kid-font); font-size: 26px; margin: 0 8px 14px; line-height: 1.1; }
.admin nav button { text-align: left; background: none; border: 0; border-radius: 14px; padding: 11px 14px; font-size: 17px; font-weight: 700; color: #fff; display: flex; gap: 10px; align-items: center; }
.admin nav button.on { background: rgba(255,255,255,.16); }
.admin nav button .n { margin-left: auto; background: var(--berry); border-radius: 999px; padding: 0 9px; font-size: 14px; }
.admin nav .exit { margin-top: auto; background: var(--sun); color: var(--ink); justify-content: center; }
.admin main { overflow-y: auto; padding: 28px 34px 60px; }
.admin h2 { font-family: var(--kid-font); font-size: 30px; margin: 0 0 4px; }
.admin h3 { font-size: 18px; margin: 28px 0 10px; }
.admin .lead { margin: 0 0 18px; color: #5e5884; font-size: 16px; max-width: 70ch; line-height: 1.5; }
.rows { display: flex; flex-direction: column; gap: 10px; }
.row { display: flex; align-items: center; gap: 14px; background: #fff; border: 2px solid #ddd6ee; border-radius: 18px; padding: 12px 16px; }
.row .ri { font-size: 34px; width: 46px; text-align: center; }
.row .rt { flex: 1; min-width: 0; }
.row .rt b { display: block; font-size: 17px; }
.row .rt span { color: #6a648f; font-size: 14px; }
.row.off { opacity: .55; }
.btn { border: 2px solid var(--ink); background: #fff; border-radius: 12px; padding: 8px 14px; font-weight: 800; font-size: 15px; }
.btn.primary { background: var(--ink); color: #fff; }
.btn.ok { background: var(--grass); color: #fff; border-color: #2b8a5c; }
.btn.danger { color: #c3245a; border-color: #c3245a; }
.btn.big { padding: 12px 20px; font-size: 16px; }
.muted { color: #6a648f; }
.empty-note { padding: 18px; border: 2px dashed #ccc3e3; border-radius: 18px; color: #6a648f; }
.stars-ctl { display: flex; align-items: center; gap: 8px; }
.stars-ctl b { min-width: 52px; text-align: center; font-size: 18px; }

.modal-bg { position: absolute; inset: 0; background: rgba(46,42,92,.6); display: grid; place-items: center; padding: 20px; font-family: var(--ui-font); user-select: text; -webkit-user-select: text; }
.modal { width: min(640px, 100%); max-height: 100%; overflow-y: auto; background: #fff; border-radius: 26px; padding: 24px 26px; border: 4px solid var(--ink); }
.modal h2 { font-family: var(--kid-font); margin: 0 0 14px; font-size: 28px; }
.field { margin-bottom: 16px; }
.field > label, .field > .lab { display: block; font-weight: 800; margin-bottom: 6px; font-size: 15px; }
.field input[type=text], .field input[type=number], .field select { width: 100%; padding: 11px 13px; font: inherit; font-size: 17px; border: 2px solid #cfc6e6; border-radius: 12px; }
.hint { font-size: 13px; color: #6a648f; margin-top: 4px; }
.picks { display: flex; flex-wrap: wrap; gap: 8px; }
.picks label { position: relative; }
.picks input { position: absolute; opacity: 0; inset: 0; }
.picks span { display: grid; place-items: center; min-width: 50px; height: 50px; padding: 0 10px; font-size: 28px; border: 2px solid #ddd6ee; border-radius: 14px; background: #fff; }
.picks.text span { font-size: 15px; font-weight: 800; }
.picks input:checked + span { border-color: var(--ink); background: #fff3c9; box-shadow: 0 3px 0 var(--ink); }
.picks input:focus-visible + span { outline: 3px solid var(--sun); }
.theme-sw { width: 90px; height: 54px; border-radius: 12px; border: 2px solid #ddd6ee; display: flex; align-items: flex-end; justify-content: center; font-size: 13px !important; font-weight: 800; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.4); padding-bottom: 4px !important; }
.toggle { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.toggle input { width: 22px; height: 22px; }
.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
.actions .left { margin-right: auto; }
.code { font-family: ui-monospace, monospace; background: #f1edf9; padding: 2px 6px; border-radius: 6px; font-size: 14px; }
.progress { height: 18px; border-radius: 999px; background: #ebe5f6; overflow: hidden; margin: 10px 0; }
.progress i { display: block; height: 100%; background: var(--sun); }

/* ------------------------------------------------ responsive */
@container (max-width: 900px) {
  .kid { grid-template-columns: 1fr; grid-template-rows: auto auto 1fr auto; grid-template-areas: "top" "scene" "board" "dock"; }
  .nest { width: min(58vw, 260px); }
  .nest .pet { font-size: calc(var(--pet-scale) * 34vw); }
  .crown { font-size: 12vw; }
  .scene { padding: 6px 0 44px; }
  .board { padding: 10px 16px 24px; overflow: visible; }
  .topbar { padding: 12px 12px 0; gap: 8px; }
  .icon-btn { width: 56px; height: 56px; font-size: 28px; border-radius: 18px; }
  .counter { height: 56px; font-size: 30px; padding: 4px 14px 0 10px; }
  .counter .ico { font-size: 28px; margin-top: -4px; }
  .sticker { width: 118px; height: 128px; }
  .sticker .emo { font-size: 58px; }
  .slot-ico { width: 52px; height: 52px; font-size: 30px; margin-top: 24px; }
  .bubble { min-width: 70px; height: 70px; font-size: 38px; }
  .lvl { min-width: 50px; height: 50px; font-size: 28px; }
  .dock { position: sticky; bottom: 0; padding: 12px; }
  .dock button { width: 84px; height: 72px; font-size: 40px; }
  .kid { position: absolute; overflow-y: auto; grid-template-rows: auto auto auto auto; }
  .kids { flex-direction: column; overflow-y: auto; }
  .kid-door.grown { min-height: 220px; }
  .picker { overflow-y: auto; }
  .kids { overflow: visible; flex: 0 0 auto; }
  .feed { margin: 0 84px 18px 14px; }
  .quest-path { max-width: 100%; gap: 6px; padding: 8px 12px; font-size: 24px; }
  .quest-path .stone { width: 14px; height: 14px; border-width: 2px; }
  .quest-path .goal { font-size: 30px; }
  .parent-btn { position: fixed; }
  .family-chip { font-size: 22px; padding: 4px 12px 0; }
  .picker-top { flex-wrap: wrap; gap: 10px; }
  .kid-door { min-height: 300px; max-width: none; }
  .admin { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .admin nav { flex-direction: row; overflow-x: auto; padding: 10px; }
  .admin nav h1 { display: none; }
  .admin nav .exit { margin-top: 0; margin-left: auto; }
  .admin main { padding: 20px 16px 60px; }
}
`;

/* ------------------------------------------------------------------ card */
class HelferheldenCard extends HTMLElement {
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { idle: 90, sound: true, speech: true, height: "calc(100vh - 64px)", ...config };
    ensureFonts(this._config.font_base || DEFAULT_FONT_BASE);
    if (this._root) this._root.style.setProperty("--hh-height", this._config.height);
  }

  getCardSize() { return 12; }
  getGridOptions() { return { columns: "full", rows: 12, min_rows: 8 }; }

  set hass(hass) {
    this._hass = hass;
    // Follow the viewer's Home Assistant language: German for de*, English otherwise.
    const before = LANG;
    setLang(hass?.language);
    if (LANG !== before && this._state) this._render();
    if (!this._subscribed && this.isConnected) this._subscribe();
  }

  connectedCallback() {
    if (this._config) ensureFonts(this._config.font_base || DEFAULT_FONT_BASE);
    if (!this.shadowRoot) this._build();
    if (this._hass && !this._subscribed) this._subscribe();
    this._armIdle();
  }

  disconnectedCallback() {
    if (this._unsub) Promise.resolve(this._unsub).then((u) => typeof u === "function" && u()).catch(() => {});
    this._unsub = null; this._subscribed = false;
    clearTimeout(this._idleT); clearTimeout(this._retryT);
  }

  _build() {
    this._sfx = new Sfx();
    this._voice = new Voice(this);
    this._ui = { screen: this._config?.child ? "kid" : "picker", childId: null, sel: null, tab: "today" };
    this._pin = null;
    this._queue = [];
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<style>${STYLES}</style><div class="root"><div class="view"></div><div class="layer"></div></div>`;
    this._root = shadow.querySelector(".root");
    this._root.style.setProperty("--hh-height", this._config?.height || "calc(100vh - 64px)");
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
    // keep the promise so a disconnect during the handshake can still unsubscribe
    const pending = this._hass.connection.subscribeMessage((s) => this._onState(s), { type: "helferhelden/subscribe" });
    this._unsub = pending;
    try {
      await pending;
      this._error = null;
      this._retryDelay = 0;
    } catch (err) {
      this._unsub = null;
      this._error = tr(err?.message) || tr("Helferhelden ist nicht erreichbar. Ist die Integration eingerichtet?");
      this._render();
      // retry with backoff instead of on every hass update (stays "subscribed" meanwhile)
      this._retryDelay = Math.min(60000, (this._retryDelay || 2500) * 2);
      clearTimeout(this._retryT);
      this._retryT = setTimeout(() => { if (this.isConnected) this._subscribe(); }, this._retryDelay);
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
    if (this._ui.screen === "pin") return; // don't wipe digits being typed
    this._render();
  }

  _child(id = this._ui.childId) { return this._state?.children.find((c) => c.id === id); }

  _detect(prev, next) {
    if (next.family?.done_today && !prev.family?.done_today && !["admin", "pin"].includes(this._ui.screen)) {
      this._enqueue({ kind: "family", hero: "🏡", title: "Familien-Tag geschafft!", say: say("family"),
        sub: next.family.streak > 1 ? `🔥 ${next.family.streak} Tage als Team` : "" });
    }
    const id = this._ui.childId;
    if (!id || !["kid", "shop"].includes(this._ui.screen)) return;
    const a = prev.children.find((c) => c.id === id);
    const b = next.children.find((c) => c.id === id);
    if (!a || !b) return;
    if (b.total > 0 && a.done < a.total && b.done === b.total) {
      this._enqueue({ kind: "alldone", hero: PETS[b.pet]?.[0] || "🎉", title: "Alles geschafft!", say: say("alldone", { n: b.name }), sub: b.streak > 1 ? `🔥 ${b.streak} Tage am Stück` : "" });
    }
    if (b.level > a.level) {
      this._enqueue({ kind: "level", hero: "🆙", title: `Level ${b.level}!`, say: say("level", { l: b.level }), sub: b.stage > a.stage ? `${b.pet_name || PETS[b.pet]?.[1]} ist gewachsen` : "" });
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
      return res?.result;
    } catch (err) {
      if (err?.code === "bad_pin" || err?.code === "pin_locked") {
        this._pin = null;
        this._go("pin");
      }
      this._toast(tr(err?.message) || tr("Das hat nicht geklappt"));
      throw err;
    }
  }

  /* -------------------------------------------------------------- feedback */
  _speak(text) {
    if (!this._config.speech || !text) return;
    this._voice.speak(text).catch(() => {});
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
      ...c.tasks.map((t) => t.title),
    ]);
  }

  _sound(name) { if (this._config.sound) try { this._sfx[name](); } catch (_) { /* ignore */ } }

  _toast(text) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = text;
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
    // hold celebrations while a parent is in the PIN pad or parents' area; shown after leaving
    if (["admin", "pin"].includes(this._ui.screen)) { this._showing = false; return; }
    const item = this._queue.shift();
    if (!item) { this._showing = false; return; }
    this._showing = true;
    const el = document.createElement("div");
    el.className = "celebrate";
    el.innerHTML = `<div class="hero">${esc(item.hero)}</div><div class="title">${esc(item.title)}</div>${item.sub ? `<div class="sub2">${esc(item.sub)}</div>` : ""}`;
    this._layer.appendChild(el);
    this._sound(item.kind === "badge" ? "sparkle" : "fanfare");
    this._speak(item.say || item.title);
    this._confetti(item.kind === "badge" ? 30 : 70);
    const pet = this.shadowRoot.querySelector(".nest .pet");
    if (pet && item.kind === "alldone") pet.classList.add("dance");
    const close = () => { el.remove(); clearTimeout(tm); setTimeout(() => this._next(), 200); };
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
      c.style.left = `${Math.random() * w}px`;
      c.style.background = colors[i % colors.length];
      this._layer.appendChild(c);
      const drift = (Math.random() - 0.5) * 240;
      c.animate(
        [{ transform: "translate(0,0) rotate(0)" }, { transform: `translate(${drift}px, ${h + 60}px) rotate(${720 * Math.random()}deg)` }],
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
      s.className = "flyer"; s.textContent = "⭐";
      s.style.left = `${a.left - box.left + a.width / 2 - 27}px`;
      s.style.top = `${a.top - box.top + a.height / 3}px`;
      this._layer.appendChild(s);
      const dx = b.left - a.left - a.width / 2 + 40, dy = b.top - a.top - a.height / 3;
      s.animate(
        [{ transform: "translate(0,0) scale(1)" }, { transform: `translate(${dx / 2 + (i - 2) * 30}px, ${dy / 2 - 120}px) scale(1.5)`, offset: 0.45 }, { transform: `translate(${dx}px, ${dy}px) scale(.6)` }],
        { duration: 900, delay: i * 110, easing: "ease-in-out", fill: "forwards" }
      ).onfinish = () => s.remove();
    }
  }

  _jumpPet() {
    const pet = this.shadowRoot.querySelector(".nest .pet");
    this._jumpAt = Date.now();
    if (!pet) return;
    pet.classList.remove("jump"); void pet.offsetWidth; pet.classList.add("jump");
  }

  /* -------------------------------------------------------------- navigation */
  _go(screen, extra = {}) {
    this._ui = { ...this._ui, screen, sel: null, ...extra };
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
    clearTimeout(this._idleT);
    if (!this._config?.idle) return;
    this._idleT = setTimeout(() => {
      this._pin = null;
      this._layer.querySelectorAll(".modal-bg").forEach((m) => m.remove());
      if (this._config.child) this._go("kid");
      else if (this._ui.screen !== "picker") this._go("picker", { childId: null });
    }, this._config.idle * 1000);
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
    }, el.dataset.hold === "parent" || el.dataset.hold === "done" ? 1000 : 650);
  }

  _onUp() {
    clearTimeout(this._holdT);
    this._holdEl?.classList.remove("holding");
    this._holdEl = null;
  }

  _hold(kind, id) {
    if (kind === "parent") {
      this._sound("tap");
      if (this._state?.pin_set && !this._pin) this._go("pin");
      else this._go("admin");
      return true;
    }
    if (kind === "done") { this._a_done(id); return true; }
    if (kind === "task") {
      const t = this._child()?.tasks.find((x) => x.id === id);
      if (t && t.status !== "open") {
        this._ui.sel = { type: "undo", id };
        this._render();
        return true;
      }
    }
    return false;
  }

  _onClick(e) {
    if (this._holdFired) { this._holdFired = false; e.preventDefault(); return; }
    if (e.target.closest(".go.hold")) return; // parents' ✓ only reacts to holding
    const el = e.target.closest("[data-a]");
    if (!el) {
      if (this._ui.sel && !e.target.closest(".sticker")) { this._ui.sel = null; this._render(); }
      return;
    }
    const { a, id } = el.dataset;
    const fn = this[`_a_${a}`];
    if (fn) fn.call(this, id, el, e);
  }

  _a_pick(id) {
    const c = this._child(id);
    this._sound("tap");
    this._prefetchFor(c);
    if (c) this._speak(say(c.role === "parent" ? "helloParent" : "hello", { n: c.name }));
    this._go("kid", { childId: id });
  }
  _a_home() { this._pinEntry = ""; this._sound("tap"); this._config.child ? this._go("kid") : this._go("picker", { childId: null }); }
  _a_kid() { this._sound("tap"); this._go("kid"); }
  _a_shop() { this._sound("tap"); this._speak(tr("Belohnungen")); this._go("shop"); }
  _a_book() { this._sound("tap"); this._speak(tr("Deine Sternen-Sammlung")); this._go("book"); }
  _a_quest() {
    this._sound("tap");
    const q = this._state.quest;
    this._speak(q.title || tr("Familien-Abenteuer"));
    this._go("quest");
  }
  _a_pet() {
    const c = this._child();
    if (!c) return;
    this._jumpPet();
    this._sound("tap");
    const open = c.tasks.find((t) => t.status === "open");
    const name = c.pet_name || PETS[c.pet]?.[1];
    if (c.mood === "party") this._speak(`${name} freut sich riesig`);
    else if (open) this._speak(`${name} sagt: ${open.title}`);
    else this._speak(`${name} hat dich lieb`);
  }

  _a_task(id) {
    const c = this._child();
    const t = c?.tasks.find((x) => x.id === id);
    if (!t) return;
    this._sound("tap");
    this._speak(t.title);
    if (t.status === "open") {
      this._ui.sel = this._ui.sel?.id === id ? null : { type: "task", id };
      this._render();
    }
  }

  /** Run one kid action at a time; hides the ✓ button immediately so double taps can't repeat it. */
  async _once(fn) {
    if (this._busy) return;
    this._busy = true;
    this._ui.sel = null;
    try { await fn(); } catch (_) { /* toast already shown */ } finally {
      this._busy = false;
      this._render();
    }
  }

  _a_done(id) {
    const c = this._child();
    const t = c?.tasks.find((x) => x.id === id);
    if (!t || t.status !== "open" || this._busy) return;
    const sticker = this.shadowRoot.querySelector(`.sticker[data-id="${id}"]`);
    this._sound("chime");
    this._flyStars(sticker, t.stars);
    this._jumpPet();
    this._speak(say(c.role === "parent" ? "doneParent" : "done", { n: c.name }));
    sticker?.querySelector(".go")?.remove();
    return this._once(() => this._call("complete", { chore_id: id, child_id: c.id }));
  }

  _a_undo(id) {
    const c = this._child();
    if (this._busy) return;
    this.shadowRoot.querySelector(`.sticker[data-id="${id}"] .go`)?.remove();
    this._sound("nope");
    return this._once(() => this._call("undo", { chore_id: id, child_id: c.id }));
  }

  _a_reward(id) {
    const c = this._child();
    const r = this._state.rewards.find((x) => x.id === id);
    if (!r || !c) return;
    this._sound("tap");
    if (c.stars >= r.cost) {
      this._speak(`${r.title}. Das kostet ${r.cost} Sterne`);
      this._ui.sel = this._ui.sel?.id === id ? null : { type: "reward", id };
    } else {
      this._speak(`${r.title}. Noch ${r.cost - c.stars} Sterne sammeln`);
      this._ui.sel = null;
    }
    this._render();
  }

  _a_buy(id) {
    const c = this._child();
    const r = this._state.rewards.find((x) => x.id === id);
    if (!r || this._busy) return;
    this.shadowRoot.querySelector(`.reward[data-id="${id}"] .go`)?.remove();
    return this._once(async () => {
      await this._call("buy", { reward_id: id, child_id: c.id });
      this._enqueue({ kind: "buy", hero: r.icon, title: "Gekauft!", say: say("buy", { t: r.title }), sub: `${c.name}: ${r.title}` });
    });
  }

  /* -------------------------------------------------------------- render */
  _render() {
    if (!this._viewEl) return;
    const s = this._state;
    if (this._error) {
      this._viewEl.innerHTML = `<div class="picker"><div class="empty"><div class="big">🔌</div><p>${esc(this._error)}</p></div></div>`;
      return;
    }
    if (!s) {
      this._viewEl.innerHTML = `<div class="picker"><div class="empty"><div class="big">🥚</div><p>${tr("Lädt …")}</p></div></div>`;
      return;
    }
    const scr = this._ui.screen;
    let html;
    if (scr === "pin") html = this._picker() + this._pinpad();
    else if (scr === "admin") html = this._admin();
    else if (!this._child() && scr !== "picker" && scr !== "quest") { this._ui.screen = "picker"; html = this._picker(); }
    else if (scr === "kid") html = this._kid();
    else if (scr === "shop") html = this._shop();
    else if (scr === "book") html = this._book();
    else if (scr === "quest") html = this._questScreen();
    else html = this._picker();
    // Keep every scroll position when redrawing the same screen (taps must never jump to the top).
    const SCROLLERS = [".kid", ".board", ".panel", ".admin main", ".kids", ".picker", ".feed-chips"];
    const saved = SCROLLERS.map((sel) => {
      const el = this._viewEl.querySelector(sel);
      return el ? [el.scrollTop, el.scrollLeft] : [0, 0];
    });
    const key = `${scr}|${this._ui.tab || ""}|${this._ui.childId || ""}`;
    const sameScreen = this._lastScr === key;
    this._viewEl.innerHTML = html;
    this._lastScr = key;
    if (sameScreen) {
      SCROLLERS.forEach((sel, i) => {
        const [top, left] = saved[i];
        if (!top && !left) return;
        const el = this._viewEl.querySelector(sel);
        if (el) { el.scrollTop = top; el.scrollLeft = left; }
      });
    }
    if (scr === "pin") this._bindPin();
    if (Date.now() - (this._jumpAt || 0) < 600) this.shadowRoot.querySelector(".nest .pet")?.classList.add("jump");
  }

  _themeVars(theme) {
    const t = THEMES[theme] || THEMES.space;
    return `--sky1:${t.sky[0]};--sky2:${t.sky[1]};`;
  }

  _world(theme, decor = true) {
    const t = THEMES[theme] || THEMES.space;
    const d = decor ? t.decor.map(([e, top, left, size]) =>
      `<span class="decor" style="top:${top}%;left:${left}%;font-size:${size}px">${e}</span>`).join("") : "";
    return `<div class="world" style="${this._themeVars(theme)}">${d}
      <svg class="hill" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 120 C 200 40, 380 160, 600 100 S 1000 30, 1200 110 V300 H0Z" fill="${t.hill}"/>
        <path d="M0 190 C 260 130, 460 230, 700 180 S 1050 140, 1200 190 V300 H0Z" fill="${t.ground}"/>
      </svg></div>`;
  }

  _petEmoji(c) { return PETS[c.pet]?.[0] || "🐲"; }

  _questPath(q, compact) {
    if (!q.goal) return "";
    const n = Math.min(compact ? 12 : 30, q.goal);
    const on = Math.floor((q.progress / q.goal) * n);
    const stones = Array.from({ length: n }, (_, i) => `<span class="stone ${i < on ? "on" : ""}"></span>`).join("");
    return { stones, done: !!q.completed_at };
  }

  _picker() {
    const s = this._state;
    const q = s.quest;
    let top = "";
    // (family chip is appended below)
    if (q.goal) {
      const p = this._questPath(q, true);
      top = `<button class="quest-path ${p.done ? "done" : ""}" data-a="questFromPicker" aria-label="Familien-Abenteuer: ${esc(q.title)}">
        <span>👨‍👩‍👧</span><span class="stones">${p.stones}</span><span class="goal">${esc(q.icon)}</span></button>`;
    }
    const fam = s.family || {};
    if (fam.tasks_today || fam.streak) {
      top += `<div class="family-chip" aria-label="Heute zusammen ${fam.stars_today} Sterne">🤝 ⭐ ${fam.stars_today || 0}${fam.streak ? ` <span>🔥 ${fam.streak}</span>` : ""}</div>`;
    }
    const kids = s.children.map((c) => {
      const dots = c.tasks.map((t) => `<span class="dot ${t.status === "done" ? "on" : t.status === "pending" ? "wait" : ""}"></span>`).join("");
      return `<button class="kid-door ${c.role === "parent" ? "grown" : ""}" data-a="pick" data-id="${c.id}" aria-label="${esc(c.name)}">
        ${this._world(c.theme)}
        ${c.total && c.done === c.total ? `<span class="door-crown">🏆</span>` : ""}
        <span class="pet-big">${this._petEmoji(c)}</span>
        <span class="dots">${dots}</span>
        <span class="door-name">${esc(c.name)}</span>
      </button>`;
    }).join("");
    const byId = Object.fromEntries(s.children.map((c) => [c.id, c]));
    const chips = (fam.feed || []).map((f) => byId[f.child_id]
      ? `<span class="fchip ${f.status === "pending" ? "pending" : ""}" title="${esc(byId[f.child_id].name)}: ${esc(f.title)}"><span class="who">${this._petEmoji(byId[f.child_id])}</span>${esc(f.icon)}</span>` : "").join("");
    const feed = s.children.length > 1
      ? `<div class="feed" aria-label="${tr("Heute geschafft")}"><span class="lead-ico">🙌</span>${chips ? `<div class="feed-chips">${chips}</div>` : `<span class="empty-feed">${tr("Heute geschafft: hier erscheint jede erledigte Aufgabe der Familie.")}</span>`}</div>`
      : "";
    const body = s.children.length
      ? `<div class="kids">${kids}</div>${feed}`
      : `<div class="empty"><div class="big">🐣</div><p>${tr("Noch keine Kinder angelegt. Im Elternbereich legst du Kinder, Aufgaben und Belohnungen an.")}</p>
         <button class="chunk" data-a="openParents">${tr("Elternbereich öffnen")}</button></div>`;
    return `<div class="picker"><div class="picker-top">${top}</div>${body}
      <button class="parent-btn chunk" data-hold="parent" aria-label="${tr("Elternbereich (gedrückt halten)")}" title="${tr("Elternbereich: gedrückt halten")}"><span class="ring"></span>🔒</button></div>`;
  }

  _a_openParents() { this._state?.pin_set && !this._pin ? this._go("pin") : this._go("admin"); }
  _a_questFromPicker() { this._sound("tap"); this._speak(this._state.quest.title); this._go("quest"); }

  _topbar(c, back = "home") {
    const streak = c.streak;
    return `<div class="topbar">
      <button class="icon-btn chunk" data-a="${back}" aria-label="${tr("Zurück")}">${back === "home" ? (this._config.child ? "⭐" : "🏠") : "⬅️"}</button>
      ${this._config.child && back === "home" ? `<button class="icon-btn chunk parent-inline" data-hold="parent" aria-label="${tr("Elternbereich (gedrückt halten)")}" style="font-size:26px;position:relative"><span class="ring" style="border-radius:24px"></span>🔒</button>` : ""}
      <div class="spacer"></div>
      <div class="counter streak ${streak ? "" : "off"}" aria-label="${streak} Tage am Stück"><span class="ico">🔥</span>${streak}</div>
      <div class="counter stars" aria-label="${c.stars} Sterne"><span class="ico">⭐</span>${c.stars}</div>
    </div>`;
  }

  _kid() {
    const c = this._child();
    const s = this._state;
    const stage = c.stage;
    const scale = [0.72, 0.86, 0.96, 1][stage];
    const circ = 2 * Math.PI * 46;
    const open = c.tasks.find((t) => t.status === "open");
    const bubble = c.mood === "hungry" || c.mood === "ok" ? (open ? esc(open.icon) : MOOD_ICON.ok) : MOOD_ICON[c.mood] || "😊";
    const petCls = c.mood === "party" ? "dance" : c.mood === "sleepy" ? "sleepy" : "";
    const orbit = stage >= 2 ? `<div class="sparkle-orbit"><span style="top:0;left:46%">✨</span><span style="bottom:8%;left:2%">✨</span><span style="bottom:8%;right:2%">✨</span></div>` : "";

    const hour = new Date().getHours();
    const nowSlot = hour < 11 ? "morning" : hour < 17 ? "day" : "evening";
    let board;
    if (!c.tasks.length) {
      board = `<div class="notasks"><div>🏖️</div>${tr("Heute frei!")}</div>`;
    } else {
      const rows = Object.keys(SLOTS).map((slot) => {
        const tasks = c.tasks.filter((t) => t.slot === slot);
        if (!tasks.length) return "";
        return `<div class="slot-row ${slot === nowSlot ? "now" : ""}"><div class="slot-ico" title="${tr(SLOTS[slot][1])}">${SLOTS[slot][0]}</div>
          <div class="stickers">${tasks.map((t) => this._sticker(t)).join("")}</div></div>`;
      }).join("");
      const all = c.done === c.total ? `<div class="alldone">🎉${this._petEmoji(c)}🎉<small>${tr("Alles erledigt für heute")}</small></div>` : "";
      board = all + rows;
    }
    const pending = s.quest.goal && !s.quest.completed_at;
    return `<div class="kid" style="${this._themeVars(c.theme)}">
      ${this._world(c.theme)}
      ${this._topbar(c)}
      <div class="scene">
        <div class="nest" style="--pet-scale:${scale}">
          <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.28)" stroke="rgba(46,42,92,.35)" stroke-width="5"/>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#ffc93c" stroke-width="5" stroke-linecap="round"
              stroke-dasharray="${(c.level_progress * circ).toFixed(1)} ${circ.toFixed(1)}"/>
          </svg>
          ${orbit}
          ${stage >= 3 ? `<span class="crown">👑</span>` : ""}
          <button class="pet ${petCls}" data-a="pet" style="background:none;border:0;padding:0" aria-label="${esc(c.pet_name || tr(PETS[c.pet]?.[1]))}">${this._petEmoji(c)}</button>
          <div class="bubble" aria-hidden="true">${bubble}</div>
          <div class="lvl" title="${tr("Level")}">${c.level}</div>
          ${c.pet_name ? `<div class="pet-name">${esc(c.pet_name)}</div>` : ""}
        </div>
      </div>
      <div class="board">${board}</div>
      <div class="dock">
        ${c.role === "parent" ? "" : `<button class="chunk" data-a="shop" aria-label="${tr("Belohnungen")}">🎁</button>`}
        <button class="chunk" data-a="book" aria-label="${tr("Sternen-Sammlung")}">🏅<span class="badge-n">${Object.keys(c.badges).length}</span></button>
        ${s.quest.goal ? `<button class="chunk" data-a="quest" aria-label="${tr("Familien-Abenteuer")}">${esc(s.quest.icon)}${pending ? "" : "✅"}</button>` : ""}
      </div>
    </div>`;
  }

  _sticker(t) {
    const sel = this._ui.sel;
    const pips = "⭐".repeat(Math.min(t.stars, 5));
    let extra = "";
    if (t.status === "done") extra = `<span class="stamp">✓</span>`;
    if (t.status === "pending") extra = `<span class="stamp">⏳</span>`;
    if (sel?.id === t.id && sel.type === "task") {
      extra += this._child()?.role === "parent"
        ? `<button class="go hold" data-hold="done" data-id="${t.id}" aria-label="${tr("Fertig (gedrückt halten)")}">✓<span class="ring"></span></button>`
        : `<button class="go" data-a="done" data-id="${t.id}" aria-label="${tr("Fertig")}">✓</button>`;
    }
    if (sel?.id === t.id && sel.type === "undo") extra += `<button class="go undo" data-a="undo" data-id="${t.id}" aria-label="${tr("Rückgängig")}">↩️</button>`;
    return `<div class="sticker ${t.status} ${sel?.id === t.id ? "sel" : ""}" role="button" tabindex="0" data-a="task" data-hold="task" data-id="${t.id}" aria-label="${esc(t.title)}">
      <span class="emo">${esc(t.icon)}</span><span class="pips">${pips}</span>${extra}</div>`;
  }

  _shop() {
    const c = this._child();
    const rewards = this._state.rewards.filter((r) => r.active).sort((a, b) => a.cost - b.cost);
    const items = rewards.map((r) => {
      const rich = c.stars >= r.cost;
      const sel = this._ui.sel?.type === "reward" && this._ui.sel.id === r.id;
      const pct = Math.min(100, Math.round((c.stars / r.cost) * 100));
      return `<div class="sticker reward ${rich ? "rich" : "poor"} ${sel ? "sel" : ""}" role="button" tabindex="0" data-a="reward" data-id="${r.id}" aria-label="${esc(r.title)}">
        <span class="emo">${esc(r.icon)}</span>
        <span class="rname">${esc(r.title)}</span>
        <span class="cost">⭐ ${r.cost}</span>
        ${rich ? "" : `<span class="fill"><i style="width:${pct}%"></i></span>`}
        ${sel ? `<button class="go" data-a="buy" data-id="${r.id}" aria-label="${tr("Kaufen")}">✓</button>` : ""}
      </div>`;
    }).join("");
    return `<div class="sub" style="${this._themeVars(c.theme)}">${this._world(c.theme, false)}
      ${this._topbar(c, "kid")}
      <div class="panel">${items ? `<div class="shop-grid">${items}</div>` : `<div class="notasks" style="color:var(--ink);text-shadow:none"><div>🎁</div></div>`}</div></div>`;
  }

  _book() {
    const c = this._child();
    const all = this._state.badges;
    const slots = Object.entries(all).map(([k, b]) => k in c.badges
      ? `<div class="slot-badge" title="${esc(b.label)}">${esc(b.icon)}<span class="blabel">${esc(b.label)}</span></div>`
      : `<div class="slot-badge locked" title="${esc(b.label)}"><span class="sil">${esc(b.icon)}</span><span class="blabel">${esc(b.label)}</span></div>`).join("");
    return `<div class="sub" style="${this._themeVars(c.theme)}">${this._world(c.theme, false)}
      ${this._topbar(c, "kid")}<div class="panel"><div class="book">${slots}</div></div></div>`;
  }

  _questScreen() {
    const s = this._state;
    const q = s.quest;
    const c = this._child();
    const theme = c?.theme || "space";
    const back = c ? "kid" : "home";
    let body;
    if (!q.goal) {
      body = `<div class="quest-big"><div class="goal">🗺️</div><div class="reward-txt">${tr("Gerade kein Abenteuer. Eltern können eins im Elternbereich starten.")}</div></div>`;
    } else {
      const n = Math.min(24, q.goal);
      const on = Math.floor((q.progress / q.goal) * n);
      const walkers = `<span class="walkers">${s.children.map((k) => `<span title="${esc(k.name)}">${this._petEmoji(k)}</span>`).join("")}</span>`;
      const stones = Array.from({ length: n }, (_, i) => `<span class="stone ${i < on ? "on" : ""}"></span>`);
      stones.splice(on, 0, walkers);
      body = `<div class="quest-big">
        <div class="trail">${stones.join("")}<span class="goal">${esc(q.icon)}${q.completed_at ? "✅" : ""}</span></div>
        <div class="reward-txt">${esc(q.title)}${q.reward ? ` · Belohnung: ${esc(q.reward)}` : ""}<br><span class="muted">⭐ ${q.progress} von ${q.goal}</span></div>
      </div>`;
    }
    const bar = c ? this._topbar(c, back) : `<div class="topbar"><button class="icon-btn chunk" data-a="home" aria-label="${tr("Zurück")}">⬅️</button></div>`;
    return `<div class="sub" style="${this._themeVars(theme)}">${this._world(theme, false)}${bar}<div class="panel">${body}</div></div>`;
  }

  /* -------------------------------------------------------------- PIN */
  _pinpad() {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "⌫", 0, "✓"];
    return `<div class="pinpad"><div class="pinbox">
      <h2>${tr("Elternbereich")}</h2><div class="muted">${tr("PIN eingeben")}</div>
      <div class="pindots"></div>
      <div class="keys">${keys.map((k) => `<button class="chunk" data-key="${k}">${k}</button>`).join("")}</div>
      <button class="cancel" data-a="home">${tr("Abbrechen")}</button></div></div>`;
  }

  _bindPin() {
    let entry = this._pinEntry || "";
    const dots = this.shadowRoot.querySelector(".pindots");
    const box = this.shadowRoot.querySelector(".pinbox");
    const draw = () => { this._pinEntry = entry; dots.innerHTML = Array.from({ length: Math.max(4, entry.length) }, (_, i) => `<i class="${i < entry.length ? "on" : ""}"></i>`).join(""); };
    draw();
    const submit = async () => {
      try {
        await this._hass.callWS({ type: "helferhelden/action", action: "check_pin", data: {}, pin: entry });
        this._pin = entry;
        this._pinEntry = "";
        this._go("admin", { tab: "today" });
      } catch (err) {
        if (err?.code === "pin_locked") this._toast(tr(err.message));
        entry = ""; draw();
        box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
        this._sound("nope");
      }
    };
    this.shadowRoot.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.key;
      if (k === "⌫") entry = entry.slice(0, -1);
      else if (k === "✓") return submit();
      else if (entry.length < 8) entry += k;
      draw();
    }));
  }

  /* -------------------------------------------------------------- parents area */
  _admin() {
    const s = this._state;
    const tabs = [
      ["today", "📋", tr("Heute"), s.pending.length + s.purchases.length],
      ["children", "👨‍👩‍👧", tr("Familie")],
      ["chores", "✅", tr("Aufgaben")],
      ["rewards", "🎁", tr("Belohnungen")],
      ["quest", "🚀", "Abenteuer"],
      ["settings", "⚙️", tr("Einstellungen")],
    ];
    const nav = tabs.map(([k, i, l, n]) => `<button class="${this._ui.tab === k ? "on" : ""}" data-a="tab" data-id="${k}">${i} ${l}${n ? `<span class="n">${n}</span>` : ""}</button>`).join("");
    const main = this[`_tab_${this._ui.tab}`]?.() || "";
    return `<div class="admin"><nav><h1>Helferhelden</h1>${nav}<button class="exit" data-a="exitAdmin">${tr("Zurück zu den Kindern")}</button></nav><main>${main}</main></div>`;
  }

  _a_tab(id) { this._ui.tab = id; this._render(); }
  _a_exitAdmin() { this._pin = null; this._config.child ? this._go("kid") : this._go("picker", { childId: null }); }

  _childName(id) { return this._state.children.find((c) => c.id === id)?.name || "?"; }

  _tab_today() {
    const s = this._state;
    const pend = s.pending.map((p) => `<div class="row"><span class="ri">${esc(p.icon)}</span>
      <div class="rt"><b>${esc(p.child)}: ${esc(p.chore)}</b><span>${p.day === s.today ? "heute" : esc(p.day)} · ${p.stars} ⭐</span></div>
      <button class="btn danger" data-a="reject" data-id="${p.id}">${tr("Ablehnen")}</button>
      <button class="btn ok" data-a="approve" data-id="${p.id}">${tr("Bestätigen")}</button></div>`).join("");
    const buys = s.purchases.map((p) => `<div class="row"><span class="ri">${esc(p.icon)}</span>
      <div class="rt"><b>${esc(this._childName(p.child_id))}: ${esc(p.title)}</b><span>${new Date(p.at).toLocaleString("de-DE", { weekday: "short", hour: "2-digit", minute: "2-digit" })} · ${p.cost} ⭐</span></div>
      <button class="btn ok" data-a="redeem" data-id="${p.id}">${tr("Eingelöst")}</button></div>`).join("");
    const kids = s.children.map((c) => `<div class="row"><span class="ri">${this._petEmoji(c)}</span>
      <div class="rt"><b>${esc(c.name)}</b><span>Heute ${c.done} von ${c.total} · Level ${c.level} · 🔥 ${c.streak}</span></div>
      <div class="stars-ctl"><button class="btn" data-a="stars" data-id="${c.id}|-1" aria-label="${tr("Einen Stern abziehen")}">−</button><b>⭐ ${c.stars}</b>
      <button class="btn" data-a="stars" data-id="${c.id}|1" aria-label="${tr("Einen Stern geben")}">+</button></div></div>`).join("");
    return `<h2>${tr("Heute")}</h2><p class="lead">${tr("Aufgaben, die du bestätigen musst, und gekaufte Belohnungen, die noch eingelöst werden wollen.")}</p>
      <h3>${tr("Zu bestätigen")}</h3><div class="rows">${pend || `<div class="empty-note">${tr("Nichts offen.")}</div>`}</div>
      <h3>${tr("Belohnungen einlösen")}</h3><div class="rows">${buys || `<div class="empty-note">${tr("Keine offenen Belohnungen.")}</div>`}</div>
      <h3>${tr("Sterne von Hand anpassen")}</h3><div class="rows">${kids || `<div class="empty-note">${tr("Lege zuerst ein Kind an.")}</div>`}</div>`;
  }

  async _a_approve(id) { this._sound("chime"); await this._call("approve", { entry_id: id }, true); }
  async _a_reject(id) { await this._call("reject", { entry_id: id }, true); }
  async _a_redeem(id) { await this._call("redeem", { purchase_id: id }, true); }
  async _a_stars(id) {
    const [cid, n] = id.split("|");
    await this._call("adjust_stars", { child_id: cid, amount: Number(n), reason: tr("Eltern") }, true);
  }

  _tab_children() {
    const row = (c) => `<div class="row"><span class="ri">${this._petEmoji(c)}</span>
      <div class="rt"><b>${esc(c.name)}</b><span>${esc(c.pet_name || tr(PETS[c.pet]?.[1]))} · ${tr(THEMES[c.theme]?.label)} · ${tr("Level")} ${c.level} · ${Object.keys(c.badges).length} ${tr("Sammelsterne")}</span></div>
      <button class="btn" data-a="editChild" data-id="${c.id}">${tr("Bearbeiten")}</button></div>`;
    const kids = this._state.children.filter((c) => c.role !== "parent").map(row).join("");
    const parents = this._state.children.filter((c) => c.role === "parent").map(row).join("");
    return `<h2>${tr("Familie")}</h2><p class="lead">${tr("Jedes Familienmitglied hat ein Haustier und eine Welt. Das Haustier wächst mit den Leveln.")}</p>
      <h3>${tr("Kinder")}</h3><div class="rows">${kids || `<div class="empty-note">${tr("Noch keine Kinder.")}</div>`}</div>
      <p><button class="btn primary big" data-a="editChild">${tr("Kind hinzufügen")}</button></p>
      <h3>${tr("Eltern spielen mit")}</h3>
      <p class="lead">Eltern bekommen eigene Aufgaben. Ihre Sterne zählen fürs Familien-Abenteuer, und die Kinder sehen auf dem Startbildschirm, was alle heute geschafft haben. Es gibt keine Rangliste. Wenn alle ihre Aufgaben erledigt haben, feiert die ganze Familie. Eltern haken ihre Aufgaben ab, indem sie den Haken gedrückt halten.</p>
      <div class="rows">${parents || `<div class="empty-note">${tr("Noch keine Eltern angelegt.")}</div>`}</div>
      <p><button class="btn primary big" data-a="addParent">${tr("Elternteil hinzufügen")}</button></p>`;
  }

  _a_addParent() { this._a_editChild(undefined, "parent"); }

  _a_editChild(id, role = "child") {
    const c = this._state.children.find((x) => x.id === id) || { name: "", pet: role === "parent" ? "owl" : "dragon", theme: "space", pet_name: "", role };
    const pets = Object.entries(PETS).map(([k, [e, l]]) => `<label title="${l}"><input type="radio" name="pet" value="${k}" ${c.pet === k ? "checked" : ""}><span>${e}</span></label>`).join("");
    const themes = Object.entries(THEMES).map(([k, t]) => `<label><input type="radio" name="theme" value="${k}" ${c.theme === k ? "checked" : ""}>
      <span class="theme-sw" style="background:linear-gradient(180deg,${t.sky[0]},${t.sky[1]})">${t.label}</span></label>`).join("");
    const isParent = c.role === "parent";
    this._modal(`<h2>${id ? trf("{n} bearbeiten", { n: esc(c.name) }) : isParent ? tr("Elternteil hinzufügen") : tr("Kind hinzufügen")}</h2>
      <div class="field"><label for="f-name">${tr("Name")}${isParent ? tr(" (so nennen die Kinder dich)") : ""}</label><input id="f-name" type="text" name="name" value="${esc(c.name)}" required maxlength="24" placeholder="${isParent ? tr("Mama") : ""}"></div>
      <div class="field"><span class="lab">${tr("Rolle")}</span><div class="picks text">
        <label><input type="radio" name="role" value="child" ${!isParent ? "checked" : ""}><span>${tr("🧒 Kind")}</span></label>
        <label><input type="radio" name="role" value="parent" ${isParent ? "checked" : ""}><span>${tr("🧑 Elternteil")}</span></label></div></div>
      <div class="field"><span class="lab">${tr("Haustier")}</span><div class="picks">${pets}</div></div>
      <div class="field"><label for="f-pn">${tr("Name des Haustiers")}</label><input id="f-pn" type="text" name="pet_name" value="${esc(c.pet_name)}" maxlength="20"><div class="hint">${tr("Wird vorgelesen, wenn das Kind aufs Haustier tippt.")}</div></div>
      <div class="field"><span class="lab">${tr("Welt")}</span><div class="picks">${themes}</div></div>`,
    async (f) => {
      await this._call("save_child", { id, name: f.get("name"), role: f.get("role"), pet: f.get("pet"), theme: f.get("theme"), pet_name: f.get("pet_name") }, true);
    }, id ? async () => {
      if (await this._confirm(`${c.name} wirklich entfernen? Sterne, Level und Sammelsterne gehen verloren.`, "Entfernen")) {
        await this._call("delete_child", { id }, true);
        return true;
      }
      return false;
    } : null);
  }

  _tab_chores() {
    const ch = this._state.chores;
    const groups = Object.entries(SLOTS).map(([slot, [i, l]]) => {
      const list = ch.filter((c) => c.slot === slot).sort((a, b) => a.title.localeCompare(b.title));
      if (!list.length) return "";
      return `<h3>${i} ${l}</h3><div class="rows">${list.map((c) => `<div class="row ${c.active ? "" : "off"}"><span class="ri">${esc(c.icon)}</span>
        <div class="rt"><b>${esc(c.title)}</b><span>${"⭐".repeat(c.stars)} · ${c.days.length ? c.days.map((d) => tr(DAYS[d])).join(", ") : tr("jeden Tag")} · ${c.children.map((k) => esc(this._childName(k))).join(", ") || tr("niemand")}${c.needs_approval ? ` · ${tr("mit Bestätigung")}` : ""}</span></div>
        <button class="btn" data-a="editChore" data-id="${c.id}">${tr("Bearbeiten")}</button></div>`).join("")}</div>`;
    }).join("");
    return `<h2>${tr("Aufgaben")}</h2><p class="lead">${tr("Kinder sehen nur das Bild, der Titel wird vorgelesen. Wähle deshalb ein eindeutiges Bild und einen kurzen Titel.")}</p>
      ${groups || `<div class="empty-note">${tr("Noch keine Aufgaben.")}</div>`}
      <p><button class="btn primary big" data-a="editChore">${tr("Aufgabe hinzufügen")}</button></p>`;
  }

  _a_editChore(id) {
    const kids = this._state.children;
    const c = this._state.chores.find((x) => x.id === id) ||
      { title: "", icon: "🪥", stars: 1, days: [], slot: "morning", children: kids.map((k) => k.id), needs_approval: false, active: true };
    const icons = [...new Set([c.icon, ...CHORE_ICONS])].map((e) => `<label><input type="radio" name="icon" value="${esc(e)}" ${c.icon === e ? "checked" : ""}><span>${esc(e)}</span></label>`).join("");
    const stars = [1, 2, 3, 4, 5].map((n) => `<label><input type="radio" name="stars" value="${n}" ${c.stars === n ? "checked" : ""}><span>${"⭐".repeat(n)}</span></label>`).join("");
    const slots = Object.entries(SLOTS).map(([k, [i, l]]) => `<label><input type="radio" name="slot" value="${k}" ${c.slot === k ? "checked" : ""}><span>${i} ${tr(l)}</span></label>`).join("");
    const days = DAYS.map((d, i) => `<label><input type="checkbox" name="days" value="${i}" ${c.days.includes(i) ? "checked" : ""}><span>${tr(d)}</span></label>`).join("");
    const who = kids.map((k) => `<label><input type="checkbox" name="children" value="${k.id}" ${c.children.includes(k.id) ? "checked" : ""}><span>${this._petEmoji(k)} ${esc(k.name)}</span></label>`).join("");
    this._modal(`<h2>${id ? tr("Aufgabe bearbeiten") : tr("Aufgabe hinzufügen")}</h2>
      <div class="field"><label for="f-t">${tr("Titel (wird vorgelesen)")}</label><input id="f-t" type="text" name="title" value="${esc(c.title)}" required maxlength="40" placeholder="${tr("Zähne putzen")}"></div>
      <div class="field"><span class="lab">${tr("Bild")}</span><div class="picks">${icons}</div></div>
      <div class="field"><span class="lab">${tr("Sterne")}</span><div class="picks text">${stars}</div></div>
      <div class="field"><span class="lab">${tr("Tageszeit")}</span><div class="picks text">${slots}</div></div>
      <div class="field"><span class="lab">${tr("Tage")}</span><div class="picks text">${days}</div><div class="hint">${tr("Kein Tag gewählt bedeutet: jeden Tag.")}</div></div>
      <div class="field"><span class="lab">${tr("Für wen")}</span><div class="picks text">${who || `<span class="muted">${tr("Lege zuerst ein Kind an.")}</span>`}</div></div>
      <div class="field"><label class="toggle"><input type="checkbox" name="needs_approval" ${c.needs_approval ? "checked" : ""}> ${tr("Eltern müssen bestätigen, bevor es Sterne gibt")}</label></div>
      <div class="field"><label class="toggle"><input type="checkbox" name="active" ${c.active ? "checked" : ""}> ${tr("Aktiv")}</label></div>`,
    async (f) => {
      await this._call("save_chore", {
        id, title: f.get("title"), icon: f.get("icon"), stars: Number(f.get("stars")), slot: f.get("slot"),
        days: f.getAll("days").map(Number), children: f.getAll("children"),
        needs_approval: f.get("needs_approval") === "on", active: f.get("active") === "on",
      }, true);
    }, id ? async () => {
      if (await this._confirm(`Aufgabe „${c.title}“ löschen?`, tr("Löschen"))) { await this._call("delete_chore", { id }, true); return true; }
      return false;
    } : null);
  }

  _tab_rewards() {
    const rows = this._state.rewards.slice().sort((a, b) => a.cost - b.cost).map((r) => `<div class="row ${r.active ? "" : "off"}"><span class="ri">${esc(r.icon)}</span>
      <div class="rt"><b>${esc(r.title)}</b><span>${r.cost} ⭐${r.has_script ? ` · ${tr("startet ein Skript")}` : ""}</span></div>
      <button class="btn" data-a="editReward" data-id="${r.id}">${tr("Bearbeiten")}</button></div>`).join("");
    return `<h2>${tr("Belohnungen")}</h2><p class="lead">Kinder kaufen Belohnungen mit ihren Sternen. Optional startet ein Kauf ein Home-Assistant-Skript, zum Beispiel „Fernseher 30 Minuten an“. Das Skript bekommt die Variablen <span class="code">child</span> ${tr("und")} <span class="code">reward</span>.</p>
      <div class="rows">${rows || `<div class="empty-note">${tr("Noch keine Belohnungen.")}</div>`}</div>
      <p><button class="btn primary big" data-a="editReward">${tr("Belohnung hinzufügen")}</button></p>`;
  }

  async _a_editReward(id) {
    const r = this._state.rewards.find((x) => x.id === id) || { title: "", icon: "🍦", cost: 5, script: "", active: true };
    // view() withholds `script`, so ask for it; on failure fall back to tr("Kein Skript")
    // rather than leaving the dialog unopened.
    let cur = "";
    if (id && r.has_script) {
      try { cur = (await this._call("reward_script", { id }, true)) || ""; } catch (_) { return; }
    }
    const icons = [...new Set([r.icon, ...REWARD_ICONS])].map((e) => `<label><input type="radio" name="icon" value="${esc(e)}" ${r.icon === e ? "checked" : ""}><span>${esc(e)}</span></label>`).join("");
    const scripts = Object.keys(this._hass?.states || {}).filter((e) => e.startsWith("script.")).sort();
    const opts = [`<option value="">${tr("Kein Skript")}</option>`, ...scripts.map((e) =>
      `<option value="${esc(e)}" ${cur === e ? "selected" : ""}>${esc(this._hass.states[e].attributes.friendly_name || e)}</option>`)].join("");
    this._modal(`<h2>${id ? "Belohnung bearbeiten" : tr("Belohnung hinzufügen")}</h2>
      <div class="field"><label for="f-t">${tr("Titel (wird vorgelesen)")}</label><input id="f-t" type="text" name="title" value="${esc(r.title)}" required maxlength="40" placeholder="${tr("Ein Eis")}"></div>
      <div class="field"><span class="lab">${tr("Bild")}</span><div class="picks">${icons}</div></div>
      <div class="field"><label for="f-c">${tr("Preis in Sternen")}</label><input id="f-c" type="number" name="cost" min="1" max="999" value="${r.cost}"></div>
      <div class="field"><label for="f-s">${tr("Skript beim Kauf")}</label><select id="f-s" name="script">${opts}</select></div>
      <div class="field"><label class="toggle"><input type="checkbox" name="active" ${r.active ? "checked" : ""}> ${tr("Im Laden sichtbar")}</label></div>`,
    async (f) => {
      await this._call("save_reward", { id, title: f.get("title"), icon: f.get("icon"), cost: Number(f.get("cost")), script: f.get("script") || null, active: f.get("active") === "on" }, true);
    }, id ? async () => {
      if (await this._confirm(`Belohnung „${r.title}“ löschen?`, tr("Löschen"))) { await this._call("delete_reward", { id }, true); return true; }
      return false;
    } : null);
  }

  _tab_quest() {
    const q = this._state.quest;
    const pct = q.goal ? Math.round((q.progress / q.goal) * 100) : 0;
    const status = q.goal
      ? `<div class="row"><span class="ri">${esc(q.icon)}</span><div class="rt"><b>${esc(q.title)}</b>
         <span>${q.completed_at ? tr("Geschafft! Zeit für die Belohnung.") : `⭐ ${q.progress} ${tr("von")} ${q.goal}`}${q.reward ? ` · ${esc(q.reward)}` : ""}</span>
         <div class="progress"><i style="width:${pct}%"></i></div></div></div>`
      : `<div class="empty-note">${tr("Gerade läuft kein Abenteuer.")}</div>`;
    return `<h2>${tr("Familien-Abenteuer")}</h2><p class="lead">${tr("Ein gemeinsames Ziel für alle Kinder: Jeder verdiente Stern bringt die ganze Familie einen Schritt weiter. Die Sterne der Kinder bleiben dabei erhalten.")}</p>
      ${status}<p><button class="btn primary big" data-a="editQuest">${q.goal ? "Neues Abenteuer starten" : tr("Abenteuer starten")}</button></p>`;
  }

  _a_editQuest() {
    const q = this._state.quest;
    const icons = QUEST_ICONS.map((e) => `<label><input type="radio" name="icon" value="${e}" ${(q.icon || "🚀") === e ? "checked" : ""}><span>${e}</span></label>`).join("");
    this._modal(`<h2>${tr("Abenteuer starten")}</h2>
      <div class="field"><label for="f-t">${tr("Name")}</label><input id="f-t" type="text" name="title" required maxlength="40" placeholder="${tr("Ausflug in den Zoo")}"></div>
      <div class="field"><span class="lab">${tr("Bild")}</span><div class="picks">${icons}</div></div>
      <div class="field"><label for="f-g">${tr("Ziel in Sternen")}</label><input id="f-g" type="number" name="goal" min="5" max="2000" value="60"><div class="hint">${tr("Faustregel: zwei Kinder sammeln zusammen etwa 10–15 Sterne pro Tag.")}</div></div>
      <div class="field"><label for="f-r">${tr("Belohnung")}</label><input id="f-r" type="text" name="reward" maxlength="60" placeholder="${tr("Wir gehen in den Zoo")}"></div>
      ${q.goal && !q.completed_at ? `<p class="hint">${tr("Das laufende Abenteuer wird dabei beendet.")}</p>` : ""}`,
    async (f) => { await this._call("set_quest", { title: f.get("title"), icon: f.get("icon"), goal: Number(f.get("goal")), reward: f.get("reward") }, true); });
  }

  _tab_settings() {
    const s = this._state;
    const v = s.voice || {};
    const engineName = v.engine ? (this._hass?.states?.[v.engine]?.attributes?.friendly_name || v.engine) : tr("Stimme des Tablets");
    return `<h2>${tr("Einstellungen")}</h2>
      <h3>${tr("Stimme")}</h3>
      <p class="lead">${tr("Aktuell:")} <b>${esc(engineName)}</b>${v.voice ? ` · ${esc(v.voice)}` : ""}. Am natürlichsten klingen die Stimmen von Home Assistant Cloud (zum Beispiel Katja, Amala oder die Kinderstimme Gisela) oder lokal mit Piper (zum Beispiel kerstin oder thorsten). Home Assistant speichert jeden Satz nach dem ersten Mal, danach kommt er sofort.</p>
      <p><button class="btn primary" data-a="editVoice">${tr("Stimme auswählen")}</button></p>
      <h3>${tr("PIN für den Elternbereich")}</h3>
      <p class="lead">${s.pin_set ? tr("Eine PIN ist gesetzt.") : tr("Noch keine PIN. Ohne PIN reicht langes Drücken auf das Schloss.")}</p>
      <p><button class="btn primary" data-a="editPin">${s.pin_set ? tr("PIN ändern") : tr("PIN festlegen")}</button>
      ${s.pin_set ? `<button class="btn danger" data-a="clearPin">${tr("PIN entfernen")}</button>` : ""}</p>
      <h3>${tr("Automationen")}</h3>
      <p class="lead">${tr("Pro Kind gibt es einen Sensor mit Sternen, Level, Serie und offenen Aufgaben, dazu")} <span class="code">sensor.helferhelden_offene_bestatigungen</span>.
      Für Automationen feuert die Integration diese Events: <span class="code">helferhelden_chore_done</span>, <span class="code">helferhelden_all_done</span>,
      <span class="code">helferhelden_level_up</span>, <span class="code">helferhelden_badge</span>, <span class="code">helferhelden_reward_bought</span>, <span class="code">helferhelden_quest_complete</span>, <span class="code">helferhelden_family_all_done</span>.
      Mit dem Dienst <span class="code">helferhelden.complete_chore</span> ${tr("lassen sich Aufgaben auch per NFC-Tag oder Taster abhaken.")}</p>
      <p class="muted">Version ${HH_VERSION}</p>`;
  }

  _a_editVoice() {
    const v = this._state.voice || {};
    const engines = Object.keys(this._hass?.states || {}).filter((e) => e.startsWith("tts.")).sort();
    const opts = [`<option value="">${tr("Stimme des Tablets")}</option>`, ...engines.map((e) =>
      `<option value="${esc(e)}" ${v.engine === e ? "selected" : ""}>${esc(this._hass.states[e].attributes.friendly_name || e)}</option>`)].join("");
    const form = this._modal(`<h2>${tr("Stimme auswählen")}</h2>
      <div class="field"><label for="f-eng">${tr("Sprachausgabe")}</label><select id="f-eng" name="engine">${opts}</select>
        <div class="hint">${engines.length ? tr("Eine Sprachausgabe aus Home Assistant klingt meist viel natürlicher als die Tablet-Stimme.") : tr("Keine Sprachausgabe in Home Assistant gefunden. Richte zum Beispiel Piper oder Home Assistant Cloud ein, dann erscheint sie hier.")}</div></div>
      <div class="field"><label for="f-voice">${tr("Stimme")}</label><select id="f-voice" name="voice"></select><div class="hint" id="f-vhint"></div></div>
      <div class="field"><button type="button" class="btn big" id="f-test">${tr("▶ Probehören")}</button> <span class="hint" id="f-tmsg"></span></div>`,
    async (f) => {
      const engine = f.get("engine") || "";
      if (engine) {
        await this._call("set_voice", { engine, voice: f.get("voice") || "", language: form.dataset.lang || "" }, true);
      } else {
        try { localStorage.setItem("hh-browser-voice", f.get("voice") || ""); } catch (_) { /* per device only */ }
        await this._call("set_voice", { engine: "", voice: "", language: "" }, true);
      }
      this._voice.cache.clear();
      this._toast(tr("Stimme gespeichert"));
    });
    const engSel = form.querySelector("#f-eng"), voiceSel = form.querySelector("#f-voice");
    const hint = form.querySelector("#f-vhint"), msg = form.querySelector("#f-tmsg");
    const fill = async () => {
      const engine = engSel.value;
      voiceSel.innerHTML = ""; hint.textContent = "";
      if (!engine) {
        const local = this._voice.localVoice();
        const vs = this._voice.browserVoices();
        voiceSel.innerHTML = `<option value="">${tr("Automatisch die beste wählen")}</option>` + vs.map((x) =>
          `<option value="${esc(x.name)}" ${x.name === local ? "selected" : ""}>${esc(x.name)}</option>`).join("");
        hint.textContent = vs.length ? tr("Gilt nur für dieses Gerät.") : tr("Auf diesem Gerät ist keine deutsche Stimme installiert.");
        form.dataset.lang = "";
        return;
      }
      hint.textContent = tr("Lädt Stimmen …");
      try {
        const lang0 = this._hass.language || "de";
        const list = await this._hass.callWS({ type: "tts/engine/list", language: lang0 });
        const prov = (list.providers || []).find((x) => x.engine_id === engine);
        const lang = prov?.supported_languages?.find((l) => /^de/i.test(l)) || prov?.supported_languages?.[0] || lang0;
        form.dataset.lang = lang;
        const res = await this._hass.callWS({ type: "tts/engine/voices", engine_id: engine, language: lang });
        const voices = res?.voices || [];
        voiceSel.innerHTML = (voices.length ? "" : `<option value="">${tr("Standardstimme")}</option>`) + voices.map((x) =>
          `<option value="${esc(x.voice_id)}" ${x.voice_id === v.voice ? "selected" : ""}>${esc(x.name)}</option>`).join("");
        hint.textContent = `Sprache: ${lang}`;
      } catch (err) {
        hint.textContent = tr("Stimmen konnten nicht geladen werden. Die Standardstimme wird verwendet.");
        voiceSel.innerHTML = `<option value="">${tr("Standardstimme")}</option>`;
      }
    };
    engSel.addEventListener("change", fill);
    form.querySelector("#f-test").addEventListener("click", async () => {
      msg.textContent = "";
      const engine = engSel.value;
      const override = engine
        ? { engine, voice: voiceSel.value, language: form.dataset.lang || "" }
        : { engine: "", browserVoice: voiceSel.value };
      try { await this._voice.speak(tr("Hallo! Ich bin deine Helferhelden-Stimme. Super gemacht, ein Stern für dich!"), override); }
      catch (err) { msg.textContent = tr("Diese Stimme hat nicht geklappt. Wähle eine andere oder prüfe die Sprachausgabe in Home Assistant."); }
    });
    if (window.speechSynthesis && !this._voice.browserVoices().length) window.speechSynthesis.onvoiceschanged = () => { if (!engSel.value) fill(); };
    fill();
  }

  _a_editPin() {
    this._modal(`<h2>${tr("PIN festlegen")}</h2>
      <div class="field"><label for="f-p">${tr("Neue PIN (4–8 Ziffern)")}</label><input id="f-p" type="text" name="pin" inputmode="numeric" pattern="[0-9]{4,8}" required autocomplete="off"></div>`,
    async (f) => {
      const pin = f.get("pin");
      await this._call("set_pin", { new_pin: pin }, true);
      this._pin = pin;
      this._toast("PIN gespeichert");
    });
  }
  async _a_clearPin() {
    if (await this._confirm("PIN wirklich entfernen?", "Entfernen")) {
      await this._call("set_pin", { new_pin: "" }, true);
      this._pin = null;
    }
  }

  /* -------------------------------------------------------------- modal helpers */
  _modal(inner, onSave, onDelete) {
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<form class="modal">${inner}<div class="actions">
      ${onDelete ? `<button type="button" class="btn danger left" data-m="del">${tr("Löschen")}</button>` : ""}
      <button type="button" class="btn" data-m="cancel">${tr("Abbrechen")}</button>
      <button type="submit" class="btn primary">${tr("Speichern")}</button></div></form>`;
    this._layer.appendChild(bg);
    const form = bg.querySelector("form");
    const close = () => bg.remove();
    bg.querySelector("[data-m=cancel]").addEventListener("click", close);
    bg.querySelector("[data-m=del]")?.addEventListener("click", async () => {
      try { if (await onDelete()) close(); } catch (_) { /* toast shown */ }
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try { await onSave(new FormData(form)); close(); } catch (_) { /* toast shown */ }
    });
    setTimeout(() => form.querySelector("input[type=text]")?.focus(), 30);
    return form;
  }

  _confirm(text, label) {
    return new Promise((resolve) => {
      const bg = document.createElement("div");
      bg.className = "modal-bg";
      bg.innerHTML = `<div class="modal" role="alertdialog"><p style="font-size:18px;font-weight:700">${esc(text)}</p>
        <div class="actions"><button class="btn" data-m="no">${tr("Abbrechen")}</button><button class="btn danger" data-m="yes">${esc(label)}</button></div></div>`;
      this._layer.appendChild(bg);
      bg.querySelector("[data-m=no]").addEventListener("click", () => { bg.remove(); resolve(false); });
      bg.querySelector("[data-m=yes]").addEventListener("click", () => { bg.remove(); resolve(true); });
    });
  }
}

if (!customElements.get("helferhelden-card")) {
  customElements.define("helferhelden-card", HelferheldenCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "helferhelden-card",
    name: "Helferhelden",
    description: tr("Aufgaben-Spiel für Kinder mit Haustier, Sternen, Sammelsternen und Belohnungen"),
    preview: false,
  });
  console.info(`%c HELFERHELDEN %c ${HH_VERSION} `, "background:#2e2a5c;color:#ffc93c;font-weight:700", "background:#ffc93c;color:#2e2a5c");
}
