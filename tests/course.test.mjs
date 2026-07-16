import test from "node:test";
import assert from "node:assert/strict";

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
} from "../vocab-data.js";

const EXPECTED_LATIN = {
  1: [
    "aedificō", "amō", "cantō", "exspectō", "festīnō", "labōrō", "nāvigō", "oppugnō", "parō",
    "pugnō", "rogō", "spectō", "superō", "vocō", "nōn", "et", "sed"
  ],
  2: [
    "agricola", "aqua", "fābula", "fāma", "fēmina", "Graecia", "incola", "īnsula", "mēnsa", "nauta",
    "patria", "puella", "pugna", "Rōma", "sagitta", "sapientia", "terra", "Troia", "via", "victōria"
  ],
  3: [
    "ambulō", "habitō", "nārrō", "portō", "vulnerō", "ad", "ante", "circum", "contrā", "in", "inter",
    "per", "post", "prope", "ā / ab", "cum", "dē", "ē / ex", "in", "sine", "sub"
  ],
  4: [
    "annus", "dominus", "locus", "nūntius", "servus", "auxilium", "bellum", "dōnum", "perīculum", "tēlum",
    "cēlō", "dō", "dēleō", "doceō", "habeō", "maneō", "moneō", "sedeō", "teneō", "timeō"
  ],
  5: [
    "bonus", "fessus", "īrātus", "longus", "magnus", "malus", "meus", "multus", "tuus", "miser", "noster",
    "pulcher", "tener", "vester", "ager", "castra", "cōpiae", "liber", "magister", "puer"
  ],
  6: [
    "audiō", "cadō", "clāmō", "currō", "dormiō", "dūcō", "gerō", "regō", "scrībō", "surgō", "terreō",
    "veniō", "quid?", "quis?", "cūr?", "-ne…?", "nōnne…?", "num…?", "ubī?", "amīcus"
  ],
  7: [
    "aperiō", "capiō", "cupiō", "errō", "faciō", "inquit / inquiunt", "pellō", "servō", "vītō", "cēna", "dea",
    "deus", "equus", "fīlia", "fīlius", "gladius", "mūrus", "oppidum", "silva", "vir", "novus", "parvus", "tandem"
  ],
  8: [
    "arbor", "carmen", "cōnsul", "cubīle", "dux", "flūmen", "frāter", "hostis", "māter", "mīles", "nōmen", "opus",
    "pater", "pōns", "rēx", "urbs", "altus", "superbus", "appellō", "frangō", "diū", "ōlim"
  ],
  9: [
    "ascendō", "cōgō", "cōnstituō", "dīcō", "discēdō", "fugiō", "iaciō", "mittō", "videō", "arma", "corpus",
    "crās", "saepe", "autem", "dum", "enim", "et…et", "nec/neque", "nec…nec", "neque…neque", "nec tamen",
    "neque tamen", "tamen", "ubĭ", "barbarus"
  ],
  10: [
    "caput", "cibus", "clāmor", "cōnsilium", "custōs", "hasta", "hortus", "vōx", "clārus", "dexter", "sinister",
    "agō", "bibō", "cōnsilium capiō", "dēbeō", "grātiās agō", "interficiō", "deinde", "iam", "iterum"
  ]
};

const EXPECTED_CHAPTER_COUNTS = [17, 20, 21, 20, 20, 20, 23, 22, 25, 20];

const EXPECTED_CHAPTER_1_5_IDS = [
  "c1-aedifico-aedifico-are-avi-atum",
  "c1-amo-amo-are-avi-atum",
  "c1-canto-canto-are-avi-atum",
  "c1-exspecto-exspecto-are-avi-atum",
  "c1-festino-festino-are-avi-atum",
  "c1-laboro-laboro-are-avi-atum",
  "c1-navigo-navigo-are-avi-atum",
  "c1-oppugno-oppugno-are-avi-atum",
  "c1-paro-paro-are-avi-atum",
  "c1-pugno-pugno-are-avi-atum",
  "c1-rogo-rogo-are-avi-atum",
  "c1-specto-specto-are-avi-atum",
  "c1-supero-supero-are-avi-atum",
  "c1-voco-voco-are-avi-atum",
  "c1-non-non",
  "c1-et-et",
  "c1-sed-sed",
  "c2-agricola-agricola-ae-m",
  "c2-aqua-aqua-ae-f",
  "c2-fabula-fabula-ae-f",
  "c2-fama-fama-ae-f",
  "c2-femina-femina-ae-f",
  "c2-graecia-graecia-ae-f",
  "c2-incola-incola-ae-c",
  "c2-insula-insula-ae-f",
  "c2-mensa-mensa-ae-f",
  "c2-nauta-nauta-ae-m",
  "c2-patria-patria-ae-f",
  "c2-puella-puella-ae-f",
  "c2-pugna-pugna-ae-f",
  "c2-roma-roma-ae-f",
  "c2-sagitta-sagitta-ae-f",
  "c2-sapientia-sapientia-ae-f",
  "c2-terra-terra-ae-f",
  "c2-troia-troia-ae-f",
  "c2-via-via-ae-f",
  "c2-victoria-victoria-ae-f",
  "c3-ambulo-ambulo-are-avi-atum",
  "c3-habito-habito-are-avi-atum",
  "c3-narro-narro-are-avi-atum",
  "c3-porto-porto-are-avi-atum",
  "c3-vulnero-vulnero-are-avi-atum",
  "c3-ad-ad-accusative",
  "c3-ante-ante-accusative",
  "c3-circum-circum-accusative",
  "c3-contra-contra-accusative",
  "c3-in-in-accusative",
  "c3-inter-inter-accusative",
  "c3-per-per-accusative",
  "c3-post-post-accusative",
  "c3-prope-prope-accusative",
  "c3-a-ab-a-ab-ablative",
  "c3-cum-cum-ablative",
  "c3-de-de-ablative",
  "c3-e-ex-e-ex-ablative",
  "c3-in-in-ablative",
  "c3-sine-sine-ablative",
  "c3-sub-sub-ablative",
  "c4-annus-annus-anni-m",
  "c4-dominus-dominus-domini-m",
  "c4-locus-locus-loci-m",
  "c4-nuntius-nuntius-nuntii-m",
  "c4-servus-servus-servi-m",
  "c4-auxilium-auxilium-auxilii-n",
  "c4-bellum-bellum-belli-n",
  "c4-donum-donum-doni-n",
  "c4-periculum-periculum-periculi-n",
  "c4-telum-telum-teli-n",
  "c4-celo-celo-are-avi-atum",
  "c4-do-do-dare-dedi-datum",
  "c4-deleo-deleo-ere-delevi-deletum",
  "c4-doceo-doceo-ere-docui-doctum",
  "c4-habeo-habeo-ere-ui-itum",
  "c4-maneo-maneo-ere-mansi-mansum",
  "c4-moneo-moneo-ere-ui-itum",
  "c4-sedeo-sedeo-ere-sedi-sessum",
  "c4-teneo-teneo-ere-tenui-tentum",
  "c4-timeo-timeo-ere-ui",
  "c5-bonus-bonus-a-um",
  "c5-fessus-fessus-a-um",
  "c5-iratus-iratus-a-um",
  "c5-longus-longus-a-um",
  "c5-magnus-magnus-a-um",
  "c5-malus-malus-a-um",
  "c5-meus-meus-a-um",
  "c5-multus-multus-a-um",
  "c5-tuus-tuus-a-um",
  "c5-miser-miser-misera-miserum",
  "c5-noster-noster-nostra-nostrum",
  "c5-pulcher-pulcher-pulchra-pulchrum",
  "c5-tener-tener-tenera-tenerum",
  "c5-vester-vester-vestra-vestrum",
  "c5-ager-ager-agri-m",
  "c5-castra-castra-castrorum-n-pl",
  "c5-copiae-copiae-copiarum-f-pl",
  "c5-liber-liber-libri-m",
  "c5-magister-magister-magistri-m",
  "c5-puer-puer-pueri-m"
];

const EXPECTED_CROSS_REFERENCES = {
  "cecidī": "cadō",
  "cēpī": "capiō",
  "coēgī": "cōgō",
  "cucurrī": "currō",
  "dedī": "dō",
  "dīxī": "dīcō",
  "ēgī": "agō",
  "esse": "sum",
  "fēcī": "faciō",
  "frēgī": "frangō",
  "fuī": "sum",
  "gessī": "gerō",
  "iēcī": "iaciō",
  "lūsī": "lūdō",
  "mīsī": "mittō",
  "rēxī": "regō",
  "stetī": "stō"
};

function chapterWords(chapter) {
  return VOCABULARY.filter((word) => word.chapter === chapter);
}

function canonicalKey(word) {
  return `${normalizeAnswer(word.latin)}|${word.kind}`;
}

test("course metadata identifies the complete v4 Book I vocabulary", () => {
  assert.equal(APP_META.contentVersion, 4);
  assert.match(APP_META.subtitle, /Chapters I–X \+ Extended/);
  assert.match(APP_META.source, /Vocabulary 1–10/);
  assert.match(APP_META.source, /Latin–English Vocabulary/);
});

test("the 359-entry bank has unique IDs and exact Vocabulary 1–10 order", () => {
  assert.equal(VOCABULARY.length, 359);
  assert.equal(new Set(VOCABULARY.map((word) => word.id)).size, 359);

  for (let chapter = 1; chapter <= 10; chapter += 1) {
    const words = chapterWords(chapter);
    assert.equal(words.length, EXPECTED_CHAPTER_COUNTS[chapter - 1]);
    assert.deepEqual(words.map((word) => word.latin), EXPECTED_LATIN[chapter]);
    assert.deepEqual(words.map((word) => word.order), words.map((_, index) => index + 1));
    assert.ok(words.every((word) => word.sourceGroup === "chapter"));
  }
});

test("Chapter I–V IDs remain stable for saved mastery migration", () => {
  const actualIds = VOCABULARY.filter((word) => word.chapter >= 1 && word.chapter <= 5).map((word) => word.id);
  assert.deepEqual(actualIds, EXPECTED_CHAPTER_1_5_IDS);
  assert.equal(getWord("c1-amo-amo-are-avi-atum").latin, "amō");
  assert.equal(getWord("c5-magister-magister-magistri-m").promptEnglish, "master (teacher)");
});

test("every record exposes the v4 schema and structured PDF source", () => {
  const stackedMacronAndBreve = /[āēīōūȳĀĒĪŌŪȲ]\u0306/u;

  for (const word of VOCABULARY) {
    assert.ok(word.id && word.latin && word.english && word.kind && word.dictionary);
    assert.equal(word.canonical, word.dictionary);
    assert.ok(["chapter", "extended"].includes(word.sourceGroup));
    assert.ok(Array.isArray(word.acceptedEnglish) && word.acceptedEnglish.includes(word.english));
    assert.ok(Array.isArray(word.acceptedLatin) && word.acceptedLatin.includes(word.latin));
    assert.ok(Array.isArray(word.aliases));
    assert.ok(word.audioText);
    assert.doesNotMatch(word.audioText, /[?…/]/u);
    assert.doesNotMatch(`${word.latin}${word.dictionary}`, stackedMacronAndBreve);

    assert.equal(word.source.book, "So You Really Want to Learn Latin, Book I");
    assert.equal(word.source.edition, "2024 download");
    assert.ok(word.source.section);
    assert.ok(Number.isInteger(word.source.printedPage));
    assert.equal(word.source.pdfPage, word.source.printedPage + 7);
    assert.equal(word.sourceLabel, `Book p. ${word.source.printedPage}`);
  }

  assert.equal(chapterWords(3).find((word) => word.latin === "ambulō").source.printedPage, 29);
  assert.equal(chapterWords(3).find((word) => word.latin === "ad").source.printedPage, 30);
  assert.equal(chapterWords(6)[0].source.printedPage, 62);
  assert.equal(chapterWords(10)[0].source.printedPage, 92);
});

test("all 17 glossary cross-references are aliases, never quiz records or accepted headword answers", () => {
  const actualAliases = {};
  for (const word of VOCABULARY) {
    for (const alias of word.aliases) {
      assert.equal(actualAliases[alias], undefined, `duplicate alias: ${alias}`);
      actualAliases[alias] = word.latin;
      assert.equal(word.acceptedLatin.includes(alias), false, `${alias} must remain search-only`);
    }
  }

  assert.deepEqual(actualAliases, EXPECTED_CROSS_REFERENCES);
  assert.equal(Object.keys(actualAliases).length, 17);
  assert.equal(new Set(Object.values(actualAliases)).size, 16);

  for (const alias of Object.keys(EXPECTED_CROSS_REFERENCES)) {
    assert.equal(VOCABULARY.some((word) => normalizeAnswer(word.latin) === normalizeAnswer(alias)), false);
  }

  const cadō = chapterWords(6).find((word) => word.latin === "cadō");
  assert.equal(isTranslationCorrect(cadō, "english-latin", "cado"), true);
  assert.equal(isTranslationCorrect(cadō, "english-latin", "cecidī"), false);
});

test("Extended contains 151 unique supplemental entries and no chapter canonical collision", () => {
  const extended = getDeckWords("extended");
  const chapters = getDeckWords("mixed-chapters");
  const chapterKeys = new Set(chapters.map(canonicalKey));

  assert.equal(extended.length, 151);
  assert.ok(extended.every((word) => word.sourceGroup === "extended" && word.chapter === null));
  assert.deepEqual(extended.map((word) => word.order), extended.map((_, index) => index + 1));
  assert.equal(new Set(extended.map((word) => word.canonical)).size, 151);
  assert.deepEqual(extended.filter((word) => chapterKeys.has(canonicalKey(word))), []);
  assert.ok(extended.every((word) => word.source.printedPage >= 102 && word.source.printedPage <= 106));

  const chapterSpellings = new Set(chapters.map((word) => normalizeAnswer(word.latin)));
  assert.deepEqual(
    extended.filter((word) => chapterSpellings.has(normalizeAnswer(word.latin))).map((word) => [word.latin, word.kind]),
    [["barbarus", "noun"]]
  );
});

test("deck IDs, counts, and pool membership distinguish Chapters, Extended, Mixed, and All", () => {
  assert.deepEqual(DECKS.map((deck) => deck.id), [
    "chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8", "chapter9",
    "chapter10", "extended", "mixed-chapters", "all-words"
  ]);
  assert.deepEqual(DECKS.map((deck) => deck.count), [...EXPECTED_CHAPTER_COUNTS, 151, 208, 359]);

  for (let chapter = 1; chapter <= 10; chapter += 1) {
    assert.deepEqual(getDeckWords(`chapter${chapter}`), chapterWords(chapter));
  }

  const chapterPool = VOCABULARY.filter((word) => word.sourceGroup === "chapter");
  const extendedPool = VOCABULARY.filter((word) => word.sourceGroup === "extended");
  assert.deepEqual(getDeckWords("mixed-chapters"), chapterPool);
  assert.deepEqual(getDeckWords("mixed"), chapterPool);
  assert.deepEqual(getDeckWords("extended"), extendedPool);
  assert.deepEqual(getDeckWords("all-words"), VOCABULARY);
  assert.ok(getDeckWords("mixed-chapters").every((word) => word.sourceGroup !== "extended"));
  assert.ok(getDeckWords("all-words").some((word) => word.sourceGroup === "extended"));
});

test("only Latin-to-English and English-to-Latin directions are exposed", () => {
  assert.deepEqual(DIRECTIONS.map((direction) => direction.id), ["latin-english", "english-latin"]);

  const amō = chapterWords(1).find((word) => word.latin === "amō");
  assert.equal(promptFor(amō, "latin-english"), "amō");
  assert.equal(answerFor(amō, "latin-english"), "I love, like");
  assert.equal(promptFor(amō, "english-latin"), "I love, like");
  assert.equal(answerFor(amō, "english-latin"), "amō");
  assert.equal(pairLabel(amō), "amō = I love, like");

  const magister = chapterWords(5).find((word) => word.latin === "magister");
  assert.equal(promptFor(magister, "english-latin"), "master (teacher)");
  assert.equal(answerFor(magister, "english-latin"), "magister");
});

test("every vocabulary pool produces four collision-safe multiple-choice answers", () => {
  const meaningSet = (word) => new Set(word.acceptedEnglish
    .map((answer) => normalizeAnswer(answer).replace(/^(a|an|the)\s+/, ""))
    .filter(Boolean));

  for (const deck of DECKS) {
    const pool = getDeckWords(deck.id);
    for (const word of pool) {
      for (const direction of DIRECTIONS.map((item) => item.id)) {
        const choices = createMultipleChoiceOptions(word, direction, pool);
        assert.equal(choices.length, 4, `${deck.id}/${word.id}/${direction} should have four choices`);
        assert.equal(choices.filter((choice) => choice.correct).length, 1, `${word.id}/${direction} should have one marked answer`);
        assert.equal(new Set(choices.map((choice) => normalizeAnswer(choice.label))).size, 4, `${word.id}/${direction} labels should be unique`);

        for (const choice of choices) {
          const candidate = getWord(choice.wordId);
          assert.ok(candidate, `${choice.wordId} should resolve to a vocabulary record`);
          assert.equal(isTranslationCorrect(word, direction, choice.label), choice.correct, `${choice.label} should grade according to its marker for ${word.id}`);
          if (choice.correct) continue;
          assert.notEqual(normalizeAnswer(promptFor(candidate, direction)), normalizeAnswer(promptFor(word, direction)), `${word.id} should not receive an identical-prompt distractor`);
          if (direction === "english-latin") {
            const targetMeanings = meaningSet(word);
            const overlap = [...meaningSet(candidate)].some((meaning) => targetMeanings.has(meaning));
            assert.equal(overlap, false, `${candidate.id} should not be a synonymous Latin distractor for ${word.id}`);
          }
        }
      }
    }
  }
});

test("preposition prompts retain case requirements and alternate headwords grade correctly", () => {
  const ad = chapterWords(3).find((word) => word.latin === "ad");
  assert.equal(promptFor(ad, "latin-english"), "ad + accusative");
  assert.equal(answerFor(ad, "english-latin"), "ad");

  const ab = chapterWords(3).find((word) => word.latin === "ā / ab");
  assert.equal(isTranslationCorrect(ab, "english-latin", "ab"), true);
  assert.equal(isTranslationCorrect(ab, "english-latin", "ā"), true);
  assert.equal(isTranslationCorrect(ab, "english-latin", "ā / ab"), true);

  const connector = chapterWords(9).find((word) => word.latin === "nec/neque");
  assert.equal(isTranslationCorrect(connector, "english-latin", "nec"), true);
  assert.equal(isTranslationCorrect(connector, "english-latin", "neque"), true);
});

test("English grading accepts listed glosses and optional common-noun articles", () => {
  const amō = chapterWords(1).find((word) => word.latin === "amō");
  assert.equal(isTranslationCorrect(amō, "latin-english", "love"), true);
  assert.equal(isTranslationCorrect(amō, "latin-english", "like"), true);
  assert.equal(isTranslationCorrect(amō, "latin-english", "I love, like"), true);
  assert.equal(isTranslationCorrect(amō, "latin-english", "hate"), false);

  const puella = chapterWords(2).find((word) => word.latin === "puella");
  assert.equal(isTranslationCorrect(puella, "latin-english", "girl"), true);
  assert.equal(isTranslationCorrect(puella, "latin-english", "a girl"), true);
  assert.equal(isTranslationCorrect(puella, "latin-english", "the girl"), true);

  const Rōma = chapterWords(2).find((word) => word.latin === "Rōma");
  assert.equal(isTranslationCorrect(Rōma, "latin-english", "Rome"), true);
  assert.equal(isTranslationCorrect(Rōma, "latin-english", "the Rome"), false);

  const audiō = chapterWords(6).find((word) => word.latin === "audiō");
  assert.equal(isTranslationCorrect(audiō, "latin-english", "listen to"), true);
  const carmen = chapterWords(8).find((word) => word.latin === "carmen");
  assert.equal(isTranslationCorrect(carmen, "latin-english", "poem"), true);
});

test("Latin grading ignores case, macrons, and breves while rejecting inflected forms", () => {
  const mēnsa = chapterWords(2).find((word) => word.latin === "mēnsa");
  assert.equal(normalizeAnswer("  MĒNSA! "), "mensa");
  assert.equal(isTranslationCorrect(mēnsa, "english-latin", "mensa"), true);
  assert.equal(isTranslationCorrect(mēnsa, "english-latin", "MĒNSA"), true);
  assert.equal(isTranslationCorrect(mēnsa, "english-latin", "mēnsam"), false);

  const amō = chapterWords(1).find((word) => word.latin === "amō");
  assert.equal(isTranslationCorrect(amō, "english-latin", "amo"), true);
  assert.equal(isTranslationCorrect(amō, "english-latin", "amas"), false);

  const ubĭ = chapterWords(9).find((word) => word.latin === "ubĭ");
  assert.equal(isTranslationCorrect(ubĭ, "english-latin", "ubi"), true);
  assert.equal(normalizeAnswer("homŏ"), "homo");
});

test("word lookup returns every indexed vocabulary entry", () => {
  for (const word of VOCABULARY) assert.equal(getWord(word.id), word);
  assert.equal(getWord("missing-word"), undefined);
});
