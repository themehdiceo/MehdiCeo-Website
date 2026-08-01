import { siteConfig } from "@/config/site";
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
  const sameAs = [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.skool,
    siteConfig.social.youtube,
    siteConfig.social.instagram,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    description,
    jobTitle,
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}/og-image.jpg`,
    knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.education.institution,
      url: siteConfig.education.institutionUrl,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    sameAs,
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
    description,
    url: `${siteConfig.url}/${locale}`,
    inLanguage: locale === "fr" ? "fr-FR" : "ar",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
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
      description,
      url: `${siteConfig.url}/${locale}/about`,
    },
  };
}
