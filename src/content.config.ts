import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Every issue is one Markdown file in src/content/issues/.
// The fields at the top of each file (between the --- lines) must match this list.
const issues = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/issues" }),
  schema: z.object({
    number: z.number(),               // 1, 2, 3...
    headline: z.string(),             // big homepage headline for the issue
    summary: z.string(),              // one line under the headline
    date: z.coerce.date(),            // the Monday it goes out, e.g. 2026-10-26
    readTime: z.number().default(5),  // minutes
    stories: z
      .array(
        z.object({
          section: z.string(),        // e.g. "The Deal Desk" (must match a ## heading in the issue)
          title: z.string(),          // story headline
          blurb: z.string(),          // one line for the homepage card
        })
      )
      .default([]),
    draft: z.boolean().default(false), // true = hidden from the site
  }),
});

export const collections = { issues };
