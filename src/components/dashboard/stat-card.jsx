import Link from "next/link";

const StatCard = ({ title, value, icon: Icon, href, description }) => {
  return (
    <div className="bg-white border border-[#EAE4EB] rounded-xl p-5 md:p-6 hover:shadow-md transition-shadow duration-300">

      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm text-[#756B75] font-medium">
          {title}
        </h3>

        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-[#F8EDF6] flex items-center justify-center">
            <Icon size={19} className="text-[#A61D87]" strokeWidth={1.8} />
          </div>
        )}
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold text-[#3D2439] mb-2">
        {value ?? 0}
      </h2>

      {/* Description / Link */}
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#A61D87] hover:text-[#3D2439] transition-colors"
        >
          View details <span>→</span>
        </Link>
      ) : (
        <p className="text-xs text-[#958995]">
          {description}
        </p>
      )}

    </div>
  );
};

export default StatCard;
