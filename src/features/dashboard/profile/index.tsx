"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { Loader2, Camera, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EditUserSchema } from "./schemas";
import useGetUser from "@/hooks/api/user/useGetUser";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";

const ProfilePage = () => {
  const { data: session, update: updateSession } = useSession();
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
  };

  return (
    <div className="px-4 py-6">
      <Card className="h-screen w-full shadow-sm">
        <CardHeader className="border-b pb-6 text-center">
          <CardTitle className="text-xl sm:text-2xl">Profile</CardTitle>
          <p className="text-sm text-gray-500">
            This is how others will see you on the site.
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 sm:space-y-8"
          >
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className="group relative cursor-pointer"
                onClick={triggerFileInput}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200 sm:h-32 sm:w-32">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400 sm:h-12 sm:w-12" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-orange-500 p-2 shadow-md transition-transform hover:scale-105">
                    <Camera className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                  </div>
                </div>
                <Input
                  ref={profilePictureRef}
                  type="file"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                />
              </div>
              <p className="text-center text-sm text-gray-500">
                You can edit your profile picture here.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 sm:space-y-6">
              <div className="w-full">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This is your public display name.
                </p>
                {formik.errors.fullName && formik.touched.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex w-full flex-col gap-2 sm:flex-row">
                  <Input
                    id="referralCode"
                    value={formik.values.referralCode}
                    readOnly
                    className="w-full bg-gray-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyReferralCode}
                    className="flex items-center justify-center gap-2 whitespace-nowrap sm:w-auto"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  This field is not editable.
                </p>
              </div>

              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formik.values.email}
                  readOnly
                  className="w-full bg-gray-50"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This field is not editable.
                </p>
              </div>

              <div className="w-full">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formik.values.role}
                  readOnly
                  className="w-full bg-gray-50"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This field is not editable.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="w-full bg-orange-500 px-6 hover:bg-orange-600 sm:w-auto"
                disabled={isPending}
              >
                {isPending ? (
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
};

export default ProfilePage;
