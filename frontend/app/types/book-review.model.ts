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