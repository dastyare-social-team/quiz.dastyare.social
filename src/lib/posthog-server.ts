import { PostHog } from "posthog-node";

const projectKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
const projectHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

const LANDING_FLAG_KEY =
  process.env.POSTHOG_LANDING_FLAG_KEY?.trim() || "home-page-variant";

const isPostHogEnabled = Boolean(projectKey);

export function isPostHogServerEnabled() {
  return isPostHogEnabled;
}

function createPostHogServer() {
  if (!isPostHogEnabled || !projectKey) {
    return null;
  }

  return new PostHog(projectKey, {
    host: projectHost,
  });
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
    try {
      await client.shutdown();
    } catch (error) {
      console.error("PostHog server shutdown failed:", error);
    }
  }
}
