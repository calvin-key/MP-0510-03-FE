import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { RefferalHistory } from "@/types/referral";
import { useQuery } from "@tanstack/react-query";

interface GetReferredUsersQueries extends PaginationQueries {
  token: string | undefined;
}

const useGetReferredUsers = (queries: GetReferredUsersQueries) => {
  const { token, ...params } = queries;
  return useQuery({
    queryKey: ["referrals", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<RefferalHistory>
      >("/user/referrals", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetReferredUsers;
