import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 정적 HTML로 export
  images: {
    unoptimized: true, // GitHub Pages는 Image Optimization 불가
  },
};

export default nextConfig;
