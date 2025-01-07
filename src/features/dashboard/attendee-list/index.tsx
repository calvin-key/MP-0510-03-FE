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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrganizerEvents from "@/hooks/api/event/useGetOrganizerEvents";
import useGetAttendeesByEvent from "@/hooks/api/attendee-list/useGetAttendees";
import { Transaction } from "@/types/transaction";

interface Attendee {
  id?: number;
  name: string;
  ticketQuantity: number;
  totalPaid: number;
  transaction?: Transaction;
  createdAt: Date;
}

const AttendancePage = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useOrganizerEvents();

  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    error: errorAttendees,
  } = useGetAttendeesByEvent(selectedEventId || 0);

  const handleEventChange = (value: string) => {
    setSelectedEventId(Number(value));
  };

  const selectedEvent = events?.find((event) => event.id === selectedEventId);

  const totalTicketsSold =
    attendees?.reduce((acc, attendee) => acc + attendee.ticketCount, 0) || 0;
  const totalRevenue =
    attendees?.reduce((acc, attendee) => acc + (attendee.totalPrice || 0), 0) ||
    0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Event Attendees</h1>
      <Card>
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
          <CardDescription>View attendees for each event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select onValueChange={handleEventChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingEvents ? (
                  <SelectItem key="loading" value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : errorEvents ? (
                  <SelectItem key="error" value="error" disabled>
                    Error loading events
                  </SelectItem>
                ) : (
                  events?.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {isLoadingAttendees ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
              Loading attendees...
            </div>
          ) : errorAttendees ? (
            <div className="rounded-lg bg-red-50 p-8 text-center text-red-500">
              Error loading attendees: {errorAttendees.message}
            </div>
          ) : attendees && attendees.length > 0 ? (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="py-4 text-center font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Ticket Quantity
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendees.map((attendee, index) => (
                      <TableRow
                        key={`attendee-${attendee.id || index}`}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <TableCell className="py-4 text-center">
                          {attendee.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {attendee.ticketCount}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(attendee.totalPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {selectedEvent && (
                <div className="mx-auto max-w-2xl rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Event Summary</h3>
                  <div className="space-y-2">
                    <p>Total Attendees: {attendees.length}</p>
                    <p>Total Tickets Sold: {totalTicketsSold}</p>
                    <p>
                      Total Revenue:{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(totalRevenue)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
              No attendees available for this event.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
