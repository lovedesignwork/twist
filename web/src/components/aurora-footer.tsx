import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  {
    h: "VISIT",
    items: [
      { label: "Reserve a Table", href: "/reserve" as const },
      { label: "Menu", href: "/menu" as const },
      { label: "Events", href: "/events" as const },
      { label: "Journal", href: "/blog" as const },
    ],
  },
  {
    h: "HOURS",
    items: [
      { label: "Daily 5 PM – Late", href: "#" },
      { label: "Live music 19:00 – 21:00", href: "#" },
      { label: "Kitchen til 23:00", href: "#" },
    ],
  },
  {
    h: "CONNECT",
    items: [
      { label: "Instagram", href: SITE.social.instagram },
      { label: "Facebook", href: SITE.social.facebook },
      { label: "TripAdvisor", href: SITE.social.tripadvisor },
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: SITE.phone, href: `tel:${SITE.phoneTel}` },
    ],
  },
];

export function AuroraFooter() {
  return (
    <footer className="relative z-[2] border-t border-white/[0.08] px-6 lg:px-16 pt-14 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
        <div>
          <div className="tw-italiana text-3xl tracking-[0.3em] mb-4">TWIST</div>
          <p className="text-[13px] leading-relaxed text-white/55 max-w-[340px]">
            19th Floor, Royal Phuket City Hotel. Phuket Old Town&apos;s most iconic
            rooftop bar &amp; restaurant — a fusion of Thai roots, international
            craft, and a skyline that never repeats itself.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.h}>
            <div className="tw-mono text-[10px] tracking-[0.25em] text-white/50 mb-4">
              {col.h}
            </div>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href as "/"}
                      className="text-sm text-white/80 hover:text-white transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-white/80 hover:text-white transition"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-3 text-[11px] text-white/40 tracking-[0.15em] tw-mono">
        <div>© {new Date().getFullYear()} TWIST · ROYAL PHUKET CITY HOTEL</div>
        <div>MADE FOR THE NIGHT</div>
      </div>
    </footer>
  );
}
