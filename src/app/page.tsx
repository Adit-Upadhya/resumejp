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

const ICON_CLASS = "h-4 w-4";

export default function LandingPage() {
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
            <Link href="/editor" className="hidden sm:block text-muted-foreground hover:text-foreground px-2">
              Editor
            </Link>
            <Button asChild size="sm">
              <Link href="/editor">
                Get started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Hero />

      {/* Feature grid */}
      <section className="container py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Everything you need to apply in Japan
          </h2>
          <p className="mt-3 text-muted-foreground">
            A traditional 履歴書, generated from a modern editor — no Japanese typewriter required.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className={ICON_CLASS} />}
            title="Authentic JIS-style format"
            description="Pixel-faithful recreation of the standard rirekisho template. Two A4 pages, the exact table grid that Japanese HR expects."
          />
          <FeatureCard
            icon={<Languages className={ICON_CLASS} />}
            title="Type in any language"
            description="Write in English, Nepali, or Japanese. Each section is rewritten into natural business Japanese before it lands on the page."
          />
          <FeatureCard
            icon={<Sparkles className={ICON_CLASS} />}
            title="Live preview"
            description="See the resume update as you type. Adjust margins, swap a photo, change history rows — the sheet reflows in real time."
          />
          <FeatureCard
            icon={<Download className={ICON_CLASS} />}
            title="Three export formats"
            description="High-resolution PDF, XeLaTeX .tex source, or JSON backup you can re-import later. Take your data with you."
          />
          <FeatureCard
            icon={<ShieldCheck className={ICON_CLASS} />}
            title="No account, no tracking"
            description="Everything lives in your browser. Nothing is stored on a server — leave the page and it's gone."
          />
          <FeatureCard
            icon={<FileCheck2 className={ICON_CLASS} />}
            title="Ready for Japan job market"
            description="Fields, ふりがな lines, photo box, 配偶者 / 扶養家族 / 本人希望記入欄 — all positioned where employers expect them."
          />
        </div>
      </section>

      {/* Preview mock */}
      <section className="container pb-24">
        <PreviewMock />
      </section>

      {/* CTA strip */}
      <section className="container pb-28">
        <div className="rounded-2xl border bg-gradient-to-br from-zinc-50 to-white p-10 sm:p-14 text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Build your rirekisho in minutes
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Free, no signup, no email. Open the editor, fill in what you have, download the PDF.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/editor">
                Open the editor <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Rirekisho Builder</span>
          <span>
            Designed by DIGI スタート！ Visit{' '}
            <a href="https://www.digistartjp.com/" target="_blank" rel="noreferrer" className="underline hover:text-primary">
              digistartjp.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
