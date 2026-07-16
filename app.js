import {
  APP_META,
  DECKS,
  DIRECTIONS,
  VOCABULARY,
  answerFor,
  createMultipleChoiceOptions,
  getDeckWords,
  getWord,
  isTranslationCorrect,
  normalizeAnswer,
  pairLabel,
  promptFor
} from "./vocab-data.js";
import {
  CORE_EXERCISES,
  EXERCISE_CATEGORIES,
  PASSAGES,
  exerciseLabel,
  getExerciseItem,
  getExercisePool,
  getPassagePool,
  isExerciseAnswerCorrect
} from "./exercise-data.js";

const STATE_KEY = "latin-study-state-v4";
const LEGACY_STATE_KEY = "latin-vocab-state-v3";
const OLDER_STATE_KEY = "latin-sprint-state-v1";
const VOCAB_ROUND_SIZE = 10;
const EXERCISE_ROUND_SIZE = 8;
const MACRONS = ["ā", "ē", "ī", "ō", "ū"];
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const VOCAB_ANSWER_MODES = [
  { id: "typed", title: "Typed", subtitle: "Use the keyboard" },
  { id: "multiple-choice", title: "Multiple choice", subtitle: "Tap one of four answers" }
];

const screen = document.querySelector("#screen");
const app = document.querySelector("#app");
const modalRoot = document.querySelector("#modal-root");
const feedbackLive = document.querySelector("#feedback-live");
const headerXP = document.querySelector("#header-xp");
const headerStreak = document.querySelector("#header-streak");
const headerXPChip = document.querySelector("#header-xp-chip");
const headerStreakChip = document.querySelector("#header-streak-chip");

let session = null;
let focusBeforeModal = null;

function localDay(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return localDay(date);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function freshState() {
  return {
    version: 4,
    activeMode: "vocabulary",
    selection: {
      vocabulary: { deckId: "chapter1", direction: "latin-english", answerMode: "typed" },
      exercises: { chapter: "1", category: "mixed" }
    },
    xp: 0,
    streak: { count: 0, lastStudyDay: "" },
    daily: { day: localDay(), xp: 0 },
    mastery: {},
    exerciseHistory: {},
    settings: {
      effects: true,
      autoPronounce: true,
      speechRate: 0.84,
      slowSpeechRate: 0.58,
      haptics: true
    }
  };
}

function migrateLegacy(base) {
  const old = safeParse(storageGet(LEGACY_STATE_KEY)) || safeParse(storageGet(OLDER_STATE_KEY));
  if (!old) return base;
  const oldSelection = old.selection || {};
  const oldSettings = old.settings || {};
  const oldDeckId = oldSelection.deckId === "mixed" ? "mixed-chapters" : (oldSelection.deckId || "chapter1");
  return {
    ...base,
    xp: Number(old.xp ?? old.profile?.xp ?? 0) || 0,
    streak: {
      count: Number(old.streak?.count ?? old.streak ?? 0) || 0,
      lastStudyDay: old.streak?.lastStudyDay ?? old.lastStudyDay ?? ""
    },
    daily: { ...base.daily, ...(old.daily || {}) },
    mastery: old.mastery || {},
    settings: {
      ...base.settings,
      ...oldSettings,
      effects: oldSettings.effects ?? oldSettings.soundEffects ?? oldSettings.sounds ?? base.settings.effects,
      autoPronounce: oldSettings.autoPronounce ?? oldSettings.pronunciation ?? oldSettings.autoSpeak ?? base.settings.autoPronounce,
      haptics: oldSettings.haptics ?? oldSettings.vibration ?? base.settings.haptics
    },
    selection: {
      ...base.selection,
      vocabulary: {
        deckId: oldDeckId,
        direction: oldSelection.direction || "latin-english",
        answerMode: oldSelection.answerMode || "typed"
      }
    }
  };
}

function loadState() {
  const base = freshState();
  const stored = safeParse(storageGet(STATE_KEY));
  const source = stored || migrateLegacy(base);
  const result = {
    ...base,
    ...source,
    selection: {
      vocabulary: { ...base.selection.vocabulary, ...(source.selection?.vocabulary || {}) },
      exercises: { ...base.selection.exercises, ...(source.selection?.exercises || {}) }
    },
    streak: { ...base.streak, ...(source.streak || {}) },
    daily: { ...base.daily, ...(source.daily || {}) },
    mastery: source.mastery || {},
    exerciseHistory: source.exerciseHistory || {},
    settings: { ...base.settings, ...(source.settings || {}) }
  };

  result.activeMode = result.activeMode === "exercises" ? "exercises" : "vocabulary";
  if (result.selection.vocabulary.deckId === "mixed") {
    result.selection.vocabulary.deckId = "mixed-chapters";
  }
  if (!DECKS.some((deck) => deck.id === result.selection.vocabulary.deckId)) {
    result.selection.vocabulary.deckId = "chapter1";
  }
  if (!DIRECTIONS.some((direction) => direction.id === result.selection.vocabulary.direction)) {
    result.selection.vocabulary.direction = "latin-english";
  }
  if (!VOCAB_ANSWER_MODES.some((mode) => mode.id === result.selection.vocabulary.answerMode)) {
    result.selection.vocabulary.answerMode = "typed";
  }
  const chapter = result.selection.exercises.chapter;
  if (chapter !== "mixed" && !(Number(chapter) >= 1 && Number(chapter) <= 10)) {
    result.selection.exercises.chapter = "1";
  }
  if (!EXERCISE_CATEGORIES.some((category) => category.id === result.selection.exercises.category)) {
    result.selection.exercises.category = "mixed";
  }

  result.xp = Math.max(0, Number(result.xp) || 0);
  result.streak.count = Math.max(0, Number(result.streak.count) || 0);
  result.settings.speechRate = clamp(Number(result.settings.speechRate) || 0.84, 0.6, 1.1);
  result.settings.slowSpeechRate = clamp(Number(result.settings.slowSpeechRate) || 0.58, 0.45, 0.75);
  result.mastery = Object.fromEntries(Object.entries(result.mastery).map(([key, value]) => {
    const numeric = Number(value);
    return [key, Number.isFinite(numeric) ? clamp(numeric, 0, 3) : 0];
  }));
  if (result.daily.day !== localDay()) result.daily = { day: localDay(), xp: 0 };
  if (result.streak.lastStudyDay !== localDay() && result.streak.lastStudyDay !== yesterdayKey()) {
    result.streak.count = 0;
  }
  return result;
}

const state = loadState();

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // The app remains usable when storage is blocked.
  }
  updateHeader();
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function announceFeedback(message) {
  if (!feedbackLive) return;
  feedbackLive.textContent = "";
  window.setTimeout(() => {
    feedbackLive.textContent = message;
  }, 20);
}

function updateHeader() {
  headerXP.textContent = String(state.xp);
  headerStreak.textContent = String(state.streak.count);
  headerXPChip?.setAttribute("aria-label", `${state.xp} total XP`);
  headerStreakChip?.setAttribute("aria-label", `${state.streak.count} day study streak`);
  const soundIcon = document.querySelector('[data-action="sound-settings"] span');
  if (soundIcon) soundIcon.textContent = state.settings.effects || state.settings.autoPronounce ? "🔊" : "🔇";
}

function markStudyDay() {
  const today = localDay();
  if (state.streak.lastStudyDay === today) return;
  state.streak.count = state.streak.lastStudyDay === yesterdayKey() ? state.streak.count + 1 : 1;
  state.streak.lastStudyDay = today;
}

function addXP(amount) {
  if (state.daily.day !== localDay()) state.daily = { day: localDay(), xp: 0 };
  state.xp += amount;
  state.daily.xp += amount;
}

function masteryKey(wordId, direction) {
  return `${wordId}::${direction}`;
}

function masteryLevel(wordId, direction) {
  const numeric = Number(state.mastery[masteryKey(wordId, direction)] || 0);
  return Number.isFinite(numeric) ? clamp(numeric, 0, 3) : 0;
}

function changeMastery(wordId, direction, amount) {
  const key = masteryKey(wordId, direction);
  state.mastery[key] = clamp(masteryLevel(wordId, direction) + amount, 0, 3);
}

function masteryLabel(level) {
  return ["New", "Learning", "Familiar", "Mastered"][clamp(level, 0, 3)];
}

function poolProgress(words, direction) {
  if (!words.length) return 0;
  const total = words.reduce((sum, word) => sum + masteryLevel(word.id, direction), 0);
  return Math.round((total / (words.length * 3)) * 100);
}

class AudioCoach {
  constructor() {
    this.context = null;
    this.speechTimer = null;
    this.speechToken = 0;
  }

  async unlock() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (this.context?.state === "closed") this.context = null;
    if (!this.context) this.context = new AudioContextClass();
    if (this.context.state !== "running") {
      try {
        await this.context.resume();
      } catch {
        // A later gesture will try again.
      }
    }
  }

  tone(frequency, start, duration, volume, type = "sine") {
    if (!state.settings.effects || !this.context || this.context.state !== "running") return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(this.context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  vibrate(pattern) {
    if (state.settings.haptics && navigator.vibrate) navigator.vibrate(pattern);
  }

  correct() {
    this.vibrate(28);
    if (!this.context) return;
    const now = this.context.currentTime;
    this.tone(523.25, now, 0.11, 0.1);
    this.tone(659.25, now + 0.09, 0.14, 0.11);
    this.tone(783.99, now + 0.19, 0.19, 0.1);
  }

  wrong() {
    this.vibrate([45, 35, 45]);
    if (!this.context) return;
    const now = this.context.currentTime;
    this.tone(196, now, 0.16, 0.075, "square");
    this.tone(155.56, now + 0.13, 0.22, 0.065, "square");
  }

  complete() {
    this.vibrate([35, 25, 70]);
    if (!this.context) return;
    const now = this.context.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.tone(frequency, now + index * 0.1, 0.24, 0.09);
    });
  }

  cancelSpeech() {
    if (this.speechTimer !== null) window.clearTimeout(this.speechTimer);
    this.speechTimer = null;
    this.speechToken += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  startSpeech(text, slow = false, force = false) {
    if (!text || !("speechSynthesis" in window) || (!force && !state.settings.autoPronounce)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => item.lang?.toLowerCase().startsWith("la"))
      || voices.find((item) => item.lang?.toLowerCase().startsWith("it"))
      || voices[0];
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || "it-IT";
    utterance.rate = slow ? state.settings.slowSpeechRate : state.settings.speechRate;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  speak(text, slow = false, force = false) {
    this.cancelSpeech();
    this.startSpeech(text, slow, force);
  }

  scheduleSpeech(text, delay = 160, slow = false, force = false) {
    this.cancelSpeech();
    if (!text || (!force && !state.settings.autoPronounce)) return;
    const token = this.speechToken;
    this.speechTimer = window.setTimeout(() => {
      if (token !== this.speechToken) return;
      this.speechTimer = null;
      this.startSpeech(text, slow, force);
    }, delay);
  }
}

const audio = new AudioCoach();

function selectedDeck() {
  return DECKS.find((deck) => deck.id === state.selection.vocabulary.deckId) || DECKS[0];
}

function selectedDirection() {
  return DIRECTIONS.find((direction) => direction.id === state.selection.vocabulary.direction) || DIRECTIONS[0];
}

function selectedAnswerMode() {
  return VOCAB_ANSWER_MODES.find((mode) => mode.id === state.selection.vocabulary.answerMode) || VOCAB_ANSWER_MODES[0];
}

function exerciseChapterTitle(value) {
  return value === "mixed" ? "Mixed Chapters" : `Chapter ${ROMAN[Number(value)]}`;
}

function currentExerciseCategory() {
  return EXERCISE_CATEGORIES.find((category) => category.id === state.selection.exercises.category) || EXERCISE_CATEGORIES[0];
}

function renderModeTabs() {
  return `
    <div class="mode-tabs" role="tablist" aria-label="Study mode">
      <button id="mode-tab-vocabulary" type="button" role="tab" data-action="select-mode" data-mode="vocabulary" aria-controls="mode-panel-vocabulary" aria-selected="${state.activeMode === "vocabulary"}" tabindex="${state.activeMode === "vocabulary" ? "0" : "-1"}" class="${state.activeMode === "vocabulary" ? "is-selected" : ""}"><span aria-hidden="true">Aa</span> Vocabulary</button>
      <button id="mode-tab-exercises" type="button" role="tab" data-action="select-mode" data-mode="exercises" aria-controls="mode-panel-exercises" aria-selected="${state.activeMode === "exercises"}" tabindex="${state.activeMode === "exercises" ? "0" : "-1"}" class="${state.activeMode === "exercises" ? "is-selected" : ""}"><span aria-hidden="true">✎</span> Book Exercises</button>
    </div>`;
}

function renderVocabularySetup(hidden = false) {
  const deck = selectedDeck();
  const direction = selectedDirection();
  const answerMode = selectedAnswerMode();
  const words = getDeckWords(deck.id);
  const progress = poolProgress(words, direction.id);
  return `
    <section id="mode-panel-vocabulary" class="setup-panel" role="tabpanel" aria-labelledby="mode-tab-vocabulary"${hidden ? " hidden" : ""}>
      <div class="setup-heading">
        <div><span class="eyebrow">VOCABULARY MODE</span><h2 id="vocabulary-mode-heading">Choose a word pool</h2><p>Vocabulary 1–10 plus the supplemental Book I list.</p></div>
        <button class="text-button" type="button" data-action="word-list">View word list</button>
      </div>
      <div class="compact-choice-grid source-grid">
        ${DECKS.map((item) => `
          <button type="button" class="source-choice ${item.id === deck.id ? "is-selected" : ""}" data-action="select-deck" data-deck="${item.id}" aria-pressed="${item.id === deck.id}">
            <span>${escapeHTML(item.numeral)}</span><strong>${escapeHTML(item.title)}</strong><small>${item.count} words</small>
          </button>`).join("")}
      </div>
      <div class="subsection-heading"><h3>Translation direction</h3><p>Practice both directions.</p></div>
      <div class="segmented-control">
        ${DIRECTIONS.map((item) => {
          const promptLanguage = item.id === "latin-english" ? "la" : "en";
          const answerLanguage = item.id === "latin-english" ? "en" : "la";
          return `<button type="button" class="${item.id === direction.id ? "is-selected" : ""}" data-action="select-direction" data-direction="${item.id}" aria-pressed="${item.id === direction.id}"><strong>${item.title}</strong><small><span lang="${promptLanguage}">${item.examplePrompt}</span> → <span lang="${answerLanguage}">${item.exampleAnswer}</span></small></button>`;
        }).join("")}
      </div>
      <div class="subsection-heading"><h3>Answer style</h3><p>Type carefully or tap quickly on the go.</p></div>
      <div class="segmented-control answer-mode-control">
        ${VOCAB_ANSWER_MODES.map((item) => `<button type="button" class="${item.id === answerMode.id ? "is-selected" : ""}" data-action="select-answer-mode" data-answer-mode="${item.id}" aria-pressed="${item.id === answerMode.id}"><strong>${item.title}</strong><small>${item.subtitle}</small></button>`).join("")}
      </div>
      <div class="selection-summary"><span>${deck.title} · ${direction.title} · ${answerMode.title}</span><strong>${progress}% mastery</strong></div>
    </section>`;
}

function renderExerciseSetup(hidden = false) {
  const selection = state.selection.exercises;
  const category = currentExerciseCategory();
  const pool = selection.category === "passage"
    ? getPassagePool(selection.chapter)
    : getExercisePool(selection.chapter, selection.category);
  const ids = selection.category === "passage"
    ? pool.flatMap((passage) => passage.steps.map((step) => step.id))
    : pool.map((item) => item.id);
  const attempted = ids.filter((id) => state.exerciseHistory[id]?.attempts).length;
  const progress = ids.length ? Math.round((attempted / ids.length) * 100) : 0;
  return `
    <section id="mode-panel-exercises" class="setup-panel" role="tabpanel" aria-labelledby="mode-tab-exercises"${hidden ? " hidden" : ""}>
      <div class="setup-heading">
        <div><span class="eyebrow">BOOK EXERCISES</span><h2 id="exercise-mode-heading">Practice the chapter skills</h2><p>Accurate adaptations of forms, translations, passages, and derivations.</p></div>
      </div>
      <div class="chapter-strip" aria-label="Exercise chapter">
        ${[1,2,3,4,5,6,7,8,9,10].map((chapter) => `<button type="button" class="${selection.chapter === String(chapter) ? "is-selected" : ""}" data-action="select-exercise-chapter" data-chapter="${chapter}" aria-pressed="${selection.chapter === String(chapter)}">${ROMAN[chapter]}</button>`).join("")}
        <button type="button" class="wide ${selection.chapter === "mixed" ? "is-selected" : ""}" data-action="select-exercise-chapter" data-chapter="mixed" aria-pressed="${selection.chapter === "mixed"}">Mixed</button>
      </div>
      <div class="subsection-heading"><h3>Exercise type</h3><p>Flexible translations use verified model answers.</p></div>
      <div class="category-grid">
        ${EXERCISE_CATEGORIES.map((item) => `<button type="button" class="category-choice ${item.id === category.id ? "is-selected" : ""}" data-action="select-exercise-category" data-category="${item.id}" aria-pressed="${item.id === category.id}"><strong>${item.title}</strong><small>${item.subtitle}</small></button>`).join("")}
      </div>
      <div class="selection-summary"><span>${exerciseChapterTitle(selection.chapter)} · ${category.title}</span><strong>${progress}% explored</strong></div>
    </section>`;
}

function renderHome({ preserveScroll = false, focusSelector = "" } = {}) {
  audio.cancelSpeech();
  const previousScroll = preserveScroll ? window.scrollY : 0;
  session = null;
  document.body.classList.remove("practice-active");
  const isVocabulary = state.activeMode === "vocabulary";
  const deck = selectedDeck();
  const direction = selectedDirection();
  const answerMode = selectedAnswerMode();
  const exerciseSelection = state.selection.exercises;
  const category = currentExerciseCategory();
  const launchTitle = isVocabulary
    ? `${deck.title} · ${direction.title} · ${answerMode.title}`
    : `${exerciseChapterTitle(exerciseSelection.chapter)} · ${category.title}`;
  const launchCopy = isVocabulary
    ? answerMode.id === "multiple-choice"
      ? "10 quick tap-to-answer words with delayed retries."
      : "10 typed words with delayed retries for anything you miss."
    : category.id === "passage" ? "One short passage, checked sentence by sentence." : "8 focused cards with hybrid grading and review.";

  screen.innerHTML = `
    <section class="home-view expanded-home">
      <div class="course-hero compact-hero">
        <div><span class="eyebrow">COMPLETE BOOK I STUDY</span><h1>Learn the words. Use the Latin.</h1><p>Vocabulary 1–10, an extended word bank, and verified chapter exercises in one focused course.</p></div>
        <div class="hero-stats" aria-label="Course content"><span><strong>${VOCABULARY.length}</strong><small>vocabulary entries</small></span><span><strong>${CORE_EXERCISES.length}</strong><small>exercise cards</small></span><span><strong>${PASSAGES.length}</strong><small>passages</small></span></div>
      </div>
      ${renderModeTabs()}
      ${renderVocabularySetup(!isVocabulary)}
      ${renderExerciseSetup(isVocabulary)}
      <section class="launch-card sticky-launch" aria-label="Start selected practice">
        <div class="launch-icon" aria-hidden="true">${isVocabulary ? "Aa" : "✎"}</div>
        <div class="launch-copy"><span class="eyebrow">READY TO PRACTICE</span><h2>${escapeHTML(launchTitle)}</h2><p>${launchCopy}</p></div>
        <button class="primary-button launch-button" type="button" data-action="start-selected">Start practice <span aria-hidden="true">→</span></button>
      </section>
      <section class="progress-card compact-progress" aria-labelledby="progress-heading">
        <div><span class="eyebrow">LIGHTWEIGHT PROGRESS</span><h2 id="progress-heading">Study, review, repeat</h2><p>Mastery is kept separately for each vocabulary direction. Exercises remember what you have attempted.</p><div class="daily-chip"><span aria-hidden="true">✦</span><strong>${state.daily.xp} XP today</strong></div></div>
        <div class="course-totals"><div><strong>${Object.keys(state.mastery).filter((key) => state.mastery[key] > 0).length}</strong><small>word-direction pairs started</small></div><div><strong>${Object.values(state.exerciseHistory).filter((record) => record.attempts).length}</strong><small>exercise prompts explored</small></div></div>
      </section>
    </section>`;
  window.scrollTo({ top: previousScroll, behavior: "auto" });
  if (focusSelector) window.setTimeout(() => document.querySelector(focusSelector)?.focus({ preventScroll: true }), 0);
}

function weightedVocabularySample(words, count, direction) {
  return [...words]
    .map((word) => {
      const level = masteryLevel(word.id, direction);
      const weight = [7, 5, 3, 1.5][level];
      return { word, score: -Math.log(Math.max(Math.random(), 0.000001)) / weight };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((item) => item.word);
}

function sampleExercises(pool, count) {
  if (!pool.length) return [];
  const weighted = [...pool].sort((a, b) => {
    const attemptsA = Number(state.exerciseHistory[a.id]?.attempts || 0);
    const attemptsB = Number(state.exerciseHistory[b.id]?.attempts || 0);
    return (attemptsA + Math.random() * 2) - (attemptsB + Math.random() * 2);
  });
  const chosen = weighted.slice(0, Math.min(count, weighted.length));
  while (chosen.length < count) {
    const refill = [...pool].sort(() => Math.random() - 0.5);
    for (const item of refill) {
      if (chosen.length >= count) break;
      if (chosen.at(-1)?.id !== item.id) chosen.push(item);
    }
  }
  return chosen;
}

function createSession(type, ids, options = {}) {
  return {
    type,
    direction: options.direction || "",
    answerMode: options.answerMode || "typed",
    title: options.title || "Practice",
    roundIds: [...ids],
    bridgeIds: [...new Set(options.bridgeIds || ids)],
    queue: ids.map((id) => ({ id, kind: "base" })),
    retryQueue: [],
    phase: "base",
    lastQuestionId: "",
    current: null,
    totalBase: ids.length,
    completedBase: 0,
    firstTrySuccess: 0,
    wrongFirst: 0,
    combo: 0,
    maxCombo: 0,
    xpEarned: 0,
    feedback: null,
    missedIds: new Set(),
    unresolved: new Set(),
    strengthened: new Set(),
    completed: false,
    passageTitle: options.passageTitle || ""
  };
}

async function startVocabulary(explicitIds = null) {
  await audio.unlock();
  const deck = selectedDeck();
  const direction = selectedDirection();
  const answerMode = selectedAnswerMode();
  const words = explicitIds
    ? explicitIds.map(getWord).filter(Boolean)
    : weightedVocabularySample(getDeckWords(deck.id), VOCAB_ROUND_SIZE, direction.id);
  session = createSession("vocabulary", words.map((word) => word.id), {
    direction: direction.id,
    answerMode: answerMode.id,
    title: explicitIds ? "Review missed vocabulary" : `${deck.title} · ${direction.title} · ${answerMode.title}`,
    bridgeIds: getDeckWords(deck.id).map((word) => word.id)
  });
  beginPractice();
}

async function startExercises(explicitIds = null) {
  await audio.unlock();
  const selection = state.selection.exercises;
  let items;
  let title;
  let passageTitle = "";
  if (explicitIds) {
    items = explicitIds.map(getExerciseItem).filter(Boolean);
    passageTitle = items.find((item) => item.passageTitle)?.passageTitle || "";
    title = "Review missed exercises";
  } else if (selection.category === "passage") {
    const passages = getPassagePool(selection.chapter);
    const passage = passages[Math.floor(Math.random() * passages.length)];
    items = passage ? passage.steps.map((step) => getExerciseItem(step.id)).filter(Boolean) : [];
    passageTitle = passage?.title || "Passage";
    title = `${exerciseChapterTitle(selection.chapter)} · ${passageTitle}`;
  } else {
    items = sampleExercises(getExercisePool(selection.chapter, selection.category), EXERCISE_ROUND_SIZE);
    title = `${exerciseChapterTitle(selection.chapter)} · ${currentExerciseCategory().title}`;
  }
  if (!items.length) return;
  let bridgeIds;
  if (selection.category === "passage" && explicitIds) {
    const passageIds = new Set(items.map((item) => item.passageId).filter(Boolean));
    bridgeIds = PASSAGES
      .filter((passage) => passageIds.has(passage.id))
      .flatMap((passage) => passage.steps.map((step) => step.id));
  } else if (selection.category === "passage") {
    bridgeIds = items.map((item) => item.id);
  } else {
    bridgeIds = getExercisePool(selection.chapter, selection.category).map((item) => item.id);
  }
  session = createSession("exercise", items.map((item) => item.id), { title, passageTitle, bridgeIds });
  beginPractice();
}

function beginPractice() {
  document.body.classList.add("practice-active");
  nextQuestion();
}

function getCurrentItem() {
  return session.type === "vocabulary" ? getWord(session.current.id) : getExerciseItem(session.current.id);
}

function getItemSpec(item = getCurrentItem()) {
  if (session.type === "vocabulary") {
    const promptLanguage = session.direction === "latin-english" ? "latin" : "english";
    return {
      instruction: session.direction === "latin-english" ? "Translate into English" : "Translate into Latin",
      prompt: promptFor(item, session.direction),
      promptLanguage,
      grading: "auto",
      modelAnswer: answerFor(item, session.direction),
      explanation: item.dictionary,
      promptAudio: promptLanguage === "latin" ? (item.audioText || item.latin) : "",
      answerAudio: promptLanguage === "english" ? (item.audioText || item.latin) : "",
      category: item.kind,
      chapter: item.chapter
    };
  }
  return {
      instruction: item.instruction || "Translate the Latin into English.",
    prompt: item.prompt,
    promptLanguage: item.promptLanguage,
    grading: item.grading,
    modelAnswer: item.modelAnswer,
    explanation: item.explanation,
    promptAudio: item.promptLanguage === "latin" ? item.audioText : "",
    answerAudio: item.promptLanguage === "english" ? item.audioText : "",
    category: item.category,
    chapter: item.chapter
  };
}

function nextQuestion() {
  audio.cancelSpeech();
  if (session.queue.length) {
    session.phase = "base";
    session.current = session.queue.shift();
  } else if (session.retryQueue.length) {
    session.phase = "review";
    const readyIndex = session.retryQueue.findIndex((entry) => entry.gap <= 0);
    if (readyIndex >= 0) {
      session.current = session.retryQueue.splice(readyIndex, 1)[0];
    } else {
      const pendingIds = new Set(session.retryQueue.map((entry) => entry.id));
      const preferred = session.bridgeIds.filter((id) => id !== session.lastQuestionId && !pendingIds.has(id));
      const fallback = session.bridgeIds.filter((id) => id !== session.lastQuestionId);
      const candidates = preferred.length ? preferred : fallback;
      if (!candidates.length) {
        session.retryQueue[0].gap = 0;
        session.current = session.retryQueue.shift();
      } else {
        session.current = { id: candidates[Math.floor(Math.random() * candidates.length)], kind: "bridge" };
      }
    }
  } else {
    completeRound();
    return;
  }
  session.lastQuestionId = session.current.id;
  session.feedback = null;
  if (session.type === "vocabulary" && session.answerMode === "multiple-choice") {
    const word = getWord(session.current.id);
    const pool = session.bridgeIds.map(getWord).filter(Boolean);
    session.current.choices = createMultipleChoiceOptions(word, session.direction, pool);
  }
  renderQuestion();
  const spec = getItemSpec();
  if (spec.promptLanguage === "latin" && spec.promptAudio && state.settings.autoPronounce) {
    audio.scheduleSpeech(spec.promptAudio, 160);
  }
}

function reviewProgress() {
  const missed = session.missedIds.size;
  const unresolved = session.unresolved.size;
  return missed ? Math.round(((missed - unresolved) / missed) * 100) : 100;
}

function progressInfo() {
  if (session.completedBase < session.totalBase) {
    return {
      label: `Practice ${session.completedBase}/${session.totalBase}`,
      percent: Math.round((session.completedBase / session.totalBase) * 100)
    };
  }
  if (!session.unresolved.size) return { label: "Practice complete", percent: 100 };
  return { label: `Review · ${session.unresolved.size} left`, percent: reviewProgress() };
}

function audioControls(text, context = "prompt") {
  if (!text) return "";
  return `<div class="audio-controls" aria-label="Latin audio"><button type="button" data-action="speak-text" data-audio-context="${context}" data-speed="normal">🔊 Hear</button><button type="button" data-action="speak-text" data-audio-context="${context}" data-speed="slow">🐢 Slow</button></div>`;
}

function multipleChoiceAnswer() {
  const answerLanguage = session.direction === "english-latin" ? "la" : "en";
  const labels = ["A", "B", "C", "D"];
  return `
    <fieldset class="mcq-fieldset" aria-labelledby="answer-label question-prompt" aria-describedby="question-instruction answer-help">
      <legend id="answer-label">Choose an answer</legend>
      <div class="mcq-grid">
        ${session.current.choices.map((choice, index) => `<button class="mcq-choice" type="button" data-action="mcq-answer" data-option-index="${index}"><span class="mcq-key" aria-hidden="true">${labels[index]}</span><span class="mcq-label" lang="${answerLanguage}">${escapeHTML(choice.label)}</span></button>`).join("")}
      </div>
      <p id="answer-help" class="answer-help">Tap the best answer. Your choice is checked immediately.</p>
      <div class="mcq-actions"><button class="secondary-button dont-know-button" type="button" data-action="dont-know">I don’t know</button></div>
    </fieldset>`;
}

function renderQuestion() {
  if (feedbackLive) feedbackLive.textContent = "";
  const item = getCurrentItem();
  const spec = getItemSpec(item);
  const progress = progressInfo();
  const isReview = session.current.kind !== "base";
  const isMultipleChoice = session.type === "vocabulary"
    && session.answerMode === "multiple-choice"
    && session.current.choices?.length === 4;
  const wantsLatin = session.type === "vocabulary"
    ? session.direction === "english-latin"
    : spec.promptLanguage === "english";
  const chapterLabel = spec.chapter ? `CHAPTER ${ROMAN[spec.chapter]}` : "EXTENDED";
  const promptClass = spec.prompt.length > 90 ? "is-long" : spec.prompt.length > 45 ? "is-medium" : "";

  screen.innerHTML = `
    <section class="practice-view">
      <div class="practice-topline">
        <button class="icon-close" type="button" data-action="exit-practice" aria-label="Leave practice">×</button>
        <div class="practice-progress-wrap">
          <div class="practice-progress" role="progressbar" aria-label="${escapeHTML(progress.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><span style="width:${progress.percent}%"></span></div>
          <small>${escapeHTML(progress.label)}</small>
        </div>
        <div class="combo-chip" aria-label="${session.combo} answer combo"><span aria-hidden="true">⚡</span><strong>${session.combo}</strong></div>
      </div>
      <div class="question-stage ${isMultipleChoice ? "mcq-question-stage" : ""}">
        <div class="question-meta"><span class="chapter-tag">${chapterLabel}</span><span class="category-tag">${escapeHTML(spec.category)}</span>${isReview ? `<span class="retry-tag">${session.current.kind === "retry" ? "TRY AGAIN" : "QUICK REVIEW"}</span>` : ""}</div>
        ${session.passageTitle ? `<p class="passage-title">${escapeHTML(session.passageTitle)} · sentence ${item.passageStep}/${item.passageLength}</p>` : ""}
        <p id="question-instruction" class="instruction">${escapeHTML(spec.instruction)}</p>
        <div class="prompt-row"><h1 id="question-prompt" class="${promptClass}" lang="${spec.promptLanguage === "latin" ? "la" : "en"}">${escapeHTML(spec.prompt)}</h1></div>
        ${audioControls(spec.promptAudio)}
        ${isMultipleChoice ? multipleChoiceAnswer() : `<form id="answer-form" class="answer-form ${spec.grading === "self" ? "self-check-form" : ""}" autocomplete="off">
          <label id="answer-label" for="answer-input">Your answer</label>
          ${spec.grading === "self"
            ? `<textarea id="answer-input" name="answer" rows="4" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Write your translation, then compare…" aria-labelledby="answer-label question-prompt" aria-describedby="question-instruction answer-help"></textarea>`
            : `<input id="answer-input" name="answer" type="text" inputmode="text" enterkeyhint="done" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type your answer…" aria-labelledby="answer-label question-prompt" aria-describedby="question-instruction answer-help" />`}
          <p id="answer-help" class="answer-help">${spec.grading === "self" ? "Flexible translations use a verified model answer." : wantsLatin ? "Macrons are helpful, but not required." : "Use the meaning or form requested."}</p>
          ${wantsLatin ? `<div class="macron-row" aria-label="Insert a macron">${MACRONS.map((letter) => `<button type="button" data-action="insert-macron" data-letter="${letter}">${letter}</button>`).join("")}</div>` : ""}
          <div class="answer-actions"><button class="secondary-button dont-know-button" type="button" data-action="dont-know">I don’t know</button><button class="primary-button check-button" type="submit" disabled>${spec.grading === "self" ? "Reveal model answer" : "Check answer"}</button></div>
        </form>`}
      </div>
    </section>`;
  window.scrollTo({ top: 0, behavior: "auto" });
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
  if (!coarsePointer) document.querySelector(isMultipleChoice ? ".mcq-choice" : "#answer-input")?.focus({ preventScroll: true });
}

function agePendingRetries(answeredId) {
  for (const entry of session.retryQueue) {
    if (entry.id !== answeredId) entry.gap = Math.max(0, entry.gap - 1);
  }
}

function scheduleRetry(id) {
  session.retryQueue = session.retryQueue.filter((entry) => entry.id !== id);
  session.retryQueue.push({ id, kind: "retry", gap: 2 });
}

function updateExerciseHistory(item, success, firstTry, selfRating = "") {
  const previous = state.exerciseHistory[item.id] || { attempts: 0, firstTryCorrect: 0, successes: 0, lapses: 0 };
  state.exerciseHistory[item.id] = {
    ...previous,
    attempts: previous.attempts + 1,
    firstTryCorrect: previous.firstTryCorrect + (success && firstTry ? 1 : 0),
    firstTryResult: firstTry ? (success ? "correct" : "incorrect") : (previous.firstTryResult || ""),
    successes: previous.successes + (success ? 1 : 0),
    lapses: previous.lapses + (success ? 0 : 1),
    selfRating: selfRating || previous.selfRating || "",
    lastSeen: new Date().toISOString()
  };
}

function recordFailure(item) {
  agePendingRetries(item.id);
  session.combo = 0;
  session.missedIds.add(item.id);
  session.unresolved.add(item.id);
  scheduleRetry(item.id);
  if (session.current.kind === "base") {
    session.completedBase += 1;
    session.wrongFirst += 1;
    if (session.type === "vocabulary") changeMastery(item.id, session.direction, -1);
  }
  markStudyDay();
}

function recordSuccess(item, awardXP = true) {
  agePendingRetries(item.id);
  session.combo += 1;
  session.maxCombo = Math.max(session.maxCombo, session.combo);
  if (session.current.kind === "base") {
    session.completedBase += 1;
    session.firstTrySuccess += 1;
    if (awardXP) {
      session.xpEarned += 10;
      addXP(10);
    }
    if (session.type === "vocabulary") {
      session.strengthened.add(item.id);
      changeMastery(item.id, session.direction, 1);
    }
  } else if (session.current.kind === "retry") {
    session.unresolved.delete(item.id);
  }
  markStudyDay();
}

function submitAutoAnswer(value, skipped = false) {
  if (!session || session.feedback) return;
  const item = getCurrentItem();
  const typed = String(value || "").trim();
  const correct = !skipped && (session.type === "vocabulary"
    ? isTranslationCorrect(item, session.direction, typed)
    : isExerciseAnswerCorrect(item, typed));
  if (correct) {
    recordSuccess(item, true);
    audio.correct();
  } else {
    recordFailure(item);
    audio.wrong();
  }
  if (session.type === "exercise") updateExerciseHistory(item, correct, session.current.kind === "base");
  session.feedback = { type: "auto", correct, typed, skipped };
  saveState();
  renderFeedback();
  const spec = getItemSpec(item);
  if (spec.answerAudio && state.settings.autoPronounce) audio.scheduleSpeech(spec.answerAudio, 180);
}

function revealSelfCheck(value, skipped = false) {
  if (!session || session.feedback) return;
  const item = getCurrentItem();
  if (skipped) {
    recordFailure(item);
    updateExerciseHistory(item, false, session.current.kind === "base", "review");
    audio.wrong();
  }
  session.feedback = { type: "self", typed: String(value || "").trim(), skipped, decisionMade: skipped };
  saveState();
  renderFeedback();
  const spec = getItemSpec(item);
  if (spec.answerAudio && state.settings.autoPronounce) audio.scheduleSpeech(spec.answerAudio, 180);
}

function rateSelfCheck(success) {
  if (!session?.feedback || session.feedback.type !== "self" || session.feedback.decisionMade) return;
  const item = getCurrentItem();
  if (success) {
    recordSuccess(item, false);
    audio.correct();
  } else {
    recordFailure(item);
    audio.wrong();
  }
  updateExerciseHistory(item, success, session.current.kind === "base", success ? "got-it" : "review");
  saveState();
  nextQuestion();
}

function correctAnswerFor(item, spec) {
  return session.type === "vocabulary" ? answerFor(item, session.direction) : (spec.modelAnswer || item.answers?.[0] || "");
}

function renderFeedback() {
  audio.cancelSpeech();
  const item = getCurrentItem();
  const spec = getItemSpec(item);
  const feedback = session.feedback;
  const progress = progressInfo();
  const isSelf = feedback.type === "self";
  const correct = isSelf ? !feedback.skipped : feedback.correct;
  const answer = correctAnswerFor(item, spec);
  const answerLanguage = session.type === "vocabulary"
    ? (session.direction === "english-latin" ? "la" : "en")
    : (spec.promptLanguage === "english" ? "la" : "en");
  const status = isSelf ? (feedback.skipped ? "Answer revealed" : "Compare your answer") : feedback.correct ? (session.current.kind === "retry" ? "Fixed it!" : "Correct!") : feedback.skipped ? "Here’s the answer" : "Not quite";
  const chapterLabel = spec.chapter ? `CHAPTER ${ROMAN[spec.chapter]}` : "EXTENDED";
  const answerDisplay = isSelf
    ? `<div class="model-compare"><div><span>Your answer</span><p lang="${answerLanguage}">${escapeHTML(feedback.typed || "I don’t know yet.")}</p></div><div><span>Verified model answer</span><strong lang="${answerLanguage}">${escapeHTML(answer)}</strong></div></div>`
    : `${session.type === "vocabulary"
      ? `<h1><span lang="la">${escapeHTML(item.latin)}</span> <span aria-hidden="true">=</span> <span lang="en">${escapeHTML(item.english)}</span></h1>`
      : `<h1 lang="${answerLanguage}">${escapeHTML(answer)}</h1>`}${feedback.correct ? "" : `<div class="answer-compare"><span>Your answer</span><s lang="${answerLanguage}">${escapeHTML(feedback.typed || "I don’t know")}</s><span>Correct answer</span><strong lang="${answerLanguage}">${escapeHTML(answer)}</strong></div>`}`;
  screen.innerHTML = `
    <section class="practice-view feedback-view ${correct ? "is-correct" : "is-wrong"}">
      <div class="practice-topline">
        <button class="icon-close" type="button" data-action="exit-practice" aria-label="Leave practice">×</button>
        <div class="practice-progress-wrap"><div class="practice-progress" role="progressbar" aria-label="${escapeHTML(progress.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><span style="width:${progress.percent}%"></span></div><small>${escapeHTML(progress.label)}</small></div>
        <div class="combo-chip"><span aria-hidden="true">⚡</span><strong>${session.combo}</strong></div>
      </div>
      <div class="question-stage feedback-stage ${isSelf ? "self-feedback-stage" : ""}">
        <span class="chapter-tag">${chapterLabel}</span>
        <div class="feedback-symbol" aria-hidden="true">${isSelf ? "↔" : feedback.correct ? "✓" : "×"}</div>
        <p class="feedback-kicker">${escapeHTML(status)}</p>
        ${answerDisplay}
        <p class="explanation-line">${escapeHTML(spec.explanation || "")}</p>
        ${audioControls(spec.answerAudio, "answer")}
      </div>
      <footer class="feedback-footer ${isSelf ? "self-footer" : ""}">
        ${isSelf && !feedback.decisionMade
          ? `<div><strong>Does your answer match?</strong><small>Different word order may still be valid.</small></div><div class="self-rating-actions"><button class="secondary-button" type="button" data-action="self-review">Review again</button><button class="primary-button" type="button" data-action="self-got-it">Got it</button></div>`
          : `<div><strong>${correct ? (session.current.kind === "base" ? "+10 XP" : "Item resolved") : "We’ll bring this back."}</strong><small>${correct ? "First-try automatic answer" : "After at least two other prompts"}</small></div><button class="primary-button continue-button" type="button" data-action="continue">Continue</button>`}
      </footer>
    </section>`;
  announceFeedback(isSelf ? `${status}. Model answer: ${answer}` : feedback.correct ? status : `${status}. Correct answer: ${answer}`);
  document.querySelector(".feedback-footer button:last-child")?.focus();
}

function completionItem(id) {
  if (session.type === "vocabulary") {
    const word = getWord(id);
    return word ? pairLabel(word) : id;
  }
  return exerciseLabel(getExerciseItem(id));
}

function completeRound() {
  if (!session || session.completed) return;
  audio.cancelSpeech();
  session.completed = true;
  const perfect = session.missedIds.size === 0;
  if (perfect && session.type === "vocabulary") {
    addXP(20);
    session.xpEarned += 20;
  }
  markStudyDay();
  saveState();
  audio.complete();
  const score = session.totalBase ? Math.round((session.firstTrySuccess / session.totalBase) * 100) : 100;
  const missed = [...session.missedIds];
  screen.innerHTML = `
    <section class="completion-view">
      <div class="celebration" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span>🏛️</span></div>
      <span class="eyebrow">PRACTICE COMPLETE</span>
      <h1 tabindex="-1">${perfect ? "Perfectus!" : score >= 70 ? "Optime!" : "Bene factum!"}</h1>
      <p>${escapeHTML(session.title)}</p>
      <div class="score-ring" style="--score:${score}%"><strong>${score}%</strong><small>first try</small></div>
      <div class="result-grid"><div><span aria-hidden="true">✦</span><strong>${session.xpEarned}</strong><small>XP earned</small></div><div><span aria-hidden="true">⚡</span><strong>${session.maxCombo}</strong><small>best combo</small></div><div><span aria-hidden="true">↻</span><strong>${missed.length}</strong><small>reviewed</small></div></div>
      ${missed.length ? `<section class="missed-summary"><h2>Missed items reviewed</h2><ul>${missed.map((id) => `<li>${escapeHTML(completionItem(id))}</li>`).join("")}</ul></section>` : `<div class="perfect-bonus">${session.type === "vocabulary" ? "+20 XP perfect-sprint bonus" : "Every item completed first try"}</div>`}
      <div class="completion-actions ${missed.length ? "has-review" : ""}">${missed.length ? `<button class="primary-button" type="button" data-action="review-missed">Review missed items</button>` : `<button class="primary-button" type="button" data-action="practice-again">Practice again</button>`}<button class="secondary-button" type="button" data-action="home">Change practice</button></div>
    </section>`;
  window.scrollTo({ top: 0, behavior: "auto" });
  document.querySelector(".completion-view h1")?.focus({ preventScroll: true });
}

function openModal(title, body, className = "") {
  audio.cancelSpeech();
  focusBeforeModal = document.activeElement;
  app.setAttribute("inert", "");
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal-card ${className}" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-modal-panel><div class="modal-header"><h2 id="modal-title">${escapeHTML(title)}</h2><button class="icon-close" type="button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${body}</div></section></div>`;
  window.setTimeout(() => modalRoot.querySelector("button, input")?.focus(), 20);
}

function closeModal() {
  modalRoot.replaceChildren();
  app.removeAttribute("inert");
  if (focusBeforeModal?.isConnected) focusBeforeModal.focus();
  focusBeforeModal = null;
}

function wordRows(words, query = "") {
  const needle = normalizeAnswer(query);
  const filtered = words.filter((word) => !needle || normalizeAnswer(`${word.latin} ${word.english} ${word.dictionary} ${word.sourceGroup}`).includes(needle));
  if (!filtered.length) return `<div class="empty-list">No words match “${escapeHTML(query)}”.</div>`;
  return filtered.map((word) => `<article class="word-row"><span class="word-chapter">${word.chapter ? ROMAN[word.chapter] : "E"}</span><div><strong lang="la">${escapeHTML(word.latin)}</strong><small lang="la">${escapeHTML(word.dictionary)}</small></div><div class="word-meaning"><strong>${escapeHTML(word.english)}</strong><small>${escapeHTML(word.kind)} · ${masteryLabel(masteryLevel(word.id, state.selection.vocabulary.direction))}</small></div><button class="speaker-button small" type="button" data-action="speak-word" data-word="${word.id}" data-speed="normal" aria-label="Hear ${escapeHTML(word.latin)}">🔊</button></article>`).join("");
}

function openWordList() {
  const deck = selectedDeck();
  const words = getDeckWords(deck.id);
  openModal(`${deck.title} word list`, `<div class="word-list-toolbar"><label for="word-search">Search ${words.length} words</label><input id="word-search" type="search" placeholder="Latin or English…" autocomplete="off" /></div><div id="word-list-results" class="word-list-results">${wordRows(words)}</div>`, "word-list-modal");
}

function openSoundSettings() {
  openModal("Sound & pronunciation", `
    <div class="setting-list">
      <label class="setting-row"><span><strong>Answer sounds</strong><small>Correct chime and wrong buzzer</small></span><input type="checkbox" data-setting="effects" ${state.settings.effects ? "checked" : ""} /></label>
      <label class="setting-row"><span><strong>Auto-play Latin</strong><small>Only when the visible prompt is Latin</small></span><input type="checkbox" data-setting="autoPronounce" ${state.settings.autoPronounce ? "checked" : ""} /></label>
      <label class="setting-row"><span><strong>Light vibration</strong><small>On supported devices</small></span><input type="checkbox" data-setting="haptics" ${state.settings.haptics ? "checked" : ""} /></label>
      <label class="rate-row" for="speech-rate"><span><strong>Normal voice speed</strong><small id="rate-value">${state.settings.speechRate.toFixed(2)}×</small></span><input id="speech-rate" type="range" min="0.6" max="1.1" step="0.02" value="${state.settings.speechRate}" data-setting="speechRate" /></label>
      <label class="rate-row" for="slow-rate"><span><strong>Slow replay speed</strong><small id="slow-rate-value">${state.settings.slowSpeechRate.toFixed(2)}×</small></span><input id="slow-rate" type="range" min="0.45" max="0.75" step="0.02" value="${state.settings.slowSpeechRate}" data-setting="slowSpeechRate" /></label>
    </div>
    <button class="secondary-button full-button" type="button" data-action="test-sound">Test sound & voice</button>
    <p class="modal-note">Latin voice availability depends on the voices installed on your device.</p>`);
}

function confirmExit() {
  if (!session || session.completed || (!session.completedBase && !session.feedback)) {
    renderHome({ focusSelector: '[data-action="start-selected"]' });
    return;
  }
  openModal("Leave this practice?", `<p class="modal-lead">Saved XP and progress will stay, but this unfinished session will end.</p><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Keep practicing</button><button class="danger-button" type="button" data-action="confirm-exit">Leave practice</button></div>`);
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "select-mode") {
    state.activeMode = button.dataset.mode;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-mode"][data-mode="${button.dataset.mode}"]` });
  } else if (action === "select-deck") {
    state.selection.vocabulary.deckId = button.dataset.deck;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-deck"][data-deck="${button.dataset.deck}"]` });
  } else if (action === "select-direction") {
    state.selection.vocabulary.direction = button.dataset.direction;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-direction"][data-direction="${button.dataset.direction}"]` });
  } else if (action === "select-answer-mode") {
    state.selection.vocabulary.answerMode = button.dataset.answerMode;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-answer-mode"][data-answer-mode="${button.dataset.answerMode}"]` });
  } else if (action === "select-exercise-chapter") {
    state.selection.exercises.chapter = button.dataset.chapter;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-exercise-chapter"][data-chapter="${button.dataset.chapter}"]` });
  } else if (action === "select-exercise-category") {
    state.selection.exercises.category = button.dataset.category;
    saveState();
    renderHome({ preserveScroll: true, focusSelector: `[data-action="select-exercise-category"][data-category="${button.dataset.category}"]` });
  } else if (action === "start-selected") {
    if (state.activeMode === "vocabulary") await startVocabulary(); else await startExercises();
  } else if (action === "continue") {
    await audio.unlock();
    nextQuestion();
  } else if (action === "practice-again") {
    if (session.type === "vocabulary") await startVocabulary(); else await startExercises();
  } else if (action === "review-missed") {
    const ids = [...session.missedIds];
    if (session.type === "vocabulary") await startVocabulary(ids); else await startExercises(ids);
  } else if (action === "home") {
    if (session && !session.completed) confirmExit();
    else renderHome({ focusSelector: '[data-action="start-selected"]' });
  } else if (action === "exit-practice") {
    confirmExit();
  } else if (action === "confirm-exit") {
    closeModal();
    renderHome({ focusSelector: '[data-action="start-selected"]' });
  } else if (action === "insert-macron") {
    const input = document.querySelector("#answer-input");
    if (!input) return;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.setRangeText(button.dataset.letter, start, end, "end");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  } else if (action === "mcq-answer") {
    if (session?.type !== "vocabulary" || session.answerMode !== "multiple-choice" || session.feedback) return;
    const choice = session.current.choices?.[Number(button.dataset.optionIndex)];
    if (!choice) return;
    await audio.unlock();
    submitAutoAnswer(choice.label, false);
  } else if (action === "dont-know") {
    await audio.unlock();
    const spec = getItemSpec();
    if (spec.grading === "self") revealSelfCheck(document.querySelector("#answer-input")?.value, true);
    else submitAutoAnswer("", true);
  } else if (action === "self-got-it") {
    await audio.unlock();
    rateSelfCheck(true);
  } else if (action === "self-review") {
    await audio.unlock();
    rateSelfCheck(false);
  } else if (action === "speak-text") {
    await audio.unlock();
    const spec = getItemSpec();
    const text = button.dataset.audioContext === "answer" ? spec.answerAudio : spec.promptAudio;
    audio.speak(text, button.dataset.speed === "slow", true);
  } else if (action === "speak-word") {
    await audio.unlock();
    const word = getWord(button.dataset.word);
    if (word) audio.speak(word.audioText || word.latin, button.dataset.speed === "slow", true);
  } else if (action === "word-list") {
    openWordList();
  } else if (action === "sound-settings") {
    openSoundSettings();
  } else if (action === "close-modal") {
    if (button.classList.contains("modal-backdrop") && event.target !== button) return;
    closeModal();
  } else if (action === "test-sound") {
    await audio.unlock();
    audio.correct();
    audio.speak("amō", false, true);
  }
});

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "answer-form") return;
  event.preventDefault();
  await audio.unlock();
  const value = new FormData(event.target).get("answer");
  const spec = getItemSpec();
  if (spec.grading === "self") revealSelfCheck(value, false); else submitAutoAnswer(value, false);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "answer-input") {
    const check = document.querySelector(".check-button");
    if (check) check.disabled = !event.target.value.trim();
  }
  if (event.target.id === "word-search") {
    const results = document.querySelector("#word-list-results");
    if (results) results.innerHTML = wordRows(getDeckWords(state.selection.vocabulary.deckId), event.target.value);
  }
  if (event.target.dataset.setting === "speechRate") {
    state.settings.speechRate = Number(event.target.value);
    document.querySelector("#rate-value").textContent = `${state.settings.speechRate.toFixed(2)}×`;
    saveState();
  }
  if (event.target.dataset.setting === "slowSpeechRate") {
    state.settings.slowSpeechRate = Number(event.target.value);
    document.querySelector("#slow-rate-value").textContent = `${state.settings.slowSpeechRate.toFixed(2)}×`;
    saveState();
  }
});

document.addEventListener("change", (event) => {
  const setting = event.target.dataset.setting;
  if (!setting || setting === "speechRate" || setting === "slowSpeechRate") return;
  state.settings[setting] = event.target.checked;
  saveState();
});

document.addEventListener("keydown", (event) => {
  const activeTab = event.target.closest?.('.mode-tabs [role="tab"]');
  if (activeTab && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
    const tabs = [...document.querySelectorAll('.mode-tabs [role="tab"]')];
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const nextMode = tabs[nextIndex]?.dataset.mode;
    event.preventDefault();
    tabs[nextIndex]?.click();
    if (nextMode) window.setTimeout(() => document.querySelector(`.mode-tabs [data-mode="${nextMode}"]`)?.focus(), 0);
    return;
  }
  if (!modalRoot.childElementCount) return;
  if (event.key === "Escape") {
    closeModal();
    return;
  }
  if (event.key !== "Tab") return;
  const controls = [...modalRoot.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter((element) => !element.hidden && element.getClientRects().length);
  if (!controls.length) {
    event.preventDefault();
    return;
  }
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

if ("serviceWorker" in navigator && (location.protocol === "https:" || ["localhost", "127.0.0.1"].includes(location.hostname))) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

if (!safeParse(storageGet(STATE_KEY))) saveState();
else updateHeader();
renderHome();
