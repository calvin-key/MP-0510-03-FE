"use client";

// useUpdateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/router";

interface UpdateProfilePayload {
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  profilePicture?: File | null;
}

const useUpdateUser = (token: string, userId: number) => {
  // const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const updateProfileForm = new FormData();

      updateProfileForm.append("fullName", payload.fullName);
      if (payload.profilePicture) {
        updateProfileForm.append("profilePicture", payload.profilePicture);
      }

      const { data } = await axiosInstance.patch("/users", updateProfileForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success("Update profile success");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      // router.push("/dashboard/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useUpdateUser;
