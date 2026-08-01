import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutPreviewSection() {
  const t = useTranslations("HomePage.aboutPreview");

  return (
    <section aria-labelledby="about-preview-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="about-preview-title" title={t("title")} />
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {t("description")}
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("link")}
          </Link>
        </div>
      </div>
    </section>
  );
}
