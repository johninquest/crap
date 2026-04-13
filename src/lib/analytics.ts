// Analytics helper — dual-dispatches to Google Analytics and PostHog

import posthog from "posthog-js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  if (typeof gtag !== "undefined") {
    gtag("event", eventName, params ?? {});
  }

  posthog.capture(eventName, params);
}
