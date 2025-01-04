import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateCouponPayload {
  code?: string;
  nominal?: number;
  expiredAt?: Date;
  isUsed?: boolean;
}

const useUpdateCoupon = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCouponPayload) => {
      const { data } = await axiosInstance.patch(`/coupons/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon Updated Successfully");
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
