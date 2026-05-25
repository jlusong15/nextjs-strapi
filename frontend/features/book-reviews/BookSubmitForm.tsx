"use client"

import StarRating from "@/components/shared/Rating"
import TipTapEditor from "@/components/shared/TipTapEditor/page"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { postBookReview } from "@/services/book-reviews.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { mapBookReviewToFormData } from "./mapper"
import { BookFormValues, bookSchema } from "./schema"
import { toast } from "sonner"

export default function BookSubmitForm() {
	const router = useRouter()
	const methods = useForm({
		mode: "onChange",
		resolver: zodResolver(bookSchema),
		defaultValues: {
			title: "",
			author: "",
			content: "",
			rating: 0,
			price: "",
		},
	})
	const { control, handleSubmit, reset } = methods
	const handleRedirect = () => {
		router.push("/book-reviews")
	}
	const formDataPostBookReview = (data: BookFormValues) => {
		const formData = mapBookReviewToFormData(data)
		return postBookReview(formData)
	}
	const { isPending, error, mutate } = useMutation({
		mutationFn: formDataPostBookReview,
		onSuccess: () => {
			reset()
			toast.success("Review submitted successfully!")
			handleRedirect()
		},
		onError: (err) => {
			console.error("Submit error:", err)
			toast.error("An error occurred while submitting the review. Please try again.")
		},
	})
	const onSubmit = (data: BookFormValues) => {
		mutate(data as BookFormValues)
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
								<Input {...field} type="text" disabled={isPending} />
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
								<Input {...field} type="text" disabled={isPending} />
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
								<StarRating
									value={field?.value || 0}
									onChange={(value) => field.onChange(value)}
									readonly={isPending}
								/>
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
								<TipTapEditor {...field} hasError={!!fieldState.error} disabled={isPending} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price (optional)</FormLabel>
							<FormControl>
								<Input {...field} type="number" disabled={isPending} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-auto">
					<Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
						{isPending ? "Submitting..." : "Submit Review"}
					</Button>
				</div>
				{error && (
					<div className="text-red-600 text-sm mt-2">
						Error: {error instanceof Error ? error.message : "An error occurred"}
					</div>
				)}
			</div>
		</FormProvider>
	)
}
