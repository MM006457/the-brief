import type { APIRoute } from "astro";
import { markets, REFRESH_SECONDS } from "../../data/markets";

// This runs on Vercel's servers, never in the visitor's browser,
// so the API key stays secret. Set TWELVE_DATA_KEY in Vercel → Settings → Environment Variables.
export const prerender = false;

type Quote = { label: string; note?: string; price: number; change: number; percent: number };

// The last good set of prices. If Twelve Data is busy (429) or down, we show these instead of nothing.
let lastGood: { updated: string; quotes: Quote[] } | null = null;
const fallback = (error: string) =>
  lastGood ? json({ ok: true, stale: true, ...lastGood }, 300) : json({ ok: false, error }, 60);

export const GET: APIRoute = async () => {
  const key = process.env.TWELVE_DATA_KEY ?? import.meta.env.TWELVE_DATA_KEY;
  if (!key) return json({ ok: false, error: "No API key set" }, 0);

  try {
    const symbols = markets.map((m) => m.symbol).join(",");
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbols)}&apikey=${key}`
    );
    if (!res.ok) return fallback(`Data provider returned ${res.status}`);
    const data = await res.json();

    // With several symbols, Twelve Data returns { "SPY": {...}, "QQQ": {...} }.
    const quotes: Quote[] = [];
    for (const m of markets) {
      const q = markets.length > 1 ? data[m.symbol] : data;
      if (!q || q.status === "error" || q.close == null) continue; // skip anything the plan doesn't cover
      quotes.push({
        label: m.label,
        note: m.note,
        price: Number(q.close),
        change: Number(q.change),
        percent: Number(q.percent_change),
      });
    }
    if (!quotes.length) return fallback(data?.message ?? "No quotes returned");

    lastGood = { updated: new Date().toISOString(), quotes };
    return json({ ok: true, ...lastGood }, REFRESH_SECONDS);
  } catch (err) {
    return fallback("Could not reach the data provider");
  }
};

// Vercel's CDN caches the answer, so every visitor gets the same saved prices
// and the API is only called once per refresh period.
function json(body: unknown, cacheSeconds: number) {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cacheSeconds
        ? `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`
        : "no-store",
    },
  });
}
