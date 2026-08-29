import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTrumpet } from "../../data/trumpets";
import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import ScripturePanel from "./ScripturePanel";
import QuestionStage from "./QuestionStage";
import PrimaryButton from "../common/PrimaryButton";
import XPBadge from "../common/XPBadge";
import TrumpetVideoDialogue from "./TrumpetVideoDialogue";

type Stage =
  | "introduction"
  | "videoDialogue"
  | "scripture"
  | "question"
  | "xp"
  | "unlock";

interface TrumpetLessonProps {
  index: number;
}

export default function TrumpetLesson({ index }: TrumpetLessonProps) {
  const trumpet = getTrumpet(index);
  const { t, lang } = useLang();
  const { addXp, completeTrumpet, xp, goToTab, goTo, openPresentationMode } = useJourneyStore();

  const [stage, setStage] = useState<Stage>("introduction");
  const [xpPulse, setXpPulse] = useState(0);
  const [justAwarded, setJustAwarded] = useState(0);

  const isFinale = index === 7;

  const advance = (next: Stage) => setStage(next);

  const handleQuestionCorrect = () => {
    addXp(100);
    setJustAwarded(100);
    setXpPulse((p) => p + 1);
    advance("xp");
  };

  const handleXpContinue = () => {
    addXp(trumpet.xpOnComplete);
    setJustAwarded(trumpet.xpOnComplete);
    setXpPulse((p) => p + 1);
    completeTrumpet(index);
    advance("unlock");
  };

  const handleFinish = () => {
    if (index >= 7) {
      goTo("final");
    } else {
      goToTab("dashboard");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: isFinale
          ? "radial-gradient(ellipse at 50% 20%, #1a160a 0%, #08090c 70%)"
          : "var(--ink-950)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px 6px",
        }}
      >
        <button
          onDoubleClick={openPresentationMode}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "var(--mist-400)",
            textTransform: "uppercase",
          }}
        >
          {t("trumpet")} {index} / 7
        </button>
        <XPBadge xp={xp} pulseKey={xpPulse} />
      </header>

      <div className="scroll-y" style={{ flex: 1, padding: "12px 20px 32px" }}>
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            {stage === "introduction" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isFinale ? 30 : 26,
                    letterSpacing: "0.04em",
                    color: "var(--gold-300)",
                    margin: "18px 0 6px",
                  }}
                >
                  {trumpet.title[lang]}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--mist-400)",
                    marginBottom: 22,
                    fontFamily: "var(--font-scripture)",
                    fontStyle: "italic",
                  }}
                >
                  {trumpet.scriptureRef[lang]}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--parchment-100)" }}>
                  {trumpet.cinematicSummary[lang]}
                </p>
                <div style={{ marginTop: 28 }}>
                  <PrimaryButton onClick={() => advance("videoDialogue")} fullWidth>
                    {t("continueLabel")}
                  </PrimaryButton>
                </div>
              </motion.div>
            )}

            {stage === "videoDialogue" && (
              <motion.div
                key="videoDialogue"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                {/* Video/image plays continuously behind the intro dialogue,
                    narration, and closing dialogue -- all one beat sequence,
                    tap or swipe through. See TrumpetVideoDialogue. */}
                <TrumpetVideoDialogue trumpet={trumpet} onDone={() => advance("scripture")} />
              </motion.div>
            )}

            {stage === "scripture" && (
              <motion.div
                key="scripture"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <ScripturePanel trumpet={trumpet} />
                <div style={{ marginTop: 20 }}>
                  <PrimaryButton onClick={() => advance("question")} fullWidth>
                    {t("continueLabel")}
                  </PrimaryButton>
                </div>
              </motion.div>
            )}

            {stage === "question" && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <QuestionStage question={trumpet.questions[0]} onCorrect={handleQuestionCorrect} />
              </motion.div>
            )}

            {stage === "xp" && (
              <motion.div
                key="xp"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: "center", paddingTop: 30 }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 48,
                    color: "var(--gold-300)",
                  }}
                >
                  +{justAwarded}
                </motion.div>
                <p style={{ color: "var(--mist-400)", marginTop: 4 }}>{t("xp")}</p>
                <div style={{ marginTop: 28 }}>
                  <PrimaryButton onClick={handleXpContinue} fullWidth>
                    {index === 7 ? t("finishJourney") : t("nextTrumpet")}
                  </PrimaryButton>
                </div>
              </motion.div>
            )}

            {stage === "unlock" && (
              <motion.div
                key="unlock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: "center", paddingTop: 40 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      letterSpacing: "0.06em",
                      color: "var(--parchment-100)",
                    }}
                  >
                    {t("trumpetComplete")}
                  </p>
                  <p style={{ color: "var(--mist-400)", marginTop: 8, fontSize: 14 }}>
                    {trumpet.title[lang]}
                  </p>
                </motion.div>
                <div style={{ marginTop: 32 }}>
                  <PrimaryButton onClick={handleFinish} fullWidth>
                    {index === 7 ? t("finishJourney") : t("continueJourney")}
                  </PrimaryButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
