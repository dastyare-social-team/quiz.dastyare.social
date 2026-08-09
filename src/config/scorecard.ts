export type ScoreOption = {
  label: string;
  score: number;
};

export type ScoreQuestion = {
  id: number;
  question: string;
  category: string;
  options: ScoreOption[];

  highlightPhrases: string[];
};

export type InterpretationBand = {
  title: string;
  range: [number, number];

  /* —— result routing —— */
  slug: string;
  redirectUrl: string;

  /* —— traffic light color —— */
  lightColor: "red" | "yellow" | "green";
};

export type Scorecard = {
  id: string;
  questions: ScoreQuestion[];
  interpretationBands: InterpretationBand[];
};

export const scorecard_v1: Scorecard = {
  id: "scorecard-v1",
  questions: [
    /* — 01 — */
    {
      id: 1,
      category: "Audience & Positioning",
      question:
        "Are You Consistently Attracting Your IDEAL PROSPECTS Who have the budget and authority to buy your product or service?",
      highlightPhrases: ["Your IDEAL PROSPECTS"],
      options: [
        { label: "NEVER", score: 1 },
        { label: "OCCACIONALLY", score: 2 },
        { label: "ABOUT HALF THE TIME", score: 3 },
        { label: "MOST OF THE TIME", score: 4 },
        { label: "ALWAYS", score: 5 },
      ],
    },

    /* — 02 — */
    {
      id: 2,
      category: "Personal Brand",
      question:
        "Do You Have a Clearly Defined Personal Brand That your market can describe in one sentence?",
      highlightPhrases: ["Clearly Defined Personal Brand"],
      options: [
        { label: "NOT AT ALL — people are confused about what I do", score: 1 },
        { label: "SLIGHTLY — some people get it, most don’t", score: 2 },
        { label: "MODERATELY — my close network understands it", score: 3 },
        {
          label: "STRONG — most of my market could describe it reasonably well",
          score: 4,
        },
        {
          label:
            "VERY STRONG — my positioning is famous and clearly understood",
          score: 5,
        },
      ],
    },

    /* — 03 — */
    {
      id: 3,
      category: "Content",
      question:
        "How Consistently Are You Publishing Valuable Content That demonstrates your expertise?",
      highlightPhrases: ["Publishing Valuable Content"],
      options: [
        { label: "i rarely publish content", score: 1 },
        { label: "i publish once in a while, without a plan", score: 2 },
        { label: "i publish monthly with some consistency", score: 3 },
        { label: "i publish weekly and my audience expects it", score: 4 },
        {
          label: "i publish multiple times per week with a clear strategy",
          score: 5,
        },
      ],
    },

    /* — 04 — */
    {
      id: 4,
      category: "Content Plan",
      question:
        "Do You Have a STRUCTURED CONTENT PLAN That leads people from awareness to buying from you?",
      highlightPhrases: ["STRUCTURED CONTENT PLAN"],
      options: [
        { label: "NO PLAN — i post randomly", score: 1 },
        { label: "rough idea but not documented", score: 2 },
        { label: "basic content calendar for the next month", score: 3 },
        {
          label: "clear content journey mapped for the next quarter",
          score: 4,
        },
        {
          label: "fully documented content journey for the whole year",
          score: 5,
        },
      ],
    },

    /* — 05 — */
    {
      id: 5,
      category: "Message",
      question:
        "How Clear Is Your CORE MESSAGE AND VALUE PROPOSITION To Potential Clients?",
      highlightPhrases: ["CORE MESSAGE", "VALUE PROPOSITION"],
      options: [
        { label: "VERY UNCLEAR — even I struggle to explain it", score: 1 },
        {
          label: "SOMEWHAT CLEAR — but it takes a long explanation",
          score: 2,
        },
        { label: "CLEAR — I can explain it in a few sentences", score: 3 },
        { label: "VERY CLEAR — I can explain it in one sentence", score: 4 },
        {
          label: "CRYSTAL CLEAR — other people can repeat it accurately",
          score: 5,
        },
      ],
    },

    /* — 06 — */
    {
      id: 6,
      category: "Offers",
      question:
        "Are You Regularly Making Direct OFFERS That invite people to take the next step (call, demo, trial, purchase)?",
      highlightPhrases: ["Direct OFFERS"],
      options: [
        { label: "i almost never make explicit offers", score: 1 },
        { label: "i make offers a few times per year", score: 2 },
        { label: "i make offers every couple of months", score: 3 },
        { label: "i make offers at least monthly", score: 4 },
        { label: "i make clear offers every week", score: 5 },
      ],
    },

    /* — 07 — */
    {
      id: 7,
      category: "Campaigns",
      question:
        "Do You Run STRUCTURED SALES CAMPAIGNS With a clear start, end, and target rather than ad‑hoc activities?",
      highlightPhrases: ["STRUCTURED SALES CAMPAIGNS"],
      options: [
        { label: "i don’t run campaigns at all", score: 1 },
        { label: "i’ve tried a campaign once or twice", score: 2 },
        { label: "i run a couple of campaigns per year", score: 3 },
        { label: "i run quarterly campaigns with defined goals", score: 4 },
        {
          label: "i run frequent, well‑planned campaigns with tracked results",
          score: 5,
        },
      ],
    },

    /* — 08 — */
    {
      id: 8,
      category: "Sales Process",
      question:
        "How Effectively Do You convert interested LEADS into Paying Customers?",
      highlightPhrases: ["convert interested LEADS"],
      options: [
        { label: "we have no defined sales process", score: 1 },
        { label: "we have a process, but it is rarely followed", score: 2 },
        { label: "our process is followed inconsistently", score: 3 },
        { label: "our process is followed most of the time", score: 4 },
        {
          label: "our process is followed every time and continuously improved",
          score: 5,
        },
      ],
    },

    /* — 09 — */
    {
      id: 9,
      category: "Sales Script",
      question:
        "Do You Have a Repeatable SALES SCRIPT or Conversation Structure your team uses?",
      highlightPhrases: ["Repeatable SALES SCRIPT"],
      options: [
        { label: "no script or structure", score: 1 },
        { label: "some talking points but not documented", score: 2 },
        { label: "a basic script that is occasionally used", score: 3 },
        { label: "a refined script used regularly", score: 4 },
        { label: "a tested script continually optimised", score: 5 },
      ],
    },

    /* — 10 — */
    {
      id: 10,
      category: "Follow Up",
      question:
        "How Strong Is Your Follow-Up System After someone shows interest but doesn’t buy immediately?",
      highlightPhrases: ["Follow-Up System"],
      options: [
        {
          label: "NO FOLLOW‑UP SYSTEM — we hope they come back",
          score: 1,
        },
        { label: "one follow‑up message or call", score: 2 },
        { label: "a short, manual follow‑up sequence", score: 3 },
        {
          label: "an organised follow‑up sequence (3–5 touchpoints)",
          score: 4,
        },
        {
          label: "a long‑term, automated nurture and follow‑up system",
          score: 5,
        },
      ],
    },

    /* — 11 — */
    {
      id: 11,
      category: "Personal Brand Leverage",
      question:
        "Are You Leveraging Your Personal Brand To open doors to Partnerships, Speaking, or Media Opportunities?",
      highlightPhrases: ["Your Personal Brand"],
      options: [
        { label: "NOT AT ALL", score: 1 },
        { label: "RARELY — a few opportunities here and there", score: 2 },
        { label: "SOMETIMES — opportunities show up each year", score: 3 },
        { label: "OFTEN — I regularly get invited or introduced", score: 4 },
        {
          label: "CONSTANTLY — I have more opportunities than I can handle",
          score: 5,
        },
      ],
    },

    /* — 12 — */
    {
      id: 12,
      category: "Lead Capture",
      question:
        "How Systemised is Your Lead Capture Process from your content and campaigns?",
      highlightPhrases: ["Lead Capture Process"],
      options: [
        {
          label: "there is no clear way for people to opt in or enquire",
          score: 1,
        },
        { label: "basic contact form but not promoted", score: 2 },
        { label: "lead magnets or opt‑ins used occasionally", score: 3 },
        {
          label: "multiple lead capture points in place and tracked",
          score: 4,
        },
        {
          label: "fully optimised lead capture funnel integrated with CRM",
          score: 5,
        },
      ],
    },

    /* — 13 — */
    {
      id: 13,
      category: "Segmentation",
      question:
        "Do You Segment Your Audience And tailor your messages based on their stage (cold, warm, hot)?",
      highlightPhrases: ["Segment Your Audience"],
      options: [
        {
          label: "NO SEGMENTATION — everyone gets the same message",
          score: 1,
        },
        {
          label: "minimal segmentation based on rough criteria",
          score: 2,
        },
        {
          label: "some segmentation (e.g. prospects vs. clients)",
          score: 3,
        },
        {
          label: "clear segments with different offers and messages",
          score: 4,
        },
        {
          label: "highly segmented, behaviour‑based messaging",
          score: 5,
        },
      ],
    },

    /* — 14 — */
    {
      id: 14,
      category: "Predictability",
      question:
        "How Confident Are You That You Can Predict Your SALES For the next 90 days?",
      highlightPhrases: ["Predict Your SALES"],
      options: [
        { label: "i have no idea what sales will be", score: 1 },
        {
          label: "i have a rough guess but it’s usually wrong",
          score: 2,
        },
        { label: "i can estimate within ±50%", score: 3 },
        { label: "i can estimate within ±20%", score: 4 },
        {
          label: "i can predict with a high degree of accuracy",
          score: 5,
        },
      ],
    },

    /* — 15 — */
    {
      id: 15,
      category: "Premium Pricing",
      question:
        "To What Extent Does Your Personal Brand Allow Premium Pricing In your market?",
      highlightPhrases: ["Personal Brand Allow Premium Pricing"],
      options: [
        { label: "i must compete mainly on low price", score: 1 },
        {
          label: "i’m slightly more expensive than the cheapest options",
          score: 2,
        },
        { label: "i’m mid‑range in my market", score: 3 },
        {
          label: "i can charge above‑average prices confidently",
          score: 4,
        },
        {
          label: "i command premium prices and still attract clients",
          score: 5,
        },
      ],
    },
  ],

  interpretationBands: [
    {
      title: "Hidden Expert",
      range: [15, 29],
      slug: "hidden-expert",
      redirectUrl: "/score/v1",
      lightColor: "red",
    },
    {
      title: "Inconsistent Influencer",
      range: [30, 44],
      slug: "inconsistent-influencer",
      redirectUrl: "/score/v1",
      lightColor: "yellow",
    },
    {
      title: "Emerging Authority",
      range: [45, 59],
      slug: "emerging-authority",
      redirectUrl: "/score/v1",
      lightColor: "yellow",
    },
    {
      title: "Market Leader",
      range: [60, 75],
      slug: "market-leader",
      redirectUrl: "/score/v1",
      lightColor: "green",
    },
  ],
};

export const scorecard_v2: Scorecard = {
  id: "scorecard-v2",
  questions: [
    /* — 01 — */
    {
      id: 1,
      category: "Audience & Positioning",
      question:
        "Are You Consistently Attracting Your IDEAL PROSPECTS Who have the budget and authority to buy your product or service?",
      highlightPhrases: ["Your IDEAL PROSPECTS"],
      options: [
        { label: "NEVER", score: 1 },
        { label: "OCCACIONALLY", score: 2 },
        { label: "ABOUT HALF THE TIME", score: 3 },
        { label: "MOST OF THE TIME", score: 4 },
        { label: "ALWAYS", score: 5 },
      ],
    },

    /* — 02 — */
    {
      id: 2,
      category: "Personal Brand",
      question:
        "Do You Have a Clearly Defined Personal Brand That your market can describe in one sentence?",
      highlightPhrases: ["Clearly Defined Personal Brand"],
      options: [
        { label: "NOT AT ALL — people are confused about what I do", score: 1 },
        { label: "SLIGHTLY — some people get it, most don’t", score: 2 },
        { label: "MODERATELY — my close network understands it", score: 3 },
        {
          label: "STRONG — most of my market could describe it reasonably well",
          score: 4,
        },
        {
          label:
            "VERY STRONG — my positioning is famous and clearly understood",
          score: 5,
        },
      ],
    },

    /* — 03 — */
    {
      id: 3,
      category: "Content",
      question:
        "How Consistently Are You Publishing Valuable Content That demonstrates your expertise?",
      highlightPhrases: ["Publishing Valuable Content"],
      options: [
        { label: "i rarely publish content", score: 1 },
        { label: "i publish once in a while, without a plan", score: 2 },
        { label: "i publish monthly with some consistency", score: 3 },
        { label: "i publish weekly and my audience expects it", score: 4 },
        {
          label: "i publish multiple times per week with a clear strategy",
          score: 5,
        },
      ],
    },

    /* — 04 — */
    {
      id: 4,
      category: "Content Plan",
      question:
        "Do You Have a STRUCTURED CONTENT PLAN That leads people from awareness to buying from you?",
      highlightPhrases: ["STRUCTURED CONTENT PLAN"],
      options: [
        { label: "NO PLAN — i post randomly", score: 1 },
        { label: "rough idea but not documented", score: 2 },
        { label: "basic content calendar for the next month", score: 3 },
        {
          label: "clear content journey mapped for the next quarter",
          score: 4,
        },
        {
          label: "fully documented content journey for the whole year",
          score: 5,
        },
      ],
    },

    /* — 05 — */
    {
      id: 5,
      category: "Message",
      question:
        "How Clear Is Your CORE MESSAGE AND VALUE PROPOSITION To Potential Clients?",
      highlightPhrases: ["CORE MESSAGE", "VALUE PROPOSITION"],
      options: [
        { label: "VERY UNCLEAR — even I struggle to explain it", score: 1 },
        {
          label: "SOMEWHAT CLEAR — but it takes a long explanation",
          score: 2,
        },
        { label: "CLEAR — I can explain it in a few sentences", score: 3 },
        { label: "VERY CLEAR — I can explain it in one sentence", score: 4 },
        {
          label: "CRYSTAL CLEAR — other people can repeat it accurately",
          score: 5,
        },
      ],
    },

    /* — 06 — */
    {
      id: 6,
      category: "Offers",
      question:
        "Are You Regularly Making Direct OFFERS That invite people to take the next step (call, demo, trial, purchase)?",
      highlightPhrases: ["Direct OFFERS"],
      options: [
        { label: "i almost never make explicit offers", score: 1 },
        { label: "i make offers a few times per year", score: 2 },
        { label: "i make offers every couple of months", score: 3 },
        { label: "i make offers at least monthly", score: 4 },
        { label: "i make clear offers every week", score: 5 },
      ],
    },

    /* — 07 — */
    {
      id: 7,
      category: "Campaigns",
      question:
        "Do You Run STRUCTURED SALES CAMPAIGNS With a clear start, end, and target rather than ad‑hoc activities?",
      highlightPhrases: ["STRUCTURED SALES CAMPAIGNS"],
      options: [
        { label: "i don’t run campaigns at all", score: 1 },
        { label: "i’ve tried a campaign once or twice", score: 2 },
        { label: "i run a couple of campaigns per year", score: 3 },
        { label: "i run quarterly campaigns with defined goals", score: 4 },
        {
          label: "i run frequent, well‑planned campaigns with tracked results",
          score: 5,
        },
      ],
    },

    /* — 08 — */
    {
      id: 8,
      category: "Sales Process",
      question:
        "How Effectively Do You convert interested LEADS into Paying Customers?",
      highlightPhrases: ["convert interested LEADS"],
      options: [
        { label: "we have no defined sales process", score: 1 },
        { label: "we have a process, but it is rarely followed", score: 2 },
        { label: "our process is followed inconsistently", score: 3 },
        { label: "our process is followed most of the time", score: 4 },
        {
          label: "our process is followed every time and continuously improved",
          score: 5,
        },
      ],
    },

    /* — 09 — */
    {
      id: 9,
      category: "Sales Script",
      question:
        "Do You Have a Repeatable SALES SCRIPT or Conversation Structure your team uses?",
      highlightPhrases: ["Repeatable SALES SCRIPT"],
      options: [
        { label: "no script or structure", score: 1 },
        { label: "some talking points but not documented", score: 2 },
        { label: "a basic script that is occasionally used", score: 3 },
        { label: "a refined script used regularly", score: 4 },
        { label: "a tested script continually optimised", score: 5 },
      ],
    },

    /* — 10 — */
    {
      id: 10,
      category: "Follow Up",
      question:
        "How Strong Is Your Follow-Up System After someone shows interest but doesn’t buy immediately?",
      highlightPhrases: ["Follow-Up System"],
      options: [
        {
          label: "NO FOLLOW‑UP SYSTEM — we hope they come back",
          score: 1,
        },
        { label: "one follow‑up message or call", score: 2 },
        { label: "a short, manual follow‑up sequence", score: 3 },
        {
          label: "an organised follow‑up sequence (3–5 touchpoints)",
          score: 4,
        },
        {
          label: "a long‑term, automated nurture and follow‑up system",
          score: 5,
        },
      ],
    },

    /* — 11 — */
    {
      id: 11,
      category: "Personal Brand Leverage",
      question:
        "Are You Leveraging Your Personal Brand To open doors to Partnerships, Speaking, or Media Opportunities?",
      highlightPhrases: ["Your Personal Brand"],
      options: [
        { label: "NOT AT ALL", score: 1 },
        { label: "RARELY — a few opportunities here and there", score: 2 },
        { label: "SOMETIMES — opportunities show up each year", score: 3 },
        { label: "OFTEN — I regularly get invited or introduced", score: 4 },
        {
          label: "CONSTANTLY — I have more opportunities than I can handle",
          score: 5,
        },
      ],
    },

    /* — 12 — */
    {
      id: 12,
      category: "Lead Capture",
      question:
        "How Systemised is Your Lead Capture Process from your content and campaigns?",
      highlightPhrases: ["Lead Capture Process"],
      options: [
        {
          label: "there is no clear way for people to opt in or enquire",
          score: 1,
        },
        { label: "basic contact form but not promoted", score: 2 },
        { label: "lead magnets or opt‑ins used occasionally", score: 3 },
        {
          label: "multiple lead capture points in place and tracked",
          score: 4,
        },
        {
          label: "fully optimised lead capture funnel integrated with CRM",
          score: 5,
        },
      ],
    },

    /* — 13 — */
    {
      id: 13,
      category: "Segmentation",
      question:
        "Do You Segment Your Audience And tailor your messages based on their stage (cold, warm, hot)?",
      highlightPhrases: ["Segment Your Audience"],
      options: [
        {
          label: "NO SEGMENTATION — everyone gets the same message",
          score: 1,
        },
        {
          label: "minimal segmentation based on rough criteria",
          score: 2,
        },
        {
          label: "some segmentation (e.g. prospects vs. clients)",
          score: 3,
        },
        {
          label: "clear segments with different offers and messages",
          score: 4,
        },
        {
          label: "highly segmented, behaviour‑based messaging",
          score: 5,
        },
      ],
    },

    /* — 14 — */
    {
      id: 14,
      category: "Predictability",
      question:
        "How Confident Are You That You Can Predict Your SALES For the next 90 days?",
      highlightPhrases: ["Predict Your SALES"],
      options: [
        { label: "i have no idea what sales will be", score: 1 },
        {
          label: "i have a rough guess but it’s usually wrong",
          score: 2,
        },
        { label: "i can estimate within ±50%", score: 3 },
        { label: "i can estimate within ±20%", score: 4 },
        {
          label: "i can predict with a high degree of accuracy",
          score: 5,
        },
      ],
    },

    /* — 15 — */
    {
      id: 15,
      category: "Premium Pricing",
      question:
        "To What Extent Does Your Personal Brand Allow Premium Pricing In your market?",
      highlightPhrases: ["Personal Brand Allow Premium Pricing"],
      options: [
        { label: "i must compete mainly on low price", score: 1 },
        {
          label: "i’m slightly more expensive than the cheapest options",
          score: 2,
        },
        { label: "i’m mid‑range in my market", score: 3 },
        {
          label: "i can charge above‑average prices confidently",
          score: 4,
        },
        {
          label: "i command premium prices and still attract clients",
          score: 5,
        },
      ],
    },
  ],

  interpretationBands: [
    {
      title: "Hidden Expert",
      range: [15, 29],
      slug: "hidden-expert",
      redirectUrl: "/score/v2",
      lightColor: "red",
    },
    {
      title: "Inconsistent Influencer",
      range: [30, 44],
      slug: "inconsistent-influencer",
      redirectUrl: "/score/v2",
      lightColor: "yellow",
    },
    {
      title: "Emerging Authority",
      range: [45, 59],
      slug: "emerging-authority",
      redirectUrl: "/score/v2",
      lightColor: "yellow",
    },
    {
      title: "Market Leader",
      range: [60, 75],
      slug: "market-leader",
      redirectUrl: "/score/v2",
      lightColor: "green",
    },
  ],
};

/* —— NEW: SHARED HIGHLIGHT WORDS FUNCTION —— */
export function getHighlightWords(scorecard: Scorecard): string[] {
  const allPhrases = scorecard.questions.flatMap((q) => q.highlightPhrases);
  return Array.from(new Set(allPhrases));
}
