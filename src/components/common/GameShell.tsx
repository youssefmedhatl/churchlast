import type { ReactNode } from "react";

interface GameShellProps {
  title: string;
  onExit: () => void;
  children: ReactNode;
}

export default function GameShell({ title, onExit, children }: GameShellProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 0%, #14161d, #08090c 65%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", padding: "16px 20px", gap: 12 }}>
        <button onClick={onExit} style={{ color: "var(--mist-400)", fontSize: 18 }} aria-label="back">
          ←
        </button>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--gold-300)" }}>
          {title}
        </h2>
      </header>
      <div className="scroll-y" style={{ flex: 1, padding: "8px 20px 40px" }}>
        <div style={{ maxWidth: 460, margin: "0 auto" }}>{children}</div>
      </div>
    </div>
  );
}
