import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { getOgImageUrl } from "@/lib/seo/og-image";
import type { Locale } from "@/types";

type PersonSchemaInput = {
  locale: Locale;
  description: string;
  jobTitle: string;
  knowsAbout: string[];
};

export function createPersonSchema({
  locale,
  description,
  jobTitle,
  knowsAbout,
}: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.brandHandle,
    description,
    jobTitle,
    url: `${siteConfig.url}/${locale}`,
    image: getOgImageUrl(locale),
    knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      url: `${siteConfig.url}/${locale}${routes.ecomBillionaire}`,
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
  };
}

type WebSiteSchemaInput = {
  locale: Locale;
  description: string;
};

export function createWebSiteSchema({
  locale,
  description,
}: WebSiteSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.brandHandle,
    description,
    url: `${siteConfig.url}/${locale}`,
    inLanguage: locale === "fr" ? "fr-FR" : "ar",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
    },
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbSchema(
  locale: Locale,
  items: BreadcrumbItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.path}`,
    })),
  };
}

export function createProfilePageSchema({
  locale,
  description,
}: {
  locale: Locale;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
      description,
      url: `${siteConfig.url}/${locale}/a-propos`,
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.instagram,
        siteConfig.social.youtube,
      ],
    },
  };
}

export function createOrganizationSchema({
  locale,
  description,
}: {
  locale: Locale;
  description: string;
}) {
  const pageUrl = `${siteConfig.url}/${locale}${routes.ecomBillionaire}`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    description,
    url: pageUrl,
    sameAs: [siteConfig.organization.communityUrl],
    founder: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
      url: `${siteConfig.url}/${locale}`,
    },
  };
}

export function createVideoObjectSchema({
  locale,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  contentUrl,
}: {
  locale: Locale;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    contentUrl,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
      url: `${siteConfig.url}/${locale}`,
    },
  };
}

/** Returns VideoObject schema only when a verified ISO publish date exists. */
export function createVideoObjectSchemaIfVerified(
  input: {
    locale: Locale;
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate?: string;
    embedUrl: string;
    contentUrl: string;
  },
): ReturnType<typeof createVideoObjectSchema> | null {
  if (!input.uploadDate?.trim()) {
    return null;
  }
  return createVideoObjectSchema({
    ...input,
    uploadDate: input.uploadDate,
  });
}

type ArticleSchemaInput = {
  locale: Locale;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
};

export function createArticleSchema({
  locale,
  slug,
  headline,
  description,
  datePublished,
  dateModified,
  imageUrl,
}: ArticleSchemaInput) {
  const pageUrl = `${siteConfig.url}/${locale}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: pageUrl,
    datePublished,
    dateModified,
    inLanguage: locale === "fr" ? "fr-FR" : "ar",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
      url: `${siteConfig.url}/${locale}`,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: siteConfig.brandHandle,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };
}
