"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-[#FCFAFC] flex items-center justify-center px-5">
      <div className="bg-white border border-[#EAE4EB] rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-sm">

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-[#3D2439] mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Thank you for your purchase. Your payment has been completed successfully.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-400 break-all mb-8">
            Transaction ID: {sessionId}
          </p>
        )}

        <Link
          href="/browse-recipes"
          className="inline-block bg-[#3D2439] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#55334F] transition"
        >
          Browse Recipes
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;
