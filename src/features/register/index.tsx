"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import Link from "next/link";
import { RegisterSchema } from "./schemas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Coins, Gift } from "lucide-react";

const RegisterPage = () => {
  const { mutateAsync: register, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      role: "",
      email: "",
      password: "",
      referralCode: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br p-4">
      <Card className="w-full max-w-6xl rounded-xl border-none shadow-2xl md:h-auto lg:h-[90%] lg:w-[90%]">
        <div className="flex flex-col md:flex-row">
          <div className="hidden w-full items-center justify-center rounded-l-xl bg-gradient-to-br from-orange-400 to-orange-500 md:block md:w-1/2 lg:flex lg:flex-col">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-0">
                <img
                  src="/background-1.webp"
                  alt="Background"
                  className="h-full w-full rounded-xl object-cover opacity-30"
                />
              </div>
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center font-serif">
                <h2 className="text-shadow-md text-3xl font-extrabold text-white lg:text-4xl">
                  Welcome to Our Platform!
                </h2>
                <p className="mt-4 text-lg font-medium text-white lg:text-xl">
                  "Tickets Made Simple, Experiences Made Special."
                </p>
                <div className="mt-4 space-y-3 text-white">
                  <p className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Get exclusive rewards
                  </p>
                  <p className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    Earn points with referrals
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="w-full p-6 md:w-1/2 md:p-8 lg:p-12 xl:p-16">
            <div className="mb-4 text-center">
              <h1 className="font-serif text-2xl font-extrabold text-gray-800 md:text-3xl lg:text-4xl">
                Create Account Here
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Join us and start your journey today
              </p>
            </div>

            {formik.status && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{formik.status}</AlertDescription>
              </Alert>
            )}

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <Label htmlFor="fullName" className="font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.fullName && !!formik.errors.fullName ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="role" className="font-medium text-gray-700">
                  What best describes what you do?
                </Label>
                <Select
                  name="role"
                  value={formik.values.role}
                  onValueChange={(value) => formik.setFieldValue("role", value)}
                >
                  <SelectTrigger className="mt-2 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORGANIZER">Event Organizer</SelectItem>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                  </SelectContent>
                </Select>
                {!!formik.touched.role && !!formik.errors.role ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.role}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="email" className="font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="password" className="font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="mt-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              {formik.values.role === "CUSTOMER" && (
                <div>
                  <Label
                    htmlFor="referralCode"
                    className="font-medium text-gray-700"
                  >
                    Referral Code (Optional)
                  </Label>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    placeholder="Enter referral code for discount"
                    className="mt-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-500"
                    value={formik.values.referralCode}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.referralCode && formik.errors.referralCode ? (
                    <p className="mt-2 text-sm text-red-500">
                      {formik.errors.referralCode}
                    </p>
                  ) : null}
                </div>
              )}

              <Button
                type="submit"
                className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition duration-300 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Create Account"}
              </Button>

              <div className="text-center">
                <span className="mr-2 text-gray-600">
                  Already have an account?
                </span>
                <Link href="/login" className="text-orange-600 hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default RegisterPage;
