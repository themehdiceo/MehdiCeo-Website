import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { JourneyContent } from "@/components/sections/JourneyContent";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

type JourneyPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: JourneyPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.journey",
    path: routes.journey,
  });
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("journey"),
    routes.journey,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("journey"), path: routes.journey },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <JourneyContent />
    </PageShell>
  );
}
