import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { VideoCard } from "@/components/ui/VideoCard";
import { videos, youtubeChannelUrl } from "@/content/videos";
import { createBreadcrumbSchema } from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { translateKey } from "@/lib/i18n/translate-key";

type VideosPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: VideosPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.videos",
    path: routes.videos,
  });
}

export default async function VideosPage({ params }: VideosPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "VideosPage" });
  const tVideos = await getTranslations({ locale, namespace: "Videos.items" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const breadcrumbs = await getPageBreadcrumbs(
    locale,
    tNav("videos"),
    routes.videos,
  );

  const structuredData = createBreadcrumbSchema(locale, [
    { name: tNav("home"), path: routes.home },
    { name: tNav("videos"), path: routes.videos },
  ]);

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("intro")}</p>
          <p className="mt-6">
            <a
              href={youtubeChannelUrl}
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("channelCta")}
            </a>
          </p>
          <p className="mt-6 text-sm text-muted">{t("sourceNote")}</p>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <li key={video.slug}>
              <VideoCard
                video={video}
                displayTitle={translateKey(
                  tVideos,
                  `${video.summaryKey}.displayTitle`,
                )}
                watchLabel={t("watch")}
              />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
