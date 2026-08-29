import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TrumpetQuestion } from "../../data/trumpets/types";
import { useLang } from "../../i18n/LanguageContext";
import PrimaryButton from "../common/PrimaryButton";

interface QuestionStageProps {
  question: TrumpetQuestion;
  onCorrect: () => void;
}

export default function QuestionStage({ question, onCorrect }: QuestionStageProps) {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const isCorrect = (id: string) => id === question.correctOptionId;

  const handleSelect = (id: string) => {
    if (result === "correct") return;
    setSelected(id);
    setResult(isCorrect(id) ? "correct" : "wrong");
  };

  return (
    <div>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--gold-300)",
        }}
      >
        {t("answerQuestion")}
      </span>
      <p
        style={{
          fontSize: 17,
          lineHeight: 1.5,
          margin: "10px 0 18px",
          color: "var(--parchment-100)",
        }}
      >
        {question.prompt[lang]}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt) => {
          const chosen = selected === opt.id;
          const showCorrect = result && isCorrect(opt.id);
          const showWrong = result === "wrong" && chosen;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={result === "correct"}
              style={{
                textAlign: "start",
                padding: "14px 16px",
                borderRadius: 12,
                border: `1px solid ${
                  showCorrect ? "var(--sage-500)" : showWrong ? "var(--rust-500)" : "var(--ink-600)"
                }`,
                background: showCorrect
                  ? "rgba(138,171,127,0.14)"
                  : showWrong
                  ? "rgba(182,103,74,0.14)"
                  : "var(--ink-800)",
                color: "var(--parchment-100)",
                fontSize: 15,
                minHeight: 52,
              }}
            >
              {opt.text[lang]}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 18 }}
          >
            {result === "correct" ? (
              <>
                <p style={{ color: "var(--sage-500)", fontWeight: 600, marginBottom: 14 }}>
                  ✓ {t("correct")}
                </p>
                <PrimaryButton onClick={onCorrect} fullWidth>
                  {t("continueLabel")}
                </PrimaryButton>
              </>
            ) : (
              <>
                <p style={{ color: "var(--rust-500)", fontWeight: 600, marginBottom: 6 }}>
                  {t("incorrect")}
                </p>
                <p style={{ fontSize: 13, color: "var(--mist-400)", lineHeight: 1.5, marginBottom: 14 }}>
                  {t("seeExplanation")} {question.explanation[lang]}
                </p>
                <PrimaryButton
                  onClick={() => {
                    setResult(null);
                    setSelected(null);
                  }}
                  variant="ghost"
                  fullWidth
                >
                  {t("tryAgain")}
                </PrimaryButton>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
