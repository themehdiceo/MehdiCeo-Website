import { useTranslations } from "next-intl";
import { timelineEvents } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TimelineSection() {
  const t = useTranslations("HomePage.timeline");
  const tTimeline = useTranslations("Timeline");

  return (
    <section aria-labelledby="timeline-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="timeline-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ol className="relative space-y-8 border-s border-border ps-8">
          {timelineEvents.map((event) => (
            <li key={event.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -start-[2.05rem] top-1.5 size-3 rounded-full border-2 border-accent bg-background"
              />
              <time
                dateTime={event.endYear ? `${event.year}/${event.endYear}` : event.year}
                className="text-sm font-medium text-accent"
              >
                {event.endYear
                  ? `${event.year} — ${event.endYear}`
                  : event.year}
              </time>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {tTimeline(`${event.id}.title`)}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {tTimeline(`${event.id}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
