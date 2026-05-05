import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
	const body = await req.json();

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		line_items: [
			{
				price_data: {
					currency: "php",
					product_data: {
						name: body.name,
					},
					unit_amount: body.amount * 100,
				},
				quantity: 1,
			},
		],
		success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
	});

	return NextResponse.json({ url: session.url });
}