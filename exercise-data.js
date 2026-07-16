import { EXERCISES_1_5, PASSAGES_1_5 } from "./exercise-data-1-5.js";
import { EXERCISES_6_10, PASSAGES_6_10 } from "./exercise-data-6-10.js";

export const EXERCISE_CATEGORIES = [
  { id: "mixed", title: "Mixed", subtitle: "A balanced chapter review" },
  { id: "forms", title: "Forms", subtitle: "Cases, endings, and tenses" },
  { id: "latin-english", title: "Latin → English", subtitle: "Translate from Latin" },
  { id: "english-latin", title: "English → Latin", subtitle: "Build accurate Latin" },
  { id: "derivation", title: "Derivations", subtitle: "Connect Latin and English" },
  { id: "passage", title: "Passages", subtitle: "Translate a short text" }
];

export const CORE_EXERCISES = [...EXERCISES_1_5, ...EXERCISES_6_10];
export const PASSAGES = [...PASSAGES_1_5, ...PASSAGES_6_10];
export const PASSAGE_STEPS = PASSAGES.flatMap((passage) =>
  passage.steps.map((step, index) => ({
    ...step,
    chapter: passage.chapter,
    category: "passage",
    passageId: passage.id,
    passageTitle: passage.title,
    passageStep: index + 1,
    passageLength: passage.steps.length,
    source: step.source || passage.source
  }))
);
export const ALL_EXERCISE_ITEMS = [...CORE_EXERCISES, ...PASSAGE_STEPS];

export function normalizeExerciseAnswer(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[“”‘’'.,!?;:()[\]{}]/g, " ")
    .replace(/[\/]/g, " ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isExerciseAnswerCorrect(item, value) {
  const candidate = normalizeExerciseAnswer(value);
  if (!item || item.grading !== "auto" || !candidate) return false;
  return item.answers.some((answer) => normalizeExerciseAnswer(answer) === candidate);
}

export function getExerciseItem(id) {
  return ALL_EXERCISE_ITEMS.find((item) => item.id === id);
}

export function getExercisePool(chapter, category) {
  const chapterNumber = chapter === "mixed" ? null : Number(chapter);
  const source = category === "passage" ? PASSAGE_STEPS : CORE_EXERCISES;
  return source.filter((item) => {
    const chapterMatches = chapterNumber == null || item.chapter === chapterNumber;
    const categoryMatches = category === "mixed" || item.category === category;
    return chapterMatches && categoryMatches;
  });
}

export function getPassagePool(chapter) {
  const chapterNumber = chapter === "mixed" ? null : Number(chapter);
  return PASSAGES.filter((passage) => chapterNumber == null || passage.chapter === chapterNumber);
}

export function exerciseLabel(item) {
  if (!item) return "Exercise";
  if (item.category === "passage") return item.passageTitle || "Passage";
  return item.modelAnswer || item.answers?.[0] || "Exercise";
}
