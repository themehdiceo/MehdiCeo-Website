import { useTranslations } from "next-intl";
import { expertiseIds, timelineEvents } from "@/content";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const valueIds = ["longTerm", "learning", "transparency"] as const;

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin, labelKey: "linkedin" },
  { key: "github", href: siteConfig.social.github, labelKey: "github" },
  { key: "skool", href: siteConfig.social.skool, labelKey: "skool" },
] as const;

export function AboutContent() {
  const t = useTranslations("AboutPage");
  const tExpertise = useTranslations("Expertise");
  const tTimeline = useTranslations("Timeline");
  const tSocial = useTranslations("Social");

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
      </header>

      <section aria-labelledby="biography-title" className="mt-16">
        <SectionHeading id="biography-title" title={t("biography.title")} />
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>{t("biography.paragraphs.origin")}</p>
          <p>{t("biography.paragraphs.career")}</p>
          <p>{t("biography.paragraphs.philosophy")}</p>
          <p className="italic">{t("biography.paragraphs.placeholder")}</p>
        </div>
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
      </section>

      <section aria-labelledby="about-timeline-title" className="mt-16">
        <SectionHeading id="about-timeline-title" title={t("timeline.title")} />
        <ol className="space-y-6">
          {timelineEvents.map((event) => (
            <li
              key={event.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <time
                dateTime={event.endYear ? `${event.year}/${event.endYear}` : event.year}
                className="text-sm font-medium text-accent"
              >
                {event.endYear
                  ? `${event.year} — ${event.endYear}`
                  : event.year}
              </time>
              <h3 className="mt-1 font-semibold text-foreground">
                {tTimeline(`${event.id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tTimeline(`${event.id}.description`)}
              </p>
            </li>
          ))}
        </ol>
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

      <section aria-labelledby="social-title" className="mt-16" id="contact">
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
                {tSocial(link.labelKey)}
              </a>
            </li>
          ))}
          {!siteConfig.social.youtube && !siteConfig.social.instagram ? (
            <li className="text-sm italic text-muted">
              {t("social.placeholder")} — YouTube, Instagram
            </li>
          ) : null}
        </ul>
      </section>
    </article>
  );
}
