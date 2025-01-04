import { axiosInstance } from "@/lib/axios";
import { Coupon } from "@/types/coupon";
import { useQuery } from "@tanstack/react-query";

const useGetCoupon = (id: number) => {
  return useQuery({
    queryKey: ["coupons", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Coupon>(`/coupons/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export default useGetCoupon;
