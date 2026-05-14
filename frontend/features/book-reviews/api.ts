import { fetchBookReviews, fetchSingleBookReview } from "@/services/book-reviews.service"
import { BookReviewModel } from "@/types/book-review.model"

export async function getBookReviews(): Promise<BookReviewModel[]> {
	return fetchBookReviews()
}

export async function getBookReview(documentId: string) {
	return fetchSingleBookReview(documentId)
}