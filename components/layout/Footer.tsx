import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { key: "linkedin", href: siteConfig.social.linkedin, labelKey: "linkedin" },
  { key: "github", href: siteConfig.social.github, labelKey: "github" },
  { key: "skool", href: siteConfig.social.skool, labelKey: "skool" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tSocial = useTranslations("Social");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-muted">{t("tagline")}</p>
            <p className="mt-4 text-xs text-muted">{t("legalNote")}</p>
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
                    {tSocial(link.labelKey)}
                  </a>
                </li>
              ))}
              {siteConfig.social.youtube ? (
                <li>
                  <a
                    href={siteConfig.social.youtube}
                    className="text-sm text-muted transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tSocial("youtube")}
                  </a>
                </li>
              ) : null}
              {siteConfig.social.instagram ? (
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    className="text-sm text-muted transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tSocial("instagram")}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
