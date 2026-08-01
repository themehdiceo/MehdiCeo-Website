import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
