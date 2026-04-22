"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(fd.get("email") ?? ""),
          website: String(fd.get("website") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="tw-mono tracking-[0.2em] text-twist-yellow text-sm">
        ◉ YOU&apos;RE ON THE LIST. CHECK YOUR INBOX.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex max-w-[520px] mx-auto border border-white/20 rounded-full overflow-hidden bg-black/30"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 px-6 py-4 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
      />
      <button
        type="submit"
        disabled={submitting}
        className="m-[3px] tw-btn-pill tw-btn-primary text-[12px] disabled:opacity-60"
      >
        {submitting ? "…" : "Subscribe →"}
      </button>
      {error && (
        <div className="absolute mt-16 text-twist-pink text-xs tw-mono tracking-wider">
          {error}
        </div>
      )}
    </form>
  );
}
