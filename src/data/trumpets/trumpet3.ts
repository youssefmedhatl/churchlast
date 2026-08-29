import type { TrumpetData, DialogueLine } from "./types";

const introDialogue: DialogueLine[] = [
  { speaker: "girl", text: { en: "And the third trumpet?", ar: "وماذا عن البوق الثالث؟" } },
  { speaker: "narrator", text: { en: "A great star falls from heaven. Its name is Wormwood.", ar: "نجم عظيم يسقط من السماء. اسمه الأفسنتين." } },
  { speaker: "girl", text: { en: "What happens next?", ar: "ماذا يحدث بعد ذلك؟" } },
  { speaker: "narrator", text: { en: "Watch the vision. Then read what follows.", ar: "راقب الرؤيا. ثم اقرأ ما يليها." } },
];

const closingDialogue: DialogueLine[] = [
  { speaker: "narrator", text: { en: "Remember the name: Wormwood.", ar: "تذكّر الاسم: الأفسنتين." } },
];

/** TEMPORARY PLACEHOLDER content — pending verified Coptic Reader text. Reference: Revelation 8:10-11 */
const trumpet3: TrumpetData = {
  imageSrc: "/trumpets/trumpet3.jpg", // placeholder - add public/trumpets/trumpet3.jpg
  videoSrc: "/videos/trumpet3.mp4",
  index: 3,
  title: { en: "The Third Trumpet", ar: "البوق الثالث" },
  shortLabel: { en: "The Star Wormwood", ar: "نجم الأفسنتين" },
  scriptureRef: { en: "Revelation 8:10-11", ar: "رؤيا ٨: ١٠-١١" },
  scriptureIsTemporary: false,
  scriptureText: {
    en:
      "The third angel sounded, and there fell a great star from heaven, burning as it were a lamp, " +
      "and it fell upon a third part of the rivers, and upon the fountains of waters; and the name of " +
      "the star is called Wormwood: and many men died of the waters, because they were made bitter.",
    ar:
      "ثُمَّ بَوَّقَ الْمَلاَكُ الثَّالِثُ، فَسَقَطَ مِنَ السَّمَاءِ كَوْكَبٌ عَظِيمٌ مُتَّقِدٌ كَمِصْبَاحٍ، " +
      "وَوَقَعَ عَلَى ثُلْثِ الأَنْهَارِ وَعَلَى يَنَابِيعِ الْمِيَاهِ. وَاسْمُ الْكَوْكَبِ يُدْعَى «الأَفْسَنْتِينُ». " +
      "فَصَارَ ثُلْثُ الْمِيَاهِ أَفْسَنْتِينًا، وَمَاتَ كَثِيرُونَ مِنَ النَّاسِ مِنَ الْمِيَاهِ لأَنَّهَا صَارَتْ مُرَّةً.",
  },
  narration: {
    en:
      "A star falls, not silently, but burning like a torch across the sky. It touches the rivers, " +
      "the springs — the sources of life itself — and turns them bitter.",
    ar: "يسقط نجم، لا بصمت، بل متقداً كمشعل عبر السماء. يلامس الأنهار والينابيع — مصادر الحياة ذاتها — فيحوّلها مُرّة.",
  },
  cinematicSummary: {
    en: "A blazing star streaks down and touches a river; the water darkens and turns bitter, spreading outward.",
    ar: "نجم متقد ينحدر ليلامس نهراً، فتظلم المياه وتصبح مرّة، وينتشر الأثر تدريجياً.",
  },
  theme: { primary: "#5a7a3f", secondary: "#12180d", particle: "falling-star" },
  xpOnComplete: 250,
  introDialogue,
  closingDialogue,
  questions: [
    {
      id: "t3-q1",
      prompt: { en: "What was the name of the falling star?", ar: "ما اسم النجم الساقط؟" },
      options: [
        { id: "a", text: { en: "Abaddon", ar: "أبدون" } },
        { id: "b", text: { en: "Lucifer", ar: "لوسيفر" } },
        { id: "c", text: { en: "Wormwood", ar: "الأفسنتين" } },
        { id: "d", text: { en: "Michael", ar: "ميخائيل" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "The star that fell upon the rivers and springs, turning the waters bitter, was named Wormwood.",
        ar: "النجم الذي سقط على الأنهار والينابيع، وحوّل المياه مرّة، كان اسمه الأفسنتين.",
      },
    },
  ],
};

export default trumpet3;
