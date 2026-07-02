import { CtaBanner } from "@/components/ui/cta-banner";
import { HomePanels } from "@/components/home/home-panels";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { ServicesSnapshot } from "@/components/home/services-snapshot";
import { SocialProof } from "@/components/home/social-proof";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: site.name,
  description:
    "Sanct builds intuitive software that strips away complexity. Based in the Philippines, serving businesses across Southeast Asia.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HomePanels />
      <div className="relative z-30 bg-near-black">
        <ServicesSnapshot />
      </div>
      <SocialProof />
      <CtaBanner
        headline="Ready to build something that matters?"
        subtext="Tell us about your project. We'll respond within one business day."
      />
      <HomeContactSection />
    </>
  );
}
