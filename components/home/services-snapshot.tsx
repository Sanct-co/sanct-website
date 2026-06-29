import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextSplit } from "@/components/ui/text-split";
import { services } from "@/lib/services";

export function ServicesSnapshot() {
  return (
    <Section background="dark">
      <Reveal>
        <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          What We Do
        </p>
      </Reveal>
      <TextSplit
        text="Four ways we help teams move faster."
        as="h2"
        className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl"
        stagger={0.05}
        scrollStart="top 85%"
      />

      <div className="mt-14  lg:mt-16">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <article className="group grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,2fr)] lg:items-baseline lg:gap-12 lg:py-18">
              <span className="font-display text-2xl font-extrabold text-white/15 transition-colors duration-300 group-hover:text-lilac/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold leading-snug md:text-2xl">
                {service.name}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary sm:col-span-2 lg:col-span-1">
                {service.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <ButtonLink href="/services" variant="ghost" className="mt-12">
          Explore Services
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
