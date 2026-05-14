import { strapiFetch, strapiPost, strapiUpload } from "@/lib/strapi-fetcher"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const data = await strapiFetch(`/book-reviews?populate=*`)

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ message: "Server error", error: String(error) },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const title = formData.get("title") as string
		const content = formData.get("content") as any
		const author = formData.get("author") as string
		const price = formData.get("price") as string | null
		const rating = formData.get("rating") as string | null
		const image = formData.get("image") as File | null
		let uploadedImageId: number | null = null

		if (image) {
			const uploadRes = await strapiUpload(image)

			uploadedImageId = uploadRes?.[0]?.id ?? null
		}

		const data = await strapiPost("/book-reviews", {
			data: {
				title,
				content,
				author,
				rating: Number(rating),
				price: price ? Number(price) : null,
				image: uploadedImageId,
			},
		})

		return NextResponse.json({
			success: true,
			data,
		})
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Server error", error: String(error?.message || error) },
			{ status: 500 }
		)
	}
}