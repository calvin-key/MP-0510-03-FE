// src/app/attendedList.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import useAttendeeList from "@/hooks/api/auth/useAttendeeList";

export default function AttendedList() {
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("eventStartDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useAttendeeList({
    page: currentPage,
    take: 10,
    sortBy,
    sortOrder,
    eventId: selectedEvent === "all" ? undefined : Number(selectedEvent),
    search: searchQuery,
  });

  // Handle error with toast
  useEffect(() => {
    if (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch attendee list",
      );
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendee List</h1>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search attendees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedEvent} onValueChange={setSelectedEvent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {/* Event list will come from your data */}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Available Seats</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>{attendee.eventName}</TableCell>
                <TableCell>{attendee.ticketType}</TableCell>
                <TableCell>{attendee.availableSeats}</TableCell>
                <TableCell>${attendee.price.toFixed(2)}</TableCell>
                <TableCell>${attendee.revenue.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(attendee.eventStartDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(attendee.eventEndDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data && data.meta.totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="rounded-md bg-gray-100 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {data.meta.totalPages}
          </span>
          <button
            disabled={currentPage === data.meta.totalPages}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(data.meta.totalPages || prev, prev + 1),
              )
            }
            className="rounded-md bg-gray-100 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
