"use client";

// Modern 3D direction: the existing type, copy, imagery, and CTAs sit on a restrained physical stage rather than a decorative effect.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      className="hero-carousel-stage relative mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Предишна оферта"
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full p-4 text-[2rem] text-white/60 transition-colors hover:text-white sm:block"
      >
        &#10094;
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Следваща оферта"
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full p-4 text-[2rem] text-white/60 transition-colors hover:text-white sm:block"
      >
        &#10095;
      </button>

      <div
        aria-live="polite"
        className="grid min-h-[16rem] items-center gap-8 px-4 sm:px-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-24"
      >
        <div className="hero-copy-layer text-center lg:text-left">
          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-white/70">{slide.subtitle}</p>
          <Link
            href={slide.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
          >
            {slide.ctaLabel}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {slide.image ? (
          <div className="hero-render-stage relative hidden lg:block lg:-mr-24 xl:-mr-40">
            <div className="hero-spatial-layer" aria-hidden="true">
              <span className="hero-orbit hero-orbit--wide" />
              <span className="hero-orbit hero-orbit--near" />
              <span className="hero-float-chip hero-float-chip--top">На български</span>
              <span className="hero-float-chip hero-float-chip--left">Сравни</span>
              <span className="hero-float-chip hero-float-chip--right">Избери</span>
            </div>
            <Image
              src={slide.image}
              alt={slide.imageAlt ?? ""}
              width={1195}
              height={724}
              priority={index === 0}
              className="hero-render relative z-10 h-auto w-full scale-110"
            />
          </div>
        ) : null}
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
