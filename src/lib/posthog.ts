import posthog from "posthog-js";
import { CONSENT_COOKIE_NAME, VISITOR_ID_COOKIE_NAME } from "@/lib/consent";

type PostHogEventProperties = Record<string, unknown>;

const posthogKey =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";
const isPostHogEnabled = Boolean(posthogKey);

export type PostHogConsent = "granted" | "denied";

let initialized = false;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeDays: number) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${
    maxAgeDays * 24 * 60 * 60
  }; SameSite=Lax`;
}

export function getPostHogConsent(): PostHogConsent | null {
  const value = getCookie(CONSENT_COOKIE_NAME);

  if (value === "granted") {
    return "granted";
  }

  if (value === "denied") {
    return "denied";
  }

  return null;
}

export function getVisitorId(): string | null {
  return getCookie(VISITOR_ID_COOKIE_NAME);
}

export function setPostHogConsent(consent: PostHogConsent) {
  setCookie(CONSENT_COOKIE_NAME, consent, 365);

  if (typeof window !== "undefined" && isPostHogEnabled) {
    if (consent === "granted") {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }
}

export function initPostHog() {
  if (typeof window === "undefined" || initialized || !isPostHogEnabled) {
    return;
  }

  const key = posthogKey;
  if (!key) {
    return;
  }

  const consent = getPostHogConsent();

  posthog.init(key, {
    api_host: posthogHost,
    capture_pageview: false,
    capture_pageleave: true,
    mask_all_text: true,
    mask_all_element_attributes: true,
    opt_out_capturing_by_default: true,
    capture_exceptions: true,
    capture_heatmaps: true,
    debug: process.env.NODE_ENV === "development",
  });

  posthog.startSessionRecording();

  // Align the client's distinct_id with the visitor_id used server-side for
  // the landing experiment, so events link to the assigned variant.
  const visitorId = getVisitorId();
  if (visitorId) {
    posthog.identify(visitorId);
  }

  if (consent === "granted") {
    posthog.opt_in_capturing();
  }

  initialized = true;
}

export function capture(event: string, properties?: PostHogEventProperties) {
  if (typeof window === "undefined" || !isPostHogEnabled) {
    return;
  }

  posthog.capture(event, properties);
}

export function identify(
  distinctId: string,
  properties?: PostHogEventProperties,
) {
  if (typeof window === "undefined" || !isPostHogEnabled) {
    return;
  }

  posthog.identify(distinctId, properties);
}

export function captureException(
  error: unknown,
  properties?: PostHogEventProperties,
) {
  if (typeof window === "undefined" || !isPostHogEnabled) {
    return;
  }

  posthog.captureException(error, properties);
}

export function capturePageview(pathname: string, search = "") {
  capture("$pageview", {
    page: `${pathname}${search}`,
    pathname,
    search,
  });
}
