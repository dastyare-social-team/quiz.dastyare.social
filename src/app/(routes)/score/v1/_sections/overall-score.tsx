"use client";

import {
  EChartsPieChart,
  type ChartConfig,
} from "@/components/evilcharts/charts/echarts-pie-chart";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";

type Props = {
  score?: number; // 0-100
};

const chartConfig: ChartConfig = {
  atrisk: {
    label: "Flatlining",
    colors: { light: ["#e11d48"], dark: ["#fb7185"] },
  },
  fair: {
    label: "Unstable",
    colors: { light: ["#f59e0b"], dark: ["#fbbf24"] },
  },
  good: {
    label: "Stabilizing",
    colors: { light: ["#84cc16"], dark: ["#a3e635"] },
  },
  excellent: {
    label: "Compounding",
    colors: { light: ["#059669"], dark: ["#34d399"] },
  },
};

export default function ScoreOverallScoreSectionV1({ score = 84 }: Props) {
  const MAX = 100;

  const bands = [
    { band: "atrisk", label: "Flatlining", from: 0, to: 39 },
    { band: "fair", label: "Unstable", from: 40, to: 59 },
    { band: "good", label: "Stabilizing", from: 60, to: 79 },
    { band: "excellent", label: "Compounding", from: 80, to: 100 },
  ];

  const chartData = bands.map(({ band, from, to }) => ({
    band,
    label: band,
    value: to - from + 1,
  }));

  const band = bands.find((b) => score >= b.from && score <= b.to) ?? bands[0];

  return (
    <section className="border border-primary/5 rounded-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-primary text-xl font-semibold">
            Your Personal Brand Has a Pulse. Here's What It's Telling You.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Every founder's personal brand is either compounding or decaying.
            There's no neutral. Here's where yours stands today.
          </p>
          <p className="mt-2 text-primary font-medium">{band.label}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-40 h-40">
            <EChartsPieChart
              data={chartData}
              config={chartConfig}
              dataKey="value"
              nameKey="band"
              className="h-full w-full"
            >
              <EChartsPieChart.Pie
                innerRadius="70%"
                outerRadius="95%"
                startAngle={-30}
                endAngle={210}
                paddingAngle={4}
                cornerRadius={8}
              />
            </EChartsPieChart>
          </div>

          <div className="flex flex-col">
            <span className="text-primary text-3xl font-semibold">
              {Math.round(score)}
            </span>
            <button
              onClick={async () => {
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
                    "Your Personal Brand Has a Pulse. Here's What It's Telling You.",
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
                    `Overall score: ${Math.round(score)} (${band.label})`,
                    margin,
                    y,
                  );
                  y += 28;

                  pdf.setFontSize(12);
                  const vitals = [
                    {
                      name: "Visibility",
                      text: `Can the right people find you before they find someone else?`,
                    },
                    {
                      name: "Authority",
                      text: `When they find you, do they trust what they see?`,
                    },
                    {
                      name: "Consistency",
                      text: `Are you showing up on a rhythm, or ghosting for weeks at a time?`,
                    },
                    {
                      name: "Ownership",
                      text: `Do you own your audience, or are you renting it from a platform?`,
                    },
                    {
                      name: "Demand",
                      text: `Does any of this actually make you money?`,
                    },
                  ];

                  for (const v of vitals) {
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

                  pdf.save("full-report.pdf");
                } catch (err) {
                  // fallback to print dialog
                  window.print();
                }
              }}
              className={cn(
                "mt-2 inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium",
              )}
            >
              Download Your Full Report (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
