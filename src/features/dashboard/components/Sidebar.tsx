"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetUser from "@/hooks/api/user/useGetUser";
import {
  Calendar,
  ChevronDown,
  List,
  LogOut,
  Menu,
  Plus,
  Receipt,
  Settings,
  Tag,
  Ticket,
  User,
  Users,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;

  const { data: userData, refetch: refetchUser } = useGetUser({
    token,
  });

  useEffect(() => {
    const eventRelatedPaths = [
      "/dashboard/event-list",
      "/dashboard/create-event",
      "/dashboard/event-categories",
      "/dashboard/create-voucher",
      "/dashboard/confirmation",
      "/dashboard/attended-list",
      "/dashboard/edit-event",
    ];

    if (eventRelatedPaths.some((path) => pathname?.startsWith(path))) {
      setIsEventMenuOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/dashboard/profile") {
      refetchUser();
    }
  }, [pathname, refetchUser]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div>
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

      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-transform duration-300 md:static md:w-64 md:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-screen flex-col">
          <div className="flex h-20 items-center px-6">
            <h2 className="text-xl font-bold text-gray-900">
              Scaena's Dashboard
            </h2>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {userData && userData.role === "ORGANIZER" && (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 rounded-lg p-2 ${
                    pathname === "/dashboard"
                      ? "bg-orange-50 text-orange-700"
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
                          href: "/dashboard/create-voucher",
                          icon: Ticket,
                          label: "Voucher",
                        },
                        {
                          href: "/dashboard/confirmation",
                          icon: Receipt,
                          label: "Confirmation",
                        },
                        {
                          href: "/dashboard/attended-list",
                          icon: List,
                          label: "Attended List",
                        },
                        {
                          href: "/dashboard/edit-event",
                          icon: List,
                          label: "Edit Event",
                        },
                      ].map(({ href, icon: Icon, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-center space-x-2 rounded-lg p-2 text-sm ${
                            pathname === href
                              ? "bg-orange-50 text-orange-700"
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
              </>
            )}

            <Link
              href="/dashboard/setting"
              className={`flex items-center space-x-2 rounded-lg p-2 ${
                pathname === "/dashboard/setting"
                  ? "bg-orange-50 text-orange-700"
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
                  ? "bg-orange-50 text-orange-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>

          {userData && (
            <div className="border-t p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                    <AvatarImage
                      src={userData.profilePicture || ""}
                      alt={userData.fullName || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userData.fullName?.charAt(0) || "PP"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {userData.fullName}
                    </span>
                    <Link
                      href="/dashboard/profile"
                      className="text-sm text-gray-500 hover:text-orange-700"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

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
