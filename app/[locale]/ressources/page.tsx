import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { ContentHub } from "@/components/sections/ContentHub";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

/**
 * /ressources is a navigation hub (~4 outbound links, minimal unique prose).
 * noindex + sitemap exclusion until curated featured content is added.
 */
type ResourcesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ResourcesPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.resources",
    path: routes.resources,
    robots: { index: false, follow: true },
  });
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ResourcesPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("resources"),
    routes.resources,
  );

  const links = [
    {
      href: routes.expertise,
      title: t("links.expertise.title"),
      description: t("links.expertise.description"),
    },
    {
      href: routes.videos,
      title: t("links.videos.title"),
      description: t("links.videos.description"),
    },
    {
      href: routes.faq,
      title: t("links.faq.title"),
      description: t("links.faq.description"),
    },
    {
      href: routes.blog,
      title: t("links.blog.title"),
      description: t("links.blog.description"),
    },
  ];

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("resources"), path: routes.resources },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <ContentHub title={t("title")} intro={t("intro")} links={links} />
    </PageShell>
  );
}
