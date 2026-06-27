import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/disclaimer`;
const UPDATED = "June 21, 2026";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for ResumeJP — our guides and templates are general information, not legal, immigration, or employment advice. How we handle accuracy, external links, and advertising.",
  alternates: { canonical: "/disclaimer" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Disclaimer", item: PAGE_URL },
        ],
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function DisclaimerPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Disclaimer
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {UPDATED}</p>

        <h2 className={H2}>General information only</h2>
        <p className={P}>
          The information ResumeJP provides — including all guides, templates, examples, and the
          resume builder itself — is for general informational purposes only. It reflects common
          conventions of Japanese hiring and the standard rirekisho formats, but every employer,
          industry, and personal situation is different. Nothing on this site is a guarantee of a
          particular result, and using ResumeJP does not guarantee an interview or a job.
        </p>

        <h2 className={H2}>Not legal or immigration advice</h2>
        <p className={P}>
          ResumeJP is not a law firm, immigration agency, or licensed advisor. Content about
          residence status (在留資格), work permission (資格外活動許可), the 28-hour student work
          rule, visas, taxes, or labour matters is provided to help you understand and present your
          situation — it is not legal, immigration, or employment advice. For decisions that affect
          your visa or legal status, always confirm with an official source such as the Immigration
          Services Agency of Japan, the Ministry of Health, Labour and Welfare (厚生労働省), or a
          qualified professional.
        </p>

        <h2 className={H2}>Accuracy</h2>
        <p className={P}>
          We work to keep our information correct and up to date, but rules and conventions change
          and errors can occur. We make no warranty as to the completeness or accuracy of any content
          and accept no liability for actions taken based on it. If you spot something wrong, please{" "}
          <Link href="/contact" className="underline hover:text-primary">
            tell us
          </Link>{" "}
          so we can correct it.
        </p>

        <h2 className={H2}>External links</h2>
        <p className={P}>
          Our pages may link to third-party websites (for example, convenience-store printing
          services or official government sites) for your convenience. We do not control and are not
          responsible for the content, accuracy, or practices of those external sites.
        </p>

        <h2 className={H2}>Advertising</h2>
        <p className={P}>
          ResumeJP displays third-party advertising, including Google AdSense, to keep the tool free.
          Advertisements and any sites they link to are not endorsements, and we are not responsible
          for their content. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:text-primary">
            terms of service
          </Link>{" "}
          for more.
        </p>
      </article>
    </MarketingShell>
  );
}
