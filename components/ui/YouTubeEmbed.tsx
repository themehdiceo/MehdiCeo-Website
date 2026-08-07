"use client";

import { useState } from "react";
import Image from "next/image";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  thumbnail: string;
  playLabel: string;
};

export function YouTubeEmbed({
  videoId,
  title,
  thumbnail,
  playLabel,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`;

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
        priority={false}
      />
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 transition-colors hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={playLabel}
      >
        <span
          aria-hidden="true"
          className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ms-1 size-8"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-sm font-medium text-white">{playLabel}</span>
      </button>
    </div>
  );
}
