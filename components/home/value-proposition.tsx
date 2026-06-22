import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function ValueProposition() {
  return (
    <Section background="ghost">
      <Reveal>
        <p className="max-w-4xl font-display text-3xl font-extrabold leading-snug text-near-black md:text-4xl">
          Technology should disappear into the background. We design and build
          software that removes friction — so your team can think about the work,
          not the workflow.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-on-light-muted">
          Based in Oroquieta City, Philippines, Sanct partners with businesses
          across Southeast Asia who are tired of tools that create more problems
          than they solve. We strip away the unnecessary and leave only what
          earns its place.
        </p>
      </Reveal>
    </Section>
  );
}
