export type IndustryOffering = {
  name: string;
  description: string;
  idealFor: string;
};

export type Industry = {
  id: string;
  name: string;
  description: string;
  region: string;
  offerings: IndustryOffering[];
};

export const industries: Industry[] = [
  {
    id: "education",
    name: "Education",
    description:
      "An MPS platform for DepEd division offices, now used across 600+ schools.",
    region: "PH",
    offerings: [
      {
        name: "Schools",
        description:
          "An MPS platform for DepEd division offices, now used across 600+ schools.",
        idealFor:
          "Division offices and schools still tracking scores across spreadsheets and paper forms.",
      },
    ],
  },
  {
    id: "retail",
    name: "Retail",
    description:
      "Store dashboards shaped around the floor, for teams who know the work from a shift.",
    region: "PH",
    offerings: [
      {
        name: "Stores",
        description:
          "Store dashboards shaped around the floor, for teams who know the work from a shift.",
        idealFor:
          "Store teams that need a dashboard built around the shift, not a back-office checklist.",
      },
      {
        name: "POS",
        description:
          "Point of sale built around the counter, so a sale, a return, and the stock behind it stay in one place.",
        idealFor:
          "Stores whose register still doesn't talk to inventory, staff, or the rest of the shop.",
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    description:
      "Custom ERP for operators in Mindanao whose spreadsheets no longer fit the business.",
    region: "PH",
    offerings: [
      {
        name: "ERP",
        description:
          "Custom ERP for operators whose spreadsheets and off-the-shelf tools no longer fit the business.",
        idealFor:
          "Teams ready to replace a stack of spreadsheets with a system shaped around their own process.",
      },
      {
        name: "Logistics",
        description:
          "Software for moving goods from one place to the next, scoped to the handoffs your team already makes.",
        idealFor:
          "Operators tracking shipments, routes, or warehouse moves by hand.",
      },
      {
        name: "HR System",
        description:
          "An HR system built around how your team actually hires, schedules, and keeps records, not a generic employee portal.",
        idealFor:
          "Operators still running payroll, attendance, and personnel files out of spreadsheets.",
      },
    ],
  },
  {
    id: "product",
    name: "Product",
    description:
      "Tools for product brands in the US, built so a team can use them without a manual.",
    region: "US",
    offerings: [
      {
        name: "Brands",
        description:
          "Tools for product brands, built so a team can use them without a manual.",
        idealFor:
          "Product companies that need software their own team can pick up on day one.",
      },
      {
        name: "SaaS",
        description:
          "Product software customers log into, from the first account through the workflow they repeat every day.",
        idealFor:
          "Teams shipping a product people subscribe to, not a one-off internal tool.",
      },
    ],
  },
];
