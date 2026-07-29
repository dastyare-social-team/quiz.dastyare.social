"use client";

import { useEffect } from "react";
import { capture, initPostHog } from "@/lib/posthog";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();

    const handleError = (event: ErrorEvent) => {
      capture("client_error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      capture("client_unhandled_rejection", {
        reason: event.reason?.toString?.() ?? "unknown",
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = `${window.location.pathname}${window.location.search}`;
    capture("pageview", { page: url });
  }, []);

  return <>{children}</>;
}
