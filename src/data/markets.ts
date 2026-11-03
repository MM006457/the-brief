// The markets shown in the ticker. Edit this list to change what appears.
//
// `symbol` is the Twelve Data symbol. Free plans cover US-listed stocks and funds,
// currencies and crypto. Stock indices themselves (FTSE 100, S&P 500) usually need a
// paid plan, so we use funds that track them instead (SPY tracks the S&P 500).
// Keep the list to 8 or fewer: each one uses a credit every time the ticker refreshes.

export const markets = [
  { symbol: "SPY", label: "S&P 500", note: "SPY" },
  { symbol: "QQQ", label: "Nasdaq 100", note: "QQQ" },
  { symbol: "DIA", label: "Dow Jones", note: "DIA" },
  { symbol: "EWU", label: "UK stocks", note: "EWU" },
  { symbol: "GBP/USD", label: "GBP/USD" },
  { symbol: "EUR/USD", label: "EUR/USD" },
  { symbol: "XAU/USD", label: "Gold" },
  { symbol: "BTC/USD", label: "Bitcoin" },
];

// How often fresh prices are fetched, in seconds. 1800 = every 30 minutes,
// which keeps 8 markets comfortably inside the free plan's daily limit.
export const REFRESH_SECONDS = 1800;
