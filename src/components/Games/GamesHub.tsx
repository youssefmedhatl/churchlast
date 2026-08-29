import { motion } from "framer-motion";
import { useJourneyStore, type GameId } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";

const games: {
  id: GameId;
  icon: string;
  titleKey: "matchGameTitle" | "sevenSecGameTitle" | "hearGameTitle" | "emojiGameTitle";
  descKey: "matchGameDesc" | "sevenSecGameDesc" | "hearGameDesc" | "emojiGameDesc";
  ready: boolean;
}[] = [
  { id: "match", icon: "🎺", titleKey: "matchGameTitle", descKey: "matchGameDesc", ready: true },
  { id: "seven-second", icon: "⚡", titleKey: "sevenSecGameTitle", descKey: "sevenSecGameDesc", ready: true },
  { id: "hear", icon: "👂", titleKey: "hearGameTitle", descKey: "hearGameDesc", ready: false },
  { id: "emoji-guess", icon: "🤔", titleKey: "emojiGameTitle", descKey: "emojiGameDesc", ready: true },
];

export default function GamesHub() {
  const { t } = useLang();
  const { gameScores, goTo } = useJourneyStore();
  // CHANGED: games are always unlocked now, regardless of trumpet progress.
  // "ready" (per-game) still gates Game 3 until real audio assets exist —
  // that's a content-readiness flag, not a progression lock.
  const unlocked = true;

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
        {t("gamesTitle")}
      </h1>
      <p style={{ fontSize: 13, color: "var(--mist-400)", marginBottom: 22 }}>{t("gamesSubtitle")}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {games.map((g, i) => {
          const score = gameScores[g.id];
          const playable = unlocked && g.ready;
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--ink-600)",
                borderRadius: 18,
                padding: "18px 18px",
                opacity: g.ready ? 1 : 0.55,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 30 }}>{g.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      color: "var(--parchment-100)",
                    }}
                  >
                    {t(g.titleKey)}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--mist-400)", marginTop: 2 }}>
                    {t(g.descKey)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 14,
                }}
              >
                <span style={{ fontSize: 11, color: "var(--mist-600)" }}>
                  {g.ready ? `${t("gameBestScore")}: ${score.bestScore}` : t("gameComingSoon")}
                </span>
                <button
                  disabled={!playable}
                  onClick={() => goTo({ type: "game", id: g.id })}
                  style={{
                    padding: "9px 20px",
                    borderRadius: 999,
                    background: playable
                      ? "linear-gradient(180deg, var(--gold-300), var(--gold-600))"
                      : "var(--ink-700)",
                    color: playable ? "#1a1408" : "var(--mist-600)",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("gamePlay")}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
