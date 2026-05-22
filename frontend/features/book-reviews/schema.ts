import { z } from "zod"
import { mapTiptapToBlocks } from "@/lib/editor.util"

export const bookSchema = z.object({
	title: z.string().min(1, { message: "Book Title is required" }),
	author: z.string().min(1, { message: "Book Author is required" }),
	rating: z
		.number()
		.min(1, { message: "Rating must be at least 1 star" })
		.max(5, { message: "Rating must be at most 5 stars" })
		.optional(),
	content: z
		.any()
		.refine((val) => {
			if (!val) return false
			try {
				const blocks = mapTiptapToBlocks(val)
				return Array.isArray(blocks) && blocks.length > 0
			} catch (e) {
				return false
			}
		}, { message: "Content is required" }),
	price: z.preprocess(
		(val) => {
			if (val === "" || val === null || val === undefined) return undefined
			return Number(val)
		},
		z.number().gt(0, { message: "Price must be greater than zero" }).optional()
	),
})

export type BookFormValues = z.infer<typeof bookSchema>