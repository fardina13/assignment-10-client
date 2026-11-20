import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
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
