"use client"

import RichTextEditor from "@/app/components/shared/RichTextEditor/page"
import { Button } from "@/app/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { mapTiptapToBlocks } from "@/app/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { BookFormValues, bookSchema } from "./schema"
import { postBookReview } from "@/app/services/book-reviews.service"

export default function BookSubmitForm() {
	const methods = useForm<BookFormValues>({
		mode: "onChange",
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			content: "",
			// price: null,
			// rating: 1
		},
	})
	const { control, handleSubmit, reset, getValues } = methods
	const [loading, setLoading] = useState(false)

	const onSubmit = async (data: BookFormValues) => {
		try {
			setLoading(true)
			await formDataPostBookReview(data)
			reset()
		} catch (err) {
			console.error("Submit error:", err)
		} finally {
			setLoading(false)
		}
	}

	const formDataPostBookReview = (data: BookFormValues) => {
		const formData = new FormData()
		const contentBlocks = data.content ? mapTiptapToBlocks(data.content) : null
		formData.append("title", String(data.title))
		formData.append("author", String(data.author))
		formData.append("rating", "3")
		formData.append("price", "777")
		formData.append("content", JSON.stringify(contentBlocks))
		return postBookReview(formData)
	}

	return (
		<FormProvider {...methods}>
			<div className="flex flex-col gap-4">
				<FormField
					control={control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="author"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Author</FormLabel>
							<FormControl>
								<Input {...field} type="text" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormField
					control={control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<Input {...field} type="number" min={1} max={5} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<FormField
					control={control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<RichTextEditor {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormField
					control={control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price (optional)</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<Button onClick={handleSubmit(onSubmit)} disabled={loading}>
					{loading ? "Submitting..." : "Submit Book"}
				</Button>
			</div>
		</FormProvider>
	)
}
