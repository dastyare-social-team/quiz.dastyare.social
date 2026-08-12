import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { pally } from "@/lib/fonts";
import { CONSENT_COOKIE_NAME } from "@/lib/consent";
import { PostHogProvider } from "@/components/posthog-provider";
import { PageAnalytics } from "@/components/page-analytics";
import { ConsentBanner } from "@/components/consent-banner";

export const metadata: Metadata = {
  title: {
    default: "Scorecard — Dastyare Social",
    template: "%s — Dastyare Social",
  },
  description: "quiz.dastyare.social",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialConsent = cookieStore.get(CONSENT_COOKIE_NAME)?.value as
    | "granted"
    | "denied"
    | undefined;

  return (
    <html lang="en">
      <body className={cn(pally.className, "antialiased tracking-tighter")}>
        <PostHogProvider>
          {children}
          <PageAnalytics />
          <ConsentBanner initialConsent={initialConsent} />
        </PostHogProvider>
      </body>
    </html>
  );
}
