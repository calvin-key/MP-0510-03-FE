import Image from "next/image";
import { Star, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  name: string;
  date: string;
  ticketsSold: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  customerName: string;
  customerAvatar: string;
}

interface OrganizerDetailProps {
  name: string;
  avatar: string;
  bio: string;
  events: Event[];
  reviews: Review[];
}

export default function OrganizerDetailPage({
  name,
  avatar,
  bio,
  events,
  reviews,
}: OrganizerDetailProps) {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-muted-foreground">{bio}</p>
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-current text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.map((event) => (
            <div
              key={event.id}
              className="mb-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {event.date}
                </div>
              </div>
              <Badge variant="secondary">
                {event.ticketsSold} tickets sold
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-4 last:border-b-0">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={review.customerAvatar}
                    alt={review.customerName}
                  />
                  <AvatarFallback>
                    {review.customerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.customerName}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
