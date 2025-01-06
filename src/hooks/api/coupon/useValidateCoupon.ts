import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";

interface ValidateCouponResponse {
  id: number;
  code: string;
  nominal: number;
}

export const useValidateCoupon = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (code: string) => {
      const response = await axiosInstance.post<ValidateCouponResponse>(
        "/coupons/validate",
        { code },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        },
      );
      return response.data;
    },
  });
};
