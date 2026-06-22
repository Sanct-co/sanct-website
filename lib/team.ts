export type TeamMember = {
  name: string;
  title: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Deo Talip",
    title: "Founder & CEO",
    image: "/profiles/deo.jpg",
  },
  {
    name: "KC Ajero",
    title: "CTO",
    image: "/profiles/kc.png",
  },
  {
    name: "Tristan James Tolentino",
    title: "DevOps & Security Analyst",
    image: "/profiles/tristan.png",
  },
  {
    name: "Jether Omictin",
    title: "Senior Software Engineer",
    image: "/profiles/jether.png",
  },
];

export const values = [
  {
    title: "Simplicity over spectacle",
    description:
      "We remove before we add. Every screen, every feature, every line of copy must justify its existence.",
  },
  {
    title: "Built for real people",
    description:
      "We talk to the people who'll use the software — not just the people who sign the checks.",
  },
  {
    title: "Honest craftsmanship",
    description:
      "We tell you what's possible, what's not, and what it'll actually take. No overselling, no scope creep.",
  },
  {
    title: "Rooted in the Philippines",
    description:
      "We understand local constraints — connectivity, budgets, workflows — and build software that works here, not just in Silicon Valley demos.",
  },
];
