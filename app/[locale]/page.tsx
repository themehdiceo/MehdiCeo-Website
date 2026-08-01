import { setRequestLocale, getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { FrameworkSection } from "@/components/sections/FrameworkSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createFaqSchema,
  createPersonSchema,
  createWebSiteSchema,
} from "@/seo";
import { faqIds, expertiseIds } from "@/content";
import { createPageMetadata } from "@/seo/metadata";
import type { Locale } from "@/types";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    namespace: "Metadata.home",
    path: "",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata.home" });
  const tFaq = await getTranslations({ locale, namespace: "Faq" });
  const tExpertise = await getTranslations({ locale, namespace: "Expertise" });

  const faqItems = faqIds.map((id) => ({
    question: tFaq(`${id}.question`),
    answer: tFaq(`${id}.answer`),
  }));

  const knowsAbout = expertiseIds.map((id) =>
    tExpertise(`${id}.title`),
  );

  const structuredData = [
    createWebSiteSchema({
      locale,
      description: tMeta("description"),
    }),
    createPersonSchema({
      locale,
      description: tMeta("description"),
      jobTitle: tMeta("jobTitle"),
      knowsAbout,
    }),
    createFaqSchema(faqItems),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutPreviewSection />
        <ExpertiseSection />
        <TimelineSection />
        <FrameworkSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
