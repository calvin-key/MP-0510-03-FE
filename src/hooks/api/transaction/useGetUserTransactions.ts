import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";

export const useGetUserTransactions = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/transactions/user", {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      return response.data;
    },
    enabled: !!session?.user,
  });
};
