export type Service = {
  id: string;
  name: string;
  description: string;
  idealClient: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "custom-software",
    name: "Custom Software",
    description:
      "We build web and mobile applications, ERP systems from the ground up, scoped to your actual workflows.",
    idealClient:
      "Businesses ready to replace spreadsheets, legacy systems, or off-the-shelf tools that don't fit.",
    tags: ["Web Apps", "Mobile Apps", "ERP Systems"],
  },
  {
    id: "ai-tools-and-automations",
    name: "AI Solutions",
    description:
      "We build AI tools, agents and automations that help your team work smarter, not harder. ",
    idealClient:
      "Teams looking to automate repetitive tasks, analyze data, or improve productivity using AI.",
    tags: ["AI Agents", "AI Integration", "Automation"],
  },
  {
    id: "consulting",
    name: "Tech Consultancy",
    description:
      " We help businesses make decisions they'll thank themselves for in the future.",
    idealClient:
      "Founders and engineering leads navigating build-vs-buy, scaling, or modernization.",
    tags: ["Strategy", "Modernization", "Scaling"],
  },
];
