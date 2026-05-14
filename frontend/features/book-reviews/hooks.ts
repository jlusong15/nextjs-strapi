"use client"

import { useQuery } from "@tanstack/react-query"
import { bookReviewsKeys } from "./keys"
import { getBookReviews } from "./api"

export function useBookReviews() {
  return useQuery({
    queryKey: bookReviewsKeys.all,
    queryFn: getBookReviews,
  })
}