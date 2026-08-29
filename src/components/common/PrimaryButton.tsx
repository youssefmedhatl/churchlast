import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "gold" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  variant = "gold",
  disabled,
  fullWidth,
}: PrimaryButtonProps) {
  const gold = variant === "gold";
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? "100%" : undefined,
        padding: "16px 28px",
        borderRadius: 14,
        fontFamily: "var(--font-display)",
        fontSize: 15,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: gold
          ? "linear-gradient(180deg, var(--gold-300), var(--gold-600))"
          : "transparent",
        color: gold ? "#1a1408" : "var(--parchment-100)",
        border: gold ? "none" : "1px solid var(--ink-600)",
        boxShadow: gold ? "0 8px 30px -8px var(--gold-glow)" : "none",
        opacity: disabled ? 0.45 : 1,
        minHeight: 52,
      }}
    >
      {children}
    </motion.button>
  );
}
