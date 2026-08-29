import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { TrumpetData } from "../../data/trumpets/types";
import ParticleField from "../common/ParticleField";

interface CinematicStageProps {
  trumpet: TrumpetData;
  /** When true the stage expands from its docked slot to fullscreen. */
  fullscreen: boolean;
  /** Overlay content (narration, cues) rendered inside the stage. */
  children?: ReactNode;
}

type Rect = { top: number; left: number; width: number; height: number };

/**
 * The cinematic area for a trumpet lesson.
 *
 * The video is mounted ONCE and never remounts, so it keeps playing while the
 * dialogue steps forward beneath it and while the stage grows to fullscreen for
 * the vision itself. It always uses `object-fit: contain`, so the original
 * aspect ratio is preserved — the footage is never stretched.
 *
 * The stage is a fixed-position layer animated between the docked slot (a
 * placeholder box that reserves the same space in the layout) and the full
 * viewport, so the expansion reads as one continuous camera move rather than a
 * jump between two screens.
 */
export default function CinematicStage({ trumpet, fullscreen, children }: CinematicStageProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [slot, setSlot] = useState<Rect | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const showVideo = Boolean(trumpet.videoSrc) && !videoFailed;
  const showImage = !showVideo && Boolean(trumpet.imageSrc) && !imageFailed;
  const { primary, secondary } = trumpet.theme;

  // Keep the fixed stage locked onto its docked slot.
  useLayoutEffect(() => {
    const measure = () => {
      const el = slotRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSlot({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    const id = window.setInterval(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      window.clearInterval(id);
    };
  }, []);

  // Sound transitions naturally: silent while the characters speak, faded up
  // when the vision takes over the screen, faded back down on return.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    const target = fullscreen ? 1 : 0;
    const fade = () => {
      if (cancelled || !videoRef.current) return;
      const cur = videoRef.current.volume;
      const next = cur + (target - cur) * 0.18;
      videoRef.current.volume = Math.abs(target - next) < 0.02 ? target : next;
      videoRef.current.muted = target === 0;
      if (Math.abs(target - videoRef.current.volume) > 0.02) requestAnimationFrame(fade);
    };
    if (fullscreen) v.muted = false;
    v.volume = fullscreen ? 0 : 1;
    requestAnimationFrame(fade);
    return () => {
      cancelled = true;
    };
  }, [fullscreen]);

  // Whether we've measured the docked slot at least once. Until then, the
  // fixed video layer is skipped entirely rather than rendered at a
  // placeholder {0,0,0,0} rect — animating INTO size from zero on first
  // mount briefly collapses the video to zero-by-zero pixels right as the
  // browser tries to autoplay it, which makes autoplay silently fail and
  // leaves only the first frame showing (never actually playing).
  const hasMeasured = slot !== null;
  const docked: Rect = slot ?? { top: 0, left: 0, width: 0, height: 0 };

  // The `autoPlay` attribute alone isn't reliable once the element is
  // detached from a natural document flow (fixed position, size set only
  // after measurement, SSR hydration, etc.) — some browsers load the video
  // but never actually start it, leaving just the first frame visible.
  // Explicitly requesting playback covers those cases; muted playback is
  // always allowed, so this should never be rejected.
  useEffect(() => {
    if (!showVideo || !hasMeasured) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {
        /* retried on the next canplay/loadeddata event below */
      });
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
    };
  }, [showVideo, hasMeasured, trumpet.videoSrc]);

  return (
    <>
      {/* Reserves the docked space, keeps the original 16:9 proportion. */}
      <div
        ref={slotRef}
        style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 20 }}
      />

      {/* Screen darkens behind the vision. */}
      <motion.div
        animate={{ opacity: fullscreen ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "#04050700",
          backgroundColor: "#040507",
          zIndex: 40,
          pointerEvents: fullscreen ? "auto" : "none",
        }}
      />

      {hasMeasured && (
      <motion.div
        initial={{
          top: docked.top,
          left: docked.left,
          width: docked.width,
          height: docked.height,
          borderRadius: 20,
        }}
        animate={
          fullscreen
            ? { top: 0, left: 0, width: "100vw", height: "100dvh", borderRadius: 0 }
            : {
                top: docked.top,
                left: docked.left,
                width: docked.width,
                height: docked.height,
                borderRadius: 20,
              }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          zIndex: 41,
          overflow: "hidden",
          background: `radial-gradient(ellipse at 50% 30%, ${primary}33 0%, ${secondary} 70%)`,
          border: fullscreen ? "none" : "1px solid var(--ink-600)",
          boxShadow: fullscreen
            ? "none"
            : `0 26px 60px -30px #000, 0 0 40px -30px ${primary}`,
        }}
      >
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
              // Never stretched — original aspect ratio is preserved.
              objectFit: "contain",
              backgroundColor: "#040507",
            }}
          />
        )}
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
              objectFit: "contain",
              backgroundColor: "#040507",
            }}
          />
        )}
        {!showVideo && !showImage && <ParticleField color={primary} />}

        {/* Cinematic vignette + film grain-ish gradient, keeps text readable. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%), linear-gradient(to top, rgba(4,5,7,0.85), transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {children}
      </motion.div>
      )}
    </>
  );
}
