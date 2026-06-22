import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { type Project } from "@/lib/projects";

export function CaseStudyContent({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  return (
    <>
      <section className="bg-near-black py-(--spacing-section-y) text-white">
        <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x)">
          <Reveal>
            <Tag>{project.category}</Tag>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl text-lilac">
              {project.client} · {project.industry}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-card border border-border-dark">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={`${project.title} hero visual`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  priority
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${project.coverGradient}`}
                  role="img"
                  aria-label={`${project.title} hero visual`}
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Section background="ghost">
        <div className="grid gap-14 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="space-y-14">
              <div>
                <h2 className="font-display text-3xl font-bold">Challenge</h2>
                <p className="mt-5 text-lg leading-relaxed text-on-light-muted">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold">Approach</h2>
                <p className="mt-5 text-lg leading-relaxed text-on-light-muted">
                  {project.approach}
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold">Outcome</h2>
                <p className="mt-5 text-lg leading-relaxed text-on-light-muted">
                  {project.outcome}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-1">
            <div className="rounded-card border border-border-light bg-white p-7">
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
                Technology
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-tag bg-sanct-indigo/5 px-3 py-1.5 text-base font-bold text-sanct-indigo"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {nextProject && (
        <Section background="dark">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
              Next Project
            </p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group mt-3 block"
            >
              <h2 className="font-display text-4xl font-extrabold transition-colors duration-150 ease-out group-hover:text-lilac md:text-5xl">
                {nextProject.title}
                <span className="ml-2 inline-block transition-transform duration-150 ease-out group-hover:translate-x-1">
                  →
                </span>
              </h2>
              <p className="mt-3 text-lg text-text-secondary">
                {nextProject.description}
              </p>
            </Link>
          </Reveal>
          <ButtonLink href="/work" variant="ghost" className="mt-10">
            Back to All Work
          </ButtonLink>
        </Section>
      )}
    </>
  );
}
