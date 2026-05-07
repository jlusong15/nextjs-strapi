import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function mapDocs<T>(res: { data?: T }): T | undefined {
	return res.data;
}

export function cleanedObj<T>(obj: T) {
	if (!obj || typeof obj !== 'object') {
		return obj
	}
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => value !== '' && value !== null)
	);
}

export function mapTiptapToBlocks(data: InputDoc): OutputNode[] {
	function transform(node: InputNode): OutputNode {
		return {
			type: node.type,
			...(node.text ? { text: node.text } : {}),
			...(node.content
				? {
					children: node.content.map(transform),
				}
				: {}),
		}
	}
	const content = typeof data === 'string' ? JSON.parse(data)?.content : data?.content
	return content?.map(transform)
}