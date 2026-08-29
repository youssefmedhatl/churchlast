import { useJourneyStore } from "../../store/journeyStore";
import { useLang } from "../../i18n/LanguageContext";
import GameShell from "../common/GameShell";
import PrimaryButton from "../common/PrimaryButton";

/**
 * Structural placeholder for the audio identification game described in the
 * brief. Deliberately not wired up yet: it depends on real recorded sound
 * clips (trumpet blast / storm / fire / horses / darkness ambience per
 * trumpet) that don't exist in the project. Once those files land in
 * public/audio/, this screen is where the LISTEN -> countdown -> "Which
 * Trumpet?" flow should be built, mirroring Game2SevenSecond's structure.
 */
export default function Game3HearTrumpet() {
  const { t } = useLang();
  const { goTo } = useJourneyStore();

  return (
    <GameShell title={t("hearGameTitle")} onExit={() => goTo({ type: "main", tab: "games" })}>
      <div style={{ textAlign: "center", paddingTop: 60 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎺</div>
        <p style={{ color: "var(--mist-400)", fontSize: 14, lineHeight: 1.6 }}>
          {t("gameComingSoon")}
        </p>
        <div style={{ marginTop: 28 }}>
          <PrimaryButton onClick={() => goTo({ type: "main", tab: "games" })}>
            {t("backToGames")}
          </PrimaryButton>
        </div>
      </div>
    </GameShell>
  );
}
