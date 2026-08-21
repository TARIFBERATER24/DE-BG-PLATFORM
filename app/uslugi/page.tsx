import Link from "next/link";
import type { Metadata } from "next";
import { visibleServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Платени услуги",
  description:
    "Лична помощ на български при тарифи, договори и официални термини в Германия.",
};

export default function UslugiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Платени услуги
      </h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Освен безплатните сравнения, предлагаме и лична помощ, когато случаят
        е по-сложен или просто нямате време да го решавате сами.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {visibleServices.map((service) => (
          <Link
            key={service.slug}
            href={`/uslugi/${service.slug}`}
            className="rounded-lg border border-line p-6 transition-colors hover:border-brand hover:shadow-sm"
          >
            <h2 className="font-semibold text-ink">{service.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {service.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
