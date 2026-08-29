import { getServerPostHogClient, flushServerEvents } from "@/lib/analytics/server";

const LANDING_FLAG_KEY =
  process.env.POSTHOG_LANDING_FLAG_KEY?.trim() || "home-page-variant";

export function isPostHogServerEnabled() {
  return getServerPostHogClient() !== null;
}

function createPostHogServer() {
  return getServerPostHogClient();
}

export function resolveLandingVariant(
  flagValue: string | boolean | undefined,
  fallback: "v1" | "v2",
): "v1" | "v2" {
  if (flagValue === "v1" || flagValue === "control" || flagValue === false) {
    return "v1";
  }

  if (flagValue === "v2" || flagValue === "test" || flagValue === true) {
    return "v2";
  }

  return fallback;
}

export async function getLandingVariant(
  visitorId: string,
  fallback: "v1" | "v2",
): Promise<"v1" | "v2"> {
  const client = createPostHogServer();

  if (!client) {
    return fallback;
  }

  try {
    const flagValue = await client.getFeatureFlag(
      LANDING_FLAG_KEY,
      visitorId,
      {
        sendFeatureFlagEvents: true,
      },
    );

    return resolveLandingVariant(flagValue, fallback);
  } catch (error) {
    console.error("PostHog feature flag evaluation failed:", error);
    return fallback;
  } finally {
    // Flush (don't shutdown) — the client is a shared relay singleton.
    try {
      await flushServerEvents();
    } catch (error) {
      console.error("PostHog server flush failed:", error);
    }
  }
}
