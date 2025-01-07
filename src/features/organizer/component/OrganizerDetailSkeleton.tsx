import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrganizerDetailSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Profile Skeleton */}
      <Card className="mb-8">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div>
            <Skeleton className="mb-2 h-8 w-32" />
            <Skeleton className="h-5 w-16" />
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Skeleton */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reviews Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4 border-b pb-4 last:border-b-0">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="mb-2 h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="mt-2 h-4 w-48" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerDetailSkeleton;
