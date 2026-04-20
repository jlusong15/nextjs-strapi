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
