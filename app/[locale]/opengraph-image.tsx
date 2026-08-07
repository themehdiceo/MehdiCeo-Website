import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";

export const alt = `${siteConfig.name} — ${siteConfig.brandHandle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy: Record<
  Locale,
  { tagline: string; subtitle: string }
> = {
  fr: {
    tagline: "Entrepreneur e-commerce",
    subtitle: "Ecom Billionaire · PAS High Ticket",
  },
  ar: {
    tagline: "رائد أعمال في التجارة الإلكترونية",
    subtitle: "Ecom Billionaire · PAS High Ticket",
  },
};

type OgImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OgImageProps) {
  const { locale } = await params;
  const localeKey = (locale === "ar" ? "ar" : "fr") as Locale;
  const text = copy[localeKey];
  const isRtl = localeKey === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0f0f0f 0%, #1a1510 55%, #2a2015 100%)",
          color: "#f5f0e8",
          fontFamily: "system-ui, sans-serif",
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c9a962",
            marginBottom: 24,
          }}
        >
          @{siteConfig.brandHandle}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, color: "#d4cbb8", marginBottom: 12 }}>
          {text.tagline}
        </div>
        <div style={{ fontSize: 26, color: "#9a9080" }}>{text.subtitle}</div>
      </div>
    ),
    { ...size },
  );
}
