export const routes = {
  home: "/",
  about: "/a-propos",
  journey: "/parcours",
  ecomBillionaire: "/ecom-billionaire",
  pasHighTicket: "/pas-high-ticket",
  expertise: "/expertise",
  resources: "/ressources",
  videos: "/videos",
  faq: "/faq",
  contact: "/contact",
  blog: "/blog",
  legal: "/mentions-legales",
  privacy: "/politique-de-confidentialite",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export function videoRoute(slug: string): string {
  return `${routes.videos}/${slug}`;
}

export function articleRoute(slug: string): string {
  return `${routes.blog}/${slug}`;
}

export const primaryNavigation = [
  { href: routes.home, labelKey: "home" },
  { href: routes.about, labelKey: "about" },
  { href: routes.journey, labelKey: "journey" },
  { href: routes.ecomBillionaire, labelKey: "ecomBillionaire" },
  { href: routes.pasHighTicket, labelKey: "pasHighTicket" },
  { href: routes.videos, labelKey: "videos" },
  { href: routes.faq, labelKey: "faq" },
  { href: routes.contact, labelKey: "contact" },
] as const;

export const secondaryNavigation = [
  { href: routes.expertise, labelKey: "expertise" },
  { href: routes.resources, labelKey: "resources" },
  { href: routes.blog, labelKey: "blog" },
] as const;

export const footerLegalNavigation = [
  { href: routes.legal, labelKey: "legal" },
  { href: routes.privacy, labelKey: "privacy" },
] as const;

/** Routes included in sitemap.xml — excludes noindexed placeholder pages (/ressources). */
export const sitemapRoutes = [
  routes.home,
  routes.about,
  routes.journey,
  routes.ecomBillionaire,
  routes.pasHighTicket,
  routes.expertise,
  routes.videos,
  routes.faq,
  routes.contact,
  routes.blog,
  routes.legal,
  routes.privacy,
] as const;
