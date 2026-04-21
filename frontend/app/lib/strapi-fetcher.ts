const STRAPI_URL = process.env.STRAPI_URL || 'https://nextjs-strapi-rawh.onrender.com/api'

export async function strapiFetch(path: string) {
	if (!STRAPI_URL) {
		throw new Error("STRAPI_URL is not defined")
	}

	const res = await fetch(`${STRAPI_URL}${path}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	})

	if (!res.ok) {
		throw new Error(`Strapi fetch failed: ${res.status}`)
	}

	return res.json()
}