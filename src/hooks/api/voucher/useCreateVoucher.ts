import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { Voucher } from "@/types/voucher";
import { getSession } from "next-auth/react";

const useCreateVoucher = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Voucher) => {
      const session = await getSession();
      const token = session?.user.token;

      const response = await axiosInstance.post("/vouchers", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("Create Voucher Success");
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateVoucher;
