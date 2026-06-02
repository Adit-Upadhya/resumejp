import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · ResumeJP",
  description:
    "Privacy Policy for ResumeJP, including local browser storage, resume preview handling, and Google AdSense ads.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container py-20 sm:py-28 max-w-3xl">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Privacy Policy</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">ResumeJP Privacy Policy</h1>
          <p className="text-muted-foreground">
            This page explains how ResumeJP handles resume data, browser storage, preview tokens,
            and advertising.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Information you enter</h2>
          <p className="text-muted-foreground leading-7">
            ResumeJP is designed so you can draft a Japanese resume directly in your browser. The
            editor saves your resume data locally in your browser so you can continue working
            without creating an account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Preview and PDF generation</h2>
          <p className="text-muted-foreground leading-7">
            When you generate a preview or export a PDF, the app may temporarily send your resume
            content to the server so it can render the requested output. Preview tokens are
            short-lived and expire automatically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Google AdSense</h2>
          <p className="text-muted-foreground leading-7">
            ResumeJP uses Google AdSense to display ads. Google and its partners may use cookies,
            device identifiers, and similar technologies to serve and measure ads. You can learn
            more in Google&apos;s privacy policy.
          </p>
          <p className="text-muted-foreground leading-7">
            We also publish an ads.txt file to identify authorized ad sellers for this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">What we do not do</h2>
          <ul className="space-y-2 text-muted-foreground leading-7 list-disc pl-6">
            <li>We do not require an account to use the editor.</li>
            <li>We do not sell your personal information.</li>
            <li>We do not intentionally collect more data than needed to run the service.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Questions</h2>
          <p className="text-muted-foreground leading-7">
            If you have questions about this policy, use the site navigation to return to the home
            page and reach the project from there.
          </p>
        </section>

        <div className="pt-4">
          <Link href="/" className="text-sm underline underline-offset-4 hover:text-primary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
