"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Ticket {
  ticketType: string;
  price: number;
  availableSeats: number;
}

interface TicketTypeProps {
  values: Ticket[];
  setFieldValue: (field: string, value: Ticket[]) => void;
}

const TicketType = ({ values, setFieldValue }: TicketTypeProps) => {
  const handleAddTicket = () => {
    setFieldValue("ticketTypes", [
      ...values,
      { ticketType: "", price: 0, availableSeats: 0 },
    ]);
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: string,
  ) => {
    const updatedTickets = values.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket,
    );
    setFieldValue("ticketTypes", updatedTickets);
  };

  const handleRemoveTicket = (index: number) => {
    setFieldValue(
      "ticketTypes",
      values.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="container mx-auto mt-9 space-y-5">
      <div className="grid w-full max-w-5xl items-center gap-1.5">
        <Label className="text-lg font-semibold">Ticket Types</Label>
        {values.map((ticket, index) => (
          <div key={index} className="mb-6">
            <div className="flex gap-4">
              <div className="w-1/3">
                <Label>Ticket Type</Label>
                <Input
                  type="text"
                  placeholder="e.g., VIP"
                  value={ticket.ticketType}
                  onChange={(e) =>
                    handleTicketChange(index, "ticketType", e.target.value)
                  }
                />
              </div>
              <div className="w-1/3">
                <Label>Price (Rp)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100000"
                  min={0}
                  value={ticket.price}
                  onChange={(e) =>
                    handleTicketChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div className="w-1/3">
                <Label>Available Seats</Label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  min={1}
                  value={ticket.availableSeats}
                  onChange={(e) =>
                    handleTicketChange(index, "availableSeats", e.target.value)
                  }
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => handleRemoveTicket(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="default"
          className="w-fit px-10"
          onClick={handleAddTicket}
        >
          Add Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketType;
