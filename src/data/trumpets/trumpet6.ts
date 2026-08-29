import type { TrumpetData, DialogueLine } from "./types";

const introDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "Six trumpets already.", ar: "ستة أبواق بالفعل." } },
  {
    speaker: "narrator",
    text: { en: "And the sixth brings another great vision.", ar: "والسادس يحمل رؤيا عظيمة أخرى." },
  },
  { speaker: "girl", text: { en: "What should I look for?", ar: "ما الذي يجب أن أبحث عنه؟" } },
  { speaker: "narrator", text: { en: "Listen first. Then watch.", ar: "استمع أولاً. ثم راقب." } },
];

const closingDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "Horses...", ar: "خيول..." } },
  {
    speaker: "narrator",
    text: { en: "Look closely at the description.", ar: "انظر بتمعّن إلى الوصف." },
  },
];

/** TEMPORARY PLACEHOLDER content — pending verified Coptic Reader text. Reference: Revelation 9:13-21 */
const trumpet6: TrumpetData = {
  videoSrc: "/videos/trumpet6.mp4",
  imageSrc: "/trumpets/trumpet6.jpg", // placeholder - add public/trumpets/trumpet6.jpg
  index: 6,
  title: { en: "The Sixth Trumpet", ar: "البوق السادس" },
  shortLabel: { en: "The Four Angels Loosed", ar: "الملائكة الأربعة المُطلَقون" },
  scriptureRef: { en: "Revelation 9:17-18", ar: "رؤيا ٩: ١٧-١٨" },
  scriptureIsTemporary: false,
  scriptureText: {
    en:
      "And thus I saw the horses in the vision, and them that sat on them, having breastplates of fire, " +
      "and of jacinth, and brimstone: and the heads of the horses were as the heads of lions; and out of " +
      "their mouths issued fire and smoke and brimstone. By these three was the third part of men killed, " +
      "by the fire, and by the smoke, and by the brimstone, which issued out of their mouths.",
    ar:
      "وَهَكَذَا رَأَيْتُ الْخَيْلَ فِي الرُّؤْيَا، وَالْجَالِسِينَ عَلَيْهَا، لَهُمْ دُرُوعٌ نَارِيَّةٌ وَأَسْمَانْجُونِيَّةٌ وَكِبْرِيتِيَّةٌ، " +
      "وَرُؤُوسُ الْخَيْلِ كَرُؤُوسِ الأُسُودِ، وَمِنْ أَفْوَاهِهَا يَخْرُجُ نَارٌ وَدُخَانٌ وَكِبْرِيتٌ. مِنْ هَذِهِ الثَّلاَثَةِ قُتِلَ ثُلْثُ النَّاسِ، " +
      "مِنَ النَّارِ وَالدُّخَانِ وَالْكِبْرِيتِ الْخَارِجَةِ مِنْ أَفْوَاهِهَا.",
  },
  narration: {
    en:
      "A command comes from the altar itself. Four angels, long bound at the great river Euphrates, " +
      "are released. Scripture describes a vast army set in motion — a judgment of far greater scale " +
      "than what has come before.",
    ar:
      "يأتي أمر من المذبح نفسه. تُطلق أربعة ملائكة كانت مقيدة منذ زمن طويل عند نهر الفرات الكبير. " +
      "يصف الكتاب المقدس جيشاً هائلاً يتحرك — دينونة أوسع نطاقاً بكثير مما سبق.",
  },
  cinematicSummary: {
    en: "At a great river, bound figures are released; the horizon fills with a vast advancing host under smoke and fire.",
    ar: "عند نهر عظيم، تُطلق كائنات كانت مقيدة، ويمتلئ الأفق بجيش هائل يتقدّم تحت دخان ونار.",
  },
  theme: { primary: "#7a2f1f", secondary: "#150a08", particle: "horsemen" },
  xpOnComplete: 250,
  introDialogue,
  closingDialogue,
  questions: [
    {
      id: "t6-q1",
      prompt: { en: "Where were the four angels bound?", ar: "أين كان الملائكة الأربعة مقيّدين؟" },
      options: [
        { id: "a", text: { en: "The great river Euphrates", ar: "النهر الكبير الفرات" } },
        { id: "b", text: { en: "Mount Sinai", ar: "جبل سيناء" } },
        { id: "c", text: { en: "The Red Sea", ar: "البحر الأحمر" } },
        { id: "d", text: { en: "The Jordan River", ar: "نهر الأردن" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The four angels were bound at the great river Euphrates and were released to bring judgment upon a third of mankind.",
        ar: "كان الملائكة الأربعة مقيّدين عند النهر الكبير الفرات، وأُطلقوا لتنفيذ دينونة على ثلث البشر.",
      },
    },
  ],
};

export default trumpet6;
