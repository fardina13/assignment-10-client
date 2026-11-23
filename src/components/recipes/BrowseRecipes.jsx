"use client";

import { useEffect, useState } from "react";
import { getRecipes } from "@/lib/actions/recipes";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import Pagination from "./Pagination";

const BrowseRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 9;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getRecipes({
                    category,
                    page: currentPage,
                    limit,
                });

                setRecipes(result.recipes || []);
                setTotalPages(result.totalPages || 1);
            } catch (err) {
                console.error("Failed to fetch recipes:", err);
                setError("Failed to load recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [category, currentPage]);

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setCurrentPage(1);
    };

    return (
        <section className="min-h-screen bg-[#FFFDFC] py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Page Heading */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-widest uppercase text-[#B46A78] mb-3">
                        Discover Delicious Food
                    </p>

                    <h1 className="text-3xl md:text-5xl font-bold text-[#3D2439] mb-4">
                        Recipe Gallery
                    </h1>

                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Explore delicious recipes and discover your next
                        favorite dish.
                    </p>
                </div>

                {/* Category Filter */}
                <RecipeFilter
                    category={category}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Recipe Count */}
                <div className="flex items-center justify-between mt-10 mb-6">
                    <h2 className="text-xl font-bold text-[#3D2439]">
                        {category === "All" ? "All Recipes" : `${category} Recipes`}
                    </h2>

                    <p className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">Loading recipes...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="text-center py-20">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {/* Recipe Cards */}
                {!loading && !error && recipes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && recipes.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-semibold text-[#3D2439] mb-2">
                            No Recipes Found
                        </h3>

                        <p className="text-gray-500">
                            No recipes available in this category.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

            </div>
        </section>
    );
};

export default BrowseRecipes;
