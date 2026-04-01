// instrumentation-client.ts
// Runs before app frontend code starts — used for analytics init.
// See: node_modules/next/dist/docs/01-app/02-guides/analytics.md

export function register() {
  // Google Analytics is initialized via <Script> tags in [lang]/layout.tsx.
  // This file intentionally left minimal — extend here for error tracking,
  // performance monitoring (e.g. Sentry, Datadog) as the app grows.
}
