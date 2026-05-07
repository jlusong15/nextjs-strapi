export function mapTiptapToBlocks(data: InputDoc): OutputNode[] {
	function transform(node: InputNode): OutputNode | null {
		if (!node) return null

		if (node.type === "text") {
			if (!node.text?.trim()) return null

			return {
				type: "text",
				text: node.text,
			}
		}

		const rawChildren = node.content?.map(transform) || []

		const children = rawChildren.filter(
			(child): child is OutputNode => child !== null
		)

		if (node.type === "paragraph" && children.length === 0) {
			return null
		}

		return {
			type: node.type,
			...(children.length ? { children } : {}),
			...(node.text ? { text: node.text } : {}),
		}
	}

	const content =
		typeof data === "string"
			? JSON.parse(data)?.content
			: data?.content

	if (!Array.isArray(content)) return []

	return content
		.map(transform)
		.filter((node): node is OutputNode => node !== null)
}