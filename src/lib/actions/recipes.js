'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// Add New Recipe
export const addRecipe = async (newRecipeData) => {
    const res = await fetch(`${baseUrl}/recipes`, {
        method: 'POST', /* নতুন ডাটা তৈরি */
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipeData),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to add recipe');
    }

    return result;
};


// Get All Recipes (Search, Filter & Pagination)
export const getRecipes = async ({
    category = '',
    page = 1,
    limit = 9
} = {}) => {

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (category && category !== 'All') {
        params.set('category', category);
    }

    const res = await fetch(
        `${baseUrl}/recipes?${params.toString()}`,
        {
            cache: 'no-store',
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch recipes');
    }

    return result;
};


// Get Single Recipe By ID
export const getRecipeById = async (id) => {

    const res = await fetch(`${baseUrl}/recipes/${id}`, {
        cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch recipe details');
    }

    return result;
};
