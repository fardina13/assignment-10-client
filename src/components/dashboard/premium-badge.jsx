import { Crown } from "lucide-react";

const PremiumBadge = ({ isPremium }) => {
  if (!isPremium) return null;

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8EDF6] border border-[#E8C8E2] text-[#A61D87] text-xs font-semibold">
      <Crown size={14} strokeWidth={2} />
      Premium Member
    </span>
  );
};

export default PremiumBadge;
