import SubPageLayout from "@/app/components/layout/Subpages"
import BookSubmitForm from "./BookSubmitForm"

export default function SubmitBookReview() {
	return (
		<div className="w-full">
			<SubPageLayout title="Submit a Book Review">
				<div className="border-b border-b-gray-100 pb-2 mb-5">
					<small className="text-gray-500!">Details will be saved to Strapi through a Next.js API proxy.</small>
				</div>
				<div><BookSubmitForm /></div>
			</SubPageLayout>
		</div>
	)
}
