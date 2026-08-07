import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";
import {
  createBreadcrumbSchema,
  createOrganizationSchema,
} from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { articleRoute } from "@/content/articles/registry";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const sectionIds = [
  "why",
  "whoFor",
  "selection",
  "noUpfrontFee",
  "revenueShare",
  "coInvestment",
  "capital",
] as const;

type EcomBillionairePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: EcomBillionairePageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.ecomBillionaire",
    path: routes.ecomBillionaire,
  });
}

export default async function EcomBillionairePage({
  params,
}: EcomBillionairePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "EcomBillionairePage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tMeta = await getTranslations({
    locale,
    namespace: "Metadata.ecomBillionaire",
  });
  const tImages = await getTranslations({ locale, namespace: "MehdiImages" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("ecomBillionaire"),
    routes.ecomBillionaire,
  );

  const structuredData = [
    createOrganizationSchema({
      locale,
      description: tMeta("description"),
    }),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("ecomBillionaire"), path: routes.ecomBillionaire },
    ]),
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-start">
          <header className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
            <Link
              href={articleRoute("pourquoi-ecom-billionaire")}
              className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {t("articleLink")}
            </Link>
          </header>
          <MehdiImage
            imageId="suitLuxuryCar"
            alt={tImages("suitLuxuryCar.alt")}
            title={tImages("suitLuxuryCar.title")}
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </div>

        {sectionIds.map((id) => (
          <section key={id} aria-labelledby={`ecom-${id}`} className="mt-16">
            <SectionHeading
              id={`ecom-${id}`}
              title={t(`sections.${id}.title`)}
            />
            <p className="max-w-3xl text-base leading-relaxed text-muted">
              {t(`sections.${id}.description`)}
            </p>
          </section>
        ))}

        <aside className="mt-16 rounded-xl border border-border bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">{t("disclaimer")}</p>
        </aside>

        <CornerstoneLinks />
      </article>
    </PageShell>
  );
}
