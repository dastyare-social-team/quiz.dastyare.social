import { Scorecard } from "@/types";

export const scorecard_v1: Scorecard = {
  id: "scorecard-v1",
  questions: [
    /* — 01 — Visibility */
    {
      id: 1,
      category: "Visibility",
      question:
        "how often does someone new find you without you personally reaching out to them?",
      highlightPhrases: ["without you personally"],
      options: [
        { label: "Never", score: 1 },
        { label: "Rarely", score: 2 },
        { label: "Sometimes", score: 3 },
        { label: "Often", score: 4 },
      ],
    },
    {
      id: 2,
      category: "Visibility",
      question: "if someone googled your name today, what would they find?",
      highlightPhrases: ["googled your name"],
      options: [
        { label: "Nothing useful", score: 1 },
        { label: "An old, outdated profile", score: 2 },
        { label: "A basic website or LinkedIn", score: 3 },
        { label: "A clear, up‑to‑date personal brand", score: 4 },
      ],
    },
    {
      id: 3,
      category: "Visibility",
      question: "when you post something, who actually sees it?",
      highlightPhrases: ["who actually sees it?"],
      options: [
        { label: "Mostly no one", score: 1 },
        { label: "A small circle of people I already know", score: 2 },
        { label: "A mix of people I know and new people", score: 3 },
        { label: "A steady flow of new people every time", score: 4 },
      ],
    },

    /* — 04 — Authority */
    {
      id: 4,
      category: "Authority",
      question:
        "if a stranger read your last 5 posts, would they think you're an expert?",
      highlightPhrases: ["your last 5 posts,"],
      options: [
        { label: "Not really", score: 1 },
        { label: "Maybe, if they read closely", score: 2 },
        { label: "Probably", score: 3 },
        { label: "Definitely", score: 4 },
      ],
    },
    {
      id: 5,
      category: "Authority",
      question: "how often do people reference something you said or wrote?",
      highlightPhrases: ["reference something you said"],
      options: [
        { label: "Never", score: 1 },
        { label: "Rarely", score: 2 },
        { label: "Occasionally", score: 3 },
        { label: "Regularly", score: 4 },
      ],
    },
    {
      id: 6,
      category: "Authority",
      question:
        "do you have proof — testimonials, results, case studies — publicly visible right now?",
      highlightPhrases: ["— testimonials, results, case studies"],
      options: [
        { label: "No", score: 1 },
        { label: "A little, buried somewhere", score: 2 },
        { label: "Some, but outdated", score: 3 },
        { label: "Yes, current and easy to find", score: 4 },
      ],
    },

    /* — 07 — Consistency */
    {
      id: 7,
      category: "Consistency",
      question: "how many weeks in the last month did you publish something?",
      highlightPhrases: ["did you publish"],
      options: [
        { label: "0", score: 1 },
        { label: "1", score: 2 },
        { label: "2–3", score: 3 },
        { label: "Every week", score: 4 },
      ],
    },
    {
      id: 8,
      category: "Consistency",
      question: "what happens to your reach when you skip posting for 2 weeks?",
      highlightPhrases: ["your reach when"],
      options: [
        { label: "I basically disappear", score: 1 },
        { label: "Engagement drops a lot", score: 2 },
        { label: "A small dip, then it recovers", score: 3 },
        { label: "Barely anything changes", score: 4 },
      ],
    },
    {
      id: 9,
      category: "Consistency",
      question:
        "does your content happen because of a system, or because you felt like it?",
      highlightPhrases: ["because of a system,"],
      options: [
        { label: "Pure motivation, no system", score: 1 },
        { label: "A loose habit", score: 2 },
        { label: "Mostly a system", score: 3 },
        { label: "Fully systemized", score: 4 },
      ],
    },

    /* — 10 — Ownership */
    {
      id: 10,
      category: "Ownership",
      question:
        "if your top social account got suspended tomorrow, what would you lose?",
      highlightPhrases: ["account got suspended"],
      options: [
        { label: "Basically everything", score: 1 },
        { label: "Most of my reach", score: 2 },
        { label: "Some reach — I'd survive", score: 3 },
        { label: "Almost nothing, I own my audience elsewhere", score: 4 },
      ],
    },
    {
      id: 11,
      category: "Ownership",
      question:
        "do you have your own website or email list outside of social platforms?",
      highlightPhrases: ["your own website"],
      options: [
        { label: "No", score: 1 },
        { label: "I have one, but it's outdated", score: 2 },
        { label: "Yes, but barely used", score: 3 },
        { label: "Yes, active and growing", score: 4 },
      ],
    },
    {
      id: 12,
      category: "Ownership",
      question: "where does most of your content actually live?",
      highlightPhrases: ["most of your content"],
      options: [
        { label: "Entirely on platforms I don't own", score: 1 },
        { label: "Mostly platforms, a small owned piece", score: 2 },
        { label: "Roughly half and half", score: 3 },
        { label: "Mostly on things I own", score: 4 },
      ],
    },

    /* — 13 — Demand */
    {
      id: 13,
      category: "Demand",
      question:
        "in the last 3 months, has your personal brand directly led to a lead or sale?",
      highlightPhrases: ["led to a lead or sale?"],
      options: [
        { label: "No, never has", score: 1 },
        { label: "Once or twice, by accident", score: 2 },
        { label: "Yes, a few times", score: 3 },
        { label: "Yes, regularly", score: 4 },
      ],
    },
    {
      id: 14,
      category: "Demand",
      question:
        'if you posted "I have 3 spots open this month," what would happen?',
      highlightPhrases: ['"I have 3 spots open this month,"'],
      options: [
        { label: "Nothing", score: 1 },
        { label: "Maybe one reply", score: 2 },
        { label: "A few real replies", score: 3 },
        { label: "I'd likely fill them", score: 4 },
      ],
    },
    {
      id: 15,
      category: "Demand",
      question:
        "how much of your revenue can you actually trace back to your personal brand?",
      highlightPhrases: ["actually trace back"],
      options: [
        { label: "$0", score: 1 },
        { label: "A small amount", score: 2 },
        { label: "A meaningful chunk", score: 3 },
        { label: "Most of it", score: 4 },
      ],
    },
  ],

  interpretationBands: [
    {
      title: "Flatlining",
      range: [15, 29],
      slug: "flatlining",
      redirectUrl: "/score/v1",
      lightColor: 20,
    },
    {
      title: "Unstable",
      range: [30, 44],
      slug: "unstable",
      redirectUrl: "/score/v1",
      lightColor: 40,
    },
    {
      title: "Stabilizing",
      range: [45, 54],
      slug: "stabilizing",
      redirectUrl: "/score/v1",
      lightColor: 70,
    },
    {
      title: "Compounding",
      range: [55, 60],
      slug: "compounding",
      redirectUrl: "/score/v1",
      lightColor: 100,
    },
  ],
};
