import posthog from "posthog-js";

type PostHogEventProperties = Record<string, unknown>;

const posthogKey =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";
const isPostHogEnabled = Boolean(posthogKey);

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined" || initialized || !isPostHogEnabled) {
    return;
  }

  const key = posthogKey;
  if (!key) {
    return;
  }

  posthog.init(key, {
    api_host: posthogHost,
    capture_pageview: false,
    capture_pageleave: true,
    debug: process.env.NODE_ENV === "development",
  });

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

export async function trackServerEvent(
  distinctId: string,
  event: string,
  properties?: PostHogEventProperties,
) {
  const apiKey = process.env.POSTHOG_API_KEY?.trim();

  if (!apiKey || typeof window !== "undefined") {
    return;
  }

  try {
    const batchUrl = new URL("/batch/", posthogHost).toString();
    const payload = {
      api_key: apiKey,
      batch: [
        {
          event,
          properties: {
            distinct_id: distinctId,
            ...(properties || {}),
          },
        },
      ],
    };

    const response = await fetch(batchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(
        "PostHog server event failed:",
        response.status,
        response.statusText,
        text,
      );
    }
  } catch (error) {
    console.error("PostHog server event failed:", error);
  }
}

const posthogProjectId = process.env.POSTHOG_PROJECT_ID?.trim();
const posthogApiKey = process.env.POSTHOG_API_KEY?.trim();

let funnelInsightEnsured = false;

export async function ensurePostHogFunnelExists() {
  if (typeof window !== "undefined" || funnelInsightEnsured) {
    return;
  }

  const apiKey = posthogApiKey;
  const projectId = posthogProjectId;
  if (!apiKey || !projectId) {
    return;
  }

  try {
    const funnelName = "Workshop funnel";
    const listUrl = new URL(
      `/api/projects/${projectId}/insights/`,
      posthogHost,
    );
    listUrl.searchParams.set("search", funnelName);
    listUrl.searchParams.set("insight", "FUNNELS");
    listUrl.searchParams.set("basic", "true");

    const listResponse = await fetch(listUrl.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    if (!listResponse.ok) {
      console.warn(
        "PostHog funnel list failed with status",
        listResponse.status,
      );
      return;
    }

    const listData = (await listResponse.json()) as {
      results?: Array<{ name?: string }>;
    };

    const existingFunnel = Array.isArray(listData.results)
      ? listData.results.some((item) => item.name === funnelName)
      : false;

    if (existingFunnel) {
      funnelInsightEnsured = true;
      return;
    }

    const createUrl = new URL(
      `/api/projects/${projectId}/insights/`,
      posthogHost,
    );
    const createPayload = {
      name: funnelName,
      description:
        "Auto-created funnel for workshop landing and registration events.",
      query: {
        kind: "InsightVizNode",
        source: {
          kind: "FunnelsQuery",
          funnelVizType: "steps",
          funnelWindowInterval: 14,
          funnelWindowIntervalUnit: "day",
          filterTestAccounts: false,
          series: [
            {
              kind: "EventsNode",
              event: "landing_page_viewed",
              name: "Landing page viewed",
            },
            {
              kind: "EventsNode",
              event: "registration_form_continue",
              name: "Registration form continue",
            },
            {
              kind: "EventsNode",
              event: "registration_form_submit_success",
              name: "Registration success",
            },
          ],
        },
      },
    };

    const createResponse = await fetch(createUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPayload),
    });

    if (!createResponse.ok) {
      console.warn(
        "PostHog funnel create failed with status",
        createResponse.status,
      );
      return;
    }

    funnelInsightEnsured = true;
  } catch (error) {
    console.error("PostHog funnel creation failed:", error);
  }
}

export async function trackAbTestAssignment(
  variant: string,
  experiment = "home_page_ab_test",
  distinctId?: string,
) {
  await trackServerEvent(
    distinctId ?? `ab_test_${variant}`,
    "ab_test_assignment",
    {
      experiment,
      variant,
    },
  );
}
