import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
