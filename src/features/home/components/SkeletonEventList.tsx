import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonEventList = () => {
  return (
    <>
      <div className="my-5 grid w-full grid-cols-1 gap-5 md:mx-0 md:grid-cols-4">
        <Card>
          <CardHeader className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <CardTitle>
              <Skeleton className="h-4 w-[250px]" />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>

          <CardFooter className="justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[50px]" />
          </CardFooter>
        </Card>

        <Card className="hidden md:block">
          <CardHeader className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <CardTitle>
              <Skeleton className="h-4 w-[250px]" />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>

          <CardFooter className="justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[50px]" />
          </CardFooter>
        </Card>

        <Card className="hidden md:block">
          <CardHeader className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <CardTitle>
              <Skeleton className="h-4 w-[250px]" />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>

          <CardFooter className="justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[50px]" />
          </CardFooter>
        </Card>

        <Card className="hidden md:block">
          <CardHeader className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <CardTitle>
              <Skeleton className="h-4 w-[250px]" />
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardContent>

          <CardFooter className="justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[50px]" />
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 flex justify-center gap-7">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[25px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </>
  );
};

export default SkeletonEventList;
