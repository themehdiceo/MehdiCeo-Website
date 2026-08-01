type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-2xl">
      <Tag
        id={id}
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
