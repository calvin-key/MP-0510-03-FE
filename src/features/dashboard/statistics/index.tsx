// app/statistics/page.tsx
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Types for our statistics data
interface StatData {
  date: string;
  value: number;
  category: string;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
}

// Schema for form validation
const statisticsFormSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  groupBy: z.enum(["day", "month", "year"]),
  category: z.string(),
});

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Stats Card Component
const StatsCard = ({
  title,
  value,
  description,
  className,
}: StatsCardProps) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const StatisticsPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  // Mock data - replace with real API call
  const mockData: StatData[] = [
    { date: "2024-01", value: 400, category: "Events" },
    { date: "2024-02", value: 300, category: "Events" },
    { date: "2024-03", value: 600, category: "Events" },
    { date: "2024-04", value: 800, category: "Events" },
    { date: "2024-05", value: 700, category: "Events" },
  ];

  const form = useFormik({
    initialValues: {
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 20),
      },
      groupBy: "month",
      category: "all",
    },
    onSubmit: async (values) => {
      // Handle form submission - fetch data based on filters
      console.log(values);
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Statistics Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Analyze your event data with interactive visualizations
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {/* <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      /> */}
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Group By</label>
                  <Select
                    onValueChange={(value) =>
                      form.setFieldValue("groupBy", value)
                    }
                    defaultValue={form.values.groupBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    onValueChange={(value) =>
                      form.setFieldValue("category", value)
                    }
                    defaultValue={form.values.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Apply Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Chart Type Selection */}
        <div className="mb-6 flex space-x-4">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            onClick={() => setChartType("line")}
          >
            Line Chart
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === "pie" ? "default" : "outline"}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
          </Button>
        </div>

        {/* Charts Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <ResponsiveContainer>
                {chartType === "line" ? (
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                ) : chartType === "bar" ? (
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={mockData}
                      dataKey="value"
                      nameKey="date"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {mockData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <StatsCard
            title="Total Events"
            value={mockData.reduce((acc, curr) => acc + curr.value, 0)}
            description="Total number of events in selected period"
          />
          <StatsCard
            title="Average per Period"
            value={Math.round(
              mockData.reduce((acc, curr) => acc + curr.value, 0) /
                mockData.length,
            )}
            description="Average events per time period"
          />
          <StatsCard
            title="Peak Count"
            value={Math.max(...mockData.map((d) => d.value))}
            description="Highest number of events in a single period"
          />
          <StatsCard
            title="Growth Rate"
            value={`${(((mockData[mockData.length - 1].value - mockData[0].value) / mockData[0].value) * 100).toFixed(1)}%`}
            description="Growth rate over selected period"
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
