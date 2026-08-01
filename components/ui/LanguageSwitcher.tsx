"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/config/i18n/routing";
import type { Locale } from "@/types";

const localeLabels: Record<Locale, string> = {
  fr: "FR",
  ar: "AR",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
