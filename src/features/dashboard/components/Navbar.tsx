"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
}

const Navbar = ({
  isLoggedIn,
  userName = "",
  userRole = "",
  onLogout,
}: NavbarProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Transaction Accepted",
      message: "Your transaction for Event A has been accepted.",
      type: "transaction_accepted",
      read: false,
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Transaction Rejected",
      message:
        "Your transaction for Event B has been rejected. Your points have been returned.",
      type: "transaction_rejected",
      read: false,
      timestamp: new Date(),
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: any) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );
  };

  return (
    <div className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search anything..."
            className="h-11 w-full rounded-full border-gray-200 pl-10 pr-4 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer">
              <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              {unreadCount > 0 && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white">
                  {unreadCount}
                </div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer rounded-lg p-4 transition-colors ${
                    notification.read ? "bg-gray-50" : "bg-purple-50"
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <h4 className="font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">
                  {isLoggedIn ? userName : "Sign In"}
                </span>
                {isLoggedIn && (
                  <span className="text-xs text-gray-500">{userRole}</span>
                )}
              </div>
              <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-purple-500 ring-offset-2">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  {userName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {isLoggedIn ? (
              <>
                <DropdownMenuItem className="flex items-center gap-2 py-2">
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onLogout}
                  className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem>Sign In</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
