import api from "../lib/api";
import { fetcher } from "../lib/fetcher";
import { mapDocs } from "../lib/utils";
import { TagTypeId } from "../store/tagType";
import { BookReviewModel, BookReviewResponseModel } from "../types/book-review.model";

/**
 * RTK
 */
export const bookReviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBookReviews: builder.query<BookReviewModel[], void>({
			query: () => '/book-reviews',
			transformResponse: (res: BookReviewResponseModel) => mapDocs<BookReviewModel[]>(res) as BookReviewModel[],
			providesTags: [TagTypeId.Book],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetBookReviewsQuery,
} = bookReviewsApi;


/**
 * Fetch
 */
export async function fetchBookReviews(): Promise<BookReviewModel[]> {
	const res = await fetcher<BookReviewResponseModel>('/book-reviews');

	return mapDocs<BookReviewModel[]>(res) ?? [];
}

export async function fetchBookReview(id: string) {
	return fetcher(`/book-reviews/${id}`);
}