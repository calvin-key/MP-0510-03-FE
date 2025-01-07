"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganizerDetail } from "@/hooks/api/user/useGetOrganizer";
import { Calendar, Star } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import OrganizerDetailSkeleton from "./component/OrganizerDetailSkeleton";

interface OrganizerDetailPageProps {
  organizerId: number;
}

const OrganizerDetailPage: FC<OrganizerDetailPageProps> = ({ organizerId }) => {
  const { data, isLoading, error } = useOrganizerDetail(organizerId);

  if (isLoading) return <OrganizerDetailSkeleton />;
  if (error || !data) return <div>Error loading organizer details.</div>;

  const { fullName, profilePicture, events, reviews } = data;

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profilePicture} alt={fullName} />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            {/* <p className="text-muted-foreground">{bio}</p> */}
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
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="mb-4 block items-center justify-between rounded-lg p-2 hover:bg-gray-100">
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(event.startDate).toLocaleString("en-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.endDate).toLocaleString("en-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="mb-4 border-b pb-4 last:border-b-0"
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={review.user.profilePicture}
                      alt={review.user.fullName}
                    />
                    <AvatarFallback>
                      {review.user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.user.fullName}</p>
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
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              There aren't any reviews yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerDetailPage;
