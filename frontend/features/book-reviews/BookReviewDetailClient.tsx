"use client"

import SubPageLayout from "@/components/layout/Subpages"
import CheckoutButton from "@/components/shared/CheckoutButton"
import StarRating from "@/components/shared/Rating"
import StrapiImage from "@/components/shared/StrapiImage"
import StrapiRichTextBlocks from "@/components/shared/StrapiRichTextBlock"
import Link from "next/link"
import { useBookReviewDetail } from "./hooks"

export default function BookReviewDetailClient({ documentId }: { documentId: string }) {
	const { data: review, isLoading, error } = useBookReviewDetail(documentId)

	return (
		<SubPageLayout title={review?.title || "Book Review Detail"}>
			<div className="border-b border-b-gray-100 pb-2 mb-5">
				<small className="text-gray-500!">
					Details are retrieved from Strapi through a Next.js API proxy with Stripe integration.
				</small>
			</div>
			<div className="py-5 my-2.5 flex flex-col gap-5">
				<div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-2">
					<div>
						<StarRating value={review?.rating || 0} size={40} readonly />
					</div>
					<div className="flex gap-2">
						<Link
							href="/book-reviews"
							className="inline-flex items-center p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
						>
							← Back to all reviews
						</Link>
						{review?.price && (
							<CheckoutButton
								checkoutItem={{
									name: review?.title || "Book",
									amount: review?.price,
								}}
								className="inline-flex items-center py-5 no-underline! rounded bg-primary transition"
							>
								Buy Book
							</CheckoutButton>
						)}
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
					<StrapiImage
						image={review?.image}
						size="original"
						className="w-full max-w-40 sm:max-w-50 h-auto object-contain mt-4"
					/>

					<div className="flex-1">
						{isLoading && <div>Loading...</div>}
						{error && <div>An error occurred while fetching.</div>}
						{review?.content && <StrapiRichTextBlocks content={review?.content} />}
					</div>
				</div>
			</div>
		</SubPageLayout>
	)
}
