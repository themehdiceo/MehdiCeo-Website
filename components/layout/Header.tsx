import { useTranslations } from "next-intl";
import { Navigation, SiteBrand } from "@/components/layout/Navigation";

export function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <SiteBrand />
        <Navigation />
      </div>
    </header>
  );
}
