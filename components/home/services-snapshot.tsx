import { ServicesCardsReveal } from "@/components/home/services-cards-reveal";
import { Section } from "@/components/ui/section";
import { TextSplit } from "@/components/ui/text-split";

export function ServicesSnapshot() {
  return (
    <Section id="services" background="dark">
      <ServicesCardsReveal
        heading={
          <>
            <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
              What We Do
            </p>
            <TextSplit
              text="Three ways we help teams move faster."
              as="h2"
              className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl"
              stagger={0.05}
              scrollStart="top 85%"
            />
          </>
        }
      />
    </Section>
  );
}
