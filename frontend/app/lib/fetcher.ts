const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
	throw new Error('Missing NEXT_PUBLIC_API_URL');
}

type FetchOptions = RequestInit & {
	revalidate?: number;
};

export async function fetcher<T>(
	endpoint: string,
	options: FetchOptions = {}
): Promise<T> {
	const { revalidate, ...fetchOptions } = options;

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...fetchOptions,
		cache: revalidate ? 'force-cache' : 'no-store',
		next: revalidate ? { revalidate } : undefined,
		headers: {
			'Content-Type': 'application/json',
			...(fetchOptions.headers || {}),
		},
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error(
			`API Error ${res.status}: ${res.statusText}`,
			errorText
		);
		throw new Error(`Request failed with status ${res.status}`);
	}

	return res.json();
}