"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingCopy } from "@/lib/i18n";

export function Hero({ copy }: { copy: LandingCopy["hero"] }) {
  return (
    <section className="relative pt-20 pb-12 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="container relative px-4">
        {/* Rendered visible on first paint — no JS-gated opacity:0 entrance */}
        <div className="mx-auto max-w-3xl text-center motion-safe:animate-fade-in">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>{copy.badge}</span>
          </div>

          <h1 className="mt-5 text-[2.2rem] leading-tight sm:text-6xl font-semibold tracking-tight sm:leading-[1.05]">
            {copy.titleLine1}
            <br />
            <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
              {copy.titleLine2}
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>

          {/* Stack buttons vertically on mobile so neither gets clipped */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-2 sm:px-0">
            <Button asChild size="lg" className="h-12 text-base touch-manipulation">
              <Link href="/editor">
                {copy.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 text-base touch-manipulation">
              <a href="#preview">{copy.ctaSecondary}</a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{copy.fineprint}</p>
        </div>
      </div>
    </section>
  );
}
