import { StrapiRichTextBlock } from "@/app/types/book-review.model"
import { JSX } from "react"

function extractPlainText(blocks: StrapiRichTextBlock[]): string {
	return blocks.map((block) => block.children?.map((child) => child.text || "").join("") || "").join(" ")
}

export default function StrapiRichTextBlocks({
	content,
	isPlain = false,
}: {
	content: StrapiRichTextBlock[]
	isPlain?: boolean
}) {
	if (!content) {
		return <></>
	}

	if (isPlain) {
		return <>{extractPlainText(content)}</>
	}

	return (
		<div>
			{content.map((block, i) => {
				switch (block.type) {
					case "paragraph":
						return (
							<p key={i}>
								{block.children?.map((child, j) => (
									<span
										key={j}
										style={{
											fontWeight: child.bold ? "bold" : "normal",
											fontStyle: child.italic ? "italic" : "normal",
										}}
									>
										{child.text}
									</span>
								))}
							</p>
						)

					case "heading":
						const Tag = `h${block.level || 1}` as keyof JSX.IntrinsicElements
						return <Tag key={i}>{block.children?.[0]?.text}</Tag>

					default:
						return null
				}
			})}
		</div>
	)
}
