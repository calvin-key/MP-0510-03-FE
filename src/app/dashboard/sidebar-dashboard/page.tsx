import DashboardLayout from "@/features/dashboard/DashboardLayout";
import SidebarDashboardPage from "@/features/dashboard/sidebar-dashboard";
import React from "react";

const SidebarDashboard = () => {
  return (
    <DashboardLayout>
      <SidebarDashboardPage />;
    </DashboardLayout>
  );
};

export default SidebarDashboard;
