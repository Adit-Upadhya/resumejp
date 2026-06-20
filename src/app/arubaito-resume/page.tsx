import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Button } from "@/components/ui/button";
import { SHIDO_CATEGORIES } from "@/lib/shibodoki";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/arubaito-resume`;

export const metadata: Metadata = {
  title: "Part-Time (Arubaito) Resume Maker — Free 履歴書 for バイト",
  description:
    "Make a Japanese part-time (アルバイト) resume free. Residence-status fields, a weekly shift-availability grid, a Japanese-level field, and ready-to-use 志望動機 examples by job type — fill in any language and download a print-ready PDF.",
  keywords: [
    "arubaito resume template",
    "part time job resume Japan",
    "バイト 履歴書 書き方",
    "コンビニ バイト 履歴書",
    "アルバイト 履歴書 志望動機 例文",
    "外国人 アルバイト 履歴書",
    "履歴書 見本 バイト",
    "part time rirekisho",
  ],
  alternates: { canonical: "/arubaito-resume" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Part-Time (Arubaito) Resume Maker — Free 履歴書 for バイト",
    description:
      "Free part-time rirekisho with shift grid, residence-status fields, and 志望動機 examples. Fill in any language, download a print-ready PDF.",
  },
};

const PAGE_FAQ: { q: string; a: string }[] = [
  {
    q: "Is the part-time (arubaito) resume really free?",
    a: "Yes — completely free with no account, no email, and no watermark. Fill it in online in any language and download a print-ready PDF instantly.",
  },
  {
    q: "What should a foreigner include on a part-time rirekisho?",
    a: "The four things arubaito employers look at first are your residence status and work permission (e.g. 留学 with 資格外活動許可, within 28 hours/week), your weekly shift availability, your Japanese level (JLPT or conversational), and a short 志望動機. ResumeJP's part-time template puts all four near the top.",
  },
  {
    q: "Do I need a 志望動機 for a part-time job?",
    a: "Yes, a short one — usually two or three sentences. It is the field most applicants get stuck on. This page has ready-to-edit examples by job type (convenience store, restaurant, cafe, factory, retail and more) that you can adapt in a minute.",
  },
  {
    q: "How many hours can I work on a student visa?",
    a: "With a 資格外活動許可, student-visa holders may work up to 28 hours per week (up to 40 hours per week during the school's official long vacations). State this clearly on your resume so employers know you are allowed to work.",
  },
  {
    q: "Can I print the resume at a convenience store?",
    a: "Yes. Download the PDF, upload it to 7-Eleven netprint or ネットワークプリント (FamilyMart/Lawson), get a reservation number, and print at the in-store machine for about ¥20 per A4 page.",
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
          { "@type": "ListItem", position: 2, name: "Part-Time (Arubaito) Resume", item: PAGE_URL },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "ResumeJP — Part-Time (Arubaito) Resume Maker",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Residence status (在留資格) fields",
          "Weekly shift-availability grid",
          "Japanese-level (JLPT) field",
          "志望動機 examples by job type",
          "Print-ready PDF download",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: PAGE_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function ArubaitoResumePage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Part-Time (Arubaito) Resume Maker
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            バイト・アルバイトの履歴書 — fill online, download a print-ready PDF
          </span>
        </h1>

        <p className={P}>
          A part-time rirekisho (履歴書) is not a shorter version of a full-time one — employers look
          at completely different things. For an arubaito, a store manager checks four things first:
          your <strong>work permission</strong>, your <strong>shift availability</strong>, your{" "}
          <strong>Japanese level</strong>, and a short <strong>志望動機</strong>. ResumeJP&apos;s
          part-time template is built around exactly those. Fill it in English, Japanese, Nepali, or
          another language and download a print-ready PDF — free, no account.
        </p>

        <div className="mt-6">
          <Button asChild size="lg" className="h-12 w-full sm:w-auto touch-manipulation">
            <Link href="/editor">
              Start a part-time resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <h2 className={H2}>What arubaito employers look at first</h2>
        <ol className="mt-3 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed list-decimal pl-5">
          <li>
            <strong>Residence status &amp; work permission.</strong> Foreign applicants must show
            they are allowed to work. If you are a student (留学) or dependent (家族滞在) with a
            資格外活動許可, state it with the 28-hour note — see{" "}
            <Link href="/blog/28-hour-rule-students-work-limit" className="underline hover:text-primary">
              the 28-hour rule explained
            </Link>
            .
          </li>
          <li>
            <strong>Weekly shift availability.</strong> Which days and times can you work? A clear
            shift grid matters more than your education for hourly work.
          </li>
          <li>
            <strong>Japanese level.</strong> JLPT level if you have it, or conversational ability
            (日常会話レベル) — saying so is far better than leaving it blank.
          </li>
          <li>
            <strong>志望動機.</strong> Two or three honest sentences on why this store. Use an
            example below to get unstuck.
          </li>
        </ol>

        <h2 className={H2}>志望動機 examples by job type</h2>
        <p className={P}>
          The motivation statement is where most part-time applicants freeze. Below are ready-to-edit
          examples in natural business Japanese (with English so you know what you are writing), for
          the most common arubaito. Pick the closest one, then change the store name, your
          availability, and one specific reason for choosing this place.
        </p>

        <div className="mt-5 space-y-5">
          {SHIDO_CATEGORIES.map((cat) => (
            <section key={cat.id} className="rounded-2xl border bg-white p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                {cat.label} <span className="text-muted-foreground font-normal">· {cat.jp}</span>
              </h3>
              <div className="mt-3 space-y-4">
                {cat.samples.map((s, i) => (
                  <div key={i} className="rounded-xl bg-zinc-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {s.angle === "near" ? "Near home / school" : "Want to improve Japanese"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground font-jp">{s.jp}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.en}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <h2 className={H2}>Writing the rest of the sheet</h2>
        <p className={P}>
          Beyond these four, fill in your name with ふりがな, address, education, and any licences
          the same way as a standard resume. Part-time work usually omits a long job history — keep
          it brief. For the request field, the safe line is 「貴社の規定に従います。」 unless you have
          a real schedule limit; see{" "}
          <Link href="/blog/honnin-kibo-kinyuran-part-time" className="underline hover:text-primary">
            how to fill in the 本人希望記入欄
          </Link>
          . For everything else, the{" "}
          <Link href="/guide/how-to-write-a-japanese-resume" className="underline hover:text-primary">
            full rirekisho guide
          </Link>{" "}
          walks through each section in order.
        </p>

        <h2 className={H2}>Photo and printing</h2>
        <p className={P}>
          A smartphone photo is fine if you follow the{" "}
          <Link href="/blog/rirekisho-photo-rules" className="underline hover:text-primary">
            rirekisho photo rules
          </Link>{" "}
          (30×40 mm, plain light background, business attire). No printer? Export the PDF and print
          it at a convenience store for about ¥20. When you are ready to hand it over, our{" "}
          <Link href="/blog/phone-script-after-applying-baito" className="underline hover:text-primary">
            phone script for calling the store
          </Link>{" "}
          covers the next step.
        </p>

        <h2 className={H2}>Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {PAGE_FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="text-sm sm:text-base font-semibold">{f.q}</h3>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
