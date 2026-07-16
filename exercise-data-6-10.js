const source = (printedPage, exercise) =>
  Object.freeze({ printedPage, exercise, adapted: true });

const core = (
  id,
  chapter,
  category,
  grading,
  instruction,
  prompt,
  promptLanguage,
  answers,
  modelAnswer,
  explanation,
  audioText,
  printedPage,
  exercise
) =>
  Object.freeze({
    id,
    chapter,
    category,
    grading,
    instruction,
    prompt,
    promptLanguage,
    answers: Object.freeze(answers),
    modelAnswer,
    explanation,
    audioText,
    source: source(printedPage, exercise)
  });

export const EXERCISES_6_10 = Object.freeze([
  // Chapter 6: third and fourth conjugations; questions; the historic present.
  core(
    "ch6-forms-01", 6, "forms", "auto", "Give the requested Latin form.",
    "regō — future, 1st person singular", "english", ["regam"], "regam",
    "Third-conjugation futures use -am in the first person singular.", "regam", 57, "6.2"
  ),
  core(
    "ch6-forms-02", 6, "forms", "auto", "Give the requested Latin form.",
    "cadō — perfect, 3rd person plural", "english", ["cecidērunt"], "cecidērunt",
    "Use the third principal part, cecidī, to form the perfect stem cecid-.", "cecidērunt", 57, "6.4"
  ),
  core(
    "ch6-forms-03", 6, "forms", "auto", "Give the requested Latin form.",
    "dūcō — imperfect, 1st person plural", "english", ["dūcēbāmus"], "dūcēbāmus",
    "Third-conjugation imperfect forms use the present stem plus -ēbā- and a personal ending.", "dūcēbāmus", 57, "6.3"
  ),
  core(
    "ch6-forms-04", 6, "forms", "auto", "Give the requested Latin form.",
    "audiō — present, 3rd person plural", "english", ["audiunt"], "audiunt",
    "The fourth-conjugation third person plural ends in -iunt.", "audiunt", 61, "6.8"
  ),
  core(
    "ch6-forms-05", 6, "forms", "auto", "Give the requested Latin form.",
    "veniō — future, 2nd person singular", "english", ["veniēs"], "veniēs",
    "Fourth-conjugation futures follow the audiō pattern: veniēs means 'you will come'.", "veniēs", 61, "6.8"
  ),
  core(
    "ch6-forms-06", 6, "forms", "auto", "Give the requested Latin form.",
    "scrībō — perfect, 1st person plural", "english", ["scrīpsimus"], "scrīpsimus",
    "The third principal part scrīpsī supplies the perfect stem scrīps-.", "scrīpsimus", 63, "6.12-6.13"
  ),

  core(
    "ch6-latin-english-01", 6, "latin-english", "auto", "Translate into English.",
    "cūr amīcus currit?", "latin", ["why is the friend running", "why does the friend run", "why is a friend running"],
    "Why is the friend running?", "cūr asks for a reason; currit is present singular.", "cūr amīcus currit?", 59, "6.5"
  ),
  core(
    "ch6-latin-english-02", 6, "latin-english", "auto", "Translate into English.",
    "nōnne magister librum scrīpsit?", "latin",
    ["the teacher wrote the book didn't he", "hasn't the teacher written the book", "surely the teacher wrote the book"],
    "The teacher wrote the book, didn't he?", "nōnne introduces a question that expects the answer yes.",
    "nōnne magister librum scrīpsit?", 59, "6.5"
  ),
  core(
    "ch6-latin-english-03", 6, "latin-english", "auto", "Translate into English.",
    "num puerī dormiunt?", "latin",
    ["the boys are not sleeping are they", "surely the boys are not sleeping", "the boys aren't sleeping are they"],
    "The boys are not sleeping, are they?", "num introduces a question that expects the answer no.",
    "num puerī dormiunt?", 59, "6.5"
  ),
  core(
    "ch6-latin-english-04", 6, "latin-english", "self", "Translate, then compare with the model.",
    "puella surgit et ad magistrum venit.", "latin", [],
    "The girl gets up and comes to the teacher.",
    "In a past-tense story, surgit and venit could be historic presents: 'the girl got up and came'.",
    "puella surgit et ad magistrum venit.", 61, "6.9"
  ),
  core(
    "ch6-latin-english-05", 6, "latin-english", "auto", "Translate into English.",
    "mīlitēs bellum gerēbant.", "latin",
    ["the soldiers were waging war", "the soldiers waged war", "soldiers were waging a war"],
    "The soldiers were waging war.", "gerō can mean 'I wage' when its object is bellum.",
    "mīlitēs bellum gerēbant.", 57, "6.3"
  ),
  core(
    "ch6-latin-english-06", 6, "latin-english", "auto", "Translate into English.",
    "ubī amīcōs audīvistis?", "latin",
    ["where did you hear the friends", "where have you heard the friends", "where did you all hear the friends"],
    "Where did you hear the friends?", "audīvistis is second person plural perfect.",
    "ubī amīcōs audīvistis?", 61, "6.8-6.9"
  ),

  core(
    "ch6-english-latin-01", 6, "english-latin", "auto", "Translate into Latin.",
    "The king will lead the soldiers.", "english", ["rēx mīlitēs dūcet", "mīlitēs rēx dūcet"],
    "rēx mīlitēs dūcet.", "dūcet is the third-conjugation future, third person singular.",
    "rēx mīlitēs dūcet.", 59, "6.6"
  ),
  core(
    "ch6-english-latin-02", 6, "english-latin", "auto", "Translate into Latin.",
    "Why are you (singular) shouting?", "english", ["cūr clāmās"],
    "cūr clāmās?", "cūr means 'why'; clāmās addresses one person.", "cūr clāmās?", 59, "6.6"
  ),
  core(
    "ch6-english-latin-03", 6, "english-latin", "auto", "Translate into Latin.",
    "The friends were sleeping.", "english", ["amīcī dormiēbant"],
    "amīcī dormiēbant.", "The fourth-conjugation imperfect uses -iēbā-.",
    "amīcī dormiēbant.", 61, "6.8"
  ),
  core(
    "ch6-english-latin-04", 6, "english-latin", "auto", "Translate into Latin using -ne.",
    "Will the girl come?", "english", ["venietne puella", "puellane veniet"],
    "venietne puella?", "Attach -ne to the first word to ask a neutral yes-or-no question.",
    "venietne puella?", 59, "6.6"
  ),
  core(
    "ch6-english-latin-05", 6, "english-latin", "self", "Translate, then compare with the model.",
    "The soldier fell and got up.", "english", [],
    "mīles cecidit et surrēxit.", "Both verbs use irregular perfect stems from their third principal parts.",
    "mīles cecidit et surrēxit.", 63, "6.11-6.13"
  ),

  core(
    "ch6-derivation-01", 6, "derivation", "auto", "Give the Latin source word.",
    "audition", "english", ["audiō"], "audiō",
    "An audition is a hearing or a chance to be heard; audiō means 'I hear'.", "audiō", 63, "6.14"
  ),
  core(
    "ch6-derivation-02", 6, "derivation", "auto", "Give the Latin source word.",
    "scribe", "english", ["scrībō"], "scrībō",
    "A scribe writes; scrībō means 'I write'.", "scrībō", 63, "6.14"
  ),
  core(
    "ch6-derivation-03", 6, "derivation", "auto", "Give the Latin source word.",
    "regent", "english", ["regō"], "regō",
    "A regent rules on another's behalf; regō means 'I rule'.", "regō", 63, "6.14"
  ),

  // Chapter 7: mixed conjugation; direct speech; numerals; irregular second-declension nouns.
  core(
    "ch7-forms-01", 7, "forms", "auto", "Give the requested Latin form.",
    "cupiō — present, 3rd person plural", "english", ["cupiunt"], "cupiunt",
    "Mixed-conjugation verbs use -iunt in the third person plural present.", "cupiunt", 67, "7.1"
  ),
  core(
    "ch7-forms-02", 7, "forms", "auto", "Give the requested Latin form.",
    "fugiō — future, 1st person plural", "english", ["fugiēmus"], "fugiēmus",
    "Mixed-conjugation futures follow the capiō pattern.", "fugiēmus", 67, "7.1"
  ),
  core(
    "ch7-forms-03", 7, "forms", "auto", "Give the requested Latin form.",
    "faciō — imperfect, 2nd person singular", "english", ["faciēbās"], "faciēbās",
    "The mixed-conjugation imperfect inserts -iēbā- before the personal ending.", "faciēbās", 67, "7.1"
  ),
  core(
    "ch7-forms-04", 7, "forms", "auto", "Give the requested Latin form.",
    "capiō — perfect, 3rd person plural", "english", ["cēpērunt"], "cēpērunt",
    "Use cēp-, from the third principal part cēpī, for the perfect tense.", "cēpērunt", 67, "7.1"
  ),
  core(
    "ch7-forms-05", 7, "forms", "auto", "Give the requested Latin form.",
    "fīlius — vocative singular", "english", ["fīlī"], "fīlī",
    "The vocative singular of fīlius is the irregular form fīlī.", "fīlī", 71, "7.9"
  ),
  core(
    "ch7-forms-06", 7, "forms", "auto", "Give the requested Latin form.",
    "dea — dative plural", "english", ["deābus"], "deābus",
    "dea uses deābus in the dative and ablative plural to distinguish it from deus.", "deābus", 71, "7.9"
  ),

  core(
    "ch7-latin-english-01", 7, "latin-english", "auto", "Translate into English.",
    "quid facitis, puerī?", "latin", ["what are you doing boys", "what do you do boys"],
    "What are you doing, boys?", "facitis is second person plural; puerī is vocative plural.",
    "quid facitis, puerī?", 67, "7.2"
  ),
  core(
    "ch7-latin-english-02", 7, "latin-english", "self", "Translate, then compare with the model.",
    "\"oppidum capere cupimus,\" inquiunt mīlitēs.", "latin", [],
    "\"We want to capture the town,\" say the soldiers.",
    "inquiunt interrupts direct speech and means 'they say' (or 'they said' in a past story).",
    "\"oppidum capere cupimus,\" inquiunt mīlitēs.", 67, "7.2"
  ),
  core(
    "ch7-latin-english-03", 7, "latin-english", "auto", "Translate into English.",
    "fīlius virī equum novum habet.", "latin",
    ["the man's son has a new horse", "the son of the man has a new horse"],
    "The man's son has a new horse.", "virī is genitive singular, while novum agrees with equum.",
    "fīlius virī equum novum habet.", 71, "7.10"
  ),
  core(
    "ch7-latin-english-04", 7, "latin-english", "auto", "Translate into English.",
    "deīs dona parābimus.", "latin",
    ["we will prepare gifts for the gods", "we shall prepare gifts for the gods"],
    "We will prepare gifts for the gods.", "deīs is dative plural and expresses the recipients.",
    "deīs dona parābimus.", 71, "7.9"
  ),
  core(
    "ch7-latin-english-05", 7, "latin-english", "auto", "Translate into English.",
    "septem puellae per silvam errābant.", "latin",
    ["seven girls were wandering through the forest", "seven girls wandered through the forest"],
    "Seven girls were wandering through the forest.", "septem does not decline; per takes the accusative silvam.",
    "septem puellae per silvam errābant.", 69, "7.5"
  ),
  core(
    "ch7-latin-english-06", 7, "latin-english", "auto", "Translate into English.",
    "tandem hostēs ex oppidō fugiunt.", "latin",
    ["at last the enemy flee from the town", "at last the enemies flee from the town", "at last the enemy fled from the town"],
    "At last the enemy flee from the town.", "fugiunt is present but may be translated as a historic present in a story.",
    "tandem hostēs ex oppidō fugiunt.", 67, "7.4"
  ),

  core(
    "ch7-english-latin-01", 7, "english-latin", "self", "Translate, then compare with the model.",
    "The goddess will save the small town.", "english", [],
    "dea oppidum parvum servābit.", "parvum is neuter accusative singular to agree with oppidum.",
    "dea oppidum parvum servābit.", 67, "7.3"
  ),
  core(
    "ch7-english-latin-02", 7, "english-latin", "auto", "Translate into Latin.",
    "We want to capture the horse.", "english", ["equum capere cupimus", "capere equum cupimus"],
    "equum capere cupimus.", "cupiō is followed naturally by a present infinitive such as capere.",
    "equum capere cupimus.", 67, "7.3"
  ),
  core(
    "ch7-english-latin-03", 7, "english-latin", "auto", "Translate into Latin.",
    "The men were opening the gates.", "english", ["virī portās aperiēbant"],
    "virī portās aperiēbant.", "aperiō follows the fourth conjugation; its imperfect is aperiēbant.",
    "virī portās aperiēbant.", 67, "7.1-7.3"
  ),
  core(
    "ch7-english-latin-04", 7, "english-latin", "auto", "Translate into Latin.",
    "The sons fled into the forest.", "english", ["fīliī īn silvam fūgērunt", "īn silvam fīliī fūgērunt"],
    "fīliī īn silvam fūgērunt.", "Motion into a place uses in with the accusative; before s, the book marks īn with a long vowel.",
    "fīliī īn silvam fūgērunt.", 71, "7.10"
  ),
  core(
    "ch7-english-latin-05", 7, "english-latin", "auto", "Translate into Latin.",
    "The second sailor drives the horse.", "english", ["nauta secundus equum pellit", "secundus nauta equum pellit"],
    "nauta secundus equum pellit.", "secundus is masculine nominative singular to agree with nauta.",
    "nauta secundus equum pellit.", 69, "7.5"
  ),

  core(
    "ch7-derivation-01", 7, "derivation", "auto", "Give the Latin source word.",
    "captive", "english", ["capiō"], "capiō",
    "A captive is someone who has been taken; capiō means 'I capture' or 'I take'.", "capiō", 71, "7.11"
  ),
  core(
    "ch7-derivation-02", 7, "derivation", "auto", "Give the Latin source word.",
    "equine", "english", ["equus"], "equus",
    "equine means 'relating to horses'; equus means 'horse'.", "equus", 71, "7.11"
  ),
  core(
    "ch7-derivation-03", 7, "derivation", "auto", "Give the Latin source word.",
    "mural", "english", ["mūrus"], "mūrus",
    "A mural is associated with a wall; mūrus means 'wall'.", "mūrus", 71, "7.11"
  ),

  // Chapter 8: third-declension nouns; adjective agreement; apposition.
  core(
    "ch8-forms-01", 8, "forms", "auto", "Give the requested Latin form.",
    "rēx — accusative plural", "english", ["rēgēs"], "rēgēs",
    "Masculine and feminine third-declension accusative plurals end in -ēs.", "rēgēs", 75, "8.1"
  ),
  core(
    "ch8-forms-02", 8, "forms", "auto", "Give the requested Latin form.",
    "opus — nominative plural", "english", ["opera"], "opera",
    "Increasing neuter third-declension nominative plurals end in -a.", "opera", 75, "8.4"
  ),
  core(
    "ch8-forms-03", 8, "forms", "auto", "Give the requested Latin form.",
    "cīvis — genitive plural", "english", ["cīvium"], "cīvium",
    "The non-increasing i-stem noun cīvis has genitive plural cīvium.", "cīvium", 79, "8.9"
  ),
  core(
    "ch8-forms-04", 8, "forms", "auto", "Give the requested Latin form.",
    "cubīle — nominative plural", "english", ["cubīlia"], "cubīlia",
    "Neuter i-stems such as cubīle have nominative plural -ia.", "cubīlia", 79, "8.9"
  ),
  core(
    "ch8-forms-05", 8, "forms", "auto", "Give the requested Latin form.",
    "urbs — genitive plural", "english", ["urbium"], "urbium",
    "The monosyllable urbs has a stem ending in two consonants, so its genitive plural is urbium.", "urbium", 79, "8.9"
  ),
  core(
    "ch8-forms-06", 8, "forms", "auto", "Give the requested Latin form.",
    "frāter — genitive plural", "english", ["frātrum"], "frātrum",
    "frāter is a family-word exception and takes the genitive plural ending -um.", "frātrum", 79, "8.9"
  ),

  core(
    "ch8-latin-english-01", 8, "latin-english", "auto", "Translate into English.",
    "rēx bonus mīlitēs monuit.", "latin",
    ["the good king warned the soldiers", "a good king warned the soldiers"],
    "The good king warned the soldiers.", "bonus is masculine nominative singular and agrees with rēx, even though the endings do not rhyme.",
    "rēx bonus mīlitēs monuit.", 75, "8.3"
  ),
  core(
    "ch8-latin-english-02", 8, "latin-english", "auto", "Translate into English.",
    "cum duce īrātō ambulāvērunt.", "latin",
    ["they walked with the angry leader", "they walked with an angry leader"],
    "They walked with the angry leader.", "cum takes the ablative; duce and īrātō agree in case but have different declension endings.",
    "cum duce īrātō ambulāvērunt.", 77, "8.5-8.6"
  ),
  core(
    "ch8-latin-english-03", 8, "latin-english", "auto", "Translate into English.",
    "opera nova prope flūmen parāvērunt.", "latin",
    ["they prepared new works near the river", "they prepared the new works near the river"],
    "They prepared new works near the river.", "opera is neuter plural, so nova is also neuter plural; prope takes the accusative.",
    "opera nova prope flūmen parāvērunt.", 77, "8.5-8.6"
  ),
  core(
    "ch8-latin-english-04", 8, "latin-english", "self", "Translate, then compare with the model.",
    "māter Mārcī, puerī bonī, venit.", "latin", [],
    "The mother of Marcus, a good boy, comes.",
    "puerī bonī is in apposition to Mārcī, so the whole descriptive phrase is genitive.",
    "māter Mārcī, puerī bonī, venit.", 77, "8.7"
  ),
  core(
    "ch8-latin-english-05", 8, "latin-english", "auto", "Translate into English.",
    "hostēs urbem altam oppugnābant.", "latin",
    ["the enemy were attacking the high city", "the enemies were attacking the high city", "the enemy attacked the high city"],
    "The enemy were attacking the high city.", "altam is feminine accusative singular and agrees with urbem.",
    "hostēs urbem altam oppugnābant.", 75, "8.2-8.3"
  ),
  core(
    "ch8-latin-english-06", 8, "latin-english", "auto", "Translate into English.",
    "puer nōmine Gāius pontem frēgit.", "latin",
    ["the boy called gaius broke the bridge", "a boy named gaius broke the bridge", "the boy named gaius broke the bridge"],
    "The boy called Gaius broke the bridge.", "nōmine, literally 'by name', is the book's normal way to express 'called'.",
    "puer nōmine Gāius pontem frēgit.", 77, "8.7"
  ),

  core(
    "ch8-english-latin-01", 8, "english-latin", "auto", "Translate into Latin.",
    "The proud king was ruling the city.", "english", ["rēx superbus urbem regēbat", "urbem rēx superbus regēbat"],
    "rēx superbus urbem regēbat.", "superbus agrees with the masculine nominative subject rēx.",
    "rēx superbus urbem regēbat.", 75, "8.2"
  ),
  core(
    "ch8-english-latin-02", 8, "english-latin", "auto", "Translate into Latin.",
    "We saw the tired soldiers.", "english", ["mīlitēs fessōs vīdimus", "vīdimus mīlitēs fessōs"],
    "mīlitēs fessōs vīdimus.", "fessōs is masculine accusative plural to agree with mīlitēs.",
    "mīlitēs fessōs vīdimus.", 77, "8.5"
  ),
  core(
    "ch8-english-latin-03", 8, "english-latin", "auto", "Translate into Latin.",
    "The father walked with the brother.", "english", ["pater cum frātre ambulāvit", "cum frātre pater ambulāvit"],
    "pater cum frātre ambulāvit.", "cum takes the ablative frātre.",
    "pater cum frātre ambulāvit.", 79, "8.9-8.10"
  ),
  core(
    "ch8-english-latin-04", 8, "english-latin", "auto", "Translate into Latin.",
    "We heard the names of the cities.", "english", ["nōmina urbium audīvimus", "audīvimus nōmina urbium"],
    "nōmina urbium audīvimus.", "nōmina is neuter accusative plural; urbium is the i-stem genitive plural.",
    "nōmina urbium audīvimus.", 79, "8.9"
  ),
  core(
    "ch8-english-latin-05", 8, "english-latin", "self", "Translate, then compare with the model.",
    "A woman called Julia walked across the bridge.", "english", [],
    "fēmina nōmine Iūlia per pontem ambulāvit.", "nōmine introduces the name; per takes the accusative pontem.",
    "fēmina nōmine Iūlia per pontem ambulāvit.", 77, "8.7"
  ),

  core(
    "ch8-derivation-01", 8, "derivation", "auto", "Give the Latin source word.",
    "urban", "english", ["urbs"], "urbs",
    "urban means 'relating to a city'; urbs means 'city'.", "urbs", 79, "8.12"
  ),
  core(
    "ch8-derivation-02", 8, "derivation", "auto", "Give the Latin source word.",
    "paternal", "english", ["pater"], "pater",
    "paternal means 'relating to a father'; pater means 'father'.", "pater", 79, "8.12"
  ),
  core(
    "ch8-derivation-03", 8, "derivation", "auto", "Give the Latin source word.",
    "altitude", "english", ["altus"], "altus",
    "Altitude is height; altus means 'high' (and can also mean 'deep').", "altus", 79, "8.12"
  ),

  // Chapter 9: conjunctions linking sentences and clauses; cumulative revision.
  core(
    "ch9-forms-01", 9, "forms", "auto", "Give the requested Latin form.",
    "habitō — perfect, 3rd person singular", "english", ["habitāvit"], "habitāvit",
    "The perfect of a regular first-conjugation verb uses the stem habitāv-.", "habitāvit", 87, "9.9"
  ),
  core(
    "ch9-forms-02", 9, "forms", "auto", "Give the requested Latin form.",
    "veniō — future, 2nd person plural", "english", ["veniētis"], "veniētis",
    "Fourth-conjugation future forms use -iē- before the personal ending.", "veniētis", 87, "9.9"
  ),
  core(
    "ch9-forms-03", 9, "forms", "auto", "Give the requested Latin form.",
    "regō — future, 2nd person plural", "english", ["regētis"], "regētis",
    "The third-conjugation future uses -ē- except in the first person singular.", "regētis", 87, "9.9"
  ),
  core(
    "ch9-forms-04", 9, "forms", "auto", "Give the requested Latin form.",
    "māneō — perfect, 3rd person singular", "english", ["mānsit"], "mānsit",
    "The irregular perfect stem is māns-, from the third principal part mānsī.", "mānsit", 87, "9.9"
  ),
  core(
    "ch9-forms-05", 9, "forms", "auto", "Give the requested Latin form.",
    "mīles — ablative plural", "english", ["mīlitibus"], "mīlitibus",
    "Use the stem mīlit- plus the third-declension dative/ablative plural ending -ibus.", "mīlitibus", 87, "9.9"
  ),
  core(
    "ch9-forms-06", 9, "forms", "auto", "Give the requested Latin form.",
    "corpus — genitive singular", "english", ["corporis"], "corporis",
    "The genitive corporis reveals the stem corpor-.", "corporis", 85, "9.6"
  ),

  core(
    "ch9-latin-english-01", 9, "latin-english", "self", "Translate, then compare with the model.",
    "rēx urbem oppugnāvit. cīvēs autem nōn fūgērunt.", "latin", [],
    "The king attacked the city. The citizens, however, did not flee.",
    "autem links the new sentence and normally stands as its second word.",
    "rēx urbem oppugnāvit. cīvēs autem nōn fūgērunt.", 83, "9.1"
  ),
  core(
    "ch9-latin-english-02", 9, "latin-english", "self", "Translate, then compare with the model.",
    "mīlitēs pontem frēgērunt. urbem enim servāre cupiēbant.", "latin", [],
    "The soldiers broke the bridge, for they wanted to save the city.",
    "enim introduces the explanation and appears second in its clause.",
    "mīlitēs pontem frēgērunt. urbem enim servāre cupiēbant.", 83, "9.1"
  ),
  core(
    "ch9-latin-english-03", 9, "latin-english", "auto", "Translate into English.",
    "puerī puellaeque per viās currēbant.", "latin",
    ["the boys and girls were running through the streets", "boys and girls ran through the streets"],
    "The boys and girls were running through the streets.", "-que attached to puellae joins puerī and puellae.",
    "puerī puellaeque per viās currēbant.", 83, "9.1"
  ),
  core(
    "ch9-latin-english-04", 9, "latin-english", "auto", "Translate into English.",
    "dux hostēs vīdit nec tamen fūgit.", "latin",
    ["the leader saw the enemy but did not flee", "the leader saw the enemies but did not flee"],
    "The leader saw the enemy but did not flee.", "nec tamen expresses 'but not'.",
    "dux hostēs vīdit nec tamen fūgit.", 85, "9.4"
  ),
  core(
    "ch9-latin-english-05", 9, "latin-english", "auto", "Translate into English.",
    "nec nautae nec agricolae arma mīsērunt.", "latin",
    ["neither the sailors nor the farmers sent weapons", "neither sailors nor farmers sent the weapons"],
    "Neither the sailors nor the farmers sent weapons.", "nec...nec means 'neither...nor'.",
    "nec nautae nec agricolae arma mīsērunt.", 85, "9.5"
  ),
  core(
    "ch9-latin-english-06", 9, "latin-english", "auto", "Translate into English.",
    "ubī rēx vēnit, mīlitēs ex urbe discessērunt.", "latin",
    ["when the king came the soldiers departed from the city", "when the king arrived the soldiers left the city"],
    "When the king came, the soldiers left the city.", "Here ubī links clauses and means 'when'.",
    "ubī rēx vēnit, mīlitēs ex urbe discessērunt.", 85, "9.6-9.7"
  ),

  core(
    "ch9-english-latin-01", 9, "english-latin", "auto", "Translate into Latin.",
    "The consul, however, remained in the city.", "english", ["cōnsul autem in urbe mānsit", "in urbe autem cōnsul mānsit"],
    "cōnsul autem in urbe mānsit.", "autem belongs second in its clause, not first.",
    "cōnsul autem in urbe mānsit.", 83, "9.2"
  ),
  core(
    "ch9-english-latin-02", 9, "english-latin", "self", "Translate, then compare with the model.",
    "The soldiers climbed the mountain, for they saw the enemy.", "english", [],
    "mīlitēs montem ascendērunt; hostēs enim vīdērunt.", "enim explains why the soldiers climbed and stands second in its clause.",
    "mīlitēs montem ascendērunt; hostēs enim vīdērunt.", 83, "9.2"
  ),
  core(
    "ch9-english-latin-03", 9, "english-latin", "auto", "Translate into Latin.",
    "Both the boys and the girls fled.", "english",
    ["et puerī et puellae fūgērunt", "puerīque puellaeque fūgērunt"],
    "et puerī et puellae fūgērunt.", "Repeated et means 'both...and'; repeated -que is also allowed by the book.",
    "et puerī et puellae fūgērunt.", 85, "9.5"
  ),
  core(
    "ch9-english-latin-04", 9, "english-latin", "auto", "Translate into Latin.",
    "The king sent weapons but did not fight.", "english", ["rēx arma mīsit nec tamen pugnāvit"],
    "rēx arma mīsit nec tamen pugnāvit.", "nec tamen is the preferred way to express 'but did not'.",
    "rēx arma mīsit nec tamen pugnāvit.", 85, "9.4"
  ),
  core(
    "ch9-english-latin-05", 9, "english-latin", "self", "Translate, then compare with the model.",
    "While the citizens were running, the leader entered the city.", "english", [],
    "dum cīvēs currēbant, dux urbem intrāvit.", "dum introduces the simultaneous action and means 'while'.",
    "dum cīvēs currēbant, dux urbem intrāvit.", 85, "9.6-9.7"
  ),

  core(
    "ch9-derivation-01", 9, "derivation", "auto", "Give the Latin source word.",
    "ascend", "english", ["ascendō"], "ascendō",
    "English 'ascend' keeps the sense of ascendō, 'I go up' or 'I climb'.", "ascendō", 85, "9.6"
  ),
  core(
    "ch9-derivation-02", 9, "derivation", "auto", "Give the Latin source word.",
    "missile", "english", ["mittō"], "mittō",
    "A missile is something sent; mittō means 'I send'.", "mittō", 85, "9.6"
  ),
  core(
    "ch9-derivation-03", 9, "derivation", "auto", "Give the Latin source word.",
    "dictation", "english", ["dīcō"], "dīcō",
    "Dictation involves saying words aloud; dīcō means 'I say'.", "dīcō", 85, "9.6"
  ),

  // Chapter 10: sum; complements; future perfect and pluperfect; tense revision.
  core(
    "ch10-forms-01", 10, "forms", "auto", "Give the requested Latin form.",
    "sum — present, 1st person plural", "english", ["sumus"], "sumus",
    "sum is irregular; sumus means 'we are'.", "sumus", 89, "10.1-10.3"
  ),
  core(
    "ch10-forms-02", 10, "forms", "auto", "Give the requested Latin form.",
    "sum — imperfect, 3rd person plural", "english", ["erant"], "erant",
    "erant is the irregular imperfect form meaning 'they were'.", "erant", 89, "10.1-10.3"
  ),
  core(
    "ch10-forms-03", 10, "forms", "auto", "Give the requested Latin form.",
    "sum — future, 2nd person singular", "english", ["eris"], "eris",
    "eris means 'you will be' when addressing one person.", "eris", 89, "10.1-10.3"
  ),
  core(
    "ch10-forms-04", 10, "forms", "auto", "Give the requested Latin form.",
    "sum — perfect, 3rd person plural", "english", ["fuērunt"], "fuērunt",
    "The third principal part fuī supplies the perfect stem fu-.", "fuērunt", 89, "10.3"
  ),
  core(
    "ch10-forms-05", 10, "forms", "auto", "Give the requested Latin form.",
    "moneō — future perfect, 3rd person singular", "english", ["monuerit"], "monuerit",
    "Add the future-perfect ending -erit to the perfect stem monu-.", "monuerit", 91, "10.5"
  ),
  core(
    "ch10-forms-06", 10, "forms", "auto", "Give the requested Latin form.",
    "regō — pluperfect, 1st person plural", "english", ["rēxerāmus"], "rēxerāmus",
    "Add -erāmus to the perfect stem rēx- to express 'we had ruled'.", "rēxerāmus", 91, "10.5"
  ),

  core(
    "ch10-latin-english-01", 10, "latin-english", "auto", "Translate into English.",
    "Mūcius mīles Rōmānus erat.", "latin",
    ["mucius was a roman soldier", "mucius was a soldier of rome"],
    "Mucius was a Roman soldier.", "A complement after erat stays in the nominative: mīles Rōmānus.",
    "Mūcius mīles Rōmānus erat.", 89, "10.1"
  ),
  core(
    "ch10-latin-english-02", 10, "latin-english", "auto", "Translate into English.",
    "iam sunt duō cōnsulēs.", "latin",
    ["now there are two consuls", "there are now two consuls"],
    "Now there are two consuls.", "A third-person form of sum at the start can mean 'there is' or 'there are'.",
    "iam sunt duō cōnsulēs.", 89, "10.1"
  ),
  core(
    "ch10-latin-english-03", 10, "latin-english", "auto", "Translate into English.",
    "mīlitēs castra cēperant.", "latin",
    ["the soldiers had captured the camp", "the soldiers had taken the camp"],
    "The soldiers had captured the camp.", "cēperant is pluperfect: cēp- plus -erant.",
    "mīlitēs castra cēperant.", 91, "10.5-10.6"
  ),
  core(
    "ch10-latin-english-04", 10, "latin-english", "auto", "Translate into English.",
    "dux servōs monuerit.", "latin",
    ["the leader will have warned the slaves", "the leader shall have warned the slaves"],
    "The leader will have warned the slaves.", "monuerit is future perfect in this Chapter 10 context.",
    "dux servōs monuerit.", 91, "10.6"
  ),
  core(
    "ch10-latin-english-05", 10, "latin-english", "auto", "Translate into English.",
    "fessī sumus sed nōn dormīmus.", "latin",
    ["we are tired but we are not sleeping", "we are tired but do not sleep", "we are tired but we do not sleep"],
    "We are tired, but we are not sleeping.", "sumus supplies 'we are'; dormīmus is already a complete verb and needs no form of sum.",
    "fessī sumus sed nōn dormīmus.", 91, "10.4"
  ),
  core(
    "ch10-latin-english-06", 10, "latin-english", "auto", "Translate into English.",
    "vōx custōdis clāra erat.", "latin",
    ["the guard's voice was clear", "the voice of the guard was clear", "the guard's voice was famous"],
    "The guard's voice was clear.", "custōdis is genitive singular; clāra agrees with the feminine subject vōx.",
    "vōx custōdis clāra erat.", 89, "10.1"
  ),

  core(
    "ch10-english-latin-01", 10, "english-latin", "auto", "Translate into Latin.",
    "Tomorrow the guards will be tired.", "english", ["crās custōdēs fessī erunt", "custōdēs crās fessī erunt"],
    "crās custōdēs fessī erunt.", "erunt is the future third person plural of sum; custōdēs is treated as masculine unless context says otherwise.",
    "crās custōdēs fessī erunt.", 89, "10.2"
  ),
  core(
    "ch10-english-latin-02", 10, "english-latin", "auto", "Translate into Latin.",
    "There was a famous king.", "english", ["erat rēx clārus", "rēx clārus erat"],
    "erat rēx clārus.", "A form of sum may begin the sentence to express 'there was'.",
    "erat rēx clārus.", 89, "10.2"
  ),
  core(
    "ch10-english-latin-03", 10, "english-latin", "auto", "Translate into Latin.",
    "The girl had hidden the food.", "english", ["puella cibum cēlāverat", "cibum puella cēlāverat"],
    "puella cibum cēlāverat.", "The pluperfect adds -erat to the perfect stem cēlāv-.",
    "puella cibum cēlāverat.", 91, "10.5-10.7"
  ),
  core(
    "ch10-english-latin-04", 10, "english-latin", "auto", "Translate into Latin.",
    "We will have adopted a plan.", "english", ["cōnsilium cēperimus"],
    "cōnsilium cēperimus.", "cōnsilium capiō means 'I adopt a plan'; cēperimus is future perfect here.",
    "cōnsilium cēperimus.", 91, "10.5-10.7"
  ),
  core(
    "ch10-english-latin-05", 10, "english-latin", "self", "Translate, then compare with the model.",
    "The soldier had killed the king with a sword.", "english", [],
    "mīles rēgem gladiō interfēcerat.", "interfēcerat is pluperfect; gladiō is ablative of means.",
    "mīles rēgem gladiō interfēcerat.", 91, "10.5-10.7"
  ),

  core(
    "ch10-derivation-01", 10, "derivation", "auto", "Give the Latin source word.",
    "imbibe", "english", ["bibō"], "bibō",
    "To imbibe is to drink; bibō means 'I drink'.", "bibō", 93, "10.11"
  ),
  core(
    "ch10-derivation-02", 10, "derivation", "auto", "Give the Latin source word.",
    "vocal", "english", ["vōx"], "vōx",
    "vocal relates to the voice; vōx means 'voice'.", "vōx", 93, "10.11"
  ),
  core(
    "ch10-derivation-03", 10, "derivation", "auto", "Give the Latin source word.",
    "debit", "english", ["dēbeō"], "dēbeō",
    "A debit is an amount owed; dēbeō means 'I owe' or 'I ought'.", "dēbeō", 93, "10.11"
  )
]);

const passageStep = (id, prompt, modelAnswer, explanation) =>
  Object.freeze({
    id,
    prompt,
    promptLanguage: "latin",
    grading: "self",
    answers: Object.freeze([]),
    modelAnswer,
    explanation,
    audioText: prompt
  });

const passage = (id, chapter, title, printedPage, exercise, steps) =>
  Object.freeze({
    id,
    chapter,
    category: "passage",
    title,
    source: source(printedPage, exercise),
    steps: Object.freeze(steps)
  });

export const PASSAGES_6_10 = Object.freeze([
  passage("ch6-passage-01", 6, "A sleepy friend", 61, "6.9-6.10", [
    passageStep(
      "ch6-passage-01-step-01", "Mārcus in agrō dormiēbat.",
      "Marcus was sleeping in the field.", "dormiēbat is a fourth-conjugation imperfect."
    ),
    passageStep(
      "ch6-passage-01-step-02", "amīcus clāmāvit.",
      "A friend shouted.", "clāmāvit is third person singular perfect."
    ),
    passageStep(
      "ch6-passage-01-step-03", "Mārcus surgit et ad viam currit.",
      "Marcus gets up and runs to the road.", "In a past narrative, both present forms could be rendered as historic presents: 'got up and ran'."
    ),
    passageStep(
      "ch6-passage-01-step-04", "cūr curris, Mārce?",
      "Why are you running, Marcus?", "cūr asks why; Mārce is the vocative form used for direct address."
    ),
    passageStep(
      "ch6-passage-01-step-05", "Mārcus amīcum ad oppidum dūxit.",
      "Marcus led his friend to the town.", "dūxit is the irregular perfect of dūcō."
    )
  ]),

  passage("ch7-passage-01", 7, "The girl and the sailor", 67, "7.2-7.4", [
    passageStep(
      "ch7-passage-01-step-01", "puella parva ex oppidō fugit.",
      "A small girl flees from the town.", "parva agrees with puella; ex takes the ablative oppidō."
    ),
    passageStep(
      "ch7-passage-01-step-02", "\"cūr fugis?\" inquit nauta.",
      "\"Why are you fleeing?\" asks the sailor.", "inquit can mean 'says' or, because the speech is a question, 'asks'."
    ),
    passageStep(
      "ch7-passage-01-step-03", "\"ad Ītaliam venīre cupiō,\" inquit puella.",
      "\"I want to come to Italy,\" says the girl.", "cupiō takes the infinitive venīre; ad takes the accusative."
    ),
    passageStep(
      "ch7-passage-01-step-04", "nauta fīliam deae servāvit.",
      "The sailor saved the goddess's daughter.", "fīliam is accusative; deae is genitive singular."
    ),
    passageStep(
      "ch7-passage-01-step-05", "tandem nauta puellam ad silvam dūxit.",
      "At last the sailor led the girl to the forest.", "tandem means 'at last'; ad silvam expresses motion towards the forest."
    )
  ]),

  passage("ch8-passage-01", 8, "Brutus and the bridge", 77, "8.7-8.8", [
    passageStep(
      "ch8-passage-01-step-01", "ōlim rēx superbus urbem regēbat.",
      "Once a proud king was ruling the city.", "superbus agrees with the masculine subject rēx."
    ),
    passageStep(
      "ch8-passage-01-step-02", "cīvēs rēgem malum timēbant.",
      "The citizens feared the bad king.", "rēgem malum is accusative singular; the adjective agrees with the noun, not its ending."
    ),
    passageStep(
      "ch8-passage-01-step-03", "dux nōmine Brūtus mīlitēs ad pontem dūxit.",
      "A leader called Brutus led the soldiers to the bridge.", "nōmine introduces the leader's name; pontem is accusative after ad."
    ),
    passageStep(
      "ch8-passage-01-step-04", "mīlitēs pontem frēgērunt et urbem servāvērunt.",
      "The soldiers broke the bridge and saved the city.", "frēgērunt is the perfect of frangō."
    ),
    passageStep(
      "ch8-passage-01-step-05", "cīvēs ducem bonum diū amābant.",
      "The citizens loved the good leader for a long time.", "ducem bonum is masculine accusative singular; diū means 'for a long time'."
    )
  ]),

  passage("ch9-passage-01", 9, "The city without weapons", 85, "9.4-9.7", [
    passageStep(
      "ch9-passage-01-step-01", "ōlim barbarī urbem oppugnābant.",
      "Once the barbarians were attacking the city.", "barbarī is nominative plural; urbem is the object."
    ),
    passageStep(
      "ch9-passage-01-step-02", "cīvēs autem arma nōn habēbant.",
      "The citizens, however, did not have weapons.", "autem stands second in its clause."
    ),
    passageStep(
      "ch9-passage-01-step-03", "dux enim mīlitēs ex castrīs mīsit.",
      "For the leader sent soldiers out of the camp.", "enim introduces an explanation and stands second."
    ),
    passageStep(
      "ch9-passage-01-step-04", "mīlitēs tandem vēnērunt hostēsque vīdērunt.",
      "At last the soldiers came and saw the enemy.", "-que on hostēs links the second clause to the first."
    ),
    passageStep(
      "ch9-passage-01-step-05", "hostēs nec pugnāvērunt nec in urbe mānsērunt.",
      "The enemy neither fought nor remained in the city.", "nec...nec means 'neither...nor'."
    )
  ]),

  passage("ch10-passage-01", 10, "The guard's plan", 91, "10.5-10.7", [
    passageStep(
      "ch10-passage-01-step-01", "ōlim custōs clārus in castrīs erat.",
      "Once there was a famous guard in the camp.", "erat can introduce 'there was'; clārus is the masculine complement of custōs."
    ),
    passageStep(
      "ch10-passage-01-step-02", "hostēs urbem oppugnāverant et cibum cēperant.",
      "The enemy had attacked the city and taken the food.", "Both verbs are pluperfect and describe actions completed earlier in the story."
    ),
    passageStep(
      "ch10-passage-01-step-03", "custōs cōnsilium cēpit et mīlitēs dūxit.",
      "The guard adopted a plan and led the soldiers.", "cōnsilium capere is the idiom 'to adopt a plan'."
    ),
    passageStep(
      "ch10-passage-01-step-04", "mīlitēs hostēs vīdērunt et ex urbe pepulērunt.",
      "The soldiers saw the enemy and drove them out of the city.", "pepulērunt is the irregular perfect of pellō; the repeated object is understood."
    ),
    passageStep(
      "ch10-passage-01-step-05", "deinde cīvēs custōdī grātiās ēgērunt.",
      "Then the citizens thanked the guard.", "grātiās agere takes the person thanked in the dative, here custōdī."
    )
  ])
]);
