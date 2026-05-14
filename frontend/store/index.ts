import api from '@/lib/api';
import { bookReviewsApi } from '@/services/book-reviews.service';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		bookReviews: bookReviewsApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
