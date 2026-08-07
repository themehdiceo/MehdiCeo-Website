import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { getAllCornerstoneArticles } from "@/content/articles/registry";
import { articleRoute, routes } from "@/config/routes";
import type { Locale } from "@/types";

type BlogPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.blog",
    path: routes.blog,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const articles = getAllCornerstoneArticles(locale);

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("blog"),
    routes.blog,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("blog"), path: routes.blog },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">
          {t("cornerstoneTitle")}
        </h2>
        <ul className="mt-6 space-y-6">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <Link href={articleRoute(article.slug)} className="group block">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {article.description}
                </p>
                <span className="mt-4 inline-flex text-sm font-medium text-accent">
                  {t("readArticle")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <CornerstoneLinks variant="compact" />
      </section>
    </PageShell>
  );
}
