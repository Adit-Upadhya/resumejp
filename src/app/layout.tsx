import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_JP,
  Noto_Serif_JP,
  BIZ_UDPGothic,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
// Additional Japanese typefaces the user can switch between in the preview.
const bizGothic = BIZ_UDPGothic({
  subsets: ["latin"],
  variable: "--font-biz-gothic",
  display: "swap",
  weight: ["400", "700"],
});
const zenGothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  variable: "--font-zen-gothic",
  display: "swap",
  weight: ["400", "500", "700"],
});
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://www.resumejp.com";
const SITE_NAME = "ResumeJP";

const KEYWORDS = [
  "Japanese resume",
  "Japanese resume builder",
  "rirekisho",
  "履歴書",
  "履歴書 作成",
  "Japanese resume template",
  "Japanese CV",
  "shokumukeirekisho",
  "職務経歴書",
  "resume for jobs in Japan",
  "JIS rirekisho",
  "MHLW rirekisho",
  "厚生労働省 履歴書",
  "part time job resume Japan",
  "arubaito resume",
  "派遣 履歴書",
  "English resume Japan",
  "新卒 履歴書",
  "転職 履歴書",
  "rirekisho PDF",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Japanese Resume Builder — Free 履歴書 (Rirekisho) & 職務経歴書 Templates",
    template: "%s · ResumeJP",
  },
  description:
    "Create an authentic Japanese resume (履歴書 rirekisho) and work-history sheet (職務経歴書) online for free. JIS, MHLW, mid-career, new-grad, part-time, dispatch, and English CV templates — fill in any language and download a print-ready PDF for jobs in Japan.",
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: { en: "/", ja: "/" },
  },
  category: "productivity",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Japanese Resume Builder — Free 履歴書 (Rirekisho) Templates & PDF",
    description:
      "Build a JIS-style Japanese resume (履歴書) and 職務経歴書 for full-time, part-time, new-grad, or career-change roles in Japan. Type in any language, export a print-ready PDF — free, no signup.",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Resume Builder — Free 履歴書 (Rirekisho) Templates",
    description:
      "Authentic Japanese resume (履歴書) & 職務経歴書 templates. Fill in any language, download a print-ready PDF. Free, no signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Free online builder for authentic Japanese resumes (履歴書 rirekisho) and work-history sheets (職務経歴書).",
        inLanguage: ["en", "ja"],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Japanese Resume Builder",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
        inLanguage: ["en", "ja"],
        description:
          "Create JIS, MHLW, mid-career, new-graduate, part-time, dispatch, and English Japanese resume templates and export a print-ready PDF.",
        featureList: [
          "JIS standard 履歴書 template",
          "MHLW (厚生労働省) template",
          "職務経歴書 work-history formats",
          "Part-time / arubaito and dispatch layouts",
          "English résumé / Western CV",
          "Type in any language with automatic Japanese conversion",
          "Print-ready PDF download",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a rirekisho (履歴書)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A rirekisho is the standard Japanese resume. It follows a fixed grid format (commonly the JIS or MHLW layout) with personal details, a photo, an academic and work-history timeline, licenses, and a self-promotion section. ResumeJP generates print-ready rirekisho PDFs for free.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a 履歴書 and a 職務経歴書?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The 履歴書 (rirekisho) is a fixed-format personal profile, while the 職務経歴書 (shokumukeirekisho) is a free-form work-history document that details your roles, skills, and achievements. Mid-career applicants in Japan usually submit both.",
            },
          },
          {
            "@type": "Question",
            name: "Which Japanese resume template should I use for a part-time (arubaito) job?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For part-time or arubaito roles, use a compact single-page layout that emphasises weekly shift availability rather than deep academic and career history. ResumeJP includes part-time and dispatch-registration formats alongside full-time templates.",
            },
          },
          {
            "@type": "Question",
            name: "Can I make a Japanese resume in English?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can type your details in English, Nepali, or Japanese, and ResumeJP converts each section into natural business Japanese. There is also an English résumé (Western CV) format for international and global tech roles in Japan.",
            },
          },
          {
            "@type": "Question",
            name: "Is ResumeJP free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, ResumeJP is completely free with no signup. Your data stays in your browser and you can download a print-ready PDF instantly.",
            },
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoJp.variable} ${notoSerifJp.variable} ${bizGothic.variable} ${zenGothic.variable} ${shipporiMincho.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
