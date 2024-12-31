"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Loader2, User, Mail, Lock } from "lucide-react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder-avatar.jpg");
  const [formData, setFormData] = useState({
    username: "Udin Jago",
    email: "udin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full p-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b bg-gray-50/50 pb-8 pt-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-white ring-offset-2">
                <AvatarImage src={profileImage} className="object-cover" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-colors hover:bg-purple-700"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="profile-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold">
                Profile Settings
              </CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Manage your account information and preferences
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6 px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      This is your public display name
                    </p>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Your email address will be used for notifications
                    </p>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Change Password
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <label
                      htmlFor="currentPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Enter your current password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end border-t pt-6">
              <Button
                type="submit"
                className="bg-purple-600 px-8 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
