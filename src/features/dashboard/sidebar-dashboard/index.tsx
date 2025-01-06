"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, BarChart2, PieChart, LineChart } from "lucide-react";
import { processStatisticsData } from "@/utils/eventDataManager";
import useGetEventStatistics from "@/hooks/api/statistic/useGetEventsStatistic";
import { EventData, Event } from "@/types/event";
import { EventStatistics } from "@/types/eventStatistic";
import { AnnualView } from "./components/AnnualView";
import { MonthlyView } from "./components/MonthlyView";
import { DailyView } from "./components/DailyView";

const StatisticsPage = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDate().toString().padStart(2, "0"),
  );

  const {
    data: statistics,
    isLoading,
    error,
  } = useGetEventStatistics({
    year: selectedYear,
    month: selectedMonth,
    day: selectedDay,
  });

  const processDataForView = (): EventData[] => {
    if (!statistics) return [];
    return processStatisticsData(statistics).map((data) => ({
      ...data,
      // attendees: [] as Attendee[], // Initialize empty attendees array
    }));
  };

  const viewData = processDataForView();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-500">
          Error loading statistics: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Event Statistics Dashboard
        </h1>
        <Card className="overflow-hidden bg-white/50 shadow-xl backdrop-blur-lg dark:bg-gray-800/50">
          <Tabs defaultValue="yearly" className="w-full">
            <CardHeader>
              <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  Statistics Overview
                </CardTitle>
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  <TabsTrigger
                    value="yearly"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
                  >
                    <LineChart className="mr-2 h-4 w-4" />
                    Yearly
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
                  >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="daily"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    Daily
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="yearly" className="mt-6">
                <CardDescription className="mb-4">
                  Event data for the year {selectedYear}
                </CardDescription>
                <Select
                  value={selectedYear}
                  onValueChange={(value) => setSelectedYear(value)}
                >
                  <SelectTrigger className="mb-6 w-full sm:w-[200px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(5)].map((_, i) => (
                      <SelectItem
                        key={i}
                        value={(new Date().getFullYear() - i).toString()}
                      >
                        {new Date().getFullYear() - i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AnnualView data={viewData} />
              </TabsContent>
              <TabsContent value="monthly" className="mt-6">
                <CardDescription className="mb-4">
                  Event data for{" "}
                  {new Date(
                    parseInt(selectedYear),
                    parseInt(selectedMonth) - 1,
                  ).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardDescription>
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Select
                    value={selectedYear}
                    onValueChange={(value) => setSelectedYear(value)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(5)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={(new Date().getFullYear() - i).toString()}
                        >
                          {new Date().getFullYear() - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedMonth}
                    onValueChange={(value) => setSelectedMonth(value)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={(i + 1).toString().padStart(2, "0")}
                        >
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <MonthlyView data={viewData} />
              </TabsContent>
              <TabsContent value="daily" className="mt-6">
                <CardDescription className="mb-4">
                  Event data for{" "}
                  {new Date(
                    parseInt(selectedYear),
                    parseInt(selectedMonth) - 1,
                    parseInt(selectedDay),
                  ).toLocaleDateString()}
                </CardDescription>
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Select
                    value={selectedYear}
                    onValueChange={(value) => setSelectedYear(value)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(5)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={(new Date().getFullYear() - i).toString()}
                        >
                          {new Date().getFullYear() - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedMonth}
                    onValueChange={(value) => setSelectedMonth(value)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={(i + 1).toString().padStart(2, "0")}
                        >
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedDay}
                    onValueChange={(value) => setSelectedDay(value)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(31)].map((_, i) => (
                        <SelectItem
                          key={i}
                          value={(i + 1).toString().padStart(2, "0")}
                        >
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DailyView data={viewData} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
