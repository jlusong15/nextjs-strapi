"use client"

import { useState } from "react"

export default function BookSubmitForm() {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [price, setPrice] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const formData = new FormData()
			formData.append("title", title)
			formData.append("content", content)

			if (price) formData.append("price", price)
			if (image) formData.append("image", image)

			// TODO: replace with your API route
			await fetch("/api/books", {
				method: "POST",
				body: formData,
			})

			alert("Book submitted successfully!")

			setTitle("")
			setContent("")
			setPrice("")
			setImage(null)
		} catch (err) {
			console.error(err)
			alert("Something went wrong")
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			{/* Title */}
			<div className="flex flex-col gap-1">
				<label className="font-medium">Book Title *</label>
				<input
					type="text"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border p-2 rounded"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-1">
				<label className="font-medium">Book Content *</label>
				<textarea
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="border p-2 rounded min-h-[150px]"
				/>
			</div>

			{/* Image */}
			{/* <div className="flex flex-col gap-1">
				<label className="font-medium">Book Image (optional)</label>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setImage(e.target.files?.[0] || null)}
					className="border p-2 rounded"
				/>
			</div> */}

			{/* Price */}
			<div className="flex flex-col gap-1">
				<label className="font-medium">Price (optional)</label>
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="border p-2 rounded"
				/>
			</div>

			{/* Submit */}
			<button
				type="submit"
				disabled={loading}
				className="bg-black text-white py-2 rounded disabled:opacity-50"
			>
				{loading ? "Submitting..." : "Submit Book"}
			</button>
		</form>
	)
}