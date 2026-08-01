import { useTranslations } from "next-intl";
import { faqIds } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection() {
  const t = useTranslations("HomePage.faq");
  const tFaq = useTranslations("Faq");

  return (
    <section aria-labelledby="faq-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <dl className="space-y-4">
          {faqIds.map((id) => (
            <div
              key={id}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <dt className="text-base font-semibold text-foreground">
                {tFaq(`${id}.question`)}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                {tFaq(`${id}.answer`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
