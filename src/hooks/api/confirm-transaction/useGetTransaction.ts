import useAxios from "@/hooks/useAxios";
import { PaginationQueries } from "@/types/pagination";
import { Transaction, TransactionResponse } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQueries extends PaginationQueries {
  search?: string;
}

const useGetTransactions = (queries: GetTransactionsQueries) => {
  const { ...params } = queries;
  const { axiosInstance } = useAxios();

  return useQuery<TransactionResponse>({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/transactions/organizer", {
        params,
      });

      // Transform backend data to match frontend types
      const transformedData: Transaction[] = data.data.map((item: any) => ({
        id: item.id.toString(),
        eventName: item.items[0]?.ticketType.event.name || "",
        customerName: item.user.fullName,
        amount: item.totalPrice,
        paymentProof: item.paymentProof || "",
        status: transformStatus(item.status),
        date: new Date(item.createdAt).toISOString(),
      }));

      return {
        data: transformedData,
        meta: data.meta,
      };
    },
  });
};

// Helper function to transform backend status to frontend status
const transformStatus = (
  status: string,
): "pending" | "approved" | "rejected" => {
  switch (status) {
    case "waiting_for_payment":
    case "waiting_for_admin_confirmation":
      return "pending";
    case "done":
      return "approved";
    case "rejected":
    case "expired":
    case "canceled":
      return "rejected";
    default:
      return "pending";
  }
};

export default useGetTransactions;
