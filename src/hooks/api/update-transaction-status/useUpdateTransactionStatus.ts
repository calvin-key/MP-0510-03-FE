import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UpdateTransactionStatusParams {
  transactionId: number;
  status: Transaction["status"];
  notes?: string;
}

export const useUpdateTransactionStatus = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      transactionId,
      status,
      notes,
    }: UpdateTransactionStatusParams) => {
      const { data } = await axiosInstance.patch<Transaction>(
        `/update-transaction-status/${transactionId}/status`,
        { status, notes },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["update-transaction-status"],
      });
    },
  });
};
