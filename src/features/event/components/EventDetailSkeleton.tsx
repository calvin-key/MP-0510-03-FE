import { Skeleton } from "@/components/ui/skeleton";

const EventDetailSkeleton = () => {
  return (
    <main className="container mx-auto px-5 py-10">
      {/* Hero Image Skeleton */}
      <Skeleton className="h-[200px] w-full rounded-lg md:h-[400px]" />

      <div className="flex flex-col justify-between gap-9 py-10 md:flex-row">
        <div className="flex-1 space-y-14">
          {/* Title Skeleton */}
          <Skeleton className="h-12 w-3/4" />

          {/* Organizer Card Skeleton */}
          <div className="flex w-fit items-center gap-7 rounded-lg bg-orange-50 p-5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          {/* Date and Time Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>

          {/* Location Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
          </div>

          {/* Categories Skeleton */}
          <div className="space-y-2 md:w-2/3">
            <Skeleton className="h-8 w-32" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* About Section Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Ticket Section */}
        <div className="sticky bottom-4 h-fit space-y-3 rounded-lg border-[1px] border-gray-200 bg-[#f7fafe] p-5 md:top-7 md:w-4/12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      </div>
    </main>
  );
};

export default EventDetailSkeleton;
