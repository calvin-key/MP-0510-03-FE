"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TransactionModal } from "./components/TransactionModal";
import { FC } from "react";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import Markdown from "@/components/Markdown";

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const { data, isPending: isPendingGet } = useGetEvent(eventId);

  const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (isPendingGet) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <h1 className="text-center">No Event</h1>;
  }

  return (
    <main className="container mx-auto px-5 py-10">
      <div className="relative h-[200px] rounded-lg bg-gray-500 md:h-[400px]">
        <Image
          src={data.image}
          alt="image"
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-9 py-10 md:flex-row">
        <div className="space-y-14">
          <h1 className="text-3xl font-bold md:text-4xl">{data.name}</h1>

          <div className="flex w-fit items-center gap-7 rounded-lg bg-orange-100 p-5">
            <Avatar>
              <AvatarImage src={data.organizer.profilePicture} />
            </Avatar>

            <div className="flex flex-col">
              <p>Organized By</p>
              <a
                href={`/organizers/${data.organizer.id}`}
                className="font-semibold hover:text-orange-600"
              >
                {data.organizer.fullName}
              </a>
            </div>
          </div>

          <div className="space-y-2 font-semibold">
            <h2 className="text-2xl">Date and Time</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CalendarClock />
              <p>
                {new Date(data.startDate).toLocaleString("en-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(data.endDate).toLocaleString("en-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="space-y-2 font-semibold">
            <h2 className="text-2xl">Location</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPinned />
              <div className="flex-col">
                <p>
                  {data.address}, <span>{data.location.city}</span>
                </p>
                <p>{data.specificLocation}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:w-2/3">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-3 align-middle text-sm">
              {data.eventCategories.map((eventCategory, index) => (
                <Link
                  key={index}
                  href={`/?category=${encodeURIComponent(eventCategory.category.name)}`}
                  className="w-fit rounded-full bg-orange-300 px-5 py-2 hover:bg-orange-500 hover:text-white"
                >
                  {eventCategory.category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">About This Event</h2>
            <div className="text-sm text-gray-800">
              <Markdown content={data.description} />
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 h-fit space-y-3 rounded-lg border-[1px] border-gray-200 bg-[#f7fafe] p-5 duration-100 hover:shadow-lg hover:shadow-orange-300 md:top-7 md:w-4/12">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Available Tickets</h2>
            <div className="space-y-2">
              {data.ticketTypes.map((ticket, index) => (
                <div key={index} className="flex justify-between">
                  <h3 className="font-semibold">{ticket.ticketType}</h3>
                  <p>{formatToIDR(ticket.price)}</p>
                </div>
              ))}
            </div>
          </div>
          <TransactionModal />
          {/* <Button className="w-full bg-orange-400 font-semibold">
            Get Ticket
          </Button> */}
        </div>
      </div>
    </main>
  );
};

export default EventDetailPage;
