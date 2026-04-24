import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
    domains: ["localhost", "nextjs-strapi-production.up.railway.app"],
  },
};

export default nextConfig;
