import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";

/** Absolute URL for the locale-specific generated Open Graph / Twitter image. */
export function getOgImageUrl(locale: Locale): string {
  return `${siteConfig.url}/${locale}/opengraph-image`;
}

export function getDefaultOgImages(locale: Locale) {
  const url = getOgImageUrl(locale);
  return [{ url, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.brandHandle}` }];
}
