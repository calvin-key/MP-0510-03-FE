// types/transaction.ts
export interface Transaction {
  id: string;
  eventName: string;
  customerName: string;
  amount: number;
  paymentProof: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}
