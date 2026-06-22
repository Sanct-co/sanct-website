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
  technologies: string[];
};

export const projects: Project[] = [
  {
    slug: "depedmps",
    title: "Mean Percentage Score monitoring for schools and divisions",
    client: "DepEd Misamis Occidental",
    industry: "Education",
    category: "Web App",
    description:
      "A single workspace for encoding scores, managing sections, and reviewing performance across schools—aligned with how DepEd divisions and schools actually operate.",
    featured: true,
    coverImage: "/projects/depedmps.png",
    coverGradient: "from-[#1a237e] to-[#3D35B0]",
    challenge:
      "Schools and division offices tracked Mean Percentage Scores across disconnected spreadsheets and paper forms, making it hard to compare performance or spot trends early.",
    approach:
      "We built a single workspace shaped around how DepEd divisions and schools actually encode scores, manage sections, and review results—without fighting existing workflows.",
    outcome:
      "Teams can encode learner scores with clear section context and review division-wide performance from one place instead of reconciling multiple files.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "shrimpsense",
    title: "ShrimpSense",
    tagline: "Smarter farming, healthier shrimp.",
    client: "ShrimpSense",
    industry: "Aquaculture",
    category: "Web App",
    description:
      "Optimize shrimp health, growth, and disease prevention with our AI-driven water quality monitoring system. Ensure a sustainable and efficient farming experience with real-time insights.",
    featured: true,
    coverImage: "/projects/shrimp.png",
    coverGradient: "from-[#0ea5e9] to-[#2563eb]",
    challenge:
      "Shrimp farmers relied on manual water testing and reactive interventions, often catching water quality issues only after stock health had already declined.",
    approach:
      "We designed a monitoring platform that surfaces pH, temperature, oxygen, and salinity in real time—with clear thresholds and trends farmers can act on before problems spread.",
    outcome:
      "Farmers get a live view of pond conditions and health signals in one dashboard, reducing guesswork and supporting earlier, more confident decisions.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
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
