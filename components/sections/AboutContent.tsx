import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { expertiseIds } from "@/content";
import { siteConfig } from "@/config/site";
import { articleRoute, routes } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";

const biographyKeys = ["identity", "brand", "focus", "approach"] as const;

const valueIds = ["longTerm", "execution", "transparency"] as const;

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin },
  { key: "instagram", href: siteConfig.social.instagram },
  { key: "youtube", href: siteConfig.social.youtube },
] as const;

export function AboutContent() {
  const t = useTranslations("AboutPage");
  const tExpertise = useTranslations("Expertise");
  const tSocial = useTranslations("Social");
  const tImages = useTranslations("MehdiImages");

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-start">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
          <Link
            href={articleRoute("qui-est-mehdi-ceo")}
            className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("biography.articleLink")}
          </Link>
        </header>
        <MehdiImage
          imageId="formalSuitEvent"
          alt={tImages("formalSuitEvent.alt")}
          title={tImages("formalSuitEvent.title")}
          sizes="(max-width: 1024px) 100vw, 360px"
        />
      </div>

      <section aria-labelledby="brand-identity-title" className="mt-16 max-w-3xl">
        <SectionHeading id="brand-identity-title" title={t("brandIdentity.title")} />
        <p className="text-base leading-relaxed text-muted">
          {t("brandIdentity.body")}
        </p>
      </section>

      <section aria-labelledby="biography-title" className="mt-16">
        <SectionHeading id="biography-title" title={t("biography.title")} />
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          {biographyKeys.map((key) => (
            <p key={key}>{t(`biography.paragraphs.${key}`)}</p>
          ))}
        </div>
        <Link
          href={routes.journey}
          className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("biography.journeyLink")}
        </Link>
      </section>

      <section aria-labelledby="about-expertise-title" className="mt-16">
        <SectionHeading id="about-expertise-title" title={t("expertise.title")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {expertiseIds.map((id) => (
            <li
              key={id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold text-foreground">
                {tExpertise(`${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tExpertise(`${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href={routes.expertise}
          className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("expertise.link")}
        </Link>
      </section>

      <section aria-labelledby="values-title" className="mt-16">
        <SectionHeading id="values-title" title={t("values.title")} />
        <ul className="grid gap-4 sm:grid-cols-3">
          {valueIds.map((id) => (
            <li
              key={id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold text-foreground">
                {t(`values.items.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`values.items.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="social-title" className="mt-16">
        <SectionHeading id="social-title" title={t("social.title")} />
        <ul className="space-y-3">
          {socialLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="text-sm text-accent underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tSocial(link.key)}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CornerstoneLinks variant="compact" />
    </article>
  );
}
