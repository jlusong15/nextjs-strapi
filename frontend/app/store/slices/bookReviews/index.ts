import { bookReviewsApi } from "@/app/services/book-reviews.service"
import { BookReviewModel } from "@/app/types/book-review.model"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../.."

const bookReviewsSlice = createSlice({
	name: "bookReviews",
	initialState: {
		list: [] as BookReviewModel[]
	},
	reducers: {
		setBookReviewList: (state, action: PayloadAction<BookReviewModel[]>) => {
			state.list = action?.payload || []
		},
	},
	extraReducers: (builder) => {
		return builder.addMatcher(bookReviewsApi.endpoints.getBookReviews.matchFulfilled, (state, { payload }) => {
			state.list = payload || []
		})
	}
})

export const { setBookReviewList } = bookReviewsSlice.actions
export const booksSelector = (state: RootState) => state.bookReviews

export default bookReviewsSlice.reducer
