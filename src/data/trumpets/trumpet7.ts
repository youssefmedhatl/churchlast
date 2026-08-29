import type { TrumpetData, DialogueLine } from "./types";

const introDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "Only one remains.", ar: "لم يتبقَّ سوى واحد." } },
  { speaker: "narrator", text: { en: "The seventh.", ar: "السابع." } },
  { speaker: "girl", text: { en: "Then this is the end?", ar: "إذن هذه هي النهاية؟" } },
  { speaker: "narrator", text: { en: "Listen.", ar: "استمع." } },
  { speaker: "narrator", text: { en: "The seventh trumpet brings the vision to its climax.", ar: "البوق السابع يبلغ بالرؤيا ذروتها." } },
  { speaker: "girl", text: { en: "After everything we've seen...", ar: "بعد كل ما رأيناه..." } },
  { speaker: "narrator", text: { en: "Do not look away.", ar: "لا تحوّل بصرك." } },
];

const closingDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "We've reached the seventh trumpet.", ar: "لقد وصلنا إلى البوق السابع." } },
  { speaker: "narrator", text: { en: "Yes.", ar: "نعم." } },
  { speaker: "girl", text: { en: "What should we take with us?", ar: "ماذا يجب أن نأخذ معنا؟" } },
  { speaker: "narrator", text: { en: "The Word we have heard, and the understanding we have gained.", ar: "الكلمة التي سمعناها، والفهم الذي اكتسبناه." } },
];

/** TEMPORARY PLACEHOLDER content — pending verified Coptic Reader text. Reference: Revelation 11:15-19 */
const trumpet7: TrumpetData = {
  imageSrc: "/trumpets/trumpet7.jpg", // placeholder - add public/trumpets/trumpet7.jpg
  videoSrc: "/videos/trumpet7.mp4",
  index: 7,
  title: { en: "The Seventh Trumpet", ar: "البوق السابع" },
  shortLabel: { en: "The Kingdom Proclaimed", ar: "إعلان الملكوت" },
  scriptureRef: { en: "Revelation 11:15-19", ar: "رؤيا ١١: ١٥-١٩" },
  scriptureIsTemporary: true,
  scriptureText: {
    en:
      "[TEMPORARY PLACEHOLDER — pending verified Coptic Reader text] " +
      "The seventh angel sounded; and there were great voices in heaven, saying, The kingdoms of this " +
      "world are become the kingdoms of our Lord, and of his Christ; and he shall reign for ever and ever. " +
      "And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: " +
      "and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.",
    ar:
      "[نص مؤقت — بانتظار التحقق] والملاك السابع بوّق، فحدثت أصوات عظيمة في السماء قائلة: " +
      "قد صارت ممالك العالم لربنا ومسيحه، وسيملك إلى أبد الآبدين. " +
      "وانفتح هيكل الله في السماء، وظهر تابوت عهده في هيكله، وحدثت بروق وأصوات ورعود وزلزلة وبرَد عظيم.",
  },
  narration: {
    en:
      "This is not another judgment like the six before it. It is a proclamation. Every trumpet has led " +
      "here — the moment heaven itself declares that the kingdom of this world belongs, finally and forever, " +
      "to the Lord and to His Christ. The temple opens. The ark is seen. This is the turning point the whole " +
      "journey has been building toward.",
    ar:
      "هذا ليس دينونة أخرى كالست السابقة، بل إعلان. كل بوق قاد إلى هذه اللحظة — حين تعلن السماء نفسها أن ملكوت " +
      "هذا العالم قد صار، أخيراً وإلى الأبد، للرب ولمسيحه. ينفتح الهيكل، ويظهر التابوت. هذه هي الذروة التي كانت " +
      "الرحلة كلها تتجه نحوها.",
  },
  cinematicSummary: {
    en: "The sky opens in overwhelming light; heaven's temple is revealed and the ark appears amid thunder, lightning, and a great hailstorm.",
    ar: "تنفتح السماء بنور غامر، وينكشف هيكل السماء، ويظهر التابوت وسط رعد وبرق وبرَد عظيم.",
  },
  theme: { primary: "#e8c77e", secondary: "#0a0708", particle: "silence" },
  xpOnComplete: 400,
  introDialogue,
  closingDialogue,
  questions: [
    {
      id: "t7-q1",
      prompt: {
        en: "What did the great voices in heaven proclaim at the seventh trumpet?",
        ar: "بماذا نادت الأصوات العظيمة في السماء عند البوق السابع؟",
      },
      options: [
        {
          id: "a",
          text: { en: "That the kingdoms of this world had become the Lord's and His Christ's", ar: "أن ممالك العالم صارت للرب ومسيحه" },
        },
        { id: "b", text: { en: "That the seven seals were opened", ar: "أن الختوم السبعة قد فُتحت" } },
        { id: "c", text: { en: "That the final trumpet would not sound", ar: "أن البوق الأخير لن يُنفخ" } },
        { id: "d", text: { en: "That the earth would be destroyed immediately", ar: "أن الأرض ستُدمَّر فوراً" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Great voices in heaven proclaimed that the kingdoms of this world had become the kingdoms of our Lord and of His Christ, who will reign forever.",
        ar: "نادت أصوات عظيمة في السماء أن ممالك هذا العالم قد صارت ممالك ربنا ومسيحه، الذي سيملك إلى الأبد.",
      },
    },
  ],
};

export default trumpet7;
