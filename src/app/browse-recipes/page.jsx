import BrowseRecipes from "@/components/recipes/BrowseRecipes";

export const metadata = {
    title: "Browse Recipes | RecipeHub",
    description: "Explore delicious recipes on RecipeHub.",
};

const BrowseRecipesPage = () => {
    return (
        <main>
            <BrowseRecipes />
        </main>
    );
};

export default BrowseRecipesPage;
