import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleView, getArticleHeroImageUrl } from "@/components/articles/ArticleView";
import {
  cornerstoneArticleSlugs,
  getArticleBySlug,
} from "@/content/articles/registry";
import {
  createArticleSchema,
  createBreadcrumbSchema,
} from "@/seo";
import { createArticleMetadata } from "@/seo/article-metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { articleRoute, routes } from "@/config/routes";
import type { Locale } from "@/types";
import type { Metadata } from "next";

type ArticlePageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  return cornerstoneArticleSlugs.flatMap((slug) =>
    (["fr", "ar"] as const).map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);
  if (!article) return {};

  return createArticleMetadata({
    locale,
    slug: article.slug,
    title: article.title,
    description: article.description,
    heroImageId: article.heroImageId,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();

  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tArticle = await getTranslations({ locale, namespace: "ArticlePage" });
  const tImages = await getTranslations({ locale, namespace: "MehdiImages" });

  const breadcrumbs = [
    ...(await getPageBreadcrumbs(locale, tNav("blog"), routes.blog)),
    { label: article.title },
  ];

  const imageUrl = getArticleHeroImageUrl(article);
  const imageAlt = article.heroImageId
    ? tImages(`${article.heroImageId}.alt`)
    : "";
  const imageTitle = article.heroImageId
    ? tImages(`${article.heroImageId}.title`)
    : undefined;

  const structuredData = [
    createArticleSchema({
      locale,
      slug: article.slug,
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
      imageUrl,
    }),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("blog"), path: routes.blog },
      { name: article.title, path: articleRoute(article.slug) },
    ]),
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <ArticleView
        article={article}
        imageAlt={imageAlt}
        imageTitle={imageTitle}
        publishedLabel={tArticle("publishedLabel")}
      />
    </PageShell>
  );
}
