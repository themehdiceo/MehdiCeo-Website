import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/config/i18n/routing";
import { getDefaultOgImages } from "@/lib/seo/og-image";
import { siteIcons, siteManifest } from "@/lib/seo/icons";
import { getDefaultRobots } from "@/lib/seo/indexing";
import { getMehdiImage, type MehdiImageId } from "@/content/images/mehdi";
import type { Locale } from "@/types";

type ArticleMetadataInput = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  heroImageId?: MehdiImageId;
};

export function createArticleMetadata({
  locale,
  slug,
  title,
  description,
  heroImageId,
}: ArticleMetadataInput): Metadata {
  const path = `/blog/${slug}`;
  const url = `${siteConfig.url}/${locale}${path}`;

  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}`,
  };

  for (const item of routing.locales) {
    languages[item] = `${siteConfig.url}/${item}${path}`;
  }

  const imageUrl = heroImageId
    ? `${siteConfig.url}${getMehdiImage(heroImageId).src}`
    : undefined;

  const images = imageUrl
    ? [{ url: imageUrl, width: 1200, height: 1600, alt: title }]
    : getDefaultOgImages(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    icons: siteIcons,
    manifest: siteManifest,
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "ar_MA",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: getDefaultRobots(),
  };
}
