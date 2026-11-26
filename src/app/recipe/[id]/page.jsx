"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [liking, setLiking] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState("");

    // Fetch Recipe Details
    useEffect(() => {
        if (!id) return;

        const fetchRecipe = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${baseUrl}/recipes/${id}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Recipe not found");
                }

                const data = await res.json();
                setRecipe(data);

            } catch (error) {
                console.error(error);
                setError("Unable to load recipe details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    // Like Recipe
    const handleLike = async () => {
        if (!session?.user) {
            router.push("/auth");
            return;
        }

        if (liking) return;

        try {
            setLiking(true);

            const res = await fetch(`${baseUrl}/recipes/${id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session.user.id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Unable to like recipe");
            }

            setRecipe((prev) => ({
                ...prev,
                likesCount: data.likesCount,
            }));

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLiking(false);
        }
    };

    // Favorite / Unfavorite Recipe
    const handleFavorite = async () => {
        if (!session?.user) {
            router.push("/auth");
            return;
        }

        if (favoriteLoading) return;

        try {
            setFavoriteLoading(true);

            const res = await fetch(`${baseUrl}/recipes/${id}/favorite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session.user.id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Unable to update favorite");
            }

            setRecipe((prev) => {
                const currentFavorites = prev.favoriteBy || [];

                return {
                    ...prev,
                    favoriteBy: data.isFavorite
                        ? [...currentFavorites, session.user.id]
                        : currentFavorites.filter(
                            (userId) => userId !== session.user.id
                        ),
                };
            });

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setFavoriteLoading(false);
        }
    };

    // Check Favorite Status
    const isFavorite = recipe?.favoriteBy?.includes(session?.user?.id) || false;

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FCFAFC]">
                <p className="text-xl font-medium text-[#3D2439]">
                    Loading recipe details...
                </p>
            </div>
        );
    }

    // Error State
    if (error || !recipe) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAFC] px-5">
                <h2 className="text-3xl font-bold text-[#3D2439] mb-3">
                    Recipe Not Found
                </h2>

                <p className="text-lg text-gray-500 mb-6">
                    {error}
                </p>

                <button
                    onClick={() => router.push("/browse-recipes")}
                    className="bg-[#3D2439] text-white px-6 py-3 rounded-xl text-lg font-semibold"
                >
                    Browse Recipes
                </button>
            </div>
        );
    }

    const recipeImage = Array.isArray(recipe.image)
        ? recipe.image[0]
        : recipe.image;

    const authorName = recipe.author?.name || "Unknown Author";
    const authorImage = recipe.author?.image;

    return (
        <main className="min-h-screen bg-[#FCFAFC] py-10 md:py-16">
            <div className="max-w-6xl mx-auto px-5">

                {/* Recipe Header */}
                <div className="mb-8">
                    <p className="text-base font-semibold text-[#A47798] mb-3">
                        RecipeHub / Recipe Details
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#3D2439] mb-5">
                        {recipe.recipeName}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        <span className="bg-[#F3EAF1] text-[#3D2439] px-4 py-2 rounded-full text-base font-semibold">
                            {recipe.category}
                        </span>

                        <span className="bg-white border border-[#EAE4EB] text-gray-600 px-4 py-2 rounded-full text-base">
                            {recipe.cuisineType}
                        </span>

                        <span className="bg-white border border-[#EAE4EB] text-gray-600 px-4 py-2 rounded-full text-base">
                            {recipe.difficulty}
                        </span>
                    </div>
                </div>

                {/* Recipe Image */}
                <div className="relative w-full h-[280px] md:h-[450px] rounded-3xl overflow-hidden bg-[#F8F1F5] mb-10">
                    {recipeImage && (
                        <Image
                            src={recipeImage}
                            alt={recipe.recipeName}
                            fill
                            unoptimized
                            priority
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Recipe Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Recipe Overview */}
                        <section className="bg-white border border-[#EAE4EB] rounded-2xl p-6 md:p-8">
                            <h2 className="text-3xl font-bold text-[#3D2439] mb-6">
                                Recipe Overview
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                <div className="bg-[#FCFAFC] rounded-xl p-4">
                                    <p className="text-base text-gray-500 mb-2">
                                        Preparation Time
                                    </p>

                                    <p className="text-xl font-bold text-[#3D2439]">
                                        {recipe.preparationTime} min
                                    </p>
                                </div>

                                <div className="bg-[#FCFAFC] rounded-xl p-4">
                                    <p className="text-base text-gray-500 mb-2">
                                        Difficulty
                                    </p>

                                    <p className="text-xl font-bold text-[#3D2439]">
                                        {recipe.difficulty}
                                    </p>
                                </div>

                                <div className="bg-[#FCFAFC] rounded-xl p-4">
                                    <p className="text-base text-gray-500 mb-2">
                                        Total Likes
                                    </p>

                                    <p className="text-xl font-bold text-[#3D2439]">
                                        ❤️ {recipe.likesCount || 0}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Ingredients */}
                        <section className="bg-white border border-[#EAE4EB] rounded-2xl p-6 md:p-8">
                            <h2 className="text-3xl font-bold text-[#3D2439] mb-6">
                                Ingredients
                            </h2>

                            <ul className="space-y-5">
                                {recipe.ingredients?.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-gray-700 text-lg leading-8"
                                    >
                                        <span className="w-7 h-7 shrink-0 rounded-full bg-[#F3EAF1] text-[#3D2439] flex items-center justify-center text-base font-bold mt-1">
                                            {index + 1}
                                        </span>

                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Cooking Instructions */}
                        <section className="bg-white border border-[#EAE4EB] rounded-2xl p-6 md:p-8">
                            <h2 className="text-3xl font-bold text-[#3D2439] mb-6">
                                Cooking Instructions
                            </h2>

                            <div className="space-y-7">
                                {recipe.instructions?.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="w-10 h-10 shrink-0 rounded-full bg-[#3D2439] text-white flex items-center justify-center text-lg font-bold">
                                            {index + 1}
                                        </span>

                                        <p className="text-lg text-gray-700 leading-8 pt-1">
                                            {instruction}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Author Information */}
                        <section className="bg-white border border-[#EAE4EB] rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-[#3D2439] mb-5">
                                Recipe Author
                            </h2>

                            <div className="flex items-center gap-4">
                                {authorImage ? (
                                    <Image
                                        src={authorImage}
                                        alt={authorName}
                                        width={55}
                                        height={55}
                                        unoptimized
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-[#F3EAF1] flex items-center justify-center text-xl font-bold text-[#3D2439]">
                                        {authorName.charAt(0)}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-lg font-bold text-[#3D2439]">
                                        {authorName}
                                    </h3>

                                    <p className="text-base text-gray-500">
                                        Recipe Contributor
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Recipe Actions */}
                        <section className="bg-white border border-[#EAE4EB] rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-[#3D2439] mb-5">
                                Recipe Actions
                            </h2>

                            <div className="space-y-4">

                                {/* Like Button */}
                                <button
                                    onClick={handleLike}
                                    disabled={liking}
                                    className="w-full bg-[#3D2439] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#55334F] transition disabled:opacity-60"
                                >
                                    {liking
                                        ? "Processing..."
                                        : `❤️ Like Recipe (${recipe.likesCount || 0})`}
                                </button>

                                {/* Favorite Button */}
                                <button
                                    onClick={handleFavorite}
                                    disabled={favoriteLoading}
                                    className={`w-full border border-[#3D2439] py-3 rounded-xl text-lg font-semibold transition disabled:opacity-60 ${
                                        isFavorite
                                            ? "bg-[#3D2439] text-white hover:bg-[#55334F]"
                                            : "bg-white text-[#3D2439] hover:bg-[#F3EAF1]"
                                    }`}
                                >
                                    {favoriteLoading
                                        ? "Processing..."
                                        : isFavorite
                                            ? "★ Added to Favorites"
                                            : "☆ Add to Favorites"}
                                </button>
                                 
                                {/* Purchase Button */}
                                
<button
  type="button"
  onClick={async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe._id,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }}
  className="w-full bg-[#A47798] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#8D5E7F] transition"
>
  Purchase Recipe
</button>


                                {/* Report Button */}
                                <button
                                    onClick={() => setShowReportModal(true)}
                                    className="w-full border border-red-200 text-red-600 py-3 rounded-xl text-lg font-semibold hover:bg-red-50 transition"
                                >
                                    ⚑ Report Recipe
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 mt-4 leading-6">
                                Purchase feature will be connected after the payment API is ready.
                            </p>
                        </section>
                    </aside>
                </div>

                {/* Report Modal */}
                {showReportModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-2xl font-bold text-[#3D2439]">
                                    Report Recipe
                                </h2>

                                <button
                                    onClick={() => setShowReportModal(false)}
                                    className="text-gray-500 text-3xl"
                                >
                                    &times;
                                </button>
                            </div>

                            <p className="text-lg text-gray-600 mb-5">
                                Why are you reporting this recipe?
                            </p>

                            <div className="space-y-3">
                                {[
                                    "Spam",
                                    "Offensive Content",
                                    "Copyright Issue",
                                ].map((reason) => (
                                    <label
                                        key={reason}
                                        className="flex items-center gap-3 border border-[#EAE4EB] rounded-xl p-4 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="reportReason"
                                            value={reason}
                                            checked={reportReason === reason}
                                            onChange={(e) =>
                                                setReportReason(e.target.value)
                                            }
                                            className="accent-[#3D2439]"
                                        />

                                        <span className="text-base text-gray-700">
                                            {reason}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <button
                                disabled={!reportReason}
                                onClick={() => {
                                    alert("Report API is not connected yet.");
                                    setShowReportModal(false);
                                    setReportReason("");
                                }}
                                className="w-full bg-[#3D2439] text-white py-3 rounded-xl text-lg font-semibold mt-6 disabled:opacity-50"
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default RecipeDetailsPage;
