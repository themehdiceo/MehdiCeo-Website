import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { isSiteIndexingEnabled } from "@/lib/seo/indexing";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteIndexingEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
