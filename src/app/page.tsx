"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Languages,
  Download,
  ShieldCheck,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { PreviewMock } from "@/components/landing/PreviewMock";
import { ResumeTypes } from "@/components/landing/ResumeTypes";
import { LangToggle } from "@/components/LangToggle";
import { useLang, LANDING_COPY } from "@/lib/i18n";

const ICON_CLASS = "h-4 w-4";

const FEATURE_ICONS = [
  <FileText key="0" className={ICON_CLASS} />,
  <Languages key="1" className={ICON_CLASS} />,
  <Sparkles key="2" className={ICON_CLASS} />,
  <Download key="3" className={ICON_CLASS} />,
  <ShieldCheck key="4" className={ICON_CLASS} />,
  <FileCheck2 key="5" className={ICON_CLASS} />,
];

export default function LandingPage() {
  const [lang, setLang] = useLang();
  const c = LANDING_COPY[lang];

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-40 glass border-b">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="font-jp text-lg">履</span>
            <span>Rirekisho</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <LangToggle lang={lang} onChange={setLang} />
            <Link
              href="/editor"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {c.nav.editor}
            </Link>
            <Button asChild size="sm">
              <Link href="/editor">
                {c.nav.getStarted} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Hero copy={c.hero} />

      {/* Feature grid */}
      <section className="container py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {c.features.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{c.features.sub}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.items.map((item, i) => (
            <FeatureCard
              key={i}
              icon={FEATURE_ICONS[i]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Resume formats catalogue (SEO long-tail content) */}
      <ResumeTypes copy={c.resumeTypes} />

      {/* Preview mock */}
      <section className="container pb-24">
        <PreviewMock lang={lang} copy={c.preview} />
      </section>

      {/* CTA strip */}
      <section className="container pb-28">
        <div className="rounded-2xl border bg-gradient-to-br from-zinc-50 to-white p-10 sm:p-14 text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{c.cta.heading}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{c.cta.sub}</p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/editor">
                {c.cta.button} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Rirekisho Builder</span>
          <span>
            <a
              href="https://www.digistartjp.com/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-primary"
            >
              Designed by DIGI スタート！
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
