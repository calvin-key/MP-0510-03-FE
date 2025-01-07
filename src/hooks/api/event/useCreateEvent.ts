import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { getSession } from "next-auth/react";

interface TicketType {
  ticketType: string;
  price: number;
  availableSeats: number;
}

export interface CreateEventPayload {
  name: string;
  category: string;
  description: string;
  address: string;
  specificLocation: string;
  startDate: string;
  endDate: string;
  city: string;
  image: File | null;
  ticketTypes: TicketType[];
  categories: string[];
}

interface ErrorResponse {
  message: string;
}

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorResponse>, CreateEventPayload>({
    mutationFn: async (payload) => {
      const session = await getSession();
      const token = session?.user.token;

      const formData = new FormData();

      console.log("Original ticketTypes:", payload.ticketTypes);
      console.log("Price type:", typeof payload.ticketTypes[0].price);

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("address", payload.address);
      formData.append("specificLocation", payload.specificLocation);
      formData.append("startDate", payload.startDate);
      formData.append("endDate", payload.endDate);
      formData.append("city", payload.city);

      const formattedTicketTypes = payload.ticketTypes.map((ticket) => ({
        ticketType: ticket.ticketType,
        price: ticket.price,
        availableSeats: parseInt(ticket.availableSeats.toLocaleString()),
      }));

      formData.append("ticketTypes", JSON.stringify(formattedTicketTypes));
      formData.append("categories", JSON.stringify(payload.categories));

      if (payload.image instanceof File) {
        formData.append("image", payload.image, payload.image.name);
      }

      const { data } = await axiosInstance.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/dashboard");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to create event";
        console.log(errorMessage);
        
      toast.error(errorMessage);
    },
  });
};

export default useCreateEvent;
