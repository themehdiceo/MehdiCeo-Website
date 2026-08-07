import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  cornerstoneArticleSlugs,
  articleRoute,
} from "@/content/articles/registry";
import { routes } from "@/config/routes";

const pageLinks = [
  { href: routes.home, key: "home" },
  { href: routes.about, key: "about" },
  { href: routes.journey, key: "journey" },
  { href: routes.ecomBillionaire, key: "ecomBillionaire" },
  { href: routes.pasHighTicket, key: "pasHighTicket" },
] as const;

type CornerstoneLinksProps = {
  variant?: "compact" | "full";
  currentSlug?: string;
};

export function CornerstoneLinks({
  variant = "full",
  currentSlug,
}: CornerstoneLinksProps) {
  const t = useTranslations("CornerstoneLinks");
  const tNav = useTranslations("Navigation");

  const articles = cornerstoneArticleSlugs.filter((slug) => slug !== currentSlug);

  if (variant === "compact") {
    return (
      <nav aria-label={t("articlesLabel")} className="mt-10">
        <p className="text-sm font-semibold text-foreground">{t("readMore")}</p>
        <ul className="mt-3 space-y-2">
          {articles.map((slug) => (
            <li key={slug}>
              <Link
                href={articleRoute(slug)}
                className="text-sm text-accent underline-offset-4 hover:underline"
              >
                {t(`articles.${slug}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <aside
      aria-labelledby="cornerstone-links-title"
      className="mt-16 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2
        id="cornerstone-links-title"
        className="text-lg font-semibold text-foreground"
      >
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-muted">{t("intro")}</p>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
        {t("articlesHeading")}
      </h3>
      <ul className="mt-3 space-y-2">
        {articles.map((slug) => (
          <li key={slug}>
            <Link
              href={articleRoute(slug)}
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              {t(`articles.${slug}`)}
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
        {t("pagesHeading")}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {pageLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {tNav(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
