'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addRecipe = async (newRecipeData) =>{
    const res = await fetch(`${baseUrl}/recipes`, {
        method: 'POST',/* নতুন ডাটা তৈরি */
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