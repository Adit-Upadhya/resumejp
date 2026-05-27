/**
 * Catalog of resume layouts. Each entry knows its own paper size so the
 * preview page, the in-browser preview, and the Puppeteer PDF route all
 * agree on what to render and at what dimensions.
 *
 * Inspired by the templates offered on https://rirekisho.yagish.jp/.
 *
 * This module is intentionally NOT client-only — the API route imports it
 * to read paper dimensions. The React hook lives in `./templates-hook.ts`.
 */
export type TemplateKey = "jis-a3" | "jis-a4" | "mhlw-a4" | "modern-a4";

export interface TemplateMeta {
  key: TemplateKey;
  /** Short label shown in the picker. */
  name: string;
  /** Japanese name shown under the label. */
  jp: string;
  /** Marketing blurb in the picker card. */
  description: string;
  paper: "A3" | "A4";
  orientation: "portrait" | "landscape";
  /** Width × height in CSS millimetres — used by the preview scaler. */
  widthMm: number;
  heightMm: number;
}

export const TEMPLATES: Record<TemplateKey, TemplateMeta> = {
  "jis-a3": {
    key: "jis-a3",
    name: "JIS Standard",
    jp: "JIS規格 履歴書",
    description:
      "Traditional 観音開き layout printed on A3 landscape — what most Japanese companies expect.",
    paper: "A3",
    orientation: "landscape",
    widthMm: 420,
    heightMm: 297,
  },
  "jis-a4": {
    key: "jis-a4",
    name: "JIS A4 Portrait",
    jp: "JIS規格 A4縦",
    description: "Same JIS fields condensed onto a single A4 portrait page.",
    paper: "A4",
    orientation: "portrait",
    widthMm: 210,
    heightMm: 297,
  },
  "mhlw-a4": {
    key: "mhlw-a4",
    name: "MHLW (厚生労働省)",
    jp: "厚生労働省様式",
    description:
      "2021 government-recommended layout — no gender, spouse, or commute fields. Modern and inclusive.",
    paper: "A4",
    orientation: "portrait",
    widthMm: 210,
    heightMm: 297,
  },
  "modern-a4": {
    key: "modern-a4",
    name: "Modern Clean",
    jp: "モダン履歴書",
    description: "Minimal single-column A4 design for tech/startup applications.",
    paper: "A4",
    orientation: "portrait",
    widthMm: 210,
    heightMm: 297,
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);

const STORAGE_KEY = "rirekisho-template-v1";

export function loadTemplate(): TemplateKey {
  if (typeof window === "undefined") return "jis-a3";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v && v in TEMPLATES) return v as TemplateKey;
  return "jis-a3";
}

export function saveTemplate(key: TemplateKey): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, key);
}
