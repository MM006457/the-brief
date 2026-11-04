// Reads The Brief's issues from the Beehiiv RSS feed.
// You write and send each issue in Beehiiv; the website picks it up from here automatically.
//
// To get the most out of the site, format each issue in Beehiiv like this:
//   Heading 2  →  the section name   (e.g. "The Deal Desk")
//   Heading 3  →  the story headline (e.g. "Biossil becomes a unicorn")
//   Quote      →  becomes a purple highlighted box ("Say it in the interview")

import { XMLParser } from "fast-xml-parser";
import { BEEHIIV_RSS_URL } from "../data/site";

export type Story = { section: string; title: string; blurb: string; anchor: string };
export type WhatsOn = {
  org: string;           // e.g. "Warwick Economics"
  title: string;         // e.g. "Intro to Consulting"
  venue?: string;        // e.g. "Oculus"
  date?: string;         // ISO date, e.g. "2026-11-05", when one is given
  open?: boolean;        // "Applications open" items with no date
  raw: string;           // the line exactly as written, used if it can't be read
};

export type Issue = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  date: Date;
  readTime: number;
  image?: string;
  html: string;
  stories: Story[];
  sections: { text: string; anchor: string }[];
  lessons: { term: string; definition: string; anchor: string }[];
  whatsOn: WhatsOn[];
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Reads one event line like "Warwick Economics: Intro to Consulting, 5th Nov, Oculus." */
export function parseEvent(line: string, issueDate: Date): WhatsOn {
  const raw = line.trim();
  const text = raw.replace(/[.\s]+$/, "");
  const colon = text.indexOf(":");
  const org = colon > 0 ? text.slice(0, colon).trim() : "";
  const rest = colon > 0 ? text.slice(colon + 1) : text;
  const parts = rest.split(/,|\.\s+|\s+[–—-]\s+/).map((p) => p.trim()).filter(Boolean);
  let date: string | undefined;
  const others: string[] = [];
  for (const part of parts) {
    const m = part.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]{3,})/i) || part.match(/^([a-z]{3,})\s+(\d{1,2})(?:st|nd|rd|th)?/i);
    const dayFirst = m && /^\d/.test(m[1]);
    const day = m ? Number(dayFirst ? m[1] : m[2]) : NaN;
    const mon = m ? MONTHS.indexOf((dayFirst ? m[2] : m[1]).slice(0, 3).toLowerCase()) : -1;
    if (!date && m && mon >= 0 && day >= 1 && day <= 31) {
      let year = issueDate.getUTCFullYear();
      if (mon < issueDate.getUTCMonth() - 6) year += 1; // e.g. a January event in a December issue
      date = `${year}-${String(mon + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    } else others.push(part);
  }
  const title = others.shift() ?? rest.trim();
  const open = !date && /applications?\s+(are\s+)?open/i.test(text);
  return {
    org,
    title: open ? title.replace(/\s*[:\-–]?\s*applications?\s+(are\s+)?open\s*$/i, "") || title : title,
    venue: others.join(", ") || undefined,
    date,
    open,
    raw,
  };
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@", cdataPropName: "#cdata" });

const text = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    return text(o["#cdata"] ?? o["#text"] ?? "");
  }
  return "";
};

const strip = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/\s+/g, " ").trim();

export const anchorFor = (s: string) =>
  strip(s).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");

/** Tidies Beehiiv's HTML so the site's own styles apply, and gives section headings anchors. */
function clean(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s(style|class|bgcolor|width|height|align)="[^"]*"/gi, "")
    .replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs, inner) => `<h2${attrs} id="${anchorFor(inner)}">${inner}</h2>`)
    .replace(/<a /gi, '<a rel="noopener" ');
}

/** Pairs each Heading 2 (section) with the Heading 3 and first paragraph that follow it. */
function outline(html: string) {
  const sections: { text: string; anchor: string }[] = [];
  const stories: Story[] = [];
  const lessons: { term: string; definition: string; anchor: string }[] = [];
  const whatsOnLines: string[] = [];
  const tokens = [...html.matchAll(/<(h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi)];
  let current: Story | null = null;
  for (const [, tag, inner] of tokens) {
    const t = strip(inner);
    if (!t) continue;
    const name = tag.toLowerCase();
    // "What's on this week" / "Events" sections: every bullet becomes an event card
    if (name === "li") {
      if (current && /what.?s on|events|deadlines|happening/i.test(current.section)) whatsOnLines.push(t);
      continue;
    }
    if (name === "h2") {
      current = { section: t, title: "", blurb: "", anchor: anchorFor(t) };
      sections.push({ text: t, anchor: current.anchor });
      stories.push(current);
    } else if (current && name === "h3" && !current.title) {
      current.title = t;
    } else if (current && name === "p" && current.title && !current.blurb) {
      current.blurb = t.length > 140 ? t.slice(0, 137).trimEnd() + "…" : t;
      // "Lesson of the week" sections feed the glossary: Heading 3 = term, first paragraph = definition
      if (/lesson|glossary/i.test(current.section)) lessons.push({ term: current.title, definition: t, anchor: current.anchor });
    }
  }
  return { sections, stories: stories.filter((s) => s.title), lessons, whatsOnLines };
}

let cache: { at: number; issues: Issue[] } | null = null;

/** All published issues, newest first. Returns [] if the feed can't be reached. */
export async function getIssues(): Promise<Issue[]> {
  if (cache && Date.now() - cache.at < 60_000) return cache.issues;
  try {
    const res = await fetch(BEEHIIV_RSS_URL, { headers: { "User-Agent": "TheBriefSite/1.0" } });
    if (!res.ok) throw new Error(`Feed returned ${res.status}`);
    const feed = parser.parse(await res.text());
    let items = feed?.rss?.channel?.item ?? [];
    if (!Array.isArray(items)) items = [items];

    const parsed = items.map((it: any) => {
      const raw = text(it["content:encoded"]) || text(it.description);
      const html = clean(raw);
      const link = text(it.link);
      const slug = (link.split("/").filter(Boolean).pop() || text(it.guid)).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
      const words = strip(raw).split(" ").length;
      const date = new Date(text(it.pubDate));
      const o = outline(html);
      const image = it.enclosure?.["@url"] || it["media:content"]?.["@url"] || undefined;
      return {
        slug,
        title: strip(text(it.title)),
        summary: strip(text(it.description)).slice(0, 220),
        date,
        readTime: Math.max(1, Math.round(words / 220)),
        image,
        html,
        sections: o.sections,
        stories: o.stories,
        lessons: o.lessons,
        whatsOn: o.whatsOnLines.map((l) => parseEvent(l, date)),
      };
    });

    // Oldest = Issue 1
    parsed.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());
    const issues: Issue[] = parsed.map((p: any, i: number) => ({ ...p, number: i + 1 })).reverse();
    cache = { at: Date.now(), issues };
    return issues;
  } catch (err) {
    console.error("Could not load the Beehiiv feed:", err);
    return cache?.issues ?? [];
  }
}

export const issueUrl = (i: Issue) => `/issues/${i.slug}/`;
export const pad = (n: number) => String(n).padStart(2, "0");
export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
