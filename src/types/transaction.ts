import { PaginationMeta } from "./pagination";

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

export interface TransactionItem {
  id: number;
  transactionId: number;
  ticketTypeId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
  ticketType: {
    id: number;
    ticketType: string;
    price: number;
    availableSeats: number;
    eventId: number;
  };
}

export interface TransactionResponse {
  data: Transaction[];
  meta: PaginationMeta;
}
