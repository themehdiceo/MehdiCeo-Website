import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { createBreadcrumbSchema, createFaqSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { faqIds } from "@/content";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

type FaqPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: FaqPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.faq",
    path: routes.faq,
  });
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "FaqPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tFaq = await getTranslations({ locale, namespace: "Faq" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("faq"),
    routes.faq,
  );

  const faqItems = faqIds.map((id) => ({
    question: tFaq(`${id}.question`),
    answer: tFaq(`${id}.answer`),
  }));

  const structuredData = [
    createFaqSchema(faqItems),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("faq"), path: routes.faq },
    ]),
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
        </header>
      </section>
      <FaqSection />
    </PageShell>
  );
}
