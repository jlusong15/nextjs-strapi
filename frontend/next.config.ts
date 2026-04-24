import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["localhost", "nextjs-strapi-production.up.railway.app", "nextjs-strapi-sepia.vercel.app"],
	},
};

export default nextConfig;
