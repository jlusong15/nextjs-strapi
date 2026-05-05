import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
	const body = await req.text();
	const headersList = await headers();
	const sig = headersList.get("stripe-signature")!;

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err) {
		return new Response("Webhook error", { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object;

		await fetch(`${process.env.STRAPI_URL}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			body: JSON.stringify({
				data: {
					stripeId: session.id,
					amount: session.amount_total,
					status: "paid",
				},
			}),
		});
	}

	return new Response("ok", { status: 200 });
}