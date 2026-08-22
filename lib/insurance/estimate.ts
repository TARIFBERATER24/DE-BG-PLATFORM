import type {
  CoverageType,
  DriverData,
  IndicativeEstimate,
  KfzQuoteRequest,
  VehicleData,
} from "./types";

/**
 * Produces a GENERIC, non-binding indicative price range for educational
 * purposes only. Built from well-known, publicly understood rating factors
 * (age, no-claims class, engine power, mileage, usage) -- it is not derived
 * from, and must never be presented as, any specific insurer's tariff.
 */
export function estimateIndicativeRange(
  request: KfzQuoteRequest,
): IndicativeEstimate {
  const { vehicle, driver, coverage } = request;

  const base = baseByCoverage(coverage);
  const ageFactor = ageMultiplier(driver.age);
  const experienceFactor = experienceMultiplier(driver.licenseSinceYear);
  const noClaimsFactor = noClaimsMultiplier(driver.noClaimsClass);
  const powerFactor = powerMultiplier(vehicle.powerKw);
  const mileageFactor = mileageMultiplier(vehicle.annualMileageKm);
  const usageFactor = driver.usage === "gewerblich" ? 1.15 : 1.0;
  const kaskoValueFactor =
    coverage !== "haftpflicht" ? valueMultiplier(vehicle.purchasePriceEur) : 1.0;

  const monthly =
    base *
    ageFactor *
    experienceFactor *
    noClaimsFactor *
    powerFactor *
    mileageFactor *
    usageFactor *
    kaskoValueFactor;

  const monthlyLow = round2(monthly * 0.8);
  const monthlyHigh = round2(monthly * 1.35);

  return {
    coverage,
    monthlyLowEur: monthlyLow,
    monthlyHighEur: monthlyHigh,
    yearlyLowEur: round2(monthlyLow * 12),
    yearlyHighEur: round2(monthlyHigh * 12),
    disclaimer:
      "Ориентировъчен диапазон за информационни цели, изчислен по общи, публично известни фактори (възраст, стаж, SF-клас, мощност, пробег). Не е конкретна оферта на застраховател и не представлява препоръка за продукт.",
  };
}

function baseByCoverage(coverage: CoverageType): number {
  switch (coverage) {
    case "haftpflicht":
      return 32;
    case "teilkasko":
      return 45;
    case "vollkasko":
      return 68;
  }
}

function ageMultiplier(age: number): number {
  if (age < 23) return 1.9;
  if (age < 28) return 1.35;
  if (age < 40) return 1.0;
  if (age < 60) return 0.92;
  return 1.05;
}

function experienceMultiplier(licenseSinceYear: number): number {
  const years = Math.max(0, new Date().getFullYear() - licenseSinceYear);
  if (years < 2) return 1.4;
  if (years < 5) return 1.15;
  if (years < 10) return 1.0;
  return 0.93;
}

function noClaimsMultiplier(sfClass: number): number {
  const clamped = Math.max(0, Math.min(35, sfClass));
  return 1.6 - (clamped / 35) * 1.15;
}

function powerMultiplier(powerKw: number): number {
  if (powerKw <= 55) return 0.9;
  if (powerKw <= 85) return 1.0;
  if (powerKw <= 110) return 1.2;
  if (powerKw <= 150) return 1.45;
  return 1.8;
}

function mileageMultiplier(annualMileageKm: number): number {
  if (annualMileageKm <= 8000) return 0.9;
  if (annualMileageKm <= 15000) return 1.0;
  if (annualMileageKm <= 25000) return 1.15;
  return 1.3;
}

function valueMultiplier(purchasePriceEur: number): number {
  if (purchasePriceEur <= 10000) return 0.85;
  if (purchasePriceEur <= 25000) return 1.0;
  if (purchasePriceEur <= 45000) return 1.25;
  return 1.6;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function summarizeVehicle(vehicle: VehicleData): string {
  return `${vehicle.brand} ${vehicle.model} (${vehicle.firstRegistrationYear})`;
}

export function summarizeDriver(driver: DriverData): string {
  return `${driver.age} г., шофьорска книжка от ${driver.licenseSinceYear}, SF${driver.noClaimsClass}`;
}
