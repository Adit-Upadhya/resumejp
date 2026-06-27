import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/contact`;
const EMAIL = "digistartnp@gmail.com";

export const metadata: Metadata = {
  title: "Contact ResumeJP",
  description:
    "Get in touch with the ResumeJP team. Email us about resume questions, errors, feature requests, or partnership and advertising enquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Contact ResumeJP",
    description: "Email the ResumeJP team about the Japanese resume builder.",
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
          { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
        ],
      },
      {
        "@type": "ContactPage",
        url: PAGE_URL,
        name: "Contact ResumeJP",
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

export default function ContactPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Contact ResumeJP
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            We read and reply to every message
          </span>
        </h1>

        <p className={P}>
          ResumeJP is made by the{" "}
          <a
            href="https://www.digistartjp.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            DIGI スタート!
          </a>{" "}
          studio. The fastest way to reach a real person is email — we usually reply within a few
          business days.
        </p>

        <div className="mt-6 rounded-2xl border bg-white p-5 sm:p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Email</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-1 block text-lg sm:text-xl font-semibold underline hover:text-primary"
          >
            {EMAIL}
          </a>
        </div>

        <h2 className={H2}>What to write to us about</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            <strong>Resume questions</strong> — stuck on a field, unsure which template to use, or
            not sure how to phrase something in Japanese.
          </li>
          <li>
            <strong>Mistakes &amp; corrections</strong> — if anything in a guide or template looks
            wrong, tell us and we will fix it.
          </li>
          <li>
            <strong>Feature requests</strong> — a layout, language, or field you wish we supported.
          </li>
          <li>
            <strong>Advertising &amp; partnerships</strong> — collaboration, sponsorship, or media
            enquiries.
          </li>
        </ul>

        <h2 className={H2}>Before you email</h2>
        <p className={P}>
          Many common questions are already answered in our{" "}
          <Link href="/blog" className="underline hover:text-primary">
            guides
          </Link>{" "}
          and on the{" "}
          <Link href="/templates" className="underline hover:text-primary">
            templates
          </Link>{" "}
          page — for example, how the{" "}
          <Link
            href="/blog/28-hour-rule-students-work-limit"
            className="underline hover:text-primary"
          >
            28-hour student work rule
          </Link>{" "}
          works or how to take a{" "}
          <Link href="/blog/rirekisho-photo-rules" className="underline hover:text-primary">
            rirekisho photo with your phone
          </Link>
          . If you have checked those and still need help, write to us any time.
        </p>

        <h2 className={H2}>Privacy</h2>
        <p className={P}>
          We only use your email to reply to you. We do not add you to a mailing list or share your
          message. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            privacy policy
          </Link>{" "}
          for details.
        </p>
      </article>
    </MarketingShell>
  );
}
