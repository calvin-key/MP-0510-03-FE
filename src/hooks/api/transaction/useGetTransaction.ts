import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/transaction";
import { axiosInstance } from "@/lib/axios";

const getTransaction = async (id: number): Promise<Transaction> => {
  const response = await axiosInstance.get<Transaction>(`/transactions/${id}`);
  return response.data;
};

export const useGetTransaction = (id: number) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
};
