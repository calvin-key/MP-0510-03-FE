"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TransactionModal() {
  // Example ticket data (could be fetched dynamically from an API)
  const ticketOptions = [
    { id: "standard", name: "Standard", price: 100, availableSeats: 50 },
    { id: "vip", name: "VIP", price: 200, availableSeats: 20 },
  ];

  // State for managing ticket quantities and voucher code
  const [ticketQuantities, setTicketQuantities] = useState(
    ticketOptions.reduce(
      (acc, ticket) => {
        acc[ticket.id] = 0;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );
  const [voucherCode, setVoucherCode] = useState("");

  // Total price calculation
  const calculateTotal = () => {
    return ticketOptions.reduce(
      (total, ticket) =>
        total + ticket.price * (ticketQuantities[ticket.id] || 0),
      0,
    );
  };

  // Function to handle increment/decrement of ticket quantities
  const updateTicketQuantity = (id: string, change: number) => {
    setTicketQuantities((prev) => {
      const newQuantity = Math.max(0, (prev[id] || 0) + change);
      return { ...prev, [id]: newQuantity };
    });
  };

  // Function to handle purchase
  const handlePurchase = () => {
    const selectedTickets = ticketOptions
      .filter((ticket) => ticketQuantities[ticket.id] > 0)
      .map((ticket) => ({
        name: ticket.name,
        quantity: ticketQuantities[ticket.id],
        price: ticket.price,
      }));

    alert(
      `Purchased Tickets:\n${selectedTickets
        .map(
          (ticket) =>
            `${ticket.name}: ${ticket.quantity} x $${ticket.price} = $${
              ticket.quantity * ticket.price
            }`,
        )
        .join(
          "\n",
        )}\nVoucher Code: ${voucherCode}\nTotal: $${calculateTotal()}`,
    );

    // Clear form after transaction
    setTicketQuantities(
      ticketOptions.reduce(
        (acc, ticket) => {
          acc[ticket.id] = 0;
          return acc;
        },
        {} as Record<string, number>,
      ),
    );
    setVoucherCode("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-400 font-semibold">
          Get Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="bg-blue-50 p-9">
          <DialogTitle>
            Getting Paid To Talk or whatever the heck is the title
          </DialogTitle>
          <DialogDescription>
            <p>
              Jl, AntaBranta, <span>Bali</span>
            </p>
            <p>Sat 28th December 2024 3:00 pm</p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Left: Ticket Selection */}
          <div className="flex-1 space-y-4">
            <h2 className="text-lg font-bold">Select Tickets</h2>
            {ticketOptions.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div>
                  <h3 className="text-md font-semibold">{ticket.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${ticket.price} | {ticket.availableSeats} seats available
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => updateTicketQuantity(ticket.id, -1)}
                    disabled={ticketQuantities[ticket.id] <= 0}
                  >
                    -
                  </Button>
                  <span className="text-md font-semibold">
                    {ticketQuantities[ticket.id] || 0}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => updateTicketQuantity(ticket.id, 1)}
                    disabled={
                      ticketQuantities[ticket.id] >= ticket.availableSeats
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-4 h-full border-l border-gray-300"></div>

          {/* Right: Transaction Summary */}
          <div className="flex-1 space-y-4">
            <h2 className="text-lg font-bold">Summary</h2>
            <div className="space-y-2">
              {ticketOptions.map(
                (ticket) =>
                  ticketQuantities[ticket.id] > 0 && (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {ticket.name} x {ticketQuantities[ticket.id]}
                      </span>
                      <span>${ticket.price * ticketQuantities[ticket.id]}</span>
                    </div>
                  ),
              )}
            </div>
            <div className="mt-4 border-t pt-4">
              <Label htmlFor="voucher">Voucher Code</Label>
              <Input
                id="voucher"
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter voucher code (optional)"
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <Button
              onClick={handlePurchase}
              disabled={calculateTotal() === 0}
              className="w-full bg-orange-500"
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
