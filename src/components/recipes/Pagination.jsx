const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div className="flex justify-center items-center flex-wrap gap-2 mt-12">

            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-[#EAE4EB] text-[#3D2439] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8F1F5] transition"
            >
                Previous
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                        currentPage === page
                            ? "bg-[#3D2439] text-white"
                            : "bg-white border border-[#EAE4EB] text-[#3D2439] hover:bg-[#F8F1F5]"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-[#EAE4EB] text-[#3D2439] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8F1F5] transition"
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;
