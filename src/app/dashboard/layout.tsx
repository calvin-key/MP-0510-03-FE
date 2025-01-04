import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();
  //   if (!session) return redirect("/");
  //   if (session.user.role !== "ORGANIZER") {
  //     return redirect("/");
  //   }

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
