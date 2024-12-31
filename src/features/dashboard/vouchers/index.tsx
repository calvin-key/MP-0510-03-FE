"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VoucherFormValues, VoucherSchema } from "./schemas";

interface Voucher {
  id: string;
  code: string;
  eventId: string;
  discountPercentage: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  status: "active" | "expired" | "depleted";
}

const sampleEvents = [
  { id: "evt1", name: "Summer Music Festival 2024" },
  { id: "evt2", name: "Tech Conference 2024" },
];

const sampleVouchers: Voucher[] = [
  {
    id: "1",
    code: "SUMMER20",
    eventId: "evt1",
    discountPercentage: 20,
    maxUses: 100,
    usedCount: 45,
    expiryDate: "2024-08-31",
    status: "active",
  },
];

export default function VoucherPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const formik = useFormik<VoucherFormValues>({
    initialValues: {
      eventId: "",
      code: "",
      discountPercentage: "",
      maxUses: "",
      expiryDate: "",
    },
    validationSchema: VoucherSchema,
    onSubmit: async (values, { resetForm }) => {
      // Add your voucher creation logic here
      console.log(values);
      setIsDialogOpen(false);
      resetForm();
    },
  });

  const getStatusColor = (status: Voucher["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "expired":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "depleted":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold text-gray-900">
              Voucher Management
            </h1>
            <p className="mt-2 text-gray-600">
              Create and manage event vouchers efficiently
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4" /> Create Voucher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-bold">
                  Create New Voucher
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={formik.handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Event
                  </label>
                  <Select
                    name="eventId"
                    value={formik.values.eventId}
                    onValueChange={(value) =>
                      formik.setFieldValue("eventId", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleEvents.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.eventId && formik.errors.eventId ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.eventId}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Voucher Code
                  </label>
                  <Input
                    {...formik.getFieldProps("code")}
                    placeholder="e.g., SUMMER20"
                    className="w-full"
                  />
                  {formik.touched.code && formik.errors.code ? (
                    <p className="text-sm text-red-500">{formik.errors.code}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Discount Percentage
                  </label>
                  <Input
                    type="number"
                    {...formik.getFieldProps("discountPercentage")}
                    placeholder="e.g., 20"
                    className="w-full"
                  />
                  {formik.touched.discountPercentage &&
                  formik.errors.discountPercentage ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.discountPercentage}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Maximum Uses
                  </label>
                  <Input
                    type="number"
                    {...formik.getFieldProps("maxUses")}
                    placeholder="e.g., 100"
                    className="w-full"
                  />
                  {formik.touched.maxUses && formik.errors.maxUses ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.maxUses}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    {...formik.getFieldProps("expiryDate")}
                    className="w-full"
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.expiryDate}
                    </p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Creating..." : "Create Voucher"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Total Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {sampleVouchers.length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Active Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {sampleVouchers.filter((v) => v.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Usage Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">65%</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Code</TableHead>
                  <TableHead className="font-medium">Event</TableHead>
                  <TableHead className="font-medium">Discount</TableHead>
                  <TableHead className="font-medium">Uses</TableHead>
                  <TableHead className="font-medium">Expiry Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleVouchers.map((voucher) => (
                  <TableRow
                    key={voucher.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      {voucher.code}
                    </TableCell>
                    <TableCell>
                      {sampleEvents.find((e) => e.id === voucher.eventId)?.name}
                    </TableCell>
                    <TableCell>{voucher.discountPercentage}%</TableCell>
                    <TableCell>
                      {voucher.usedCount} / {voucher.maxUses}
                    </TableCell>
                    <TableCell>{voucher.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          voucher.status,
                        )} text-white transition-colors`}
                      >
                        {voucher.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
