import { Coupon } from "./coupon";
import { TicketType } from "./ticketTypes";
import { User } from "./user";

export interface Voucher {
  id: number;
  code: string;
  description: string;
  nominal: number;
  quantity: number;
  usageCount: number;
  eventId: number;
  startAt: Date;
  expiresAt: Date;
}

export interface TransactionModalProps {
  eventId: number;
  eventName: string;
  location: string;
  dateTime: string;
  ticketTypes: TicketType[];
  userPoints: number;
  availableVouchers: Voucher[];
}

export interface CreateTransactionRequest {
  tickets: {
    ticketTypeId: number;
    quantity: number;
  }[];
  pointsUsed?: number;
  voucherId?: number;
  couponCode?: string;
  couponId?: number;
}

export interface TransactionItem {
  ticketType: TicketType;
  id: number;
  transactionId: number;
  ticketTypeId: number;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface Transaction {
  id: number;
  userId: number;
  pointsUsed: number;
  voucherId?: number;
  couponId?: number;
  totalPrice: number;
  voucher: Voucher;
  coupon: Coupon;
  TicketType: TicketType;
  user: User;
  status:
    | "waiting_for_payment"
    | "waiting_for_admin_confirmation"
    | "done"
    | "rejected"
    | "expired"
    | "canceled";
  paymentProof?: string;
  expiresAt: Date;
  confirmedAt?: Date;
  items: TransactionItem[];
  createdAt: Date;
}
