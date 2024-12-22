import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TransactionModal } from "./components/TransactionModal";

const EventDetailPage = () => {
  const formatToIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <main className="container mx-auto px-5 py-10">
      <div className="relative h-[200px] rounded-lg bg-gray-500 md:h-[400px]">
        <Image src="" alt="image" fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between gap-9 py-10 md:flex-row">
        <div className="space-y-14">
          <h1 className="text-3xl font-bold md:text-4xl">
            Getting Paid to Talk — An Intro to Voice Overs A Live Online
            Workshop
          </h1>

          <div className="flex w-fit items-center gap-7 rounded-lg bg-orange-100 p-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p>Organized By</p>
              <a
                href="/organizer"
                className="font-semibold hover:text-orange-600"
              >
                Creative Voice Development Group
              </a>
            </div>
          </div>

          <div className="space-y-2 font-semibold">
            <h2 className="text-2xl">Date and Time</h2>
            <div className="flex gap-3 items-center text-gray-600 text-sm">
              <CalendarClock />
              <p>Tuesday, December 31 · 7:30 - 9am WIB</p>
            </div>
          </div>

          <div className="space-y-2 font-semibold">
            <h2 className="text-2xl">Location</h2>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <MapPinned />
              <div className="flex-col">
                <p>
                  Jl. Laksada Adisutjipto, <span>Yogyakarta</span>
                </p>
                <p>Pacific Building</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:w-2/3">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-3 align-middle text-sm">
              <Link
                href="/?category=Music"
                className="w-fit rounded-full bg-orange-300 px-5 py-2 hover:bg-orange-500 hover:text-white"
              >
                Music
              </Link>
              <Link
                href="/?category=Performing+%26+Visual+Arts"
                className="w-fit rounded-full bg-orange-300 px-5 py-2 hover:bg-orange-500 hover:text-white"
              >
                Performing & Visual Arts
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">About This Event</h2>
            <div className="text-sm text-gray-800">description</div>
          </div>
        </div>

        <div className="sticky bottom-4 h-fit space-y-3 rounded-lg border-[1px] border-gray-200 bg-[#f7fafe] p-5 duration-100 hover:shadow-lg hover:shadow-orange-300 md:top-7 md:w-3/12">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">VIP</h3>
              <p>{formatToIDR(Number(200000) || 0)}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="font-semibold">Regular</h3>
              <p>{formatToIDR(Number(100000) || 0)}</p>
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
