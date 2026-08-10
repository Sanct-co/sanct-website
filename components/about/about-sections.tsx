import Image from "next/image";

import { ValueCard } from "@/components/about/value-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { team, values } from "@/lib/team";

export function MissionSection() {
  return (
    <Section background="indigo">
      <Reveal>
        <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          Our Mission
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
          Give people mental space to focus on what truly matters.
        </h2>
      </Reveal>
    </Section>
  );
}

export function StorySection() {
  return (
    <Section background="ghost">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Our Company
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-on-light-muted">
            <p>
              Whether you’re a growing small or medium-sized business looking to
              automate repetitive processes, or a larger organization seeking to
              modernize your systems, we deliver practical technology solutions
              designed around your unique needs. We combine technical expertise,
              innovative thinking, and a deep understanding of business
              operations to create solutions that deliver measurable value.
            </p>
            <p>
              We started Sanct with a simple conviction: technology should
              remove obstacles, not create them. Every product we build is
              designed to strip away unnecessary complexity and leave teams with
              clarity.
            </p>
            <p>
              Today we work with clients across the Philippines and US, from
              custom erp systems in Mindanao to product brands in US. Our roots
              keep us grounded. Our ambition keeps us reaching.
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <Image
          src="/company-pic2.jpg"
          alt="Sanct team"
          width={0}
          height={0}
          sizes="100vw"
          className="mt-14 w-full h-auto rounded-2xl mx-auto"
        />
      </Reveal>
    </Section>
  );
}

// export function ValuesSection() {
//   return (
//     <Section background="dark">
//       <Reveal>
//         <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
//           Values
//         </p>
//         <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
//           How we work.
//         </h2>
//       </Reveal>
//       <div className="mt-14 grid gap-8 sm:grid-cols-2">
//         {values.map((value, i) => (
//           <Reveal key={value.title} delay={i * 0.08}>
//             <ValueCard title={value.title} description={value.description} />
//           </Reveal>
//         ))}
//       </div>
//     </Section>
//   );
// }

const virtues = [
  {
    greek: "Areté",
    name: "Areté",
    tagline: "Build technology with excellence.",
    description:
      "We pursue mastery in our craft and take responsibility for the quality of what we create.",
  },
  {
    greek: "Dignity",
    name: "Dignity",
    tagline: "Never lose sight of the people it serves.",
    description:
      "We build technology to elevate people, remove unnecessary burdens, and give them more freedom to do meaningful work.",
  },
  {
    greek: "Phrónēsis",
    name: "Phrónēsis",
    tagline: "Use technology with wisdom.",
    description:
      "We choose what is useful over what is fashionable, what is meaningful over what is merely possible, and what creates lasting value over unnecessary complexity.",
  },
];

export function PhilosophySection() {
  return (
    <Section background="dark">
      <Reveal>
        <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          Our Philosophy
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-snug md:text-3xl">
          Build technology with excellence. Use it with wisdom. And never lose
          sight of the people it serves.
        </h2>
        <p className="mt-8 font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          The Three Virtues
        </p>
        <p className="mt-2 font-display text-lg font-bold tracking-widest text-white">
          <span className="text-lilac">ΑΡΕΤΗ</span>
          {" · "}
          DIGNITY
          {" · "}
          <span className="text-lilac">ΦΡΟΝΗΣΙΣ</span>
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {virtues.map((virtue, i) => (
          <Reveal key={virtue.greek} delay={i * 0.08} className="h-full">
            <div className="h-full rounded-card border border-border-dark bg-dark-surface p-7">
              <p className="font-display text-3xl font-extrabold text-lilac">
                {virtue.greek}
              </p>
              <p className="mt-4 text-base font-bold text-white">
                {virtue.tagline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {virtue.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function TeamSection() {
  return (
    <Section background="ghost">
      <Reveal>
        <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          Team
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold md:text-5xl">
          Meet the people behind Sanct.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-on-light-muted">
          A team of A+ players, obsessed with craft and committed to excellence.
        </p>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.1}>
            <div className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-sanct-indigo/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="scale-90 object-cover transition-transform duration-500 group-hover:scale-95"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">
                {member.name}
              </h3>
              <p className="text-base text-lilac">{member.title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function JoinTeamSection() {
  return (
    <Section background="white">
      <Reveal>
        <div className="relative overflow-hidden rounded-card bg-linear-to-br from-sanct-indigo via-lilac/60 to-white px-8 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-sanct-indigo">
                Join The Team
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight text-near-black sm:text-4xl">
                Grow with us, thrive as you
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-on-light-muted">
                We welcome both new talent and experienced professionals who are
                passionate about entrepreneurship. You&apos;ll build on your
                strengths and grow toward your goals. This journey is about your
                ambitions and who you aspire to become.
              </p>
              <ButtonLink href="/contact" variant="primary" className="mt-8">
                Join Now
              </ButtonLink>
            </div>
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/company-pic.jpg"
                alt="The Sanct team"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function PhilippinesSection() {
  return (
    <Section background="white">
      <Reveal>
        <p className="max-w-3xl text-xl leading-relaxed text-on-light-muted md:text-2xl">
          Proudly based in Philippines, building software for the Philippines
          and beyond. We understand local realities and build products that work
          in them.
        </p>
      </Reveal>
    </Section>
  );
}
