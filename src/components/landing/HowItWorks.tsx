"use client";

import { motion } from "framer-motion";
import type { LandingCopy } from "@/lib/i18n";

/** Numbered "how it works" steps — crawlable, snippet-friendly content. */
export function HowItWorks({ copy }: { copy: LandingCopy["howItWorks"] }) {
  return (
    <section id="how-it-works" className="container py-12 sm:py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">{copy.heading}</h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">{copy.sub}</p>
      </div>

      <ol className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
            className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md bg-zinc-900 text-sm font-semibold text-white">
              {i + 1}
            </div>
            <h3 className="mt-3 sm:mt-4 font-medium tracking-tight">{step.title}</h3>
            <p className="mt-1 sm:mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
