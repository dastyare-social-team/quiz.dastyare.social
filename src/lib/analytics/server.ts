import { PostHog } from "posthog-node";
import { getDevRelayConfig } from "./devrel";

// Direct destination — the Dastyare Social ORG PostHog project the browser
// also uses (single token/host). Accept an explicit server key if
// present, otherwise fall back to the public project token / host so server
// captures land in the same project as the client without a new secret.
const apiKey =
  process.env.POSTHOG_API_KEY?.trim() ||
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
// Accept both `POSTHOG_HOST` and `POSTHOG_API_HOST`; fall back to the
// client-side host. Defaults to US cloud.
const apiHost =
  process.env.POSTHOG_HOST?.trim() ||
  process.env.POSTHOG_API_HOST?.trim() ||
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() ||
  "https://us.i.posthog.com";

// ---------------------------------------------------------------------------
// Dev-team relay: a SECOND PostHog destination reached ONLY through our
// Cloudflare proxy. Our project key never lives here — only the proxy URL and
// an opaque token (kept obfuscated in ./devrel), and the proxy injects our key
// on our side. Enabled only when the relay config decodes successfully.
// ---------------------------------------------------------------------------
const devRelay = getDevRelayConfig();
const proxyUrl = devRelay?.url;
const proxyToken = devRelay?.token;

// The dev-team relay (the fan-out via our Cloudflare proxy) is ON by default.
// Only set DISABLE_DEV_TEAM_PH=false to stop sending server events to the
// dev-team PostHog project. The direct captures always work.
const devTeamPhDisabled = process.env.DISABLE_DEV_TEAM_PH === "false";

/**
 * A posthog-node client whose `capture` fans out to BOTH destinations:
 * the direct project AND the dev-team relay via our proxy.
 * This lets consumers pass a single client while every server event reaches
 * both PostHog projects.
 */
class RelayPostHog extends PostHog {
  private readonly relay: PostHog | null;

  constructor(projectKey: string, options?: ConstructorParameters<typeof PostHog>[1]) {
    super(projectKey, options);
    this.relay = maybeDevClient();
  }

  override capture(message: Parameters<PostHog["capture"]>[0]): void {
    super.capture(message);
    if (this.relay) {
      this.relay.capture(message);
    }
  }

  override async flush(): Promise<void> {
    await Promise.all([super.flush(), this.relay?.flush()].filter(Boolean) as Promise<void>[]);
  }
}

let maybeDev: PostHog | null | undefined;

function maybeDevClient(): PostHog | null {
  if (maybeDev !== undefined) return maybeDev;
  if (devTeamPhDisabled) {
    maybeDev = null;
    return maybeDev;
  }
  if (!proxyUrl || !proxyUrl.trim() || !proxyToken || !proxyToken.trim()) {
    maybeDev = null;
    return maybeDev;
  }
  try {
    // `proxyToken` is used as the PostHog apiKey so posthog-node POSTs to
    // {proxyUrl}/batch/. The Worker verifies it and swaps in our real key.
    maybeDev = new PostHog(proxyToken, { host: proxyUrl });
  } catch (error) {
    console.error("PostHog dev relay init failed", error);
    maybeDev = null;
  }
  return maybeDev;
}

let client: PostHog | null = null;

export const getServerPostHogClient = () => getClient();

const getClient = () => {
  if (!apiKey || !apiKey.trim()) return null;
  if (client) return client;

  try {
    client = new RelayPostHog(apiKey, {
      host: apiHost,
    });
  } catch (error) {
    console.error("PostHog server init failed", error);
    return null;
  }

  return client;
};

export function captureServerEvent(
  event: string,
  properties?: Record<string, unknown>,
  distinctId = "anonymous"
) {
  const ph = getClient();
  if (!ph) return;

  try {
    ph.capture({ distinctId, event, properties });
  } catch (error) {
    console.error("PostHog server capture failed", error);
  }
}

export async function flushServerEvents() {
  const ph = getClient();
  if (!ph) return;
  try {
    await ph.flush();
  } catch (error) {
    console.error("PostHog server flush failed", error);
  }
}
