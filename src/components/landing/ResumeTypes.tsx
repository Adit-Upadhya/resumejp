"use client";

import { motion } from "framer-motion";
import type { LandingCopy } from "@/lib/i18n";

/**
 * Keyword-rich catalogue of the Japanese resume formats the builder supports.
 * Uses real heading semantics (h2 → h3) and descriptive copy so search engines
 * can index the long-tail queries (履歴書, 職務経歴書, part-time, English CV, …).
 */
export function ResumeTypes({ copy }: { copy: LandingCopy["resumeTypes"] }) {
  return (
    <section id="formats" className="container py-12 sm:py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">{copy.heading}</h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">{copy.sub}</p>
      </div>

      <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 lg:grid-cols-2">
        {copy.categories.map((cat, i) => (
          <motion.article
            key={cat.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: (i % 2) * 0.05 }}
            className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm"
          >
            <header className="mb-3 sm:mb-4 flex items-baseline justify-between gap-3 border-b pb-3">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">{cat.title}</h3>
              <span className="font-jp text-xs text-muted-foreground whitespace-nowrap">
                {cat.jp}
              </span>
            </header>
            <p className="mb-4 text-sm text-muted-foreground">{cat.blurb}</p>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item.name} className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-zinc-900">{item.name}</span>
                    <span className="font-jp text-xs text-muted-foreground">{item.jp}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
