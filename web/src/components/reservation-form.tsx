"use client";

import { useState } from "react";
import { CountryPhoneSelector } from "./country-phone-selector";
import { DateField } from "./date-field";
import { Select, type SelectOption } from "./select";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Date night",
  "Business",
] as const;

const TIME_OPTIONS: SelectOption[] = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
].map((t) => ({ value: t, label: t }));

const PARTY_OPTIONS: SelectOption[] = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  return {
    value: String(n),
    label: `${n} ${n === 1 ? "guest" : "guests"}`,
  };
});

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ReservationForm() {
  const [occasion, setOccasion] = useState<string>("Date night");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("19:30");
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState(tomorrowISO());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      first_name: String(fd.get("first_name") ?? ""),
      last_name: String(fd.get("last_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone,
      party_size: Number(partySize),
      date,
      time,
      occasion,
      notes: String(fd.get("notes") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="tw-card p-12 text-center">
        <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-4">
          ◉ CONFIRMED
        </div>
        <h3 className="tw-serif text-4xl font-medium leading-tight mb-3">
          Your seat is <span className="italic tw-gradient-text">saved.</span>
        </h3>
        <p className="text-white/70 max-w-md mx-auto">
          A confirmation is on its way to your inbox. We&apos;ll see you 19 floors up
          — and you can cancel free of charge up to 24 hours ahead.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-white/10 rounded-3xl p-8 lg:p-12 bg-gradient-to-b from-white/[0.035] to-transparent"
    >
      <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-5">
        ( 01 ) — RESERVE A TABLE
      </div>
      <h2 className="tw-serif text-4xl lg:text-5xl leading-none font-normal mb-8">
        Book your <span className="italic">evening.</span>
      </h2>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="First name">
          <input className="tw-input" name="first_name" required placeholder="Nina" />
        </Field>
        <Field label="Last name">
          <input className="tw-input" name="last_name" required placeholder="Wattana" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Email">
          <input
            className="tw-input"
            type="email"
            name="email"
            required
            placeholder="nina@mail.com"
          />
        </Field>
        <Field label="Phone">
          <CountryPhoneSelector
            value={phone}
            onChange={setPhone}
            defaultCountry="TH"
            placeholder="Phone number"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <Field label="Date">
          <DateField
            name="date"
            value={date}
            onChange={setDate}
            required
            minDate={todayISO()}
          />
        </Field>
        <Field label="Time">
          <Select
            name="time"
            value={time}
            onChange={setTime}
            options={TIME_OPTIONS}
          />
        </Field>
        <Field label="Party">
          <Select
            name="party_size"
            value={partySize}
            onChange={setPartySize}
            options={PARTY_OPTIONS}
          />
        </Field>
      </div>

      <div className="mb-4">
        <Field label="Occasion · optional">
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) => {
              const active = occasion === o;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOccasion(active ? "" : o)}
                  className={`px-4 py-[9px] rounded-full text-[11px] tracking-[0.15em] uppercase font-medium border transition ${
                    active
                      ? "bg-twist-yellow/15 border-twist-yellow/60 text-twist-yellow"
                      : "bg-white/[0.03] border-white/15 text-white/85 hover:border-white/30"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <div className="mb-7">
        <Field label="Notes for the host">
          <textarea
            className="tw-textarea min-h-[120px]"
            name="notes"
            placeholder="Dietary needs, seat preference, champagne on arrival..."
          />
        </Field>
      </div>

      {error && (
        <div className="text-twist-pink text-sm mb-4 tw-mono tracking-wider">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="tw-btn-pill tw-btn-primary w-full text-[13px] py-[18px] disabled:opacity-60"
      >
        {submitting ? "Saving your seat…" : "Confirm reservation →"}
      </button>
      <div className="tw-mono text-[10px] opacity-50 tracking-[0.15em] mt-4 text-center">
        CONFIRMATION BY EMAIL · CANCEL FREE 24H AHEAD
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="tw-mono text-[10px] tracking-[0.3em] opacity-60 mb-2 uppercase">
        {label}
      </div>
      {children}
    </label>
  );
}
