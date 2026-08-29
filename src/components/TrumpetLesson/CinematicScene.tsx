import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { TrumpetData } from "../../data/trumpets/types";
import { useLang } from "../../i18n/LanguageContext";
import ParticleField from "../common/ParticleField";

interface CinematicSceneProps {
  trumpet: TrumpetData;
  /**
   * Optional content to render in place of the default narration text —
   * used by TrumpetVideoDialogue to overlay the Holy Father / girl dialogue
   * (and the narration beat) directly on top of the same persistent video
   * background, instead of narration always being the only thing shown here.
   */
  children?: ReactNode;
}

export default function CinematicScene({ trumpet, children }: CinematicSceneProps) {
  const { t, lang } = useLang();
  const { primary, secondary } = trumpet.theme;
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = Boolean(trumpet.videoSrc) && !videoFailed;

  // The `autoPlay` attribute alone can silently fail to start playback in
  // some browsers (e.g. after client-side navigation); explicitly request
  // playback so the scene never gets stuck showing just the first frame.
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [showVideo, trumpet.videoSrc]);
  // CHANGED (item #4): a still image now sits behind the scene whenever
  // there's no video (or the video fails) — instead of jumping straight to
  // the plain particle/gradient background. `trumpet.imageSrc` is optional,
  // so trumpets without one yet just get the original look.
  const showImage = !showVideo && Boolean(trumpet.imageSrc) && !imageFailed;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        aspectRatio: "16 / 9",
        minHeight: 180,
        background: `radial-gradient(ellipse at 50% 30%, ${primary}33 0%, ${secondary} 70%)`,
        border: "1px solid var(--ink-600)",
      }}
    >
      {/* Background video layer — muted, looping, decorative. Falls back to
          the image (if set) or particle/gradient background if the file is
          missing or fails to load, so a bad asset never breaks the
          presentation. */}
      {showVideo && (
        <video
          ref={videoRef}
          src={trumpet.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85,
          }}
        />
      )}

      {/* Still-image placeholder — used when there's no video yet. */}
      {showImage && (
        <img
          src={trumpet.imageSrc}
          alt=""
          onError={() => setImageFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85,
          }}
        />
      )}

      {/* Particle field always renders — sits on top of video/image as
          texture, or stands alone as the scene when there's neither. */}
      <ParticleField color={primary} density={showVideo || showImage ? 12 : 24} speed={0.7} />

      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: showVideo || showImage ? 0.55 : 0.9, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${primary}55, transparent 60%)`,
        }}
      />

      {/* Readability scrim under the content, stronger when a video
          or image is behind it. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            showVideo || showImage
              ? "linear-gradient(180deg, rgba(6,7,10,0.15) 0%, rgba(6,7,10,0.75) 75%)"
              : "none",
        }}
      />

      <div style={{ position: "relative", padding: "22px 20px", zIndex: 2 }}>
        {children ? (
          children
        ) : (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold-300)",
              }}
            >
              {t("narration")}
            </span>
            <p
              style={{
                fontFamily: "var(--font-scripture)",
                fontSize: 16,
                lineHeight: 1.6,
                margin: "10px 0 0",
                color: "var(--parchment-100)",
                textShadow: showVideo || showImage ? "0 2px 8px rgba(0,0,0,0.8)" : "none",
              }}
            >
              {trumpet.narration[lang]}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

