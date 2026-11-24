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
  {
    issue: 2,
    title: "Shoppers, sellers and rule-makers",
    questions: [
      {
        q: "More Brits plan to shop Black Friday, yet UK spending is forecast to fall 32% to £9.9bn. What best explains the gap?",
        options: [
          "Retailers are offering smaller discounts",
          "Shoppers are hunting for deals but spending less per basket",
          "Most Black Friday sales have moved to January",
          "Online shopping has stopped being counted",
        ],
        answer: 1,
        why: "Footfall is up but baskets have shrunk. With energy bills and rates rising, people buy what they needed anyway and skip the extras.",
      },
      {
        q: "The Bank of England raised Bank Rate to 4% in November, its first rise since 2023. Why does that hit Black Friday?",
        options: [
          "It makes imported goods cheaper",
          "Higher mortgage and loan costs leave households less to spend",
          "It forces retailers to close on Black Friday",
          "It cuts the price of energy",
        ],
        answer: 1,
        why: "Higher rates push up mortgage and borrowing costs. Every extra pound spent on repayments is a pound that doesn't reach the shops.",
      },
      {
        q: "Metro Bank launched a formal sale process with no buyer lined up. Why might a board choose to sell at this moment?",
        options: [
          "The bank is about to run out of money",
          "Regulators ordered the sale",
          "Its turnaround is proven, but the share price hasn't fully caught up",
          "UK law requires banks to sell every five years",
        ],
        answer: 2,
        why: "Selling after a recovery locks in gains while the story is strongest. A buyer may pay up for profits that the share price hasn't priced in yet.",
      },
      {
        q: "In the US AI debate, what would federal 'preemption' do?",
        options: [
          "Ban AI models above a certain size",
          "Let each state set its own AI rules",
          "Replace state AI laws with one national rulebook",
          "Hand AI regulation to the EU",
        ],
        answer: 2,
        why: "Preemption means a national law overrides state laws on the same subject. Supporters say one rulebook cuts compliance costs; governors want room to act themselves.",
      },
    ],
  },
];
