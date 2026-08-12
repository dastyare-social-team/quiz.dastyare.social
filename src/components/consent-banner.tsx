"use client";

import { useState } from "react";
import { setPostHogConsent } from "@/lib/posthog";
import type { PostHogConsent } from "@/lib/posthog";
import { Button } from "./button";

export function ConsentBanner({
  initialConsent,
}: {
  initialConsent?: "granted" | "denied";
}) {
  const [consent, setConsent] = useState<PostHogConsent | null>(
    initialConsent ?? null,
  );

  if (consent !== null) {
    return null;
  }

  const choose = (next: PostHogConsent) => {
    setPostHogConsent(next);
    setConsent(next);
  };

  return (
    <div
      data-ph-exclude-click
      className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 flex flex-col gap-y-2.5 rounded-3xl border border-primary/10 bg-white/50 backdrop-blur-3xl px-5 py-4 text-secondary/90"
    >
      <p className="text-[20px]">
        We use analytics cookies to understand how visitors use this site and
        improve it
      </p>
      <div className="flex gap-x-2.5 justify-end text-[16px] mt-2.5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => choose("denied")}
          className="text-[18px] border px-5"
        >
          Decline
        </Button>
        <Button
          type="button"
          onClick={() => choose("granted")}
          className="text-[18px] px-5"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
