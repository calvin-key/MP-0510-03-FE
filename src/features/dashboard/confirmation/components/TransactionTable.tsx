import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PaymentProofModal } from "./PaymentProof";

interface TransactionsTableProps {
  transactions: Transaction[];
  onAccept: (transaction: Transaction) => Promise<void>;
  onReject: (transaction: Transaction) => Promise<void>;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  notes: string;
  setNotes: (notes: string) => void;
  isUpdating: boolean;
}

const TransactionsTable = ({
  transactions,
  onAccept,
  onReject,
  setSelectedTransaction,
  notes,
  setNotes,
  isUpdating,
}: TransactionsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState("");
  const [localTransactions, setLocalTransactions] =
    useState<Transaction[]>(transactions);

  if (!localTransactions || localTransactions.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
        No transactions found
      </div>
    );
  }

  const handleViewProof = (transaction: Transaction) => {
    if (transaction.paymentProof) {
      setSelectedProofUrl(transaction.paymentProof);
      setIsModalOpen(true);
      setSelectedTransaction(transaction);
    }
  };

  const handleAccept = async (transaction: Transaction) => {
    await onAccept(transaction);
    setLocalTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === transaction.id ? { ...t, status: "done" } : t,
      ),
    );
  };

  const handleReject = async (transaction: Transaction) => {
    await onReject(transaction);
    setLocalTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === transaction.id ? { ...t, status: "rejected" } : t,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      done: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      waiting_for_admin_confirmation: "bg-yellow-100 text-yellow-800",
      waiting_for_payment: "bg-blue-100 text-blue-800",
      expired: "bg-gray-100 text-gray-800",
      canceled: "bg-gray-100 text-gray-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-4 text-center font-semibold">
                ID
              </TableHead>
              <TableHead className="text-center font-semibold">Event</TableHead>
              <TableHead className="text-center font-semibold">
                Customer
              </TableHead>
              <TableHead className="text-center font-semibold">
                Status
              </TableHead>
              <TableHead className="text-center font-semibold">
                Amount
              </TableHead>
              <TableHead className="text-center font-semibold">Date</TableHead>
              <TableHead className="text-center font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell className="py-4 text-center">
                  {transaction.id}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.TicketType?.event.name || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {transaction.user.fullName}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(transaction.status)}`}
                  >
                    {transaction.status.replace(/_/g, " ").toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(transaction.totalPrice)}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {transaction.paymentProof && (
                      <Button
                        variant="outline"
                        onClick={() => handleViewProof(transaction)}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        View Proof
                      </Button>
                    )}
                    {transaction.status ===
                      "waiting_for_admin_confirmation" && (
                      <>
                        <Button
                          variant="default"
                          onClick={() => handleAccept(transaction)}
                          disabled={isUpdating}
                          className="bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(transaction)}
                          disabled={isUpdating}
                          className="px-4 py-2"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mx-auto max-w-2xl space-y-2">
        <label className="mb-2 block text-sm font-medium">Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this transaction..."
          disabled={isUpdating}
          className="min-h-[100px] p-3"
        />
      </div>

      <PaymentProofModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedProofUrl}
      />
    </div>
  );
};

export default TransactionsTable;
