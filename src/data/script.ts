import type { DialogueLine } from "./trumpets/types";

/**
 * SEVEN TRUMPETS — VERBATIM SCRIPT (already recorded for voice-over).
 *
 * Transcribed word-for-word from the final approved script document
 * ("السبع أبواق - النص الكامل للمسرحية / السكريبت", مدرسة الكتاب المقدس).
 * The Arabic text is split into shorter dialogue turns for on-screen
 * pacing, but every turn's Arabic text is copied verbatim from the
 * source script — nothing has been reworded, shortened, or paraphrased,
 * so it stays in sync with the recorded narration. English lines are a
 * plain-meaning translation for non-Arabic readers only; they are not
 * used for audio.
 *
 * Speakers (3 portraits, reused across the whole piece):
 *  - "narrator" → الراوي (the Narrator) — opening monologue, and every third-person
 *                 stage-direction / narration line throughout the script
 *  - "girl"    → الشخصية الرئيسية (the Main Character / protagonist)
 *  - "angel"   → the Angel guarding each of the seven doors — same portrait,
 *                a distinct on-screen name per door via `speakerLabel`.
 *
 * The verified Coptic Orthodox / Coptic Reader Scripture passage for each
 * trumpet is shown separately by ScripturePanel — quoted verses that
 * appear inline in the script are lifted out into `scriptureText` in the
 * matching trumpetN.ts file instead of being repeated here.
 */

export interface TrumpetScript {
  intro: DialogueLine[];
  closing: DialogueLine[];
}

const angelLabel = (ar: string, en: string) => ({ ar, en });

export const openingScript: DialogueLine[] = [
  {
    // Merged: one continuous recording (opening-narrator.m4a) covers the
    // whole opening monologue, so it's shown as a single turn in sync with it.
    speaker: "narrator",
    audioSrc: ["/audio/doors/opening-narrator.m4a"],
    text: {
      ar:
        "كل اللي هتشوفه او هتسمعه هنا مرتبط بحدث واحد , حدث لسة مبدأش بس مكتوب من زمن بعيد جدا , " +
        "هتسمع اصوات وهتشوف علامات , اظن انك عارف ان عندنا سبع ابواق , بس اللي متعرفوش ان محدش هيفهم البوق السابع , " +
        "غير اللي فهم البوق الاول , ومطلوب التركيز لان في كلمات بعد ما تسمعها وتفهمها مش هترجع زي مكانت قبل ما تسمعها ! " +
        "حافظ علي نفسك لان مفيش اكتر من العوائق, اللي لو وقعت فواحد منها حياتك هتنتهي ! " +
        "اشوفك في النهاية يا بطل...... " +
        "البوابة الاولى :",
      en:
        "Everything you're about to see or hear here is tied to one event — an event that hasn't begun yet, but was written long, long ago, " +
        "you'll hear voices and see signs. I think you already know we have seven trumpets — but what you don't know is that no one will understand the seventh trumpet, " +
        "except the one who has understood the first. Stay focused — there are words that, once you hear and understand them, you can never go back to who you were before hearing them! " +
        "Guard yourself — there is nothing but obstacles ahead, and if you fall into even one of them, your life will end! " +
        "See you at the end, hero...... " +
        "The First Gate:",
    },
  },
];

// ---------------------------------------------------------------------
// Door 1 — الملاك الأول
// ---------------------------------------------------------------------
const trumpet1: TrumpetScript = {
  intro: [
    {
      // Merged: one continuous recording (door1-angel.m4a) covers this
      // whole speech, so it plays as a single turn in sync with the clip.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الأول", "The First Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door1-angel.m4a"],
      text: {
        ar:
          "بوقي مش بيجي منغير اثر, اللي كان اخضر اتحرق , حاجتين ميتجمعوش اتحولوا مع بعض لهجوم قاسي , طبعا مش فاهم , " +
          "هشرح واحدة واحدة واهم حاجة متستعجلش..............عشان متخسرش كل حاجة ! " +
          "الحاجتين هما النار و البرد البرد هو بخار المتجمد تجمع على شكل كورات تلج وبيشير لقوة التأديب, " +
          "اما النار فهي اشارة لشدة غضب الله , البرد والنار كونوا الهجوم القاسي اللي اول ما هيضرب الارض تلت الاشجار وكل عشب الارض هيتحرقوا, " +
          "والهدف من التأديب ده إذلال المتكبرين علشان تتحقق نبوة اشعياء " +
          '" فإن لرب الجنود يوما علي كل متعظم وعال , وعلي كل مرتفع فيوضع , وعلي كل ارز لبنان العالي المرتفع ,وعلي كل بلوط باشان" ' +
          "اظن انت جاهز تاخد مفتاح الباب التاني دلوقتي , خد بالك من اللي جاي",
        en:
          "My trumpet never comes without a trace — what was green is burned. Two things that don't normally mix came together for a harsh attack. " +
          "Of course, you don't understand — I'll explain them one by one, and most importantly, don't rush.............. or you'll lose everything! " +
          "The two things are fire and hail. Hail is frozen vapor gathered into balls of ice, a sign of the power of discipline, " +
          "while fire is a sign of the intensity of God's anger. Together, hail and fire form the harsh attack — the moment it strikes the earth, a third of the trees and all the earth's grass will burn, " +
          "and the purpose of this discipline is to humble the arrogant, so that Isaiah's prophecy comes true: " +
          '"For the LORD of hosts has a day against everyone who is proud and lofty, against everyone who is lifted up — and it shall be brought low; against all the cedars of Lebanon, and against all the oaks of Bashan." ' +
          "I think you're ready to take the key to the second door now. Watch yourself with what's coming.",
      },
    },
  ],
  closing: [],
};

// ---------------------------------------------------------------------
// Door 2 — الملاك الثاني
// ---------------------------------------------------------------------
const trumpet2: TrumpetScript = {
  intro: [
    {
      // Merged: door2-angel-part1.m4a covers this pair, up to where the
      // girl interrupts.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثاني", "The Second Angel"),
      audioSrc: ["/audio/doors/door2-angel-part1.m4a"],
      text: {
        ar:
          "البوق ده مش جاي بنار من الارض زي البوق الاول,شئ عظيم مولع بالنار اتدمر ووقع في البحر واخل بالبحر وبكل حاجة فيه , " +
          "تقدري هنا تتكلمي وتسألي عشان تعرفي كل معلومة تقدر تساعدك في الطريق",
        en:
          "This trumpet doesn't bring fire from the earth like the first trumpet — something great, burning with fire, was destroyed and fell into the sea, disturbing the sea and everything in it, " +
          "you're free to speak and ask here, so you can learn anything that might help you along the way.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part01.m4a"],
      text: {
        ar: "اعتقد لو حاجة عظيمة في الحجم علي الارض مش هيكون في انسب من الجبال, صح؟",
        en: "I think if something is great in size on the earth, nothing would fit better than a mountain, right?",
      },
    },
    {
      // Merged: door2-angel-part2.m4a picks up from here to the end of the door.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثاني", "The Second Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door2-angel-part2.m4a"],
      text: {
        ar:
          "حقيقي ابهرتيني , شكلك شخصية ذكية , " +
          "هو فعلا جبل متقد بالنار و بيشير لقائد عسكري دموي هيعمل حرب في العالم وهيقتل تلت العالم " +
          "والبحر بيشير للنفوس المضطربة وربنا سمح بالجبل ده انه ينزل فوسط المضطربين ويقتل تلتهم بس عشان يسيب فرصة للباقي يتوبوا ويرجعوله , " +
          "عجبتيني بذكائك ركزي وحافظي علي نفسك , سلام",
        en:
          "You really impressed me — you seem like a smart one, " +
          "it really is a mountain burning with fire, pointing to a bloodthirsty military leader who will wage war on the world and kill a third of it, " +
          "and the sea points to troubled souls. God allowed this mountain to fall among the troubled and kill a third of them, only so the rest would have a chance to repent and return to Him, " +
          "I like how sharp you are — stay focused, and take care of yourself. Peace.",
      },
    },
  ],
  closing: [],
};

// ---------------------------------------------------------------------
// Door 3 — الملاك الثالث
// ---------------------------------------------------------------------
const trumpet3: TrumpetScript = {
  intro: [
    { speaker: "girl", audioSrc: ["/audio/doors/girl-part02.m4a"], text: { ar: "في حد هنا ؟", en: "Is anyone here?" } },
    {
      // door3-angel-part1.m4a
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثالث", "The Third Angel"),
      audioSrc: ["/audio/doors/door3-angel-part1.m4a"],
      text: {
        ar: "انتي مين ؟ وقدرتي تدخلي بابي ازاي؟",
        en: "Who are you? And how did you manage to get through my door?",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part03.m4a"],
      text: {
        ar: "انا حد عدي من البرد والنار والجبل المتقد",
        en: "I'm someone who made it past the hail, the fire, and the burning mountain.",
      },
    },
    {
      // door3-angel-part2.m4a
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثالث", "The Third Angel"),
      audioSrc: ["/audio/doors/door3-angel-part2.m4a"],
      text: {
        ar: "واضح انك ذكية عشان تعدي دول , بس كل دول مش زي بوقي , شئ عظيم مضئ اسمه الافسنتين, لوث المياه وموت ناس كتير اوي",
        en: "Clearly you're clever to have gotten past those — but none of that compares to my trumpet. Something great and shining, called Wormwood, polluted the waters and killed a great many people.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part04.m4a"],
      text: { ar: "مش الافسنتين ده نبات مر ؟", en: "Isn't Wormwood a bitter plant?" },
    },
    {
      // door3-angel-part3.m4a
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثالث", "The Third Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door3-angel-part3.m4a"],
      text: {
        ar: "واضح انك ذكية فعلا , اه الافسنتين نبات مر , بس عشان نفهم ايه المقصود بيه محتاجين نقرأ رؤيا 8 عدد 10 و11",
        en: "You really are clever — yes, Wormwood is a bitter plant. But to understand what's meant by it, we need to read Revelation chapter 8, verses 10 and 11.",
      },
    },
  ],
  closing: [
    {
      // Merged: door3-angel-part4.m4a covers this pair.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثالث", "The Third Angel"),
      audioSrc: ["/audio/doors/door3-angel-part4.m4a"],
      text: {
        ar:
          "وقوع الكوكب ده اشارة للتأديب المر والكوكب نفسه اشارة لشخصيات دينية كتير هيسقطوا ويحاولوا يفسدوا التعليم زي أريوس ونسطور فهيسمموا الانهار ويمرروها وهتموت ناس كتير اوي , " +
          "في حاجة تانية محتاجة تعرفيها؟",
        en:
          "This star falling is a sign of bitter discipline, and the star itself points to many religious figures who will fall and try to corrupt the teaching — like Arius and Nestorius — poisoning the rivers and making them bitter, and a great many people will die, " +
          "Is there anything else you need to know?",
      },
    },
    { speaker: "girl", audioSrc: ["/audio/doors/girl-part05.m4a"], text: { ar: "لا تمام كدة, شكرا", en: "No, that's clear. Thank you." } },
    {
      // door3-angel-part5.m4a
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الثالث", "The Third Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door3-angel-part5.m4a"],
      text: {
        ar: "المفتاح الرابع اهو , يلا اتفضل من هنا",
        en: "Here's the fourth key. Go ahead, this way.",
      },
    },
  ],
};

// ---------------------------------------------------------------------
// Door 4 — الملاك الرابع
// ---------------------------------------------------------------------
const trumpet4: TrumpetScript = {
  intro: [
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الرابع", "The Fourth Angel"),
      audioSrc: ["/audio/doors/door4-angel-part1.m4a"],
      text: {
        ar: "بعد ضرب بوقي السماء مش هتبقى فحالتها",
        en: "After my trumpet is sounded, the sky will not stay as it is.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part06.m4a"],
      text: {
        ar: "ليه ؟ هو بوقك هيعمل ايه في السماء ؟",
        en: "Why? What will your trumpet do to the sky?",
      },
    },
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الرابع", "The Fourth Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door4-angel-part2.m4a"],
      text: { ar: "تعالي نقرأ عدد 12", en: "Come, let's read verse 12." },
    },
  ],
  closing: [
    {
      // Merged: combines the two "the sky darkens" turns into one continuous beat.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الرابع", "The Fourth Angel"),
      audioSrc: ["/audio/doors/door4-angel-part3.m4a"],
      text: {
        ar:
          "اعتقد انك مشفتيش إنذار بالخطورة دي قبل كدة , الشمس والقمر ثلثهم هيضرب وبالتالي الظلام هيزيد , " +
          "والظلام بيشل حركة الانسان خصوصا لو زادت مدته , بيفقد الانسان نشاطه وهيمنع نمو النباتات",
        en:
          "I don't think you've seen a warning this severe before — a third of the sun and moon will be struck, so darkness will increase, " +
          "and darkness cripples human activity, especially the longer it lasts — a person loses their energy, and it stops plants from growing.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part07.m4a"],
      text: { ar: "طب ما كدة ده تعذيب للبشر", en: "But isn't that torture for humanity?" },
    },
    {
      // Merged: combines the closing three turns (purpose / key hand-off) into one continuous beat.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الرابع", "The Fourth Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door4-angel-part4.m4a"],
      text: {
        ar:
          "هي صحيح تبان كدة , لكن مش ده الغرض , المقصود من ده كله ان الانسان يفوق لنفسه ويرجع للحق ويرجع يدور علي النور الحقيقي اللي هو ربنا , " +
          "كدة انا جاوبتك , المفتاح الخامس اهو , وخد بالك اوي من باقي الطريق , سلام",
        en:
          "It really does look that way, but that's not the purpose. The point of all of it is for a person to wake up to themselves, return to the truth, and go back to searching for the real light — which is God, " +
          "There, I've answered you. Here's the fifth key — and be very careful for the rest of the way. Peace.",
      },
    },
  ],
};

// ---------------------------------------------------------------------
// Door 5 — الملاك الخامس
// ---------------------------------------------------------------------
const trumpet5: TrumpetScript = {
  intro: [
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الخامس", "The Fifth Angel"),
      audioSrc: ["/audio/doors/door5-first-voiceover.wav"],
      text: {
        ar: "نادرا ما حد بيوصل هنا , بس بما انك وصلتي هنا قوليلي ,تعرفي ايه عن الويل الاول",
        en: "Rarely does anyone make it here — but since you have, tell me: what do you know about the first woe?",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part08.m4a"],
      text: {
        ar: "اللي اعرفه انه تقريبا في البوق ده بئر الجحيم هتفتح وهيكون في جراد بقوة الاسود ولدعته زي لدعة العقرب واستعداده هيكون زي استعداد احصنة للحرب",
        en: "What I know is that in this trumpet, the pit of the abyss opens, and there will be locusts with the strength of lions, whose sting is like a scorpion's, and they'll be equipped like horses prepared for war.",
      },
    },
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الخامس", "The Fifth Angel"),
      audioSrc: ["/audio/doors/door5-new-bridge.m4a"],
      text: {
        ar: "دنتي\nمذاكرة كويس بقا ,\nلازم\nنقرأ كويس الاول",
        en: "You really need to study well then — we need to read carefully first.",
      },
    },
  ],
  closing: [
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك الخامس", "The Fifth Angel"),
      audioSrc: ["/audio/doors/door5-new-explanation.m4a"],
      text: {
        ar:
          "في بعض التفاسير سقوط الكوكب ده اشارة لانتكاسة هتحصل لشخصية دينية مركزها كبير , و ده اللي هيفتح بئر الجحيم وهيملى العالم بدخان الشياطين اللي هي افكارهم , وهيخرج الجراد المخرب وعشان تفهمي خطورة الجراد انه اتشبه الاحصنة المجهزة للحرب وهيكون بوجه بشر , والاكاليل هتبقى اشارة للسلطان اللي هيكون عند الجراد ده , هتكون شكلها جميل وعندها شعر زي شعر النساء , لكن عندها اسنان شبه اسنان الاسود فحدتها , ودروعها وصوت اجنحتها المفزع اشارة لشده عنف وانتشار الجراد وهتعذب البشر لمدة خمس شهور وملكها اسمه أبدون او ابولين اللي معناه المخرب او المهلك , ورغم كل اللي اتقال عن البوق ده ,بنشوف برضه حنان ورحمة ربنا , فهو مسمحش بهلاك الخليقة كلها ,وده ظهر بردو فحنانه علي الضعفاة , بيحفظ اللي فبداية الايمان وبيعتني بالنفوس الضعيفة اللي محتاجه حنانه ورحمته اكتر مهما كان اللي شوفته في البوق ده مش هيكون حاجة قصاد اللي جاي , سلام",
        en:
          "In some interpretations, the falling of this star points to a setback involving a major religious figure, and that is what will open the pit of hell and fill the world with the smoke of the demons — their ideas. The destructive locusts will emerge, and to understand their danger, they are compared to horses prepared for war, with human faces. The crowns point to the authority those locusts will have. They will look beautiful and have hair like women's hair, but they will have teeth as sharp as lions' teeth. Their breastplates and the terrifying sound of their wings point to the intensity and spread of the locusts, and they will torment people for five months. Their king is called Abaddon or Apollyon, meaning the destroyer or the one who destroys. Despite everything said about this trumpet, we also see God's tenderness and mercy: He did not permit the destruction of the entire creation. This also appeared in His care for the weak — He preserves those at the beginning of the faith and cares for the weak souls who need His tenderness and mercy even more. Whatever you have seen in this trumpet will be nothing compared with what is coming. Peace.",
      },
    },
  ],
};

// ---------------------------------------------------------------------
// Door 6 — الملاك السادس
// ---------------------------------------------------------------------
const trumpet6: TrumpetScript = {
  intro: [
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part09.m4a"],
      text: {
        ar: "ايه ده انتوا مين ومربوطين كدة ليه ?",
        en: "What is this? Who are you, and why are you bound like this?",
      },
    },
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السادس", "The Sixth Angel"),
      audioSrc: ["/audio/doors/door6-angel-part1.m4a"],
      text: {
        ar: "ازاي عديتي من كل اللي فات ده ومش عارفة مين دول , علي عموم انا مستني صوت واحد وهفكهم وساعتها هتعرفي هيعملوا ايه",
        en: "How did you get through everything so far and not know who these are? Anyway, I'm waiting for one sound, and then I'll release them — you'll find out then what they'll do.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part10.m4a"],
      text: {
        ar: "اهه اعتقد فهمت , دول الاربع ملائكة المجهزين لقتل تلت الناس , صح ؟ وعلي حسب علمي مش هيكونوا لوحديهم ,هيكون في جيوش فرسان تجهيزها مرعب وعددها مهوول",
        en: "Ah, I think I understand — these are the four angels prepared to kill a third of mankind, right? And as far as I know, they won't be alone — there will be an army of horsemen, terrifyingly equipped and vast in number.",
      },
    },
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السادس", "The Sixth Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door6-angel-part3-new.wav"],
      text: {
        ar:
          "انا كنت لسة هصدق انك مش عارفة فعلا , بس طلعتي ذكية زي ما سمعت , الصوت اللي انا مستنيه عشان اضرب البوق هو صوت اربعة قرون مذبح الذهب " +
          "وبعد ما اسمعه هفك الملائكة دي اللي اتجهزت للحظة دي , وفعلا زي ما قولتي مش لوحدهم هيكون معاهم جيش فرسان عدده متين مليون , وتجهيز الجيش ده كان قوي و محتاجين نقراه",
        en:
          "I was about to believe you really didn't know — but you turned out to be sharp, just like I heard. The sound I'm waiting for to sound my trumpet is the voice of the four horns of the golden altar, " +
          "and once I hear it, I'll release these angels who were prepared for this very moment. And just as you said, they won't be alone — there will be an army of horsemen with them, two hundred million strong, and their equipment was so striking, we need to read about it.",
      },
    },
  ],
  closing: [
    {
      // Merged: the armor/heads/fire/tails description is now one continuous beat
      // (previously split into five short turns).
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السادس", "The Sixth Angel"),
      audioSrc: ["/audio/doors/door6-angel-part2-complete.wav"],
      text: {
        ar:
          "جلوس الفرسان علي الخيول علامة استعداد تام للحرب , ودروع نارية اشارة بأنها حرب حارقة بلا رحمة واسمانجونية دي شكل الدروع اللي هتبقى قريبة لشكل دروع سماوية " +
          "وهي بسماح من الله وكبريتية اشارة للغضب الإلهي,وحصلت قبل كدة فحرق سدوم وعمورة وكانت بنار وكبريت , ورؤوس الخيل علي شكل رؤوس اسود في منظر اكتر رعبا وفتكا وافتراس " +
          "من ان شكل الرؤوس يكون علي شكل رؤوس خيول عادية , وهتطلع من بوقها نار وكبريت ودخان المراد منها الحرق و التدمير والتبديد , وسلطانهم هيكون فكلامهم اللي يبان جميل " +
          "لكنه كذاب و والاذناب اللي هي ديولهم هتكون شبه الحيات اللي عرفت تضيع من الانسان الاول كل اللي ليه بمكرها",
        en:
          "The horsemen sitting on their horses is a sign of total readiness for war, and fiery armor is a sign it will be a burning war without mercy. Hyacinth-colored armor resembles heavenly armor and comes by God's permission, " +
          "and sulfur-colored armor is a sign of divine wrath — and this happened before, in the burning of Sodom and Gomorrah, which was by fire and sulfur. The horses' heads are shaped like lions' heads — a far more terrifying, " +
          "deadly, and predatory sight than if they simply looked like ordinary horses' heads, and from their mouths come fire, sulfur, and smoke, meant for burning, destruction, and devastation. Their power will be in words that seem beautiful " +
          "but are false, and their tails will be like serpents you already know — able to make a person lose everything they have through their cunning.",
      },
    },
    {
      speaker: "girl",
      audioSrc: ["/audio/doors/girl-part11.m4a"],
      text: {
        ar: "وهو كدة التلتين الباقيين من الناس اتعظوا من الهلاك العظيم اللي حصل ده ورجعوا عن اللي بيعملوه, مش كدة ؟",
        en: "So then, did the remaining two-thirds of people learn from this great destruction and turn away from what they were doing — didn't they?",
      },
    },
    {
      // Merged: combines the closing three turns into one continuous beat.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السادس", "The Sixth Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door6-angel-part4.wav"],
      text: {
        ar:
          "فالحقيقة لا , مبطلوش اي حاجة من اللي كانوا بيعملوها سواء كانت عباد اصنام و ولا عن الزنى ولا السحر ولا اي حاجة من اللي بيعملوها, " +
          "متعظوش وده كان اكبر غلط والبوق اللي هينهي كل الفرص مبقاش بعيد زي مكانوا متخيلين , الطريق المرادي محتاج تركيز علي غير العادة ,فتحي عنيكي وخليكي جاهزة ,مع السلامة !",
        en:
          "The truth is, no — they didn't stop any of what they were doing, whether idol worship, sexual immorality, sorcery, or anything else they practiced, " +
          "they didn't repent, and that was the biggest mistake — and the trumpet that ends every chance is no longer as far off as they imagined, the road ahead needs unusual focus. Open your eyes and be ready — take care!",
      },
    },
  ],
};

// ---------------------------------------------------------------------
// Door 7 — الملاك السابع
// ---------------------------------------------------------------------
const trumpet7: TrumpetScript = {
  intro: [
    {
      // Merged: combines the two intro turns into one continuous beat.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السابع", "The Seventh Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door7-angel-part1.m4a"],
      text: {
        ar:
          "ست ابواق وعلامتها مرعبة , بس الانسان ده غريب جدا , بعد كل اللي حصل حواليه وكل اللي شافه,متعظش و كمل حياته كأن مفيش حاجة حصلت , " +
          "بس خلاص مفيش مجال للرجوع , بوقي فيه اهم اعلان مٌلك حصل , بعد نفخ بوقي هتحصل اصوات عظيمة في السما وهتقول.",
        en:
          "Six trumpets, and their signs are terrifying — but humanity is a strange thing. After everything that happened around them, everything they saw, they didn't repent, and just went on with their lives as if nothing had happened, " +
          "but there is no escape, no room left to turn back. My trumpet carries the most important announcement of a kingdom that has come to pass. After my trumpet sounds, great voices will be heard in heaven, saying —",
      },
    },
  ],
  closing: [
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السابع", "The Seventh Angel"),
      audioSrc: ["/audio/doors/door7-angel-part2-new-2026-09-04.m4a"],
      text: {
        ar: "ده اعلان النصرة علي مملكة الشيطان واعلان ملك الله ولما اتقالت الايه دي الاربعة وعشرين قسيس الجالسين امام الله علي وشوشهم وسجدا وقالوا",
        en: "This is the announcement of victory over the kingdom of the devil, and the announcement of God's reign. And when this verse was spoken, the twenty-four elders seated before God fell on their faces and worshiped, saying —",
      },
      afterScripture: {
        ref: { en: "Revelation 11:15", ar: "رؤيا يوحنا اللاهوتي ١١: ١٥" },
        text: {
          en: "The kingdoms of this world are become the kingdoms of our Lord, and of his Christ; and he shall reign for ever and ever.",
          ar: "قَدْ صَارَتْ مَمَالِكُ الْعَالَمِ لِرَبِّنَا وَمَسِيحِهِ، فَسَيَمْلِكُ إِلَى أَبَدِ الآبِدِينَ",
        },
      },
    },
    {
      // Merged: combines the thanksgiving-hymn and ark-of-the-covenant turns into one continuous beat.
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السابع", "The Seventh Angel"),
      audioSrc: ["/audio/doors/door7-angel-part3.m4a"],
      text: {
        ar:
          "قدموا التسبحة الجميلة دي لله شكرآ علي اللي عمله في القصاص من مملكة الشر واثبت انها غير صحيحة ونشر مٌلكه , ورجوع العالم للإيمان واعلان قدرته اللانهائية في صنع وتدبير العالم , " +
          "ولان مش كل النهايات سعيدة , البوق بينتهي بظهور تابوت العهد وظهور علامات تأديبية",
        en:
          "They offered this beautiful hymn to God, thanking Him for what He did in bringing justice on the kingdom of evil and proving it false, and for spreading His reign, for the world turning to faith, and for the declaration of His infinite power in creating and governing the world, " +
          "and because not every ending is a happy one, the trumpet closes with the appearing of the Ark of the Covenant and the appearing of signs of discipline —",
      },
      afterScripture: {
        ref: { en: "Revelation 11:17-18", ar: "رؤيا يوحنا اللاهوتي ١١: ١٧-١٨" },
        text: {
          en: "We give You thanks, O Lord God Almighty, Who is and Who was and Who is to come, because You have taken Your great power and reigned. The nations were angry, and Your wrath has come, and the time of the dead, that they should be judged, and that You should reward Your servants the prophets and the saints and those who fear Your name, both small and great, and should destroy those who destroy the earth.",
          ar: "نَشْكُرُكَ أَيُّهَا الرَّبُّ الإِلَهُ الْقَادِرُ عَلَى كُلِّ شَىْءٍ، الْكَائِنُ وَالَّذِى كَانَ وَالَّذِى يَأْتِى، لأَنَّكَ أَخَذْتَ قُدْرَتَكَ الْعَظِيمَةَ وَمَلَكْتَ. 18 وَغَضِبَتِ الأُمَمُ فَأَتَى غَضَبُكَ وَزَمَانُ الأَمْوَاتِ لِيدَانُوا، وَلِتُعْطَى الأُجْرَةُ لِعَبِيدِكَ الأَنْبِيَاءِ وَالْقِدِّيسِينَ وَالْخَائِفِينَ اسْمَكَ، الصِّغَارِ وَالْكِبَارِ، وَلِيُهْلَكَ الَّذِينَ كَانُوا يُهْلِكُونَ الأَرْضَ",
        },
      },
    },
    {
      speaker: "angel",
      speakerLabel: angelLabel("الملاك السابع", "The Seventh Angel"),
      cue: "watch",
      audioSrc: ["/audio/doors/door7-angel-part4.m4a"],
      text: {
        ar: "دي مظاهر مرتبطه بعظمة و جلال الله و هيبته و بتعلن ان حدثا عظيما بيتم امام حضرته",
        en: "these are signs tied to the greatness, majesty, and awe of God, declaring that a great event is taking place before His presence.",
      },
      afterScripture: {
        ref: { en: "Revelation 11:19", ar: "رؤيا يوحنا اللاهوتي ١١: ١٩" },
        text: {
          en: "And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament: and there were lightnings, and voices, and thunderings, and an earthquake, and great hail.",
          ar: "وَانْفَتَحَ هَيْكَلُ اللهِ فِي السَّمَاءِ، وَظَهَرَ تَابُوتُ عَهْدِهِ فِي هَيْكَلِهِ، وَحَدَثَتْ بُرُوقٌ وَأَصْوَاتٌ وَرُعُودٌ وَزَلْزَلَةٌ وَبَرَدٌ عَظِيمٌ.",
        },
        audioSrc: ["/audio/doors/door7-scripture.m4a"],
      },
    },
  ],
};

export const trumpetScripts: Record<number, TrumpetScript> = {
  1: trumpet1,
  2: trumpet2,
  3: trumpet3,
  4: trumpet4,
  5: trumpet5,
  6: trumpet6,
  7: trumpet7,
};

export const speakerName = {
  narrator: { en: "The Narrator", ar: "الراوي" },
  girl: { en: "The Main Character", ar: "الشخصية الرئيسية" },
  angel: { en: "The Angel", ar: "الملاك" },
} as const;

/** Default composition: protagonist left, Angel right, Narrator left. */
export const defaultSide = {
  girl: "left",
  angel: "right",
  narrator: "left",
} as const;
