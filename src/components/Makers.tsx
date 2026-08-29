import { useLang } from "../i18n/LanguageContext";
import { useJourneyStore } from "../store/journeyStore";

interface Maker {
  name: string;
  roleKey: "makersRoleFounder" | "makersRoleDeveloper" | "makersRoleGold";
  photo?: string;
  aboutKey?: "makersGoldAbout";
  showExperience?: boolean;
  programmerBadge?: boolean;
  crowned?: boolean;
}

const makers: Maker[] = [
  { name: "Youssef Medhat", roleKey: "makersRoleFounder", programmerBadge: true },
  {
    name: "Youssef Magdy",
    roleKey: "makersRoleGold",
    photo: "/team/youssef-magdy.png",
    aboutKey: "makersGoldAbout",
    showExperience: true,
    crowned: true,
  },
  { name: "Rojeeh Ramy", roleKey: "makersRoleDeveloper" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function Makers() {
  const { t } = useLang();
  const { goTo } = useJourneyStore();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 0%, #14161d, #08090c 65%)",
        overflow: "auto",
        padding: "24px 20px 60px",
      }}
    >
      <button
        onClick={() => goTo({ type: "main", tab: "settings" })}
        style={{
          color: "var(--mist-400)",
          fontSize: 13,
          padding: "6px 0",
          marginBottom: 14,
        }}
      >
        {t("close")}
      </button>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          letterSpacing: "0.05em",
          color: "var(--gold-300)",
          margin: "0 0 6px",
        }}
      >
        {t("makersTitle")}
      </h1>
      <p style={{ fontSize: 13, color: "var(--mist-400)", margin: "0 0 24px" }}>
        {t("makersSubtitle")}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {makers.map((m) => (
          <div
            key={m.name}
            style={{
              position: "relative",
              overflow: "hidden",
              background: m.programmerBadge
                ? "linear-gradient(160deg, #0d1117 0%, var(--ink-800) 55%)"
                : "var(--ink-800)",
              border: "1px solid var(--ink-600)",
              borderRadius: 14,
              padding: 18,
            }}
          >
            {m.programmerBadge && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: "monospace",
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: "var(--gold-300)",
                  opacity: 0.06,
                  whiteSpace: "pre",
                  padding: "8px 10px",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
{`const build = () => {
  return faith.map(v => code(v));
};
git commit -m "seven trumpets"
while (true) { pray(); ship(); }`}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {m.photo ? (
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={m.photo}
                    alt={m.name}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--gold-500)",
                    }}
                  />
                  {m.crowned && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -16,
                        left: "50%",
                        transform: "translateX(-50%) rotate(-8deg)",
                        fontSize: 26,
                        lineHeight: 1,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
                      }}
                    >
                      👑
                    </span>
                  )}
                </div>
              ) : m.programmerBadge ? (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #0d1117, #161b22)",
                    border: "2px solid var(--gold-500)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--gold-300)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {"</>"}
                </div>
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--ink-700)",
                    border: "2px solid var(--ink-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    color: "var(--parchment-200)",
                    flexShrink: 0,
                  }}
                >
                  {initials(m.name)}
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    color: "var(--parchment-100)",
                    margin: 0,
                  }}
                >
                  {m.name}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--gold-300)",
                    margin: "3px 0 0",
                  }}
                >
                  {t(m.roleKey)}
                </p>
              </div>
            </div>

            {(m.aboutKey || m.showExperience) && (
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid var(--ink-600)",
                }}
              >
                {m.aboutKey && (
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--mist-400)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t(m.aboutKey)}
                  </p>
                )}
                {m.showExperience && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 10,
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 11,
                      letterSpacing: "0.03em",
                      color: "var(--gold-300)",
                      background: "rgba(201,161,90,0.12)",
                      border: "1px solid var(--gold-600)",
                    }}
                  >
                    {t("makersExperience")}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
