import { Skeleton } from "@/components/ui/skeleton";

const TransactionSkeleton = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-6 w-[250px]" />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionSkeleton;
