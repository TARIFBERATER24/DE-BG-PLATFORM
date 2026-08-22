import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfjs-dist"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "files.manuscdn.com" }],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
