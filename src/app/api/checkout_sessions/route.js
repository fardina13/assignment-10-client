
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "../../../lib/stripe";

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

    // Get recipe ID
    const { recipeId } = await request.json();

    if (!recipeId) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    // Fetch recipe from backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${recipeId}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    const recipe = await response.json();

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: recipe.recipeName,
            },
            unit_amount: recipe.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        recipeId: recipe._id,
        userId: session.user.id,
      },
      success_url: `${headersList.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get("origin")}/recipe/${recipeId}`,
    });

    return NextResponse.json({
      url: checkoutSession.url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Checkout session creation failed" },
      { status: 500 }
    );
  }
}
