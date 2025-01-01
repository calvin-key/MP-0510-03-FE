"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import useOrganizerEvents from "@/hooks/api/event/useGetOrganizerEvents";
import { Event } from "@/types/event";
import { Voucher } from "@/types/voucher"; // Import the Voucher type

const CreateVoucherPage = () => {
  const { data: events, isLoading: eventsLoading } = useOrganizerEvents();
  const { mutateAsync: createVoucher, isPending: voucherPending } =
    useCreateVoucher();

  const formik = useFormik({
    initialValues: {
      eventId: "",
      code: "",
      description: "",
      nominal: "",
      quantity: "",
      startAt: "",
      expiresAt: "",
    },
    validationSchema: Yup.object({
      eventId: Yup.string().required("Event is required."),
      code: Yup.string().required("Voucher code is required."),
      description: Yup.string().required("Description is required."),
      nominal: Yup.number()
        .min(1, "Nominal must be at least 1.")
        .required("Nominal is required."),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1.")
        .required("Quantity is required."),
      startAt: Yup.date().required("Start date is required."),
      expiresAt: Yup.date()
        .min(Yup.ref("startAt"), "Expiry date must be after the start date.")
        .required("Expiry date is required."),
    }),
    onSubmit: async (values: Voucher) => {
      // Type the values as Voucher
      try {
        await createVoucher(values);
        toast.success("Voucher created successfully!");
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to create voucher.");
      }
    },
  });

  return (
    <main className="container mx-auto my-10 space-y-6 px-5">
      <h1 className="text-center text-3xl font-bold">Create a Voucher</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Event Selector */}
        <div>
          <Label htmlFor="eventId">Select Event</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("eventId", value)}
            value={formik.values.eventId}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  eventsLoading ? "Loading events..." : "Select an event"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {events?.map(
                (event: Event) =>
                  // Add a check to ensure event.id is defined before calling toString
                  event.id !== undefined && (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ),
              )}
            </SelectContent>
          </Select>
          {formik.touched.eventId && formik.errors.eventId && (
            <p className="text-xs text-red-500">{formik.errors.eventId}</p>
          )}
        </div>

        {/* Voucher Details */}
        <div>
          <Label htmlFor="code">Voucher Code</Label>
          <Input
            id="code"
            name="code"
            placeholder="Enter voucher code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.code && formik.errors.code && (
            <p className="text-xs text-red-500">{formik.errors.code}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Describe the voucher"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="nominal">Nominal</Label>
            <Input
              id="nominal"
              name="nominal"
              type="number"
              placeholder="Enter nominal value"
              value={formik.values.nominal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nominal && formik.errors.nominal && (
              <p className="text-xs text-red-500">{formik.errors.nominal}</p>
            )}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <p className="text-xs text-red-500">{formik.errors.quantity}</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="startAt">Start Date</Label>
            <Input
              id="startAt"
              name="startAt"
              type="datetime-local"
              value={formik.values.startAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startAt && formik.errors.startAt && (
              <p className="text-xs text-red-500">{formik.errors.startAt}</p>
            )}
          </div>
          <div>
            <Label htmlFor="expiresAt">Expiry Date</Label>
            <Input
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              value={formik.values.expiresAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expiresAt && formik.errors.expiresAt && (
              <p className="text-xs text-red-500">{formik.errors.expiresAt}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={voucherPending}>
            {voucherPending ? "Creating..." : "Create Voucher"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateVoucherPage;
