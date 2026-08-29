import type { TrumpetData, DialogueLine } from "./types";

const introDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "The fifth trumpet feels different.", ar: "البوق الخامس يبدو مختلفاً." } },
  { speaker: "narrator", text: { en: "It is.", ar: "بالفعل." } },
  { speaker: "girl", text: { en: "What happens?", ar: "ماذا يحدث؟" } },
  { speaker: "narrator", text: { en: "Smoke rises from the abyss, and the vision becomes darker.", ar: "يصعد دخان من الهاوية، وتصبح الرؤيا أكثر ظلمة." } },
  { speaker: "girl", text: { en: "And the locusts?", ar: "وماذا عن الجراد؟" } },
  { speaker: "narrator", text: { en: "Watch their description carefully.", ar: "راقب وصفها بعناية." } },
];

const closingDialogue: DialogueLine[] = [
  { speaker: "narrator", text: { en: "Remember what Scripture says.", ar: "تذكّر ما يقوله الكتاب المقدس." } },
];

/** TEMPORARY PLACEHOLDER content — pending verified Coptic Reader text. Reference: Revelation 9:1-11 */
const trumpet5: TrumpetData = {
  imageSrc: "/trumpets/trumpet5.jpg", // placeholder - add public/trumpets/trumpet5.jpg
  videoSrc: "/videos/trumpet5.mp4",
  index: 5,
  title: { en: "The Fifth Trumpet", ar: "البوق الخامس" },
  shortLabel: { en: "The Bottomless Pit", ar: "البئر بلا قرار" },
  scriptureRef: { en: "Revelation 9:1-12", ar: "رؤيا يوحنا اللاهوتي ٩: ١-١٢" },
  scriptureIsTemporary: false,
  scriptureText: {
    en:
      "The fifth angel sounded, and I saw a star fall from heaven unto the earth: and to him was given " +
      "the key of the bottomless pit. And he opened the bottomless pit; and there arose a smoke out of " +
      "the pit, as the smoke of a great furnace; and the sun and the air were darkened by reason of " +
      "the smoke of the pit. And there came out of the smoke locusts upon the earth: and unto them was " +
      "given power, as the scorpions of the earth have power. And it was commanded them that they should " +
      "not hurt the grass of the earth, neither any green thing, neither any tree; but only those men " +
      "which have not the seal of God in their foreheads. And to them it was given that they should not " +
      "kill them, but that they should be tormented five months: and their torment was as the torment of " +
      "a scorpion, when he striketh a man. And in those days shall men seek death, and shall not find it; " +
      "and shall desire to die, and death shall flee from them. And the shapes of the locusts were like " +
      "unto horses prepared unto battle; and on their heads were as it were crowns like gold, and their " +
      "faces were as the faces of men. And they had hair as the hair of women, and their teeth were as " +
      "the teeth of lions. And they had breastplates, as it were breastplates of iron; and the sound of " +
      "their wings was as the sound of chariots of many horses running to battle. And they had tails like " +
      "unto scorpions, and there were stings in their tails: and their power was to hurt men five months. " +
      "And they had a king over them, which is the angel of the bottomless pit, whose name in the Hebrew " +
      "tongue is Abaddon, but in the Greek tongue hath his name Apollyon. One woe is past; and, behold, " +
      "there come two woes more hereafter.",
    ar:
      "ثُمَّ بَوَّقَ الْمَلاَكُ الْخَامِسُ، فَرَأَيْتُ كَوْكَبًا قَدْ سَقَطَ مِنَ السَّمَاءِ إِلَى الأَرْضِ، وَأُعْطِيَ مِفْتَاحَ بِئْرِ الْهَاوِيَةِ. " +
      "فَفَتَحَ بِئْرَ الْهَاوِيَةِ، فَصَعِدَ دُخَانٌ مِنَ الْبِئْرِ كَدُخَانِ أَتُونٍ عَظِيمٍ، فَأَظْلَمَتِ الشَّمْسُ وَالْجَوُّ مِنْ دُخَانِ الْبِئْرِ. " +
      "وَمِنَ الدُّخَانِ خَرَجَ جَرَادٌ عَلَى الأَرْضِ، فَأُعْطِيَ سُلْطَانًا كَمَا لِعَقَارِبِ الأَرْضِ سُلْطَانٌ. وَقِيلَ لَهُ أَنْ لاَ يَضُرَّ عُشْبَ الأَرْضِ، " +
      "وَلاَ شَيْئًا أَخْضَرَ وَلاَ شَجَرَةً مَا، إِلاَّ النَّاسَ فَقَطِ الَّذِينَ لَيْسَ لَهُمْ خَتْمُ اللهِ عَلَى جِبَاهِهِمْ. وَأُعْطِيَ أَنْ لاَ يَقْتُلَهُمْ " +
      "بَلْ أَنْ يَتَعَذَّبُوا خَمْسَةَ أَشْهُرٍ. وَعَذَابُهُ كَعَذَابِ عَقْرَبٍ إِذَا لَدَغَ إِنْسَانًا. وَفِي تِلْكَ الأَيَّامِ سَيَطْلُبُ النَّاسُ الْمَوْتَ " +
      "وَلاَ يَجِدُونَهُ، وَيَرْغَبُونَ أَنْ يَمُوتُوا فَيَهْرُبُ الْمَوْتُ مِنْهُمْ. وَشَكْلُ الْجَرَادِ شِبْهُ خَيْلٍ مُهَيَّأَةٍ لِلْحَرْبِ، وَعَلَى " +
      "رُؤُوسِهَا كَأَكَالِيلَ شِبْهِ الذَّهَبِ، وَوُجُوهُهَا كَوُجُوهِ النَّاسِ. وَكَانَ لَهَا شَعْرٌ كَشَعْرِ النِّسَاءِ، وَكَانَتْ أَسْنَانُهَا كَأَسْنَانِ " +
      "الأُسُودِ. وَكَانَ لَهَا دُرُوعٌ كَدُرُوعٍ مِنْ حَدِيدٍ، وَصَوْتُ أَجْنِحَتِهَا كَصَوْتِ مَرْكَبَاتِ خَيْلٍ كَثِيرَةٍ تَجْرِي إِلَى قِتَالٍ. " +
      "وَلَهَا أَذْنَابٌ شِبْهُ الْعَقَارِبِ، وَكَانَتْ فِي أَذْنَابِهَا حُمَاتٌ، وَسُلْطَانُهَا أَنْ تُؤْذِيَ النَّاسَ خَمْسَةَ أَشْهُرٍ. وَلَهَا مَلاَكُ " +
      "الْهَاوِيَةِ مَلِكًا عَلَيْهَا، اسْمُهُ بِالْعِبْرَانِيَّةِ «أَبَدُّونَ»، وَلَهُ بِالْيُونَانِيَّةِ اسْمُ «أَبُولِّيُّونَ». الْوَيْلُ الْوَاحِدُ " +
      "مَضَى، هُوَذَا يَأْتِي وَيْلاَنِ أَيْضًا بَعْدَ هذَا.",
  },
  narration: {
    en:
      "A key is given, a pit is opened, and smoke rises like the breath of a furnace. This trumpet " +
      "marks a solemn turn — Scripture calls what follows the first of three woes. The atmosphere " +
      "should feel weighty and serious, not theatrical.",
    ar:
      "يُعطى مفتاح، ويُفتح بئر، ويصعد دخان كنَفَس أتون. يمثّل هذا البوق منعطفاً جِدّياً — يسمّي الكتاب المقدس ما يليه " +
      "أول الويلات الثلاث. ينبغي أن يكون الجو مهيباً وجاداً، لا استعراضياً.",
  },
  cinematicSummary: {
    en: "A star descends and a chasm opens in the earth; furnace-like smoke rises and darkens the sky above it.",
    ar: "ينحدر كوكب، وينفتح شق عميق في الأرض، ويتصاعد دخان كدخان أتون يُظلم السماء فوقه.",
  },
  theme: { primary: "#8a5a1f", secondary: "#160f05", particle: "smoke-locust" },
  xpOnComplete: 250,
  introDialogue,
  closingDialogue,
  questions: [
    {
      id: "t5-q1",
      prompt: { en: "What was given to the fallen star?", ar: "ماذا أُعطي للكوكب الساقط؟" },
      options: [
        { id: "a", text: { en: "A crown", ar: "تاج" } },
        { id: "b", text: { en: "The key of the bottomless pit", ar: "مفتاح بئر الهاوية" } },
        { id: "c", text: { en: "A sword", ar: "سيف" } },
        { id: "d", text: { en: "A scroll", ar: "درج" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "The star was given the key of the bottomless pit, and when it was opened, smoke rose like from a great furnace.",
        ar: "أُعطي الكوكب مفتاح بئر الهاوية، ولما فُتحت صعد منها دخان كدخان أتون عظيم.",
      },
    },
  ],
};

export default trumpet5;
