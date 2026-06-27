import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About ResumeJP — Who Builds This Free Rirekisho Tool",
  description:
    "ResumeJP is a free Japanese resume (履歴書 rirekisho) builder by the DIGI スタート! studio, made to help foreigners in Japan write a correct, employer-ready resume in any language. Our mission, what we make, and how it stays free.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "About ResumeJP",
    description:
      "A free Japanese resume builder by DIGI スタート!, made to help foreigners in Japan apply for work with confidence.",
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
          { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
        ],
      },
      {
        "@type": "AboutPage",
        url: PAGE_URL,
        name: "About ResumeJP",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function AboutPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          About ResumeJP
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            A free, honest Japanese-resume tool for people new to Japan
          </span>
        </h1>

        <p className={P}>
          ResumeJP is a free online builder for the Japanese resume — the 履歴書 (rirekisho) and the
          職務経歴書 (shokumukeirekisho). It is a project by{" "}
          <a
            href="https://www.digistartjp.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            DIGI スタート!
          </a>
          , a small studio that builds practical tools and guides for foreigners navigating work and
          daily life in Japan. We made ResumeJP because the single document that stands between a
          newcomer and their first job in Japan is also the one almost no resume tool gets right for
          non-native applicants.
        </p>

        <h2 className={H2}>Why we built it</h2>
        <p className={P}>
          The Japanese rirekisho is not a Western CV. It is a fixed-format sheet with its own rules:
          a 30×40 mm photo, era dates, a precise way to write 学歴・職歴, the dreaded free-form
          自己PR and 志望動機, and conventions that everyone in Japan absorbs in school but that no
          one explains to someone who arrived last month. We watched students, working-holiday
          makers, and 特定技能 workers — many of them from Nepal, Vietnam, China, and Indonesia —
          handwrite the same form over and over, freeze on the Japanese fields, and lose interviews
          over avoidable mistakes. ResumeJP exists to remove that barrier.
        </p>

        <h2 className={H2}>What ResumeJP does</h2>
        <p className={P}>
          You fill the form in whatever language you are comfortable with — English, Japanese,
          Nepali and more — and one click rewrites every field into the natural business Japanese
          (keigo) that employers expect. You can choose the JIS or MHLW standard layout, or a
          template tuned for{" "}
          <Link href="/arubaito-resume" className="underline hover:text-primary">
            part-time (arubaito)
          </Link>
          , new-graduate, mid-career, dispatch, or English-CV applications, then download a
          print-ready PDF at the exact A4 or A3 size. There is no account, no email wall, and no
          watermark, and your resume data stays in your own browser. Alongside the tool we publish{" "}
          <Link href="/blog" className="underline hover:text-primary">
            practical guides
          </Link>{" "}
          on the questions people actually ask before they apply.
        </p>

        <h2 className={H2}>Our approach to accuracy</h2>
        <p className={P}>
          Everything we write is drawn from the real conventions of Japanese hiring and the official
          rirekisho formats, including the government (厚生労働省) standard introduced in 2021. We
          write for the foreign applicant specifically — what to put for residence status, how to
          show a 資格外活動許可, when handwriting still matters — rather than rewording the same
          generic advice found everywhere else. When a topic touches immigration or law, we point you
          to official sources rather than pretend to give legal advice; see our{" "}
          <Link href="/disclaimer" className="underline hover:text-primary">
            disclaimer
          </Link>
          .
        </p>

        <h2 className={H2}>How it stays free</h2>
        <p className={P}>
          ResumeJP is free to use and we intend to keep it that way. The site is supported by
          unobtrusive advertising on our guide and content pages — never inside the editor while you
          work. That lets us cover hosting and keep building features without charging the people who
          need the tool most. You can read how we handle data and ads in our{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            privacy policy
          </Link>
          .
        </p>

        <h2 className={H2}>Get in touch</h2>
        <p className={P}>
          We read every message and use it to fix mistakes and decide what to build next. Found an
          error, want a feature, or have a question about your resume?{" "}
          <Link href="/contact" className="underline hover:text-primary">
            Contact us here
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
