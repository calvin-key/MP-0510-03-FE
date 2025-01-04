"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import useChangePassword from "@/hooks/api/user/useChangePassword";
import { ChangePasswordSchema } from "./schemas";

export default function SettingsPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const { mutateAsync: changePassword, isPending } = useChangePassword(token!);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "", // Changed to match schema
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, actions) => {
      try {
        // Only send required fields to API
        const payload = {
          password: values.password,
          newPassword: values.newPassword,
        };
        await changePassword(payload);
        actions.resetForm();
      } catch (error) {
        console.error("Error changing password:", error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="px-4 py-6">
      <Card className="h-screen w-full shadow-sm">
        <CardHeader className="border-b pb-6 text-center">
          <CardTitle className="text-xl sm:text-2xl">
            Security Settings
          </CardTitle>
          <p className="text-sm text-gray-500">
            Manage your account security and password
          </p>
        </CardHeader>

        <CardContent className="p-4 sm:p-8">
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Current Password */}
              <div className="w-full">
                <Label htmlFor="password">Current Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="w-full">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="w-full">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-10"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
                    onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                  >
                    {showConfirmNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="w-full bg-orange-500 px-6 hover:bg-orange-600 sm:w-auto"
                disabled={isPending || formik.isSubmitting}
              >
                {isPending || formik.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
