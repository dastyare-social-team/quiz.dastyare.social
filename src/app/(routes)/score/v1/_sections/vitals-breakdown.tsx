"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

const vitals = [
  { key: "visibility", label: "Visibility", value: 68 },
  { key: "authority", label: "Authority", value: 72 },
  { key: "consistency", label: "Consistency", value: 55 },
  { key: "ownership", label: "Ownership", value: 45 },
  { key: "demand", label: "Demand", value: 61 },
];

function bandColor(score: number) {
  if (score <= 39) return "#e11d48"; // atrisk
  if (score <= 59) return "#f59e0b"; // fair
  if (score <= 79) return "#84cc16"; // good
  return "#059669"; // excellent
}

export default function VitalsBreakdownSectionV1() {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chartRef.current = chart;

    const sorted = [...vitals].sort((a, b) => a.value - b.value);
    const categories = sorted.map((v) => v.label);

    const achieved = sorted.map((v) => ({
      value: v.value,
      itemStyle: { color: bandColor(v.value) },
    }));
    const remaining = sorted.map((v) => ({
      value: Math.max(0, 100 - v.value),
      itemStyle: { color: "#e6e9ee" },
    }));

    const option = {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: 12, right: 12, bottom: 12, top: 12 },
      xAxis: { type: "value", max: 100, show: false },
      yAxis: { type: "category", data: categories, inverse: true },
      series: [
        {
          name: "Achieved",
          type: "bar",
          stack: "total",
          label: { show: true, position: "insideLeft", formatter: "{c}" },
          data: achieved,
          barWidth: 18,
        },
        {
          name: "Remaining",
          type: "bar",
          stack: "total",
          data: remaining,
          barWidth: 18,
          itemStyle: { color: "#f3f4f6" },
        },
      ],
    };

    chart.setOption(option);

    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  return (
    <section className="border border-primary/5 rounded-md p-6">
      <h3 className="text-lg font-semibold text-primary">
        Here's Where Each Vital Actually Stands
      </h3>
      <p className="mt-2 text-muted-foreground">
        No two vitals decay the same way. Here's what your score means for each
        one — and what it actually looks like at your level right now.
      </p>

      <div className="mt-4 h-72">
        <div ref={ref} className="h-full w-full" />
      </div>

      <div className="mt-4 grid gap-3">
        {vitals.map((v) => (
          <div key={v.key} className="text-sm">
            <strong>{v.label}</strong>
            <p className="mt-1 text-muted-foreground">
              {v.value <= 39
                ? "Flatlining"
                : v.value <= 59
                  ? "Unstable"
                  : v.value <= 79
                    ? "Stabilizing"
                    : "Compounding"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
