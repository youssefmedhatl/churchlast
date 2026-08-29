import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trumpets } from "../../data/trumpets";
import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import PrimaryButton from "../common/PrimaryButton";
import GameShell from "../common/GameShell";

const eventIcons = ["🔥", "🌊", "☄️", "🌑", "🦗", "🐎", "👑"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Game1MatchTrumpet() {
  const { t, lang } = useLang();
  const { addXp, recordGameResult, goTo } = useJourneyStore();

  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);

  // CHANGED: games are unlocked and playable from the very first launch —
  // use the full trumpet set instead of gating it behind `completedTrumpets`,
  // which used to leave this game empty until at least one trumpet was done.
  const pool = trumpets;
  // CHANGED (two-column layout): left column = trumpet name, right column =
  // description. `round` is included so each "Play Again" reshuffles both
  // columns into a fresh order instead of repeating the same layout.
  const names = useMemo(() => shuffle(pool), [pool, round]);
  const descriptions = useMemo(() => shuffle(pool), [pool, round]);

  // CHANGED: "Play Again" used to call window.location.reload(), which
  // reloaded the whole app and always dropped back to the opening
  // cinematic, wiping XP/progress in the process. Now it just resets this
  // game's own local state and reshuffles — nothing else in the app is
  // touched.
  const playAgain = () => {
    setSelected(null);
    setMatched(new Set());
    setWrongFlash(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
    setRound((r) => r + 1);
  };

  const handleSelectName = (index: number) => {
    if (matched.has(index)) return;
    setSelected(index);
  };

  const handleSelectDescription = (index: number) => {
    if (selected === null || matched.has(selected)) return;
    if (selected === index) {
      const nextMatched = new Set(matched).add(selected);
      setMatched(nextMatched);
      setCorrectCount((c) => c + 1);
      setSelected(null);
      if (nextMatched.size === pool.length) {
        const score = (correctCount + 1) * 100;
        const accuracy = Math.round(((correctCount + 1) / (correctCount + 1 + wrongCount)) * 100);
        addXp(score);
        recordGameResult("match", score, accuracy);
        setFinished(true);
      }
    } else {
      setWrongCount((c) => c + 1);
      setWrongFlash(index);
      setTimeout(() => setWrongFlash(null), 400);
    }
  };

  if (pool.length === 0) {
    return (
      <GameShell title={t("matchGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <p style={{ color: "var(--mist-400)", textAlign: "center", marginTop: 40 }}>
          {t("gamesLocked")}
        </p>
      </GameShell>
    );
  }

  if (finished) {
    const accuracy = Math.round((correctCount / (correctCount + wrongCount)) * 100);
    return (
      <GameShell title={t("matchGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center", paddingTop: 40 }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)", fontSize: 26 }}>
            {t("perfectMatch")}
          </h2>
          <p style={{ color: "var(--mist-400)", marginTop: 10 }}>
            {t("accuracy")}: {accuracy}%
          </p>
          <p style={{ color: "var(--parchment-100)", marginTop: 4 }}>
            {t("xp")}: +{correctCount * 100}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
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
    <GameShell title={t("matchGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
      <p style={{ fontSize: 12, color: "var(--mist-400)", textAlign: "center", marginBottom: 18 }}>
        {correctCount}/{pool.length}
      </p>

      {/* Two-column layout: names on the left, descriptions on the right.
          Tap a name, then tap the description you think matches it. */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {names.map((tr) => {
              const idx = tr.index;
              if (matched.has(idx)) return null;
              const isSelected = selected === idx;
              return (
                <motion.button
                  key={idx}
                  layout
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0, scale: isSelected ? 1.04 : 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectName(idx)}
                  style={{
                    padding: "12px 10px",
                    borderRadius: 12,
                    background: isSelected ? "rgba(201,161,90,0.18)" : "var(--ink-800)",
                    border: `1px solid ${isSelected ? "var(--gold-300)" : "var(--ink-600)"}`,
                    color: "var(--parchment-100)",
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    textAlign: "start",
                    minHeight: 56,
                  }}
                >
                  {eventIcons[idx - 1]} {tr.shortLabel[lang]}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {descriptions.map((tr) => {
              const idx = tr.index;
              if (matched.has(idx)) return null;
              const isWrong = wrongFlash === idx;
              return (
                <motion.button
                  key={idx}
                  layout
                  initial={{ opacity: 0, x: 14 }}
                  animate={isWrong ? { x: [0, -6, 6, -6, 0], opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => handleSelectDescription(idx)}
                  style={{
                    padding: "10px 10px",
                    borderRadius: 12,
                    background: isWrong ? "rgba(182,103,74,0.14)" : "var(--ink-800)",
                    border: `1px solid ${isWrong ? "var(--rust-500)" : "var(--ink-600)"}`,
                    color: "var(--parchment-100)",
                    fontSize: 11.5,
                    lineHeight: 1.4,
                    textAlign: "start",
                    minHeight: 56,
                  }}
                >
                  {tr.cinematicSummary[lang]}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </GameShell>
  );
}
