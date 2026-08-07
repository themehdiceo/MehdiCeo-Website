import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import {
  homepageTimelinePreviewIds,
  timelineEvents,
  type TimelineEventId,
} from "@/content";
import { routes } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { translateKey } from "@/lib/i18n/translate-key";

type TimelineSectionProps = {
  showLink?: boolean;
  /** Shorter homepage preview — links to /parcours for the full chronology. */
  preview?: boolean;
  eventFilter?: readonly TimelineEventId[];
};

export function TimelineSection({
  showLink = true,
  preview = false,
  eventFilter,
}: TimelineSectionProps) {
  const t = useTranslations("HomePage.timeline");
  const tTimeline = useTranslations("Timeline");
  const tPreview = useTranslations("HomePage.timeline.preview");

  const filterIds = preview ? homepageTimelinePreviewIds : eventFilter;
  const events = filterIds
    ? timelineEvents.filter((event) =>
        (filterIds as readonly string[]).includes(event.id),
      )
    : timelineEvents;

  return (
    <section
      aria-labelledby="timeline-title"
      className="border-y border-border bg-surface py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="timeline-title"
          title={preview ? t("previewTitle") : t("title")}
          subtitle={preview ? t("previewSubtitle") : t("subtitle")}
        />
        <ol className="relative space-y-8 border-s border-border ps-8">
          {events.map((event) => (
            <li key={event.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -start-[2.05rem] top-1.5 size-3 rounded-full border-2 border-accent bg-background"
              />
              <time className="text-sm font-medium text-accent">
                {translateKey(tTimeline, `periods.${event.periodKey}`)}
              </time>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {preview
                  ? translateKey(tPreview, `${event.id}.title`)
                  : tTimeline(`${event.id}.title`)}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {preview
                  ? translateKey(tPreview, `${event.id}.description`)
                  : tTimeline(`${event.id}.description`)}
              </p>
            </li>
          ))}
        </ol>
        {showLink ? (
          <Link
            href={routes.journey}
            className="mt-8 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("link")}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
