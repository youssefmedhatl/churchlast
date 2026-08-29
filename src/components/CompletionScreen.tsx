import { motion } from "framer-motion";
import { useJourneyStore } from "../store/journeyStore";
import { useLang } from "../i18n/LanguageContext";
import ParticleField from "./common/ParticleField";
import PrimaryButton from "./common/PrimaryButton";
import TrumpetSigil from "./common/TrumpetSigil";
import VoicePlayButton from "./common/VoicePlayButton";

export default function CompletionScreen() {
  const { t, lang } = useLang();
  const { xp, completedTrumpets, restartJourney, exploreAll } = useJourneyStore();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "radial-gradient(ellipse at 50% 30%, #1a160a 0%, #08090c 70%)",
        padding: "0 28px",
      }}
    >
      <ParticleField color="#f0d9a3" density={30} speed={0.4} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        style={{ zIndex: 2 }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <TrumpetSigil state="completed" size={26} />
            </motion.div>
          ))}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 7vw, 38px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--gold-300)",
            margin: 0,
          }}
        >
          {t("journeyComplete")}
        </h1>
        <p style={{ color: "var(--parchment-100)", marginTop: 6, fontFamily: "var(--font-scripture)" }}>
          {t("trumpetsOf7")}
        </p>

        <div
          style={{
            display: "flex",
            gap: 28,
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--parchment-100)" }}>
              {xp}
            </div>
            <div style={{ fontSize: 11, color: "var(--mist-400)", marginTop: 4 }}>{t("totalXp")}</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--parchment-100)" }}>
              {completedTrumpets.length}
            </div>
            <div style={{ fontSize: 11, color: "var(--mist-400)", marginTop: 4 }}>
              {t("scripturesExplored")}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <VoicePlayButton
            text={t("closingMonologue")}
            lang={lang}
            audioSrc={["/audio/doors/ending.m4a"]}
            tone="var(--gold-300)"
            size={40}
          />
        </div>

        <p
          style={{
            color: "var(--parchment-100)",
            marginTop: 16,
            maxWidth: 460,
            fontFamily: "var(--font-scripture)",
            fontSize: 15,
            lineHeight: 1.8,
            whiteSpace: "pre-line",
            opacity: 0.9,
          }}
        >
          {t("closingMonologue")}
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 10, justifyContent: "center" }}>
          <PrimaryButton onClick={exploreAll}>{t("exploreAll")}</PrimaryButton>
          <PrimaryButton onClick={restartJourney} variant="ghost">
            {t("restart")}
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
