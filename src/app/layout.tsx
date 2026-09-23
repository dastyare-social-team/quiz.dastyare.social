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
  metadataBase: new URL("https://quiz.dastyare.social"),
  title: {
    default: "Scorecard — Dastyare Social",
    template: "%s — Dastyare Social",
  },
  description: "quiz.dastyare.social",
  openGraph: {
    type: "website",
    siteName: "Dastyare Social",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 626,
        alt: "Scorecard — Dastyare Social",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
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
