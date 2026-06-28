/**
 * Visual template catalog for the /templates gallery. Many market situations
 * map onto the editor's real underlying layouts (jis-a3, jis-a4, mhlw-a4,
 * modern-a4) — exactly how competitors frame one base form for many use cases.
 * Each entry deep-links into the editor via /editor?template=<editorKey>.
 *
 * Order matters: the gallery renders entries in array order, so part-time sits
 * up top (roadmap priority) and the featured entry leads.
 */
import type { TemplateKey } from "./templates";

export type TemplateCategory =
  | "Part-time & student"
  | "Standard 履歴書"
  | "Career & professional"
  | "Modern & English";

export interface CatalogTemplate {
  slug: string;
  name: string;
  jp: string;
  category: TemplateCategory;
  editorKey: TemplateKey;
  paper: "A3" | "A4";
  orientation: "portrait" | "landscape";
  bestFor: string;
  blurb: string;
  badge?: "Featured" | "Recommended" | "Popular";
  /** Hue (0–360) for the preview thumbnail accent. */
  hue: number;
}

export const CATALOG: CatalogTemplate[] = [
  {
    slug: "arubaito",
    name: "Part-Time / Arubaito",
    jp: "アルバイト履歴書",
    category: "Part-time & student",
    editorKey: "jis-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Convenience stores, cafes, restaurants, retail, delivery",
    blurb:
      "A compact single-page rirekisho built around shift availability, residence status, and a short 志望動機 — the four things baito employers check first.",
    badge: "Featured",
    hue: 14,
  },
  {
    slug: "part-time-paato",
    name: "Part-Time (パート)",
    jp: "パート履歴書",
    category: "Part-time & student",
    editorKey: "mhlw-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Daytime part-time work for parents and homemakers",
    blurb:
      "A clean A4 layout that highlights weekday daytime availability and prior experience without a long career history.",
    hue: 24,
  },
  {
    slug: "new-graduate",
    name: "New Graduate (新卒)",
    jp: "新卒 履歴書",
    category: "Part-time & student",
    editorKey: "jis-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "University students doing 就活",
    blurb:
      "Swaps the empty work-history grid for research themes, seminars, and club activities — made for first-time job hunters.",
    hue: 34,
  },
  {
    slug: "internship",
    name: "Internship (インターン)",
    jp: "インターン 履歴書",
    category: "Part-time & student",
    editorKey: "jis-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Internship and short-term placement applications",
    blurb:
      "Focuses on motivation, skills, and availability for students applying to internships rather than full roles.",
    hue: 44,
  },
  {
    slug: "jis-a3",
    name: "JIS Standard (A3)",
    jp: "JIS規格 履歴書",
    category: "Standard 履歴書",
    editorKey: "jis-a3",
    paper: "A3",
    orientation: "landscape",
    bestFor: "Most Japanese companies — the traditional expectation",
    blurb:
      "The classic 観音開き fold-open layout printed on A3, with the full set of standard fields most employers expect.",
    badge: "Recommended",
    hue: 212,
  },
  {
    slug: "jis-a4",
    name: "JIS A4 Portrait",
    jp: "JIS規格 A4縦",
    category: "Standard 履歴書",
    editorKey: "jis-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "When you need a single-page standard rirekisho",
    blurb: "The same JIS fields condensed onto one A4 portrait page — easy to email and print.",
    hue: 210,
  },
  {
    slug: "mhlw",
    name: "MHLW (厚生労働省)",
    jp: "厚生労働省様式",
    category: "Standard 履歴書",
    editorKey: "mhlw-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Modern, inclusive applications",
    blurb:
      "The 2021 government-recommended layout with no gender, spouse, or commute fields — increasingly the default.",
    badge: "Popular",
    hue: 162,
  },
  {
    slug: "mid-career",
    name: "Mid-Career / Job Change (転職)",
    jp: "転職 履歴書",
    category: "Career & professional",
    editorKey: "mhlw-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Experienced professionals changing companies",
    blurb:
      "Expands the skill and resignation-reason columns for career changers — pair it with a 職務経歴書.",
    hue: 256,
  },
  {
    slug: "dispatch",
    name: "Dispatch Registration (派遣)",
    jp: "派遣登録 履歴書",
    category: "Career & professional",
    editorKey: "mhlw-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Registering with temporary-staffing agencies",
    blurb:
      "An itemised layout for software, certifications, and skills that staffing agencies screen on.",
    hue: 276,
  },
  {
    slug: "career",
    name: "Career / Specialist (キャリア)",
    jp: "キャリア 履歴書",
    category: "Career & professional",
    editorKey: "mhlw-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Specialists and senior applicants",
    blurb:
      "Leads with qualifications and a strong self-PR for experienced, specialist, or management roles.",
    hue: 292,
  },
  {
    slug: "modern",
    name: "Modern / Tech",
    jp: "モダン履歴書",
    category: "Modern & English",
    editorKey: "modern-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Startups, IT, and 書式自由 companies",
    blurb:
      "A minimal single-column A4 design for companies that explicitly accept a free format (書式自由).",
    hue: 188,
  },
  {
    slug: "english-cv",
    name: "English CV / Western",
    jp: "英文履歴書",
    category: "Modern & English",
    editorKey: "modern-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "Global firms and multinationals in Japan",
    blurb:
      "A one-page, metrics-driven English résumé with no photo, age, or gender — for global tech hubs.",
    hue: 200,
  },
  {
    slug: "simple",
    name: "Simple / Minimal",
    jp: "シンプル履歴書",
    category: "Modern & English",
    editorKey: "modern-a4",
    paper: "A4",
    orientation: "portrait",
    bestFor: "A clean, no-frills resume",
    blurb: "A pared-back layout that keeps only the essential fields, clearly laid out.",
    hue: 152,
  },
];

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "Part-time & student",
  "Standard 履歴書",
  "Career & professional",
  "Modern & English",
];

export function getCatalogTemplate(slug: string): CatalogTemplate | undefined {
  return CATALOG.find((t) => t.slug === slug);
}
