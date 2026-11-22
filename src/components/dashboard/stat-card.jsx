import Link from "next/link";

const StatCard = ({ title, value, icon: Icon, href, description }) => {
  return (
    <div className="bg-white border border-[#EAE4EB] rounded-xl p-6 md:p-7 hover:shadow-md transition-shadow duration-300">

      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base text-[#756B75] font-medium">
          {title}
        </h3>

        {Icon && (
          <div className="w-11 h-11 rounded-lg bg-[#F8EDF6] flex items-center justify-center">
            <Icon size={22} className="text-[#A61D87]" strokeWidth={1.8} />
          </div>
        )}
      </div>

      {/* Value */}
      <h2 className="text-4xl font-bold text-[#3D2439] mb-3">
        {value ?? 0}
      </h2>

      {/* Description / Link */}
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#A61D87] hover:text-[#3D2439] transition-colors"
        >
          View details <span>→</span>
        </Link>
      ) : (
        <p className="text-sm text-[#958995]">
          {description}
        </p>
      )}

    </div>
  );
};

export default StatCard;
