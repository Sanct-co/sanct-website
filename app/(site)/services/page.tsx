import { ServiceList, ServicesIntro } from "@/components/services/service-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Custom software development, product design, technical consulting, and internal tools built for simplicity.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesIntro />
      <Section background="white">
        <ServiceList />
      </Section>
      <CtaBanner
        headline="Not sure which service fits?"
        subtext="Tell us about your situation, and we'll point you in the right direction."
        ctaLabel="Get in Touch"
      />
    </>
  );
}
