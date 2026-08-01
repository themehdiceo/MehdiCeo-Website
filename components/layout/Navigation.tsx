"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { navigationItems } from "@/config/site";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label={t("mainNav")}>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium md:hidden"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? t("closeMenu") : t("openMenu")}
      </button>

      <ul
        id="primary-navigation"
        className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-full z-50 flex-col gap-1 border-b border-border bg-background p-4 shadow-sm md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
      >
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          );
        })}
        <li className="md:ms-auto">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
