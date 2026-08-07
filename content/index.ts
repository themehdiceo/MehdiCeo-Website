export const timelineEventIds = [
  "start-2021",
  "family-turning-point",
  "first-30000",
  "multiple-brands",
  "delegation",
  "ecom-billionaire",
  "pas-high-ticket",
] as const;

export type TimelineEventId = (typeof timelineEventIds)[number];

export const timelineEvents: ReadonlyArray<{
  id: TimelineEventId;
  periodKey: string;
  sortOrder: number;
}> = [
  { id: "start-2021", periodKey: "september-2021", sortOrder: 1 },
  { id: "family-turning-point", periodKey: "family-turning-point", sortOrder: 2 },
  { id: "first-30000", periodKey: "first-30000", sortOrder: 3 },
  { id: "multiple-brands", periodKey: "multiple-brands", sortOrder: 4 },
  { id: "delegation", periodKey: "delegation", sortOrder: 5 },
  { id: "ecom-billionaire", periodKey: "late-2023-early-2024", sortOrder: 6 },
  { id: "pas-high-ticket", periodKey: "pas-development", sortOrder: 7 },
];

export const expertiseIds = [
  "ecommerce",
  "high-ticket",
  "digital-marketing",
  "entrepreneurship",
  "business-building",
  "coaching",
] as const;

export type ExpertiseId = (typeof expertiseIds)[number];

export const faqIds = [
  "who-is-mehdi",
  "what-is-ecom-billionaire",
  "what-is-pas-high-ticket",
  "how-started-ecommerce",
  "how-ecom-billionaire-works",
  "does-mehdi-invest",
  "where-to-follow",
  "how-to-contact",
] as const;

/** FAQs rendered on the homepage — must match FAQPage JSON-LD on /. */
export const homepageFaqIds = faqIds.slice(0, 4) as (typeof faqIds)[number][];

/** Timeline milestones shown on homepage preview (links to /parcours for full chronology). */
export const homepageTimelinePreviewIds = [
  "start-2021",
  "family-turning-point",
  "first-30000",
  "ecom-billionaire",
] as const satisfies readonly TimelineEventId[];

export type FaqId = (typeof faqIds)[number];

export const contentTemplateTypes = [
  "article",
  "videoSummary",
  "businessGuide",
  "interview",
  "caseStudy",
] as const;

export type ContentTemplateType = (typeof contentTemplateTypes)[number];

export const blogDraftSlugs = [
  "qui-est-mehdi-ceo",
  "comment-a-commence-ecommerce",
  "pourquoi-ecom-billionaire",
  "quest-ce-pas-high-ticket",
  "ecommerce-high-ticket-principes",
  "erreurs-frequentes-ecommerce",
  "deleguer-marque-ecommerce",
  "construire-offre-forte-valeur",
  "bases-acquisition-publicitaire",
  "parcours-entrepreneurial-mehdi-ceo",
] as const;

export type BlogDraftSlug = (typeof blogDraftSlugs)[number];

export { videos, getVideoBySlug, getFeaturedVideos, getRelatedVideos } from "./videos";
export type { VideoRecord } from "./videos";
