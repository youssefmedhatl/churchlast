import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { DialogueLine } from "../../data/trumpets/types";
import { defaultSide, speakerName } from "../../data/script";
import { useLang } from "../../i18n/LanguageContext";
import CharacterPortrait, { accent } from "./CharacterPortrait";
import VoicePlayButton from "./VoicePlayButton";
import { playRecording, stopVoice } from "../../lib/voiceover";

/** Girl left, Angel right, Holy Father left — unless the line overrides it. */
export const sideFor = (line: DialogueLine): "left" | "right" =>
  line.side ?? defaultSide[line.speaker];

/** Reading time for the optional automatic transition to the next line. */
export const readingTimeMs = (text: string) =>
  Math.min(7000, 1500 + text.length * 42);

/** Text appears naturally, character by character — never bouncy or childish. */
function useTypewriter(text: string) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const step = Math.max(12, Math.min(26, 900 / Math.max(text.length, 1)));
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, step);
    return () => window.clearInterval(id);
  }, [text]);

  return shown;
}

interface DialogueTurnProps {
  line: DialogueLine;
  portraitSize?: number;
  /** Called when this line's voiceover starts/stops playing. */
  onVoiceStateChange?: (playing: boolean) => void;
  /**
   * When true and this line has a recording, playback starts automatically
   * as soon as the line appears (keeping text and voice in sync), and
   * onAutoAdvance fires when the recording finishes instead of the usual
   * reading-time timer. Lines without a recording are unaffected — the
   * caller's own timer still applies, since we don't auto-trigger TTS.
   */
  voiceAutoPlay?: boolean;
  onAutoAdvance?: () => void;
}

/**
 * One speaking turn: circular portrait medallion + a rounded dialogue panel
 * that points back toward the portrait. Only ever one turn on screen at a
 * time — the speaker is lit, everyone else is off-stage.
 */
export default function DialogueTurn({
  line,
  portraitSize = 64,
  onVoiceStateChange,
  voiceAutoPlay,
  onAutoAdvance,
}: DialogueTurnProps) {
  const { lang } = useLang();
  const side = sideFor(line);
  const tone = accent[line.speaker];
  const text = line.text[lang];
  const [voicePlaying, setVoicePlaying] = useState(false);
  const typed = useTypewriter(text);
  // While the voiceover reads this line aloud, show the full text instead of
  // typing it out — the recording sets the pace, not the typewriter.
  const shown = voicePlaying ? text : typed;

  // Auto-start the recorded clip in sync with the line appearing, and let
  // the parent know when to move on — only when a recording actually exists.
  useEffect(() => {
    if (!voiceAutoPlay || !line.audioSrc?.length) return;
    setVoicePlaying(true);
    onVoiceStateChange?.(true);
    playRecording(line.audioSrc, (reason) => {
      setVoicePlaying(false);
      onVoiceStateChange?.(false);
      if (reason === "ended") onAutoAdvance?.();
    });
    // Stop this clip the moment we leave this line — don't wait for the next
    // line to happen to have its own recording to cut it off. Without this,
    // skipping into a line/section with no recording left the old clip
    // playing indefinitely underneath it.
    return () => stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line, voiceAutoPlay]);

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        flexDirection: side === "left" ? "row" : "row-reverse",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -18 : 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <CharacterPortrait speaker={line.speaker} size={portraitSize} speaking />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: side === "left" ? 26 : -26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          position: "relative",
          flex: 1,
          minWidth: 0,
          borderRadius: 16,
          padding: "12px 16px 14px",
          background:
            "linear-gradient(180deg, rgba(24,26,34,0.96), rgba(11,12,16,0.96))",
          border: `1px solid ${tone.ring}55`,
          boxShadow: `0 18px 40px -22px #000, inset 0 1px 0 rgba(255,255,255,0.04), 0 0 26px -18px ${tone.glow}`,
        }}
      >
        {/* Panel points toward the portrait. */}
        <span
          style={{
            position: "absolute",
            top: 20,
            [side === "left" ? "left" : "right"]: -6,
            width: 11,
            height: 11,
            transform: "rotate(45deg)",
            background: "rgba(20,22,29,0.98)",
            borderLeft: side === "left" ? `1px solid ${tone.ring}55` : "none",
            borderBottom: side === "left" ? `1px solid ${tone.ring}55` : "none",
            borderRight: side === "right" ? `1px solid ${tone.ring}55` : "none",
            borderTop: side === "right" ? `1px solid ${tone.ring}55` : "none",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: tone.label,
            }}
          >
            {line.speakerLabel ? line.speakerLabel[lang] : speakerName[line.speaker][lang]}
          </div>
          <VoicePlayButton
            text={text}
            lang={lang}
            audioSrc={line.audioSrc}
            tone={tone.label}
            size={26}
            onPlayStateChange={(p) => {
              setVoicePlaying(p);
              onVoiceStateChange?.(p);
            }}
          />
        </div>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            margin: 0,
            color: "var(--parchment-100)",
            wordBreak: "break-word",
          }}
        >
          {shown}
          {shown.length < text.length && (
            <span style={{ opacity: 0.5, color: tone.label }}>▌</span>
          )}
        </p>
      </motion.div>
    </div>
  );
}
