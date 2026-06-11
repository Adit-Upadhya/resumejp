import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";

export const metadata: Metadata = {
  title: "Free Japanese Resume Templates — 履歴書テンプレート Download",
  description:
    "Download free Japanese resume templates: JIS standard 履歴書, MHLW (厚生労働省) format, new-grad, mid-career, part-time/arubaito, and English CV. Fill online and export a print-ready A4 or A3 PDF.",
  keywords: [
    "Japanese resume template",
    "rirekisho template",
    "履歴書 テンプレート",
    "履歴書 ダウンロード",
    "free Japanese resume download",
    "JIS rirekisho template",
    "MHLW resume format",
    "厚生労働省 履歴書 様式",
    "rirekisho PDF download",
    "Japanese CV template",
  ],
  alternates: { canonical: "/templates" },
};

interface TemplateEntry {
  name: string;
  jp: string;
  paper: string;
  bestFor: string;
  body: string;
}

const TEMPLATES: TemplateEntry[] = [
  {
    name: "JIS Standard Rirekisho",
    jp: "JIS規格 履歴書（A3見開き）",
    paper: "A3 landscape (two A4 pages side by side)",
    bestFor: "Conventional companies, government, finance, manufacturing",
    body:
      "The classic Japanese resume layout that hiring managers have seen for decades. It devotes most of the sheet to your chronological education (学歴) and work history (職歴) tables, with the standard 30×40 mm photo box, ふりがな reading lines, commute time, dependents, and the 本人希望記入欄 request field — every cell positioned exactly where Japanese HR expects it.",
  },
  {
    name: "JIS A4 Compact",
    jp: "JIS規格 A4縦",
    paper: "A4 portrait, single page",
    bestFor: "Email applications, part-time roles, quick submissions",
    body:
      "The same JIS fields condensed onto one A4 portrait page. Choose this when an employer asks for an A4 rirekisho or when you are submitting by email and want a lighter document that still follows the standard structure.",
  },
  {
    name: "MHLW Government Format",
    jp: "厚生労働省様式 履歴書",
    paper: "A4 portrait",
    bestFor: "Most full-time applications in 2024+ — the modern default",
    body:
      "In 2021 Japan's Ministry of Health, Labour and Welfare published a recommended resume format that removes the gender requirement, spouse, and commute fields. It balances personal data with a larger self-PR area, and many companies now treat it as the standard. If you are unsure which Japanese resume template to use, start here.",
  },
  {
    name: "Modern / Tech Resume",
    jp: "モダン A4（IT・スタートアップ向け）",
    paper: "A4 portrait",
    bestFor: "Startups, IT, design, and casual-culture companies",
    body:
      "A minimal single-column layout that keeps the essential rirekisho information but drops the rigid grid. Suited to companies that explicitly say 書式自由 (free format) — common in the startup and web industry.",
  },
];

const ROLE_LAYOUTS = [
  {
    name: "New Graduate (新卒)",
    body: "Replaces the empty work-history grid with prompts for research themes, seminars, and club activities — built for university students doing 就活.",
  },
  {
    name: "Mid-Career / Job Change (転職)",
    body: "Adds resignation-reason and expanded skill-selling columns for experienced professionals switching companies.",
  },
  {
    name: "Part-Time & Arubaito (パート・アルバイト)",
    body: "A compact single page centred on a weekly shift-availability grid instead of a deep career history.",
  },
  {
    name: "Dispatch Registration (派遣登録)",
    body: "An itemised checklist of software, certifications, and typing speed for temporary-staffing agencies.",
  },
  {
    name: "English CV / Western Resume (英文履歴書)",
    body: "A one-page, metrics-driven English document with no photo, age, or gender — for global tech hubs and multinationals in Japan.",
  },
];

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Japanese Resume Templates", item: `${SITE_URL}/templates` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Free Japanese Resume Templates",
        itemListElement: TEMPLATES.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${t.name} (${t.jp})`,
          url: `${SITE_URL}/editor`,
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function TemplatesPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Free Japanese Resume Templates
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            履歴書テンプレート — fill online, download as PDF
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Every Japanese resume template below is free. Open one in the editor, fill it in English,
          Japanese, or Nepali, and download a print-ready PDF in the exact A4 or A3 size Japanese
          employers expect — no account, no watermark. You can also download a blank 履歴書
          template to print and fill in by hand, and switch between formats at any time without
          retyping your information.
        </p>

        <h2 className="mt-10 text-xl sm:text-2xl font-semibold tracking-tight">
          The four core 履歴書 formats
        </h2>

        <div className="mt-5 space-y-4">
          {TEMPLATES.map((t) => (
            <section key={t.name} className="rounded-2xl border bg-white p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                {t.name} <span className="text-muted-foreground font-normal">· {t.jp}</span>
              </h3>
              <dl className="mt-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <dt className="font-medium shrink-0">Paper:</dt>
                  <dd>{t.paper}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium shrink-0">Best for:</dt>
                  <dd>{t.bestFor}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              <div className="mt-4">
                <Button asChild size="sm">
                  <Link href="/editor">
                    Use this template <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </section>
          ))}
        </div>

        <h2 className="mt-12 text-xl sm:text-2xl font-semibold tracking-tight">
          Layouts for every kind of application
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Beyond the core formats, the editor adapts the resume to the job you are applying for:
        </p>
        <ul className="mt-4 space-y-3">
          {ROLE_LAYOUTS.map((r) => (
            <li key={r.name} className="rounded-xl border bg-white p-4 text-sm">
              <span className="font-medium">{r.name}</span>
              <span className="text-muted-foreground"> — {r.body}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl sm:text-2xl font-semibold tracking-tight">
          Which Japanese resume template should I download?
        </h2>
        <div className="mt-3 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">For most full-time jobs</strong>, use the MHLW
            (厚生労働省) format — it is the government-recommended modern standard. Choose the JIS
            layout when applying to traditional companies that expect the classic form.
          </p>
          <p>
            <strong className="text-foreground">Students</strong> should use the new-grad layout,
            <strong className="text-foreground"> career changers</strong> the 転職 layout, and
            <strong className="text-foreground"> part-time applicants</strong> the compact
            arubaito sheet. Applying to a multinational? Use the English CV — and read our guide on{" "}
            <Link href="/guide/rirekisho-vs-shokumukeirekisho" className="underline hover:text-primary">
              when you also need a 職務経歴書
            </Link>
            .
          </p>
          <p>
            Not sure how to fill in each field? Follow the step-by-step{" "}
            <Link
              href="/guide/how-to-write-a-japanese-resume"
              className="underline hover:text-primary"
            >
              guide to writing a Japanese resume
            </Link>
            , covering the photo rules, date formats, 学歴・職歴 phrasing, and the self-PR section.
          </p>
        </div>
      </article>
    </MarketingShell>
  );
}
