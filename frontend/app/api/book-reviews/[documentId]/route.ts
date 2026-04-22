import { NextRequest, NextResponse } from "next/server"
import { strapiFetch } from "@/app/lib/strapi-fetcher"

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ documentId: string }> }
) {
	const { documentId } = await context.params
	const link = `/book-reviews/${documentId}?populate=*`;
	console.log("link", link)

	try {
		const data = await strapiFetch(link)
		console.log("data", data)
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch" },
			{ status: 500 }
		)
	}
}