"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const TicketType = () => {
  type Ticket = {
    type: string;
    price: string;
    seats: string;
  };

  const [tickets, setTickets] = useState<Ticket[]>([
    { type: "", price: "", seats: "" },
  ]);

  const handleAddTicket = () => {
    setTickets([...tickets, { type: "", price: "", seats: "" }]);
  };

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: string,
  ) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  const handleRemoveTicket = (index: number) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  return (
    <div className="container mx-auto mt-9 space-y-5">
      {/* Ticket Types */}
      <div className="grid w-full max-w-5xl items-center gap-1.5">
        <Label htmlFor="tickets">Ticket Types</Label>
        {tickets.map((ticket, index) => (
          <div key={index} className="mb-3 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Ticket Type"
              value={ticket.type}
              onChange={(e) =>
                handleTicketChange(index, "type", e.target.value)
              }
              className="w-1/3 bg-white"
            />
            <Input
              type="number"
              placeholder="Price"
              value={ticket.price}
              onChange={(e) =>
                handleTicketChange(index, "price", e.target.value)
              }
              className="w-1/3 bg-white"
            />
            <Input
              type="number"
              placeholder="Available Seats"
              value={ticket.seats}
              onChange={(e) =>
                handleTicketChange(index, "seats", e.target.value)
              }
              className="w-1/3 bg-white"
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
