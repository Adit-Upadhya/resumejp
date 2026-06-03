import { LandingContent } from "@/components/landing/LandingContent";

/**
 * Server Component shell — keeps page.tsx free of "use client" so Next.js
 * does not inject RSC flight metadata (_N_T_/layout, Vary header values) as
 * visible text nodes in the HTML body. All interactive/language content lives
 * in LandingContent (a dedicated Client Component).
 */
export default function LandingPage() {
  return <LandingContent />;
}
