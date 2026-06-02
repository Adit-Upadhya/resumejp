"use client";

import type { LandingCopy } from "@/lib/i18n";

/**
 * Visible FAQ rendered as native <details> so the answers are in the initial
 * HTML (crawlable + accessible) and eligible for FAQ rich results. The same
 * Q&A backs the FAQPage JSON-LD in the root layout.
 */
export function FaqSection({ copy }: { copy: LandingCopy["faq"] }) {
  return (
    <section id="faq" className="container py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{copy.heading}</h2>
          <p className="mt-3 text-muted-foreground">{copy.sub}</p>
        </div>

        <div className="divide-y rounded-2xl border bg-white">
          {copy.items.map((item) => (
            <details key={item.q} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium tracking-tight marker:hidden">
                <span>{item.q}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
