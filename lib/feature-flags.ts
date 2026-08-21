function isEnabled(value: string | undefined): boolean {
  return value === "true";
}

/**
 * Regulator-sensitive production actions stay off by default. Each flag
 * here corresponds to a licensed/registered activity under German law --
 * see the `regulatorNote` on the matching entry in lib/services.ts for
 * exactly which license/registration gates it. Flip via env var only
 * after that prerequisite is actually satisfied, not before.
 */
export const featureFlags = {
  autoInsuranceFinder: isEnabled(process.env.NEXT_PUBLIC_FF_AUTO_INSURANCE_FINDER),
  billCorrection: isEnabled(process.env.NEXT_PUBLIC_FF_BILL_CORRECTION),
  /**
   * Live CTA on the finansi vertical (Girokonto/Kredit/Kreditkarte). The
   * educational content on those pages stays visible regardless -- this only
   * gates the affiliate button, since a pure CPA referral with no advice and
   * no underwriting data collected is the model that keeps this outside
   * §34c GewO credit-intermediation licensing. Flip once that's confirmed
   * and a real CHECK24 tracking link exists for each program.
   */
  finansiLive: isEnabled(process.env.NEXT_PUBLIC_FF_FINANSI_LIVE),
};
