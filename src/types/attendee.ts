export interface Attendee {
  id: number;
  name: string;
  ticketCount: number;
  totalPrice: number;
}

export interface AttendeeListResponse {
  data: Attendee[];
  meta: {
    page: number;
    take: number;
    totalPages: number;
    total: number;
  };
}
