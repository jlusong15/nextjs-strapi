import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
			},
			{
				protocol: 'https',
				hostname: 'nextjs-strapi-production.up.railway.app',
			},
			{
				protocol: 'https',
				hostname: 'nextjs-strapi-sepia.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
};

export default nextConfig;