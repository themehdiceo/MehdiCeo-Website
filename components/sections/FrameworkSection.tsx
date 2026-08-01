import { useTranslations } from "next-intl";
import { learningFrameworkSteps } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FrameworkSection() {
  const t = useTranslations("HomePage.framework");

  return (
    <section
      aria-labelledby="framework-title"
      className="border-y border-border bg-surface py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="framework-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ol className="grid gap-6 sm:grid-cols-2">
          {learningFrameworkSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="text-sm font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`steps.${step}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
