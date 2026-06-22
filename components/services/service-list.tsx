import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/services";

export function ServiceList() {
  return (
    <div className="space-y-10">
      {services.map((service, i) => (
        <Reveal key={service.id} delay={i * 0.08}>
          <article className="rounded-card border border-border-light bg-white p-9">
            <h2 className="font-display text-3xl font-bold text-near-black">
              {service.name}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-on-light-muted">
              {service.description}
            </p>
            <p className="mt-5 text-base">
              <span className="font-bold text-sanct-indigo">Ideal for: </span>
              <span className="text-on-light-muted">{service.idealClient}</span>
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function ServicesIntro() {
  return (
    <Section background="dark">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
          Services
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl">
          We build what your business actually needs.
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-text-secondary md:text-xl">
          No bloated proposals. No features you&apos;ll never use. We scope
          projects around real problems and ship software that earns its place.
        </p>
      </Reveal>
    </Section>
  );
}
