"use client"

import CheckoutButton from "@/components/shared/CheckoutButton"
import LinkButton from "@/components/shared/LinkButton"
import Loading from "@/components/shared/Loading"
import StarRating from "@/components/shared/Rating"
import StrapiImage from "@/components/shared/StrapiImage"
import StrapiRichTextBlocks from "@/components/shared/StrapiRichTextBlock"
import { Button } from "@/components/ui/button"
import { useBookReviews } from "@/features/book-reviews/hooks"
import Link from "next/link"

export default function BookReviewsClient() {
	const { data: bookReviews, isLoading, error, refetch, isRefetching } = useBookReviews()
	const isFetchingData = isLoading || isRefetching
	const isDev = process.env.NODE_ENV === "development"

	return (
		<>
			<div className="w-full justify-end mt-3 flex flex-row gap-2">
				<Button variant="outline" onClick={() => refetch()} disabled={isFetchingData}>
					Refetch
				</Button>

				{isDev && (
					<div>
						<LinkButton href="/book-reviews/submit-review">Submit a book review</LinkButton>
					</div>
				)}
			</div>
			<div className="w-full">
				{isFetchingData && <Loading text="Fetching books..." />}
				{error && <div>An error occurred while fetching.</div>}

				{!isFetchingData &&
					bookReviews?.map((review) => (
						<div key={review.documentId} className="flex flex-col py-5 border-b border-gray-200 my-2.5 gap-3">
							<div className="flex flex-col justify-between sm:flex-row sm:justify-between sm:items-center gap-2">
								<h3 className="flex justify-center sm:justify-start text-lg sm:text-2xl">{review.title}</h3>{" "}
								<span className="flex justify-center sm:justify-end">
									<StarRating value={review.rating || 0} readonly />
								</span>
							</div>
							<div className="flex flex-row gap-2 items-start">
								{review.image && (
									<div className="mr-2 mb-2">
										<StrapiImage image={review.image} size="thumbnail" className="max-w-23" />
									</div>
								)}
								<div className="line-clamp-5">
									<StrapiRichTextBlocks content={review.content || []} isPlain={true} />
								</div>
							</div>

							<div className="sm:text-right flex flex-row gap-1 justify-center sm:justify-end">
								<Link
									href={"/book-reviews/" + review?.documentId}
									className="inline-flex items-center uppercase text-xs py-1 px-2 rounded bg-gray-200 hover:bg-gray-300 transition"
								>
									Read more
								</Link>
								{review?.price && (
									<CheckoutButton
										checkoutItem={{
											name: review?.title || "Book",
											amount: review?.price,
										}}
										className="inline-flex items-center uppercase text-xs py-1 px-2 no-underline! rounded bg-primary transition"
									>
										Buy now
									</CheckoutButton>
								)}
							</div>
						</div>
					))}
			</div>
		</>
	)
}
