import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trumpets } from "../../data/trumpets";
import type { TrumpetData } from "../../data/trumpets/types";
import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import PrimaryButton from "../common/PrimaryButton";
import GameShell from "../common/GameShell";

const ROUND_SECONDS = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(pool: TrumpetData[], correct: TrumpetData): TrumpetData[] {
  const others = shuffle(pool.filter((t) => t.index !== correct.index)).slice(0, 3);
  return shuffle([correct, ...others]);
}

type Phase = "clue" | "answer" | "result";

export default function Game2SevenSecond() {
  const { t, lang } = useLang();
  const { addXp, recordGameResult, goTo } = useJourneyStore();

  // CHANGED: games are unlocked and playable from the very first launch —
  // use the full trumpet set as the game pool instead of gating it behind
  // `completedTrumpets`, which used to leave every game empty until the
  // player had already finished at least one trumpet.
  const pool = trumpets;

  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("clue");
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [options, setOptions] = useState<TrumpetData[]>([]);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastXp, setLastXp] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerStartedAt, setAnswerStartedAt] = useState(0);
  const [round, setRound] = useState(0);

  const rounds = useMemo(() => shuffle(pool), [pool, round]);

  const current = rounds[roundIndex];

  useEffect(() => {
    if (!current) return;
    setOptions(buildOptions(pool, current));
    setPhase("clue");
    setSecondsLeft(ROUND_SECONDS);
  }, [roundIndex, current, pool]);

  useEffect(() => {
    if (phase !== "clue") return;
    if (secondsLeft <= 0) {
      setPhase("answer");
      setAnswerStartedAt(Date.now());
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft]);

  if (pool.length < 2) {
    return (
      <GameShell title={t("sevenSecGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <p style={{ color: "var(--mist-400)", textAlign: "center", marginTop: 40 }}>
          {t("gamesLocked")}
        </p>
      </GameShell>
    );
  }

  const handleAnswer = (opt: TrumpetData) => {
    const elapsed = (Date.now() - answerStartedAt) / 1000;
    const correct = opt.index === current.index;
    let xp = 0;
    if (correct) {
      xp = elapsed < 2 ? 150 : elapsed < 4 ? 100 : 50;
      setCorrectCount((c) => c + 1);
    }
    setLastCorrect(correct);
    setLastXp(xp);
    setTotalXp((t2) => t2 + xp);
    addXp(xp);
    setPhase("result");
  };

  const nextRound = () => {
    if (roundIndex + 1 >= rounds.length) {
      const accuracy = Math.round((correctCount / rounds.length) * 100);
      recordGameResult("seven-second", totalXp, accuracy);
      setFinished(true);
    } else {
      setRoundIndex((i) => i + 1);
    }
  };

  // CHANGED: "Play Again" used to call window.location.reload(), which
  // reloaded the whole app and always dropped back to the opening
  // cinematic, wiping XP/progress in the process. Now it just resets this
  // game's own local state and reshuffles a fresh round order.
  const playAgain = () => {
    setRoundIndex(0);
    setPhase("clue");
    setSecondsLeft(ROUND_SECONDS);
    setLastCorrect(false);
    setLastXp(0);
    setTotalXp(0);
    setCorrectCount(0);
    setFinished(false);
    setRound((r) => r + 1);
  };

  if (finished) {
    const accuracy = Math.round((correctCount / rounds.length) * 100);
    return (
      <GameShell title={t("sevenSecGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)", fontSize: 26 }}>
            {t("perfectMatch")}
          </h2>
          <p style={{ color: "var(--mist-400)", marginTop: 10 }}>
            {t("accuracy")}: {accuracy}%
          </p>
          <p style={{ color: "var(--parchment-100)", marginTop: 4 }}>
            {t("xp")}: +{totalXp}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, justifyContent: "center" }}>
            <PrimaryButton variant="ghost" onClick={playAgain}>
              {t("playAgain")}
            </PrimaryButton>
            <PrimaryButton onClick={() => goTo({ type: "main", tab: "games" })}>
              {t("backToGames")}
            </PrimaryButton>
          </div>
        </div>
      </GameShell>
    );
  }

  return (
    <GameShell title={t("sevenSecGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
      <p style={{ fontSize: 12, color: "var(--mist-400)", textAlign: "center", marginBottom: 14 }}>
        {roundIndex + 1} / {rounds.length}
      </p>

      <AnimatePresence mode="wait">
        {phase === "clue" && (
          <motion.div key="clue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <motion.div
                key={secondsLeft}
                initial={{ scale: 1.4, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 56,
                  color: secondsLeft <= 2 ? "var(--rust-500)" : "var(--gold-300)",
                }}
              >
                {secondsLeft}
              </motion.div>
              <div
                style={{
                  height: 4,
                  borderRadius: 4,
                  background: "var(--ink-700)",
                  overflow: "hidden",
                  marginTop: 8,
                }}
              >
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(secondsLeft / ROUND_SECONDS) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                  style={{ height: "100%", background: "var(--gold-500)" }}
                />
              </div>
            </div>
            <div
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 16,
                padding: "20px 18px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--parchment-100)", margin: 0 }}>
                {current.cinematicSummary[lang]}
              </p>
            </div>
          </motion.div>
        )}

        {phase === "answer" && (
          <motion.div key="answer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3
              style={{
                textAlign: "center",
                fontFamily: "var(--font-display)",
                fontSize: 20,
                color: "var(--gold-300)",
                marginBottom: 18,
              }}
            >
              {t("whichTrumpet")}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {options.map((opt) => (
                <button
                  key={opt.index}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    padding: "18px 8px",
                    borderRadius: 12,
                    background: "var(--ink-800)",
                    border: "1px solid var(--ink-600)",
                    color: "var(--parchment-100)",
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                  }}
                >
                  {t("trumpet")} {opt.index}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                color: lastCorrect ? "var(--sage-500)" : "var(--rust-500)",
              }}
            >
              {lastCorrect ? t("correct") : t("incorrect")}
            </p>
            {lastCorrect && (
              <p style={{ color: "var(--gold-300)", marginTop: 4 }}>+{lastXp} {t("xp")}</p>
            )}
            <div style={{ marginTop: 24 }}>
              <PrimaryButton onClick={nextRound} fullWidth>
                {t("continueLabel")}
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  );
}
