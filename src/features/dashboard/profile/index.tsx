"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { Loader2, Camera, Copy, Gift, Coins } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EditUserSchema } from "./schemas";
import useGetUser from "@/hooks/api/user/useGetUser";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const { data, isPending: isPendingGet } = useGetUser({ token });
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const profilePictureRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      profilePicture: null,
      email: "",
      referralCode: "",
      role: "",
    },
    validationSchema: EditUserSchema,
    onSubmit: async (values) => {
      await updateUser(values);
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        fullName: data.fullName,
        profilePicture: null,
        email: data.email || "",
        referralCode: data.referralCode || "",
        role: data.role || "",
      });
      setSelectedImage(data.profilePicture || "");
    }
  }, [data]);

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("profilePicture", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    profilePictureRef.current?.click();
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(formik.values.referralCode);
    toast.success("Referral code copied!");
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateTimeRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isPendingGet) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-auto p-4">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-6">
          <CardHeader className="border-b pb-6 text-center">
            <CardTitle className="text-xl sm:text-2xl">My Profile</CardTitle>
            <p className="text-sm text-gray-500">
              Manage your profile information and rewards
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="group relative cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <div className="relative h-40 w-40 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200">
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Camera className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <Input
                    ref={profilePictureRef}
                    type="file"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                  />
                  <div className="absolute -bottom-1 right-1 rounded-full bg-orange-500 p-2 shadow-md transition-transform hover:scale-105">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Click to update your profile picture
                </p>
              </div>

              {/* Middle Column - Profile Information */}
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 lg:col-span-2"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.fullName && formik.touched.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formik.values.email}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={formik.values.role}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="referralCode">Referral Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="referralCode"
                        value={formik.values.referralCode}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCopyReferralCode}
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Points Card */}
          <Card>
            <CardHeader className="border-b pb-6">
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-6 w-6 text-yellow-500" />
                Points Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-orange-500">
                    {data?.pointsBalance?.toLocaleString() || 0} Points
                  </span>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    Your points will expire on:{" "}
                    <span className="font-medium">
                      {formatDate(data?.pointsExpiryDate || "")}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Earn 10,000 points for each successful referral
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coupons Card */}
          <Card>
            <CardHeader className="border-b pb-6">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-pink-500" />
                Referral Coupons
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {data?.userCoupons && data.userCoupons.length > 0 ? (
                  data.userCoupons.map((userCoupon) => (
                    <div
                      key={userCoupon.id}
                      className="rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-orange-500">
                            Rp {userCoupon.coupon.nominal.toLocaleString()}
                          </p>
                          <p className="text-sm font-medium">
                            Code: {userCoupon.coupon.code}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              Valid until:{" "}
                              {formatDate(userCoupon.coupon.expiredAt)}
                            </p>
                            <span className="text-xs font-medium text-orange-500">
                              (
                              {calculateTimeRemaining(
                                userCoupon.coupon.expiredAt,
                              )}{" "}
                              days left)
                            </span>
                          </div>
                          {userCoupon.isUsed && (
                            <p className="text-sm font-medium text-red-500">
                              Used
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleCopyCouponCode(userCoupon.coupon.code)
                          }
                          className="flex items-center gap-2"
                          disabled={userCoupon.isUsed}
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center py-6 text-center">
                    <Gift className="h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-gray-500">
                      No referral coupons available
                    </p>
                    <p className="text-sm text-gray-400">
                      Share your referral code to earn points and help friends
                      get discount coupons
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
