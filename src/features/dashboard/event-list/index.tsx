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
  Edit,
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
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useOrganizerEvents from "@/hooks/api/event/useGetOrganizerEvents";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EventListPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      searchQuery: "",
      category: "all",
      city: "",
    },
    onSubmit: (values) => {
      console.log("Filter values:", values);
    },
  });

  const { data: events, isLoading, error } = useOrganizerEvents();

  React.useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  if (!session) return <LoadingScreen />;
  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <Alert className="mx-auto mt-8 max-w-2xl">
        <AlertDescription>
          Error loading events: {(error as Error).message}
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="min-h-auto bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
              <p className="mt-2 text-gray-600">Manage your created events</p>
            </div>
            <Button
              onClick={() => router.push("/dashboard/create-event")}
              className="gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700"
            >
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </div>

          {/* Filter Section */}
          <form onSubmit={formik.handleSubmit} className="mt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  name="searchQuery"
                  placeholder="Search events..."
                  className="border-gray-200 bg-gray-50 pl-10"
                  value={formik.values.searchQuery}
                  onChange={formik.handleChange}
                />
              </div>
              <Select
                value={formik.values.category}
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
              >
                <SelectTrigger className="w-full border-gray-200 bg-gray-50 md:w-[200px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: "all", label: "All Categories" },
                    { value: "music", label: "Music" },
                    { value: "technology", label: "Technology" },
                    { value: "sports", label: "Sports" },
                  ].map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                name="city"
                placeholder="Enter city..."
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full border-gray-200 bg-gray-50 md:w-[200px]"
              />
            </div>
          </form>
        </div>

        {/* Events Grid */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={event.image || "/api/placeholder/400/200"}
                    alt={event.name}
                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Badge className="absolute right-4 top-4 bg-white/90 px-3 py-1 text-gray-900">
                    <Calendar className="mr-2 inline-block h-4 w-4" />
                    {new Date(event.startDate).toLocaleDateString("en-ID", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900">
                    {event.name}
                  </h3>
                  <p className="mb-4 flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.address || "Unknown Location"}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700"
                    >
                      {new Date(event.startDate).toLocaleTimeString("en-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Badge>
                    <Link href={`/dashboard/edit-event/${event.id}`}>
                      <Button
                        variant="outline"
                        className="gap-2 hover:bg-orange-50"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Alert className="bg-white shadow-sm">
            <AlertDescription className="flex items-center justify-center py-8 text-gray-600">
              You haven't created any events yet. Click "Create Event" to get
              started!
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
