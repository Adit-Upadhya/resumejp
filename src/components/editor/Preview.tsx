"use client";

import { useEffect, useRef, useState } from "react";
import { RirekishoSheet } from "@/components/rirekisho/RirekishoSheet";
import type { Resume } from "@/lib/schema";

interface Props {
  data: Resume;
  fitWidth?: boolean;
}

// A3 landscape at 96dpi: 420mm × 297mm = 1587 × 1123 px.
const SHEET_WIDTH_PX = 1587;
const SHEET_HEIGHT_PX = 1123;

export function Preview({ data, fitWidth }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (!fitWidth) return;
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth - 16;
      setScale(Math.min(1, w / SHEET_WIDTH_PX));
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [fitWidth]);

  return (
    <div ref={containerRef} className="space-y-4">
      <div
        style={{
          width: SHEET_WIDTH_PX * scale,
          height: SHEET_HEIGHT_PX * scale + 8,
          position: "relative",
        }}
      >
        <div
          style={{
            width: SHEET_WIDTH_PX,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <RirekishoSheet data={data} />
        </div>
      </div>
    </div>
  );
}
