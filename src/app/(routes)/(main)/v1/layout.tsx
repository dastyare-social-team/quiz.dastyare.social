import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Personal Brand Health Scorecard — Is Your Brand Generating Demand?",
  description:
    "A 5-minute scorecard that tells you whether your personal brand is healthy enough to generate demand and make money — and what to fix first. No email required",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
