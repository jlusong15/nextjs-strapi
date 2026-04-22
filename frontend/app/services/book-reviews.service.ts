import api from "../lib/api";
import { fetcher } from "../lib/next-fetcher";
import { mapDocs } from "../lib/utils";
import { TagTypeId } from "../store/tagType";
import { BookReviewModel, AllBookReviewResponseModel, SingleBookReviewResponseModel } from "../types/book-review.model";

/**
 * RTK
 */
export const bookReviewsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBookReviews: builder.query<BookReviewModel[], void>({
			query: () => '/book-reviews',
			transformResponse: (res: AllBookReviewResponseModel) => mapDocs<BookReviewModel[]>(res) as BookReviewModel[],
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
	const res = await fetcher<AllBookReviewResponseModel>('/book-reviews');
	return mapDocs<BookReviewModel[]>(res) ?? [];
}

export async function fetchSingleBookReview(id: string): Promise<BookReviewModel> {
	const res = await fetcher<SingleBookReviewResponseModel>(`/book-reviews/${id}`);
	console.log("fetchdata", res?.data)
	return res?.data ?? undefined;
}