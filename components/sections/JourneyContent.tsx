import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { timelineEvents } from "@/content";
import { articleRoute } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";
import { translateKey } from "@/lib/i18n/translate-key";

export function JourneyContent() {
  const t = useTranslations("JourneyPage");
  const tTimeline = useTranslations("Timeline");
  const tImages = useTranslations("MehdiImages");

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-start">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t("sourceNote")}</p>
          <Link
            href={articleRoute("qui-est-mehdi-ceo")}
            className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("articleLink")}
          </Link>
        </header>
        <MehdiImage
          imageId="outdoorNight"
          alt={tImages("outdoorNight.alt")}
          title={tImages("outdoorNight.title")}
          sizes="(max-width: 1024px) 100vw, 360px"
        />
      </div>

      <div className="mt-16 space-y-16">
        {timelineEvents.map((event, index) => (
          <section
            key={event.id}
            aria-labelledby={`journey-${event.id}`}
            className="max-w-3xl"
          >
            {index === 3 ? (
              <div className="mb-8 max-w-sm">
                <MehdiImage
                  imageId="travelLounge"
                  alt={tImages("travelLounge.alt")}
                  title={tImages("travelLounge.title")}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            ) : null}
            <time className="text-sm font-medium text-accent">
              {translateKey(tTimeline, `periods.${event.periodKey}`)}
            </time>
            <SectionHeading
              id={`journey-${event.id}`}
              title={t(`chapters.${event.id}.title`)}
            />
            <div className="space-y-4 text-base leading-relaxed text-muted">
              {(t.raw(`chapters.${event.id}.paragraphs`) as string[]).map(
                (paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      <aside className="mt-16 max-w-3xl rounded-xl border border-border bg-surface p-6">
        <p className="text-sm leading-relaxed text-muted">{t("disclaimer")}</p>
      </aside>

      <CornerstoneLinks variant="compact" />
    </article>
  );
}
