import { EventCategory } from "./eventCategory";
import { Organizer } from "./organizer";
import { TicketType } from "./ticketTypes";

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
  organizer: Organizer;
  eventCategories: EventCategory[];
  ticketTypes: TicketType[];
  location: { city: string };
  // organizer: { fullName: string };
  // eventCategories: [{ name: string }];
  // ticketTypes: [{ price: number }];
  lowestPrice: number;
}
