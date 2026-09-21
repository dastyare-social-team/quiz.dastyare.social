import { jsPDF } from "jspdf";
import { scorecard_v1 } from "@/config/scorecard-v1";

const VITALS = [
  {
    name: "Visibility",
    text: "Can the right people find you before they find someone else?",
  },
  {
    name: "Authority",
    text: "When they find you, do they trust what they see?",
  },
  {
    name: "Consistency",
    text: "Are you showing up on a rhythm, or ghosting for weeks at a time?",
  },
  {
    name: "Ownership",
    text: "Do you own your audience, or are you renting it from a platform?",
  },
  {
    name: "Demand",
    text: "Does any of this actually make you money?",
  },
];

export function getMaxTotal() {
  const maxOptionScore = Math.max(
    ...scorecard_v1.questions.flatMap((q) => q.options.map((o) => o.score)),
  );
  return scorecard_v1.questions.length * maxOptionScore;
}

export function toPercent(total: number) {
  return Math.round((total / getMaxTotal()) * 100);
}

export function getBandForTotal(total: number) {
  return (
    scorecard_v1.interpretationBands.find(
      (b) => total >= b.range[0] && total <= b.range[1],
    ) ?? scorecard_v1.interpretationBands[0]
  );
}

export function getBandBySlug(slug: string | null) {
  if (!slug) return null;
  return scorecard_v1.interpretationBands.find((b) => b.slug === slug) ?? null;
}

const RESULT_HEADLINES: Record<string, string> = {
  flatlining: "Your Personal Brand Has a Pulse. Right Now, It's Barely Beating.",
  unstable: "Your Personal Brand Has a Pulse. It's Beating, But It's Uneven.",
  stabilizing: "Your Personal Brand Has a Pulse. It's Getting Steadier.",
  compounding: "Your Personal Brand Has a Pulse. It's Compounding.",
};

const DEFAULT_HEADLINE =
  "Your Personal Brand Has a Pulse. Here's What It's Telling You.";

export function getResultHeadline(slug: string | null) {
  if (!slug) return DEFAULT_HEADLINE;
  return RESULT_HEADLINES[slug] ?? DEFAULT_HEADLINE;
}

export async function downloadPbReport(total: number) {
  const band = getBandForTotal(total);
  const percent = toPercent(total);
  const headline = getResultHeadline(band.slug);

  try {
    const res = await fetch("/api/font/pally");
    const json = await res.json();
    const base64 = json.base64 as string;
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    pdf.addFileToVFS("Pally-Regular.ttf", base64);
    pdf.addFont("Pally-Regular.ttf", "Pally", "normal");
    pdf.setFont("Pally");
    pdf.setFontSize(16);
    const margin = 40;
    let y = 60;
    pdf.text(
      headline,
      margin,
      y,
    );
    y += 24;
    pdf.setFontSize(11);
    pdf.text(
      "Every founder's personal brand is either compounding or decaying. There's no neutral. Here's where yours stands today.",
      margin,
      y,
      { maxWidth: 500 },
    );
    y += 36;

    pdf.setFontSize(14);
    pdf.text(
      `Overall score: ${percent} percent (${band.title})`,
      margin,
      y,
    );
    y += 28;

    for (const v of VITALS) {
      if (y > 730) {
        pdf.addPage();
        y = 60;
      }
      pdf.setFontSize(12);
      pdf.text(`${v.name}:`, margin, y);
      y += 16;
      pdf.setFontSize(10);
      pdf.text(v.text, margin + 8, y, { maxWidth: 480 });
      y += 26;
    }

    pdf.save("pb-report.pdf");
  } catch {
    // fallback to print dialog
    window.print();
  }
}
