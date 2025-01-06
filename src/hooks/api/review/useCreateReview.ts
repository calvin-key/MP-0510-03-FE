import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { getSession } from "next-auth/react";

interface CreateReviewPayload {
  eventId: number;
  rating: number;
  comment: string;
}

export const useCreateReview = () => {
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const session = await getSession();
      const token = session?.user.token;

      console.log('Sending review data:', payload);
      console.log('Token:', token);


      const { data } = await axiosInstance.post("/reviews", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
  });
};
