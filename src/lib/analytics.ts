// Analytics helper — wraps window.gtag with an SSR guard

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || typeof gtag === "undefined") return;
  gtag("event", eventName, params ?? {});
}
