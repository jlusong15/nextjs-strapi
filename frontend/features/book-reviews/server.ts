import { BookReviewModel } from "@/types/book-review.model"
import { QueryClient } from "@tanstack/react-query"
import { getBookReview, getBookReviews } from "./api"
import { bookReviewsKeys } from "./keys"

export async function prefetchAllBookReviews(queryClient: QueryClient) {
	await queryClient.prefetchQuery({
		queryKey: bookReviewsKeys.all,
		queryFn: getBookReviews,
	})

	return queryClient.getQueryData<BookReviewModel[]>(
		bookReviewsKeys.all
	)
}

export async function prefetchSingleBookReview(
	queryClient: QueryClient,
	documentId: string
) {
	await queryClient.prefetchQuery({
		queryKey: bookReviewsKeys.detail(documentId),
		queryFn: () => getBookReview(documentId),
	})

	return queryClient.getQueryData<BookReviewModel>(
		bookReviewsKeys.detail(documentId)
	)
}