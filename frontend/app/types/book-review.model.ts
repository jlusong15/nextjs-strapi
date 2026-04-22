import { StrapiImageData } from "./strapi-image.model"

export interface AllBookReviewResponseModel {
	data: BookReviewModel[] | undefined
	meta?: Meta
}

export interface SingleBookReviewResponseModel {
	data: BookReviewModel
	meta?: Meta
}

export interface BookReviewModel {
	id: number
	documentId: string
	title: string
	rating: number
	body: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	image: StrapiImageData
	author: string
	content: StrapiRichTextBlock[]
}

export type StrapiRichTextBlock = {
	type: string
	level?: number
	children?: { text: string; bold?: boolean; italic?: boolean }[]
}

export interface Meta {
	pagination: Pagination
}

export interface Pagination {
	page: number
	pageSize: number
	pageCount: number
	total: number
}