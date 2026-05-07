import { z } from "zod"

export const bookSchema = z.object({
	title: z.string().min(1, { message: "Book Title is required" }),
	author: z.string().min(1, { message: "Book Author is required" }),
	price: z.any().optional(),
	rating: z.any().optional(),
	content: z.any(),
	// image: z.any().optional(),
	// rating: z
	// 	.number()
	// 	.min(0, { message: "Minimum rating is 0" })
	// 	.max(5, { message: "Maximum rating is 5" }),
	// rating: z.preprocess(
	// 	(val) => {
	// 		if (val === "" || val === null || val === undefined) {
	// 			return 0
	// 		}
	// 		return Number(val)
	// 	},
	// 	z
	// 		.number()
	// 		.min(0, { message: "Minimum rating is 0" })
	// 		.max(5, { message: "Maximum rating is 5" })
	// )
})

export type BookFormValues = z.infer<typeof bookSchema>