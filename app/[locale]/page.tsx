import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EcomBillionaireSection } from "@/components/sections/EcomBillionaireSection";
import { PasHighTicketSection } from "@/components/sections/PasHighTicketSection";
import { VideoPreviewSection } from "@/components/sections/VideoPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  createFaqSchema,
  createPersonSchema,
  createWebSiteSchema,
} from "@/seo";
import { homepageFaqIds, expertiseIds } from "@/content";
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

  const faqItems = homepageFaqIds.map((id) => ({
    question: tFaq(`${id}.question`),
    answer: tFaq(`${id}.answer`),
  }));

  const knowsAbout = [
    "E-commerce",
    "Ecom Billionaire",
    "PAS High Ticket",
    ...expertiseIds.map((id) => tExpertise(`${id}.title`)),
  ];

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
    <PageShell structuredData={structuredData}>
      <HeroSection />
      <IntroSection />
      <TimelineSection preview />
      <EcomBillionaireSection />
      <PasHighTicketSection />
      <VideoPreviewSection />
      <FaqSection limit={4} />
    </PageShell>
  );
}
