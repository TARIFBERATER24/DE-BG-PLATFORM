// Modern 3D direction: category entry points read as light, elevated product tiles; their labels, font, and links stay unchanged.
import Link from "next/link";
import {
  Zap,
  Flame,
  Wifi,
  Smartphone,
  Car,
  ShieldCheck,
  Home as HomeIcon,
  HeartPulse,
  Landmark,
  HandCoins,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { homeCategories } from "@/lib/categories";

/**
 * One Lucide icon per category, keyed by href -- homeCategories only carries
 * a coarse vertical icon (bolt/shield/wallet), shared across several
 * categories, which isn't granular enough for this grid.
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "/energiya-telekom/tok": Zap,
  "/energiya-telekom/gaz": Flame,
  "/energiya-telekom/internet": Wifi,
  "/energiya-telekom/mobilni-planove": Smartphone,
  "/zastrahovki/avto": Car,
  "/zastrahovki/grazhdanska-otgovornost": ShieldCheck,
  "/zastrahovki/imushtestvo": HomeIcon,
  "/zastrahovki/zdravna-doplnitelna": HeartPulse,
  "/finansi/bankova-smetka": Landmark,
  "/finansi/krediti": HandCoins,
  "/finansi/kreditna-karta": CreditCard,
};

export default function CategoryCardGrid() {
  return (
    <div className="category-3d-stage grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {homeCategories.map((category) => {
        const Icon = CATEGORY_ICONS[category.href] ?? Zap;
        return (
          <Link
            key={category.href}
            href={category.href}
            className="category-lift-card group flex items-center gap-4 rounded-xl border border-line bg-white p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-semibold text-ink">{category.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
