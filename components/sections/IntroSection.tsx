import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { articleRoute, routes } from "@/config/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntroSection() {
  const t = useTranslations("HomePage.intro");

  return (
    <section aria-labelledby="intro-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="intro-title" title={t("title")} />
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link
            href={articleRoute("qui-est-mehdi-ceo")}
            className="inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("articleLink")}
          </Link>
          <Link
            href={routes.about}
            className="inline-flex text-sm font-medium text-muted underline-offset-4 hover:text-accent hover:underline"
          >
            {t("link")}
          </Link>
        </div>
      </div>
    </section>
  );
}
