import { motion } from "framer-motion";
import { trumpets } from "../data/trumpets";
import { useJourneyStore } from "../store/journeyStore";
import { useLang } from "../i18n/LanguageContext";

// All seven passages are shown regardless of progress — this page is a
// reference/reading list, not a reward you have to grind for. Trumpets you
// haven't reached yet just get a small "not yet reached" tag so the journey
// still feels meaningful, without blocking access to the content itself.
export default function VerseCollection() {
  const { t, lang } = useLang();
  const { completedTrumpets } = useJourneyStore();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 0%, #14161d, #08090c 65%)",
        overflow: "auto",
        padding: "24px 20px 110px",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          letterSpacing: "0.05em",
          color: "var(--gold-300)",
          margin: "10px 0 4px",
        }}
      >
        {t("verseCollectionTitle")}
      </h1>
      <p style={{ fontSize: 13, color: "var(--mist-400)", marginBottom: 22 }}>
        {t("verseCollectionSubtitle")}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {trumpets.map((tr, i) => {
          const reached = completedTrumpets.includes(tr.index);
          return (
            <motion.div
              key={tr.index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: "var(--parchment-100)",
                color: "var(--parchment-ink)",
                borderRadius: 16,
                padding: "16px 18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, opacity: 0.7 }}>
                  {t("trumpet")} {tr.index}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, opacity: 0.7 }}>
                  {tr.scriptureRef[lang]}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-scripture)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {tr.scriptureText[lang]}
              </p>
              {!reached && (
                <p
                  style={{
                    fontSize: 11,
                    marginTop: 10,
                    marginBottom: 0,
                    opacity: 0.55,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ○ {t("verseNotYetReached")}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
