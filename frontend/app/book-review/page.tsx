import SubPageLayout from "../components/layout/Subpages"
import { fetchBookReviews } from "../services/book-reviews.service"

export default async function BookReview() {
	const data = await fetchBookReviews()

	return (
		<>
			<SubPageLayout title="Book Reviews">
				{data?.map((x, i) => (
					<div key={i}>{x?.title}</div>
				))}
			</SubPageLayout>
		</>
	)
}
