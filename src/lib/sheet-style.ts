"use client";

import { useEffect, useState } from "react";

/**
 * User-adjustable typography for the rendered 履歴書 sheet.
 *
 * The chosen font + weight are exposed to the sheet CSS through two custom
 * properties — `--sheet-font` and `--sheet-weight` — set inline on the sheet
 * root. Because the on-screen sheet is exactly what html2canvas captures for
 * the PDF, whatever the user picks here flows straight into the download.
 *
 * Settings are persisted in localStorage (like the template choice) so they
 * survive reloads and are also picked up by the standalone print page.
 */

export type FontKey =
  | "noto-sans"
  | "noto-serif"
  | "biz-gothic"
  | "zen-gothic"
  | "shippori";

export interface FontOption {
  key: FontKey;
  /** English label for the picker. */
  name: string;
  /** Japanese label / style family. */
  jp: string;
  /** CSS font-family stack — references the next/font CSS variables. */
  stack: string;
}

/**
 * The five most widely-used Japanese typefaces for documents/resumes:
 * two go-to gothic faces, the government-style UD gothic, a modern gothic,
 * and a classic mincho (serif) for a more formal look.
 */
export const FONT_OPTIONS: FontOption[] = [
  {
    key: "noto-sans",
    name: "Noto Sans JP",
    jp: "ゴシック体",
    stack: `var(--font-noto-jp), "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif`,
  },
  {
    key: "biz-gothic",
    name: "BIZ UDP Gothic",
    jp: "UDゴシック体",
    stack: `var(--font-biz-gothic), "BIZ UDPGothic", "Meiryo", "Yu Gothic", sans-serif`,
  },
  {
    key: "zen-gothic",
    name: "Zen Kaku Gothic",
    jp: "モダンゴシック",
    stack: `var(--font-zen-gothic), "Zen Kaku Gothic New", "Hiragino Sans", sans-serif`,
  },
  {
    key: "noto-serif",
    name: "Noto Serif JP",
    jp: "明朝体",
    stack: `var(--font-noto-serif-jp), "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif`,
  },
  {
    key: "shippori",
    name: "Shippori Mincho",
    jp: "しっぽり明朝",
    stack: `var(--font-shippori), "Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif`,
  },
];

export const FONT_MAP: Record<FontKey, FontOption> = Object.fromEntries(
  FONT_OPTIONS.map((f) => [f.key, f]),
) as Record<FontKey, FontOption>;

export type WeightKey = "light" | "normal" | "bold";

export interface WeightOption {
  key: WeightKey;
  name: string;
  /** CSS font-weight applied to the sheet's text cells. */
  weight: number;
}

/** Three boldness levels the user can toggle between. */
export const WEIGHT_OPTIONS: WeightOption[] = [
  { key: "light", name: "Light", weight: 400 },
  { key: "normal", name: "Medium", weight: 500 },
  { key: "bold", name: "Bold", weight: 700 },
];

export const WEIGHT_MAP: Record<WeightKey, WeightOption> = Object.fromEntries(
  WEIGHT_OPTIONS.map((w) => [w.key, w]),
) as Record<WeightKey, WeightOption>;

export interface SheetStyle {
  font: FontKey;
  weight: WeightKey;
}

export const DEFAULT_SHEET_STYLE: SheetStyle = { font: "noto-sans", weight: "normal" };

const STORAGE_KEY = "rirekisho-style-v1";

export function loadSheetStyle(): SheetStyle {
  if (typeof window === "undefined") return DEFAULT_SHEET_STYLE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SHEET_STYLE;
    const parsed = JSON.parse(raw) as Partial<SheetStyle>;
    return {
      font: parsed.font && parsed.font in FONT_MAP ? parsed.font : DEFAULT_SHEET_STYLE.font,
      weight:
        parsed.weight && parsed.weight in WEIGHT_MAP
          ? parsed.weight
          : DEFAULT_SHEET_STYLE.weight,
    };
  } catch {
    return DEFAULT_SHEET_STYLE;
  }
}

export function saveSheetStyle(style: SheetStyle): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(style));
  } catch {
    // ignore quota / disabled storage
  }
}

/**
 * Turns a {@link SheetStyle} into the inline CSS custom properties the sheet
 * components spread onto their root element.
 */
export function sheetStyleVars(style: SheetStyle): React.CSSProperties {
  return {
    ["--sheet-font" as string]: FONT_MAP[style.font].stack,
    ["--sheet-weight" as string]: String(WEIGHT_MAP[style.weight].weight),
  };
}

export function useSheetStyle(): [SheetStyle, (s: SheetStyle) => void, boolean] {
  const [style, setStyle] = useState<SheetStyle>(DEFAULT_SHEET_STYLE);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setStyle(loadSheetStyle());
    setHydrated(true);
  }, []);
  function update(s: SheetStyle) {
    setStyle(s);
    saveSheetStyle(s);
  }
  return [style, update, hydrated];
}
