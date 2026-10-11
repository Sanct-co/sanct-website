export type ServiceTag = {
  name: string;
  description: string;
  idealFor: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  idealClient: string;
  image: string;
  tags: ServiceTag[];
};

export const services: Service[] = [
  {
    id: "custom-software",
    name: "Custom Software",
    description:
      "We build web and mobile applications, ERP systems from the ground up, scoped to your actual workflows.",
    image: "/services/software.webp",
    idealClient:
      "Businesses ready to replace spreadsheets, legacy systems, or off-the-shelf tools that don't fit.",
    tags: [
      {
        name: "Web Apps",
        description:
          "We build web applications around the way your team already works, so the tool fits the workflow instead of the other way around.",
        idealFor:
          "Teams replacing a spreadsheet or a generic tool with a web app built around their own process.",
      },
      {
        name: "Mobile Apps",
        description:
          "We build mobile apps for the work that happens away from a desk, scoped to what your team and customers actually need on a phone.",
        idealFor:
          "Teams whose work happens in the field, on site, or in a customer's hands.",
      },
      {
        name: "ERP Systems",
        description:
          "We build ERP systems from the ground up around your operations, replacing spreadsheets and off-the-shelf tools that don't fit.",
        idealFor:
          "Businesses ready to replace spreadsheets, legacy systems, or off-the-shelf tools that don't fit.",
      },
    ],
  },
  {
    id: "ai-tools-and-automations",
    name: "AI Solutions",
    description:
      "We build AI tools, agents and automations that help your team work smarter, not harder. ",
    image: "/services/automation.webp",
    idealClient:
      "Teams looking to automate repetitive tasks, analyze data, or improve productivity using AI.",
    tags: [
      {
        name: "AI Agents",
        description:
          "We build agents that take on repeat work, so your team spends time on decisions instead of the same tasks.",
        idealFor:
          "Teams that want an agent handling the same requests, follow-ups, or lookups every day.",
      },
      {
        name: "AI Integration",
        description:
          "We connect AI to the tools you already use, so it shows up inside the workflow instead of as another app to learn.",
        idealFor:
          "Teams that already have a stack and want AI inside it, not beside it.",
      },
      {
        name: "Automation",
        description:
          "We automate the repetitive steps in your process, so the work moves without someone pushing it by hand.",
        idealFor:
          "Teams looking to automate repetitive tasks, analyze data, or improve productivity using AI.",
      },
    ],
  },
  {
    id: "consulting",
    name: "Tech Consultancy",
    description:
      " We help businesses make decisions they'll thank themselves for in the future.",
    image: "/services/consultancy.webp",
    idealClient:
      "Founders and engineering leads navigating build-vs-buy, scaling, or modernization.",
    tags: [
      {
        name: "Strategy",
        description:
          "We help you decide what to build, what to buy, and what to leave alone before a line of code gets written.",
        idealFor:
          "Founders and leads choosing a direction before committing to a build.",
      },
      {
        name: "Modernization",
        description:
          "We help you replace or reshape systems that are slowing the business down, without a rewrite for its own sake.",
        idealFor:
          "Teams stuck on systems that work, but cost more to keep than to change.",
      },
      {
        name: "Scaling",
        description:
          "We help you grow the product and the team behind it, so the next stage doesn't break what already works.",
        idealFor:
          "Founders and engineering leads navigating build-vs-buy, scaling, or modernization.",
      },
    ],
  },
];
