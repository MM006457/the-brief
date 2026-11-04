// The markets shown in the ticker. Edit this list to change what appears.
//
// `symbol` is the Twelve Data symbol. Free plans cover US-listed stocks and funds,
// currencies and crypto. Stock indices themselves (FTSE 100, S&P 500) usually need a
// paid plan, so we use funds that track them instead (SPY tracks the S&P 500).
// Keep the list to 6 or fewer: each one uses a credit every time the ticker refreshes,
// and the free plan only allows a few credits per minute.

export const markets = [
  { symbol: "SPY", label: "S&P 500", note: "SPY" },
  { symbol: "QQQ", label: "Nasdaq 100", note: "QQQ" },
  { symbol: "EWU", label: "UK stocks", note: "EWU" },
  { symbol: "GBP/USD", label: "GBP/USD" },
  { symbol: "XAU/USD", label: "Gold" },
  { symbol: "BTC/USD", label: "Bitcoin" },
];

// How often fresh prices are fetched, in seconds. 1800 = every 30 minutes,
// which keeps 6 markets comfortably inside the free plan's limits.
export const REFRESH_SECONDS = 1800;
