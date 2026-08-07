import { blogDraftSlugs } from "@/content";

export type BlogDraft = {
  slug: (typeof blogDraftSlugs)[number];
  published: false;
  titleKey: string;
};

export const blogDrafts: BlogDraft[] = blogDraftSlugs.map((slug) => ({
  slug,
  published: false as const,
  titleKey: slug,
}));

export const publishedBlogPosts: never[] = [];
