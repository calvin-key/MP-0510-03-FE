"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "../../useAxios";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const useChangePassword = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const { data } = await axiosInstance.patch(
        "/auth/change-password",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      router.push("/dashboard/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Error updating password");
    },
  });
};

export default useChangePassword;
