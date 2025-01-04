"use client";
import useAxios from "@/hooks/useAxios";
import { Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

const useGetVouchers = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["vouchers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Voucher[]>("/vouchers");
      return data || [];
    },
  });
};

export default useGetVouchers;
