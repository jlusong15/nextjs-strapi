const STRAPI_URL = process.env.STRAPI_URL;

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

	console.log("STATUS:", res.status);

	if (!res.ok) {
		throw new Error(`Strapi fetch failed: ${res.status}`)
		console.log("ERR:", res.ok);
	}
	console.log("OK:", res.ok);

	const data = await res.clone().json();
	console.log("DATA:", data);

	return res.json()
}