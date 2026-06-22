import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { team, values } from "@/lib/team";

export function MissionSection() {
  return (
    <Section background="indigo">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
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
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">Our Story</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-on-light-muted">
            <p>
              Sanct was founded in Philippines, not because it
              was trendy, but because it&apos;s home. We saw local businesses
              struggling with software that was either too expensive, too
              complicated, or simply not built for how people here actually work.
            </p>
            <p>
              We started Sanct with a simple conviction: technology should
              remove obstacles, not create them. Every product we build is
              designed to strip away unnecessary complexity and leave teams with
              clarity.
            </p>
            <p>
              Today we work with clients across the Philippines and Southeast
              Asia, from retail chains in Mindanao to hospitality brands in
              Siargao. Our roots keep us grounded. Our ambition keeps us
              reaching.
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

export function ValuesSection() {
  return (
    <Section background="dark">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
          Values
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
          How we work.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08}>
            <div className="rounded-card border border-border-dark p-7">
              <h3 className="font-display text-xl font-bold text-lilac">
                {value.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {value.description}
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
        <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
          Team
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
          The people behind Sanct.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.1}>
            <div className="text-center">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="112px"
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

export function PhilippinesSection() {
  return (
    <Section background="white">
      <Reveal>
        <p className="max-w-3xl text-xl leading-relaxed text-on-light-muted md:text-2xl">
          Proudly based in Philippines, building software
          for the Philippines and beyond. We understand local realities and
          build products that work in them.
        </p>
      </Reveal>
    </Section>
  );
}
