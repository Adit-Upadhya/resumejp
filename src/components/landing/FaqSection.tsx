"use client";

import type { LandingCopy } from "@/lib/i18n";

/**
 * Visible FAQ rendered as native <details> so the answers are in the initial
 * HTML (crawlable + accessible) and eligible for FAQ rich results. The same
 * Q&A backs the FAQPage JSON-LD in the root layout.
 */
export function FaqSection({ copy }: { copy: LandingCopy["faq"] }) {
  return (
    <section id="faq" className="container py-12 sm:py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-7 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">{copy.heading}</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">{copy.sub}</p>
        </div>

        <div className="divide-y rounded-2xl border bg-white">
          {copy.items.map((item) => (
            <details key={item.q} className="group px-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm sm:text-base font-medium tracking-tight marker:hidden">
                <span>{item.q}</span>
                <span className="shrink-0 text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 sm:pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
