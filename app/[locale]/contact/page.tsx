import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";
import { siteConfig } from "@/config/site";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

// TODO: Add verified official contact email when supplied by Mehdi CEO.

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin },
  { key: "instagram", href: siteConfig.social.instagram },
  { key: "youtube", href: siteConfig.social.youtube },
] as const;

type ContactPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.contact",
    path: routes.contact,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tSocial = await getTranslations({ locale, namespace: "Social" });
  const tImages = await getTranslations({ locale, namespace: "MehdiImages" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("contact"),
    routes.contact,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("contact"), path: routes.contact },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <section
        id="contact"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-start">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {t("brandIdentity")}
            </p>

            <h2 className="mt-10 text-xl font-semibold text-foreground">
              {t("socialTitle")}
            </h2>
            <ul className="mt-4 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-base text-accent underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tSocial(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <MehdiImage
            imageId="casualLifestyle"
            alt={tImages("casualLifestyle.alt")}
            title={tImages("casualLifestyle.title")}
            sizes="(max-width: 1024px) 100vw, 360px"
          />
        </div>

        <CornerstoneLinks variant="compact" />
      </section>
    </PageShell>
  );
}
