import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function mapDocs<T extends { docs?: T }>(data: T): T["docs"] | T {
	return data?.docs ?? data;
}

export function cleanedObj<T>(obj: T) {
	if (!obj || typeof obj !== 'object') {
		return obj
	}
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => value !== '' && value !== null)
	);
}
