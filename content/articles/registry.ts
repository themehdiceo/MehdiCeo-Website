import type { Locale } from "@/types";
import { articleRoute as buildArticleRoute } from "@/config/routes";
import type { ArticleContent } from "./types";
import { quiEstMehdiCeoFr } from "./fr/qui-est-mehdi-ceo";
import { pourquoiEcomBillionaireFr } from "./fr/pourquoi-ecom-billionaire";
import { questCePasHighTicketFr } from "./fr/quest-ce-pas-high-ticket";
import { quiEstMehdiCeoAr } from "./ar/qui-est-mehdi-ceo";
import { pourquoiEcomBillionaireAr } from "./ar/pourquoi-ecom-billionaire";
import { questCePasHighTicketAr } from "./ar/quest-ce-pas-high-ticket";

export const cornerstoneArticleSlugs = [
  "qui-est-mehdi-ceo",
  "pourquoi-ecom-billionaire",
  "quest-ce-pas-high-ticket",
] as const;

export type CornerstoneArticleSlug = (typeof cornerstoneArticleSlugs)[number];

const articlesByLocale: Record<Locale, Record<CornerstoneArticleSlug, ArticleContent>> = {
  fr: {
    "qui-est-mehdi-ceo": quiEstMehdiCeoFr,
    "pourquoi-ecom-billionaire": pourquoiEcomBillionaireFr,
    "quest-ce-pas-high-ticket": questCePasHighTicketFr,
  },
  ar: {
    "qui-est-mehdi-ceo": quiEstMehdiCeoAr,
    "pourquoi-ecom-billionaire": pourquoiEcomBillionaireAr,
    "quest-ce-pas-high-ticket": questCePasHighTicketAr,
  },
};

export function getArticleBySlug(
  slug: string,
  locale: Locale,
): ArticleContent | undefined {
  if (!isCornerstoneArticleSlug(slug)) return undefined;
  return articlesByLocale[locale][slug];
}

export function isCornerstoneArticleSlug(
  slug: string,
): slug is CornerstoneArticleSlug {
  return (cornerstoneArticleSlugs as readonly string[]).includes(slug);
}

export function articleRoute(slug: CornerstoneArticleSlug): string {
  return buildArticleRoute(slug);
}

export function getAllCornerstoneArticles(locale: Locale): ArticleContent[] {
  return cornerstoneArticleSlugs.map((slug) => articlesByLocale[locale][slug]);
}
