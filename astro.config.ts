import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Pages are built ahead of time (static). Only routes marked `prerender = false`
// run on demand as Vercel functions, e.g. /api/markets for the live ticker.
export default defineConfig({
  site: "https://the-brief-phi-one.vercel.app",
  output: "static",
  adapter: vercel(),
});
