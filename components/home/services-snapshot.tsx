import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/services";

export function ServicesSnapshot() {
  return (
    <Section background="dark">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
          What We Do
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl">
          Four ways we help teams move faster.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <div className="rounded-card border border-border-dark bg-white/5 p-7 backdrop-blur-sm">
              <h3 className="font-display text-xl font-bold">{service.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {service.description}
              </p>
            </div>
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
