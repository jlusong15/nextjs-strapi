import BookReviewDetailClient from "@/features/book-reviews/BookReviewDetailClient"
import { prefetchSingleBookReview } from "@/features/book-reviews/server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type ViewBookReviewProps = {
	params: Promise<{
		documentId: string
	}>
	searchParams: Promise<{
		[key: string]: string | string[] | undefined
	}>
}

export default async function ViewBookReview({ params }: ViewBookReviewProps) {
	const p = await params
	const documentId = p?.documentId
	const queryClient = new QueryClient()

	await prefetchSingleBookReview(queryClient, documentId)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BookReviewDetailClient documentId={documentId} />
		</HydrationBoundary>
	)
}
