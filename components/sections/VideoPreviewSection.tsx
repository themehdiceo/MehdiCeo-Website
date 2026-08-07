import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getFeaturedVideos } from "@/content/videos";
import { routes } from "@/config/routes";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { translateKey } from "@/lib/i18n/translate-key";

export function VideoPreviewSection() {
  const t = useTranslations("HomePage.videos");
  const tVideos = useTranslations("Videos.items");
  const featured = getFeaturedVideos();

  return (
    <section aria-labelledby="videos-home-title" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="videos-home-title"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((video) => (
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
        <Link
          href={routes.videos}
          className="mt-8 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
}
