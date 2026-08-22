"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { searchPages, type SearchEntry } from "@/lib/searchIndex";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchPages(query);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function go(entry: SearchEntry) {
    router.push(entry.href);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
        <SearchIcon className="h-5 w-5 shrink-0 text-ink-subtle" />
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Търси тарифа, застраховка, услуга…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full rounded-lg border border-line bg-white p-1.5 text-sm shadow-lg">
          {results.map((entry, index) => (
            <button
              key={entry.href}
              type="button"
              onMouseDown={() => go(entry)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`block w-full rounded-md px-3 py-2 text-left transition ${
                index === activeIndex ? "bg-brand-tint text-brand" : "text-ink"
              }`}
            >
              {entry.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
