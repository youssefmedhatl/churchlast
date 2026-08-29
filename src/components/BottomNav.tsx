import type { MainTab } from "../store/journeyStore";
import { useJourneyStore } from "../store/journeyStore";
import { useLang } from "../i18n/LanguageContext";

const tabs: { id: MainTab; icon: string; labelKey: "navDashboard" | "navVerses" | "navGames" | "navSettings" }[] = [
  { id: "dashboard", icon: "🎺", labelKey: "navDashboard" },
  { id: "verses", icon: "📜", labelKey: "navVerses" },
  { id: "games", icon: "🎮", labelKey: "navGames" },
  { id: "settings", icon: "⚙", labelKey: "navSettings" },
];

export default function BottomNav() {
  const { t } = useLang();
  const { screen, goToTab } = useJourneyStore();
  const activeTab = typeof screen === "object" && screen.type === "main" ? screen.tab : null;

  return (
    <nav
      style={{
        position: "absolute",
        bottom: 0,
        insetInline: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 6px calc(8px + env(safe-area-inset-bottom))",
        background: "rgba(13,15,20,0.92)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid var(--ink-700)",
        zIndex: 10,
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => goToTab(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "6px 14px",
              minWidth: 64,
              color: active ? "var(--gold-300)" : "var(--mist-400)",
            }}
          >
            <span style={{ fontSize: 20, opacity: active ? 1 : 0.7 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, letterSpacing: "0.02em" }}>{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
