// The About page reads from this file. Edit names, roles, modules and links here.
// Photos: put a square-ish photo in public/team/ named exactly as `photo` below
// (e.g. public/team/misha.jpg). Until it exists, the page shows a placeholder.

export const degree = "Management with a Placement Year";
export const school = "Warwick Business School";

export const team = [
  {
    name: "Misha",
    role: "Co-founder · Editorial, design & build",
    photo: "misha.jpg",
    writes: "Markets & Macro, The Deal Desk",
    modules: [
      { code: "EC131", name: "Economics for Business" },
      { code: "IB1250", name: "Financial Management" },
      { code: "IB1380", name: "Management, Organisation and Society" },
    ],
    links: [
      { label: "LinkedIn", url: "" }, // paste your LinkedIn URL between the quotes
      { label: "GitHub", url: "https://github.com/MM006457" },
    ],
  },
  {
    name: "Nehir",
    role: "Co-founder · Events, partnerships & growth",
    photo: "nehir.jpg",
    writes: "Events & Deadlines, Career Corner",
    modules: [
      // Nehir: replace these with your module codes and names
      { code: "[code]", name: "Nehir's module" },
      { code: "[code]", name: "Nehir's module" },
      { code: "[code]", name: "Nehir's module" },
    ],
    links: [
      { label: "LinkedIn", url: "" },
    ],
  },
];

// The build tracker on the About page. Change "planned" to "next" or "done" as you go.
export const buildSteps = [
  { title: "Design the homepage", detail: "Layout, type, colour, light and dark mode", status: "done" },
  { title: "Set up the repo and hosting", detail: "GitHub + Vercel, auto-deploys on every change", status: "done" },
  { title: "Build pages and issue template", detail: "Astro components, one Markdown file per issue", status: "done" },
  { title: "Browser publishing", detail: "Decap CMS so we write issues without code", status: "next" },
  { title: "Email sign-up", detail: "Beehiiv subscriber list and analytics", status: "planned" },
  { title: "Live market ticker", detail: "Server function calling a market data API", status: "planned" },
  { title: "Ask The Brief", detail: "Subscriber-only questions, answered weekly", status: "planned" },
];
