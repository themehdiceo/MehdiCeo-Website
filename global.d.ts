import type fr from "./messages/fr.json";

type Messages = typeof fr;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof import("@/config/i18n/routing").routing.locales)[number];
    Messages: Messages;
  }
}
