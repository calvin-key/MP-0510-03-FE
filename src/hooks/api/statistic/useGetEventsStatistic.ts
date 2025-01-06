import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventStatistics } from "@/types/eventStatistic";
import useAxios from "@/hooks/useAxios";

interface GetEventStatisticsParams {
  year?: string;
  month?: string;
  day?: string;
}

const useGetEventStatistics = ({
  year,
  month,
  day,
}: GetEventStatisticsParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<EventStatistics[], AxiosError>({
    queryKey: ["eventStatistics", { year, month, day }],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (year) params.year = year;
      if (month) params.month = month;
      if (day) params.day = day;

      const response = await axiosInstance.get<EventStatistics[]>(
        "/api/statistic",
        { params },
      );
      return response.data;
    },
    enabled: Boolean(year || month || day),
  });
};

export default useGetEventStatistics;
