"use client";

import {
  EChartsRadialChart,
  type ChartConfig,
} from "@/components/evilcharts/charts/echarts-radial-chart";

const data = [
  { vital: "visibility", value: 68 },
  { vital: "authority", value: 72 },
  { vital: "consistency", value: 55 },
  { vital: "ownership", value: 45 },
  { vital: "demand", value: 61 },
];

const config: ChartConfig = {
  visibility: {
    label: "Visibility",
    colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
  },
  authority: {
    label: "Authority",
    colors: { light: ["#10b981"], dark: ["#34d399"] },
  },
  consistency: {
    label: "Consistency",
    colors: { light: ["#f59e0b"], dark: ["#fbbf24"] },
  },
  ownership: {
    label: "Ownership",
    colors: { light: ["#8b5cf6"], dark: ["#a78bfa"] },
  },
  demand: {
    label: "Demand",
    colors: { light: ["#be123c"], dark: ["#f43f5e"] },
  },
};

export default function FiveVitalsSectionV1() {
  return (
    <section className="border border-primary/5 rounded-md p-6">
      <h3 className="text-lg font-semibold text-primary">
        The 5 Vitals of a Personal Brand That Actually Works
      </h3>
      <p className="mt-2 text-muted-foreground">
        Views and followers aren't vitals — they're symptoms. These are the 5
        things that actually decide whether a personal brand builds trust,
        builds demand, or builds nothing at all.
      </p>

      <div className="mt-4 flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/2">
          <div className="h-64 md:h-80">
            <EChartsRadialChart
              data={data}
              config={config}
              nameKey="vital"
              variant="semi"
              innerRadius="60%"
              outerRadius="100%"
              className="h-full w-full"
            >
              <EChartsRadialChart.Legend variant="rounded-square" />
              <EChartsRadialChart.Tooltip />
              <EChartsRadialChart.RadialBar dataKey="value" barSize={18} />
            </EChartsRadialChart>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <strong>Visibility</strong> — Can the right people find you before
              they find someone else?
            </li>
            <li>
              <strong>Authority</strong> — When they find you, do they trust
              what they see?
            </li>
            <li>
              <strong>Consistency</strong> — Are you showing up on a rhythm, or
              ghosting for weeks at a time?
            </li>
            <li>
              <strong>Ownership</strong> — Do you own your audience, or are you
              renting it from a platform?
            </li>
            <li>
              <strong>Demand</strong> — Does any of this actually make you
              money?
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
