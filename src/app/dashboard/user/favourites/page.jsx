"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const FavouritesPage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        if (isPending) return;

        if (!session?.user) {
            router.push("/auth");
            return;
        }

        const fetchFavorites = async () => {
            try {
                const res = await fetch(
                    `${baseUrl}/users/${session.user.id}/favorites`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch favorite recipes");
                }

                const data = await res.json();
                setRecipes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [session, isPending, baseUrl, router]);

    const handleRemoveFavorite = async (recipeId) => {
        try {
            const res = await fetch(
                `${baseUrl}/recipes/${recipeId}/favorite`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: session.user.id,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to remove favorite");
            }

            setRecipes((prev) =>
                prev.filter((recipe) => recipe._id !== recipeId)
            );
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-lg text-[#3D2439] font-medium">
                    Loading your favorites...
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#3D2439]">
                    My Favorites
                </h1>
                <p className="text-gray-600 mt-2 text-base md:text-lg">
                    All your favorite recipes in one place.
                </p>
            </div>

            {recipes.length === 0 ? (
                <div className="bg-white border border-[#EAE4EB] rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-semibold text-[#3D2439] mb-3">
                        No favorite recipes yet!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Explore recipes and add your favorites here.
                    </p>
                    <Link
                        href="/browse-recipes"
                        className="inline-block bg-[#3D2439] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#55334F] transition"
                    >
                        Browse Recipes
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => {
                        const recipeImage = Array.isArray(recipe.image)
                            ? recipe.image[0]
                            : recipe.image;

                        return (
                            <div
                                key={recipe._id}
                                className="bg-white rounded-2xl overflow-hidden border border-[#EAE4EB] shadow-sm"
                            >
                                <img
                                    src={recipeImage || "/placeholder.png"}
                                    alt={recipe.recipeName}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-5">
                                    <p className="text-sm text-[#A47798] font-semibold mb-2">
                                        {recipe.category}
                                    </p>

                                    <h2 className="text-xl font-bold text-[#3D2439] mb-4">
                                        {recipe.recipeName}
                                    </h2>

                                    <div className="flex gap-3">
                                        <Link
                                            href={`/recipe/${recipe._id}`}
                                            className="flex-1 text-center bg-[#3D2439] text-white py-2.5 rounded-lg font-semibold hover:bg-[#55334F] transition"
                                        >
                                            View Recipe
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleRemoveFavorite(recipe._id)
                                            }
                                            className="px-4 py-2.5 rounded-lg border border-[#3D2439] text-[#3D2439] font-semibold hover:bg-[#F8F1F5] transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FavouritesPage;
