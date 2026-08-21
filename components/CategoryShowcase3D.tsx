"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import VerticalIcon from "@/components/VerticalIcon";
import { homeCategories } from "@/lib/categories";

/**
 * Depth by column, not by index -- same shape repeats every row, so the
 * grid reads as symmetric layered planes instead of a random cascade.
 */
const COLUMN_DEPTHS = [0, 30, 30, 0];

const BASE_RX = 10;

export default function CategoryShowcase3D() {
  const planeRef = useRef<HTMLDivElement>(null);

  /**
   * Writes the tilt straight to CSS custom properties instead of React state --
   * mousemove fires far too often to re-render on.
   */
  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const plane = planeRef.current;
    if (!plane) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    plane.style.setProperty("--rx", `${BASE_RX - y * 12}deg`);
    plane.style.setProperty("--ry", `${x * 14}deg`);
  }, []);

  const handleLeave = useCallback(() => {
    const plane = planeRef.current;
    if (!plane) return;
    plane.style.setProperty("--rx", `${BASE_RX}deg`);
    plane.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      className="scene-3d -mx-6 px-6 py-8 sm:py-20"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={planeRef}
        className="plane-3d grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {homeCategories.map((category, index) => (
          <Link
            key={category.href}
            href={category.href}
            style={{ "--z": `${COLUMN_DEPTHS[index % COLUMN_DEPTHS.length]}px` } as React.CSSProperties}
            className="card-3d flex items-center gap-3 rounded-lg border border-line bg-surface p-4 shadow-[0_10px_30px_rgba(16,24,40,0.07)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-tint">
              <VerticalIcon icon={category.icon} className="h-5 w-5 text-brand" />
            </span>
            <span className="font-semibold text-ink">{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
