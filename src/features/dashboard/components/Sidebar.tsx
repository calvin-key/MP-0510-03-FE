"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  ChevronDown,
  Tag,
  Receipt,
  Ticket,
  User,
  LogOut,
  Plus,
  List,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const eventRelatedPaths = [
      "/dashboard/event-list",
      "/dashboard/create-event",
      "/dashboard/event-categories",
      "/dashboard/create-voucher",
      "/dashboard/transaction",
      "/dashboard/attended-list",
    ];

    if (eventRelatedPaths.some((path) => pathname?.startsWith(path))) {
      setIsEventMenuOpen(true);
    }
  }, [pathname]);

  return (
    <div>
      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white p-4 shadow-md md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-transform duration-300 md:static md:w-64 md:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-screen flex-col">
          {/* Header */}
          <div className="flex h-20 items-center px-6">
            <h2 className="text-xl font-bold text-gray-900">
              Scaena's Dashboard
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {/* Dashboard */}
            <Link
              href="/dashboard/dashboard"
              className={`flex items-center space-x-2 rounded-lg p-2 ${
                pathname === "/dashboard/dashboard"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>

            {/* Events Section */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-gray-50"
                onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Events</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isEventMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {isEventMenuOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {[
                    {
                      href: "/dashboard/event-list",
                      icon: Calendar,
                      label: "Event List",
                    },
                    {
                      href: "/dashboard/create-event",
                      icon: Plus,
                      label: "Create Event",
                    },
                    {
                      href: "/dashboard/event-categories",
                      icon: Tag,
                      label: "Event Category",
                    },
                    {
                      href: "/dashboard/create-voucher",
                      icon: Ticket,
                      label: "Voucher",
                    },
                    {
                      href: "/dashboard/transaction",
                      icon: Receipt,
                      label: "Transaction",
                    },
                    {
                      href: "/dashboard/attended-list",
                      icon: List,
                      label: "Attended List",
                    },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center space-x-2 rounded-lg p-2 text-sm ${
                        pathname === href
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              href="/dashboard/setting"
              className={`flex items-center space-x-2 rounded-lg p-2 ${
                pathname === "/dashboard/setting"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>

            {/* Profile */}
            <Link
              href="/dashboard/profile"
              className={`flex items-center space-x-2 rounded-lg p-2 ${
                pathname === "/dashboard/profile"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Logout */}
          <div className="border-t p-4">
            <button
              onClick={() => alert("Logged out")}
              className="flex w-full items-center space-x-2 rounded-lg p-2 text-red-600 hover:bg-gray-50 hover:text-red-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
