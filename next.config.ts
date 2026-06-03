import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * The app is a React/Next.js client with no third-party scripts. The only
 * cross-origin call from the browser is the Japanese postal-code lookup
 * (zipcloud); translation goes through our own /api/translate. Photos are
 * rendered from in-browser `data:`/`blob:` URLs, and fonts are self-hosted by
 * next/font, so the policy can stay tight.
 *
 * `'unsafe-inline'` is required for Next's hydration bootstrap and the inline
 * styles emitted by next/font and framer-motion. `'unsafe-eval'` and the
 * websocket origin are only added in development for React Fast Refresh.
 */
// Google AdSense requires a broad set of Google/ad-network origins.
const adSenseDomains = [
  "https://pagead2.googlesyndication.com",
  "https://googleads.g.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://adservice.google.com",
  "https://www.googletagservices.com",
  "https://fundingchoicesmessages.google.com",
];

const csp = [
  "default-src 'self'",
  // AdSense loads scripts from multiple Google CDNs.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${adSenseDomains.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  // AdSense renders ads inside iframes served from these origins.
  `frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com`,
  // Ad images come from googleusercontent and other Google CDNs.
  `img-src 'self' data: blob: https://*.googlesyndication.com https://*.google.com https://*.googleusercontent.com https://*.gstatic.com`,
  "font-src 'self' data:",
  `connect-src 'self' https://zipcloud.ibsnet.co.jp ${adSenseDomains.join(" ")}${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
]
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Language", value: "en, ja" },
  // HSTS only over real HTTPS — emitting it on http://localhost is pointless
  // and can wrongly pin local dev to https.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  // Don't advertise the framework/version.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
