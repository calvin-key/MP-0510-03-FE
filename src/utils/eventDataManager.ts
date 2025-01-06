import { EventData } from "@/types/event";
import { EventStatistics } from "@/types/eventStatistic";

export const processStatisticsData = (data: EventStatistics[]): EventData[] => {
  return data.map((stat) => ({
    id: stat.eventId,
    name: stat.eventName,
    date: new Date(stat.startDate),
    ticketsSold: stat.totalTransactions,
    revenue: stat.totalRevenue,
    attendance: stat.totalTransactions,
    attendees: [], // Menggunakan array kosong karena EventData mengharapkan Attendee[]
  }));
};

export const aggregateDataByMonth = (data: EventData[]) => {
  const monthlyData = Array(12)
    .fill(0)
    .map(() => ({
      ticketsSold: 0,
      revenue: 0,
      attendance: 0,
    }));

  data.forEach((event) => {
    const month = event.date.getMonth();
    monthlyData[month].ticketsSold += event.ticketsSold;
    monthlyData[month].revenue += event.revenue;
    monthlyData[month].attendance += event.attendance;
  });

  return monthlyData;
};
