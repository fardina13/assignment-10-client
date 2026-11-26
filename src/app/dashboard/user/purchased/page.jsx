"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Eye, Loader2 } from "lucide-react";

const PurchasedRecipesPage = () => {
  const { data: session } = useSession();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedRecipes = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${session.user.id}/purchased`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch purchased recipes");
        }

        const data = await response.json();
        setRecipes(data);

      } catch (error) {
        console.error(error);
        setError("Could not load purchased recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedRecipes();
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#A61D87]" size={32} />
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3D2439]">
          My Purchased Recipes
        </h1>
        <p className="text-[#8B7D89] mt-2">
          Explore all the recipes you have purchased.
        </p>
      </div>

      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : recipes.length === 0 ? (
        <div className="bg-white border border-[#E9E2EA] rounded-2xl p-10 text-center">
          <ShoppingBag size={42} className="mx-auto text-[#A61D87] mb-4" />

          <h2 className="text-xl font-semibold text-[#3D2439]">
            No Purchased Recipes Yet
          </h2>

          <p className="text-[#8B7D89] mt-2 mb-6">
            Your purchased recipes will appear here.
          </p>

          <Link
            href="/browse-recipes"
            className="inline-block bg-[#3D2439] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#55334F] transition"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-[#8B7D89] mb-5">
            {recipes.length} purchased {recipes.length === 1 ? "recipe" : "recipes"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white border border-[#E9E2EA] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-48">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      alt={recipe.recipeName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F2EAF3] flex items-center justify-center">
                      <ShoppingBag size={35} className="text-[#A61D87]" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="text-xs font-semibold text-[#A61D87]">
                    {recipe.category}
                  </span>

                  <h2 className="text-lg font-bold text-[#3D2439] mt-2 mb-4 line-clamp-1">
                    {recipe.recipeName}
                  </h2>

                  <Link
                    href={`/recipe/${recipe._id}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#3D2439] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#55334F] transition"
                  >
                    <Eye size={17} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PurchasedRecipesPage;
