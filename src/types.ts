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
  slug: string;
  redirectUrl: string;
  lightColor: "red" | "yellow" | "green";
};

export type Scorecard = {
  id: string;
  questions: ScoreQuestion[];
  interpretationBands: InterpretationBand[];
};

/* Shared utility: collect unique highlighted phrases */
export function getHighlightWords(scorecard: Scorecard): string[] {
  const allPhrases = scorecard.questions.flatMap((q) => q.highlightPhrases);
  return Array.from(new Set(allPhrases));
}
