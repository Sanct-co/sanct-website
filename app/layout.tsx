import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { IntroProvider } from "@/components/providers/intro-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { baseUrl } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  icons: {
    icon: "/sanct-fav.png",
    apple: "/sanct-fav.png",
  },
  openGraph: {
    siteName: site.name,
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-env={process.env.NODE_ENV}
      className={`${plusJakartaSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} h-full`}
      suppressHydrationWarning
    >
      <head />
      <body className="flex min-h-full flex-col font-body antialiased">
        <div id="intro-fallback" aria-hidden="true" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
        <IntroProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
