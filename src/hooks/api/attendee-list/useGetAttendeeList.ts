"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface Attendee {
  id: number;
  name: string;
  email: string;
  ticketDetails: {
    type: string;
    quantity: number;
    pricePerUnit: number;
  }[];
  totalQuantity: number;
  totalPrice: number;
  purchaseDate: string;
}

interface GetAttendeeListQueries extends PaginationQueries {
  eventId?: number;
  search?: string;
  page?: number;
  take?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const useGetAttendeeList = (queries: GetAttendeeListQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["attendeelist", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Attendee>>(
        `/events/${queries.eventId}/attendees`,
        {
          params: {
            page: queries.page || 1,
            take: queries.take || 10,
            sortBy: queries.sortBy || "createdAt",
            sortOrder: queries.sortOrder || "desc",
            search: queries.search,
          },
        },
      );
      return data;
    },
    enabled: !!queries.eventId,
  });
};

export default useGetAttendeeList;
