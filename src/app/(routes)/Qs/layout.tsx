import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
