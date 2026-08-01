import { useTranslations } from "next-intl";
import { expertiseIds } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExpertiseSection() {
  const t = useTranslations("HomePage.expertise");
  const tExpertise = useTranslations("Expertise");

  return (
    <section
      aria-labelledby="expertise-title"
      className="border-y border-border bg-surface py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="expertise-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseIds.map((id) => (
            <li
              key={id}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {tExpertise(`${id}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tExpertise(`${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
