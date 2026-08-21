"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { heroSlides } from "@/lib/hero-slides";

const ROTATE_MS = 7000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [go, paused]);

  const slide = heroSlides[index];

  return (
    <div
      className="relative mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Предишна оферта"
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-2xl text-white/60 transition-colors hover:text-white sm:block"
      >
        &#10094;
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Следваща оферта"
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-2xl text-white/60 transition-colors hover:text-white sm:block"
      >
        &#10095;
      </button>

      <div
        aria-live="polite"
        className="mx-auto flex min-h-[13rem] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-14"
      >
        <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
          {slide.title}
        </h1>
        <p className="mt-3 max-w-xl text-white/70">{slide.subtitle}</p>
        <Link
          href={slide.href}
          className="mt-6 rounded-full bg-brand px-7 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
        >
          {slide.ctaLabel}
        </Link>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Оферта ${i + 1}: ${s.title}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
