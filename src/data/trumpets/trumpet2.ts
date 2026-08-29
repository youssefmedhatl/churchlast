import type { TrumpetData, DialogueLine } from "./types";

const introDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "What comes with the second trumpet?", ar: "ماذا يأتي مع البوق الثاني؟" } },
  { speaker: "narrator", text: { en: "Something like a great mountain, burning with fire, is cast into the sea.", ar: "شيء كجبل عظيم متقد بالنار يُطرح في البحر." } },
  { speaker: "girl", text: { en: "A mountain?", ar: "جبل؟" } },
  { speaker: "narrator", text: { en: "That is how John describes the vision.", ar: "هكذا يصف يوحنا هذه الرؤيا." } },
  { speaker: "girl", text: { en: "Then show me.", ar: "إذن أرِني." } },
];

const closingDialogue: DialogueLine[] = [
  { speaker: "narrator", text: { en: "Now look again at the words of Scripture.", ar: "الآن انظر مرة أخرى إلى كلمات الكتاب المقدس." } },
];

/** TEMPORARY PLACEHOLDER content — pending verified Coptic Reader text. Reference: Revelation 8:8-9 */
const trumpet2: TrumpetData = {
  imageSrc: "/trumpets/trumpet2.jpg", // placeholder - add public/trumpets/trumpet2.jpg
  videoSrc: "/videos/trumpet2.mp4",
  index: 2,
  title: { en: "The Second Trumpet", ar: "البوق الثاني" },
  shortLabel: { en: "The Burning Mountain", ar: "الجبل المتقد" },
  scriptureRef: { en: "Revelation 8:8-9", ar: "رؤيا ٨: ٨-٩" },
  scriptureIsTemporary: false,
  scriptureText: {
    en:
      "The second angel sounded, and as it were a great mountain burning with fire " +
      "was cast into the sea: and a third part of the sea became blood; and a third " +
      "part of the creatures which were in the sea died; and a third part of the ships were destroyed.",
    ar:
      "ثُمَّ بَوَّقَ الْمَلاَكُ الثَّانِي، فَكَأَنَّ جَبَلاً عَظِيمًا مُتَّقِدًا بِالنَّارِ أُلْقِيَ إِلَى الْبَحْرِ، " +
      "فَصَارَ ثُلْثُ الْبَحْرِ دَمًا. وَمَاتَ ثُلْثُ الْخَلاَئِقِ الَّتِي فِي الْبَحْرِ الَّتِي لَهَا حَيَاةٌ، " +
      "وَأُهْلِكَ ثُلْثُ السُّفُنِ.",
  },
  narration: {
    en:
      "A second trumpet, a second judgment. Something like a mountain, ablaze, is cast " +
      "into the sea. The waters turn the color of blood. Life beneath the surface is undone.",
    ar:
      "بوق ثانٍ، ودينونة ثانية. شيء كجبل مشتعل يُطرح في البحر، فتتحول المياه إلى لون الدم، " +
      "وتفنى الحياة تحت السطح.",
  },
  cinematicSummary: {
    en: "A burning mass falls from the sky into the sea; the water turns deep red as ships list in the churn.",
    ar: "كتلة مشتعلة تسقط من السماء إلى البحر، وتتحول المياه إلى أحمر داكن بينما تترنح السفن.",
  },
  theme: { primary: "#7a1f2b", secondary: "#1a0d16", particle: "hail-fire" },
  xpOnComplete: 250,
  introDialogue,
  closingDialogue,
  questions: [
    {
      id: "t2-q1",
      prompt: { en: "What happened to the sea at the second trumpet?", ar: "ماذا حدث للبحر عند البوق الثاني؟" },
      options: [
        { id: "a", text: { en: "It dried up completely", ar: "جفّ تماماً" } },
        { id: "b", text: { en: "A third of it became blood", ar: "صار ثلثه دماً" } },
        { id: "c", text: { en: "It became bitter and undrinkable", ar: "صار مُرّاً غير صالح للشرب" } },
        { id: "d", text: { en: "It parted like the Red Sea", ar: "انشقّ كالبحر الأحمر" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A great burning mass was cast into the sea, turning a third of it to blood and destroying a third of its creatures and ships.",
        ar: "أُلقيت كتلة عظيمة متقدة في البحر، فصار ثلثه دماً، وهلك ثلث خلائقه وسفنه.",
      },
    },
  ],
};

export default trumpet2;
