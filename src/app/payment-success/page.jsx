"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading");
  const currentStatus = sessionId ? status : "error";

  useEffect(() => {
    if (!sessionId) 
      return;

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Payment verification failed");
        }

        setStatus("success");

      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#FCFAFC] flex items-center justify-center px-5">
      <div className="bg-white border border-[#EAE4EB] rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">

        {status === "loading" && (
          <>
            <div className="text-4xl mb-6 animate-spin">⏳</div>
            <h1 className="text-2xl font-bold text-[#3D2439] mb-4">
              Verifying Payment...
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your purchase.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="text-3xl font-bold text-[#3D2439] mb-4">
              Payment Successful!
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              Thank you for your purchase. Your recipe has been added to your purchased list.
            </p>

            <Link
              href="/dashboard/user/purchased"
              className="inline-block bg-[#3D2439] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#55334F] transition"
            >
              View Purchased Recipes
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-4xl mb-6">⚠️</div>

            <h1 className="text-2xl font-bold text-[#3D2439] mb-4">
              Payment Verification Failed
            </h1>

            <p className="text-gray-600 mb-8">
              We could not verify your payment. Please try again or contact support.
            </p>

            <Link
              href="/browse-recipes"
              className="inline-block bg-[#3D2439] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#55334F] transition"
            >
              Browse Recipes
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default PaymentSuccessPage;
