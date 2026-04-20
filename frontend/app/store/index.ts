import { configureStore } from '@reduxjs/toolkit';
import api from '../lib/api';
import { bookReviewsApi } from '../services/book-reviews.service';

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
