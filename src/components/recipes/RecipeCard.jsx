
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
    const recipeImage = Array.isArray(recipe.image)
        ? recipe.image[0]
        : recipe.image;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE4EB] shadow-sm hover:shadow-lg transition-shadow duration-300">

            {/* Recipe Image */}
            <div className="relative h-56 w-full bg-[#F8F1F5]">
                {recipeImage && (
                    <Image
                        src={recipeImage}
                        alt={recipe.recipeName}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                )}

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-white text-[#3D2439] text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                    {recipe.category}
                </span>
            </div>

            {/* Recipe Information */}
            <div className="p-5">

                {/* Author Information */}
                <div className="flex items-center gap-3 mb-4">
                    {recipe.author?.image ? (
                        <Image
                            src={recipe.author.image}
                            alt={recipe.author.name || "Author"}
                            width={38}
                            height={38}
                            unoptimized
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-[#F8F1F5] flex items-center justify-center text-[#3D2439] text-base font-bold">
                            {recipe.author?.name?.charAt(0) || "U"}
                        </div>
                    )}

                    <div>
                        <p className="text-base font-semibold text-[#3D2439]">
                            {recipe.author?.name || "Unknown Author"}
                        </p>
                        <p className="text-sm text-gray-400">
                            Recipe Author
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-[#3D2439] mb-3 line-clamp-1">
                    {recipe.recipeName}
                </h3>

                <div className="flex items-center justify-between text-base text-gray-500 mb-5">
                    <span>
                        ⏱ {recipe.preparationTime} min
                    </span>

                    <span>
                        {recipe.difficulty}
                    </span>

                    <span>
                        ❤️ {recipe.likesCount || 0}
                    </span>
                </div>

                {/* Details Button */}
                <Link
                    href={`/recipe/${recipe._id}`}
                    className="block text-center bg-[#3D2439] text-white text-base py-3 rounded-xl font-semibold hover:bg-[#55334F] transition-colors duration-300"
                >
                    View Recipe
                </Link>

            </div>
        </div>
    );
};

export default RecipeCard;
