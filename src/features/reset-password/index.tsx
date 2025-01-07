"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { ResetPasswordSchema } from "./schemas";

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="flex w-full max-w-6xl overflow-hidden rounded-xl border-none shadow-2xl">
        <div className="relative hidden w-1/2 md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-500">
            <img
              src="/background-1.webp"
              alt="Background"
              className="h-full w-full object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
            <h2 className="font-serif text-4xl font-bold text-white">
              Welcome Back!
            </h2>
            <p className="mt-4 text-lg text-white">
              "Secure Your Account, Regain Control."
            </p>
          </div>
        </div>

        <div className="w-full bg-white p-8 md:w-1/2">
          <div className="mb-8">
            <h1 className="text-center font-serif text-3xl font-bold text-gray-900">
              Reset Password
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Create a new strong password
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                className="mb-2 block text-sm text-gray-600"
                htmlFor="password"
              >
                New Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a new password"
                className="w-full rounded-lg border border-gray-300 p-3"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.password && !!formik.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm text-gray-600"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                className="w-full rounded-lg border border-gray-300 p-3"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
              disabled={isPending}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="mt-6 text-center">
              <span className="text-gray-600">Remember your password? </span>
              <Link href="/login" className="text-orange-600 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default ResetPasswordPage;
