function adaptedSource(printedPage, exercise) {
  return { printedPage, exercise, adapted: true };
}

function numberedId(chapter, category, index) {
  return `c${chapter}-${category}-${String(index).padStart(2, "0")}`;
}

function formCard(chapter, index, prompt, answers, modelAnswer, explanation, printedPage, exercise) {
  return {
    id: numberedId(chapter, "forms", index),
    chapter,
    category: "forms",
    grading: "auto",
    instruction: "Give the requested Latin form.",
    prompt,
    promptLanguage: "english",
    answers,
    modelAnswer,
    explanation,
    audioText: modelAnswer,
    source: adaptedSource(printedPage, exercise)
  };
}

function latinEnglishCard(
  chapter,
  index,
  prompt,
  answers,
  modelAnswer,
  explanation,
  printedPage,
  exercise,
  grading = "auto"
) {
  return {
    id: numberedId(chapter, "latin-english", index),
    chapter,
    category: "latin-english",
    grading,
    instruction: "Translate the Latin into English.",
    prompt,
    promptLanguage: "latin",
    answers: grading === "self" ? [] : answers,
    modelAnswer,
    explanation,
    audioText: prompt,
    source: adaptedSource(printedPage, exercise)
  };
}

function englishLatinCard(
  chapter,
  index,
  prompt,
  answers,
  modelAnswer,
  explanation,
  printedPage,
  exercise,
  grading = "auto"
) {
  return {
    id: numberedId(chapter, "english-latin", index),
    chapter,
    category: "english-latin",
    grading,
    instruction: "Translate the English into Latin.",
    prompt,
    promptLanguage: "english",
    answers: grading === "self" ? [] : answers,
    modelAnswer,
    explanation,
    audioText: modelAnswer,
    source: adaptedSource(printedPage, exercise)
  };
}

function derivationCard(chapter, index, prompt, answers, modelAnswer, explanation, printedPage, exercise) {
  return {
    id: numberedId(chapter, "derivation", index),
    chapter,
    category: "derivation",
    grading: "auto",
    instruction: "Give the Latin root.",
    prompt,
    promptLanguage: "english",
    answers,
    modelAnswer,
    explanation,
    audioText: modelAnswer,
    source: adaptedSource(printedPage, exercise)
  };
}

export const EXERCISES_1_5 = [
  // Chapter 1: first-conjugation verbs in the present, future, imperfect and perfect.
  formCard(
    1,
    1,
    "cantō: third person plural, present tense",
    ["cantant"],
    "cantant",
    "The present stem cantā- takes -nt; the stem vowel shortens before this ending.",
    7,
    "1.1"
  ),
  formCard(
    1,
    2,
    "nāvigō: second person singular, future tense",
    ["nāvigābis"],
    "nāvigābis",
    "The first-conjugation future uses the present stem nāvigā- plus -bis.",
    9,
    "1.5"
  ),
  formCard(
    1,
    3,
    "labōrō: first person plural, imperfect tense",
    ["labōrābāmus"],
    "labōrābāmus",
    "The imperfect uses labōrā- plus -bāmus: 'we were working.'",
    9,
    "1.7"
  ),
  formCard(
    1,
    4,
    "vocō: second person plural, perfect tense",
    ["vocāvistis"],
    "vocāvistis",
    "The perfect stem vocāv- takes the second-person plural ending -istis.",
    11,
    "1.10"
  ),
  formCard(
    1,
    5,
    "pugnō: present infinitive",
    ["pugnāre"],
    "pugnāre",
    "A regular first-conjugation infinitive ends in -āre.",
    11,
    "1.11"
  ),
  formCard(
    1,
    6,
    "Give all four principal parts of parō.",
    ["parō, parāre, parāvī, parātum", "parō parāre parāvī parātum"],
    "parō, parāre, parāvī, parātum",
    "Regular first-conjugation principal parts follow -ō, -āre, -āvī, -ātum.",
    11,
    "1.9"
  ),
  latinEnglishCard(
    1,
    1,
    "aedificābitis",
    ["you will build", "you all will build", "you will be building"],
    "you (plural) will build",
    "The future ending -bitis marks second person plural.",
    13,
    "1.15"
  ),
  latinEnglishCard(
    1,
    2,
    "nōn pugnābāmus",
    ["we were not fighting", "we did not use to fight", "we used not to fight"],
    "we were not fighting",
    "Nōn negates the verb; -bāmus is first person plural imperfect.",
    13,
    "1.15"
  ),
  latinEnglishCard(
    1,
    3,
    "labōrāvērunt",
    ["they have worked", "they worked"],
    "they have worked",
    "The perfect ending -ērunt marks third person plural.",
    11,
    "1.11"
  ),
  latinEnglishCard(
    1,
    4,
    "festīnāre",
    ["to hurry"],
    "to hurry",
    "The ending -āre identifies the present infinitive of a first-conjugation verb.",
    13,
    "1.15"
  ),
  latinEnglishCard(
    1,
    5,
    "nōn spectābāmus sed labōrābāmus.",
    [],
    "We were not watching, but we were working.",
    "Both verbs are first person plural imperfect; nōn negates the first clause and sed joins the contrast.",
    13,
    "1.15",
    "self"
  ),
  latinEnglishCard(
    1,
    6,
    "pugnāvērunt et superāvērunt.",
    [],
    "They have fought and overcome.",
    "Both perfect verbs have the third-person plural ending -ērunt.",
    13,
    "1.15",
    "self"
  ),
  englishLatinCard(
    1,
    1,
    "We shall sing.",
    ["cantābimus"],
    "cantābimus",
    "The first-person plural future ending is -bimus.",
    13,
    "1.14"
  ),
  englishLatinCard(
    1,
    2,
    "You (singular) used to like.",
    ["amābās"],
    "amābās",
    "The second-person singular imperfect ending is -bās.",
    13,
    "1.14"
  ),
  englishLatinCard(
    1,
    3,
    "They have hurried.",
    ["festīnāvērunt"],
    "festīnāvērunt",
    "Use the perfect stem festīnāv- with -ērunt.",
    11,
    "1.10"
  ),
  englishLatinCard(
    1,
    4,
    "We will not watch, but they will work.",
    [],
    "nōn spectābimus sed labōrābunt.",
    "Nōn comes before spectābimus; the two future clauses use -bimus and -bunt.",
    13,
    "1.14",
    "self"
  ),
  englishLatinCard(
    1,
    5,
    "I was waiting and she was calling.",
    [],
    "exspectābam et vocābat.",
    "The imperfect endings -bam and -bat carry the subjects 'I' and 'she.'",
    9,
    "1.7",
    "self"
  ),
  derivationCard(
    1,
    1,
    "Which Latin verb is the root of 'laboratory'?",
    ["labōrō"],
    "labōrō",
    "Labōrō means 'I work'; a laboratory is a place for work.",
    13,
    "1.13"
  ),
  derivationCard(
    1,
    2,
    "Which Latin verb is the root of 'navigate'?",
    ["nāvigō"],
    "nāvigō",
    "Nāvigō means 'I sail,' the action behind navigation.",
    13,
    "1.13"
  ),
  derivationCard(
    1,
    3,
    "Which Latin verb is the root of 'vocation'?",
    ["vocō"],
    "vocō",
    "Vocō means 'I call'; a vocation is a calling.",
    13,
    "1.13"
  ),

  // Chapter 2: first-declension nouns, case meanings, subjects and objects.
  formCard(
    2,
    1,
    "mēnsa: genitive singular",
    ["mēnsae"],
    "mēnsae",
    "The first-declension genitive singular ending is -ae.",
    17,
    "2.1"
  ),
  formCard(
    2,
    2,
    "puella: accusative plural",
    ["puellās"],
    "puellās",
    "The first-declension accusative plural ending is -ās.",
    17,
    "2.1"
  ),
  formCard(
    2,
    3,
    "agricola: ablative singular",
    ["agricolā"],
    "agricolā",
    "The ablative singular ends in long -ā.",
    17,
    "2.1"
  ),
  formCard(
    2,
    4,
    "nauta: genitive plural",
    ["nautārum"],
    "nautārum",
    "The first-declension genitive plural ending is -ārum.",
    21,
    "2.7"
  ),
  formCard(
    2,
    5,
    "fēmina: dative plural",
    ["fēminīs"],
    "fēminīs",
    "The first-declension dative plural ending is -īs.",
    21,
    "2.7"
  ),
  formCard(
    2,
    6,
    "īnsula: nominative plural",
    ["īnsulae"],
    "īnsulae",
    "The first-declension nominative plural ending is -ae.",
    23,
    "2.12"
  ),
  latinEnglishCard(
    2,
    1,
    "nautārum",
    ["of the sailors", "of sailors"],
    "of the sailors",
    "The ending -ārum is genitive plural.",
    21,
    "2.7"
  ),
  latinEnglishCard(
    2,
    2,
    "fēminās",
    ["the women", "women"],
    "the women (object)",
    "The ending -ās is accusative plural, marking the object.",
    23,
    "2.12"
  ),
  latinEnglishCard(
    2,
    3,
    "īnsulārum",
    ["of the islands", "of islands"],
    "of the islands",
    "The genitive plural ending -ārum expresses 'of.'",
    23,
    "2.12"
  ),
  latinEnglishCard(
    2,
    4,
    "sapientiā",
    ["by wisdom", "with wisdom", "by means of wisdom"],
    "by means of wisdom",
    "The ablative singular can express the instrument used to do something.",
    23,
    "2.12"
  ),
  latinEnglishCard(
    2,
    5,
    "agricola puellam vocat.",
    [],
    "The farmer calls the girl.",
    "Agricola is nominative singular, puellam is accusative singular, and vocat is singular.",
    23,
    "2.10",
    "self"
  ),
  latinEnglishCard(
    2,
    6,
    "viam incolae aedificāvērunt.",
    [],
    "The inhabitants have built a road.",
    "Viam is the accusative object; incolae is the plural subject despite its position after the object.",
    23,
    "2.10",
    "self"
  ),
  englishLatinCard(
    2,
    1,
    "of the battles",
    ["pugnārum"],
    "pugnārum",
    "Use the genitive plural ending -ārum.",
    21,
    "2.7"
  ),
  englishLatinCard(
    2,
    2,
    "the arrows (object)",
    ["sagittās"],
    "sagittās",
    "A plural direct object takes the accusative plural ending -ās.",
    21,
    "2.7"
  ),
  englishLatinCard(
    2,
    3,
    "for the sailor",
    ["nautae"],
    "nautae",
    "The dative singular expresses 'to' or 'for' and ends in -ae.",
    17,
    "2.2"
  ),
  englishLatinCard(
    2,
    4,
    "The women prepare the tables.",
    [],
    "fēminae mēnsās parant.",
    "Fēminae is nominative plural, mēnsās is accusative plural, and parant agrees with the plural subject.",
    19,
    "2.5",
    "self"
  ),
  englishLatinCard(
    2,
    5,
    "The inhabitants have overcome the sailors.",
    [],
    "incolae nautās superāvērunt.",
    "The subject is nominative plural, the object accusative plural, and the verb perfect plural.",
    21,
    "2.8",
    "self"
  ),
  derivationCard(
    2,
    1,
    "Which Latin noun is the root of 'feminine'?",
    ["fēmina"],
    "fēmina",
    "Fēmina means 'woman.'",
    21,
    "2.9"
  ),
  derivationCard(
    2,
    2,
    "Which Latin noun is the root of 'aquatic'?",
    ["aqua"],
    "aqua",
    "Aqua means 'water,' so aquatic describes something connected with water.",
    21,
    "2.9"
  ),
  derivationCard(
    2,
    3,
    "Which Latin noun is the root of 'fable'?",
    ["fābula"],
    "fābula",
    "Fābula means 'story.'",
    21,
    "2.9"
  ),

  // Chapter 3: all six cases, case-governing prepositions and linked clauses.
  formCard(
    3,
    1,
    "puella: genitive plural",
    ["puellārum"],
    "puellārum",
    "The genitive plural expresses 'of the girls' with -ārum.",
    27,
    "3.1"
  ),
  formCard(
    3,
    2,
    "agricola: dative plural",
    ["agricolīs"],
    "agricolīs",
    "The dative plural ending -īs expresses 'to' or 'for the farmers.'",
    27,
    "3.1"
  ),
  formCard(
    3,
    3,
    "sagitta: ablative singular",
    ["sagittā"],
    "sagittā",
    "Long -ā marks the ablative singular: 'with an arrow.'",
    27,
    "3.1"
  ),
  formCard(
    3,
    4,
    "towards the island (use ad)",
    ["ad īnsulam"],
    "ad īnsulam",
    "Ad governs the accusative, so īnsula becomes īnsulam.",
    31,
    "3.6"
  ),
  formCard(
    3,
    5,
    "with the women (use cum)",
    ["cum fēminīs"],
    "cum fēminīs",
    "Cum governs the ablative, and the ablative plural is fēminīs.",
    31,
    "3.6"
  ),
  formCard(
    3,
    6,
    "into the water (use in)",
    ["in aquam"],
    "in aquam",
    "Movement into a place uses in with the accusative.",
    31,
    "3.6"
  ),
  latinEnglishCard(
    3,
    1,
    "contrā agricolās",
    ["against the farmers", "against farmers"],
    "against the farmers",
    "Contrā governs the accusative; agricolās is accusative plural.",
    31,
    "3.7"
  ),
  latinEnglishCard(
    3,
    2,
    "dē Troiā",
    ["about troy", "concerning troy", "down from troy"],
    "concerning Troy",
    "Dē governs the ablative and can mean 'concerning' or 'down from.'",
    33,
    "3.12"
  ),
  latinEnglishCard(
    3,
    3,
    "sub mēnsā",
    ["under the table", "under a table", "beneath the table"],
    "under the table",
    "Sub meaning location governs the ablative; mēnsā is ablative singular.",
    31,
    "3.7"
  ),
  latinEnglishCard(
    3,
    4,
    "per viās",
    ["through the streets", "along the streets", "through streets", "along roads", "through roads"],
    "along the streets",
    "Per governs the accusative; viās is accusative plural.",
    31,
    "3.7"
  ),
  latinEnglishCard(
    3,
    5,
    "puella fābulam fēminīs nārrābat.",
    [],
    "The girl was telling a story to the women.",
    "Puella is the subject, fābulam the direct object, and fēminīs the dative indirect object.",
    29,
    "3.3",
    "self"
  ),
  latinEnglishCard(
    3,
    6,
    "agricolae terram parābant et viam aedificābant.",
    [],
    "The farmers were preparing the land and building a road.",
    "Agricolae is the shared plural subject; each clause has its own imperfect verb and accusative object.",
    33,
    "3.10",
    "self"
  ),
  englishLatinCard(
    3,
    1,
    "without arrows",
    ["sine sagittīs"],
    "sine sagittīs",
    "Sine governs the ablative; the plural form is sagittīs.",
    33,
    "3.12"
  ),
  englishLatinCard(
    3,
    2,
    "near Rome",
    ["prope Rōmam"],
    "prope Rōmam",
    "Prope governs the accusative, so Rōma becomes Rōmam.",
    33,
    "3.12"
  ),
  englishLatinCard(
    3,
    3,
    "out of Italy",
    ["ex Ītaliā"],
    "ex Ītaliā",
    "Ex is used before a vowel and governs the ablative Ītaliā.",
    31,
    "3.6"
  ),
  englishLatinCard(
    3,
    4,
    "The sailor carries water to the table.",
    [],
    "nauta aquam ad mēnsam portat.",
    "Nauta is nominative, aquam is the object, and ad mēnsam expresses movement towards the table.",
    31,
    "3.8",
    "self"
  ),
  englishLatinCard(
    3,
    5,
    "The women were walking along the road and watching the battle.",
    [],
    "fēminae per viam ambulābant et pugnam spectābant.",
    "The plural subject governs both imperfect verbs; per takes viam in the accusative.",
    33,
    "3.9",
    "self"
  ),
  derivationCard(
    3,
    1,
    "Which Latin verb supplies the root of 'perambulation'?",
    ["ambulō"],
    "ambulō",
    "Per means 'through' and ambulō means 'I walk'; a perambulation is a walk through or around a place.",
    33,
    "3.11"
  ),
  derivationCard(
    3,
    2,
    "Which Latin verb is the root of 'narration'?",
    ["nārrō"],
    "nārrō",
    "Nārrō means 'I tell.'",
    33,
    "3.11"
  ),
  derivationCard(
    3,
    3,
    "Which Latin verb is the root of 'invocation'?",
    ["vocō"],
    "vocō",
    "Vocō means 'I call'; the prefix in- forms the idea of calling upon something.",
    33,
    "3.11"
  ),

  // Chapter 4: second conjugation, second declension and the simple past.
  formCard(
    4,
    1,
    "moneō: third person plural, present tense",
    ["monent"],
    "monent",
    "The present stem monē- takes -nt, producing monent.",
    37,
    "4.1"
  ),
  formCard(
    4,
    2,
    "teneō: second person plural, imperfect tense",
    ["tenēbātis"],
    "tenēbātis",
    "The second-conjugation imperfect uses tenē- plus -bātis.",
    37,
    "4.3"
  ),
  formCard(
    4,
    3,
    "doceō: first person plural, future tense",
    ["docēbimus"],
    "docēbimus",
    "The second-conjugation future uses docē- plus -bimus.",
    37,
    "4.2"
  ),
  formCard(
    4,
    4,
    "moneō: third person plural, perfect tense",
    ["monuērunt"],
    "monuērunt",
    "The irregular perfect stem monu- takes -ērunt.",
    37,
    "4.3"
  ),
  formCard(
    4,
    5,
    "dominus: vocative singular",
    ["domine"],
    "domine",
    "Second-declension nouns in -us normally use -e in the vocative singular.",
    39,
    "4.6"
  ),
  formCard(
    4,
    6,
    "nūntius: genitive plural",
    ["nūntiōrum"],
    "nūntiōrum",
    "The second-declension genitive plural ending is -ōrum.",
    39,
    "4.7"
  ),
  latinEnglishCard(
    4,
    1,
    "timēbat",
    [
      "he was afraid",
      "she was afraid",
      "it was afraid",
      "he was fearing",
      "she was fearing",
      "he used to fear",
      "she used to fear"
    ],
    "he/she was afraid",
    "The imperfect ending -bat marks a continuous third-person singular action.",
    37,
    "4.3"
  ),
  latinEnglishCard(
    4,
    2,
    "docēbunt",
    ["they will teach", "they will be teaching"],
    "they will teach",
    "The future ending -bunt marks third person plural.",
    37,
    "4.3"
  ),
  latinEnglishCard(
    4,
    3,
    "dōnum servus amābit.",
    ["the slave will love the gift", "a slave will love the gift", "the slave will like the gift"],
    "The slave will love the gift.",
    "Servus is the nominative subject; dōnum is the neuter object and amābit is future singular.",
    41,
    "4.10"
  ),
  latinEnglishCard(
    4,
    4,
    "nūntiōrum",
    ["of the messengers", "of messengers", "of the messages", "of messages"],
    "of the messengers",
    "The ending -ōrum is genitive plural.",
    39,
    "4.7"
  ),
  latinEnglishCard(
    4,
    5,
    "tēlum dominī servum vulnerābat.",
    [],
    "The master's spear was wounding the slave.",
    "Tēlum is the neuter subject, dominī is possessive genitive, and servum is the accusative object.",
    41,
    "4.10",
    "self"
  ),
  latinEnglishCard(
    4,
    6,
    "incolās auxiliō agricolārum superābant.",
    [],
    "They were overcoming the inhabitants with the farmers' help.",
    "The subject is carried by superābant; incolās is the object and auxiliō is ablative of means.",
    41,
    "4.10",
    "self"
  ),
  englishLatinCard(
    4,
    1,
    "of the gifts",
    ["dōnōrum"],
    "dōnōrum",
    "The neuter second-declension genitive plural ending is -ōrum.",
    41,
    "4.9"
  ),
  englishLatinCard(
    4,
    2,
    "towards the messenger",
    ["ad nūntium"],
    "ad nūntium",
    "Ad governs the accusative, so nūntius becomes nūntium.",
    39,
    "4.6"
  ),
  englishLatinCard(
    4,
    3,
    "they have warned",
    ["monuērunt"],
    "monuērunt",
    "Use the perfect stem monu- and third-person plural ending -ērunt.",
    37,
    "4.2"
  ),
  englishLatinCard(
    4,
    4,
    "The slaves fear the master.",
    [],
    "servī dominum timent.",
    "Servī is nominative plural, dominum is accusative singular, and timent agrees with the plural subject.",
    39,
    "4.8",
    "self"
  ),
  englishLatinCard(
    4,
    5,
    "The woman gave a gift to the farmer.",
    [],
    "fēmina dōnum agricolae dedit.",
    "A completed simple-past action uses the perfect dedit; agricolae is the dative indirect object.",
    43,
    "4.13",
    "self"
  ),
  derivationCard(
    4,
    1,
    "Which Latin verb is the root of 'monitor'?",
    ["moneō"],
    "moneō",
    "Moneō means 'I warn' or 'I advise.'",
    43,
    "4.14"
  ),
  derivationCard(
    4,
    2,
    "Which Latin verb is the root of 'delete'?",
    ["dēleō"],
    "dēleō",
    "Dēleō means 'I destroy.'",
    43,
    "4.14"
  ),
  derivationCard(
    4,
    3,
    "Which Latin noun is the root of 'servile'?",
    ["servus"],
    "servus",
    "Servus means 'slave'; servile describes behaviour associated with a slave or excessive submission.",
    43,
    "4.14"
  ),

  // Chapter 5: adjective agreement, nouns in -er and plural-only nouns.
  formCard(
    5,
    1,
    "bonus, -a, -um: masculine accusative plural",
    ["bonōs"],
    "bonōs",
    "A masculine adjective agreeing with an accusative plural noun ends in -ōs.",
    47,
    "5.1"
  ),
  formCard(
    5,
    2,
    "fessus, -a, -um: feminine dative singular",
    ["fessae"],
    "fessae",
    "The feminine dative singular follows the first-declension ending -ae.",
    47,
    "5.1"
  ),
  formCard(
    5,
    3,
    "īrātus, -a, -um: neuter ablative plural",
    ["īrātīs"],
    "īrātīs",
    "All three genders use -īs in the ablative plural.",
    47,
    "5.1"
  ),
  formCard(
    5,
    4,
    "vester, vestra, vestrum: masculine genitive singular",
    ["vestrī"],
    "vestrī",
    "Vester drops the e in its stem and uses masculine genitive singular -ī.",
    51,
    "5.8"
  ),
  formCard(
    5,
    5,
    "meus, mea, meum: feminine ablative singular",
    ["meā"],
    "meā",
    "The feminine ablative singular ends in long -ā.",
    51,
    "5.8"
  ),
  formCard(
    5,
    6,
    "pulcher, pulchra, pulchrum: masculine accusative singular",
    ["pulchrum"],
    "pulchrum",
    "Pulcher drops the e outside the masculine nominative/vocative singular; accusative singular ends in -um.",
    51,
    "5.8"
  ),
  latinEnglishCard(
    5,
    1,
    "cum dominō bonō",
    ["with the good master", "with a good master", "with the good lord", "with a good lord"],
    "with the good master",
    "Cum governs the ablative, and bonō agrees with masculine ablative dominō.",
    47,
    "5.3"
  ),
  latinEnglishCard(
    5,
    2,
    "in bellō magnō",
    ["in the great war", "in a great war", "in the big war"],
    "in a great war",
    "Bellō is neuter ablative singular after in; magnō matches its gender, case and number.",
    47,
    "5.3"
  ),
  latinEnglishCard(
    5,
    3,
    "puerōs malōs",
    ["the bad boys", "bad boys"],
    "the bad boys (object)",
    "Both words are masculine accusative plural and end in -ōs.",
    49,
    "5.6"
  ),
  latinEnglishCard(
    5,
    4,
    "castra magna",
    ["a big camp", "the big camp", "a large camp", "the large camp", "a great camp"],
    "a big camp",
    "Castra is a plural-only neuter noun meaning one camp; magna agrees in the neuter plural.",
    53,
    "5.11"
  ),
  latinEnglishCard(
    5,
    5,
    "magister bonus puerum fessum vocāvit.",
    [],
    "The good master called the tired boy.",
    "Bonus agrees with nominative magister; fessum agrees with accusative puerum.",
    49,
    "5.6",
    "self"
  ),
  latinEnglishCard(
    5,
    6,
    "puella mala librum sub mēnsā cēlāvit.",
    [],
    "The bad girl hid the book under the table.",
    "Mala agrees with the feminine subject; librum is the object and sub mēnsā expresses location.",
    51,
    "5.10",
    "self"
  ),
  englishLatinCard(
    5,
    1,
    "with our arrows",
    ["sagittīs nostrīs"],
    "sagittīs nostrīs",
    "Both the noun and adjective are feminine ablative plural and end in -īs.",
    51,
    "5.9"
  ),
  englishLatinCard(
    5,
    2,
    "the beautiful gifts",
    ["dōna pulchra"],
    "dōna pulchra",
    "Dōna is neuter plural, so pulcher takes the neuter plural form pulchra.",
    51,
    "5.9"
  ),
  englishLatinCard(
    5,
    3,
    "of the angry girls",
    ["puellārum īrātārum", "īrātārum puellārum"],
    "puellārum īrātārum",
    "Both words must be feminine genitive plural and end in -ārum.",
    47,
    "5.3"
  ),
  englishLatinCard(
    5,
    4,
    "The tired sailors sail around the beautiful island.",
    [],
    "nautae fessī circum īnsulam pulchram nāvigant.",
    "Fessī is masculine nominative plural with nautae; pulchram is feminine accusative singular after circum.",
    51,
    "5.9",
    "self"
  ),
  englishLatinCard(
    5,
    5,
    "Our forces built a big camp near the water.",
    [],
    "cōpiae nostrae castra magna prope aquam aedificāvērunt.",
    "Cōpiae nostrae is a feminine plural subject; castra magna is a neuter plural object meaning one camp.",
    53,
    "5.11",
    "self"
  ),
  derivationCard(
    5,
    1,
    "Which Latin infinitive is the root of 'portable'?",
    ["portāre"],
    "portāre",
    "Portāre means 'to carry'; something portable can be carried.",
    53,
    "5.12"
  ),
  derivationCard(
    5,
    2,
    "Which Latin noun is the root of 'annual'?",
    ["annus"],
    "annus",
    "Annus means 'year,' so annual means yearly.",
    53,
    "5.12"
  ),
  derivationCard(
    5,
    3,
    "Which Latin noun meaning 'gift' helps explain 'donation'?",
    ["dōnum"],
    "dōnum",
    "Dōnum means 'gift'; a donation is something given as a gift.",
    53,
    "5.12"
  )
];

function passageStep(id, prompt, modelAnswer, explanation) {
  return {
    id,
    prompt,
    promptLanguage: "latin",
    grading: "self",
    answers: [],
    modelAnswer,
    explanation,
    audioText: prompt
  };
}

export const PASSAGES_1_5 = [
  {
    id: "c1-passage-01",
    chapter: 1,
    category: "passage",
    title: "Preparation and victory",
    source: adaptedSource(13, "1.14-1.15"),
    steps: [
      passageStep(
        "c1-passage-01-step-01",
        "labōrābāmus et aedificābāmus.",
        "We were working and building.",
        "Both verbs are first person plural imperfect, ending in -bāmus."
      ),
      passageStep(
        "c1-passage-01-step-02",
        "nōn festīnāvimus sed parāvimus.",
        "We did not hurry, but we prepared.",
        "Both verbs are first person plural perfect; nōn negates the first clause."
      ),
      passageStep(
        "c1-passage-01-step-03",
        "pugnāvimus et superāvimus.",
        "We fought and overcame.",
        "The perfect ending -imus supplies the subject 'we' in both clauses."
      )
    ]
  },
  {
    id: "c2-passage-01",
    chapter: 2,
    category: "passage",
    title: "The farmer, girl and sailor",
    source: adaptedSource(23, "2.10-2.11"),
    steps: [
      passageStep(
        "c2-passage-01-step-01",
        "agricola viam aedificābat.",
        "The farmer was building a road.",
        "Agricola is the subject, viam the object, and aedificābat the singular imperfect verb."
      ),
      passageStep(
        "c2-passage-01-step-02",
        "puella agricolam spectābat.",
        "The girl was watching the farmer.",
        "Puella is nominative singular, while agricolam is the accusative singular object."
      ),
      passageStep(
        "c2-passage-01-step-03",
        "nauta puellam vocāvit.",
        "The sailor called the girl.",
        "Nauta is nominative singular, puellam is accusative singular, and vocāvit is perfect."
      )
    ]
  },
  {
    id: "c3-passage-01",
    chapter: 3,
    category: "passage",
    title: "Along the road",
    source: adaptedSource(33, "3.9-3.10"),
    steps: [
      passageStep(
        "c3-passage-01-step-01",
        "nauta cum agricolā per viam ambulābat.",
        "The sailor was walking along the road with the farmer.",
        "Cum takes the ablative agricolā, while per takes the accusative viam."
      ),
      passageStep(
        "c3-passage-01-step-02",
        "agricola aquam ad mēnsam portābat.",
        "The farmer was carrying water to the table.",
        "Aquam is the object, and ad mēnsam expresses movement towards the table."
      ),
      passageStep(
        "c3-passage-01-step-03",
        "nauta fābulam nārrāvit, sed puella nōn spectābat.",
        "The sailor told a story, but the girl was not watching.",
        "The completed action uses perfect nārrāvit; the continuing action uses imperfect spectābat."
      )
    ]
  },
  {
    id: "c4-passage-01",
    chapter: 4,
    category: "passage",
    title: "Water for the slave",
    source: adaptedSource(43, "4.12-4.13"),
    steps: [
      passageStep(
        "c4-passage-01-step-01",
        "servus in īnsulā habitābat et aquam nōn habēbat.",
        "A slave was living on an island and did not have water.",
        "Both ongoing background actions use the imperfect; in governs ablative īnsulā for location."
      ),
      passageStep(
        "c4-passage-01-step-02",
        "nautam vocāvit et auxilium exspectāvit.",
        "He called a sailor and waited for help.",
        "The two completed actions use perfect verbs; nautam and auxilium are accusative objects."
      ),
      passageStep(
        "c4-passage-01-step-03",
        "nauta servō aquam dedit; servus nōn timuit.",
        "The sailor gave the slave water; the slave was not afraid.",
        "Servō is the dative recipient, aquam the object, and both actions use the perfect tense."
      )
    ]
  },
  {
    id: "c5-passage-01",
    chapter: 5,
    category: "passage",
    title: "The master and the tired boy",
    source: adaptedSource(49, "5.6-5.7"),
    steps: [
      passageStep(
        "c5-passage-01-step-01",
        "magister bonus puerum fessum vocāvit.",
        "The good master called the tired boy.",
        "Bonus agrees with nominative magister; fessum agrees with accusative puerum."
      ),
      passageStep(
        "c5-passage-01-step-02",
        "puer in agrō magnō sedēbat et librum longum tenēbat.",
        "The boy was sitting in a big field and holding a long book.",
        "Magnō agrees with ablative agrō; longum agrees with accusative librum."
      ),
      passageStep(
        "c5-passage-01-step-03",
        "magister īrātus puerō auxilium nōn dedit.",
        "The angry master did not give help to the boy.",
        "Īrātus agrees with the subject; puerō is dative and auxilium is the neuter object."
      )
    ]
  }
];
