export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  referralCode: string;
  role: string;
  profilePicture?: string;
  phoneNumber?: string;
  address?: string;
}
