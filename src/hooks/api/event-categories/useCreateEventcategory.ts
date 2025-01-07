import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateCategoryPayload } from "@/types/event-category";
import { getSession } from "next-auth/react";

const useCreateEventCategory = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const session = await getSession();
      const token = session?.user.token;
      const { data } = await axiosInstance.post("/event-categories", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event categories success");
      await queryClient.invalidateQueries({ queryKey: ["event-categories"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateEventCategory;
