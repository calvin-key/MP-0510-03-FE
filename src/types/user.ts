export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  profilePicture: string;
  referralCode: string;
  pointsBalance: number;
  pointsExpiryDate: Date;
  address?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
