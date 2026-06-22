export type Service = {
  id: string;
  name: string;
  description: string;
  idealClient: string;
};

export const services: Service[] = [
  {
    id: "custom-software",
    name: "Custom Software Development",
    description:
      "We build web and mobile applications from the ground up, scoped to your actual workflows, not a template. Every feature earns its place.",
    idealClient:
      "Businesses ready to replace spreadsheets, legacy systems, or off-the-shelf tools that don't fit.",
  },
  {
    id: "product-design",
    name: "Product Design & UX",
    description:
      "Interfaces that feel obvious the first time someone uses them. We design for clarity, not complexity, from wireframes through to production-ready UI.",
    idealClient:
      "Teams with a product vision who need design partners that prioritize simplicity.",
  },
  {
    id: "consulting",
    name: "Technical Consulting",
    description:
      "Honest advice on architecture, stack choices, and technical debt. We help teams make decisions they'll still be happy with two years from now.",
    idealClient:
      "Founders and engineering leads navigating build-vs-buy, scaling, or modernization.",
  },
  {
    id: "internal-tools",
    name: "Internal Tools",
    description:
      "Software your team actually wants to use. Dashboards, admin panels, and workflow tools that eliminate the busywork slowing people down.",
    idealClient:
      "Operations-heavy businesses where internal efficiency directly impacts the bottom line.",
  },
];
