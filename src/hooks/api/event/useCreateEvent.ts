import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";

interface TicketType {
  ticketType: string;
  price: number;  // Ensure that this is a string
  availableSeats: number;  // Ensure that this is a string
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

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("category", payload.category);
      formData.append("description", payload.description);
      formData.append("address", payload.address);
      formData.append("specificLocation", payload.specificLocation);
      formData.append("startDate", payload.startDate);
      formData.append("endDate", payload.endDate);
      formData.append("city", payload.city);

      // Handle image if it exists
      if (payload.image) {
        formData.append("image", payload.image);
      }

      // Convert ticketTypes to the expected format (ensure strings for price and availableSeats)
      const formattedTicketTypes = payload.ticketTypes.map(ticket => ({
        ticketType: ticket.ticketType,
        price: ticket.price, // Ensure price is string (no need to parseInt here)
        availableSeats: ticket.availableSeats, // Ensure availableSeats is string
      }));

      formData.append("ticketTypes", JSON.stringify(formattedTicketTypes));
      formData.append("categories", JSON.stringify(payload.categories));

      const { data } = await axiosInstance.post("/events", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Event created successfully!");
      router.push("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to create event");
    },
  });
};

export default useCreateEvent;
