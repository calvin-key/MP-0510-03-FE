import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useRejectTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.patch(`/transactions/${id}/reject`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Transaction rejected successfully");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.replace("/dashboard/payments");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRejectTransaction;
