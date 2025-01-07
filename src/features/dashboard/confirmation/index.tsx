"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserTransactions } from "@/hooks/api/update-transaction-status/useGetUserTransaction";
import { useUpdateTransactionStatus } from "@/hooks/api/update-transaction-status/useUpdateTransactionStatus";
import { Transaction } from "@/types/transaction";
import Image from "next/image";
import { useState } from "react";
import TransactionsTable from "./components/TransactionTable";

const TransactionsPage = () => {
  const { data: transactions, isLoading, isError } = useGetUserTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [notes, setNotes] = useState("");

  const {
    mutate: updateTransactionStatus,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateTransactionStatus();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error loading transactions</div>;

  const transactionsArray = Array.isArray(transactions) ? transactions : [];

  const filterTransactionsByStatus = (
    status: Transaction["status"][],
  ): Transaction[] => {
    return transactionsArray.filter((transaction: Transaction) =>
      status.includes(transaction.status),
    );
  };

  const handleAccept = async (transaction: Transaction): Promise<void> => {
    try {
      updateTransactionStatus({
        transactionId: transaction.id,
        status: "done",
        notes,
      });
    } catch (error) {
      console.error("Error accepting transaction:", error);
    }
  };

  const handleReject = async (transaction: Transaction): Promise<void> => {
    try {
      updateTransactionStatus({
        transactionId: transaction.id,
        status: "rejected",
        notes,
      });
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
  };

  const getTabTransactions = (tabValue: string): Transaction[] => {
    switch (tabValue) {
      case "pending":
        return filterTransactionsByStatus([
          "waiting_for_payment",
          "waiting_for_admin_confirmation",
        ]);
      case "approved":
        return filterTransactionsByStatus(["done"]);
      case "rejected":
        return filterTransactionsByStatus(["rejected", "expired", "canceled"]);
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-3xl font-bold">Transaction Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            Manage incoming payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Failed</TabsTrigger>
            </TabsList>
            {["pending", "approved", "rejected"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>
                <TransactionsTable
                  transactions={getTabTransactions(tabValue)}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  setSelectedTransaction={setSelectedTransaction}
                  notes={notes}
                  setNotes={setNotes}
                  isUpdating={isUpdating}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Payment Proof</DialogTitle>
              <DialogDescription>
                Transaction ID: {selectedTransaction.id}
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction.paymentProof && (
              <div className="mt-4">
                <Image
                  src={selectedTransaction.paymentProof}
                  alt="Payment Proof"
                  width={400}
                  height={300}
                  className="rounded-md"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      {updateError && (
        <div
          className="fixed bottom-4 right-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            Failed to update transaction status.
          </span>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
