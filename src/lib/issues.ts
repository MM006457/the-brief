import { getCollection, type CollectionEntry } from "astro:content";

export type Issue = CollectionEntry<"issues">;

/** All published issues, newest first. */
export async function getIssues(): Promise<Issue[]> {
  const all = await getCollection("issues", ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.number - a.data.number);
}

export function issueUrl(issue: Issue): string {
  return `/issues/${issue.id}/`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Turns a section name like "Markets & Macro" into the same anchor Astro gives its ## heading. */
export function sectionAnchor(section: string): string {
  return section
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}
