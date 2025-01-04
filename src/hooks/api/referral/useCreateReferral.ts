import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateReferralPayload {
  referrerId: number;
  referredId: number;
  pointsAwarded: number;
}

const useCreateReferral = () => {
  return useMutation({
    mutationFn: async (payload: CreateReferralPayload) => {
      const { data } = await axiosInstance.post("/referrals", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Referral History Created Successfully");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};
