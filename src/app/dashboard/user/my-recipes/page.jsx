"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChefHat,
  Plus,
  Clock,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  BookOpen,
} from "lucide-react";
import { toast } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const MyRecipes = () => {
  const { data: session, isPending } = useSession();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch logged-in user's recipes
  
  // Fetch logged-in user's recipes
  useEffect(() => {
    if (isPending || !session?.user?.id) return;

    let ignore = false;

    const fetchMyRecipes = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/users/${session.user.id}/recipes`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recipes.");
        }

        const data = await res.json();

        if (!ignore) {
          setRecipes(data || []);
        }

      } catch (error) {
        console.error(error);

        if (!ignore) {
          toast.error("Unable to load your recipes.");
        }

      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchMyRecipes();

    return () => {
      ignore = true;
    };

  }, [session?.user?.id, isPending, baseUrl]);


  // Delete Recipe
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await fetch(`${baseUrl}/recipes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete recipe.");
      }

      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== id)
      );

      toast.success("Recipe deleted successfully!");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");

    } finally {
      setDeletingId(null);
    }
  };

  // Loading State
  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#A61D87]" size={35} />
        <p className="text-sm text-[#958995]">
          Loading your recipes...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-7">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE4EB] pb-6">

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-[#F8EDF6] flex items-center justify-center">
              <ChefHat size={23} className="text-[#A61D87]" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#3D2439]">
              My Recipes
            </h1>
          </div>

          <p className="text-sm text-[#958995]">
            Manage and organize your delicious creations.
          </p>
        </div>

        <Link
          href="/dashboard/user/add-recipe"
          className="inline-flex items-center justify-center gap-2 bg-[#A61D87] hover:bg-[#86156D] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={18} />
          Add Recipe
        </Link>
      </div>

      {/* Recipe Count */}
      <div className="bg-white border border-[#EAE4EB] rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#F8EDF6] flex items-center justify-center">
          <BookOpen size={23} className="text-[#A61D87]" />
        </div>

        <div>
          <p className="text-2xl font-bold text-[#3D2439]">
            {recipes.length}
          </p>
          <p className="text-xs text-[#958995]">
            Published Recipes
          </p>
        </div>
      </div>

      {/* Empty State */}
      {recipes.length === 0 ? (
        <div className="bg-white border border-[#EAE4EB] rounded-xl py-16 px-5 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-[#F8EDF6] flex items-center justify-center mb-5">
            <ChefHat size={30} className="text-[#A61D87]" />
          </div>

          <h2 className="text-xl font-bold text-[#3D2439]">
            No Recipes Yet!
          </h2>

          <p className="text-sm text-[#958995] mt-2 max-w-sm mx-auto">
            You haven't shared any recipes yet. Start sharing your
            favorite dishes with the community.
          </p>

          <Link
            href="/dashboard/user/add-recipe"
            className="inline-flex items-center gap-2 mt-6 bg-[#A61D87] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#86156D] transition-colors"
          >
            <Plus size={17} />
            Create Your First Recipe
          </Link>
        </div>
      ) : (

        /* Recipes Table */
        <div className="bg-white border border-[#EAE4EB] rounded-xl overflow-hidden">

          <div className="px-6 py-5 border-b border-[#EAE4EB]">
            <h2 className="text-lg font-bold text-[#3D2439]">
              All Recipes
            </h2>
            <p className="text-sm text-[#958995] mt-1">
              View, edit or delete your published recipes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">

              <thead className="bg-[#FCF8FC] text-sm text-[#746477]">
                <tr>
                  <th className="px-6 py-5 font-semibold">Recipe</th>
                  <th className="px-6 py-5 font-semibold">Category</th>
                  <th className="px-6 py-5 font-semibold">Cuisine</th>
                  <th className="px-6 py-5 font-semibold">Difficulty</th>
                  <th className="px-6 py-5 font-semibold">Preparation</th>
                  <th className="px-6 py-5 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EAE4EB]">

                {recipes.map((recipe) => (
                  <tr
                    key={recipe._id}
                    className="hover:bg-[#FCF8FC] transition-colors"
                  >

                    {/* Recipe */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">

                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[#F8EDF6]">
                          {recipe.image && (
                            <Image
                              src={recipe.image}
                              alt={recipe.recipeName}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div>
                          <p className="text-base font-semibold text-[#3D2439]">
                            {recipe.recipeName}
                          </p>
                          <p className="text-sm text-[#958995] mt-1">
                            {recipe.cuisineType}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-[#F8EDF6] text-[#A61D87] text-sm font-medium">
                        {recipe.category}
                      </span>
                    </td>

                    {/* Cuisine */}
                    <td className="px-6 py-5 text-base text-[#746477]">
                      {recipe.cuisineType}
                    </td>

                    {/* Difficulty */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${
                          recipe.difficulty === "Easy"
                            ? "bg-green-50 text-green-700"
                            : recipe.difficulty === "Medium"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                    </td>

                    {/* Preparation Time */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-base text-[#746477]">
                        <Clock size={17} />
                        {recipe.preparationTime} min
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        <Link
                          href={`/recipes/${recipe._id}`}
                          title="View Recipe"
                          className="p-2.5 rounded-lg border border-[#EAE4EB] text-[#746477] hover:text-[#A61D87] hover:border-[#A61D87] transition-colors"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/dashboard/user/myrecipes/edit/${recipe._id}`}
                          title="Edit Recipe"
                          className="p-2.5 rounded-lg border border-[#E9C8E1] text-[#A61D87] hover:bg-[#F8EDF6] transition-colors"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          onClick={() => handleDelete(recipe._id)}
                          disabled={deletingId === recipe._id}
                          title="Delete Recipe"
                          className="p-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {deletingId === recipe._id ? (
                            <Loader2 size={17} className="animate-spin" />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
