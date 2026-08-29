import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emojiQuestions, type EmojiQuestion, type EmojiQuestionOption } from "../../data/emojiEventQuestions";
import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import PrimaryButton from "../common/PrimaryButton";
import GameShell from "../common/GameShell";

const FULL_CREDIT_POINTS = 100;
const HINT_PENALTY_POINTS = 50;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "playing" | "result";

export default function Game4EmojiGuess() {
  const { t, lang } = useLang();
  const { addXp, recordGameResult, goTo } = useJourneyStore();

  // One puzzle per trumpet (7 total), shuffled into a fresh order each session.
  const [round, setRound] = useState(0);
  const questions = useMemo(() => shuffle(emojiQuestions), [round]);

  // Each question's answer options are also reshuffled so the correct
  // answer isn't always in the same slot.
  const optionOrders = useMemo(
    () => questions.map((q) => shuffle(q.options)),
    [questions]
  );

  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current: EmojiQuestion | undefined = questions[qIndex];
  const currentOptions: EmojiQuestionOption[] = optionOrders[qIndex] ?? [];

  const choose = (opt: EmojiQuestionOption) => {
    if (!current || phase !== "playing") return;
    const correct = opt.id === current.correctOptionId;
    setSelectedId(opt.id);
    if (correct) {
      const points = hintUsed ? HINT_PENALTY_POINTS : FULL_CREDIT_POINTS;
      setLastCorrect(true);
      setLastPoints(points);
      setScore((s) => s + points);
      setCorrectCount((c) => c + 1);
      addXp(points);
    } else {
      setLastCorrect(false);
      setLastPoints(0);
      setIncorrectCount((c) => c + 1);
    }
    setPhase("result");
  };

  const useHint = () => {
    setHintUsed(true);
    setShowHint(true);
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      const accuracy = Math.round((correctCount / questions.length) * 100);
      recordGameResult("emoji-guess", score, accuracy);
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
      setSelectedId(null);
      setHintUsed(false);
      setShowHint(false);
      setPhase("playing");
    }
  };

  const playAgain = () => {
    setRound((r) => r + 1);
    setQIndex(0);
    setSelectedId(null);
    setHintUsed(false);
    setShowHint(false);
    setPhase("playing");
    setLastCorrect(false);
    setLastPoints(0);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setFinished(false);
  };

  const maxScore = questions.length * FULL_CREDIT_POINTS;

  const performanceMessage = (): string => {
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (pct >= 90) return t("emojiGameBibleMaster");
    if (pct >= 70) return t("emojiGameExcellent");
    if (pct >= 50) return t("emojiGameGreatJob");
    return t("emojiGameKeepPlaying");
  };

  if (!current || questions.length === 0) {
    return (
      <GameShell title={t("emojiGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <p style={{ color: "var(--mist-400)", textAlign: "center", marginTop: 40 }}>
          {t("gamesLocked")}
        </p>
      </GameShell>
    );
  }

  if (finished) {
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return (
      <GameShell title={t("emojiGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", paddingTop: 24 }}
        >
          <div style={{ fontSize: 40, marginBottom: 4 }}>🏆</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)", fontSize: 24, margin: "6px 0" }}>
            {t("emojiGameFinalScore")}: {score}
          </h2>
          <p style={{ color: "var(--parchment-100)", fontSize: 16, margin: "6px 0" }}>{performanceMessage()}</p>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 14,
                padding: "12px 18px",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: 20, color: "var(--sage-500)" }}>{correctCount}</div>
              <div style={{ fontSize: 11, color: "var(--mist-400)" }}>{t("emojiGameCorrectCount")}</div>
            </div>
            <div
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 14,
                padding: "12px 18px",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: 20, color: "var(--rust-500)" }}>{incorrectCount}</div>
              <div style={{ fontSize: 11, color: "var(--mist-400)" }}>{t("emojiGameIncorrectCount")}</div>
            </div>
            <div
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 14,
                padding: "12px 18px",
                minWidth: 120,
              }}
            >
              <div style={{ fontSize: 20, color: "var(--gold-300)" }}>{pct}%</div>
              <div style={{ fontSize: 11, color: "var(--mist-400)" }}>{t("accuracy")}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 28, justifyContent: "center" }}>
            <PrimaryButton variant="ghost" onClick={playAgain}>
              {t("playAgain")}
            </PrimaryButton>
            <PrimaryButton onClick={() => goTo({ type: "main", tab: "games" })}>
              {t("backToGames")}
            </PrimaryButton>
          </div>
        </motion.div>
      </GameShell>
    );
  }

  return (
    <GameShell title={t("emojiGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--gold-300)",
            margin: "4px 0",
          }}
        >
          {t("emojiGameHeading")}
        </h2>
        <p style={{ fontSize: 13, color: "var(--mist-400)", margin: "0 0 4px" }}>
          {t("emojiGameSubheading")}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--mist-400)",
          margin: "10px 0 14px",
        }}
      >
        <span>
          {t("emojiGameQuestion")} {qIndex + 1} / {questions.length}
        </span>
        <span style={{ color: "var(--gold-300)" }}>
          {t("emojiGameScore")}: {score}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              background: "var(--ink-800)",
              border: "1px solid var(--ink-600)",
              borderRadius: 18,
              padding: "20px 16px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
              }}
            >
              {current.emojis.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  style={{
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    background: "var(--ink-700)",
                    borderRadius: 12,
                  }}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>

          {phase === "playing" && (
            <>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: 14,
                      background: "var(--ink-700)",
                      border: "1px solid var(--gold-600)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      fontSize: 13,
                      color: "var(--parchment-100)",
                    }}
                  >
                    💡 {t("emojiGameHintLabel")}: {current.hint[lang]}
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {currentOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => choose(opt)}
                    style={{
                      textAlign: "start",
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: "var(--ink-700)",
                      border: "1px solid var(--ink-600)",
                      color: "var(--parchment-100)",
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {opt.text[lang]}
                  </motion.button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
                <PrimaryButton variant="ghost" onClick={useHint} disabled={hintUsed}>
                  💡 {t("emojiGameHint")}
                </PrimaryButton>
              </div>
            </>
          )}

          {phase === "result" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ marginTop: 16 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentOptions.map((opt) => {
                  const isCorrectOpt = opt.id === current.correctOptionId;
                  const isSelected = opt.id === selectedId;
                  const bg = isCorrectOpt
                    ? "var(--ink-700)"
                    : isSelected
                    ? "var(--ink-700)"
                    : "var(--ink-700)";
                  const border = isCorrectOpt
                    ? "1px solid var(--sage-500)"
                    : isSelected
                    ? "1px solid var(--rust-500)"
                    : "1px solid var(--ink-600)";
                  return (
                    <div
                      key={opt.id}
                      style={{
                        textAlign: "start",
                        padding: "14px 16px",
                        borderRadius: 12,
                        background: bg,
                        border,
                        color: "var(--parchment-100)",
                        fontSize: 14,
                        lineHeight: 1.4,
                        opacity: !isCorrectOpt && !isSelected ? 0.55 : 1,
                      }}
                    >
                      {opt.text[lang]} {isCorrectOpt ? "✅" : isSelected ? "❌" : ""}
                    </div>
                  );
                })}
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  color: lastCorrect ? "var(--sage-500)" : "var(--rust-500)",
                  margin: "16px 0 4px",
                }}
              >
                {lastCorrect ? t("emojiGameCorrect") : t("emojiGameIncorrect")}
              </p>
              {lastCorrect && (
                <p style={{ textAlign: "center", color: "var(--gold-300)", margin: "0 0 10px" }}>
                  +{lastPoints} {t("xp")}
                </p>
              )}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "var(--mist-400)",
                  lineHeight: 1.5,
                  maxWidth: 380,
                  margin: "0 auto 18px",
                }}
              >
                {current.explanation[lang]}
              </p>
              <PrimaryButton onClick={nextQuestion} fullWidth>
                {t("emojiGameNext")}
              </PrimaryButton>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </GameShell>
  );
}
