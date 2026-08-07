import { Link } from "@/lib/i18n/navigation";
import { routes } from "@/config/routes";

type ContentHubLink = {
  href: string;
  title: string;
  description: string;
};

type ContentHubProps = {
  title: string;
  intro: string;
  links: ContentHubLink[];
};

export function ContentHub({ title, intro, links }: ContentHubProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
      </header>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {links.map((link) => (
          <li
            key={link.href}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">
              <Link href={link.href} className="hover:text-accent">
                {link.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {link.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { routes };
