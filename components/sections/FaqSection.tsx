import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { faqIds } from "@/content";
import { routes } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ limit }: { limit?: number }) {
  const t = useTranslations("HomePage.faq");
  const tFaq = useTranslations("Faq");
  const items = limit ? faqIds.slice(0, limit) : faqIds;

  return (
    <section aria-labelledby="faq-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <dl className="space-y-4">
          {items.map((id) => (
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
        {limit ? (
          <Link
            href={routes.faq}
            className="mt-8 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("link")}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
