import SubPageLayout from "@/app/components/layout/Subpages"
import StarRating from "@/app/components/shared/Rating"
import { Button } from "@/app/components/ui/button"
import { fetchSingleBookReview } from "@/app/services/book-reviews.service"
import Link from "next/link"

type ViewBookReviewProps = {
	params: Promise<{
		documentId: string
	}>
	searchParams: Promise<{
		[key: string]: string | string[] | undefined
	}>
}

export default async function ViewBookReview({ params }: ViewBookReviewProps) {
	const p = await params
	const documentId = p?.documentId
	const review = await fetchSingleBookReview(documentId)

	return (
		<div className="w-full">
			<SubPageLayout title={review.title}>
				<small className="text-gray-500!">Details are retrieved from Strapi through a Next.js API proxy.</small>
				{
					<div className="py-5 my-2.5 gap-3">
						<div className="mb-2">
							<StarRating value={review.rating} readonly />
						</div>
						<div>
							<p>{review.body ?? ""}</p>
						</div>
						<div className="pt-2 text-right">
							<Link
								href="/book-reviews"
								className="inline-flex items-center text-sm p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
							>
								← Back to all reviews
							</Link>
						</div>
					</div>
				}
			</SubPageLayout>
		</div>
	)
}
