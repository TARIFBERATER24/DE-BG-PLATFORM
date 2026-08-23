/**
 * Provider-neutral analytics seam.
 *
 * There is no analytics provider in this project yet (no GA, no Plausible, no Vercel
 * Analytics package). Per AI_BUILDER_SKILL.md rule 10 we do not install a second/first
 * provider as a side effect of a homepage task -- instead every call site uses this one
 * function, so wiring a real provider later is a single-file change and no page has to
 * be touched again.
 *
 * Until then this is a deliberate no-op in production and a console line in development.
 * It never throws, so a broken analytics layer can never break a CTA.
 */

export type AnalyticsEvent =
  | "homepage_assistant_clicked"
  | "homepage_document_clicked"
  | "homepage_products_clicked"
  | "homepage_mein_deutschland_clicked"
  | "homepage_germany_guide_clicked"
  | "homepage_help_clicked"
  | "homepage_goal_submitted";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, payload ?? {});
  }
  // Wire a real provider here (single place). Example shape:
  //   window.plausible?.(event, { props: payload });
}
