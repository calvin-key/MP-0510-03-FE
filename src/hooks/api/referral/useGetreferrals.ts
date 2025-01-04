import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { RefferalHistory } from "@/types/referral";
import { useQuery } from "@tanstack/react-query";

interface GetReferralsQuery extends PaginationQueries {
  userId?: number;
  eventId?: number;
}

const useGetReferrals = (queries: GetReferralsQuery) => {
  return useQuery({
    queryKey: ["referrals", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<RefferalHistory>
      >("/referrals", {
        params: queries,
      });

      return data;
    },
  });
};
