import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { POSTS } from "@/lib/blog";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: "Blog — Japanese Resume & Part-Time Job Guides",
  description:
    "Practical, foreigner-aware guides to writing a Japanese resume and landing a part-time (arubaito) job: the 28-hour student work rule, rirekisho photo rules, 志望動機 and 本人希望記入欄 tips, and a phone script for applying.",
  keywords: [
    "Japanese resume blog",
    "arubaito guide",
    "rirekisho tips",
    "履歴書 書き方 ブログ",
    "part time job Japan guide",
    "foreigner working in Japan",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Japanese Resume & Part-Time Job Guides",
    description:
      "Practical guides for foreigners writing a rirekisho and applying for arubaito in Japan.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
        ],
      },
      {
        "@type": "Blog",
        "@id": `${PAGE_URL}#blog`,
        name: "ResumeJP Blog",
        url: PAGE_URL,
        description:
          "Guides to Japanese resumes (履歴書) and part-time (arubaito) job applications for foreigners in Japan.",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
        blogPost: POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          dateModified: p.date,
          author: { "@type": "Organization", name: "ResumeJP" },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function BlogIndex() {
  return (
    <MarketingShell>
      <JsonLd />
      <div>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          ResumeJP Blog
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            Practical guides for Japanese resumes & part-time jobs
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Honest, foreigner-aware advice for writing a rirekisho (履歴書) and getting hired for
          part-time work (アルバイト) in Japan — the exact questions people search for right before
          they apply. Every guide links into the free{" "}
          <Link href="/editor" className="underline hover:text-primary">
            resume editor
          </Link>
          .
        </p>

        <div className="mt-8 space-y-4">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border bg-white p-5 sm:p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium">{p.category}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="mt-2 text-base sm:text-lg font-semibold tracking-tight group-hover:text-primary">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
