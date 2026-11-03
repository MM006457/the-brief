import { defineConfig } from "astro/config";

// The Brief is a static site: every page is built ahead of time and served by Vercel.
// When we add the live ticker and Ask The Brief (steps 6 and 7), they'll use Vercel functions in /api.
export default defineConfig({
  site: "https://the-brief-phi-one.vercel.app",
});
