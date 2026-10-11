import { ServicesCardsReveal } from "@/components/home/services-cards-reveal";
import { Section } from "@/components/ui/section";
import { TextSplit } from "@/components/ui/text-split";

export function ServicesSnapshot() {
  return (
    <Section id="services" background="dark">
      <ServicesCardsReveal
        heading={
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
                What We Do
              </p>
              <TextSplit
                text="Three ways we help teams move faster."
                as="h2"
                className="mt-3 font-display text-4xl font-extrabold leading-[1.05] md:text-5xl"
                stagger={0.05}
                scrollStart="top 85%"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary lg:pb-1 lg:text-right">
              We scope projects around real problems and ship software that
              earns its place.
            </p>
          </div>
        }
      />
    </Section>
  );
}
