import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TrumpetData, DialogueLine } from "../../data/trumpets/types";
import { useLang } from "../../i18n/LanguageContext";
import CinematicStage from "./CinematicStage";
import DialogueTurn, { readingTimeMs } from "../common/DialogueTurn";
import { stopVoice } from "../../lib/voiceover";

interface TrumpetVideoDialogueProps {
  trumpet: TrumpetData;
  onDone: () => void;
}

type Beat = { kind: "dialogue"; line: DialogueLine } | { kind: "narration" };

/**
 * CHANGED (dialogue redesign): the trumpet beat is now a dedicated, cinematic
 * dialogue layout instead of floating bubbles over the footage.
 *
 *   - top: the cinematic area, aspect ratio preserved, never stretched
 *   - below: a three-character conversation (Girl, Angel, Holy Father),
 *     one speaker at a time, portrait + pointing panel, alternating sides
 *   - a line marked `cue: "watch"` hands over to the vision: the dialogue
 *     fades out, the screen darkens, the cinematic expands to fullscreen and
 *     the sound fades up. When it ends we return to the dialogue/Scripture
 *     interface as one continuous move.
 *
 * The beat order and the onDone contract are unchanged: intro dialogue →
 * narration (the vision) → closing dialogue → Scripture.
 */
export default function TrumpetVideoDialogue({ trumpet, onDone }: TrumpetVideoDialogueProps) {
  const { lang, t } = useLang();
  const [i, setI] = useState(0);
  // Off by default: nothing should start talking on its own — the presenter
  // taps a line's speaker icon (or the AUTO toggle) to hear it.
  const [autoPlay, setAutoPlay] = useState(false);

  const beats: Beat[] = [
    ...(trumpet.introDialogue ?? []).map((line) => ({ kind: "dialogue" as const, line })),
    { kind: "narration" as const },
    ...(trumpet.closingDialogue ?? []).map((line) => ({ kind: "dialogue" as const, line })),
  ];

  const beat = beats[i];
  const isLast = i === beats.length - 1;
  const isVision = beat.kind === "narration";
  const isCue = beat.kind === "dialogue" && beat.line.cue === "watch";

  // Stop whatever is playing the instant we move on (including handing off
  // to the vision, or finishing into Scripture) so a skipped clip never
  // bleeds into the next beat or the next section.
  const advance = () => {
    stopVoice();
    if (isLast) onDone();
    else setI((n) => n + 1);
  };

  // Belt-and-braces: if this whole beat sequence unmounts (e.g. the trumpet
  // is left mid-line) while a clip is mid-playback, stop it too.
  useEffect(() => stopVoice, []);

  const hasRecording = beat.kind === "dialogue" && !!beat.line.audioSrc?.length;

  // Optional short automatic transition — no Next press needed for ordinary
  // lines. The hand-off line and the vision always wait for the presenter.
  // Lines with a recording advance when it finishes instead (see DialogueTurn).
  useEffect(() => {
    if (!autoPlay || isVision || isCue || isLast || hasRecording) return;
    if (beat.kind !== "dialogue") return;
    const id = window.setTimeout(advance, readingTimeMs(beat.line.text[lang]));
    return () => window.clearTimeout(id);
  }, [i, autoPlay, lang, hasRecording]);

  const controlLabel = isVision
    ? t("continueLabel")
    : isCue
    ? lang === "ar"
      ? "شاهد الرؤيا"
      : "Watch the Vision"
    : isLast
    ? t("continueLabel")
    : `${t("continueLabel")} · ${i + 1}/${beats.length}`;

  return (
    <div style={{ userSelect: "none" }}>
      <CinematicStage trumpet={trumpet} fullscreen={isVision}>
        <AnimatePresence>
          {isVision && (
            <motion.div
              key="vision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              onClick={advance}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") advance();
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "0 22px calc(28px + env(safe-area-inset-bottom))",
                cursor: "pointer",
              }}
            >
              <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold-300)",
                  }}
                >
                  {t("narration")}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-scripture)",
                    fontSize: 17,
                    lineHeight: 1.6,
                    margin: "10px 0 18px",
                    color: "var(--parchment-100)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                  }}
                >
                  {trumpet.narration[lang]}
                </p>
                <div
                  style={{
                    textAlign: "center",
                    padding: "12px 0",
                    borderRadius: 999,
                    border: "1px solid rgba(240,217,163,0.35)",
                    background: "rgba(8,9,12,0.55)",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--gold-300)",
                  }}
                >
                  {controlLabel} →
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CinematicStage>

      {/* Dialogue area — dedicated space under the cinematic, so portraits and
          panels never overlap the footage. */}
      <motion.div
        animate={{ opacity: isVision ? 0 : 1, y: isVision ? 12 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginTop: 18, minHeight: 150, pointerEvents: isVision ? "none" : "auto" }}
      >
        <AnimatePresence mode="wait">
          {beat.kind === "dialogue" && (
            <motion.div
              key={`d-${i}`}
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
              style={{ cursor: "pointer" }}
            >
              <DialogueTurn
                line={beat.line}
                voiceAutoPlay={autoPlay && !isCue && !isLast}
                onAutoAdvance={advance}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isVision && (
          <div style={{ display: "flex", gap: 10, marginTop: 18, alignItems: "center" }}>
            <motion.button
              onClick={advance}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1,
                minHeight: 48,
                padding: "12px 0",
                borderRadius: 999,
                border: `1px solid ${isCue || isLast ? "rgba(240,217,163,0.5)" : "var(--ink-600)"}`,
                background: isCue || isLast
                  ? "linear-gradient(180deg, rgba(240,217,163,0.16), rgba(201,161,90,0.08))"
                  : "var(--ink-800)",
                fontFamily: "var(--font-display)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-300)",
              }}
            >
              {controlLabel} {(isCue || isLast) && "→"}
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
        )}
      </motion.div>
    </div>
  );
}
