import { ProjectGrid } from "@/components/work/project-grid";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Work",
  description:
    "Selected projects and case studies from Sanct — web apps, mobile, branding, and internal tools.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that earns its place."
        description="Real projects for real businesses. Filter by category or dive into a case study."
      />
      <Section background="ghost">
        <ProjectGrid />
      </Section>
      <CtaBanner
        headline="Have a project in mind?"
        subtext="We'd love to hear what you're building."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
