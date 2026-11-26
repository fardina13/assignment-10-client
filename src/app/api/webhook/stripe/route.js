import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature error:", error.message);

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        const db = client.db("assignment10_db");
        const paymentCollection = db.collection("payments");

        const existingPayment = await paymentCollection.findOne({
          stripeSessionId: session.id,
        });

        if (!existingPayment) {
          await paymentCollection.insertOne({
            stripeSessionId: session.id,
            recipeId: session.metadata.recipeId,
            userId: session.metadata.userId,
            amount: session.amount_total / 100,
            currency: session.currency,
            paymentStatus: session.payment_status,
            customerEmail: session.customer_details?.email || "",
            createdAt: new Date(),
          });
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook processing error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
