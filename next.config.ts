import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server output: used by the Dockerfile / VPS deployment.
  // Vercel ignores this and builds its own output.
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
