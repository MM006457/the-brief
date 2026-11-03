# The Brief

**What every business student should know this week.**

The Brief is a weekly newsletter and website for business students, written and built by Misha Mody and Nehir Yetis, Management with a Placement Year students at Warwick Business School. Every story ends with what it means for your applications, and what to say about it in an interview.

Live site: https://the-brief-phi-one.vercel.app

## How it's built

| Part | Tool | Why |
| --- | --- | --- |
| Site framework | [Astro](https://astro.build) | Fast static pages, components, Markdown content |
| Content & email | [Beehiiv](https://beehiiv.com) | Issues are written and emailed in Beehiiv; the site reads its RSS feed |
| Market data | [Twelve Data](https://twelvedata.com) via a Vercel function | Live ticker, cached every 30 minutes |
| Hosting | [Vercel](https://vercel.com) | Deploys automatically on every push to `main` |
| Code | GitHub + Codespaces | Built entirely in the browser |

Planned: Beehiiv sign-up form on the site and subscriber Q&A.

## Project structure

```
src/
  lib/beehiiv.ts    reads issues from the Beehiiv RSS feed
  pages/api/        server functions (live market prices)
  data/             team.ts (About page), markets.ts (ticker), site.ts (feed URL)
  styles/theme.css  all colours and fonts
  components/       nav, footer, ticker, sign-up, Ask The Brief form
  layouts/          the page shell
  pages/            homepage, /issues, /issues/[issue], /about
public/
  team/             team photos (misha.jpg, nehir.jpg)
```

## Publish a new issue

1. Write the issue in Beehiiv. Use **Heading 2** for section names (e.g. "The Deal Desk"), **Heading 3** for story headlines, and **Quote** for highlighted boxes.
2. Schedule or send it. Beehiiv emails subscribers.
3. Within about 10 minutes the issue appears on the website, and the homepage switches to it automatically.

## Run it locally

```bash
npm install
npm run dev
```
