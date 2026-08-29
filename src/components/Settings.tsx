import type { ReactNode } from "react";
import { useLang } from "../i18n/LanguageContext";
import { useJourneyStore } from "../store/journeyStore";

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const { openPresentationMode, resetProgress, goTo } = useJourneyStore();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at 50% 0%, #14161d, #08090c 65%)",
        overflow: "auto",
        padding: "24px 20px 110px",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          letterSpacing: "0.05em",
          color: "var(--gold-300)",
          margin: "10px 0 24px",
        }}
      >
        {t("settingsTitle")}
      </h1>

      <Section title={t("settingsLanguage")}>
        <div style={{ display: "flex", gap: 10 }}>
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: 12,
                border: `1px solid ${lang === l ? "var(--gold-300)" : "var(--ink-600)"}`,
                background: lang === l ? "rgba(201,161,90,0.12)" : "var(--ink-800)",
                color: lang === l ? "var(--gold-300)" : "var(--parchment-100)",
                fontFamily: l === "ar" ? "var(--font-body-ar)" : "var(--font-body)",
              }}
            >
              {l === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("settingsPresenter")}>
        <button
          onClick={openPresentationMode}
          style={{
            width: "100%",
            textAlign: "start",
            padding: "14px 16px",
            borderRadius: 12,
            background: "var(--ink-800)",
            border: "1px solid var(--ink-600)",
            color: "var(--parchment-100)",
          }}
        >
          {t("settingsPresentationMode")}
        </button>
      </Section>

      <Section title="">
        <button
          onClick={() => {
            if (window.confirm(t("settingsReset") + "?")) resetProgress();
          }}
          style={{
            width: "100%",
            textAlign: "start",
            padding: "14px 16px",
            borderRadius: 12,
            background: "transparent",
            border: "1px solid var(--rust-500)",
            color: "var(--rust-500)",
          }}
        >
          {t("settingsReset")}
        </button>
      </Section>

      <Section title={t("settingsAbout")}>
        <p style={{ fontSize: 13, color: "var(--mist-400)", lineHeight: 1.6, margin: "0 0 12px" }}>
          {t("settingsAboutBody")}
        </p>
        <button
          onClick={() => goTo("makers")}
          style={{
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--mist-600)",
            padding: "4px 0",
          }}
        >
          {t("makersButton")}
        </button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {title && (
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--mist-600)",
            marginBottom: 10,
          }}
        >
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
