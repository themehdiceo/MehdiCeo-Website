import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getMehdiImage } from "@/content/images/mehdi";
import { routes } from "@/config/routes";
import { articleRoute } from "@/config/routes";

export function HeroSection() {
  const t = useTranslations("HomePage.hero");
  const tImages = useTranslations("MehdiImages");
  const hero = getMehdiImage("portraitHero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,140,80,0.12),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-3 text-xl font-medium text-foreground/90">
            {t("role")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={articleRoute("qui-est-mehdi-ceo")}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("ctaAbout")}
            </Link>
            <Link
              href={routes.ecomBillionaire}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("ctaEcom")}
            </Link>
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-border lg:max-w-none">
          <Image
            src={hero.src}
            alt={tImages("portraitHero.alt")}
            title={tImages("portraitHero.title")}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
