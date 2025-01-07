import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTransaction } from "@/hooks/api/transaction/useCreateTransaction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TransactionModalProps } from "@/types/transaction";
import { createTransactionSchema } from "../schemas";

export function TransactionModal({
  eventName,
  location,
  dateTime,
  ticketTypes,
  userPoints = 0,
  availableVouchers = [],
}: TransactionModalProps) {
  const session = useSession();
  const router = useRouter();
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const formik = useFormik({
    initialValues: {
      tickets: ticketTypes.map((ticket) => ({
        ticketTypeId: ticket.id,
        quantity: 0,
      })),
      pointsUsed: 0,
      voucherId: "",
    },
    validationSchema: createTransactionSchema(userPoints),
    onSubmit: async (values) => {
      const ticketsToSubmit = values.tickets.filter((t) => t.quantity > 0);

      if (ticketsToSubmit.length === 0) {
        return toast.error("Please select at least one ticket");
      }

      const response = await createTransaction({
        tickets: ticketsToSubmit,
        pointsUsed: values.pointsUsed,
        voucherId: values.voucherId ? Number(values.voucherId) : undefined,
        couponCode: couponCode || undefined,
      });

      setIsOpen(false);
      router.push(`/transactions/${response.id}`);
    },
  });

  const calculateTotal = (): number => {
    const ticketsTotal = formik.values.tickets.reduce((total, ticket) => {
      const ticketType = ticketTypes.find((t) => t.id === ticket.ticketTypeId);
      return total + (ticketType?.price || 0) * ticket.quantity;
    }, 0);

    const selectedVoucher = availableVouchers.find(
      (v) => v.id === Number(formik.values.voucherId),
    );

    const voucherDiscount = selectedVoucher?.nominal || 0;
    const pointsDiscount = formik.values.pointsUsed || 0;

    return Math.max(0, ticketsTotal - voucherDiscount - pointsDiscount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-400 font-semibold hover:bg-orange-500">
          Get Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
          <DialogDescription>
            <p>{location}</p>
            <p>{dateTime}</p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Ticket Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Tickets</h2>
            {ticketTypes.map((ticket, index) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between rounded bg-gray-50 p-2"
              >
                <div>
                  <p className="font-medium">{ticket.ticketType}</p>
                  <p className="text-sm text-gray-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(ticket.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const updatedTickets = [...formik.values.tickets];
                      updatedTickets[index].quantity = Math.max(
                        0,
                        updatedTickets[index].quantity - 1,
                      );
                      formik.setFieldValue("tickets", updatedTickets);
                    }}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">
                    {formik.values.tickets[index].quantity}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const updatedTickets = [...formik.values.tickets];
                      updatedTickets[index].quantity = Math.min(
                        ticket.availableSeats,
                        updatedTickets[index].quantity + 1,
                      );
                      formik.setFieldValue("tickets", updatedTickets);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {session.status === "authenticated" ? (
            <>
              {/* Voucher Selection */}
              <div className="space-y-2">
                <Label htmlFor="voucherId">Available Vouchers</Label>
                <Select
                  value={
                    formik.values.voucherId === ""
                      ? "no-voucher"
                      : formik.values.voucherId
                  }
                  onValueChange={(value) =>
                    formik.setFieldValue(
                      "voucherId",
                      value === "no-voucher" ? "" : value,
                    )
                  }
                >
                  {" "}
                  <SelectTrigger>
                    {" "}
                    <SelectValue placeholder="Select a voucher" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    <SelectItem value="no-voucher">No voucher</SelectItem>{" "}
                    {availableVouchers.map((voucher) => (
                      <SelectItem
                        key={voucher.id}
                        value={voucher.id.toString()}
                        disabled={voucher.usageCount >= voucher.quantity}
                      >
                        {" "}
                        {voucher.description} ({" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(voucher.nominal)}{" "}
                        off){" "}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>
              </div>

              {/* Coupon Input */}
              <div className="space-y-2">
                <Label htmlFor="couponCode">Coupon Code</Label>
                <Input
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
              </div>

              {/* Points Input */}
              <div className="space-y-2">
                <Label htmlFor="pointsUsed">
                  Use Points (Available: {userPoints})
                </Label>
                <Input
                  id="pointsUsed"
                  type="number"
                  {...formik.getFieldProps("pointsUsed")}
                  max={userPoints}
                  min={0}
                  className="w-full"
                />
                {formik.touched.pointsUsed && formik.errors.pointsUsed && (
                  <p className="text-sm text-red-500">
                    {formik.errors.pointsUsed}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-orange-50 p-4">
              <p className="text-sm text-gray-600">
                Sign in to use vouchers, coupons, and points for additional
                discounts!
              </p>
            </div>
          )}

          {/* Total Price */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total Price:</span>
              <span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(calculateTotal())}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500"
              disabled={calculateTotal() < 0 || formik.isSubmitting}
            >
              {formik.isSubmitting ? "Processing..." : "Confirm Purchase"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
