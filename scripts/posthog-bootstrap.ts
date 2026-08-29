/**
 * PostHog dev-team bootstrap.
 *
 * Provisions the dev-team folder tree, dashboards, and insights on a PostHog
 * project via the public REST API. Intended to be run by each developer so
 * their own dev PostHog account has the same structure as the shared team
 * instance — no manual clicking.
 *
 * Target project is read from the environment so the same script works for any
 * developer, pointing at their own project:
 *
 *   - PH_PROJECT_ID            (optional) numeric id of the target project.
 *                              Discovered from the personal API key's @current
 *                              project when unset.
 *   - PH_PERSONAL_API_KEY      (required) phx_ key with admin + file_system scope
 *   - PH_HOST                  (optional) defaults to https://us.i.posthog.com
 *   - PH_PROJECT_TOKEN         (optional) phc_ project token — used only to
 *                              sanity-check/report; NOT required to provision.
 *
 * The script validates the env vars and the personal API key (project access,
 * file_system:read), reporting any missing/undefined config, then provisions
 * idempotently. Re-running is safe: existing dashboards/insights are found by
 * name and reused, not duplicated.
 *
 * Usage:  bun run bootstrap:posthog
 */

import "dotenv/config";

const DEFAULT_HOST = "https://us.i.posthog.com";

// ---------------------------------------------------------------------------
// Config / env validation
// ---------------------------------------------------------------------------

interface Env {
  projectId: string;
  personalApiKey: string;
  host: string;
  projectToken: string | undefined;
}

function loadEnv(): Env {
  const projectId = (process.env.PH_PROJECT_ID ?? "").trim();
  const personalApiKey = (process.env.PH_PERSONAL_API_KEY ?? "").trim();
  const host = (process.env.PH_HOST ?? "").trim() || DEFAULT_HOST;
  const projectToken = (process.env.PH_PROJECT_TOKEN ?? "").trim() || undefined;

  return { projectId, personalApiKey, host, projectToken };
}

const MISSING_LABELS: Array<[keyof Env, string, string]> = [
  ["personalApiKey", "PH_PERSONAL_API_KEY", "phx_ personal API key with admin + file_system scope"],
];

function validateEnv(env: Env): boolean {
  let ok = true;

  if (env.projectId && !/^\d+$/.test(env.projectId)) {
    console.error("✗ PH_PROJECT_ID must be a numeric project id (got: " + env.projectId + ").");
    ok = false;
  }

  if (!env.personalApiKey) {
    console.error("✗ PH_PERSONAL_API_KEY is missing — a phx_ personal API key with admin + file_system scope.");
    ok = false;
  } else if (!env.personalApiKey.startsWith("phx_")) {
    console.error("✗ PH_PERSONAL_API_KEY should start with phx_ (got the first 8 chars: " + env.personalApiKey.slice(0, 8) + "...).");
  }

  if (!env.host) {
    console.error("✗ PH_HOST is missing/empty (defaults to " + DEFAULT_HOST + ").");
    ok = false;
  }

  if (env.projectToken && !env.projectToken.startsWith("phc_")) {
    console.warn("⚠ PH_PROJECT_TOKEN looks wrong (expected phc_…) — it is informational only, will continue.");
  }

  if (ok) {
    console.log("✓ Env validated:");
    console.log(
      env.projectId
        ? "  project id      : " + env.projectId
        : "  project id      : (unset — will discover from the personal API key)"
    );
    console.log("  personal API key: " + env.personalApiKey.slice(0, 8) + "… (len " + env.personalApiKey.length + ")");
    console.log("  host            : " + env.host);
    console.log(
      env.projectToken
        ? "  project token   : " + env.projectToken.slice(0, 8) + "… (informational)"
        : "  project token   : (unset — fine, not required to provision)"
    );
  } else {
    console.error(
      "\nMissing/undefined config detected. Fix the variables above and re-run.\n" +
        MISSING_LABELS.map(([, name, hint]) => `  ${name} — ${hint}`).join("\n")
    );
  }

  return ok;
}

/**
 * When PH_PROJECT_ID is not set, discover it from the personal API key via the
 * `@current` project endpoint. PostHog keys are scoped to a project, and the
 * `@current` alias resolves to the key's project.
 */
async function resolveProjectId(env: Env): Promise<void> {
  if (env.projectId) return;

  console.log("\nDiscovering project id from the personal API key (@current) …");
  const res = await api<{ id?: number }>(env, "GET", "/api/projects/@current/");
  if (!res.id) {
    throw new Error("Could not determine the target project id — set PH_PROJECT_ID explicitly.");
  }
  env.projectId = String(res.id);
  console.log("  → project id " + env.projectId);
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

interface ApiError extends Error {
  status?: number;
  body?: unknown;
}

async function api<T = unknown>(env: Env, method: string, path: string, body?: unknown): Promise<T> {
  const url = env.host.replace(/\/$/, "") + path;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: "Bearer " + env.personalApiKey,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  const json = text ? safeJson(text) : undefined;

  if (!res.ok) {
    const err = new Error(
      `HTTP ${res.status} ${method} ${path} — ${res.statusText} ${json ? JSON.stringify(json) : ""}`
    ) as ApiError;
    err.status = res.status;
    err.body = json;
    throw err;
  }

  return json as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// ---------------------------------------------------------------------------
// Preflight: validate the personal API key's access rights
// ---------------------------------------------------------------------------

async function preflight(env: Env): Promise<boolean> {
  console.log("\nPreflight — checking personal API key access …");

  let ok = true;

  // 1. The key itself resolves to a user.
  try {
    await api(env, "GET", "/api/users/@me/");
    console.log("✓ Personal API key is valid (resolves to a user).");
  } catch {
    console.error("✗ Personal API key rejected — it is invalid or revoked.");
    ok = false;
  }

  // 2. The key can access the target project.
  try {
    await api(env, "GET", "/api/projects/" + env.projectId + "/");
    console.log("✓ Personal API key can access project " + env.projectId + ".");
  } catch {
    console.error("✗ Personal API key has NO access to project " + env.projectId + ".");
    console.error("  (The key must belong to a user in that project/org. If you just created a new dev project, use a key from that project's org.)");
    ok = false;
  }

  // 3. file_system:read scope (folders).
  try {
    await api(env, "GET", "/api/projects/" + env.projectId + "/file_system/");
    console.log("✓ file_system:read scope present (can list folders).");
  } catch {
    console.error("✗ file_system:read scope MISSING — this key cannot manage folders.");
    console.error("  Grant the key (or its user) the 'file_system' scope in PostHog → Personal API keys / project settings.");
    ok = false;
  }

  return ok;
}

// ---------------------------------------------------------------------------
// Provisioning: folders
// ---------------------------------------------------------------------------

interface FileSystemEntry {
  id: string;
  type: string;
  path?: string;
  name?: string;
  ref?: string;
  [k: string]: unknown;
}

async function ensureFolder(
  env: Env,
  parentFsId: string | null,
  name: string,
  expectedPath: string
): Promise<FileSystemEntry> {
  const base = "/api/projects/" + env.projectId + "/file_system/";
  const existing = await api<{ results?: FileSystemEntry[] }>(env, "GET", base);
  const list = existing.results ?? [];

  const match = list.find(
    (e) =>
      e.type === "folder" &&
      (e.name === name || e.path === expectedPath || e.path === expectedPath.replace(/\/$/, ""))
  );
  if (match) {
    console.log("✓ folder exists: " + expectedPath + "  (" + match.id + ")");
    return match;
  }

  const created = await api<FileSystemEntry>(env, "POST", base, {
    path: expectedPath,
    type: "folder",
  });
  console.log("+ created folder: " + expectedPath + "  (" + created.id + ")");
  return created;
}

async function moveDashboard(env: Env, dashboardId: string, newPath: string): Promise<void> {
  const base = "/api/projects/" + env.projectId + "/file_system/";
  const existing = await api<{ results?: FileSystemEntry[] }>(env, "GET", base);
  const list = existing.results ?? [];

  // Dashboard file-system entries carry `type: "dashboard"`, `id` = the fs
  // entry uuid, and `ref` = the numeric dashboard id.
  const entry = list.find((e) => e.type === "dashboard" && String(e.ref) === String(dashboardId));

  if (entry && entry.path === newPath) {
    console.log("  dashboard already in folder: " + newPath);
    return;
  }

  if (entry && entry.id) {
    await api(env, "POST", `/api/projects/${env.projectId}/file_system/${entry.id}/move/`, {
      new_path: newPath,
    });
    console.log("  moved dashboard " + dashboardId + " → " + newPath);
  } else {
    console.log("  (could not locate dashboard " + dashboardId + " in file system; leaving in place)");
  }
}

// ---------------------------------------------------------------------------
// Provisioning: dashboards
// ---------------------------------------------------------------------------

interface Dashboard {
  id: number;
  name?: string;
  [k: string]: unknown;
}

async function findDashboard(env: Env, name: string): Promise<Dashboard | null> {
  const res = await api<{ results?: Dashboard[]; next?: string | null }>(
    env,
    "GET",
    "/api/projects/" + env.projectId + "/dashboards/?limit=100"
  );
  for (const d of res.results ?? []) {
    if (d.name === name) return d;
  }
  return null;
}

async function ensureDashboard(env: Env, name: string, description: string): Promise<Dashboard> {
  const existing = await findDashboard(env, name);
  if (existing) {
    console.log("✓ dashboard exists: " + name + "  (" + existing.id + ")");
    return existing;
  }
  const created = await api<Dashboard>(env, "POST", "/api/projects/" + env.projectId + "/dashboards/", {
    name,
    description,
    filters: { events: [] },
  });
  console.log("+ created dashboard: " + name + "  (" + created.id + ")");
  return created;
}

// ---------------------------------------------------------------------------
// Provisioning: insights (query format — legacy `filters` is rejected)
// ---------------------------------------------------------------------------

interface Insight {
  id: number;
  short_id: string;
  name?: string;
  [k: string]: unknown;
}

interface InsightSpec {
  name: string;
  query: unknown;
}

async function findInsight(env: Env, name: string): Promise<Insight | null> {
  let url = "/api/projects/" + env.projectId + "/insights/?limit=200";
  while (url) {
    const res = await api<{ results?: Insight[]; next?: string | null }>(env, "GET", url);
    for (const i of res.results ?? []) {
      if (i.name === name) return i;
    }
    url = (res.next ?? "").replace(/^.*\/api/, "/api");
  }
  return null;
}

async function createInsight(env: Env, spec: InsightSpec): Promise<Insight> {
  return api<Insight>(env, "POST", "/api/projects/" + env.projectId + "/insights/", {
    name: spec.name,
    query: spec.query,
  });
}

async function attachInsight(env: Env, insightId: number, dashboardId: number): Promise<void> {
  // PATCH replaces the full dashboards array — read existing first.
  const cur = await api<{ dashboards?: number[] }>(
    env,
    "GET",
    `/api/projects/${env.projectId}/insights/${insightId}/`
  );
  const dashboards = Array.from(new Set([...(cur.dashboards ?? []), dashboardId]));
  await api(env, "PATCH", `/api/projects/${env.projectId}/insights/${insightId}/`, { dashboards });
}

async function ensureInsight(env: Env, spec: InsightSpec, dashboardId: number): Promise<void> {
  const existing = await findInsight(env, spec.name);
  if (existing) {
    console.log("✓ insight exists: " + spec.name + "  (" + existing.short_id + ")");
    await attachInsight(env, existing.id, dashboardId);
    console.log("  ensured attached to dashboard " + dashboardId);
    return;
  }
  const created = await createInsight(env, spec);
  console.log("+ created insight: " + spec.name + "  (" + created.short_id + ")");
  await attachInsight(env, created.id, dashboardId);
  console.log("  attached to dashboard " + dashboardId);
}

// ---------------------------------------------------------------------------
// Insight query builders (TrendsQuery — the supported InsightVizNode format)
// ---------------------------------------------------------------------------

function trends(series: unknown[], opts: { interval?: string } = {}): unknown {
  return {
    kind: "InsightVizNode",
    source: {
      kind: "TrendsQuery",
      series,
      interval: opts.interval ?? "day",
      dateRange: { date_to: null },
    },
  };
}

const ev = (event: string, extra: Record<string, unknown> = {}): unknown => ({
  kind: "EventsNode",
  event,
  ...extra,
});

// ---------------------------------------------------------------------------
// Structure definition
// ---------------------------------------------------------------------------

interface DashboardSpec {
  name: string;
  description: string;
  folderPath: string;
  insights: InsightSpec[];
}

const DASHBOARDS: DashboardSpec[] = [
  {
    name: "Client · Browser Analytics",
    description: "Client-side browser analytics for the dev team (pageviews, web vitals).",
    folderPath: "Unfiled/Dev Team/Client · Browser Analytics",
    insights: [
      {
        name: "Pageviews (browser) — Client",
        query: trends([
          ev("$pageview", { math: "total" }),
        ]),
      },
      {
        name: "Web vitals — Client",
        query: trends([
          ev("$web_vitals", { math: "total" }),
        ]),
      },
    ],
  },
  {
    name: "Dev Ops · MCP · Server",
    description: "Server-side, MCP and dev-ops telemetry for the dev team.",
    folderPath: "Unfiled/Dev Team/Dev Ops · MCP · Server",
    insights: [
      {
        name: "MCP tool calls — Dev",
        query: trends([ev("mcp_tool_called", { math: "total" })]),
      },
      {
        name: "MCP server initializations — Dev",
        query: trends([ev("mcp_session_created", { math: "total" })]),
      },
      {
        name: "LLM assets requested — Dev",
        query: trends([ev("llm_asset_requested", { math: "total" })]),
      },
      {
        name: "Server key probe — Dev",
        query: trends([ev("server_key_probe", { math: "total" })]),
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const env = loadEnv();

  console.log("PostHog dev-team bootstrap");
  console.log("---------------------------");

  if (!validateEnv(env)) {
    process.exit(1);
  }

  await resolveProjectId(env);

  const passed = await preflight(env);
  if (!passed) {
    console.error("\nPreflight failed — no changes were made. Fix the access issues and re-run.\n");
    process.exit(1);
  }

  console.log("\nProvisioning …\n");

  // Folders
  const rootPath = "Unfiled/Dev Team";
  const root = await ensureFolder(env, null, "Dev Team", rootPath);
  const clientFolder = await ensureFolder(env, root.id, "Client · Browser Analytics", rootPath + "/Client · Browser Analytics");
  const devFolder = await ensureFolder(env, root.id, "Dev Ops · MCP · Server", rootPath + "/Dev Ops · MCP · Server");

  const folderByDashboard: Record<string, { id: string; path: string }> = {
    "Client · Browser Analytics": { id: clientFolder.id, path: clientFolder.path ?? (rootPath + "/Client · Browser Analytics") },
    "Dev Ops · MCP · Server": { id: devFolder.id, path: devFolder.path ?? (rootPath + "/Dev Ops · MCP · Server") },
  };

  console.log("\nDashboards & insights\n");

  for (const spec of DASHBOARDS) {
    const dashboard = await ensureDashboard(env, spec.name, spec.description);

    const folder = folderByDashboard[spec.name];
    if (folder) {
      await moveDashboard(env, String(dashboard.id), folder.path);
    }

    for (const insight of spec.insights) {
      await ensureInsight(env, insight, dashboard.id);
    }
  }

  console.log("\n✓ Bootstrap complete.");
  console.log("  Project: " + env.projectId + "  Host: " + env.host);
  if (env.projectToken) {
    console.log("  Note: PH_PROJECT_TOKEN is informational only — ingestion uses your app env, not this script.");
  }
}

main().catch((err) => {
  console.error("\n✗ Bootstrap failed:");
  console.error(err && typeof err.message === "string" ? err.message : String(err));
  process.exit(1);
});
