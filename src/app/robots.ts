import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/en/assessment/result",
        "/de/assessment/result",
        "/en/ai-check/result",
        "/de/ai-check/result",
        "/en/gdpr-check/result",
        "/de/gdpr-check/result",
        "/en/nis2-check/result",
        "/de/nis2-check/result",
        "/en/rules-finder/result",
        "/de/rules-finder/result",
      ],
    },
    sitemap: "https://cyberchecklist.app/sitemap.xml",
  };
}
