"use client";

import { ButtonLink } from "@/components/ui/button";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <Section id="work" background="dark" className="!pb-24 md:!pb-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <Tag>Real Work, Real Results</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
            Projects that speak for themselves.
          </h2>
        </Reveal>
        {/* <Reveal delay={0.1}>
          <ButtonLink href="/work" variant="ghost">
            SEE MORE
          </ButtonLink>
        </Reveal> */}
      </div>

      <div className="mt-16 flex flex-col gap-8 md:mt-20 md:gap-10">
        {featured.map((project, i) => (
          <FeaturedProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
