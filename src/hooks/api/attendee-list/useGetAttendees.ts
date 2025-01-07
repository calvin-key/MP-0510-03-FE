"use client";
import useAxios from "@/hooks/useAxios";
import { Attendee } from "@/types/attendee";
import { useQuery } from "@tanstack/react-query";

const useGetAttendeesByEvent = (eventId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Attendee[]>(
        `/attendees/${eventId}`,
      );
      return data;
    },
    enabled: !!eventId,
  });
};

export default useGetAttendeesByEvent;
