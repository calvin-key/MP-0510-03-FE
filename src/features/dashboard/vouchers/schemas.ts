import * as Yup from "yup";

export const VoucherSchema = Yup.object().shape({
  eventId: Yup.string().required("Event selection is required"),
  code: Yup.string()
    .required("Voucher code is required")
    .min(4, "Code must be at least 4 characters"),
  discountPercentage: Yup.number()
    .required("Discount percentage is required")
    .min(1, "Minimum discount is 1%")
    .max(100, "Maximum discount is 100%"),
  maxUses: Yup.number()
    .required("Maximum uses is required")
    .min(1, "Minimum uses must be 1"),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date must be in the future"),
});

export interface VoucherFormValues {
  eventId: string;
  code: string;
  discountPercentage: string;
  maxUses: string;
  expiryDate: string;
}
