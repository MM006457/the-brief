import type { APIRoute } from "astro";

// Adds an email to The Brief's Beehiiv subscriber list.
// Runs on Vercel's servers so the API key stays secret.
// Needs two environment variables in Vercel → Settings → Environment Variables:
//   BEEHIIV_API_KEY         (Beehiiv → Settings → API → create key)
//   BEEHIIV_PUBLICATION_ID  (Beehiiv → Settings → API, starts with "pub_")
export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  const key = process.env.BEEHIIV_API_KEY ?? import.meta.env.BEEHIIV_API_KEY;
  const pub = process.env.BEEHIIV_PUBLICATION_ID ?? import.meta.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !pub) return reply(503, "Sign-up isn't switched on yet. Please try again soon.");

  let body: { email?: string; website?: string } = {};
  try { body = await request.json(); } catch { return reply(400, "Something went wrong. Please try again."); }

  // Hidden "website" field: real people leave it empty, spam bots fill it in.
  if (body.website) return reply(200, "You're subscribed.");

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return reply(400, "That email doesn't look right. Check it and try again.");

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "website",
        referring_site: "the-brief-phi-one.vercel.app",
      }),
    });
    if (res.ok) return reply(200, "You're subscribed. Check your inbox on Wednesday.");
    console.error("Beehiiv sign-up failed:", res.status, await res.text());
    return reply(502, "We couldn't sign you up just now. Please try again in a minute.");
  } catch (err) {
    console.error("Beehiiv unreachable:", err);
    return reply(502, "We couldn't sign you up just now. Please try again in a minute.");
  }
};

function reply(status: number, message: string) {
  return new Response(JSON.stringify({ ok: status === 200, message }), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
