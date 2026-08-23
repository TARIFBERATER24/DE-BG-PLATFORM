"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { verticals } from "@/lib/verticals";

const EXTRA_LINKS = [
  { href: "/produkte", title: "Сравни" },
  { href: "/mein-deutschland", title: "Mein Deutschland" },
  { href: "/germaniya", title: "Германия от А до Я" },
  { href: "/uslugi", title: "Услуги" },
];

export default function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
      >
        Категории
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-line bg-white p-2 text-sm font-medium text-ink shadow-lg">
          {verticals.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/${vertical.slug}`}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 transition hover:bg-brand-tint hover:text-brand"
            >
              {vertical.title}
            </Link>
          ))}
          <div className="my-1 border-t border-line" />
          {EXTRA_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 transition hover:bg-brand-tint hover:text-brand"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
