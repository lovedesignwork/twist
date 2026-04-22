"use client";

/**
 * DateField — Aurora-themed trigger that opens the white CalendarPicker popover.
 * Trigger styling matches the rest of the form (.tw-input). The popover follows
 * the spec verbatim (white card, dark navy border).
 */

import { useEffect, useId, useRef, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { CalendarPicker } from "./calendar-picker";

interface Props {
  name?: string;
  value: string;
  onChange: (iso: string) => void;
  required?: boolean;
  /** ISO yyyy-mm-dd; defaults to today (no past dates). */
  minDate?: string;
  maxDate?: string;
  placeholder?: string;
  className?: string;
}

function fmtDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DateField({
  name,
  value,
  onChange,
  required = false,
  minDate,
  maxDate,
  placeholder = "Pick a date",
  className = "",
}: Props) {
  const id = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Decide whether to flip the popover above the trigger if there's no room below.
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUp(spaceBelow < 420);
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          "w-full flex items-center justify-between gap-3 " +
          "pl-4 pr-3 py-[14px] text-left text-sm rounded-[10px] " +
          "bg-white/[0.04] border border-white/[0.12] text-white " +
          "transition-colors hover:border-white/25 " +
          "focus:outline-none focus:border-twist-yellow/55 focus:bg-white/[0.06] " +
          (open ? "border-twist-yellow/55 bg-white/[0.06] " : "") +
          "cursor-pointer"
        }
      >
        <span className={value ? "" : "text-white/40"}>
          {value ? fmtDisplay(value) : placeholder}
        </span>
        <CalendarIcon
          className={`h-4 w-4 flex-shrink-0 transition-colors ${
            open ? "text-twist-yellow" : "text-white/55"
          }`}
          aria-hidden
        />
      </button>

      {/* Hidden field for FormData fallback */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}

      {open && (
        <div
          className={`absolute z-50 left-0 ${openUp ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          <CalendarPicker
            value={value}
            onChange={(iso) => {
              onChange(iso);
              setOpen(false);
              triggerRef.current?.focus();
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
