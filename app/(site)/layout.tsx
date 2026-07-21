import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { IntroProvider } from "@/components/providers/intro-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div id="intro-fallback" aria-hidden="true" suppressHydrationWarning />
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      <IntroProvider>
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTopButton />
        </SmoothScrollProvider>
      </IntroProvider>
    </>
  );
}
