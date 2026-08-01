export const timelineEventIds = [
  "education",
  "entrepreneurship",
  "ecom-billionaire",
  "public-content",
] as const;

export type TimelineEventId = (typeof timelineEventIds)[number];

export const timelineEvents: ReadonlyArray<{
  id: TimelineEventId;
  year: string;
  endYear?: string;
}> = [
  { id: "education", year: "2020", endYear: "2022" },
  { id: "entrepreneurship", year: "[À compléter]" },
  { id: "ecom-billionaire", year: "2023" },
  { id: "public-content", year: "2024" },
];

export const expertiseIds = [
  "ecommerce",
  "digital-marketing",
  "entrepreneurship",
  "business-building",
  "learning-systems",
] as const;

export type ExpertiseId = (typeof expertiseIds)[number];

export const faqIds = [
  "who-is-mehdi",
  "what-is-ecom-billionaire",
  "expertise-areas",
  "where-based",
  "how-to-contact",
] as const;

export type FaqId = (typeof faqIds)[number];

export const learningFrameworkSteps = [
  "choose",
  "consume",
  "consolidate",
  "confront",
] as const;

export type LearningFrameworkStepId =
  (typeof learningFrameworkSteps)[number];
