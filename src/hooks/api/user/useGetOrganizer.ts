import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";

const fetchOrganizerDetail = async (id: number): Promise<Organizer> => {
  const { data } = await axiosInstance.get(`/user/organizers/${id}`);
  return data;
};

export const useOrganizerDetail = (id: number) => {
  return useQuery({
    queryKey: ["organizerDetail", id],
    queryFn: () => fetchOrganizerDetail(id),
    enabled: !!id,
  });
};
