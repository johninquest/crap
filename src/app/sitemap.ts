import type { MetadataRoute } from "next";

const BASE = "https://cyberchecklist.app";
const LOCALES = ["en", "de"] as const;
const TOOL_PATHS = [
  "/risk-check",
  "/gdpr-check",
  "/nis2-check",
  "/ai-check",
  "/insurance-readiness-check",
  "/rules-finder",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === "en" ? 1 : 0.9,
    });

    for (const path of TOOL_PATHS) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
