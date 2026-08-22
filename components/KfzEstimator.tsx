"use client";

import { useState } from "react";
import HelpButton from "@/components/HelpButton";
import { kfzGlossary } from "@/lib/insurance/glossary";
import {
  estimateIndicativeRange,
  summarizeDriver,
  summarizeVehicle,
} from "@/lib/insurance/estimate";
import type {
  CoverageType,
  DriverData,
  VehicleData,
  VehicleUsage,
} from "@/lib/insurance/types";

type Step = "vehicle" | "driver" | "coverage" | "results";

const STEP_LABELS: Record<Step, string> = {
  vehicle: "Автомобил",
  driver: "Шофьор",
  coverage: "Покритие",
  results: "Резултат",
};
const STEP_ORDER: Step[] = ["vehicle", "driver", "coverage", "results"];

const currentYear = new Date().getFullYear();

const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink shadow-sm outline-none transition-colors focus-visible:border-brand";
const labelClass = "text-sm font-medium text-ink";

export default function KfzEstimator() {
  const [step, setStep] = useState<Step>("vehicle");
  const [vehicle, setVehicle] = useState<VehicleData>({
    brand: "",
    model: "",
    firstRegistrationYear: currentYear - 5,
    powerKw: 66,
    annualMileageKm: 12000,
    purchasePriceEur: 15000,
  });
  const [driver, setDriver] = useState<DriverData>({
    age: 34,
    licenseSinceYear: currentYear - 10,
    noClaimsClass: 5,
    postalCode: "",
    usage: "privat",
  });
  const [coverage, setCoverage] = useState<CoverageType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink-subtle">
        {STEP_ORDER.map((s, i) => (
          <span key={s} className={i <= stepIndex ? "text-brand" : ""}>
            {i + 1}. {STEP_LABELS[s]}
          </span>
        ))}
      </div>

      {step === "vehicle" && (
        <VehicleStep
          value={vehicle}
          onChange={setVehicle}
          onNext={() => {
            if (!vehicle.brand.trim() || !vehicle.model.trim()) {
              setError("Въведете марка и модел");
              return;
            }
            setError(null);
            setStep("driver");
          }}
          error={error}
        />
      )}

      {step === "driver" && (
        <DriverStep
          value={driver}
          onChange={setDriver}
          onBack={() => setStep("vehicle")}
          onNext={() => {
            if (!/^\d{4,5}$/.test(driver.postalCode)) {
              setError("Въведете валиден пощенски код (4-5 цифри)");
              return;
            }
            setError(null);
            setStep("coverage");
          }}
          error={error}
        />
      )}

      {step === "coverage" && (
        <CoverageStep
          value={coverage}
          onChange={setCoverage}
          onBack={() => setStep("driver")}
          onNext={() => {
            if (!coverage) {
              setError("Изберете вид покритие");
              return;
            }
            setError(null);
            setStep("results");
          }}
          error={error}
        />
      )}

      {step === "results" && coverage && (
        <ResultsStep
          vehicle={vehicle}
          driver={driver}
          coverage={coverage}
          onBack={() => setStep("coverage")}
        />
      )}
    </div>
  );
}

function VehicleStep({
  value,
  onChange,
  onNext,
  error,
}: {
  value: VehicleData;
  onChange: (v: VehicleData) => void;
  onNext: () => void;
  error: string | null;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Данни за автомобила</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Влияят на застрахователната премия (Typklasse, Regionalklasse).
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Марка">
          <input
            className={inputClass}
            value={value.brand}
            onChange={(e) => onChange({ ...value, brand: e.target.value })}
            placeholder="напр. Volkswagen"
          />
        </Field>
        <Field label="Модел">
          <input
            className={inputClass}
            value={value.model}
            onChange={(e) => onChange({ ...value, model: e.target.value })}
            placeholder="напр. Golf"
          />
        </Field>
        <Field label="Година на първа регистрация">
          <input
            type="number"
            className={inputClass}
            value={value.firstRegistrationYear}
            onChange={(e) =>
              onChange({ ...value, firstRegistrationYear: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Мощност (kW)">
          <input
            type="number"
            className={inputClass}
            value={value.powerKw}
            onChange={(e) => onChange({ ...value, powerKw: Number(e.target.value) })}
          />
        </Field>
        <Field label="Годишен пробег (км)">
          <input
            type="number"
            className={inputClass}
            value={value.annualMileageKm}
            onChange={(e) =>
              onChange({ ...value, annualMileageKm: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Покупна цена (€)">
          <input
            type="number"
            className={inputClass}
            value={value.purchasePriceEur}
            onChange={(e) =>
              onChange({ ...value, purchasePriceEur: Number(e.target.value) })
            }
          />
        </Field>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
        >
          Напред →
        </button>
      </div>
    </div>
  );
}

function DriverStep({
  value,
  onChange,
  onNext,
  onBack,
  error,
}: {
  value: DriverData;
  onChange: (v: DriverData) => void;
  onNext: () => void;
  onBack: () => void;
  error: string | null;
}) {
  const sfClasses = Array.from({ length: 36 }, (_, i) => i);
  const usageOptions: { value: VehicleUsage; label: string }[] = [
    { value: "privat", label: "Лично ползване" },
    { value: "pendler", label: "Пътуване до работа" },
    { value: "gewerblich", label: "Служебно/стопанско" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Данни за шофьора</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Използваме тези данни само за да изчислим ориентировъчен диапазон.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Възраст">
          <input
            type="number"
            className={inputClass}
            value={value.age}
            onChange={(e) => onChange({ ...value, age: Number(e.target.value) })}
          />
        </Field>
        <Field label="Шофьорска книжка от (година)">
          <input
            type="number"
            className={inputClass}
            value={value.licenseSinceYear}
            onChange={(e) =>
              onChange({ ...value, licenseSinceYear: Number(e.target.value) })
            }
          />
        </Field>
        <Field label="SF-клас (Schadenfreiheitsklasse)">
          <select
            className={inputClass}
            value={value.noClaimsClass}
            onChange={(e) =>
              onChange({ ...value, noClaimsClass: Number(e.target.value) })
            }
          >
            {sfClasses.map((c) => (
              <option key={c} value={c}>
                SF{c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Пощенски код (регистрация)">
          <input
            className={inputClass}
            value={value.postalCode}
            maxLength={5}
            onChange={(e) =>
              onChange({ ...value, postalCode: e.target.value.replace(/\D/g, "") })
            }
            placeholder="напр. 10115"
          />
        </Field>
      </div>

      <div className="space-y-2">
        <p className={labelClass}>Вид ползване</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {usageOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm transition-colors ${
                value.usage === opt.value
                  ? "border-brand bg-brand-tint"
                  : "border-line hover:border-brand/40"
              }`}
            >
              <input
                type="radio"
                className="accent-current"
                checked={value.usage === opt.value}
                onChange={() => onChange({ ...value, usage: opt.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
        >
          Напред →
        </button>
      </div>
    </div>
  );
}

function CoverageStep({
  value,
  onChange,
  onNext,
  onBack,
  error,
}: {
  value: CoverageType | null;
  onChange: (v: CoverageType) => void;
  onNext: () => void;
  onBack: () => void;
  error: string | null;
}) {
  const options: { value: CoverageType; tag?: string }[] = [
    { value: "haftpflicht", tag: "Задължителна" },
    { value: "teilkasko" },
    { value: "vollkasko", tag: "Препоръчано за нови коли" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Вид покритие</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Изберете за кой вид застраховка искате ориентировъчна оценка.
        </p>
      </div>

      <div className="grid gap-3">
        {options.map((opt) => {
          const entry = kfzGlossary[opt.value];
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex items-start gap-3 rounded-md border p-4 text-left transition-colors ${
                isSelected ? "border-brand bg-brand-tint" : "border-line hover:border-brand/40"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                  isSelected ? "border-brand bg-brand text-on-brand" : "border-line-strong"
                }`}
              >
                {isSelected ? "✓" : ""}
              </span>
              <span className="space-y-1">
                <span className="flex items-center gap-2">
                  <span className="font-medium text-ink">{entry.term}</span>
                  {opt.tag && (
                    <span className="rounded-full bg-alert-bg px-2 py-0.5 text-xs font-medium text-alert-ink">
                      {opt.tag}
                    </span>
                  )}
                </span>
                <span className="block text-sm text-ink-muted">{entry.explanationBg}</span>
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
        >
          Виж ориентировъчна оценка
        </button>
      </div>
    </div>
  );
}

function ResultsStep({
  vehicle,
  driver,
  coverage,
  onBack,
}: {
  vehicle: VehicleData;
  driver: DriverData;
  coverage: CoverageType;
  onBack: () => void;
}) {
  const estimate = estimateIndicativeRange({ vehicle, driver, coverage });
  const entry = kfzGlossary[coverage];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-ink">Твоята ориентировъчна оценка</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {summarizeVehicle(vehicle)} · {summarizeDriver(driver)}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-line">
        <div className="flex items-center justify-between bg-surface-strong px-4 py-3">
          <span className="font-medium text-ink">{entry.term}</span>
          <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-medium text-brand">
            Ориентировъчно
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-md bg-surface-strong p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
              Месечно
            </p>
            <p className="financial-number mt-1 text-2xl text-ink">
              {estimate.monthlyLowEur}–{estimate.monthlyHighEur} €
            </p>
          </div>
          <div className="rounded-md bg-surface-strong p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
              Годишно
            </p>
            <p className="financial-number mt-1 text-2xl text-ink">
              {estimate.yearlyLowEur}–{estimate.yearlyHighEur} €
            </p>
          </div>
        </div>
        <p className="border-t border-line px-5 py-3 text-xs text-ink-subtle">
          {estimate.disclaimer}
        </p>
      </div>

      <div className="rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
        Този калкулатор дава само обща, ориентировъчна информация и не
        представлява конкретна оферта, съвет или препоръка за продукт на
        определен застраховател. За обвързваща оферта и сключване на
        договор ви свързваме — с вашето изрично съгласие — с лицензиран
        партньор.
      </div>

      <HelpButton topic={`Автомобилна застраховка — ${entry.term}`} />

      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-brand hover:text-brand-hover"
      >
        ← Промени покритието
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}
