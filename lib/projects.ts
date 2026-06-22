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

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Web App",
  "Mobile",
  "Branding",
  "Internal Tools",
];

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
  {
    slug: "retailflow",
    title: "RetailFlow",
    client: "MetroMart PH",
    industry: "Retail",
    category: "Web App",
    description:
      "Inventory and sales dashboard that replaced three spreadsheets with one clear view.",
    featured: false,
    coverGradient: "from-[#2C1FA8] to-[#A09CF5]",
    challenge:
      "MetroMart was running inventory, sales, and supplier orders across disconnected spreadsheets. Staff spent hours reconciling numbers instead of serving customers.",
    approach:
      "We mapped every workflow on the ground in Oroquieta before writing a line of code. The interface mirrors how store managers already think — aisle by aisle, shift by shift — with real-time sync across branches.",
    outcome:
      "Stock reconciliation time dropped from 4 hours to 20 minutes per branch. Managers now spot low-stock items before they become lost sales.",
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "fieldtrack",
    title: "FieldTrack",
    client: "SwiftLogistics",
    industry: "Logistics",
    category: "Mobile",
    description:
      "Offline-first delivery app for riders navigating patchy connectivity in rural Mindanao.",
    featured: false,
    coverGradient: "from-[#111015] to-[#3D35B0]",
    challenge:
      "Delivery riders lost hours each week when connectivity dropped mid-route. Paper logs created billing disputes and angry customers.",
    approach:
      "We built an offline-first mobile app that queues updates locally and syncs when signal returns. GPS tracking, proof-of-delivery photos, and customer signatures work without a data connection.",
    outcome:
      "On-time delivery rate improved by 28%. Billing disputes fell to near zero within the first quarter after launch.",
    technologies: ["React Native", "SQLite", "Node.js", "AWS"],
  },
  {
    slug: "brandkit",
    title: "BrandKit",
    client: "Haven Co.",
    industry: "Hospitality",
    category: "Branding",
    description:
      "Complete brand identity and digital presence for a boutique resort launching in Siargao.",
    featured: false,
    coverGradient: "from-[#A09CF5] to-[#F5F4FF]",
    challenge:
      "Haven Co. needed a cohesive brand before opening — logo, color system, website, and booking flow — all within a six-week deadline.",
    approach:
      "We started with the guest experience, not the logo. Every design decision — typography, photography direction, booking UX — reinforced the feeling of arriving somewhere unhurried.",
    outcome:
      "The resort opened with a fully booked first month. Direct bookings through the site accounted for 60% of reservations, reducing OTA commission costs.",
    technologies: ["Figma", "Next.js", "Sanity CMS", "Stripe"],
  },
  {
    slug: "opsdesk",
    title: "OpsDesk",
    client: "AgriSource",
    industry: "Agriculture",
    category: "Internal Tools",
    description:
      "Internal operations hub connecting procurement, warehouse, and field teams in one place.",
    featured: false,
    coverGradient: "from-[#3D35B0] to-[#111015]",
    challenge:
      "AgriSource's procurement, warehouse, and field teams used separate tools that never talked to each other. Orders got lost. Shipments arrived late.",
    approach:
      "We built a single internal dashboard with role-based views. Procurement sees supplier pipelines. Warehouse sees incoming stock. Field teams see what's available at each depot — updated in real time.",
    outcome:
      "Order processing time cut by 45%. The operations team eliminated two redundant software subscriptions in the first month.",
    technologies: ["React", "Supabase", "TypeScript", "Railway"],
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
