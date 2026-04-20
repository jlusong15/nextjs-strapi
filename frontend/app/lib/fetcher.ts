const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api/';

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
		// optional: better error logging
		const errorText = await res.text();
		throw new Error(
			`API Error ${res.status}: ${res.statusText} - ${errorText}`
		);
	}

	return res.json();
}