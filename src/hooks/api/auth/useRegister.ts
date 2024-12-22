"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Register success");
      dispatch(loginAction(data));
      localStorage.setItem("blog-storage", JSON.stringify(data));
      router.replace("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRegister;
