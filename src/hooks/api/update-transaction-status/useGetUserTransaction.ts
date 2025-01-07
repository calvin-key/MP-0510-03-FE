import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetUserTransactions = () => {
  const { axiosInstance } = useAxios();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["organizer-transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        data: Transaction[];
        meta: { page: number; take: number; total: number };
      }>("/update-transaction-status", {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      return data.data;
    },
    enabled: !!session?.user.token,
  });
};
