import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";

type PageMetadataOptions = {
  locale: Locale;
  namespace: "Metadata.home" | "Metadata.about";
  path: "" | "/about";
};

export async function createPageMetadata({
  locale,
  namespace,
  path,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = `${siteConfig.url}/${locale}${path}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        ar: `${siteConfig.url}/ar${path}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "ar_MA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
