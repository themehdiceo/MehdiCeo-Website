import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { siteConfig } from "@/config/site";
import {
  footerLegalNavigation,
  secondaryNavigation,
  routes,
} from "@/config/routes";

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin },
  { key: "instagram", href: siteConfig.social.instagram },
  { key: "youtube", href: siteConfig.social.youtube },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tSocial = useTranslations("Social");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-muted">{t("tagline")}</p>
            <p className="mt-4 text-xs text-muted">{t("legalNote")}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t("explore")}
            </h2>
            <ul className="mt-4 space-y-2">
              {secondaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.about}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t("socialLinks")}
            </h2>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tSocial(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border pt-6">
          {footerLegalNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs text-muted transition-colors hover:text-accent"
              >
                {tNav(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-xs text-muted">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
