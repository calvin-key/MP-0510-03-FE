"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import useGetAttendeeList from "@/hooks/api/attendee-list/useGetAttendeeList";
import { Loader2, Search } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface Attendee {
  id: number;
  name: string;
  email: string;
  ticketDetails: {
    type: string;
    quantity: number;
    pricePerUnit: number;
  }[];
  totalQuantity: number;
  totalPrice: number;
  purchaseDate: string;
}

const AttendeeListPage = () => {
  const session = useSession();
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("desc");

  const { data: events, isPending: eventsLoading } = useGetEvents({
    category: session.data?.user.id?.toString(),
    take: 100,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: attendeeList, isPending: attendeesLoading } =
    useGetAttendeeList({
      eventId,
      page,
      take: 5,
      search,
      sortBy,
      sortOrder,
    });

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (eventsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!events?.data.length) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Event Visitor List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-10 text-center text-muted-foreground">
              No events available
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPages = attendeeList?.meta.totalPages ?? 1;

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengunjung Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <Select
              onValueChange={(value) =>
                setEventId(value ? Number(value) : undefined)
              }
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Pilih Event" />
              </SelectTrigger>
              <SelectContent>
                {events?.data.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pengunjung..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {attendeesLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full animate-pulse rounded-md bg-muted"
                />
              ))}
            </div>
          ) : !attendeeList?.data.length ? (
            <div className="py-10 text-center text-muted-foreground">
              Tidak ada data pengunjung
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Nama</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Detail Tiket</TableHead>
                    <TableHead className="text-center">Total Tiket</TableHead>
                    <TableHead className="text-center">
                      Total Pembayaran
                    </TableHead>
                    <TableHead className="text-center">
                      Tanggal Pembelian
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendeeList?.data.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell className="text-center">
                        {attendee.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {attendee.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {attendee.ticketDetails.map((ticket, idx) => (
                          <div key={idx}>
                            {ticket.type}: {ticket.quantity}x @
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(ticket.pricePerUnit)}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="text-center">
                        {attendee.totalQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(attendee.totalPrice)}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(attendee.purchaseDate).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {attendeeList && attendeeList.meta.totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onPageChange(Math.max(1, page - 1))}
                      className="cursor-pointer"
                      disabled={page === 1}
                    >
                      <PaginationPrevious className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <Button
                            variant={page === pageNum ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(pageNum)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </Button>
                        </PaginationItem>
                      );
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onPageChange(Math.min(totalPages, page + 1))
                      }
                      className="cursor-pointer"
                      disabled={page === totalPages}
                    >
                      <PaginationNext className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendeeListPage;
