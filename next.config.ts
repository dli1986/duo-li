import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudflare R2 public bucket access (dev URL for now, custom domain later)
      { protocol: "https", hostname: "*.r2.dev" },
    ],
  },
};

export default nextConfig;
