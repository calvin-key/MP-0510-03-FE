import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  CategoryResponse,
  GetEventCategoriesQuery,
} from "@/types/event-category";

const useGetEventCategories = (queries: GetEventCategoriesQuery) => {
  return useQuery({
    queryKey: ["event-categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CategoryResponse>(
        "/event-categories",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetEventCategories;
