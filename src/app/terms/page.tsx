import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/terms`;
const UPDATED = "June 21, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of service for ResumeJP, the free Japanese resume builder — acceptable use, intellectual property, advertising, disclaimers, and limitation of liability.",
  alternates: { canonical: "/terms" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Terms of Service", item: PAGE_URL },
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

export default function TermsPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {UPDATED}</p>

        <p className={P}>
          These terms govern your use of ResumeJP (the &ldquo;Service&rdquo;), the free Japanese
          resume builder at resumejp.com, operated by the DIGI スタート! studio. By using the
          Service you agree to these terms. If you do not agree, please do not use the Service.
        </p>

        <h2 className={H2}>1. Use of the Service</h2>
        <p className={P}>
          ResumeJP is provided free of charge to help you create Japanese resumes (履歴書 and
          職務経歴書) and related documents. You may use it for your own personal job-application
          purposes. You agree not to misuse the Service — for example, by attempting to disrupt it,
          access it through automated scraping, reverse-engineer it, or use it for any unlawful
          purpose.
        </p>

        <h2 className={H2}>2. Your content</h2>
        <p className={P}>
          You retain all rights to the information you enter (your name, history, photo, and other
          resume data). Because the Service runs in your browser and stores your data locally on your
          device, you are responsible for keeping your own backups. We do not claim ownership of your
          resume content. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-primary">
            privacy policy
          </Link>{" "}
          for how data is handled.
        </p>

        <h2 className={H2}>3. Intellectual property</h2>
        <p className={P}>
          The Service itself — including its software, design, text, templates, and brand — is owned
          by DIGI スタート! and protected by applicable law. The output you generate (your completed
          resume PDF) is yours to use freely. You may not copy, resell, or redistribute the Service
          or its templates as your own product.
        </p>

        <h2 className={H2}>4. Advertising</h2>
        <p className={P}>
          The Service is supported by third-party advertising, including Google AdSense, shown on
          certain pages. Ads are subject to the advertising provider&apos;s policies. We do not
          control the specific ads served and are not responsible for the content of third-party
          advertisements or the sites they link to.
        </p>

        <h2 className={H2}>5. No professional advice</h2>
        <p className={P}>
          ResumeJP provides general information and tools, not legal, immigration, or employment
          advice. The conventions and examples we provide may not fit every employer or situation.
          You are responsible for the accuracy of your own resume. Please read our{" "}
          <Link href="/disclaimer" className="underline hover:text-primary">
            disclaimer
          </Link>
          .
        </p>

        <h2 className={H2}>6. Availability &amp; changes</h2>
        <p className={P}>
          We provide the Service on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis and
          may change, suspend, or discontinue any part of it at any time without notice. We may also
          update these terms; the &ldquo;last updated&rdquo; date above reflects the current version,
          and continued use after a change means you accept the new terms.
        </p>

        <h2 className={H2}>7. Limitation of liability</h2>
        <p className={P}>
          To the maximum extent permitted by law, DIGI スタート! and ResumeJP are not liable for any
          indirect, incidental, or consequential damages arising from your use of the Service,
          including any loss of data or any outcome of a job application. Your sole remedy if you are
          dissatisfied is to stop using the Service.
        </p>

        <h2 className={H2}>8. Governing law</h2>
        <p className={P}>
          These terms are governed by the laws of Japan, without regard to conflict-of-law
          principles.
        </p>

        <h2 className={H2}>9. Contact</h2>
        <p className={P}>
          Questions about these terms? Reach us via our{" "}
          <Link href="/contact" className="underline hover:text-primary">
            contact page
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
