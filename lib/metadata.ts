import type { Metadata } from "next";
import { site } from "./site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanct.ph";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_PH",
      type: "website",
      images: [{ url: `${baseUrl}/sanct-logo.png`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [`${baseUrl}/sanct-logo.png`],
    },
  };
}

export { baseUrl };
