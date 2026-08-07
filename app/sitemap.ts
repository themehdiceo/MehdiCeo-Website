import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/config/i18n/routing";
import { sitemapRoutes, videoRoute, articleRoute } from "@/config/routes";
import { videos } from "@/content/videos";
import { cornerstoneArticleSlugs } from "@/content/articles/registry";
import { isSiteIndexingEnabled } from "@/lib/seo/indexing";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexingEnabled()) {
    return [];
  }
  const lastModified = new Date();

  const staticEntries = routing.locales.flatMap((locale) =>
    sitemapRoutes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route === "/" ? "" : route}`,
      lastModified,
      changeFrequency:
        route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.8,
      alternates: { languages: buildLanguages(route) },
    })),
  );

  const videoEntries = routing.locales.flatMap((locale) =>
    videos.map((video) => {
      const route = videoRoute(video.slug);
      return {
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: buildLanguages(route) },
      };
    }),
  );

  const articleEntries = routing.locales.flatMap((locale) =>
    cornerstoneArticleSlugs.map((slug) => {
      const route = articleRoute(slug);
      return {
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        alternates: { languages: buildLanguages(route) },
      };
    }),
  );

  return [...staticEntries, ...articleEntries, ...videoEntries];
}

function buildLanguages(route: string) {
  const path = route === "/" ? "" : route;
  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}`,
  };

  for (const locale of routing.locales) {
    languages[locale] = `${siteConfig.url}/${locale}${path}`;
  }

  return languages;
}
