// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },  // ← no rompe el build por ESLint
  // opcional si quieres que SÓLO lint falle en dev:
  // typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
