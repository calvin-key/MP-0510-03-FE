"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateUserPayload {
  fullName: string;
  profilePicture: File | null;
}

const useUpdateUser = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const updateUserForm = new FormData();

      updateUserForm.append("fullName", payload.fullName);
      if (payload.profilePicture) {
        updateUserForm.append("profilePicture", payload.profilePicture);
      }

      const { data } = await axiosInstance.patch("/user", updateUserForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Update profile success");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useUpdateUser;
