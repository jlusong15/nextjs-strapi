import SubPageLayout from "../components/layout/Subpages"
import StarRating from "../components/shared/Rating"
import { fetchBookReviews } from "../services/book-reviews.service"

export default async function BookReview() {
	const bookReviews = await fetchBookReviews()

	return (
		<div className="max-w-4xl w-full">
			<SubPageLayout title="Book Reviews">
				<p>Reviews are fetched from Strapi.</p>
				{bookReviews?.map((review, i) => (
					<div key={i} className="flex flex-col py-5 border-b border-gray-200 my-2.5 gap-3">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
							<h3 className="font-semibold">{review.title}</h3> <StarRating value={review.rating} readonly />
						</div>
						<div>
							<p>{review.body ?? ""}</p>
						</div>
					</div>
				))}
			</SubPageLayout>
		</div>
	)
}
