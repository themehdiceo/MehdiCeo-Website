"use client";

import { useTranslations } from "next-intl";
import { primaryNavigation } from "@/config/routes";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { siteConfig } from "@/config/site";

export function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <nav aria-label={t("mainNav")}>
      <ul className="hidden items-center gap-1 lg:flex">
        {primaryNavigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          );
        })}
        <li className="ms-2">
          <LanguageSwitcher />
        </li>
      </ul>

      <details className="relative lg:hidden">
        <summary className="cursor-pointer list-none rounded-md border border-border px-3 py-2 text-sm font-medium">
          {t("openMenu")}
        </summary>
        <ul className="absolute end-0 z-50 mt-2 min-w-48 rounded-md border border-border bg-background p-2 shadow-lg">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm hover:bg-surface"
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
          <li className="border-t border-border px-3 py-2">
            <LanguageSwitcher />
          </li>
        </ul>
      </details>
    </nav>
  );
}

export function SiteBrand() {
  return (
    <Link
      href="/"
      className="text-lg font-semibold tracking-tight text-foreground"
      aria-label={siteConfig.name}
    >
      {siteConfig.name}
    </Link>
  );
}
