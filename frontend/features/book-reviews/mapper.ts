import { mapTiptapToBlocks } from "@/lib/editor.util"
import { BookFormValues } from "./schema"


export const mapBookReviewToFormData = (
	data: BookFormValues
) => {
	const formData = new FormData()

	const contentBlocks = data.content
		? mapTiptapToBlocks(data.content)
		: []

	const fields = {
		title: data.title?.trim() ?? '',
		author: data.author?.trim() ?? '',
		rating: String(data.rating ?? 0),
		price: data.price ? String(data.price) : '',
		content: contentBlocks.length
			? JSON.stringify(contentBlocks)
			: '',
	}

	Object.entries(fields).forEach(([key, value]) => {
		formData.append(key, value)
	})

	return formData
}