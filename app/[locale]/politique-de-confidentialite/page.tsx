import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const sectionKeys = [
  "controller",
  "dataCollected",
  "purpose",
  "retention",
  "rights",
  "contact",
  "placeholder",
] as const;

type PrivacyPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.privacy",
    path: routes.privacy,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "PrivacyPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("privacy"),
    routes.privacy,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("privacy"), path: routes.privacy },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-sm font-medium text-accent">{t("draftNotice")}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>

        <div className="mt-12 space-y-10">
          {sectionKeys.map((key) => (
            <section key={key} aria-labelledby={`privacy-${key}`}>
              <h2
                id={`privacy-${key}`}
                className="text-xl font-semibold text-foreground"
              >
                {t(`sections.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
