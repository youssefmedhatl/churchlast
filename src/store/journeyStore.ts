import { create } from "zustand";

export type MainTab = "dashboard" | "verses" | "games" | "settings";

export type GameId = "match" | "seven-second" | "hear" | "emoji-guess";

export type Screen =
  | "opening"
  | { type: "main"; tab: MainTab }
  | { type: "trumpet"; index: number }
  | { type: "game"; id: GameId }
  | "final"
  | "makers";

interface GameScore {
  bestScore: number;
  bestAccuracy: number; // 0-100
  timesPlayed: number;
}

interface JourneyState {
  screen: Screen;
  xp: number;
  completedTrumpets: number[]; // indices 1-7, in completion order
  presentationModeOpen: boolean;
  // CHANGED (presentation tools): separate from presentationModeOpen (which
  // only controls whether the overlay panel is showing). Once a presenter
  // opens Presentation Mode, ALL trumpets stay unlocked for the rest of the
  // session — closing the overlay or jumping to a trumpet no longer
  // re-locks anything behind you.
  presenterUnlockedAll: boolean;
  gameScores: Record<GameId, GameScore>;

  goTo: (screen: Screen) => void;
  goToTab: (tab: MainTab) => void;
  isUnlocked: (index: number) => boolean;
  isCompleted: (index: number) => boolean;
  addXp: (amount: number) => void;
  completeTrumpet: (index: number) => void;
  openPresentationMode: () => void;
  closePresentationMode: () => void;
  jumpToTrumpet: (index: number) => void;
  exploreAll: () => void;
  resetProgress: () => void;
  restartJourney: () => void;
  recordGameResult: (id: GameId, score: number, accuracy: number) => void;
}

const emptyGameScores: Record<GameId, GameScore> = {
  match: { bestScore: 0, bestAccuracy: 0, timesPlayed: 0 },
  "seven-second": { bestScore: 0, bestAccuracy: 0, timesPlayed: 0 },
  hear: { bestScore: 0, bestAccuracy: 0, timesPlayed: 0 },
  "emoji-guess": { bestScore: 0, bestAccuracy: 0, timesPlayed: 0 },
};

export const useJourneyStore = create<JourneyState>((set, get) => ({
  screen: "opening",
  xp: 0,
  completedTrumpets: [],
  presentationModeOpen: false,
  presenterUnlockedAll: false,
  gameScores: emptyGameScores,

  goTo: (screen) => set({ screen }),
  goToTab: (tab) => set({ screen: { type: "main", tab } }),

  // Trumpets unlock in sequence: Trumpet 1 is always open, and each
  // following trumpet unlocks only once the one before it is completed —
  // UNLESS the presenter has used Presentation Mode at all this session,
  // in which case every trumpet stays open (see presenterUnlockedAll).
  isUnlocked: (index) => {
    if (index === 1) return true;
    if (get().presenterUnlockedAll) return true;
    return get().completedTrumpets.includes(index - 1);
  },

  isCompleted: (index) => get().completedTrumpets.includes(index),

  addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

  completeTrumpet: (index) =>
    set((s) => ({
      completedTrumpets: s.completedTrumpets.includes(index)
        ? s.completedTrumpets
        : [...s.completedTrumpets, index],
    })),

  openPresentationMode: () => set({ presentationModeOpen: true, presenterUnlockedAll: true }),
  // CHANGED: closing the overlay only hides the panel — it no longer
  // re-locks trumpets. presenterUnlockedAll stays true once set.
  closePresentationMode: () => set({ presentationModeOpen: false }),

  // CHANGED: jumping to a trumpet used to also close Presentation Mode in
  // a way that re-locked everything else (isUnlocked previously fell back
  // to presentationModeOpen, which this cleared). Now it just navigates —
  // presenterUnlockedAll keeps every other trumpet open too.
  jumpToTrumpet: (index) =>
    set({ screen: { type: "trumpet", index }, presentationModeOpen: false }),

  // "Explore All Trumpets" — used from the completion screen (including
  // when a presenter jumps straight there via the Presentation Mode "Jump
  // to Finale" button). Unlocks every trumpet for browsing, same as
  // Presentation Mode does, but — unlike restartJourney/resetProgress —
  // never touches XP, completed trumpets, or game scores. Nothing is lost.
  exploreAll: () =>
    set({ screen: { type: "main", tab: "dashboard" }, presenterUnlockedAll: true }),

  // Full reset — clears XP, progress, AND the presenter unlock-all flag,
  // then returns to the opening cinematic. Used by Settings and by the
  // "Reset Progress" button inside Presentation Mode (both ask for
  // confirmation before calling this, since it can't be undone).
  resetProgress: () =>
    set({
      xp: 0,
      completedTrumpets: [],
      gameScores: emptyGameScores,
      screen: "opening",
      presentationModeOpen: false,
      presenterUnlockedAll: false,
    }),

  // "Play Again" from the completion screen: clears progress and XP but
  // goes straight to the dashboard — it does NOT replay the opening
  // cinematic/dialogue. (Use resetProgress instead for a true full reset,
  // e.g. from Settings or Presentation Mode.)
  restartJourney: () =>
    set({
      xp: 0,
      completedTrumpets: [],
      gameScores: emptyGameScores,
      screen: { type: "main", tab: "dashboard" },
      presentationModeOpen: false,
      presenterUnlockedAll: false,
    }),

  recordGameResult: (id, score, accuracy) =>
    set((s) => {
      const prev = s.gameScores[id];
      return {
        gameScores: {
          ...s.gameScores,
          [id]: {
            bestScore: Math.max(prev.bestScore, score),
            bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
            timesPlayed: prev.timesPlayed + 1,
          },
        },
      };
    }),
}));
