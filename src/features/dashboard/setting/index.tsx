"use client";

import { useState } from "react";
import { useFormik } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, Shield } from "lucide-react";
import ModalConfirmation from "@/components/ModalConfirmation";
import { PasswordSettingsSchema } from "./schemas";
import useChangePassword from "@/hooks/api/auth/useChangePassword";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface FieldConfig {
  id: keyof PasswordFormData;
  label: string;
}

export default function SettingsPage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    } as PasswordFormData,
    validationSchema: PasswordSettingsSchema,
    onSubmit: async (values) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        });
        setIsPasswordDialogOpen(false);
        passwordFormik.resetForm();
        setError("");
      } catch (error) {
        setError("Failed to change password. Please try again.");
      }
    },
  });

  const fields: FieldConfig[] = [
    { id: "currentPassword", label: "Current Password" },
    { id: "newPassword", label: "New Password" },
    { id: "confirmNewPassword", label: "Confirm New Password" },
  ];

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6 pt-24">
      <Card className="w-full max-w-xl transform rounded-2xl bg-white/80 shadow-xl backdrop-blur transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-4 pb-8 pt-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-purple-100 p-4 ring-4 ring-purple-50">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div>
            <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              Security Settings
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Manage your account security and password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label
                    htmlFor={field.id}
                    className="font-medium text-gray-700"
                  >
                    {field.label}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id={field.id}
                      name={field.id}
                      type="password"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={passwordFormik.values[field.id]}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      className="rounded-xl border-gray-200 pl-10 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  {passwordFormik.touched[field.id] &&
                    passwordFormik.errors[field.id] && (
                      <div className="mt-1 text-sm text-red-500">
                        {String(passwordFormik.errors[field.id])}
                      </div>
                    )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              disabled={isChangingPassword}
              onClick={() => setIsPasswordDialogOpen(true)}
              className="w-full transform rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-purple-700 hover:to-indigo-700"
            >
              {isChangingPassword ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Changing Password...</span>
                </div>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          <ModalConfirmation
            isOpen={isPasswordDialogOpen}
            onOpenChange={setIsPasswordDialogOpen}
            title="Change Password"
            description="Are you sure you want to change your password? You'll need to use your new password the next time you log in."
            onConfirm={passwordFormik.handleSubmit}
            confirmText="Change Password"
            cancelText="Cancel"
          />
        </CardContent>
      </Card>
    </div>
  );
}
