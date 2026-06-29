export type Service = {
  id: string;
  name: string;
  description: string;
  idealClient: string;
};

export const services: Service[] = [
  {
    id: "custom-software",
    name: "Custom Software",
    description:
      "We build web and mobile applications from the ground up, scoped to your actual workflows, not a template. Every feature earns its place.",
    idealClient:
      "Businesses ready to replace spreadsheets, legacy systems, or off-the-shelf tools that don't fit.",
  },
  {
    id: "ai-tools-and-automations",
    name: "AI Tools and Automations",
    description:
      "We build AI tools and automations that help your team work smarter, not harder. From automations to data analysis, we help you leverage the power of AI to drive efficiency and innovation.",
    idealClient:
      "Teams looking to automate repetitive tasks, analyze data, or improve productivity using AI.",
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
    id: "product-design",
    name: "Product Design & UX",
    description:
      "Interfaces that feel obvious the first time someone uses them. We design for clarity, not complexity, from wireframes through to production-ready UI.",
    idealClient:
      "Teams with a product vision who need design partners that prioritize simplicity.",
  },
  
  
];
