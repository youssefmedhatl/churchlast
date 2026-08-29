import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../i18n/LanguageContext";

interface XPBadgeProps {
  xp: number;
  pulseKey?: number; // change to trigger a pulse animation
  onLongPress?: () => void;
}

export default function XPBadge({ xp, pulseKey, onLongPress }: XPBadgeProps) {
  const { t } = useLang();

  return (
    <button
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        borderRadius: 999,
        background: "var(--ink-800)",
        border: "1px solid var(--ink-600)",
      }}
      aria-label={`${xp} ${t("xp")}`}
    >
      <span style={{ fontSize: 13, letterSpacing: "0.06em", color: "var(--gold-300)" }}>
        {t("xp")}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${xp}-${pulseKey}`}
          initial={{ scale: 1.4, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--parchment-100)" }}
        >
          {xp}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
