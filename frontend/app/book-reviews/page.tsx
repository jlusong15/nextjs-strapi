import Link from "next/link"
import SubPageLayout from "../components/layout/Subpages"
import StarRating from "../components/shared/Rating"
import { fetchBookReviews } from "../services/book-reviews.service"

export default async function BookReview() {
	const bookReviews = await fetchBookReviews()

	return (
		<div className="max-w-4xl w-full">
			<SubPageLayout title="Book Reviews">
				<small className="text-gray-500!">Details are retrieved from Strapi through a Next.js API proxy.</small>
				{bookReviews?.map((review, i) => (
					<div key={i} className="flex flex-col py-5 border-b border-gray-200 my-2.5 gap-3">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
							<h3>{review.title}</h3> <StarRating value={review.rating} readonly />
						</div>
						<div className="line-clamp-4">{review.body ?? ""}</div>
						<div className="text-right">
							<Link
								href={"/book-reviews/" + review?.documentId}
								className="inline-flex items-center text-xs p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
							>
								Read full review
							</Link>
						</div>
					</div>
				))}
			</SubPageLayout>
		</div>
	)
}
