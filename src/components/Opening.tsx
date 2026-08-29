import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";
import ParticleField from "./common/ParticleField";
import PrimaryButton from "./common/PrimaryButton";

interface OpeningProps {
  onBegin: () => void;
}

const lightPositions = [
  { top: "18%", left: "12%" },
  { top: "10%", left: "32%" },
  { top: "22%", left: "52%" },
  { top: "9%", left: "70%" },
  { top: "26%", left: "84%" },
  { top: "15%", left: "60%" },
  { top: "20%", left: "22%" },
];

// The opening video is a landscape (16:9) recording. On a tall phone
// screen, stretching that full-bleed with object-fit:cover forces a huge
// crop/zoom to fill the height — that's what was making this look "zoomed
// in". Fix: play the video at its own aspect ratio in a boxed area
// (object-fit:contain within a 16:9 box), with the app's normal atmospheric
// background filling the rest of the screen above/below it. Nothing gets
// cropped or distorted, and it still reads as a full, deliberate scene
// rather than a letterboxed video with black bars.
const OPENING_VIDEO_SRC = "/videos/opening.mp4";

export default function Opening({ onBegin }: OpeningProps) {
  const { t, lang } = useLang();
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const showVideo = !videoFailed && !videoEnded;

  if (showVideo) {
    return (
      <div
        onClick={() => setVideoEnded(true)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 20%, #14161d 0%, #0a0b0f 55%, #060608 100%)",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ParticleField color="#d9c9a3" density={16} speed={0.4} />

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            maxHeight: "70%",
            background: "#000",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
          }}
        >
          <video
            src={OPENING_VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            onEnded={() => setVideoEnded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 24,
            width: "100%",
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--mist-400)",
          }}
        >
          {t("tapToSkip")}
        </motion.p>
      </div>
    );
  }

  if (videoEnded && !videoFailed) {
    onBegin();
    return null;
  }

  // Fallback title screen — only reached if the video file is missing or
  // failed to load. Keeps the original particle animation + Begin button
  // so the app is never stuck on a blank screen.
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 50% 20%, #14161d 0%, #0a0b0f 55%, #060608 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "8%",
        overflow: "hidden",
      }}
    >
      <ParticleField color="#d9c9a3" density={22} speed={0.5} />

      <AnimatePresence>
        {lightPositions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.9, 0.5], scale: 1 }}
            transition={{ delay: 0.4 + i * 0.35, duration: 1.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gold-300)",
              boxShadow: "0 0 18px 6px var(--gold-glow)",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        style={{
          position: "absolute",
          top: "34%",
          fontFamily: "var(--font-scripture)",
          fontStyle: "italic",
          fontSize: 15,
          color: "var(--mist-400)",
          textAlign: "center",
          padding: "0 16%",
          lineHeight: 1.6,
          zIndex: 2,
        }}
      >
        {lang === "ar"
          ? "«ورأيت السبعة الملائكة... وأُعطوا سبعة أبواق» — رؤيا ٨: ٢"
          : "“And I saw the seven angels… and to them were given seven trumpets.” — Revelation 8:2"}
      </motion.p>

      <div style={{ textAlign: "center", zIndex: 2 }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 8vw, 44px)",
            letterSpacing: "0.12em",
            margin: 0,
            color: "var(--parchment-100)",
            textTransform: "uppercase",
          }}
        >
          {t("appTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 3.8, duration: 1.2 }}
          style={{
            fontFamily: "var(--font-scripture)",
            fontStyle: "italic",
            fontSize: 17,
            marginTop: 8,
            color: "var(--gold-300)",
          }}
        >
          {t("appSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.9 }}
          style={{ marginTop: 40 }}
        >
          <PrimaryButton onClick={onBegin}>{t("begin")}</PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
