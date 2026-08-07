import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { videoRoute } from "@/config/routes";
import type { VideoRecord } from "@/content/videos";

type VideoCardProps = {
  video: VideoRecord;
  displayTitle: string;
  watchLabel: string;
};

export function VideoCard({ video, displayTitle, watchLabel }: VideoCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-background">
      <Link href={videoRoute(video.slug)} className="block">
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail}
            alt={displayTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {displayTitle}
          </h3>
          <p className="mt-2 text-xs text-muted">{video.titleOriginal}</p>
          <span className="mt-4 inline-flex text-sm font-medium text-accent">
            {watchLabel}
          </span>
        </div>
      </Link>
    </article>
  );
}
