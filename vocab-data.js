export const APP_META = {
  name: "Latin Sprint",
  subtitle: "Book I vocabulary · Chapters I–X + Extended",
  contentVersion: 4,
  source: "So You Really Want to Learn Latin, Book I — Vocabulary 1–10 and Latin–English Vocabulary"
};

const RAW_CHAPTERS = {
  1: [
    ["aedificō", "I build", ["i build", "build"], "verb", "aedificō, -āre, -āvī, -ātum"],
    ["amō", "I love, like", ["i love", "love", "i like", "like"], "verb", "amō, -āre, -āvī, -ātum"],
    ["cantō", "I sing", ["i sing", "sing"], "verb", "cantō, -āre, -āvī, -ātum"],
    ["exspectō", "I wait (for)", ["i wait", "wait", "i wait for", "wait for"], "verb", "exspectō, -āre, -āvī, -ātum"],
    ["festīnō", "I hurry", ["i hurry", "hurry"], "verb", "festīnō, -āre, -āvī, -ātum"],
    ["labōrō", "I work", ["i work", "work"], "verb", "labōrō, -āre, -āvī, -ātum"],
    ["nāvigō", "I sail", ["i sail", "sail"], "verb", "nāvigō, -āre, -āvī, -ātum"],
    ["oppugnō", "I attack (a city)", ["i attack", "attack", "i attack a city", "attack a city"], "verb", "oppugnō, -āre, -āvī, -ātum"],
    ["parō", "I prepare", ["i prepare", "prepare"], "verb", "parō, -āre, -āvī, -ātum"],
    ["pugnō", "I fight", ["i fight", "fight"], "verb", "pugnō, -āre, -āvī, -ātum"],
    ["rogō", "I ask", ["i ask", "ask"], "verb", "rogō, -āre, -āvī, -ātum"],
    ["spectō", "I watch", ["i watch", "watch"], "verb", "spectō, -āre, -āvī, -ātum"],
    ["superō", "I overcome", ["i overcome", "overcome"], "verb", "superō, -āre, -āvī, -ātum"],
    ["vocō", "I call", ["i call", "call"], "verb", "vocō, -āre, -āvī, -ātum"],
    ["nōn", "not", ["not"], "adverb", "nōn"],
    ["et", "and", ["and"], "conjunction", "et"],
    ["sed", "but", ["but"], "conjunction", "sed"]
  ],
  2: [
    ["agricola", "farmer", ["farmer"], "noun", "agricola, -ae, m."],
    ["aqua", "water", ["water"], "noun", "aqua, -ae, f."],
    ["fābula", "story", ["story"], "noun", "fābula, -ae, f."],
    ["fāma", "fame, glory", ["fame", "glory", "fame or glory"], "noun", "fāma, -ae, f."],
    ["fēmina", "woman", ["woman"], "noun", "fēmina, -ae, f."],
    ["Graecia", "Greece", ["greece"], "proper noun", "Graecia, -ae, f."],
    ["incola", "inhabitant", ["inhabitant"], "noun", "incola, -ae, c."],
    ["īnsula", "island", ["island"], "noun", "īnsula, -ae, f."],
    ["mēnsa", "table", ["table"], "noun", "mēnsa, -ae, f."],
    ["nauta", "sailor", ["sailor"], "noun", "nauta, -ae, m."],
    ["patria", "country, fatherland", ["country", "fatherland", "country or fatherland"], "noun", "patria, -ae, f."],
    ["puella", "girl", ["girl"], "noun", "puella, -ae, f."],
    ["pugna", "battle", ["battle", "fight"], "noun", "pugna, -ae, f."],
    ["Rōma", "Rome", ["rome"], "proper noun", "Rōma, -ae, f."],
    ["sagitta", "arrow", ["arrow"], "noun", "sagitta, -ae, f."],
    ["sapientia", "wisdom", ["wisdom"], "noun", "sapientia, -ae, f."],
    ["terra", "land, ground", ["land", "ground", "earth", "land or ground"], "noun", "terra, -ae, f."],
    ["Troia", "Troy", ["troy"], "proper noun", "Troia, -ae, f."],
    ["via", "road, street, way", ["road", "street", "way", "road street or way"], "noun", "via, -ae, f."],
    ["victōria", "victory", ["victory"], "noun", "victōria, -ae, f."]
  ],
  3: [
    ["ambulō", "I walk", ["i walk", "walk"], "verb", "ambulō, -āre, -āvī, -ātum"],
    ["habitō", "I live, inhabit", ["i live", "live", "i inhabit", "inhabit", "live inhabit"], "verb", "habitō, -āre, -āvī, -ātum"],
    ["nārrō", "I tell", ["i tell", "tell"], "verb", "nārrō, -āre, -āvī, -ātum"],
    ["portō", "I carry", ["i carry", "carry"], "verb", "portō, -āre, -āvī, -ātum"],
    ["vulnerō", "I wound", ["i wound", "wound"], "verb", "vulnerō, -āre, -āvī, -ātum"],
    ["ad", "towards, to", ["towards", "to", "toward"], "preposition", "ad + accusative", ["ad"]],
    ["ante", "before", ["before"], "preposition", "ante + accusative", ["ante"]],
    ["circum", "around", ["around"], "preposition", "circum + accusative", ["circum"]],
    ["contrā", "against", ["against"], "preposition", "contrā + accusative", ["contrā"]],
    ["in", "into, on to", ["into", "on to", "onto"], "preposition", "in + accusative", ["in"]],
    ["inter", "among", ["among", "amongst", "between"], "preposition", "inter + accusative", ["inter"]],
    ["per", "through, along", ["through", "along"], "preposition", "per + accusative", ["per"]],
    ["post", "after", ["after"], "preposition", "post + accusative", ["post"]],
    ["prope", "near", ["near"], "preposition", "prope + accusative", ["prope"]],
    ["ā / ab", "by, from", ["by", "from"], "preposition", "ā / ab + ablative", ["ā", "ab"]],
    ["cum", "with", ["with", "together with"], "preposition", "cum + ablative", ["cum"]],
    ["dē", "down from, concerning", ["down from", "concerning", "about"], "preposition", "dē + ablative", ["dē"]],
    ["ē / ex", "out of", ["out of"], "preposition", "ē / ex + ablative", ["ē", "ex"]],
    ["in", "in, on", ["in", "on"], "preposition", "in + ablative", ["in"]],
    ["sine", "without", ["without"], "preposition", "sine + ablative", ["sine"]],
    ["sub", "under", ["under"], "preposition", "sub + ablative", ["sub"]]
  ],
  4: [
    ["annus", "year", ["year"], "noun", "annus, annī, m."],
    ["dominus", "lord, master", ["lord", "master"], "noun", "dominus, dominī, m."],
    ["locus", "place", ["place"], "noun", "locus, locī, m."],
    ["nūntius", "messenger, message", ["messenger", "message"], "noun", "nūntius, nūntiī, m."],
    ["servus", "slave", ["slave"], "noun", "servus, servī, m."],
    ["auxilium", "help", ["help", "aid"], "noun", "auxilium, auxiliī, n."],
    ["bellum", "war", ["war"], "noun", "bellum, bellī, n."],
    ["dōnum", "gift", ["gift"], "noun", "dōnum, dōnī, n."],
    ["perīculum", "danger", ["danger"], "noun", "perīculum, perīculī, n."],
    ["tēlum", "spear", ["spear", "missile"], "noun", "tēlum, tēlī, n."],
    ["cēlō", "I hide", ["i hide", "hide"], "verb", "cēlō, -āre, -āvī, -ātum"],
    ["dō", "I give", ["i give", "give"], "verb", "dō, dăre, dedī, dătum"],
    ["dēleō", "I destroy", ["i destroy", "destroy"], "verb", "dēleō, -ēre, dēlēvī, dēlētum"],
    ["doceō", "I teach", ["i teach", "teach"], "verb", "doceō, -ēre, docuī, doctum"],
    ["habeō", "I have", ["i have", "have"], "verb", "habeō, -ēre, -uī, -itum"],
    ["maneō", "I remain", ["i remain", "remain", "stay"], "verb", "maneō, -ēre, mānsī, mānsum"],
    ["moneō", "I warn, advise", ["i warn", "warn", "i advise", "advise"], "verb", "moneō, -ēre, -uī, -itum"],
    ["sedeō", "I sit", ["i sit", "sit"], "verb", "sedeō, -ēre, sēdī, sessum"],
    ["teneō", "I hold", ["i hold", "hold"], "verb", "teneō, -ēre, tenuī, tentum"],
    ["timeō", "I fear", ["i fear", "fear", "be afraid"], "verb", "timeō, -ēre, -uī"]
  ],
  5: [
    ["bonus", "good", ["good"], "adjective", "bonus, -a, -um"],
    ["fessus", "tired", ["tired"], "adjective", "fessus, -a, -um"],
    ["īrātus", "angry", ["angry"], "adjective", "īrātus, -a, -um"],
    ["longus", "long", ["long"], "adjective", "longus, -a, -um"],
    ["magnus", "big, great", ["big", "great", "large"], "adjective", "magnus, -a, -um"],
    ["malus", "bad", ["bad"], "adjective", "malus, -a, -um"],
    ["meus", "my", ["my"], "adjective", "meus, -a, -um"],
    ["multus", "much, many", ["much", "many"], "adjective", "multus, -a, -um"],
    ["tuus", "your (singular)", ["your", "your singular", "your sing"], "adjective", "tuus, -a, -um"],
    ["miser", "miserable", ["miserable", "wretched"], "adjective", "miser, misera, miserum"],
    ["noster", "our", ["our"], "adjective", "noster, nostra, nostrum"],
    ["pulcher", "beautiful", ["beautiful", "pretty"], "adjective", "pulcher, pulchra, pulchrum"],
    ["tener", "tender", ["tender"], "adjective", "tener, tenera, tenerum"],
    ["vester", "your (plural)", ["your", "your plural", "your pl"], "adjective", "vester, vestra, vestrum"],
    ["ager", "field", ["field"], "noun", "ager, agrī, m."],
    ["castra", "camp", ["camp"], "noun", "castra, castrōrum, n. pl."],
    ["cōpiae", "forces", ["forces", "troops"], "noun", "cōpiae, cōpiārum, f. pl."],
    ["liber", "book", ["book"], "noun", "liber, librī, m."],
    ["magister", "master", ["master", "teacher"], "noun", "magister, magistrī, m."],
    ["puer", "boy", ["boy"], "noun", "puer, puerī, m."]
  ],
  6: [
    ["audiō", "I hear", ["i hear", "hear", "i listen to", "listen to"], "verb", "audiō, audīre, audīvī, audītum"],
    ["cadō", "I fall", ["i fall", "fall"], "verb", "cadō, cadere, cecidī, cāsum"],
    ["clāmō", "I shout", ["i shout", "shout"], "verb", "clāmō, -āre, -āvī, -ātum"],
    ["currō", "I run", ["i run", "run"], "verb", "currō, currere, cucurrī, cursum"],
    ["dormiō", "I sleep", ["i sleep", "sleep"], "verb", "dormiō, dormīre, -īvī, -ītum"],
    ["dūcō", "I lead", ["i lead", "lead"], "verb", "dūcō, dūcere, dūxī, ductum"],
    ["gerō", "I conduct, wage", ["i conduct", "conduct", "i wage", "wage", "i manage", "manage", "i wear", "wear"], "verb", "gerō, gerere, gessī, gestum"],
    ["regō", "I rule", ["i rule", "rule"], "verb", "regō, regere, rēxī, rēctum"],
    ["scrībō", "I write", ["i write", "write"], "verb", "scrībō, scrībere, scrīpsī, scrīptum"],
    ["surgō", "I rise", ["i rise", "rise", "i get up", "get up"], "verb", "surgō, surgere, surrēxī, surrēctum"],
    ["terreō", "I terrify", ["i terrify", "terrify", "i frighten", "frighten"], "verb", "terreō, -ēre, -uī, -itum"],
    ["veniō", "I come", ["i come", "come"], "verb", "veniō, venīre, vēnī, ventum"],
    ["quid?", "What?", ["what", "what?"], "pronoun", "quid?", ["quid"]],
    ["quis?", "Who?", ["who", "who?"], "pronoun", "quis?", ["quis"]],
    ["cūr?", "Why?", ["why", "why?"], "adverb", "cūr?", ["cūr"]],
    ["-ne…?", "asks a question", ["asks a question", "introduces a question", "question marker"], "enclitic", "-ne…?", ["-ne", "ne"]],
    ["nōnne…?", "asks a question (expecting ‘yes’)", ["asks a question expecting yes", "introduces a question expecting yes", "expects yes"], "adverb", "nōnne…?", ["nōnne", "nōnne…?"]],
    ["num…?", "asks a question (expecting ‘no’)", ["asks a question expecting no", "introduces a question expecting no", "expects no"], "adverb", "num…?", ["num", "num…?"]],
    ["ubī?", "Where?", ["where", "where?"], "adverb", "ubī?", ["ubī"]],
    ["amīcus", "friend", ["friend"], "noun", "amīcus, amīcī, m."]
  ],
  7: [
    ["aperiō", "I open", ["i open", "open"], "verb", "aperiō, -īre, aperuī, apertum"],
    ["capiō", "I capture, take", ["i capture", "capture", "i take", "take"], "verb", "capiō, -ere, cēpī, captum"],
    ["cupiō", "I want, desire", ["i want", "want", "i desire", "desire"], "verb", "cupiō, -ere, cupīvī, cupītum"],
    ["errō", "I wander, err", ["i wander", "wander", "i err", "err", "i make a mistake", "make a mistake"], "verb", "errō, -āre, -āvī, -ātum"],
    ["faciō", "I do, make", ["i do", "do", "i make", "make"], "verb", "faciō, -ere, fēcī, factum"],
    ["inquit / inquiunt", "he says / they say", ["he says they say", "he says or they say"], "verb", "inquit / inquiunt", ["inquit / inquiunt", "inquit inquiunt"]],
    ["pellō", "I drive", ["i drive", "drive"], "verb", "pellō, -ere, pepulī, pulsum"],
    ["servō", "I save", ["i save", "save"], "verb", "servō, -āre, -āvī, -ātum"],
    ["vītō", "I avoid", ["i avoid", "avoid"], "verb", "vītō, -āre, -āvī, -ātum"],
    ["cēna", "dinner", ["dinner"], "noun", "cēna, -ae, f."],
    ["dea", "goddess", ["goddess"], "noun", "dea, -ae, f."],
    ["deus", "god", ["god"], "noun", "deus, deī, m."],
    ["equus", "horse", ["horse"], "noun", "equus, equī, m."],
    ["fīlia", "daughter", ["daughter"], "noun", "fīlia, -ae, f."],
    ["fīlius", "son", ["son"], "noun", "fīlius, fīlī (fīliī), m."],
    ["gladius", "sword", ["sword"], "noun", "gladius, gladiī, m."],
    ["mūrus", "wall", ["wall"], "noun", "mūrus, mūrī, m."],
    ["oppidum", "town", ["town"], "noun", "oppidum, oppidī, n."],
    ["silva", "wood, forest", ["wood", "forest"], "noun", "silva, -ae, f."],
    ["vir", "man", ["man"], "noun", "vir, virī, m."],
    ["novus", "new", ["new"], "adjective", "novus, -a, -um"],
    ["parvus", "small", ["small", "little"], "adjective", "parvus, -a, -um"],
    ["tandem", "at length", ["at length", "at last", "finally"], "adverb", "tandem"]
  ],
  8: [
    ["arbor", "tree", ["tree"], "noun", "arbor, arbŏris, f."],
    ["carmen", "song", ["song", "poem"], "noun", "carmen, carminis, n."],
    ["cōnsul", "consul", ["consul"], "noun", "cōnsul, cōnsulis, m."],
    ["cubīle", "bed", ["bed"], "noun", "cubīle, cubīlis, n."],
    ["dux", "leader", ["leader"], "noun", "dux, ducis, c."],
    ["flūmen", "river", ["river"], "noun", "flūmen, flūminis, n."],
    ["frāter", "brother", ["brother"], "noun", "frāter, frātris, m."],
    ["hostis", "enemy", ["enemy"], "noun", "hostis, hostis, c."],
    ["māter", "mother", ["mother"], "noun", "māter, mātris, f."],
    ["mīles", "soldier", ["soldier"], "noun", "mīles, mīlitis, c."],
    ["nōmen", "name", ["name"], "noun", "nōmen, nōminis, n."],
    ["opus", "work", ["work"], "noun", "opus, operis, n."],
    ["pater", "father", ["father"], "noun", "pater, patris, m."],
    ["pōns", "bridge", ["bridge"], "noun", "pōns, pontis, m."],
    ["rēx", "king", ["king"], "noun", "rēx, rēgis, m."],
    ["urbs", "city", ["city"], "noun", "urbs, urbis, f."],
    ["altus", "high, deep", ["high", "deep"], "adjective", "altus, -a, -um"],
    ["superbus", "proud", ["proud", "arrogant"], "adjective", "superbus, -a, -um"],
    ["appellō", "I call", ["i call", "call"], "verb", "appellō, -āre, -āvī, -ātum"],
    ["frangō", "I break", ["i break", "break"], "verb", "frangō, -ere, frēgī, fractum"],
    ["diū", "for a long time", ["for a long time", "a long time"], "adverb", "diū"],
    ["ōlim", "once upon a time", ["once upon a time", "once"], "adverb", "ōlim"]
  ],
  9: [
    ["ascendō", "I go up, climb", ["i go up", "go up", "i climb", "climb"], "verb", "ascendō, -ere, ascendī, ascēnsum"],
    ["cōgō", "I force, compel", ["i force", "force", "i compel", "compel"], "verb", "cōgō, cōgere, coēgī, coāctum"],
    ["cōnstituō", "I decide", ["i decide", "decide"], "verb", "cōnstituō, cōnstituere, cōnstituī, cōnstitūtum"],
    ["dīcō", "I say", ["i say", "say"], "verb", "dīcō, dīcere, dīxī, dictum"],
    ["discēdō", "I depart", ["i depart", "depart", "i leave", "leave"], "verb", "discēdō, -ere, discessī, discessum"],
    ["fugiō", "I flee", ["i flee", "flee", "i run away", "run away"], "verb", "fugiō, fugere, fūgī, fugitum"],
    ["iaciō", "I throw", ["i throw", "throw"], "verb", "iaciō, iacere, iēcī, iactum"],
    ["mittō", "I send", ["i send", "send"], "verb", "mittō, mittere, mīsī, missum"],
    ["videō", "I see", ["i see", "see"], "verb", "videō, vidēre, vīdī, vīsum"],
    ["arma", "weapons", ["weapons", "arms"], "noun", "arma, -ōrum, n. pl."],
    ["corpus", "body", ["body"], "noun", "corpus, corpŏris, n."],
    ["crās", "tomorrow", ["tomorrow"], "adverb", "crās"],
    ["saepe", "often", ["often", "frequently"], "adverb", "saepe"],
    ["autem", "however, moreover", ["however", "moreover"], "conjunction", "autem"],
    ["dum", "while", ["while"], "conjunction", "dum"],
    ["enim", "for", ["for", "because"], "conjunction", "enim"],
    ["et…et", "both…and", ["both and", "both…and"], "conjunction", "et…et", ["et…et", "et et"]],
    ["nec/neque", "and…not", ["and not", "nor"], "conjunction", "nec/neque", ["nec", "neque"]],
    ["nec…nec", "neither…nor", ["neither nor", "neither…nor"], "conjunction", "nec…nec", ["nec…nec", "nec nec"]],
    ["neque…neque", "neither…nor", ["neither nor", "neither…nor"], "conjunction", "neque…neque", ["neque…neque", "neque neque"]],
    ["nec tamen", "but…not", ["but not", "but…not"], "conjunction", "nec tamen"],
    ["neque tamen", "but…not", ["but not", "but…not"], "conjunction", "neque tamen"],
    ["tamen", "however", ["however", "nevertheless"], "adverb", "tamen"],
    ["ubĭ", "when, where", ["when", "where"], "conjunction", "ubĭ"],
    ["barbarus", "barbarian", ["barbarian"], "adjective", "barbarus, -a, -um"]
  ],
  10: [
    ["caput", "head", ["head"], "noun", "caput, capitis, n."],
    ["cibus", "food", ["food"], "noun", "cibus, cibī, m."],
    ["clāmor", "shout", ["shout", "cry"], "noun", "clāmor, clāmōris, m."],
    ["cōnsilium", "plan", ["plan"], "noun", "cōnsilium, cōnsiliī, n."],
    ["custōs", "guard", ["guard"], "noun", "custōs, custōdis, c."],
    ["hasta", "spear", ["spear"], "noun", "hasta, hastae, f."],
    ["hortus", "garden", ["garden"], "noun", "hortus, hortī, m."],
    ["vōx", "voice", ["voice"], "noun", "vōx, vōcis, f."],
    ["clārus", "famous", ["famous", "renowned"], "adjective", "clārus, -a, -um"],
    ["dexter", "right", ["right", "right-hand"], "adjective", "dexter, dextra, dextrum"],
    ["sinister", "left", ["left", "left-hand"], "adjective", "sinister, sinistra, sinistrum"],
    ["agō", "I do", ["i do", "do"], "verb", "agō, agere, ēgī, āctum"],
    ["bibō", "I drink", ["i drink", "drink"], "verb", "bibō, bibere, bibī"],
    ["cōnsilium capiō", "I adopt a plan", ["i adopt a plan", "adopt a plan"], "verb phrase", "cōnsilium capiō"],
    ["dēbeō", "I ought, owe", ["i ought", "ought", "i owe", "owe"], "verb", "dēbeō, dēbēre, dēbuī, dēbitum"],
    ["grātiās agō", "I give thanks", ["i give thanks", "give thanks", "i thank", "thank"], "verb phrase", "grātiās agō"],
    ["interficiō", "I kill", ["i kill", "kill"], "verb", "interficiō, interficere, interfēcī, interfectum"],
    ["deinde", "then", ["then", "next"], "adverb", "deinde"],
    ["iam", "now, already", ["now", "already"], "adverb", "iam"],
    ["iterum", "again", ["again"], "adverb", "iterum"]
  ]
};

const RAW_EXTENDED = {
  102: [
    ["absum", "I am absent", ["i am absent", "am absent", "be absent"], "verb", "absum, abesse, āfuī"],
    ["adsum", "I am present", ["i am present", "am present", "be present"], "verb", "adsum, adesse, adfuī"],
    ["animal", "animal", ["animal"], "noun", "animal, animālis, n."],
    ["appropinquō", "I approach", ["i approach", "approach", "i draw near", "draw near"], "verb", "appropinquō, -āre, -āvī, -ātum"],
    ["ars", "skill, art", ["skill", "art"], "noun", "ars, artis, f."],
    ["ātrium", "hall (of a house)", ["hall", "hall of a house"], "noun", "ātrium, ātriī, n."],
    ["aurum", "gold", ["gold"], "noun", "aurum, -ī, n."],
    ["barbarus", "barbarian (noun)", ["barbarian", "a barbarian"], "noun", "barbarus, -ī, m."],
    ["bene", "well", ["well"], "adverb", "bene"],
    ["caelum", "sky", ["sky"], "noun", "caelum, -ī, n."],
    ["centum", "one hundred", ["one hundred", "hundred", "100"], "numeral", "centum"],
    ["cīvis", "citizen", ["citizen"], "noun", "cīvis, cīvis, c."],
    ["claudō", "I close", ["i close", "close", "i shut", "shut"], "verb", "claudō, claudere, clausī, clausum"],
    ["cūrō", "I care for", ["i care for", "care for", "i look after", "look after"], "verb", "cūrō, -āre, -āvī, -ātum"],
    ["decem", "ten", ["ten", "10"], "numeral", "decem"]
  ],
  103: [
    ["dēlectō", "I delight, please", ["i delight", "delight", "i please", "please"], "verb", "dēlectō, -āre, -āvī, -ātum"],
    ["dēscendō", "I go down", ["i go down", "go down", "i descend", "descend"], "verb", "dēscendō, -ere, -scendī, -scēnsum"],
    ["discō", "I learn", ["i learn", "learn"], "verb", "discō, discere, didici"],
    ["doleō", "I feel pain, am sad", ["i feel pain", "feel pain", "i am sad", "am sad"], "verb", "doleō, -ēre, doluī, dolitum"],
    ["dolor", "pain", ["pain"], "noun", "dolor, dolōris, m."],
    ["duŏ", "two", ["two", "2"], "numeral", "duŏ"],
    ["duodecim", "twelve", ["twelve", "12"], "numeral", "duodecim"],
    ["duodēvīgintī", "eighteen", ["eighteen", "18"], "numeral", "duodēvīgintī"],
    ["ecce", "look!", ["look", "look!", "behold"], "interjection", "ecce"],
    ["egŏ", "I", ["i"], "pronoun", "egŏ"],
    ["fleō", "I weep", ["i weep", "weep", "i cry", "cry"], "verb", "fleō, flēre, flēvī, flētum"],
    ["flōs", "flower", ["flower"], "noun", "flōs, flōris, m."],
    ["fōns", "fountain", ["fountain", "spring"], "noun", "fōns, fontis, m."],
    ["forte", "by chance", ["by chance", "accidentally"], "adverb", "forte"],
    ["forum", "forum", ["forum"], "noun", "forum, -ī, n."],
    ["frūstrā", "in vain", ["in vain", "vainly"], "adverb", "frūstrā"],
    ["fuga", "flight, escape", ["flight", "escape"], "noun", "fuga, -ae, f."],
    ["gēns", "people, race", ["people", "race", "nation"], "noun", "gēns, gentis, f."],
    ["herba", "grass", ["grass"], "noun", "herba, -ae, f."],
    ["hīc", "here", ["here"], "adverb", "hīc"],
    ["homŏ", "man, person", ["man", "person", "human being"], "noun", "homŏ, hominis, c."],
    ["ibĭ", "there", ["there"], "adverb", "ibĭ"],
    ["igitur", "therefore", ["therefore", "so"], "conjunction", "igitur"],
    ["ignis", "fire", ["fire"], "noun", "ignis, ignis, m."],
    ["imperium", "command, empire", ["command", "empire", "power"], "noun", "imperium, -iī, n."],
    ["incendō", "I burn", ["i burn", "burn", "i set fire to", "set fire to"], "verb", "incendō, -ere, incendī, incēnsum"],
    ["inde", "then", ["then", "from there", "thence"], "adverb", "inde"]
  ],
  104: [
    ["intrō", "I enter", ["i enter", "enter", "i go in", "go in"], "verb", "intrō, -āre, -āvī, -ātum"],
    ["inveniō", "I find", ["i find", "find", "i discover", "discover"], "verb", "inveniō, -īre, invēnī, inventum"],
    ["īra", "anger", ["anger", "wrath"], "noun", "īra, -ae, f."],
    ["ita", "thus", ["thus", "so"], "adverb", "ita"],
    ["Ītalia", "Italy", ["italy"], "proper noun", "Ītalia, -ae, f."],
    ["itaque", "therefore", ["therefore", "and so"], "conjunction", "itaque"],
    ["iter", "journey", ["journey", "route"], "noun", "iter, itineris, n."],
    ["iubeō", "I order", ["i order", "order", "i command", "command"], "verb", "iubeō, -ēre, iussī, iussum"],
    ["iūdex", "judge", ["judge"], "noun", "iūdex, iūdicis, c."],
    ["iuvenis", "young man", ["young man", "youth"], "noun", "iuvenis, iuvenis, m."],
    ["laetus", "happy", ["happy", "glad"], "adjective", "laetus, -a, -um"],
    ["laudō", "I praise", ["i praise", "praise"], "verb", "laudō, -āre, -āvī, -ātum"],
    ["legō", "I read, choose", ["i read", "read", "i choose", "choose"], "verb", "legō, -ere, lēgī, lēctum"],
    ["lūdō", "I play", ["i play", "play"], "verb", "lūdō, -ere, lūsī, lūsum"],
    ["lūdus", "school", ["school"], "noun", "lūdus, -ī, m."],
    ["lūx", "light", ["light"], "noun", "lūx, lūcis, f."],
    ["magnopere", "greatly", ["greatly", "very much"], "adverb", "magnopere"],
    ["mare", "sea", ["sea"], "noun", "mare, maris, n."],
    ["mātrimōnium", "marriage", ["marriage"], "noun", "mātrimōnium, -iī, n."],
    ["medius", "middle", ["middle", "mid"], "adjective", "medius, -a, -um"],
    ["mīlle", "one thousand", ["one thousand", "thousand", "1000"], "numeral", "mīlle"],
    ["mōns", "mountain", ["mountain"], "noun", "mōns, montis, m."],
    ["mors", "death", ["death"], "noun", "mors, mortis, f."],
    ["moveō", "I move, set in motion", ["i move", "move", "i set in motion", "set in motion"], "verb", "moveō, -ēre, mōvī, mōtum"],
    ["mox", "soon", ["soon"], "adverb", "mox"],
    ["nam", "for", ["for", "because"], "conjunction", "nam"],
    ["nāvis", "ship", ["ship", "boat"], "noun", "nāvis, nāvis, f."],
    ["necō", "I kill", ["i kill", "kill"], "verb", "necō, necāre, necāvī, necātum"],
    ["niger", "black", ["black"], "adjective", "niger, nigra, nigrum"],
    ["nōs", "we", ["we", "us"], "pronoun", "nōs"],
    ["nōtus", "well-known", ["well known", "well-known", "known"], "adjective", "nōtus, -a, -um"],
    ["novem", "nine", ["nine", "9"], "numeral", "novem"],
    ["nox", "night", ["night"], "noun", "nox, noctis, f."],
    ["numquam", "never", ["never"], "adverb", "numquam"],
    ["occīdō", "I kill", ["i kill", "kill", "i slay", "slay"], "verb", "occīdō, -ere, occīdī, occīsum"],
    ["octŏ", "eight", ["eight", "8"], "numeral", "octŏ"],
    ["oculus", "eye", ["eye"], "noun", "oculus, -ī, m."],
    ["ōra", "shore", ["shore", "coast"], "noun", "ōra, -ae, f."],
    ["ōrō", "I beg, pray", ["i beg", "beg", "i pray", "pray"], "verb", "ōrō, -āre, -āvī, -ātum"],
    ["ostendō", "I show", ["i show", "show"], "verb", "ostendō, -ere, ostendī, ostēnsum / ostentum"]
  ],
  105: [
    ["pecūnia", "money", ["money"], "noun", "pecūnia, -ae, f."],
    ["poēta", "poet", ["poet"], "noun", "poēta, -ae, m."],
    ["pōnō", "I place", ["i place", "place", "i put", "put"], "verb", "pōnō, -ere, posuī, positum"],
    ["populus", "a people", ["a people", "people", "nation"], "noun", "populus, -ī, m."],
    ["porta", "gate", ["gate"], "noun", "porta, -ae, f."],
    ["posteā", "afterwards", ["afterwards", "afterward", "later"], "adverb", "posteā"],
    ["pretium", "price", ["price", "value"], "noun", "pretium, -iī, n."],
    ["proelium", "battle", ["battle"], "noun", "proelium, -iī, n."],
    ["quaerō", "I ask, seek", ["i ask", "ask", "i seek", "seek", "i look for", "look for"], "verb", "quaerō, -ere, quaesīvī, quaesītum"],
    ["quandŏ?", "When?", ["when", "when?"], "adverb", "quandŏ?", ["quandō"]],
    ["quattuor", "four", ["four", "4"], "numeral", "quattuor"],
    ["quattuordecim", "fourteen", ["fourteen", "14"], "numeral", "quattuordecim"],
    ["quīndecim", "fifteen", ["fifteen", "15"], "numeral", "quīndecim"],
    ["quīnque", "five", ["five", "5"], "numeral", "quīnque"],
    ["quōmodŏ?", "How?", ["how", "how?"], "adverb", "quōmodŏ?", ["quōmodŏ", "quōmodo"]],
    ["quot?", "How many?", ["how many", "how many?"], "adverb", "quot?", ["quot"]],
    ["reddō", "I return, give back", ["i return", "return", "i give back", "give back"], "verb", "reddō, reddere, reddidī, redditum"],
    ["redūcō", "I lead back", ["i lead back", "lead back"], "verb", "redūcō, -ere, redūxī, reductum"],
    ["respondeō", "I reply, answer", ["i reply", "reply", "i answer", "answer"], "verb", "respondeō, -ēre, respondī, respōnsum"],
    ["reveniō", "I return, come back", ["i return", "return", "i come back", "come back"], "verb", "reveniō, -īre, revēnī, reventum"],
    ["rīdeō", "I laugh, smile", ["i laugh", "laugh", "i smile", "smile"], "verb", "rīdeō, -ēre, rīsī, rīsum"],
    ["rīpa", "riverbank", ["riverbank", "river bank", "bank"], "noun", "rīpa, -ae, f."],
    ["Rōmānus", "Roman (adjective)", ["roman", "roman adjective"], "adjective", "Rōmānus, -a, -um"],
    ["Rōmānus", "Roman (noun)", ["roman", "a roman", "roman noun"], "noun", "Rōmānus, -ī, m."],
    ["ruō", "I rush", ["i rush", "rush"], "verb", "ruō, ruere, ruī, rutum"],
    ["sacer", "sacred", ["sacred", "holy"], "adjective", "sacer, sacra, sacrum"],
    ["saevus", "savage", ["savage", "fierce", "cruel"], "adjective", "saevus, -a, -um"],
    ["salūtō", "I greet", ["i greet", "greet", "i salute", "salute"], "verb", "salūtō, -āre, -āvī, -ātum"],
    ["salvē / salvēte", "hello, greetings", ["hello", "greetings", "greeting"], "interjection", "salvē, salvēte", ["salvē", "salvēte"]],
    ["scūtum", "shield", ["shield"], "noun", "scūtum, -ī, n."],
    ["sēdecim", "sixteen", ["sixteen", "16"], "numeral", "sēdecim"],
    ["semper", "always", ["always"], "adverb", "semper"],
    ["senex", "old man", ["old man", "an old man"], "noun", "senex, senis, m."],
    ["septem", "seven", ["seven", "7"], "numeral", "septem"],
    ["septendecim", "seventeen", ["seventeen", "17"], "numeral", "septendecim"],
    ["sex", "six", ["six", "6"], "numeral", "sex"],
    ["sī", "if", ["if"], "conjunction", "sī"],
    ["sīc", "thus", ["thus", "so", "in this way"], "adverb", "sīc"],
    ["socius", "ally", ["ally", "companion"], "noun", "socius, -iī, m."],
    ["sōl", "sun", ["sun"], "noun", "sōl, sōlis, m."],
    ["statim", "immediately", ["immediately", "at once"], "adverb", "statim"],
    ["stō", "I stand", ["i stand", "stand"], "verb", "stō, stāre, stetī, stătum"],
    ["subitō", "suddenly", ["suddenly"], "adverb", "subitō"],
    ["sum", "I am", ["i am", "am", "be"], "verb", "sum, esse, fuī (irreg.)"],
    ["super", "over", ["over", "above"], "preposition", "super + accusative"],
    ["tempestās", "storm, weather", ["storm", "weather"], "noun", "tempestās, tempestātis, f."],
    ["tempus", "time", ["time"], "noun", "tempus, tempŏris, n."]
  ],
  106: [
    ["theātrum", "theatre", ["theatre", "theater"], "noun", "theātrum, -ī, n."],
    ["trādō", "I hand over", ["i hand over", "hand over", "i deliver", "deliver"], "verb", "trādō, -ere, trādidī, trāditum"],
    ["trahō", "I drag", ["i drag", "drag", "i pull", "pull"], "verb", "trahō, -ere, trāxī, tractum"],
    ["trāns", "across", ["across"], "preposition", "trāns + accusative"],
    ["tredecim", "thirteen", ["thirteen", "13"], "numeral", "tredecim"],
    ["trēs", "three", ["three", "3"], "numeral", "trēs"],
    ["tū", "you (singular)", ["you", "you singular", "singular you"], "pronoun", "tū"],
    ["tum", "then", ["then"], "adverb", "tum"],
    ["tūtus", "safe", ["safe"], "adjective", "tūtus, -a, -um"],
    ["unda", "wave", ["wave"], "noun", "unda, -ae, f."],
    ["ūndecim", "eleven", ["eleven", "11"], "numeral", "ūndecim"],
    ["ūndēvīgintī", "nineteen", ["nineteen", "19"], "numeral", "ūndēvīgintī"],
    ["ūnus", "one", ["one", "1"], "numeral", "ūnus, -a, -um"],
    ["uxor", "wife", ["wife"], "noun", "uxor, -ōris, f."],
    ["validus", "strong", ["strong", "powerful"], "adjective", "validus, -a, -um"],
    ["ventus", "wind", ["wind"], "noun", "ventus, -ī, m."],
    ["verberō", "I beat, hit", ["i beat", "beat", "i hit", "hit"], "verb", "verberō, -āre, -āvī, -ātum"],
    ["verbum", "word", ["word"], "noun", "verbum, -ī, n."],
    ["vīgintī", "twenty", ["twenty", "20"], "numeral", "vīgintī"],
    ["virtūs", "courage", ["courage", "bravery", "virtue"], "noun", "virtūs, virtūtis, f."],
    ["vōs", "you (plural)", ["you", "you plural", "plural you"], "pronoun", "vōs"],
    ["vulnus", "wound", ["wound"], "noun", "vulnus, vulneris, n."]
  ]
};

const SOURCE_PAGES = {
  1: 8,
  2: 20,
  3: 30,
  4: 42,
  5: 52,
  6: 62,
  7: 70,
  8: 76,
  9: 84,
  10: 92
};

const MASTER_ALIASES = {
  "cadō": ["cecidī"],
  "capiō": ["cēpī"],
  "cōgō": ["coēgī"],
  "currō": ["cucurrī"],
  "dō": ["dedī"],
  "dīcō": ["dīxī"],
  "agō": ["ēgī"],
  "sum": ["esse", "fuī"],
  "faciō": ["fēcī"],
  "frangō": ["frēgī"],
  "gerō": ["gessī"],
  "iaciō": ["iēcī"],
  "lūdō": ["lūsī"],
  "mittō": ["mīsī"],
  "regō": ["rēxī"],
  "stō": ["stetī"]
};

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");
}

function audioTextFor(latin) {
  return String(latin)
    .replace(/\s*\/\s*/g, ", ")
    .replace(/…+/g, ", ")
    .replace(/\?/g, "")
    .replace(/^[-\s]+/, "")
    .replace(/,\s*$/, "")
    .trim();
}

function sourceMetadata(section, printedPage) {
  return {
    book: "So You Really Want to Learn Latin, Book I",
    edition: "2024 download",
    section,
    printedPage,
    pdfPage: printedPage + 7
  };
}

const CHAPTER_VOCABULARY = Object.entries(RAW_CHAPTERS).flatMap(([chapterValue, rows]) => {
  const chapter = Number(chapterValue);
  const seenSlugs = new Map();
  return rows.map(([latin, english, acceptedEnglish, kind, dictionary, acceptedLatin], index) => {
    const printedPage = chapter === 3 && index < 5 ? 29 : SOURCE_PAGES[chapter];
    const sourceSection = chapter === 3 && index < 5 ? "New vocabulary (Chapter 3)" : `Vocabulary ${chapter}`;
    const baseSlug = slug(`${latin}-${dictionary}`);
    const duplicate = seenSlugs.get(baseSlug) || 0;
    seenSlugs.set(baseSlug, duplicate + 1);
    return {
      id: `c${chapter}-${baseSlug}${duplicate ? `-${duplicate + 1}` : ""}`,
      chapter,
      order: index + 1,
      latin,
      english,
      acceptedEnglish: [...new Set([english, ...acceptedEnglish])],
      acceptedLatin: [...new Set([latin, ...(acceptedLatin || [])])],
      aliases: [...(MASTER_ALIASES[latin] || [])],
      kind,
      dictionary,
      canonical: dictionary,
      promptEnglish: chapter === 5 && latin === "magister" ? "master (teacher)" : english,
      audioText: audioTextFor(latin, acceptedLatin),
      sourceGroup: "chapter",
      source: sourceMetadata(sourceSection, printedPage),
      sourceLabel: `Book p. ${printedPage}`
    };
  });
});

let extendedOrder = 0;
const seenExtendedSlugs = new Map();
const EXTENDED_VOCABULARY = Object.entries(RAW_EXTENDED).flatMap(([pageValue, rows]) => {
  const printedPage = Number(pageValue);
  return rows.map(([latin, english, acceptedEnglish, kind, dictionary, acceptedLatin]) => {
    const baseSlug = slug(`${latin}-${dictionary}`);
    const duplicate = seenExtendedSlugs.get(baseSlug) || 0;
    seenExtendedSlugs.set(baseSlug, duplicate + 1);
    extendedOrder += 1;
    return {
      id: `extended-${baseSlug}${duplicate ? `-${duplicate + 1}` : ""}`,
      chapter: null,
      order: extendedOrder,
      latin,
      english,
      acceptedEnglish: [...new Set([english, ...acceptedEnglish])],
      acceptedLatin: [...new Set([latin, ...(acceptedLatin || [])])],
      aliases: [...(MASTER_ALIASES[latin] || [])],
      kind,
      dictionary,
      canonical: dictionary,
      promptEnglish: english,
      audioText: audioTextFor(latin, acceptedLatin),
      sourceGroup: "extended",
      source: sourceMetadata("Latin–English Vocabulary", printedPage),
      sourceLabel: `Book p. ${printedPage}`
    };
  });
});

export const VOCABULARY = [...CHAPTER_VOCABULARY, ...EXTENDED_VOCABULARY];

const DECK_DETAILS = [
  [1, "I", "Verbs and small words", "amō → I love"],
  [2, "II", "First-declension nouns", "puella → girl"],
  [3, "III", "Verbs and prepositions", "portō → I carry"],
  [4, "IV", "Second-declension nouns and verbs", "bellum → war"],
  [5, "V", "Adjectives and nouns", "pulcher → beautiful"],
  [6, "VI", "Irregular verbs and questions", "audiō → I hear"],
  [7, "VII", "Verbs, nouns, and adjectives", "equus → horse"],
  [8, "VIII", "Third-declension nouns", "rēx → king"],
  [9, "IX", "Verbs and connecting words", "dīcō → I say"],
  [10, "X", "Nouns, verbs, and adverbs", "caput → head"]
];

export const DECKS = [
  ...DECK_DETAILS.map(([chapter, numeral, subtitle, example]) => ({
    id: `chapter${chapter}`,
    chapter,
    numeral,
    title: `Chapter ${numeral}`,
    subtitle,
    example,
    count: VOCABULARY.filter((word) => word.chapter === chapter).length
  })),
  {
    id: "extended",
    chapter: null,
    numeral: "+",
    title: "Extended",
    subtitle: "Additional Book I vocabulary",
    example: `${EXTENDED_VOCABULARY.length}-word pool`,
    count: EXTENDED_VOCABULARY.length
  },
  {
    id: "mixed-chapters",
    chapter: 0,
    numeral: "I–X",
    title: "Mixed I–X",
    subtitle: "A balanced review of the ten chapter lists",
    example: `${CHAPTER_VOCABULARY.length}-word pool`,
    count: CHAPTER_VOCABULARY.length
  },
  {
    id: "all-words",
    chapter: 0,
    numeral: "ALL",
    title: "All Words",
    subtitle: "Chapters I–X plus Extended",
    example: `${VOCABULARY.length}-word pool`,
    count: VOCABULARY.length
  }
];

export const DIRECTIONS = [
  {
    id: "latin-english",
    title: "Latin → English",
    shortTitle: "To English",
    instruction: "Translate into English",
    examplePrompt: "amō",
    exampleAnswer: "I love"
  },
  {
    id: "english-latin",
    title: "English → Latin",
    shortTitle: "To Latin",
    instruction: "Translate into Latin",
    examplePrompt: "I love",
    exampleAnswer: "amō"
  }
];

export function normalizeAnswer(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[“”‘’'.,!?;:()[\]{}+…]/g, " ")
    .replace(/[\/]/g, " ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function withoutArticle(value) {
  return value.replace(/^(a|an|the)\s+/, "");
}

export function getDeckWords(deckId) {
  if (deckId === "extended") return [...EXTENDED_VOCABULARY];
  if (deckId === "mixed" || deckId === "mixed-chapters") return [...CHAPTER_VOCABULARY];
  if (deckId === "all-words") return [...VOCABULARY];
  const chapter = Number(String(deckId).replace("chapter", ""));
  return VOCABULARY.filter((word) => word.chapter === chapter);
}

export function getWord(wordId) {
  return VOCABULARY.find((word) => word.id === wordId);
}

export function promptFor(word, direction) {
  if (direction === "english-latin") return word.promptEnglish || word.english;
  return word.kind === "preposition" ? word.dictionary : word.latin;
}

export function answerFor(word, direction) {
  return direction === "english-latin" ? word.latin : word.english;
}

export function isTranslationCorrect(word, direction, value) {
  const normalized = normalizeAnswer(value);
  if (!word || !normalized) return false;
  if (direction === "english-latin") {
    return word.acceptedLatin.some((answer) => normalized === normalizeAnswer(answer));
  }

  const articleFlexible = word.kind === "noun";
  const candidate = articleFlexible ? withoutArticle(normalized) : normalized;
  return word.acceptedEnglish.some((answer) => {
    const expected = normalizeAnswer(answer);
    return candidate === (articleFlexible ? withoutArticle(expected) : expected);
  });
}

function meaningKeys(word) {
  return new Set((word?.acceptedEnglish || [])
    .map((answer) => withoutArticle(normalizeAnswer(answer)))
    .filter(Boolean));
}

function meaningsOverlap(first, second) {
  const firstKeys = meaningKeys(first);
  return [...meaningKeys(second)].some((key) => firstKeys.has(key));
}

function shuffledChoices(choices) {
  const shuffled = [...choices];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function createMultipleChoiceOptions(word, direction, poolWords = VOCABULARY) {
  if (!word) return [];
  const correctLabel = answerFor(word, direction);
  const choices = [{ wordId: word.id, label: correctLabel, correct: true }];
  const usedLabels = new Set([normalizeAnswer(correctLabel)]);
  const usedWordIds = new Set([word.id]);

  const addDistractors = (source) => {
    const candidates = [...new Map((Array.isArray(source) ? source : [])
      .filter(Boolean)
      .map((candidate) => [candidate.id, candidate])).values()]
      .filter((candidate) => !usedWordIds.has(candidate.id))
      .map((candidate) => ({
        candidate,
        kindPriority: candidate.kind === word.kind ? 0 : 1,
        order: Math.random()
      }))
      .sort((first, second) => first.kindPriority - second.kindPriority || first.order - second.order);

    for (const { candidate } of candidates) {
      if (choices.length >= 4) break;
      if (normalizeAnswer(promptFor(candidate, direction)) === normalizeAnswer(promptFor(word, direction))) continue;
      if (direction === "english-latin" && meaningsOverlap(word, candidate)) continue;
      const label = answerFor(candidate, direction);
      const normalizedLabel = normalizeAnswer(label);
      if (!normalizedLabel || usedLabels.has(normalizedLabel)) continue;
      if (isTranslationCorrect(word, direction, label)) continue;
      choices.push({ wordId: candidate.id, label, correct: false });
      usedLabels.add(normalizedLabel);
      usedWordIds.add(candidate.id);
    }
  };

  addDistractors(poolWords);
  if (choices.length < 4) addDistractors(VOCABULARY);
  return shuffledChoices(choices);
}

export function pairLabel(word) {
  return `${word.latin} = ${word.english}`;
}
