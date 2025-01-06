import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Transaction } from "@/types/transaction";
import { axiosInstance } from "@/lib/axios";
import { getSession } from "next-auth/react";

interface UpdateTransactionVariables {
  id: number;
  paymentProof: File;
}

const updateTransaction = async ({
  id,
  paymentProof,
}: UpdateTransactionVariables): Promise<Transaction> => {
  const session = await getSession();
  const token = session?.user.token;
  const formData = new FormData();
  formData.append("paymentProof", paymentProof);

  const response = await axiosInstance.patch<Transaction>(
    `/transactions/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const useUpdateTransaction = (): UseMutationResult<
  Transaction,
  Error,
  UpdateTransactionVariables,
  unknown
> => {
  return useMutation({
    mutationFn: updateTransaction,
  });
};
