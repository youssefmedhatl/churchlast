import type { Bilingual } from "./trumpets/types";

export interface EmojiQuestionOption {
  id: string;
  text: Bilingual;
}

export interface EmojiQuestion {
  id: string;
  /** Which trumpet (1-7) this puzzle represents. */
  trumpetIndex: number;
  /** Exactly 16 emojis. */
  emojis: string[];
  options: EmojiQuestionOption[];
  correctOptionId: string;
  hint: Bilingual;
  difficulty: "easy" | "medium" | "hard";
  explanation: Bilingual;
}

// Modular by design: to add or edit a puzzle, just change the objects below —
// no game-logic changes required. Every entry must have exactly 16 emojis
// and exactly one correctOptionId matching one of its options.
export const emojiQuestions: EmojiQuestion[] = [
  {
    id: "eq-trumpet-1",
    trumpetIndex: 1,
    emojis: ["1️⃣", "📯", "🧊", "🔥", "🩸", "⬇️", "🌍", "🌳", "🌳", "🌳", "🔥", "🌿", "🔥", "😱", "☁️", "💥"],
    options: [
      { id: "a", text: { en: "Hail and fire burn a third of the trees and all green grass", ar: "برد ونار يحرقان ثلث الأشجار وكل العشب الأخضر" } },
      { id: "b", text: { en: "A burning mountain is cast into the sea", ar: "جبل متقد يُطرح في البحر" } },
      { id: "c", text: { en: "A star named Wormwood poisons the waters", ar: "نجم يُدعى الأفسنتين يُسمّم المياه" } },
      { id: "d", text: { en: "Locusts rise from the smoke of the abyss", ar: "جراد يصعد من دخان الهاوية" } },
    ],
    correctOptionId: "a",
    hint: {
      en: "Ice, fire, and blood fall together onto trees and grass.",
      ar: "الجليد والنار والدم تسقط معًا على الأشجار والعشب.",
    },
    difficulty: "easy",
    explanation: {
      en: "At the first trumpet, hail and fire mingled with blood were cast on the earth, burning up a third of the trees and all the green grass (Revelation 8:7).",
      ar: "عند البوق الأول، سقط برد ونار مختلطان بدم على الأرض، فاحترق ثلث الأشجار وكل العشب الأخضر (رؤيا ٨: ٧).",
    },
  },
  {
    id: "eq-trumpet-2",
    trumpetIndex: 2,
    emojis: ["2️⃣", "📯", "⛰️", "🔥", "⬇️", "🌊", "🩸", "🌊", "🐟", "💀", "🐠", "💀", "⛵", "⛵", "💥", "🌊"],
    options: [
      { id: "a", text: { en: "Hail and fire burn a third of the trees and all green grass", ar: "برد ونار يحرقان ثلث الأشجار وكل العشب الأخضر" } },
      { id: "b", text: { en: "A great burning mountain is cast into the sea, turning a third of it to blood", ar: "جبل عظيم متقد يُطرح في البحر فيصير ثلثه دمًا" } },
      { id: "c", text: { en: "The sun, moon, and stars are struck with darkness", ar: "تُضرب الشمس والقمر والنجوم بالظلام" } },
      { id: "d", text: { en: "Four angels bound at the Euphrates are released", ar: "يُطلَق أربعة ملائكة مقيدين عند الفرات" } },
    ],
    correctOptionId: "b",
    hint: {
      en: "A blazing mountain falls into the sea, and a third of sea creatures and ships are destroyed.",
      ar: "جبل مشتعل يسقط في البحر، ويهلك ثلث مخلوقات البحر والسفن.",
    },
    difficulty: "easy",
    explanation: {
      en: "At the second trumpet, something like a great mountain burning with fire was cast into the sea; a third of the sea became blood, a third of sea creatures died, and a third of the ships were destroyed (Revelation 8:8-9).",
      ar: "عند البوق الثاني، أُلقي إلى البحر كأنه جبل عظيم متقد بالنار، فصار ثلث البحر دمًا، ومات ثلث الخلائق التي في البحر، وأُهلك ثلث السفن (رؤيا ٨: ٨-٩).",
    },
  },
  {
    id: "eq-trumpet-3",
    trumpetIndex: 3,
    emojis: ["3️⃣", "📯", "⭐", "🔥", "⬇️", "🏞️", "💧", "☠️", "😢", "💀", "🚰", "😖", "🌊", "🍋", "☁️", "🔥"],
    options: [
      { id: "a", text: { en: "A burning mountain is cast into the sea", ar: "جبل متقد يُطرح في البحر" } },
      { id: "b", text: { en: "Locusts with scorpion tails torment mankind for five months", ar: "جراد بأذناب كالعقارب يعذب البشر خمسة أشهر" } },
      { id: "c", text: { en: "A great star named Wormwood falls, making a third of the waters bitter", ar: "نجم عظيم يُدعى الأفسنتين يسقط، فتصير مياه كثيرة مُرّة" } },
      { id: "d", text: { en: "The kingdom of the world becomes the kingdom of the Lord", ar: "تصير ممالك العالم مملكة لربنا" } },
    ],
    correctOptionId: "c",
    hint: {
      en: "A burning star falls on the rivers and springs, turning the water bitter — many die from it.",
      ar: "نجم متقد يسقط على الأنهار والينابيع، فتصير المياه مُرّة، ويموت كثيرون بسببها.",
    },
    difficulty: "medium",
    explanation: {
      en: "At the third trumpet, a great star called Wormwood fell on a third of the rivers and springs, and many people died from the water because it turned bitter (Revelation 8:10-11).",
      ar: "عند البوق الثالث، سقط كوكب عظيم يُدعى الأفسنتين على ثلث الأنهار والينابيع، ومات كثيرون من الناس من المياه لأنها صارت مُرّة (رؤيا ٨: ١٠-١١).",
    },
  },
  {
    id: "eq-trumpet-4",
    trumpetIndex: 4,
    emojis: ["4️⃣", "📯", "☀️", "🌑", "🌙", "🌑", "⭐", "🌑", "⬛", "🌗", "😨", "🦅", "🗣️", "⚠️", "⚠️", "⚠️"],
    options: [
      { id: "a", text: { en: "A third of the sun, moon, and stars are darkened, and an eagle cries three woes", ar: "يُظلم ثلث الشمس والقمر والنجوم، ويصرخ نسر بثلاثة ويلات" } },
      { id: "b", text: { en: "Hail and fire burn a third of the trees and all green grass", ar: "برد ونار يحرقان ثلث الأشجار وكل العشب الأخضر" } },
      { id: "c", text: { en: "Two witnesses prophesy for 1,260 days", ar: "شاهدان يتنبآن ١٢٦٠ يومًا" } },
      { id: "d", text: { en: "An army of 200 million horsemen kills a third of mankind", ar: "جيش من مئتي مليون فارس يقتل ثلث البشر" } },
    ],
    correctOptionId: "a",
    hint: {
      en: "Light itself dims — sun, moon, and stars lose a third of their brightness, and a flying angel warns of three woes to come.",
      ar: "النور نفسه يخفت — تفقد الشمس والقمر والنجوم ثلث ضيائها، ويحذّر ملاك طائر من ثلاثة ويلات آتية.",
    },
    difficulty: "medium",
    explanation: {
      en: "At the fourth trumpet, a third of the sun, moon, and stars were struck so that a third of them was darkened, and an angel flying overhead cried, 'Woe, woe, woe' (Revelation 8:12-13).",
      ar: "عند البوق الرابع، ضُرب ثلث الشمس وثلث القمر وثلث النجوم حتى أظلم ثلثهنّ، وصرخ ملاك طائر: «ويل ويل ويل» (رؤيا ٨: ١٢-١٣).",
    },
  },
  {
    id: "eq-trumpet-5",
    trumpetIndex: 5,
    emojis: ["5️⃣", "📯", "⭐", "⬇️", "🕳️", "🔑", "💨", "🦂", "🐴", "👑", "😈", "🦁", "😖", "5️⃣", "😵", "👹"],
    options: [
      { id: "a", text: { en: "Locusts like scorpions rise from the smoke of the bottomless pit to torment men for five months", ar: "جراد كالعقارب يصعد من دخان الهاوية ليعذب الناس خمسة أشهر" } },
      { id: "b", text: { en: "A great star named Wormwood makes the waters bitter", ar: "نجم يُدعى الأفسنتين يجعل المياه مُرّة" } },
      { id: "c", text: { en: "Four angels bound at the Euphrates are released to kill a third of mankind", ar: "يُطلَق أربعة ملائكة عند الفرات ليقتلوا ثلث البشر" } },
      { id: "d", text: { en: "The temple of God in heaven is opened", ar: "ينفتح هيكل الله في السماء" } },
    ],
    correctOptionId: "a",
    hint: {
      en: "A fallen star opens a smoking pit, releasing locusts with a scorpion's sting, ruled by a king named Abaddon.",
      ar: "نجم ساقط يفتح بئرًا يصعد منها دخان، فيخرج منه جراد بلدغة كالعقارب، وله ملك اسمه أبدّون.",
    },
    difficulty: "medium",
    explanation: {
      en: "At the fifth trumpet, a fallen star opened the bottomless pit; smoke rose from it, and locusts like scorpions came out to torment for five months those without God's seal (Revelation 9:1-12).",
      ar: "عند البوق الخامس، فتح النجم الساقط بئر الهاوية، فصعد منها دخان، وخرج منه جراد كالعقارب ليعذب خمسة أشهر من ليس له ختم الله (رؤيا ٩: ١-١٢).",
    },
  },
  {
    id: "eq-trumpet-6",
    trumpetIndex: 6,
    emojis: ["6️⃣", "📯", "😇", "😇", "😇", "😇", "⛓️", "🌊", "🔓", "🐴", "🐴", "🐴", "🔥", "💨", "🟡", "☠️"],
    options: [
      { id: "a", text: { en: "Locusts torment mankind for five months", ar: "الجراد يعذب البشر خمسة أشهر" } },
      { id: "b", text: { en: "Four angels bound at the Euphrates are released, and an army of horsemen kills a third of mankind", ar: "يُطلَق أربعة ملائكة مقيدين عند الفرات، وجيش من الفرسان يقتل ثلث البشر" } },
      { id: "c", text: { en: "A mighty angel gives John a small scroll to eat", ar: "ملاك قوي يعطي يوحنا سفرًا صغيرًا ليأكله" } },
      { id: "d", text: { en: "The seventh angel proclaims the kingdom of the Lord", ar: "الملاك السابع يعلن ملكوت الرب" } },
    ],
    correctOptionId: "b",
    hint: {
      en: "Four angels bound at a great river are set loose, leading a vast cavalry that kills a third of mankind with fire, smoke, and sulfur.",
      ar: "أربعة ملائكة مقيدون عند نهر عظيم يُطلَقون، ويقود فرسانهم فتكًا بثلث البشر بالنار والدخان والكبريت.",
    },
    difficulty: "hard",
    explanation: {
      en: "At the sixth trumpet, the four angels bound at the river Euphrates were released, leading an army of 200 million horsemen whose fire, smoke, and sulfur killed a third of mankind (Revelation 9:13-21).",
      ar: "عند البوق السادس، انفكّ الأربعة الملائكة المقيدون عند نهر الفرات، وقاد فرسانهم البالغ عددهم مئتي مليون فتك ثلث البشر بالنار والدخان والكبريت (رؤيا ٩: ١٣-٢١).",
    },
  },
  {
    id: "eq-trumpet-7",
    trumpetIndex: 7,
    emojis: ["7️⃣", "📯", "🗣️", "👑", "👑", "🌍", "🙌", "🧎", "🙏", "⚡", "⛈️", "🌍", "📦", "✝️", "🎉", "♾️"],
    options: [
      { id: "a", text: { en: "Locusts rise from the smoke of the abyss", ar: "جراد يصعد من دخان الهاوية" } },
      { id: "b", text: { en: "An army of horsemen kills a third of mankind", ar: "جيش من الفرسان يقتل ثلث البشر" } },
      { id: "c", text: { en: "Loud voices proclaim that the kingdom of the world has become the kingdom of the Lord forever", ar: "أصوات عظيمة تعلن أن مملكة العالم قد صارت لربنا إلى الأبد" } },
      { id: "d", text: { en: "A great star named Wormwood falls from heaven", ar: "نجم عظيم يُدعى الأفسنتين يسقط من السماء" } },
    ],
    correctOptionId: "c",
    hint: {
      en: "Elders fall down and worship, declaring that the Lord now reigns forever and ever.",
      ar: "الشيوخ يسجدون ويعبدون الله، معلنين أن الرب سيملك إلى أبد الآبدين.",
    },
    difficulty: "medium",
    explanation: {
      en: "At the seventh trumpet, loud voices in heaven declared, 'The kingdoms of this world are become the kingdoms of our Lord, and of his Christ; and he shall reign for ever and ever' (Revelation 11:15-19).",
      ar: "عند البوق السابع، دوّت أصوات عظيمة في السماء قائلة: «قد صارت ممالك العالم لربنا ومسيحه، فسيملك إلى أبد الآبدين» (رؤيا ١١: ١٥-١٩).",
    },
  },
];
