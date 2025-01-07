"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { CreateEventPayload } from "./useCreateEvent";
import { getSession } from "next-auth/react";

interface TicketType {
  ticketType: string;
  price: number;
  availableSeats: number;
}

interface ErrorResponse {
  message: string;
}

const useEditEvent = (id: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorResponse>, CreateEventPayload>({
    mutationFn: async (payload) => {
      const session = await getSession();
      const token = session?.user.token;

      const formData = new FormData();

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("address", payload.address);
      formData.append("specificLocation", payload.specificLocation);
      formData.append("startDate", payload.startDate);
      formData.append("endDate", payload.endDate);
      formData.append("city", payload.city);

      const formattedTicketTypes = payload.ticketTypes.map((ticket) => ({
        ticketType: ticket.ticketType,
        price: parseInt(ticket.price.toString()),
        availableSeats: parseInt(ticket.availableSeats.toString()),
      }));

      formData.append("ticketTypes", JSON.stringify(formattedTicketTypes));
      formData.append("categories", JSON.stringify(payload.categories));

      if (payload.image instanceof File) {
        formData.append("image", payload.image, payload.image.name);
      }

      const { data } = await axiosInstance.patch(`/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/dashboard/event-list");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to update event";
      toast.error(errorMessage);
    },
  });
};

export default useEditEvent;