'use client';
import Link from 'next/link';
export default function BlogError({reset}:{reset:()=>void}) {
  return <main className="min-h-screen px-6 py-36 max-w-3xl mx-auto"><h1 className="tw-serif text-4xl">The stories are taking a moment.</h1><p className="mt-6 text-white/70">Please try again, or explore TWIST while we reconnect.</p><button onClick={reset} className="tw-btn-pill tw-btn-primary mt-8">Try again</button><Link href="/" className="block mt-6 underline">Back to TWIST</Link></main>;
}
