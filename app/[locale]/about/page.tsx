import { setRequestLocale, getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/sections/AboutContent";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createProfilePageSchema,
} from "@/seo";
import { createPageMetadata } from "@/seo/metadata";
import type { Locale } from "@/types";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.about",
    path: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata.about" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  const structuredData = [
    createProfilePageSchema({
      locale,
      description: tMeta("description"),
    }),
    createBreadcrumbSchema(locale, [
      { name: tNav("home"), path: "" },
      { name: tNav("about"), path: "/about" },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
