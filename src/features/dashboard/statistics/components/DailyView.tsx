import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventData } from "@/utils/eventData";

export function DailyView({ data }: { data: EventData[] }) {
  if (data.length === 0) {
    return <div className="py-8 text-center">No events on this day.</div>;
  }

  const event = data[0]; // Assuming there's only one event per day

  const chartData = [
    { name: "Tickets Sold", value: event.ticketsSold },
    { name: "Attendance", value: event.attendance },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{event.name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              ${event.revenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {event.ticketsSold.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold vs Attendance</CardTitle>
          <CardDescription>
            Comparison of tickets sold and actual attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
