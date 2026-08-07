import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageShellProps = {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

export function PageShell({
  children,
  breadcrumbs,
  structuredData,
}: PageShellProps) {
  return (
    <>
      {structuredData ? <JsonLd data={structuredData} /> : null}
      <Header />
      <main id="main-content" className="flex-1">
        {breadcrumbs ? (
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        {children}
      </main>
      <Footer />
    </>
  );
}
