"use client";

import { useSession } from "@/lib/auth-client";

import StatsGrid from "@/components/dashboard/stats-grid";
import PremiumBadge from "@/components/dashboard/premium-badge";

import {
  ChefHat,
  Heart,
  ThumbsUp,
} from "lucide-react";

const UserDashboard = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="text-[#3D2439] p-5">Loading...</div>;
  }

  const user = session?.user;

  // Dashboard Statistics
  const userStats = [
    {
      title: "Total Recipes",
      value: 0,
      icon: ChefHat,
      href: "/dashboard/user/my-recipes",
    },
    {
      title: "Total Favorites",
      value: 0,
      icon: Heart,
      href: "/dashboard/user/favourites",
    },
    {
      title: "Total Likes Received",
      value: 0,
      icon: ThumbsUp,
      description: "Across all your recipes",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EAE4EB] pb-6">

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3D2439]">
            Overview
          </h2>

          <p className="text-sm text-[#958995] mt-2">
            Welcome back, {user?.name || "Recipe Lover"}.
            Here's your dashboard overview.
          </p>
        </div>

        {/* Premium Badge */}
        <PremiumBadge isPremium={user?.isPremium === true} />

      </div>

      {/* Statistics Cards */}
      <StatsGrid stats={userStats} />

    </div>
  );
};

export default UserDashboard;

