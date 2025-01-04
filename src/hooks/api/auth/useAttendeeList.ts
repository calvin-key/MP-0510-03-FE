// src/api/useAttendeeList.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

interface AttendeeListParams {
  page?: number;
  take?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  eventId?: number;
  search?: string;
}

interface Attendee {
  id: number;
  eventName: string;
  eventDescription: string;
  ticketType: string;
  price: number;
  availableSeats: number;
  revenue: number;
  eventStartDate: Date;
  eventEndDate: Date;
}

interface AttendeeListResponse {
  data: Attendee[];
  meta: {
    page: number;
    take: number;
    total: number;
    totalPages: number;
  };
}

const fetchAttendeeList = async (
  params: AttendeeListParams,
): Promise<AttendeeListResponse> => {
  const { data } = await axiosInstance.get("/attendees/list", {
    params: {
      page: params.page,
      take: params.take,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      eventId: params.eventId,
      search: params.search,
    },
  });
  return data;
};

const useAttendeeList = (params: AttendeeListParams) => {
  return useQuery({
    queryKey: ["attendeeList", params],
    queryFn: () => fetchAttendeeList(params),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
};

export default useAttendeeList;
