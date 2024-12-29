export interface TicketType {
  id: number;
  ticketType: string;
  price: number;
  availableSeats: number;
  eventId: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
