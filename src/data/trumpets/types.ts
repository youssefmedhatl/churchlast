export interface Bilingual {
  en: string;
  ar: string;
}

/** CHANGED: the script now uses four voices — the Narrator (third-person
 * narration/stage direction), the Girl (curious learner/protagonist) and
 * the Angel (biblical guide for each trumpet). */
export type Speaker = "narrator" | "girl" | "angel";

export interface DialogueLine {
  speaker: Speaker;
  /** Marked temporary until translated/verified — dialogue is character
   * explanation, never Scripture, and should read that way. */
  text: Bilingual;
  /**
   * Optional per-line name override (e.g. "The Second Angel" / "الملاك الثاني")
   * so each door's angel can be labelled distinctly even though they all
   * share the "angel" speaker/portrait. Falls back to speakerName[speaker].
   */
  speakerLabel?: Bilingual;
  /**
   * Optional composition override. By default the Girl sits on the LEFT,
   * the Angel on the RIGHT and the Holy Father on the LEFT; a line can
   * override that when it reads better the other way round.
   */
  side?: "left" | "right";
  /**
   * Optional cue for the presentation layer. "watch" marks the line that
   * hands the scene over to the cinematic ("Now watch."), so the dialogue
   * UI can fade out and the video can expand to fullscreen.
   */
  cue?: "watch";
  /**
   * Recorded voiceover clip(s) for this line, relative to /public, e.g.
   * ["/audio/doors/door1-angel.m4a"]. Several consecutive script lines are
   * often merged into one turn to match a single continuous recording — if
   * a turn needed two takes back-to-back, list both files in order and they
   * play sequentially as one clip. Omit when no recording exists yet; the
   * voiceover button then falls back to on-device text-to-speech.
   */
  audioSrc?: string[];
}

export interface QuestionOption {
  id: string;
  text: Bilingual;
}

export interface TrumpetQuestion {
  id: string;
  prompt: Bilingual;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: Bilingual;
}

export interface TrumpetTheme {
  /** Primary accent color for this trumpet's cinematic scene */
  primary: string;
  secondary: string;
  /** Particle style used by the lightweight canvas particle field */
  particle: "ash" | "hail-fire" | "blood-sea" | "falling-star" | "smoke-locust" | "horsemen" | "silence";
}

export interface TrumpetData {
  index: number; // 1-7
  title: Bilingual;
  shortLabel: Bilingual;
  scriptureRef: Bilingual;
  /** Marked temporary until final verified Coptic Orthodox / Coptic Reader text is supplied */
  scriptureText: Bilingual;
  scriptureIsTemporary: boolean;
  narration: Bilingual;
  cinematicSummary: Bilingual;
  theme: TrumpetTheme;
  questions: TrumpetQuestion[];
  xpOnComplete: number;
  /**
   * Optional path to a short background video for the Cinematic stage, e.g.
   * "/videos/trumpet1.mp4". Put the file in the project's `public/videos/`
   * folder and reference it here. If omitted, or if the file fails to load,
   * the scene falls back to the animated particle/gradient background only —
   * it never breaks the presentation.
   */
  videoSrc?: string;
  /**
   * Optional path to a still placeholder/poster image for the Cinematic
   * stage, e.g. "/trumpets/trumpet1.jpg". Put the file in the project's
   * `public/trumpets/` folder and reference it here. Used only when there's
   * no video (or the video fails to load) — if omitted, the scene falls
   * back to the animated particle/gradient background only.
   */
  imageSrc?: string;
  /** Shown before the Cinematic stage — short three-character exchange.
   * Character explanation only, never presented as Scripture. */
  introDialogue?: DialogueLine[];
  /** Shown after the Cinematic stage, before Scripture. */
  closingDialogue?: DialogueLine[];
}
