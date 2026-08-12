"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { capture, capturePageview } from "@/lib/posthog";

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

function getVariant(pathname: string): string | undefined {
  return pathname.match(/^\/(?:(?:questions|score)\/)?(v[12])/)?.[1];
}

function getSearchParam(search: string, key: string): string | null {
  return new URLSearchParams(search).get(key);
}

export function PageAnalytics() {
  const pathname = usePathname();

  const startedAtRef = useRef<number>(0);
  const currentPathnameRef = useRef<string | null>(null);
  const trackedScrollRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentPathname = currentPathnameRef.current;
    const now = Date.now();

    if (currentPathname && currentPathname !== pathname) {
      const durationSeconds = Math.round((now - startedAtRef.current) / 1000);
      if (durationSeconds >= 1) {
        capture("page_engaged", {
          pathname: currentPathname,
          duration_seconds: durationSeconds,
        });
      }
    }

    currentPathnameRef.current = pathname;
    startedAtRef.current = now;
    trackedScrollRef.current = new Set();

    const search = window.location.search;
    const variant = getVariant(pathname);

    capturePageview(pathname, search);

    if (!variant) {
      return;
    }

    if (pathname.startsWith("/questions")) {
      capture("questions_page_viewed", { variant, page: pathname });
    } else if (pathname.startsWith("/score")) {
      capture("score_result_viewed", {
        variant,
        page: pathname,
        score: getSearchParam(search, "score"),
        result: getSearchParam(search, "result"),
      });
    } else {
      capture("landing_page_viewed", { variant, page: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll <= 0) {
          return;
        }

        const ratio = scrollTop / maxScroll;

        for (const threshold of SCROLL_THRESHOLDS) {
          if (
            ratio >= threshold / 100 &&
            !trackedScrollRef.current.has(threshold)
          ) {
            trackedScrollRef.current.add(threshold);
            capture(`scroll_depth_${threshold}`, {
              pathname: currentPathnameRef.current ?? window.location.pathname,
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
