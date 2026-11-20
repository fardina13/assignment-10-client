
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Heart,
  ShoppingBag,
  UserRound,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  { name: "Add Recipe", href: "/dashboard/user/add-recipe", icon: PlusCircle },
  { name: "My Recipes", href: "/dashboard/user/my-recipes", icon: BookOpen },
  { name: "Favourites", href: "/dashboard/user/favourites", icon: Heart },
  { name: "Purchased", href: "/dashboard/user/purchased", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/user/profile", icon: UserRound },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  return (
    <aside className="w-full md:w-[260px] lg:w-[280px] min-h-screen bg-[#FAF9FC] border-r border-[#E9E2EA] flex flex-col px-5 py-7">

      {/* User Profile */}
      <div className="flex items-center gap-3 px-2 pb-6">

        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#F2EAF3] border border-[#E9E2EA] flex items-center justify-center">

          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserRound size={23} className="text-[#A61D87]" />
          )}

        </div>

        <div className="min-w-0">
          <h3 className="text-[#3D2439] text-base font-semibold truncate">
            {user?.name || "Recipe Lover"}
          </h3>

          <p className="text-[#8B7D89] text-xs mt-1">
            Welcome to RecipeHub
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#E9E2EA] mb-6" />

      {/* Navigation */}
      <nav className="flex-1 space-y-2">

        <p className="text-[#8B7D89] text-[11px] uppercase tracking-[2px] font-semibold px-3 mb-4">
          Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-[#A61D87] text-white shadow-sm"
                    : "text-[#3D2439] hover:bg-[#F2EAF3] hover:text-[#A61D87]"
                }`}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="mt-8">

        <div className="border-t border-[#E9E2EA] mb-5" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-[#3D2439] hover:bg-[#F2EAF3] hover:text-[#A61D87] transition-all duration-200"
        >
          <LogOut size={19} strokeWidth={1.8} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;
