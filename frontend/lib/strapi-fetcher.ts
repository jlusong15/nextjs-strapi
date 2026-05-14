const STRAPI_URL = process.env.STRAPI_URL
const STRAPI_TOKEN = process.env.STRAPI_TOKEN

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

export async function strapiPost(path: string, body: any) {
	if (!STRAPI_URL) {
		throw new Error("STRAPI_URL is not defined")
	}

	const res = await fetch(`${STRAPI_URL}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : "",
		},
		body: JSON.stringify(body),
	})

	if (!res.ok) {
		throw new Error(`Strapi POST failed: ${res.status}`)
	}

	return res.json()
}

export async function strapiUpload(file: File) {
	if (!STRAPI_URL) {
		throw new Error("STRAPI_URL is not defined")
	}

	if (!STRAPI_TOKEN) {
		throw new Error("STRAPI_TOKEN is not defined")
	}

	if (!file) {
		throw new Error("No file provided")
	}

	const formData = new FormData()
	formData.append("files", file)

	const res = await fetch(`${STRAPI_URL}/api/upload`, {
		method: "POST",
		headers: {
			// Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		body: formData,
	})

	if (!res.ok) {
		const err = await res.text()
		throw new Error(`Upload failed: ${err}`)
	}

	return res.json()
}
