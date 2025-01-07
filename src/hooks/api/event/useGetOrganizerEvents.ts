import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { getSession } from "next-auth/react";

const useOrganizerEvents = () => {
  return useQuery({
    queryKey: ["organizerEvents"],
    queryFn: async () => {
      const session = await getSession();
      const token = session?.user.token;

      const { data } = await axiosInstance.get<Event[]>("/events/organizer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
  });
};

export default useOrganizerEvents;
