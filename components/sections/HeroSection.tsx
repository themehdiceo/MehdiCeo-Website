import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("HomePage.hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,140,80,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {t("eyebrow")}
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
        >
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t("ctaAbout")}
          </Link>
          <Link
            href="/about#contact"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
