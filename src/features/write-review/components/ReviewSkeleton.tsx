import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton";
  
  const EventListSkeleton = () => {
    // Create an array of 5 items for skeleton rows
    const skeletonRows = Array.from({ length: 5 }, (_, i) => i);
  
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="w-[25%]">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="w-[20%]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="w-[15%]">
                <Skeleton className="h-4 w-14" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-[80%]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[70%]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-9 w-[90%] rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default EventListSkeleton;