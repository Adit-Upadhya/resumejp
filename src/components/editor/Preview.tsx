"use client";

import { useEffect, useRef, useState } from "react";
import { Sheet } from "@/components/rirekisho/Sheet";
import type { Resume } from "@/lib/schema";
import { TEMPLATES, type TemplateKey } from "@/lib/templates";

interface Props {
  data: Resume;
  template: TemplateKey;
}

const PX_PER_MM = 96 / 25.4;

/**
 * Renders the sheet at its natural mm-derived pixel size and scales it
 * down to fit the parent's width. The wrapper occupies the scaled box so
 * the layout doesn't reserve the full 1587px the un-scaled sheet would.
 */
export function Preview({ data, template }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const meta = TEMPLATES[template];
  const sheetW = meta.widthMm * PX_PER_MM;
  const sheetH = meta.heightMm * PX_PER_MM;
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(Math.min(1, w / sheetW));
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [sheetW]);

  return (
    <div ref={wrapperRef} className="w-full">
      <div
        className="mx-auto shadow-2xl bg-white"
        style={{ width: sheetW * scale, height: sheetH * scale }}
      >
        <div
          data-sheet-capture
          style={{
            width: sheetW,
            height: sheetH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Sheet template={template} data={data} />
        </div>
      </div>
    </div>
  );
}
