"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// The existing twistphuket.com web stream in the TWIST Analytics account.
const MEASUREMENT_ID = "G-36C18XKX3H";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Keep local development and Vercel previews out of the live reports.
    setEnabled(
      window.location.hostname === "twistphuket.com" ||
        window.location.hostname === "www.twistphuket.com",
    );
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script id="twist-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
