import { z } from "zod"

export const bookSchema = z.object({
	title: z.string().min(1, "Book title is required"),
	content: z.string().min(1, "Book content is required"),
	price: z
		.string()
		.optional()
		.refine((val) => !val, {
			message: "Price must be a valid number",
		}),
	// image: z
	// 	.any()
	// 	.optional()
	// 	.refine(
	// 		(file) => !file || file instanceof File,
	// 		"Invalid file upload"
	// 	),
})

export type BookFormValues = z.infer<typeof bookSchema>