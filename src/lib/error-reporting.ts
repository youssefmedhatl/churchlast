// Minimal client-side error reporting hook. Logs to the console; swap in a
// real error-tracking service (Sentry, etc.) here when one is set up.
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error("[error-boundary]", message, { route: window.location.pathname, ...context, stack });
}
