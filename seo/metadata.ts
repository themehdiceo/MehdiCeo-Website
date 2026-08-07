import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { routing } from "@/config/i18n/routing";
import { getDefaultOgImages } from "@/lib/seo/og-image";
import { siteIcons, siteManifest } from "@/lib/seo/icons";
import { getDefaultRobots } from "@/lib/seo/indexing";
import type { Locale } from "@/types";

export type MetadataNamespace =
  | "Metadata.home"
  | "Metadata.about"
  | "Metadata.journey"
  | "Metadata.ecomBillionaire"
  | "Metadata.pasHighTicket"
  | "Metadata.expertise"
  | "Metadata.resources"
  | "Metadata.videos"
  | "Metadata.faq"
  | "Metadata.contact"
  | "Metadata.blog"
  | "Metadata.videoDetail"
  | "Metadata.legal"
  | "Metadata.privacy";

type PageMetadataOptions = {
  locale: Locale;
  namespace: MetadataNamespace;
  path: string;
  /** Override default indexing robots (e.g. noindex for placeholder pages). */
  robots?: Metadata["robots"];
  /** Override default OG/Twitter images (e.g. video thumbnails). */
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

export async function createPageMetadata({
  locale,
  namespace,
  path,
  robots,
  images,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = `${siteConfig.url}/${locale}${path}`;
  const defaultImages = images ?? getDefaultOgImages(locale);

  const languages: Record<string, string> = {
    "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}`,
  };

  for (const item of routing.locales) {
    languages[item] = `${siteConfig.url}/${item}${path}`;
  }

  const resolvedRobots = robots ?? getDefaultRobots();

  return {
    metadataBase: new URL(siteConfig.url),
    icons: siteIcons,
    manifest: siteManifest,
    title: t("title"),
    description: t("description"),
    keywords: t.has("keywords")
      ? t("keywords").split(",").map((k) => k.trim())
      : undefined,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "ar_MA",
      type: "website",
      images: defaultImages,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: defaultImages,
    },
    robots: resolvedRobots,
  };
}
