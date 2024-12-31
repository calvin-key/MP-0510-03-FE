"use client";

import React from "react";
import { useFormik } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Edit,
  MoreVertical,
  Search,
  ChevronRight,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface FilterFormValues {
  search: string;
  status: string;
}

const stats = [
  {
    title: "Total Events",
    value: "12",
    icon: Calendar,
    trend: "+2 this month",
    color: "text-blue-600",
    trendColor: "text-green-500",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    title: "Active Vouchers",
    value: "8",
    icon: Ticket,
    trend: "3 expiring soon",
    color: "text-purple-600",
    trendColor: "text-orange-500",
    bgGradient: "from-purple-50 to-purple-100",
  },
  {
    title: "Total Attendees",
    value: "1,234",
    icon: Users,
    trend: "+156 this week",
    color: "text-green-600",
    trendColor: "text-green-500",
    bgGradient: "from-green-50 to-green-100",
  },
  {
    title: "Revenue",
    value: "$12,345",
    icon: DollarSign,
    trend: "+23% vs last month",
    color: "text-orange-600",
    trendColor: "text-green-500",
    bgGradient: "from-orange-50 to-orange-100",
  },
];

const upcomingEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "Mar 15, 2024",
    attendees: 120,
    status: "active",
    revenue: "$5,000",
  },
  {
    id: 2,
    name: "Digital Marketing Workshop",
    date: "Mar 20, 2024",
    attendees: 45,
    status: "active",
    revenue: "$2,250",
  },
  {
    id: 3,
    name: "Startup Networking Event",
    date: "Mar 25, 2024",
    attendees: 75,
    status: "draft",
    revenue: "$0",
  },
];

export default function SidebarDashboardPage() {
  const formik = useFormik<FilterFormValues>({
    initialValues: {
      search: "",
      status: "all",
    },
    onSubmit: (values) => {
      console.log("Filter values:", values);
    },
  });

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(formik.values.search.toLowerCase());
    const matchesStatus =
      formik.values.status === "all" || event.status === formik.values.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, Udin! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your events today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all hover:from-purple-700 hover:to-purple-800">
            <Link href="/dashboard/create-event">Create New Event</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`rounded-xl bg-gradient-to-br ${stat.bgGradient} p-3`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={`h-4 w-4 ${stat.trendColor}`} />
                    <span className={`text-sm ${stat.trendColor}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-medium text-gray-600">{stat.title}</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Events Table */}
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="border-b border-gray-100 bg-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl font-bold">Upcoming Events</CardTitle>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <form
                onSubmit={formik.handleSubmit}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="search"
                    placeholder="Search events..."
                    className="w-full pl-10 md:w-[200px]"
                    value={formik.values.search}
                    onChange={formik.handleChange}
                  />
                </div>
                <Select
                  value={formik.values.status}
                  onValueChange={(value) =>
                    formik.setFieldValue("status", value)
                  }
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </form>
              <Button variant="outline">View All</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="group transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {event.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      {event.attendees.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        event.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{event.revenue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-purple-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-purple-600"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2">
                            View Details
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            Create Voucher
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            View Attendees
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
