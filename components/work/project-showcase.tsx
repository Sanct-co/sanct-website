"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Tag } from "@/components/ui/tag";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { type Project } from "@/lib/projects";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  theme?: "dark" | "light";
};

const themes = {
  dark: {
    description: "text-lg leading-relaxed text-text-secondary",
    meta: "mt-4 text-base text-text-secondary",
    link: "mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-white/70 transition-colors duration-150 ease-out hover:text-lilac",
    image:
      "relative aspect-[16/10] overflow-hidden rounded-card border border-border-dark shadow-2xl shadow-black/30 transition-[border-color] duration-300 ease-out group-hover:border-lilac/30 group-focus-visible:border-lilac/30",
  },
  light: {
    description: "text-lg leading-relaxed text-on-light-muted",
    meta: "mt-4 text-base text-on-light-muted/80",
    link: "mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-sanct-indigo transition-colors duration-150 ease-out hover:text-indigo-mid",
    image:
      "relative aspect-[16/10] overflow-hidden rounded-card border border-border-light bg-ghost-indigo shadow-lg shadow-sanct-indigo/5 transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-sanct-indigo/30 group-hover:shadow-xl group-focus-visible:border-sanct-indigo/30",
  },
};

export function ProjectShowcase({
  project,
  index,
  theme = "dark",
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const reversed = index % 2 === 1;
  const styles = themes[theme];

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
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-inherit md:text-4xl">
          {project.title}
        </h2>
        {project.tagline && (
          <p className="mt-3 font-display text-xl font-semibold text-lilac">
            {project.tagline}
          </p>
        )}
        <p className={`mt-5 ${styles.description}`}>{project.description}</p>
        <p className={styles.meta}>
          {project.client} · {project.industry}
        </p>
        <Link href={`/work/${project.slug}`} className={styles.link}>
          View case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex-1">
        <Link
          href={`/work/${project.slug}`}
          className="group block focus-visible:outline-none"
        >
          <div ref={imageRef} className={styles.image}>
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
