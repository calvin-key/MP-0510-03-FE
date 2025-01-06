"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TransactionResponse } from "@/types/transaction";
import useRejectTransaction from "@/hooks/api/confirm-transaction/useRejectTransaction";
import useGetTransactions from "@/hooks/api/confirm-transaction/useGetTransaction";
import RejectTransactionDialog from "./components/RejectTransaction";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const TablePayments = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<TransactionResponse | null>(null);

  const { data: fetchedData, refetch } = useGetTransactions({
    page,
    search: "",
  });
  const { mutateAsync: rejectTransaction, isPending: isRejecting } =
    useRejectTransaction();

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleReject = async (id: string) => {
    await rejectTransaction(id);
    refetch();
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Payment Details</TableHead>
            <TableHead>Event Info</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((payment, index) => (
            <TableRow key={payment.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {index + 1 + data.meta.take * (page - 1)}
              </TableCell>
              <TableCell>
                <div className="flex items-start space-x-4">
                  {payment.paymentProof && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={payment.paymentProof}
                              alt="Payment proof"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="space-x-2"
                          >
                            <Link href={payment.paymentProof} target="_blank">
                              <Eye className="h-4 w-4" />
                              <span>View full image</span>
                            </Link>
                          </Button>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(payment.date), "PPP")}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{payment.eventName}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {payment.customerName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {payment.customerName}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(payment.status)}`}>
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <RejectTransactionDialog
                    onReject={() => handleReject(payment.id)}
                    isPending={isRejecting}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePayments;
