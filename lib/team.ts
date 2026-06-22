export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  initials: string;
  gradient: string;
};

export const team: TeamMember[] = [
  {
    name: "Marco Reyes",
    title: "Founder & Lead Engineer",
    bio: "Ten years building software across fintech and logistics. Believes the best code is the code you don't have to think about.",
    initials: "MR",
    gradient: "from-[#2C1FA8] to-[#A09CF5]",
  },
  {
    name: "Isabel Santos",
    title: "Product Designer",
    bio: "Former agency designer who got tired of beautiful interfaces nobody could use. Now obsessed with making complex things feel simple.",
    initials: "IS",
    gradient: "from-[#3D35B0] to-[#111015]",
  },
  {
    name: "Daniel Cruz",
    title: "Full-Stack Developer",
    bio: "Ships fast without cutting corners. Specializes in React, Node, and the unglamorous backend work that keeps products running.",
    initials: "DC",
    gradient: "from-[#111015] to-[#2C1FA8]",
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
