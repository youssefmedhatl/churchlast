interface TrumpetSigilProps {
  state: "locked" | "available" | "completed";
  size?: number;
}

/**
 * The recurring signature element of the app: a single minimal trumpet
 * rendered as line art. Its state communicates progress without needing
 * any label — dim and closed when locked, gold-lit and open when
 * available, solid and haloed when completed.
 */
export default function TrumpetSigil({ state, size = 40 }: TrumpetSigilProps) {
  const stroke =
    state === "locked" ? "#4a4d58" : state === "available" ? "#f0d9a3" : "#c9a15a";
  const fill = state === "completed" ? "#c9a15a" : "none";
  const opacity = state === "locked" ? 0.55 : 1;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ opacity, transition: "opacity 0.4s ease" }}
      aria-hidden="true"
    >
      <path
        d="M6 20 L26 14 L26 34 L6 28 Z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill={fill}
        fillOpacity={state === "completed" ? 0.9 : 0}
      />
      <path
        d="M26 16 H34 C39 16 42 20 42 24 C42 28 39 32 34 32 H26"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="24" r="2.4" fill={stroke} />
      <path d="M6 20 L2 21.5 V26.5 L6 28" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
