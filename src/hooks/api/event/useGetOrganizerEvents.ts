// hooks/api/event/useGetOrganizerEvents.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";  // Assuming axiosInstance is exported from this file
import { Event } from "@/types/event";  // Import the Event type

const useOrganizerEvents = () => {
  return useQuery({
    queryKey: ["organizerEvents"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event[]>("/events/organizer");
      return data;
    },
  });
};

export default useOrganizerEvents;
