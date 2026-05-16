import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
