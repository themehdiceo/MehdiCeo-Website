import type { Locale } from "@/types";

export type VideoRecord = {
  slug: string;
  videoId: string;
  /** Verified title from YouTube oEmbed API */
  titleOriginal: string;
  thumbnail: string;
  sourceUrl: string;
  /** ISO date when known; empty string = owner to complete */
  publishedAt: string;
  featured: boolean;
  /** Short summary key in messages Videos.items.{slug} */
  summaryKey: string;
};

export const youtubeChannelUrl = "https://www.youtube.com/@themehdiceo";

/**
 * Verified public videos from @themehdiceo (oEmbed API, 2026-08-02).
 * Descriptions: use translation keys; do not invent beyond title context.
 */
export const videos: VideoRecord[] = [
  {
    slug: "histoire-premiers-10000-dollars",
    videoId: "hhidgaQDmbY",
    titleOriginal:
      "قصتي مع أول 10،000$ في التجارة الإلكترونية",
    thumbnail: "https://i.ytimg.com/vi/hhidgaQDmbY/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=hhidgaQDmbY",
    publishedAt: "",
    featured: true,
    summaryKey: "histoire-premiers-10000-dollars",
  },
  {
    slug: "strategie-15000-dollars-ecommerce",
    videoId: "aMFavDJpitw",
    titleOriginal:
      "كيف ربحت +15,000$ من التجارة الإلكترونية بفضل هذه الإستراتيجية",
    thumbnail: "https://i.ytimg.com/vi/aMFavDJpitw/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=aMFavDJpitw",
    publishedAt: "",
    featured: true,
    summaryKey: "strategie-15000-dollars-ecommerce",
  },
  {
    slug: "100000-dollars-depuis-zero",
    videoId: "vAmef1g9PUo",
    titleOriginal: "كيفاش دير 100,000$ من صفر؟ السر لي ما غاديش تصدق",
    thumbnail: "https://i.ytimg.com/vi/vAmef1g9PUo/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=vAmef1g9PUo",
    publishedAt: "",
    featured: true,
    summaryKey: "100000-dollars-depuis-zero",
  },
  {
    slug: "reussir-business-ecommerce",
    videoId: "L0ytluFvkro",
    titleOriginal: "كيف تحقق 100% نجاح في أي بيزنس",
    thumbnail: "https://i.ytimg.com/vi/L0ytluFvkro/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=L0ytluFvkro",
    publishedAt: "",
    featured: false,
    summaryKey: "reussir-business-ecommerce",
  },
  {
    slug: "abandon-etudes-ecommerce",
    videoId: "miENvfspLHY",
    titleOriginal: "تخليت على قرايتي باش نبدا التجارة الإلكترونية (واش تستاهل؟)",
    thumbnail: "https://i.ytimg.com/vi/miENvfspLHY/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=miENvfspLHY",
    publishedAt: "",
    featured: false,
    summaryKey: "abandon-etudes-ecommerce",
  },
  {
    slug: "erreur-debutants-ecommerce",
    videoId: "3FBekF1Txms",
    titleOriginal: "أكبر خطأ يدمر المبتدئين في التجارة الإلكترونية",
    thumbnail: "https://i.ytimg.com/vi/3FBekF1Txms/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=3FBekF1Txms",
    publishedAt: "",
    featured: false,
    summaryKey: "erreur-debutants-ecommerce",
  },
  {
    slug: "verite-ecommerce",
    videoId: "GpkfRi6h_nE",
    titleOriginal:
      "الحقيقة الصادمة عن التجارة الإلكترونية التي لا يريدونك أن تعرفها",
    thumbnail: "https://i.ytimg.com/vi/GpkfRi6h_nE/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=GpkfRi6h_nE",
    publishedAt: "",
    featured: false,
    summaryKey: "verite-ecommerce",
  },
  {
    slug: "dropshipping-vs-cod",
    videoId: "vhdepqudLbE",
    titleOriginal:
      "هل دروبشيبينغ أفضل من الدفع عند الاستلام (اكتشف الحقيقة المدهشة)",
    thumbnail: "https://i.ytimg.com/vi/vhdepqudLbE/hqdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=vhdepqudLbE",
    publishedAt: "",
    featured: false,
    summaryKey: "dropshipping-vs-cod",
  },
];

export function getVideoBySlug(slug: string): VideoRecord | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getFeaturedVideos(): VideoRecord[] {
  return videos.filter((v) => v.featured);
}

export function getRelatedVideos(
  currentSlug: string,
  limit = 3,
): VideoRecord[] {
  return videos.filter((v) => v.slug !== currentSlug).slice(0, limit);
}

export function getVideoWatchUrl(videoId: string, locale: Locale): string {
  return `/${locale}/videos`;
}
