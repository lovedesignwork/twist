import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // Only the dedicated TWIST CMS bucket may supply remote editorial images.
    remotePatterns: [{ protocol: "https", hostname: "crhzxvbubvyachauomlx.supabase.co", pathname: "/storage/v1/object/public/twist-blog-images/**" }],
  },
  typedRoutes: true,
  /** Lets HMR work when the tab uses 127.0.0.1 while dev binds to localhost (or vice versa). */
  allowedDevOrigins: ["127.0.0.1"],
};

export default config;
