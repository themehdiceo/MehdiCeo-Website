import { SectionHeading } from "@/components/ui/SectionHeading";

type ArticleTemplateProps = {
  title: string;
  description: string;
  publishedAt?: string;
  children: React.ReactNode;
};

export function ArticleTemplate({
  title,
  description,
  publishedAt,
  children,
}: ArticleTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {publishedAt ? (
          <time
            dateTime={publishedAt}
            className="mt-4 block text-sm text-muted"
          >
            {publishedAt}
          </time>
        ) : null}
        <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>
      </header>
      <div className="prose prose-neutral mt-10 max-w-none">{children}</div>
    </article>
  );
}

type VideoSummaryTemplateProps = {
  title: string;
  description: string;
  videoUrl: string;
  sourceLabel: string;
  children: React.ReactNode;
};

export function VideoSummaryTemplate({
  title,
  description,
  videoUrl,
  sourceLabel,
  children,
}: VideoSummaryTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>
        <p className="mt-4 text-sm">
          <a
            href={videoUrl}
            className="text-accent underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {sourceLabel}
          </a>
        </p>
      </header>
      <div className="mt-10 space-y-4 text-base leading-relaxed text-muted">
        {children}
      </div>
    </article>
  );
}

type BusinessGuideTemplateProps = {
  title: string;
  summary: string;
  sections: Array<{ title: string; content: string }>;
};

export function BusinessGuideTemplate({
  title,
  summary,
  sections,
}: BusinessGuideTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{summary}</p>
      </header>
      {sections.map((section) => (
        <section key={section.title} className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">
            {section.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {section.content}
          </p>
        </section>
      ))}
    </article>
  );
}

type InterviewTemplateProps = {
  title: string;
  guest: string;
  intro: string;
  highlights: string[];
};

export function InterviewTemplate({
  title,
  guest,
  intro,
  highlights,
}: InterviewTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-4 text-sm font-medium text-accent">{guest}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
      </header>
      <SectionHeading as="h2" title="Points clés" />
      <ul className="list-disc space-y-3 ps-5 text-muted">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

type CaseStudyTemplateProps = {
  title: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
};

export function CaseStudyTemplate({
  title,
  context,
  challenge,
  approach,
  outcome,
}: CaseStudyTemplateProps) {
  const blocks = [
    { label: "Contexte", content: context },
    { label: "Défi", content: challenge },
    { label: "Approche", content: approach },
    { label: "Résultat", content: outcome },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {blocks.map((block) => (
        <section key={block.label} className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">
            {block.label}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {block.content}
          </p>
        </section>
      ))}
    </article>
  );
}
