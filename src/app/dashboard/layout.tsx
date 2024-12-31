"use client";

import Navbar from "@/features/dashboard/components/Navbar";
import Sidebar from "@/features/dashboard/components/Sidebar";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add logout logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar full height */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar
          isLoggedIn={isLoggedIn}
          userName="Udin Jago"
          userRole="Event Organizer"
          onLogout={handleLogout}
        />

        {/* Page content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
