import { getTranslations } from "next-intl/server";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

export async function getHomeBreadcrumb(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "Navigation" });
  return [{ label: t("home"), href: routes.home }];
}

export async function getPageBreadcrumbs(
  locale: Locale,
  currentLabel: string,
  currentPath: string,
) {
  const t = await getTranslations({ locale, namespace: "Navigation" });
  return [
    { label: t("home"), href: routes.home },
    { label: currentLabel, href: currentPath },
  ];
}
