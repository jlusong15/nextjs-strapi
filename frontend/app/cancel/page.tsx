import Link from "next/link"

export default function CancelPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
			<h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>

			<p className="mt-3 text-gray-600">Your payment was not completed. You can try again anytime.</p>

			<Link
				href="/book-reviews"
				className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-gray-200! hover:text-primary! transition"
			>
				Go back to reviews
			</Link>
		</div>
	)
}
