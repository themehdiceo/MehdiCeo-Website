import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Shared favicon / PWA icon metadata for all pages. */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
};

export const siteManifest = "/site.webmanifest";

export const webManifest = {
  name: siteConfig.name,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: "/",
  display: "standalone" as const,
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
