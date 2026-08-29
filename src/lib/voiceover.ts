/**
 * Single shared "voice" for the whole app: plays a recorded clip (or a
 * sequence of clips back-to-back as one take), or falls back to on-device
 * text-to-speech when no recording exists yet. Only one thing can speak at a
 * time. TTS is made resilient to browsers that populate their voice list late
 * and to Chromium's long-utterance reliability issues.
 */

type EndedReason = "ended" | "stopped" | "error";
type Listener = (reason: EndedReason) => void;

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentListener: Listener | null = null;
let currentToken = 0;

// Keep decoded/partially-buffered audio elements alive between turns.
const audioCache = new Map<string, HTMLAudioElement>();

export function preloadRecording(src: string) {
  if (typeof window === "undefined") return;
  const cached = audioCache.get(src);
  if (cached && cached.readyState > 0) return;

  const audio = cached ?? new Audio();
  audio.preload = "auto";
  audio.src = src;
  audio.onerror = () => {
    // Don't keep a broken element in the cache; the next playback attempt
    // gets a clean Audio object and a fresh request.
    if (audioCache.get(src) === audio) audioCache.delete(src);
  };
  audio.load();
  audioCache.set(src, audio);
}

export function preloadRecordings(srcs: string[]) {
  for (const src of srcs) preloadRecording(src);
}

function fireEnded(reason: EndedReason) {
  const l = currentListener;
  currentListener = null;
  l?.(reason);
}

/** Stop whatever is currently playing/speaking. */
export function stopVoice() {
  currentToken += 1;

  if (currentAudio) {
    currentAudio.pause();
    try {
      currentAudio.currentTime = 0;
    } catch {
      // Ignore browsers that reject currentTime changes during teardown.
    }
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
 */
export function playRecording(srcs: string[], onEnded?: Listener) {
  stopVoice();
  if (!srcs.length) {
    fireEnded("error");
    return;
  }

  const token = ++currentToken;
  currentListener = onEnded ?? null;

  const playAt = (idx: number) => {
    if (token !== currentToken) return;
    if (idx >= srcs.length) {
      currentAudio = null;
      fireEnded("ended");
      return;
    }

    const src = srcs[idx];
    const audio = audioCache.get(src) ?? new Audio();
    audio.preload = "auto";
    audio.src = src;
    audio.currentTime = 0;
    audio.onended = () => playAt(idx + 1);
    audio.onerror = () => {
      if (token !== currentToken) return;
      if (audioCache.get(src) === audio) audioCache.delete(src);
      currentAudio = null;
      fireEnded("error");
    };

    currentAudio = audio;
    audioCache.set(src, audio);

    // Calling load() here is harmless for an already-buffered element and
    // makes a newly-created cache entry deterministic before play().
    if (audio.readyState === 0) audio.load();

    audio.play().catch(() => {
      if (token !== currentToken) return;
      currentAudio = null;
      fireEnded("error");
    });
  };

  playAt(0);
}

function waitForVoices(timeoutMs = 1000): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis;
  const existing = synth.getVoices();
  if (existing.length) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener("voiceschanged", finish);
      resolve(synth.getVoices());
    };
    synth.addEventListener("voiceschanged", finish);
    window.setTimeout(finish, timeoutMs);
  });
}

function chunkText(text: string, maxChars = 180): string[] {
  const normalized = text.trim();
  if (!normalized) return [];
  if (normalized.length <= maxChars) return [normalized];

  const chunks: string[] = [];
  let rest = normalized;
  while (rest.length > maxChars) {
    const windowText = rest.slice(0, maxChars);
    const cut = Math.max(
      windowText.lastIndexOf("."),
      windowText.lastIndexOf("،"),
      windowText.lastIndexOf(","),
      windowText.lastIndexOf("؛"),
      windowText.lastIndexOf(" "),
    );
    const splitAt = cut > maxChars * 0.55 ? cut + 1 : maxChars;
    chunks.push(rest.slice(0, splitAt).trim());
    rest = rest.slice(splitAt).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

/**
 * Speak text via the browser's built-in TTS. The voice list is loaded lazily
 * and long Arabic passages are spoken in short chunks for reliable playback.
 */
export async function speak(text: string, lang: "ar" | "en", onEnded?: Listener) {
  stopVoice();
  if (!("speechSynthesis" in window)) {
    fireEnded("error");
    return;
  }

  const token = ++currentToken;
  currentListener = onEnded ?? null;
  const chunks = chunkText(text);
  if (!chunks.length) {
    fireEnded("ended");
    return;
  }

  const voices = await waitForVoices();
  if (token !== currentToken) return;

  const targetLang = lang === "ar" || arabicPattern.test(text) ? "ar-EG" : "en-US";
  const match = voices.find((v) => {
    const voiceLang = v.lang?.toLowerCase() ?? "";
    return voiceLang === targetLang.toLowerCase() || voiceLang.startsWith(targetLang.slice(0, 2));
  });

  let idx = 0;
  const speakNext = () => {
    if (token !== currentToken) return;
    if (idx >= chunks.length) {
      currentUtterance = null;
      fireEnded("ended");
      return;
    }

    const utter = new SpeechSynthesisUtterance(chunks[idx++]);
    utter.lang = targetLang;
    utter.rate = 0.98;
    if (match) utter.voice = match;
    utter.onend = speakNext;
    utter.onerror = () => {
      if (token !== currentToken) return;
      currentUtterance = null;
      fireEnded("error");
    };

    currentUtterance = utter;
    // Some Chromium configurations can leave speechSynthesis paused after a
    // prior utterance; resume() before speak() is safe when unsupported.
    window.speechSynthesis.resume?.();
    window.speechSynthesis.speak(utter);
  };

  speakNext();
}

const arabicPattern = /[\u0600-\u06FF]/;

export function estimateReadingMs(text: string) {
  return Math.min(9000, 1800 + text.length * 55);
}

export function isVoiceAvailable() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
