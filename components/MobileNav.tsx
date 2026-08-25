"use client";

import { useState } from "react";
import Link from "next/link";
import { verticals } from "@/lib/verticals";
import { MenuIcon, CloseIcon } from "@/components/icons";
import HeaderTools from "@/components/HeaderTools";

const PRIMARY_LINKS = [
  { href: "/", title: "Начало" },
  { href: "/uslugi", title: "Услуги" },
  { href: "/mein-deutschland", title: "Mein Deutschland" },
  { href: "/germaniya", title: "Германия от А до Я" },
  { href: "/produkte", title: "Сравни" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        aria-expanded={open}
        className="rounded-md p-2 text-white hover:bg-white/10"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line bg-canvas px-6 py-4 text-sm font-medium text-ink shadow-sm">
          <HeaderTools mobile onNavigate={() => setOpen(false)} />

          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 hover:bg-surface"
            >
              {link.title}
            </Link>
          ))}

          <span className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">
            Категории
          </span>
          {verticals.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/${vertical.slug}`}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 hover:bg-surface"
            >
              {vertical.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

