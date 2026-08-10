import {
  JoinTeamSection,
  MissionSection,
  PhilippinesSection,
  PhilosophySection,
  StorySection,
  TeamSection,
  // ValuesSection,
} from "@/components/about/about-sections";
import { CtaBanner } from "@/components/ui/cta-banner";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about Sanct: our mission, story, values, and the team building software that strips away complexity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <MissionSection />
      <StorySection />
      <PhilosophySection />
      <TeamSection />
      <PhilippinesSection />
      <JoinTeamSection />
      <CtaBanner
        headline="Want to work with us?"
        subtext="We're always open to conversations with people who care about craft."
      />
    </>
  );
}
