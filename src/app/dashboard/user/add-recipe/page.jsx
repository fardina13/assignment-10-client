"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ImagePlus,
  X,
  Plus,
  Trash2,
  ChefHat,
  Clock,
  Utensils,
  Loader2,
} from "lucide-react";
import { addRecipe } from "@/lib/actions/recipes";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const AddRecipe = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    cuisineType: "",
    difficulty: "",
    preparationTime: "",
    ingredients: [""],
    instructions: [""],
  });

  const [recipeImage, setRecipeImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageKey, setImageKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Selection and Preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      setImageKey((prev) => prev + 1);
      return;
    }

    setRecipeImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove Image
  const removeImage = () => {
    setRecipeImage(null);
    setImagePreview("");
    setImageKey((prev) => prev + 1);
  };

  // Dynamic Ingredients
  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      ingredients: updated,
    }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // Dynamic Instructions
  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      instructions: updated,
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  // Submit Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeImage) {
      toast.error("Please upload a recipe image.");
      return;
    }

    if (
      formData.ingredients.some((item) => !item.trim()) ||
      formData.instructions.some((item) => !item.trim())
    ) {
      toast.error("Please complete all ingredients and instructions.");
      return;
    }

    try {
      setIsSubmitting(true);

      // ImgBB Image Upload
      setIsUploading(true);

      const imageData = new FormData();
      imageData.append("image", recipeImage);

      const imageResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await imageResponse.json();

      if (!imageResponse.ok || !imageResult.success) {
        throw new Error("Image upload failed.");
      }

      const imageUrl = imageResult.data.url;

      setIsUploading(false);

      // Prepare Recipe Data
      const recipeData = {
    ...formData,
    image: imageUrl,
    ingredients: formData.ingredients.filter((item) => item.trim()),
    instructions: formData.instructions.filter((item) => item.trim()),
    preparationTime: Number(formData.preparationTime),

    author: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
    },
};

      // Send Recipe Data to Backend
      const result = await addRecipe(recipeData);

      if (result?.insertedId) {
        toast.success("Recipe added successfully!");
        
        console.log("Backend Response:", result);
        console.log("Inserted ID:", result?.insertedId);

        // Reset Form
        setFormData({
          recipeName: "",
          category: "",
          cuisineType: "",
          difficulty: "",
          preparationTime: "",
          ingredients: [""],
          instructions: [""],
        });

        setRecipeImage(null);
        setImagePreview("");
        setImageKey((prev) => prev + 1);

        // Redirect to My Recipes
        // router.push("/dashboard/user/myrecipes");
      } else {
        throw new Error("Failed to add recipe.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const inputStyle =
    "w-full bg-white border border-[#EAE4EB] rounded-lg px-4 py-3 text-sm text-[#3D2439] placeholder:text-[#A99EAA] outline-none focus:border-[#A61D87] transition-colors";

  const labelStyle =
    "block text-sm font-semibold text-[#3D2439] mb-2";

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="border-b border-[#EAE4EB] pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[#F8EDF6] flex items-center justify-center">
            <ChefHat size={22} className="text-[#A61D87]" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#3D2439]">
            Add New Recipe
          </h1>
        </div>

        <p className="text-sm text-[#958995]">
          Share your delicious creation with the RecipeHub community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">

        {/* Basic Information */}
        <section className="bg-white border border-[#EAE4EB] rounded-xl p-5 md:p-7 space-y-5">

          <div>
            <h2 className="text-lg font-bold text-[#3D2439]">
              Basic Information
            </h2>

            <p className="text-xs text-[#958995] mt-1">
              Tell us about your recipe.
            </p>
          </div>

          <div>
            <label className={labelStyle}>Recipe Name *</label>

            <input
              type="text"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleChange}
              placeholder="Enter your recipe name"
              className={inputStyle}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelStyle}>Recipe Image *</label>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#E3D5E3] rounded-xl py-10 px-4 cursor-pointer hover:bg-[#FCF8FC] transition-colors">

                <div className="w-12 h-12 rounded-full bg-[#F8EDF6] flex items-center justify-center">
                  <ImagePlus size={23} className="text-[#A61D87]" />
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold text-[#3D2439]">
                    Click to upload recipe image
                  </p>

                  <p className="text-xs text-[#958995] mt-1">
                    PNG, JPG or JPEG
                  </p>
                </div>

                <input
                  key={imageKey}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-full max-w-sm h-56 rounded-xl overflow-hidden border border-[#EAE4EB]">

                <Image
                  src={imagePreview}
                  alt="Recipe preview"
                  fill
                  unoptimized
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 text-[#A61D87] shadow-md"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Category and Cuisine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className={labelStyle}>Category *</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Breakfast, Dessert"
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Cuisine Type *</label>

              <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                placeholder="e.g. Bangladeshi, Italian"
                className={inputStyle}
                required
              />
            </div>

          </div>

          {/* Difficulty and Preparation Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className={labelStyle}>Difficulty Level *</label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Preparation Time (minutes) *</label>

              <div className="relative">
                <Clock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99EAA]"
                />

                <input
                  type="number"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  min="1"
                  className={`${inputStyle} pl-11`}
                  required
                />
              </div>
            </div>

          </div>

        </section>

        {/* Ingredients */}
        <section className="bg-white border border-[#EAE4EB] rounded-xl p-5 md:p-7 space-y-5">

          <div className="flex items-center gap-3">
            <Utensils size={21} className="text-[#A61D87]" />

            <div>
              <h2 className="text-lg font-bold text-[#3D2439]">
                Ingredients
              </h2>

              <p className="text-xs text-[#958995] mt-1">
                List all the ingredients needed.
              </p>
            </div>
          </div>

          <div className="space-y-3">

            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3">

                <span className="text-sm text-[#958995] w-5">
                  {index + 1}.
                </span>

                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder="Enter ingredient and quantity"
                  className={inputStyle}
                  required
                />

                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-[#A99EAA] hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

              </div>
            ))}

          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center gap-2 text-sm font-semibold text-[#A61D87] hover:text-[#3D2439]"
          >
            <Plus size={17} />
            Add Ingredient
          </button>

        </section>

        {/* Instructions */}
        <section className="bg-white border border-[#EAE4EB] rounded-xl p-5 md:p-7 space-y-5">

          <div>
            <h2 className="text-lg font-bold text-[#3D2439]">
              Cooking Instructions
            </h2>

            <p className="text-xs text-[#958995] mt-1">
              Explain the cooking process step by step.
            </p>
          </div>

          <div className="space-y-4">

            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3">

                <span className="w-7 h-7 shrink-0 rounded-full bg-[#F8EDF6] text-[#A61D87] flex items-center justify-center text-xs font-bold mt-2">
                  {index + 1}
                </span>

                <textarea
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  placeholder={`Describe step ${index + 1}...`}
                  rows={3}
                  className={`${inputStyle} resize-y`}
                  required
                />

                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="text-[#A99EAA] hover:text-red-500 mt-3"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

              </div>
            ))}

          </div>

          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center gap-2 text-sm font-semibold text-[#A61D87] hover:text-[#3D2439]"
          >
            <Plus size={17} />
            Add Step
          </button>

        </section>

        {/* Submit */}
        <div className="flex justify-end pb-5">

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex items-center justify-center gap-2 bg-[#A61D87] hover:bg-[#3D2439] text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors duration-300 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                {isUploading ? "Uploading Image..." : "Submitting..."}
              </>
            ) : (
              <>
                <ChefHat size={18} />
                Publish Recipe
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddRecipe;
