"use client";

import React from "react";
import { useFormik } from "formik";
import {
  Plus,
  Search,
  Calendar,
  Users,
  MapPin,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed";
  attendees: number;
  price: number;
  image: string;
}

interface FilterFormValues {
  searchQuery: string;
  category: string;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    category: "Music",
    date: "2024-07-15",
    location: "Central Park, NY",
    status: "upcoming",
    attendees: 500,
    price: 99.99,
    image: "/api/placeholder/400/200",
  },
  {
    id: "2",
    title: "Tech Conference 2024",
    category: "Technology",
    date: "2024-08-20",
    location: "Convention Center, SF",
    status: "upcoming",
    attendees: 300,
    price: 199.99,
    image: "/api/placeholder/400/200",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "music", label: "Music" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
];

export default function EventListPage() {
  const router = useRouter();

  const formik = useFormik<FilterFormValues>({
    initialValues: {
      searchQuery: "",
      category: "all",
    },
    onSubmit: (values) => {
      console.log("Filter values:", values);
    },
  });

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(formik.values.searchQuery.toLowerCase());
    const matchesCategory =
      formik.values.category === "all" ||
      event.category.toLowerCase() === formik.values.category;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Event["status"]) => {
    const baseStyles = "rounded-full px-2 py-1 text-xs font-medium text-white";
    switch (status) {
      case "upcoming":
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-blue-600`;
      case "ongoing":
        return `${baseStyles} bg-gradient-to-r from-green-500 to-green-600`;
      case "completed":
        return `${baseStyles} bg-gradient-to-r from-gray-500 to-gray-600`;
      default:
        return `${baseStyles} bg-gradient-to-r from-gray-500 to-gray-600`;
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="mt-2 text-gray-500">
            Create and manage your upcoming events
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/create-event")}
          className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
        >
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="searchQuery"
              placeholder="Search events..."
              className="pl-10"
              value={formik.values.searchQuery}
              onChange={formik.handleChange}
            />
          </div>
          <Select
            value={formik.values.category}
            onValueChange={(value) => formik.setFieldValue("category", value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge
                  className={`absolute left-4 top-4 ${getStatusColor(
                    event.status,
                  )}`}
                >
                  {event.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="gap-2">
                      Edit <ChevronRight className="ml-auto h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      View Details <ChevronRight className="ml-auto h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <CardContent className="p-4">
                <h3 className="mb-3 text-xl font-bold tracking-tight">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    {event.attendees.toLocaleString()} attendees
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    ${event.price.toFixed(2)}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-600"
                  >
                    {event.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert className="mx-auto mt-8 max-w-md bg-gray-50">
          <AlertDescription className="text-center">
            No events found matching your search criteria.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
