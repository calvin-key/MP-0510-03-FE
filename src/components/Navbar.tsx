"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = () => signOut();

  const navItems = [
    { label: "Find Events", href: "/", roles: ["CUSTOMER", "ORGANIZER"] },
    {
      label: "My Orders",
      href: "/transactions",
      roles: ["CUSTOMER", "ORGANIZER"],
    },
    { label: "Write Review", href: "/write-review", roles: ["CUSTOMER"] },
    { label: "Dashboard", href: "/dashboard", roles: ["ORGANIZER"] },
    {
      label: "Create Event",
      href: "/dashboard/create-event",
      roles: ["ORGANIZER"],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) =>
      !user?.role || item.roles.includes(user.role as "CUSTOMER" | "ORGANIZER"),
  );

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-black text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="h-full items-center align-middle text-xl font-semibold"
            >
              <div className="flex">
                <Image src="/logo.ico" alt="logo" width={25} height={25} />
                caena
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border-orange-400 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-orange-700 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center">
                    <Image
                      src={user.profilePicture || "/default-avatar.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                    />
                    <span className="mr-4">{user.fullName}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem>
                      <Link
                        href="/dashboard/profile"
                        className="flex w-full items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/dashboard/setting"
                        className="flex w-full items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-orange-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-orange-700"
              >
                Sign In
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-orange-400 hover:bg-orange-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-800"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-orange-700 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-orange-700 pb-3 pt-4">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    src={user.profilePicture || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.fullName}
                  </div>
                  <div className="text-sm font-medium leading-none text-orange-400">
                    {user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-orange-700 hover:text-white"
                >
                  Sign In
                </Link>
              </div>
            )}
            {user && (
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/dashboard/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-orange-700 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/setting"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-orange-700 hover:text-white"
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white hover:bg-orange-700 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
