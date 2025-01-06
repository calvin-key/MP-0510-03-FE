"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface UseGetUserParams {
  token?: string;
}

export interface Coupon {
  id: string;
  code: string;
  nominal: number;
  expiredAt: string;
  isDeleted: boolean;
}

export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  isUsed: boolean;
  coupon: Coupon;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string | null;
  referralCode: string;
  role: string;
  pointsBalance: number;
  pointsExpiryDate: string;
  userCoupons: UserCoupon[];
}

const useGetUser = ({ token }: UseGetUserParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/user/profile");
      return data;
    },
    enabled: !!token,
  });
};

export default useGetUser;
