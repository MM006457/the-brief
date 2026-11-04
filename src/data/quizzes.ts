// Weekly quizzes, one per issue number.
// To add next week's: copy the block for issue 1, change `issue` to 2, and write 3 questions.
// `answer` is the position of the correct option, counting from 0 (first option = 0).

export const quizzes = [
  {
    issue: 1,
    title: "The price of control",
    questions: [
      {
        q: "DoorDash agreed to pay 26% above Instacart's share price. What is that extra amount paying for?",
        options: [
          "Control of the whole company",
          "Instacart's existing debt",
          "A guarantee that the deal is profitable",
          "Approval from competition regulators",
        ],
        answer: 0,
        why: "A share price values a tiny slice of a company. Buying all of it gives you control of strategy and costs, and shareholders want a reward before they sell.",
      },
      {
        q: "A buyer pays a premium, but the synergies turn out to be worth less than that premium. What happened?",
        options: ["The deal created value", "The buyer overpaid", "The buyer avoided tax", "The deal became a stock deal"],
        answer: 1,
        why: "A deal only creates value if the synergies are worth more than the premium. If not, the buyer has overpaid, which happens more often than you'd think.",
      },
      {
        q: "Why does paying mostly in cash send a confident signal?",
        options: [
          "Cash deals can't be blocked by regulators",
          "Cash deals are always cheaper",
          "The buyer commits real money instead of handing over its own shares",
          "Instacart shareholders keep a share of future gains",
        ],
        answer: 2,
        why: "Paying in cash shows the buyer believes the deal is worth it. The seller gets certainty, but gives up any upside if the combined company does well.",
      },
    ],
  },
];
