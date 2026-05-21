import SubPageLayout from "@/components/layout/Subpages"
import BookReviewsClient from "@/features/book-reviews/BookReviewsClient"
import { prefetchAllBookReviews } from "@/features/book-reviews/server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function BookReview() {
	const queryClient = new QueryClient()

	await prefetchAllBookReviews(queryClient)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SubPageLayout title="Book Reviews">
				<div className="border-b border-b-gray-100 pb-2 mb-5">
					<small className="text-gray-500!">
						Details are retrieved from Strapi through a Next.js API proxy with Stripe integration.
					</small>
				</div>

				<div className="max-w-4xl w-full">
					<BookReviewsClient />
				</div>
			</SubPageLayout>
		</HydrationBoundary>
	)
}
