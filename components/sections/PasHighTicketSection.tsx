import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { routes } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillarIds = [
  "highTicket",
  "offer",
  "acquisition",
  "margins",
] as const;

export function PasHighTicketSection() {
  const t = useTranslations("HomePage.pasHighTicket");

  return (
    <section
      aria-labelledby="pas-home-title"
      className="border-y border-border bg-surface py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pas-home-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {t("intro")}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillarIds.map((id) => (
            <li
              key={id}
              className="rounded-xl border border-border bg-background p-5"
            >
              <h3 className="font-semibold text-foreground">
                {t(`pillars.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`pillars.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-muted">{t("note")}</p>
        <Link
          href={routes.pasHighTicket}
          className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
}
