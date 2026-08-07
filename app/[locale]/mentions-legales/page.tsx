import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const sectionKeys = [
  "publisher",
  "editor",
  "hosting",
  "contact",
  "placeholder",
] as const;

type LegalPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: LegalPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.legal",
    path: routes.legal,
  });
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "LegalPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("legal"),
    routes.legal,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("legal"), path: routes.legal },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-sm font-medium text-accent">{t("draftNotice")}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>

        <dl className="mt-12 space-y-8">
          {sectionKeys.map((key) => (
            <div key={key}>
              <dt className="text-base font-semibold text-foreground">
                {t(`sections.${key}.label`)}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">
                {t(`sections.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </PageShell>
  );
}
