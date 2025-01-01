// useGetUser.ts
import { axiosInstance } from "@/lib/axios";
import { UserState } from "@/redux/slices/userSlice";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetProfileQueries {
  token: string | undefined;
  userId?: number;
}

const useGetUser = ({ token }: GetProfileQueries) => {
  return useQuery({
    queryKey: ["users", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("users/:id", {
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
