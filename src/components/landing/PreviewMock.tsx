"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "@/components/rirekisho/sheet.css";
import { Sheet } from "@/components/rirekisho/Sheet";
import { sampleResume } from "@/lib/sample";
import { TEMPLATE_LIST, type TemplateKey } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import type { Lang, LandingCopy } from "@/lib/i18n";

const PX_PER_MM = 96 / 25.4;
const MAX_PREVIEW_W = 980;

/**
 * Tabbed gallery of templates: pick a template via the tab row, the
 * preview swaps below. One stage at a time, no overlap. Each card
 * deep-links into the editor with that template pre-selected.
 */
export function PreviewMock({
  lang,
  copy,
}: {
  lang: Lang;
  copy: LandingCopy["preview"];
}) {
  const [active, setActive] = useState<TemplateKey>("jis-a3");
  const sample = sampleResume();
  const meta = TEMPLATE_LIST.find((t) => t.key === active)!;
  // In Japanese mode show the template's Japanese name as the primary label.
  const activeName = lang === "jp" ? meta.jp : meta.name;
  const activeDescription = copy.templateDescriptions[active];
  const sheetW = meta.widthMm * PX_PER_MM;
  const sheetH = meta.heightMm * PX_PER_MM;

  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(MAX_PREVIEW_W);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(Math.min(MAX_PREVIEW_W, el.clientWidth));
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scale = stageW / sheetW;
  const stageH = sheetH * scale;

  return (
    <div
      id="preview"
      className="rounded-3xl border bg-gradient-to-b from-zinc-50 to-white p-6 sm:p-10 shadow-sm"
    >
      <div className="mx-auto max-w-3xl text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{copy.heading}</h2>
        <p className="mt-2 text-muted-foreground">{copy.sub}</p>
      </div>

      {/* Tab row */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {TEMPLATE_LIST.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                isActive
                  ? "bg-zinc-900 text-white shadow-md"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              <span className="font-medium">{lang === "jp" ? t.jp : t.name}</span>
              <span
                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isActive ? "bg-white/20" : "bg-zinc-100"
                }`}
              >
                {t.paper}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage — one preview, swaps on tab change */}
      <div ref={stageRef} className="mx-auto w-full" style={{ maxWidth: MAX_PREVIEW_W }}>
        <div className="rounded-xl border shadow-2xl overflow-hidden bg-white mx-auto">
          <div className="flex items-center gap-1.5 border-b px-3 py-2 bg-zinc-50">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-muted-foreground">
              rirekisho.pdf · {meta.name} ({meta.paper} {meta.orientation})
            </span>
          </div>
          <div
            className="bg-zinc-100 overflow-hidden mx-auto"
            style={{ width: stageW, height: stageH }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: sheetW,
                  height: sheetH,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <Sheet template={active} data={sample} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-zinc-900">{activeName}</span>
            {lang === "en" && <span className="font-jp ml-1 text-xs">({meta.jp})</span>} —{" "}
            {activeDescription}
          </p>
        </div>
        <div className="mt-4 text-center">
          <Button asChild size="lg">
            <Link href="/editor">
              {copy.use(activeName)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
