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
import {
  getEventsByDay,
  getEventsByMonth,
  getEventsByYear,
} from "@/utils/eventDataManager";
import { AnnualView } from "../sidebar-dashboard/components/AnnualView";
import { MonthlyView } from "../sidebar-dashboard/components/MonthlyView";
import { DailyView } from "../sidebar-dashboard/components/DailyView";
import { CalendarIcon, BarChart2, PieChart, LineChart } from "lucide-react";

const StatisticsPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const yearlyData = getEventsByYear(selectedYear);
  const monthlyData = getEventsByMonth(selectedYear, selectedMonth);
  const dailyData = getEventsByDay(selectedYear, selectedMonth, selectedDay);

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
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
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
                <AnnualView data={yearlyData} />
              </TabsContent>
              <TabsContent value="monthly" className="mt-6">
                <CardDescription className="mb-4">
                  Event data for{" "}
                  {new Date(selectedYear, selectedMonth).toLocaleString(
                    "default",
                    { month: "long", year: "numeric" },
                  )}
                </CardDescription>
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Select
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
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
                    onValueChange={(value) => setSelectedMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <MonthlyView data={monthlyData} />
              </TabsContent>
              <TabsContent value="daily" className="mt-6">
                <CardDescription className="mb-4">
                  Event data for{" "}
                  {new Date(
                    selectedYear,
                    selectedMonth,
                    selectedDay,
                  ).toLocaleDateString()}
                </CardDescription>
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Select
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
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
                    onValueChange={(value) => setSelectedMonth(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => setSelectedDay(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(31)].map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DailyView data={dailyData} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
