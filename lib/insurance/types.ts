/**
 * Domain types for the Kfz-Versicherung (car insurance) indicative estimator.
 *
 * Regulatory boundary: these types describe data collection and *generic,
 * informational* estimation only. Nothing here represents a specific
 * insurer's binding offer. A real product recommendation/comparison
 * requires an insurance mediation license (§34d GewO) and must go through
 * a ProviderAdapter registered for INSURANCE_MODE=licensed.
 */

export type VehicleUsage = "privat" | "gewerblich" | "pendler";

export type CoverageType = "haftpflicht" | "teilkasko" | "vollkasko";

export type VehicleData = {
  brand: string;
  model: string;
  firstRegistrationYear: number;
  powerKw: number;
  annualMileageKm: number;
  purchasePriceEur: number;
};

export type DriverData = {
  age: number;
  licenseSinceYear: number;
  /** German "Schadenfreiheitsklasse", 0 (SF0) through 35 (SF35+). */
  noClaimsClass: number;
  postalCode: string;
  usage: VehicleUsage;
};

export type KfzQuoteRequest = {
  vehicle: VehicleData;
  driver: DriverData;
  coverage: CoverageType;
};

/** Generic, non-binding informational estimate -- not tied to any insurer. */
export type IndicativeEstimate = {
  coverage: CoverageType;
  monthlyLowEur: number;
  monthlyHighEur: number;
  yearlyLowEur: number;
  yearlyHighEur: number;
  disclaimer: string;
};
