import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trumpets } from "../../data/trumpets";
import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import { playRecording, stopVoice } from "../../lib/voiceover";
import GameShell from "../common/GameShell";
import PrimaryButton from "../common/PrimaryButton";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correctIndex: number) {
  return shuffle([correctIndex, ...shuffle(trumpets.filter((t) => t.index !== correctIndex)).slice(0, 3).map((t) => t.index)]);
}

type Phase = "listen" | "answer" | "result";

export default function Game3HearTrumpet() {
  const { t, lang } = useLang();
  const { addXp, recordGameResult, goTo } = useJourneyStore();
  const pool = trumpets;

  const [roundIndex, setRoundIndex] = useState(0);
  const [roundSeed, setRoundSeed] = useState(0);
  const [phase, setPhase] = useState<Phase>("listen");
  const [options, setOptions] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [finished, setFinished] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const rounds = useMemo(() => shuffle(pool), [roundSeed]);
  const current = rounds[roundIndex];

  useEffect(() => {
    if (!current) return;
    stopVoice();
    setPhase("listen");
    setOptions(buildOptions(current.index));
    setIsPlaying(false);
    setHasListened(false);
    setAudioError(false);
    return () => stopVoice();
  }, [current, roundIndex]);

  const listen = () => {
    if (!current?.gameAudioSrc?.length) {
      setAudioError(true);
      return;
    }
    setAudioError(false);
    setIsPlaying(true);
    setHasListened(true);
    playRecording(current.gameAudioSrc, (reason) => {
      setIsPlaying(false);
      if (reason === "ended" && phase === "listen") setPhase("answer");
      if (reason === "error") setAudioError(true);
    });
  };

  const replay = () => {
    if (!current?.gameAudioSrc?.length) {
      setAudioError(true);
      return;
    }
    setAudioError(false);
    setIsPlaying(true);
    playRecording(current.gameAudioSrc, (reason) => {
      setIsPlaying(false);
      if (reason === "error") setAudioError(true);
    });
  };

  const handleAnswer = (index: number) => {
    if (!current || !hasListened || phase === "result") return;
    stopVoice();
    setIsPlaying(false);
    const correct = index === current.index;
    const xp = correct ? 100 : 0;
    setLastCorrect(correct);
    setLastXp(xp);
    setTotalXp((s) => s + xp);
    if (correct) {
      setCorrectCount((s) => s + 1);
      addXp(xp);
    } else {
      setWrongCount((s) => s + 1);
    }
    setPhase("result");
  };

  const nextRound = () => {
    if (roundIndex + 1 >= rounds.length) {
      const finalCorrect = correctCount;
      const finalWrong = wrongCount;
      const accuracy = Math.round((finalCorrect / Math.max(1, finalCorrect + finalWrong)) * 100);
      recordGameResult("hear", totalXp, accuracy);
      setFinished(true);
      return;
    }
    setRoundIndex((i) => i + 1);
  };

  const playAgain = () => {
    stopVoice();
    setRoundIndex(0);
    setRoundSeed((s) => s + 1);
    setPhase("listen");
    setOptions([]);
    setIsPlaying(false);
    setHasListened(false);
    setLastCorrect(false);
    setCorrectCount(0);
    setWrongCount(0);
    setTotalXp(0);
    setLastXp(0);
    setFinished(false);
  };

  if (finished) {
    const accuracy = Math.round((correctCount / Math.max(1, correctCount + wrongCount)) * 100);
    return (
      <GameShell title={t("hearGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center", paddingTop: 42 }}
        >
          <div style={{ fontSize: 44, marginBottom: 14 }}>🎧</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)", fontSize: 26, margin: 0 }}>
            {t("perfectMatch")}
          </h2>
          <p style={{ color: "var(--mist-400)", marginTop: 10 }}>
            {t("accuracy")}: {accuracy}%
          </p>
          <p style={{ color: "var(--parchment-100)", marginTop: 4 }}>
            {t("xp")}: +{totalXp}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton variant="ghost" onClick={playAgain}>{t("playAgain")}</PrimaryButton>
            <PrimaryButton onClick={() => goTo({ type: "main", tab: "games" })}>{t("backToGames")}</PrimaryButton>
          </div>
        </motion.div>
      </GameShell>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <GameShell title={t("hearGameTitle")} onExit={() => { stopVoice(); goTo({ type: "main", tab: "games" }); }}>
      <p style={{ fontSize: 12, color: "var(--mist-400)", textAlign: "center", marginBottom: 18 }}>
        {roundIndex + 1} / {rounds.length}
      </p>

      <AnimatePresence mode="wait">
        {phase !== "result" ? (
          <motion.div
            key="play"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 18,
                padding: "28px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 86,
                  height: 86,
                  margin: "0 auto 18px",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: isPlaying ? "rgba(201,161,90,0.18)" : "var(--ink-700)",
                  border: "1px solid var(--gold-600)",
                  boxShadow: isPlaying ? "0 0 28px var(--gold-glow)" : "none",
                  fontSize: 34,
                }}
              >
                {isPlaying ? "🔊" : "👂"}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--gold-300)", fontSize: 20, margin: 0 }}>
                {hasListened ? t("hearGameChoose") : t("hearGameListen")}
              </h3>
              <p style={{ color: "var(--mist-400)", fontSize: 13, lineHeight: 1.6, margin: "10px 0 20px" }}>
                {t("hearGameInstruction")}
              </p>
              {audioError && (
                <p style={{ color: "var(--rust-500)", fontSize: 12, margin: "-4px 0 14px" }}>
                  {lang === "ar" ? "تعذر تشغيل الصوت. حاول مرة أخرى." : "The sound could not be played. Try again."}
                </p>
              )}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <PrimaryButton onClick={listen} disabled={isPlaying}>
                  {isPlaying ? t("hearGamePlaying") : t("hearGameListenButton")}
                </PrimaryButton>
                {hasListened && (
                  <PrimaryButton variant="ghost" onClick={replay} disabled={isPlaying}>
                    {t("hearGameReplay")}
                  </PrimaryButton>
                )}
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                color: "var(--parchment-100)",
                textAlign: "center",
                marginBottom: 12,
              }}>
                {t("whichTrumpet")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {options.map((index) => (
                  <button
                    key={index}
                    disabled={!hasListened || phase !== "answer"}
                    onClick={() => handleAnswer(index)}
                    style={{
                      padding: "15px 10px",
                      borderRadius: 12,
                      background: hasListened ? "var(--ink-800)" : "var(--ink-700)",
                      border: "1px solid var(--ink-600)",
                      color: hasListened ? "var(--parchment-100)" : "var(--mist-600)",
                      fontFamily: "var(--font-display)",
                      fontSize: 14,
                      cursor: hasListened && phase === "answer" ? "pointer" : "not-allowed",
                    }}
                  >
                    {t("trumpet")} {index}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            <div style={{ fontSize: 42, marginBottom: 12 }}>{lastCorrect ? "✅" : "❌"}</div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              color: lastCorrect ? "var(--sage-500)" : "var(--rust-500)",
              margin: 0,
            }}>
              {lastCorrect ? t("correct") : t("incorrect")}
            </p>
            <p style={{ color: "var(--mist-400)", marginTop: 10 }}>
              {t("trumpet")} {current.index} — {current.shortLabel[lang]}
            </p>
            {lastCorrect && <p style={{ color: "var(--gold-300)", marginTop: 4 }}>+{lastXp} {t("xp")}</p>}
            <div style={{ marginTop: 24 }}>
              <PrimaryButton onClick={nextRound} fullWidth>{t("continueLabel")}</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameShell>
  );
}
