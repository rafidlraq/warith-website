import type { MetadataRoute } from "next";
import { locales, pageSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://warith.online";
  const pages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    pages.push({ url: `${base}/${locale}`, changeFrequency: "monthly", priority: 1 });
    for (const slug of pageSlugs) {
      pages.push({ url: `${base}/${locale}/${slug}`, changeFrequency: "yearly", priority: slug === "delete-account" ? 0.9 : 0.7 });
    }
  }
  return pages;
}
