import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Calendar, Check, Clock } from "lucide-react";
  import { Event } from "@/types/event";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  interface EventListProps {
    events: Event[];
    onReviewClick: (event: Event) => void;
    isRefetching?: boolean;
  }
  
  const EventList = ({ events, onReviewClick, isRefetching }: EventListProps) => {
    if (events.length === 0) {
      return (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <Calendar className="h-12 w-12 text-gray-400" />
              <CardTitle>No Events Found</CardTitle>
              <CardDescription>You haven't attended any events yet that can be reviewed.</CardDescription>
            </div>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Event Name</TableHead>
              <TableHead className="w-[25%]">End Date</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[15%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => {
              const hasReview = (event.reviews?.length ?? 0) > 0;
              
              return (
                <TableRow key={event.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {new Date(event.endDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {hasReview ? (
                      <Badge variant="success" className="flex w-fit items-center gap-1">
                        <Check className="h-3 w-3" />
                        Reviewed
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="flex w-fit items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onReviewClick(event)}
                      disabled={hasReview}
                      variant={hasReview ? "ghost" : "default"}
                      className={`w-full ${hasReview ? 'cursor-not-allowed' : ''}`}
                    >
                      {hasReview ? "Reviewed" : "Write Review"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default EventList;