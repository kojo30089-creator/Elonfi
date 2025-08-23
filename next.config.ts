import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fra.cloud.appwrite.io","coin-images.coingecko.com"], // ✅ Add your Supabase domain here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
