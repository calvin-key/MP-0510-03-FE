export interface Attendee {
  id: number;
  name: string;
  ticketQuantity: number;
  totalPaid: number;
}

export interface EventData {
  id: number;
  name: string;
  date: Date;
  ticketsSold: number;
  revenue: number;
  attendance: number;
  attendees: Attendee[];
}

export const mockEventData: EventData[] = [
  {
    id: 1,
    name: "New Year's Eve Party",
    date: new Date("2023-12-31"),
    ticketsSold: 500,
    revenue: 25000,
    attendance: 480,
    attendees: [
      { id: 1, name: "John Doe", ticketQuantity: 2, totalPaid: 100 },
      { id: 2, name: "Jane Smith", ticketQuantity: 1, totalPaid: 50 },
      { id: 3, name: "Bob Johnson", ticketQuantity: 3, totalPaid: 150 },
    ],
  },
  {
    id: 2,
    name: "Valentine's Day Concert",
    date: new Date("2023-02-14"),
    ticketsSold: 300,
    revenue: 15000,
    attendance: 290,
    attendees: [
      { id: 4, name: "Alice Brown", ticketQuantity: 2, totalPaid: 100 },
      { id: 5, name: "Charlie Davis", ticketQuantity: 1, totalPaid: 50 },
    ],
  },
  {
    id: 3,
    name: "Summer Music Festival",
    date: new Date("2023-07-15"),
    ticketsSold: 1000,
    revenue: 50000,
    attendance: 950,
    attendees: [],
  },
  {
    id: 4,
    name: "Halloween Costume Party",
    date: new Date("2023-10-31"),
    ticketsSold: 400,
    revenue: 20000,
    attendance: 380,
    attendees: [],
  },
  {
    id: 5,
    name: "Christmas Market",
    date: new Date("2023-12-20"),
    ticketsSold: 800,
    revenue: 40000,
    attendance: 750,
    attendees: [],
  },
  {
    id: 6,
    name: "Spring Food Festival",
    date: new Date("2023-04-10"),
    ticketsSold: 600,
    revenue: 30000,
    attendance: 580,
    attendees: [],
  },
  {
    id: 7,
    name: "Tech Conference",
    date: new Date("2023-09-05"),
    ticketsSold: 350,
    revenue: 35000,
    attendance: 340,
    attendees: [],
  },
  {
    id: 8,
    name: "Art Exhibition",
    date: new Date("2023-11-15"),
    ticketsSold: 250,
    revenue: 12500,
    attendance: 240,
    attendees: [],
  },
];

export interface Transaction {
  id: number;
  attendeeId: number;
  attendeeName: string;
  eventId: number;
  eventName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  paymentProof: string;
  notes?: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    attendeeId: 1,
    attendeeName: "John Doe",
    eventId: 1,
    eventName: "New Year's Eve Party",
    amount: 100,
    status: "pending",
    paymentProof: "/payment-proof-1.jpg",
  },
  {
    id: 2,
    attendeeId: 2,
    attendeeName: "Jane Smith",
    eventId: 1,
    eventName: "New Year's Eve Party",
    amount: 50,
    status: "pending",
    paymentProof: "/payment-proof-2.jpg",
  },
  {
    id: 3,
    attendeeId: 4,
    attendeeName: "Alice Brown",
    eventId: 2,
    eventName: "Valentine's Day Concert",
    amount: 100,
    status: "pending",
    paymentProof: "/payment-proof-3.jpg",
  },
  {
    id: 4,
    attendeeId: 5,
    attendeeName: "Charlie Davis",
    eventId: 2,
    eventName: "Valentine's Day Concert",
    amount: 50,
    status: "pending",
    paymentProof: "/payment-proof-4.jpg",
  },
];

export const getEventsByYear = (events: EventData[], year: number) => {
  return events.filter((event) => event.date.getFullYear() === year);
};

export const getEventsByMonth = (
  events: EventData[],
  year: number,
  month: number,
) => {
  return events.filter(
    (event) =>
      event.date.getFullYear() === year && event.date.getMonth() === month,
  );
};

export const getEventsByDay = (
  events: EventData[],
  year: number,
  month: number,
  day: number,
) => {
  return events.filter(
    (event) =>
      event.date.getFullYear() === year &&
      event.date.getMonth() === month &&
      event.date.getDate() === day,
  );
};

export const aggregateDataByMonth = (events: EventData[]) => {
  const aggregatedData = new Array(12)
    .fill(0)
    .map(() => ({ ticketsSold: 0, revenue: 0, attendance: 0 }));
  events.forEach((event) => {
    const month = event.date.getMonth();
    aggregatedData[month].ticketsSold += event.ticketsSold;
    aggregatedData[month].revenue += event.revenue;
    aggregatedData[month].attendance += event.attendance;
  });
  return aggregatedData;
};

export const getTransactionsByStatus = (
  transactions: Transaction[],
  status: "pending" | "approved" | "rejected",
) => {
  return transactions.filter((transaction) => transaction.status === status);
};
