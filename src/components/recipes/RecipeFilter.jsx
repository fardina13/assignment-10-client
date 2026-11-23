const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Soup",
    "Snacks",
    "Drinks",
];

const RecipeFilter = ({ category, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
                <button
                    key={item}
                    onClick={() => onCategoryChange(item)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                        category === item
                            ? "bg-[#3D2439] text-white border-[#3D2439]"
                            : "bg-white text-[#3D2439] border-[#EAE4EB] hover:bg-[#F8F1F5]"
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default RecipeFilter;
