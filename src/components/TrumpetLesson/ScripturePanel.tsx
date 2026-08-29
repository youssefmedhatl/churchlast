import { motion } from "framer-motion";
import type { TrumpetData } from "../../data/trumpets/types";
import { useLang } from "../../i18n/LanguageContext";

interface ScripturePanelProps {
  trumpet: TrumpetData;
}

export default function ScripturePanel({ trumpet }: ScripturePanelProps) {
  const { t, lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "var(--parchment-100)",
        color: "var(--parchment-ink)",
        borderRadius: 18,
        padding: "22px 22px 18px",
        boxShadow: "0 20px 50px -18px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {t("scripture")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            opacity: 0.75,
          }}
        >
          {trumpet.scriptureRef[lang]}
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-scripture)",
          fontSize: lang === "ar" ? 19 : 19,
          lineHeight: 1.65,
          fontStyle: lang === "ar" ? "normal" : "italic",
          margin: 0,
        }}
      >
        {trumpet.scriptureText[lang]}
      </p>

      {trumpet.scriptureIsTemporary && (
        <p
          style={{
            marginTop: 14,
            fontSize: 11,
            color: "var(--rust-500)",
            fontFamily: "var(--font-body)",
            fontStyle: "normal",
          }}
        >
          ⚠ {t("temporaryContent")}
        </p>
      )}
    </motion.div>
  );
}
