import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    // Check logged-in user
const headersList = await headers();

const session = await auth.api.getSession({
  headers: headersList,
});

if (!session) {
  return NextResponse.json(
    { error: "Please login first" },
    { status: 401 }
  );
}
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Verify Stripe payment
    const checkoutSession =
      await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const { recipeId, userId } = checkoutSession.metadata || {};
    if (userId !== session.user.id) {
  return NextResponse.json(
    { error: "Unauthorized payment verification" },
    { status: 403 }
  );
}

    if (!recipeId || !userId) {
      return NextResponse.json(
        { error: "Purchase information missing" },
        { status: 400 }
      );
    }

    // Save purchase in MongoDB
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/purchases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-purchase-secret": process.env.PURCHASE_SECRET_KEY,
        },
        body: JSON.stringify({
          userId,
          recipeId,
          sessionId: checkoutSession.id,
          amount: checkoutSession.amount_total / 100,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save purchase");
    }

    return NextResponse.json({
      success: true,
      message: "Purchase verified and saved",
    });

  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
