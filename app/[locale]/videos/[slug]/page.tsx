import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { VideoCard } from "@/components/ui/VideoCard";
import {
  getRelatedVideos,
  getVideoBySlug,
  videos,
} from "@/content/videos";
import {
  createBreadcrumbSchema,
  createVideoObjectSchemaIfVerified,
} from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import { getPageBreadcrumbs } from "@/lib/page-utils";
import { routes, videoRoute } from "@/config/routes";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";
import type { Metadata } from "next";
import { translateKey } from "@/lib/i18n/translate-key";

type VideoPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  return videos.flatMap((video) =>
    (["fr", "ar"] as const).map((locale) => ({
      locale,
      slug: video.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return {};

  const tVideos = await getTranslations({ locale, namespace: "Videos.items" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata.videoDetail" });
  const displayTitle = translateKey(
    tVideos,
    `${video.summaryKey}.displayTitle`,
  );
  const summary = translateKey(tVideos, `${video.summaryKey}.summary`);
  const path = videoRoute(slug);
  const videoImages = [{ url: video.thumbnail }];

  const base = await createPageMetadata({
    locale,
    namespace: "Metadata.videoDetail",
    path,
    images: videoImages,
  });

  return {
    ...base,
    title: `${displayTitle} — ${siteConfig.name}`,
    description: summary || tMeta("description"),
    openGraph: {
      ...base.openGraph,
      title: `${displayTitle} — ${siteConfig.name}`,
      description: summary || tMeta("description"),
      images: videoImages,
    },
    twitter: {
      ...base.twitter,
      title: `${displayTitle} — ${siteConfig.name}`,
      description: summary || tMeta("description"),
      images: videoImages,
    },
  };
}

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const tVideos = await getTranslations({ locale, namespace: "Videos.items" });
  const tDetail = await getTranslations({ locale, namespace: "VideoDetail" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tPage = await getTranslations({ locale, namespace: "VideosPage" });

  const displayTitle = translateKey(
    tVideos,
    `${video.summaryKey}.displayTitle`,
  );
  const summary = translateKey(tVideos, `${video.summaryKey}.summary`);
  const related = getRelatedVideos(slug, 3);

  const breadcrumbs = [
    ...(await getPageBreadcrumbs(locale, tNav("videos"), routes.videos)),
    { label: displayTitle },
  ];

  const videoSchema = createVideoObjectSchemaIfVerified({
    locale,
    name: displayTitle,
    description: summary,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.publishedAt || undefined,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.videoId}`,
    contentUrl: video.sourceUrl,
  });

  const structuredData = [
    ...(videoSchema ? [videoSchema] : []),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: routes.home },
      { name: tNav("videos"), path: routes.videos },
      { name: displayTitle, path: videoRoute(slug) },
    ]),
  ];

  const ideaKeys = ["idea1", "idea2", "idea3"] as const;

  return (
    <PageShell breadcrumbs={breadcrumbs} structuredData={structuredData}>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {displayTitle}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {tDetail("originalTitleLabel")}: {video.titleOriginal}
          </p>
        </header>

        <div className="mt-8">
          <YouTubeEmbed
            videoId={video.videoId}
            title={displayTitle}
            thumbnail={video.thumbnail}
            playLabel={tDetail("playLabel")}
          />
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted">{summary}</p>

        <section aria-labelledby="key-ideas" className="mt-10">
          <h2 id="key-ideas" className="text-xl font-semibold text-foreground">
            {tDetail("keyIdeasTitle")}
          </h2>
          <ul className="mt-4 list-disc space-y-2 ps-5 text-muted">
            {ideaKeys.map((key) => (
              <li key={key}>
                {translateKey(tVideos, `${video.summaryKey}.${key}`)}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 text-sm">
          <a
            href={video.sourceUrl}
            className="text-accent underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tDetail("sourceLabel")}
          </a>
        </p>

        {related.length > 0 ? (
          <section aria-labelledby="related-videos" className="mt-16">
            <h2
              id="related-videos"
              className="text-xl font-semibold text-foreground"
            >
              {tDetail("relatedTitle")}
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <VideoCard
                    video={item}
                    displayTitle={translateKey(
                      tVideos,
                      `${item.summaryKey}.displayTitle`,
                    )}
                    watchLabel={tPage("watch")}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}
