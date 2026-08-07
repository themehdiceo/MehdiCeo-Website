import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const modelPointIds = [
  "selection",
  "noUpfrontFee",
  "revenueShare",
  "coInvestment",
  "capital",
] as const;

export function EcomBillionaireSection() {
  const t = useTranslations("HomePage.ecomBillionaire");

  return (
    <section aria-labelledby="ecom-home-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="ecom-home-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {modelPointIds.map((id) => (
            <li
              key={id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="font-semibold text-foreground">
                {t(`points.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`points.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted italic">
          {t("disclaimer")}
        </p>
        <Link
          href={routes.ecomBillionaire}
          className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("link")}
        </Link>
        <p className="mt-4 text-xs text-muted">
          {t("capacityNote", {
            count: siteConfig.ecomBillionaire.maxParticipantsPerMonth,
            percent: siteConfig.ecomBillionaire.revenueSharePercent,
          })}
        </p>
      </div>
    </section>
  );
}
