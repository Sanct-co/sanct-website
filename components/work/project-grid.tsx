"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import {
  type Project,
  type ProjectCategory,
  projectCategories,
  projects,
} from "@/lib/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-card border border-border-light bg-white transition-[border-color,box-shadow] duration-150 ease-out hover:border-sanct-indigo/30 hover:shadow-lg focus-visible:border-sanct-indigo/30 focus-visible:shadow-lg"
    >
      <div
        className={`aspect-[3/2] bg-gradient-to-br ${project.coverGradient}`}
        role="img"
        aria-label={`${project.title} cover`}
      />
      <div className="p-7">
        <Tag variant="lilac">{project.category}</Tag>
        <h2 className="mt-3 font-display text-2xl font-bold text-near-black">
          {project.title}
        </h2>
        <p className="mt-2 text-base text-on-light-muted">{project.industry}</p>
        <p className="mt-4 text-base leading-relaxed text-on-light-muted">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">(
    "All",
  );

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`rounded-pill px-5 py-2.5 text-base font-bold transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac ${
              activeFilter === category
                ? "bg-sanct-indigo text-white"
                : "border border-border-light bg-white text-on-light-muted hover:border-sanct-indigo/30 hover:text-sanct-indigo"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {filtered.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-lg text-on-light-muted">
          No projects in this category yet.
        </p>
      )}
    </>
  );
}
