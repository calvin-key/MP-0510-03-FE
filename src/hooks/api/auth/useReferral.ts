// hooks/useReferralSystem.ts
import { useState } from "react";

interface ReferralReward {
  referrerCode?: string;
  userId: string; // Required for all rewards
  recipientId?: string; // Optional, used when giving points to referrer
  rewardType: "POINTS" | "COUPON";
  pointsAmount?: number;
  couponCode?: string;
  discountAmount?: number;
  expiresAt: Date;
}

export const useReferral = () => {
  const [isValidating, setIsValidating] = useState(false);

  const validateReferral = async (code: string): Promise<boolean> => {
    setIsValidating(true);
    try {
      const response = await fetch(`/api/referral/validate/${code}`);
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error("Error validating referral:", error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const createReferralReward = async (
    reward: ReferralReward,
  ): Promise<void> => {
    try {
      await fetch("/api/referral/reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reward),
      });
    } catch (error) {
      console.error("Error creating referral reward:", error);
      throw error;
    }
  };

  return {
    validateReferral,
    createReferralReward,
    isValidating,
  };
};
