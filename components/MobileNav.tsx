"use client";

import { useState } from "react";
import Link from "next/link";
import { verticals } from "@/lib/verticals";
import { MenuIcon, CloseIcon } from "@/components/icons";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        aria-expanded={open}
        className="rounded-md p-2 text-ink hover:bg-surface"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line bg-canvas px-6 py-4 text-sm font-medium text-ink shadow-sm">
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
          <Link
            href="/germaniya"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 hover:bg-surface"
          >
            Германия от А до Я
          </Link>
          <Link
            href="/uslugi"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 hover:bg-surface"
          >
            Услуги
          </Link>
        </nav>
      )}
    </div>
  );
}
