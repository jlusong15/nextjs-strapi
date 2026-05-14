export const bookReviewsKeys = {
	all: ["book-reviews"] as const,
	lists: () => [...bookReviewsKeys.all, "list"] as const,
	details: () => [...bookReviewsKeys.all, "detail"] as const,
	detail: (id: string) =>
		[...bookReviewsKeys.details(), id] as const,
}