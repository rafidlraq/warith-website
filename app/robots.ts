import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://warith.online/sitemap.xml",
    host: "https://warith.online",
  };
}
