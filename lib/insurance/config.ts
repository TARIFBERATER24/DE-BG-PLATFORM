export type InsuranceMode = "information" | "partner" | "licensed";

const VALID_MODES: InsuranceMode[] = ["information", "partner", "licensed"];

/**
 * "information" (default, safe): pure Tippgeber/educational mode -- the
 * estimator shows only a generic, non-insurer-specific indicative range.
 * "licensed": would enable real provider-specific quotes through a
 * registered adapter (none exist yet). Never assume this codebase should
 * default to anything but "information" -- flipping it is a production
 * decision for the business owner once §34d GewO status is confirmed, not
 * something this code should do on its own.
 */
export function getInsuranceMode(): InsuranceMode {
  const raw = process.env.NEXT_PUBLIC_INSURANCE_MODE?.toLowerCase().trim();
  if (raw && (VALID_MODES as string[]).includes(raw)) {
    return raw as InsuranceMode;
  }
  return "information";
}
