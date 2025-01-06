import { Event } from "./event";

export interface TicketType {
  id: number;
  ticketType: string;
  price: number;
  availableSeats: number;
  eventId: number;
  event: Event;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
