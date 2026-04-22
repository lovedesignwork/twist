"use client";

import { useState } from "react";
import { CountryPhoneSelector } from "./country-phone-selector";
import { SITE } from "@/lib/site";

const TOPICS = [
  "General enquiry",
  "Private event",
  "Wedding",
  "Press / media",
  "Partnership",
  "Careers",
] as const;

type Topic = (typeof TOPICS)[number];

export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("General enquiry");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone,
          topic,
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
        }),
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
      <div className="border border-white/10 rounded-3xl p-12 text-center bg-gradient-to-b from-white/[0.035] to-transparent">
        <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-4">
          ◉ MESSAGE SENT
        </div>
        <h3 className="tw-serif text-4xl font-medium mb-3 leading-tight">
          Thank you. <span className="italic tw-gradient-text">We&apos;ll be in touch soon.</span>
        </h3>
        <p className="text-white/70 max-w-md mx-auto text-sm">
          We typically reply within 24 hours, often sooner. For urgent reservation
          questions, please call <span className="text-white">{SITE.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-white/10 rounded-3xl p-8 lg:p-12 bg-gradient-to-b from-white/[0.035] to-transparent"
    >
      <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
        ( SEND US A MESSAGE )
      </div>
      <h2 className="tw-serif text-4xl lg:text-5xl leading-none font-normal mb-8">
        Tell us what you&apos;re <span className="italic">thinking.</span>
      </h2>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {/* Topic chips */}
      <div className="mb-5">
        <div className="tw-mono text-[10px] tracking-[0.3em] opacity-60 mb-3 uppercase">
          What&apos;s this about?
        </div>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`px-4 py-[9px] rounded-full text-[11px] tracking-[0.15em] uppercase font-medium border transition ${
                  active
                    ? "bg-twist-pink/15 border-twist-pink/60 text-twist-pink"
                    : "bg-white/[0.03] border-white/15 text-white/85 hover:border-white/30"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Your name">
          <input
            className="tw-input"
            name="name"
            required
            placeholder="e.g. Nina Wattana"
            autoComplete="name"
          />
        </Field>
        <Field label="Email">
          <input
            className="tw-input"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-4 mb-4">
        <Field label="Phone — optional">
          <CountryPhoneSelector
            value={phone}
            onChange={setPhone}
            defaultCountry="TH"
            placeholder="Phone number"
          />
        </Field>
        <Field label="Subject">
          <input
            className="tw-input"
            name="subject"
            required
            placeholder="In a few words…"
            maxLength={140}
          />
        </Field>
      </div>

      <div className="mb-7">
        <Field label="Message">
          <textarea
            className="tw-textarea min-h-[160px]"
            name="message"
            required
            placeholder="Tell us a bit about what you have in mind — date, group size, anything we should know…"
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
        {submitting ? "Sending…" : "Send message →"}
      </button>
      <div className="tw-mono text-[10px] opacity-50 tracking-[0.15em] mt-4 text-center">
        WE REPLY WITHIN 24 HOURS · OFTEN SOONER
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
