import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateTransactionRequest, Transaction } from "@/types/transaction";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";
import { getSession, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useValidateCoupon } from "@/hooks/api/coupon/useValidateCoupon";

const createTransaction = async (
  data: CreateTransactionRequest,
): Promise<Transaction> => {
  const session = await getSession();
  const token = session?.user.token;
  const response = await axiosInstance.post<Transaction>(
    "/transactions",
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();
  const { mutateAsync: validateCoupon } = useValidateCoupon();

  return useMutation({
    mutationFn: async (
      data: CreateTransactionRequest & { couponCode?: string },
    ) => {
      const { couponCode, ...transactionData } = data;

      if (couponCode) {
        const validatedCoupon = await validateCoupon(couponCode);
        transactionData.couponId = validatedCoupon.id;
      }

      return createTransaction(transactionData);
    },
    onSuccess: () => {
      toast.success("Transaction created successfully!");
      updateSession(); 
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message ||
          error.response?.data ||
          "Failed to create transaction",
      );
    },
  });
};
