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

/**
 * Visual weight for a band, expressed as opacity (%) of the single primary
 * color (orange-600) — not a different hue per band. Weakest band = lowest
 * opacity, strongest band = full opacity.
 * Apply as `bg-orange-600/${lightColor}` (Tailwind opacity modifier), or the
 * equivalent in your charting library's color config.
 */
export type BandIntensity = 20 | 40 | 70 | 100;

export type InterpretationBand = {
  title: string;
  range: [number, number];
  slug: string;
  redirectUrl: string;
  lightColor: BandIntensity;
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
