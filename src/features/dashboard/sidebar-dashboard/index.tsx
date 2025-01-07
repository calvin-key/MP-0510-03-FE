"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthlyView } from "./components/MonthlyView";
import { DailyView } from "./components/DailyView";
import { AnnualView } from "./components/AnnualView";
import useGetEventStatistics from "@/hooks/api/statistic/useGetEventsStatistic";

const StatisticPage = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const {
    data: dailyData,
    isLoading: isLoadingDaily,
    error: errorDaily,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
    month: selectedMonth.toString(),
    day: selectedDay.toString(),
  });

  const {
    data: monthlyData,
    isLoading: isLoadingMonthly,
    error: errorMonthly,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
    month: selectedMonth.toString(),
  });

  const {
    data: yearlyData,
    isLoading: isLoadingYearly,
    error: errorYearly,
  } = useGetEventStatistics({
    year: selectedYear.toString(),
  });

  return (
    <div className="container mx-auto max-h-[80vh] overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl font-bold sm:text-3xl">
        Event Statistics Dashboard
      </h1>
      <Tabs defaultValue="yearly" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>

        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Statistics</CardTitle>
              <CardDescription>Data for {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="mb-4 w-full sm:w-[180px]">
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
              {isLoadingYearly ? (
                <p>Loading...</p>
              ) : errorYearly ? (
                <p>Error: {errorYearly.message}</p>
              ) : (
                yearlyData && <AnnualView data={yearlyData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Statistics</CardTitle>
              <CardDescription>
                Data for{" "}
                {new Date(selectedYear, selectedMonth - 1).toLocaleString(
                  "default",
                  { month: "long", year: "numeric" },
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <Select
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {isLoadingMonthly ? (
                <p>Loading...</p>
              ) : errorMonthly ? (
                <p>Error: {errorMonthly.message}</p>
              ) : (
                monthlyData && <MonthlyView data={monthlyData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Statistics</CardTitle>
              <CardDescription>
                Data for{" "}
                {new Date(
                  selectedYear,
                  selectedMonth - 1,
                  selectedDay,
                ).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <Select
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedDay(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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
              {isLoadingDaily ? (
                <p>Loading...</p>
              ) : errorDaily ? (
                <p>Error: {errorDaily.message}</p>
              ) : (
                dailyData && <DailyView data={dailyData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticPage;
