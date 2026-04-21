import { strapiFetch } from "@/app/lib/strapi-fetcher"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const data = await strapiFetch(
			`/book-reviews?populate=*`
		)

		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ message: "Server error", error: String(error) },
			{ status: 500 }
		)
	}
}