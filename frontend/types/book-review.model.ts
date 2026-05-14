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
	rating: number | null
	body: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	image: StrapiImageData | null
	author: string
	price: number | undefined | null
	content: StrapiRichTextBlock[] | null
}

export type CreateBookReviewModel = Omit<
  BookReviewModel,
  "id" | "documentId" | "body" | "createdAt" | "updatedAt" | "publishedAt"
>

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