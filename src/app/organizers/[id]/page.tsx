import OrganizerDetailPage from "@/features/organizer/OrganizerDetailPage";

const sampleData = {
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=96&width=96",
  bio: "Experienced event organizer with a passion for creating unforgettable experiences.",
  events: [
    {
      id: "1",
      name: "Summer Music Festival",
      date: "2023-07-15",
      ticketsSold: 5000,
    },
    {
      id: "2",
      name: "Tech Conference 2023",
      date: "2023-09-22",
      ticketsSold: 1200,
    },
    {
      id: "3",
      name: "Food & Wine Expo",
      date: "2023-10-05",
      ticketsSold: 3000,
    },
  ],
  reviews: [
    {
      id: "1",
      rating: 5,
      comment: "Amazing organizer! The event was flawless.",
      customerName: "John Smith",
      customerAvatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      rating: 4,
      comment: "Great experience overall. Looking forward to the next event!",
      customerName: "Emily Brown",
      customerAvatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      rating: 5,
      comment: "Jane's attention to detail made the event truly special.",
      customerName: "Michael Johnson",
      customerAvatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

const organizerDetail = () => {
  return <OrganizerDetailPage {...sampleData} />;
};

export default organizerDetail;
