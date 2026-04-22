import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
	'strapi::logger',
	'strapi::errors',
	'strapi::security',
	{
		name: "strapi::cors",
		config: {
			origin: [
				"http://localhost:3000",
				"https://nextjs-strapi-sepia.vercel.app",
			],
		},
	},
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
];

export default config;
