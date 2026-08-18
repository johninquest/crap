import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://cyberchecklist.app";
const LOCALES = ["en", "de"] as const;
const TOOL_PATHS = [
  "/risk-check",
  "/gdpr-check",
  "/nis2-check",
  "/ai-check",
  "/insurance-readiness-check",
  "/rules-finder",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const posts = getAllPosts();

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
        priority: path === "/blog" ? 0.8 : 0.8,
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified || post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
