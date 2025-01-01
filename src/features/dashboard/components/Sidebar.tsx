"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  ChevronDown,
  Tag,
  BarChart,
  Receipt,
  Ticket,
  User,
  LogOut,
  Plus,
  List,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const eventRelatedPaths = [
      "/dashboard/event-list",
      "/dashboard/create-event",
      "/dashboard/event-categories",
      "/dashboard/vouchers",
      "/dashboard/statistics",
      "/dashboard/transaction",
      "/dashboard/attended-list",
    ];

    if (eventRelatedPaths.some((path) => pathname?.startsWith(path))) {
      setIsEventMenuOpen(true);
    }
  }, [pathname]);

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex h-20 items-center px-6">
        <h2 className="text-xl font-bold text-gray-900">Scaena's Dashboard</h2>
      </div>
      <div className="p-4">
        <nav className="space-y-2">
          <Link
            href="/dashboard/sidebar-dashboard"
            className={`flex items-center space-x-2 rounded-lg p-2 ${
              pathname === "/dashboard/sidebar-dashboard"
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

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
                    href: "/dashboard/vouchers",
                    icon: Ticket,
                    label: "Voucher",
                  },
                  {
                    href: "/dashboard/statistics",
                    icon: BarChart,
                    label: "Statistics",
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

          <div className="mt-4 border-t pt-4">
            <nav className="space-y-2">
              <Link
                href="/dashboard/setting"
                className={`flex items-center space-x-2 rounded-lg p-2 ${
                  pathname === "/dashboard/settings"
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
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
              <button
                onClick={onLogout}
                className="flex w-full items-center space-x-2 rounded-lg p-2 text-red-600 hover:bg-gray-50 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
