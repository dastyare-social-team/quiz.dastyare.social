"use client";

import { useEffect } from "react";
import { capture, initPostHog } from "@/lib/posthog";

const MAX_TRACK_TEXT_LENGTH = 100;

function getTrackableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const el = target.closest<HTMLElement>(
    "button, a[href], [role='button']",
  );

  if (!el) {
    return null;
  }

  if (el.closest("[data-ph-exclude-click]")) {
    return null;
  }

  return el;
}

function getElementText(el: HTMLElement): string {
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  return text.slice(0, MAX_TRACK_TEXT_LENGTH);
}

function trackClick(event: MouseEvent) {
  if (event.button !== 0) {
    return;
  }

  const el = getTrackableTarget(event.target);
  if (!el) {
    return;
  }

  const pathname = window.location.pathname;
  const search = window.location.search;

  const tagName = el.tagName.toLowerCase();

  if (tagName === "a") {
    const anchor = el as HTMLAnchorElement;
    const href = anchor.href || "";

    try {
      const url = new URL(href);
      const isExternal = url.origin !== window.location.origin;

      if (isExternal || anchor.target === "_blank") {
        capture("outbound_link_clicked", {
          url: href,
          link_text: getElementText(el),
          pathname,
        });
      } else {
        capture("link_clicked", {
          href: `${url.pathname}${url.search}`,
          link_text: getElementText(el),
          pathname,
        });
      }
    } catch {
      // ignore malformed hrefs
    }

    return;
  }

  const variant = el.getAttribute("data-variant") || undefined;

  capture("button_clicked", {
    text: getElementText(el),
    variant,
    pathname,
    page: `${pathname}${search}`,
  });
}

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
    document.addEventListener("click", trackClick);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      document.removeEventListener("click", trackClick);
    };
  }, []);

  return <>{children}</>;
}
