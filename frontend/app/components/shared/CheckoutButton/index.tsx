"use client"

import { checkoutBook } from "@/app/services/book-reviews.service"
import { Button, buttonVariants } from "../../ui/button"
import { cva, type VariantProps } from "class-variance-authority"

type Props = {
	checkoutItem: {
		name: string
		amount: number
	}
}

export default function CheckoutButton({
	checkoutItem,
	...props
}: Props &
	React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const handleBookCheckout = async () => {
		try {
			const res = await checkoutBook(checkoutItem)

			if (res?.url) {
				window.location.href = res.url
			}
		} catch (error) {
			console.error("Checkout failed:", error)
		}
	}

	return (
		<Button onClick={handleBookCheckout} {...props}>
			Buy Book
		</Button>
	)
}
