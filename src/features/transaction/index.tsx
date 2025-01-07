"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Timer, Upload, AlertCircle, Info } from "lucide-react";
import { useGetTransaction } from "@/hooks/api/transaction/useGetTransaction";
import { useUpdateTransaction } from "@/hooks/api/transaction/useUpdateTransaction";
import { TimerComponent } from "./components/Timer";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Transaction, TransactionItem } from "@/types/transaction";
import Footer from "@/components/Footer";

interface TransactionSummaryProps {
  transactionId: number;
}

const TransactionSummary = ({ transactionId }: TransactionSummaryProps) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: transaction, isLoading } = useGetTransaction(transactionId);
  const { mutate: updateTransaction, isPending } = useUpdateTransaction();

  const getStatusBadgeVariant = (
    status: string | undefined,
  ): "secondary" | "destructive" | "outline" | "default" => {
    switch (status) {
      case "waiting_for_payment":
        return "default";
      case "waiting_for_admin_confirmation":
        return "secondary";
      case "done":
        return "default";
      case "rejected":
        return "destructive";
      case "expired":
        return "destructive";
      case "canceled":
        return "destructive";
      default:
        return "default";
    }
  };

  const formik = useFormik({
    initialValues: {
      paymentProof: null,
    },
    validationSchema: Yup.object({
      paymentProof: Yup.mixed().required("Payment proof is required"),
    }),
    onSubmit: async (values) => {
      if (selectedFile) {
        updateTransaction(
          {
            id: transactionId,
            paymentProof: selectedFile,
          },
          {
            onSuccess: () => {
              toast.success("Payment proof uploaded successfully");
              formik.resetForm();
              setSelectedFile(null);
              // Invalidate both queries to refresh the data
              queryClient.invalidateQueries({
                queryKey: ["transaction", transactionId],
              });
              queryClient.invalidateQueries({
                queryKey: ["transactions"],
              });
            },
            onError: (error: Error) => {
              toast.error("Failed to upload payment proof");
            },
          },
        );
      }
    },
  });

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;

  const organizer = transaction?.items[0]?.ticketType?.event?.organizer;

  const calculateSubtotal = (items: TransactionItem[]) => {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const calculateDiscounts = (transaction: Transaction) => {
    let totalDiscount = 0;
    if (transaction.pointsUsed) totalDiscount += transaction.pointsUsed;
    if (transaction.voucher) totalDiscount += transaction.voucher.nominal;
    if (transaction.coupon) totalDiscount += transaction.coupon.nominal;
    return totalDiscount;
  };

  if (!transaction) return null;

  console.log(transaction?.voucher?.code);

  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transaction?.status === "waiting_for_payment" && (
            <Alert className="bg-orange-100">
              <Timer className="h-4 w-4" />
              <AlertDescription>
                Time remaining to upload payment proof:{" "}
                <TimerComponent expiryTime={transaction.expiresAt} />
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h3 className="font-semibold">Transaction Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Status:</span>
              <Badge
                variant={getStatusBadgeVariant(transaction?.status)}
                className="w-fit px-5"
              >
                {transaction?.status?.replace(/_/g, " ").toUpperCase()}
              </Badge>
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(calculateSubtotal(transaction?.items || []))}
              </span>

              {transaction?.pointsUsed > 0 && (
                <>
                  <span className="text-gray-600">Points Used:</span>
                  <span className="text-green-600">
                    -
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.pointsUsed)}
                  </span>
                </>
              )}

              {transaction?.voucherId && (
                <>
                  <span className="text-gray-600">
                    Voucher ({transaction?.voucher?.code}):
                  </span>
                  <span className="text-green-600">
                    -
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction?.voucher?.nominal || 0)}
                  </span>
                </>
              )}

              {transaction?.couponId && (
                <>
                  <span className="text-gray-600">
                    Coupon ({transaction.coupon?.code}):
                  </span>
                  <span className="text-green-600">
                    -
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transaction.coupon?.nominal)}
                  </span>
                </>
              )}
              <span className="font-semibold text-gray-600">Total Amount:</span>
              <span className="font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(transaction?.totalPrice || 0)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tickets</h3>
            <div className="mb-2 text-sm font-bold text-orange-600">
              {transaction?.items[0]?.ticketType?.event.name}
            </div>
            {transaction?.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                <span>{item.ticketType?.ticketType}</span>
                <span>
                  {item.quantity} x{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.pricePerUnit)}
                </span>
              </div>
            ))}
          </div>

          {(transaction?.status === "canceled" ||
            transaction?.status === "expired" ||
            transaction?.status === "rejected") &&
            (transaction?.pointsUsed > 0 ||
              transaction?.voucherId ||
              transaction?.couponId) && (
              <Alert className="mt-4 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Note: Your{" "}
                  {[
                    transaction.pointsUsed > 0 && "points",
                    transaction.voucherId && "voucher",
                    transaction.couponId && "coupon",
                  ]
                    .filter(Boolean)
                    .join(", ")}{" "}
                  will be refunded to your account within 5 minutes.
                </AlertDescription>
              </Alert>
            )}

          {transaction?.status === "waiting_for_payment" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Payment Information</h3>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please transfer to:
                  <div className="mt-2">{organizer?.bankAccount}</div>
                </AlertDescription>
              </Alert>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Upload Payment Proof
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        formik.setFieldValue("paymentProof", file);
                      }
                    }}
                    className="w-full"
                  />
                  {formik.touched.paymentProof &&
                    formik.errors.paymentProof && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.paymentProof as string}
                      </div>
                    )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-500"
                  disabled={!selectedFile || isPending}
                >
                  {isPending ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Payment Proof
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionSummary;
