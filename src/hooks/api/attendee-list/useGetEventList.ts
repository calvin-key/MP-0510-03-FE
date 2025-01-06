"use client";

import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventListQueries extends PaginationQueries {
  userId?: string;
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const useGetEventList = (queries: GetEventListQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["eventlist", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        {
          params: {
            page: queries.page || 1,
            take: queries.take || 10,
            sortBy: queries.sortBy || "createdAt",
            sortOrder: queries.sortOrder || "desc",
            userId: queries.userId,
          },
        },
      );

      return data;
    },
  });
};

export default useGetEventList;
