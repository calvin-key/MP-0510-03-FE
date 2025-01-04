// hooks/api/voucher/useCreateVoucher.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios"; // Assuming axiosInstance is exported from this file
import { Voucher } from "@/types/voucher"; // Import the Voucher type
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";

const useCreateVoucher = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Voucher) => axiosInstance.post("/vouchers", data),
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
