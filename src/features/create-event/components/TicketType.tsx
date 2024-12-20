"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

interface Ticket {
  ticketType: string;
  price: string;
  availableSeats: string;
}

interface TicketTypeProps {
  values: Ticket[];
  setFieldValue: (field: string, value: any) => void;
}

const TicketType: React.FC<TicketTypeProps> = ({ values, setFieldValue }) => {
  const handleAddTicket = () => {
    setFieldValue("ticketTypes", [
      ...values,
      { ticketType: "", price: "", availableSeats: "" },
    ]);
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: string
  ) => {
    const updatedTickets = [...values];
    updatedTickets[index][field] = value;
    setFieldValue("ticketTypes", updatedTickets);
  };

  const handleRemoveTicket = (index: number) => {
    const updatedTickets = values.filter((_, i) => i !== index);
    setFieldValue("ticketTypes", updatedTickets);
  };

  return (
    <div className="container mx-auto mt-9 space-y-5">
      <div className="grid w-full max-w-5xl items-center gap-1.5">
        <Label>Ticket Types</Label>
        {values.map((ticket, index) => (
          <div key={index} className="mb-3 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Ticket Type"
              value={ticket.ticketType}
              onChange={(e) =>
                handleTicketChange(index, "ticketType", e.target.value)
              }
              className="w-1/3"
            />
            <Input
              type="text"
              placeholder="Price"
              value={ticket.price}
              onChange={(e) =>
                handleTicketChange(index, "price", e.target.value)
              }
              className="w-1/3"
            />
            <Input
              type="text"
              placeholder="Available Seats"
              value={ticket.availableSeats}
              onChange={(e) =>
                handleTicketChange(index, "availableSeats", e.target.value)
              }
              className="w-1/3"
            />
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={() => handleRemoveTicket(index)}
            >
              Remove
            </Button>
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
