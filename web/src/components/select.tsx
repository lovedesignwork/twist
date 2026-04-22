"use client";

/**
 * Aurora-styled Select.
 *
 * Built per the Cursor Feature Rules / Dropdown spec:
 *   - Whole field is the click target (button + absolute list)
 *   - Lucide ChevronDown with breathing room (≥12px right padding)
 *   - Arrow rotates 180° on open
 *   - Styled list panel: bg, border, rounded, shadow, z-index
 *   - Items: padding, hover state, cursor pointer
 *   - Active item visually distinguished (twist-yellow accent + check)
 *   - Closes on outside click + Escape
 *   - Keyboard: ↑ ↓ Home End Enter Escape
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

interface Props {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  /** Disable the trigger entirely. */
  disabled?: boolean;
}

export function Select({
  name,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required = false,
  className = "",
  disabled = false,
}: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [options, value],
  );
  const selectedOption =
    selectedIndex >= 0 ? options[selectedIndex] : undefined;

  // Outside click + ESC
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

  // When opening, scroll the active item into view
  useEffect(() => {
    if (!open) return;
    setFocusIndex(selectedIndex >= 0 ? selectedIndex : 0);
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector<HTMLElement>(
        `[data-idx="${selectedIndex >= 0 ? selectedIndex : 0}"]`,
      );
      el?.scrollIntoView({ block: "nearest" });
    });
  }, [open, selectedIndex]);

  const commit = useCallback(
    (idx: number) => {
      const opt = options[idx];
      if (!opt) return;
      onChange(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [options, onChange],
  );

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "Enter" ||
      e.key === " "
    ) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((i) => Math.min((i < 0 ? -1 : i) + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((i) => Math.max((i < 0 ? options.length : i) - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFocusIndex(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusIndex >= 0) commit(focusIndex);
    }
  };

  // Focus the active item visually when focusIndex moves
  useEffect(() => {
    if (!open || focusIndex < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${focusIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [focusIndex, open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={
          "w-full flex items-center justify-between gap-3 " +
          "pl-4 pr-3 py-[14px] text-left text-sm rounded-[10px] " +
          "bg-white/[0.04] border border-white/[0.12] text-white " +
          "transition-colors hover:border-white/25 " +
          "focus:outline-none focus:border-twist-yellow/55 focus:bg-white/[0.06] " +
          (open ? "border-twist-yellow/55 bg-white/[0.06] " : "") +
          "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        }
      >
        <span className={`truncate ${selectedOption ? "" : "text-white/40"}`}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-white/55 transition-transform duration-200 ${
            open ? "rotate-180 text-twist-yellow" : ""
          }`}
          aria-hidden
        />
      </button>

      {/* Native fallback so the value still flows through plain FormData */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}

      {/* Dropdown panel */}
      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            focusIndex >= 0 ? `${id}-opt-${focusIndex}` : undefined
          }
          onKeyDown={onListKeyDown}
          autoFocus
          className={
            "absolute z-50 left-0 right-0 mt-2 max-h-[280px] overflow-y-auto " +
            "rounded-2xl border border-white/15 bg-[#0E0422] " +
            "shadow-2xl shadow-black/60 backdrop-blur-xl py-1 outline-none"
          }
        >
          {options.map((opt, i) => {
            const active = i === selectedIndex;
            const focused = i === focusIndex;
            return (
              <li
                key={opt.value}
                id={`${id}-opt-${i}`}
                data-idx={i}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setFocusIndex(i)}
                onClick={() => commit(i)}
                className={
                  "flex items-center justify-between gap-3 px-4 py-[10px] cursor-pointer text-sm transition-colors " +
                  (active
                    ? "text-twist-yellow "
                    : "text-white/85 hover:text-white ") +
                  (focused
                    ? active
                      ? "bg-twist-yellow/10 "
                      : "bg-white/[0.06] "
                    : active
                      ? "bg-twist-yellow/[0.06] "
                      : "")
                }
              >
                <span className="flex-1 truncate">{opt.label}</span>
                {opt.hint && (
                  <span className="text-[11px] tw-mono opacity-55 flex-shrink-0">
                    {opt.hint}
                  </span>
                )}
                {active && (
                  <Check className="h-4 w-4 text-twist-yellow flex-shrink-0" aria-hidden />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
