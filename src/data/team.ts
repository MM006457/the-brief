// The About page reads from this file. Edit names, roles and links here.
// Photos: put a square-ish photo in public/team/ named exactly as `photo` below
// (e.g. public/team/misha.jpg). Until it exists, the page shows a placeholder.

export const degree = "Management with a Placement Year";
export const school = "Warwick Business School";

export const team = [
  {
    name: "Misha Mody",
    role: "Co-founder · Editorial, design & build",
    photo: "misha.jpg",
    writes: "Markets & Macro, The Deal Desk",
    links: [
      { label: "LinkedIn", url: "" }, // paste your LinkedIn URL between the quotes
      { label: "GitHub", url: "https://github.com/MM006457" },
    ],
  },
  {
    name: "Nehir Yetis",
    role: "Co-founder · Events, partnerships & growth",
    photo: "nehir.jpg",
    writes: "Events & Deadlines, Career Corner",
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
  { title: "Publishing pipeline", detail: "Write once in Beehiiv: it emails subscribers and the site reads its RSS feed", status: "done" },
  { title: "Email sign-up", detail: "Beehiiv subscriber list and analytics", status: "next" },
  { title: "Live market ticker", detail: "Vercel function calling the Twelve Data API, cached every 30 minutes", status: "done" },
  { title: "Ask The Brief", detail: "Subscriber-only questions, answered weekly", status: "planned" },
];
