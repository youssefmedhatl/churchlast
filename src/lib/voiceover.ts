/**
 * Single shared human-recorded voice channel.
 * No browser/device/AI text-to-speech is used in this presentation build.
 */

type EndedReason = "ended" | "stopped" | "error";
type Listener = (reason: EndedReason) => void;

let currentAudio: HTMLAudioElement | null = null;
let currentListener: Listener | null = null;
let currentToken = 0;
const audioCache = new Map<string, HTMLAudioElement>();

export function preloadRecording(src: string) {
  if (typeof window === "undefined" || audioCache.has(src)) return;
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = src;
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

export function stopVoice() {
  currentToken += 1;
  if (currentAudio) {
    currentAudio.pause();
    try { currentAudio.currentTime = 0; } catch { /* ignore */ }
    currentAudio = null;
  }
  fireEnded("stopped");
}

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
    const audio = audioCache.get(src) ?? new Audio(src);
    audio.preload = "auto";
    audio.currentTime = 0;
    audio.onended = () => playAt(idx + 1);
    audio.onerror = () => {
      if (token !== currentToken) return;
      currentAudio = null;
      fireEnded("error");
    };
    currentAudio = audio;
    audioCache.set(src, audio);
    audio.play().catch(() => {
      if (token !== currentToken) return;
      currentAudio = null;
      fireEnded("error");
    });
  };

  playAt(0);
}

export function estimateReadingMs(text: string) {
  return Math.min(9000, 1800 + text.length * 55);
}

export function isVoiceAvailable() {
  return typeof window !== "undefined";
}
