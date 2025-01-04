import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetUserQuery {
  token: string | undefined;
}

const useGetUser = ({ token }: GetUserQuery) => {
  return useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetUser;
