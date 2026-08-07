import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { articleRoute } from "@/content/articles/registry";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const sectionIds = [
  "what",
  "difference",
  "unitEconomics",
  "offer",
  "acquisition",
] as const;

type PasHighTicketPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PasHighTicketPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.pasHighTicket",
    path: routes.pasHighTicket,
  });
}

export default async function PasHighTicketPage({
  params,
}: PasHighTicketPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "PasHighTicketPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tImages = await getTranslations({ locale, namespace: "MehdiImages" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("pasHighTicket"),
    routes.pasHighTicket,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("pasHighTicket"), path: routes.pasHighTicket },
  ]);

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
              href={articleRoute("quest-ce-pas-high-ticket")}
              className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {t("articleLink")}
            </Link>
          </header>
          <MehdiImage
            imageId="formalSuitEvent"
            alt={tImages("formalSuitEvent.alt")}
            title={tImages("formalSuitEvent.title")}
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </div>

        {sectionIds.map((id) => (
          <section key={id} aria-labelledby={`pas-${id}`} className="mt-16">
            <SectionHeading id={`pas-${id}`} title={t(`sections.${id}.title`)} />
            <p className="max-w-3xl text-base leading-relaxed text-muted">
              {t(`sections.${id}.description`)}
            </p>
          </section>
        ))}

        <aside className="mt-16 rounded-xl border border-border bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">{t("note")}</p>
        </aside>

        <CornerstoneLinks />
      </article>
    </PageShell>
  );
}
