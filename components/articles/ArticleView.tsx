import { getMehdiImage } from "@/content/images/mehdi";
import { siteConfig } from "@/config/site";
import type { ArticleContent } from "@/content/articles/types";
import { MehdiImage } from "@/components/ui/MehdiImage";
import { CornerstoneLinks } from "@/components/articles/CornerstoneLinks";

type ArticleViewProps = {
  article: ArticleContent;
  imageAlt: string;
  imageTitle?: string;
  publishedLabel: string;
};

export function ArticleView({
  article,
  imageAlt,
  imageTitle,
  publishedLabel,
}: ArticleViewProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <p className="text-sm text-muted">
          {publishedLabel}{" "}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{article.intro}</p>
      </header>

      {article.heroImageId ? (
        <div className="mt-10">
          <MehdiImage
            imageId={article.heroImageId}
            alt={imageAlt}
            title={imageTitle}
            sizes="(max-width: 768px) 100vw, 720px"
            className="w-full"
          />
        </div>
      ) : null}

      <div className="mt-12 space-y-12">
        {article.sections.map((section) => (
          <section key={section.id} aria-labelledby={`section-${section.id}`}>
            <h2
              id={`section-${section.id}`}
              className="text-2xl font-semibold text-foreground"
            >
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <CornerstoneLinks currentSlug={article.slug} />
    </article>
  );
}

export function getArticleHeroImageUrl(
  article: ArticleContent,
): string | undefined {
  if (!article.heroImageId) return undefined;
  return `${siteConfig.url}${getMehdiImage(article.heroImageId).src}`;
}
