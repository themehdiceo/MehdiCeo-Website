import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { AboutContent } from "@/components/sections/AboutContent";
import {
  createBreadcrumbSchema,
  createProfilePageSchema,
} from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.about",
    path: routes.about,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata.about" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("about"),
    routes.about,
  );

  const structuredData = [
    createProfilePageSchema({
      locale,
      description: tMeta("description"),
    }),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("about"), path: routes.about },
    ]),
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <AboutContent />
    </PageShell>
  );
}
