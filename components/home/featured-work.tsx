"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { type Project, getFeaturedProjects } from "@/lib/projects";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function ProjectShowcase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const reversed = index % 2 === 1;

  useGSAP(
    () => {
      const container = containerRef.current;
      const image = imageRef.current;
      const content = contentRef.current;
      if (!container || !image || !content || reducedMotion) return;

      gsap.from(content, {
        autoAlpha: 0,
        x: reversed ? 48 : -48,
        duration: 0.85,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(image, {
        autoAlpha: 0,
        scale: 0.94,
        y: 32,
        duration: 0.9,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(image, {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion, reversed] },
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-10 lg:gap-16 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } lg:items-center`}
    >
      <div ref={contentRef} className="flex-1 lg:max-w-md xl:max-w-lg">
        <Tag>{project.category}</Tag>
        <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="mt-3 font-display text-xl font-semibold text-lilac">
            {project.tagline}
          </p>
        )}
        <p className="mt-5 text-lg leading-relaxed text-text-secondary">
          {project.description}
        </p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-white/70 transition-colors duration-150 ease-out hover:text-lilac"
        >
          View case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex-1">
        <Link
          href={`/work/${project.slug}`}
          className="group block focus-visible:outline-none"
        >
          <div
            ref={imageRef}
            className="relative aspect-[16/10] overflow-hidden rounded-card border border-border-dark shadow-2xl shadow-black/30 transition-[border-color] duration-300 ease-out group-hover:border-lilac/30 group-focus-visible:border-lilac/30"
          >
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : (
              <div
                className={`h-full w-full bg-gradient-to-br ${project.coverGradient}`}
                role="img"
                aria-label={`${project.title} cover`}
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

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
            <ProjectShowcase project={project} index={i} />
          </div>
        ))}
      </div>
    </Section>
  );
}
