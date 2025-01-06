"use client";
import { useState } from "react";
import EventList from "./components/ReviewEventList";
import ReviewModal from "./components/ReviewModal";
import { useGetReviewableEvents } from "@/hooks/api/review/useGetReviewableEvents";
import { useCreateReview } from "@/hooks/api/review/useCreateReview";
import { Event } from "@/types/event";
import { toast } from "react-toastify";
import EventListSkeleton from "./components/ReviewSkeleton";

const WriteReviewPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const {
    data: events,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetReviewableEvents();

  const { mutate: createReview, isPending: isSubmitting } = useCreateReview();

  const handleSubmitReview = (rating: number, comment: string) => {
    if (!selectedEvent) return;

    createReview(
      {
        eventId: selectedEvent.id,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setSelectedEvent(null);
          toast.success("Your review has been successfully submitted.");
          refetch(); // Refresh the events list
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || "Failed to submit review",
          );
        },
      },
    );
  };

  if (isError) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-red-500">
        Error: {error?.message || "Failed to load events"}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">History</h1>
      {isLoading ? (
        <EventListSkeleton />
      ) : (
        <EventList
          events={events || []}
          onReviewClick={(event: Event) => setSelectedEvent(event)}
          isRefetching={isRefetching}
        />
      )}

      {selectedEvent && (
        <ReviewModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={handleSubmitReview}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default WriteReviewPage;
