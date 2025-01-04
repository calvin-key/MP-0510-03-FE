export interface Review {
  id: number;
  userId: number;
  eventId: number;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: { fullName: string; email: string; phoneNumber: string };
  event: {
    name: string;
    category: { id: number; name: string };
    userId: number;
  };
} // organizer
