import * as Yup from "yup";

export const createVoucherSchema = Yup.object({
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
});
