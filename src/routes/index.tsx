import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import GameApp from "../GameApp";
import { LanguageProvider } from "../i18n/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Seven Trumpets — A Journey Through Revelation" },
      {
        name: "description",
        content:
          "A cinematic journey through the seven trumpets of Revelation, guided by the Holy Father, the Girl and the Angel.",
      },
      { property: "og:title", content: "The Seven Trumpets — A Journey Through Revelation" },
      {
        property: "og:description",
        content:
          "Seven visions, seven doors. Watch the biblical cinematics, hear the dialogue, read the Scripture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div style={{ minHeight: "100dvh", background: "#08090c" }} />}>
      <LanguageProvider>
        <div id="seven-trumpets-root">
          <GameApp />
        </div>
      </LanguageProvider>
    </ClientOnly>
  );
}
