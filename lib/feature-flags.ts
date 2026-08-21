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
};
