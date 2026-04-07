import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/khoazandev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
