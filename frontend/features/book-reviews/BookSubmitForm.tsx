"use client"

import TipTapEditor from "@/components/shared/TipTapEditor/page"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { mapTiptapToBlocks } from "@/lib/editor.util"
import { postBookReview } from "@/services/book-reviews.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import { BookFormValues, bookSchema } from "./schema"
import StarRating from "@/components/shared/Rating"

export default function BookSubmitForm() {
	const methods = useForm<BookFormValues>({
		mode: "onChange",
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			content: "",
			rating: 0,
			// price: undefined,
		},
	})
	const { control, handleSubmit, reset } = methods

	const formDataPostBookReview = (data: BookFormValues) => {
		const formData = new FormData()
		const contentBlocks = data.content ? mapTiptapToBlocks(data.content) : null
		formData.append("title", String(data?.title?.trim() || ""))
		formData.append("author", String(data?.author?.trim() || ""))
		formData.append("rating", data?.rating ? String(data.rating) : "0")
		// formData.append("price", data?.price ? String(data.price) : "")
		formData.append("content", contentBlocks?.length ? JSON.stringify(contentBlocks) : "")
		return postBookReview(formData)
	}

	const { isPending, error, mutate } = useMutation({
		mutationFn: formDataPostBookReview,
		onSuccess: () => {
			reset()
		},
		onError: (err) => {
			console.error("Submit error:", err)
		},
	})

	const onSubmit = (data: BookFormValues) => {
		console.log("Submitting form with data:", data)
		mutate(data)
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

				<FormField
					control={control}
					name="rating"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<StarRating value={field?.value || 0} onChange={(value) => field.onChange(value)} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="content"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<TipTapEditor {...field} hasError={!!fieldState.error} />
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

				<Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
					{isPending ? "Submitting..." : "Submit Book"}
				</Button>
				{error && (
					<div className="text-red-600 text-sm mt-2">
						Error: {error instanceof Error ? error.message : "An error occurred"}
					</div>
				)}
			</div>
		</FormProvider>
	)
}
