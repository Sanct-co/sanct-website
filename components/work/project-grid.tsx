"use client";

import { Reveal } from "@/components/ui/reveal";
import { ProjectShowcase } from "@/components/work/project-showcase";
import { projects } from "@/lib/projects";

export function ProjectGrid() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {projects.map((project, i) => (
        <div key={project.slug}>
          {i > 0 && (
            <Reveal>
              <div
                className="mb-24 h-px bg-border-light md:mb-32"
                aria-hidden="true"
              />
            </Reveal>
          )}
          <ProjectShowcase project={project} index={i} theme="light" />
        </div>
      ))}
    </div>
  );
}
