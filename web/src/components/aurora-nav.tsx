"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function AuroraNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[rgba(6,2,15,0.7)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-16 py-5 lg:py-7">
        <Link href="/" className="hover:opacity-80 transition">
          <Image
            src="/TWIST-LOGO-White-PNG.png"
            alt="TWIST"
            width={96}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9 text-[13px] tracking-[0.18em] uppercase font-medium">
          {ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 transition ${
                  active
                    ? "text-white border-b border-twist-yellow/80"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/reserve"
            className="hidden sm:inline-flex tw-btn-pill tw-btn-primary shadow-[0_4px_24px_-4px_rgba(139,92,246,0.45)] hover:opacity-95"
          >
            Reserve →
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span className={`block w-4 h-px bg-white transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block w-4 h-px bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-px bg-white transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[480px]" : "max-h-0"
        } bg-[rgba(6,2,15,0.95)] backdrop-blur-xl border-b border-white/5`}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`tw-serif text-2xl py-2 transition ${
                  active ? "text-twist-yellow italic" : "text-white/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/reserve"
            onClick={() => setOpen(false)}
            className="mt-4 tw-btn-pill tw-btn-primary justify-self-start self-start"
          >
            Reserve a Table →
          </Link>
        </div>
      </div>
    </nav>
  );
}
