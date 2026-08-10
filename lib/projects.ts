export type ProjectCategory =
  | "Web App"
  | "Mobile"
  | "Branding"
  | "Internal Tools";

export type Project = {
  slug: string;
  title: string;
  tagline?: string;
  client: string;
  industry: string;
  category: ProjectCategory;
  description: string;
  featured: boolean;
  coverImage?: string;
  coverGradient: string;
  challenge: string;
  approach: string;
  outcome: string;
  projectTypes: string[];
};

export const projects: Project[] = [
  {
    slug: "depedmps",
    title: "DEPEDMPS — A Digital MPS Infrastructure for DepEd",
    client: "DepEd Misamis Occidental",
    industry: "Education",
    category: "Web App",
    description:
      "A centralized MPS platform purpose-built for DepEd, streamlining score encoding, automating MPS calculations and item analysis, reducing manual workload, and providing a clear view of performance across schools, districts, and the entire division.",
    featured: true,
    coverImage: "/video/depedmps_vid.gif",
    coverGradient: "from-[#1a237e] to-[#3D35B0]",
    challenge:
      "Schools and division offices tracked Mean Percentage Scores across disconnected spreadsheets and paper forms, making it hard to compare performance or spot trends early.",
    approach:
      "We built a single workspace shaped around how DepEd divisions and schools actually encode scores, manage sections, and review results without fighting existing workflows.",
    outcome:
      "Teams can encode learner scores with clear section context and review division-wide performance from one place instead of reconciling multiple files.",
    projectTypes: ["Performance Dashboard", "Internal Tool", "Data Management"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
