import test from "node:test";
import assert from "node:assert/strict";

import {
  ALL_EXERCISE_ITEMS,
  CORE_EXERCISES,
  EXERCISE_CATEGORIES,
  PASSAGES,
  PASSAGE_STEPS,
  getExerciseItem,
  isExerciseAnswerCorrect,
  normalizeExerciseAnswer
} from "../exercise-data.js";

const CORE_COUNTS = {
  forms: 6,
  "latin-english": 6,
  "english-latin": 5,
  derivation: 3
};

const CORE_CATEGORY_IDS = Object.keys(CORE_COUNTS);

function assertNonEmptyString(value, message) {
  assert.equal(typeof value, "string", message);
  assert.ok(value.trim().length > 0, message);
}

test("the public exercise bank has exactly 20 core cards in every chapter", () => {
  assert.equal(CORE_EXERCISES.length, 200);
  assert.deepEqual(
    [...new Set(CORE_EXERCISES.map((item) => item.chapter))],
    Array.from({ length: 10 }, (_, index) => index + 1)
  );

  for (let chapter = 1; chapter <= 10; chapter += 1) {
    const chapterItems = CORE_EXERCISES.filter((item) => item.chapter === chapter);
    assert.equal(chapterItems.length, 20, `Chapter ${chapter} should have 20 core cards`);

    for (const [category, expected] of Object.entries(CORE_COUNTS)) {
      const actual = chapterItems.filter((item) => item.category === category).length;
      assert.equal(actual, expected, `Chapter ${chapter} should have ${expected} ${category} cards`);
    }
  }
});

test("ten passages contribute 40 steps and bring the complete prompt total to 240", () => {
  assert.equal(PASSAGES.length, 10);

  for (let chapter = 1; chapter <= 10; chapter += 1) {
    const chapterPassages = PASSAGES.filter((passage) => passage.chapter === chapter);
    assert.equal(chapterPassages.length, 1, `Chapter ${chapter} should have exactly one passage`);

    const expectedSteps = chapter <= 5 ? 3 : 5;
    assert.equal(chapterPassages[0].steps.length, expectedSteps);
    assert.equal(
      PASSAGE_STEPS.filter((step) => step.chapter === chapter).length,
      expectedSteps,
      `Chapter ${chapter} should expose ${expectedSteps} flattened passage steps`
    );
  }

  assert.equal(PASSAGE_STEPS.length, 40);
  assert.equal(ALL_EXERCISE_ITEMS.length, 240);
  assert.equal(ALL_EXERCISE_ITEMS.length, CORE_EXERCISES.length + PASSAGE_STEPS.length);
});

test("exercise, passage, and passage-step IDs are globally unique", () => {
  const ids = [
    ...CORE_EXERCISES.map((item) => item.id),
    ...PASSAGES.map((passage) => passage.id),
    ...PASSAGES.flatMap((passage) => passage.steps.map((step) => step.id))
  ];

  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(ALL_EXERCISE_ITEMS.map((item) => item.id)).size, ALL_EXERCISE_ITEMS.length);

  for (const item of ALL_EXERCISE_ITEMS) {
    assert.equal(getExerciseItem(item.id), item, `${item.id} should be retrievable through the public lookup`);
  }
});

test("all prompts have valid categories, grading, source metadata, and feedback data", () => {
  assert.deepEqual(
    EXERCISE_CATEGORIES.map((category) => category.id),
    ["mixed", "forms", "latin-english", "english-latin", "derivation", "passage"]
  );

  for (const item of CORE_EXERCISES) {
    assert.ok(CORE_CATEGORY_IDS.includes(item.category), `${item.id} has an invalid core category`);
  }

  for (const item of PASSAGE_STEPS) {
    assert.equal(item.category, "passage", `${item.id} should be a passage step`);
    assert.equal(item.grading, "self", `${item.id} should use self grading`);
  }

  for (const item of ALL_EXERCISE_ITEMS) {
    assert.ok(["auto", "self"].includes(item.grading), `${item.id} has invalid grading`);
    assert.ok(["latin", "english"].includes(item.promptLanguage), `${item.id} has invalid prompt language`);
    assertNonEmptyString(item.prompt, `${item.id} needs a prompt`);
    assert.ok(Array.isArray(item.answers), `${item.id} needs an answers array`);

    assert.equal(item.source?.adapted, true, `${item.id} should be marked as adapted`);
    assert.ok(Number.isInteger(item.source?.printedPage), `${item.id} needs a printed source page`);
    assert.ok(item.source.printedPage > 0, `${item.id} needs a positive printed source page`);
    assertNonEmptyString(item.source?.exercise, `${item.id} needs a source exercise`);

    if (item.grading === "auto") {
      assert.ok(item.answers.length > 0, `${item.id} needs at least one accepted answer`);
      for (const answer of item.answers) {
        assertNonEmptyString(answer, `${item.id} contains an empty accepted answer`);
      }
      assert.equal(
        isExerciseAnswerCorrect(item, item.answers[0]),
        true,
        `${item.id} should accept its canonical answer`
      );
    } else {
      assertNonEmptyString(item.modelAnswer, `${item.id} needs a model answer`);
      assertNonEmptyString(item.explanation, `${item.id} needs an explanation`);
    }
  }

  for (const passage of PASSAGES) {
    assert.equal(passage.category, "passage", `${passage.id} should use the passage category`);
    assert.equal(passage.source?.adapted, true, `${passage.id} should be marked as adapted`);
    assert.ok(Number.isInteger(passage.source?.printedPage), `${passage.id} needs a printed source page`);
    assertNonEmptyString(passage.source?.exercise, `${passage.id} needs a source exercise`);
  }
});

test("automatic grading ignores presentation differences but still rejects wrong forms", () => {
  assert.equal(normalizeExerciseAnswer("  “NĀVIGĀBIS!”  "), "navigabis");
  assert.equal(normalizeExerciseAnswer("PARŌ / PARĀRE / PARĀVĪ / PARĀTUM"), "paro parare paravi paratum");

  const futureVerb = getExerciseItem("c1-forms-02");
  assert.equal(isExerciseAnswerCorrect(futureVerb, "  NAVIGABIS! "), true);
  assert.equal(isExerciseAnswerCorrect(futureVerb, "nāvigābit"), false);

  const englishTranslation = getExerciseItem("c1-latin-english-01");
  assert.equal(isExerciseAnswerCorrect(englishTranslation, "YOU WILL BUILD."), true);
  assert.equal(isExerciseAnswerCorrect(englishTranslation, "you were building"), false);

  const principalParts = getExerciseItem("c1-forms-06");
  assert.equal(isExerciseAnswerCorrect(principalParts, "PARO / PARARE / PARAVI / PARATUM"), true);

  const laterChapterForm = getExerciseItem("ch6-forms-02");
  assert.equal(isExerciseAnswerCorrect(laterChapterForm, "CECIDERUNT?"), true);
  assert.equal(isExerciseAnswerCorrect(laterChapterForm, "cadunt"), false);

  const selfChecked = CORE_EXERCISES.find((item) => item.grading === "self");
  assert.ok(selfChecked);
  assert.equal(isExerciseAnswerCorrect(selfChecked, selfChecked.modelAnswer), false);
  assert.equal(isExerciseAnswerCorrect(futureVerb, "   "), false);
  assert.equal(isExerciseAnswerCorrect(undefined, "nāvigābis"), false);
});
