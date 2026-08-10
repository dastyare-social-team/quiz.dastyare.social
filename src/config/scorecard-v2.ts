import { Scorecard } from "@/types";

export const scorecard_v2: Scorecard = {
  id: "scorecard-v2",
  questions: [
    /* — 01 — Visibility */
    {
      id: 1,
      category: "Visibility",
      question: "how would you describe how people discover you right now?",
      highlightPhrases: ["how people discover"],
      options: [
        { label: "People find me by accident, if at all", score: 1 },
        {
          label: "A few people know I exist — mostly people I already knew",
          score: 2,
        },
        { label: "New people discover me most weeks", score: 3 },
        {
          label: "I'm the person people mention when this topic comes up",
          score: 4,
        },
      ],
    },
    {
      id: 2,
      category: "Visibility",
      question:
        "when was the last time a total stranger reached out because of something you posted?",
      highlightPhrases: ["a total stranger reached out"],
      options: [
        { label: "Can't remember", score: 1 },
        { label: "Months ago", score: 2 },
        { label: "Within the last month", score: 3 },
        { label: "This week", score: 4 },
      ],
    },

    /* — 03 — Authority */
    {
      id: 3,
      category: "Authority",
      question: "when you post, what are you actually putting out there?",
      highlightPhrases: ["what are you actually"],
      options: [
        { label: "I mostly share opinions, not proof", score: 1 },
        { label: "I share some proof, but not consistently", score: 2 },
        { label: "I share proof regularly", score: 3 },
        { label: "I show real results and people notice", score: 4 },
      ],
    },
    {
      id: 4,
      category: "Authority",
      question:
        "if someone searched your name plus your industry, what would they find?",
      highlightPhrases: ["what would they find?"],
      options: [
        { label: "Nothing relevant", score: 1 },
        { label: "Something outdated", score: 2 },
        { label: "Something decent", score: 3 },
        { label: "Exactly the proof they'd need to hire me", score: 4 },
      ],
    },

    /* — 05 — Consistency */
    {
      id: 5,
      category: "Consistency",
      question: "how would you describe your posting rhythm?",
      highlightPhrases: ["your posting rhythm?"],
      options: [
        { label: "I post in bursts, then disappear", score: 1 },
        { label: "I post when I remember to", score: 2 },
        { label: "I post most weeks", score: 3 },
        { label: "I post on a schedule, no matter what", score: 4 },
      ],
    },
    {
      id: 6,
      category: "Consistency",
      question: "how long was your last gap between posts?",
      highlightPhrases: ["your last gap"],
      options: [
        { label: "Over a month", score: 1 },
        { label: "2–3 weeks", score: 2 },
        { label: "About a week", score: 3 },
        { label: "A few days, max", score: 4 },
      ],
    },

    /* — 07 — Ownership */
    {
      id: 7,
      category: "Ownership",
      question: "where does most of what you've built actually live?",
      highlightPhrases: ["most of what you've built"],
      options: [
        { label: "Everything I've built lives on rented platforms", score: 1 },
        { label: "I have one small owned asset, barely used", score: 2 },
        { label: "I have a real owned asset, growing slowly", score: 3 },
        {
          label: "My owned audience is bigger than my platform following",
          score: 4,
        },
      ],
    },
    {
      id: 8,
      category: "Ownership",
      question:
        "if every social app banned you tomorrow, could you still reach your audience?",
      highlightPhrases: ["still reach your audience?"],
      options: [
        { label: "No, I'd start from zero", score: 1 },
        { label: "Barely", score: 2 },
        { label: "Mostly, yes", score: 3 },
        { label: "Completely, yes", score: 4 },
      ],
    },

    /* — 09 — Demand */
    {
      id: 9,
      category: "Demand",
      question:
        "how would you describe the money side of your personal brand so far?",
      highlightPhrases: ["money side of your"],
      options: [
        { label: "My personal brand has never led to money", score: 1 },
        { label: "It's led to a lead or two, by luck", score: 2 },
        { label: "It regularly brings in leads", score: 3 },
        { label: "It's a real, repeatable source of revenue", score: 4 },
      ],
    },
    {
      id: 10,
      category: "Demand",
      question:
        "if you needed 3 new clients this month, could your personal brand deliver them?",
      highlightPhrases: ["3 new clients this month,"],
      options: [
        { label: "Not a chance", score: 1 },
        { label: "Maybe, with luck", score: 2 },
        { label: "Probably, with some effort", score: 3 },
        { label: "Yes, easily", score: 4 },
      ],
    },
  ],

  interpretationBands: [
    {
      title: "Hidden Expert",
      range: [10, 19],
      slug: "hidden-expert",
      redirectUrl: "/score/v2",
      lightColor: "red",
    },
    {
      title: "Inconsistent Influencer",
      range: [20, 29],
      slug: "inconsistent-influencer",
      redirectUrl: "/score/v2",
      lightColor: "yellow",
    },
    {
      title: "Emerging Authority",
      range: [30, 34],
      slug: "emerging-authority",
      redirectUrl: "/score/v2",
      lightColor: "yellow",
    },
    {
      title: "Market Leader",
      range: [35, 40],
      slug: "market-leader",
      redirectUrl: "/score/v2",
      lightColor: "green",
    },
  ],
};
