const productionSiteUrl = "https://themehdiceo.com";

export const siteConfig = {
  name: "Mehdi CEO",
  brandHandle: "themehdiceo",
  legalName: "Mehdi CEO",
  description:
    "Site officiel de Mehdi CEO (@themehdiceo) — entrepreneur e-commerce, fondateur d'Ecom Billionaire et créateur de PAS High Ticket.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl,
  locale: "fr_FR",
  location: {
    country: "MA",
    countryName: "Maroc",
  },
  organization: {
    name: "Ecom Billionaire",
    type: "EducationalOrganization",
    /** Verified community URL — used as sameAs, not primary Organization url. */
    communityUrl: "https://www.skool.com/ecom-billionaire-9293",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/mehdiceo/",
    instagram: "https://www.instagram.com/themehdiceo/",
    youtube: "https://www.youtube.com/@themehdiceo",
  },
  ecomBillionaire: {
    maxParticipantsPerMonth: 5,
    revenueSharePercent: 10,
    upfrontFee: false,
  },
} as const;
