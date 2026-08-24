import TrackedLink from "@/components/home/TrackedLink";
import VerticalIcon from "@/components/VerticalIcon";
import { homeCategories } from "@/lib/categories";

/**
 * Concise preview only -- the full comparison hub lives at /produkte and keeps every
 * category, widget and affiliate path. Reuses lib/categories.ts and VerticalIcon so
 * there is one source of truth for what a category is called and how it looks.
 */
const previewHrefs = [
  "/energiya-telekom/tok",
  "/energiya-telekom/gaz",
  "/energiya-telekom/internet",
  "/energiya-telekom/mobilni-planove",
  "/finansi/bankova-smetka",
  "/finansi/krediti",
  "/zastrahovki/avto",
];

const previewCategories = previewHrefs
  .map((href) => homeCategories.find((category) => category.href === href))
  .filter((category): category is NonNullable<typeof category> => Boolean(category));

export default function ProductsPreview() {
  return (
    <section aria-labelledby="products-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="products-title"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Провери дали плащаш излишно
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">
            Договорите в Германия рядко поевтиняват сами. Виж какво плащаш днес и
            какви са условията при други доставчици.
          </p>
        </div>
        <TrackedLink
          href="/produkte"
          event="homepage_products_clicked"
          payload={{ source: "products_preview_header" }}
          className="shrink-0 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          Виж всички сравнения →
        </TrackedLink>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {previewCategories.map((category) => (
          <TrackedLink
            key={category.href}
            href={category.href}
            event="homepage_products_clicked"
            payload={{ category: category.title }}
            className="group flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-4 transition-colors hover:border-brand hover:shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-strong text-brand transition-colors group-hover:bg-brand-tint">
              <VerticalIcon icon={category.icon} className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-ink">{category.title}</span>
          </TrackedLink>
        ))}

        <TrackedLink
          href="/produkte"
          event="homepage_products_clicked"
          payload={{ source: "products_preview_tile" }}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-line-strong px-4 py-4 text-sm font-semibold text-ink-muted transition-colors hover:border-brand hover:text-brand"
        >
          Всички категории →
        </TrackedLink>
      </div>
    </section>
  );
}
