"use client";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <Section background="dark" className="!pb-24 md:!pb-32">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <Tag>WORKS & RESULTS</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
            Projects that speak for themselves.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ButtonLink href="/work" variant="ghost">
            SEE MORE
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
        {featured.map((project, i) => (
          <div key={project.slug}>
            {i > 0 && (
              <Reveal>
                <div
                  className="mb-24 h-px bg-border-dark md:mb-32"
                  aria-hidden="true"
                />
              </Reveal>
            )}
            <ProjectShowcase project={project} index={i} theme="dark" />
          </div>
        ))}
      </div>
    </Section>
  );
}
