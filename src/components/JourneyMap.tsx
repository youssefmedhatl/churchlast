import { motion } from "framer-motion";
import { trumpets } from "../data/trumpets";
import { useJourneyStore } from "../store/journeyStore";
import { useLang } from "../i18n/LanguageContext";
import TrumpetSigil from "./common/TrumpetSigil";
import XPBadge from "./common/XPBadge";

export default function JourneyMap() {
  const { t, lang } = useLang();
  const { isUnlocked, isCompleted, xp, jumpToTrumpet, completedTrumpets } = useJourneyStore();

  const progressPct = Math.round((completedTrumpets.length / 7) * 100);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 0%, #14161d, #08090c 65%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "18px 20px 10px",
        }}
      >
        <XPBadge xp={xp} />
      </header>

      <div style={{ padding: "0 24px 8px" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "var(--mist-400)",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          {t("journeyProgress")}
        </p>
        <div
          style={{
            height: 4,
            borderRadius: 4,
            background: "var(--ink-700)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--gold-600), var(--gold-300))",
            }}
          />
        </div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: "12px 0 96px" }}>
        <div
          style={{
            position: "relative",
            maxWidth: 420,
            margin: "0 auto",
            padding: "10px 32px",
          }}
        >
          {trumpets.map((trumpetData, i) => {
            const unlocked = isUnlocked(trumpetData.index);
            const completed = isCompleted(trumpetData.index);
            const state = completed ? "completed" : unlocked ? "available" : "locked";
            const align = i % 2 === 0 ? "flex-start" : "flex-end";

            return (
              <motion.div
                key={trumpetData.index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  display: "flex",
                  justifyContent: align,
                  marginBottom: 20,
                }}
              >
                <button
                  onClick={() => unlocked && jumpToTrumpet(trumpetData.index)}
                  disabled={!unlocked}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                    background: unlocked ? "var(--ink-800)" : "transparent",
                    border: `1px solid ${unlocked ? "var(--ink-600)" : "transparent"}`,
                    borderRadius: 16,
                    padding: "10px 16px",
                    minWidth: 190,
                    opacity: unlocked ? 1 : 0.6,
                    cursor: unlocked ? "pointer" : "default",
                    boxShadow: completed ? "0 0 24px -8px var(--gold-glow)" : "none",
                  }}
                >
                  <TrumpetSigil state={state} size={36} />
                  <div style={{ textAlign: i % 2 === 0 ? "start" : "end" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        letterSpacing: "0.05em",
                        color: unlocked ? "var(--parchment-100)" : "var(--mist-600)",
                      }}
                    >
                      {t("trumpet")} {toRoman(trumpetData.index)}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--mist-400)",
                        marginTop: 2,
                      }}
                    >
                      {unlocked
                        ? trumpetData.shortLabel[lang]
                        : t("locked")}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function toRoman(n: number) {
  const map = ["I", "II", "III", "IV", "V", "VI", "VII"];
  return map[n - 1] ?? String(n);
}
