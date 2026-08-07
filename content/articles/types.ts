import type { MehdiImageId } from "@/content/images/mehdi";

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type ArticleContent = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  publishedAt: string;
  modifiedAt: string;
  heroImageId?: MehdiImageId;
  sections: ArticleSection[];
};
