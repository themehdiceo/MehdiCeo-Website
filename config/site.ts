export const siteConfig = {
  name: "Mehdi CEO",
  legalName: "Mehdi CEO",
  alternateName: "Mehdi West",
  description:
    "Entrepreneur et fondateur d'Ecom Billionaire. Expert en e-commerce, marketing digital et création de business.",
  url: "https://mehdiceo.com",
  locale: "fr_FR",
  location: {
    city: "Marrakech",
    region: "Marrakech-Safi",
    country: "MA",
    countryName: "Maroc",
  },
  organization: {
    name: "Ecom Billionaire",
    foundedYear: 2023,
    type: "Education",
    url: "https://www.skool.com/ecom-billionaire-9293",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/mehdiwest",
    linkedinAlt: "https://ma.linkedin.com/in/mehdiceo",
    github: "https://github.com/MehdiCEO",
    skool: "https://www.skool.com/ecom-billionaire-9293",
    youtube: null as string | null,
    instagram: null as string | null,
  },
  education: {
    degree: "Licence en commerce international",
    institution: "Université Internationale de Rabat",
    institutionUrl: "https://www.linkedin.com/school/universit-internationale-de-rabat",
    startYear: 2020,
    endYear: 2022,
  },
} as const;

export const navigationItems = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
] as const;

export type NavigationItem = (typeof navigationItems)[number];
