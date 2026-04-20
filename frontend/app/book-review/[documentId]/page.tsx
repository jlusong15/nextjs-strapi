import SubPageLayout from "@/app/components/layout/Subpages"
import StarRating from "@/app/components/shared/Rating"
import { fetchSingleBookReview } from "@/app/services/book-reviews.service"

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
	console.log({ documentId: p?.documentId, params })
	const review = await fetchSingleBookReview(documentId)

	return (
		<div className="max-w-4xl w-full">
			<SubPageLayout title={review.title}>
				<p>Details are retrieved from Strapi through a Next.js API proxy.</p>
				{
					<div className="flex flex-col py-5 my-2.5 gap-3">
						<div>
							<StarRating value={review.rating} readonly />
						</div>
						<div>
							<p>{review.body ?? ""}</p>
						</div>
					</div>
				}
			</SubPageLayout>
		</div>
	)
}
