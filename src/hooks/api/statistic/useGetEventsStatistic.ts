import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventStatistics } from "@/types/eventStatistic";
import { EventData } from "@/types/event";
import useAxios from "@/hooks/useAxios";

interface GetEventStatisticsParams {
  year?: string;
  month?: string;
  day?: string;
}

const transformToEventData = (stats: EventStatistics[]): EventData[] => {
  return stats.map((stat, index) => ({
    id: index + 1,
    name: stat.eventName,
    date: new Date(),
    ticketsSold: stat.totalTransactions,
    revenue: stat.totalRevenue,
    attendance: stat.totalTransactions,
    attendees: [],
  }));
};

const useGetEventStatistics = ({
  year,
  month,
  day,
}: GetEventStatisticsParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<EventData[], AxiosError>({
    queryKey: ["statistics", { year, month, day }],
    queryFn: async () => {
      const response = await axiosInstance.get<{
        success: boolean;
        data: EventStatistics[];
      }>("/statistic/transactions", {
        params: { year, month, day },
      });
      return transformToEventData(response.data.data);
    },
    enabled: Boolean(year),
  });
};

export default useGetEventStatistics;
