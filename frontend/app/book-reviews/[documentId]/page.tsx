import SubPageLayout from "@/app/components/layout/Subpages"
import StrapiImage from "@/app/components/shared/StrapiImage"
import StarRating from "@/app/components/shared/Rating"
import { fetchSingleBookReview } from "@/app/services/book-reviews.service"
import Link from "next/link"
import StrapiRichTextBlocks from "@/app/components/shared/StrapiRichTextBlock"

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
				<div className="border-b border-b-gray-100 pb-2 mb-5">
					<small className="text-gray-500!">Details are retrieved from Strapi through a Next.js API proxy.</small>
				</div>
				{
					<div className="py-5 my-2.5 flex flex-col gap-5">
						<div className="m-auto">
							<StarRating value={review.rating} size={40} readonly />
						</div>
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
							<div className="m-2 mt-4">
								<StrapiImage image={review.image} size="original" className="max-w-50 m-auto" />
							</div>
							<div>
								<StrapiRichTextBlocks content={review.content} />
							</div>
						</div>
						<div className="pt-2 text-center sm:text-right">
							<Link
								href="/book-reviews"
								className="inline-flex items-center text-sm p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
							>
								← Back to all reviews
							</Link>
						</div>

						<div className="w-[300px] text-ellipsis d-block">{JSON.stringify(review.image)}</div>
					</div>
				}
			</SubPageLayout>
		</div>
	)
}
