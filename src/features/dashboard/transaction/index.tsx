"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Transaction {
  id: string;
  eventName: string;
  customerName: string;
  date: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  paymentProof: string;
}

const TransactionPage: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TRX001",
      eventName: "Summer Festival",
      customerName: "John Doe",
      date: "2024-03-27",
      amount: 150000,
      status: "pending",
      paymentProof: "/api/placeholder/400/300",
    },
  ]);

  const handleAction = (
    transactionId: string,
    action: "approved" | "rejected",
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((trx) =>
        trx.id === transactionId ? { ...trx, status: action } : trx,
      ),
    );
    setSelectedTransaction(null);
    setIsEditing(false);
  };

  const handleEdit = (transactionId: string) => {
    const transaction = transactions.find((trx) => trx.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setIsEditing(true);
    }
  };

  const handleDelete = (transactionId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((trx) => trx.id !== transactionId),
    );
    setSelectedTransaction(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      rejected: "bg-rose-100 text-rose-800 hover:bg-rose-200",
      pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    };
    return styles[status as keyof typeof styles];
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="mx-auto max-w-7xl bg-[#FFF7E6] shadow-lg">
        <CardHeader className="border-b bg-[#FFD48A] px-6 py-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Transaction Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FFB347]">
                  <TableHead className="py-4 font-semibold text-gray-900">
                    Transaction ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Event
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Date
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b hover:bg-[#FFE4B5]"
                  >
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.eventName}</TableCell>
                    <TableCell>{transaction.customerName}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      Rp {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(transaction.status)}>
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(transaction.id)}
                          className="border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(transaction.id)}
                          className="bg-rose-500 hover:bg-rose-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedTransaction} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl bg-[#FFF7E6]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Edit Transaction
            </DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Transaction ID:
                  </p>
                  <p className="mt-1 text-gray-900">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Event:</p>
                  <p className="mt-1 text-gray-900">
                    {selectedTransaction.eventName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Customer:
                  </p>
                  <p className="mt-1 text-gray-900">
                    {selectedTransaction.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Amount:</p>
                  <p className="mt-1 text-gray-900">
                    Rp {selectedTransaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Status:
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      handleAction(selectedTransaction.id, "rejected")
                    }
                    className={`$ {selectedTransaction.status === "rejected" ? "bg-rose-600 text-white" : "bg-rose-100 hover:bg-rose-200" } text-rose-800`}
                  >
                    Rejected
                  </Button>
                  <Button
                    onClick={() =>
                      handleAction(selectedTransaction.id, "approved")
                    }
                    className={`$ {selectedTransaction.status === "approved" ? "bg-emerald-600 text-white" : "bg-emerald-100 hover:bg-emerald-200" } text-emerald-800`}
                  >
                    Approved
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Payment Proof:
                </p>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={selectedTransaction.paymentProof}
                    alt="Payment Proof"
                    width={400}
                    height={300}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="border-gray-200 hover:bg-gray-100"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionPage;
