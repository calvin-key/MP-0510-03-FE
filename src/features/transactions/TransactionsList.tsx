"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Ticket, TicketX } from "lucide-react";
import { Transaction } from "@/types/transaction";
import { useGetUserTransactions } from "@/hooks/api/transaction/useGetUserTransactions";
import TransactionSkeleton from "./components/TransactionsSkeleton";

const UserTransactions = () => {
  const { data: transactions, isLoading } = useGetUserTransactions();
  const router = useRouter();

  if (isLoading) return <TransactionSkeleton />;

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4">
        <TicketX className="h-12 w-12 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">No Orders</p>
      </div>
    );
  }

  const getStatusBadgeVariant = (
    status: string | undefined,
  ): "secondary" | "destructive" | "outline" | "default" => {
    switch (status) {
      case "waiting_for_payment":
        return "default";
      case "waiting_for_admin_confirmation":
        return "secondary";
      case "done":
        return "default";
      case "rejected":
        return "destructive";
      case "expired":
        return "destructive";
      case "canceled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h1>
      <div className="space-y-4">
        {transactions?.map((transaction: Transaction) => (
          <Card
            key={transaction.id}
            onClick={() => router.push(`/transactions/${transaction.id}`)}
            className="cursor-pointer transition-colors hover:bg-orange-200"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div className="space-y-2">
                  <h2 className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                    <Ticket className="h-4 w-4" />
                    {transaction.items[0]?.ticketType.event.name}
                  </h2>
                  <div className="flex flex-col space-y-2 text-gray-600 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {transaction.items[0]?.ticketType.event.location?.city}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(
                          transaction.items[0]?.ticketType.event.startDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status.replace(/_/g, " ")}
                  </Badge>
                  <p className="font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.totalPrice)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserTransactions;
