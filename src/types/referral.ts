import { User } from "./user";

export interface RefferalHistory {
  id: number;
  referrerId: number;
  referredId: number;
  pointsAwarded: number;
  createdAt: Date;
  updatedAt: Date;
  referrer: Pick<User, "fullName">;
  referred: Pick<User, "fullName">;
}
