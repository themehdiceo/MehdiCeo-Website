import { useTranslations } from "next-intl";
import { expertiseIds } from "@/content";

export function ExpertiseSection() {
  const tExpertise = useTranslations("Expertise");
  const tPage = useTranslations("ExpertisePage");

  return (
    <section aria-labelledby="expertise-grid-title" className="pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="expertise-grid-title" className="sr-only">
          {tPage("title")}
        </h2>
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
