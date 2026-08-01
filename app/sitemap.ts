import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/config/i18n/routing";

const routes = ["", "/about"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [
            item,
            `${siteConfig.url}/${item}${route}`,
          ]),
        ),
      },
    })),
  );
}
