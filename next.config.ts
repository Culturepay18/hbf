import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@uiw/react-md-editor", "@uiw/react-markdown-preview"],
  // Ensure social crawlers (including less common ones like WhatsApp variants)
  // always receive complete metadata in initial HTML.
  htmlLimitedBots: /.*/,
  // In Next.js 15, these are still the correct keys for ignoring errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
