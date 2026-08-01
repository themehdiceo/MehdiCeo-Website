import { routing } from "@/config/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export function isRtlLocale(locale: Locale): boolean {
  return locale === "ar";
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}
