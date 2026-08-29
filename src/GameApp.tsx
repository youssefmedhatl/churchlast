import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useJourneyStore } from "./store/journeyStore";
import { stopVoice } from "./lib/voiceover";
import Opening from "./components/Opening";
import JourneyMap from "./components/JourneyMap";
import VerseCollection from "./components/VerseCollection";
import GamesHub from "./components/Games/GamesHub";
import Settings from "./components/Settings";
import Makers from "./components/Makers";
import TrumpetLesson from "./components/TrumpetLesson/TrumpetLesson";
import Game1MatchTrumpet from "./components/Games/Game1MatchTrumpet";
import Game2SevenSecond from "./components/Games/Game2SevenSecond";
import Game3HearTrumpet from "./components/Games/Game3HearTrumpet";
import Game4EmojiGuess from "./components/Games/Game4EmojiGuess";
import CompletionScreen from "./components/CompletionScreen";
import PresentationModeOverlay from "./components/PresentationModeOverlay";
import BottomNav from "./components/BottomNav";
import DialogueSequence from "./components/common/DialogueSequence";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { openingDialogue } from "./data/openingDialogue";

export default function App() {
  const { screen, goToTab } = useJourneyStore();
  const [showOpeningDialogue, setShowOpeningDialogue] = useState(false);

  const key =
    typeof screen === "string"
      ? screen
      : screen.type === "trumpet"
      ? `trumpet-${screen.index}`
      : screen.type === "game"
      ? `game-${screen.id}`
      : `main-${screen.tab}`;

  const showNav = typeof screen === "object" && screen.type === "main" && !showOpeningDialogue;

  // App-wide safety net: whenever the visible screen changes — dashboard,
  // a trumpet lesson, a game, settings, the finale, anything — cut any
  // voiceover still going from wherever we were before. Individual screens
  // already stop their own audio on skip, but this guarantees nothing ever
  // survives a full navigation.
  useEffect(() => {
    stopVoice();
  }, [key, showOpeningDialogue]);

  return (
    <ErrorBoundary>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={showOpeningDialogue ? "opening-dialogue" : key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0 }}
          >
            {showOpeningDialogue ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  background: "radial-gradient(ellipse at 50% 20%, #14161d 0%, #08090c 70%)",
                  padding: "0 20px 40px",
                }}
              >
                <div style={{ width: "100%", maxWidth: 460, margin: "0 auto" }}>
                  <DialogueSequence
                    lines={openingDialogue}
                    onDone={() => {
                      setShowOpeningDialogue(false);
                      goToTab("dashboard");
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                {screen === "opening" && <Opening onBegin={() => setShowOpeningDialogue(true)} />}
                {typeof screen === "object" && screen.type === "main" && screen.tab === "dashboard" && (
                  <JourneyMap />
                )}
                {typeof screen === "object" && screen.type === "main" && screen.tab === "verses" && (
                  <VerseCollection />
                )}
                {typeof screen === "object" && screen.type === "main" && screen.tab === "games" && (
                  <GamesHub />
                )}
                {typeof screen === "object" && screen.type === "main" && screen.tab === "settings" && (
                  <Settings />
                )}
                {typeof screen === "object" && screen.type === "trumpet" && (
                  <TrumpetLesson index={screen.index} />
                )}
                {typeof screen === "object" && screen.type === "game" && screen.id === "match" && (
                  <Game1MatchTrumpet />
                )}
                {typeof screen === "object" && screen.type === "game" && screen.id === "seven-second" && (
                  <Game2SevenSecond />
                )}
                {typeof screen === "object" && screen.type === "game" && screen.id === "hear" && (
                  <Game3HearTrumpet />
                )}
                {typeof screen === "object" && screen.type === "game" && screen.id === "emoji-guess" && (
                  <Game4EmojiGuess />
                )}
                {screen === "final" && <CompletionScreen />}
                {screen === "makers" && <Makers />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
        {showNav && <BottomNav />}
        <PresentationModeOverlay />
      </div>
    </ErrorBoundary>
  );
}
