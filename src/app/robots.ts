import type { MetadataRoute } from "next";

const SITE_URL = "https://www.resumejp.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /preview is a headless render surface; /api are internal endpoints.
      disallow: ["/preview", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
