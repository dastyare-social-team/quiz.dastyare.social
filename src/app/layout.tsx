import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const pally = localFont({
  src: [
    {
      path: "../assets/fonts/Pally-Regular.ttf",
      weight: "400",
    }
  ],
  variable: "--font-pally",
});

export const metadata: Metadata = {
  title: {
    default: "Dastyare Social — See How Much Far You Can Go",
    template: "%s — Dastyare Social",
  },
  description: "quiz.dastyare.social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(pally.className, "antialiased tracking-tighter")}>
        {children}
      </body>
    </html>
  );
}
