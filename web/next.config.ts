import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // All images are served from /public/imagessss/ — no external domains needed.
    remotePatterns: [],
  },
  typedRoutes: true,
  /** Lets HMR work when the tab uses 127.0.0.1 while dev binds to localhost (or vice versa). */
  allowedDevOrigins: ["127.0.0.1"],
};

export default config;
