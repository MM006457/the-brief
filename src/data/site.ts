// Site-wide settings.unzip -o the-brief-update.zip && rm the-brief-update.zip

// Your Beehiiv RSS feed (Beehiiv → Settings → RSS → RSS Feed URL → Copy).
// The website reads every published Beehiiv post from here. Not a secret.
export const BEEHIIV_RSS_URL = "https://rss.beehiiv.com/feeds/ZPDfKVcfO7.xml";

// How long (seconds) the site keeps a saved copy of the feed before checking Beehiiv again.
// 600 = 10 minutes: a newly published issue appears on the site within 10 minutes.
export const FEED_REFRESH_SECONDS = 600;
