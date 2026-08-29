/**
 * Single shared "voice" for the whole app: plays a recorded clip (or a
 * sequence of clips back-to-back as one take), or falls back to on-device
 * Arabic/English text-to-speech when no recording exists yet. Only one
 * thing can speak at a time — starting a new line stops whatever was
 * playing before it, recorded or synthesized.
 */

type EndedReason = "ended" | "stopped" | "error";
type Listener = (reason: EndedReason) => void;

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentListener: Listener | null = null;
let currentToken = 0;

function fireEnded(reason: EndedReason) {
  const l = currentListener;
  currentListener = null;
  l?.(reason);
}

/** Stop whatever is currently playing/speaking (recording or TTS). */
export function stopVoice() {
  currentToken += 1; // invalidate any in-flight sequence
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (currentUtterance) {
    window.speechSynthesis?.cancel();
    currentUtterance = null;
  }
  fireEnded("stopped");
}

/**
 * Play one or more audio files in sequence, as a single continuous take.
 * Calls onEnded("ended") when the whole sequence finishes, onEnded("stopped")
 * if interrupted by another play/stop call, or onEnded("error") if a clip
 * fails to load/play (e.g. file missing).
 */
export function playRecording(srcs: string[], onEnded?: Listener) {
  stopVoice();
  const token = ++currentToken;
  currentListener = onEnded ?? null;

  const playAt = (idx: number) => {
    if (token !== currentToken) return; // superseded
    if (idx >= srcs.length) {
      currentAudio = null;
      fireEnded("ended");
      return;
    }
    const audio = new Audio(srcs[idx]);
    currentAudio = audio;
    audio.onended = () => playAt(idx + 1);
    audio.onerror = () => {
      if (token !== currentToken) return;
      currentAudio = null;
      fireEnded("error");
    };
    audio.play().catch(() => {
      if (token !== currentToken) return;
      currentAudio = null;
      fireEnded("error");
    });
  };

  playAt(0);
}

/** Roughly estimate combined duration in ms before metadata loads, for pacing. */
export function estimateReadingMs(text: string) {
  return Math.min(9000, 1800 + text.length * 55);
}

const arabicPattern = /[\u0600-\u06FF]/;

/** Speak a line via the browser's built-in TTS, picking Arabic vs English voice. */
export function speak(text: string, lang: "ar" | "en", onEnded?: Listener) {
  stopVoice();
  if (!("speechSynthesis" in window)) {
    fireEnded("error");
    return;
  }
  const token = ++currentToken;
  currentListener = onEnded ?? null;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === "ar" || arabicPattern.test(text) ? "ar-EG" : "en-US";
  utter.rate = 0.98;

  const voices = window.speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang?.toLowerCase().startsWith(utter.lang.toLowerCase().slice(0, 2)));
  if (match) utter.voice = match;

  utter.onend = () => {
    if (token !== currentToken) return;
    currentUtterance = null;
    fireEnded("ended");
  };
  utter.onerror = () => {
    if (token !== currentToken) return;
    currentUtterance = null;
    fireEnded("error");
  };

  currentUtterance = utter;
  window.speechSynthesis.speak(utter);
}

export function isVoiceAvailable() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
