"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { Event } from "@/types/event"; // Ensure to import the Event type
import { Search } from "lucide-react";
import { FC } from "react";
import Categories from "./Categories";
import EventCard from "./EventCard";
import SkeletonEventList from "./SkeletonEventList";
import { useDebounceValue } from "usehooks-ts";
import { TicketX } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

const CardList: FC = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [city, setCity] = useQueryState("city", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetEvents({
    page,
    search: debouncedValue,
    city,
    category,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <section className="container mx-auto mt-10 space-y-7 px-5">
      <div className="mt-10 flex w-full items-center rounded-lg border border-gray-300 bg-white p-2 shadow-lg">
        <div className="relative">
          <select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-none bg-white p-2 text-sm text-gray-700 focus:border-[#3863af] focus:outline-none focus:ring-[#3863af]"
          >
            <option value="">All Cities</option>
            <option value="Yogyakarta">Yogyakarta</option>
            <option value="Bali">Bali</option>
            <option value="Jakarta">Jakarta</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search events"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="flex-1 border-none p-2 text-sm text-gray-700 placeholder-gray-400 focus:border-[#3863af] focus:outline-none focus:ring-[#3863af]"
        />

        <button className="rounded-md bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-700">
          <Search />
        </button>
      </div>

      <Categories
        onSelectCategory={(selectedCategory) => setCategory(selectedCategory)}
      />

      <h1 className="text-3xl font-semibold">Find Events</h1>

      {isPending ? (
        <SkeletonEventList />
      ) : !data || data.data.length === 0 ? (
        <div className="flex h-52 w-full flex-col items-center justify-center text-center font-semibold text-[#afaeae]">
          <div className="flex items-center justify-center">
            <TicketX
              size={32}
              strokeWidth={1.25}
              className="h-14 w-14"
              color="#afaeae"
            />
          </div>
          <h1>No Event</h1>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {data.data.map((event: Event, index: number) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}

      {data && data.data.length > 0 && (
        <PaginationSection
          onChangePage={onChangePage}
          page={page}
          take={data.meta.take}
          total={data.meta.total}
        />
      )}
    </section>
  );
};

export default CardList;
