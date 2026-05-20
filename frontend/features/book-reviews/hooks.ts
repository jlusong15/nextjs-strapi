"use client"

import { useQuery } from "@tanstack/react-query"
import { bookReviewsKeys } from "./keys"
import { getBookReview, getBookReviews } from "./api"

export function useBookReviews() {
  return useQuery({
    queryKey: bookReviewsKeys.all,
    queryFn: getBookReviews,
  })
}

export function useBookReviewDetail(documentId: string) {
  return useQuery({
    queryKey: bookReviewsKeys.detail(documentId),
    queryFn: () => getBookReview(documentId),
  })
}