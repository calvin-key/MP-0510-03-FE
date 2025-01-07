import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { getSession } from "next-auth/react";

export const useGetReviewableEvents = () => {
  return useQuery({
    queryKey: ["reviewableEvents"],
    queryFn: async () => {
      const session = await getSession();
      const token = session?.user.token;

      const { data } = await axiosInstance.get<Event[]>("/events/reviewable", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
  });
};
