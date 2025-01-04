import { User } from "./user";

export interface Coupon {
  id: number;
  code: string;
  nominal: number;
  expiredAt: Date;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCoupon {
  id: number;
  userId: number;
  couponId: number;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  coupon?: Coupon;
}
