export type ScoreVital = {
  key: string;
  label: string;
  value: number;
  text: string;
};

/* —— Placeholder per-vital data until the questionnaire passes
   per-category totals through the result URL —— */
export const SCORE_VITALS: ScoreVital[] = [
  {
    key: "visibility",
    label: "Visibility",
    value: 68,
    text: "Can the right people find you before they find someone else?",
  },
  {
    key: "authority",
    label: "Authority",
    value: 72,
    text: "When they find you, do they trust what they see?",
  },
  {
    key: "consistency",
    label: "Consistency",
    value: 55,
    text: "Are you showing up on a rhythm, or ghosting for weeks at a time?",
  },
  {
    key: "ownership",
    label: "Ownership",
    value: 45,
    text: "Do you own your audience, or are you renting it from a platform?",
  },
  {
    key: "demand",
    label: "Demand",
    value: 61,
    text: "Does any of this actually make you money?",
  },
];

export function statusForVital(value: number) {
  if (value <= 39) return "Flatlining";
  if (value <= 59) return "Unstable";
  if (value <= 79) return "Stabilizing";
  return "Compounding";
}
