import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

type ExpertisePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ExpertisePageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.expertise",
    path: routes.expertise,
  });
}

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ExpertisePage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("expertise"),
    routes.expertise,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("expertise"), path: routes.expertise },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
        </header>
      </section>
      <ExpertiseSection />
    </PageShell>
  );
}
