# Dastyare Social — Score Card

An interactive quiz that scores how well a personal brand generates demand and reveals a personalised result, with a registration funnel attached.

## Completed work

Everything that has been set up / done on this project so far:

- **Pages** — A/B landing (`/v1`, `/v2`), questions (`/questions/v1`, `/questions/v2`), score result (`/score/v1`, `/score/v2`). A server-side `/` redirect picks a landing variant based on the PostHog flag `home-page-variant` (cookie `home_ab_variant`, fallback `/v1`).
- **PostHog analytics** — consent-gated (`posthog_consent` cookie), session replay with full text/attribute masking, scroll depth, button/link/outbound-click tracking, plus the quiz + registration funnel events. (This project has **no** dedicated `POSTHOG.md`; the shared event/tracking setup mirrors the workshop and magnet sites.)
- **PostHog dashboards** — the standard audience-neutral PostHog suite (8 dashboards, ~40 insights — see the [bootstrap section](#dev-team-relay--bootstrap)) is provisioned identically on both PostHog accounts. Shares the same PostHog project as the workshop/magnet sites; quiz/registration funnels are part of the suite.
- **Shared A/B experiment** — reuses `Home page A/B test` (PostHog experiment, flag `home-page-variant`, variants `v1`/`v2`, 50/50, 100% rollout) shared with the workshop and magnet sites.

### PostHog dashboards (as provisioned)

The standard suite's **Onboarding & Conversion** dashboard hosts the funnels relevant to this project (14-day window by default). All three insights below are part of the provisioned suite:

| Insight | Type | Steps |
| --- | --- | --- |
| Registration funnel | Funnel (14-day) | `landing_page_viewed` → `registration_cta_clicked` → `registration_form_continue` → `registration_form_submit_success` → `confirmation_page_viewed` |
| Quiz & registration journey | Funnel (14-day) | `landing_page_viewed` → `questions_page_viewed` → `score_result_viewed` → `registration_form_submit_success` |
| CTA performance by section | Funnel (14-day), broken down by `cta_location` | `registration_cta_clicked` → `registration_form_submit_success` |

If site-specific isolation is needed, add a `$host` filter to these insights (the suite itself is deliberately not host-scoped).

> **Provisioning:** these dashboards/insights are provisioned by the standard
> suite in `scripts/posthog-bootstrap.ts` (see the [Dev-team relay & bootstrap](#dev-team-relay--bootstrap)
> section) — no folders are used, so provisioning is fully API-driven.

## Landing
Routes: `/v1`, `/v2`

<table>
  <tr>
    <th>v1 — <code>/v1</code></th>
    <th>v2 — <code>/v2</code></th>
  </tr>
  <tr>
    <td><img src="screenshots/landing-v1.webp" alt="Landing v1"></td>
    <td><img src="screenshots/landing-v2.webp" alt="Landing v2"></td>
  </tr>
</table>

## Questions
Routes: `/questions/v1`, `/questions/v2`

<table>
  <tr>
    <th>v1 — <code>/questions/v1</code></th>
    <th>v2 — <code>/questions/v2</code></th>
  </tr>
  <tr>
    <td><img src="screenshots/questions-v1.webp" alt="Questions v1"></td>
    <td><img src="screenshots/questions-v2.webp" alt="Questions v2"></td>
  </tr>
</table>

## Score
Routes: `/score/v1`, `/score/v2`

<table>
  <tr>
    <th>v1 — <code>/score/v1</code></th>
    <th>v2 — <code>/score/v2</code></th>
  </tr>
  <tr>
    <td><img src="screenshots/score-v1.webp" alt="Score v1"></td>
    <td><img src="screenshots/score-v2.webp" alt="Score v2"></td>
  </tr>
</table>


## Dev-team relay & bootstrap

- **Dev-team relay** — server-side events are optionally fanned out to a second,
  dev-team PostHog project through the Cloudflare proxy (`ingest.dastyare.social`).
  `src/lib/analytics/devrel.ts` holds the obfuscated proxy URL/token (the project
  key is never stored here), and `src/lib/analytics/server.ts` exposes a
  `RelayPostHog` whose `capture` sends each event to both the direct client/founder
  project (103916) and the dev-team relay. `src/lib/posthog-server.ts` uses this
  shared client, so `$feature_flag_called` also reaches both. Set
  `DISABLE_DEV_TEAM_PH=true` to disable the relay fan-out (direct captures still
  work).
- **PostHog bootstrap** — `scripts/posthog-bootstrap.ts` (run via
  `bun run bootstrap:posthog`) provisions the standard, audience-neutral dashboard
  suite (8 dashboards: Overview, Onboarding & Conversion, Content Engagement,
  User Growth, Push Notifications, LLM & AI Visibility, MCP Usage, Reliability —
  ~40 insights) via the admin REST API, identically on every account. It is
  idempotent and needs `PH_PERSONAL_API_KEY` (`phx_`, admin scope), optional
  `PH_PROJECT_ID` (auto-discovered from the key's `@current` project), and
  `PH_HOST`. See `.env.example` for placeholders.

## Data products (session replay, error tracking, heatmaps)

The PostHog data products are enabled on **both** projects:

| Project | ID | Role | Replay | Error tracking | Heatmaps |
| --- | --- | --- | --- | --- | --- |
| `omidshabab.com` (client / founder) | 103916 | Landing-repo client events land here | On | On | On (client) |
| `Dastyare Social — ORG` (dev team) | 581705 | Server relay fan-out destination | On | On | n/a (server-only) |

### Client project — 103916

Server flags (verified live via `project-get`):

- `session_recording_opt_in: true` — **session replay** enabled.
- `autocapture_exceptions_opt_in: true` — **error tracking** enabled (uncaught
  exceptions + rejections are autocaptured).
- Heatmaps are enabled **client-side** via the SDK `capture_heatmaps` flag (there
  is no server flag) — see `src/lib/posthog.ts`.

SDK config (`src/lib/posthog.ts`), identical across the three landing repos:

```ts
posthog.init(token, {
  capture_exceptions: true,   // error tracking (autocapture)
  capture_heatmaps: true,     // heatmaps
  // ...
});
posthog.startSessionRecording();
```

`$exception` / `client_error` are already flowing. Replay, error-tracking issues
and heatmap data appear once the deploy ships **and** a visitor accepts the
consent banner (`opt_out_capturing_by_default` is on by design, so only consented
visitors contribute).

### Dev-team project — 581705

Enabled (verified live via the project REST API with a `phx_` personal key that
has membership in 581705):

- `session_recording_opt_in: true`
- `autocapture_exceptions_opt_in: true`

Note: 581705 receives **server-only** relay events (no browser SDK points at it),
so replay and heatmaps are limited there by design; **error tracking works** —
server `$exception` events from the relay arrive in this project.
