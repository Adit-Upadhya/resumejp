"use client";

import { motion } from "framer-motion";
import "@/components/rirekisho/sheet.css";
import { RirekishoSheet } from "@/components/rirekisho/RirekishoSheet";
import { sampleResume } from "@/lib/sample";

const SHEET_W = 1587; // A3 landscape at 96dpi
const SHEET_H = 1123;

export function PreviewMock() {
  // Target preview width — scale the real-size sheet down to fit.
  const targetW = 900;
  const scale = targetW / SHEET_W;
  const previewH = SHEET_H * scale;

  return (
    <div
      id="preview"
      className="rounded-3xl border bg-gradient-to-b from-zinc-50 to-white p-4 sm:p-8 shadow-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-xl border shadow-xl bg-white mx-auto"
        style={{ maxWidth: targetW + 24 }}
      >
        <div className="flex items-center gap-1.5 border-b px-3 py-2 bg-zinc-50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground">rirekisho.pdf</span>
        </div>
        <div
          className="bg-zinc-100 flex justify-center items-start overflow-hidden"
          style={{ height: previewH, padding: 0 }}
        >
          <div style={{ width: targetW, height: previewH, position: "relative" }}>
            <div
              style={{
                width: SHEET_W,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <RirekishoSheet data={sampleResume()} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
