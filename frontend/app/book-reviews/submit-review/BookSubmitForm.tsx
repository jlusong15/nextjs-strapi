"use client"

import { useState } from "react"
import { BookFormValues, bookSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/components/ui/button"

export default function BookSubmitForm() {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BookFormValues>({
		resolver: zodResolver(bookSchema),
	})

	const onSubmit = async (data: BookFormValues) => {
		setLoading(true)

		try {
			const formData = new FormData()

			formData.append("title", data.title)
			formData.append("content", data.content)

			if (data.price !== undefined) {
				formData.append("price", String(data.price))
			}

			// file handling (important: RHF stores FileList)
			// const fileInput = (data.image as unknown as FileList)?.[0]
			// if (fileInput) {
			// 	formData.append("image", fileInput)
			// }

			await fetch("/api/books", {
				method: "POST",
				body: formData,
			})

			reset()
			alert("Book submitted successfully!")
		} catch (err) {
			console.error(err)
			alert("Submission failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			{/* Title */}
			<div className="flex flex-col gap-1">
				<label>Book Title *</label>
				<input className="border p-2 rounded" {...register("title")} />
				{errors.title && <small className="text-red-500">{errors.title.message}</small>}
			</div>

			{/* Content */}
			<div className="flex flex-col gap-1">
				<label>Book Content *</label>
				<textarea className="border p-2 rounded min-h-37.5" {...register("content")} />
				{errors.content && <small className="text-red-500">{errors.content.message}</small>}
			</div>

			{/* Image */}
			{/* <div className="flex flex-col gap-1">
				<label>Book Image (optional)</label>
				<input type="file" accept="image/*" {...register("image")} />
				{errors.image && (
					<small className="text-red-500">{errors.image.message as string}</small>
				)}
			</div> */}

			{/* Price */}
			<div className="flex flex-col gap-1">
				<label>Price (optional)</label>
				<input type="number" className="border p-2 rounded" {...register("price")} />
				{errors.price && <small className="text-red-500">{errors.price.message}</small>}
			</div>

			{/* Submit */}
			<Button type="submit" disabled={loading} className="w-auto flex">
				{loading ? "Submitting..." : "Submit Book"}
			</Button>
		</form>
	)
}
