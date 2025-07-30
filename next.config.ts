import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ], // Add any other domains you need
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
