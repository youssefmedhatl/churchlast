import { useState } from "react";
import { motion } from "framer-motion";
import type { Speaker } from "../../data/trumpets/types";
import { speakerName } from "../../data/script";

interface CharacterPortraitProps {
  speaker: Speaker;
  size?: number;
  /** Brighter, glowing, slightly scaled up while this character speaks. */
  speaking?: boolean;
}

/**
 * CHANGED (dialogue redesign): the portrait is now a circular game-UI medallion
 * — thin decorative double border, character-specific accent, a soft glow and a
 * subtle idle drift while speaking, and a dimmed/desaturated state while
 * another character has the floor. Still falls back to a pixel silhouette if a
 * sprite ever fails to load, so the presentation never shows a broken image.
 */
const imageSrc: Record<Speaker, string> = {
  narrator: "/characters/narrator.png",
  girl: "/characters/girl.png",
  angel: "/characters/angel.png",
};

export const accent: Record<Speaker, { ring: string; glow: string; label: string }> = {
  // Warm gold / ivory for the narrator.
  narrator: { ring: "#c9a15a", glow: "rgba(201,161,90,0.45)", label: "var(--gold-300)" },
  // Subtle complementary sage for the learner.
  girl: { ring: "#8aab7f", glow: "rgba(138,171,127,0.35)", label: "var(--sage-500)" },
  // Distinct luminous accent for the Angel.
  angel: { ring: "#cfe6ef", glow: "rgba(190,225,240,0.55)", label: "#dff0f7" },
};

const grids: Record<Speaker, string[]> = {
  narrator: [
    "..1111..",
    ".111111.",
    ".122221.",
    ".111111.",
    "11111111",
    "11111111",
    "11111111",
    "1111.111",
  ],
  girl: [
    "..1111..",
    ".111111.",
    ".122221.",
    "..1111..",
    ".111111.",
    "11111111",
    ".111111.",
    ".11..11.",
  ],
  angel: [
    "..1111..",
    ".111111.",
    ".122221.",
    "..1111..",
    "1.1111.1",
    "11111111",
    "1.1111.1",
    "..1111..",
  ],
};

export default function CharacterPortrait({
  speaker,
  size = 56,
  speaking = true,
}: CharacterPortraitProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const tone = accent[speaker];
  const label = speakerName[speaker].en;
  const cell = size / 8;

  return (
    <motion.div
      aria-hidden={!speaking}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: speaking ? 1 : 0.45,
        scale: speaking ? 1 : 0.92,
        y: speaking ? [0, -2.5, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 4.2, repeat: speaking ? Infinity : 0, ease: "easeInOut" },
      }}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        position: "relative",
        padding: 3,
        background: `conic-gradient(from 140deg, ${tone.ring}, rgba(255,255,255,0.06), ${tone.ring})`,
        boxShadow: speaking
          ? `0 0 0 1px rgba(0,0,0,0.6), 0 0 22px ${tone.glow}, inset 0 0 0 1px rgba(255,255,255,0.08)`
          : "0 0 0 1px rgba(0,0,0,0.6)",
        filter: speaking ? "none" : "saturate(0.6) brightness(0.75)",
      }}
    >
      <div
        role="img"
        aria-label={label}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          background: "radial-gradient(circle at 50% 20%, var(--ink-700), var(--ink-950))",
          border: "1px solid rgba(0,0,0,0.7)",
          display: imgFailed ? "grid" : "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gridTemplateColumns: imgFailed ? `repeat(8, ${cell}px)` : undefined,
          gridTemplateRows: imgFailed ? `repeat(8, ${cell}px)` : undefined,
        }}
      >
        {imgFailed ? (
          grids[speaker].flatMap((row, y) =>
            row
              .split("")
              .map((c, x) => (
                <div
                  key={`${x}-${y}`}
                  style={{ background: c === "1" ? tone.ring : c === "2" ? "#00000088" : "transparent" }}
                />
              ))
          )
        ) : (
          <img
            src={imageSrc[speaker]}
            alt={label}
            onError={() => setImgFailed(true)}
            style={{
              width: "112%",
              height: "112%",
              objectFit: "cover",
              objectPosition: "50% 12%",
              imageRendering: speaker === "angel" || speaker === "narrator" ? "auto" : "pixelated",
            }}
          />
        )}
      </div>

      {/* Thin decorative inner hairline — part of the game UI language. */}
      <span
        style={{
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          border: `1px solid ${speaking ? tone.ring + "99" : "transparent"}`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}
