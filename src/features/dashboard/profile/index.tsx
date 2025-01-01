"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useGetUser from "@/hooks/api/user/useGetUser";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { updateUserAction } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import { Camera, Home, Loader2, Mail, Phone, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileSchema } from "./schemas";

const ProfilePage = () => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data, isPending: isPendingGet } = useGetUser({
    token,
    userId: user.id,
  });
  const { mutateAsync: updateUser, isPending } = useUpdateUser(token!, user.id);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user-storage");
    if (storedUser) {
      dispatch(updateUserAction(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      profilePicture: null as File | null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        if (values.profilePicture) {
          formData.append("profilePicture", values.profilePicture);
        }

        const updatedUser = await updateUser({
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          profilePicture: values.profilePicture,
        });

        dispatch(updateUserAction(updatedUser));
        localStorage.setItem("user-storage", JSON.stringify(updatedUser));
        setError("");
      } catch (error) {
        setError("Failed to update profile. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        profilePicture: null,
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

  const handleRemoveProfilePicture = () => {
    formik.setFieldValue("profilePicture", null);
    setSelectedImage("");
    if (profilePictureRef.current) {
      profilePictureRef.current.value = "";
    }
  };

  // if (isPendingGet) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-md">
        <CardHeader className="border-b bg-white pb-6 pt-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="h-24 w-24 rounded-full border-2 border-gray-300 shadow-sm">
                <AvatarImage
                  src={selectedImage}
                  className="rounded-full object-cover"
                />
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
                ref={profilePictureRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Profile Settings
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-500">
                Manage your personal information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4 px-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 pl-10 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.fullName}
                  </div>
                )}
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 pl-10 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 pl-10 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Home className="h-5 w-5" />
                  </div>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-300 pl-10 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {formik.touched.address && formik.errors.address && (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.address}
                  </div>
                )}
              </div>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div className="mt-8 flex justify-center border-t pt-6">
              <Button
                type="submit"
                className="rounded-lg bg-purple-600 px-8 py-3 text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isPending}
              >
                {isPending ? (
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
};

export default ProfilePage;
