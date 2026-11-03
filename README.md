# The Brief

**What every business student should know this week.**

The Brief is a weekly newsletter and website for business students, written and built by Misha and Nehir, Management with a Placement Year students at Warwick Business School. Every story ends with what it means for your applications, and what to say about it in an interview.

Live site: https://the-brief-phi-one.vercel.app

## How it's built

| Part | Tool | Why |
| --- | --- | --- |
| Site framework | [Astro](https://astro.build) | Fast static pages, components, Markdown content |
| Content | Markdown files in `src/content/issues/` | One file per issue, version-controlled |
| Hosting | [Vercel](https://vercel.com) | Deploys automatically on every push to `main` |
| Code | GitHub + Codespaces | Built entirely in the browser |

Planned: Decap CMS (browser editor), Beehiiv (email sign-up), a live market ticker and subscriber Q&A.

## Project structure

```
src/
  content/issues/   one Markdown file per weekly issue
  data/team.ts      About page: names, modules, links, build tracker
  styles/theme.css  all colours and fonts
  components/       nav, footer, ticker, sign-up, Ask The Brief form
  layouts/          the page shell
  pages/            homepage, /issues, /issues/[issue], /about
public/
  team/             team photos (misha.jpg, nehir.jpg)
```

## Publish a new issue

1. Copy `src/content/issues/issue-01.md` to `issue-02.md`.
2. Update the fields at the top (`number`, `headline`, `summary`, `date`, `stories`).
3. Write the issue below. Each section is a `##` heading (the section name) followed by a `###` heading (the story title). Quotes (`>`) become highlighted boxes.
4. Commit and sync. Vercel publishes it in about a minute, and the homepage switches to the newest issue automatically.

## Run it locally

```bash
npm install
npm run dev
```
