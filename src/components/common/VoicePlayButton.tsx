import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playRecording, speak, stopVoice } from "../../lib/voiceover";

interface VoicePlayButtonProps {
  text: string;
  lang: "ar" | "en";
  audioSrc?: string[];
  tone: string;
  /** Reports play/stop so the parent can auto-advance in sync when it wants to. */
  onPlayStateChange?: (playing: boolean) => void;
  size?: number;
}

/**
 * Speaker-icon button: plays the recorded clip for this line when one
 * exists, otherwise reads the line aloud with on-device text-to-speech.
 * Tapping while it's already playing stops it.
 */
export default function VoicePlayButton({
  text,
  lang,
  audioSrc,
  tone,
  onPlayStateChange,
  size = 30,
}: VoicePlayButtonProps) {
  const [playing, setPlaying] = useState(false);
  const hasRecording = !!audioSrc && audioSrc.length > 0;

  // Tracks the latest `playing` value for the unmount cleanup below. A plain
  // read of `playing` in that cleanup would close over whatever it was on
  // the very first render (always false), so it would never actually stop
  // audio that started later — this ref keeps it current instead.
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    // Stop this line's voice if the app moves on without the user tapping stop.
    return () => {
      if (playingRef.current) stopVoice();
    };
  }, []);

  const setState = (p: boolean) => {
    setPlaying(p);
    onPlayStateChange?.(p);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) {
      stopVoice();
      setState(false);
      return;
    }
    setState(true);
    const onEnded = () => setState(false);
    if (hasRecording) {
      playRecording(audioSrc!, onEnded);
    } else {
      speak(text, lang, onEnded);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Stop voiceover" : "Play voiceover"}
      title={hasRecording ? undefined : "No recording yet — read aloud with device speech"}
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${tone}55`,
        background: playing
          ? `linear-gradient(180deg, ${tone}33, ${tone}1a)`
          : "rgba(255,255,255,0.04)",
        color: tone,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {playing ? (
        // Stop / speaking icon
        <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" />
        </svg>
      ) : (
        // Speaker icon; a small dashed ring marks TTS-fallback lines.
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 9v6h4l5 4V5L8 9H4z"
            fill="currentColor"
          />
          <path
            d="M16.5 8.5a5 5 0 0 1 0 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {hasRecording && (
            <path
              d="M19 6a8.5 8.5 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity={0.6}
            />
          )}
        </svg>
      )}
      {!hasRecording && (
        <span
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--ink-900, #0b0c10)",
            border: `1px dashed ${tone}88`,
          }}
        />
      )}
    </motion.button>
  );
}
