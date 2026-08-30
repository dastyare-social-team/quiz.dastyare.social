import posthog, { type PostHog } from "posthog-js";
import { CONSENT_COOKIE_NAME, VISITOR_ID_COOKIE_NAME } from "@/lib/consent";

type PostHogEventProperties = Record<string, unknown>;

const posthogKey =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

// Optional secondary instance routed to the Dastyare Social ORG PostHog project.
// Set NEXT_PUBLIC_POSTHOG_ORG_PROJECT_TOKEN to record every
// visitor to BOTH the primary project (omidshabab.com) and the ORG project.
const posthogOrgKey = process.env.NEXT_PUBLIC_POSTHOG_ORG_PROJECT_TOKEN?.trim();
const posthogOrgHost =
  process.env.NEXT_PUBLIC_POSTHOG_ORG_HOST?.trim() || "https://us.i.posthog.com";

const isPostHogEnabled = Boolean(posthogKey);
const isOrgEnabled = Boolean(posthogOrgKey);

const ORG_INSTANCE = "dastyare_org";

export type PostHogConsent = "granted" | "denied";

let initialized = false;
let initializedOrg = false;
let orgClient: PostHog | null = null;

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

function forEachClient(fn: (client: PostHog) => void) {
  if (typeof window === "undefined") {
    return;
  }
  if (isPostHogEnabled) {
    fn(posthog);
  }
  if (isOrgEnabled && orgClient) {
    fn(orgClient);
  }
}

export function setPostHogConsent(consent: PostHogConsent) {
  setCookie(CONSENT_COOKIE_NAME, consent, 365);

  if (typeof window !== "undefined") {
    if (consent === "granted") {
      forEachClient((client) => {
        client.opt_in_capturing();
        client.startSessionRecording();
      });
    } else {
      forEachClient((client) => client.opt_out_capturing());
    }
  }
}

export function initPostHog() {
  if (typeof window === "undefined") {
    return;
  }

  const consent = getPostHogConsent();
  const visitorId = getVisitorId();

  const applyState = (client: PostHog) => {
    if (visitorId) {
      client.identify(visitorId);
    }

    if (consent === "granted") {
      client.opt_in_capturing();
    } else if (consent === "denied") {
      client.opt_out_capturing();
    }

    if (consent !== "denied") {
      client.startSessionRecording();
    }
  };

  if (isPostHogEnabled && !initialized) {
    const key = posthogKey;
    if (!key) {
      return;
    }

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

    applyState(posthog);
    initialized = true;
  }

  if (isOrgEnabled && !initializedOrg) {
    const key = posthogOrgKey;
    if (key) {
      orgClient = posthog.init(key, {
        api_host: posthogOrgHost,
        capture_pageview: false,
        capture_pageleave: true,
        mask_all_text: true,
        mask_all_element_attributes: true,
        opt_out_capturing_by_default: true,
        capture_exceptions: true,
        capture_heatmaps: true,
        debug: process.env.NODE_ENV === "development",
      }, ORG_INSTANCE);
      applyState(orgClient);
      initializedOrg = true;
    }
  }
}

export function capture(event: string, properties?: PostHogEventProperties) {
  if (typeof window === "undefined") {
    return;
  }
  forEachClient((client) => client.capture(event, properties));
}

export function identify(
  distinctId: string,
  properties?: PostHogEventProperties,
) {
  if (typeof window === "undefined") {
    return;
  }
  forEachClient((client) => client.identify(distinctId, properties));
}

export function captureException(
  error: unknown,
  properties?: PostHogEventProperties,
) {
  if (typeof window === "undefined") {
    return;
  }
  forEachClient((client) => client.captureException(error, properties));
}

export function capturePageview(pathname: string, search = "") {
  capture("$pageview", {
    page: `${pathname}${search}`,
    pathname,
    search,
  });
}
