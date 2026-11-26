
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Loader2 } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
  if (!isPending && !session?.user) {
    window.location.replace("/");
  }
}, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAFAFA]">
        <Loader2
          className="animate-spin text-[#A61D87]"
          size={35}
        />
        <p className="text-sm text-[#958995]">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <DashboardSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
