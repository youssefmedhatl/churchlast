import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DialogueLine } from "../../data/trumpets/types";
import { useLang } from "../../i18n/LanguageContext";
import DialogueTurn, { readingTimeMs } from "./DialogueTurn";
import { stopVoice } from "../../lib/voiceover";

interface DialogueSequenceProps {
  lines: DialogueLine[];
  onDone: () => void;
}

/**
 * The opening three-character exchange (Girl, Angel, Holy Father) — character
 * explanation, never Scripture.
 *
 * CHANGED (dialogue redesign): same dedicated narrative-game presentation as
 * the trumpet lessons — one speaker at a time, circular portrait medallion,
 * a rounded panel that points at the speaker, alternating sides, tap to
 * advance or let the short automatic transition carry the scene.
 */
export default function DialogueSequence({ lines, onDone }: DialogueSequenceProps) {
  const { lang, t } = useLang();
  const [i, setI] = useState(0);
  // Off by default: nothing should start talking on its own — the presenter
  // taps a line's speaker icon (or the AUTO toggle) to hear it.
  const [autoPlay, setAutoPlay] = useState(false);

  const isLast = i === lines.length - 1;
  const line = lines[i] as DialogueLine | undefined;
  const hasRecording = !!line?.audioSrc?.length;

  // Stop whatever is playing the instant we move on, so a skipped clip never
  // bleeds into the next line or the next section.
  const advance = () => {
    stopVoice();
    if (isLast) onDone();
    else setI((n) => n + 1);
  };

  // Belt-and-braces: if this whole sequence unmounts (e.g. the presenter
  // navigates away entirely) while a clip is mid-playback, stop it too.
  // Hooks must run unconditionally (before the empty-lines early return
  // below), so this and the timer effect below live above that check.
  useEffect(() => stopVoice, []);

  // Lines with a recording advance when the recording finishes (handled by
  // DialogueTurn's voiceAutoPlay/onAutoAdvance); everything else falls back
  // to the reading-time timer.
  useEffect(() => {
    if (!line || !autoPlay || isLast || hasRecording) return;
    const id = window.setTimeout(advance, readingTimeMs(line.text[lang]));
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, autoPlay, lang, hasRecording]);

  if (lines.length === 0 || !line) {
    onDone();
    return null;
  }

  return (
    <div style={{ userSelect: "none" }}>
      <div style={{ minHeight: 168, display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.3 }}
            onClick={advance}
            role="button"
            tabIndex={0}
            aria-label={t("continueLabel")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") advance();
            }}
            style={{ cursor: "pointer", width: "100%" }}
          >
            <DialogueTurn line={line} voiceAutoPlay={autoPlay} onAutoAdvance={advance} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center" }}>
        <motion.button
          onClick={advance}
          whileTap={{ scale: 0.97 }}
          style={{
            flex: 1,
            minHeight: 48,
            borderRadius: 999,
            border: `1px solid ${isLast ? "rgba(240,217,163,0.5)" : "var(--ink-600)"}`,
            background: isLast
              ? "linear-gradient(180deg, rgba(240,217,163,0.16), rgba(201,161,90,0.08))"
              : "var(--ink-800)",
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold-300)",
          }}
        >
          {isLast ? `${t("continueLabel")} →` : `${t("continueLabel")} · ${i + 1}/${lines.length}`}
        </motion.button>
        <button
          onClick={() => setAutoPlay((a) => !a)}
          aria-label="Auto"
          style={{
            minHeight: 48,
            padding: "0 14px",
            borderRadius: 999,
            border: "1px solid var(--ink-600)",
            background: "var(--ink-800)",
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: autoPlay ? "var(--gold-300)" : "var(--mist-600)",
          }}
        >
          AUTO
        </button>
      </div>
    </div>
  );
}
