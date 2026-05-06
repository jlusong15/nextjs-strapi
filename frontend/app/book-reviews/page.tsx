import Link from "next/link"
import SubPageLayout from "../components/layout/Subpages"
import CheckoutButton from "../components/shared/CheckoutButton"
import LinkButton from "../components/shared/LinkButton"
import StarRating from "../components/shared/Rating"
import StrapiImage from "../components/shared/StrapiImage"
import StrapiRichTextBlocks from "../components/shared/StrapiRichTextBlock"
import { fetchBookReviews } from "../services/book-reviews.service"

export default async function BookReview() {
	const bookReviews = await fetchBookReviews()

	return (
		<div className="max-w-4xl w-full">
			<SubPageLayout title="Book Reviews">
				<div className="border-b border-b-gray-100 pb-2 mb-5">
					<small className="text-gray-500!">Details are retrieved from Strapi through a Next.js API proxy.</small>
				</div>
				{/* <div>
					<LinkButton
						href="/book-reviews/submit-review"
						className="inline-flex items-center uppercase px-3 py-1.5 no-underline! rounded bg-primary transition text-white hover:bg-gray-600"
					>
						Submit book review
					</LinkButton>
				</div> */}
				{bookReviews?.map((review, i) => (
					<div key={i} className="flex flex-col py-5 border-b border-gray-200 my-2.5 gap-3">
						<div className="flex flex-col justify-between sm:flex-row sm:justify-between sm:items-center gap-2">
							<h3 className="flex justify-center sm:justify-start text-lg sm:text-2xl">{review.title}</h3>{" "}
							<span className="flex justify-center sm:justify-end">
								<StarRating value={review.rating} readonly />
							</span>
						</div>
						<div className="flex flex-row gap-2 items-start">
							<div className="mr-2 mb-2">
								<StrapiImage image={review.image} size="thumbnail" className="max-w-23" />
							</div>
							<div className="line-clamp-5">
								<StrapiRichTextBlocks content={review.content} isPlain={true} />
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
			</SubPageLayout>
		</div>
	)
}
