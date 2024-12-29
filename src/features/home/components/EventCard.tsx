import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock, MapPin } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Event } from "@/types/event";
import Link from "next/link";

interface EventCardProp {
  event: Event;
}

const EventCard: FC<EventCardProp> = ({ event }) => {
  const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="duration-300 hover:bg-card hover:shadow-lg">
        <CardHeader className="space-y-4">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={event.image}
              alt="thumbnail"
              fill
              className="object-cover duration-100 hover:scale-105"
            />
          </div>
          <CardTitle>{event.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
          <div className="flex items-center gap-3">
            {" "}
            <CalendarClock />
            <p>{format(event.startDate, "dd MMM yyyy")}</p>
          </div>

          <div className="flex items-center gap-3">
            {" "}
            <MapPin />
            <p>{event.specificLocation}</p>
          </div>

          <div className="text-gray-800">{event.organizer.fullName}</div>
        </CardContent>

        <CardFooter className="justify-between text-sm">
          <div className="flex flex-col gap-1 text-gray-700">
            <p>From: </p>
            <p className="font-extrabold">
              {formatToIDR(Number(event.lowestPrice) || 0)}
            </p>
          </div>
          <Button className="bg-orange-400 hover:bg-orange-700">Buy Now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
