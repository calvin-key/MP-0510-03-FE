export interface Voucher {
  id: number;
  eventId: number;
  code: string;
  description: string;
  nominal: number;
  quantity: number;
  startAt: Date;
  expiresAt: Date;
}

export interface VoucherUsage {
  id: number;
  userId: number;
  voucherId: number;
  createdAt: Date;
}
