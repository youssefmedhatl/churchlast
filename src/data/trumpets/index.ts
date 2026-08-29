import trumpet1 from "./trumpet1";
import trumpet2 from "./trumpet2";
import trumpet3 from "./trumpet3";
import trumpet4 from "./trumpet4";
import trumpet5 from "./trumpet5";
import trumpet6 from "./trumpet6";
import trumpet7 from "./trumpet7";
import { trumpetScripts } from "../script";
import type { TrumpetData } from "./types";

/**
 * CHANGED (script): the intro/closing dialogue of every trumpet now comes from
 * the approved three-character game-style script (Holy Father, Girl, Angel) in
 * src/data/script.ts. Everything else about each trumpet — Scripture, narration,
 * theme, questions, XP, media — is untouched.
 */
const withScript = (t: TrumpetData): TrumpetData => {
  const script = trumpetScripts[t.index];
  if (!script) return t;
  return { ...t, introDialogue: script.intro, closingDialogue: script.closing };
};

export const trumpets: TrumpetData[] = [
  trumpet1,
  trumpet2,
  trumpet3,
  trumpet4,
  trumpet5,
  trumpet6,
  trumpet7,
].map(withScript);

export const getTrumpet = (index: number): TrumpetData => {
  const t = trumpets.find((tr) => tr.index === index);
  if (!t) throw new Error(`No trumpet data for index ${index}`);
  return t;
};

export * from "./types";
