"use client";

/**
 * CalendarPicker — Aurora dark theme.
 *
 * Same structural rules as the Cursor calendar spec (custom-built, lucide
 * chevrons, 7-col grid, real <button> day cells, today ring, no third-party
 * libs) — restyled to match the TWIST site's dark editorial aesthetic.
 *
 * Theme mapping:
 *   - Container        → #0E0422 panel, white/15 border, rounded-2xl, soft shadow
 *   - Title            → Playfair Display, white
 *   - Weekday headers  → JetBrains Mono, tracking-[0.2em], white/50
 *   - Available day    → bg-white/[0.04], hover bg-white/[0.10]
 *   - Selected day     → bg-twist-yellow + ink text + soft glow
 *   - Today ring       → twist-yellow/60
 *   - Past / disabled  → white/20, cursor-not-allowed
 */

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  /** ISO yyyy-mm-dd string */
  value: string;
  onChange: (iso: string) => void;
  /** Min selectable ISO date — defaults to today. */
  minDate?: string;
  /** Max selectable ISO date — optional. */
  maxDate?: string;
  className?: string;
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function CalendarPicker({
  value,
  onChange,
  minDate,
  maxDate,
  className = "",
}: Props) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = useMemo(
    () => (minDate ? startOfDay(new Date(minDate)) : today),
    [minDate, today],
  );
  const max = useMemo(
    () => (maxDate ? startOfDay(new Date(maxDate)) : null),
    [maxDate],
  );

  const valueDate = useMemo(
    () => (value ? startOfDay(new Date(value)) : null),
    [value],
  );

  const initial = valueDate ?? today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const lastOfMonth = new Date(viewYear, viewMonth + 1, 0);
  const daysInMonth = lastOfMonth.getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const goPrev = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const goNext = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null as null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isUnavailable = (d: Date): boolean => {
    if (d < min) return true;
    if (max && d > max) return true;
    return false;
  };

  return (
    <div
      role="dialog"
      aria-label="Choose a date"
      className={
        "rounded-2xl border border-white/15 bg-[#0E0422] " +
        "shadow-2xl shadow-black/60 backdrop-blur-xl p-4 " +
        className
      }
      style={{ width: 340 }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous month"
          className="rounded-full p-2 text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ChevronLeft className="h-[18px] w-[18px]" aria-hidden />
        </button>
        <div
          className="tw-serif text-[19px] font-medium text-white tracking-[-0.005em]"
          aria-live="polite"
        >
          {MONTHS[viewMonth]}{" "}
          <span className="text-twist-yellow/80">{viewYear}</span>
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="rounded-full p-2 text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ChevronRight className="h-[18px] w-[18px]" aria-hidden />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="py-2 tw-mono text-[10px] tracking-[0.2em] uppercase text-white/45"
          >
            {w.slice(0, 2)}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`b${i}`} className="h-10" />;
          }
          const cellDate = new Date(viewYear, viewMonth, day);
          const iso = toISO(cellDate);
          const disabled = isUnavailable(cellDate);
          const isSelected = valueDate ? toISO(valueDate) === iso : false;
          const isToday = toISO(today) === iso;

          let stateClasses = "";
          let stateStyle: React.CSSProperties | undefined;

          if (isSelected) {
            stateClasses =
              "bg-twist-yellow text-twist-ink font-semibold cursor-pointer hover:opacity-95";
            stateStyle = {
              boxShadow:
                "0 0 0 1px rgba(253,224,71,0.4), 0 6px 22px -6px rgba(253,224,71,0.45)",
            };
          } else if (disabled) {
            stateClasses = "text-white/20 cursor-not-allowed";
          } else {
            stateClasses =
              "bg-white/[0.04] text-white/90 hover:bg-white/[0.10] hover:text-white cursor-pointer";
          }

          const todayRing =
            isToday && !isSelected
              ? "ring-1 ring-twist-yellow/60 ring-offset-1 ring-offset-[#0E0422]"
              : "";

          return (
            <div key={iso} className="flex items-center justify-center">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(iso)}
                aria-label={cellDate.toDateString()}
                aria-pressed={isSelected}
                style={stateStyle}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${stateClasses} ${todayRing}`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center justify-center gap-6 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15 border border-white/20" />
          <span className="tw-mono text-[10px] tracking-[0.2em] uppercase text-white/55">
            Available
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-twist-yellow"
            style={{ boxShadow: "0 0 8px rgba(253,224,71,0.5)" }}
          />
          <span className="tw-mono text-[10px] tracking-[0.2em] uppercase text-white/55">
            Selected
          </span>
        </div>
      </div>
    </div>
  );
}
