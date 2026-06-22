import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/services";

export function ServiceList() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-transparent via-sanct-indigo/25 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="flex flex-col">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08}>
            <article className="group relative grid gap-8 border-b border-border-light py-14 last:border-b-0 lg:grid-cols-[5rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
              <div className="flex items-start gap-5 lg:flex-col lg:items-end lg:gap-3 lg:pt-2">
                <span className="font-display text-5xl font-extrabold leading-none tracking-tighter text-sanct-indigo/12 transition-colors duration-300 group-hover:text-sanct-indigo/25 md:text-6xl lg:text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="mt-3 hidden h-2.5 w-2.5 shrink-0 rounded-full bg-sanct-indigo ring-4 ring-white transition-transform duration-300 group-hover:scale-125 lg:block"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
                  {service.name}
                </h2>

                <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-12 lg:mt-10">
                  <p className="text-lg leading-relaxed text-on-light-muted">
                    {service.description}
                  </p>

                  <div className="relative md:pl-10">
                    <div
                      className="absolute left-0 top-1 hidden h-full w-px bg-gradient-to-b from-sanct-indigo/40 via-lilac/30 to-transparent md:block"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-sanct-indigo">
                      Ideal for
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-on-light-muted">
                      {service.idealClient}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
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
