import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagTypes } from '../store/tagType';

/**
 * Strapi
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'

/**
 * The One API
 */
const API_BASE_URL = 'the-one-api.dev'
const API_PROTOCOL = 'https'
const API_VERSION = 'v2'
const API_BEARER = 'rqYQtd11BTST0j63ZT7h'
const baseUrl = `${API_PROTOCOL}://${API_BASE_URL}/${API_VERSION}`;

export const api = createApi({
	reducerPath: 'api',
	// baseQuery: fetchBaseQuery({
	// 	baseUrl,
	// 	prepareHeaders: (headers, { getState }) => {
	// 		if (API_BEARER) {
	// 			headers.set('authorization', `Bearer ${API_BEARER}`);
	// 		}
	// 		return headers;
	// 	},
	// }),
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	tagTypes: TagTypes,
	endpoints: () => ({}),
});

export default api;
