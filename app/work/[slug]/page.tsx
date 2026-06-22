import { notFound } from "next/navigation";
import { CaseStudyContent } from "@/components/work/case-study-content";
import { CtaBanner } from "@/components/ui/cta-banner";
import { createMetadata } from "@/lib/metadata";
import { getNextProject, getProject, projects } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return (
    <>
      <CaseStudyContent project={project} nextProject={nextProject} />
      <CtaBanner
        headline="Want results like these?"
        subtext="Let's talk about your project."
      />
    </>
  );
}
