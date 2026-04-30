import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
  typedRoutes: true,
  /** Lets HMR work when the tab uses 127.0.0.1 while dev binds to localhost (or vice versa). */
  allowedDevOrigins: ["127.0.0.1"],
};

export default config;
