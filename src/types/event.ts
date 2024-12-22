export interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
  locationId: number;
  address: string;
  specificLocation: string;
  startDate: Date;
  endDate: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  organizer: { fullName: string };
  eventCategories: [{ name: string }];
  ticketTypes: [{ price: number }];
  lowestPrice: number;
}
