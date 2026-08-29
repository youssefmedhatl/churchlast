import { motion, AnimatePresence } from "framer-motion";
import { useJourneyStore } from "../store/journeyStore";
import { useLang } from "../i18n/LanguageContext";

export default function PresentationModeOverlay() {
  const { t } = useLang();
  const { presentationModeOpen, closePresentationMode, jumpToTrumpet, resetProgress, goTo } =
    useJourneyStore();

  // CHANGED: resetProgress permanently wipes XP, completed trumpets, and
  // game scores, then sends everyone back to the opening cinematic. This
  // used to fire on a single tap with no confirmation — easy to hit by
  // accident mid-presentation and lose everything. Now it asks first, same
  // as the equivalent button in Settings.
  const handleResetProgress = () => {
    if (window.confirm(t("resetProgress") + "?")) {
      resetProgress();
    }
  };

  // Preview the opening cinematic without touching XP or trumpet progress —
  // jumpToTrumpet-style navigation only, nothing is cleared. Useful for a
  // presenter who wants to show the intro again mid-demo.
  const handlePreviewOpening = () => {
    closePresentationMode();
    goTo("opening");
  };

  return (
    <AnimatePresence>
      {presentationModeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(6,6,8,0.92)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            padding: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--gold-300)" }}>
              {t("presentationMode")}
            </h2>
            <button onClick={closePresentationMode} style={{ color: "var(--mist-400)", fontSize: 14 }}>
              {t("close")}
            </button>
          </div>

          <p style={{ fontSize: 11, color: "var(--mist-600)", marginTop: 6, lineHeight: 1.5 }}>
            {t("presentationModeHint")}
          </p>

          <p style={{ fontSize: 12, color: "var(--mist-600)", marginTop: 16 }}>
            {t("jumpTo")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginTop: 10,
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToTrumpet(i + 1)}
                style={{
                  padding: "14px 0",
                  borderRadius: 10,
                  background: "var(--ink-800)",
                  border: "1px solid var(--ink-600)",
                  color: "var(--parchment-100)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={handlePreviewOpening}
              title={t("previewOpening")}
              aria-label={t("previewOpening")}
              style={{
                padding: "14px 0",
                borderRadius: 10,
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                color: "var(--parchment-100)",
              }}
            >
              ⟲
            </button>
            <button
              onClick={() => {
                closePresentationMode();
                goTo("final");
              }}
              title={t("jumpToFinale")}
              aria-label={t("jumpToFinale")}
              style={{
                padding: "14px 0",
                borderRadius: 10,
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                color: "var(--parchment-100)",
              }}
            >
              ⇥
            </button>
          </div>

          <div style={{ marginTop: "auto" }}>
            <button
              onClick={handleResetProgress}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "1px solid var(--rust-500)",
                color: "var(--rust-500)",
              }}
            >
              {t("resetProgress")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
