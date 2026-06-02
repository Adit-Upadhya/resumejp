"use client";

import type { Lang } from "@/lib/i18n";

/** EN / 日本語 segmented language toggle, shared by the landing nav and editor header. */
export function LangToggle({
  lang,
  onChange,
  className,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center rounded-full border bg-white/70 p-0.5 text-xs ${className ?? ""}`}
    >
      <button
        onClick={() => onChange("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
          lang === "en" ? "bg-zinc-900 text-white" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange("jp")}
        aria-pressed={lang === "jp"}
        className={`rounded-full px-2.5 py-1 font-medium font-jp transition-colors ${
          lang === "jp" ? "bg-zinc-900 text-white" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        日本語
      </button>
    </div>
  );
}
