// lib/utils/referral.ts
import { customAlphabet } from "nanoid";

// Generate referral code using uppercase letters and numbers
export const generateReferralCode = (): string => {
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
  return nanoid();
};

// Generate unique coupon code
export const generateCouponCode = (): string => {
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
  return `WELCOME${nanoid()}`;
};

// Calculate expiration date (3 months from now)
export const calculateExpirationDate = (): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  return date;
};

// Validate if points/coupon is expired
export const isExpired = (expirationDate: Date): boolean => {
  return new Date() > new Date(expirationDate);
};
